(function() {
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    $('#ca-edit').each(function() {
        var copy_to = $('#ca-edit').attr('class', 'wds-button').clone(true);
        var copy_from = $(this).removeAttr('class').clone(true);
        $('#ca-source').replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
})();