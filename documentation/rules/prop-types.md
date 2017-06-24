# prop-types

This rule ensures `PropTypes` are valid given the API provided by [ember-prop-types](http://ciena-blueplanet.github.io/ember-prop-types/).

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
    echo: PropTypes.date,
    foxtrot: PropTypes.element,
    golf: PropTypes.EmberObject,
    hotel: PropTypes.func,
    india: PropTypes.instanceOf(HTMLElement),
    juliett: PropTypes.null,
    kilo: PropTypes.number,
    lima: PropTypes.object,
    mike: PropTypes.oneOf(['foo', 'bar']),
    november: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.string
    ]),
    oscar: PropTypes.shape({
      foo: PropTypes.string
    }),
    papa: PropTypes.string,
    quebec: PropTypes.symbol
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
    echo: PropTypes.date(),
    foxtrot: PropTypes.element(),
    golf: PropTypes.EmberObject(),
    hotel: PropTypes.func(),
    india: PropTypes.instanceOf,
    juliett: PropTypes.null(),
    kilo: PropTypes.number(),
    lima: PropTypes.object(),
    mike: PropTypes.oneOf,
    november: PropTypes.oneOfType,
    oscar: PropTypes.shape,
    papa: PropTypes.string(),
    quebec: PropTypes.symbol()
  }
})
```
