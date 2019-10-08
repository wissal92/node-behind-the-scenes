const fs = require('fs');
const crypto = require("crypto");

const start = Date.now();

//how to change the size of the THREAD-POOL
process.env.UI_THREADPOOL_SIZE = 4;

//timer callback
setTimeout(() => console.log('Timer 1 finished'), 0);

//setImmediate callbacks
setImmediate(() => console.log('Immediate 1 finished'));

//I/O polling and callbacks
fs.readFile("test-file.txt", () => {
    console.log('I/O finished');
    console.log('**************************')
    setTimeout(() => console.log('Timer 1 finished'), 0);
    setTimeout(() => console.log('Timer 2 finished'), 3000);
   setImmediate(() => console.log('Immediate 1 finished'));
   process.nextTick(() => console.log('Process.nextTick'));
   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
       console.log(Date.now() - start, 'Password 1 encrypted')
   })
   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
       console.log(Date.now() - start, 'Password 2 encrypted')
   })
   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
       console.log(Date.now() - start, 'Password 3 encrypted')
   })
   crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', ()=>{
       console.log(Date.now() - start, 'Password 4 encrypted')
   })
});

//TOP LEVEL CODE
console.log('Hello from the top-level code')