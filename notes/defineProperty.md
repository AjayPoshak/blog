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
