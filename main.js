const { createServer } = require("http");
const { readFile } = require("fs");
const { join, extname: _extname } = require("path");

const server = createServer(function (request, response) {
    let filePath = join(__dirname, request.url === "/" ? "src/index.html" : request.url);

    const extname = _extname(filePath);
    let contentType = "text/html";

    switch (extname) {
        case ".html":
            contentType = "text/html";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".cjs":
            contentType = "text/javascript";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
        default:
            contentType = "text/plain";
    }

    readFile(filePath, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.end("File not found");
        } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(data);
        }
    });
});

server.listen(3000);
console.log("Server running at http://127.0.0.1:3000/");
