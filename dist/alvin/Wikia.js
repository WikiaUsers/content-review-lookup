// Note MediaWiki:CodeLoad-definitions.js when editing configurations
// Note MediaWiki:ImportJS for script imports

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

//window.UserTagsJS = {
//	modules: {},
//	tags: {
//                sysop: { link:'Project:Sysops', order:1 },
//                tempsysop: { u:'Temporary Admin', order:1 },
//                bureaucrat: { link:'Project:Bureaucrats', order:2 },
//                'content-moderator': { link:'Project:Moderators', order:3 },
//                councilofchipmunks: { u:'Council of Chipmunks', link:'Project:Council of Chipmunks', order:4 },
//                formeradmin1: { u:'Former Admin (1+ yrs)', link:'Project:UserTags', order:3 },
//                formeradmin2: { u:'Former Admin (2+ yrs)', link:'Project:UserTags', order:3 },
//                formeradmin3: { u:'Former Admin (3+ yrs)', link:'Project:UserTags', order:3 },
//                formeradmin4: { u:'Former Admin (4+ yrs)', link:'Project:UserTags', order:3 },
//                formercouncil: { u:'Former Council', link:'Project:Council of Chipmunks', order:4 },
//                councilfounder: { u:'Council Founder', link:'Project:Council of Chipmunks', order:1 },
//                newuser: { u:'New Editor', link:'Project:UserTags' },
//                inactive: { link:'Project:UserTags' },
//                founder: { u:'Wiki Founder', link:'Project:UserTags' },
//                staff: { link:'Project:UserTags' }
//	}
//};
//UserTagsJS.modules.custom = {
//        'DEmersonJMFM': ['councilofchipmunks'],
//        'Rugratskid': ['councilofchipmunks'],
//        'PrinceAzzy': ['formeradmin3', 'councilofchipmunks'],
//        'David Alvinson': ['councilofchipmunks'],
//        'Optimistic Alvin': ['councilofchipmunks'],
//        'Vaznock': ['formeradmin1', 'councilfounder'],
//        'SJ4evr': ['formeradmin4', 'formercouncil'],
//        'Marchbaby': ['formeradmin3', 'formercouncil'],
//        'HaloFan500': ['formeradmin1', 'formercouncil'],
//        'Manta-bee': ['formeradmin2', 'formercouncil'],
//        'The 888th Avatar': ['formercouncil'],
//        'SupremeBlisseyFan': ['formercouncil'],
//        'ChipmunkRaccoon': ['formercouncil'],
//        'DJSponge': ['formercouncil'],
//        'Blumonkeyboy': ['founder']
//};
//UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator'];
//UserTagsJS.modules.autoconfirmed = false;
//UserTagsJS.modules.newuser = { days: 30, edits: 20, namespaces: [0, 8] };
//UserTagsJS.modules.inactive = { days: 30, namespaces: [0, 1, 4, 5, 8, 'Thread', 'Board Thread'] };
//UserTagsJS.modules.metafilter = { 
//        'newuser': ['inactive', 'staff'], 
//        'inactive': ['staff'], 
//        'sysop': ['inactive'],
//        'bureaucrat': ['inactive'],
//        'contentmod': ['inactive']
//};

// *******************************************************************
// Signature Check Settings - http://dev.wikia.com/wiki/SignatureCheck
// *******************************************************************
 
//window.SignatureCheckJS = {
	// Settings for the text displayed
//	checkSignature: true,
//	preamble: "Alvin!!!\n\n",
//	noSignature: "You forgot to sign your reply using the signature button.\n",
//	epilogue: "\nAre you sure you want to post this anyway?\n\nYou will violate wiki policy if you do not add your signature."
//};

// ********************************************************
// Spoiler Message - http://dev.wikia.com/wiki/SpoilerAlert
// ********************************************************

//window.SpoilerAlert = {
//    isSpoiler: function () {
//        return -1 !== wgCategories.indexOf('Spoiler');
//    }
//};

// ****************************************************************
// Wikia Notification - http://dev.wikia.com/wiki/WikiaNotification
// ****************************************************************

// var WikiaNotificationMessage = "<a href='/wiki/Thread:21104'>Munkapedia is currently experiencing a large wiki-wide video outage due to multiple YouTube accounts being deleted. Click here for more information.</a>";
// var WikiaNotificationexpiry = 14;

// *********************************************************
// Dead Videos via Special:BlankPage?blankspecial=deadvideos
// *********************************************************

if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'deadvideos'
) {
    window.deadVideosCategories = ['Videos'];
 
    importArticle({
        type: 'script',
        article: [
            'w:c:mlp:MediaWiki:Common.js/DeadVideos.js'
        ]
    });
}

// **************************************************************
// Allow For Entire Cell To Link To Page - Template:CharacterTabs
// **************************************************************

$(function() {
    if ($('.cell-link').length) {
        $('.cell-link').each(function() {
            $(this)
                .css('cursor', 'pointer')
                .on({
                    click: function() {
                        window.location = $(this).find('a').attr('href');
                    }
                });
        });
    }
});

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__contribution>div:first-child').append( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '7px', 'margin-top' : '-5px' } ).show();