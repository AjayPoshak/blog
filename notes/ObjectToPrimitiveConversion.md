# Object to Primitive Conversion
What happens when I add two objects? Or If I multiply two Objects ?

All these operations expect a primitive value. So they would call object to primitive conversion.

This conversion is based on three hints:

1. `string` : For all the operations that need a string like  `anotherObject[obj] = 1`
2. `number` : For all math related operations like subtraction, multiplication, greater than, lesser than
3. `default` : For very rare cases where operator is not sure what type to expect like double equals comparison `obj == 1`

**Conversion Algorithm**


1. Call `obj[Symbol.toPrimitive](hint)` if method exists
2. Otherwise if hint is `string`
    - try `obj.toString()` or `obj.valueOf()` whatever exists
3. Otherwise if hint is either `number` or `default`
    - try `obj.valueOf()` or `obj.toString()` whatever exists


> valueOf method on object returns its value


> In the above conversion algorithm, if any method returns non-primitive value then its ignored and next method is called. Such as valueOf on  `obj = {a: 21}` would return the value of the object which would be then ignored and toString would be called.

In general practice, objects implement/override toString method as a “catch-all” method for all conversions that returns a human readable form of the object, for debugging and logging purposes.

Some examples


    let user = {
      name: 'Suresh',
      money: 1000,
      [Symbol.toPrimitive](hint) {
        return hint === 'string' ? `name: {this.name}` : this.money
      }
    }
    
    console.log(user) // (hint: string) -> name: Suresh
    console.log(+user) // (hint: number) -> 1000
    console.log(user + 500) // (hint: default) -> 1500

Another example


    let user = {
      name: 'Suresh',
      money: 1000,
      toString() {
        console.log(`name: ${this.name}, money: ${this.money}`)
      }
    }
    console.log(user) // name: Suresh, money: 1000
    console.log(user + 500) // name: Suresh, money: 1000


