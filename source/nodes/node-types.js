/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

/**
 * 節點類型。
 * @type {{process: string, decision: string, exitPoint: string, entryPoint: string}}
 */
const NodeTypes = {
  ENTRY_POINT: 'ENTRY_POINT',
  EXIT_POINT: 'EXIT_POINT',
  PROCESS: 'PROCESS',
  DECISION: 'DECISION',
}

module.exports = NodeTypes
