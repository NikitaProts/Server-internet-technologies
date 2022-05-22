var express = require('express');
const bp = require('body-parser');
var app = express();
const { Client } = require('pg');

app.use(bp.json())

const client = new Client({
    user: "me",
    host: "localhost",
    database: "students_1",
    password: "password",
    port: 5432
});
client.connect()


// Вывод всех данных из psql
app.get('/students', function (req, response) {
    client.query('SELECT * FROM "students"', (err, results) => {
        if (err) throw err
        response.end(JSON.stringify(results.rows))
    })
})


// Вывод данных из psql по одному объекту
app.get('/students/:id', function (req, response) {
    client.query(`SELECT * FROM "students" WHERE "id" = ${req.params.id}`, (err, results) => {
        if (err) throw err
        response.end(JSON.stringify(results.rows[0]))
    })
})


//Добавление объекта
app.post('/students', function (req, response) {
    if (!req.body) return response.sendStatus(400)

    const { firstName, lastName, group } = req.body

    client.query("INSERT INTO students(first_name, last_name, group_name, created_at, updated_at) VALUES($1, $2, $3, $4, $5)",
                 [firstName, lastName, group, new Date(), new Date()], (err, results) => {
        if (err) throw err
        response.end(JSON.stringify("INSERT 0 1"))
    })
})


// Изменение объекта
app.put('/students/:id', function (req, response) {
    if (!req.body) return res.sendStatus(400)

    const id = parseInt(req.params.id)
    const { firstName, lastName, group } = req.body

    client.query("UPDATE students SET first_name = $1, last_name = $2, group_name = $3, updated_at = $4 WHERE id = $5",
                 [firstName, lastName, group, new Date(), id], (err, results) => {
        if (err) throw err
        response.end(JSON.stringify(results.rows))
    })
})


// Удаление объекта
app.delete('/students/:id', function (req, response) {
    const id = parseInt(req.params.id)

    client.query("DELETE FROM students WHERE id = $1", [id], (err, results) => {
        if (err) throw err
        response.end(JSON.stringify("DELETE 1"))
    })
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is running")
}) 