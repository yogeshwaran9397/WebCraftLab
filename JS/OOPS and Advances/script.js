// prototype
Person = function (name, birthYear) {
  this.Name = name;
  this.birthYear = birthYear;
};

const Yogesh = new Person("Yogesh", 1997);
const Bala = new Person("Bala", 1993);
console.log(Yogesh);

//prototype inheritance
Person.prototype.calAge = function () {
  console.log(2024 - this.birthYear);
};

Yogesh.calAge();
Bala.calAge();

// inheritance using the object.create
console.log("Leet Code");

//Leet Code
var createCounter = function (init) {
  let initialVal = init;

  return {
    increment: function () {
      return (initialVal = initialVal + 1);
    },
    decrement: function () {
      return (initialVal = initialVal - 1);
    },
    reset: function () {
      return (initialVal = init);
    },
  };
};

const counter = createCounter(5);
console.log(counter.increment());
console.log(counter.reset());
console.log(counter.decrement());

var filter = function (arr, fn) {
  let retArray = []; // Declared using let
  for (let i = 0; i < arr.length; i++) {
    const result = fn(arr[i], i);
    if (result === true) {
      retArray.push(arr[i]);
    }
  }
  return retArray;
};

const plusOne = function (n) {
  if (n + 1 === 0) {
    return false;
  } else {
    return true;
  }
};

const arryDAta = [-2, -1, 0, 1, 2];
console.log(filter(arryDAta, plusOne));

console.log("tobe and notTobe");

/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  return {
    toBe: function (tobeVal) {
      if (val === tobeVal) {
        return true;
      } else {
        return "Not Equal";
      }
    },
    notToBe: function (notToBeVal) {
      if (val !== notToBeVal) {
        return true;
      } else {
        return "Equal";
      }
    },
  };
};

console.log(expect(5).toBe(5));

//Callback
function Method1(callbackMethod) {
  console.log("Method 1");
  callbackMethod();
}

function Method2() {
  console.log("Method 2");
}

Method1(Method2);

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


//Prototype chaining 

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

function Devloper(name) {
  //console.log(name);
  Person.call(this, name);
}

Devloper.prototype = Object.create(Person.prototype);

var ObjPerson = new Person("Yogesh");
ObjPerson.greet();

var ObjDev = new Devloper("waran")
ObjDev.greet();


