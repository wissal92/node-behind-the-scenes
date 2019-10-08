//with Event Emitters we can set up multiple listeners for the same event

const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
    console.log('There was a new sale!')
});

myEmitter.on('newSale', () => {
    console.log('Costumer name: Wissal')
});

myEmitter.on('newSale', stock => {
    console.log(`there are ${stock} items left in stock`)
});

myEmitter.emit('newSale', 9)

//SERVER

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received!')
    res.end('Request received')
});

server.on('request', (req, res) => {
    console.log('Another request 😍');
});

server.on('close', () => {
    console.log('Server Closed!')
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...');
})
