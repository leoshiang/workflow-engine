global.acorn = require('../../third-party/acorn')
const JSInterpreter = require('../../third-party/interpreter')
const MousePlugin = require('../plugins/MousePlugin')
const KeyboardPlugin = require('../plugins/KeyboardPlugin')
const ScreenPlugin = require('../plugins/ScreenPlugin')
const SystemPlugin = require('../plugins/SystemPlugin')
const FilePlugin = require('../plugins/FilePlugin')
const NodeTypes = require('./steps/StepTypes')

class ModelRunner {

  constructor () {
    this.initInterpreter()
  }

  execute (code) {
    this._interpreter.appendCode(code)
    this._interpreter.run()
    return this._interpreter.value
  }

  getVariable (name) {
    const scope = this._interpreter.getGlobalScope()
    return scope.object.properties[name]
  }

  initInterpreter () {
    this._interpreter = new JSInterpreter('', function (interpreter, globalObject) {
      new MousePlugin(interpreter, globalObject).init()
      new KeyboardPlugin(interpreter, globalObject).init()
      new ScreenPlugin(interpreter, globalObject).init()
      new SystemPlugin(interpreter, globalObject).init()
      new FilePlugin(interpreter, globalObject).init()
    })
  }

  isFinished (step) {
    return (step === undefined) || step.type === NodeTypes.STOP
  }

  async run (model) {
    let currentStep = model.findEntryPoint().getNextStep()
    while (!this.isFinished(currentStep)) {
      currentStep = await currentStep.execute(this)
    }
  }

  setVariable (varName, value) {
    const scope = this._interpreter.getGlobalScope()
    scope.object.properties[varName] = value
  }
}

module.exports = ModelRunner
