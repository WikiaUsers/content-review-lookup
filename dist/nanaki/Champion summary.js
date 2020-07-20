(function(){
    function insertStatWheel(elem) { /* TODO: reusable statwheel */
       return elem.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.656248 43.656252" class="stat-wheel"><path class="background-circle" d="M 43.524124,21.828125 A 21.695999,21.695999 0 0 1 21.828125,43.524124 21.695999,21.695999 0 0 1 0.13212585,21.828125 21.695999,21.695999 0 0 1 21.828125,0.13212585 21.695999,21.695999 0 0 1 43.524124,21.828125 Z" fill="#020a15"/><path class="inner-circle" d="m25.266541 21.833954a3.4395833 3.4395833 0 0 1 -3.439583 3.439583 3.4395833 3.4395833 0 0 1 -3.439584 -3.439583 3.4395833 3.4395833 0 0 1 3.439584 -3.439583 3.4395833 3.4395833 0 0 1 3.439583 3.439583z" fill="#0097ac"/><g fill="#00202d"><g class="damage" transform="translate(-90.091869,-106.63189)"><path class="damage1" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 49c-6.0963 0-12.188 1.6892-17.531 5.0469l6.4844 8.9238c6.8081-3.9578 15.283-3.9572 22.092 0l6.4844-8.9258c-5.3427-3.3568-11.434-5.0449-17.529-5.0449z"/><path class="damage2" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 29c-10.23 0-20.458 2.9473-29.309 8.834l6.4727 8.9121c13.846-8.9879 31.823-8.9889 45.67-.002l6.4727-8.9102c-8.8503-5.8861-19.077-8.8339-29.307-8.8339z"/><path class="damage3" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 9c-14.361 0-28.715 4.2296-41.064 12.652l6.4648 8.9004c20.851-14.056 48.345-14.055 69.197 0l6.4668-8.9004c-12.35-8.4228-26.703-12.652-41.064-12.652z"/></g><g class="toughness" transform="rotate(72,140.25716,13.143647)"><path class="toughness1" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 49c-6.0963 0-12.188 1.6892-17.531 5.0469l6.4844 8.9238c6.8081-3.9578 15.283-3.9572 22.092 0l6.4844-8.9258c-5.3427-3.3568-11.434-5.0449-17.529-5.0449z"/><path class="toughness2" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 29c-10.23 0-20.458 2.9473-29.309 8.834l6.4727 8.9121c13.846-8.9879 31.823-8.9889 45.67-.002l6.4727-8.9102c-8.8503-5.8861-19.077-8.8339-29.307-8.8339z"/><path class="toughness3" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 9c-14.361 0-28.715 4.2296-41.064 12.652l6.4648 8.9004c20.851-14.056 48.345-14.055 69.197 0l6.4668-8.9004c-12.35-8.4228-26.703-12.652-41.064-12.652z"/></g><g class="control" transform="rotate(144,84.197463,60.507747)"><path class="control1" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 49c-6.0963 0-12.188 1.6892-17.531 5.0469l6.4844 8.9238c6.8081-3.9578 15.283-3.9572 22.092 0l6.4844-8.9258c-5.3427-3.3568-11.434-5.0449-17.529-5.0449z"/><path class="control2" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 29c-10.23 0-20.458 2.9473-29.309 8.834l6.4727 8.9121c13.846-8.9879 31.823-8.9889 45.67-.002l6.4727-8.9102c-8.8503-5.8861-19.077-8.8339-29.307-8.8339z"/><path class="control3" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 9c-14.361 0-28.715 4.2296-41.064 12.652l6.4648 8.9004c20.851-14.056 48.345-14.055 69.197 0l6.4668-8.9004c-12.35-8.4228-26.703-12.652-41.064-12.652z"/></g><g class="mobility" transform="rotate(216 49.550664 89.780371)"><path class="mobility1" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 49c-6.0963 0-12.188 1.6892-17.531 5.0469l6.4844 8.9238c6.8081-3.9578 15.283-3.9572 22.092 0l6.4844-8.9258c-5.3427-3.3568-11.434-5.0449-17.529-5.0449z"/><path class="mobility2" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 29c-10.23 0-20.458 2.9473-29.309 8.834l6.4727 8.9121c13.846-8.9879 31.823-8.9889 45.67-.002l6.4727-8.9102c-8.8503-5.8861-19.077-8.8339-29.307-8.8339z"/><path class="mobility3" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 9c-14.361 0-28.715 4.2296-41.064 12.652l6.4648 8.9004c20.851-14.056 48.345-14.055 69.197 0l6.4668-8.9004c-12.35-8.4228-26.703-12.652-41.064-12.652z"/></g><g class="utility" transform="rotate(-72,-6.5090333,137.14448)"><path class="utility1" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 49c-6.0963 0-12.188 1.6892-17.531 5.0469l6.4844 8.9238c6.8081-3.9578 15.283-3.9572 22.092 0l6.4844-8.9258c-5.3427-3.3568-11.434-5.0449-17.529-5.0449z"/><path class="utility2" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 29c-10.23 0-20.458 2.9473-29.309 8.834l6.4727 8.9121c13.846-8.9879 31.823-8.9889 45.67-.002l6.4727-8.9102c-8.8503-5.8861-19.077-8.8339-29.307-8.8339z"/><path class="utility3" transform="matrix(.26458 0 0 .26458 90.223 106.77)" d="m82 9c-14.361 0-28.715 4.2296-41.064 12.652l6.4648 8.9004c20.851-14.056 48.345-14.055 69.197 0l6.4668-8.9004c-12.35-8.4228-26.703-12.652-41.064-12.652z"/></g></g></svg>');
    }
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
        
        summaryAddCSS('.champion-summary-v2[data-background="' + bg.replace('"', '\\"') + '"] .pi-theme-champion-summary > .pi-title::before { background-image: url(\'/wiki/Special:Filepath/' + encodeURIComponent(bg) + '\'); }');
        
        var offset = $(elem).data('offset');
        if(!isNaN(parseInt(offset))) {
            summaryAddCSS('.champion-summary-v2[data-offset="' + String(offset).replace('"', '\\"') + '"] .pi-theme-champion-summary > .pi-title::before { background-position: center ' + Math.max(0, Math.min(100, parseInt(offset))) + '%; }');
        };
    }
    function summaryWheel(group) {
        var keys = ['damage', 'toughness', 'control', 'mobility', 'utility'],
            flag = true;
        
        keys.forEach(function(k) {
            var span = group.find('[data-' + k + '-value]');
            if(span.length === 0) return flag = false;
            group.attr('data-' + k + '-value', span.data(k + '-value'));
        });
        if(!flag) return;
        
        var diff = group.find('[data-difficulty-value]');
        if(diff) {
            var dest = group.parent().find('.pi-group:nth-of-type(2)');
            var row = dest.children().first().clone().appendTo(dest);
     
            row.find('.pi-data-label').empty().text(diff.data('label'));
            row.find('.pi-data-value').empty().append(diff.addClass('difficulty-bar').empty().append('<span /><span /><span />'));
        }
        
        group.empty().addClass('champion-summary-wheel');
        insertStatWheel(group);
        keys.forEach(function(k) {
            group.append('<img src="/wiki/Special:Filepath/' + k + ' rating.png?width=20" class="' + k + '-icon" alt="" />');
        });
        return true;
    }
    function summaryBars(group) { // Do usunięcia po migracji na nową charakterystykę
        var keys = ['attack', 'defense', 'spells', 'difficulty'],
            bars = [];
        
        keys.forEach(function(k) {
            var span = group.find('[data-old-' + k + '-value]');
            if(span.length === 0) return;
            var v = span.data('old-' + k + '-value');
            var bar = $('<div />').addClass('rating-bar ' + k + '-rating-bar').attr('data-value', v);
            bar.append('<img src="/wiki/Special:Filepath/' + k + ' rating.png?width=20" alt="" />');
            for(var i=0; i<10; i++) {
                var one = $('<span />').appendTo(bar);
                if(i < v) one.addClass('full');
            }
            bars.push(bar);
        });
        if(bars.length === 0) return;        
        group.empty().append(bars).addClass('champion-summary-bars').parent().addClass('uses-bars');
    }
    function summaryBalance(g1, g2) {
        var c1 = g1.children().length,
            c2 = g2.children().length;
        if(Math.abs(c1 - c2) <= 1)  return;
        
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
        summaryWheel($(groups[3])) || summaryBars($(groups[3]));
        
        summaryBalance($(groups[1]), $(groups[2]));
    }
    mw.hook('wikipage.content').add(function(elem) {
        $(elem).find('.champion-summary-v2').each(function() {
            initSummary(this);
        });
    });
})();