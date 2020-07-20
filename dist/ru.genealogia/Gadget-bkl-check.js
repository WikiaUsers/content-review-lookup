//===========================================================================
// Выделить ссылки на страницы разрешения неоднозначностей классом CSS 'bkl-link',
// как в нормальном виде статьи, так и в предпросмотре
//===========================================================================
// v4
if (!window.hide_append_bkl_check_tests) hide_append_bkl_check_tests = 0;

var bklCheck = {
	cat : {
		'Категория:Многозначные термины' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Флаги' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Фильмы' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы, содержащие списки однофамильцев' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Станции метро' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Сельские поселения' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Площади' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Улицы' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Категория:Страницы разрешения неоднозначностей:Населённые пункты' : {
			className   : 'bkl-link bkl-link-inner', //bkl-link-inner kept for b/c reasons
			titleAppend : ' (страница разрешения неоднозначности)',
			htmlAppend  : '<sup class="bkl-link-sup">уточнить</sup>'},
		'Kategorie:Wikipedia:Falschschreibung' : {
			className   : 'bkl-link bkl-link-inner',
			titleAppend : ' (неправильное написание)',
			htmlAppend  : '<sup class="bkl-link-sup">FS</sup>'}
	},

	queryUrlView      : wgScriptPath + '/api.php?action=query&format=json'
		+ '&prop=categories&pageids=' + wgArticleId + '&callback=bklCheck.viewResultArrived'
		+ '&generator=links&redirects&gpllimit=max&gplnamespace=0&cllimit=max&indexpageids'
		+ '&nocache=' + wgCurRevisionId, //Break client caching, when page has been edited
	queryUrlPreview   : wgScriptPath + '/api.php?action=query&format=json&prop=categories'
		+ '&cllimit=max&redirects&indexpageids',
	titles            : {},
	count             : 0,
	previewQueryCount : 0,

	execute : function () {
		if ( window.bklCheckOnlyCheckMainNS && wgNamespaceNumber != 0 ) return;
		//Use &clcategories to reduce needed queries
		var cats = [];
		for ( var name in bklCheck.cat ) if ( bklCheck.cat[name].className )
			cats.push( encodeURIComponent( name ) );
		bklCheck.queryUrlView += '&clcategories=' + cats.join( '|' );
		bklCheck.queryUrlPreview += '&clcategories=' + cats.join( '|' );
		if ( wgAction == 'submit' )	bklCheck.doPreviewQueries();
		else if ( wgAction == 'view' || wgAction == 'historysubmit' || wgAction == 'purge' )
			importScriptURI( bklCheck.queryUrlView );
		else {//"Show preview on first edit" enabled?
			var prev = document.getElementById( 'wikiPreview' );
			if ( prev && prev.firstChild ) importScriptURI( bklCheck.queryUrlView );
		}
		//Make sure that our style is put before other css so users can override it easily
		var head = document.getElementsByTagName( 'head' )[0];
		head.insertBefore( appendCSS( '.bkl-link {background-color:#FF9191;}' ), head.firstChild );
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
			if ( links[i].className == 'image' ) continue; //Don't mess with images!
                        if ( links[i].className == 'skipitpls123' )  continue; //Don't. just Don't

			var cat = bklCheck.titles[links[i].title];
			if ( !cat ) continue;
                        if (hide_append_bkl_check_tests)
			links[i].innerHTML = '<span class="' + cat.className + '" title="' + links[i].title
					+ cat.titleAppend + '">' + links[i].innerHTML + '</span>';
                        else
			links[i].innerHTML = '<span class="' + cat.className + '" title="' + links[i].title
					+ cat.titleAppend + '">' + links[i].innerHTML	+ cat.htmlAppend + '</span>';
		}
	},

	viewResultArrived : function ( res ) {
		bklCheck.storeTitles( res );
		if ( res && res['query-continue'] ) {
			var c = res['query-continue'];
			if ( c.categories ) {
				importScriptURI( bklCheck.queryUrlView + '&clcontinue='
					+ encodeURIComponent( c.categories.clcontinue ) );
			} else if ( c.links ) {
				bklCheck.queryUrlView = bklCheck.queryUrlView.replace( /&gplcontinue=.*|$/,
					'&gplcontinue=' + encodeURIComponent( c.links.gplcontinue ) );
				importScriptURI( bklCheck.queryUrlView );
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
		var siteRegex = new RegExp( rxEscape( wgServer ) + rxEscape( wgArticlePath.replace( /\$1/, '' ) ) + '([^#]*)' );
		//We only care for main ns pages, so we can filter out the most common cases to save some requests
		var namespaceRegex = /^((Участник|Википедия|Файл|MediaWiki|Шаблон|Помощь|Категория|Портал)(_Обсуждение)?|Special|Обсуждение):/i;
		for ( var i = 0; i < links.length; i++ ) {
			if ( !links[i].title || !( m = links[i].href.match( siteRegex ) )
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
                if (el)
                   {
                   var el2 = el.getElementsByTagName( 'div' );
                   for (var i=0;i<el2.length;i++)
                     {
                       if (el2[i].className.match("dablink"))
                         { 
                           
                           var innerHTMLtmp = el2[i].innerHTML;
                           innerHTMLtmp = innerHTMLtmp.replace(/href/ig,' class=\"skipitpls123\" href');
                           el2[i].innerHTML = innerHTMLtmp;
                         }
                     }
                   }
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

if ( wgNamespaceNumber >= 0 ) addOnloadHook( bklCheck.execute );