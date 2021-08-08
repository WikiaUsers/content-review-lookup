// Note MediaWiki:CodeLoad-definitions.js when editing configurations
// Note MediaWiki:ImportJS for script imports

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
                sysop: { link:'Project:Sysops', order:1 },
                tempsysop: { u:'Temporary Admin', order:1 },
                bureaucrat: { link:'Project:Bureaucrats', order:2 },
                'content-moderator': { link:'Project:Moderators', order:3 },
                councilofchipmunks: { u:'Council of Chipmunks', link:'Project:Council of Chipmunks', order:4 },
                formeradmin1: { u:'Former Admin (1+ yrs)', link:'Project:UserTags', order:3 },
                formeradmin2: { u:'Former Admin (2+ yrs)', link:'Project:UserTags', order:3 },
                formeradmin3: { u:'Former Admin (3+ yrs)', link:'Project:UserTags', order:3 },
                formeradmin4: { u:'Former Admin (4+ yrs)', link:'Project:UserTags', order:3 },
                formercouncil: { u:'Former Council', link:'Project:Council of Chipmunks', order:4 },
                councilfounder: { u:'Council Founder', link:'Project:Council of Chipmunks', order:1 },
                newuser: { u:'New Editor', link:'Project:UserTags' },
                inactive: { link:'Project:UserTags' },
                founder: { u:'Wiki Founder', link:'Project:UserTags' },
                staff: { link:'Project:UserTags' }
	}
};
UserTagsJS.modules.custom = {
        'DEmersonJMFM': ['councilofchipmunks'],
        'Rugratskid': ['councilofchipmunks'],
        'PrinceAzzy': ['formeradmin3', 'councilofchipmunks'],
        'David Alvinson': ['councilofchipmunks'],
        'Optimistic Alvin': ['councilofchipmunks'],
        'Vaznock': ['formeradmin1', 'councilfounder'],
        'SJ4evr': ['formeradmin4', 'formercouncil'],
        'Marchbaby': ['formeradmin3', 'formercouncil'],
        'HaloFan500': ['formeradmin1', 'formercouncil'],
        'Manta-bee': ['formeradmin2', 'formercouncil'],
        'The 888th Avatar': ['formercouncil'],
        'SupremeBlisseyFan': ['formercouncil'],
        'ChipmunkRaccoon': ['formercouncil'],
        'DJSponge': ['formercouncil'],
        'Blumonkeyboy': ['founder']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = { days: 30, edits: 20, namespaces: [0, 8] };
UserTagsJS.modules.inactive = { days: 30, namespaces: [0, 1, 4, 5, 8, 'Thread', 'Board Thread'] };
UserTagsJS.modules.metafilter = { 
        'newuser': ['inactive', 'staff'], 
        'inactive': ['staff'], 
        'sysop': ['inactive'],
        'bureaucrat': ['inactive'],
        'contentmod': ['inactive']
};

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

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__actions').prepend( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '15px', 'margin-top' : '5px' } ).show();