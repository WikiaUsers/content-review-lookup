// Please use https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript for development.
// Icons cdxIconEye and cdxIconEyeClosed from https://doc.wikimedia.org/codex/latest/icons/all-icons.html

/**
 * HideEmptyTrackingCategories.js
 * Adds a toggle to hide tracking categories if they are empty.
 * @summary Hide empty categories.
 * @see https://dev.fandom.com/wiki/HideEmptyTrackingCategories
 * @author BryghtShadow
 * @author Magiczocker
 */

( ( mw ) => {
	'use strict';

	const table = document.getElementById( 'mw-trackingcategories-table' );

	if ( window.HideEmptyTrackingCategoriesLoaded ||
		!table ||
		mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'TrackingCategories' ) {
		return;
	}
	window.HideEmptyTrackingCategoriesLoaded = true;

	let msg,
		preloads = 2,
		visible = true;

	function update( e ) {
		e.preventDefault();
		const button = e.target;
		visible = !visible;
		button.textContent = msg( visible ? 'labelHide' : 'labelShow' ).plain();
		button.title = msg( visible ? 'titleHide' : 'titleShow' ).plain();
		button.dataset.visible = visible;
	}

	function init() {
		if ( --preloads > 0 ) {
			return;
		}
		const emptyText = mw.msg( 'categorytree-member-num', 0, 0, 0, 0, mw.msg( 'categorytree-num-empty' ) ), // "(empty)"
			disabledText = mw.msg( 'trackingcategories-disabled' ), // "Category is disabled"
			rows = table.querySelectorAll( '.mw-trackingcategories-name' ),
			button = document.createElement( 'button' );

		rows.forEach( ( row ) => {
			const span = row.querySelector( 'span' );
			if ( row.textContent === disabledText ||
				span && span.textContent === emptyText ) {
				row.parentNode.classList.add( 'empty-category' );
			}
		} );

		button.textContent = msg( 'labelHide' ).plain();
		button.title = msg( 'titleHide' );
		button.className = 'cdx-button HETC';
		button.dataset.visible = visible;
		button.style.cursor = 'pointer';
		button.addEventListener( 'click', update );

		table.before( button );

		mw.loader.addStyleTag( `
			.HETC[data-visible="false"] ~ table .empty-category {
				display: none;
			}
			.HETC[data-visible="true"]:before {
				mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg%3E%3Cpath d='M10 14.5a4.5 4.5 0 114.5-4.5 4.5 4.5 0 01-4.5 4.5M10 3C3 3 0 10 0 10s3 7 10 7 10-7 10-7-3-7-10-7'%3E%3C/path%3E%3Ccircle cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");
			}
			.HETC[data-visible="false"]:before {
				mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg%3E%3Cpath d='M12.49 9.94A2.5 2.5 0 0010 7.5z'%3E%3C/path%3E%3Cpath d='M8.2 5.9a4.4 4.4 0 011.8-.4 4.5 4.5 0 014.5 4.5 4.3 4.3 0 01-.29 1.55L17 14.14A14 14 0 0020 10s-3-7-10-7a9.6 9.6 0 00-4 .85zM2 2 1 3l2.55 2.4A13.9 13.9 0 000 10s3 7 10 7a9.7 9.7 0 004.64-1.16L18 19l1-1zm8 12.5A4.5 4.5 0 015.5 10a4.45 4.45 0 01.6-2.2l1.53 1.44a2.5 2.5 0 00-.13.76 2.49 2.49 0 003.41 2.32l1.54 1.45a4.47 4.47 0 01-2.45.73'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
			}
			.HETC:before {
				background-color: var(--theme-accent-label-color);
				content: '';
				display: inline-block;
				height: 1.25rem;
				margin-right: 4px;
				mask-size: 1.25rem;
				vertical-align: bottom;
				width: 1.25rem;
			}` );
	}

	mw.loader.using( 'mediawiki.api' ).then( () => {
		new mw.Api().loadMessagesIfMissing( [
			'categorytree-member-num',
			'categorytree-num-empty',
			'trackingcategories-disabled'
		] ).then( init );
	} );
	mw.hook( 'dev.i18n' ).add( ( i18n ) => {
		i18n.loadMessages( 'HideEmptyTrackingCategories' ).done( ( i18no ) => {
			msg = i18no.msg;
			init();
		} );
	} );
	mw.loader.load( 'https://dev.fandom.com/load.php?articles=MediaWiki:I18n-js/code.js&only=scripts&mode=articles' );
} )( window.mediaWiki );