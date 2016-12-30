# 0.0.16

* **Fixed** `no-set-in-computed-property` rule to work with [ember-computed-decorators](https://github.com/rwjblue/ember-computed-decorators).


# 0.0.15

* **Added** stricter ESLint rules to this project to force use of JSDoc comments everywhere, ensure JSDoc comments are valid, prevent methods with a complexity over 5, and prevent lines longer than 120 characters. This included cleaning up the codebase to comply with these stricter rules.
* **Fixed** `logger` rule to work with `never` option.


# 0.0.14

* **Added** `prop-types` rule to validate `PropTypes` from `ember-prop-types`.


# 0.0.13

* **Added** `no-settimeout` rule to ensure no calls to `setTimeout()` are made.


# 0.0.12

* **Fixed** `computed-property-readonly` rule to support [ember-computed-decorators](https://github.com/rwjblue/ember-computed-decorators).


# 0.0.11

* **Added** new rule `computed-property-readonly` for ensuring computed properties are always readOnly or never readOnly.


# 0.0.10

* **Added** missing messages to `destructure` rule reporting, which fixes issues with plugin crashing in consuming context.


# 0.0.9

* **Added** fixable functionality to `destructure` rule.
* **Fixed** fixable functionality for `import` rule when `never` option is passed in.


# 0.0.8

* **Added** fixable functionality to `single-destructure` rule.


# 0.0.7

* **Added** fixable functionality to `import` and `logger` rules.


# 0.0.6

* **Fixed** `destructure` rule to not falsely flag assignment of Ember variables.
* **Fixed** `logger` rule to not die under certain scenarios.


# 0.0.5

* **Added** new rule: `single-destructure` to prevent destructuring Ember in more than one variable declarator.


# 0.0.4

* **Fixed** plugin to actually export all rules so consumers can leverage them.


# 0.0.3

* **Fixed** code coverage reporting on CI.


# 0.0.2

* **Added** new rule: `no-set-in-computed-property` for ensuring Ember set calls are not made within computed properties.


# 0.0.1

* Initial release with three rules: `destructure`, `import`, and `logger`.

