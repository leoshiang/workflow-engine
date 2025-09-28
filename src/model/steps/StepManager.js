const StepTypes = require('./StepTypes')
const ProcessStep = require('./ProcessStep')
const DecisionStep = require('./DecisionStep')
const SendEmailStep = require('./SendEmailStep')
const CsvReaderStep = require('./CsvReaderStep')
const HtmlParserStep = require('./GetHtmlStep')
const PromptStep = require('./PromptStep')
const ExecStep = require('./ExecStep')

class StepManager {

    constructor() {
        this._steps = {}
    }

    createInstance(type) {
        const stepClass = this._steps[type]
        if (!stepClass) throw new Error(`類別 ${type} 不存在!`)
        return new stepClass()
    }

    init() {
        this.registerStepClass(StepTypes.START, ProcessStep)
        this.registerStepClass(StepTypes.STOP, ProcessStep)
        this.registerStepClass(StepTypes.PROCESS, ProcessStep)
        this.registerStepClass(StepTypes.DECISION, DecisionStep)
        this.registerStepClass(StepTypes.SEND_EMAIL, SendEmailStep)
        this.registerStepClass(StepTypes.CSV_READER, CsvReaderStep)
        this.registerStepClass(StepTypes.GET_HTML, HtmlParserStep)
        this.registerStepClass(StepTypes.PROMPT, PromptStep)
        this.registerStepClass(StepTypes.EXEC, ExecStep)
    }

    registerStepClass(type, stepClass) {
        this._steps[type] = stepClass
    }
}

module.exports = new StepManager()
