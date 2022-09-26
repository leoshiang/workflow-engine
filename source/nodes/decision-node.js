/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Node = require('./node')

/**
 * 決策節點。
 */
class DecisionNode extends Node {

  /**
   * 建構子。
   * @param {string} id ID
   * @param {string} type 類別。
   * @param {string} code 程式碼。
   */
  constructor (id, type, code) {
    super(id, type, code)
  }

  /**
   * 執行程式碼。
   * @param {ModelRunner} executor
   * @returns {null|Node}
   */
  execute (executor) {
    for (const connection of this.targetConnections) {
      let expression = this.getLogicalExpression(connection)
      const result = executor.execute(expression)
      if (this.isResultEquals(connection, result)) {
        return connection.target
      }
    }
    throw new Error('沒有符合條件式決策結果的路徑。')
  }

  /**
   * 建立邏輯表示式。
   * @param {Connection} connection
   * @returns {string}
   */
  getLogicalExpression (connection) {
    let expression = this.code
    if (!connection.isLogicalOperand()) {
      expression = expression + ' === ' + connection.code + ';'
    }
    return expression
  }

  /**
   * 連線是否符合。
   * @param {Connection} connection
   * @param {Boolean} result
   * @returns {boolean}
   */
  isResultEquals (connection, result) {
    let match
    if (connection.isLogicalOperand()) {
      match = result === JSON.parse(connection.code)
    } else {
      match = result.toString() === connection.code
    }
    return match
  }

}

module.exports = DecisionNode
