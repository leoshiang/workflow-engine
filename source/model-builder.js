/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Model = require('./model')
const NodeClasses = require('./nodes/node-classes')
const he = require('he')

/**
 * 模型建造者。
 */
class ModelBuilder {

  /**
   * 從 Diagram 讀入模型。
   * @param {MXFile} diagram
   * @returns {Promise<Model>}
   */
  async build (diagram) {
    const model = new Model()
    const nodes = this.createNodes(model, diagram.objects)
    model.addNodes(nodes)
    this.createConnections(model, diagram.cells, nodes)
    return model
  }

  createConnections (model, cells, nodes) {
    cells
      .filter(c => c.$.source && c.$.target)
      .forEach(line => {
        const source = nodes.find(n => n.id === line.$.source)
        const target = nodes.find(n => n.id === line.$.target)
        const textCell = cells.find(cell => cell.$.parent === line.$.id)
        const text = textCell ? textCell.$.value : ''
        model.createConnection(source, target, text)
      })
  }

  createNodes (model, objects) {
    return objects
      .filter(x => x.$.type)
      .map(x => {
        const decodedLabel = he.decode(x.$.label)
        return new NodeClasses[x.$.type](x.$.id, x.$.type, decodedLabel)
      })
  }
}

module.exports = ModelBuilder
