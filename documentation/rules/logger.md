# logger

## always

When this rule is given the *always* option it will ensure that Ember.Logger is ALWAYS used instead of console.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/logger": [2, "always"]
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {Logger} = Ember

Logger.debug('Test')
```

```js
console.debug('Test')
```

> Note: In the above `console` is valid because Ember has not been imported. This serves useful in an Ember project for files such as a Test'em configuration file, ESLint configuration file, etc.

**Invalid**

```js
import Ember from 'ember'

console.debug('Test')
```

## never

When this rule given the *never* option it will ensure that Ember.Logger is NEVER used.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/logger": [2, "never"]
  }
}
```

**Valid**

```js
import Ember from 'ember'

console.debug('Test')
```

```js
console.debug('Test')
```

**Invalid**

```js
import Ember from 'ember'
const {Logger} = Ember

Logger.debug('Test')
```
