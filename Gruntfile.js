module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

     // Sass.
    sass: {
      dist: {
        options: {
          loadPath: 'src/sass',
          style: 'expanded'
        },
        files: {
          'dist/css/neon.css': 'src/sass/neon.scss'
        }
      }
    },

    // Assets
    copy: {
      iconmoon: {
        cwd: 'src/fonts',
        src: '**/*',
        dest: 'dist/fonts/',
        expand: true
      },
      css: {
        src: [
            'bower_components/normalize.css/normalize.css',
          ],
        dest: 'dist/css/',
        flatten: true,
        expand: true
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/jquery/dist/jquery.min.map',
          'bower_components/foundation/js/foundation.min.js',
          'bower_components/foundation/js/vendor/modernizr.js',
          'bower_components/underscore/underscore.js',
          'bower_components/highlightjs/highlight.pack.js',
          'src/js/neon.js'
          ],
        dest: 'dist/js/',
        flatten: true,
        expand: true
      }
    },

    cssmin: {
        combine: {
            files: {
                'dist/css/neon.min.css': ['dist/css/normalize.css', 'dist/css/neon.css']
            }
        }
    },    

    uglify: {
        js: {
            files: {
                'dist/js/neon.min.js': ['src/js/neon.js']
            }
        }
    },    

    'string-replace': {
      dist: {
        files: {
          'bower_components/foundation/scss/foundation/_functions.scss': 'bower_components/foundation/scss/foundation/_functions.scss'
        },
        options: {
          replacements: [{
            pattern: '@if (index($modules, $name) == false) {',
            replacement: '@if (not index($modules, $name)) {'
          }, {
            pattern: '$modules: append($modules, $name);',
            replacement: '$modules: append($modules, $name) !global;'
          }]
        }
      }
    },

    // Watcher
    watch: {
      styles: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass:dist', 'cssmin:combine'],
        options: {
          nospawn: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('vendor', ['string-replace', 'sass:dist']);
  grunt.registerTask('minify', ['cssmin:combine']);
  grunt.registerTask('fonts', ['copy:iconmoon']);
  grunt.registerTask('javascripts', ['copy:js']);
  grunt.registerTask('stylesheets', ['copy:css']);
  grunt.registerTask('uglifier', ['uglify:js']);
  grunt.registerTask('dist', ['vendor', 'fonts', 'javascripts', 'stylesheets', 'minify', 'uglifier']);
  grunt.registerTask('default', ['watch']);

};