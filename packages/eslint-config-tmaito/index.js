module.exports = {
  plugins: ["react"],
  extends: [
    "eslint-config-tmaito-base",
    "./rules/react",
    "./rules/react-hooks"
  ].map(require.resolve),
  rules: {}
}
