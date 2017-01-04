var reservedNames = [
  'Object',
  'String'
]

module.exports = {
  create: function (context) {
    var emberDestructureVariableDeclarator = null
    var emberImport = null
    var emberVarName = 'Ember'
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var propertiesToDestructure = []

    return {
      /**
       * Get Ember variable name from import statement
       * @example `import Ember from 'ember'` would yield "Ember"
       * @example `import Foo from 'ember'` would yield "Foo"
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        if (node.source.value === 'ember') {
          emberImport = node
          emberVarName = node.specifiers[0].local.name
        }
      },

      /**
       * Determine if Ember property is being referenced in an un-destructured manner
       * @example `export default const Ember.Component.extend({})`
       * @param {ESLintNode} node - member expression node
       */
      MemberExpression: function (node) {
        if (
          !isNever &&
          node.object.name === emberVarName &&
          node.parent.type !== 'AssignmentExpression'
        ) {
          if (reservedNames.indexOf(node.property.name) !== -1) {
            return
          }

          if (propertiesToDestructure.indexOf(node.property.name) === -1) {
            propertiesToDestructure.push(node.property.name)
          }

          context.report({
            fix: function (fixer) {
              return fixer.replaceText(node, node.property.name)
            },
            message: emberVarName + '.' + node.property.name + ' should be destructured',
            node: node
          })
        }
      },

      /**
       * Destructure Ember properties being used
       * @param {ESLintNode} node - program node
       */
      'Program:exit': function (node) {
        if (propertiesToDestructure.length === 0) {
          return
        }

        var message = 'The following need destructured: ' + propertiesToDestructure.sort().join(', ')

        var textToInsert = propertiesToDestructure
          .sort()
          .join(', ')

        // Add destructured properties to existing Ember destructure variable declarator
        if (emberDestructureVariableDeclarator) {
          var lastProperty = emberDestructureVariableDeclarator.id
            .properties[emberDestructureVariableDeclarator.id.properties.length - 1]

          context.report({
            fix: function (fixer) {
              return fixer.insertTextAfter(lastProperty, ', ' + textToInsert)
            },
            message: message,
            node: emberDestructureVariableDeclarator.parent
          })

        // Since there is no Ember destructure variable declarator add one after import
        } else if (emberImport) {
          context.report({
            fix: function (fixer) {
              return fixer.insertTextAfter(
                emberImport,
                '\nconst {' + textToInsert + '} = ' + emberVarName + '\n'
              )
            },
            message: message,
            node: emberImport
          })

        // Since there is no variable declarator or import, add them to the top
        // (only adding import when "never" option isn't present)
        } else {
          context.report({
            fix: function (fixer) {
              return fixer.insertTextBefore(node, 'const {' + textToInsert + '} = Ember\n')
            },
            message: message,
            node: node
          })
        }
      },

      /**
       * Determine if Ember is being destructured when in shouldn't be
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (node.id.type === 'ObjectPattern' && node.init.name === emberVarName) {
          emberDestructureVariableDeclarator = node

          if (isNever) {
            context.report({
              fix: function (fixer) {
                return fixer.remove(node.parent)
              },
              message: emberVarName + ' should not be destructured',
              node: node.parent
            })
          }
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'Enforce destructuring of Ember classes',
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
