/**
 * Report that computed property is not currently readOnly
 * @param {ESLintContext} context - context
 * @param {ESLintNode} node - node representing computed property
 */
function reportMissingReadOnly (context, node) {
  context.report({
    fix: function (fixer) {
      return fixer.insertTextAfter(node, '.readOnly()')
    },
    message: 'Computed property should be readOnly',
    node: node
  })
}

/**
 * Report that computed property is currently readOnly but shouldn't be
 * @param {ESLintContext} context - context
 * @param {ESLintNode} node - node representing computed property
 */
function reportUnwantedReadOnly (context, node) {
  context.report({
    fix: function (fixer) {
      var range = node.range

      return fixer.removeRange([
        range[0] - 1, // Include period
        range[1] + 2 // Include open and close parens
      ])
    },
    message: 'Computed property should not be readOnly',
    node: node
  })
}

module.exports = {
  create: function (context) {
    var emberVarName = 'Ember'
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      /**
       * Determine if readOnly is missing when it shouldn't be or is present
       * when it shouldn't be
       * @example `import Ember from 'ember'; console.info('Test')`
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        var methodNames = ['alias', 'computed']
        var isDirectCall = methodNames.indexOf(node.callee.name) !== -1

        var isNestedPropertyCall = (
          node.callee.property && methodNames.indexOf(node.callee.property.name) !== -1
        )

        var isReadOnly = node.parent.property && node.parent.property.name === 'readOnly'

        if (isDirectCall || isNestedPropertyCall) {
          if (isReadOnly && isNever) {
            reportUnwantedReadOnly(context, node.parent.property)
          } else if (!isReadOnly && !isNever) {
            reportMissingReadOnly(context, node.parent)
          }
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
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Best Practices',
      description: 'Ensure that computed properties are readOnly',
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
