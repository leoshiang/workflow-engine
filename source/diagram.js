/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const fs = require('fs')
const xml2js = require('xml2js')

/**
 * 讀取 Draw.IO 圖表(非壓縮格式)。
 */
class Diagram {

  constructor () {
    /**
     * Draw.IO 的線段和文字。
     * @type {*[]}
     */
    this.cells = []

    /**
     * Draw.IO 的圖形物件。
     * @type {*[]}
     */
    this.objects = []
  }

  /**
   * 取得連線圖形。
   * @param {object} parseResult
   * @returns {*[]}
   */
  getCells (parseResult) {
    return parseResult.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell || []
  }

  /**
   * 取得圖形物件。
   * @param {object} parseResult
   * @returns {*[]}
   */
  getObjects (parseResult) {
    return parseResult.mxfile.diagram[0].mxGraphModel[0].root[0].object || []
  }

  /**
   * 從檔案載入 Draw.IO 圖表。
   * @param {string} fileName 檔案名稱。
   * @returns {Promise<Diagram>}
   */
  async loadFromFile (fileName) {
    if (!fs.existsSync(fileName)) throw new Error(`檔案 ${fileName} 不存在！`)
    const data = fs.readFileSync(fileName, 'utf8')
    const parser = new xml2js.Parser({})
    const parseResult = await parser.parseStringPromise(data)
    this.objects = this.getObjects(parseResult)
    this.cells = this.getCells(parseResult)
    return this
  }
}

module.exports = Diagram
