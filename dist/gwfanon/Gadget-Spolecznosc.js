$(function(){
    $('<div class="community-page-module contributors-module" id="mowniety"></div>')
    .appendTo('.community-page-rail')
    .load('/index.php?title=Template:TopUsers&action=render');
});