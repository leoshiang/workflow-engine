const fs = require('fs')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser({})
const zlib = require('zlib')

class Diagram {

  constructor () {
    this._cells = []
    this._objects = []
  }

  get cells () {
    return this._cells
  }

  get objects () {
    return this._objects
  }

  async loadFromFile (fileName) {
    if (!fs.existsSync(fileName)) throw new Error(`檔案 ${fileName} 不存在！`)
    const data = fs.readFileSync(fileName, 'utf8')
    const xml = await xmlParser.parseStringPromise(data)
    await this.decompress(xml)
    this.getObjects(xml)
    this.getCells(xml)
    return this
  }

  async decompress (xml) {
    for (let diagram of xml.mxfile.diagram) {
      if (!diagram._) continue
      const decompressedXML = zlib.inflateRawSync(Buffer.from(diagram._, 'base64')).toString()
      const decodedXML = decodeURIComponent(decompressedXML)
      const parsedXML = await xmlParser.parseStringPromise(decodedXML)
      diagram.mxGraphModel = [parsedXML.mxGraphModel]
      delete diagram._
    }
  }

  getCells (xml) {
    const root = xml.mxfile.diagram[0].mxGraphModel[0].root
    this._cells = root ? root[0].mxCell : []
  }

  getObjects (xml) {
    const model = xml.mxfile.diagram[0].mxGraphModel[0]
    this._objects = model.root ? model.root[0].object : []
  }
}

module.exports = Diagram
