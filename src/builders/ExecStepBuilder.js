const StepBuilder = require('./StepBuilder')

class ExecStepBuilder extends StepBuilder {

  build () {
    const instance = super.build()
    instance.command = this._mxObject.$.command
    instance.stdout = this._mxObject.$.stdout
    instance.stderr = this._mxObject.$.stderr
    return instance
  }
}

module.exports = ExecStepBuilder
