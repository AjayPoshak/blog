# Strict Mode

## Why??

1. It would warn about undeclared variables. In non-strict mode, counter would be initialized at global scope.

```js
function fun() {
    "use strict"
    for(counter = 0; counter < 5; counter++) console.log(counter) // Uncaught ReferenceError: assignment to undeclared variable counter
}
 ```
 
 2. It will NOT resolve `this` to global scope. In non-strict mode, below program would run, and values would be initialized on `window.values`.
 
 ```js
 "use strict"
 function Dropdown(values) {
  this.values = values
 }
 const dropDown = Dropdown(['Ajmer', 'Mumbai']) // Uncaught TypeError: this is undefined
 ```
 
 3. Duplication function arguments
 
 ```js
 function loadImage(src, src) {
  "use strict"
  const image = new Image()
 } // Uncaught SyntaxError: duplicate formal argument src
 ```
