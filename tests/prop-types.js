var RuleTester = require('eslint').RuleTester
var rule = require('../rules/prop-types')

var ruleTester = new RuleTester()

ruleTester.run('prop-types', rule, {
  invalid: [
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.doesNotExist\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'doesNotExist is not a valid property on PropTypes',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes as PT} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PT.doesNotExist\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 13,
          line: 4,
          message: 'doesNotExist is not a valid property on PT',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.any()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'any should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.array()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'array should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.bool()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'bool should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.element()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'element should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.EmberObject()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'EmberObject should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.func()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'func should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.null()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'null should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.number()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'number should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.object()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'object should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.string()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'string should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.symbol()\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'symbol should not be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.arrayOf\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'arrayOf should be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.instanceOf\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'instanceOf should be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'oneOf should be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'oneOfType should be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 20,
          line: 4,
          message: 'shape should be a call expression',
          type: 'Identifier'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.arrayOf("a", "b")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 10,
          line: 4,
          message: 'arrayOf call expression should only have one argument',
          type: 'CallExpression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.instanceOf("a", "b")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 10,
          line: 4,
          message: 'instanceOf call expression should only have one argument',
          type: 'CallExpression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf([], "b")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 10,
          line: 4,
          message: 'oneOf call expression should only have one argument',
          type: 'CallExpression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType([], "b")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 10,
          line: 4,
          message: 'oneOfType call expression should only have one argument',
          type: 'CallExpression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape({}, "b")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 10,
          line: 4,
          message: 'shape call expression should only have one argument',
          type: 'CallExpression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf("a")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf(1)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf(true)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf({})\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType("a")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType(1)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType(true)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType({})\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 30,
          line: 4,
          message: 'argument should be an array expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape("a")\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an object expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape(1)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an object expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape(true)\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an object expression'
        }
      ],
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape([])\n' +
            '  }\n' +
            '})',
      errors: [
        {
          column: 26,
          line: 4,
          message: 'argument should be an object expression'
        }
      ],
      parser: 'babel-eslint'
    }
  ],
  valid: [
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.any\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.array\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.arrayOf(PropTypes.bool)\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.bool\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.element\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.EmberObject\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.func\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.instanceOf(HTMLElement)\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.null\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.number\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.object\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf(["bar", "baz"])\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOfType([\n' +
            '      PropTypes.null,\n' +
            '      PropTypes.string\n' +
            '    ])\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape({\n' +
            '      bar: PropTypes.bool,\n' +
            '      baz: PropTypes.number\n' +
            '    })\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.string\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.symbol\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import PropTypeMixin, {PropTypes as PT} from "ember-prop-types"\n' +
            'export default Ember.Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PT.symbol\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component} = Ember\n' +
            'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.symbol\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component} = Ember\n' +
            'const bar = ["baz", "spam"]\n' +
            'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.oneOf(bar)\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    },
    {
      code: 'import Ember from "ember"\n' +
            'const {Component} = Ember\n' +
            'const bar = ["baz", "spam"]\n' +
            'import PropTypeMixin, {PropTypes} from "ember-prop-types"\n' +
            'export default Component.extend(PropTypeMixin, {\n' +
            '  propTypes: {\n' +
            '    foo: PropTypes.shape(bar)\n' +
            '  }\n' +
            '})',
      parser: 'babel-eslint'
    }
  ]
})
