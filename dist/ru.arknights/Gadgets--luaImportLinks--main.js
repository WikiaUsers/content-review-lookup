/* Link to imported modules from Lua code */
$(function() {
    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgFormattedNamespaces'
    ]);
    if (config.wgCanonicalNamespace !== 'Module') {
        return;
    }
    var localizedNamespace = config.wgFormattedNamespaces[828];
    $('.s1, .s2, .s').each(function() {
        var $this = $(this);
        var html = $this.html();
        var quote = html[0];
        var isLongStringQuote = quote === '[';
        var quoteRE = new RegExp('^\\' + quote + '|\\' + quote + '$', 'g');
        if (isLongStringQuote) {
            quoteRE = /^\[\[|\]\]$/g;
        }
        var name = html.replace(quoteRE, '');
        var isEnglishPrefix = name.startsWith('Module:');
        var isLocalizedPrefix = name.startsWith(localizedNamespace + ':');
        var isDevPrefix = name.startsWith('Dev:');
        if (isEnglishPrefix || isLocalizedPrefix || isDevPrefix) {
            var attrs = {
                href: mw.util.getUrl(name)
            };
            if (isDevPrefix) {
                attrs.href = 'https://commons.wiki.gg/wiki/Module:' + mw.util.wikiUrlencode(name.replace('Dev:', ''));
                attrs.target = '_blank';
                attrs.rel = 'noopener';
            }
            var link = mw.html.element('a', attrs, name);
            var str = quote + link + quote;
            if (isLongStringQuote) {
                str = '[[' + link + ']]';
            }
            $this.html(str);
        }
    });
});