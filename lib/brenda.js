var spawn = require('child_process').spawn,
  async = require('async'),
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

/**
 * Start an automated render workflow (WIP)
 * @param  {string} file Path to file or folder to package for rendering
 * @return {[type]}      [description]
 */
exports.render = function(file) {
  if (file) {
    console.log('This feature is not implemented yet :('.magenta);
    // console.log(file);
  }
};
