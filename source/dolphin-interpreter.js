/**
 * @license
 * Copyright (c) 2022 Leo Shiang
 * SPDX-License-Identifier: MIT
 */

/**
 * @author leoshiang@gmail.com (Leo Shiang)
 */

global.acorn = require('../third-party/acorn')
const JSInterpreter = require('../third-party/interpreter')
const robot = require('robotjs')
const fs = require('fs')

const keys = {
  backspace: 'backspace',
  delete: 'delete',
  enter: 'enter',
  tab: 'tab',
  escape: 'escape',
  up: 'up',
  down: 'down',
  right: 'right',
  left: 'left',
  home: 'home',
  end: 'end',
  pageup: 'pageup',
  pagedown: 'pagedown',
  f1: 'f1',
  f2: 'f2',
  f3: 'f3',
  f4: 'f4',
  f5: 'f5',
  f6: 'f6',
  f7: 'f7',
  f8: 'f8',
  f9: 'f9',
  f10: 'f10',
  f11: 'f11',
  f12: 'f12',
  command: 'command',
  alt: 'alt',
  control: 'control',
  shift: 'shift',
  right_shift: 'right_shift',
  space: 'space',
  printscreen: 'printscreen',
  insert: 'insert',
  audio_mute: 'audio_mute',
  audio_vol_down: 'audio_vol_down',
  audio_vol_up: 'audio_vol_up',
  audio_play: 'audio_play',
  audio_stop: 'audio_stop',
  audio_pause: 'audio_pause',
  audio_prev: 'audio_prev',
  audio_next: 'audio_next',
  audio_rewind: 'audio_rewind',
  audio_forward: 'audio_forward',
  audio_repeat: 'audio_repeat',
  audio_random: 'audio_random',
  numpad_0: 'numpad_0',
  numpad_1: 'numpad_1',
  numpad_2: 'numpad_2',
  numpad_3: 'numpad_3',
  numpad_4: 'numpad_4',
  numpad_5: 'numpad_5',
  numpad_6: 'numpad_6',
  numpad_7: 'numpad_7',
  numpad_8: 'numpad_8',
  numpad_9: 'numpad_9',
  lights_mon_up: 'lights_mon_up',
  lights_mon_down: 'lights_mon_down',
  lights_kbd_toggle: 'lights_kbd_toggle',
  lights_kbd_up: 'lights_kbd_up',
  lights_kbd_down: 'lights_kbd_down',
}

const mouseButton = (button = 'left', down = 'down') => robot.mouseToggle(down, button)
const mouseClick = (button = 'left', double = false) => robot.mouseClick(button, double)
const mouseDragTo = (x, y) => robot.dragMouse(x, y)
const mouseGetPosition = () => interpreter.nativeToPseudo(robot.getMousePos())
const mouseMoveTo = (x, y) => robot.moveMouse(x, y)
const mouseScroll = (x, y) => robot.scrollMouse(x, y)
const print = (text) => console.log(text)
const screenGetColor = (x, y) => robot.getPixelColor(x, y)
const screenGetSize = () => interpreter.nativeToPseudo(robot.getScreenSize())

const keyboardPress = (key, modifier)=> robot.keyTap(key, modifier)
const keyboardType = (string)=> robot.typeString(string)

function addNativeFunction (interpreter, globalObject, name, func) {
  interpreter.setProperty(globalObject, name, interpreter.createNativeFunction(func))
}

function readFile (fileName, encoding = 'UTF8') {
  return fs.readFileSync(fileName, encoding)
}

function initKeyboardFunctions(interpreter, globalObject) {
// Create 'mouse' global object.
  let keyboard = interpreter.nativeToPseudo({})
  interpreter.setProperty(globalObject, 'keyboard', keyboard)
  interpreter.setProperty(keyboard, 'press', interpreter.createNativeFunction(keyboardPress))
  interpreter.setProperty(keyboard, 'type', interpreter.createNativeFunction(keyboardType))
}

function initMouseFunctions (interpreter, globalObject) {
  // Create 'mouse' global object.
  let mouse = interpreter.nativeToPseudo({})
  interpreter.setProperty(globalObject, 'mouse', mouse)
  interpreter.setProperty(mouse, 'button', interpreter.createNativeFunction(mouseButton))
  interpreter.setProperty(mouse, 'click', interpreter.createNativeFunction(mouseClick))
  interpreter.setProperty(mouse, 'dragTo', interpreter.createNativeFunction(mouseDragTo))
  interpreter.setProperty(mouse, 'getPosition', interpreter.createNativeFunction(mouseGetPosition))
  interpreter.setProperty(mouse, 'moveTo', interpreter.createNativeFunction(mouseMoveTo))
  interpreter.setProperty(mouse, 'scroll', interpreter.createNativeFunction(mouseScroll))
}

function initScreenFunctions (interpreter, globalObject) {
  // Create 'screen' global object.
  let screen = interpreter.nativeToPseudo({})
  interpreter.setProperty(globalObject, 'screen', screen)
  interpreter.setProperty(screen, 'getColor', interpreter.createNativeFunction(screenGetColor))
  interpreter.setProperty(screen, 'getSize', interpreter.createNativeFunction(screenGetSize))
}

const interpreter = new JSInterpreter('', function (interpreter, globalObject) {
  initKeyboardFunctions(interpreter, globalObject)
  initMouseFunctions(interpreter, globalObject)
  initScreenFunctions(interpreter, globalObject)
  addNativeFunction(interpreter, globalObject, 'print', print)
  addNativeFunction(interpreter, globalObject, 'readFile', readFile)
})

/**
 * 執行程式碼。
 * @param {string} code
 * @returns {*}
 */
function execute (code) {
  interpreter.appendCode(code)
  interpreter.run()
  return interpreter.value
}

/**
 * 取得變數內容。
 * @param {string} name
 * @returns {*}
 */
function getVariable (name) {
  const scope = interpreter.getGlobalScope()
  return scope.object.properties[name]
}

module.exports = {
  execute,
  getVariable,
}
