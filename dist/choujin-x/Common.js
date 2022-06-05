window.DiscordBannerSettings = {    bannerStyle: '3',    inviteLink: 'MhnDg6y9xs',    prependToRail: true };

/* User profile header custom tags */
// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Sinker',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Beast',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'MOD',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Choujin',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Fair Oni',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Choujin',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'New user'
        },
        inactive: {
            u: 'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Bloacked'
        },
    },
    modules: {
        stopblocked: false,
        inactive: 35,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'rollback',
            'user',
            'autoconfirmed-user',
            'bot',
            'bot-global',
            'blocked',
            'nonuser'
        ],
        autoconfirmed: true,
        newuser: true,
        metafilter: {
            'content-moderator': ['bureaucrat'],
            rollback: [
                'bureaucrat',
                'content-moderator'
            ],
            threadmoderator: ['content-moderator'],
            user: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
            bot: ['bot-global'],
            newuser: ['inactive'],
            bureaucrat: ['inactive'],
            sysop: ['inactive'],
            founder: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};

/* "Temporary" fix for {{#dpl:execandexit=geturlargs}} by User:MarkusRost */

/* Standard edit summaries
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny - taken from Wookieepedia */
 function fillEditSummaries() {
	if ( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$summaryOptionsList,
			$summaryLabel = $( '#wpSummaryLabel' ),
			lines = data.split( '\n' ),
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
			var editSummary = $( this ).val();
			if ( editSummary !== '' ) {
				$( '#wpSummary' ).val( editSummary );
			}
		} );
		for ( var i = 0; i < lines.length; i++ ) {
			var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
		}
		$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
	} );
}
$(fillEditSummaries);