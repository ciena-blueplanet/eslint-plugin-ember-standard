const RuleTester = require('eslint').RuleTester
const rule = require('../rules/import')

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module'
}

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
    parserOptions
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
    parserOptions
  }
}

function validAlwaysTest (code) {
  return {
    code: code,
    options: ['always'],
    parserOptions
  }
}

const ruleTester = new RuleTester()

ruleTester.run('destructure', rule, {
  invalid: [
    invalidAlwaysTest('import Foo from "ember"', 'Foo'),
    invalidNeverTest('import Ember from "ember"'),
    invalidNeverTest('import Foo from "ember"')
  ],
  valid: [
    validAlwaysTest('import Ember from "ember"')
  ]
})
