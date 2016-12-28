var RuleTester = require('eslint').RuleTester
var rule = require('../rules/single-destructure')

function validTest (code) {
  return {
    code: code,
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('single-destructure', rule, {
  invalid: [
    {
      code: 'import Ember from "ember"; const {Component} = Ember; const {Logger} = Ember',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 61,
          line: 1,
          message: 'Do not destructure Ember more than once, merge this with line 1 column 27',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Ember from "ember"; const {Component, Logger} = Ember; ',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Component} = Foo; const {Logger} = Foo',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 57,
          line: 1,
          message: 'Do not destructure Ember more than once, merge this with line 1 column 25',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Foo from "ember"; const {Component, Logger} = Foo; ',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember";\nconst {Component} = Ember;\nconst {Logger} = Ember',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 7,
          line: 3,
          message: 'Do not destructure Ember more than once, merge this with line 2 column 0',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Ember from "ember";\nconst {Component, Logger} = Ember;\n',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember";\nconst {Component} = Foo;\nconst {Logger} = Foo',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 7,
          line: 3,
          message: 'Do not destructure Ember more than once, merge this with line 2 column 0',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Foo from "ember";\nconst {Component, Logger} = Foo;\n',
      parser: 'babel-eslint'
    },
    ,
    {
      code: 'import Foo from "ember";\nconst {Component} = Foo;\nconst {Logger} = Foo;\nconst {A} = Foo',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 7,
          line: 3,
          message: 'Do not destructure Ember more than once, merge this with line 2 column 0',
          type: 'VariableDeclarator'
        },
        {
          column: 7,
          line: 4,
          message: 'Do not destructure Ember more than once, merge this with line 2 column 0',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Foo from "ember";\nconst {Component, A, Logger} = Foo;\n\n',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Component} = Ember; const {Logger: Logga} = Ember',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 61,
          line: 1,
          message: 'Do not destructure Ember more than once, merge this with line 1 column 27',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Ember from "ember"; const {Component, Logger: Logga} = Ember; ',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Component} = Foo; const {Logger: Logga} = Foo',
      errors: [
        {
          column: 1,
          line: 1,
          type: 'Program'
        },
        {
          column: 57,
          line: 1,
          message: 'Do not destructure Ember more than once, merge this with line 1 column 25',
          type: 'VariableDeclarator'
        }
      ],
      output: 'import Foo from "ember"; const {Component, Logger: Logga} = Foo; ',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger: Log1} = Ember; const {Logger: Log2} = Ember; Log1.info("Test"); Log2.info("Test")',
      errors: [
        {
          column: 64,
          line: 1,
          message: 'Do not destructure Ember more than once, merge this with line 1 column 27',
          type: 'VariableDeclarator'
        },
        {
          column: 107,
          line: 1,
          message: 'Use "Log1" instead of "Log2"',
          type: 'Identifier'
        }
      ],
      output: 'import Ember from "ember"; const {Logger: Log1} = Ember;  Log1.info("Test"); Log1.info("Test")',
      parser: 'babel-eslint'
    }
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
