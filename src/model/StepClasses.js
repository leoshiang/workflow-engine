const DecisionStep = require('./DecisionStep')
const ProcessStep = require('./ProcessStep')
const StepTypes = require('./StepTypes')

const stepClasses = {}
stepClasses[StepTypes.DECISION] = DecisionStep
stepClasses[StepTypes.PROCESS] = ProcessStep
stepClasses[StepTypes.EXIT_POINT] = ProcessStep
stepClasses[StepTypes.ENTRY_POINT] = ProcessStep
stepClasses[StepTypes.PROCESS] = ProcessStep

function get (type) {
  const stepClass = stepClasses[type]
  if (!stepClass) throw new Error(`類別 ${type} 不存在!`)
  return stepClass
}

module.exports = stepClasses
