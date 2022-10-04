const StepTypes = require('./StepTypes')

class Step {

  constructor () {
    this._sourceConnections = []
    this._targetConnections = []
  }

  get code () {
    return this._code
  }

  set code (value) {
    this._code = this.replaceHtmlLineBreakWithCrLf(value)
  }

  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  get sourceConnections () {
    return this._sourceConnections
  }

  get sourceSteps () {
    return this._sourceConnections.map(c => c.source)
  }

  get targetConnections () {
    return this._targetConnections
  }

  get targetSteps () {
    return this._targetConnections.map(c => c.target)
  }

  get type () {
    return this._type
  }

  set type (value) {
    if (!this.isTypeValid(value)) throw new Error(`無效的類別 ${value}!`)
    this._type = value
  }

  addSourceConnection (connection) {
    this._sourceConnections.push(connection)
  }

  addTargetConnection (connection) {
    this._targetConnections.push(connection)
  }

  async execute (runner) {
    this._runner = runner
  }

  getBooleanVariable (valueOrReference) {
    const value = (this.getVariable(valueOrReference) || '').toLowerCase()
    if (!value) return false
    if (value !== 'true' && value !== 'false') return false
    return JSON.parse(value)
  }

  getNextStep () {
    return this.targetSteps[0]
  }

  getVariable (valueOrReference) {
    if (!valueOrReference) return undefined
    if (valueOrReference.startsWith('@')) {
      let varName = valueOrReference.substring(1)
      return this._runner.getVariable(varName)
    } else {
      return valueOrReference
    }
  }

  isTypeValid (type) {
    return StepTypes[type] !== undefined
  }

  replaceHtmlLineBreakWithCrLf (text) {
    return text.replaceAll('<br>', '\r\n')
  }

  setVariable (varName, value) {
    if (!varName) return
    this._runner.setVariable(varName, value)
  }
}

module.exports = Step
