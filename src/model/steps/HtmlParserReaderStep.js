const Step = require('./Step')
const fetch = require('sync-fetch')

class HtmlParserStep extends Step {
  constructor (id, type, code) {
    super(id, type, code)
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

module.exports = HtmlParserStep
