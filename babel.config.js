module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      "prismjs",
      {
        "languages": ["javascript", "css", "java"],
        "plugins": ["line-numbers"],
        "theme": "okaidia",
        // "theme":"duotone-light",
        "css": true
      }]
  ]
}
