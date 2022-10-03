const StepBuilder = require('./StepBuilder')

class PromptStepBuilder extends StepBuilder {

  build () {
    const instance = super.build()
    instance.message = this._mxObject.$.message
    instance.resultVarName = this._mxObject.$.resultVarName
    instance.timeOut = this._mxObject.$.timeOut
    instance.title = this._mxObject.$.title
    return instance
  }
}

module.exports = PromptStepBuilder
