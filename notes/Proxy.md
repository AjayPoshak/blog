# Proxy in JS

## What ??
Before understanding proxy, we need to understand the trap in OS. Usually, when there is an exceptional condition such as
divison by zero, invalid memory access, Operating system performs some action before handing the control back to the 
originating process.

Proxy is similar to trap in OS. Whenever an fundamental operation like getting the value, key look-up, is performed
on an object, we can define a custom behaviour.

## When ??
Proxies are heavily used in libraries and frameworks, that use it to track mutations in the application state.
In user app, whenever the application state changes, library needs to know what changed so that it can update the view
accordingly.  

## How ??
```js
const p = new Proxy(target, handler)
```

target can be any object, array, function or even another proxy.
handler is an object whose properties define the behavioue when the target object is modified.

### Example
```js
const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : 21
  }
}
let p = new Proxy({}, handler)
p.a = 1
p.b
console.log(p.a, p.b) // 1, 21
```
