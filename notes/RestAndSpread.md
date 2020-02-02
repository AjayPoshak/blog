# Rest and spread
Rest operator gathers all the remaining parameters and constructs an array with it.


    function sum(...args){
      let sum = 0
      for(let i of args) {
          sum += i
      }
      return sum
    }


**Spread Operator**
It expands an “iterable” object.  It uses iterators to gather elements, the same way as `for-of`
does.


    let str = 'Hello'
    console.log(...str) // H e l l o
    console.log([...str]) // [ "H", "e", "l", "l", "o" ]

So for a string,  `for-of` returns characters and `…str` becomes `H e l l o`
In next line, that string of characters are passed to an array initializer `[…str]` and it becomes an array of strings.

For such tasks, to convert an iterable string to an array,  `Array.from` can be used also. 

**Difference between Array.from and spread operator**
There is a subtle difference between spread and Array.from

- Spread only operates on iterables
- Array.from operates both on iterables and array-like(NodeList, arguments)


> An object is not iterable in JS unless it implements iterable protocol.

