module.exports = {
  create: function (context) {
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')
    var emberVar = 'Ember'

    return {
      ImportDeclaration: function (node) {
        if (node.source.value === 'ember') {
          emberVar = node.specifiers[0].local.name
        }
      },

      MemberExpression: function (node) {
        if (!isNever && node.object.name === emberVar) {
          context.report(node, emberVar + '.' + node.property.name + ' should be destructured')
        }
      },

      VariableDeclarator: function (node) {
        if (isNever && node.id.type === 'ObjectPattern' && node.init.name === emberVar) {
          context.report(node, emberVar + ' should not be destructured')
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'enforce destructuring of Ember classes',
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
