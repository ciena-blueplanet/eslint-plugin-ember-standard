module.exports = {
  create: function (context) {
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var emberVarName = 'Ember'

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
          context.report(node, emberVarName + '.' + node.property.name + ' should be destructured')
        }
      },

      /**
       * Determine if Ember is being destructured when in shouldn't be
       * @param {ESLintNode} node - variable declarator node
       */
      VariableDeclarator: function (node) {
        if (isNever && node.id.type === 'ObjectPattern' && node.init.name === emberVarName) {
          context.report(node, emberVarName + ' should not be destructured')
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
