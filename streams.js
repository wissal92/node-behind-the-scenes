const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1 without streams if the data is big and we have a lot of request our app will crash:
    fs.readFile('test-file.txt', (err, data) =>{
        if(err) console.log(err);
        res.end(data);
    });

    //Solution2: we don't need to read data from the file and store into a variable
    //and store it in memory instead we create a readable stream then as we receive 
    //each chunk of the data we send it to the client as a responce.
    //each time there is a piece of data that we can consume, a readable stream
    //emits the data event.
    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', chunk => {
        res.write(chunk);
    });
    readable.on('end', () => {
        res.end();
    });
    readable.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end('file not found!');
    });

    //solution 3 : using the pipe operator which is available on all readable streams
    //and it allows us to pipe the output of a readable stream right into the
    //input of a writable stream. and that would fix the problem of backpressure(by
    //handling the speed of the data coming in and the data coming out)
    // => readableSource.pipe(writableDestination)
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000')
})

//**********************/
//BACK PRESSURE
//***********************/

//it happens when the response cannot send the data nearly as fast as it is received
//to solve this problem we use the third solution(using the pipe operator)