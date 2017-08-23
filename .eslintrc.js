module.exports = {
	"extends": "eslint:recommended",
	"env": {
		// we don't use node: true because it adds some globals that we don't need. e.g. root
		"es6": true
	},
	"globals": {
		"require": false,
		"module": false
	}
}
