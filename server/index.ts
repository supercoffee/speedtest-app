import {iperf3, TestType} from "./src/iperf-lib";
import {transformOutputToModel} from "./src/mapping";
import {RunTestRequest} from "./src/wire-models";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://db", {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});

app.post('/test', (req, res, next) => {

    const body =  req.body as RunTestRequest;
    const clientAddr = body.clientIp;
    const type = body.testType;
    const reverse = body.reverse;

    iperf3(clientAddr, type, reverse).then((result) => {
        const resultModel = transformOutputToModel(result);
        return resultModel.save();

    }).then((model) => {

        res.json(model);
    }).catch((err) => {
        next(err);
    })
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
