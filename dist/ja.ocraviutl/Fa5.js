$(function(){
  // $(document).ready(function() 
    'use strict';
/* set objects */
window.dev = window.dev || {};
window.dev.FontAwesome = window.dev.FontAwesome || {};
var FA = window.dev.FontAwesome;
var version = 'v5.15.1';
 
var array = ['all', 'v4-shims'];
var add = '';
 
$.each(array, function(index, value){
  add = add + '<script defer src="https://use.fontawesome.com/releases/' + version + '/js/' + value + '.js" data-auto-replace-svg="nest"></script>';
});
$('body').prepend(add);});