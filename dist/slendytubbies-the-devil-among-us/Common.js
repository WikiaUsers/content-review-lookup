/* Any JavaScript here will be loaded for all users on every page load. */
$(function () {
    if (!$('.persistent-image').length) {
        $('<div>', { class: 'persistent-image' }).appendTo('body');
    }
});