module.exports = {
  configs: {
    'ember-standard': {
      rules: {
        'ember-standard/computed-property-readonly': [2, "always"],
        'ember-standard/destructure': [2, "always"],
        'ember-standard/import': [2, "always"],
        'ember-standard/logger': [2, "always"],
        'ember-standard/no-set-in-computed-property': 2,
        'ember-standard/no-settimeout': 2,
        'ember-standard/prop-types': 2,
        'ember-standard/single-destructure': 2
      }
    }
  },
  rules: {
    'computed-property-readonly': require('./rules/computed-property-readonly'),
    'destructure': require('./rules/destructure'),
    'import': require('./rules/import'),
    'logger': require('./rules/logger'),
    'no-set-in-computed-property': require('./rules/no-set-in-computed-property'),
    'no-settimeout': require('./rules/no-settimeout'),
    'prop-types': require('./rules/prop-types'),
    'single-destructure': require('./rules/single-destructure')
  }
}
