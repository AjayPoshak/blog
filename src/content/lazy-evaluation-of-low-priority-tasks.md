title: Lazy Evaluation of low priority tasks
publishedAt: August 24, 2019

---

Browsers run on single thread which means that they can do single thing at a time.
You may need to prioritize among different tasks to run more important tasks
first and defer the execution of other non-important tasks.

For example, while scrolling a listing page, scroll event fires. This event
adds some DOM elements to the list to achieve the infinite scroll effect. But at
the same time, an analytics event is also fired, thus eating up the precious time
in the main thread, thus delaying the code to append DOM elements in the list.

This can be achieved via `setTimeout`. Using setTimeout, non-important tasks can be pushed into callback queue. In callback queue, after it completes the `delay` time, the Event Loop pushes it into call stack whenever it finds call stack empty. Problem with this approach is that we can't have the fine grained control over when the task would be executed.

Recently an API called `requestIdleCallback` has been added that tells when the main thread would be idle. So instead of relying on the interplay of callback queue and callstack, we can reliabily defer the execution of non-essential tasks.

One of such use cases are analytics. Analytics while being extremely useful
to provide valuable insights into user behaviour, at the same time does not
contribute towards user experience. So it makes a good case of lazy execution of code.

We should push execution of analytics calls to `requestIdleCallback` so it
won't block the execution of essential tasks.

But there might be some edge cases around this approach. One, what if
user closes the browser tab or the browser itself before the main thread becomes
idle. Another, what if main thread never becomes idle. So we need some
sort of guarantee that we won't miss the analytics events in case of any of these
edge cases occur.

Both of the above cases can be handled by building a wrapper around `requestIdleCallback`
that guarantees that these events would be executed. That wrapper could use the `beforeunload`
event that fires before a page/tab is closed.

So our solution, essentially would be a queue of events. Whenever an analytics
event occurs, it'll be pushed to the queue. On every callback of `requestIdleCallback` an event
would be removed from the queue and passed to the `requestIdleCallback`.

This wrapper would also listen to the `beforeunload` event, and whenever this event called, wrapper would execute all events in the queue synchronously. Thus, providing guarantee of execution also.

```js
class EventsQueue {
  static instance;
  constructor() {
    if (typeof instance !== "undefined") {
      return instance;
    }
    this.taskQueue = [];
    window.addEventListener("beforeunload", this.runImmediately, true);
    window.addEventListener(
      "onVisibilityChange",
      this.onVisibilityChange,
      true,
    );
  }

  push = (task) => {
    this.taskQueue.push(task);
    // Schedule Tasks to run as soon as they're added in queue
    this.scheduleTaskToRun();
  };

  isEmpty = () => {
    return this.taskQueue.length === 0;
  };

  runImmediately = () => {
    while (!this.isEmpty()) {
      const task = this.taskQueue.shift();
      task();
    }
  };

  /**
   * Schedules tasks to run in rIC
   * @memberof EventsQueue
   */
  scheduleTaskToRun = () => {
    if (!this.isEmpty()) {
      const task = this.taskQueue.shift();
      this.runTask(task);
    }
  };

  /**
   * Gives the task to rIC to execute.  And also
   * schedules another one for next rIC, if queue
   * is not empty yet.
   * @memberof EventsQueue
   */
  runTask = (task) => {
    requestIdleCallback(task);
    if (!this.isEmpty()) {
      requestIdleCallback(this.execute());
    }
  };

  onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      this.runImmediately();
    }
  };
}

export default new EventsQueue();
```

Implementation <code class="code">example.js</code>

```js
import eventsQueue from "./EventsQueue";
eventsQueue.push(pageViewEvent);
```

This is one the examples of the wonders requestIdleCallback can do.
Deferring the execution of analytics code is one of the use cases of rIC.
Another cases might be prefetching the API data for the next page, or downloading
the dynamically loaded assets before user interacts with them.

## References:

[Cooperative Scheduling of Background Tasks](https://www.w3.org/TR/requestidlecallback/)

[Using requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback)

[Idlize: rIC made easy](https://github.com/GoogleChromeLabs/idlize)
