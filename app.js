// File: app.js

const http = require('http');

const port = 8081;

// todoList array

let todoList = ["Complete Node Byte", "Play Cricket"];

function getTodoList() {
    let htmlTodoList = '';

    todoList.forEach((value) => {
        htmlTodoList += '<li>' + value + '</li>';
    });

    // create an ordered list

    htmlTodoList = '<ol>' + htmlTodoList + '</ol>';

    // return the HTML code

    return '<h1>TODO</h1>' + htmlTodoList + '<p>Created by : Vivek Dubey</p>';
}

http.createServer((request, response) => {

    // check the request url and method

    const { headers, method, url } = request;

    if(url === '/todos' && method == 'GET') {

        // Set response status code and response headers

        response.writeHead(200, { 'Content-Type': 'text/html' });

        // Set response body i.e, data to be sent

        response.write(getTodoList());

    } else if(method != 'GET') {

        // when the method is not GET, url can be anything

        response.writeHead(501, { 'Status-Code' : 'Not-Implemented' });

    } else {

        // when url is wrong
        // what if method is 'GET' - same
        // what if method is not 'GET' - will execute "not implemented"
        
        response.writeHead(404, { 'Status-Code' : 'Not-Found' });
    }


    // Tell the server the response is complete and to close the connection

    response.end();


}).listen(port, () => {

    // Log text to the terminal once the server starts

    console.log(`Nodejs server started on port ${port}`)

});