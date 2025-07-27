$(function () {
    if (!$('.persistent-image').length) {
        $('<div>', { class: 'persistent-image' }).appendTo('body');
    }
});