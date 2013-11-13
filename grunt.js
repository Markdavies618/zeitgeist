module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    stylus: {
      compile: {
        options: {
          compress: true,
        },
        files:
          {
            'public/css/main.css': 'public/stylus/main.styl'
          , 'public/css/admin.css': 'public/stylus/admin.styl'
         }
      }
    },
    watch: {
      files:
        [ 'public/stylus/*.styl', 'public/stylus/*/*.styl'],
      tasks:'stylus'
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
  grunt.loadNpmTasks('grunt-contrib-stylus');
  // grunt.loadNpmTasks('grunt-reload');

  // Default task.
  // grunt.registerTask('default', 'stylus lint watch');
  grunt.registerTask('default', 'stylus watch');
};

//stylus lint watch