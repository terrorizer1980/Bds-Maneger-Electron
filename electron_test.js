var Application = require('spectron').Application
var assert = require('assert')
var electron = require("electron")

process.env.ELECTRON_TEST = true

var app = new Application({
  path: electron,
  args: ["--no-sandbox", "."]
})

app.start().then(function () {
  console.log("Check if the window is visible")
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  console.log("Verify the window is visible")
  assert.strictEqual(isVisible, true)
}).then(function () {
  console.log("Get the window's title")
  return app.client.getTitle()
}).then(function (title) {
  console.log("Verify the window's title")
  assert.strictEqual(title, 'Bds Maneger \\-/ The server is stopped')
}).then(function () {
  console.log("Stop the application")
  return app.stop()
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
  process.exit(5)
})