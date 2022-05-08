/* Any JavaScript here will be loaded for all users on every page load.                      */
$(function() {
    var perkBlock_width = $('.perkBlock').width();
    $('.perkBlock').click(function() {
        if( $(this).hasClass('show') ) {
            $(this).removeClass('show');
            $(this).animate({width:perkBlock_width});
            $(this).children('.inner').delay(0).slideToggle();
            $(this).children('.cursor').text("▶");
        } else {
            $(this).addClass('show');
            $(this).animate({width:"100%"});
            $(this).children('.inner').delay(300).slideToggle();
            $(this).children('.cursor').text("◀");
        }
    });
});