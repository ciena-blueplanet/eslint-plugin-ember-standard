/**
 * Get start location of computed property (or null if not a CP)
 * @param {ESLintNode} node - call expression node
 * @param {String} setVarName - destructured variable name for Ember.computed
 * @returns {Number} start location of computed property (or null if not a CP)
 */
function getComputedPropertyStart (node, computedVarName) {
  var isStructuredComputedProperyCall = (
    node.callee.property && node.callee.property.name === 'computed'
  )

  var isUnstructuredComputedPropertyCall = node.callee.name === computedVarName

  if (isStructuredComputedProperyCall || isUnstructuredComputedPropertyCall) {
    return node.start
  }

  return null
}

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

module.exports = {
  create: function (context) {
    var computedVarName = null
    var currentComputedPropertyStart = null
    var emberVarName = 'Ember'
    var setVarName = null

    return {
      /**
       * Determine if we are entering a computed property or if a set call is
       * being made while we are within a computed property
       * @param {ESLintNode} node - call expression node
       */
      CallExpression: function (node) {
        var cpStart = getComputedPropertyStart(node, computedVarName)

        if (cpStart) {
          currentComputedPropertyStart = cpStart
          return
        }

        if (isSetCall(node, setVarName, emberVarName)) {
          context.report(node, 'Do not call this.set() or Ember.set() in a computed property')
        }
      },

      /**
       * Determine if we are leaving a computed property
       * @param {ESLintNode} node - call expression node
       */
      'CallExpression:exit': function (node) {
        if (node.start === currentComputedPropertyStart) {
          currentComputedPropertyStart = null
        }
      },

      /**
       * Get Ember variable name from import statement
       * @example `import Ember from 'ember'` would yield "Ember"
       * @example `import Foo from 'ember'` would yield "Foo"
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        if (node.source.value === 'ember') {
          emberVarName = node.specifiers[0].local.name
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
