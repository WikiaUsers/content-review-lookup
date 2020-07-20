if ($('.page-header__languages').exists()) {
    $('#icons').addClass('wds-dropdown').insertAfter('.page-header__languages');
} else {
    $('#PageHeader').append($('#icons'));
}