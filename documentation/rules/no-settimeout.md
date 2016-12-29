# no-settimeout

This rule ensures no calls to `setTimeout()` are made.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/no-settimeout": 2
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {run} = Ember

run.later(this, () => {
  // do something
}, 100)
```

```js
setTimeout(() => {
  // do something
}, 100)
```

> Note: In the above `setTimeout` is valid because Ember has not been imported.
This serves useful in an Ember project for files outside of the normal app/addon
files.

**Invalid**

```js
import Ember from 'ember'

setTimeout(() => {
  // do something
}, 100)
```
