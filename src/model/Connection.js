class Connection {

  constructor (source, target, code) {
    if (!source) throw new Error('source 必須是有效的 Step 物件！')
    if (!target) throw new Error('target 必須是有效的 Step 物件！')
    this._code = code
    this._source = source
    this._target = target
  }

  get code () {
    return this._code
  }

  get source () {
    return this._source
  }

  get target () {
    return this._target
  }

  isLogicalOperand () {
    return this._code === 'true' || this._code === 'false'
  }
}

module.exports = Connection
