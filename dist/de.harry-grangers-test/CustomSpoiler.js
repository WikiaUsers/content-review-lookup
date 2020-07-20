if($('.customSpoiler').length) {
    $.get('/wiki/Harry_granger%27s_Test_Wiki:Settings?action=raw', function(data) {
        lines = data.split('\n');
        delete lines[0]; delete lines[lines.length - 1];
        data = JSON.parse(lines.join('\n'));
        $('.customSpoiler').filter(function(key, val) {
            return parseInt($(val).data('season')) >= data[wgUserName].season;
        }).each(function(key, val) {
            content = $(val).html();
            $(val).html(
                $('<span />').attr('class','content').html(content)
            );
            $(val).prepend(
                $('<label />').attr('for','expander-' + key)
            );
            $(val).prepend(
                $('<input />').attr({
                    'type':'checkbox',
                    'id':'expander-' + key
                })
            );
        });
    });
}
else {
    console.warn('UI Element not found: CustomSpoiler');
}