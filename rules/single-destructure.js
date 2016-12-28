function propertySorter (a, b) {
  return a.key.name > b.key.name
}

module.exports = {
  create: function (context) {
    var emberVarName = 'Ember'
    var firstEmberDestructure = null
    var propertiesToMerge = []
    var propertiesToRename = []

    return {
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
       * Merge Ember destructure variable declarators into one
       * @param {ESLintNode} node - program node
       */
      'Program:exit': function (node) {
        if (propertiesToMerge.length === 0) {
          return
        }

        var textToInsert = propertiesToMerge
          .sort(propertySorter)
          .map(function (property) {
            if (property.key.name !== property.value.name) {
              return property.key.name + ': ' + property.value.name
            }

            return property.key.name
          })
          .join(', ')

        var lastProperty = firstEmberDestructure.id.properties[firstEmberDestructure.id.properties.length - 1]

        context.report({
          fix: function (fixer) {
            return fixer.insertTextAfter(lastProperty, ', ' + textToInsert)
          },
          node: node
        })
      },

      MemberExpression: function (node) {
        propertiesToRename.forEach(function (nameDef) {
          if (node.object.name === nameDef.oldName) {
            context.report({
              fix: function (fixer) {
                return fixer.replaceText(node.object, nameDef.newName)
              },
              message: 'Use "' + nameDef.newName + '" instead of "' + nameDef.oldName + '"',
              node: node.object
            })
          }
        })
      },

      /**
       * Determine if Ember is being destructured when in shouldn't be
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (node.id.type === 'ObjectPattern' && node.init.name === emberVarName) {
          if (firstEmberDestructure) {
            var column = firstEmberDestructure.parent.loc.start.column
            var line = firstEmberDestructure.parent.loc.start.line

            context.report({
              fix: function (fixer) {
                firstEmberDestructure.id.properties.forEach(function (propertyA) {
                  node.id.properties.forEach(function (propertyB, index) {
                    if (propertyA.key.name === propertyB.key.name) {
                      propertiesToRename.push({
                        newName: propertyA.value.name,
                        oldName: propertyB.value.name
                      })
                    } else {
                      propertiesToMerge.push(propertyB)
                    }
                  })
                })

                return fixer.remove(node.parent)
              },
              message: 'Do not destructure Ember more than once, merge this with line ' + line + ' column ' + column,
              node: node
            })
          } else {
            firstEmberDestructure = node
          }
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'Force all destructuring of Ember to occur in one variable declarator',
      recommended: true
    },
    fixable: 'code'
  }
}
