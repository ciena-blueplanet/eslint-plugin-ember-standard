# single-destructure

This rule ensures Ember is destructured in a single variable declarator.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/single-destructure": 2
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {Component, Logger} = Ember
```

**Invalid**

```js
import Ember from 'ember'
const {Component} = Ember
const {Logger} = Ember
```
