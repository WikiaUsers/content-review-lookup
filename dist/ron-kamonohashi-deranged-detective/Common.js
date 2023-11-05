/* Any JavaScript here will be loaded for all users on every page load. */
/* Toggle spoiler button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (!button.length) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

/* Spoiler alert */
window.SpoilerAlertJS = {
    question: 'This page contains heavy spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};