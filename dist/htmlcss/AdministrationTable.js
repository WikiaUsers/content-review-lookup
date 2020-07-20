// Accordion base
// Added to make the accordion work
mw.loader.using(['jquery.ui.accordion'], function(){
    $('.accordion-wrapper').accordion({
        collapsible: true
    });
});

$(document).ready(function(){
    var user = $('.accordion.user-right-box').children('section').attr('data-user');
});