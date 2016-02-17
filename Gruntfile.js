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
            files: {
                cwd: "bower_components/normalize-css",
                src: "normalize.css",
                dest: "dist/css",
                expand: true
            }
        },
        
        less: {
            development: {
                files: {
                    "dist/css/styles.css" : "src/less/styles.less"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    grunt.registerTask('default', ['rig', 'copy', 'less']);
};