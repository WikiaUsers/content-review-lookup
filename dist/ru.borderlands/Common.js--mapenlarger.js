/* Any JavaScript here will be loaded for all users on every page load. */
$('.me-button-wide').click(function(e) {
    // map enlarger 9000; codename: me
    $('.WikiaMainContent').toggleClass('wide');
    $(this).toggleClass('wds-is-secondary');
});