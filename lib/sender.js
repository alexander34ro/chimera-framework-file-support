'use strict'

module.exports = {
  send
}

const requireOnce = require('./require-once.js')

function send (host, chain, params, callback) {
  const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 60000
  let request = requireOnce('request')
  let fs = requireOnce('fs')
  let file = ''
  let fileName = ''
  let potentialName = params[0].replace(/(\r\n|\n|\r)/gm, "")
  if (fs.existsSync(potentialName)) {
    file = fs.readFileSync(potentialName, 'base64')
    fileName = params[1].replace(/(\r\n|\n|\r)/gm, "")
  }
  request.post(
    {
      'url': host,
      'form': {
        'chain': chain,
        'input': params,
        'file': file,
        'fileName': fileName
      },
      'timeout': timeout
    },
    function (error, response, body) {
      if (error) {
        return callback(error, {})
      }
      try {
        const output = JSON.parse(body)
        if (!output.success) {
          return callback(new Error(output.errorMessage), null)
        }
        return callback(null, output.data)
      } catch (parseError) {
        return callback(parseError, null)
      }
    }
  )
}
