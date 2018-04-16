///////////////////////////////Chapter 1///////////////////////////////
function identify() {
    return this.name.toUpperCase();
}
function speak() {
    var greeting = `Hello, I'm ${identify.call(this)}`;
}
var me = {
    name: 'Kyle'
};
var you = {
    name: "Reader"
};
identify.call(me); //KYLE
identify.call(you); //READER
speak.call(me); //Hello, I'm KYLE
speak.call(you); //Hello, I'm READER

function identify(context) {
    return context.name.toUpperCase();
}
function speak(context) {
    var greeting = `Hello, I'm ${identify(context)}`;
}
identify(you); //READER
speak(me); //Hello, I'm KYLE

function foo(num) {
    console.log(`foo: ${num}`);
    //keep track of how many times `foo` is called
    this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9
//how many times was `foo` called?
console.log(foo.count); // 0 --WTF?

function foo(num) {
    console.log(`foo: ${num}`);
    //keep track of how many times `foo` is called
    data.count++;
}
var data = {
    count: 0
};
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9
//how many times was `foo` called?
console.log(data.count); // 4

function foo() {
    foo.count = 4; //`foo` refers to itself
}
setTimout(function(){
    //anonymous function (no name), cannot refer to itself
}, 10);

function foo(num) {
    console.log(`foo: ${num}`);
    //keep track of how many times `foo` is called
    foo.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9
//how many times was `foo` called?
console.log(foo.count); // 4

function foo(num) {
    console.log(`foo: ${num}`);
    //keep track of how many times `foo` is called
    //Note: `this` IS actually `foo` now, based on how `foo` is called (see below)
    this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        //using `call(..)`, we ensure the `this` points at the function object (`foo`) itself
        foo.call(foo, i);
    }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9
//how many times was `foo` called?
console.log(foo.count); // 4

function foo() {
    var a = 2;
    this.bar();
}
function bar() {
    console.log(this.a);
}
foo(); //undefined

//Review:
//1. "this" is neither a reference to the function itself, nor is it a reference to the function's lexical scope.
//2. "this" is actually a binding that is made when a function is invoked.

///////////////////////////////Chapter 2///////////////////////////////
function baz() {
    //call-stack is: `baz`
    //so, our call-site is in the global scope
    console.log('baz');
    bar(); //<-- call-site for `bar`
}
function bar() {
    //call-stack is: `baz` -> `bar`
    //so, our call-site is in `baz`
    console.log('bar');
    foo(); //<-- call-site for `foo`
}
function foo() {
    //call-stack is: `baz` -> `bar` -> `foo`
    //so, our call-site is in `bar`
    console.log('foo');
}
baz(); // <-- call-site for `baz`

function foo() {
    console.log(this.a);
}
var a = 2;
foo(); // 2

function foo() {
    'use strict';
    console.log(this.a);
}
var a = 2;
foo(); // TypeError: `this` is `undefined`

function foo() {
    console.log(this.a);
}
var a = 2;
(function(){
    'use strict';
    foo(); // 2
})();

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2

function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; //function reference/alias!
var a = 'oops, global'; // `a` also property on global object
bar(); //'oops, global'

function foo() {
    console.log(this.a);
}
function doFoo(fn) {
    //`fn` is just another reference to `foo`
    fn(); //<-- call-site
}
var obj = {
    a: 2,
    foo: foo
};
var a = 'oops, global'; // `a` also property on global object
doFoo(obj.foo); //'oops, global'

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var a = 'oops, global'; // `a` also property on global object
setTimout(obj.foo, 100); //'oops, global'

function setTimout(fn, delay) {
    //wait (somehow) for `delay` milliseconds
    fn(); //<-- call-site!
}

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
}
foo.call(obj); // 2

function foo() {
	console.log(this.a);
}
var obj = {
	a: 2
};
var bar = function() {
	foo.call(obj);
};
bar(); // 2
setTimeout(bar, 100); // 2
// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call(window); // 2

function foo(something) {
	console.log(this.a, something);
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = function() {
	return foo.apply(obj, arguments);
};
var b = bar(3); // 2 3
console.log(b); // 5

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5

function foo(el) {
	console.log( el, this.id );
}
var obj = {
	id: 'awesome'
};
// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach(foo, obj); // 1 awesome  2 awesome  3 awesome

function foo(a) {
	this.a = a;
}
var bar = new foo(2);
console.log(bar.a); // 2

function foo() {
	console.log(this.a);
}
var obj1 = {
	a: 2,
	foo: foo
};
var obj2 = {
	a: 3,
	foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

function foo(something) {
	this.a = something;
}
var obj1 = {
	foo: foo
};
var obj2 = {};
obj1.foo(2);
console.log(obj1.a); // 2
obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3
var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4

function bind(fn, obj) {
	return function() {
		fn.apply(obj, arguments);
	};
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments))
				);
			}
		;
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

this instanceof fNOP &&
oThis ? this : oThis
// ... and:
fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();

function foo(p1,p2) {
	this.val = p1 + p2;
}
// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1p2

function foo() {
	console.log(this.a);
}
var a = 2;
foo.call(null); // 2

function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind(null, 2);
bar( 3 ); // a:2, b:3

function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create(null);
// spreading out array as parameters
foo.apply(ø, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind(ø, 2);
bar( 3 ); // a:2, b:3

function foo() {
	console.log( this.a );
}
var a = 2;
var o = {a: 3, foo: foo};
var p = {a: 4};
o.foo(); // 3
(p.foo = o.foo)(); // 2

if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply(curried, arguments)
				);
			};
		bound.prototype = Object.create(fn.prototype);
		return bound;
	};
}

function foo() {
    console.log("name: " + this.name);
 }
 var obj = { name: "obj" },
     obj2 = { name: "obj2" },
     obj3 = { name: "obj3" };
 
 var fooOBJ = foo.softBind( obj );
 fooOBJ(); // name: obj
 obj2.foo = foo.softBind(obj);
 obj2.foo(); // name: obj2   <---- look!!!
 fooOBJ.call(obj3 ); // name: obj3   <---- look!
 setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding

///////////////////////////////Chapter 3///////////////////////////////
///////////////////////////////Chapter 4///////////////////////////////
///////////////////////////////Chapter 5///////////////////////////////
///////////////////////////////Chapter 6///////////////////////////////