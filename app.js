var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

function renderHomePage(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
			var data2 = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><title>LIRIBOT</title></head><body><div class="jumbotron"><h1>LIRI-bot results</h1></div><div class="container"><div class="row"><div class="col">` + data + `<form><div class="form-group row"><label for="command-input">command</label><input class="form-control" id="command" type="text"></div><div class="form-group row"><label for="parameter-input">parameter</label><input class="form-control" id="parameter" type="text" value=""></div><div class="form-group row"><div class="col-auto"><button class="btn btn-primary" id="submit-comment" type="submit">Submit</button></div></div></form></div></div></div></body></html>`;
            response.write(data2);
        }
        response.end();
    });
}

module.exports = {
  handleRequest: function(request, response) {
      response.writeHead(200, {'Content-Type': 'text/html'});

      var path = url.parse(request.url).pathname;
      switch (path) {
        case '/':
              renderHomePage('./results.html', response);
              break;
		case '/index':
              renderHomePage('./results.html', response);
              break;
		case '/index.html':
              renderHomePage('./results.html', response);
              break;
    /*    case '/login':
              renderHTML('./login.html', response);
              break;
	*/
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }

  }
};