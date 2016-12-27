module.exports = {
  create: function (context) {
    var isNever = Boolean(context.options.length > 0 && context.options[0] === 'never')

    return {
      ImportDeclaration: function (node) {
        if (node.source.value !== 'ember') {
          return
        }

        var emberVarName = node.specifiers[0].local.name

        if (isNever) {
          context.report(node, 'Use "Ember" global instead of explicitly importing from "ember"')
        } else if (emberVarName !== 'Ember') {
          context.report(node, 'Import Ember as "Ember" not "' + emberVarName + '"')
        }
      }
    }
  },
  meta: {
    deprecated: false,
    docs: {
      category: 'Stylistic Issues',
      description: 'enforce import of Ember instead of using global',
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
