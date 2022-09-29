const Connection = require('./Connection')
const StepTypes = require('./StepTypes')

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

  findStep (id) {
    return this._steps.find(x => x.getId() === id)
  }

  findEntryPoint () {
    return this._steps.find(x => x.getType() === StepTypes.ENTRY_POINT)
  }

  findExitPoint () {
    return this._steps.find(x => x.getType() === StepTypes.EXIT_POINT)
  }
}

module.exports = Model
