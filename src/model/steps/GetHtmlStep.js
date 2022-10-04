const Step = require('./Step')
const fetch = require('sync-fetch')

class GetHtmlStep extends Step {

  constructor (id, type, code) {
    super(id, type, code)
    this._url = ''
    this._resultVarName = ''
  }

  get resultVarName () {
    return this._resultVarName
  }

  set resultVarName (value) {
    this._resultVarName = value
  }

  get url () {
    return this._url
  }

  set url (value) {
    this._url = value
  }

  async execute (runner) {
    await super.execute(runner)

    const url = this.getVariable(this.url)
    const html = fetch(url, {}).text()
    const varName = this.getVariable(this.resultVarName)
    this.setVariable(varName, html)

    return this.getNextStep()

  }

}

module.exports = GetHtmlStep
