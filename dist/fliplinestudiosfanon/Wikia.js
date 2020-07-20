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
               blockTag.innerHTML = 'Shattered';
           }
        });
    }, 250);
});
/*Discussions Module*/
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.chat-module').exists()) {
            $module.insertBefore('.chat-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });
importScriptPage('MediaWiki:BackToThread/code.js', 'dev');
'u:dev:ContribsDropdown/code.js'

/* Fix over-complicated country names in Special:Analytics */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                            'Brunei')
        .replace('Bolivia (Plurinational State of)',                            'Bolivia')
        .replace('Falkland Islands (Malvinas)',                        'Falkland Islands')
        .replace('Iran (Islamic Republic of)',                                     'Iran')
        .replace('Korea (Democratic People\'s Republic of)',                 'Best Korea')
        .replace('Korea, Republic of',                                      'South Korea')
        .replace('Lao People\'s Democratic Republic',                              'Laos')
        .replace('Moldova, Republic of',                                        'Moldova')
        .replace('Russian Federation',                                           'Russia')
        .replace('Syrian Arab Republic',                                          'Syria')
        .replace('Tanzania, United Republic of',                               'Tanzania')
        .replace('Taiwan, Province of China',                                    'Taiwan')
        .replace('United Kingdom of Great Britain and Northern Ireland', 'United Kingdom')
        .replace('United States of America',                              'United States')
        .replace('Venezuela (Bolivarian Republic of)',                        'Venezuela')
        .replace('Viet Nam',                                                    'Vietnam')
    );
});