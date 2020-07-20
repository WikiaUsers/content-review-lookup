if($('.inline-edit-infobox').length) {
    if($('.inline-edit-infobox .infobox-body .infobox-field-value[data-values]').length) {
        values = $('.inline-edit-infobox .infobox-body .infobox-field-value[data-values]').attr('data-values').replace(', ',',').split(',');
    }
}