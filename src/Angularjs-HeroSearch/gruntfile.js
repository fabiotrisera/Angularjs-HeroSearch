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

    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'wwwroot/app.js': ["Scripts/app.js", "Scripts/**/*.js"],
                    'wwwroot/marvelResource.js' : ["Resources/Marvel.js", "Resources/Marvel/*.js"]
                }
            }
        },
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
                tasks: ["uglify", "jshint"]
            },
            less: {
                files: ["Content/*.less"],
                tasks: ["less"]
            },
            cssmin: {
                files: ["Content/*.css"],
                tasks: ["cssmin"]
            }
        }
    });

    //define tasks
    grunt.registerTask("default", ["uglify", "watch", "jshint", "less", "cssmin"]);
};