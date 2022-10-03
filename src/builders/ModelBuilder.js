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

  createConnection (model, line) {
    const source = model.findStep(line.$.source)
    const target = model.findStep(line.$.target)
    if (!source || !target) {
      console.log('====>')
      console.log(line)
    }
    const textCell = this._diagram.cells.find(cell => cell.$.parent === line.$.id)
    const text = textCell ? textCell.$.value : ''
    model.createConnection(source, target, text)
  }

  createConnections (model) {
    this.getConnectedLines()
        .forEach(line => this.createConnection(model, line))
  }

  createStep (model, object) {
    const builder = StepBuilderManager.get(object.$.type)
    const step = builder.setDiagram(this._diagram)
                        .setObject(object)
                        .build()
    model.addStep(step)
  }

  createSteps (model) {
    const objects = this.findObjectsWithType()
    objects.forEach(object => this.createStep(model, object))
  }

  findObjectsWithType () {
    return this._diagram.objects.filter(object => object.$.type)
  }

  getConnectedLines () {
    return this._diagram.cells.filter(c => c.$.source && c.$.target)
  }

}

module.exports = ModelBuilder
