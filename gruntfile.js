module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'mochaTest', 'jsbeautifier']);
    grunt.registerTask('build:browser', ['jshint', 'mochaTest', 'browserify', 'uglify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['./lib/*.js', 'index.js', 'gruntFile.js', './test/**/*.js'],
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                node: true,
                expr: true,
                globals: {
                    'xit': true,
                    'xdescribe': true,
                    'it': true,
                    'describe': true,
                    'before': true,
                    'after': true,
                    'done': true
                }
            }
        },
        jsbeautifier: {
            files: ['./lib/*.js', 'index.js', 'gruntFile.js', 'package.json', './test/**/*.js', './test/**/*.json'],
            options: {
                js: {
                    "indent_size": 4,
                    "indent_char": " ",
                    "indent_level": 0,
                    "indent_with_tabs": false,
                    "preserve_newlines": true,
                    "max_preserve_newlines": 2,
                    "jslint_happy": true,
                    "brace_style": "collapse",
                    "keep_array_indentation": false,
                    "keep_function_indentation": false,
                    "space_before_conditional": true,
                    "break_chained_methods": false,
                    "eval_code": false,
                    "unescape_strings": false,
                    "wrap_line_length": 0
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/emcellent-parse.min.js': ['index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'mParse'
                    }
                },
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */' + '\n'
            },
            my_target: {
                files: {
                    'dist/emcellent-parse.min.js': ['dist/emcellent-parse.min.js']
                }
            }
        },
        watch: {
            all: {
                files: ['./lib/*.js', 'index.js', 'gruntFile.js', './test/**/*.js'],
                tasks: ['default']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: '10000'
                },
                src: ['test/unit/*.js', 'test/e2e/*.js']
            }
        }
    });
};