
# Closure

It is a function that remembers the outer scope variables even when they would not be accessible. OR
A function that remembers the outer scope variables even when passed in or invoked in another scopes.

## Why to use it??
- To remember the function state (memoization, caching)
- To limit the exposure of certain variables under the principle of least exposure
- To achieve full encapsulation of function state

### Closure always closes over the variables not values.
