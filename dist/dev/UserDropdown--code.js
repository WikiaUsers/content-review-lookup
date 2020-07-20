/* <nowiki>
(function() {
    if($.inArray('sysop', mw.config.get('wgUserGroups')) === -1) {
        return;
    }

    var links;

    function init(content) {
        links = content.split('\n').filter(function(el) {
            return el !== '<pre>' && el !== '</pre>';
        }).map(function(el) {
            return el.replace(
                /\n?\*\s?{{JS[|](.+)}}\|(.+)/,
                '<li><a href="#" alt="$1" title="$2"><span class="$1">$2</span></a></li>'
            ).replace(
                /\n?\*\s?(.+)[|](.+)\n?/g,
                '<li><a href="/wiki/$1" alt="$2" title="$2">$2</a></li>'
            ).replace(
                /\n?\*\s?(https?:\/\/(.+))[ ](.+)\n?/,
                '<li><a href="$1" alt="$3" title="$3">$3</a></li>'
            );
        });
        $('.Wall.Thread .speech-bubble-message .MiniEditorWrapper').each(insert);
    }

    function insert() {
        var $this = $(this),
            user = $this.find('.edited-by a').text(),
            $element = $('<ul>', { 'class': 'WikiaMenuElement' })
                .css('min-width','51px'),
            $button = $('<nav>', {
                'class': 'wikia-menu-button secondary combined edit-user',
                text: mw.config.get('wgFormattedNamespaces')[2]
            }).append(
                $('<span>', { 'class': 'drop' }).append(
                    $('<img>', {
                        'class': 'chevron',
                        src: mw.config.get('wgBlankImgUrl')
                    })
                ),
                $element
            ).click(openDropdown).on('keyup keypress blur mouseleave', closeDropdown);
        links.forEach(function(el) {
            $element.append(el.replace(/{{PAGENAME}}/g, user));
        });
        $this.find('.buttons').append($button);
    }

    function openDropdown() {
        $(this).addClass('active');
    }

    function closeDropdown() {
        $(this).removeClass('active');
    }
    
    $.get(mw.util.wikiScript('index'), {
        title: 'MediaWiki:Custom-User-Dropdown',
        action: 'raw',
        cb: Date.now()
    }, init);
})();

*/