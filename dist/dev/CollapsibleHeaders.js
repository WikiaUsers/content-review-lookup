mw.hook('wikipage.content').add(function($content) {
    var $parseroutput = $content.children('.mw-parser-output');

    $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .each(function () {

        var headline = $(this);
        var header = headline.parent();
        if (!header.is('h2, h3, h4, h5, h6')) return;

        var level = parseInt(header.prop('tagName').substring(1));
        var content = [];

        var next = header.next();

        while (next.length) {
            if (next.is('h2, h3, h4, h5, h6')) {
                var nextLevel = parseInt(next.prop('tagName').substring(1));
                if (nextLevel <= level) break;
            }
            content.push(next);
            next = next.next();
        }

        if (content.length === 0) return;

        var toggle = $('<span>')
            .text('▼')
            .css({
                cursor: 'pointer',
                fontSize: '12px',
                color: 'gray',
                float: 'right',
                marginRight: '8px',
                userSelect: 'none'
            })
            .on('click', function () {
                var collapsed = $(this).data('collapsed');
                $.each(content, function () { $(this).toggle(collapsed); });
                $(this).text(collapsed ? '▼' : '►');
                $(this).data('collapsed', !collapsed);
            })
            .data('collapsed', false);

        header.prepend(toggle);
    });
});