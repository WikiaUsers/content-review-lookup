/*--------------------------------------------------------*\
||                  --- HotCat ---                         ||
|| A script for updating interlanguage links on foreign	   ||
|| wikis with one simple edit. Based on a script by C-3PO: ||
|| https://www.jedipedia.net/wiki/Jedipedia:HotCat and its ||
|| French version: [[:fr:MediaWiki:Gadget-HotCat.js]] by   ||
|| [[User:BlondeLegendaire]]. Modified for Wookieepedia by ||
|| [[User:KockaAdmiralac]] and [[User:01miki10]].          ||
|| ------------------------------------------------------- ||
|| Please do not copy this script to your wiki for various ||
|| reasons. Instead of that, import it.                    ||
\*--------------------------------------------------------*/

var hotcat = {};
hotcat.settings = {};
 
hotcat.dataTest = '';
hotcat.settings.category_blacklist = [];
hotcat.settings.qs_templates = [];
hotcat.settings.defaultsort = 'DEFAULTSORT'; //translated name for DEFAULTSORT
if ( typeof window.hotcatWikisList != 'undefined' ) {
	hotcat.settings.biggest_wikis = window.hotcatWikisList;
} else {
	hotcat.settings.biggest_wikis = ['en','de','ru','es','fr','pl','nl','ja','it','ka','pt','fi','tr','cs','hu','uk','ko','el','sr','da','sv','no','zh','bg','hr','ro','la','sl','id']; //Wikis sorted by number of articles
}
 
//List of wikis - code, language and accepted interwiki links
hotcat.settings.wikis = [
{id:'bg', name:'Bulgarian', domain:'starwars.fandom.com', path:'/bg/', interlang:true, installed_iws:['ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ca', name:'Catalan', domain:'starwars.fandom.com', path:'/ca/', interlang:true, installed_iws:['bg','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'cs', name:'Czech', domain:'starwars.fandom.com', path:'/cs/', interlang:true, installed_iws:['bg','ca','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'da', name:'Danish', domain:'starwars.fandom.com', path:'/da/', interlang:true, installed_iws:['bg','ca','cs','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'de', name:'German', domain:'www.jedipedia.net', path:'/w/', interlang:false, installed_iws:['bg','ca','cs','da','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'el', name:'Greek', domain:'starwars.fandom.com', path:'/el/', interlang:true, installed_iws:['bg','ca','cs','da','de','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'en', name:'English', domain:'starwars.fandom.com', path:'/', interlang:true, installed_iws:['bg','cs','da','de','el','es','fi','fr','hr','hu','id','it','ja','ka','ko','la','nl','no','pl','pt','ro','ru','sl','sr','sv','tr','uk','zh']}, //List of languages accepted by Wookieepedia
{id:'eo', name:'Esperanto', domain:'starwars.fandom.com', path:'/eo/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'es', name:'Spanish', domain:'starwars.fandom.com', path:'/es/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'fa', name:'Persian', domain:'starwars.fandom.com', path:'/fa/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'fi', name:'Finnish', domain:'www.jedipedia.fi', path:'/w/', interlang:false, installed_iws:['bg','ca','cs','da','de','el','en','es','fa','fr','fy','hr','hu','id','it','ja','ko','la','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','tr','uk','zh']},
{id:'fr', name:'French', domain:'starwars.fandom.com', path:'/fr/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'fy', name:'West Frisian', domain:'starwars.fandom.com', path:'/fy/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ga', name:'Irish', domain:'starwars.fandom.com', path:'/ga/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'gl', name:'Galician', domain:'starwars.fandom.com', path:'/gl/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'hr', name:'Croatian', domain:'starwars.fandom.com', path:'/hr/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'hu', name:'Hungarian', domain:'starwars.fandom.com', path:'/hu/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'id', name:'Indonesian', domain:'starwars.fandom.com', path:'/id/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'is', name:'Icelandic', domain:'starwars.fandom.com', path:'/is/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'it', name:'Italian', domain:'starwars.fandom.com', path:'/it/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ja', name:'Japanese', domain:'starwars.fandom.com', path:'/ja/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ka', name:'Georgian', domain:'starwars.fandom.com', path:'/ka/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ko', name:'Korean', domain:'starwars.fandom.com', path:'/ko/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'la', name:'Latin', domain:'starwars.fandom.com', path:'/la/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'mn', name:'Mongolian', domain:'starwars.fandom.com', path:'/mn/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'nl', name:'Dutch', domain:'starwars.fandom.com', path:'/nl/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'no', name:'Norwegian', domain:'starwars.fandom.com', path:'/no/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'pl', name:'Polish', domain:'www.ossus.pl', path:'/', interlang:false, installed_iws:['cs','de','en','es','fi','fr','hu','it','ja','ka','ko','nl','pt','ru','tr','uk']},
{id:'pt', name:'Portuguese', domain:'starwars.fandom.com', path:'/pt/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','ro','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ro', name:'Romanian', domain:'starwars.fandom.com', path:'/ro/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ru','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'ru', name:'Russian', domain:'starwars.fandom.com', path:'/ru/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','sk','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'sk', name:'Slovakian', domain:'starwars.fandom.com', path:'/sk/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sl','sr','sv','th','tr','uk','vi','zh']},
{id:'sl', name:'Slovenian', domain:'starwars.fandom.com', path:'/sl/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sr','sv','th','tr','uk','vi','zh']},
{id:'sr', name:'Serbian', domain:'starwars.fandom.com', path:'/sr/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sv','th','tr','uk','vi','zh']},
{id:'sv', name:'Swedish', domain:'starwars.fandom.com', path:'/sv/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','th','tr','uk','vi','zh']},
{id:'th', name:'Thai', domain:'starwars.fandom.com', path:'/th/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','tr','uk','vi','zh']},
{id:'tr', name:'Turkish', domain:'starwars.fandom.com', path:'/tr/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','uk','vi','zh']},
{id:'uk', name:'Ukrainian', domain:'starwars.fandom.com', path:'/uk/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','vi','zh']},
{id:'vi', name:'Vietnamese', domain:'starwars.fandom.com', path:'/vi/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','zh']},
{id:'zh', name:'Chinese', domain:'starwars.fandom.com', path:'/zh/', interlang:true, installed_iws:['bg','ca','cs','da','de','el','en','eo','es','fa','fi','fr','fy','ga','gl','hr','hu','id','is','it','ja','ka','ko','la','mn','nl','no','pl','pt','ro','ru','sk','sl','sr','sv','th','tr','uk','vi']}
];
hotcat.settings.interwiki_codes = {};
for ( var iloop = 0; iloop < hotcat.settings.wikis.length; iloop++ ) {
	hotcat.settings.interwiki_codes[ hotcat.settings.wikis[iloop].id ] = iloop;
}
hotcat.settings.interwiki_codes_pl = {'cs': 1, 'de': 2, 'en': 3, 'es': 4, 'fr': 5, 'ko': 6, 'it': 7, 'ka': 8, 'hu': 9, 'nl': 10, 'ja': 11, 'pt': 12, 'ru': 13, 'fi': 14, 'tr': 15, 'uk': 16 };
hotcat.getWikiById = function( tmpId ) {
	return hotcat.settings.wikis[ hotcat.settings.interwiki_codes[tmpId] ];
};
 
hotcat.settings.is_sysop = 'false';
hotcat.settings.api_url = '/w/api.php';
hotcat.settings.linkcolor = '#0645AD'; //Blue link color
hotcat.initrequest = null;
 
//Initialize variables
hotcat.curpage = mw.config.get( 'wgPageName' ); //Page name with namespace and underscores
hotcat.exzstatus = false; //Is local article featured
hotcat.lwastatus = false; //Is local article good
hotcat.castatus = false; //Is local article comprehensive
hotcat.wookattr = false; //Wookieepedia attribution parameter in es and pt
hotcat.defaultsort = '';
hotcat.categories = {};
hotcat.categories.array = [];
hotcat.categories.recently_removed = [];
hotcat.categories.suggestions = {};
hotcat.interwikis = {};
hotcat.interwikis.array = [];
hotcat.interwikis.loadstatus = 0;
hotcat.submit_counter = 0;
hotcat.ui = {};
hotcat.i18n = {};
 
hotcat.makeempty = function( elementid ) {
	var ele = document.getElementById( elementid );
	if ( !ele ) return;
	while ( ele.firstChild ) ele.removeChild( ele.firstChild );
};
 
// Add the link for HotCat in the category list
// when the page has loaded
hotcat.addlink = function () {
	var hctmp = {};
 
	// If MediaWiki can't be found
	if ( !mw || !mw.config ) return;
 
	// Check if HotCat can be activated: return if
	// only administrators may edit the page and
	// user is not such
	hctmp.usergrps = mw.config.get( 'wgUserGroups' );
	if ( hctmp.usergrps && hctmp.usergrps.length ) {
		hotcat.settings.is_sysop = false;
		for ( var i = 0; i < hctmp.usergrps.length; i++ ) {
			if ( hctmp.usergrps[i] == 'sysop' ) { hotcat.settings.is_sysop = true; break; }
		}
		if ( hotcat.settings.is_sysop === false ) {
			hctmp.restrictedit = mw.config.get( 'wgRestrictionEdit' );
			if ( hctmp.restrictedit && hctmp.restrictedit.length ) {
				for ( var j = 0; j < hctmp.restrictedit.length; j++ ) { if ( hctmp.restrictedit[j] == 'sysop' ) return; }
			}
		}
	}
	// if editing, previewing etc.
	hctmp.action = mw.config.get( 'wgAction' );
	if ( hctmp.action !== 'view' || mw.config.get( 'wgCanonicalNamespace' ) == 'Special' ) return;
	// if comparing revisions
	hctmp.tableobj = document.getElementsByTagName( 'table' );
	for ( var i = 0; i < hctmp.tableobj.length; i++ ) { if ( hctmp.tableobj[i].className.indexOf( 'diff' ) != -1 ) return; }
	// if watching an old revision
	if ( document.URL.indexOf( 'oldid=' ) != -1 ) return;
	// HotCat is only allowed in namespaces main, Project, File, Help and Category
	hctmp.namespace = mw.config.get( 'wgNamespaceNumber' );
	if ( hctmp.namespace !== 0 && hctmp.namespace !== 4 && hctmp.namespace !== 6 && hctmp.namespace !== 12 && hctmp.namespace !== 14 && hctmp.namespace !== 114 ) return;
	// if the page doesn't exist
	if ( mw.config.get( 'wgArticleId' ) === 0 ) return;
 
	hctmp.initlink = document.createElement( 'div' );
	hctmp.initlink.id = 'hotcat_initlink';
	hctmp.initlink.addEventListener( 'click', hotcat.startinit );
	hctmp.initlink.appendChild( document.createTextNode( 'HotCat' ) );
	document.getElementById( 'articleCategories' ).appendChild( hctmp.initlink );
};
 
// When the link is clicked: create a request for interwiki links
hotcat.startinit = function() {
	//hotcat.initrequest 
 
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
		data: {
			action: 'parse',
			prop: 'wikitext',
			page: hotcat.curpage,
			format: 'json'
		},
		dataType: 'json',
		success: function( d ) {
			if ( d.error ) {
				data = 'error' + d.error.code;
			} else {
				if ( d.parse.wikitext !== undefined ) {
					data = hotcat.extractInterWikiData( d.parse.wikitext['*'], hotcat.curpage, mw.config.get( 'wgContentLanguage' ) );
					//console.log('data: ' + data);
					hotcat.initrequest = data;
				}
			}
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			alert( 'Status: ' + textStatus ); 
			alert( 'Error: ' + errorThrown );
		}
	} ).done( hotcat.init );
};
 
 
hotcat.init = function() {
 
	var hctmp = {};
	hctmp.e = {}; //Elemente
 
	document.getElementById( 'articleCategories' ).removeChild( document.getElementById( 'hotcat_initlink' ) );
 
	hctmp.response_lines = hotcat.initrequest.replace( /\r/g, '' ).split( '\n' );
 
	//---- AJAX-AUSWERTUNG ---- //
	for ( var i = 0; i < hctmp.response_lines.length; i++ ) {
		//substring() instead of split() in case of a row has more than one = sign
		hctmp.response1 = hctmp.response_lines[i].substring( 0, hctmp.response_lines[i].indexOf( '=' ) );
		hctmp.response2 = hctmp.response_lines[i].substring( hctmp.response_lines[i].indexOf( '=' ) + 1 );
		if ( hctmp.response1 == 'defaultsort' ) {
			hotcat.defaultsort = hctmp.response2;
		} else if ( hctmp.response1 == 'categories' ) {
			hotcat.categories.array = hctmp.response2.split( '[' );
		} else if ( hctmp.response1 == 'isFA' ) {
			hotcat.exzstatus = true;
		} else if ( hctmp.response1 == 'isGA' ) {
			hotcat.lwastatus = true;
		} else if ( hctmp.response1 == 'isCA' ) {
			hotcat.castatus = true;
		} else if ( hctmp.response1 == 'sin' || hctmp.response1 == 'icp' ) {
			hotcat.wookattr = true; // Wook attribution param in es and pt
		} else if ( hctmp.response1 === '' ) {
 
		} else if ( hotcat.settings.interwiki_codes[hctmp.response1] ) {//Sil sagit dun code langue
			hotcat.interwikis.array.push( { id:hctmp.response1, title:hctmp.response2, isFA:'false', canedit:false, type:'any', newlinks:[] } );
		}
	}
 
	//---- INTERFACE ---- //
	hctmp.e.main = document.createElement( 'div' );
	hctmp.e.main.id = 'hotcat';
	hctmp.e.main.className = "hotcat";
 
	hctmp.e.headline = document.createElement( 'h2' );
	hctmp.e.headline.style.paddingTop = '0';
	hctmp.e.onoff = document.createElement( 'span' );
	hctmp.e.onoff.className = 'mw-hotcat';
	hctmp.e.helplink = document.createElement( 'a' );
	hctmp.e.helplink.href = 'https://starwars.fandom.com/wiki/Wookieepedia_Help:HotCat';
	hctmp.e.helplink.target = '_blank';
	hctmp.e.helplink.appendChild( document.createTextNode( hotcat.i18n.msg( 'help' ).plain() ) );
	hctmp.e.closelink = document.createElement( 'a' );
	hctmp.e.closelink.addEventListener( 'click', hotcat.close );
	hctmp.e.closelink.appendChild( document.createTextNode( hotcat.i18n.msg( 'close' ).plain() ) );
	hctmp.e.onoff.appendChild( hctmp.e.helplink );
	hctmp.e.onoff.appendChild( document.createTextNode( ' | ' ) );
	hctmp.e.onoff.appendChild( hctmp.e.closelink );
	hctmp.e.headimage = document.createElement( 'img' );
	hctmp.e.headimage.src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/e/ee/HOTCAT_Logo.png/revision/latest?cb=20181110120640';
	hctmp.e.headimage.alt = 'HotCat';
	hctmp.e.headimage.title = 'HotCat';
	hctmp.e.headline.appendChild( hctmp.e.onoff );
	hctmp.e.headline.appendChild( hctmp.e.headimage );
 
	//------------- Interwiki-Links -----------------
	hctmp.e.interblock = document.createElement( 'div' );
	hctmp.e.interblock.id = 'hc_interwikiblock';
 
	//--- Create an URL for Google search ---
	var hctmp_interwiki_search_query = 'https://www.google.com/search?q=';
	//Some words that shouldn't be searched with Google as they are specific for one language
	var hctmp_googlebadwords = [/^auf$/,/^[Dd]as$/,/^[Dd]en$/,/^[Dd]er$/,/^[Dd]es$/,/^[Dd]ie$/,/^[Ee]in/,/^für$/,/^groß/,/^im$/,/^in$/,/^nach$/,/^um$/,/^und$/,/^von$/,/^[Dd]roid/,/^Familie$/,/^Imperial/,/^Klasse$/,/^Scharmützel$/,/^Schlacht$/,/^[Ss]ystem$/,/^VSY$/,/^NSY$/,/^Battle$/,/^[Ss]tar$/,/^Wars?$/,/^Way$/,/^First$/,/^Second$/,/^Third$/,/^a$/,/^and$/,/^of$/,/^from$/,/^by$/,/^[Tt]he/,/^BBY$/,/^ABY$/];
	var hctmp_googlewoerter = mw.config.get( 'wgTitle' ).replace( / (-|–)/g, '' ).replace( /(\-|\: ?)/g, ' ' ).replace( /^(.+ )?(Mission|Scharmützel|Schlacht)( (von|nach|um))? /, '').replace( / ?\(.+\)$/, '' ).split( ' ' );
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) { if ( hotcat.interwikis.array[i].id == mw.config.get( 'wgContentLanguage' ) && hotcat.interwikis.array[i].title != mw.config.get( 'wgTitle' ) ) {
		hctmp_googlewoerter = hctmp_googlewoerter.concat( hotcat.interwikis.array[i].title.replace( /\-/, ' ' ).replace( / ?\(.+\)$/, '' ).split( ' ' ) );
		break;
	} }
	var hctmp_google1 = [];
	var hctmp_google2 = [];
	// Remove duplicate entries
	for ( var i = 0; i < hctmp_googlewoerter.length; i++ ) {
		if ( typeof( hctmp_google1[ hctmp_googlewoerter[i] ] ) == 'undefined' ) {
			hctmp_google1[ hctmp_googlewoerter[i] ] = true;
			hctmp_google2[hctmp_google2.length] = hctmp_googlewoerter[i];
		}
	}
	hctmp_googlewoerter = hctmp_google2.slice(0);
	// Remove bad words
	for ( var i = 0; i < hctmp_googlewoerter.length; i++ ) {
		for (var j = 0; j < hctmp_googlebadwords.length; j++ ) {
			if ( hctmp_googlewoerter[i].match( hctmp_googlebadwords[j] ) ) {
				hctmp_googlewoerter.splice( i, 1 );
				if ( i > 0) i--;
				break;
			}
		}
	}
	hctmp_interwiki_search_query += hctmp_googlewoerter.join( '+OR+' ) + '+';
	hctmp_interwiki_search_query += '!!+site:starwars.fandom.com+OR+site:ossus.pl+OR+site:jedipedia.fi+OR+site:jedipedia.net';
	hctmp_interwiki_search_query += '&num=100&filter=0&complete=0'; // 100 results, without SafeSearch filters, with duplicate results
	if ( hotcat.interwikis.array.length > 0 ) hctmp_interwiki_search_query += '&as_occt=title'; //Avec suffisamment de termes de recherche exacts (= avec lien InterWiki en anglais), restreignez les résultats et recherchez uniquement dans le titre
 
 
	hctmp.e.interheadline = document.createElement( 'h3' );
	hctmp.e.interheadline.className = 'hotcat-interwikis';
	//hctmp.e.interheadline.style.width = '714px';
 
	hctmp.e.intergooglelink = document.createElement( 'a' );
	hctmp.e.intergooglelink.className = 'mw-hotcat';
	hctmp.e.intergooglelink.href = hctmp_interwiki_search_query;
	hctmp.e.intergooglelink.target = '_blank';
	hctmp.e.intergooglelink.appendChild( document.createTextNode( hotcat.i18n.msg( 'searchLinks' ).plain() ) );
 
	hctmp.e.interheadline.appendChild( hctmp.e.intergooglelink );
	hctmp.e.interheadline.appendChild( document.createTextNode( hotcat.i18n.msg( 'interwikiLinks' ).plain() ) );
 
	hctmp.e.inter_label = document.createElement( 'label' );
	hctmp.e.inter_label.appendChild( document.createTextNode( hotcat.i18n.msg( 'addLink' ).plain() + ' ') );
 
	hctmp.e.interselect = document.createElement( 'select' );
	hctmp.e.interselect.id = 'addinterwikikuerzel';
 
	hctmp.e.interoption = null;
 
	var cnt = 0;
	var hctmp_preseliw = '';
	while ( cnt < hotcat.settings.biggest_wikis.length ) {// Sélectionne les wikis à préfixer dans la sélection
		var nolink = true;
		if ( mw.config.get( 'wgContentLanguage' ) == hotcat.settings.biggest_wikis[cnt] ) {
			nolink = false;
		}
		for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
				if ( hotcat.interwikis.array[i].id == hotcat.settings.biggest_wikis[cnt] ) {
					nolink = false;
					break;
				}
		}
		if ( nolink===true ) {// Si le lien InterWiki dans cette langue n'existe pas encore
			hctmp_preseliw = hotcat.settings.biggest_wikis[cnt];// sauve le plus grand wiki
			break;
		} else {// S'il y a un lien InterWiki
			cnt++;// vérifie la prochaine langue
		}
	}
	for ( var i = 0; i < hotcat.settings.wikis.length; i++ ) {// Create a wiki selection
		hctmp.e.interoption = document.createElement( 'option' );
		hctmp.e.interoption.title = hotcat.settings.wikis[i].name;
		if ( hotcat.settings.wikis[i].id == mw.config.get( 'wgContentLanguage' ) || hotcat.getWikiById( mw.config.get( 'wgContentLanguage' ) ).installed_iws.indexOf( hotcat.settings.wikis[i].id ) == -1 ) hctmp.e.interoption.disabled = true; // deactivate unaccepted interwiki links
		if ( hotcat.settings.wikis[i].id==hctmp_preseliw ) hctmp.e.interoption.selected = true; // select largest wiki by default
		hctmp.e.interoption.appendChild( document.createTextNode( hotcat.settings.wikis[i].id ) );
		hctmp.e.interselect.appendChild( hctmp.e.interoption );
	}
 
	hctmp.e.interinput = document.createElement( 'input' );
	hctmp.e.interinput.value = mw.config.get( 'wgTitle' );
	hctmp.e.interinput.id = 'addinterwiki';
	hctmp.e.interinput.type = 'text';
 
	hctmp.e.interspan = document.createElement( 'span' );
	hctmp.e.interspan.appendChild( document.createTextNode( ' ' ) );
 
 
	hctmp.e.interbutton = document.createElement( 'input' );
	hctmp.e.interbutton.type = 'button';
	hctmp.e.interbutton.value = hotcat.i18n.msg( 'add' ).plain();
	hctmp.e.interbutton.addEventListener( 'click',
		function add_interwiki() {
			hotcat.interwikis.add( hotcat.settings.wikis[document.getElementById( 'addinterwikikuerzel' ).selectedIndex].id, document.getElementById( 'addinterwiki' ).value );
			document.getElementById( 'addinterwiki' ).value = mw.config.get( 'wgTitle' );
		} );
 
	hctmp.e.interhint = document.createElement( 'div' );
	hctmp.e.interhint.className = 'center_column';
	hctmp.e.interhint.style.fontSize = 'x-small';
	hctmp.e.interhint.style.color = '#555';
	hctmp.e.interhint.style.clear = 'both';
	hctmp.e.interhint.appendChild( document.createTextNode( hotcat.i18n.msg( 'enterTitle' ).plain() ) );
 
	hctmp.e.inter2label = document.createElement( 'label' );
	hctmp.e.inter2label.appendChild( document.createTextNode( hotcat.i18n.msg( 'editLinks' ).plain() ) );
	hctmp.e.inter2label.style.fontWeight = 'bold';
 
	hctmp.e.inter2list = document.createElement( 'ul' );
	if ( hctmp.e.inter2list.classList ) {
		hctmp.e.inter2list.classList.add( 'hc_editlist' );
	} else {
		hctmp.e.inter2list.className += " hc_editlist";
	}
	hctmp.e.inter2list.id = 'interwikilist'
 
	hctmp.e.intercleanlabel = document.createElement( 'label' );
	hctmp.e.intercleanlabel.appendChild( document.createTextNode( hotcat.i18n.msg( 'cleanupLinks' ).plain() ) );
	hctmp.e.intercleanlabel.style.fontWeight = 'bolder';
 
	hctmp.e.interwiki_cleanup = document.createElement( 'div' );
	hctmp.e.interwiki_cleanup.id = 'interwiki_cleanup';
 
	if ( hotcat.interwikis.array.length > 0 ) {
		hctmp.e.interwiki_cleanup_loading = document.createElement( 'div' );
		hctmp.e.interwiki_cleanup_loading.id = 'interwiki_cleanup_loading'
 
		hctmp.e.interwiki_cleanup_loading_img = document.createElement( 'img' );
		hctmp.e.interwiki_cleanup_loading_img.src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/d/de/Ajax-loader.gif/revision/latest?cb=20181110120648';
		hctmp.e.interwiki_cleanup_loading_img.alt = hotcat.i18n.msg( 'loading' ).plain();
 
		hctmp.e.interwiki_cleanup_loadingstatus = document.createElement( 'span' );
		hctmp.e.interwiki_cleanup_loadingstatus.id = 'interwiki_cleanup_loadingstatus';
		hctmp.e.interwiki_cleanup_loadingstatus.appendChild( document.createTextNode( '0' ) );
 
		hctmp.e.interwiki_cleanup_loading.appendChild( hctmp.e.interwiki_cleanup_loading_img );
		hctmp.e.interwiki_cleanup_loading.appendChild( document.createTextNode( hotcat.i18n.msg( 'loadingFromWikis' ).plain() + ' (' ) );
		hctmp.e.interwiki_cleanup_loading.appendChild( hctmp.e.interwiki_cleanup_loadingstatus );
		hctmp.e.interwiki_cleanup_loading.appendChild( document.createTextNode( '/' + hotcat.interwikis.array.length + ')' ) );
 
		hctmp.e.interwiki_cleanup.appendChild( hctmp.e.interwiki_cleanup_loading) ;
	} else {
		hctmp.e.interwiki_cleanup.appendChild( document.createTextNode( hotcat.i18n.msg( 'nothingToChange' ).plain() ) );
	}
 
	hctmp.e.interblock.appendChild( hctmp.e.interheadline );
 
	hctmp.e.interblock_p1 = document.createElement( 'p' );
	hctmp.e.interblock_p1.appendChild( hctmp.e.inter_label );
	//hctmp.e.interblock_p1.appendChild( hctmp.e.inter_label2 );
	hctmp.e.interblock_p1.appendChild( hctmp.e.interselect );
	hctmp.e.interblock_p1.appendChild( hctmp.e.interinput );
	hctmp.e.interblock_p1.appendChild( hctmp.e.interspan );
	hctmp.e.interblock_p1.appendChild( hctmp.e.interbutton );
	hctmp.e.interblock.appendChild( hctmp.e.interblock_p1 );
 
	hctmp.e.interblock.appendChild( hctmp.e.interhint );
	hctmp.e.interblock.appendChild( hctmp.e.inter2label );
	hctmp.e.interblock.appendChild( hctmp.e.inter2list );
	hctmp.e.interblock.appendChild( hctmp.e.intercleanlabel );
	hctmp.e.interblock.appendChild( hctmp.e.interwiki_cleanup );
 
 
	// Submit block
	hctmp.e.commentblock = document.createElement( 'div' );
	hctmp.e.commentblock.id = 'hc_submitblock';
	hctmp.e.commentblock.style.clear = 'both';
	hctmp.e.commentblock.style.backgroundColor = '#aaa';
	hctmp.e.commentblock.style.padding = '10px';

	hctmp.e.submitbutton = document.createElement( 'input' );
	hctmp.e.submitbutton.type = 'button';
	hctmp.e.submitbutton.value = hotcat.i18n.msg( 'save' ).plain();
	hctmp.e.submitbutton.addEventListener( 'click', function f() { hotcat.submit(); } );
 
	hctmp.e.cancelbutton = document.createElement( 'input' );
	hctmp.e.cancelbutton.type = 'button';
	hctmp.e.cancelbutton.value = hotcat.i18n.msg( 'cancel' ).plain();
	hctmp.e.cancelbutton.addEventListener( 'click', hotcat.close );
 
	hctmp.e.endclear = document.createElement( 'br' );
	hctmp.e.endclear.style.clear = 'both';
 
 
	//hctmp.e.commentblock.appendChild( hctmp.e.commentlabel );
	//hctmp.e.commentblock.appendChild( hctmp.e.commentinput );
	hctmp.e.commentblock.appendChild( document.createTextNode( ' ' ) );
	hctmp.e.commentblock.appendChild( hctmp.e.submitbutton );
	hctmp.e.commentblock.appendChild( document.createTextNode( ' ' ) );
	hctmp.e.commentblock.appendChild( hctmp.e.cancelbutton );
	hctmp.e.commentblock.appendChild( hctmp.e.endclear );
 
 
	hctmp.e.main.appendChild( hctmp.e.headline );
	hctmp.e.main.appendChild( hctmp.e.interblock );
	hctmp.e.main.appendChild( hctmp.e.commentblock );
	document.getElementById( 'articleCategories' ).appendChild( hctmp.e.main );
 
 
	hotcat.interwikis.redraw();
	while ( hotcat.interwikis.loadstatus < hotcat.interwikis.array.length) {
			hotcat.interwikis.load( hotcat.interwikis.array[hotcat.interwikis.loadstatus].id, hotcat.interwikis.array[hotcat.interwikis.loadstatus].title );
	}
};
 
//Close the HotCat window and reset all variables to default
hotcat.close = function() {
	document.getElementById( 'articleCategories' ).removeChild( document.getElementById( 'hotcat' ) );
	hotcat.exzstatus = false;
	hotcat.lwastatus = false;
	hotcat.castatus = false;
	hotcat.wookattr = false;
	hotcat.defaultsort = '';
	hotcat.categories.array = [];
	hotcat.categories.suggestions = {};
	hotcat.interwikis.array = [];
	hotcat.interwikis.loadstatus = 0;
	hotcat.ui = {};
	hotcat.addlink();
};
 
hotcat.interwikis.add = function( newid, newtitle ) {
	//Language code, title, FA/GA/CA, edits possible, virtual interwiki links in that wiki
	hotcat.interwikis.array.push( { id:newid, title:newtitle, isFA:'false', canedit:false, type:'any', newlinks:[] } );
	hotcat.interwikis.redraw();
	hotcat.interwikis.cleanup();
	hotcat.interwikis.load( newid, newtitle );
};
 
hotcat.interwikis.add2wiki = function( wikiid, newid, newtitle ) {//hotcat.interwikis.add2wiki("en", "de", "Jerba");
	var tmp_wiki = hotcat.interwikis.getById( wikiid );
	tmp_wiki.newlinks.push( { id:newid, title:newtitle } );
	tmp_wiki.newlinks.sort( ( wikiid === 'pl' ) ? hotcat.sortInterwikisPl : hotcat.sortInterwikis );
	hotcat.interwikis.cleanup();
};
 
hotcat.interwikis.editwiki = function( wiki2edit, editid)  {
	//Changes link virtually in another wiki (et reprendre le lien interwiki de SWW)
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) { // Find the ID of the wiki edited
		if ( hotcat.interwikis[i].id == wiki2edit ) {
			for ( var j = 0; j < hotcat.interwikis[i].newlinks.length; j++ ) { // Trouver l'identifiant du lien InterWiki à modifier
				if ( hotcat.interwikis.array[i].newlinks[j].id == editid ) {
					if ( editid == mw.config.get( 'wgContentLanguage' ) ) { // Prefill title of current article
						hotcat.interwikis.array[i].newlinks[j].title = hotcat.curpage.replace( /_/g, ' ' );
					} else { // Accepter le lien InterWiki correct sur SWW
						hotcat.interwikis.array[i].newlinks[j].title = hotcat.interwikis.getById( editid ).title;
					}
					hotcat.interwikis.cleanup();
					return;
				}
			}
		}
	}
};
 
//Delete an interwiki link of the article in the specified language, deletetitle is ignored
hotcat.interwikis.delfromwiki = function( wikiid, deleteid, deletetitle ) {
	if ( wikiid == mw.config.get( 'wgContentLanguage' ) ) {
		for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
			if ( hotcat.interwikis.array[i].id == deleteid ) {
				hotcat.interwikis.array.splice( i, 1 );
				hotcat.interwikis.redraw();
				hotcat.interwikis.cleanup();
				return true;
			}
		}
	} else {
		for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
			if ( hotcat.interwikis.array[i].id == wikiid ) {
				for ( var j = 0; j < hotcat.interwikis.array[i].newlinks.length; j++ ) {
					if ( hotcat.interwikis.array[i].newlinks[j].id == deleteid ) {
						hotcat.interwikis.array[i].newlinks.splice( j, 1 );
						hotcat.interwikis.cleanup();
						return true;
					}
				}
			}
		}
	}
	return false;
};
 
hotcat.interwikis.getById = function( wikiid ) {
	if ( wikiid == mw.config.get( 'wgContentLanguage' ) ) {
		var hctmp_fa = 'false';
		if ( hotcat.castatus ) hctmp_fa ='CA';
		if ( hotcat.lwastatus ) hctmp_fa = 'GA';
		if ( hotcat.exzstatus ) hctmp_fa = 'FA';
		return { id:mw.config.get( 'wgContentLanguage' ), title:hotcat.curpage.replace( /_/g, ' ' ), isFA:hctmp_fa, canedit:false, type:'any', newlinks:hotcat.interwikis.array };
	}
	for ( var i = 0; i<hotcat.interwikis.array.length; i++ ) {
		if ( hotcat.interwikis.array[i].id == wikiid ) return hotcat.interwikis.array[i];
	}
	return null;
};
 
hotcat.interwikis.load = function( id, title ) {
 
	var urlWiki = null;
	var formatData = null;
	for (var iloop = 0; iloop < hotcat.settings.wikis.length; iloop++ ) {
		if ( hotcat.settings.wikis[iloop].id == id ) {
			if ( id == 'de' || id == 'fi' || id == 'pl' ) {
				urlWiki= 'https://www.jedipedia.net/scripts/hotcat.php?mode=getinterwikis&wiki=' + id + '&title=' + title;
			} else {
				urlWiki = 'https://' + hotcat.settings.wikis[iloop].domain + hotcat.settings.wikis[iloop].path + 'api.php';
			}
		}
	}
	if ( id != 'de' && id != 'fi' && id != 'pl' ) {
		if( urlWiki !== null ) {
			var hc_r = $.ajax( {
				url: urlWiki,
				async: false,
				data: {
					action: 'parse',
					prop: 'wikitext',
					page: title,
					format: 'json'
				},
				dataType: 'json',
				success: function( d ) {
					if ( d.error ) {
						hc_r = 'error=' + d.error.code;
					} else {
						if ( d.parse.wikitext !== undefined ) {
							hc_r =  hotcat.extractInterWikiData( d.parse.wikitext['*'], title, id );
						} 
					}
				}, 
				error: function( XMLHttpRequest, textStatus, errorThrown ) { 
					hc_r = 'error=';
				}
			} ).done( function( d ){
				var responseText = hc_r;
				//console.log( 'responseText: ' + responseText );
				for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
					if ( hotcat.interwikis.array[i].id == id && hotcat.interwikis.array[i].title == title ) {
						var hctmp_response_lines = responseText.replace( /\r/g, '' ).split( '\n' );
						if ( id == 'de' || id == 'fi' || id == 'pl' ) hctmp_response_lines = responseText.replace( /\r/g, '' ).split( ',' );
 
						for ( var j = 0; j < hctmp_response_lines.length; j++ ) {
							//substring() instead of split() in case of a row has more than one = sign
							var hctmp_response1 = hctmp_response_lines[j].substring( 0, hctmp_response_lines[j].indexOf( '=' ) );
							var hctmp_response2 = hctmp_response_lines[j].substring( hctmp_response_lines[j].indexOf( '=' ) + 1 );
							//console.log( 'hctmp.response1: ' + hctmp_response1 + '\nhctmp.response2: ' + hctmp_response2 );
							if ( hctmp_response1 == 'error') {
								if ( hctmp_response2 == 'missingtitle') {
									alert( hotcat.i18n.msg( 'alertDoesntExist', id, title ).plain() );
									hotcat.interwikis.array.splice( i, 1 );
									hotcat.interwikis.redraw();
									hotcat.interwikis.cleanup();
									return;
								} else if ( hctmp_response2 == 'redirect' ) {
									//do nothing, read "redirect" field
								} else if ( hctmp_response2 == "protected") {//
									alert( hotcat.i18n.msg( 'alertProtected', id, title ).plain() );
									hotcat.interwikis.array[i].canedit = false;
									hotcat.interwikis.redraw();
									hotcat.interwikis.loadstatus++;
									hotcat.interwikis.cleanup();
									return;
								} else {
									alert( hotcat.i18n.msg( 'alertError', id, title ).plain() + '\n\nerror=' + hctmp_response2 );
									hotcat.interwikis.array[i].canedit = false;
									hotcat.interwikis.redraw();
									hotcat.interwikis.loadstatus++;
									hotcat.interwikis.cleanup();
									return;
								}
							} else if ( hctmp_response1 == 'redirect' ) { // Edit redirect and reload
								alert( hotcat.i18n.msg( 'alertRedirect', id, title, hctmp_response2 ).plain() );
								hotcat.interwikis.array[i].title = hctmp_response2;
								hotcat.interwikis.load( id, hctmp_response2 );
								return;
							} else if ( hctmp_response1 == 'type' ) {
								switch ( hctmp_response2 ) {
									case 'kanon': hotcat.interwikis.array[i].type = 'kanon'; break;
									case 'legends': hotcat.interwikis.array[i].type = 'legends'; break;
									default: hotcat.interwikis.array[i].type = 'any';
								}
							} else if ( hctmp_response1 == 'isFA' ) {
								hotcat.interwikis.array[i].isFA = 'FA';
							} else if ( hctmp_response1 == 'isGA' ) {
								hotcat.interwikis.array[i].isFA = 'GA';
							} else if ( hctmp_response1 == 'isCA' ) {
								hotcat.interwikis.array[i].isFA = 'CA';
							} else if ( hctmp_response1 == 'sin' || hctmp_response1 == 'icp' ) {
								hotcat.interwikis.array[i].wookAttr = true; // Wook attribution param in es and pt
							} else if ( hctmp_response1 === '' ) {
 
							} else {// Ajouter un lien InterWiki si accepté
								for ( var k = 0; k < hotcat.getWikiById( id ).installed_iws.length; k++ ) {
									if ( hctmp_response1 == hotcat.getWikiById( id) .installed_iws[k] ) {
										hotcat.interwikis.array[i].newlinks.push( { id:hctmp_response1, title:hctmp_response2 } );
									}
								}
							}
						}
						hotcat.interwikis.array[i].newlinks.sort( ( id === 'pl' ) ? hotcat.sortInterwikisPl : hotcat.sortInterwikis );
						hotcat.interwikis.array[i].canedit = true;
						hotcat.interwikis.redraw();
						hotcat.interwikis.loadstatus++;
						hotcat.interwikis.cleanup();
						return;
					}
				}
 
			});
		} 
	} else {
		for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
			if ( hotcat.interwikis.array[i].id == id && hotcat.interwikis.array[i].title == title ) {
				hotcat.interwikis.array[i].canedit = true;
			}
		}
		hotcat.interwikis.redraw();
		hotcat.interwikis.loadstatus++;
		hotcat.interwikis.cleanup();
		return;
	}
};
 
//Update the list of interwiki links in interwikis []
hotcat.interwikis.redraw = function() {
	var hctmp = {};
	hotcat.interwikis.array.sort( hotcat.sortInterwikis );
	hotcat.makeempty( 'interwikilist' );
 
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		hctmp.interwiki_line = document.createElement( 'li' );
		hctmp.interwiki_line.id = 'interwiki_' + i;
 
		hctmp.interwiki_buttondel = document.createElement( 'span' );		
		hctmp.interwiki_buttondel.appendChild( document.createTextNode( '–' ) );
		hctmp.interwiki_buttondel.title = hotcat.i18n.msg( 'delete' ).plain();
		if ( hotcat.interwikis.array[i].canedit ) {
			hctmp.interwiki_buttondel.style.cursor = 'Delete';
			hctmp.interwiki_buttondel.style.color = hotcat.settings.linkcolor;
			hctmp.interwiki_buttondel.addEventListener( 'click', function hciw_del() {
				hotcat.interwikis.array.splice( Number( this.parentNode.id.match( /^interwiki_(\d+)$/ )[1] ), 1 );
				hotcat.interwikis.redraw();
				hotcat.interwikis.cleanup();
			} );
		} else {
			hctmp.interwiki_buttondel.style.color = '#bbb';
		}
 
		hctmp.interwiki_buttonedit = document.createElement( 'span' );
		hctmp.interwiki_buttonedit.appendChild( document.createTextNode( '±' ) );
		hctmp.interwiki_buttonedit.title = hotcat.i18n.msg( 'edit' ).plain();
		if ( hotcat.interwikis.array[i].canedit ) {
			hctmp.interwiki_buttonedit.style.cursor = 'pointer';
			hctmp.interwiki_buttonedit.style.color = hotcat.settings.linkcolor;
			hctmp.interwiki_buttonedit.addEventListener( 'click', function hciw_openedit() {
				var id = Number( this.parentNode.id.match( /interwiki_(\d+)/ )[1] );
				var hc_interedit_select = document.createElement( 'select' );
				hc_interedit_select.id = 'editinterwikikuerzel' + id;
 
				var hc_interedit_option = null;
				for (var i = 0; i < hotcat.settings.wikis.length; i++ ) {
					hc_interedit_option = document.createElement( 'option' );
					hc_interedit_option.title = hotcat.settings.wikis[i].name;
					if ( hotcat.settings.wikis[i].id == mw.config.get( 'wgContentLanguage' ) || hotcat.getWikiById( mw.config.get( 'wgContentLanguage' ) ).installed_iws.indexOf( hotcat.settings.wikis[i].id ) == -1 ) hc_interedit_option.disabled = true;
					if ( hotcat.settings.wikis[i].id == hotcat.interwikis.array[id].id ) hc_interedit_option.selected = true;
					hc_interedit_option.appendChild( document.createTextNode( hotcat.settings.wikis[i].id ) );
					hc_interedit_select.appendChild( hc_interedit_option );
				}
				var hc_interedit_input = document.createElement( 'input' );
				hc_interedit_input.value = hotcat.interwikis.array[id].title;
				hc_interedit_input.style.width = '250px';
				hc_interedit_input.id = 'interwikiedit' + id;
 
				var hc_interedit_savebutton = document.createElement( 'input' );
				hc_interedit_savebutton.title = id; // cache d'ID
				hc_interedit_savebutton.addEventListener( 'click', function hciw_editsubmit() {
					var id = this.title;
					var newid = hotcat.settings.wikis[document.getElementById( 'editinterwikikuerzel' + id).selectedIndex].id;
					var newtitle = document.getElementById( 'interwikiedit'+ id).value;
					if ( hotcat.interwikis.array[id].id != newid || hotcat.interwikis.array[id].title != newtitle ) {
						hotcat.interwikis.array[id].id = newid;
						hotcat.interwikis.array[id].title = newtitle;
						hotcat.interwikis.array[id].canedit = false;
						hotcat.interwikis.array[id].newlinks = [];
						hotcat.interwikis.load( newid, newtitle );
					}
					hotcat.interwikis.redraw();
					hotcat.interwikis.cleanup();
				});
				hc_interedit_savebutton.type = 'button';
				hc_interedit_savebutton.value = hotcat.i18n.msg( 'apply' ).plain();
 
				var hc_interedit_cancelbutton = document.createElement( 'input' );
				hc_interedit_cancelbutton.addEventListener( 'click', hotcat.interwikis.redraw );
				hc_interedit_cancelbutton.type = 'button';
				hc_interedit_cancelbutton.value = hotcat.i18n.msg( 'cancel' ).plain();
 
				document.getElementById( 'interwiki_' + id).removeChild( document.getElementById( 'interwiki_' + id).getElementsByTagName( 'a' )[document.getElementById( 'interwiki_' + id ).getElementsByTagName( 'a' ).length - 1] );
 
				document.getElementById( 'interwiki_' + id ).appendChild( document.createTextNode( '[[' ) );
				document.getElementById( 'interwiki_' + id ).appendChild( hc_interedit_select );
				document.getElementById( 'interwiki_' + id ).appendChild( document.createTextNode( ':' ) );
				document.getElementById( 'interwiki_' + id ).appendChild( hc_interedit_input );
				document.getElementById( 'interwiki_' + id ).appendChild( document.createTextNode( ']] ' ) );
				document.getElementById( 'interwiki_' + id ).appendChild( hc_interedit_savebutton );
				document.getElementById( 'interwiki_' + id ).appendChild( document.createTextNode( ' ' ) );
				document.getElementById( 'interwiki_' + id ).appendChild( hc_interedit_cancelbutton );
			} );
		} else {
			hctmp.interwiki_buttonedit.style.color = '#bbb';
		}
 
		hctmp.interwiki_icon = document.createElement( 'img' );
		if ( hotcat.interwikis.array[i].isFA == 'false' ) {
			hctmp.interwiki_icon.src = 'https://jedipedia.net/w/skins/MonoBook/bullet.gif';
			hctmp.interwiki_icon.style.display = 'none';
		} else if ( hotcat.interwikis.array[i].isFA == 'CA' ) {
			hctmp.interwiki_icon.src = 'https://static.wikia.nocookie.net/starwars/images/d/dc/InterwikiCA.png/revision/latest?cb=20111001202338';
		} else if ( hotcat.interwikis.array[i].isFA == 'GA' ) {
			hctmp.interwiki_icon.src = 'https://static.wikia.nocookie.net/starwars/images/d/df/InterwikiGA.png/revision/latest?cb=20110929201133';
		} else if ( hotcat.interwikis.array[i].isFA == 'FA' ) {
			hctmp.interwiki_icon.src = 'https://static.wikia.nocookie.net/starwars/images/1/10/InterwikiFA.png/revision/latest?cb=20090419010056';
		}
 
		hctmp.interwiki_link = document.createElement( 'a' );
		//hctmp.interwiki_link.href = '/wiki/' + hotcat.interwikis.array[i].id + ':' + encodeURIComponent( hotcat.interwikis.array[i].title.replace( / /g, '_' ) );
		hctmp.interwiki_link.href = 'https://' + hotcat.getWikiById( hotcat.interwikis.array[i].id ).domain + hotcat.getWikiById( hotcat.interwikis.array[i].id ).path + 'index.php?title=' + hotcat.interwikis.array[i].title.replace( / /g, '_' );
		hctmp.interwiki_link.setAttribute( 'target', '_blank' );
		hctmp.interwiki_link.appendChild( document.createTextNode( hotcat.interwikis.array[i].id + ':' + hotcat.interwikis.array[i].title ) );
 
		hctmp.interwiki_line.appendChild( hctmp.interwiki_buttondel );
		hctmp.interwiki_line.appendChild( document.createTextNode( ' ' ) );
		hctmp.interwiki_line.appendChild( hctmp.interwiki_buttonedit) ;
		hctmp.interwiki_line.appendChild( document.createTextNode( ' ' ) );
		hctmp.interwiki_line.appendChild( hctmp.interwiki_icon );
		hctmp.interwiki_line.appendChild( document.createTextNode( ' ' ) );
		hctmp.interwiki_line.appendChild( hctmp.interwiki_link );
		switch ( hotcat.interwikis.array[i].type ) {
			case 'kanon':
				hctmp.interwiki_line.appendChild( document.createTextNode( ' (CANON)' ) );
				break;
			case 'legends':
				hctmp.interwiki_line.appendChild( document.createTextNode( ' (LEGENDS)' ) );
				break;
		}
 
		document.getElementById( 'interwikilist' ).appendChild( hctmp.interwiki_line );
	}
 
	var cnt = 0; hctmp.preseliw = '';
	while ( cnt < hotcat.settings.biggest_wikis.length ) { // Sélectionne les wikis à préfixer dans la sélection
		var nolink = true;
		if ( mw.config.get( 'wgContentLanguage' ) == hotcat.settings.biggest_wikis[cnt] ) {
			nolink = false;
		}
		for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
			if ( hotcat.interwikis.array[i].id == hotcat.settings.biggest_wikis[cnt] ) { nolink = false; break; }
		}
		if ( nolink == true ) { // Si le lien InterWiki dans cette langue n'existe pas encore
			hctmp.preseliw = hotcat.settings.biggest_wikis[cnt]; //sauver le plus grand wiki
			break;
		} else { // S'il y a un lien InterWiki
			cnt++; // vérifie la prochaine langue
		}
	}
	document.getElementById( 'addinterwikikuerzel' ).selectedIndex = hotcat.settings.interwiki_codes[hctmp.preseliw];
};
 
// Met à jour la liste des liens interwiki manquants / erronés / supplémentaires
hotcat.interwikis.cleanup = function() {
	if ( hotcat.interwikis.loadstatus < hotcat.interwikis.array.length && document.getElementById( 'interwiki_cleanup_loadingstatus' ) ) {
		document.getElementById( 'interwiki_cleanup_loadingstatus' ).innerHTML = hotcat.interwikis.loadstatus;
		return;
	}
	var hctmp = {};
 
	hotcat.makeempty( 'interwiki_cleanup' );
 
	//----------------- ANALYSE -------------------
	var hotinter_newlinks = []; //Liens manquants dans SWW -> [2,3] a un lien [0,1] manquant de SWW
	var hotinter_nolinks = []; // liens qui manquent ailleurs -> à [2,3] le lien [0,1] est manquant
	var hotinter_difflinks = []; // liens différents ailleurs -> [2,3] a un lien différent de celui de SWW pour [0,1]
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		if ( hotcat.interwikis.array[i].canedit && hotcat.interwikis.array[i].id != 'de' && hotcat.interwikis.array[i].id != 'fi' && hotcat.interwikis.array[i].id != 'pl' ) {
			var hctmp_jpcopy = hotcat.interwikis.array.slice(0); // faire des copies qui peuvent être changées
			hctmp_jpcopy.push( { id:mw.config.get( 'wgContentLanguage' ), title:hotcat.curpage.replace( /_/g, ' ' ) } );
			var hctmp_wikiacopy = hotcat.interwikis.array[i].newlinks.slice(0);
			hctmp_wikiacopy.unshift( { id:hotcat.interwikis.array[i].id, title:hotcat.interwikis.array[i].title } );
 
			OuterLoop: for ( var j = 0; j < hctmp_jpcopy.length; j++ ) {
				var hctmp_iwcodeinarray = false;
				InnerLoop: for ( var k = 0; k < hctmp_wikiacopy.length; k++ ) {
					if ( hctmp_wikiacopy[k] == null ) continue InnerLoop;
					if ( hctmp_jpcopy[j].id == hctmp_wikiacopy[k].id ) { // si le raccourci est dans les deux tableaux
						hctmp_iwcodeinarray = true;
						if ( hctmp_jpcopy[j].title == hctmp_wikiacopy[k].title ) { // si les lemmes sont identiques
							hctmp_jpcopy[j] = null;
						} else { // si les lemmes sont différents
							hotinter_difflinks.push( [hctmp_wikiacopy[k].id, hctmp_wikiacopy[k].title, hotcat.interwikis.array[i].id, hotcat.interwikis.array[i].title] );
						}
						hctmp_wikiacopy[k] = null;
						break InnerLoop;
					}
				}
				if ( hctmp_iwcodeinarray == false ) { // Si le raccourci est uniquement pour SWW
					if ( hctmp_jpcopy[j].id != hotcat.interwikis.array[i].id ) { // Compléter uniquement si le lien pointe vers un autre wiki
						innerLoop: for ( var k = 0; k < hotcat.getWikiById( hotcat.interwikis.array[i].id ).installed_iws.length; k++ ) {
							if ( hotcat.getWikiById( hotcat.interwikis.array[i].id ).installed_iws[k] == hctmp_jpcopy[j].id ) { // Et si le wiki accepte le lien
								hotinter_nolinks.push( [hctmp_jpcopy[j].id, hctmp_jpcopy[j].title, hotcat.interwikis.array[i].id, hotcat.interwikis.array[i].title] );
							}
						}
					}
				}
			}
			for ( var j = 0; j < hctmp_wikiacopy.length; j++ ) { // S'il manque un lien sur SWW
				if ( hctmp_wikiacopy[j] != null ) {
					hotinter_newlinks.push( [hctmp_wikiacopy[j].id, hctmp_wikiacopy[j].title, hotcat.interwikis.array[i].id, hotcat.interwikis.array[i].title] );
				}
			}
		}
	}
 
	//------------- New interwiki links -------------
	// Links missing in local wiki -> [2,3] has a missing link [0,1]
	hctmp.cleannew_list = document.createElement( 'ul' );
	if( hctmp.cleannew_list.classList ) {
		hctmp.cleannew_list.classList.add( 'hc_editlist' );
	} else {
		hctmp.cleannew_list.className += ' hc_editlist';
	} 
	hctmp.cleannew_list.id = 'hotcat_newiwlinks';
	for ( var j = 0; j < hotinter_newlinks.length; j++ ) {
		if ( hotinter_newlinks[j][0] != hotinter_newlinks[j][2] && hotinter_newlinks[j][0] != mw.config.get( 'wgContentLanguage' ) ) {
			hctmp.clean_line = document.createElement( 'li' );
 
			hctmp.cleanbuttoncustom = document.createElement( 'span' ); // Add new link in local wiki
			if ( hotinter_newlinks[j][0] != mw.config.get( 'wgContentLanguage' ) ) {
				hctmp.cleanbuttoncustom.title = hotcat.i18n.msg( 'acceptAndAdd' ).plain();
				hctmp.cleanbuttoncustom.id = 'hccbb_' + j;
				hctmp.cleanbuttoncustom.style.cursor = 'pointer';
				hctmp.cleanbuttoncustom.style.color = hotcat.settings.linkcolor;
				hctmp.cleanbuttoncustom.addEventListener( 'click', function hciw_add_new_link_to_jp() {
					var id = Number( this.id.match( /^hccbb_(\d+)$/ )[1] );
					hotcat.interwikis.add( hotinter_newlinks[id][0], hotinter_newlinks[id][1] );
				} );
			} else {
				hctmp.cleanbuttoncustom.style.color = '#bbb'; 
			}
			hctmp.cleanbuttoncustom.appendChild( document.createTextNode( '√' ) );
 
			hctmp.cleanbuttondel = document.createElement( 'span' ); // Remove incorrect link in foreign wiki
			hctmp.cleanbuttondel.title = hotcat.i18n.msg( 'refuseAndDelete' ).plain();
			hctmp.cleanbuttondel.id = 'hccbc_' + j;
			hctmp.cleanbuttondel.style.cursor = 'pointer';
			hctmp.cleanbuttondel.style.color = hotcat.settings.linkcolor;
			hctmp.cleanbuttondel.addEventListener( 'click', function hciw_delete_wrong_link_from_wiki() {
				var id = Number( this.id.match( /^hccbc_(\d+)$/ )[1] );
				var tmplinks = hotcat.interwikis.getById( hotinter_newlinks[id][2] ).newlinks;
				for ( var j = 0; j<tmplinks.length; j++ ) {
					if ( tmplinks[j].id == hotinter_newlinks[id][0] ) tmplinks.splice( j, 1 );
				}
				hotcat.interwikis.cleanup();
			} );
			hctmp.cleanbuttondel.appendChild( document.createTextNode( 'X' ) );
 
			hctmp.cleanlinkfrom = document.createElement( 'a' );
			//hctmp.cleanlinkfrom.href = '/wiki/' + hotinter_newlinks[j][2] + ':' + encodeURIComponent( hotinter_newlinks[j][3] );
			var wikiDetails = hotcat.getWikiById( hotinter_newlinks[j][2] );
			hctmp.cleanlinkfrom.href = 'https://' + wikiDetails.domain + wikiDetails.path + 'index.php?title=' + hotinter_newlinks[j][3];
			hctmp.cleanlinkfrom.setAttribute( 'target', '_blank' );
			hctmp.cleanlinkfrom.appendChild( document.createTextNode( hotinter_newlinks[j][2] + ':' + hotinter_newlinks[j][3] ) );
 
			hctmp.cleanlinkto = document.createElement( 'a' );
			//hctmp.cleanlinkto.href = '/wiki/' + hotinter_newlinks[j][0] + ':' + encodeURIComponent( hotinter_newlinks[j][1] );
			wikiDetails = hotcat.getWikiById( hotinter_newlinks[j][0] );
			hctmp.cleanlinkto.href = 'https://' + wikiDetails.domain + wikiDetails.path + 'index.php?title=' + hotinter_newlinks[j][1];
			hctmp.cleanlinkto.setAttribute( 'target', '_blank' );
			hctmp.cleanlinkto.appendChild( document.createTextNode( hotinter_newlinks[j][0] + ':' + hotinter_newlinks[j][1] ) );
 
			hctmp.clean_line.appendChild( hctmp.cleanbuttoncustom );
			hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
			hctmp.clean_line.appendChild( hctmp.cleanbuttondel );
			hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
			//hctmp.clean_line.appendChild( hctmp.cleanlinkfrom );
			hctmp.clean_line.insertAdjacentHTML( 'beforeend', hotcat.i18n.msg( 'alsoHas', hctmp.cleanlinkfrom.outerHTML, hctmp.cleanlinkto.outerHTML ).plain() );
			//hctmp.clean_line.appendChild( hctmp.cleanlinkto );
			hctmp.cleannew_list.appendChild( hctmp.clean_line );
		}
	}
	if ( hctmp.cleannew_list.childNodes.length > 0 ) {
		hctmp.cleannew_head1 = document.createElement( 'h4' );
		hctmp.cleannew_head1.appendChild( document.createTextNode( hotcat.i18n.msg( 'wikisAlsoHave', mw.config.get( 'wgSiteName' ) ).plain() ) );
		hctmp.cleannew_head2 = document.createElement( 'p' );
		hctmp.cleannew_head2.style.color = '#555';
		hctmp.cleannew_head2.style.fontSize = 'x-small';
		hctmp.cleannew_head2.appendChild( document.createTextNode( hotcat.i18n.msg( 'clickToAdd', mw.config.get( 'wgSiteName' ) ).plain() + '\n' + hotcat.i18n.msg( 'clickToDelete' ).plain() ) );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleannew_head1 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleannew_head2 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleannew_list );
	}
 
	//------------- Missing interwiki links ------------- 
	//Links of local wiki missing elsewhere -> on [2,3] the link [0,1] is missing
	hctmp.cleanmiss_list = document.createElement( 'ul' );
	if ( hctmp.cleanmiss_list.classList ) {
		hctmp.cleanmiss_list.classList.add( 'hc_editlist' );
	} else {
		hctmp.cleanmiss_list.className += ' hc_editlist';
	}
	hctmp.cleanmiss_list.id = 'hotcat_noiwlinks';
	for ( var j = 0; j < hotinter_nolinks.length; j++ ) {
		hctmp.clean_line = document.createElement( 'li' );
 
		hctmp.cleanbuttoncustom = document.createElement( 'span' ); // Add a link from local wiki to this foreign wiki
		hctmp.cleanbuttoncustom.title = hotcat.i18n.msg( 'accept' ).plain();
		hctmp.cleanbuttoncustom.id = 'hccbd_' + j;
		hctmp.cleanbuttoncustom.style.cursor = 'pointer';
		hctmp.cleanbuttoncustom.style.color = hotcat.settings.linkcolor;
		hctmp.cleanbuttoncustom.addEventListener( 'click', function hciw_add_new_to_other_wiki() {
			var id = Number( this.id.match( /^hccbd_(\d+)$/ )[1] );
			hotcat.interwikis.add2wiki( hotinter_nolinks[id][2], hotinter_nolinks[id][0], hotinter_nolinks[id][1] );
		});
		hctmp.cleanbuttoncustom.appendChild( document.createTextNode( '√' ) );
 
		hctmp.cleanbuttondel = document.createElement( 'span' ); // Remove incorrect link in local wiki
		hctmp.cleanbuttondel.title = hotcat.i18n.msg( 'refuse' ).plain();
		hctmp.cleanbuttondel.id = 'hccbe_' + hotinter_nolinks[j][0];
		hctmp.cleanbuttondel.style.cursor = 'pointer';
		hctmp.cleanbuttondel.style.color = hotcat.settings.linkcolor;
		hctmp.cleanbuttondel.addEventListener( 'click', function hciw_delete_wrong_from_jp() {
			var id = Number( this.id.match( /^hccbe_(\d+)$/ )[1] );
			hotcat.interwikis.delfromwiki( mw.config.get( 'wgContentLanguage' ), id, '' );
		});
		hctmp.cleanbuttondel.appendChild( document.createTextNode( 'X' ) );
 
		hctmp.cleanlinkfrom = document.createElement( 'a' );
		//hctmp.cleanlinkfrom.href = '/wiki/' + hotinter_nolinks[j][2] + ':' + encodeURIComponent( hotinter_nolinks[j][3] );
		wikiDetails = hotcat.getWikiById( hotinter_nolinks[j][2] );
		hctmp.cleanlinkfrom.href = 'https://' + wikiDetails.domain + wikiDetails.path + hotinter_nolinks[j][3];
		hctmp.cleanlinkfrom.setAttribute( 'target', '_blank' );		
		hctmp.cleanlinkfrom.appendChild( document.createTextNode( hotinter_nolinks[j][2] + ':' + hotinter_nolinks[j][3] ) );
 
		hctmp.cleanlinkto = document.createElement( 'a' );
		if ( hotinter_nolinks[j][0] != mw.config.get( 'wgContentLanguage' ) ) {
			//hctmp.cleanlinkto.href = '/wiki/' + hotinter_nolinks[j][0] + ':' + encodeURIComponent( hotinter_nolinks[j][1] );
			wikiDetails = hotcat.getWikiById( hotinter_nolinks[j][0] );
			hctmp.cleanlinkto.href = 'https://' + wikiDetails.domain + wikiDetails.path + 'index.php?title=' +  hotinter_nolinks[j][1];
		} else {
			hctmp.cleanlinkto.href = mw.util.getUrl( hotinter_nolinks[j][1] );
		}
		hctmp.cleanlinkto.setAttribute( 'target', '_blank' );
		hctmp.cleanlinkto.appendChild( document.createTextNode( hotinter_nolinks[j][0] + ':' + hotinter_nolinks[j][1] ) );
 
		hctmp.clean_line.appendChild( hctmp.cleanbuttoncustom );
		hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
		hctmp.clean_line.appendChild( hctmp.cleanbuttondel);
		hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
		//hctmp.clean_line.appendChild( hctmp.cleanlinkfrom );
		hctmp.clean_line.insertAdjacentHTML( 'beforeend', hotcat.i18n.msg( 'doesntHave', hctmp.cleanlinkfrom.outerHTML, hctmp.cleanlinkto.outerHTML ).plain() );
		//hctmp.clean_line.appendChild( hctmp.cleanlinkto );
		hctmp.cleanmiss_list.appendChild( hctmp.clean_line );
	}
	if ( hctmp.cleanmiss_list.childNodes.length > 0 ) {
		hctmp.cleanmiss_head1 = document.createElement( 'h4' );
		hctmp.cleanmiss_head1.appendChild( document.createTextNode( hotcat.i18n.msg( 'missingLinks' ).plain() ) );
		hctmp.cleanmiss_head2 = document.createElement( 'p' );
		hctmp.cleanmiss_head2.style.color = '#555';
		hctmp.cleanmiss_head2.style.fontSize = 'x-small';
		hctmp.cleanmiss_head2.appendChild( document.createTextNode( hotcat.i18n.msg( 'clickToAddThere' ).plain() + '\n' + hotcat.i18n.msg( 'clickNotToAddThere' ).plain() ) );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleanmiss_head1 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleanmiss_head2 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleanmiss_list );
	}
 
	//------------- Different interwiki links -------------
	//Links different elsewhere -> [2,3] has a different link than local wiki for [0,1]
	hctmp.cleandiff_list = document.createElement( 'ul' );
	if ( hctmp.cleandiff_list.classList ) {
		hctmp.cleandiff_list.classList.add( 'hc_editlist' );
	} else {
		hctmp.cleandiff_list.className += ' hc_editlist';
	}
	hctmp.cleandiff_list.id = 'hotcat_newiwlinks';
	for ( var i = 0; i < hotinter_difflinks.length; i++ ) {
		diff_array_int = -1;
		for (var j = 0; j < hotcat.interwikis.array.length; j++ ) {
			if ( hotinter_difflinks[i][0] == hotcat.interwikis.array[j].id ) diff_array_int = j;
		}
 
		hctmp.clean_line = document.createElement( 'li' );
 
		hctmp.cleanbuttoncustom = document.createElement( 'span' ); // Correct the link to be identical with local wiki
		hctmp.cleanbuttoncustom.title = hotcat.i18n.msg( 'correct' ).plain();
		hctmp.cleanbuttoncustom.id = 'hccbf_' + hotinter_difflinks[i][2] + '_' + hotinter_difflinks[i][0];
		hctmp.cleanbuttoncustom.style.cursor = 'pointer';
		hctmp.cleanbuttoncustom.style.color = hotcat.settings.linkcolor;
		hctmp.cleanbuttoncustom.addEventListener( 'click', function hciw_update_link_to_jedipedia_link() {
			var tmpmatch = this.id.match( /^hccbf_(.+)_(.+)$/ );
			var wiki2edit = tmpmatch[1];
			var link2edit = tmpmatch[2];
			var tmpwiki = hotcat.interwikis.getById( wiki2edit );
			for ( j = 0; j < tmpwiki.newlinks.length; j++) {
				if ( tmpwiki.newlinks[j].id == link2edit ) {
					if ( link2edit == mw.config.get( 'wgContentLanguage' ) ) tmpwiki.newlinks[j].title = hotcat.curpage.replace( /_/g, ' ' ); else tmpwiki.newlinks[j].title=hotcat.interwikis.getById( link2edit ).title;
				}
			}
			hotcat.interwikis.cleanup();
		});
		hctmp.cleanbuttoncustom.appendChild( document.createTextNode( '√' ) );
 
		hctmp.cleanbuttondel = document.createElement( 'span' ); // Accepte le lien de la page respective pour Star Wars Wiki
		if (hotinter_difflinks[i][0] != mw.config.get( 'wgContentLanguage' ) ) {
			hctmp.cleanbuttondel.title = hotcat.i18n.msg( 'accept' ).plain();
			hctmp.cleanbuttondel.id = 'hccbg_' + i;
			hctmp.cleanbuttondel.style.cursor = 'pointer';
			hctmp.cleanbuttondel.style.color = hotcat.settings.linkcolor;
			hctmp.cleanbuttondel.addEventListener( 'click', function hciw_copy_link_to_jedipedia() {
				var id = Number( this.id.match( /^hccbg_(\d+)$/ )[1] );
				var tmpwiki = hotcat.interwikis.getById( hotinter_difflinks[id][0] );
				tmpwiki.title = hotinter_difflinks[id][1];
				tmpwiki.canedit = false;
				hotcat.interwikis.load( tmpwiki.id, tmpwiki.title );
				hotcat.interwikis.redraw();
				hotcat.interwikis.cleanup();
			});
		} else {
			hctmp.cleanbuttondel.style.color = '#bbb';
		}
		hctmp.cleanbuttondel.appendChild( document.createTextNode( 'X' ) );
 
		hctmp.cleanlinkfrom = document.createElement( 'a' );
		//hctmp.cleanlinkfrom.href = '/wiki/' + hotinter_difflinks[i][2] + ':' + encodeURIComponent( hotinter_difflinks[i][3] );
		hctmp.cleanlinkfrom.href = 'https://' + hotcat.getWikiById( hotinter_difflinks[i][2] ).domain + hotcat.getWikiById( hotinter_difflinks[i][2] ).path + 'index.php?title=' + hotinter_difflinks[i][3];
		hctmp.cleanlinkfrom.setAttribute( 'target', '_blank' );
		hctmp.cleanlinkfrom.appendChild( document.createTextNode( hotinter_difflinks[i][2] + ':' + hotinter_difflinks[i][3] ) );
 
		hctmp.cleanlinkto = document.createElement( 'a' );
		if (hotinter_difflinks[i][0] != mw.config.get( 'wgContentLanguage' ) ) {
			//hctmp.cleanlinkto.href = '/wiki/'+hotinter_difflinks[i][0]+ ':' + encodeURIComponent( hotinter_difflinks[i][1] );
			hctmp.cleanlinkto.href = 'https://' + hotcat.getWikiById( hotinter_difflinks[i][0] ).domain + hotcat.getWikiById( hotinter_difflinks[i][0] ).path + 'index.php?title=' + hotinter_difflinks[i][1];
		} else {
			hctmp.cleanlinkto.href = mw.util.getUrl( hotinter_difflinks[i][1] );
		}
		hctmp.cleanlinkto.setAttribute( 'target', '_blank' );
		hctmp.cleanlinkto.appendChild( document.createTextNode( hotinter_difflinks[i][0] + ':' + hotinter_difflinks[i][1] ) );
 
		hctmp.cleanlink3 = document.createElement( 'a' );
		hctmp.cleanlink3.setAttribute( 'target', '_blank' );
 
		if ( hotinter_difflinks[i][0] == mw.config.get( 'wgContentLanguage' ) ) {
			hctmp.cleanlink3.href = mw.util.getUrl( hotcat.curpage );
			hctmp.cleanlink3.appendChild( document.createTextNode( mw.config.get( 'wgContentLanguage' ) + ':' + hotcat.curpage.replace( /_/g, ' ' ) ) );
		} else {
			//hctmp.cleanlink3.href = '/wiki/' + hotcat.interwikis.array[diff_array_int].id + ':' + encodeURIComponent( hotcat.interwikis.array[diff_array_int].title );
			hctmp.cleanlink3.href = 'https://' + hotcat.getWikiById( hotcat.interwikis.array[diff_array_int].id ).domain + hotcat.getWikiById( hotcat.interwikis.array[diff_array_int].id ).path + 'index.php?title=' + encodeURIComponent( hotcat.interwikis.array[diff_array_int].title );
			hctmp.cleanlink3.appendChild( document.createTextNode( hotcat.interwikis.array[diff_array_int].id + ':' + hotcat.interwikis.array[diff_array_int].title ) );
		}
 
		hctmp.clean_line.appendChild( hctmp.cleanbuttoncustom );
		hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
		hctmp.clean_line.appendChild( hctmp.cleanbuttondel );
		hctmp.clean_line.appendChild( document.createTextNode( ' ' ) );
		//hctmp.clean_line.appendChild( hctmp.cleanlinkfrom );
		hctmp.clean_line.insertAdjacentHTML( 'beforeend', hotcat.i18n.msg( 'hasLink', hctmp.cleanlinkfrom.outerHTML, hctmp.cleanlinkto.outerHTML ).plain() );
		//hctmp.clean_line.appendChild( hctmp.cleanlinkto );
		hctmp.clean_line.appendChild( document.createTextNode( ' (' ) );
		hctmp.clean_line.insertAdjacentHTML( 'beforeend', hotcat.i18n.msg( 'localLink', mw.config.get( 'wgSiteName' ), hctmp.cleanlink3.outerHTML ).plain() );
		//hctmp.clean_line.appendChild( hctmp.cleanlink3 );
		hctmp.clean_line.appendChild( document.createTextNode( ')' ) );
		hctmp.cleandiff_list.appendChild( hctmp.clean_line );
	}
	if ( hctmp.cleandiff_list.childNodes.length > 0 ) {
		hctmp.cleandiff_head1 = document.createElement( 'h4' );
		hctmp.cleandiff_head1.appendChild( document.createTextNode( hotcat.i18n.msg( 'otherLinks' ).plain() ) );
		hctmp.cleandiff_head2 = document.createElement( 'p' );
		hctmp.cleandiff_head2.style.color = '#555';
		hctmp.cleandiff_head2.style.fontSize = 'x-small';
		hctmp.cleandiff_head2.appendChild( document.createTextNode( hotcat.i18n.msg( 'clickToCorrect' ).plain() + '\n' + hotcat.i18n.msg( 'clickToTake' ).plain() ) );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleandiff_head1 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleandiff_head2 );
		document.getElementById( 'interwiki_cleanup' ).appendChild( hctmp.cleandiff_list );
	}
 
	//When there is nothing to change
	if ( document.getElementById( 'interwiki_cleanup' ).childNodes.length == 0 ) {
		document.getElementById( 'interwiki_cleanup' ).appendChild( document.createTextNode( hotcat.i18n.msg( 'nothingToChange' ).plain() ) );
	}
}
 
//Sort the interwiki links array by codes
hotcat.sortInterwikis = function( a, b ) {
	var a2 = hotcat.settings.interwiki_codes[a.id];
	var b2 = hotcat.settings.interwiki_codes[b.id];
	if ( a2 > b2 ) return 1;
	if ( a2 < b2 ) return -1;
	if ( a.type != b.type ) return ( a.type > b.type ) ? 1 : -1;
	return ( a.title == b.title ) ? 0 : ( a.title > b.title ) ? 1 : -1;
}
hotcat.sortInterwikisPl = function( a, b ) {
	var a2 = hotcat.settings.interwiki_codes_pl[a.id];
	var b2 = hotcat.settings.interwiki_codes_pl[b.id];
	if (a2 > b2) return 1;
	if (a2 < b2) return -1;
	if (a.type != b.type) return (a.type > b.type) ? 1 : -1;
	return (a.title == b.title) ? 0 : ( a.title > b.title ) ? 1 : -1;
}
 
//Submit edits
hotcat.submit = function() {
	var hctmp = {};
	//VARIABLEN
 
	hctmp.interwikis = [];
	for (var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		var tmpiwtext = hotcat.interwikis.array[i].id + ':' + hotcat.interwikis.array[i].title;
		hctmp.interwikis.push(tmpiwtext);
	}
 
	//GUI
	hctmp.e = {};
	hctmp.e.submitstatusheadline = document.createElement( 'h3' );
 
	hctmp.e.submitstatuslogo = document.createElement( 'img' );
	hctmp.e.submitstatuslogo.src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/e/ee/HOTCAT_Logo.png/revision/latest?cb=20181110120640';
	hctmp.e.submitstatuslogo.alt = 'HotCat';
 
	hctmp.e.submitstatusheadline.appendChild( hctmp.e.submitstatuslogo );
	hctmp.e.submitstatusheadlinetext = document.createElement( 'span' );
	hctmp.e.submitstatusheadlinetext.id = 'hc_submit_heading';
	hctmp.e.submitstatusheadlinetext.appendChild( document.createTextNode( ' '+hotcat.i18n.msg( 'updating' ).plain() + ' ' ) );
	hctmp.e.submitstatusheadline.appendChild( hctmp.e.submitstatusheadlinetext );
 
	hctmp.e.submitstatuswarning = document.createElement( 'h4' );
	hctmp.e.submitstatuswarning.id = 'hc_submit_warning';
	hctmp.e.submitstatuswarning.appendChild( document.createTextNode( hotcat.i18n.msg( 'keepWindowOpened' ).plain() ) );
 
	hctmp.e.submitstatuslist = document.createElement( 'ul' );
	hctmp.e.submitstatuslist.id = 'submitstatus_table';
 
	hctmp.e.lineinsert_working = document.createElement( 'li' );
	hctmp.e.lineinsert_working_img = document.createElement( 'img' );
	hctmp.e.lineinsert_working_img.id = 'submitstatus_img_' + mw.config.get( 'wgContentLanguage' );
	hctmp.e.lineinsert_working_img.src= 'https://vignette.wikia.nocookie.net/fr.starwars/images/d/de/Ajax-loader.gif/revision/latest?cb=20181110120648';
	hctmp.e.lineinsert_working_status = document.createElement( 'span' );
	hctmp.e.lineinsert_working_status.id = 'submitstatus_status_' + mw.config.get( 'wgContentLanguage' );
	hctmp.e.lineinsert_working_status.appendChild( document.createTextNode( ' ' + mw.config.get( 'wgContentLanguage' ) + ': ' + hotcat.i18n.msg( 'pageBeingEdited' ).plain() ) );
	hctmp.e.lineinsert_working.appendChild( hctmp.e.lineinsert_working_img );
	hctmp.e.lineinsert_working.appendChild( hctmp.e.lineinsert_working_status );
	hctmp.e.submitstatuslist.appendChild( hctmp.e.lineinsert_working );
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		if ( hotcat.interwikis.array[i].id != 'de' && hotcat.interwikis.array[i].id != 'pl' && hotcat.interwikis.array[i].id != 'fi' ) {
			hctmp.e.lineinsert_working = document.createElement( 'li' );
			hctmp.e.lineinsert_working_img = document.createElement( 'img' );
			hctmp.e.lineinsert_working_img.id = 'submitstatus_img_' + hotcat.interwikis.array[i].id;
			hctmp.e.lineinsert_working_img.src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/d/de/Ajax-loader.gif/revision/latest?cb=20181110120648';
			hctmp.e.lineinsert_working_status = document.createElement( 'span' );
			hctmp.e.lineinsert_working_status.id = 'submitstatus_status_' + hotcat.interwikis.array[i].id;
			hctmp.e.lineinsert_working_status.appendChild( document.createTextNode( ' ' + hotcat.interwikis.array[i].id + ': ' + hotcat.i18n.msg( 'pageBeingEdited' ).plain() ) );
			hctmp.e.lineinsert_working.appendChild( hctmp.e.lineinsert_working_img );
			hctmp.e.lineinsert_working.appendChild( hctmp.e.lineinsert_working_status );
			hctmp.e.submitstatuslist.appendChild( hctmp.e.lineinsert_working );
		}
	}
 
	while ( document.getElementById( 'hotcat' ).firstChild ) { document.getElementById( 'hotcat' ).removeChild( document.getElementById( 'hotcat' ).firstChild ); }
	document.getElementById( 'hotcat' ).appendChild( hctmp.e.submitstatusheadline );
	document.getElementById( 'hotcat' ).appendChild( hctmp.e.submitstatuswarning );
	document.getElementById( 'hotcat' ).appendChild( hctmp.e.submitstatuslist );
 
	hotcat.submit_counter = hotcat.interwikis.array.length;
 
	//--- Ajax request for local wiki ---
	$.ajax( {
		url: mw.util.wikiScript( 'api' ),
		data: {
			action: 'parse',
			prop: 'wikitext',
			page: hotcat.curpage,
			format: 'json'
		},
		dataType: 'json',
		success: function( d ) {
			if ( d.error ) {
				return; // or handle error
			} else {
				if ( d.parse.wikitext !== undefined ) {
					//var oldwikitext = d.parse.wikitext[*];
				}
			}
		}
	} ).done( function( d ) {
		var oldwikitext = d.parse.wikitext['*'];
		var interlangTemplateRegex = /{{(Template:|Predefinição:)?Interlang[\s\S]+?}}/i
		var defaultSortRegex = /\{\{(DEFAULTSORT|ORDENAR)\:.*?\}\}/i;
		var categoryRegex = /\[\[(Category|Categoria|Categoría|Categorie|Catégorie|Kategori|Kategoria|Kategorie|Kategorija|Kategória|Luokka|Κατηγορία|Категорија|Категория|Категорія|분류|カテゴリ)\:.+?\]\]/i;
		var insert = '<INSERT_INTERWIKI_HERE>';
 
		if ( interlangTemplateRegex.test( oldwikitext ) ) {
			oldwikitext = oldwikitext.replace( interlangTemplateRegex, insert );
		} else if ( defaultSortRegex.test( oldwikitext ) ) { // search for DEFAULTSORT
			var defaultsort = oldwikitext.match( defaultSortRegex );
			oldwikitext = oldwikitext.replace( defaultSortRegex, insert + '\n\n' + defaultsort[0] );
		} else if ( categoryRegex.test( oldwikitext ) ){ // search for Category
			var categoryFind = oldwikitext.match( categoryRegex );
			oldwikitext = oldwikitext.replace( categoryRegex, insert + '\n\n' + categoryFind[0] );
		} else { // no template, no defaultsort, no categories
			oldwikitext = oldwikitext + '\n' + insert;
		}
 
		var newwikitext = oldwikitext.replace( insert, hotcat.formatInterlang( hotcat.interwikis.array, mw.config.get( 'wgContentLanguage' ) ) );
 
		$.ajax( {
			type: 'POST',
			dataType: 'text',
			url: mw.util.wikiScript( 'api' ),
			method: 'POST',
			data: {
				action: 'edit',
				format: 'json',
				title: hotcat.curpage,
				text: newwikitext,
				minor: true,
				bot: true,
				nocreate: true,
				summary: hotcat.i18n.inContentLang().msg( 'summary' ).plain(),
				token: mw.user.tokens.get( 'csrfToken' ),
			},
			xhrFields: {
				withCredentials: true
			},
			crossdomain: true,
			success: function( result ) {
				return JSON.parse( result );
			},
			error: function( xhr, status, error ) {
				alert( status );
			}
		} ).always( function( data ) {
			var submitstatus_img_id = 'submitstatus_img_' + mw.config.get( 'wgContentLanguage' );
			var submitstatus_status_id = 'submitstatus_status_' + mw.config.get( 'wgContentLanguage' );
			var d = JSON.parse( data );
			document.getElementById( submitstatus_img_id ).src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/8/83/10px-Haken.svg.png/revision/latest?cb=20181110120633';
			document.getElementById( submitstatus_status_id ).firstChild.data += ' '+hotcat.i18n.msg( 'done') .plain() + ' ';
			if ( d.edit.result != null && d.edit.result != 'undefined' ) {
				if ( d.edit.result == 'Success' ) {
					if ( d.edit.nochange != null ) {
						var tmpstatus = document.createElement( 'span' );
						tmpstatus.style.fontStyle = 'italic';	
						tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'noChanges' ).plain() ) );
						document.getElementById( submitstatus_status_id ).appendChild( tmpstatus );
					} else if ( d.edit.newrevid != null ) {
						var tmpstatus = document.createElement( 'a' );
						tmpstatus.href = mw.util.wikiScript() + '?title=' + hotcat.curpage + '&diff=' + d.edit['newrevid'] + 'oldid=' + d.edit['oldrevid'];
						tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'diff' ).plain() ) );
						document.getElementById( submitstatus_status_id ).appendChild( tmpstatus );
					}
				} else if ( d.edit.result == 'Failure' ) {
					document.getElementById( submitstatus_img_id ).src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/8/83/10px-Haken.svg.png/revision/latest?cb=20181110120633';
					document.getElementById( submitstatus_status_id ).firstChild.data += ' ' + hotcat.i18n.msg( 'error' ) + ' ';
					document.getElementById( submitstatus_status_id ).appendChild( tmpstatus );
				}
			} else if ( d.error != null ) {
				var tmperror = this.responseText.substring(8);
				var tmpstatus = document.createElement( 'span' );
				tmpstatus.style.fontWeight = 'bold';
				switch ( tmperror ) {
					case 'protectedpage': tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorProtected' ).plain() ) ); break;
					default: tmpstatus.appendChild( document.createTextNode( 'Error: ' + tmperror) );
				}
				document.getElementById( submitstatus_status_id ).appendChild( tmpstatus );
			} else if ( this.responseText.substring( 0, 6 ) === 'ERROR=' ) {
				var tmpstatus = document.createElement( 'span' );
				tmpstatus.style.fontWeight = 'bold';
				tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorPleaseReport' ).plain() + ' ' + this.responseText.substring(6).replace( /</g, '&lt;' ) ) );
				document.getElementById( submitstatus_status_id ).appendChild( tmpstatus );
			} else {
				var tmpstatus = document.createElement( 'span' );
				tmpstatus.style.fontWeight = 'bold';
				tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorPleaseReport' ).plain() + ' ' ) );
				document.getElementById( submitstatus_status_id ).appendChild( tmpstatus) ;
				document.getElementById( submitstatus_status_id ).appendChild( document.createTextNode( this.responseText.replace( /</g, '&lt;' ) ) );
			}
			hotcat.checkifdone();
		} );
	} ); 
 
	//--- Ajax requests for foreign wikis ---
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		hotcat.submitForeign( hotcat.interwikis.array[i] );
	}
};
 
hotcat.checkifdone = function() {
	hotcat.submit_counter--;
	if ( hotcat.submit_counter < 0 ) {
		document.getElementById( 'hc_submit_heading' ).firstChild.data = ' ' + hotcat.i18n.msg( 'ready' ).plain();
		document.getElementById( 'hc_submit_warning' ).firstChild.data = hotcat.i18n.msg( 'windowCanBeClosed' ).plain();
	}
};
 
hotcat.submitForeign = function( wiki ) {
	if (wiki.id != 'de' && wiki.id != 'fi' && wiki.id != 'pl') {
 
		var urlWiki = 'https://' + hotcat.getWikiById( wiki.id ).domain + hotcat.getWikiById( wiki.id ).path + 'api.php';
 
		$.ajax( {
			url: urlWiki,
			data: {
				action: 'parse',
				prop: 'wikitext',
				page: wiki.title,
				format: 'json'
			},
			dataType: 'json',
			success: function( d ) {
				if ( d.error ) {
					return; // or handle error
				} else {
					if ( d.parse.wikitext !== undefined ) {
						//var oldwikitext = d.parse.wikitext[*];
					}
				}
			}
		} ).done( function( d ) {
			var oldwikitext = d.parse.wikitext['*'];
			var interlangTemplateRegex = /{{(Template:|Predefinição:)?Interlang[\s\S]+?}}/i
			var defaultSortRegex = /\{\{(DEFAULTSORT|ORDENAR)\:.*?\}\}/i;
			var categoryRegex = /\[\[(Category|Categoria|Categoría|Categorie|Catégorie|Kategori|Kategoria|Kategorie|Kategorija|Kategória|Luokka|Κατηγορία|Категорија|Категория|Категорія|분류|カテゴリ)\:.+?\]\]/i;
			var insert = '<INSERT_INTERWIKI_HERE>';
 
			if ( interlangTemplateRegex.test( oldwikitext ) ) {
				oldwikitext = oldwikitext.replace( interlangTemplateRegex, insert );
			} else if ( defaultSortRegex.test( oldwikitext ) ) { // search for DEFAULTSORT
				var defaultsort = oldwikitext.match( defaultSortRegex );
				oldwikitext = oldwikitext.replace( defaultSortRegex, insert + '\n\n' + defaultsort[0] );
			} else if ( categoryRegex.test( oldwikitext ) ){ // search for Category
				var categoryFind = oldwikitext.match( categoryRegex );
				oldwikitext = oldwikitext.replace( categoryRegex, insert + '\n\n' + categoryFind[0] );
			} else { // no template, no defaultsort, no categories
				oldwikitext = oldwikitext + '\n' + insert;
			}
 
			var interlangToInsert = '';
			if ( hotcat.getWikiById( wiki.id ).interlang ) { interlangToInsert = hotcat.formatInterlang( wiki.newlinks, wiki.id ); }
			else { interlangToInsert = hotcat.formatInterwikis( wiki.newlinks ); }
 
			var newwikitext = oldwikitext.replace( insert, interlangToInsert );
			
			$.ajax( {
				url: urlWiki,
				data: {
					action: 'query',
					meta: 'tokens',
					type: 'csrf',
					format: 'json'
				},
				dataType: 'json',
				success: function( d ) {
					if ( d.error ) {
						return; // or handle error
					}
				}
			} ).done( function( d ) {
				var editToken = d.query.tokens.csrftoken;
				$.ajax( {
					url: urlWiki,
					type: 'POST',
					dataType: 'text',
					method: 'POST',
					data: {
						action: 'edit',
						format: 'json',
						title: wiki.title,
						text: newwikitext,
						minor: true,
						bot: true,
						nocreate: true,
						summary: hotcat.i18n.inLang( wiki.id ).msg( 'summary' ).plain(),
						token: editToken
					},
					xhrFields: { 
						withCredentials: true 
					},
					crossdomain: true,
					success: function( result ) {
						//return JSON.parse( result );
					},
					error: function( xhr, status, error ) {
						alert( status );
					}
				} ).always( function( data ) {
					var d = JSON.parse( data );
					document.getElementById( 'submitstatus_img_' + wiki.id ).src = 'https://vignette.wikia.nocookie.net/fr.starwars/images/8/83/10px-Haken.svg.png/revision/latest?cb=20181110120633';
					document.getElementById( 'submitstatus_status_' + wiki.id).firstChild.data += ' ' + hotcat.i18n.msg( 'done' ).plain() + ' ';
 
					if ( d.edit.result != null && d.edit.result != 'undefined' ) {
						if ( d.edit.result == 'Success' ) {
							if ( d.edit.nochange != null ) {
								var tmpstatus = document.createElement( 'span' );
								tmpstatus.style.fontStyle = 'italic';	
								tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'noChanges' ).plain() ) );
								document.getElementById( 'submitstatus_status_' + wiki.id ).appendChild( tmpstatus );
							} else if ( d.edit.newrevid != null ) {
								var tmpstatus = document.createElement( 'a' );
								tmpstatus.href = 'http://starwars.fandom.com/' + wiki.id + '/index.php?title=' + hotcat.curpage + '&diff=' + d.edit['newrevid'] + 'oldid=' + d.edit['oldrevid'];
								tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'diff' ).plain() ) );
								document.getElementById( 'submitstatus_status_' + wiki.id ).appendChild( tmpstatus );
							}
						} else if ( d.edit.result == 'Failure' ) {
							document.getElementById( 'submitstatus_img_' + wiki.id ).src = '/w/images/thumb/3/32/Haken.svg/10px-Haken.svg.png';
							document.getElementById( 'submitstatus_status_' + wiki.id ).firstChild.data += ' ' + hotcat.i18n.msg( 'error' ).plain() + ' ';
							document.getElementById( 'submitstatus_status_' + wiki.id ).appendChild( tmpstatus );
						}
					} else if ( d.error != null ) {
						var tmperror = this.responseText.substring(8);
						var tmpstatus = document.createElement( 'span' );
						tmpstatus.style.fontWeight = 'bold';
						switch ( tmperror ) {
							case 'protectedpage': tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorProtected' ).plain() ) ); break;
							default: tmpstatus.appendChild( document.createTextNode( 'Error: ' + tmperror ) );
						}
						document.getElementById( 'submitstatus_status_' + wiki.id ).appendChild( tmpstatus );
					} else if ( this.responseText.substring( 0, 6 ) === 'ERROR=' ) {
						var tmpstatus = document.createElement( 'span' );
						tmpstatus.style.fontWeight = 'bold';
						tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorPleaseReport' ).plain() + ' ' + this.responseText.substring(6).replace( /</g, '&lt;' ) ) );
						document.getElementById( 'submitstatus_status_' + wiki.id).appendChild( tmpstatus );
					} else {
						var tmpstatus = document.createElement( 'span' );
						tmpstatus.style.fontWeight = 'bold';
						tmpstatus.appendChild( document.createTextNode( hotcat.i18n.msg( 'errorPleaseReport' ) + ' ') );
						document.getElementById( 'submitstatus_status_' + wiki.id).appendChild( tmpstatus );
						document.getElementById( 'submitstatus_status_' + wiki.id).appendChild( document.createTextNode( this.responseText.replace( /</g, '&lt;' ) ) );
					}
					hotcat.checkifdone();
				} );
			} );
		} ); 
	}
};

hotcat.extractInterWikiData = function( wikitext, title, wiki ) {
	var extract = '';
	var redirect = /^\#[\s\S]+?\[\[[\s\S]+?\]\]/g
	var interlangTemplate = /{{(Template:|Predefinição:)?Interlang[\s\S]+?}}/i;
	var regularInterwiki = /\[\[([a-z]{2}:[\s\S\|]+?)\]\]/gm;
	var erasTemplate = /{{(Top|Eras|Univers|Ere)[\s\S]+?}}/i;
 
	if ( wikitext !== null ) {
		//check redirection
		if ( wikitext.match( redirect ) !== null ){
			extract = 'error=redirect\n';
 
			var link = wikitext.match( /\[\[[\s\S]+?\]\]/gm )
			extract = extract + 'redirect=' + link.toString().replace( /\[\[|\]\]/gm, '' );
 
		} else {
			var interwiki = wikitext.match( interlangTemplate );
			if ( interwiki !== null ) {
				extract = interwiki.toString().replace( / = /gm, '=' ).replace( /\n/gm, '' ).replace( /\|/gm, '\n|' ).replace( /({{Interlang)|\||}},/gm, '' ).trim();
 
			} else {
				// no interlang template => we search regular interwiki
				interwiki = wikitext.match( regularInterwiki );
				if ( interwiki !== null ) {
					extract= interwiki.toString().replace( /\n/gm, '' ).replace( /\|/gm, '\n|' ).replace( /\[\[|\]\]/gm, '' ).replace( /:/gm, '=' ).trim();
				}
			}
			var eras = wikitext.match( erasTemplate );
			if ( eras !== null ) {
				//console.log(eras[0]);
				if ( /\|(fa|featured|qualite|destacado|migliori|destaque)(\||}})/i.test( eras[0] ) ) { extract = 'isFA=true\n' + extract; } // Featured article
				else if ( /\|(ga|good|bon|bueno|buoni|bom)(\||}})/i.test(eras[0] ) ) { extract = 'isGA=true\n' + extract; } // Good article
				else if ( /\|(ca|comp|completi)(\||}})/i.test(eras[0] ) ) { extract = 'isCA=true\n' + extract; } // Comprehensive article
			}
			
			if ( /\/(Legends|Legendy|Leyendas|Légendes|Legendák|レジェンズ|레전드|Легенди|ლეგენდები)/.test( title ) ) { extract = 'type=legends\n' + extract; }
			else if ( /Legends:/.test( title ) ) { extract = 'type=legends\n' + extract; }
			else if ( /\/(Canone|Канон)/.test( title ) ) { extract = 'type=kanon\n' + extract; }
			else if ( eras !== null ) { // ignore pages without {{Top}} or equivalent
				if ( /\|(leg|pre|btr|old|imp|new|njo|lcy|inf|antr|velha|ascimp|nova|noj)(\||}})/i.test( eras[0] ) ) { extract = 'type=legends\n' + extract; }
				else if ( /\|type=(legends|légendes|leyendas)/i.test( eras[0] ) ) { extract = 'type=legends\n' + extract; }
				else if ( /\|type=canon/i.test( eras[0] ) ) { extract = 'type=kanon\n' + extract; }
				else {
					if ( wiki == 'ru' || wiki == 'it' ) { extract = 'type=legends\n' + extract; } // ru and it default to Legends
					else { extract = 'type=kanon\n' + extract; } // others default to Canon
				}
			}
		}
	}
	return extract;
};
 
/** Format the Interlang template */
hotcat.formatInterlang = function( /*array*/ links, /*string*/ wiki ) {
	var interlang = '{{Interlang\n';
	var falist = '';
	var galist = '';
	var calist = '';
	for ( var i = 0; i < links.length; i++ ) {
		interlang = interlang + '|' + links[i].id + '=' + links[i].title + '\n';
	}
	if ( wiki != mw.config.get( 'wgContentLanguage' ) ) {
		if ( hotcat.exzstatus ) { falist += '|' + mw.config.get( 'wgContentLanguage' ) + 'FA=1\n'; }
		if ( hotcat.lwastatus ) { galist += '|' + mw.config.get( 'wgContentLanguage' ) + 'GA=1\n'; }
		if ( hotcat.castatus ) { calist += '|' + mw.config.get( 'wgContentLanguage' ) + 'CA=1\n'; }
	}
	if ( wiki == mw.config.get( 'wgContentLanguage' ) && hotcat.wookattr == true ) {
		if ( wiki == 'es' ) { interlang = interlang + '|sin=sí\n'; }
		if ( wiki == 'pt' ) { interlang = interlang + '|icp=1\n'; }
	}
	for ( var i = 0; i < hotcat.interwikis.array.length; i++ ) {
		if ( wiki != hotcat.interwikis.array[i].id ) {
			switch ( hotcat.interwikis.array[i].isFA ) {
				case 'FA': falist += '|' + hotcat.interwikis.array[i].id + 'FA=1\n'; break;
				case 'GA': galist += '|' + hotcat.interwikis.array[i].id + 'GA=1\n'; break;
				case 'CA': calist += '|' + hotcat.interwikis.array[i].id + 'CA=1\n'; break;
			}
		}
		if ( wiki == hotcat.interwikis.array[i].id && hotcat.interwikis.array[i].wookAttr == true ) {
			if ( wiki == 'es' ) { interlang = interlang + '|sin=sí\n'; }
			if ( wiki == 'pt' ) { interlang = interlang + '|icp=1\n'; }
		}
	}
	interlang = interlang + falist + galist + calist + '}}';
 
	return interlang;
};
 
/** Format standard interwiki */
hotcat.formatInterwikis = function( /*array*/ links, /*boolean*/canon ) {
	var interwiki = '';
 
	for ( var i = 0; i < links.length; i++ ) {
		interwiki = interwiki + '[[' + links[i].id + ':' + links[i].title + ']]\n';
	}
 
	return interwiki;
};

/** Load i18n and start HotCat when the page has loaded */
$.getScript( '/load.php?mode=articles&articles=u:dev:MediaWiki:I18n-js/code.js&only=scripts' ).done( function() {
	window.dev.i18n.loadMessages( 'u:starwars:MediaWiki:Custom-HotCat/i18n.json', { noCache: true, cacheAll: ['summary'] } ).done( function( i18n ) {
		hotcat.i18n = i18n;
		$( document ).ready( mw.loader.using( 'mediawiki.util' ).then( hotcat.addlink ) );
	} );
} );