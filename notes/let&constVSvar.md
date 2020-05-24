# let & const vs var

- var is function scoped whereas let & const are block scoped.
- If a variable is used before its declared, and using let or const, then strict mode throws an reference error. Because variables declared with let or const can’t be used before its declared. Its called TDZ(Temporal Dead Zone)


```js
    function saySomething() {
      var greeting = 'Hello'
      {
        greeting = 'New Hello' // Reference error, can't access greeting before initialization
        let greeting = 'Modern greeting'
      }
    }
    saySomething()
```

Temporal means the time, not position. Consider the below example

```js
askQuestion()
let sName = "Ajay"
function askQuestion() {
    console.log('Yayy ', sName) // ReferenceError: can't access sName before initialization
}
```
So position wise `askQuestion` comes after the `sName` declaration, but `askQuestion` is invoked before the `sName` has been declared.

let & const are auto-registered at the top of scope, but not initialized. As shown below
```
var sName = 'Vijay'
{
    console.log(sName) // Throws Reference error: can't access sName before initialization
    ...
    ...
    let sName = 'Yash'
}
```

- Whenever var is outside any function scope, then its value is created on global scope i.e. `window` object.

```js
    var a = 21
    console.log(window.a) //21

```

## Loops

- Every loop is a new scope instance. Everytime execution enters a scope, everything resets. `value` is created new in every exceution.
```js
var keepGoing = true;
while (keepGoing) {
    let value = Math.random();
    if (value > 0.5) {
        keepGoing = false;
    }
}
```
- If we have a looping variable, Is that variable created new in every iteration?

```
for (let i = 0; i < 3; i++) {
    let value = i * 10;
    console.log(`${ i }: ${ value }`);
}
```
Is `i` created new everytime, like variable `value`?
Answer is yes. That part is also included in loop body.
It could be viewed like this
```js
let $$i = 0
for(/* nothing here */; $$i < 3; $$i++) {
    let i = $$i
    let value = i * 10
    ....
    ....
}
```
What about the `const`? Why below snippet does not work then?
```js
for (const i = 0; i < 3; i++) {
    let value = i * 10;
    console.log(`${ i }: ${ value }`);
}
```
Lets expand reuse our previous mental model again

```js
const $$i = 0
for (/*nothing here*/; $$i < 3; $$i++) {
    const i = $$i     // Reassignment won't work, OOPS!!!
    let value = i * 10;
    console.log(`${ i }: ${ value }`);
}

```
