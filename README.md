# eslint-plugin-ember-standard

###### Dependencies

![Node][node-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

## Installation

```bash
npm install --save-dev eslint-plugin-ember-standard
```

## Rules

### Possible Errors

*   [no-set-in-computed-property](documentation/rules/no-set-in-computed-property.md) – Prevent side effects.
* [no-settimeout](documentation/rules/no-settimeout.md) – Make run loop aware of timeouts.
* [prop-types](documentation/rules/prop-types.md) – Make sure `PropTypes` references are valid.

### Best Practices

*   [computed-property-readonly](documentation/rules/computed-property-readonly.md) – Enforce data down, actions up.
*   [logger](documentation/rules/logger.md) – Make sure logging goes through Ember.

### Stylistic Issues

*   [destructure](documentation/rules/destructure.md) – Make sure Ember properties are destructured.
*   [import](documentation/rules/import.md) – Make sure Ember is explicitly imported.
*   [single-destructure](documentation/rules/single-destructure.md) – Make sure Ember properties are destructured in a single variable declaration.

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/eslint-plugin-ember-standard/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/eslint-plugin-ember-standard

[ci-img]: https://img.shields.io/travis/ciena-blueplanet/eslint-plugin-ember-standard.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/eslint-plugin-ember-standard

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/eslint-plugin-ember-standard.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/eslint-plugin-ember-standard

[node-img]: https://img.shields.io/badge/node-4+-green.svg "Node Version"

[npm-img]: https://img.shields.io/npm/v/eslint-plugin-ember-standard.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/eslint-plugin-ember-standard
