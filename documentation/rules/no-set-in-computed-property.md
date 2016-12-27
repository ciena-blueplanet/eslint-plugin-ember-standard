# no-set-in-computed-property

This rule ensures no calls to `Ember.set()` or `this.set()` are made within a
computed property.

**ESLint Configuration**

```json
{
  "rules": {
    "ember-standard/no-set-in-computed-property": 2
  }
}
```

**Valid**

```js
import Ember from 'ember'
const {computed} = Ember

export default Component({
  foo: computed('bar', function () {
    return this.get('bar') + '-baz'
  })
})
```

**Invalid**

```js
import Ember from 'ember'
const {computed} = Ember

export default Component({
  foo: computed('bar', function () {
    this.set('baz', 'spam')
    return this.get('bar') + '-baz'
  })
})
```

```js
import Ember from 'ember'
const {computed, set} = Ember

export default Component({
  foo: computed('bar', function () {
    set('baz', 'spam')
    return this.get('bar') + '-baz'
  })
})
```
