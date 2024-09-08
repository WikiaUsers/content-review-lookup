//===========================================================================
//
// Source: http://hu.wikipedia.org/wiki/MediaWiki:Gadget-bkl-check.js
//
// Markiert Links auf Begriffsklärungsseiten mit der CSS-Klasse 'bkl-link',
// sowohl in der normalen Artikelansicht als auch in der Vorschau
//===========================================================================
 
window.bklCheck = {
	cat : {
		'Catégorie:Homonymie' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (Lien vers une homonymie à corriger)', /*En infobulle quand on met la souris sur le lien*/
			htmlAppend  : '' } /*c'était: '<sup class="bkl-link-sup">EÉ</sup>'*/
/* catégories qui n'existent pas chez nous
,
		'Catégorie:Wikipedia:Falschschreibung' : {
			className   : 'bkl-link bkl-link-inner',
			titleAppend : ' (Falschschreibung)',
			htmlAppend  : '<sup class="bkl-link-sup">FS</sup>'},
		'Catégorie:Wikipedia:Obsolete Schreibung' : {
			className   : 'bkl-link bkl-link-inner',
			titleAppend : ' (Obsolete Schreibung)',
			htmlAppend  : '<sup class="bkl-link-sup">OS</sup>'}
*/
	},
 
	queryUrlView      : mw.config.get('wgServer') + mw.config.get('wgScriptPath')
		+ '/api.php?action=query&format=json'
		+ '&prop=categories&pageids=' + mw.config.get('wgArticleId')
		+ '&callback=window.bklCheck.viewResultArrived'
		+ '&generator=links&redirects&gpllimit=max&gplnamespace=0&cllimit=max&indexpageids'
		+ '&nocache=' + mw.config.get('wgCurRevisionId'), //Break client caching, when page has been edited
	queryUrlPreview   : mw.config.get('wgServer') + mw.config.get('wgScriptPath')
		+ '/api.php?action=query&format=json&prop=categories'
		+ '&cllimit=max&redirects&indexpageids',
	titles            : {},
	count             : 0,
	previewQueryCount : 0,
 
	execute : function () {
		if ( window.bklCheckOnlyCheckMainNS && mw.config.get('wgNamespaceNumber') != 0 ) return;

		if (window.bklCheck_customCats) {
			$.extend(bklCheck.cat, bklCheck_customCats);
		}

		//Use &clcategories to reduce needed queries
		var cats = [];
		for ( var name in bklCheck.cat ) if ( bklCheck.cat[name].className )
			cats.push( encodeURIComponent( name ) );
		bklCheck.queryUrlView += '&clcategories=' + cats.join( '|' );
		bklCheck.queryUrlPreview += '&clcategories=' + cats.join( '|' );
 
		var wgAction = mw.config.get('wgAction');
		if ( wgAction == 'submit' )	bklCheck.doPreviewQueries();
		else if ( wgAction == 'view' || wgAction == 'historysubmit' || wgAction == 'purge' )
			mw.loader.load( bklCheck.queryUrlView );
		else {//"Show preview on first edit" enabled?
			var prev = document.getElementById( 'wikiPreview' );
			if ( prev && prev.firstChild )
				mw.loader.load( bklCheck.queryUrlView );
		}
		//Make sure that our style is put before other css so users can override it easily
		var head = document.getElementsByTagName( 'head' )[0];
		head.insertBefore( appendCSS( '.bkl-link {background-color:#ffe8e8;}' ), head.firstChild );
	},
 
	storeTitles : function ( res ) {
		if ( !res || !res.query || !res.query.pageids ) return;
		var q = res.query;
		var redirects = {};
		for ( var i = 0; q.redirects && i < q.redirects.length; i++ ) {
			var r = q.redirects[i];
			if ( !redirects[r.to] ) redirects[r.to] = [];
			redirects[r.to].push( r.from );
		}
		for ( var i = 0; i < q.pageids.length; i++ ) {
			var page = q.pages[q.pageids[i]];
			if ( page.missing === '' || page.ns !== 0 || !page.categories ) continue;
			for ( var j = 0; j < page.categories.length; j++ ) {
				var cat = bklCheck.cat[page.categories[j].title];
				if ( !cat ) continue;
				bklCheck.count++;
				bklCheck.titles[page.title] = cat;
				if ( !redirects[page.title] ) break;
				for ( var k = 0; k < redirects[page.title].length; k++ )
					bklCheck.titles[redirects[page.title][k]] = cat;
				break;
			}
		}
	},
 
	markLinks : function () {
		if ( !bklCheck.count ) return;
		var links = bklCheck.getLinks( 'wikiPreview' ) || bklCheck.getLinks( 'bodyContent' )
				|| bklCheck.getLinks( 'mw_contentholder' ) || bklCheck.getLinks( 'article' );
		if ( !links ) return;
		for ( var i = 0; i < links.length; i++ ) {
			if ( links[i].className == 'image' || links[i].className.indexOf('external') != -1 ) continue; // Don't mess with images or external links!
			var title = links[i].title || ( links[i].childNodes[0] && links[i].childNodes[0].nodeValue );
			if ( title ) title = title.charAt(0).toUpperCase() + title.slice(1); // make first character uppercase
			var cat = bklCheck.titles[title];
			if ( !cat ) continue;
			links[i].innerHTML = '<span class="' + cat.className + '" title="' +
				escapeQuotes(title + cat.titleAppend) + '">' + links[i].innerHTML + cat.htmlAppend + '</span>';
		}
	},
 
	viewResultArrived : function ( res ) {
		bklCheck.storeTitles( res );
		if ( res && res['query-continue'] ) {
			var c = res['query-continue'];
			if ( c.categories ) {
				mw.loader.load( bklCheck.queryUrlView + '&clcontinue='
					+ encodeURIComponent( c.categories.clcontinue ) );
			} else if ( c.links ) {
				bklCheck.queryUrlView = bklCheck.queryUrlView.replace( /&gplcontinue=.*|$/,
					'&gplcontinue=' + encodeURIComponent( c.links.gplcontinue ) );
				mw.loader.load( bklCheck.queryUrlView );
			}
		} else bklCheck.markLinks();
	},
 
	PreviewQuery : function ( titles ) {
		bklCheck.previewQueryCount++;
		//We have to keep the titles in memory in case we get a query-continue
		this.data = 'titles=' + titles.join( '|' );		
		this.doQuery( bklCheck.queryUrlPreview );
	},
 
	doPreviewQueries : function () {
		var links = bklCheck.getLinks( 'wikiPreview' );
		if ( !links ) return;
		var titles=[]; var m;
		var unique = {};
		var rxEscape = function(s) {return s.replace( /([\/\.\*\+\?\|\(\)\[\]\{\}\\])/g, '\\$1' );};
		var siteRegex = new RegExp( rxEscape( mw.config.get('wgServer') )
			+ rxEscape( mw.config.get('wgArticlePath').replace( /\$1/, '' ) ) + '([^#]*)' );
		//We only care for main ns pages, so we can filter out the most common cases to save some requests
		var namespaceRegex = /^(Discussion_(utilisateur|wikipédia|fichier|MediaWiki|modèle|aide|catégorie|Portail|Projet)?|Sp[ée]cial|Discussion):/i;
		for ( var i = 0; i < links.length; i++ ) {
			if ( !( m = links[i].href.match( siteRegex ) )
				|| m[1].match( namespaceRegex ) || unique[m[1]] ) continue;
			unique[m[1]] = true; //Avoid requesting same title multiple times
			titles.push( m[1].replace( /_/g, '%20' ) ); //Avoid normalization of titles
			if ( titles.length < 50 ) continue;
			new bklCheck.PreviewQuery( titles );
			titles=[];
		}
		if ( titles.length ) new bklCheck.PreviewQuery( titles );
	},
 
	getLinks : function ( id ) {
		var el = document.getElementById( id );
		return el && el.getElementsByTagName( 'a' );
	}
};
 
bklCheck.PreviewQuery.prototype.doQuery = function ( url ) {
	var q = this;
	var req = sajax_init_object();
	if ( !req ) return;
	req.open( 'POST', url, true );
	req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
	req.onreadystatechange = function () {
		if ( req.readyState == 4 && req.status == 200 )
			eval( 'q.resultArrived(' + req.responseText + ');' );
	};
	req.send( q.data );
	delete req;
};
 
bklCheck.PreviewQuery.prototype.resultArrived = function ( res ) {
	bklCheck.storeTitles( res );
	if ( res && res['query-continue'] && res['query-continue'].categories ) {
		this.doQuery( bklCheck.queryUrlPreview + '&clcontinue='
			+ encodeURIComponent( res['query-continue'].categories.clcontinue ) );
	} else bklCheck.previewQueryCount--;
	if ( !bklCheck.previewQueryCount ) bklCheck.markLinks();
};
 
 
//Sauf espace de nom spécial et seulement pour utilisateurs connectés
if ( mw.config.get('wgNamespaceNumber') >= 0 && mw.config.get('wgUserName') !== null )
	$(document).ready(bklCheck.execute);