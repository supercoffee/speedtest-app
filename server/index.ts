import {iperf3, TestType} from "./src/iperf-lib";

const { exec } = require("child_process");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dbConnection = mongoose.connect("mongodb://db", {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});

//
// exec("iperf3 -c host.docker.internal", (error, stdout, sterr) => {
//     console.log(stdout);
// });
// console.log('running server');


interface RunTestRequest {
    clientIp: string;
    testType: TestType;

    /**
     * Server sends to client in reverse mode
     * Default: false
     */
    reverse: boolean;
}


app.post('/test', (req, res, next) => {

    const body =  req.body as RunTestRequest;

    const clientAddr = body.clientIp;
    const type = body.testType;

    // const ipv4 = clientAddr.match(/(\d+\.?){4}/)[0];
    // console.log(`${ipv4}`);

    iperf3(clientAddr, type).then((result) => {

        res.json(result);
    }).catch((err) => {
        next(err);
    })
    // exec(`iperf3 -J -u -c ${body.clientIp}`, (error: any, stdout: string, sterr) => {
    //     console.log(sterr);
    //     const response = JSON.parse(stdout);
    //     res.json(response);
    // });

});

app.listen(port, () => console.log(`Server listening on port ${port}`));
