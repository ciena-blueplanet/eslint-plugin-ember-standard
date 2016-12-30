var RuleTester = require('eslint').RuleTester
var rule = require('../rules/no-set-in-computed-property')

/**
 * Create invalid test
 * @param {String} code - code for test
 * @param {Number} line - line error is on
 * @returns {ESLintTestObject} test
 */
function invalidTest (code, line) {
  return {
    code: code,
    errors: [
      {
        line: line,
        message: 'Do not call this.set() or Ember.set() in a computed property',
        type: 'CallExpression'
      }
    ],
    options: ['always'],
    parser: 'babel-eslint'
  }
}

/**
 * Create valid test
 * @param {String} code - code for test
 * @returns {ESLintTestObject} test
 */
function validTest (code) {
  return {
    code: code,
    options: ['always'],
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('no-set-in-computed-property', rule, {
  invalid: [
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, computed} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      5
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    ),
    invalidTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      3
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, computed} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    Ember.set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      5
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    Ember.set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    ),
    invalidTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    Ember.set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      3
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, computed, set} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      5
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, computed: computedYo, set} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computedYo("bar", function () {\n' +
      '    set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      5
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, computed, set: setta} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    setta(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      5
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, set} = Ember\n' +
      'import computed from "ember-computed-decorators"\n' +
      'export default Component.extend({\n' +
      '  @computed("bar")\n' +
      '  foo (bar) {\n' +
      '    set(this, "baz", "spam")\n' +
      '    return bar + "-test"\n' +
      '  }\n' +
      '})',
      7
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component, set} = Ember\n' +
      'import computed, {readOnly} from "ember-computed-decorators"\n' +
      'export default Component.extend({\n' +
      '  @readOnly\n' +
      '  @computed("bar")\n' +
      '  foo (bar) {\n' +
      '    set(this, "baz", "spam")\n' +
      '    return bar + "-test"\n' +
      '  }\n' +
      '})',
      8
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component} = Ember\n' +
      'import computed from "ember-computed-decorators"\n' +
      'export default Component.extend({\n' +
      '  @computed("bar")\n' +
      '  foo (bar) {\n' +
      '    this.set("baz", "spam")\n' +
      '    return bar + "-test"\n' +
      '  }\n' +
      '})',
      7
    ),
    invalidTest(
      'import Ember from "ember"\n' +
      'const {Component} = Ember\n' +
      'import computed, {readOnly} from "ember-computed-decorators"\n' +
      'export default Component.extend({\n' +
      '  @readOnly\n' +
      '  @computed("bar")\n' +
      '  foo (bar) {\n' +
      '    this.set("baz", "spam")\n' +
      '    return bar + "-test"\n' +
      '  }\n' +
      '})',
      8
    ),
    invalidTest(
      'const foo = "bar"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    ),
    invalidTest(
      'const foo = "bar"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  }),\n' +
      '  bar () {\n' +
      '    this.set("baz", "tofu")\n' +
      '  }\n' +
      '})',
      4
    ),
    invalidTest(
      'import computed from "ember-computed-decorators"\n' +
      'export default Ember.Component.extend({\n' +
      '  @computed("bar")\n' +
      '  foo (bar) {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  },\n' +
      '  bar () {\n' +
      '    this.set("baz", "tofu")\n' +
      '  }\n' +
      '})',
      5
    ),
    invalidTest(
      'import pooted from "ember-computed-decorators"\n' +
      'export default Ember.Component.extend({\n' +
      '  @pooted("bar")\n' +
      '  foo (bar) {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  }\n' +
      '})',
      5
    )
  ],
  valid: [
    validTest(
      'import Ember from "ember"\n' +
      'const {Component, computed} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    alpha.set("test", "bar")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    )
  ]
})
