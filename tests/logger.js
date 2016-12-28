var RuleTester = require('eslint').RuleTester
var rule = require('../rules/logger')

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

ruleTester.run('logger', rule, {
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
    validAlwaysTest('import Foo from "foo"; console.info("Test")'),
    validAlwaysTest('Ember.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; Ember.Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; Foo.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const {Logger} = Ember; Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; const {Logger} = Foo; Logger.info("Test")')
  ]
})
