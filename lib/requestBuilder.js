var http = require('http');


module.exports = new RequestBuilder();


function RequestBuilder()
{
	this.headers = {};
	this.method = 'GET';
	this.port = 80;
	this.data = {};
	this.secure = false;
	this.host = '';
	this.url = '/';
}

RequestBuilder.prototype.withHeaders = function(headers)
{
	this.headers = headers;
	return this;
}


RequestBuilder.prototype.withMethod = function(method)
{
	this.method = method;
	return this;
}

RequestBuilder.prototype.withData = function(data)
{
	this.data = data;
	return this;
}

RequestBuilder.prototype.withPort = function(port)
{
	this.port = port;
	return this;
}

RequestBuilder.prototype.isSecure = function(secure)
{
	this.secure = secure;
	return this;
}

RequestBuilder.prototype.makeRequest = function(host, url, endCallback)
{
	this.host = host;
	this.url = url;

	var client = http.createClient(this.port, this.host);
	var request = client.request(this.method, this.url, this.headers);
	request.on('response', function(response) {
    	var body = '';
    	response.on('data', function(chunk) {
			console.log(chunk);
            body += chunk;
  		});
  		    
  		response.on('end', function() {
            console.log(body);
            endCallback(body, response);
  		});
	});

	request.write(this.data);
	request.end();
}