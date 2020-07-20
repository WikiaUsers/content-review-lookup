// Disable access keys
$('[accesskey]').removeAttr('accesskey');
mw.config.set({'wgWikiaShortcutKeys':undefined});
$('.global-shortcuts-help-entry-point').parent().remove();