/**
 * Created by johnnycage on 15/10/21.
 */
module.exports = function (grunt) {
    'use strict';

    var lib = require('bower-files')();

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/* LogWeb v<%= pkg.version %> */\n',

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: [
                'gruntfile.js',
                'js/*.js'
            ]
        },

        clean: {
            src: ['publish']
        },

        //concat: {
        //    options: {
        //        banner: '<%= banner %>\n'
        //    },
        //    js: {
        //        src: [
        //            '',
        //        ],
        //        dest: ''
        //    }
        //},

        'http-server': {
            'dev': {
                root: 'publish',
                port: 8000,
                host: '0.0.0.0',
                showDir: true,
                autoIndex: true,
                ext: 'html',
                // run in parallel with other tasks
                runInBackground: true,
                // specify a logger function. By default the requests are
                // sent to stdout.
                logFn: function (req, res, error) {
                }
            }
        },

        uglify: {
            debug: {
                options: {
                    sourceMap: true,
                    sourceMapRoot: 'publish/js',
                    sourceMapIncludeSources: true
                },
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'publish/js',
                    ext: '.min.js'
                }, {
                    'publish/js/lib.min.js': lib.ext('js').files
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'publish/js',
                    ext: '.min.js'
                }, {
                    'publish/js/lib.min.js': lib.ext('js').files
                }]
            }
        },

        less: {
            publish: {
                options: {
                    banner: '<%= banner %>\n',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'publish/css',
                    ext: '.min.css'
                }, {
                    'publish/css/lib.min.css': lib.ext(['css', 'less']).files
                }]
            }
        },

        copy: {
            publish: {
                files: [{
                    expand: true,
                    src: ['img/*'],
                    dest: 'publish/img',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: ['components/*/fonts/*.*', '!components/bootstrap/**/fonts/*.*'],
                    dest: 'publish/fonts',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    src: ['apple-touch-icon.png'],
                    dest: 'publish/apple-touch-icon.png'
                }, {
                    src: ['favicon.ico'],
                    dest: 'publish/favicon.ico'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'publish/',
                    ext: '.html'
                }]
            }
        },

        watch: {
            styles: {
                files: ['css/**', 'js/**', 'img/**', 'css/**', '*.html', 'Gruntfile.js'],
                tasks: ['jshint', 'clean', 'less', 'uglify:debug', 'copy', 'htmlmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', ['jshint', 'clean', 'less', 'uglify:debug', 'copy', 'htmlmin', 'http-server', 'watch']);
    grunt.registerTask('release', ['jshint', 'clean', 'less', 'uglify:release', 'copy', 'htmlmin']);
};
