/**
 * Created by johnnycage on 15/10/21.
 */
module.exports = function (grunt) {
    'use strict';

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

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'publish/css',
                    ext: '.min.css'
                }]
            }
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

        uglify: {
            mytarget: {
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
                    src: ['components/**/*.css'],
                    dest: 'publish/css',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: ['components/**/*.min.js', 'components/**/*.min.map'],
                    dest: 'publish/js',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: ['components/*/fonts/*.*'],
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
                tasks: ['jshint', 'clean', 'cssmin', 'uglify', 'copy', 'htmlmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'clean', 'cssmin', 'uglify', 'copy', 'htmlmin', 'watch']);
};
