const Plugin = require('./Plugin')
const robot = require('robotjs')

class ScreenPlugin extends Plugin {

    constructor(interpreter, _globalObject) {
        super(interpreter, _globalObject)
    }

    getColor(x, y) {
        robot.getPixelColor(x, y)
    }

    getSize() {
        return this._interpreter.nativeToPseudo(robot.getScreenSize())
    }

    init() {
        let screen = this.createGlobalObject('screen')
        this.createNativeFunction(screen, 'getColor', this.getColor)
        this.createNativeFunction(screen, 'getSize', this.getSize.bind(this))
    }

}

module.exports = ScreenPlugin
