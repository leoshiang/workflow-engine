const StepTypes = require('./StepTypes')

class ModelValidator {

  constructor () {
    this._rules = []
    this.initRules()
  }

  initRules () {
    this._rules.push(this.mustHaveEntryAndExitPoints.bind(this))
    this._rules.push(this.everyProcessStepMustHaveSourceAndTarget.bind(this))
  }

  everyProcessStepMustHaveSourceAndTarget (model) {
    const result = []
    this.getProcessSteps(model).forEach(x => {
      if (x.sourceConnections.length === 0) {
        result.push(`\r\n沒有來源連接到此步驟。\r\n編號:${x.getId()}\r\nCode:${x.getCode()}`)
      }
      if (x.targetConnections.length === 0) {
        result.push(`\r\n沒有連接到其他步驟。\r\n編號:${x.getId()}\r\nCode:${x.getCode()}`)
      }
    })
    return result
  }

  getProcessSteps (model) {
    return model.steps.filter(
      x => x.getType() !== StepTypes.ENTRY_POINT && x.getType() !== StepTypes.EXIT_POINT)
  }

  mustHaveEntryAndExitPoints (model) {
    const result = []
    if (!model.findEntryPoint()) result.push('沒有起點(ENTRY_POINT)')
    if (!model.findExitPoint()) result.push('沒有迄點(EXIT_POINT)')
    return result
  }

  validate (model) {
    let messages = []
    this._rules.forEach(x => messages = messages.concat(x(model)))
    return messages
  }

}

module.exports = ModelValidator
