## Peer Dependency

Many libraries mention some dependencies as peer deps. Peer deps mean that in order to run that lib, 
you need to install that peer dep as well.

### What dependencies can be the peerDependency?

Not all dependencies need to be specified as peerDependency, only those who has a runtime should be marked.
For example, a design system library built in React can ship React as dependency or peerDependency.
It is recommended to ship React as peerDep, not as dependency. Why??

1. Because ReactJS has a runtime. If our library also has a reactJS installed then our code inside the lib 
will use that copy of React while our code running on the consumer app will use its own copy of ReactJS. 
Downside of having two copies of ReactJS running is that they can't share the global context anymore.

2. And also, using the hook with a version of React, different than the version which rendered the component will cause
issues.


On the other hand, deps like lodash or prop-types can be specified as dependency to the lib, as having their
mulitple copies won't affect anything.
