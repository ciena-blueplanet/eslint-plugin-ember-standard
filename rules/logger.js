var VALID_LOGGER_METHODS = [
  'assert',
  'debug',
  'error',
  'info',
  'log',
  'warn'
]

module.exports = {
  create: function (context) {
    var emberVarName = null
    var isLoggerDestructured = false
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      /**
       * Determine if console is being used when it shouldn't be (when Ember is
       * imported)
       * @example `import Ember from 'ember'; console.info('Test')`
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (
          emberVarName &&
          node.callee.object &&
          node.callee.object.name === 'console' &&
          VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
        ) {
          var propertyName = node.callee.property.name
          context.report({
            fix: function (fixer) {
              var replacement = (isLoggerDestructured ? 'Logger' : emberVarName + '.Logger')
              return fixer.replaceText(node.callee.object, replacement)
            },
            message: 'Use Ember.Logger instead of console',
            node: node.callee.object
          })
        }
      },

      /**
       * Determine if Ember has been explicitly imported
       * @example `import Ember from 'ember'`
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        if (node.source.value === 'ember') {
          emberVarName = node.specifiers[0].local.name
        }
      },

      /**
       * Determine if Logger has been destructured or not
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (
          node.id.type === 'ObjectPattern' &&
          node.init.name === emberVarName &&
          node.id.properties.length !== 0
        ) {
          node.id.properties.forEach(function (property) {
            if (property.key.name === 'Logger') {
              isLoggerDestructured = true
            }
          })
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
