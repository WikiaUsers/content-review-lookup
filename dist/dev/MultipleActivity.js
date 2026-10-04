( function () {
	'use strict';

	const nkch = window.nkch || ( window.nkch = {} );
	
	if ( nkch.ma && nkch.ma.isActive ) return;
	
	nkch.ma = { isActive: true };

	const TITLE = 'MultipleActivity';
	const TITLE_SHORT = 'MA';
	
	const SERVER = mw.config.get( 'wgServer' );
	const SCRIPT_PATH = mw.config.get( 'wgScriptPath' );
	const LANG = mw.config.get( 'wgContentLanguage' );
	const LIMIT = 100;

	const FORMATOPTIONS_DAY = { year: 'numeric', month: 'long', day: 'numeric' };
	const FORMATOPTIONS_FULL = Object.assign( { hour: 'numeric', minute: 'numeric', second: 'numeric' }, FORMATOPTIONS_DAY );

	const CSS = `
		.nkch-ma__content { min-height: 500px; }
		.nkch-ma__content.is-loading { animation: anim-ma__loading 2s ease infinite; background-color: var(--theme-page-background-color--secondary); border-radius: 3px; }
		@keyframes anim-ma__loading { 0% { opacity: 1; } 50% { opacity: .4; } 100% { opacity: 1; } }

		ul.nkch-ma__list { display: flex; flex-direction: column; gap: 10px; list-style: none; margin: 0; }
		.nkch-ma-entry { background-color: var(--theme-page-text-mix-color-95); border: 1px solid var(--theme-border-color); border-radius: 3px; display: flex; min-height: 50px; width: 100%; }
		.nkch-ma-entry__aside { padding: 10px; max-height: 100%; width: 50px; }
		.nkch-ma-entry__main { flex: 1; padding-block: 10px; padding-inline-end: 10px; }
		.nkch-ma-entry__icon { align-items: center; background: black; border-radius: 50%; color: white; display: flex; height: 30px; justify-content: center; width: 30px; }
		.nkch-ma-entry__icon .wds-icon { height: 14px; }
		.nkch-ma-entry__header { display: flex; }
		.nkch-ma-entry__title { flex: 1; }
		.nkch-ma-entry__heading { align-items: center; display: flex; font-size: 18px; font-weight: bold; line-height: 30px; }
		.nkch-ma-entry__size, .nkch-ma-entry__time { cursor: help; }
		.nkch-ma-entry__details { border-top: 1px solid var(--theme-border-color); margin-top: 10px; padding-top: 10px; }

		ul.nkch-ma-entry-poll { display: flex; flex-direction: column; gap: 5px; list-style: none; margin: 0; }
		.nkch-ma-entry-poll__answer { align-items: center; background-color: var(--theme-page-background-color); border: 1px solid var(--theme-border-color); border-radius: 3px; display: flex; justify-content: space-between; height: 36px; overflow: hidden; position: relative; }
		.nkch-ma-entry-poll__bar { background: var(--theme-link-color); height: 100%; position: absolute; transition: 1s; }
		.nkch-ma-entry-poll__text, .nkch-ma-entry-poll__votes { background-color: rgba(var(--theme-page-background-color--rgb), .5); border-radius: 3px; display: inline-block; font-size: 14px; line-height: 14px; margin: 5px; padding: 5px 10px; position: relative; }

		.nkch-ma-entry-post-images { display: flex; flex-wrap: wrap; gap: 10px; }
		.nkch-ma-entry-post-images__image { align-items: center; border-radius: 3px; display: flex; justify-content: center; overflow: hidden; }
		.nkch-ma-entry-post-images__image:hover, .nkch-ma-entry-post-images__image:active, .nkch-ma-entry-post-images__image:focus { text-decoration: none; }
		.nkch-ma-entry-post-images__src { max-height: 100px; max-width: 130px; }
		.nkch-ma-entry-post-images__more { background-size: cover; height: 100px; width: 130px; }
		.nkch-ma-entry-post-images__indicator { align-items: center; background-color: #1115; backdrop-filter: blur(10px); color: white; display: flex; font-size: 20px; font-weight: bold; justify-content: center; height: 100%; width: 100%; }

		.nkch-ma-entry__size--add { color: var(--theme-success-color); }
		.nkch-ma-entry__size--remove { color: var(--theme-alert-color); }
		.nkch-ma-entry__size--no-change { color: gray; }

		.nkch-ma-entry__icon--edit { background-color: #0094FF; }
		.nkch-ma-entry__icon--new { background-color: limegreen; }
		.nkch-ma-entry__icon--delete { background-color: red; }
		.nkch-ma-entry__icon--restore { background-color: green; }
		.nkch-ma-entry__icon--protect, .nkch-ma-entry__icon--unprotect { background-color: #313131; }
		.nkch-ma-entry__icon--move { background-color: blue; }
		.nkch-ma-entry__icon--block { background-color: darkorange; }
		.nkch-ma-entry__icon--unblock { background-color: darkcyan; }
		.nkch-ma-entry__icon--reblock { background-color: #b34607; }
		.nkch-ma-entry__icon--rights { background-color: darkkhaki; }
		.nkch-ma-entry__icon--import { background-color: #b151a5; }
		.nkch-ma-entry__icon--discussions, .nkch-ma-entry__icon--message-wall, .nkch-ma-entry__icon--article-comment, .nkch-ma-entry__icon--poll, .nkch-ma-entry__icon--quiz { background-color: purple; }
	`;
	const CSS_MOBILE = '.nkch-ma__content { margin-inline: var(--mw-content-text-side-padding); }';

	const pageUrl = ( title ) => mw.util.getUrl( new mw.Title( title ).getPrefixedText() );
	const withParams = ( url, params ) => `${ url }?${ new URLSearchParams( params ) }`;
	const userLink = ( user ) => mw.util.isIPAddress( user ) ? new mw.Title( 'Contributions/' + user, -1 ).getPrefixedText() : new mw.Title( user, 2 ).getPrefixedText();
	const userWikilink = ( user ) => `[[${ userLink( user ) }|${ user }]]`;

	function ago( i18n, date ) {
		const SEC = 1e3, MIN = 6e4, HRS = 36e5, DAY = 864e5;
		const diff = Date.now() - date;
		const show = ( unit, span ) => mw.message( 'timeago-' + unit, Math.round( diff / span ) ).text();
		const [ unit, span ] = diff < MIN ? [ 'second', SEC ] : diff < HRS ? [ 'minute', MIN ] : diff < DAY ? [ 'hour', HRS ] : [ 'day', DAY ];
		let text = show( unit, span );
		
		if ( diff >= 30 * DAY ) {
			const [ u, s ] = diff < 365 * DAY ? [ 'month', 30 * DAY ] : [ 'year', 365 * DAY ];
			text += ` (${ i18n.msg( 'ma-v2-date-about' ).plain() } ${ show( u, s ) })`;
		}
		
		return text;
	}

	function initTooltips( root ) {
		let el;
		
		root.addEventListener( 'mouseover', ( e ) => {
			const target = e.target.closest( '[data-wds-tooltip]' );
			
			if ( !target ) return;
			
			const rect = target.getBoundingClientRect();
			el = el || document.body.appendChild( document.createElement( 'div' ) );
			el.className = 'wds-tooltip is-bottom';
			el.innerHTML = target.dataset.wdsTooltip;
			el.style.left = ( rect.left + rect.width / 2 ) + 'px';
			el.style.top = ( rect.bottom + 6 ) + 'px';
		} );
		
		root.addEventListener( 'mouseout', ( e ) => {
			if ( el && e.target.closest( '[data-wds-tooltip]' ) ) {
				el.remove();
				el = null;
			}
		} );
	}

	const api = {
		changes: () => new mw.Api().get( {
			action: 'query',
			list: 'recentchanges',
			rcprop: 'title|ids|sizes|flags|user|comment|parsedcomment|timestamp|loginfo',
			rctype: 'edit|new|log',
			rcnamespace: '0|1|2|3|4|5|8|9|10|11|14|15|500',
			rcshow: '!bot',
			rclimit: LIMIT,
			format: 'json'
		} ).then( ( data ) => data.query.recentchanges.map( ( c ) => Object.assign( c, { rel: 'change', timestamp: Date.parse( c.timestamp ) } ) ) ),

		posts: () => $.ajax( {
			url: mw.util.wikiScript( 'wikia' ),
			data: { controller: 'DiscussionPost', method: 'getPosts', viewableOnly: true, sortKey: 'creation_date', limit: LIMIT, format: 'json' }
		} ).then( ( data ) => ( ( data._embedded && data._embedded[ 'doc:posts' ] ) || [] )
			.map( ( p ) => Object.assign( p, { rel: 'post', timestamp: p.creationDate.epochSecond * 1000 } ) ) ),

		articleNames: ( ids ) => ids.length
			? $.ajax( {
				url: mw.util.wikiScript( 'wikia' ),
				data: { controller: 'FeedsAndPosts', method: 'getArticleNamesAndUsernames', stablePageIds: ids.join( ',' ), format: 'json' }
			} ).then( ( data ) => ( data && data.articleNames ) || {} )
			: Promise.resolve( {} )
	};

	const LOG_TYPES = {
		delete: 'delete', delete_redir: 'delete', restore: 'restore', protect: 'protect', move_prot: 'protect', unprotect: 'unprotect',
		move: 'move', move_redir: 'move', block: 'block', unblock: 'unblock', reblock: 'reblock', rights: 'rights', upload: 'import'
	};
	const LOG_ICONS = {
		delete: 'trash-small', restore: 'trash-open-small', protect: 'flag-small', unprotect: 'flag-small', move: 'move-small',
		block: 'lock-small', unblock: 'unlock-small', reblock: 'lock-small', rights: 'users-small', import: 'download-small'
	};

	function segments( node ) {
		if ( node.type === 'text' ) {
			const mark = node.marks && node.marks[ 0 ] && node.marks[ 0 ].type;
			
			return [ [ node.text, mark === 'strong' || mark === 'em' ? mark : '' ] ];
		}
		
		const inner = ( node.content || [] ).flatMap( segments );
		
		return node.type === 'paragraph' || node.type === 'code_block' ? inner.concat( [ [ ' ', '' ] ] ) : inner;
	}

	function excerpt( jsonModel ) {
		let left = 250;
		let html = '';

		const stuff = JSON.parse( jsonModel ).content.filter(
			( n ) => [ 'paragraph', 'code_block', 'bulletList', 'orderedList' ].includes( n.type )
		).flatMap( segments );
		
		for ( const [ text, mark ] of stuff ) {
			if ( left > 0 ) {
				const t = mw.html.escape( text.slice( 0, left ) );
				html += mark ? `<${ mark }>${ t }</${ mark }>` : t;
			}
			
			left -= text.length;
		}
		
		return left < 0 ? html + '...' : html;
	}

	function createNormalizer( i18n, icon, commentArticles ) {
		const msg = ( key, ...args ) => i18n.msg( key, ...args );
		const label = ( key ) => msg( key ).escape();
		const row = ( key, html ) => html ? `<b>${ label( key ) }</b>: ${ html }` : '';
		const rows = ( ...items ) => {
			const html = items.filter( Boolean ).join( '<br>' );
			
			return html ? { html } : null;
		};
		const view = ( url ) => ` (<a href='${ url }'>${ label( 'ma-v2-view' ) }</a>)`;

		const rightsList = ( list ) => Array.isArray( list ) && list.length
			? list.map( ( g ) => {
				const expiry = g.expiry === 'infinity' ? g.expiry : new Date( g.expiry ).toLocaleString( LANG, FORMATOPTIONS_FULL );
				
				return `<b>${ mw.html.escape( g.group ) }</b> (→ ${ mw.html.escape( expiry ) })`;
			} ).join( ' ' )
			: label( 'ma-v2-details-rights-none' );

		const LOG_EXTRAS = {
			protect: ( p ) => [ row( 'ma-v2-details-params', p.description && mw.html.escape( p.description ) ) ],
			move: ( p ) => [ row( 'ma-v2-details-new-name', p.target_title && mw.html.escape( p.target_title ) ) ],
			block: ( p ) => [ row( 'ma-v2-details-duration', p.duration && mw.html.escape( p.duration ) ) ],
			rights: ( p ) => [
				p.oldmetadata !== undefined && row( 'ma-v2-details-rights-old', rightsList( p.oldmetadata ) ),
				p.newmetadata !== undefined && row( 'ma-v2-details-rights-new', rightsList( p.newmetadata ) )
			]
		};
		LOG_EXTRAS.reblock = LOG_EXTRAS.block;

		function editOrNew( item, vm ) {
			const url = pageUrl( item.title );
			vm.type = item.type;
			vm.icon = item.type === 'edit' ? 'pencil-small' : 'add-small';
			vm.heading = { text: item.title, href: url };
			vm.subtitleHtml = msg( 'ma-v2-type-' + item.type, userWikilink( item.user ) ).parse();
			vm.details = rows( row( 'ma-v2-details-summary', item.parsedcomment ) );
			
			if ( item.type !== 'edit' ) return;

			vm.subtitleHtml += ` (<a href='${ withParams( url, { diff: item.revid } ) }'>${ label( 'ma-v2-diff' ) }</a>)`;
			const diff = item.newlen - item.oldlen;
			vm.size = {
				text: ( diff > 0 ? '+' : '' ) + diff.toLocaleString(),
				cls: diff < 0 ? 'remove' : diff > 0 ? 'add' : 'no-change',
				tooltip: `${ label( 'ma-v2-before' ) }: <b>${ item.oldlen.toLocaleString() }</b>; ${ label( 'ma-v2-after' ) }: <b>${ item.newlen.toLocaleString() }</b>`
			};
		}

		function log( item, vm ) {
			if ( !item.logaction ) return;

			const type = LOG_TYPES[ item.logaction ];
			const params = item.logparams || {};
			vm.heading = { text: item.title, href: pageUrl( item.title ) };

			if ( !type ) {
				vm.type = 'unknown';
				vm.subtitleHtml = msg(
					'ma-v2-type-unknown',
					userWikilink( item.user ),
					`<b>action</b>: <i>${ mw.html.escape( item.logaction ) }</i>; <b>type</b>: <i>${ mw.html.escape( item.logtype || '' ) }</i>`
				).parse();
				vm.details = rows( row( 'ma-v2-details-summary', mw.html.escape( item.comment || '' ) ) );

				return;
			}

			vm.type = type;
			vm.icon = LOG_ICONS[ type ];
			vm.subtitleHtml = msg( 'ma-v2-type-' + type, userWikilink( item.user ) ).parse();
			vm.details = rows( row( 'ma-v2-details-reason', item.parsedcomment ), ...( LOG_EXTRAS[ type ] ? LOG_EXTRAS[ type ]( params ) : [] ) );
		}

		function post( item, vm ) {
			const thread = item._embedded.thread[ 0 ];
			const who = userWikilink( item.createdBy.name !== null ? item.createdBy.name : item.creatorIp.replace( '/', '' ) );

			const setBody = () => {
				let text = '';
				
				try { text = item.jsonModel ? excerpt( item.jsonModel ).trim() : ''; }
				catch ( e ) {}
				
				const images = ( ( item._embedded && item._embedded.contentImages ) || [] )
					.filter( ( img ) => img.mediaType == null || [ 'image/png', 'image/jpeg', 'image/gif' ].includes( img.mediaType ) );
				const html = row( 'ma-v2-details-text', text );
				
				if ( html || images.length )
					vm.details = { html, images: images.length ? images.slice( 0, 5 ) : null, more: images.length - 4 };
			};

			if ( thread.containerType === 'FORUM' ) {
				const url = `${ SCRIPT_PATH }/f/p/${ item.threadId }`;
				const forum = `[${ SERVER }${ SCRIPT_PATH }/f?catId=${ item.forumId } ${ item.forumName }]`;
				const kind = item.funnel === 'POLL' ? 'poll' : item.funnel === 'QUIZ' ? 'quiz' : 'discussions';
				const key = { poll: 'forum-poll', quiz: 'forum-quiz' }[ kind ] || ( item.isReply ? 'forum-reply' : 'forum-new' );
				vm.type = kind;
				vm.icon = kind + '-small';
				vm.heading = { text: thread.title, href: url };
				vm.subtitleHtml = msg( 'ma-v2-type-' + key, who, forum ).parse() + view( url + ( kind === 'discussions' && item.isReply ? '/r/' + item.id : '' ) );

				if ( kind === 'discussions' ) setBody();
				else if ( kind === 'poll' && item.poll ) {
					const showVotes = !!( item.poll.userVotes && item.poll.userVotes.length );
					vm.details = { poll: item.poll.answers.map( ( a ) => ( {
						text: a.text,
						votes: showVotes ? a.votes : null,
						width: showVotes && item.poll.totalVotes ? Math.round( a.votes / item.poll.totalVotes * 100 ) + '%' : null
					} ) ) };
				}
			} else if ( thread.containerType === 'WALL' ) {
				const wall = item.forumName.slice( 0, -' Message Wall'.length );
				const wallTitle = new mw.Title( wall, 1200 ).getPrefixedText();
				const wallUrl = withParams( mw.util.getUrl( wallTitle ), { threadId: item.threadId } );
				const fullUrl = wallUrl + ( item.isReply ? '#' + item.id : '' );
				const wallLink = `[[${ wallTitle }|${ msg( 'ma-v2-message-wall', wall.replace( /_/g, ' ' ) ).plain() }]]`;
				vm.type = 'message-wall';
				vm.icon = 'envelope-small';
				vm.heading = { text: thread.title, href: wallUrl };
				vm.subtitleHtml = msg( 'ma-v2-type-wall-' + ( item.isReply ? 'reply' : 'new' ), who, wallLink ).parse() + view( fullUrl );
				setBody();
			} else if ( thread.containerType === 'ARTICLE_COMMENT' ) {
				const article = commentArticles[ item.forumId ];
				vm.type = 'article-comment';
				vm.icon = 'comment-small';
				vm.subtitleHtml = msg( 'ma-v2-type-comment', who ).parse();
				
				if ( article ) {
					vm.heading = { text: article.title, href: article.relativeUrl };
					vm.subtitleHtml += view( withParams( article.relativeUrl, item.isReply ? { commentId: item.threadId, replyId: item.id } : { commentId: item.threadId } ) );
				}
				
				setBody();
			} else {
				vm.heading = { text: thread.title, href: null };
			}
		}

		return ( item ) => {
			const vm = {
				key: `${ item.rel }:${ item.rcid || item.id || item.threadId || item.timestamp }`,
				rel: item.rel,
				type: null,
				icon: 'question-small',
				heading: { text: '', href: null },
				subtitleHtml: '',
				size: null,
				details: null
			};

			if ( item.rel === 'post' ) post( item, vm );
			else if ( item.type === 'log' ) log( item, vm );
			else editOrNew( item, vm );

			vm.iconHtml = icon( vm.icon );

			const date = new Date( item.timestamp );
			vm.day = date.toLocaleDateString( LANG, FORMATOPTIONS_DAY );
			vm.timeAgo = ago( i18n, date );
			vm.timeIso = date.toISOString();
			vm.timeTooltip = date.toLocaleString( LANG, Object.assign( { weekday: 'long' }, FORMATOPTIONS_FULL ) );
			
			return vm;
		};
	}

	function createTimeline() {
		const Entry = {
			props: [ 'vm' ],
			template: `
				<li class="nkch-ma-entry" :class="[ 'nkch-ma-entry--' + vm.rel, vm.type && 'nkch-ma-entry--' + vm.type ]">
					<div class="nkch-ma-entry__aside">
						<div :class="'nkch-ma-entry__icon nkch-ma-entry__icon--' + (vm.type || 'unknown')" v-html="vm.iconHtml"></div>
					</div>
					<div class="nkch-ma-entry__main">
						<div class="nkch-ma-entry__header">
							<div class="nkch-ma-entry__title">
								<div class="nkch-ma-entry__heading">
									<a class="nkch-ma-entry__heading-link" :href="vm.heading.href">{{ vm.heading.text }}</a>
								</div>
							</div>
						</div>
						<div class="nkch-ma-entry__subtitle" v-html="vm.subtitleHtml"></div>
						<div class="nkch-ma-entry__date-and-size">
							<template v-if="vm.size">
								<span class="nkch-ma-entry__size" :class="'nkch-ma-entry__size--' + vm.size.cls" :data-wds-tooltip="vm.size.tooltip">{{ vm.size.text }}</span>
								<span> • </span>
							</template>
							<time class="nkch-ma-entry__time" :datetime="vm.timeIso" :data-wds-tooltip="vm.timeTooltip">{{ vm.timeAgo }}</time>
						</div>
						<div v-if="vm.details" class="nkch-ma-entry__details">
							<div v-if="vm.details.html" v-html="vm.details.html"></div>
							<ul v-if="vm.details.poll" class="nkch-ma-entry-poll">
								<li v-for="(a, i) in vm.details.poll" :key="i" class="nkch-ma-entry-poll__answer">
									<div class="nkch-ma-entry-poll__bar" :style="{ width: a.width }"></div>
									<div class="nkch-ma-entry-poll__text">{{ a.text }}</div>
									<div class="nkch-ma-entry-poll__votes" v-if="a.votes !== null">{{ a.votes }}</div>
								</li>
							</ul>
							<div v-if="vm.details.images" class="nkch-ma-entry-post-images">
								<a v-for="(img, i) in vm.details.images" :key="i" class="nkch-ma-entry-post-images__image" :href="img.url">
									<img v-if="i < 4" class="nkch-ma-entry-post-images__src" :src="img.url">
									<div v-else class="nkch-ma-entry-post-images__more" :style="{ backgroundImage: 'url(' + img.url + ')' }">
										<div class="nkch-ma-entry-post-images__indicator">+{{ vm.details.more }}</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</li>
			`
		};

		return {
			props: [ 'entries' ],
			components: { 'ma-entry': Entry },
			template: `
				<ul class="nkch-ma__list">
					<template v-for="(e, i) in entries" :key="e.key">
						<h3 v-if="i && e.day !== entries[ i - 1 ].day" class="nkch-ma__list-separator">{{ e.day }}</h3>
						<ma-entry :vm="e"></ma-entry>
					</template>
				</ul>
			`
		};
	}

	function render( i18n, wds, content ) {
		const { createApp, markRaw } = mw.loader.require( 'vue' );
		const icon = ( name ) => {
			const [ el ] = $( wds.icon( name ) );
			
			return el ? el.outerHTML : '';
		};

		Promise.all( [
			api.changes(),
			api.posts().catch( ( err ) => {
				mw.log.error( '[nkch.ma] discussions unavailable', err );
				
				return [];
			} )
		] ).then( ( [ changes, posts ] ) => {
			const raw = changes.concat( posts ).sort( ( a, b ) => b.timestamp - a.timestamp ).slice( 0, LIMIT );
			const commentForumIds = new Set( raw
				.filter( ( it ) => it.rel === 'post' && it._embedded.thread[ 0 ].containerType === 'ARTICLE_COMMENT' )
				.map( ( it ) => it.forumId ) );
				
			return api.articleNames( [ ...commentForumIds ] ).then( ( names ) => ( { raw, names } ) );
		} ).then( ( { raw, names } ) => {
			const normalize = createNormalizer( i18n, icon, names );
			content.classList.remove( 'is-loading' );
			createApp( createTimeline(), { entries: markRaw( raw.map( normalize ) ) } ).mount( content );
			initTooltips( content );
		} ).catch( ( err ) => {
			content.classList.remove( 'is-loading' );
			content.textContent = 'MultipleActivity: ' + ( ( err && err.message ) || 'failed to load' );
			mw.log.error( '[nkch.ma]', err );
		} );
	}

	function init( i18n, wds ) {
		const skin = mw.config.get( 'skin' );
		const mobile = skin === 'fandommobile';
		
		if ( !mobile && skin !== 'fandomdesktop' ) return;

		document.title = mw.message( 'fandom-pagetitle', TITLE ).text();
		let content;
		
		if ( mobile ) {
			mw.util.addCSS( CSS_MOBILE );
			document.querySelector( '.wiki-page-header__title' ).textContent = TITLE;
			const article = document.querySelector( '.article-content' );
			article.classList.add( 'nkch-ma' );
			article.innerHTML = '';
			content = article.appendChild( document.createElement( 'div' ) );
		} else {
			document.querySelector( '#firstHeading' ).textContent = TITLE;
			document.querySelector( '.page' ).classList.add( 'nkch-ma' );
			document.querySelector( '.page__main' ).classList.add( 'nkch-ma__main' );
			content = document.querySelector( '#content' );
			content.innerHTML = '';
		}
		
		content.classList.add( 'nkch-ma__content', 'is-loading' );
		render( i18n, wds, content );
	}
	
	if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && [ TITLE, TITLE_SHORT ].some( ( text ) => text.toLowerCase() === mw.config.get( 'wgTitle' ).toLowerCase() ) ) {
		mw.loader.using( [ 'vue', 'mediawiki.api', 'mediawiki.util', 'mediawiki.Title' ] ).then( () => {
			if ( mw.config.get( 'wgTitle' ) !== TITLE )
				history.replaceState( null, '', mw.util.getUrl( new mw.Title( TITLE, -1 ).getPrefixedText() ) + location.search );
			
			mw.util.addCSS( CSS );

			return new mw.Api().loadMessagesIfMissing( [
				'fandom-pagetitle', 'timeago-second', 'timeago-minute', 'timeago-hour', 'timeago-day', 'timeago-month', 'timeago-year'
			] );
		} ).then( () => {
			mw.hook( 'dev.i18n' ).add( ( i18n ) => i18n.loadMessages( TITLE ).done( ( i18n ) => {
				mw.hook( 'dev.wds' ).add( ( wds ) => init( i18n, wds ) );
			} ) );
		} );
	}

	importArticles( {
		type: 'script',
		articles: [ 'u:dev:MediaWiki:I18n-js/code.js', 'u:dev:MediaWiki:WDSIcons/code.js' ]
	} );
} )();