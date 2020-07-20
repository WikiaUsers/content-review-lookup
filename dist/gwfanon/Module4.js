$(function(){
    $('<section class="railModule rail-module" id="odliczanie"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:Odliczanie&action=render');
});