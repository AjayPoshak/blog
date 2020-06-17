
## What is a same Origin??

For a browser, origin consists of three things
1. Protocol (https, http, ftp)
2. Host
3. Port

For any two URLs, if all of the above matches then it is considered to be on the same origin. 
For example
https://abc.example.com

| Origin                                        | Status        |
| --------------------------------------------- |:-------------:|
| https://abc.example.com/scripts/analytics.js  | same          |
| http://abc.example.com/scripts/analytics.js   | different     |
| https://abc.example.com:8081                  | different     |


## Subdomains

Lets imagine if we have a subdomain like https://toys.shopping.com, then still it 
would be considered of different origin with https://games.shopping.com . To make them same origin, we need to set <br />

`document.domain = "shopping.com"` <br />

then in this case, document.domain of both pages would be compared instead of actual host, and they would considered 
of same origin. But we cannot set document.domain to something else like <br/>

`document.domain = "attacker.com" // won't work` <br />


## Cross Origin
There are certain things which are allowed in cross origin.
1. **write** : Links, redirects and form submissions are allowed because they're considered a write operation.

2. **embedding** : Loading files via script tag or link, images, audio, video are considered embedding, and it a cross origin embedding is allowed.
It means that any page may load any other pages's JS or CSS files even on cross origins.
`<script src="https://someoneelse.com/important.js">`

3. **read** : Fetch requests are considered read operations and are disallowed in cross origin.

|  Category | Cross Origin | Prevention        |
|-----------|--------------|-------------------|
|   Write   | allowed      | CSRF Token        |
|   Embed   | allowed      | COEP / CSRF Token |
|   Read    | disallowed   | CORS              |

## Prevention

To prevent the resources from leaking to cross origins, a few steps can be taken
- Setting **X-Frame-Options** to page, would disallow that page to be embedded in an iFrame
- Using CSRF token for form submissions

```
postMessage is the legit way to do cross origin communication.
```
