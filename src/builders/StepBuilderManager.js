const StepTypes = require('../model/steps/StepTypes')
const StepBuilder = require('../builders/StepBuilder')
const SendEmailStepBuilder = require('./SendEmailStepBuilder')
const CsvReaderStepBuilder = require('./CsvReaderStepBuilder')
const GetHtmlStepBuilder = require('./GetHtmlStepBuilder')
const PromptStepBuilder = require('./PromptStepBuilder')
const ExecStepBuilder = require('./ExecStepBuilder')

class StepBuilderManager {
  constructor () {
    this._builders = {}
  }

  get (type) {
    const builder = this._builders[type]
    if (!builder) throw new Error(`類別 ${type} 不存在!`)
    return builder
  }

  init () {
    this.register(StepTypes.START, StepBuilder)
    this.register(StepTypes.STOP, StepBuilder)
    this.register(StepTypes.PROCESS, StepBuilder)
    this.register(StepTypes.DECISION, StepBuilder)
    this.register(StepTypes.SEND_EMAIL, SendEmailStepBuilder)
    this.register(StepTypes.CSV_READER, CsvReaderStepBuilder)
    this.register(StepTypes.GET_HTML, GetHtmlStepBuilder)
    this.register(StepTypes.PROMPT, PromptStepBuilder)
    this.register(StepTypes.EXEC, ExecStepBuilder)
  }

  register (type, builderClass) {
    this._builders[type] = new builderClass()
  }
}

module.exports = new StepBuilderManager()
