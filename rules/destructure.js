module.exports = {
  create: function (context) {
    const isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      MemberExpression: function (node) {
        if (!isNever && node.object.name === 'Ember') {
          context.report(node, 'Ember.' + node.property.name + ' should be destructured')
        }
      },

      VariableDeclarator: function (node) {
        if (isNever && node.id.type === 'ObjectPattern' && node.init.name === 'Ember') {
          context.report(node, 'Ember should not be destructured')
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
