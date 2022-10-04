const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const Step = require('./Step')

class ExecStep extends Step {

  constructor (id, type, code) {
    super(id, type, code)
    this._command = ''
    this._stderr = ''
    this._stdout = ''
  }

  get command () {
    return this._command
  }

  set command (value) {
    this._command = value
  }

  get stderr () {
    return this._stderr
  }

  set stderr (value) {
    this._stderr = value
  }

  get stdout () {
    return this._stdout
  }

  set stdout (value) {
    this._stdout = value
  }

  async execute (runner) {
    await super.execute(runner)
    const { stdout, stderr } = await exec(this.getVariable(this.command));
    this.setVariable(this.stdout, stdout)
    this.setVariable(this.stderr, stderr)
    return this.getNextStep()
  }
}

module.exports = ExecStep
