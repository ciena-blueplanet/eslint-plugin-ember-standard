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

