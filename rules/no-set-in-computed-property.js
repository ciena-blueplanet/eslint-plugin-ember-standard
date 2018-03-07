/**
 * Determine if call expression is part of a computed property
 * @example `foo: Ember.computed('a', function () {})`
 * @example `foo: computed('a', function () {})`
 * @param {ESLintNode} node - call expression node
 * @param {String} computedVarName - destructured variable name for Ember.computed
 * @returns {Boolean} whether or not call expression is part of a computed property
 */
function isComputedProperty (node, computedVarName) {
  if (!node.parent || !node.parent.callee) {
    return false
  }

  var isStructuredComputedProperyCall = (
    node.parent.callee.property && node.parent.callee.property.name === 'computed'
  )

  var isUnstructuredComputedPropertyCall = node.parent.callee.name === computedVarName

  return isStructuredComputedProperyCall || isUnstructuredComputedPropertyCall
}

/**
 * Determine if call expression is part of a decorator computed property
 * @example
 *   ```
 *   @computed('bar')
 *   foo (bar) {}
 *   ```
 * @param {ESLintNode} node - call expression node
 * @param {String} computedDecoratorVarName - imported default for ember-computed-decorators
 * @returns {Boolean} whether or not call expression is part of a decorator CP
 */
function isDecoratorComputedProperty (node, computedDecoratorVarName) {
  if (!node.parent || !node.parent.decorators) {
    return false
  }

  return node.parent.decorators
    .some(function (decorator) {
      return (
        decorator.expression &&
        decorator.expression.callee &&
        decorator.expression.callee.name === computedDecoratorVarName
      )
    })
}

/* eslint-disable complexity */
/**
 * Determine if current call expression is a call to Ember.set() or this.set()
 * @param {ESLintNode} node - call expression node
 * @param {String} setVarName - destructured variable name for Ember.set
 * @param {String} emberVarName - variable name for Ember import
 * @returns {Boolean} whether or not call is a set call
 */
function isSetCall (node, setVarName, emberVarName) {
  // Structured set call (i.e. `Ember.set()`` or `this.set()`)
  if (
    node.callee.property &&
    node.callee.property.name === 'set' &&
    node.callee.object &&
    (node.callee.object.type === 'ThisExpression' || node.callee.object.name === emberVarName)
  ) {
    return true
  }

  // Unstructured call (i.e. `set()`)
  return node.callee.name === setVarName
}
/* eslint-enable complexity */

module.exports = {
  create: function (context) {
    var computedDecoratorVarName = null
    var computedVarName = null
    var currentComputedProperty = null
    var emberVarName = 'Ember'
    var setVarName = null

    return {
      /**
       * Determine if a set call is being made while we are within a computed
       * property
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        if (
          currentComputedProperty &&
          isSetCall(node, setVarName, emberVarName)
        ) {
          context.report({
            message: 'Do not call this.set() or Ember.set() in a computed property',
            node: node
          })
        }
      },

      /**
       * Determine if we are entering a computed property
       * @param {ESLintNode} node - function expression node
       */
      FunctionExpression: function (node) {
        if (
          isComputedProperty(node, computedVarName) ||
          isDecoratorComputedProperty(node, computedDecoratorVarName)
        ) {
          currentComputedProperty = node
        }
      },

      /**
       * Determine if we are leaving a computed property
       * @param {ESLintNode} node - function expression node
       */
      'FunctionExpression:exit': function (node) {
        if (node === currentComputedProperty) {
          currentComputedProperty = null
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
            computedDecoratorVarName = node.specifiers[0].local.name
            break
        }
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
            switch (property.key.name) {
              case 'computed':
                computedVarName = property.value.name
                break

              case 'set':
                setVarName = property.value.name
                break
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
      description: 'Prevent usage of this.set and Ember.set in computed properties',
      recommended: true
    }
  }
}
