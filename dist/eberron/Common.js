/* Any JavaScript here will be loaded for all users on every page load. */

/* "Temporary" fix for {{#dpl:execandexit=geturlargs}} */
/* Credit and thanks go to MarkusRost */
$( function() {
	/* Make the confirmation on action=purge keep DPL arguments */
	if ( mw.config.get('wgAction') === 'purge' ) {
	     var purgeForm = $('#mw-content-text form.mw-htmlform');
	     var purgeParams = purgeForm.find('input[name="redirectparams"]').val().split('&').filter( function (param) {
	         return param.startsWith('DPL_');
	     } );
	     if ( purgeParams.length ) {
	         purgeForm.attr('action', purgeForm.attr('action') + '&' + purgeParams.join('&') );
	     }
	 }
	/* Avoid the purge confirmation all together, restoring legacy behaviour until extension is fixed */
	 $('.DPL-purge a.external').on( 'click', function( e ) {
		var $form = $( '<form>' ).attr( {
			method: 'POST',
			action: this.href,
		} ).appendTo( document.body );
		$form.submit();
		e.preventDefault();
	} );
} );

/** Custom tags ****************************************************************
 * 
 * Description: Allows new tags to be added to a user's profile page and allows
 *              modifying existing tags.
 * Source:      Dev wiki (https://dev.fandom.com/wiki/UserTags)
 */
window.UserTagsJS = {
	modules: {},
	tags: {
	    'bureaucrat': { u:'Bureaucrat', link:'Bureaucrat', title:'This user is an Eberron Wiki bureaucrat.' },
	    'sysop':      { u:'Administrator', link: 'Administrator', title:'This user is an Eberron Wiki administrator.' },
	    'content-moderator': { u:'Moderator', link: 'Moderator', title:'This user is an Eberron Wiki content-moderator.' },
	    'templates':  { u:'Templates Guru' },
	    'chiefscribe':{ u:'Chief Scribe' },
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
    'Moviesign' : ['templates'],
    'BadCatMan': ['chiefscribe'],
};

/* Configuring AddRailModule */
window.AddRailModule = [
	{page: 'Template:RailModule', prepend: true},
	'Template:NewPagesModule'
];