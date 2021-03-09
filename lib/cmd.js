'use strict'
require('cache-require-paths')

module.exports = {
  run,
  get
}

const exec = require('child_process').exec
const COLOR_FG_OUT = '\x1b[33m'
const COLOR_FG_ERR = '\x1b[31m'
const COLOR_RESET = '\x1b[0m'

function redirectOutputStreamFrom (stream, foreground, callback = null) {
  stream.on('data', (chunk) => {
    process.stderr.write(foreground + chunk + COLOR_RESET)
    // TO DO: figure out a way of calling the
    // callback on every chunk
    // if (typeof callback === 'function') {
    //   callback(null, chunk, null)
    // }
  })
}

function redirectInputStreamTo (stream) {
  function dataListener (chunk) {
    stream.write(chunk)
  }

  function endListener () {
    process.stdin.end()
    process.stdin.removeListener('data', dataListener)
  }

  process.stdin.on('data', dataListener)
  stream.on('end', endListener)
}

function redirectSubProcessStream (subProcess, callback = null) {
  redirectOutputStreamFrom(subProcess.stdout, COLOR_FG_OUT, callback)
  redirectOutputStreamFrom(subProcess.stderr, COLOR_FG_ERR)
  redirectInputStreamTo(subProcess.stdin)
}

/**
 * Run command
 * Example:
 *  runCommand('ls -al')
 *  runCommand('ls -al', {'cwd': '/home/myUser'})
 *
 * For more information about options, please visit (https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
 *
 * @param (string) command
 * @param (object) options
 *
 */
function run (command, options) {
  let execOptions
  if (typeof options === 'undefined') {
    execOptions = null
  } else {
    execOptions = options
  }
  return get(command, execOptions, (error) => {
    if (error) {
      process.stderr.write(COLOR_FG_ERR)
      console.error(error)
      process.stderr.write(COLOR_RESET)
    }
  })
}

/**
 * Run command
 * Example:
 *  get('ls -al', {'cwd':'/home/myUser'}, function(error, data, stderr){
 *      console.log('data');
 *  })
 *
 * For more information about options, please visit (https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
 *
 * @param (string) command
 * @param (object) options
 * @param (function) callback
 *
 */
function get (command, options, callback) {
  let execOptions, execCallback
  if (typeof options === 'function') {
    execCallback = options
    execOptions = null
  } else {
    execOptions = options
    execCallback = callback
  }
  const subProcess = exec(command, execOptions, (error, stdout, stderr) => {
    if (typeof execCallback === 'function') {
      // TO DO: remove this after adding the callback to every chunk
      execCallback(error, stdout, stderr)
    }
  })
  redirectSubProcessStream(subProcess, execCallback)
  return subProcess
}
