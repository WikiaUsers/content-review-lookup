(function() {
    function checkDomain(name) {
        if(!name) return false;
        return (/^([a-zA-Z0-9][a-zA-Z0-9-]{0,9}[a-zA-Z0-9]\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,48}[a-zA-Z0-9]$/).test(name);
    }
    function prepBackground(elem) {
        if(elem.attr('style') && elem.attr('style').indexOf('background-image') !== -1) return;
        var bg = mw.util.wikiUrlencode(elem.attr('data-set-background')),
            width = parseInt(elem.attr('data-set-background-width')),
            height = parseInt(elem.attr('data-set-background-height'));
        
        var img = wgScriptPath + '/wiki/Special:Filepath/' + bg;
        
        if(width) {
            if((/\d+%/).test(elem.attr('data-set-background-width'))) {
                width = Math.ceil(parseFloat(window.getComputedStyle(elem[0]).width) * width / 100);
            }
            img += '?width=' + width;
        }
        if(height) {
            if((/\d+%/).test(elem.attr('data-set-background-height'))) {
                height = Math.ceil(parseFloat(window.getComputedStyle(elem[0]).height) * height / 100);
            }
            if(width) {
                img += '&height=' + height;
            } else {
                img += '?width=' + height*1000 + '&height=' + height; // Special:Filepath ignores lone height argument for some reason
            }
        }
        if(checkDomain(elem.attr('data-set-background-wiki'))) {
            img = '//' + elem.attr('data-set-background-wiki') + '.wikia.com' + img;
        }
        
        elem.css('background-image', 'url("' + img + '")').attr({
            'data-set-background': null,
            'data-set-background-width': null,
            'data-set-background-height': null,
            'data-set-background-wiki': null,
        });
    }
    
    $(function() {
        $('#mw-content-text [data-set-background]').each(function() { prepBackground($(this)); });
        mw.hook('wikipage.content').add(function(elem) {
            var $elem = $(elem);
            if($elem.attr('data-set-background')) { prepBackground($elem); }
            $elem.find('[data-set-background]').each(function() { prepBackground($(this)); });
        });
    });
})();