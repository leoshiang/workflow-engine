const Step = require('./Step')

class ProcessStep extends Step {

  async execute (runner) {
    runner.execute(this._code)
    return this.getNextStep()
  }

}

module.exports = ProcessStep
