const StepTypes = require('./StepTypes')
const ProcessStep = require('./ProcessStep')
const DecisionStep = require('./DecisionStep')

class StepManager {

  constructor () {
    this._steps = {}
  }

  createInstance (type) {
    const stepClass = this._steps[type]
    if (!stepClass) throw new Error(`類別 ${type} 不存在!`)
    return new stepClass()
  }

  init () {
    this.registerStepClass(StepTypes.ENTRY_POINT, ProcessStep)
    this.registerStepClass(StepTypes.EXIT_POINT, ProcessStep)
    this.registerStepClass(StepTypes.PROCESS, ProcessStep)
    this.registerStepClass(StepTypes.DECISION, DecisionStep)
  }

  registerStepClass (type, stepClass) {
    this._steps[type] = stepClass
  }
}

module.exports = new StepManager()
