var RuleTester = require('eslint').RuleTester
var rule = require('../rules/logger')

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
    {
      code: 'import Ember from "ember"; console.debug("Test")',
      errors: [
        {
          column: 28,
          line: 1,
          message: 'Use Ember.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; Ember.Logger.debug("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; console.debug("Test")',
      errors: [
        {
          column: 26,
          line: 1,
          message: 'Use Foo.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; Foo.Logger.debug("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; console.error("Test")',
      errors: [
        {
          column: 28,
          line: 1,
          message: 'Use Ember.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; Ember.Logger.error("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; console.error("Test")',
      errors: [
        {
          column: 26,
          line: 1,
          message: 'Use Foo.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; Foo.Logger.error("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; console.info("Test")',
      errors: [
        {
          column: 28,
          line: 1,
          message: 'Use Ember.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; Ember.Logger.info("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; console.info("Test")',
      errors: [
        {
          column: 26,
          line: 1,
          message: 'Use Foo.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; Foo.Logger.info("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; console.log("Test")',
      errors: [
        {
          column: 28,
          line: 1,
          message: 'Use Ember.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; Ember.Logger.log("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; console.log("Test")',
      errors: [
        {
          column: 26,
          line: 1,
          message: 'Use Foo.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; Foo.Logger.log("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; console.warn("Test")',
      errors: [
        {
          column: 28,
          line: 1,
          message: 'Use Ember.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; Ember.Logger.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; console.warn("Test")',
      errors: [
        {
          column: 26,
          line: 1,
          message: 'Use Foo.Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; Foo.Logger.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger} = Ember; console.debug("Test")',
      errors: [
        {
          column: 52,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger} = Ember; Logger.debug("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger} = Foo; console.debug("Test")',
      errors: [
        {
          column: 48,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger} = Foo; Logger.debug("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger} = Ember; console.error("Test")',
      errors: [
        {
          column: 52,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger} = Ember; Logger.error("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger} = Foo; console.error("Test")',
      errors: [
        {
          column: 48,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger} = Foo; Logger.error("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger} = Ember; console.info("Test")',
      errors: [
        {
          column: 52,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger} = Ember; Logger.info("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger} = Foo; console.info("Test")',
      errors: [
        {
          column: 48,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger} = Foo; Logger.info("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger} = Ember; console.log("Test")',
      errors: [
        {
          column: 52,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger} = Ember; Logger.log("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger} = Foo; console.log("Test")',
      errors: [
        {
          column: 48,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger} = Foo; Logger.log("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; const {Logger} = Ember; console.warn("Test")',
      errors: [
        {
          column: 52,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger} = Ember; Logger.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger} = Foo; console.warn("Test")',
      errors: [
        {
          column: 48,
          line: 1,
          message: 'Use Logger instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger} = Foo; Logger.warn("Test")',
      parser: 'babel-eslint'
    }
  ],
  valid: [
    validAlwaysTest('console.info("Test")'),
    validAlwaysTest('import Foo from "foo"; console.info("Test")'),
    validAlwaysTest('Ember.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; Ember.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const {Logger} = Ember; Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const {Component, Logger} = Ember; Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const x = "y"; Ember.Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; Foo.Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; const {Logger} = Ember; Logger.info("Test")'),
    validAlwaysTest('import Foo from "ember"; const {Logger} = Foo; Logger.info("Test")'),
    validAlwaysTest('import Ember from "ember"; console.clear()'),
  ]
})
