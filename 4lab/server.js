var express = require('express');
const bp = require('body-parser');
var app = express();

app.use(bp.json())

students = [
    {
        id: 1,
        firstName: "Ivan",
        lastName: "Ivanov",
        group: "VIS21",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        firstName: "Homer",
        lastName: "Sivol",
        group: "VIS11",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        firstName: "Liza",
        lastName: "Ivanova",
        group: "VIS41",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        firstName: "Anya",
        lastName: "Sereneva",
        group: "VIS11",
        ccreatedAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 5,
        firstName: "Nikolay",
        lastName: "Tarantiev",
        group: "VIS12",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 6,
        firstName: "Charlse",
        lastName: "Barkley",
        group: "Phoenix Suns",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]


// Вывод всех данных из json
app.get('/students', function(req, res) {
    res.end(JSON.stringify(students));
})


// Вывод данных из json по одному объекту
app.get('/students/:id', function(req, res) {
    var student = students[req.params.id-1] 
    res.end(JSON.stringify(student));
})
 

// Добавление объекта
app.post('/students', function(req, res) {
    if (!req.body) return res.sendStatus(400)
    students.push({
        id: students.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        group: req.body.group,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.end(JSON.stringify(students));
})


// Изменение объекта
app.put('/students/:id', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    students[req.params.id-1].firstName = req.body.firstName != null ? req.body.firstName : students[req.params.id].firstName
    students[req.params.id-1].lastName = req.body.lastName != null ? req.body.lastName : students[req.params.id].lastName
    students[req.params.id-1].group = req.body.group != null ? req.body.group : students[req.params.id].group
    students[req.params.id-1].updatedAt = new Date()
    res.end(JSON.stringify(students));
})


// Удаление объекта
app.delete('/students/:id', function (req, res) {
    students.pop(req.params.id-1)  
    res.end(JSON.stringify(students));
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
})