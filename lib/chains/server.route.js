'use strict'
require('cache-require-paths')

const path = require('path')
const util = require('../util.js')
const core = require('../core.js')
const fs = require('fs')

function isInsidePublishedDirectory (file) {
  // get published directory
  let publishedDirectory = process.env.PUBLISHED
  if (!publishedDirectory) {
    return true
  }
  publishedDirectory = path.resolve(publishedDirectory)
  file = path.resolve(file)
  // is file in publised directory
  return file.search(publishedDirectory) === 0
}

function processChain (state, callback) {
  let request = state.request
  let input = util.isArray(request.body.input) ? request.body.input : []
  let chain = util.isString(request.body.chain) ? request.body.chain : 'index.chiml'

  let file = request.body.file
  let fileName = request.body.fileName

  let result = {'success': true, 'errorMessage': '', 'data': ''}

  if (isInsidePublishedDirectory(chain)) {
    if (file != '') {
      fs.writeFileSync(fileName, file, 'base64')
    }

    core.executeChain(chain, input, {}, (error, output) => {
      if (!error) {
        // success
        result.data = output
        return callback(null, {'data': result})
      } else {
        // chain call failed
        result.success = false
        result.errorMessage = error.message
        return callback(null, {'data': result})
      }
    })
  } else {
    // not authorized
    result.success = false
    result.errorMessage = 'Cannot access ' + chain
    return callback(null, {'data': result})
  }
}

module.exports = (ins, vars, callback) => {
  let webState = ins[0]
  processChain(webState, callback)
}
