'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var config = require( '../config' ).copy;
var handleErrors = require( '../utils/handleErrors' );

gulp.task( 'copy:files', function() {
  return gulp.src( config.files.src )
    .pipe( $.changed( config.files.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( config.files.dest ) );
} );

gulp.task( 'copy:icons', function() {
  return gulp.src( config.icons.src )
    .pipe( $.changed( config.icons.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( config.icons.dest ) );
} );

gulp.task( 'copy:libjs', function() {
  return gulp.src( config.libjs.src )
    .pipe( $.changed( config.libjs.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( config.libjs.dest ) );
} );

gulp.task( 'copy:vendorjs', function() {
  return gulp.src( config.vendorjs.src )
    .pipe( $.changed( config.vendorjs.dest ) )
    .on( 'error', handleErrors )
    .pipe( gulp.dest( config.vendorjs.dest ) );
} );

gulp.task( 'copy',
  [
    'copy:files',
    'copy:icons',
    'copy:libjs',
    'copy:vendorjs'
  ]
);
