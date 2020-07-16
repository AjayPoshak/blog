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

Being both unique and usable as property names make symbol suitable for defining interfaces that can live alonside other properties, no matter what their names are.

## The Iterator Interface

The object given to `for-of` loop must be an iterable.  It means that it has a method named with _Symbol.iterator_ symbol.

When called that method should return a object that provides a second interface called **iterator**.  This is the actual thing that iterates.
It has a next method that returns an object with `value` property and `done` property.

value<Any> :: provides the next value
done<Boolean> :: should return true when there are no more results or false otherwise.
  
 ```js
 let okIterator = "Ok"[Symbol.iterator]()
 
 console.log(okIterator.next()) // {value: "O", done: false}
 console.log(okIterator.next()) // {value: "k", done: false}
 console.log(okIterator.next()) // {value: undefined, done: true}
 ```
