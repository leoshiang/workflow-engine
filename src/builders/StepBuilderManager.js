const StepTypes = require('../model/steps/StepTypes')
const StepBuilder = require('../builders/StepBuilder')
const SendEmailStepBuilder = require('./SendEmailStepBuilder')
const CsvReaderStepBuilder = require('./CsvReaderStepBuilder')
const GetHtmlStepBuilder = require('./GetHtmlStepBuilder')
const PromptStepBuilder = require('./PromptStepBuilder')
const ExecStepBuilder = require('./ExecStepBuilder')

class StepBuilderManager {
    constructor() {
        this._builders = new Map() // 使用 Map 而不是物件
        this._initialized = false
    }

    get(type) {
        if (!this._initialized) {
            throw new Error('StepBuilderManager 尚未初始化，請先呼叫 init()')
        }

        const builder = this._builders.get(type)
        if (!builder) {
            throw new Error(`類別 ${type} 不存在！`)
        }
        return builder
    }

    init() {
        if (this._initialized) {
            return // 防止重複初始化
        }

        this.register(StepTypes.START, StepBuilder)
        this.register(StepTypes.STOP, StepBuilder)
        this.register(StepTypes.PROCESS, StepBuilder)
        this.register(StepTypes.DECISION, StepBuilder)
        this.register(StepTypes.SEND_EMAIL, SendEmailStepBuilder)
        this.register(StepTypes.CSV_READER, CsvReaderStepBuilder)
        this.register(StepTypes.GET_HTML, GetHtmlStepBuilder)
        this.register(StepTypes.PROMPT, PromptStepBuilder)
        this.register(StepTypes.EXEC, ExecStepBuilder)

        this._initialized = true
    }

    register(type, builderClass) {
        if (!type || !builderClass) {
            throw new Error('類型和建構器類別不能為空')
        }
        this._builders.set(type, new builderClass())
    }
}

module.exports = new StepBuilderManager()