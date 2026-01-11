# JavaScript Topics Documentation

This document covers all the JavaScript topics from the JS folder with explanations, use cases, and example code.

## Table of Contents

1. [Variables and Data Types](#1-variables-and-data-types)
2. [Template Literals](#2-template-literals)
3. [Conditional Statements](#3-conditional-statements)
4. [Ternary Operator](#4-ternary-operator)
5. [Logical Operators](#5-logical-operators)
6. [Functions](#6-functions)
7. [Arrays](#7-arrays)
8. [Objects](#8-objects)
9. [Loops](#9-loops)
10. [Random Numbers](#10-random-numbers)
11. [Hoisting and Temporal Dead Zone](#11-hoisting-and-temporal-dead-zone)
12. [Spread Operator](#12-spread-operator)
13. [Array Methods](#13-array-methods)
14. [This Keyword](#14-this-keyword)
15. [For...of Loop](#15-forof-loop)
16. [Map](#16-map)
17. [Higher-order Functions](#17-higher-order-functions)
18. [Call, Apply, Bind](#18-call-apply-bind)
19. [Closures](#19-closures)
20. [Prototypes and Inheritance](#20-prototypes-and-inheritance)
21. [Callbacks](#21-callbacks)
22. [Promises](#22-promises)
23. [DOM Manipulation](#23-dom-manipulation)
24. [Event Handling](#24-event-handling)

---

## 1. Variables and Data Types

### What is it?
Variables are containers for storing data values. JavaScript has different data types to store different kinds of information.

### Why do we need it?
Variables allow us to store and manipulate data in our programs. Different data types help us work with numbers, text, boolean values, etc.

### Example Code:
```javascript
// Constants - cannot be changed
const a = "yogesh";
// a ="Yogesh1" //Error
console.log(a);

// Let - can be changed
let b = 1;
console.log(b);

// Different data types
let number = 1; //number
console.log(typeof number);

number = "1"; //string
console.log(typeof number);

number = undefined; // undefined
console.log(typeof number);

number = true; //bool
console.log(typeof number);

number = null; //null
console.log(typeof number);
```

---

## 2. Template Literals

### What is it?
Template literals are strings that allow embedded expressions and multi-line strings using backticks (`).

### Why do we need it?
Template literals make string concatenation easier and more readable, especially when combining variables with text.

### Example Code:
```javascript
const name = "Yogesh";
const age = 20;
const stringDesc = `I'm ${name} my age is ${age}`;
console.log(stringDesc);
```

---

## 3. Conditional Statements

### What is it?
Conditional statements allow us to execute different code blocks based on different conditions.

### Why do we need it?
We need conditionals to make decisions in our programs based on different scenarios or user inputs.

### Example Code:
```javascript
//If and Else 
const num = 10;
if (num < 10)
    console.log("number is lesser than 10");
else if (num > 10)
    console.log("number is greater than 10");
else
    console.log("number is == 10");
```

---

## 4. Ternary Operator

### What is it?
The ternary operator is a shorthand way of writing simple if-else statements in a single line.

### Why do we need it?
It makes our code more concise and readable for simple conditional operations.

### Example Code:
```javascript
//Ternary
const personage = 18;
personage >= 18 ? console.log("Person can drink 👍") : console.log("Person should not drink 🚫");
```

---

## 5. Logical Operators

### What is it?
Logical operators are used to combine or modify boolean values (&&, ||, !).

### Why do we need it?
Logical operators help us create complex conditions by combining multiple boolean expressions.

### Example Code:
```javascript
const Yes = true;
const No = false;
console.log(Yes && Yes); // true
console.log(Yes && No);  // false
```

---

## 6. Functions

### What is it?
Functions are reusable blocks of code that perform specific tasks. They can take inputs (parameters) and return outputs.

### Why do we need it?
Functions help us organize code, avoid repetition, and create modular programs.

### Example Code:
```javascript
//Function declaration
const value = Add(1, 2);
console.log(value);

//Function
function Add(a, b) {
  return a + b;
}

//Function Expression
const value2 = function (a, b) {
  return a + b;
};

let outVal = value2(1, 2); // this call shld be after Func Expression
console.log(outVal);

//Arrow Function
const value3 = (a, b, c) => (a + b) / c;
const outVal3 = value3(1, 2, 1);
console.log(outVal3);
```

---

## 7. Arrays

### What is it?
Arrays are ordered collections of items (elements) that can store multiple values in a single variable.

### Why do we need it?
Arrays help us store and manage lists of related data efficiently.

### Example Code:
```javascript
//Array
const friends = ["Yogesh", "Balaji", "Bala"];
console.log(friends);

console.log(friends[0]);
console.log(friends[1]);

friends.unshift("Gokul"); //add in first
friends.push("Saai"); //add in last
console.log(friends);

friends.pop(); // remove from last
friends.shift(); // remove from first
console.log(friends);

console.log(friends.length);

if (friends.includes("Yogesh")) {
  console.log("friends contain Yogesh 👀");
} else {
  console.log("friends not contain Yogesh");
}

// Array manipulation
const array = [1, 2, 3, 4, 5];
array.splice(0, 2, "a", "b");
console.log(array); // a b 3 4 5

const array2 = [1, 2, 3, 4, 5];
const data = array2.slice(0, 2);
console.log(data); //1 2
```

---

## 8. Objects

### What is it?
Objects are collections of key-value pairs that represent entities with properties and methods.

### Why do we need it?
Objects help us model real-world entities and organize related data and functionality together.

### Example Code:
```javascript
//Objects
Person = {
  FirstName: "Yogesh",
  LastName: "V",
  Address: `3rd Cross, Blr-57`,
  Company: `GRL`,
  friends: ["Bala", "Balaji", "Gokul"],
  DOB: 1997,
};

console.log(
  `${Person.FirstName} ${Person.LastName} ✔ is from ${Person.Address} who is working in ${Person.Company} having friends ${Person.friends[0]}, ${Person.friends[1]}`
);

//Add Education
Person.Education = `Masters`;
console.log(`${Person.Education}`);

Person["Salary"] = 10000000;
console.log(`${Person["Salary"]}`);

// Object with methods
const person = {
    name: 'John',
    age: 30,
    isEmployed: true,
    greet: function() {
      console.log('Hello, my name is ' + this.name);
    }
};
  
//Access 
console.log(person.name);
person.greet();
```

---

## 9. Loops

### What is it?
Loops allow us to repeat code blocks multiple times without writing the same code over and over.

### Why do we need it?
Loops help us automate repetitive tasks and process collections of data efficiently.

### Example Code:
```javascript
// For loop
const arrayData = [];
for (let a = 0; a <= 10; a++) {
  arrayData[a] = a;
}

// While loop
let arrayDataStr = "";
let count = 0;
while (count < arrayData.length) {
  arrayDataStr = arrayDataStr + arrayData[count];
  count++;
}
console.log(arrayDataStr);
```

---

## 10. Random Numbers

### What is it?
Random number generation creates unpredictable numbers within a specified range.

### Why do we need it?
Random numbers are essential for games, simulations, and creating unpredictable behavior in applications.

### Example Code:
```javascript
//Random
function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log(Random(0, 10));

// For coin flip project
let randomNum = Math.floor(Math.random() * 2);

// For guess the number game
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}
```

---

## 11. Hoisting and Temporal Dead Zone

### What is it?
Hoisting is JavaScript's behavior of moving variable declarations to the top of their scope. The Temporal Dead Zone is the area where let/const variables exist but cannot be accessed.

### Why do we need it?
Understanding hoisting helps us write better code and avoid common bugs related to variable access.

### Example Code:
```javascript
//Hoisting and TDZ
const name = "Yogesh";

if (name === "Yogesh") {
  //console.log(`Yogesh job is ${job}`); //uncomment this and you will get -  Uncaught ReferenceError: Cannot access 'job' before initialization
  var age = 28;
  const job = "Engineer";
}
console.log(`age is ${age}`); // age will be access as var is function scoped
//console.log(`job is ${job}`);//uncomment this and you will get -  Uncaught ReferenceError: job is not defined
```

---

## 12. Spread Operator

### What is it?
The spread operator (...) allows us to expand arrays or objects into individual elements.

### Why do we need it?
The spread operator makes it easy to combine arrays, copy arrays, and pass array elements as function arguments.

### Example Code:
```javascript
//Spread Operator
let array0 = [1, 2, 3, 4];
let array1 = [5, 6, 7, 8];

let combinedArray = [...array0, ...array1];
console.log(`array0: (${array0}) + array1: (${array1}) \n= ${combinedArray}`);

// Remove duplicates using spread and Set
let arrayWithDupl = [1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 7, 8];
console.log(...new Set(arrayWithDupl));
```

---

## 13. Array Methods

### What is it?
Array methods are built-in functions that help us manipulate and work with arrays efficiently.

### Why do we need it?
Array methods provide powerful tools for filtering, transforming, and processing data collections.

### Example Code:
```javascript
let array = [1,2,3,4];

// Map - transform each element
let mapArray = array.map(x=>x * 2);
console.log(mapArray);

// Reduce - combine all elements into single value
function myFunc(a, b) {
    return a - b;
}

let arryReduce = array.reduce(myFunc);
console.log(arryReduce);

// Array manipulation methods
array.shift(); // remove from first 
array.unshift(1); // add to first 
array.pop(); // remove from last
array.push(4); // add to last
```

---

## 14. This Keyword

### What is it?
The 'this' keyword refers to the object that is executing the current function.

### Why do we need it?
'This' allows us to access object properties and methods from within the object, making our code more flexible and reusable.

### Example Code:
```javascript
let sampleObj = {
  Name: "Yogesh",
  Age: 25,

  normalAccess: function normalAccess() {
    console.log(this.Name); // 'this' refers to sampleObj
  },

  arrowAccess: () => {
    console.log(this.Name); // 'this' does not refer to sampleObj in arrow functions
  },
};

sampleObj.normalAccess(); // Yogesh
sampleObj.arrowAccess(); // undefined
```

---

## 15. For...of Loop

### What is it?
The for...of loop iterates over iterable objects like arrays, strings, maps, etc.

### Why do we need it?
For...of provides a clean and simple way to iterate through collections without dealing with indexes.

### Example Code:
```javascript
//for of loop
const nameValue = "Yogesh";
for (const char of nameValue) console.log(char);

const myMap = new Map();
myMap.set("Y", 1);
myMap.set("o", 2);
myMap.set("g", 3);

for (const [key, value] of myMap) {
  console.log(`${key} - ${value}`);
}
```

---

## 16. Map

### What is it?
Map is a collection that holds key-value pairs where keys can be of any type.

### Why do we need it?
Maps provide better performance for frequent additions and removals of key-value pairs compared to objects.

### Example Code:
```javascript
const myMap = new Map();
myMap.set("Y", 1);
myMap.set("o", 2);
myMap.set("g", 3);
myMap.set("e", 4);
myMap.set("s", 5);
myMap.set("h", 6);

for (const [key, value] of myMap) {
  console.log(`${key} - ${value}`);
}
```

---

## 17. Higher-order Functions

### What is it?
Higher-order functions are functions that accept other functions as arguments or return functions.

### Why do we need it?
They enable functional programming patterns and create more flexible, reusable code.

### Example Code:
```javascript
//function returning another function
function normalFunction1(greeting) {
  return function normalFunction2(name) {
    console.log(`${greeting} ${name}`);
  };
}

// Arrow function version
Function1 = (greeting) => {
  return (Function2 = (name) => {
    console.log(`${greeting} ${name}`);
  });
};

console.log(Function1("Hey")); // will return a function

func1 = Function1("Hey");
console.log(func1("JavaScript")); // will log the greeting
```

---

## 18. Call, Apply, Bind

### What is it?
Call, apply, and bind are methods that allow us to set the 'this' value explicitly when invoking functions.

### Why do we need it?
These methods help us borrow methods from one object for use with another object, enabling code reusability.

### Example Code:
```javascript
Indigo = {
  Name: "Indigo",
  FlightNumber: "481",
  returnString: function Book(Name) {
    console.log(`${Name}, Booked ${this.FlightNumber} - ${this.Name}`);
  },
};

AirIndia = {
  Name: "AirIndia",
  FlightNumber: "547",
};

let booking = Indigo.returnString;

//call method - immediately invokes function
booking.call(AirIndia, "Andy");

//apply method - immediately invokes function with array of arguments
booking.apply(AirIndia, ["Mark"]);

//bind method - returns a new function
const book = booking.bind(AirIndia);
book("Sam");
```

---

## 19. Closures

### What is it?
A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing.

### Why do we need it?
Closures help us create private variables, maintain state, and create specialized functions.

### Example Code:
```javascript
function OuterFunction(OuterValue){
    console.log('Trigger');
    let tempVal = 1;
  return function InnerFunction(InnerValue)  {
    console.log('OuterVal - ', OuterValue);
    console.log('InnerVal - ', InnerValue);
    console.log('tempVal - ', tempVal);
    tempVal = tempVal + 1; // maintains state between calls
  }
}

const value = OuterFunction(1);
value(2); // tempVal will be 2
value(2); // tempVal will be 3
value(2); // tempVal will be 4

const value2 = OuterFunction(1);
value2(2); // tempVal starts fresh at 2
```

---

## 20. Prototypes and Inheritance

### What is it?
Prototypes allow objects to inherit properties and methods from other objects. It's JavaScript's way of implementing inheritance.

### Why do we need it?
Prototypes enable code reusability and help us create object hierarchies without duplicating code.

### Example Code:
```javascript
// Prototype
Person = function (name, birthYear) {
  this.Name = name;
  this.birthYear = birthYear;
};

const Yogesh = new Person("Yogesh", 1997);
const Bala = new Person("Bala", 1993);

//prototype inheritance
Person.prototype.calAge = function () {
  console.log(2024 - this.birthYear);
};

Yogesh.calAge();
Bala.calAge();

// Prototype chaining
function Developer(name) {
  Person.call(this, name);
}

Developer.prototype = Object.create(Person.prototype);

var ObjPerson = new Person("Yogesh");
ObjPerson.greet();

var ObjDev = new Developer("waran");
ObjDev.greet();
```

---

## 21. Callbacks

### What is it?
A callback is a function that is passed as an argument to another function and is executed at a later time.

### Why do we need it?
Callbacks enable asynchronous programming and allow us to specify what should happen after a certain operation completes.

### Example Code:
```javascript
//Callback
function Method1(callbackMethod) {
  console.log("Method 1");
  callbackMethod();
}

function Method2() {
  console.log("Method 2");
}

Method1(Method2);
```

---

## 22. Promises

### What is it?
Promises represent the eventual completion or failure of an asynchronous operation and its resulting value.

### Why do we need it?
Promises help us handle asynchronous operations more elegantly than callbacks and avoid callback hell.

### Example Code:
```javascript
//promise
function ResolveMethod(value) {
  console.log(`Resolve - ${value}`);
}
function ErrorMethod(value) {
  console.log(`Error - ${value}`);
}

let promise = new Promise(function (myResolve, myError) {
  let x = 0;
  if (x == 0) {
    myResolve(x);
  } else {
    myError(x);
  }
});

promise.then(ResolveMethod, ErrorMethod);
```

---

## 23. DOM Manipulation

### What is it?
DOM (Document Object Model) manipulation involves changing the structure, content, or style of web pages using JavaScript.

### Why do we need it?
DOM manipulation allows us to create dynamic, interactive web pages that respond to user actions.

### Example Code:
```javascript
// From Flip a Coin project
document.querySelector('.flip').addEventListener('click',function()
{
    if(randomNum === 1)
    {
        document.querySelector('.coinImage').setAttribute('src','Images/head.jpg');
    }
    else 
    {
        document.querySelector('.coinImage').setAttribute('src','Images/tail.jpg');
    }
});

// From Guess the Number project
function UpdateHelloWorld() {
  var element = document.getElementById("h1Hello");
  if (element.textContent === "Hello Yogesh!")
    element.textContent = "Hello World!";
  else element.textContent = "Hello Yogesh!";
}
```

---

## 24. Event Handling

### What is it?
Event handling involves responding to user interactions like clicks, key presses, form submissions, etc.

### Why do we need it?
Event handling makes web pages interactive and responsive to user actions.

### Example Code:
```javascript
// Click event handling
document.querySelector(".check").addEventListener("click", function () {
  const guessNumber = Number(document.querySelector(".guess").value);
  if (!guessNumber || isNaN(guessNumber)) {
    document.querySelector(".message").textContent = "Invalid Number 🚫";
  } else {
    // Game logic here
  }
});

// Keyboard event handling
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    again(); // Reset game
  }
});

// Dynamic element creation and event handling (TODO project)
document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.getElementsByClassName("btn-add-task");
  
  for (var i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", function (event) {
      var taskDesc = document.querySelector(".task-desc").value;
      if (taskDesc === "") {
        alert("Enter Task Description before clicking Add");
        return;
      }
      // Add task logic here
    });
  }
});
```

---

## Projects Covered

### 1. Flip a Coin Game
- **Purpose**: Demonstrates random number generation and DOM manipulation
- **Key Concepts**: Math.random(), event listeners, DOM element manipulation

### 2. Guess the Number Game
- **Purpose**: Interactive game with user input validation and feedback
- **Key Concepts**: Event handling, input validation, conditional logic, DOM updates

### 3. TODO Application
- **Purpose**: Full-featured task management application
- **Key Concepts**: Array manipulation, object handling, dynamic DOM creation, event delegation, local data management

---

## Summary

This documentation covers fundamental to advanced JavaScript concepts including:

- **Basic Programming**: Variables, data types, operators, conditionals
- **Functions**: Different function types, scope, closures, higher-order functions
- **Data Structures**: Arrays, objects, maps
- **Object-Oriented Programming**: Prototypes, inheritance, this keyword
- **Asynchronous Programming**: Callbacks, promises
- **Web Development**: DOM manipulation, event handling
- **Modern JavaScript**: Spread operator, template literals, for...of loops

Each concept is explained with simple terms, practical use cases, and real code examples from your learning projects.