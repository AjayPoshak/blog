title: Walking the DOM
publishedAt: September 16, 2019

---

Document Object Model (DOM) is the HTML structure of the page. Traversing the DOM comes
handy in cases such as to access the last element of a carousel or to extract all text
content from a page.

## Let's understand DOM first

All operations in DOM start with document object. It is the entry point of DOM.

Every thing in DOM can be classified as node. And node can be of three types: element, text, comment.

1. text - In general, text nodes are leaf nodes, which means that they do not contain any child nodes. They only contain a string, sometimes that string can be the newline character among other things.

2. Element - It is any HTML Element.

3. Comment is also a node in DOM.

To differentiate among different nodes whether it is an text, element or comment, we need to examine its nodeType property:

- node.nodeType === 1 for element nodes
- node.nodeType === 3 for text nodes
- node.nodeType === 8 for comment nodes

For example, consider following HTML snippet:

```html
<!-- A Paragraph tag -->

<p>This is a text</p>
```

It has one element - the p tag, and one text node - "This is a text" and also one
comment node, "<!-- A Paragraph tag -->"

Above concept has one exception, the `document` node, which is not an HTML Element.

DOM interface has methods accordingly:

**document.body.children** - list all children element

**document.body.childNodes** - lists all children nodes

Please refer to above section for difference between element and nodes.

## childNodes

This property gives us access to all child nodes to any given DOMElement. But it has one
interesting detail. The list returned by it, is not an actual array. It is an iterable list.
Which means that we can use `for-of` loop to iterate over it, but cannot use regular array
methods like `Array.map`.

We can still convert that list to array using `Array.from`, and then can use all sorts of
array methods.

## DOM Walker

Now let's focus on a contrived example. Lets say we need to extract all text data from a web page.

To do that we need to apply all we have learned here. We would start from document's body
then process all its children and store any text we find in an array. Then do the same to the
children of document's children until there are no children left for processing.

We can use `nodeType` to differentiate between a text node and an element node.
So the pseudoCode would like this

1. Take the document.body as root element and push it to an array(traversalQ)
2. Use that array as queue, and keep removing elements from the front until array is empty:
   - Remove the first element from array (current)
   - Check if this element is a textNode, if yes then push its `textContent` to result array
   - Or if this element is a elementNode, then check if it has any children using `childNode.length`, then push all its children to traversalQ array
   - Repeat step 2)

Its JS implementation would look like this.

```js
function getAllTextInDocument(root) {
  const texts = [];

  const traversalQ = [];

  traversalQ.push(root);

  while (traversalQ.length > 0) {
    const current = traversalQ.shift();

    // If text node then push in texts array
    if (current && current.nodeType === 3 && current.textContent.trim()) {
      // Here trim helps us to remove newline text nodes
      texts.push(current.textContent);
    } else if (current && current.childNodes.length > 0) {
      // If it is an element then push it in traversalQ for further traversal

      const currentChildren = current.childNodes;

      for (const child of currentChildren) {
        traversalQ.push(child);
      }
    }
  }
}

getAllTextInDocument(document.body);
```

There is one more detail in above example. Whenever we are traversing the DOM, then the newlines are also considered as textNode. But we don't want newlines in our result, so we trimmed the `textContent` value of textNode to remove any newlines.

## A few more bits about DOM

There are common properties on all DOM elements. And they inherit those properties from their
parents. Each DOM node belongs to a corresponsing built-in class.The root of hierarchy is `EventTarget` class.

![DOM Classes hierarchy](https://res.cloudinary.com/ddbxa4afa/image/upload/c_scale,w_523/v1568630569/DOM_Inheritance_kdnubu.svg)

These classes are:

**EventTarget**: As it is a root interface hence all DOM elements inherits behaviour defined in it. addEventListener, removeEventListener & disptachEvent are the methods provided in this class.

**Node**: It is an abstract class which serves as base class for all DOM elements. It provides methods
like firstChild, lastChild, previousSibling, nextSibling and properties like textContent.

**Text, Comment and Node**: These classes inherits from Node interface. They represent text nodes, element nodes & comment nodes.

**HTMLElement**: It provides metadata attributes like title, lang, translate, and user interaction elements like draggable, innerText, accessKey attributes.

**HTMLInputElement, HTMLBodyElement, HTMLFormElement**: These elements inherit HTMLElement. HTMLInputElement deals with <input> tag, HTMLBodyElement relates to <body> tag, and HTMLFormElement
corresponds to <form> tag.

Other interesting thing is that all these tags inherit from Object as well, so they get "plain object"
methods like 'hasOwnProperty' available to them.

If we try doing `console.log(document.body)` on browser console, and observe the prototype chain
then we can see the above hierarchy in it.

Happy DOM Walking !!!
