var http = require('http');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('getRequest', function(data) {
	console.log(data);	
});

function getInfo(data) {
	event.emit('getRequest', data);
	return data.toString();
}

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('file', 'utf-8', function(err, data) {
		var info = '';

		if(err) {
			info += getInfo(err);
		}else {
			info += getInfo(data);
		}

		res.write('<h1>node.js</h1>');
		res.end('<p>' + info + '</p>');	
	})
}).listen(3000);
console.log('server is listening port 3000')

