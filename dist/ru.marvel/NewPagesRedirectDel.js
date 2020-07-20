require(['wikia.window', 'jquery'], function(window, $) {
    'use strict';
    var $list = $('#js-newpagesuser-list'),
        cachedRedirects = [];

    if (!$list.length) return;
        
    var $ui = $('<div class="redirect-remover">' +
                    '<div class="rr-state">Получение списка редиректов</div>' +
                    '<button class="rr-btn" disabled>' + 
                        'Убрать перенаправления' + 
                    '</button>' +
                '</div>').insertBefore($list);

    retrieveRedirects();

    $ui.find('.rr-btn').click(function() {
        if (!$list.children().length)
            return stateChange('Сначала нужно получить страницы', true);

        var redirectItems = $list.children('a').filter(function () {
            return cachedRedirects.indexOf($(this).text().trim()) !== -1;
        });

        redirectItems.each(function() {
            var $timestamp = $(this).prev('span');
            var $br = $timestamp.prev('br');

            $(this).hide();
            $timestamp.hide();
            $br.hide();
        });

        stateChange('Перенаправления убраны', true);
    });
    
    function retrieveRedirects(startRedirect) {
        $.ajax({
            url: '/api.php',
            type: 'GET',
            data : {
                format: 'json',
                action: 'query',
                list: 'allpages',
                apfilterredir: 'redirects',
                aplimit: 500,
                apfrom: startRedirect
            },
            success: function(d) {
                var redirects = d.query.allpages.map(function (e) {
                    return e.title;
                });
                cachedRedirects = cachedRedirects.concat(redirects);

                if (typeof d["query-continue"] === 'undefined')
                    return stateChange('Всё готово', true);
                
                retrieveRedirects(d["query-continue"].allpages.apfrom);
            }
        });
    }

    function stateChange(state, enabled) {
        var $state = $ui.find('.rr-state');
        var $button = $ui.find('.rr-btn');

        $state.text(state);
        $button.attr('disabled', !enabled);
    }
});