$(function() {
    var $cd = $('.eventcountdown-region');
    if (!$cd.length) return;
    
    var now = Math.floor(Date.now() / 1000);
    var purge = false;
    
    $cd.each(function() {
        var s = $(this).data('event-state');
        var st = parseInt($(this).data('event-start'));
        var et = parseInt($(this).data('event-end'));
        
        if ((s === 'start' && now >= st && st > 0) ||
            (s === 'end' && now >= et && et > 0) ||
            (s === 'end' && now < st && st > 0) ||
            (s === 'start' && now >= et && et > 0)) {
            purge = true;
            return false;
        }
    });
    
    if (purge) {
        $.post(mw.util.wikiScript('api'), {
            action: 'purge',
            titles: mw.config.get('wgPageName'),
            format: 'json'
        }, function() {
            location.reload();
        });
    }
});