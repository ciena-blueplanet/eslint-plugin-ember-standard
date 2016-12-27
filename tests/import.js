const RuleTester = require('eslint').RuleTester
const rule = require('../rules/import')

function invalidAlwaysTest (code, emberVarName) {
  return {
    code: code,
    errors: [
      {
        line: 1,
        message: 'Import Ember as "Ember" not "' + emberVarName + '"',
        type: 'ImportDeclaration'
      }
    ],
    options: ['always'],
    parser: 'babel-eslint'
  }
}

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

const ruleTester = new RuleTester()

ruleTester.run('import', rule, {
  invalid: [
    invalidAlwaysTest('import Foo from "ember"', 'Foo'),
    invalidNeverTest('import Ember from "ember"'),
    invalidNeverTest('import Foo from "ember"')
  ],
  valid: [
    validAlwaysTest('import Ember from "ember"')
  ]
})
