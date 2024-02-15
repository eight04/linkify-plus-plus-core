module.exports = {
	"extends": [
    "eslint:recommended",
    "plugin:compat/recommended"
  ],
	"env": {
		"es6": true,
    "node": true
	},
  parserOptions: {
    ecmaVersion: 2024
  },
  overrides: [
    {
      files: ["**/__snapshots__/*.js"],
      parserOptions: {
        sourceType: "module"
      }
    }
  ]
};
