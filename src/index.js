const ModelBuilder = require('./builders/ModelBuilder')
const ModelRunner = require('./model/ModelRunner')
const StepBuilderManager = require('./builders/StepBuilderManager')
const StepManager = require('./model/StepManager')
const Diagram = require('./model/Diargam')
const Validator = require('./model/ModelValidator')
const fs = require('fs')

;
(async () => {
  if (process.argv.length < 3) {
    console.log('使用方式：dwe test.drawio')
    process.exit(1)
  }
  const fileName = process.argv[2]
  if (!fs.existsSync(fileName)) {
    console.log(`檔案 ${fileName} 不存在！`)
    process.exit(1)
  }

  StepBuilderManager.init()
  StepManager.init()
  const diagram = await new Diagram().loadFromFile(fileName)
  const model = await new ModelBuilder().build(diagram)

  const errorMessages = new Validator().validate(model)
  if (errorMessages.length > 0) {
    const messageLines = errorMessages.reduce((prev, curr) => prev + curr + '\r\n', '\r\n')
    throw new Error(messageLines)
  }

  new ModelRunner().run(model)
})()
