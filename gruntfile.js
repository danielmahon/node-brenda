'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({});

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['verb']);
};
