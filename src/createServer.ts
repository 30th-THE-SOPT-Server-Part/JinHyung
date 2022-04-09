const http = require('http');

http.createServer((request: any, response: any) => {
    response.write('<h1>Hello Server<h1>');
    response.end('<p>Server Love<p>');
}).listen(8080, () => {
    console.log("READY!")
})