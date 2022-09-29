const Plugin = require('./Plugin')
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
    let mouse = this.createGlobalObject('mouse')
    this.createNativeFunction(mouse, 'button', this.button)
    this.createNativeFunction(mouse, 'click', this.click)
    this.createNativeFunction(mouse, 'dragTo', this.dragTo)
    this.createNativeFunction(mouse, 'getPosition', this.getPosition)
    this.createNativeFunction(mouse, 'moveTo', this.moveTo)
    this.createNativeFunction(mouse, 'scroll', this.scroll)
  }

  moveTo (x, y) {
    robot.moveMouse(x, y)
  }

  scroll (x, y) {
    robot.scrollMouse(x, y)
  }

}

module.exports = MousePlugin
