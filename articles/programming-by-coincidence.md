Programming by co-incidence, sounds like a mouthful.  I also thought the same when I heard the term.

Lets say we have a class Story, that tells exotic stories about cartoon characters.
We invoke that story using `new Story`, but the programmer decided that story needs to be initialized at first.
So he created another method called `init`. 

So if you want to hear a story, invoke the creation of story object and then call the init method.
And after that only you would be able to call `playStory` and `pauseStory`.

The order would be

```js
    const story = new Story()
    story.init({ type: 'cartoon' })
    story.play()
    //....
    //....
    story.pause()
```

Then there came another programmer, who wanted to use the story not for cartoon characters but for space wars, a war fanatic we must say. This guy is restless, he didn't read the spec carefully. And he did this...

```js
    const story = new Story()
    story.play()
    //....
    //....
    story.pause()
```

Now the story is god knows what state, then `story` object is messed for real and `play` method throws exception.

If you inspect carefully, there is a flaw in this program's design. It depends on the order of function calls,
and the object stays in inconsistent state in between the calls.  This inconsistency is a home to a lot of bugs.

Our first program was working, because `init` was called before `play`. And second program didn't work because `init` was not called. So first program worked by incidence.  This is known as programming as co-incidence.

Correct program design would have been
```js
    const story = new Story({ type: 'space-wars' })
    story.play()
```

## Another real world example

Lets move to a more concrete example. Lets say there is an object called `platform` which has properties like app code and app version. Now someone changed it to a string containing only app code, before the redux store is hydrated.

```js
    // createStore.js
    export const createStore(state) {
        // ...
        // ...
        const { platform } = state.cookies
        state.cookies.platform = platform.appCode
    }
```

In a certain React Component, it is consumed like this

```js
    const ShowHeader = () => {
        React.useEffect(() => {
            const { platform } = parseCookies(state.cookies)
            if(platform === 'mobile') {
                // Do something about mobile view
            }
        }, [state])
    }
```

This entire code works fine. Because `useEffect` makes sure that it runs on client side only.
Some mischievous soul came in, and changed the component code like this

```js
    const ShowHeader = () => {
        // React.useEffect(() => {
            const { platform } = parseCookies(state.cookies)
            if(platform === 'mobile') {
                // Do something about mobile view
            }
        // }, [])
    }
```

The safeguard of `useEffect` has been removed. Now this component is rendered on client and server both.
But there is a slight problem, that `platform` key is still a object on server. hence this component breaks in an unimaginable way.

So far, we relied on the `useEffect` to guard it, so it was working fine. But the value for `platform` was in inconsistent state. It relied on the fact, that it is always accessed on client side. So when a component tried to access it on server side, it exposed the inconsistency of its shape. So far, it was just a <b>co-incidence</b> that program was working.

This is called Programming by Co-incidence. And pragmatic programmers(term borrowed from book - "The Pragmatic Programmer") never relies on the inconsistent state of a object to make its program work.

Solution to the above mentioned issue, is to keep it either an object or a string on both client and server.