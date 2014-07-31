'use strict';

var spawn = require('child_process').spawn,
  prompt = require('prompt'),
  async = require('async'),
  os = require('os'),
  colors = require('colors');

function run(commands, callback) {
  if (typeof commands === 'string') commands = [commands];
  console.log();
  async.eachSeries(commands, function(command, done) {
    var cmd, args, program;
    cmd = command.split(' ')[0];
    args = command.split(' ').slice(1);

    program = spawn(cmd, args);
    program.stdout.on('data', function(data) {
      console.log(('' + data).green);
    });
    program.on('exit', done);
  }, function(err, results) {
    if (err) return console.error(err);
    if (callback) callback(results);
  });
}

/**
 * Gets the current status of brenda-work and brenda-run
 */
exports.status = function() {
  run(['brenda-work status', 'brenda-run status']);
};

/**
 * Get current AWS price points for spot instances
 * @param  {string} type Optional instance type
 */
exports.price = function(type) {
  if (type) {
    run('brenda-run -i ' + type + ' price');
  } else {
    run('brenda-run price');
  }
};

exports.stop = function() {
  prompt.start();
  prompt.message = 'WARNING!'.red;
  prompt.get({
    name: 'confirm',
    message: 'This will stop ALL current instances and reset queue! Are you sure?'.red,
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no!',
    default: 'no'
  }, function(err, result) {
    if (result.confirm.match(/no|n/)) {
      console.log('OK, I won\'t do anything.'.green);
    } else {
      run(['brenda-work reset', 'brenda-run -T stop']);
    }
  });
}

/**
 * Checks the uptime and cpu usage of rendering instances
 */
exports.uptime = function() {
  run('brenda-tool ssh uptime');
}

/**
 * Tail logs from current rendering instances
 */
exports.log = function() {
  run('brenda-tool ssh tail log');
}

/**
 * Start an automated render workflow (WIP)
 * @param  {string} file Path to file or folder to package for rendering
 */
exports.render = function(file, path) {
  if (path) {
    console.log('This feature is not implemented yet :('.magenta);
    run('tar cfzv ' + path + ' ' + os.tmpdir(), function() {
      console.log();
    });
  }
};
