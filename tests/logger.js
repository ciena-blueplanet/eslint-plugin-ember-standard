var RuleTester = require('eslint').RuleTester
var rule = require('../rules/logger')

/**
 * Create valid test with always option
 * @param {String} code - code for test
 * @returns {ESLintTestObject} test
 */
function validAlwaysTest (code) {
  return {
    code: code,
    options: ['always'],
    parser: 'babel-eslint'
  }
}

/**
 * Create valid test with never option
 * @param {String} code - code for test
 * @returns {ESLintTestObject} test
 */
function validNeverTest (code) {
  return {
    code: code,
    options: ['never'],
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
    },
    {
      code: 'import Ember from "ember"; const {Logger: Logga} = Ember; console.warn("Test")',
      errors: [
        {
          column: 59,
          line: 1,
          message: 'Use Logga instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"; const {Logger: Logga} = Ember; Logga.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const {Logger: Logga} = Foo; console.warn("Test")',
      errors: [
        {
          column: 55,
          line: 1,
          message: 'Use Logga instead of console',
          type: 'Identifier'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"; const {Logger: Logga} = Foo; Logga.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'Ember.Logger.warn("Test")',
      errors: [
        {
          column: 1,
          line: 2,
          message: 'Use console instead of Ember.Logger',
          type: 'MemberExpression'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'console.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Logger} = Ember\n' +
            'Logger.warn("Test")',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use console instead of Logger',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'const {Logger} = Ember\n' +
              'console.warn("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, Logger} = Ember\n' +
            'Logger.warn("Test")\n' +
            'export default Component.extend({})',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use console instead of Logger',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'const {Component, Logger} = Ember\n' +
              'console.warn("Test")\n' +
              'export default Component.extend({})',
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
    validNeverTest('console.info("Test")'),
    validNeverTest('import Ember from "ember"; console.info("Test")'),
    validNeverTest('import Ember from "ember"; const {Logger} = Ember; console.info("Test")'),
    validNeverTest('import Foo from "ember"; console.info("Test")'),
    validNeverTest('import Foo from "ember"; const {Logger} = Foo; console.info("Test")')
  ]
})
