/*
* Adds custom module to the Wikia Rail
*/
$(function(){
    $('<section class="module railModule"></section>')
    .prependTo('#WikiaRail')
    .load('/index.php?title=Template:RailModule&action=render');
});