module.exports = {
  rulesConfig: {
    'ember-standard/destructure': [2, "always"]
  },
  rules: {
    'destructure': require('./rules/destructure')
  }
}
