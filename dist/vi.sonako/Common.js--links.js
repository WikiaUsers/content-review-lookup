$(function() {
   $('a.external:not([href$="wpForReUpload=1"]), a.extiw, .WikiaArticleInterlang a, #p-lang a')
   .attr('target', '_blank');
});