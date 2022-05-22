var express = require('express');
const bp = require('body-parser');
var app = express();

var myArray = [];

app.use(bp.text())

app.post('/create', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    myArray.push(req.body);
    res.end();
})

app.get('/list', function (req, res) {
    res.end(JSON.stringify(myArray));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
})