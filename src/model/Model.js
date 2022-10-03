const Connection = require('./Connection')
const StepTypes = require('./steps/StepTypes')

class Model {

  constructor () {
    this._connections = []
    this._steps = []
  }

  get steps () {
    return this._steps
  }

  addStep (step) {
    this._steps.push(step)
  }

  createConnection (source, target, code) {
    const connection = new Connection(source, target, code)
    source.addTargetConnection(connection)
    target.addSourceConnection(connection)
    this._connections.push(connection)
    return connection
  }

  findEntryPoint () {
    return this._steps.find(x => x.type === StepTypes.START)
  }

  findExitPoint () {
    return this._steps.find(x => x.type === StepTypes.STOP)
  }

  findStep (id) {
    return this._steps.find(x => x.id === id)
  }
}

module.exports = Model
