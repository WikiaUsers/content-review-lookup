mw.hook('wikipage.content').add(function ($content) {
    $content.find('.modstat-entry').each(function () {
        var $entry = $(this);
        if ($entry.find('a.new, span.new, a[href*="redlink=1"]').length === 0) {
            $entry.addClass('modstat-visible');
        }
    });
});