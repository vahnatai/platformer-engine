require('dotenv').config();

const fs = require('fs').promises;
const fsconstants = require('fs').constants;
const http = require('http');
const mime = require('mime-types');
const path = require('path');
const process = require('process');

const server = http.createServer(async function (request, response) {
	const url = request.url === '/' ? '/index.html' : request.url;
	const relPath = path.join(...(
		url
			.replace(/\.\./g, '') // guard against directory snooping
			.split('/')
	));
	const fullPath = path.resolve(relPath);

	try {
		await fs.access(fullPath, fsconstants.F_OK);
	} catch (error){
		console.log('[404] ', url);
		console.error(error);
		response.writeHead(404);
		return response.end('No such file');
	}

	try {
		const contents = await fs.readFile(fullPath);
		const type = mime.lookup(fullPath);

		response.setHeader('Content-Type', type);
		response.writeHead(200);
		response.end(contents);
		console.log('[200] ', relPath);
	} catch (error) {
		console.log('[500] ', relPath);
		response.writeHead(500);
		console.log('error serving file ', error.message);
		return response.end('Internal error');
	}
});

server.listen(process.env.PORT);

console.log(`Serving on port ${process.env.PORT}`);

