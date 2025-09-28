const Plugin = require('./Plugin')

class SystemPlugin extends Plugin {

    constructor(interpreter, _globalObject) {
        super(interpreter, _globalObject)
    }

    init() {
        this.createNativeFunction(this._globalObject, 'print', this.print)
    }

    print() {
        const args = Array.prototype.slice.call(arguments)
        console.log.apply(null, args)
    }

}

module.exports = SystemPlugin
