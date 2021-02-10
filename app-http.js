// File: app.js

const http = require('http');

const url = require('url');

const express = require('express');
const { response } = require('express');

const app = express();

const port = 8081;

// to use json

app.use(express.json());

// todoList array

let todoList = ["Complete Node Byte", "Play Cricket"];

function getTodoList(left) {
    
    let htmlTodoList = '';

    for(let i = 0; i < todoList.length && left > 0; i++, left--) {
        
        let value = todoList[i];

        htmlTodoList += '<li>' + value + '</li>';

    }

    // create an ordered list

    htmlTodoList = '<ol>' + htmlTodoList + '</ol>';

    // return the HTML code

    return '<h1>TODO</h1>' + htmlTodoList + '<p>Created by : Vivek Dubey</p>';
}

app.get('/todos', (req, res) => {

    res.send(getTodoList(todoList.length));

})

app.post('/todos', (req, res) => {

    todoList.push(req.body.name);

    res.status(201).end();
})

app.delete('/todos', (req, res) => {

    let toDelete = req.body.name;

    for(let i in todoList) {

        if(todoList[i] == toDelete) {

            todoList.splice(i, 1);

            break;
        }

    }
    
    res.status(204).end();
})

app.all("/todos", (req, res) => {

    response.status(501).send();

})

app.all("*", (request, response) => {

    response.status(404).end();

    // cool, maybe used to make custom 404 pages
    // response.send("<Custom 404 message>");

})

app.listen(port, () => {

    console.log(`App listening at port : ${port}`);

});

