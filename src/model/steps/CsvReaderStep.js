const Step = require('./Step')
const { parse } = require('csv-parse/sync')
const fs = require('fs')

class CsvReaderStep extends Step {
  constructor (id, type, code) {
    super(id, type, code)
    this._encoding = ''
    this._delimiter = ''
    this._fileName = ''
    this._resultVarName = ''
    this._from = ''
    this._firstLineIsColumnNames = ''
    this._ignoreLastDelimiter = ''
    this._trimWhiteSpaces = ''
  }

  get delimiter () {
    return this._delimiter
  }

  set delimiter (value) {
    this._delimiter = value
  }

  get encoding () {
    return this._encoding
  }

  set encoding (value) {
    this._encoding = value
  }

  get fileName () {
    return this._fileName
  }

  set fileName (value) {
    this._fileName = value
  }

  get firstLineIsColumnNames () {
    return this._firstLineIsColumnNames
  }

  set firstLineIsColumnNames (value) {
    this._firstLineIsColumnNames = value
  }

  get from () {
    return this._from
  }

  set from (value) {
    this._from = value
  }

  get ignoreLastDelimiter () {
    return this._ignoreLastDelimiter
  }

  set ignoreLastDelimiter (value) {
    this._ignoreLastDelimiter = value
  }

  get resultVarName () {
    return this._resultVarName
  }

  set resultVarName (value) {
    this._resultVarName = value
  }

  get trimWhiteSpaces () {
    return this._trimWhiteSpaces
  }

  set trimWhiteSpaces (value) {
    this._trimWhiteSpaces = value
  }

  async execute (runner) {
    await super.execute(runner)
    const encoding = this.getVariable(this.encoding)
    const fileName = this.getVariable(this.fileName)
    const csv = fs.readFileSync(fileName, encoding)
    const firstLineIsColumnNames = this.getBooleanVariable(this.firstLineIsColumnNames)
    const ignoreLastDelimiter = this.getVariable(this.ignoreLastDelimiter)

    const lines = parse(csv, {
      columns: firstLineIsColumnNames,
      delimiter: this.getVariable(this.delimiter),
      from: this.getVariable(this.from),
      ignore_last_delimiters: firstLineIsColumnNames && ignoreLastDelimiter,
      trim: this.getBooleanVariable(this.trimWhiteSpaces),
    })

    const varName = this.getVariable(this.resultVarName)
    this.setVariable(varName, lines)
    return this.getNextStep()
  }

}

module.exports = CsvReaderStep
