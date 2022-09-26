/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Plugin = require('./plugin')

class SystemPlugin extends Plugin {

  constructor (interpreter, _globalObject) {
    super(interpreter, _globalObject)
  }

  init () {
    this._interpreter.setProperty(this._globalObject, 'print',
      this._interpreter.createNativeFunction(this.print))
  }

  print (text) {
    console.log(text)
  }

}

module.exports = SystemPlugin
