import {iperf3, TestType} from "./src/iperf-lib";
import {transformOutputToModel} from "./src/mapping";
import {RunTestRequest} from "./src/wire-models";
import {Client} from "@elastic/elasticsearch";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const esClient = new Client({node: process.env.ES_URL});

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
    const meta = body.meta;

    iperf3(clientAddr, type, reverse).then((result) => {
        return esClient.index({
            index: 'test-results',
            body: {
                result: result,
                meta: body.meta
            }
        });

    }).then((model) => {

        res.json(model);
    }).catch((err) => {
        next(err);
    })
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
