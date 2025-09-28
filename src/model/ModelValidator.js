const StepTypes = require('./steps/StepTypes')
const ErrorMessages = require('../constants/ErrorMessages')

class ModelValidator {
    constructor() {
        this._rules = []
        this.initRules()
    }

    everyProcessStepMustHaveSourceAndTarget(model) {
        const result = []
        const processSteps = this.getProcessSteps(model)

        processSteps.forEach(step => {
            if (step.sourceConnections.length === 0) {
                result.push(this.formatErrorMessage(ErrorMessages.NO_SOURCE_CONNECTION, step))
            }
            if (step.targetConnections.length === 0) {
                result.push(this.formatErrorMessage(ErrorMessages.NO_TARGET_CONNECTION, step))
            }
        })

        return result
    }

    formatErrorMessage(message, step) {
        return `\r\n${message}\r\n編號: ${step.id}\r\n程式碼: ${step.code}`
    }

    getProcessSteps(model) {
        return model.steps.filter(
            step => step.type !== StepTypes.START && step.type !== StepTypes.STOP
        )
    }

    initRules() {
        this._rules.push(this.mustHaveStartAndStop.bind(this))
        this._rules.push(this.everyProcessStepMustHaveSourceAndTarget.bind(this))
    }

    mustHaveStartAndStop(model) {
        const result = []
        if (!model.findEntryPoint()) {
            result.push(ErrorMessages.MISSING_START_STEP)
        }
        if (!model.findExitPoint()) {
            result.push(ErrorMessages.MISSING_STOP_STEP)
        }
        return result
    }

    validate(model) {
        if (!model) {
            throw new Error('模型不能為空')
        }

        let messages = []
        this._rules.forEach(rule => {
            messages = messages.concat(rule(model))
        })
        return messages
    }
}

module.exports = ModelValidator