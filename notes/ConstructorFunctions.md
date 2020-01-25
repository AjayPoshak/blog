# Constructor Functions
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

