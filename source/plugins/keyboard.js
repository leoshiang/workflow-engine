/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Plugin = require('./plugin')
const robot = require('robotjs')

class KeyboardPlugin extends Plugin {

  constructor (interpreter, _globalObject) {
    super(interpreter, _globalObject)
  }

  init () {
    let keyboard = this._interpreter.nativeToPseudo({})
    this._interpreter.setProperty(this._globalObject, 'keyboard', keyboard)
    this._interpreter.setProperty(keyboard, 'press',
      this._interpreter.createNativeFunction(this.press))
    this._interpreter.setProperty(keyboard, 'type',
      this._interpreter.createNativeFunction(this.type))
  }

  press (key, modifier) {
    robot.keyTap(key, modifier)
  }

  type (string) {
    robot.typeString(string)
  }

}

module.exports = KeyboardPlugin
