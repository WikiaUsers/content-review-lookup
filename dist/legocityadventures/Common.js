/* Any JavaScript here will be loaded for all users on every page load. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

/* Message Wall Usertags */
window.MessageWallUserTags = {
    tagColor: 'black',
    users: {
        'Banana.spread10': 'Founder | Mayor',
        'Toa Kopaka Nuva': 'Mayor',
        'Holomaster15': 'Mayor',
        'Samurai viper': 'Vice Mayor'
    }
};

/* Users blocked infinite */
window.addEventListener('load', function() {
    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
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