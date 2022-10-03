const StepTypes = require('./steps/StepTypes')

class ModelValidator {

  constructor () {
    this._rules = []
    this.initRules()
  }

  everyProcessStepMustHaveSourceAndTarget (model) {
    const result = []
    this.getProcessSteps(model).forEach(x => {
      if (x.sourceConnections.length === 0) {
        result.push(`\r\n沒有來源連接到此步驟。\r\n編號:${x.id}\r\nCode:${x.code}`)
      }
      if (x.targetConnections.length === 0) {
        result.push(`\r\n沒有連接到其他步驟。\r\n編號:${x.id}\r\nCode:${x.code}`)
      }
    })
    return result
  }

  getProcessSteps (model) {
    return model.steps.filter(
      x => x.type !== StepTypes.START && x.type !== StepTypes.STOP)
  }

  initRules () {
    this._rules.push(this.mustHaveStartAndStop.bind(this))
    this._rules.push(this.everyProcessStepMustHaveSourceAndTarget.bind(this))
  }

  mustHaveStartAndStop (model) {
    const result = []
    if (!model.findEntryPoint()) result.push('沒有起點(START)')
    if (!model.findExitPoint()) result.push('沒有迄點(STOP)')
    return result
  }

  validate (model) {
    let messages = []
    this._rules.forEach(x => messages = messages.concat(x(model)))
    return messages
  }

}

module.exports = ModelValidator
