var RuleTester = require('eslint').RuleTester
var rule = require('../rules/import')

function invalidNeverTest (code) {
  return {
    code: code,
    errors: [
      {
        line: 1,
        message: 'Use "Ember" global instead of explicitly importing from "ember"',
        type: 'ImportDeclaration'
      }
    ],
    options: ['never'],
    parser: 'babel-eslint'
  }
}

function validAlwaysTest (code) {
  return {
    code: code,
    options: ['always'],
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('import', rule, {
  invalid: [
    {
      code: 'import Foo from "ember"',
      errors: [
        {
          column: 8,
          line: 1,
          message: 'Import Ember as "Ember" not "Foo"',
          type: 'ImportDefaultSpecifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const x = "y"\n' +
            'const {Logger} = Foo\n' +
            'Foo.MODEL_FACTORY_INJECTIONS = true;\n' +
            'export default Foo.Component.extend({\n' +
            '  bar: Test.Foo.baz\n' +
            '})',
      errors: [
        {
          column: 8,
          line: 1,
          message: 'Import Ember as "Ember" not "Foo"',
          type: 'ImportDefaultSpecifier'
        },
        {
          column: 18,
          line: 3,
          message: 'Should be using "Ember" instead of "Foo"',
          type: 'Identifier'
        },
        {
          column: 1,
          line: 4,
          message: 'Should be using "Ember" instead of "Foo"',
          type: 'Identifier'
        },
        {
          column: 16,
          line: 5,
          message: 'Should be using "Ember" instead of "Foo"',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const x = "y"\n' +
              'const {Logger} = Ember\n' +
              'Ember.MODEL_FACTORY_INJECTIONS = true;\n' +
              'export default Ember.Component.extend({\n' +
              '  bar: Test.Foo.baz\n' +
              '})',
      parser: 'babel-eslint'
    },
    invalidNeverTest('import Ember from "ember"'),
    invalidNeverTest('import Foo from "foo"; import Ember from "ember"'),
    invalidNeverTest('import Foo from "ember"'),
    invalidNeverTest('import Foo from "foo"; import Bar from "ember"'),
  ],
  valid: [
    validAlwaysTest('import Ember from "ember"')
  ]
})
