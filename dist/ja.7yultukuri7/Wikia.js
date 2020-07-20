(function() {
    // Scoping
    var config = mw.config.get([
        'wgPageName',
        'wgAction',
        'wgCityId'
    ]);
    if (
        config.wgCityId !== '1652857' ||
        !(/Sandbox|List_of_CSS_enhancements/g.test(config.wgPageName)) ||
        $.getUrlVar('diff') ||
        config.wgAction !== 'view' ||
        window.SearchEnhancementsLoaded
    )  {
        return;
    }
    window.SearchEnhancementsLoaded = true;

        $('#mw-content-text').prepend(
            $('<input>', {
                attr: {
                    type: 'text',
                    placeholder: 'Search' + ' ' + (config.wgPageName === 'Sandbox' ? 'JavaScript' : 'CSS'),
                    id: 'SearchEnhancements'
                },
                keyup: filter_scripts
            })
        );
    
 
    var dd = [].slice.call(document.getElementsByTagName('dd')),
    dt     = [].slice.call(document.getElementsByTagName('dt'));
 
    function show_all() {
        $('.matched-text').each(function() {
            this.parentElement.replaceChild(document.createTextNode(this.innerHTML), this);
        });
        $('.searchenhancements-hide, .searchenhancements-keep').removeClass('searchenhancements-hide searchenhancements-keep');
        $('#mw-content-text').removeClass('remove-clutter');
    }
 
    function show(d, t) {
        d.className = t.className = 'searchenhancements-keep';
    }
 
    function hide(d, t) {
        d.className = t.className = 'searchenhancements-hide';
    }
 
    function hide_clutter() {
        $('#mw-content-text').addClass('remove-clutter');
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

 
    importArticle(
        {
            type: 'style',
            article: 'u:dev:MediaWiki:SearchEnhancements.css'
        }
    );
})();