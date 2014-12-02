// Measly Grunt setup for the time being.

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'path/to/sourcemap.map'
                },
                files: {
                    'build/output.min.js': ['*.js', 'public/*.js']
                }
            }
        },
        jshint: {
            files: ['*.js', 'public/*.js'],
            options: {
                ignores: ['node_modules']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('build', ['jshint', 'uglify']);
};
