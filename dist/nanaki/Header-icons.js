$(function() {
    var icons = $('#mw-content-text .header-icon');
    if(icons.length > 0) {
        if($('.header-icons').length == 0) {
            if(skin == 'oasis') {
                $('#WikiaPageHeader').append('<div class="header-icons"></div>');
            } else if(skin == 'monobook') {
                $('#firstHeading').append('<div class="header-icons"></div>');
            }
        }
        icons.each(function(){
            if($(this).data('order') === undefined) {
                $(this).data('order', 10);
            } else {
                $(this).data('order', parseFloat($(this).data('order')));
            }
        }).sort(function(a, b) {
            return $(a).data('order') > $(b).data('order');
        }).appendTo('.header-icons');
    }
    $('#mw-content-text .header-icon-remove').remove();
});