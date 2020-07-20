jQuery(document).ready(function() {
    jQuery('.divipopup-2').click(function(e) {
        e.preventDefault();
        jQuery.magnificPopup.open({
            items: {src: jQuery(this).attr('href')},
        type: 'inline'
        });
    });
});