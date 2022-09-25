/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const DolphinInterpreter = require('./dolphin-interpreter')
const NodeTypes = require('./node-types')

/**
 * 節點。
 */
class Node {

  /**
   * 建構子。
   * @param {string} id ID
   * @param {string} type 類別。
   * @param {string} code 程式碼。
   */
  constructor (id, type, code) {
    if (!this.isTypeValid(type)) throw new Error(`無效的類別 ${type}!`)

    this.id = id
    this.type = type
    this.code = this.replaceHtmlBrWithCrLf(code)

    /**
     *
     * @type {Connection[]}
     */
    this.sourceConnections = []

    /**
     * 與目的節點的連結。
     * @type {Connection[]}
     */
    this.targetConnections = []
  }

  /**
   * 加入來源連結。
   * @param {Connection} connection
   */
  addSourceConnection (connection) {
    this.sourceConnections.push(connection)
  }

  /**
   * 加入目的連結。
   * @param {Connection} connection
   */
  addTargetConnection (connection) {
    this.targetConnections.push(connection)
  }

  /**
   * 執行程式碼並回傳下一個節點。
   * @returns {Node}
   */
  execute () {
    DolphinInterpreter.execute(this.code)
    return this.getNextTargetNode()
  }

  /**
   * 取得第一個目的節點。
   * @returns {Node}
   */
  getNextTargetNode () {
    return this.getTargetNodes()[0]
  }

  /**
   * 取得來源節點。
   * @returns {Node[]}
   */
  getSourceNodes () {
    return this.sourceConnections.map(c => c.source)
  }

  /**
   * 取得目的節點。一個節點通常只會有一個目的節點，只有決策節點會有兩個以上的目的節點。
   * @returns {Node[]}
   */
  getTargetNodes () {
    return this.targetConnections.map(c => c.target)
  }

  isTypeValid (type) {
    return NodeTypes[type] !== undefined
  }

  /**
   * 將 HTML 的換行符號 <BR> 改為 CRLF。
   * 如果在 Draw.IO 的圖形上面輸入多行文字，換行符號會以 <BR> 的形式儲存。
   * @param code
   * @returns {string}
   */
  replaceHtmlBrWithCrLf (code) {
    return code.replaceAll('<br>', '\r\n')
  }
}

module.exports = Node
