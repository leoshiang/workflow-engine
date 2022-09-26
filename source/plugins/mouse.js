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

class MousePlugin extends Plugin {

  constructor (interpreter, _globalObject) {
    super(interpreter, _globalObject)
  }

  button (button = 'left', down = 'down') {
    robot.mouseToggle(down, button)
  }

  click (button = 'left', double = false) {
    robot.mouseClick(button, double)
  }

  dragTo (x, y) {
    robot.dragMouse(x, y)
  }

  getPosition () {
    this._interpreter.nativeToPseudo(robot.getMousePos())
  }

  init () {
    let mouse = this._interpreter.nativeToPseudo({})
    this._interpreter.setProperty(this._globalObject, 'mouse', mouse)
    this._interpreter.setProperty(mouse, 'button',
      this._interpreter.createNativeFunction(this.button))
    this._interpreter.setProperty(mouse, 'click',
      this._interpreter.createNativeFunction(this.click))
    this._interpreter.setProperty(mouse, 'dragTo',
      this._interpreter.createNativeFunction(this.dragTo))
    this._interpreter.setProperty(mouse, 'getPosition',
      this._interpreter.createNativeFunction(this.getPosition))
    this._interpreter.setProperty(mouse, 'moveTo',
      this._interpreter.createNativeFunction(this.moveTo))
    this._interpreter.setProperty(mouse, 'scroll',
      this._interpreter.createNativeFunction(this.scroll))
  }

  moveTo (x, y) {
    robot.moveMouse(x, y)
  }

  scroll (x, y) {
    robot.scrollMouse(x, y)
  }

}

module.exports = MousePlugin
