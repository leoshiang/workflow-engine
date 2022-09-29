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

  createGlobalObject (name) {
    let obj = this._interpreter.nativeToPseudo({})
    this._interpreter.setProperty(this._globalObject, name, obj)
    return obj
  }

  createNativeFunction (target, propName, nativeFunction) {
    const newFunc = this._interpreter.createNativeFunction(nativeFunction)
    this._interpreter.setProperty(target, propName, newFunc)
  }

  init () {

  }

}

module.exports = Plugin
