const Plugin = require('./Plugin')
const fs = require('fs')

class FilePlugin extends Plugin {

    constructor(interpreter, _globalObject) {
        super(interpreter, _globalObject)
    }

    delete(fileName) {
        fs.unlinkSync(fileName)
    }

    init() {
        let file = this.createGlobalObject('file')
        this.createNativeFunction(file, 'delete', this.delete)
        this.createNativeFunction(file, 'read', this.read.bind(this))
        this.createNativeFunction(file, 'readLines', this.readLines.bind(this))
        this.createNativeFunction(file, 'write', this.write.bind(this))
    }

    read(fileName, encoding = 'UTF8') {
        return fs.readFileSync(fileName, encoding)
    }

    readLines(fileName, encoding = 'UTF8', lineBreak = '\r\n') {
        const lines = this.read(fileName, encoding).split(lineBreak)
        return this._interpreter.nativeToPseudo(lines)
    }

    write(fileName, encoding = 'UTF8') {
        return fs.readFileSync(fileName, encoding)
    }
}

module.exports = FilePlugin
