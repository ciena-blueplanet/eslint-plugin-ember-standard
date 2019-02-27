var RuleTester = require('eslint').RuleTester
var rule = require('../rules/computed-property-readonly')

var ruleTester = new RuleTester()

ruleTester.run('computed-property-readonly', rule, {
  invalid: [
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 2,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import computed from "ember-macro-helpers/computed"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: computed("bar", bar, function (){\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 3,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import computed from "ember-macro-helpers/computed"\n' +
              'export default Ember.Component.extend({\n' +
              '  foo: computed("bar", bar, function (){\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 3,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 3,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'export default Foo.Component.extend({\n' +
              '  foo: Foo.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {Component, computed} = Ember\n' +
              'export default Component.extend({\n' +
              '  foo: computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {Component, computed} = Foo\n' +
              'export default Component.extend({\n' +
              '  foo: computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  }).readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar")\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 2,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed.alias("bar").readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar")\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 3,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed.alias("bar").readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.alias("bar")\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 3,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'export default Foo.Component.extend({\n' +
              '  foo: Foo.computed.alias("bar").readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar")\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Ember from "ember"\n' +
              'const {Component, computed} = Ember\n' +
              'export default Component.extend({\n' +
              '  foo: computed.alias("bar").readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar")\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import Foo from "ember"\n' +
              'const {Component, computed} = Foo\n' +
              'export default Component.extend({\n' +
              '  foo: computed.alias("bar").readOnly()\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      errors: [
        {
          column: 6,
          line: 4,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  })\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      errors: [
        {
          column: 6,
          line: 5,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  })\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      errors: [
        {
          column: 6,
          line: 5,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Foo from "ember"\n' +
              'export default Foo.Component.extend({\n' +
              '  foo: Foo.computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  })\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      errors: [
        {
          column: 6,
          line: 6,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'const {Component, computed} = Ember\n' +
              'export default Component.extend({\n' +
              '  foo: computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  })\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      errors: [
        {
          column: 6,
          line: 6,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Foo from "ember"\n' +
              'const {Component, computed} = Foo\n' +
              'export default Component.extend({\n' +
              '  foo: computed("bar", function () {\n' +
              '    return "baz"\n' +
              '  })\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar").readOnly()\n' +
            '})',
      errors: [
        {
          column: 36,
          line: 2,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed.alias("bar")\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar").readOnly()\n' +
            '})',
      errors: [
        {
          column: 36,
          line: 3,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'export default Ember.Component.extend({\n' +
              '  foo: Ember.computed.alias("bar")\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.alias("bar").readOnly()\n' +
            '})',
      errors: [
        {
          column: 34,
          line: 3,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Foo from "ember"\n' +
              'export default Foo.Component.extend({\n' +
              '  foo: Foo.computed.alias("bar")\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar").readOnly()\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Ember from "ember"\n' +
              'const {Component, computed} = Ember\n' +
              'export default Component.extend({\n' +
              '  foo: computed.alias("bar")\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar").readOnly()\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'Computed property should not be readOnly',
          type: 'Identifier'
        }
      ],
      options: ['never'],
      output: 'import Foo from "ember"\n' +
              'const {Component, computed} = Foo\n' +
              'export default Component.extend({\n' +
              '  foo: computed.alias("bar")\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
              'export default Ember.Component.extend({\n' +
              '  @readOnly\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
            'const {Component} = Ember\n' +
            'export default Component.extend({\n' +
            '  @readOnly\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should not be readOnly',
          type: 'Decorator'
        }
      ],
      options: ['never'],
      output: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
              'const {Component} = Ember\n' +
              'export default Component.extend({\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import computed from "ember-computed-decorators"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'Needs to import readOnly',
          type: 'ImportDeclaration'
        },
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
              'export default Ember.Component.extend({\n' +
              '  @readOnly\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import computed, {alias} from "ember-computed-decorators"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'Needs to import readOnly',
          type: 'ImportDeclaration'
        },
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import computed, {alias, readOnly} from "ember-computed-decorators"\n' +
              'export default Ember.Component.extend({\n' +
              '  @readOnly\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import {computed, readOnly} from "ember-decorators/object"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import {computed, readOnly} from "ember-decorators/object"\n' +
              'export default Ember.Component.extend({\n' +
              '  @readOnly\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import {computed, readOnly} from "ember-decorators/object"\n' +
            'const {Component} = Ember\n' +
            'export default Component.extend({\n' +
            '  @readOnly\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 3,
          line: 4,
          message: 'Computed property should not be readOnly',
          type: 'Decorator'
        }
      ],
      options: ['never'],
      output: 'import {computed, readOnly} from "ember-decorators/object"\n' +
              'const {Component} = Ember\n' +
              'export default Component.extend({\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import {computed} from "ember-decorators/object"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 1,
          line: 1,
          message: 'Needs to import readOnly',
          type: 'ImportDeclaration'
        },
        {
          column: 3,
          line: 4,
          message: 'Computed property should be readOnly',
          type: 'Property'
        }
      ],
      options: ['always'],
      output: 'import {computed, readOnly} from "ember-decorators/object"\n' +
              'export default Ember.Component.extend({\n' +
              '  @readOnly\n' +
              '  @computed("bar")\n' +
              '  foo (bar) {\n' +
              '    return "baz"\n' +
              '  }\n' +
              '})',
      parser: 'babel-eslint'
    }
  ],
  valid: [
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.oneWay("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.oneWay("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.oneWay("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.oneWay("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.oneWay("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.readOnly("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.readOnly("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.readOnly("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.readOnly("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.readOnly("bar")\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar").readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar").readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.alias("bar").readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar").readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar").readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  })\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.oneWay("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.oneWay("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.oneWay("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.oneWay("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.oneWay("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed.alias("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'export default Foo.Component.extend({\n' +
            '  foo: Foo.computed.alias("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component, computed} = Ember\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "ember"\n' +
            'const {Component, computed} = Foo\n' +
            'export default Component.extend({\n' +
            '  foo: computed.alias("bar")\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import Foo from "foo"\n' +
            'export default Ember.Component.extend({\n' +
            '  foo: Ember.computed("bar", function () {\n' +
            '    return "baz"\n' +
            '  }).readOnly()\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
            'export default Ember.Component.extend({\n' +
            '  @readOnly\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import computed, {readOnly} from "ember-computed-decorators"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    },
    {
      code: 'import {computed, readOnly} from "ember-decorators/object"\n' +
            'export default Ember.Component.extend({\n' +
            '  @readOnly\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      options: ['always'],
      parser: 'babel-eslint'
    },
    {
      code: 'import {computed, readOnly} from "ember-decorators/object"\n' +
            'export default Ember.Component.extend({\n' +
            '  @computed("bar")\n' +
            '  foo (bar) {\n' +
            '    return "baz"\n' +
            '  }\n' +
            '})',
      options: ['never'],
      parser: 'babel-eslint'
    }
  ]
})
