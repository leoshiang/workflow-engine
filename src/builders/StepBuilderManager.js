const StepTypes = require('../model/StepTypes')
const StepBuilder = require('../builders/StepBuilder')

class StepBuilderManager {
  constructor () {
    this._builders = {}
  }

  get (type) {
    const builder = this._builders[type]
    if (!builder) throw new Error(`類別 ${type} 不存在!`)
    return builder
  }

  init () {
    this.register(StepTypes.ENTRY_POINT, StepBuilder)
    this.register(StepTypes.EXIT_POINT, StepBuilder)
    this.register(StepTypes.PROCESS, StepBuilder)
    this.register(StepTypes.DECISION, StepBuilder)
  }

  register (type, builderClass) {
    this._builders[type] = new builderClass()
  }
}

module.exports = new StepBuilderManager()
