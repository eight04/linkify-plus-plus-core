module.exports = {
	"extends": [
    "eslint:recommended",
    "plugin:compat/recommended"
  ],
	"env": {
		"es6": true,
    "node": true
	},
	"globals": {
		"require": false,
		"module": false
	},
  overrides: [{
    files: ["rollup.config.js"],
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2019
    }
  }]
};
