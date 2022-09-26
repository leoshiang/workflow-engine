/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

class Plugin {

  constructor (interpreter, globalObject) {
    this._interpreter = interpreter
    this._globalObject = globalObject
  }

  _globalObject

  get globalObject () {
    return this._globalObject
  }

  _interpreter

  get interpreter () {
    return this._interpreter
  }

  init () {

  }
}

module.exports = Plugin
