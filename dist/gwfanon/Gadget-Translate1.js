createButton: function(options) {
    var customClasses = Array.isArray(options.classes) ? options.classes.join(' ') : options.classes || '';
    var buttonTag = options.link ? '<a>' : '<button>';
    var $button = $(buttonTag, {
        class: 'page-side-tool custom-side-tool ' + customClasses,
        data: {
            'wds-tooltip-name': options.i18nKey,
            'wds-tooltip-text': options.text
        },
        href: options.link
    });
    if (options.icon) {
        $button.append(wds.icon(options.icon + '-small'));
    }
    return $button;
}