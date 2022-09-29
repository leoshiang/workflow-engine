const Step = require('./Step')

class ProcessStep extends Step {

  execute (executor) {
    executor.execute(this._code)
    return this.getNextStep()
  }

}

module.exports = ProcessStep
