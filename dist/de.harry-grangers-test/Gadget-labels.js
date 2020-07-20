if ($('.category-label').length != 0) {
    var $CategoryLabel = $('.category-label').detach();
    if (mw.config.values.skin == "oasis") {
        $('header div.header-column.header-title')
            .append(
                $('<h2>').append($CategoryLabel)
            )
            .css('text-align', $CategoryLabel.css('text-align'));
    } else {
        $('.secondHeading')
            .emtpy()
            .append($belongsTo)
            .css('text-align', $CategoryLabel.css('text-align'));
    }
}