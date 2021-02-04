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

// function getBody(request) {
//     let body = '';

//     request.on('error', (err) => {

//         console.error(err);

//     }).on('data', (chunk) => {

//         body += chunk;

//     }).on('end', () => {

//         body = JSON.parse(body);

//     });
// }

http.createServer((request, response) => {

    // check the request url and method

    const { headers, method, url } = request;

    if(url === '/todos') {

        if(method == 'GET') {
            // Set response status code and response headers

            response.writeHead(200, { 'Content-Type': 'text/html' });

            // Set response body i.e, data to be sent

            response.write(getTodoList());

        } else if(method == 'POST') {

            response.writeHead(201);

            // add a new item

            let body = '';

            request.on('error', (err) => {

                console.error(err);

            }).on('data', (chunk) => {

                body += chunk;

            }).on('end', () => {

                body = JSON.parse(body);

                todoList.push(body.name);

                // console.log(body);

            });

            console.log(body);

        } else if(method == 'DELETE') {

            response.writeHead(204);

            // find and remove the item

            let body = '';

            request.on('error', (err) => {

                console.error(err);

            }).on('data', (chunk) => {

                body += chunk;

            }).on('end', () => {

                body = JSON.parse(body);

                let todoDelete = body.name;

                for(let i in todoList) {    

                    if(todoList[i] === todoDelete) {
    
                        todoList.splice(i, 1);
    
                        break;
                 
                    }
    
                }

                // console.log(body);

            });

        } else {
            
            response.writeHead(501);

        }
    } else {

        response.writeHead(404);

    }            

    // Tell the server the response is complete and to close the connection

    response.end();


}).listen(port, () => {

    // Log text to the terminal once the server starts

    console.log(`Nodejs server started on port ${port}`)

});