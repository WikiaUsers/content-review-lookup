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
        requestsPage: 'Adoption:Requests/Extend_permissions'
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
    mw.loader.using('mediawiki.util').add(function () {
        window.location = mw.util.getUrl('Discord'); 
    });
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [{
    page: 'MediaWiki:DiscordAMA',
    prepend: true
}];

// Temp fix for Admin+ quizzes; 
// approved by Tim Q

    $(function () {
        $('#technical-foundations').append("<div class='typeform-widget' data-url='https://form.typeform.com/to/Whr9PBJs' style='width: 100%; height: 775px;margin-top:20px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });

    $(function () {
        $('#content-development').append("<div class='typeform-widget' data-url='https://form.typeform.com/to/hkQ0e8un' style='width: 100%; height: 775px;margin-top:20px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });

    $(function () {
        $('#community-building').append("<div class='typeform-widget' data-url='https://form.typeform.com/to/SKYUS6lb' style='width: 100%; height: 775px;margin-top:20px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });

//Message wall greeting for [[Mesage wall:Sophiedp]], uses [[User:Sophiedp/notstaff]]
//written by Sophiedp, with premission from Sannse
if (mw.config.get('profileUserName') === 'Sophiedp' && mw.config.get('profileIsMessageWallPage')) {
    mw.loader.using('mediawiki.api').then(function () {
        new mw.Api().get({
            action: 'parse',
            format: 'json',
            page: 'User:Sophiedp/notstaff',
            prop: 'text',
            wrapoutputclass: 'greeting',
            disablelimitreport: 1,
            formatversion: '2'
        }).done(function (data) {
            $('#MessageWall').prepend(data.parse.text).find('.greeting').css('margin-bottom', '20px');
        });
    });
}