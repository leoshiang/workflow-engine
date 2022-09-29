global.acorn = require('../../third-party/acorn')
const JSInterpreter = require('../../third-party/interpreter')
const MousePlugin = require('../plugins/MousePlugin')
const KeyboardPlugin = require('../plugins/KeyboardPlugin')
const ScreenPlugin = require('../plugins/ScreenPlugin')
const SystemPlugin = require('../plugins/SystemPlugin')
const FilePlugin = require('../plugins/FilePlugin')
const NodeTypes = require('./StepTypes')

class ModelRunner {

  constructor () {
    this.initInterpreter()
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

  run (model) {
    let currentStep = model.findEntryPoint().getNextStep()
    while (!this.isFinished(currentStep)) {
      currentStep = currentStep.execute(this)
    }
  }

  isFinished (step) {
    return (step === undefined) || step.type === NodeTypes.EXIT_POINT
  }

  execute (code) {
    this._interpreter.appendCode(code)
    this._interpreter.run()
    return this._interpreter.value
  }
}

module.exports = ModelRunner
