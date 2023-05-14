// Configuration for interlanguage links form
window.interwikiInternational = {
    namespace: 'Interlanguage_link',
    namespaceId: 152,
    mainPage: 'Community_Central:Interlanguage_link_requests',
    interwikiSchema: '{{bStart}}InterwikiLink|{{from}}|{{to}}{{bEnd}}',
    pageSchema: '{{bStart}}Interlanguage Link Request|awaiting{{bEnd}}\n' +
    '<!-- Staff: replace "awaiting" with "accepted" or "rejected" to complete request -->\n' +
    '{{interwikis}}\n\n' +
    '~~' + '~~'
};

// Adoption & such requests in these languages will *not* work 
window.communityRequestsUnsupportedLangs = ['de', 'es', 'fr', 'it', 'pl', 'pt', 'pt-br', 'zh', 'zh-tw', 'zh-hk'];

// Configuration for extend permissions form
window.adoptRetainInternational = {
    unsupportedLanguages: window.communityRequestsUnsupportedLangs,
    requirementsConfig: {
        activityDays: 10,
        permissionTypes: [
            'bureaucrat',
            'sysop'
        ]
    },
    pageConfig: {
        namespace: 'Adoption',
        namespaceId: 118,
        adoptionsPage: 'Adoption:Requests'
    },
    wikitextSchema: '{{bStart}}Permissions Extend Request\n' +
    '|0-Status               = awaiting<!- Staff: replace "awaiting" with "accepted" or "rejected" to complete request-->\n' +
    '|1-User                 = {{userName}}\n' +
    '|2-URL                  = {{{wikiURL}}}\n' +
    '|3-Permissions          = {{permissionsType}}\n' +
    '|4-Days edited          = {{numDays}}\n' +
    '|5-Reason               = {{comments}}\n' +
    '|6-Community discussion = {{{communityVote}}}\n' +
    '{{bEnd}}\n\n'
};

// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: window.communityRequestsUnsupportedLangs,
    adoptionConfig: {
        activityDays: 10,
        adminsDays: 60,
        permissionTypes: [
            'bureaucrat',
            'sysop'
        ],
    },
    pageConfig: {
        namespace: 'Adoption',
        namespaceId: 118,
        adoptionsPage: 'Adoption:Requests'
    },
    wikitextSchema: "{{bStart}}Adoption request\n" +
    "|1-User            = {{userName}}\n" +
    "|2-Link to wiki    = {{{wikiURL}}}\n" +
    "|3-Rights type     = {{permissionsType}}\n" +
    "|4-Your activity   = {{numDays}}\n" +
    "|5-Admin activity  = {{numAdmins}}\n" +
    "|6-Your motivation = <nowiki>{{comments}}</nowiki>\n" +
    "|7-Community vote  = {{{communityVote}}}\n" +
    "{{bEnd}}"
};

//Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === 'Special:Chat') {
    window.location = mw.util.getUrl('Discord');
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [{
    page: 'MediaWiki:DiscordAMA',
    prepend: true
}];

//Message wall greeting for [[Mesage wall:Sophiedp]], uses [[User:Sophiedp/notstaff]]
//written by Sophiedp, with premission from Sannse
mw.loader.using('mediawiki.api').then(function () {
    if (mw.config.get('profileUserName') === 'Sophiedp' && mw.config.get('profileIsMessageWallPage')) {
        var params = {
            action: 'parse',
            format: 'json',
            page: 'User:Sophiedp/notstaff',
            prop: 'text',
            wrapoutputclass: 'greeting',
            disablelimitreport: 1,
            formatversion: '2'
        };
        new mw.Api().get(params).done(function (data) {
            $('#MessageWall').prepend(data.parse.text).find('.greeting').css('margin-bottom', '20px');
        });
    }
});