$.getScript('https://moment.github.io/luxon/global/luxon.js', function() {
    mw.hook('luxon.loaded').fire();	
});

mw.hook('luxon.loaded').add(function() {
    $.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        meta: 'userinfo',
        uiprop: 'options',
        format: 'json'
    }, function(res) {
        var _timezone = res.query.userinfo.options.timecorrection.split('|');
        var timezone = {
            offset: _timezone[1],
            iana_name: _timezone[2]
        };
        var localTime = luxon.DateTime.local();
        localTime = localTime.setZone(timezone.iana_name);
        $('.js-luxon-datetime').text(localTime.toLocaleString(luxon.DateTime.TIME_SIMPLE));
    });
});