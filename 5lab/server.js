var express = require('express');
var app = express();
var fs = require("fs");
const bp = require('body-parser');

app.use(bp.json())

//Вывод всех данных из json
app.get('/students', function (req, res) {
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        res.end(data);
    });
})


//Вывод данных из json по одному объекту
app.get('/students/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        var student = data[req.params.id-1] 
        res.end(JSON.stringify(student));
    });
})


//Добавление объекта
app.post('/students', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push({
            id: data.length + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            group: req.body.group,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        fs.writeFile("students.json", JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully\n")
            }
        });
        res.end(JSON.stringify(data));
    });
})


//Изменение объекта
app.put('/students/:id', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            data = JSON.parse(data);
            data[req.params.id-1].firstName = req.body.firstName != null ? req.body.firstName : data[req.params.id-1].firstName
            data[req.params.id-1].lastName = req.body.lastName != null ? req.body.lastName : data[req.params.id-1].lastName
            data[req.params.id-1].group = req.body.group != null ? req.body.group : data[req.params.id-1].group
            data[req.params.id-1].updatedAt = new Date()
        }
        fs.writeFile("students.json", JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File changed successfully\n")
            }
        });
        res.end(JSON.stringify(data));
    });
})


//Удаление объекта
app.delete('/students/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data[req.params.id-1];
        data.pop(req.params.id-1) ;
        fs.writeFile("students.json", JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File changed successfully\n")
            }
        });
        res.end(JSON.stringify(data));
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
}) 