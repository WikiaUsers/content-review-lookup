/* Any JavaScript here will be loaded for all users on every page load.                      */
$(function() {
    $('.perkBlock').click(function() {
        if( $(this).hasClass('show') ) {
            $(this).removeClass('show');
            $(this).css("width", '');
        } else {
            $(this).addClass('show');
            $(this).animate({width:"100%"});
        }
    });
});