;(function() {
    var group = $('.pi-theme-championinfobox [data-damage-value]').closest('.pi-group'),
        keys = ['damage', 'toughness', 'control', 'mobility', 'utility'];
    if(group.length === 0) return;
    group.each(function() {
        var vals = [];
        keys.forEach(function(x) {
            var span = group.find('[data-' + x + '-value]');
            vals.push(Math.max(0, Math.min(3, parseInt(span.data(x + '-value'), 10) || 0)));
        });
        
        var svg = createStatWheel(vals);
        $(this).empty().append(svg);
    });
})();