module.exports = function(grunt) {
    grunt.initConfig({
        rig: {
            compile: {
                files: {
                    'dist/index.html' : ['src/index.html']
                }
            }
        },
        
        copy: {
            main: {
                files: [{
                cwd: "bower_components/normalize-css",
                src: "normalize.css",
                dest: "dist/css",
                expand: true
                }, {
                    cwd: "src",
                    src: "img/*",
                    dest: "dist",
                    expand: true
                }]
            }
        },
        
        less: {
            development: {
                files: {
                    "dist/css/styles.css" : "src/less/styles.less"
                }
            }
        },
        
        watch: {
            scripts: {
              files: ['src/**/*'],
              tasks: ['default'],
              options: {
                spawn: true,
              },
            },
        },
    });
    
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['rig', 'copy', 'less']);
};