module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({

    karma: {
      options: {
        files: [
          { pattern: 'public/**/*.js', included: false },
          { pattern: 'tests/**/*.spec.js', included: false },
          'tests/test-main.js'
        ],
        exclude: [
          'public/main.js'
        ],
        basePath: '',
        frameworks: [ 'mocha', 'requirejs', 'chai' ],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: [ 'Chrome' ],
        captureTimeout: 10000,
        logLevel: 'DEBUG'
      },

      unit: {
        singleRun: true,

        reporters: [ 'progress', 'coverage' ],

        preprocessors: {
          'public/views/base.js': [ 'coverage' ]
        },

        coverageReporter: {
          type: 'html',
          dir: 'artifacts/coverage/'
        }
      }
    }
  });

  grunt.registerTask('default', [ 'karma:unit' ])
};