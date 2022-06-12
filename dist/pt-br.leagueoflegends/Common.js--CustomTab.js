mw.hook('wikipage.content').add(function(elem) {
    $(document).on("click", "span.show", function () {
        $(".content-wrapper > div").hide();
        $('#item-' + this.id).fadeIn();
    });
});

/* loading fix for SkinViewer images */
(function() {
    $('.lazyimg-wrapper img.lazyload').each(function() {
        $(this).removeClass('lazyload');
        $(this).attr('src', $(this).attr('data-src'));
    });
}());

/* SkinViewer */
$(document).on("click", "span.skinviewer-show", function () {
    var container = $(this).parents('.skinviewer-nav').parent().children('.skinviewer-tab-container');
    var old = container.find('.skinviewer-active-tab');
    var newEl = container.find('.skinviewer-tab-content[data-id="item-' + $(this).data('id') + '"]');
    if (!newEl.is(old)) {
        old.removeClass('skinviewer-active-tab').hide();
        newEl.addClass('skinviewer-active-tab').fadeIn();
    }
});