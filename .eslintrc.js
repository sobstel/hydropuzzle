module.excports = {
  // "root": true,
  // "extends": '@react-native-community',

  "parser": "babel-eslint",
  "extends": ["standard", "standard-jsx"],

  "rules": {
    "semi": ["error", "always"],

    "react/no-did-mount-set-state": "off",
    "react/no-did-update-set-state": "off",
    "react/forbid-prop-types": ["error", {"forbid": ['any', 'array']}],
    "react/jsx-no-bind": ["error", {"ignoreRefs": true}],
    "react/require-default-props": "error",
    "react/sort-prop-types": "error",

    "no-return-assign": "off"
  },

  "env": {
    "jest": true
  }
}
