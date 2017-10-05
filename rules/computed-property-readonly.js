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
 * @param {String} readOnlyVarName - variable name for readOnly decorator
 */
function reportMissingReadOnlyDecorator (context, node, readOnlyVarName) {
  readOnlyVarName = readOnlyVarName || 'readOnly'

  context.report({
    fix: function (fixer) {
      var computedDecoratorLine = context.getSourceCode().lines[node.parent.loc.start.line - 1]
      var leadingWhiteSpace = computedDecoratorLine.replace(/^(\s*).*$/, '$1')

      return fixer.insertTextBefore(node.parent, '@' + readOnlyVarName + '\n' + leadingWhiteSpace)
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
 * @param {String} computedVarName - variable name for destructured Ember.computed
 */
function processComputed (context, node, isNever, computedVarName) {
  var isDirectCall = computedVarName && node.callee.name === computedVarName

  var isNestedPropertyCall = (
    node.callee.property &&
    ['alias', 'computed'].indexOf(node.callee.property.name) !== -1
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
 * @param {String} readOnlyVarName - variable name for readOnly decorator
 * @returns {Boolean} whether or not readOnly decorator was added
 */
function processComputedDecorator (context, node, isNever, readOnlyVarName) {
  var readOnlyDecorator = null

  node.parent.parent.decorators
    .forEach(function (decorator) {
      if (decorator.expression.name === readOnlyVarName) {
        readOnlyDecorator = decorator
      }
    })

  if (readOnlyDecorator && isNever) {
    reportUnwantedReadOnly(context, readOnlyDecorator)
  } else if (!readOnlyDecorator && !isNever) {
    reportMissingReadOnlyDecorator(context, node, readOnlyVarName)
    return true
  }

  return false
}

module.exports = {
  create: function (context) {
    var computedVarName = null
    var emberComputedDecoratorsImportNode = null
    var emberVarName = null
    var importReadOnlyDecoratorVar = false
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var readOnlyDecoratorVarName = null

    return {
      /**
       * Determine if readOnly is missing when it shouldn't be or is present
       * when it shouldn't be
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (node.parent.type === 'Decorator') {
          if (
            processComputedDecorator(context, node, isNever, readOnlyDecoratorVarName) &&
            !readOnlyDecoratorVarName
          ) {
            importReadOnlyDecoratorVar = true
          }
        } else {
          processComputed(context, node, isNever, computedVarName)
        }
      },

      /**
       * Get Ember variable name from import statement
       * @example `import Ember from 'ember'` would yield "Ember"
       * @example `import Foo from 'ember'` would yield "Foo"
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        switch (node.source.value) {
          case 'ember':
            emberVarName = node.specifiers[0].local.name
            break

          case 'ember-computed-decorators':
            emberComputedDecoratorsImportNode = node
            node.specifiers
              .forEach(function (specifier) {
                if (
                  specifier.imported &&
                  specifier.imported.name === 'readOnly'
                ) {
                  readOnlyDecoratorVarName = specifier.local.name
                }
              })

            break

          case 'ember-decorators/object':
            emberComputedDecoratorsImportNode = node
            node.specifiers
              .forEach(function (specifier) {
                if (
                  specifier.imported &&
                  specifier.imported.name === 'readOnly'
                ) {
                  readOnlyDecoratorVarName = specifier.local.name
                }
              })

            break
        }
      },

      /**
       * Make sure readOnly is imported from ember-computed-decorators if it is
       * being used
       * @param {ESLintNode} node - program node
       */
      'Program:exit': function (node) {
        if (!importReadOnlyDecoratorVar) {
          return
        }

        var specifierCount = emberComputedDecoratorsImportNode.specifiers.length

        if (specifierCount > 1 || emberComputedDecoratorsImportNode.source.value === 'ember-decorators/object') {
          context.report({
            fix: function (fixer) {
              return fixer.insertTextAfter(
                emberComputedDecoratorsImportNode.specifiers[specifierCount - 1],
                ', readOnly'
              )
            },
            message: 'Needs to import readOnly',
            node: emberComputedDecoratorsImportNode
          })
          return
        }

        context.report({
          fix: function (fixer) {
            return fixer.insertTextAfter(
              emberComputedDecoratorsImportNode.specifiers[0],
              ', {readOnly}'
            )
          },
          message: 'Needs to import readOnly',
          node: emberComputedDecoratorsImportNode
        })
      },

      /**
       * Get destructured variable names that effect this rule
       * @example `const {computed} = Ember` would use "computed" when looking
       * for computed properties whereas `const {computed: react} = Ember` would
       * use "react" instead of "computed"
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (
          node.id.type === 'ObjectPattern' &&
          node.init.name === emberVarName &&
          node.id.properties.length !== 0
        ) {
          node.id.properties.forEach(function (property) {
            if (property.key.name === 'computed') {
              computedVarName = property.value.name
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
