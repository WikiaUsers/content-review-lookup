(function () {
    var user = $('#UserProfileMasthead h1').text();
    if (
        !$('#UserProfileMasthead').exists() ||
        $('#discussionAllPostsByUser').exists() ||
        window.LTDPITDHLPLoaded ||
        mw.util.isIPv4Address(user) ||
        mw.util.isIPv6Address(user)
    ) {
        return;
    }
    window.LTDPITDHLPLoaded = true;
    $.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        list: 'users',
        ususers: user,
        format: 'json'
    }).done(function (data) {
        $('.discussion-details > em, .discussion-label').wrapAll(
            $('<a>', {
                href: mw.config.get('wgScriptPath') + '/f/u/' + data.query.users[0].userid
            })
        );
    });
})();