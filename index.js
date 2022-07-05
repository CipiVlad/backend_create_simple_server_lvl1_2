//import modules
const fs = require("fs");
const http = require("http");

// sync fs read ---> stops process because of error
const errorHtml = fs.readFileSync("assets/error.html");

//function for send html content or error page
function sendFileOrError(path, response) {
  fs.readFile(path, (err, data) => {
    if (err) {
      response.end(errorHtml);
      return;
    }
    response.end(data.toString());
  });
}

// create server instance
const server = http.createServer((request, response) => {
  console.log("neue request", request.method, request.url);

  //logic // call function
  if (request.url === "/") {
    sendFileOrError("assets/index.html", response);
  } else {
    const filePath = "assets" + request.url;
    sendFileOrError(filePath, response);
  }
});
const PORT = 9000;
server.listen(PORT, () => console.log("server listening on port:", PORT));
