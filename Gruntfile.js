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
          'dist/css/neon.css': 'src/sass/neon.scss',
          'dist/css/green.css': 'src/sass/green.scss'
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
      html: {
        src: [
            'src/demo/green.html',
          ],
        dest: 'www/',
        flatten: true,
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
                'dist/css/neon.min.css': ['dist/css/normalize.css', 'dist/css/neon.css'],
                'dist/css/green.min.css': ['dist/css/neon.min.css', 'dist/css/green.css']
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
      code: {
        files: {
          'www/index.html': 'src/demo/index.html'
        },
        options: {
          replacements: [{
            pattern: /<!-- code -->[\r\n]*((.|[\r\n])*?)[\r\n]*<!-- endcode -->/ig,
            replacement: '$1<pre><code class="html hljs">$1</code></pre>'
          }]
        }
      }
    },

    highlight: {
      code: {
        options: {
          lang: 'html'
        },
        files: {
          'www/index.html': ['www/index.html'],
        }
      }
    },

    // Watcher
    watch: {
      styles: {
        files: ['src/sass/**/*.scss', 'src/demo/*.html'],
        tasks: ['sass:dist', 'cssmin:combine', 'string-replace:code', 'highlight:code', 'copy:html'],
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
  grunt.loadNpmTasks('grunt-highlight');  

  grunt.registerTask('vendor', ['string-replace:dist', 'sass:dist']);
  grunt.registerTask('minify', ['cssmin:combine']);
  grunt.registerTask('fonts', ['copy:iconmoon']);
  grunt.registerTask('javascripts', ['copy:js']);
  grunt.registerTask('stylesheets', ['copy:css']);
  grunt.registerTask('uglifier', ['uglify:js']);
  grunt.registerTask('code', ['string-replace:code', 'highlight:code', 'copy:html']);  

  grunt.registerTask('dist', ['vendor', 'fonts', 'javascripts', 'stylesheets', 'minify', 'uglifier', 'code']);
  grunt.registerTask('default', ['watch']);

};