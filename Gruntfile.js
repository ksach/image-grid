module.exports = function(grunt) {
    'use strict';


    // Load the plugins that provide the tasks we specified in package.json
    require('load-grunt-tasks')(grunt);


    ////////////////////////
    // Task Configuration //
    ////////////////////////

    grunt.initConfig({
        karma : {
            options: {
                // Configuration options that tell Karma how to run
                configFile: 'karma.conf.js',

                files: [
                    // These files are probably going to be included in
                    // all our tests that we'd write. The files object in
                    // each individual karma target are added to these.
                    'node_modules/chai/chai.js',
                    'node_modules/sinon-chai/lib/sinon-chai.js',
                    'node_modules/sinon/pkg/sinon.js',
                    'client/linked-list.js',
                    'client/linked-list.spec.js'
                ]
            },

            dev: {
                // On our local environment we want to test all the things!
                browsers: ['Chrome', 'Firefox', 'PhantomJS']
            },

            // For production, that is to say, our CI environment, we'll
            // run tests once in PhantomJS browser.
            prod: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    ///////////
    // Tasks //
    ///////////

    grunt.registerTask('default', ['karma']);
};