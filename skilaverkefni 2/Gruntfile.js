module.exports = function(grunt) {
  // Project configuration.
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      foo: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",
        ],
      },
    },
    concat: {
      dist:{
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",
          ], 
          dest: 'build/chatapp.js',
      }
    },
    uglify:{

      build: {
        src: "build/chatapp.js",
        dest: "build/chatapp.min.js",
      }


    }

    /*
       The task to concatenate and minify the code has been removed
       You have to figure that one out yourself :)

       And since the index is referencing the file from that task
       it wont receive your updates until you figure this task out
       or reference the original src/ files
    */
  });
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint','concat','uglify' /* more tasks here */]);
};