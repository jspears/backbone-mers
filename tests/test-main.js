var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file) && /spec\.js$/.test(file)) {
    tests.push(file);
  }
};

requirejs.config({
  baseUrl: '/base/public',
  paths: {
    jquery:     'lib/vendor/jquery-1.11.0/jquery',
    bootstrap:  'lib/vendor/bootstrap-3.0.3/bootstrap',
    backbone:   'lib/vendor/backbone-1.1.0/backbone',
    underscore: 'lib/vendor/underscore-1.5.2/underscore',
    supermodel: 'lib/vendor/supermodel-0.4.4/supermodel'
  },
  shim: {
    jquery: {
        exports: 'jQuery'
    },
    bootstrap: {
        deps: [ 'jquery' ]
    },
    backbone: {
        deps: [ 'jquery', 'underscore' ],
        exports: 'Backbone'
    },

    underscore: {
        exports: '_'
    },
    supermodel: {
        exports: 'Supermodel',
        deps: [ 'backbone' ]
    }
  },
  deps: tests,
  callback: window.__karma__.start
});