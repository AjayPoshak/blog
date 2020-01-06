## Object.defineProperty

Object.defineProperty can either be a data descriptor or the accessor descriptor.

Data descriptors are following:
value,
writable

Accessor descriptors
get
set

One cannot set both descriptors at the same time, otherwise it’ll throw an error in strict mode.
Apart from these descriptors, there are other optional descriptors
enumerable,
configurable → It also controls if that property can be deleted from that object. If set to false,
then that prop can’t be deleted.

If a descriptor has both, value or writable AND get or set, then an exception is thrown.

## Tip:
To make sure that an object has no inhertied properties, use
```js
const obj = Object.create(null)
```
It freezes Object.prototype upfront.

## Tip:
Do NOT refer the property being get, in the getter otherwise it would generate the `too much recursion` error.

```js
const obj = {}
Object.defineProperty(obj, 'a', {
  get() {
    this.a // it would recursively call getter on a, which would call getter on a
  },
  set(newValue) {
    console.log('newValue ', newValue)
  }
})
```

## Emulating Object.freeze
If configurable, and writable is set to false on all props of an object, then that object is essentially frozen, much like the Object.freeze.
