# computed-property-readonly

## always

When this rule is given the *always* option it will ensure that computed properties are ALWAYS readOnly.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/computed-property-readonly": [2, "always"]
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {Component, computed} = Ember

export default Component.extend({
  foo: computed('bar', function () {
    return this.get('bar') + '-baz'
  }).readOnly()
})
```

```js
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend({
  @readOnly
  @computed('bar')
  foo (bar) {
    return bar + '-baz'
  }
})
```

**Invalid**

```js
import Ember from 'ember'
const {Component, computed} = Ember

export default Component.extend({
  foo: computed('bar', function () {
    return this.get('bar') + '-baz'
  })
})
```

```js
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend({
  @computed('bar')
  foo (bar) {
    return bar + '-baz'
  }
})
```

## never

When this rule given the *never* option it will ensure that computed properties are NEVER readOnly.

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
import Ember from 'ember'
const {Component, computed} = Ember

export default Component.extend({
  foo: computed('bar', function () {
    return this.get('bar') + '-baz'
  })
})
```

```js
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend({
  @computed('bar')
  foo (bar) {
    return bar + '-baz'
  }
})
```

**Invalid**

```js
import Ember from 'ember'
const {Component, computed} = Ember

export default Component.extend({
  foo: computed('bar', function () {
    return this.get('bar') + '-baz'
  }).readOnly()
})
```

```js
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'

export default Component.extend({
  @readOnly
  @computed('bar')
  foo (bar) {
    return bar + '-baz'
  }
})
```
