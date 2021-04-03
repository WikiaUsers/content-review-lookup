/* SearchEnhancements
 *
 * Allows to quickly search for pages in [[List of JavaScript enhancements]] and [[List of CSS enhancements]]
 *
 * @authors
 *      KurwaAntics (original)
 *      Dorumin (remake after page reform)
 *      TheGoldenPatrik1 (I18n-js and support for CSS)
 */

mw.loader.using('mediawiki.util').then(function() {
    // Scoping
    var config = mw.config.get([
        'wgPageName',
        'wgAction',
        'wgCityId'
    ]);
    if (
        config.wgCityId !== 7931 ||
        !(/^(List_of_JavaScript_enhancements|List_of_CSS_enhancements)$/g.test(config.wgPageName)) ||
        mw.util.getParamValue('diff') ||
        config.wgAction !== 'view' ||
        window.SearchEnhancementsLoaded
    )  {
        return;
    }
    window.SearchEnhancementsLoaded = true;
 
    function init(i18nData) {
        i18n = i18nData;
        $('#mw-content-text .mw-parser-output').prepend(
            $('<input>', {
                attr: {
                    type: 'text',
                    placeholder: i18n.msg('search').plain() + ' ' + (config.wgPageName === 'List_of_JavaScript_enhancements' ? 'JavaScript' : 'CSS'),
                    id: 'SearchEnhancements'
                },
                keyup: filter_scripts
            })
        );
    }
 
    var dd = [].slice.call(document.getElementsByTagName('dd')),
    dt     = [].slice.call(document.getElementsByTagName('dt'));
 
    function show_all() {
        $('.matched-text').each(function() {
            this.parentElement.replaceChild(document.createTextNode(this.innerHTML), this);
        });
        $('.searchenhancements-hide, .searchenhancements-keep').removeClass('searchenhancements-hide searchenhancements-keep');
        $('#mw-content-text .mw-parser-output').removeClass('remove-clutter');
    }
 
    function show(d, t) {
        d.className = t.className = 'searchenhancements-keep';
    }
 
    function hide(d, t) {
        d.className = t.className = 'searchenhancements-hide';
    }
 
    function hide_clutter() {
        $('#mw-content-text .mw-parser-output').addClass('remove-clutter');
    }
 
    function includes(text, sub) {
        text = text.toLowerCase();
        sub = sub.toLowerCase();
 
        var split = sub.split(' ').filter(Boolean),
        i = split.length;
 
        while (i--) {
            if (text.indexOf(split[i]) == -1) {
                return false;
            }
        }
        return true;
    }
 
    function filter_scripts(e) {
        var value = e.target.value;
 
        if (!value) {
            return show_all();
        }
 
        hide_clutter();
 
        for (var i in dd) {
            var d = dd[i],
            t = dt[i],
            di = includes(d.textContent, value),
            ti = includes(t.textContent, value);

            if (di || ti) {
                show(d, t);
            } else {
                hide(d, t);
            }
        }
    }
 
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('SearchEnhancements').then(init);
	});
 
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:SearchEnhancements.css'
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});