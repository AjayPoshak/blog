Programming by co-incidence means that you're relying on accidental successes or boundary conditions.

Let's say we have a class Story, that tells exotic stories about cartoon characters.
We invoke that story using `new Story`, but first it should be initialized so there is a method called `init`. 

So if you want to hear a story, create a story object and then call the init method.
And then call `playStory` and `pauseStory` to play or pause story respectively.


![first-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon.png)

Then there came another programmer, who wanted to use the story not for cartoon characters but for space wars, a war fanatic we must say. This guy is restless, he didn't read the spec carefully. And he did this...

![second-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon-1.png)

Now the story is god knows what state, then `story` object is messed for real, and `play` method throws an exception.

If you inspect carefully, there is a flaw in this program's design. It depends on the order of function calls,
and the object stays in an inconsistent state between the calls.  This inconsistency is a breeding ground for a lot of bugs.

Our first program was working, because `init` was called before `play`. And the second program didn't work because `init` was not called. So the first program worked by incidence.  This is known as programming by co-incidence.

Correct program design would have been

![third-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon-2.png)

<blockquote><p>Pragmatic Programmers think critically about all code, including our own. We constantly see room for improvement in our programs and our designs.</p>
- The Pragmatic Programmer</blockquote>

## Another real-world example

Let's move to a more concrete example. Let's say there is an object called `platform` which has properties like app code and app version. Now someone changed it to a string containing only app code before the redux store is hydrated.

![fourth-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon-6.png)

In a certain React Component, it is consumed like this

![fifth-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon-7.png)

This entire code works fine. Because `useEffect` makes sure that it runs on the client-side only.
Some mischievous soul came in and changed the component code like this

![sixth-screenshot](https://res.cloudinary.com/ddbxa4afa/image/upload/v1590501249/blog/carbon-8.png)


The safeguard of `useEffect` has been removed. Now, this component is rendered on client and server both.
But there is a slight problem, that `platform` key is still an object on the server. Hence this component breaks in an unimaginable way.

So far, we relied on the `useEffect` to guard it, so it was working fine. But the value for `platform` was in an inconsistent state. It relied on the fact, that it has always been accessed on the client-side. So whenever a component tried to access it on the server side, it exposed the inconsistency of its shape. So far, it was just a **co-incidence** that program was working.

This is called Programming by Co-incidence. And pragmatic programmers(a term borrowed from the book - "The Pragmatic Programmer") never rely on the inconsistent state of an object to make its program work.

The solution to the above-mentioned issue is to keep it either an object or a string on both client and server.
In the end, I'll leave you with a thought that I read in the book "The Pragmatic Programmer".

<blockquote> As developers, we work in minefields. There are hundreds of traps just waiting to catch us each day. We should be wary of drawing false conclusions. We should avoid programming by coincidence--relying on luck and accidental successes--in favor of programming deliberately.</blockquote>