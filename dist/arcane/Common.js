/* Any JavaScript here will be loaded for all users on every page load. */
/* below logo link bar */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Before editing, click here to read our Manual of Style.')
        )
        .attr('href', 'https://arcane.fandom.com/wiki/Arcane_Wiki:Manual_of_Style')
);

//Add border color to infoboxes (from the Steven Universe Wiki)
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});