# 2.0.0 (2018-09-24)

* Use console instead of Logger. As Ember has moved to deprecate the Logger



# 1.0.5 (2018-09-20)

* Fix to be compatible with @ember-decorators/object


# 1.0.4 (2018-07-20)

* **Fixed** Travis API key.


# 1.0.3 (2018-03-07)
* **Updated** pull request
* **Added** issue templates
* **Updated** to use version 3 of `pr-bumper`
* **Updated** CI to run node version `8.1.2`
* **Added** `package-lock.json` file

# 1.0.2 (2017-12-18)
* **Updated** babel-eslint to ^8.0.3 (verified)
* **Updated** pin eslint-plugin-promise @ 3.6.0 (verified)
* **Updated** pin eslint-plugin-standard @ 3.0.1 (verified)
* **Updated** pin eslint-config-standard @ 10.2.1 (verified)
* **Updated** pin eslint-plugin-import @ 2.8.0 (verified)
* **Updated** pin eslint-plugin-node @ 5.2.1 (verified)

# 1.0.1 (2017-11-21)
* **Updated** engine node version to `>= 6.0.0`

# 1.0.0 (2017-11-21)
* **Updated** into separate dependencies and devDependencies
* **Updated** to version 4 of `eslint`  
* **Updated** to version 4 of `mocha`
* **Updated** to version 8 of `babel-eslint`
* **Updated** to version 10 of `eslint-config-standard`
* **Added** now needed `eslint-plugin-import` dependency
* **Added** now needed `eslint-plugin-node` dependency
* **Updated** to version 3 of `eslint-plugin-standard`
* **Updated** to version 4 of `remark-cli`
* **Updated** to version 6 of `remark-lint`
* **Updated** version of node to `>= 6.9.0`
* **Removed** running of node versions 4 and 5 from travis CI
* **Updated** to use `pr-bumper` version 2

# 0.1.0 (2017-10-05)
* **Added** support for `ember-decorators` to the `computed-readonly` rule
* **Added** tests to validate usage of the `computed-readonly` rule with `ember-decorators`
* **Added** documentation to show usage of the `computed-readonly` rule with `ember-decorators`

# 0.0.23 (2017-06-24)
* **Fixed** build


# 0.0.22 (2017-03-23)

* **Added** EmberComponent as a valid prop type


# 0.0.21

* **Fixed** `no-set-in-computed-property` rule to use consistent `context.report()` API used in other rules.


# 0.0.20

* **Fixed** bug with fix functionality of `destructure` rule where a property could end up in the variable declarator twice.


# 0.0.19

* **Fixed** `destructure` rule to not destructure `Ember.Object` and `Ember.String`.


# 0.0.18

* **Fixed** `prop-types` rule to allow argument in property methods to be a variable reference.


# 0.0.17

* **Fixed** `computed-property-rule` to import `readOnly` from `ember-computed-decorators` when it adds it to the code as well as handle import/destructure variable names better.


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

