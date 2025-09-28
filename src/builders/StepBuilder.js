const he = require('he')
const StepManager = require('../model/steps/StepManager')

class StepBuilder {

    build() {
        const type = this.getType()
        const instance = StepManager.createInstance(type)
        instance.id = this.getId()
        instance.type = type
        instance.code = this.getCode()
        return instance
    }

    getChildren(parentId) {
        return this._diagram.cells.filter(x => x.$.parent === parentId)
    }

    getCode() {
        const children = this.getChildren(this.getId())
        let code
        if (children.length > 0) {
            code = children.reduce((prev, curr) => prev + curr.$.value, '')
        } else {
            code = this._mxObject.$.label
        }
        return he.decode(code)
    }

    getId() {
        return this._mxObject.$.id
    }

    getType() {
        return this._mxObject.$.type
    }

    setDiagram(diagram) {
        this._diagram = diagram
        return this
    }

    setObject(mxObject) {
        this._mxObject = mxObject
        return this
    }
}

module.exports = StepBuilder
