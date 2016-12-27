module.exports = {
  create: function (context) {
    var isEmberImported = false
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      CallExpression: function (node) {
        if (isEmberImported && node.callee.object.name === 'console') {
          var propertyName = node.callee.property.name
          context.report(node, 'Use Ember.Logger.' + propertyName + ' instead of console.' + propertyName)
        }
      },

      ImportDeclaration: function (node) {
        if (node.source.value === 'ember') {
          isEmberImported = true
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'enforce usage of Ember.Logger over console',
      recommended: true
    },
    fixable: 'code',
    schema: [
      {
        enum: [
          'always',
          'never'
        ]
      }
    ]
  }
}
