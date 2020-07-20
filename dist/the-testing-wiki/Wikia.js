window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Users blocked infinite */
window.addEventListener('load', function() {
    setTimeout(function() {
        if (document.getElementById('UserProfileMasthead') === null) return;
        var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
        if (blockTag === null) return;
        new mw.Api().get({
            action: 'query',
            list: 'blocks',
            bkprop: 'expiry',
            bktimestamp: new Date().getTime(),
            bkusers: wgTitle
        }).done(function(d) {
            if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
                blockTag.innerHTML = 'Blocked';
            }
        });
    }, 250);
});