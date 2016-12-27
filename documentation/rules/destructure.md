# destructure

## always

When this rule is given the *always* option it will ensure that Ember properties are ALWAYS destructured.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/destructure": [2, "always"]
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {Component} = Ember

export default Component.extend({
})
```

**Invalid**

```js
import Ember from 'ember'

export default Ember.Component.extend({
})
```

## never

When this rule is given the *never* option it will ensure that Ember properties are NEVER destructured.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/destructure": [2, "never"]
  }
}
```

**Valid**

```js
import Ember from 'ember'

export default Ember.Component.extend({
})
```

**Invalid**

```js
import Ember from 'ember'
const {Component} = Ember

export default Component.extend({
})
```
