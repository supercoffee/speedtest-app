
const { exec } = require("child_process");
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

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

enum TestType {
    speed = 'udp',
    packetLoss = 'tcp'
}


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

    const clientAddr = 'host.docker.internal'; //req.connection.remoteAddress;
    // const ipv4 = clientAddr.match(/(\d+\.?){4}/)[0];
    // console.log(`${ipv4}`);

    exec(`iperf3 -J -c ${clientAddr}`, (error, stdout, sterr) => {
        console.log(sterr);
        res.send(stdout);
    });

});

app.listen(port, () => console.log(`Server listening on port ${port}`));
