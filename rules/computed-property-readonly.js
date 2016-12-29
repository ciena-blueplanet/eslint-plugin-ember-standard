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
 * Report that computed property is not currently readOnly
 * @param {ESLintContext} context - context
 * @param {ESLintNode} node - node representing computed decorator
 */
function reportMissingReadOnlyDecorator (context, node) {
  context.report({
    fix: function (fixer) {
      var computedDecoratorLine = context.getSourceCode().lines[node.parent.loc.start.line - 1]
      var leadingWhiteSpace = computedDecoratorLine.replace(/^(\s*).*$/, '$1')

      return fixer.insertTextBefore(node.parent, '@readOnly\n' + leadingWhiteSpace)
    },
    message: 'Computed property should be readOnly',
    node: node.parent.parent
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

/**
 * Process computed call expression
 * @param {ESLintContext} context - context
 * @param {ESLintNode} node - call expression node
 * @param {Boolean} isNever - whether or not "never" option is set
 */
function processComputed (context, node, isNever) {
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
}

/**
 * Process computed decorator call expression
 * @param {ESLintContext} context - context
 * @param {ESLintNode} node - call expression node
 * @param {Boolean} isNever - whether or not "never" option is set
 */
function processComputedDecorator (context, node, isNever) {
  var readOnlyDecorator = null

  node.parent.parent.decorators
    .forEach(function (decorator) {
      if (decorator.expression.name === 'readOnly') {
        readOnlyDecorator = decorator
      }
    })

  if (readOnlyDecorator && isNever) {
    reportUnwantedReadOnly(context, readOnlyDecorator)
  } else if (!readOnlyDecorator && !isNever) {
    reportMissingReadOnlyDecorator(context, node)
  }
}

module.exports = {
  create: function (context) {
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      /**
       * Determine if readOnly is missing when it shouldn't be or is present
       * when it shouldn't be
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (node.parent.type === 'Decorator') {
          processComputedDecorator(context, node, isNever)
        } else {
          processComputed(context, node, isNever)
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
