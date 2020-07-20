$(function(){
    $('<section class="railModule rail-module" id="RailHeader"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:Module&action=render');
});