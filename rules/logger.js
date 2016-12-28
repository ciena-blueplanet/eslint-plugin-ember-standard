module.exports = {
  create: function (context) {
    var isEmberImported = false
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      /**
       * Determine if console is being used when it shouldn't be (when Ember is
       * imported)
       * @example `import Ember from 'ember'; console.info('Test')`
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (isEmberImported && node.callee.object.name === 'console') {
          var propertyName = node.callee.property.name
          context.report(node, 'Use Ember.Logger.' + propertyName + ' instead of console.' + propertyName)
        }
      },

      /**
       * Determine if Ember has been explicitly imported
       * @example `import Ember from 'ember'`
       * @param {ESLintNode} node - import declaration node
       */
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
      category: 'Best Practices',
      description: 'Enforce usage of Ember.Logger over console',
      recommended: true
    },
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
