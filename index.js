var request = require('request-promise')
var fs = require('fs-extra')
var path = require('path')
var util = require('util')
var _ = require('lodash')
var chalk = require('chalk')
var Promise = require('bluebird')
var http = Promise.promisifyAll(require('http-request'))

var pkg = fs.readJsonSync(path.join(__dirname, 'package.json'))

module.exports = function(options){
  var defaults = {
    baseURL:      'https://api.discogs.com',
    requestURL:   '/releases/561793',
    outputDir:    process.cwd(),
    outputExt:    '.jpeg',
    verbose:      false,
    token:        null,
    userAgentURL: null
  }

  options = _.merge({}, defaults, options)

  var requestOptions = {
    json: true,
    gzip: true,
    headers: {
      'User-Agent' : pkg.name + '/' + pkg.version + ' +' + options.userAgentURL
    },
    qs: {
      token: options.token
    }
  }
  var url = options.baseURL + options.requestURL
  if(!requestOptions.qs.token){
    return Promise.reject(new Error('No API token provided'))
  }
  if(options.verbose){
    console.log(chalk.cyan('Requesting ' + url + '...'))
    console.log(chalk.yellow(util.inspect(requestOptions, false, 2, true)) + '\n')
  }
  return request.get(url, requestOptions).then(function(response){
    if(response.images){
      var dest = path.join(options.outputDir, response.id + options.outputExt)
      http.getAsync(response.images[0].resource_url, dest).then(function(){
        options.verbose && console.log(chalk.yellow("Saved image to: " + chalk.green(dest)))
      }).catch(function(error){
        console.log(chalk.red(error.stack))
      })
    }else{
      options.verbose && console.log(chalk.yellow('No images found for ' + chalk.green(what)))
    }
  }).catch(function(error){
    console.log(chalk.red(error.stack))
  })
}
