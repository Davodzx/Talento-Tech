// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// console.log("Hello World!")

let fs = require("fs");

fs.readFile("./info.txt", "utf-8", (err,data) =>{
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(data)
    }

})