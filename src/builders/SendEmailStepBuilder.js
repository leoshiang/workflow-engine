const StepBuilder = require('./StepBuilder')

class SendEmailStepBuilder extends StepBuilder {

  build () {
    const instance = super.build()
    instance.body = this._mxObject.$.body
    instance.from = this._mxObject.$.from
    instance.host = this._mxObject.$.host
    instance.password = this._mxObject.$.password
    instance.port = this._mxObject.$.port
    instance.recipients = this._mxObject.$.recipients
    instance.subject = this._mxObject.$.subject
    instance.userName = this._mxObject.$.username
    instance.secure = this._mxObject.$.secure
    instance.attachments = this._mxObject.$.attachments
    return instance
  }
}

module.exports = SendEmailStepBuilder
