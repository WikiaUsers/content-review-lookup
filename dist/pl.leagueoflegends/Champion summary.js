;(function(){
    function summaryAddCSS(css) {
        var sheet = $('style#champion-summary-sheet');
        if(sheet.length === 0) sheet = $('<style type="text/css" id="champion-summary-sheet" />').appendTo('head');
        
        css = css.replace('\n', '');
        var lines = sheet.text().split('\n');
        for(var i=0; i<lines.length; i++) {
            if(lines[i] == css) return true;
        }
        sheet.append(css + '\n');
    }
    function summaryBackground(elem) {
        var bg = $(elem).data('background');
        if(!bg) return;
        
        summaryAddCSS('.champion-summary-v2[data-background="' + bg.replace('"', '\\"') + '"] .pi-theme-champion-summary > .pi-title::before { background-image: url(\'' + mw.config.get('wgScriptPath') + '/wiki/Special:Filepath/' + bg.replace('?', '%3F') + '?width=900\'); }');
        
        var offset = $(elem).data('offset');
        if(!isNaN(parseInt(offset))) {
            summaryAddCSS('.champion-summary-v2[data-offset="' + String(offset).replace('"', '\\"') + '"] .pi-theme-champion-summary > .pi-title::before { background-position: center ' + Math.max(0, Math.min(100, parseInt(offset))) + '%; }');
        };
    }
    function summaryWheel(group) {
        var keys = ['damage', 'toughness', 'control', 'mobility', 'utility'],
            flag = true,
            vals = [];
        
        keys.forEach(function(k) {
            var span = group.find('[data-' + k + '-value]');
            if(span.length === 0) return flag = false;
            vals.push(Math.max(0, Math.min(3, parseInt(span.data(k + '-value'), 10))));
        });
        if(!flag) return;
        
        var diff = group.find('[data-difficulty-value]');
        if(diff.length) {
            var dest = group.parent().find('.pi-group:nth-of-type(2)');
            var row = dest.children().first().clone().appendTo(dest);
     
            row.find('.pi-data-label').empty().text(diff.data('label'));
            row.find('.pi-data-value').empty().append(diff.addClass('difficulty-bar').empty().append('<span /><span /><span />'));
        }
        var svg = createStatWheel(vals);
        
        // TODO: proper tooltips
        
        group.empty().addClass('stat-wheel').append(svg);
        return true;
    }
    function summaryBalance(g1, g2) {
        var c1 = g1.children().length,
            c2 = g2.children().length;
        if(Math.abs(c1 - c2) < 2)  return;
        
        if(c1 > c2) {
            g1.children().last().appendTo(g2);
        } else {
            g2.children().last().appendTo(g1);
        }
    }
    function initSummary(elem) {
        elem = $(elem);
        if(elem.hasClass('champion-summary-initialized')) return;
        elem.addClass('champion-summary-initialized');
        
        summaryBackground(elem);
        
        var groups = elem.find('.pi-theme-champion-summary .pi-group');
        summaryWheel($(groups[3]));
        summaryBalance($(groups[1]), $(groups[2]));
    }
    mw.hook('wikipage.content').add(function(elem) {
        $(elem).find('.champion-summary-v2').each(function() {
            initSummary(this);
        });
    });
})();