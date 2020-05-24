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

- Whenever var is outside any function scope, then its value is created on global scope i.e. `window` object.

```js
    var a = 21
    console.log(window.a) //21

```
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
