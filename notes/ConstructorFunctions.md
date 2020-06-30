# Constructor Functions

Javascript's original factory for generating objects are _constructor functions_ : functions which 
return the instance of themselves if invoked via `new` operator.

Later on, ES6 introduced _classes_, which are mainly better syntax for constructor functions.

Functions which are called with new keyword, are constructor functions.
They follow these rules

- Its name should start with capital letter
- It should be called with new operator

They’re used when we need to create a lot of objects.

Example

    function InfiniteScroller(threshold, callback) {
      // this = {} Implicit
      this.callback = callback
      this.threshold = threshold
      // return this Implicit
    }
    
    const scroller = new InfiniteScroller(50, () => {})

Algorithm:

1. An empty new object is created and assigned to `this`
2. Function body executes and it usually modifies the value of `this` , adds new props to it
3. returns the value of `this`


> Generally, constructor function don’t explicitly return values, because they return `this` implicitly.
> Still if we return a primitive value from a constructor function, then it would be ignored.  If `return` is called with an object, then its value is returned instead of  `this` 

Example


    function BigUser() {
      this.name = 'ASK'
      return {name: 'John Snow' }
    }
    
    const bu = new BigUser()
    bu.name // John Snow


**Constructor mode test**

In certain cases, we want to support both ways of instantiating a constructor function i.e with or without `new` keyword.  This might be the use case when we’re authoring a library that can be instantiated using the constructor function.

Value of `new.target` is empty for regular function calls and equals the function if called with `new`.

Example


    function User(name) {
      if(!new.target) {
          return new User(name)
      }
      this.name = name
    }
    
    const user = new User('Rambo')
    user.name // Rambo

## Constructor Functions with Primitive Types

Each primitive type except null and undefined, has an associated _constructor function_.
- Constructor function _Boolean_ is associated with boolean type
- Constructor function _Number_ is associated with number type
- Constructor function _String_ is associated with string type
- Constructor function _Symbol_ is associated with symbol type

These functions play several roles

 - Number as a function to convert values to numbers
 `Number('123') // 123`
 
 - Number.prototype provides functionalities for numbers like
`123..toString() // '123'`

- Number can be used as class to create number objects
`new Number(123)`

## Wrapping Primitive Values

Constructor functions for primitive type are also called as _wrapper types_.
Because they provide a way for converting primitive values to Objects.

```
const primB = true
primB instanceOf Boolean // false
const wrapped = Object(primB)
wrapped instanceOf Object //true
wrapped instanceOf Boolean //true
```
note:: _instanceOf_ is a test for objects, to make it work with primitives _new_ operator is used.
