const RuleTester = require('eslint').RuleTester
const rule = require('../rules/logger')

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module'
}

function invalidAlwaysTest (code, propertyName) {
  return {
    code: code,
    errors: [
      {
        line: 1,
        message: 'Use Ember.Logger.' + propertyName + ' instead of console.' + propertyName,
        type: 'CallExpression'
      }
    ],
    options: ['always'],
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
    invalidAlwaysTest('import Ember from "ember"; console.debug("Test")', 'debug'),
    invalidAlwaysTest('import Foo from "ember"; console.debug("Test")', 'debug'),
    invalidAlwaysTest('import Ember from "ember"; console.error("Test")', 'error'),
    invalidAlwaysTest('import Foo from "ember"; console.error("Test")', 'error'),
    invalidAlwaysTest('import Ember from "ember"; console.info("Test")', 'info'),
    invalidAlwaysTest('import Foo from "ember"; console.info("Test")', 'info'),
    invalidAlwaysTest('import Ember from "ember"; console.log("Test")', 'log'),
    invalidAlwaysTest('import Foo from "ember"; console.log("Test")', 'log'),
    invalidAlwaysTest('import Ember from "ember"; console.warn("Test")', 'warn'),
    invalidAlwaysTest('import Foo from "ember"; console.warn("Test")', 'warn')
  ],
  valid: [
    validAlwaysTest('console.info("Test")'),
    validAlwaysTest('Ember.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; Ember.Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; Foo.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const {Logger} = Ember; Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; const {Logger} = Foo; Logger.info("Test")')
  ]
})
