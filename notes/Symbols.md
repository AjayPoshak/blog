Symbols are a way to add unique properties to the objects.

A symbol can never be equal to itself. This ensures that it is guranteed to be unique.

Name passed in Symbol function is just a label used for printing and debugging purposes. 
There can be multiple symbols of same name, still different from each other.

```js
const sym = Symbol('name')

console.log(sym === Symbol('name')) // false
```

For example, we can add a toString property to Array prototype without it clashing with actual toString implementation on Array.prototype.

```js
const toString = Symbol('toString')
Array.prototype[toString] = function() {
  console.log(this.length, ' is the array length')
}

[1, 2, 3].toString() // 1, 2, 3 actual toString() call
[1, 2, 3][toString]() // 3 is the array length Symbo call
```

Symbols are used in creating iterable interfaces.
