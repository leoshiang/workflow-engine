const Connection = require('./Connection')
const StepTypes = require('./steps/StepTypes')

class Model {
    constructor() {
        this._connections = []
        this._steps = []
    }

    get steps() {
        return this._steps
    }

    addStep(step) {
        if (!step) {
            throw new Error('步驟不能為 null 或 undefined')
        }
        this._steps.push(step)
    }

    createConnection(source, target, code) {
        if (!source || !target) {
            throw new Error('來源和目標步驟不能為空')
        }

        const connection = new Connection(source, target, code)
        source.addTargetConnection(connection)
        target.addSourceConnection(connection)
        this._connections.push(connection)
        return connection
    }

    findEntryPoint() {
        return this._steps.find(x => x.type === StepTypes.START)
    }

    findExitPoint() {
        return this._steps.find(x => x.type === StepTypes.STOP)
    }

    findStep(id) {
        if (!id) {
            return undefined
        }
        return this._steps.find(x => x.id === id)
    }
}

module.exports = Model