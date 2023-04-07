module.exports = function(grunt) {
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            "dist/js/script.min.js": ["app.js"],
          },
        },
      },
      htmlmin: {
        my_target: {
          options: {
            removeComments: true,
            collapseWhitespace: true,
          },
          files: {
            "dist/index.min.html": "public/index.html",
          },
        },
      },
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    
    grunt.registerTask('default', ['uglify', 'htmlmin']);
    
  };
  