require.config({
    baseUrl: '',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'lib/vendor/jquery-1.11.0/jquery',
        bootstrap: 'lib/vendor/bootstrap-3.0.3/bootstrap',
        backbone: 'lib/vendor/backbone-1.1.0/backbone',
        underscore: 'lib/vendor/underscore-1.5.2/underscore',
        supermodel: 'lib/vendor/supermodel-0.4.4/supermodel'

    },
    shim: {
        jquery: {
            exports: 'jQuery'

        },
        bootstrap: {
            deps: ['jquery']
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },
        supermodel: {
            exports: 'Supermodel',
            deps:['backbone']
        }
    }
});
require([ 'jquery', 'app'], function ($, App) {
    // The "app" dependency is passed in as "App"
    $(App.initialize)
});