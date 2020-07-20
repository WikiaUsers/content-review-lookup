$(document).ready(function() {
    
    $('.NavInner').mouseenter(function() {
        $(this).fadeTo('fast', 0.5);
    })
    $('.NavInner').mouseleave(function() {
        $(this).fadeTo('fast',1);
    })
    $('.NavInner').click(function() {
        $(this).fadeTo('slow', 0.1);
    });
    $('.NavInner').click(function() {
        $(this).fadeTo('slow', 1);
    });
});