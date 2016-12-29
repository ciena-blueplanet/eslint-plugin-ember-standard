var RuleTester = require('eslint').RuleTester
var rule = require('../rules/no-settimeout')

var ruleTester = new RuleTester()

ruleTester.run('no-settimeout', rule, {
  invalid: [
    {
      code: 'import Ember from "ember"\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 2,
          message: 'Use Ember.run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'Ember.run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 2,
          message: 'Use Foo.run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'Foo.run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {run} = Ember\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {run} = Ember\n' +
              'run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {run} = Foo\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {run} = Foo\n' +
              'run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {run: runna} = Ember\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {run: runna} = Ember\n' +
              'runna.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {run: runna} = Foo\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {run: runna} = Foo\n' +
              'runna.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {run: runna} = Foo\n' +
            'setTimeout(() => {}, 100)\n' +
            'setTimeout(() => {console.info("test")}, 321)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        },
        {
          column: 1,
          line: 4,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {run: runna} = Foo\n' +
              'runna.later(this, () => {}, 100)\n' +
              'runna.later(this, () => {console.info("test")}, 321)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'import run from "run"\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use Ember.run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'import run from "run"\n' +
              'Ember.run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const run = "test"\n' +
            'setTimeout(() => {}, 100)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use Ember.run.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const run = "test"\n' +
              'Ember.run.later(this, () => {}, 100)',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Logger, run: runna} = Foo\n' +
            'setTimeout(() => {}, 100)\n' +
            'setTimeout(() => {console.info("test")}, 321)',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        },
        {
          column: 1,
          line: 4,
          message: 'Use runna.later instead of setTimeout',
          type: 'CallExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {Logger, run: runna} = Foo\n' +
              'runna.later(this, () => {}, 100)\n' +
              'runna.later(this, () => {console.info("test")}, 321)',
      parser: 'babel-eslint'
    }
  ],
  valid: [
    {
      code: 'setTimeout(() => {}, 100)',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'Ember.run.later(this, () => {})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'Ember.run.later(this, () => {})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'Foo.run.later(this, () => {})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {run} = Ember\n' +
            'run.later(this, () => {})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {run} = Foo\n' +
            'run.later(this, () => {})',
      options: ['always'],
      parser: 'babel-eslint'
    }
  ]
})
