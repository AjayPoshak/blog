## Drawbacks of callbacks
- Compromises readbility when nested callbacks need to handled
- Error handling is pain with error-first callbacks

## What is Promise ?

A promise is an aysnchronous action that may complete at some point and produce a value. 
It is able to notify anyone who is interested when its value is available.

Essentially, it is an object that represents an future event.

## How it works ??
It is usually constructed using a constructor function, which takes another function as an argument.
Passed function would take `resolve` and `reject` as arguments.

```js
function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay)
  })
}
```

`then` handler takes two functions as arguments, one for success outcome and another for failure outcome.
In Promise chaining, if any `then` handler does not have proper handler for that outcome(success or failure)
then that handler is ignored.

If an exception is returned as outcome from Promise, then it would traverse the entire chain searching for the 
appropriate handler, and if not found, then would result in `unhandledPromiseRejection`.

For example

```js
new Promise((_, reject) => reject(new Error('Fail')))
.then(result => console.log(result)) // No error handler registered, rejection flows into next promise
.then(result1 => console.log(result1)) // No error handler registered, rejection flows into next promise
.catch(reason => {           // error handled here, catch also returns a promise
  console.error("Error caught ", reason) // Output: Error caught, Fail
  return "nothing"
})
.then(value => console.log('Handler 2')) // Output: Handler 2
```

In above example, rejected promise got propogated through the chains until it found a suitable handler.
Another example
```js
new Promise((_, reject) => reject(new Error('Fail')))
.then(
  result => console.log(result), 
  e => console.log('Error handler ', e) // error handled here, it also returned a promise
) 
.then(result1 => console.log('result1')) // Output: result1
.catch(reason => { // Not executed, because previous handler returns a success outcome
  console.error("Error caught ", reason)
})
.then(value => console.log('Handler 2')) // Output: Handler 2
```
