module.exports = {
  create: function (context) {
    var emberVarName = 'Ember'
    var firstEmberDestructureLocation = null

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
       * Determine if Ember is being destructured when in shouldn't be
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (node.id.type === 'ObjectPattern' && node.init.name === emberVarName) {
          if (firstEmberDestructureLocation) {
            var column = firstEmberDestructureLocation.start.column
            var line = firstEmberDestructureLocation.start.line

            context.report(
              node,
              'Do not destructure Ember more than once, merge this with line ' + line + ' column ' + column
            )
          } else {
            firstEmberDestructureLocation = node.parent.loc
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
    }
  }
}
