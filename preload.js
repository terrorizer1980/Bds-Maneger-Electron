// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
process.once("loaded", () => {console.warn("Removed preload")});