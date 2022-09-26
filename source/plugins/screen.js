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

class ScreenPlugin extends Plugin {

  constructor (interpreter, _globalObject) {
    super(interpreter, _globalObject)
  }

  getColor (x, y) {
    robot.getPixelColor(x, y)
  }

  getSize () {
    return this._interpreter.nativeToPseudo(robot.getScreenSize())
  }

  init () {
    let screen = this._interpreter.nativeToPseudo({})
    this._interpreter.setProperty(this._globalObject, 'screen', screen)
    this._interpreter.setProperty(screen, 'getColor',
      this._interpreter.createNativeFunction(this.getColor))
    this._interpreter.setProperty(screen, 'getSize',
      this._interpreter.createNativeFunction(this.getSize.bind(this)))
  }

}

module.exports = ScreenPlugin
