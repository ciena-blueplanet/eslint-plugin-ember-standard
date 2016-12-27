# eslint-plugin-ember-standard

## Rules

### destructure

#### always

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

#### never

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

### import

#### always

When this rule is given the *always* option it will ensure that Ember is ALWAYS explicitly imported as the variable "Ember".

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/import": [2, "always"]
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
import Foo from 'ember'

export default Foo.Component.extend({
})
```

#### never

When this rule given the *never* option it will ensure that Ember is NEVER explicitly imported, leaving code to rely on a global *Ember* variable instead.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/import": [2, "never"]
  }
}
```

**Valid**

```js
export default Ember.Component.extend({
})
```

**Invalid**

```js
import Ember from 'ember'

export default Ember.Component.extend({
})
```
