module.exports = function (grunt) {
    
    grunt.initConfig({
        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: [
                'static/js/main.js'
            ],
            dest: 'static/js/all.js',
          },
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'static/js/all.min.js': [
                        'static/js/all.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['static/js/*.js','!static/js/all.js', '!static/js/all.min.js'],
                tasks: ['concat', 'uglify']
            }
        },
        pkg: grunt.file.readJSON('package.json')
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // List of all task's.
    grunt.registerTask('default', ['watch'])
    grunt.registerTask('pack', ['concat', 'uglify']);
};
