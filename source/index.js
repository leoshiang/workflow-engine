/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const ModelBuilder = require('../source/model-builder')
const ModelExecutor = require('../source/model-executor')
const Diagram = require('../source/diagram')
const fs = require('fs')

;(async () => {
  if (process.argv.length < 3) {
    console.log('使用方式：dwe test.drawio')
    process.exit(1)
  }
  const fileName = process.argv[2]
  if (!fs.existsSync(fileName)) {
    console.log(`檔案 ${fileName} 不存在！`)
    process.exit(1)
  }
  const diagram = await new Diagram().loadFromFile(fileName)
  const model = await new ModelBuilder().build(diagram)
  new ModelExecutor().execute(model)
})()
