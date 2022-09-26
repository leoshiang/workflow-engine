/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

const Node = require('./node')
const DecisionNode = require('./decision-node')

const NodeClasses = {
  'ENTRY_POINT': Node,
  'EXIT_POINT': Node,
  'DECISION': DecisionNode,
  'PROCESS': Node,
}

module.exports = NodeClasses
