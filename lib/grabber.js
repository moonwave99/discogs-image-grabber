#! /usr/bin/env node

var path = require('path')
var chalk = require('chalk')
var argv = require('yargs').argv
require('dotenv').load({ silent: true, path: path.join(process.cwd(), '.env') })

var verbose = !!argv.verbose

verbose && console.log(chalk.yellow('Requesting images for: ' + chalk.green(argv.requestURL)))
require('../index')({
  userAgentURL: process.env.DISCOGS_USER_AGENT_URL || argv.userAgentURL,
  token: process.env.DISCOGS_TOKEN || argv.token,
  requestURL: argv.requestURL,
  outputDir: argv.outputDir
}).then(function(file){
  verbose && console.log(chalk.yellow('Saved image to: ' + chalk.green(file)))
}).catch(function(error){
  console.log(chalk.red(error.stack))
})
