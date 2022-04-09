var http = require('http');
http.createServer(function (request, response) {
    response.write('<h1>Hello Server<h1>');
    response.end('<p>Server Love<p>');
}).listen(8080, function () {
    console.log("READY!");
});
