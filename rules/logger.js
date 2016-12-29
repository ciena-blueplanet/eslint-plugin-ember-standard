var VALID_LOGGER_METHODS = [
  'assert',
  'debug',
  'error',
  'info',
  'log',
  'warn'
]

function isConsolePropertyCall (node) {
  return (
    node.callee.object &&
    node.callee.object.name === 'console' &&
    VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
  )
}

function isDestructuredLoggerPropertyCall (node, loggerVarName) {
  return (
    node.callee.object &&
    node.callee.object.name === loggerVarName &&
    VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
  )
}

function isStructuredLoggerPropertyCall (node, emberVarName) {
  return (
    node.callee.object &&
    node.callee.object.object &&
    node.callee.object.object.name === emberVarName &&
    node.callee.object.property.name === 'Logger' &&
    VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
  )

  // TODO: check if parent object is emberVarName
}

function reportUseConsoleInsteadOfDestructuredLogger (context, node, loggerVarName) {
  context.report({
    fix: function (fixer) {
      return fixer.replaceText(node.callee.object, 'console')
    },
    message: 'Use console instead of ' + loggerVarName,
    node: node.callee.object
  })
}

function reportUseConsoleInsteadOfStructuredLogger (context, node, emberVarName, loggerVarName) {
  var current = loggerVarName || emberVarName + '.Logger'

  context.report({
    fix: function (fixer) {
      return fixer.replaceText(node.callee.object, 'console')
    },
    message: 'Use console instead of ' + current,
    node: node.callee.object
  })
}

function reportUseLoggerInsteadOfConsole (context, node, emberVarName, loggerVarName) {
  var replacement = loggerVarName || emberVarName + '.Logger'

  context.report({
    fix: function (fixer) {
      return fixer.replaceText(node.callee.object, replacement)
    },
    message: 'Use ' + replacement + ' instead of console',
    node: node.callee.object
  })
}

module.exports = {
  create: function (context) {
    var emberVarName = null
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var loggerVarName = null

    return {
      /**
       * Determine if console is being used when it shouldn't be (when Ember is
       * imported)
       * @example `import Ember from 'ember'; console.info('Test')`
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (!isNever) {
          if (emberVarName && isConsolePropertyCall(node)) {
            reportUseLoggerInsteadOfConsole(context, node, emberVarName, loggerVarName)
          }

          return
        }

        if (isStructuredLoggerPropertyCall(node, emberVarName)) {
          reportUseConsoleInsteadOfStructuredLogger(context, node, emberVarName, loggerVarName)
          return
        }

        if (isDestructuredLoggerPropertyCall(node, loggerVarName)) {
          reportUseConsoleInsteadOfDestructuredLogger(context, node, loggerVarName)
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
              loggerVarName = property.value.name
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
