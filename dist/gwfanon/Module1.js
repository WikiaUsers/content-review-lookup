$(function(){
    $('<section class="railModule rail-module" id="PolecaneFilmy"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:PolecaneFilmy&action=render');
});