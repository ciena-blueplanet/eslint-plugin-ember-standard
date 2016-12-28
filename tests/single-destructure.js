var RuleTester = require('eslint').RuleTester
var rule = require('../rules/single-destructure')

function invalidTest (code, firstDestructureLine, firstDestructureColumn, errorLine) {
  var message = 'Do not destructure Ember more than once, merge this with line ' +
    firstDestructureLine + ' column ' + firstDestructureColumn

  return {
    code: code,
    errors: [
      {
        line: errorLine,
        message: message,
        type: 'VariableDeclarator'
      }
    ],
    parser: 'babel-eslint'
  }
}

function validTest (code) {
  return {
    code: code,
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('single-destructure', rule, {
  invalid: [
    invalidTest('import Ember from "ember"; const {Component} = Ember; const {Logger} = Ember', 1, 27, 1),
    invalidTest('import Foo from "ember"; const {Component} = Foo; const {Logger} = Foo', 1, 25, 1),
    invalidTest('import Ember from "ember";\nconst {Component} = Ember;\nconst {Logger} = Ember', 2, 0, 3),
    invalidTest('import Foo from "ember";\nconst {Component} = Foo;\nconst {Logger} = Foo', 2, 0, 3)
  ],
  valid: [
    validTest('import Ember from "ember"; const {Component} = Ember'),
    validTest('import Ember from "ember"; import X from "x"; const {Component} = Ember'),
    validTest('import Ember from "ember"; const {Component} = Ember; const x = "y"'),
    validTest('import Foo from "ember"; const {Component} = Foo'),
    validTest('import Ember from "ember"; const {Component, Logger} = Ember'),
    validTest('import Foo from "ember"; const {Component, Logger} = Foo')
  ]
})
