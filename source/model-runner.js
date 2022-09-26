/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

global.acorn = require('../third-party/acorn')
const JSInterpreter = require('../third-party/interpreter')
const MousePlugin = require('./plugins/mouse')
const KeyboardPlugin = require('./plugins/keyboard')
const ScreenPlugin = require('./plugins/screen')
const SystemPlugin = require('./plugins/system')
const NodeTypes = require('./nodes/node-types')

/**
 * 模型執行者。
 */
class ModelRunner {

  constructor () {
    this.initInterpreter()
  }

  /**
   * 執行程式碼。
   * @param {string} code
   * @returns {*}
   */
  execute (code) {
    this._interpreter.appendCode(code)
    this._interpreter.run()
    return this._interpreter.value
  }

  initInterpreter () {
    this._interpreter = new JSInterpreter('', function (interpreter, globalObject) {
      new MousePlugin(interpreter, globalObject).init()
      new KeyboardPlugin(interpreter, globalObject).init()
      new ScreenPlugin(interpreter, globalObject).init()
      new SystemPlugin(interpreter, globalObject).init()
    })
  }

  /**
   * 執行。
   * @param {Model} model 要執行的模型。
   */
  run (model) {
    let current = model.getEntryPoint()
    current = current.getNextTargetNode()
    while (current && current.type !== NodeTypes.EXIT_POINT) {
      current = current.execute(this)
    }
  }

}

module.exports = ModelRunner
