// what  why  how  
// 
// agr code likh diya to wo turant chal jayega

// function add(a, b) {
//     return a + b;
// }
// console.log(add(5, 10)); // Output: 15
// this is called function declaration and statement


// let fun = function(a, b) {
//     return a + b;
// }

// console.log(fun(5, 10)); // Output: 15
// these is called function expressions



// fat arrow function
// fat arrow function is a more concise syntax for writing functions
// it is also called arrow function

// let fuc = (n1 ,n2) => {
//     return n1 * n2;
// }

// console.log(fuc( 10 ,20)); // Output: 15



// <------ parameter and arguments ------->

// function Gandmasti (name){
//     console.log(`${name} is a good boy`);
// }
// Gandmasti("Rohit"); // Output: Rohit
// Gandmasti ("ZAID"); // Output: zaid is good boy


// <------ Default parameters ------->


function add(v1 = 0 ,v2 = 0){
    return v1 + v2;
}
// console.log(add()); // Output: 0
// console.log(add(5)); // Output: 5
// console.log(add(5, 10)); // Output: 15

// <------ Rest parameters ------->

function sum(...args) {
    console.log(args); // Output: [1, 2, 3, 4, 5]
};

// sum(1, 2, 3, 4, 5); // Output: [1, 2, 3, 4, 5]


// <------ First class Function ------->


function shout(msg) {
return msg.toUpperCase();
}
function processMessage(fn) {
console.log(fn("hello"));
}
// processMessage(shout);


// <------ Higher-order functions ------->

function createMultiplier(x) {
return function (y) {
return x * y;
};
}
let double = createMultiplier(2);
console.log(double(8)); // 16

// <------ Closures ------->


function abcd(){
    let a = 10;
    return function() {
        console.log(a);
    }
}



