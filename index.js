module.exports = {
  configs: {
    'ember-standard': {
      rules: {
        'ember-standard/destructure': [2, "always"],
        'ember-standard/import': [2, "always"],
        'ember-standard/logger': [2, "always"],
        'ember-standard/no-set-in-computed-property': 2
      }
    }
  },
  rules: {
    'destructure': require('./rules/destructure')
  }
}
