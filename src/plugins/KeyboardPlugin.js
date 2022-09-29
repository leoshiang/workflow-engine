const Plugin = require('./Plugin')
const robot = require('robotjs')

class KeyboardPlugin extends Plugin {

  constructor (interpreter, _globalObject) {
    super(interpreter, _globalObject)
  }

  init () {
    let keyboard = this.createGlobalObject('keyboard')
    this.createNativeFunction(keyboard, 'press', this.press)
    this.createNativeFunction(keyboard, 'type', this.type)
  }

  press (key, modifier) {
    robot.keyTap(key, modifier)
  }

  type (string) {
    robot.typeString(string)
  }

}

module.exports = KeyboardPlugin
