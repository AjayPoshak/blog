## Difference between flex basis and width

1. Flex basis doesn't always apply to width.
When `flex-direction` is `row`, then it is the `width`, whereas if `flex-direction` is `column` then it is treated as `height`.

2. If an element has both flex-basis and width applied to it, and `flex-direction` is `row`, then flex-basis would get priority
over `width`.

3. If an element has `flex-basis` set to `50px`, and `min-width` set to `100px`, then still that element would be `100px` wide. 
It means that `min-width` would get precedence over `flex-basis`.

4. `flex-basis` doesn't apply to flex-container element.

5. If an flex-item has `position: absolute`, then it won't participate in flex layout, thus `flex-basis` won't be applied to it.
So we have to use `width` is that case.

6. On the browser side of things, there is no difference in rendering `flex-basis` and `width`, unless `flex-basis` is set to `auto`
or `content`.
