/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Connection = require('./connection')
const NodeTypes = require('./node-types')

/**
 * 模型。
 */
class Model {

  constructor () {
    /**
     * 全部的連線。
     * @type {Connection[]}
     */
    this.connections = []

    /**
     * 全部的節點。
     * @type {Node[]}
     */
    this.nodes = []
  }

  /**
   * 加入多個節點。
   * @param {Node[]} nodes 節點陣列。
   * @returns {Model}
   */
  addNodes (nodes) {
    this.nodes = this.nodes.concat(nodes)
    return this
  }

  /**
   * 建立來源到目的節點的連線。
   * @param {Node} source 來源節點。
   * @param {Node} target 目的節點。
   * @param {string} code 程式碼。
   */
  createConnection (source, target, code) {
    const connection = new Connection(source, target, code)
    source.addTargetConnection(connection)
    target.addSourceConnection(connection)
    this.connections.push(connection)
    return connection
  }

  /**
   * 取得模型進入節點。
   * @returns {Node}
   */
  getEntryPoint () {
    return this.nodes.find(x => x.type === NodeTypes.ENTRY_POINT)
  }
}

module.exports = Model
