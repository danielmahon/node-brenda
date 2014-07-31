'use strict';

var program = require('commander'),
  brenda = require('./brenda'),
  colors = require('colors');

// usage

program
  .version((require('../package.json').version).green, '-v, --version')
  .usage('<command> [options]');

// sub-command help

program.on('--help', function(){
  // console.log('  For more help, run `brenda open -h` for relevant links.');
  // console.log('  You may also `brenda open help <command>` to open the relevant documentation in your favorite browser.');
  console.log();
  process.exit();
});

// brenda render
program
  .command('render <file|folder>')
  .description('start rendering process with file or folder')
  .action(brenda.render);

// brenda status
program
  .command('status')
  .description('check current work and run status')
  .action(brenda.status);

// brenda stop
program
  .command('stop')
  .description('force stop all running instances')
  .action(brenda.stop);

// brenda uptime
program
  .command('uptime')
  .description('check the uptime of rendering instances')
  .action(brenda.uptime);

// brenda log
program
  .command('log')
  .description('check the log tail of rendering instances')
  .action(brenda.log);

// brenda pricing
program
  .command('price [type]')
  .description('check current spot price, optional type')
  .action(brenda.price);

// catch-all
program.on('*', function(args) {
    console.log();
    console.log(('"' + args + '" is an invalid command!').red);
    program.help();
  });

// parse argv
program.parse(process.argv);

// display help if no command
if (program.args.length === 0) program.help();
