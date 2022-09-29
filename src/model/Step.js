const StepTypes = require('./StepTypes')

class Step {

  constructor () {
    this._sourceConnections = []
    this._targetConnections = []
  }

  addSourceConnection (connection) {
    this._sourceConnections.push(connection)
  }

  addTargetConnection (connection) {
    this._targetConnections.push(connection)
  }

  execute (executor) {
  }

  getCode () {
    return this._code
  }

  getId () {
    return this._id
  }

  getNextStep () {
    return this.getTargetSteps()[0]
  }

  getSourceConnections () {
    return this._sourceConnections
  }

  getSourceSteps () {
    return this._sourceConnections.map(c => c.source)
  }

  getTargetConnections () {
    return this._targetConnections
  }

  getTargetSteps () {
    return this._targetConnections.map(c => c.target)
  }

  getType () {
    return this._type
  }

  isTypeValid (type) {
    return StepTypes[type] !== undefined
  }

  replaceHtmlLineBreakWithCrLf (text) {
    return text.replaceAll('<br>', '\r\n')
  }

  setCode (code) {
    this._code = this.replaceHtmlLineBreakWithCrLf(code)
    return this
  }

  setId (id) {
    this._id = id
    return this
  }

  setType (type) {
    if (!this.isTypeValid(type)) throw new Error(`無效的類別 ${type}!`)
    this._type = type
    return this
  }
}

module.exports = Step
