# prop-types

**Valid**

```js
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    alpha: PropTypes.any,
    bravo: PropTypes.array,
    charlie: PropTypes.arrayOf(PropTypes.string),
    delta: PropTypes.bool,
    echo: PropTypes.element,
    foxtrot: PropTypes.EmberObject,
    golf: PropTypes.func,
    hotel: PropTypes.instanceOf(HTMLElement),
    india: PropTypes.null,
    juliett: PropTypes.number,
    kilo: PropTypes.object,
    lima: PropTypes.oneOf(['foo', 'bar']),
    mike: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]),
    november: PropTypes.shape({
      foo: PropTypes.string
    }),
    oscar: PropTypes.string,
    papa: PropTypes.symbol
  }
})
```

**Invalid**

```js
import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  propTypes: {
    alpha: PropTypes.any(),
    bravo: PropTypes.array(),
    charlie: PropTypes.arrayOf,
    delta: PropTypes.bool(),
    echo: PropTypes.element(),
    foxtrot: PropTypes.EmberObject(),
    golf: PropTypes.func(),
    hotel: PropTypes.instanceOf,
    india: PropTypes.null(),
    juliett: PropTypes.number(),
    kilo: PropTypes.object(),
    lima: PropTypes.oneOf
    mike: PropTypes.oneOfType,
    november: PropTypes.shape,
    oscar: PropTypes.string(),
    papa: PropTypes.symbol()
  }
})
```
