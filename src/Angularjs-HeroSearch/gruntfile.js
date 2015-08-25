/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    //load grunt plugin from NPM
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-cache-breaker");
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'wwwroot/app.js': ["Scripts/app.js", "Scripts/**/*.js"],
                    'wwwroot/marvelResource.js' : ["Resources/Marvel.js", "Resources/Marvel/*.js"]
                }
            }
        },
        cachebreaker: {
            options: {
                match: [{
                    'app.js': 'wwwroot/app.js',
                    'marvelResource.js': 'wwwroot/marvelResource.js',
                    'site.min.css' : 'wwwroot/site.min.css'
                }],
                replacement: 'md5'
            },
            files: {
                src: ['wwwroot/index.html']
            }
        },
        ngdocs: {
            options: {
                dest: 'wwwroot/docs',
                html5Mode: true
            },
            resource: {
                src: ['Resources/**/*.js'],
                title: 'Marvel Resource'
            },
            main: {
                src: ['Scripts/**/*.js'],
                title: 'Marvel App'
            }
        },
        clean: ['wwwroot/docs'],
        jshint:{
          files: ["Scripts/**/*.js", "Resources/**/*.js"]
        },
        less: {
            options: {
                paths: ['Content/'] //test
            },
            src: {
                expand: true,
                cwd: 'Content',
                dest: 'Content',
                src: '*.less',
                ext: '.css'
            }
        },
        cssmin: {
            target: {
                files: {
                    'wwwroot/site.min.css' : ["Content/**/*.css"]
                }
            }
        },
        watch: {
            scripts: {
                files: ["Scripts/**/*.js", "Resources/**/*.js"],
                tasks: ["uglify", "jshint", "cachebreaker", "clean", "ngdocs:resource", "ngdocs:main"]
            },
            less: {
                files: ["Content/*.less"],
                tasks: ["less"]
            },
            cssmin: {
                files: ["Content/*.css"],
                tasks: ["cssmin", "cachebreaker"]
            }
        }
    });

    //define tasks
    grunt.registerTask("default", ["uglify", "watch", "jshint", "less", "cssmin", "cachebreaker"]);
};