module.exports = function (grunt) {
  // Development folders
  var config = {
    app: 'src',
    dist: 'dist',
    pre: 'pre',
  };

  // Tasks
  grunt.initConfig({
    // Project settings
    config: config,

    concat: {
      options: {
        process: function (src, filepath) {
          return '// ' + filepath + '\n' + src;
        },
      },
      pre: {
        src: [
          '<%= config.app %>/assets/js/*.js',
        ],
        dest: '<%= config.pre %>/assets/js/application.js',
      },
    },
    sass: {
      options: {
        style: 'expanded',
        precision: 5,
      },
      all: {
        files: {
          '<%= config.pre %>/assets/css/application.css':
              '<%= config.pre %>/assets/css/application.scss',
        },
      },
    },

    // Runs tasks whenever watched file patterns are added, changed or deleted in src
    watch: {
      js: {
        files: '<%= config.app %>/assets/js/**/*.js',
        tasks: ['copy:scripts', 'concat:pre'],
      },
      gruntfile: {
        files: ['Gruntfile.js'],
      },
      sass: {
        files: '<%= config.app %>/assets/css/**/*.{scss,sass}',
        tasks: ['copy:stylesPre', 'sass'],
      },
      html: {
        files: '<%= config.app %>/*.html',
        tasks: ['copy:html'],
      },
      media: {
        files: '<%= config.app %>/assets/img/**/*.*',
        tasks: ['copy:media'],
      },
      handlebars: {
        files: ['<%= config.app %>/**/*.hbs'],
        tasks: ['handlebarslayouts'],
        options: {
          livereload: true,
          interrupt: false,
          spawn: false,
        },
      },
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        options: {
          force: true,
        },
        files: [
          {
            dot: true,
            src: ['<%= config.dist %>/*'],
          },
        ],
      },
      pre: {
        options: {
          force: true,
        },
        files: [
          {
            dot: true,
            src: ['<%= config.pre %>/*'],
          },
        ],
      },
    },

    // Copies remaining files
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.pre %>',
            dest: '<%= config.dist %>',
            src: [
              '**/*.html',
              'assets/img/**/*.*',
              'assets/video/**/*.*',
              'assets/css/application.css',
              'assets/js/application.js',
              'assets/fonts/**/*.*',
              'assets/gdpr-cookie-policy.js',
            ],
          },
        ],
      },
      pre: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.pre %>',
            src: ['**/*.*'],
          },
        ],
      },
      stylesPre: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>/assets/css',
            dest: '<%= config.pre %>/assets/css/',
            src: ['**/*.scss', '**/*.css'],
          },
        ],
      },
      scripts: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/assets/js',
        dest: '<%= config.pre %>/assets/js/',
        src: ['**/*.js'],
      },
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.pre %>/',
            src: ['**/*.html'],
          },
        ],
      },
      media: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>/assets/img',
            dest: '<%= config.pre %>/assets/img/',
            src: ['**/*.*'],
          },
        ],
      },
    },
    handlebarslayouts: {
      home: {
        files: {
          'pre/*.html': 'src/*.hbs',
        },
        options: {
          partials: 'src/views/**/*.hbs',
          basePath: 'src/views/',
          context: ['src/data/*.json'],
        },
      },
    },
    cssmin: {
      target: {
        files: {
          'dist/assets/css/application.css': 'dist/assets/css/application.css',
        },
      },
    },
    terser: {
      options: {
        compress: true,
      },
      applib: {
        src: ['pre/assets/js/application.js'],
        dest: 'dist/assets/js/application.js',
      },
    },
    // Auto Browser Launch
    browserSync: {
      options: {
        notify: false,
        background: true,
        reloadDelay: 2000,
        watchOptions: {
          ignored: '',
        },
      },
      livereload: {
        options: {
          files: [
            '<%= config.pre %>/**/*.html',
            '<%= config.pre %>/assets/css/**/*.css',
            '<%= config.pre %>/assets/img/**/*',
            '<%= config.pre %>/assets/js/**/*.js',
          ],
          port: 9000,
          server: {
            baseDir: ['<%= config.pre %>', config.app],
          },
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-handlebars-layouts');

  grunt.registerTask(
      'serve',
      'start the server and preview your app',
      function () {
        grunt.task.run([
          'clean:pre',
          'copy:pre',
          'concat:pre',
          'sass',
          'handlebarslayouts',
          'browserSync:livereload',
          'watch',
        ]);
      }
  );

  grunt.registerTask('build', ['clean:dist', 'copy:dist', 'cssmin', 'terser']);

  grunt.registerTask('default', ['build']);
};
