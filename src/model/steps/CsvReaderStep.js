const Step = require('./Step')
const { parse } = require('csv-parse/sync')
const fs = require('fs')

class CsvReaderStep extends Step {
  constructor (id, type, code) {
    super(id, type, code)
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
