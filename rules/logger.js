var VALID_LOGGER_METHODS = [
  'assert',
  'debug',
  'error',
  'info',
  'log',
  'warn'
]
/* eslint-disable complexity */
/**
 * Determine if call expression is a console call that can be converted to a
 * Ember.Logger call
 * @param {ESLintNode} node - call expression node
 * @param {String} emberVarName - variable name for Ember
 * @param {String} loggerVarName - variable name for Ember.Logger
 * @returns {Boolean} whether or not console call
 */
function isEmberLoggerCall (node, emberVarName, loggerVarName) {
  const EmberLoggerVarName = loggerVarName || 'Logger'
  return (
    node.callee.object &&
    // Check for Logger.<log>
    (node.callee.object.name === EmberLoggerVarName ||

      // Check for Ember.Logger.<log>
      (node.callee.object.property && node.callee.object.property.name === EmberLoggerVarName &&
        node.callee.object.object && node.callee.object.object.name === emberVarName)

    ) && VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
  )
}
/* eslint-enable complexity */

/**
 * Determine if call expression is a destructured Ember.Logger call that can be
 * converted to a console call
 * @param {ESLintNode} node - call expression node
 * @param {String} loggerVarName - variable name for Ember.Logger
 * @returns {Boolean} whether or not destructured Ember.Logger call
 */
function isDestructuredLoggerPropertyCall (node, loggerVarName) {
  return (
    node.callee.object &&
    node.callee.object.name === loggerVarName &&
    VALID_LOGGER_METHODS.indexOf(node.callee.property.name) !== -1
  )
}

/**
 * Determine if call expression is a structured Ember.Logger call that can be
 * converted to a console call
 * @param {ESLintNode} node - call expression node
 * @param {String} emberVarName - variable name for Ember
 * @returns {Boolean} whether or not structured Ember.Logger call
 */
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

/**
 * Report that console should be used instead of destructured Ember.Logger
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - call expression node
 * @param {String} loggerVarName - variable name for Ember.Logger
 */
function reportUseConsoleInsteadOfDestructuredLogger (context, node, loggerVarName) {
  context.report({
    fix: function (fixer) {
      return fixer.replaceText(node.callee.object, 'console')
    },
    message: 'Use console instead of ' + loggerVarName,
    node: node.callee.object
  })
}

/**
 * Report that console should be used instead of structured Ember.Logger
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - call expression node
 * @param {String} emberVarName - variable name for Ember
 * @param {String} loggerVarName - variable name for Ember.Logger
 */
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

/**
 * Report that Ember.Logger should be used instead of console
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - call expression node
 * @param {String} emberVarName - variable name for Ember
 * @param {String} loggerVarName - variable name for Ember.Logger
 */
function reportUseLoggerInsteadOfConsole (context, node, emberVarName, loggerVarName) {
  context.report({
    fix: function (fixer) {
      return fixer.replaceText(node.callee.object, 'console')
    },
    message: 'Use console instead of Ember.Logger',
    node: node.callee.object
  })
}

module.exports = {
  create: function (context) {
    var emberVarName = null
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var loggerVarName = null

    return {
      /* eslint-disable complexity */
      /**
       * Determine if Ember.Logger is being used when it shouldn't be (when Ember is
       * imported)
       * @example `import Ember from 'ember'; Ember.Logger.info('Test')`
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (!isNever) {
          if (emberVarName && isEmberLoggerCall(node, emberVarName, loggerVarName)) {
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
      /* eslint-enable complexity */

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
      description: 'Enforce usage of console over Ember.Logger',
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
