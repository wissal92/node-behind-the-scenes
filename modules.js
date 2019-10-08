//every module is wrapped in an IIFE By loging the arguments we proved that  
//we are inside a function
console.log(arguments);

//we also have access in every module to:
//exports, require, module, __filename, __dirname => they are like global varables that are injected in every module and to prove that we just run this code:
console.log(require('module').wrapper);

//********************/
//MODULE.EXPORTS 
//*******************/

const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

//***************/
//EXPORTS: 
//**************/

const {add, multiply, divide} = require('./test-module-2');
console.log(multiply(2, 5));

//***************/
//CACHING: 
//**************/

//we get 'hello from the module' just once but 3 times 'this beautiful text'
//because of cashing we get the result of the second and third functions from 
//node 's process cache instead of running the whole file each time.

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();


//our code is wraped in a function so that every module has its own scope.