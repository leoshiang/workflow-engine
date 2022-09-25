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
const xmlParser = new xml2js.Parser({})
const zlib = require('zlib')

/**
 * 讀取 Draw.IO 圖表(非壓縮格式)。
 */
class MXFile {

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
   * 解壓縮。
   * @param parseResult
   * @returns {Promise<void>}
   */
  async decompress (parseResult) {
    for (let diagram of parseResult.mxfile.diagram) {
      if (!diagram._) continue
      const decompressedXML = zlib.inflateRawSync(Buffer.from(diagram._, 'base64')).toString()
      const decodedXML = decodeURIComponent(decompressedXML)
      const parsedXML = await xmlParser.parseStringPromise(decodedXML)
      diagram.mxGraphModel = [parsedXML.mxGraphModel]
      delete diagram._
    }
  }

  /**
   * 取得連線圖形。
   * @param {object} parseResult
   * @returns {*[]}
   */
  getCells (parseResult) {
    const root = parseResult.mxfile.diagram[0].mxGraphModel[0].root
    return root ? root[0].mxCell : []
  }

  /**
   * 取得圖形物件。
   * @param {object} parseResult
   * @returns {*[]}
   */
  getObjects (parseResult) {
    const model = parseResult.mxfile.diagram[0].mxGraphModel[0]
    return model.root ? model.root[0].object : []
  }

  /**
   * 從檔案載入 Draw.IO 圖表。
   * @param {string} fileName 檔案名稱。
   * @returns {Promise<MXFile>}
   */
  async loadFromFile (fileName) {
    if (!fs.existsSync(fileName)) throw new Error(`檔案 ${fileName} 不存在！`)
    const data = fs.readFileSync(fileName, 'utf8')
    const xml = await xmlParser.parseStringPromise(data)
    await this.decompress(xml)
    this.objects = this.getObjects(xml)
    this.cells = this.getCells(xml)
    return this
  }
}

module.exports = MXFile
