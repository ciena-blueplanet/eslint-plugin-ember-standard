/**
 * Validate basic property
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - member expression node
 */
function basicPropertyValidator (context, node) {
  if (
    node.parent.type === 'CallExpression' &&
    node.parent.callee.property === node.property
  ) {
    context.report({
      message: node.property.name + ' should not be a call expression',
      node: node.property
    })
  }
}

/**
 * Validate function call property that expects one argument
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - member expression node
 * @returns {Boolean} whether or not an error was found
 */
function functionWithOneArgValidator (context, node) {
  if (
    node.parent.type !== 'CallExpression' ||
    node.parent.callee.property !== node.property
  ) {
    context.report({
      message: node.property.name + ' should be a call expression',
      node: node.property
    })

    return true
  }

  if (node.parent.arguments.length !== 1) {
    context.report({
      message: node.property.name + ' call expression should only have one argument',
      node: node.parent
    })

    return true
  }

  return false
}

/**
 * Validate function call property that expects one array argument
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - member expression node
 */
function functionWithArrayArgValidator (context, node) {
  if (functionWithOneArgValidator(context, node)) {
    return
  }

  if (node.parent.arguments[0].type !== 'ArrayExpression') {
    context.report({
      message: 'argument should be an array expression',
      node: node.parent.arguments[0]
    })
  }
}

/**
 * Validate function call property that expects one object argument
 * @param {ESLintContext} context - test context
 * @param {ESLintNode} node - member expression node
 */
function functionWithObjectArgValidator (context, node) {
  if (functionWithOneArgValidator(context, node)) {
    return
  }

  if (node.parent.arguments[0].type !== 'ObjectExpression') {
    context.report({
      message: 'argument should be an object expression',
      node: node.parent.arguments[0]
    })
  }
}

var propertyValidators = {
  any: basicPropertyValidator,
  array: basicPropertyValidator,
  arrayOf: functionWithOneArgValidator,
  bool: basicPropertyValidator,
  element: basicPropertyValidator,
  EmberObject: basicPropertyValidator,
  func: basicPropertyValidator,
  instanceOf: functionWithOneArgValidator,
  null: basicPropertyValidator,
  number: basicPropertyValidator,
  object: basicPropertyValidator,
  oneOf: functionWithArrayArgValidator,
  oneOfType: functionWithArrayArgValidator,
  shape: functionWithObjectArgValidator,
  string: basicPropertyValidator,
  symbol: basicPropertyValidator
}

module.exports = {
  create: function (context) {
    var propTypesVarName = null

    return {
      /**
       * Validate PropType properties
       * @param {ESLintNode} node - member expression node
       */
      MemberExpression: function (node) {
        if (node.object.name !== propTypesVarName) {
          return
        }

        var propertyName = node.property.name

        if (propertyName in propertyValidators) {
          propertyValidators[propertyName](context, node)
          return
        }

        // If invalid/unknown property
        context.report({
          message: propertyName + ' is not a valid property on ' + propTypesVarName,
          node: node.property
        })
      },

      /**
       * Get PropTypes variable name from import statement
       * @example `import {PropTypes} from 'ember-prop-types'` would yield "PropTypes"
       * @example `import {PropTypes as PT} from 'ember-prop-types'` would yield "PT"
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        if (node.source.value === 'ember-prop-types') {
          node.specifiers
            .forEach(function (specifier) {
              if (
                specifier.type === 'ImportSpecifier' &&
                specifier.imported.name === 'PropTypes'
              ) {
                propTypesVarName = specifier.local.name
              }
            })
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Possible Errors',
      description: 'Prevent invalid usage of PropTypes from ember-prop-types',
      recommended: true
    }
  }
}
