var RuleTester = require('eslint').RuleTester
var rule = require('../rules/destructure')

function invalidAlwaysTest (code, name, emberVar) {
  emberVar = emberVar || 'Ember'

  return {
    code: code,
    errors: [
      {
        line: 1,
        message: emberVar + '.' + name + ' should be destructured',
        type: 'MemberExpression'
      }
    ],
    options: ['always'],
    parser: 'babel-eslint'
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

function validNeverTest (code) {
  return {
    code: code,
    options: ['never'],
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('destructure', rule, {
  invalid: [
    // Global "Ember" variable
    invalidAlwaysTest('export default Ember.Component.extend({})', 'Component'),
    invalidAlwaysTest('export default Ember.Controller.extend({})', 'Controller'),
    invalidAlwaysTest('export default Ember.Route.extend({})', 'Route'),
    invalidAlwaysTest('var a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('let a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('const a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('var a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('let a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('const a = Ember.String.camelize("foo-bar")', 'String'),

    // Import Ember as "Ember" variable
    invalidAlwaysTest('import Ember from "ember"; export default Ember.Component.extend({})', 'Component'),
    invalidAlwaysTest('import Ember from "ember"; export default Ember.Controller.extend({})', 'Controller'),
    invalidAlwaysTest('import Ember from "ember"; export default Ember.Route.extend({})', 'Route'),
    invalidAlwaysTest('import Ember from "ember"; var a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('import Ember from "ember"; let a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('import Ember from "ember"; const a = Ember.Object.create({})', 'Object'),
    invalidAlwaysTest('import Ember from "ember"; var a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('import Ember from "ember"; let a = Ember.String.camelize("foo-bar")', 'String'),
    invalidAlwaysTest('import Ember from "ember"; const a = Ember.String.camelize("foo-bar")', 'String'),

    // Import Ember as "Foo" variable
    invalidAlwaysTest('import Foo from "ember"; export default Foo.Component.extend({})', 'Component', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; export default Foo.Controller.extend({})', 'Controller', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; export default Foo.Route.extend({})', 'Route', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; var a = Foo.Object.create({})', 'Object', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; let a = Foo.Object.create({})', 'Object', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; const a = Foo.Object.create({})', 'Object', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; var a = Foo.String.camelize("foo-bar")', 'String', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; let a = Foo.String.camelize("foo-bar")', 'String', 'Foo'),
    invalidAlwaysTest('import Foo from "ember"; const a = Foo.String.camelize("foo-bar")', 'String', 'Foo'),

    // Make sure it doesn't complain on assignment
    invalidAlwaysTest('const bar = Ember.MODEL_FACTORY_INJECTIONS', 'MODEL_FACTORY_INJECTIONS'),
    invalidAlwaysTest('import Foo from "ember"; const bar = Foo.MODEL_FACTORY_INJECTIONS', 'MODEL_FACTORY_INJECTIONS', 'Foo'),

    // Destructuring when rule is set to "never"
    invalidNeverTest('const {Controller} = Ember'),
    invalidNeverTest('const {Component, Logger} = Ember')
  ],
  valid: [
    // Destructuring of global "Ember" variable
    validAlwaysTest('const {Controller} = Ember'),
    validAlwaysTest('const {Component, Logger} = Ember'),

    // Destructuring of Ember as "Ember" variable
    validAlwaysTest('import Ember from "Ember"; const {Controller} = Ember'),
    validAlwaysTest('import Ember from "Ember"; const {Component, Logger} = Ember'),

    // Destructuring of Ember as "Foo" variable
    validAlwaysTest('import Foo from "Ember"; const {Controller} = Foo'),
    validAlwaysTest('import Foo from "Ember"; const {Component, Logger} = Foo'),

    // Calling destructured Ember classes
    validAlwaysTest('export default Component.extend({})'),
    validAlwaysTest('export default Controller.extend({})'),
    validAlwaysTest('export default Route.extend({})'),

    // Make sure it doesn't complain on assignment
    invalidAlwaysTest('Ember.MODEL_FACTORY_INJECTIONS = true'),
    invalidAlwaysTest('import Foo from "ember"; Foo.MODEL_FACTORY_INJECTIONS = true'),

    // Calling non-destructured Ember classes when rule is set to "never"
    validNeverTest('export default Ember.Component.extend({})'),
    validNeverTest('export default Ember.Controller.extend({})'),
    validNeverTest('export default Ember.Route.extend({})'),

    // Calling non-destructured Ember classes when rule is set to "never" and Ember as "Ember" variable
    validNeverTest('import Ember from "Ember"; export default Ember.Component.extend({})'),
    validNeverTest('import Ember from "Ember"; export default Ember.Controller.extend({})'),
    validNeverTest('import Ember from "Ember"; export default Ember.Route.extend({})'),

    // Calling non-destructured Ember classes when rule is set to "never" and Ember as "Foo" variable
    validNeverTest('import Foo from "Ember"; export default Foo.Component.extend({})'),
    validNeverTest('import Foo from "Ember"; export default Foo.Controller.extend({})'),
    validNeverTest('import Foo from "Ember"; export default Foo.Route.extend({})')
  ]
})
