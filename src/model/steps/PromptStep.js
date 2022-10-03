const Step = require('./Step')
const prompt = require('prompt')
const colors = require('@colors/colors/safe')

class PromptStep extends Step {
  constructor (id, type, code) {
    super(id, type, code)
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
