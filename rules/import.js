module.exports = {
  create: function (context) {
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
      description: 'Enforce import of Ember instead of using global',
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
