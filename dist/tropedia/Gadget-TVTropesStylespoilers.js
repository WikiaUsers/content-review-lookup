/* Spoiler script, by Idris for Kings Wiki http://en.kingswiki.com/wiki/MediaWiki:Common.js */
$(function(){
    $(".spoiler").click(function(){
        $(this).toggleClass("spoilerhidden");
    });
    $('.spoiler a').click( function (e) {
        if( $(this).parents('.spoilerhidden').length ) {
            e.preventDefault();
        }
    });
});