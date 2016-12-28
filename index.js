module.exports = {
  configs: {
    'ember-standard': {
      rules: {
        'ember-standard/destructure': [2, "always"],
        'ember-standard/import': [2, "always"],
        'ember-standard/logger': [2, "always"],
        'ember-standard/no-set-in-computed-property': 2,
        'ember-standard/single-destructure': 2
      }
    }
  },
  rules: {
    'destructure': require('./rules/destructure'),
    'import': require('./rules/import'),
    'logger': require('./rules/logger'),
    'no-set-in-computed-property': require('./rules/no-set-in-computed-property'),
    'single-destructure': require('./rules/single-destructure')
  }
}
