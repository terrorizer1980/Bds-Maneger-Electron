#!/usr/bin/env node
const { compile } = require("nexe");
const { resolve, join } = require("path");
const files = [
    "page/",
    "package*.json"
]

const nexeCopiler = {
    name: "Bds Maneger",
    build: true,
    input: resolve(__dirname, "index.js"),
    output: join(__dirname, "BdsManagerBin"),
    resources: files,
}

// Build Binarie
compile(nexeCopiler).then(() => {console.log("success")})