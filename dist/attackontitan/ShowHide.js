/* Custom show/hide function */
/* For usage in the template HideButton */

$('.showhide').click(function() {
    if ($(this).html() === '<a href="/wiki/">show</a>') {
        $(this).html('<a href="/wiki/">hide</a>');
    } else {
        $(this).html('<a href="/wiki/">show</a>');
    }
});