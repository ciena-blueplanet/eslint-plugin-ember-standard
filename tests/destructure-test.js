const RuleTester = require('eslint').RuleTester
const rule = require('../rules/destructure')

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module'
}

function invalidAlwaysTest (code, name) {
  return {
    code: code,
    errors: [
      {
        line: 1,
        message: 'Ember.' + name + ' should be destructured',
        type: 'MemberExpression'
      }
    ],
    options: ['always'],
    parserOptions
  }
}

function invalidNeverTest (code, name) {
  return {
    code: code,
    errors: [
      {
        line: 1,
        message: 'Ember should not be destructured',
        type: 'VariableDeclarator'
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

function validNeverTest (code) {
  return {
    code: code,
    options: ['never'],
    parserOptions
  }
}

const ruleTester = new RuleTester()

ruleTester.run('destructure', rule, {
  invalid: [
    invalidAlwaysTest('export default Ember.Component.extend({})', 'Component'),
    invalidAlwaysTest('export default Ember.Controller.extend({})', 'Controller'),
    invalidAlwaysTest('export default Ember.Route.extend({})', 'Route'),
    invalidAlwaysTest('var a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('let a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('const a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('var a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('let a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('const a = Ember.String.camelize("foo-bar")', 'String'),
    invalidNeverTest('const {Controller} = Ember'),
    invalidNeverTest('const {Component, Logger} = Ember')
  ],
  valid: [
    validAlwaysTest('const {Controller} = Ember'),
    validAlwaysTest('const {Component, Logger} = Ember'),
    validAlwaysTest('export default Component.extend({})'),
    validAlwaysTest('export default Controller.extend({})'),
    validAlwaysTest('export default Route.extend({})'),
    validNeverTest('export default Ember.Component.extend({})'),
    validNeverTest('export default Ember.Controller.extend({})'),
    validNeverTest('export default Ember.Route.extend({})')
  ]
})
