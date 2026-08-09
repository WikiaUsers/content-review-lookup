/**
 * CommentsToggle.js
 * Allows the user to toggle comments without opening the editor.
 * @summary Quick comments toggle.
 * @see https://dev.fandom.com/wiki/CommentsToggle
 * @author Magiczocker
 */

( () => {
	'use strict';
	const config = mw.config.get( [
		'wgRestrictionComment',
		'wgPageName',
		'wgUserGroups'
	] );

	if (
		window.commentsToggleLoaded ||
		!/threadmoderator|sysop|soap|wiki-specialist|staff/.test( config.wgUserGroups.join() )
	) return;
	window.commentsToggleLoaded = true;

	const commentArea = document.getElementById( 'articleComments' ),
		out = document.createElement( 'span' );

	if ( !commentArea ) return;

	out.innerHTML =
		`<input type="checkbox" id="commentToggle" class="wds-toggle__input" checked>
		<label for="commentToggle" class="wds-toggle__label"></label>`;
	const buttonInput = out.querySelector( '.wds-toggle__input' ),
		buttonLabel = out.querySelector( '.wds-toggle__label' );

	/**
	 * Toggle comment protection.
	 */
	function protect() {
		const api = new mw.Api();
		buttonInput.disabled = true;
		api.get( {
			action: 'query',
			format: 'json',
			prop: 'info',
			titles: config.wgPageName,
			formatversion: 2,
			inprop: 'protection'
		} ).done( ( data ) => {
			const protections = [],
				expiry = [];

			data.query.pages[0].protection.forEach( ( protection ) => {
				if ( protection.type !== 'comment' ) {
					protections.push( `${ protection.type }=${ protection.level }` );
					expiry.push( protection.expiry );
				}
			} );

			if ( !buttonInput.checked ) {
				protections.push( 'comment=sysop' );
				expiry.push( 'infinite' );
			}

			api.postWithEditToken( {
				action: 'protect',
				format: 'json',
				title: config.wgPageName,
				protections: protections.join( '|' ),
				expiry: expiry.join( '|' ),
				reason: `${ buttonInput.checked ? 'Enabled' : 'Disabled' } comments using [[w:c:dev:CommentsToggle|CommentsToggle]].`,
				formatversion: 2
			} ).done( () => {
				location.reload();
			} );
		} );
	}

	/**
	 * Initializes the script.
	 * @param {object} i18n - Messages from I18n-js dev script.
	 */
	function init(i18n) {
		buttonInput.addEventListener( 'change', () => {
			mw.loader.using( 'mediawiki.api' ).then( protect );
		} );
		if ( config.wgRestrictionComment.length ) buttonInput.checked = false;

		buttonLabel.textContent = i18n.msg('buttonText').plain();

		commentArea.before( out );
	}

	mw.hook( 'dev.i18n' ).add( ( i18n ) => {
		i18n.loadMessages( 'CommentsToggle' ).done( init );
	} );

	window.importArticle( {
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	} );
} )();