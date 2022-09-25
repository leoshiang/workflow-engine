/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

/**
 * 兩個節點之間的連線。
 */
class Connection {

  /**
   * 建構子。
   * @param {Node} source 來源節點。
   * @param {Node} target 目的節點。
   * @param {string} code 程式碼。
   */
  constructor (source, target, code) {
    if (!source) throw new Error('source 必須是有效的 Node 物件！')
    if (!target) throw new Error('target 必須是有效的 Node 物件！')

    /**
     * 程式碼。
     * @type {string}
     */
    this.code = code

    /**
     * 來源節點。
     * @type {Node}
     */
    this.source = source

    /**
     * 目的節點。
     * @type {Node}
     */
    this.target = target
  }

  /**
   * 此連線是否為邏輯運算元。
   * @returns {boolean}
   */
  isLogicalOperand () {
    return this.code === 'true' || this.code === 'false'
  }
}

module.exports = Connection
