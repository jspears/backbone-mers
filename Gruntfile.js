module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({

    clean: [ 'artifacts/' ],

    exec: {
      mergeCoverage: {
        command: 'node_modules/.bin/lcov-result-merger "artifacts/coverage/**/lcov.info" "artifacts/coverage/lcov.info"'
      }
    },

    karma: {
      options: {
        files: [
          { pattern: 'public/vendor/**/*.js', included: false },
          { pattern: 'public/app/**/*.js', included: false },
          { pattern: 'tests/**/*.spec.js', included: false },
          'tests/test-main.js'
        ],
        exclude: [ 'public/main.js' ],
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
          'public/app/**/*.js': [ 'coverage' ]
        },

        coverageReporter: {
          type: 'lcovonly',
          dir: 'artifacts/coverage/'
        }
      }
    }
  });

  grunt.registerTask('default', [ 'clean', 'karma:unit', 'exec:mergeCoverage' ])
};