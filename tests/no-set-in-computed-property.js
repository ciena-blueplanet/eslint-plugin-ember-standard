var RuleTester = require('eslint').RuleTester
var rule = require('../rules/no-set-in-computed-property')

function invalidAlwaysTest (code, line) {
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

function validAlwaysTest (code) {
  return {
    code: code,
    options: ['always'],
    parser: 'babel-eslint'
  }
}

var ruleTester = new RuleTester()

ruleTester.run('no-set-in-computed-property', rule, {
  invalid: [
    invalidAlwaysTest(
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
    invalidAlwaysTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    ),
    invalidAlwaysTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      3
    ),
    invalidAlwaysTest(
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
    invalidAlwaysTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    Ember.set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    ),
    invalidAlwaysTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    Ember.set(this, "baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      3
    ),
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
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
    invalidAlwaysTest(
      'const foo = "bar"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    this.set("baz", "spam")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})',
      4
    )
  ],
  valid: [
    validAlwaysTest(
      'import Ember from "ember"\n' +
      'const {Component, computed} = Ember\n' +
      'export default Component.extend({\n' +
      '  foo: computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validAlwaysTest(
      'import Ember from "ember"\n' +
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validAlwaysTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    ),
    validAlwaysTest(
      'export default Ember.Component.extend({\n' +
      '  foo: Ember.computed("bar", function () {\n' +
      '    alpha.set("test", "bar")\n' +
      '    return "test"\n' +
      '  })\n' +
      '})'
    )
  ]
})
