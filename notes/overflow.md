# Overflow in CSS
Overflow works only if an element has one of the following

- height or max-height set to it
- white-space: nowrap

`overflow: <overflow-x> <overflow-y>`

Overflow has default value of `visible` that means that all the content is visible even though it exceeds the height of its parent container.

Overflow has another value called `auto` . It would not show the scroll bar if content is smaller than parent container, and would display scroll if child exceeds the parent container. Its a smart value in that way.
