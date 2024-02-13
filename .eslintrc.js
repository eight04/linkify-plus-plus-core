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
  parserOptions: {
    ecmaVersion: 2024
  }
};
