const StepBuilder = require('./StepBuilder')

class CsvReaderStepBuilder extends StepBuilder {

  build () {
    const instance = super.build()
    instance.encoding = this._mxObject.$.encoding
    instance.delimiter = this._mxObject.$.delimiter
    instance.fileName = this._mxObject.$.filename
    instance.resultVarName = this._mxObject.$.resultVarName
    instance.from = this._mxObject.$.from
    instance.firstLineIsColumnNames = this._mxObject.$.firstLineIsColumnNames
    instance.ignoreLastDelimiter = this._mxObject.$.ignoreLastDelimiter
    instance.trimWhiteSpaces = this._mxObject.$.trimWhiteSpaces
    return instance
  }
}

module.exports = CsvReaderStepBuilder
