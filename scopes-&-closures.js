///////////////////////////////Chapter 1///////////////////////////////
function foo(a) {
    console.log(a); //2
}
foo(2);

//Quiz
function foo(a) {
    const b = a;
    return a + b;
}
const c = foo(2);
//Question 1: Identify all the LHS lookups (#3):
//Answer: (a = 2), (b = ..), and (c = ..).
//Question 2: Identify all the RHS lookups (#4):
//Answer: (foo(2..), (= a;), (a + ..), and (.. + b).

//Nested Scope
function foo(a) {
    console.log(a + b);
}
const b = 2;
foo(2); //4

function foo(a) {
    console.log(a + b);
    b = a;
}
foo(2);
//Review:
//1. Scope is the set of rules that determine where and how a variable (identifier) can be looked up.
//2. LHS & RHS: a left-hand-side reference is used for assigning variables and a right-hand-side reference is used for retreiving a variable's value.
//3. An unfulfilled RHS reference will result in a "ReferenceError" being thrown. An unfulfilled LHS reference will result in the same if in "Strict Mode".

///////////////////////////////Chapter 2///////////////////////////////
function foo(a) {
    const b = a * 2;
    function bar(c) {
        console.log(a, b, c);
    }
    bar(b * 3);
}
foo(2); //2 4 12

function foo(str, a) {
    eval(str); //cheating!
    console.log(a, b);  
}
const b = 2;
foo('const b = 3;', 1); //1 3

function foo(str) {
    'use strict';
    eval(str);
    console.log(a) //ReferenceError: a is not defined.  
}
foo('const a = 2');

const obj = {
    a: 1,
    b: 2,
    c: 3,
};
//more "tedious" to repeat "obj".
obj.a = 2;
obj.b = 3;
obj.c = 4;
//"easier" short-hand.
with (obj) {
    a = 3;
    b = 4;
    c = 5;
}

function foo(obj) {
    with (obj) {
        a = 2;
    }
}
const o1 = {
    a: 3
};
const o2 = {
    b: 3
};
foo(o1);
console.log(o1.a); //2
foo(o2);
console.log(o2.a); //undefined
console.log(a); //2 --oops, leaked global!
//Review: 
//1. Lexical scope means that scope is defined by author-time decisions of where functions are declared. 
//2. The two mechanisms that can "cheat" lexical scope are eval() and "with". Eval() can modify existing lexical scope at runtime by evaluating a string of code which has one or more declarations in it. "with" creates a whole new lexical scope at runtime by treating the object reference as a "scope" and that object's properties as scoped identifiers.
//3. eval() and "with" will cause processing slow-downs and should not be used.

///////////////////////////////Chapter 3///////////////////////////////
function foo(a) {
    const b = 2;
    //some code
    function bar() {
        //...
    }
    const c = 3;
}

function doSomething(a) {
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
function doSomethingElse(a) {
    return a - 1;
}
var b;
doSomething(2); //15

function doSomething(a) {
    function doSomethingElse(a) {
        return a - 1;
    }
    var b;
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
doSomething(2); // 15

function foo() {
    function bar(a) {
        i = 3; //changing the "i" in the enclosing scope's for-loop.
        console.log(a + 1);
    }
    for (let i = 0; i < 10; i++) {
        bar(i * 2); //oops, infinite loop ahead!
    }
}
foo();

var MyReallyCoolLibrary = {
    awesome: 'stuff',
    doSomething: function() {
        // ...
    },
    doAnotherThing: function() {
        // ...
    }
};

let a = 2;
function foo() { // insert this
    let a = 3;
    console.log(a);  // 3
} //<-- and this
foo(); //<-- and this
console.log(a); // 2

let a = 2;
(function foo(){//<-- insert this
    let a = 3;
    console.log(a); //3
})(); //<-- and this
console.log(a); //2

setTimeout (function(){
    console.log("I waited for 1 second!");
}), 1000);

setTimout(function timeoutHhandler(){ // <-- look, I have a name!
    console.log("I waited 1 second!");
}, 1000);

let a = 2;
(function foo(){
    let a = 3;
    console.log(a); // 3
})();
console.log(a); // 2

let a = 2;
(function IIFE(){
    let a = 3;
    console.log(a); // 3
})();
console.log(a); // 2

let a = 2;
(function IIFE(global){
    let a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
})(window);
console.log(a); // 2

undefined = true; // setting a land-mine for other code! avoid!
(function IIFE(undefined){
    let a;
    if (a === undefined) {
        console.log('Undefined is safe here!');
    }
})();

let a = 2;
(function IIFE(def){
    def(window);
})(function def(global){
    let a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
});

for (let i = 0; i < 10; i++) {
    console.log(i);
}

let foo = true;
if (foo) {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}

try {
    undefined(); // illegal operation to force an exception!
}
catch(err) {
    console.log(err); // works!
}
console.log(err); //ReferenceError: `err` not found.

var foo = true;
if (foo) {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}
console.log(bar); //ReferenceError.

var foo = true;
if (foo){
    { //<-- explicit block
        let bar = foo * 2;
        bar = something(bar);
        console.log(bar);
    }
}
console.log(bar); //ReferenceError

{
    console.log(bar); //ReferenceError!
    let bar = 2;
}

function process(data) {
    //do something interesting
}
var someReallyBigData = {..};
process(someReallyBigData);
var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt){
    console.log(('button clicked');
}, /*capturingPhase*/false);

function process(data) {
    //do something interesting
}
//anything declared inside this block can go away after!
{
    let someReallyBigData = {..};
    process(someReallyBigData);
}
var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt){
    console.log(('button clicked');
}, /*capturingPhase*/false);

for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i); //ReferenceError

{
    let j;
    for (j = 0; j < 10; j++) {
        let i = j; //re-bound for each iteration!
        console.log(i);
    }
}

var foo = true, baz = 10;
if (foo) {
    var bar = 3;
    if (baz > bar) {
        console.log(baz);
    }
    // ...
}

var foo = true, baz = 10;
if (foo) {
    var bar = 3;
    // ...
}
if (baz > bar) {
    console.log(baz);
}

var foo = true, baz = 10;
if (foo) {
    let bar = 3;
    if (baz > bar) { //<-- don't forget `bar` when moving!
    console.log(baz);
    }
}

var foo = true;
if (foo) {
    var a = 2;
    const b = 3; //block-scoped to the containing "if"
    a = 3; //just fine!
    b = 4; //error!
}
console.log(a); // 3
console.log(b); // ReferenceError!

//Review:
//1. Variables and functions that are declared inside another function are essentially hidden from any enclosing scopes.
//2. in the try/catch structure, the catch clause has block-scope.
//3. "var" should still be used when appropriate for function-scope techniques.

///////////////////////////////Chapter 4///////////////////////////////
a = 2;
var a;
console.log(a); // 2

console.log(a); // undefined
var a = 2;

foo();
function foo(){
    console.log(a); // undefined
    var a = 2;
}

function foo() {
    var a;
    console.log(a); // undefined
    a = 2;
}
foo();

foo(); //not ReferenceError, but TypeError!
var foo = function bar() {
    // ...
};

foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
    // ...
};

var foo;

foo(); // TypeError
bar(); // ReferenceError
foo = function() {
    var bar = ...self...
    // ...
}

foo(); // 1
var foo;
function foo() {
    console.log(1);
}
foo = function() {
    console.log(2);
};

function foo() {
    console.log(1);
}
foo(); // 1
foo = function() {
    console.log(2);
};

foo(); // 3
function foo() {
    console.log(1);
}
var foo = function() {
    console.log(2);
};
function foo() {
    console.log(3);
}

//Review:
//1. "var a = 2" is actually 2 statements, the first (var a) is a compiler-phase task and the second (a = 2) is an execution-phase task.
//2. Hoisting: All declarations in a scope are processed first before the code itself is executed. 
//3. Declarations are hoisted, but assignments are not.

///////////////////////////////Chapter 5///////////////////////////////
function foo() {
    var a = 2;
    function bar() {
        console.log(a); // 2
    }
    bar();
}
foo();

function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); // 2 -- Whoa, closure was just observed man.

function foo() {
    var a = 2;
    function baz() {
        console.log(a); // 2
    }
    bar(baz);
}
function bar(fn) {
    fn(); // look ma, I saw closure!
}

var fn;
function foo() {
    var a = 2;
    function baz() {
        console.log(a);
    }
    fn = baz; //assign `baz` to global variable
}
function bar() {
    fn(); // look ma, I saw closure!
}
foo();
bar(); //2

function wait(message) {
    setTimout( function timer() {
        console.log(message);
    }, 1000);
}
wait("Hello, Closure!");

function setupBot(name, selector) {
    $(selector).click(function activator(){
        console.log("Activating: " + name);
    });
}
setupBot('Closure Bot 1', '#bot_1');
setupBot('Closure Bot 2', '#bot_2');

var a = 2;
(function IIFE(){
    console.log(a);
})();

for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(){
        console.log(i);
    }, i * 1000);
}

for (var i = 1; i <= 5; i++) {
    (function(){
        setTimout(function timer(){
            console.log(i);
        }, i * 1000);
    })();
}

for (var i = 1; i <= 5; i++) {
    (function(j){
        setTimout(function timer(){
            console.log(j);
        }, j * 1000);
    })(i);
}

for (var i = 1; i <= 5; i++) {
    let j = i; //yay, block-scope for closure!
    setTimout(function timer(){
        console.log(j);
    }, j * 1000);
}

for (let i = 1; i <= 5; i++) {
    setTimout(function timer(){
        console.log(i);
    }, i * 1000);
}

function foo() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
}

function coolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = coolModule();
foo.doSomething(); // cool
foo.doAnother(); //1 ! 2 ! 3

var foo = (function coolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
foo.doSomething(); // cool
foo.doAnother(); //1 ! 2 ! 3

function coolModule(id) {
    function identify() {
        console.log(id);
    }
    return {
        identify: identify
    };
}
var foo1 = coolModule('foo 1');
var foo2 = coolModule('foo 2');
foo1.identify(); //'foo 1'
foo2.identify(); //'foo 2'

var foo = (function coolModule(id) {
    function change() {
        //modifying the public API
        publicAPI.identify = identify2;
    }
    function identify() {
        console.log(id);
    }
    function identify2() {
        console.log(id.toUpperCase());
    }
    var publicAPI = {
        change: change,
        identify: identify1
    };
    return publicAPI;
})('foo module');
foo.identify(); //foo module
foo.change();
foo.identify(); //FOO MODULE

var MyModules = (function Manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    return {
        define: define,
        get: get
    };
})();

MyModules.define('bar', [], function(){
    function hello(who) {
        return 'Let me introduce: ' + who;
    }
    return {
        hello: hello
    };
});
MyModules.define('foo', ['bar'], function(bar){
    var hungry = 'hippo';
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    };
});
var bar = MyModules.get('bar');
var foo = MyModules.get('foo');
console.log(
    bar.hello('hippo')
); //Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO

//bar.js
function hello(who) {
    return 'let me introduce: ' + who;
}
export hello;
//foo.js
//import only `hello()` from the "bar" module.
import hello from "bar";
var hungry = 'hippo';
function awesome() {
    console.log(
        hello(hungry).toUpperCase()
    );
}
export awesome;
//import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";
console.log(
    bar.hello('rhino')
); //Let me introduce: rhino
foo.awesome(); //LET ME INTRODUCE: HIPPO

//Review:
//1. Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.
//2. Modules require two key characteristics. The first is an outer wrapping function being invoked, to create the enclosing scope, the second, the return value of the wrapping function must include reference to at least one inner function that then has closure over the private inner scope of the wrapper.