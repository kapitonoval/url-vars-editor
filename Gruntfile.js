/*global module:true*/

"use strict";

var pkg;
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
                         // Metadata.
                         pkg        : pkg = grunt.file.readJSON("package.json"),
                         banner     : "/*! <%= pkg.name %> - v<%= pkg.version %> */\n",
                         // Task configuration.
                         uglify     : {
                             options: {
                                 banner: "<%= banner %>",

                                 compress: {
                                     dead_code: true
                                 }
                             },
                             plugins: {
                                 files: [
                                     {
                                         expand: true,
                                         cwd   : '',
                                         src   : [ 'urlvars*.js', '!*.min.js' ],
                                         dest  : '',
                                         ext   : '.min.js',
                                         extDot: 'last'
                                     }
                                 ]
                             }
                         },
                         jshint     : {
                             all: {
                                 options: {
                                     jshintrc: true
                                 },
                                 src    : [ "urlvars.js",  "!*.min.js", "!plugins/**/*.min.js" ] //, "Gruntfile.js", "tests/*.js"
                             }
                         },
                         qunit      : {
                             all: [ 'tests/*.html' ]
                         },
                         watch      : {
                             gruntfile: {
                                 files: [ "Gruntfile.js", "urlvars.js" ],
                                 tasks: [ "default" ]
                             }
                         },
                         bytesize   : {
                             all: {
                                 src: [ "urlvars.min.js" ]
                             }
                         },
                         uncss      : {
                             dist: {
                                 files: {
                                     'assets/css/tidy.css': [ 'index.html', 'maxdpr/*.html' ]
                                 }
                             }
                         },
                         maxFilesize: {
                             options : {
                                 // Task-specific options go here.
                             },
                             minified: {
                                 options: {
                                     maxBytes: (1024 * 7.8)
                                 },
                                 src    : [ "urlvars.min.js" ]
                             }
                         }
                     });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-bytesize');
    grunt.loadNpmTasks('grunt-max-filesize');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task.
    grunt.registerTask("default", [ "wrapcore", "test", "uglify", "bytesize", "maxFilesize" ]);
    grunt.registerTask("test", [ "jshint" ]);
};
