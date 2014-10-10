'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            default: {
                tasks: ['watch', 'nodemon', 'karma:unit:start'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                immed: true,
                indent: 4,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                noempty: true,
                nonbsp: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                strict: true
            },
            client: {
                options: {
                    globals: {
                        angular: false
                    },
                    jquery: true,
                    browser: true
                },
                files: {
                    src: [
                        'client/modules/**/*.js'
                    ]
                }
            },
            server: {
                options: {
                    node: true,
                    camelcase: false
                },
                files: {
                    src: [
                        'gruntfile.js',
                        'server/**/*.js'
                    ]
                }
            },
            test: {
                options: {
                    globals: {
                        describe: false,
                        it: false,
                        beforeEach: false,
                        afterEach: false,
                        expect: false,
                        inject: false,
                        module: false,
                        spyOn: false,
                        angular: false,
                        jasmine: false
                    }
                },
                files: {
                    src: [
                        'test/**/*.js'
                    ]
                }
            }
        },
        nodemon: {
            default: {
                script: 'server/server.js',
                options: {
                    watch: ['server'],
                    cwd: __dirname
                }
            }
        },
        sass: {
            default: {
                options: {
                    style: 'compressed',
                    loadPath: 'client/css/sass'
                },
                files: {
                    'client/css/main.css': 'client/css/sass/main.scss'
                }
            }
        },
        jade: {
            default: {
                options: {
                    pretty: true
                },
                files: [{
                    cwd: 'client/modules',
                    src: '**/*.jade',
                    dest: 'client/modules',
                    expand: true,
                    ext: '.html'
                }]
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                background: false,
                singleRun: false
            }
        },
        watch: {
            jade: {
                files: ['server/views/**/*.jade'],
                options: {
                    livereload: true
                }
            },
            clientJade: {
                files: ['client/modules/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['index.js', 'server/**/*.js', 'client/modules/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['client/css/*.css'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['client/css/sass/**/*.scss'],
                tasks: ['sass']
            },
            karma: {
                files: ['client/**/*.js', 'test/unit/**/*.js'],
                tasks: ['karma:unit:run']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-karma');

    grunt.option('force', true);

    grunt.registerTask('default', ['jshint', 'concurrent', 'karma']);
    grunt.registerTask('partials', ['jade']);
    grunt.registerTask('lint', ['jshint']);
};