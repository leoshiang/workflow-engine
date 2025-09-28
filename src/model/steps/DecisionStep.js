const Step = require('./Step')

class DecisionStep extends Step {

    constructor(id, type, code) {
        super(id, type, code)
    }

    execute(runner) {
        for (const connection of this._targetConnections) {
            let expression = this.getLogicalExpression(connection)
            const result = runner.execute(expression)
            if (this.isResultEquals(connection, result)) {
                return connection.target
            }
        }
        throw new Error('沒有符合條件式決策結果的路徑。')
    }

    getLogicalExpression(connection) {
        let expression = this.code
        if (!connection.isLogicalOperand()) {
            expression = expression + ' === ' + connection.code + ';'
        }
        return expression
    }

    isResultEquals(connection, result) {
        if (connection.isLogicalOperand()) {
            return result === JSON.parse(connection.code)
        } else {
            return result.toString() === connection.code
        }
    }

}

module.exports = DecisionStep
