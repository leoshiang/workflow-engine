/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

global.acorn = require('../third-party/acorn')
const NodeTypes = require('./node-types')

/**
 * 模型執行者。
 */
class ModelExecutor {

  /**
   * 執行。
   * @param {Model} model 要執行的模型。
   */
  execute (model) {
    let current = model.getEntryPoint()
    current = current.getNextTargetNode()
    while (current && current.type !== NodeTypes.EXIT_POINT) {
      current = current.execute()
    }
  }

}

module.exports = ModelExecutor
