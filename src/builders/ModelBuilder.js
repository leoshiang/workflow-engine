const Model = require('../model/Model')
const StepBuilderManager = require('./StepBuilderManager')

class ModelBuilder {

  constructor () {
  }

  async build (diagram) {
    this._diagram = diagram
    const model = new Model()
    this.createSteps(model)
    this.createConnections(model)
    return model
  }

  createSteps (model) {
    this.findObjectsWithType()
        .forEach(object => this.createStep(model, object))
  }

  findObjectsWithType() {
    return this._diagram.objects.filter(object => object.$.type)
  }

  createStep (model, object) {
    const builder = StepBuilderManager.get(object.$.type)
    const step = builder.setDiagram(this._diagram)
                        .setObject(object)
                        .build()
    model.addStep(step)
  }

  createConnections (model) {
    this.getConnectedLines()
        .forEach(line => this.createConnection(model, line))
  }

  getConnectedLines () {
    return this._diagram.cells.filter(c => c.$.source && c.$.target)
  }

  createConnection (model, line) {
    const source = model.findStep(line.$.source)
    const target = model.findStep(line.$.target)
    const textCell = this._diagram.cells.find(cell => cell.$.parent === line.$.id)
    const text = textCell ? textCell.$.value : ''
    model.createConnection(source, target, text)
  }

}

module.exports = ModelBuilder
