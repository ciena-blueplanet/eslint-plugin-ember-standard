module.exports = {
  create: function (context) {
    var emberVarName = 'Ember'
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      /**
       * Determine if Ember is being imported when it shouldn't be or if it is
       * being imported under a variable name other than "Ember"
       * @param {ESLintNode} node - import declaration node
       */
      ImportDeclaration: function (node) {
        if (node.source.value !== 'ember') {
          return
        }

        emberVarName = node.specifiers[0].local.name

        if (isNever) {
          context.report({
            fix: function (fixer) {
              return fixer.remove(node)
            },
            message: 'Use "Ember" global instead of explicitly importing from "ember"',
            node: node
          })
        } else if (emberVarName !== 'Ember') {
          context.report({
            fix: function (fixer) {
              return fixer.replaceText(node.specifiers[0], 'Ember')
            },
            message: 'Import Ember as "Ember" not "' + emberVarName + '"',
            node: node.specifiers[0]
          })
        }
      },

      /**
       * Fix destructured Ember properties using variable name other than Ember
       * @example `export default const Foo.Component.extend({})`
       * @param {ESLintNode} node - member expression node
       */
      MemberExpression: function (node) {
        if (
          !isNever &&
          node.object.name === emberVarName &&
          emberVarName !== 'Ember'
        ) {
          context.report({
            fix: function (fixer) {
              return fixer.replaceText(node.object, 'Ember')
            },
            message: 'Should be using "Ember" instead of "' + emberVarName + '"',
            node: node.object
          })
        }
      },

      /**
       * Fix Ember destructuring using variable name other than Ember
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (
          !isNever &&
          node.id.type === 'ObjectPattern' &&
          node.init.name === emberVarName &&
          emberVarName !== 'Ember'
        ) {
          context.report({
            fix: function (fixer) {
              return fixer.replaceText(node.init, 'Ember')
            },
            message: 'Should be using "Ember" instead of "' + emberVarName + '"',
            node: node.init
          })
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'Enforce import of Ember instead of using global',
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
