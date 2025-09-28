const Step = require('./Step')

class ProcessStep extends Step {

    async execute(runner) {
        runner.execute(this.code)
        return this.getNextStep()
    }

}

module.exports = ProcessStep
