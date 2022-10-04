const Step = require('./Step')
const prompt = require('prompt')
const colors = require('@colors/colors/safe')

class PromptStep extends Step {

  constructor (id, type, code) {
    super(id, type, code)
    this._message = ''
    this._resultVarName = ''
    this._timeOut = ''
    this._title = ''
  }

  get message () {
    return this._message
  }

  set message (value) {
    this._message = value
  }

  get resultVarName () {
    return this._resultVarName
  }

  set resultVarName (value) {
    this._resultVarName = value
  }

  get timeOut () {
    return this._timeOut
  }

  set timeOut (value) {
    this._timeOut = value
  }

  get title () {
    return this._title
  }

  set title (value) {
    this._title = value
  }

  async execute (runner) {
    await super.execute(runner)
    prompt.start()
    const { result } = await prompt.get({
      properties: {
        result: {
          description: colors.magenta(this.message),
        },
      },
    })
    this.setVariable(this.resultVarName, result)
    return this.getNextStep()
  }
}

module.exports = PromptStep
