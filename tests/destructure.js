var RuleTester = require('eslint').RuleTester
var rule = require('../rules/destructure')

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

ruleTester.run('destructure', rule, {
  invalid: [
    // Global "Ember" variable
    {
      code: 'export default Ember.Component.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Component',
          type: 'Program'
        },
        {
          column: 16,
          line: 1,
          message: 'Ember.Component should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {Component} = Ember\n' +
              'export default Component.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Controller.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Controller',
          type: 'Program'
        },
        {
          column: 16,
          line: 1,
          message: 'Ember.Controller should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {Controller} = Ember\n' +
              'export default Controller.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Route.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Route',
          type: 'Program'
        },
        {
          column: 16,
          line: 1,
          message: 'Ember.Route should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {Route} = Ember\n' +
              'export default Route.extend({})',
      parser: 'babel-eslint'
    },

    // Import Ember as "Ember" variable
    {
      code: 'import Ember from "ember"; export default Ember.Component.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Component',
          type: 'ImportDeclaration'
        },
        {
          column: 43,
          line: 1,
          message: 'Ember.Component should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember";\n' +
              'const {Component} = Ember\n' +
              ' export default Component.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; export default Ember.Controller.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Controller',
          type: 'ImportDeclaration'
        },
        {
          column: 43,
          line: 1,
          message: 'Ember.Controller should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember";\n' +
              'const {Controller} = Ember\n' +
              ' export default Controller.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"; export default Ember.Route.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Route',
          type: 'ImportDeclaration'
        },
        {
          column: 43,
          line: 1,
          message: 'Ember.Route should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember";\n' +
              'const {Route} = Ember\n' +
              ' export default Route.extend({})',
      parser: 'babel-eslint'
    },

    // Import Ember as "Foo" variable
    {
      code: 'import Foo from "ember"; export default Foo.Component.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Component',
          type: 'ImportDeclaration'
        },
        {
          column: 41,
          line: 1,
          message: 'Foo.Component should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember";\n' +
              'const {Component} = Foo\n' +
              ' export default Component.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; export default Foo.Controller.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Controller',
          type: 'ImportDeclaration'
        },
        {
          column: 41,
          line: 1,
          message: 'Foo.Controller should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember";\n' +
              'const {Controller} = Foo\n' +
              ' export default Controller.extend({})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; export default Foo.Route.extend({})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Route',
          type: 'ImportDeclaration'
        },
        {
          column: 41,
          line: 1,
          message: 'Foo.Route should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember";\n' +
              'const {Route} = Foo\n' +
              ' export default Route.extend({})',
      parser: 'babel-eslint'
    },

    // Make sure it doesn't complain on assignment
    {
      code: 'const bar = Ember.MODEL_FACTORY_INJECTIONS',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: MODEL_FACTORY_INJECTIONS',
          type: 'Program'
        },
        {
          column: 13,
          line: 1,
          message: 'Ember.MODEL_FACTORY_INJECTIONS should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {MODEL_FACTORY_INJECTIONS} = Ember\n' +
              'const bar = MODEL_FACTORY_INJECTIONS',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"; const bar = Foo.MODEL_FACTORY_INJECTIONS',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: MODEL_FACTORY_INJECTIONS',
          type: 'ImportDeclaration'
        },
        {
          column: 38,
          line: 1,
          message: 'Foo.MODEL_FACTORY_INJECTIONS should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember";\n' +
              'const {MODEL_FACTORY_INJECTIONS} = Foo\n' +
              ' const bar = MODEL_FACTORY_INJECTIONS',
      parser: 'babel-eslint'
    },

    // Make sure it adds to existing destructure variable declarator
    {
      code: 'const {A} = Ember; const bar = Ember.MODEL_FACTORY_INJECTIONS',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: MODEL_FACTORY_INJECTIONS',
          type: 'VariableDeclaration'
        },
        {
          column: 32,
          line: 1,
          message: 'Ember.MODEL_FACTORY_INJECTIONS should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {A, MODEL_FACTORY_INJECTIONS} = Ember; const bar = MODEL_FACTORY_INJECTIONS',
      parser: 'babel-eslint'
    },

    // Make sure it only destructures a property once
    {
      code: 'import x from "x"\n' +
            'Ember.Logger.info("Test 1")\n' +
            'Ember.Logger.info("Test2")',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'The following need destructured: Logger',
          type: 'Program'
        },
        {
          column: 1,
          line: 2,
          message: 'Ember.Logger should be destructured',
          type: 'MemberExpression'
        },
        {
          column: 1,
          line: 3,
          message: 'Ember.Logger should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'const {Logger} = Ember\n' +
              'import x from "x"\n' +
              'Logger.info("Test 1")\n' +
              'Logger.info("Test2")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Logger} = Ember\n' +
            'Ember.Logger.info("Test")',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Ember.Logger should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {Logger} = Ember\n' +
              'Logger.info("Test")',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Logger: Logga} = Ember\n' +
            'Ember.Logger.info("Test")',
      errors: [
        {
          column: 1,
          line: 3,
          message: 'Ember.Logger should be destructured',
          type: 'MemberExpression'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {Logger: Logga} = Ember\n' +
              'Logga.info("Test")',
      parser: 'babel-eslint'
    },

    // Destructuring when rule is set to "never"
    {
      code: 'const {Controller} = Ember',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'Ember should not be destructured',
          type: 'VariableDeclaration'
        }
      ],
      options: ['never'],
      output: '',
      parser: 'babel-eslint'
    },
    {
      code: 'const {Component, Logger} = Ember',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'Ember should not be destructured',
          type: 'VariableDeclaration'
        }
      ],
      options: ['never'],
      output: '',
      parser: 'babel-eslint'
    }
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

    // Reserved names
    validAlwaysTest('Ember.String.htmlSafe("<h1>Test</h1>")'),
    validAlwaysTest('Ember.Object.create({foo: "bar"})'),

    // Make sure it doesn't complain on assignment
    validAlwaysTest('Ember.MODEL_FACTORY_INJECTIONS = true'),
    validAlwaysTest('import Foo from "ember"; Foo.MODEL_FACTORY_INJECTIONS = true'),

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
