$(function() {
    $('.director-counter').each(function(_, e) {
        var ele = $(e);
        var group = ele.data('group');
        if (typeof(group) === 'string') {
            var params = {
                action: 'query',
                format: 'json',
                list: 'allusers',
                augroup: group,
            },
            api = new mw.Api();
            
            api.get( params ).done( function ( data ) {
                var base = ele.data('base') || 0;
                var add = ele.data('add') || 0;
                var mult = ele.data('mult') || 1;
                var users = data.query.allusers.length;
                var result = base + (users + add) * mult;
                ele.html(result);
            });
        }
    });
});