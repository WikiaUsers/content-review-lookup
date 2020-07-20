importArticles({

  type: 'script',

  articles: [

      'u:dev:YoutubePlayer/code.js'  ]

});

/* <pre> v246 */

/* Control de errores */
function trataError(e) {
	setTimeout(function(err) {
		return function() {
			throw err;
		};
	}(e), 10);
}

/* Esta función evita que se detenga la carga de otros scripts en el onload si uno de ellos falla*/
function safeOnLoadHook(fn) {
	if ($) {
		$(function() {
			try {
				fn();
			} catch(e) {
				typeof(window.trataError)=='function'&&trataError(e);
			}
		});
	}
}

/* == Funciones comunes ==
Funciones compartidas por otros scripts del sitio. Evitar hacer modificaciones importantes: Algunos usuarios pueden estar haciendo uso de ellas. Usos que se tenga constancia: [[MediaWiki:Edit.js]], [[MediaWiki:Mergetables.js]]
</pre> */
// Versión comprimida. Véase [[MediaWiki:Common.js/Clases/UtilityTools.js]] <pre>
/**
* @class UtilityTools
* @description A static class with useful JS functions!
* Modified version of YAHOO.Tools by Dav Glass <http://github.com/davglass/yui-tools/> under BSD License
* Includes a modified version of getElementsByClassName by Robert Nyman <http://www.robertnyman.com/2008/05/27/the-ultimate-getelementsbyclassname-anno-2008/> under MIT License
* All you guys rock!
* Compiled and tweaked by Ciencia_Al_Poder
*/
(function(){var n={startspace:/^\s+/,endspace:/\s+$/};var o=null;UtilityTools={trim:function(a){return a.toString().replace(n.startspace,'').replace(n.endspace,'')},get:function(a){if((a&&a.nodeType)||a===window){return a}if(typeof a=='string'){return document.getElementById(a)}},getElementsByClassName:function(f,g,h){var k=UtilityTools.get(h);if(o){return o(f,g,k)}if(document.getElementsByClassName){o=function(a,b,c){c=c||document;var d=c.getElementsByClassName(a),nodeName=(b&&b!=='*')?b.toLowerCase():null,returnElements=[],current;for(var i=0,il=d.length;i<il;i++){current=d[i];if(!nodeName||nodeName===current.nodeName.toLowerCase()){returnElements[returnElements.length]=current}}return returnElements}}else if(document.evaluate){o=function(a,b,c){b=(b||'*');c=(c||document);var d=a.split(' '),classesToCheck='',xhtmlNamespace='http://www.w3.org/1999/xhtml',namespaceResolver=(document.documentElement.namespaceURI===xhtmlNamespace)?xhtmlNamespace:null,returnElements=[],elements,node;for(var j=0,jl=d.length;j<jl;j++){classesToCheck+="[contains(concat(' ', @class, ' '), ' "+d[j]+" ')]"}try{elements=document.evaluate('.//'+b+classesToCheck,c,namespaceResolver,0,null)}catch(e){elements=document.evaluate('.//'+b+classesToCheck,c,null,0,null)}while((node=elements.iterateNext())){returnElements[returnElements.length]=node}return returnElements}}else{o=function(a,b,c){b=(b||'*');c=c||document;var d=a.split(' '),elements=(b==='*'&&c.all)?c.all:c.getElementsByTagName(b),current,returnElements=[],match,currentclassname;for(var l=0,ll=elements.length;l<ll;l++){current=elements[l];match=false;currentclassname=(' '+current.className+' ');for(var m=0,ml=d.length;m<ml;m++){match=(currentclassname.indexOf(' '+d[m]+' ')!=-1);if(!match){break}}if(match){returnElements[returnElements.length]=current}}return returnElements}}return UtilityTools.getElementsByClassName(f,g,h)},makeChildren:function(a,b){b=UtilityTools.get(b);for(var i=0;i<a.length;i++){var c=a[i];if(typeof c=='string'){c=document.createTextNode(c)}b.appendChild(c)}},insertAfter:function(a,b){if(b.nextSibling){b.parentNode.insertBefore(a,b.nextSibling)}else{b.parentNode.appendChild(a)}},create:function(a){a=a.toLowerCase();var b=document.createElement(a),txt=false,attrsObj=false;if(!b){return false}for(var i=1;i<arguments.length;i++){txt=arguments[i];if(typeof txt=='string'){UtilityTools.makeChildren([txt],b)}else if(txt instanceof Array){UtilityTools.makeChildren(txt,b)}else if(typeof txt=='object'){UtilityTools.setAttr(txt,b)}}return b},removeElement:function(a){if(!(a instanceof Array)){a=[UtilityTools.get(a)]}for(var i=0;i<a.length;i++){if(a[i].parentNode){a[i].parentNode.removeChild(a[i])}}},setAttr:function(a,b){if(typeof b=='string'){b=UtilityTools.get(b)}for(var i in a){switch(i.toLowerCase()){case'classname':case'class':b.className=a[i];break;case'listener':UtilityTools.addHandler(b,a[i][0],a[i][1]);break;case'style':if(typeof a[i]==='object'){for(var c in a[i]){b.style[c]=a[i][c]}}break;default:b.setAttribute(i,a[i]);break}}},hasClass:function(a,b){a=UtilityTools.get(a);var c=(' '+a.className+' ');b=(' '+b+' ');if(c.indexOf(b)!=-1){return true}return false},getInnerText:function(a){if(typeof a==='string')return a;if(typeof a==='undefined')return'';if(a.nodeType!==1||(a.nodeType===1&&a.getElementsByTagName('img').lenght==0)){return(a.textContent||a.innerText||'')}var b='',cs=a.childNodes;for(var i=0;i<cs.length;i++){switch(cs[i].nodeType){case 1:if(cs[i].tagName.toLowerCase()=='img')b+=cs[i].alt;else b+=UtilityTools.getInnerText(cs[i]);break;case 3:b+=cs[i].nodeValue;break}}return b},addHandler:function(a,b,c){a=UtilityTools.get(a);if(!a){return}if(window.addEventListener){a.addEventListener(b,c,false)}else if(window.attachEvent){a.attachEvent('on'+b,c)}},removeHandler:function(a,b,c){a=UtilityTools.get(a);if(!a){return}if(window.removeEventListener){a.removeEventListener(b,c,false)}else if(window.detachEvent){a.detachEvent('on'+b,c)}},getTarget:function(e){var a=null;if(e.target){a=e.target}else if(e.srcElement){a=e.srcElement}if(a!==null&&a.nodeType==3){a=a.parentNode}return a},getQueryString:function(a){var b={},arr=null;if(!a){a=location.href}arr=location.href.split('?');if(arr.length!=2){a=''}if(a.indexOf('#')!=-1){a=a.split('#')[0]}a=a.split('&');for(var i=0;i<a.length;i++){var c=a[i].split('=');if(c.length!=2){c[1]=''}b[c[0]]=c[1]}return b},getQueryStringVar:function(a,b){var c=UtilityTools.getQueryString(b);if(c[a]){return c[a]}else{return false}},cookie:function(a,b,c,d,e,f){var g=arguments,argc=arguments.length,dc=document.cookie,settings='';if(argc==1){var h=dc.split(';');for(var i=0;i<h.length;i++){var j=UtilityTools.trim(h[i]);if(j.indexOf(a+'=')==0){return decodeURIComponent(j.split('=')[1])}}return null}c=(argc>2)?g[2]:null;d=(argc>3)?g[3]:'/';e=(argc>4)?g[4]:null;f=(argc>5)?g[5]:false;if(argc>=2&&b===null){c=new Date(0);b=''}if(c!==null){settings+=("; expires="+c.toGMTString())}if(d!==null){settings+=("; path="+d)}if(e!==null){settings+=("; domain="+e)}if(f===true){settings+="; secure"}document.cookie=a+"="+encodeURIComponent(b)+settings}}})();
// </pre>
//<pre>
window.$UT = window.UtilityTools;
if (!window.$G){
	window.$G = $UT.get;
}

window.bodyContentId = 'bodyContent';

function fixBugMixedUIversionsDialog() {
	// Bug de Wikia por usar versiones diferentes en jquery.ui (botones en dialog no muestran el texto)
	if ($.ui && $.ui.dialog && $.ui.dialog.version == '1.8.17' && $.ui.dialog.version != $.ui.version) {
		$.attrFn.text = true;
	}
}


/* Compatibilidad, al inicio del resto de carga de elementos. Necesario para que todas las utilidades que funcionan en Monobook y Monaco funcionen en oasis
* Wikia: ¿Quién tuvo la estupenda idea de no respetar los ID's comunes del wiki? */
function oasisCompatElements() {
	$(document.body).append('<div id="positioned_elements"></div>');
}

if (window.skin == 'oasis') {
	window.bodyContentId = 'WikiaArticle';
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(oasisCompatElements);
}

// agregar "ie6" como clase de body. Comentario condicional para IE
/*@cc_on
if (navigator.appVersion.indexOf('MSIE 6') != -1) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function(){ document.body.className += ' ie6'; });
}
@*/

//// Intento de mejora de LinkSuggest. Modificado por [[User:Ciencia Al Poder]]
function improveLinkSuggest(){
	if (!window.YAHOO || !YAHOO.example || !YAHOO.example.AutoCompleteTextArea) return;
	YAHOO.example.AutoCompleteTextArea.prototype._sendQuery = function(sQuery) {
		var text = this._elTextbox.value.replace(/\r/g, "");
		var caret = this.getCaret(this._elTextbox);
		var sQueryStartAt;
		var closedTemplateFound = false;
		var closedLinkFound = false;
		var sQueryReal = '';

		// also look forward, to see if we closed this one
		for(var i = caret; i < text.length; i++) {
			var c = text.charAt (i) ;
			// Characters that are invalid inside a link. It makes no sense to continue forward to see if it's closed.
			if (c == "\n" || c == "[" || c == "{"){
				break;
			}/*
			if((c == "[") && (text.charAt(i - 1) == "[")) {
				break ;
			}
			if((c == "{") && (text.charAt(i - 1) == "{")) {
				break ;
			}*/
			if((c == "]") && (text.charAt(i - 1) == "]")) {
				// An opened template inside a closed link won't work if we return here. We'll need to check later if it's a template or a link
				//return ;
				closedLinkFound = true;
				break;
			}
			if((c == "}") && (text.charAt(i - 1) == "}")) {
				// An opened link inside a closed template won't work if we return here. We'll need to check later if it's a template or a link
				//return ;
				closedTemplateFound = true;
				break;
			}
		}

		for(var i = caret; i >= 0; i--) {
			var c = text.charAt(i);
			if(c == "]" || c == "|") {
				if ( (c == "|") || ( (c == "]") && (text.charAt(i-1) == "]") ) ) {
					this._toggleContainer(false) ;
				}
				return;
			}
			if(c == "}" || c == "|") {
				if ( (c == "|") || ( (c == "}") && (text.charAt(i-1) == "}") ) ) {
					this._toggleContainer(false) ;
				}
				return;
			}
			if((c == "[") && (text.charAt(i - 1) == "[")) {
				if (closedLinkFound){
					this._toggleContainer(false) ;
					return;
				}
				this._originalQuery = text.substr(i + 1, (caret - i - 1));
				sQueryReal = this._originalQuery;
				if (this._originalQuery.indexOf(':')==0){
					this._bIsColon = true;
					sQueryReal = sQueryReal.replace(':','');
				} else {
					this._bIsColon = false;
				}
				this._bIsTemplate = false;
				sQueryStartAt = i;
				break;
			}
			if((c == "{") && (text.charAt(i - 1) == "{")) {
				if (closedTemplateFound){
					this._toggleContainer(false) ;
					return;
				}
				this._originalQuery = text.substr(i + 1, (caret - i - 1));
				this._bIsColon = false;
				if (this._originalQuery.length >= 6 && this._originalQuery.toLowerCase().indexOf('subst:') == 0){
					sQueryReal = "Template:"+this._originalQuery.replace(/subst:/i,'');
					this._bIsSubstTemplate = true;
				} else if (this._originalQuery.indexOf(':')==0){
					sQueryReal = this._originalQuery.replace(':','');
					this._bIsColon = true;
				} else {
					sQueryReal = "Template:"+this._originalQuery;
					this._bIsSubstTemplate = false;
				}
				this._bIsTemplate = true;
				sQueryStartAt = i;
				break;
			}
		}

		if(sQueryStartAt >= 0 && sQueryReal.length > 2) {
			YAHOO.example.AutoCompleteTextArea.superclass._sendQuery.call(this, encodeURI(sQueryReal.replace(/\x20/g,'_')));
		}
	};
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(improveLinkSuggest);

/* === Sortable corregido/mejorado para ordenar imágenes === */
// Buscar celdas con imagen o ref (limitado a primer elemento hijo, por rendimiento) y agrega un data-sort-value ignorando el ref y traduciendo correctamente la imagen
var tablesorter_fixImagenesRefs = function() {
	var cache = [], text, $node, cn, ee, cambios = false, i, j;
	for ( i = 1; i < this.rows.length; i++ ) {
		cache[i] = [];
		for ( j = 0; j < this.rows[i].cells.length; j++ ) {
			if ( $( '> a.image,> sup.reference', this.rows[i].cells[j] ).length ) {
				if ( this.rows[i].cells[j].getAttribute( 'data-sort-value' ) ) {
					// Skip existing
					continue;
				}
				text = '';
				cn = this.rows[i].cells[j].childNodes;
				for ( ee = 0; ee < cn.length; ee++ ) {
					if ( cn[ee].nodeType == 3 ) {
						text += cn[ee].data;
					} else {
						$node = $( cn[ee] );
						if ( $node.is( 'a.image' ) ) {
							text += cn[ee].title;
						} else if ( ! $node.is( 'sup.reference' ) ) { // Nos saltamos los <ref>
							text += $node.text();
						}
					}
				}
				cache[i][j] = $.trim( text );
				cambios = cambios || ( cache[i][j] && true );
			}
		}
	}
	if ( !cambios ) {
		return;
	}
	for ( i = 1; i < this.rows.length; i++ ) {
		for ( j = 0; j < this.rows[i].cells.length; j++ ) {
			if ( cache[i][j] ) {
				this.rows[i].cells[j].setAttribute( 'data-sort-value', cache[i][j] );
			}
		}
	}
};

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)( function() {
	$( 'table.sortable', '#mw-content-text' ).each( function() {
		// Attach del evento en mousedown porque se ejecutará antes que el click del tablesorter
		// Una vez se ejecute el click, se guarda en caché los valores de columna, por lo que modificar el DOM después no funcionará
		$(this).find( 'th' ).on( 'mousedown.fixpending_sortimgref', function() {
			// Retiramos el evento para que no se vuelva a ejecutar
			var ts = $(this).closest( 'table.sortable' );
			ts.find( 'th' ).off( 'mousedown.fixpending_sortimgref' );
			tablesorter_fixImagenesRefs.call(ts[0]);
		} );
	} );
} );
/* == Herramientas de edición == */

// Datos para scripts que se cargan de forma asíncrona:
var postloadFunctionData = {
	'tablemanager': [],
	'charinsert': {
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categoría:',']]'], ['#REDIRECCIÓN [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['\x3Cgallery widths="190px">\n','\n</gallery>'], ['<code>','</code>'], '\x7B{PAGENAME}}', ['\x7B{t|','}}'], ['\x7B{S|','}}'] ],
		"Japonés - Katakana": ['ア','ァ','イ','ィ','ウ','ヴ','ゥ','エ','ェ','オ','ォ','カ','ガ','キ','ギ','ク','グ','ケ','ゲ','コ','ゴ','サ','ザ','シ','ジ','ス','ズ','セ','ゼ','ソ','ゾ','タ','ダ','チ','ヂ','ツ','ヅ','ッ','テ','デ','ト','ド','ナ','ニ','ヌ','ネ','ノ','ハ','バ','パ','ヒ','ビ','ピ','フ','ブ','プ','ヘ','ベ','ペ','ホ','ボ','ポ','マ','ミ','ム','メ','モ','ヤ','ャ','ユ','ュ','ヨ','ョ','ラ','リ','ル','レ','ロ','ワ','ヷ','ヰ','ヸ','ヱ','ヹ','ヲ','ヺ','ン','ー','、','。',['「','」'],['『','』'],'ゝ','ゞ','々','ヽ','ヾ'],
		"Japonés - R\u014Dmaji": ['Ā','ā','Ē','ē','Ī','ī','Ō','ō','Ū','ū'],
		"Alfabeto fonético": ['ɨ','ʉ','ɯ','ɪ','ʏ','ʊ','ø','ɘ','ɵ','ɤ','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','ɶ','ɑ','ɒ','ɚ','ɝ','ʰ','ʱ','ʲ','ʴ','ʷ','˞','ˠ','ˤ','ʼ','ˈ','ˌ','ː','ˑ','.','ʈ','ɖ','ɟ','ɢ','ʔ','ɱ','ɳ','ɲ','ŋ','ɴ','ʙ','ʀ','ɾ','ɽ','ɸ','β','θ','ð','ʃ','ʒ','ʂ','ʐ','ʝ','ɣ','χ','ʁ','ħ','ʕ','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','ɰ','ɭ','ʎ','ʟ','ʍ','ɥ','ʜ','ʢ','ʡ','ɕ','ʑ','ɺ','ɧ','ɡ','ɫ'],
		"Plantillas de licencias": [['\x7B{Art Oficial|','}}'], '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Carátula}}', '\x7B{Fair use}}', ['\x7B{Fanart|','}}'], '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pokémon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}'],
		"Imágenes para tipos": ['\x7B{t|Acero}}', '\x7B{t|Agua}}', '\x7B{t|Bicho}}', '\x7B{t|Dragón}}', '\x7B{t|Eléctrico}}', '\x7B{t|Fantasma}}', '\x7B{t|Fuego}}', '\x7B{t|Hada}}', '\x7B{t|Hielo}}', '\x7B{t|Lucha}}', '\x7B{t|Normal}}', '\x7B{t|Planta}}', '\x7B{t|Psíquico}}', '\x7B{t|Roca}}', '\x7B{t|Siniestro}}', '\x7B{t|Tierra}}', '\x7B{t|Veneno}}', '\x7B{t|Volador}}', '\x7B{t|Especial}}', '\x7B{t|Físico}}', '\x7B{t|Otro}}'],
		"Enlaces a videojuegos": ['[[Pokémon Verde]], [[Pokémon Rojo]], [[Pokémon Azul]] y [[Pokémon Amarillo]]', '[[Pokémon Oro y Pokémon Plata|Pokémon Oro, Pokémon Plata]] y [[Pokémon Cristal]]', '[[Pokémon Rubí y Pokémon Zafiro|Pokémon Rubí, Pokémon Zafiro]] y [[Pokémon Esmeralda]]', '[[Pokémon Rojo Fuego y Pokémon Verde Hoja]]', '[[Pokémon Diamante y Pokémon Perla|Pokémon Diamante, Pokémon Perla]] y [[Pokémon Platino]]', '[[Pokémon Oro HeartGold y Pokémon Plata SoulSilver]]', '[[Pokémon Negro y Pokémon Blanco]]', '[[Pokémon Negro 2 y Pokémon Blanco 2]]', '[[Pokémon X y Pokémon Y]]', '[[Pokémon Rubí Omega y Pokémon Zafiro Alfa]]', '[[Pokémon Sol y Pokémon Luna]]']
	}
};

function loadEditJS(){
	if (mw.config.get('wgAction', '') == 'edit' || mw.config.get('wgAction', '') == 'submit' ||
		mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload' ||
		mw.config.get('wgCanonicalSpecialPageName', '') == 'MultipleUpload') {
		importScript('MediaWiki:Common.js/Clases/CharInsert-min.js');
		if (window.location.toString().indexOf('undo=') == -1 && window.location.toString().indexOf('undoafter=') == -1) {
			if (mw.config.get('wgNamespaceNumber', 0) == 0) {
				mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
					if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
					importScript('MediaWiki:Common.js/Clases/AvisoCuriosidades.js');
				});
			}
			if (mw.config.get('wgNamespaceNumber', 0) == 2 && window.location.toString().indexOf('action=edit') != -1) {
				mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
					if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
					importScript('MediaWiki:Common.js/Clases/DisableFirstSubmit.js');
				});
			}
		}
	}
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(loadEditJS);

/* == Acopla tablas ==
Para unir las filas en una sola tabla. [[MediaWiki:Mergetables.js]]
*/
function acopla_tablas(){
	switch(mw.config.get('wgPageName')){
		case 'Lista_de_Pokémon':
		case 'Lista_de_movimientos':
			importScript('MediaWiki:Common.js/Clases/MergeTables.js');
			break;
	}
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(acopla_tablas);

/* == Enlaces "editar" al lado del texto ==
Para desactivar, pon window.oldEditsectionLinks=1; en tu monobook.js
*/
function moveEditSection(){
	if (window.oldEditsectionLinks) return;
	$('span.editsection').each(function() {
		var $span = $(this), h = $span.closest('h1,h2,h3,h4,h5,h6');
		if (h.length) {
			$span.addClass('editsection-nf').appendTo(h);
		}
	});
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(moveEditSection);

// </pre> Otras clases, ver [[MediaWiki:Common.js/Clases]]
// Versión comprimida. Véase [[MediaWiki:Common.js/Clases/CreaEnlacesDex.js]] <pre>
window.CreaEnlacesDex=(function($,mw){'use strict';var T_POKEMON='p',T_MOVIMIENTO='m',T_BAYA='b',T_EN=' (en inglés)',T_G=' Generación',T_UBP='http://bulbapedia.bulbagarden.net/wiki/',T_UGN='http://www.guiasnintendo.com/',T_UGN3=T_UGN+'3_GB_GameBoy/',T_UGN1=T_UGN+'1_GAMEBOY_ADVANCE/',T_UGN0=T_UGN+'0_NINTENDO_DS/Pokemon_',T_UVE='http://veekun.com/dex/',T_USP='http://www.serebii.net/pokedex',T_USA='http://www.serebii.net/attackdex',T_USM='http://www.smogon.com/dex/sm/',T_GN='Guías Nintendo',T_GNP=T_GN+': Pokémon ',T_S='Serebii',T_SM='Smogon',SHTML='.shtml',_generaciones=['Primera','Segunda','Tercera','Cuarta','Quinta','Sexta','Séptima'],_storeTag='DexItem',_vars={tipo:null,nombreArt:null,nombre:null,ingles:null,num:null,hoenn:null,generacion:999},_renderFn=null,_renderLink=null,_rendered=false,init=function(){if(getFromPage()||getFromStorage()){saveOnExit();if(_vars.tipo===T_POKEMON)genPoke();if(_vars.tipo===T_MOVIMIENTO)genMov();if(_vars.tipo===T_BAYA)genBaya();setToStorage()}},getFromStorage=function(){var storeStr;try{storeStr=localStorage.getItem(_storeTag)}catch(e){}if(!storeStr){return false}for(var i=0,p=storeStr.split('|');i<p.length;i++){var ar=p[i].split(':');if(ar.length==2)_vars[ar[0]]=ar[1]}if(!_vars.nombreArt||!_vars.nombre){return false}return(_vars.nombreArt===mw.config.get('wgPageName'))},getFromPage=function(){var eNombrePoke=$('#nombrepokemon'),eNumNacional=$('#numeronacional'),eNombreMov=$('#nombremovimiento'),eNumBaya=$('#numerobaya'),n;_vars.nombreArt=mw.config.get('wgPageName');if(eNombrePoke.length&&eNumNacional.length){_vars.tipo=T_POKEMON;_vars.nombre=$.trim(eNombrePoke.text());n=parseInt($.trim(eNumNacional.text()),10);_vars.num=(!isNaN(n)&&n>0)?n:0;n=parseInt($.trim($('#numerohoenn').text()),10);_vars.hoenn=(!isNaN(n)&&n>0)?n:0;return true}else if(eNombreMov.length){_vars.tipo=T_MOVIMIENTO;_vars.nombre=$.trim(eNombreMov.text());_vars.ingles=$.trim($('#nombreingles').text());for(var i=0,gentxt=$.trim($('a:eq(0)','#generacion').text());i<_generaciones.length;i++){if(_generaciones[i]===gentxt){_vars.generacion=i+1;break}}return true}else if(eNumBaya.length){_vars.tipo=T_BAYA;_vars.nombre=_vars.nombreArt;_vars.ingles=$.trim($('#nombreingles').text());n=parseInt($.trim($('#numerobaya').text()),10);_vars.num=(!isNaN(n)&&n>0)?n:0;return true}return false},saveOnExit=function(){$(window).bind('unload',setToStorage)},setToStorage=function(){var sz=[];for(var elem in _vars){if(_vars[elem])sz.push(elem,':',_vars[elem],'|')}if(sz.length>0)sz.pop();try{localStorage.setItem(_storeTag,sz.join(''))}catch(e){}},zPadLeft=function(item,num){var sz=[];for(var i=item.length;i<num;i++){sz.push(0)}sz.push(item);return sz.join('')},toCamel=function(text){var res=text.substr(0,1).toUpperCase()+text.substr(1).toLowerCase();res=res.replace(new RegExp('([ \-])(\\w+)','g'),function(match,p1,p2,offset){return p1+p2.substr(0,1).toUpperCase()+p2.substr(1)});return res},genPoke=function(){var m=_vars.nombre,n=_vars.num,sn=n.toString(),h=0,alola;if(_vars.hoenn!==null&&!isNaN(parseInt(_vars.hoenn,10))){h=parseInt(_vars.hoenn,10)}alola=(mw.config.get('wgPageName').indexOf('de_Alola')>0);n&&link('http://www.pokexperto.net/index2.php?seccion=nds/nationaldex/pkmn&pk='+sn,'Pokexperto 3-6Gen','Pokexperto: 3ª a 6ª'+T_G);if(!alola){n&&n<=150&&link(T_UGN3+'pokemon/pokemon_sp/Pokedex/'+m.toLowerCase().replace('mr. ','')+'.asp',T_GN+' RAA',T_GN+': 1ª'+T_G);n&&n<=251&&link(T_UGN3+'pokeoroplata/Pokedex/'+zPadLeft(sn,2)+'-'+m.replace(' ','')+'.htm',T_GN+' OPC',T_GN+': 2ª'+T_G);h&&h<=200&&link(T_UGN1+'pokemonrubizafiro/pok_rubi_zafiro_SP/pokedex/pokemon'+zPadLeft(h.toString(),3)+m.toLowerCase()+'.htm',T_GN+' RZ',T_GNP+'ediciones Rubí y Zafiro');h&&h<=202&&link(T_UGN1+'Pokemon_Esmeralda/pok_esmeralda_SP/pokedex/pokemon'+zPadLeft(h.toString(),3)+m.toLowerCase()+'.html',T_GN+' E(H)',T_GNP+'edición Esmeralda, Pokédex de Hoenn');n&&n<=386&&link(T_UGN1+'Pokemon_Esmeralda/pok_esmeralda_SP/pokedex_nacional/'+zPadLeft(sn,3)+'.html',T_GN+' E(N)',T_GNP+'edición Esmeralda, Pokédex Nacional');n&&n<=386&&link(T_UGN1+'pokemon_rojofuego_verdehoja/pokemon_rojofuego_verdehoja_sp/pokedex/'+zPadLeft(sn,3)+'.html',T_GN+' RfVh',T_GNP+'ediciones Rojo Fuego y Verde Hoja');n&&n<=490&&link(T_UGN0+'perla_diamante/Pokemon_perla_diamante_sp/pokedex_nacional/'+zPadLeft(sn,3)+'.html',T_GN+' DP',T_GNP+'ediciones Diamante y Perla');n&&n<=492&&link(T_UGN0+'platino/Pokemon_platino_sp/pokedex_nacional/'+zPadLeft(sn,3)+'.html',T_GN+' Pt',T_GNP+'edición Platino')}link(T_UBP+m+'_(Pokémon)','Bulbapedia [en]','Bulbapedia'+T_EN);if(!alola){n&&n<=721&&link(T_UVE+'pokemon/'+m.toLowerCase(),'Veekun 1-6Gen [en]','Veekun: 1ª a 6ª'+T_G+T_EN);n&&n<=251&&link(T_USP+'/'+zPadLeft(sn,3)+SHTML,T_S+' 1-2Gen [en]',T_S+': 1ª y 2ª'+T_G+T_EN);n&&n<=386&&link(T_USP+'-rs/'+zPadLeft(sn,3)+SHTML,T_S+' 3Gen [en]',T_S+': 3ª'+T_G+T_EN);n&&n<=493&&link(T_USP+'-dp/'+zPadLeft(sn,3)+SHTML,T_S+' 4Gen [en]',T_S+': 4ª'+T_G+T_EN);n&&n<=649&&link(T_USP+'-bw/'+zPadLeft(sn,3)+SHTML,T_S+' 5Gen [en]',T_S+': 5ª'+T_G+T_EN);n&&n<=721&&link(T_USP+'-xy/'+zPadLeft(sn,3)+SHTML,T_S+' 6Gen [en]',T_S+': 6ª'+T_G+T_EN)}n&&n<=802&&link(T_USP+'-sm/'+zPadLeft(sn,3)+SHTML,T_S+' 7Gen [en]',T_S+': 7ª'+T_G+T_EN);n&&n<=802&&link(T_USM+'pokemon/'+m.toLowerCase().replace(new RegExp('\\s','g'),'_').replace(new RegExp('[.\']','g'),'')+(alola?'-alola':''),T_SM+' [en]',T_SM+': 7ª'+T_G+T_EN)},genMov=function(){var i=(_vars.ingles||0),g=(_vars.generacion||999);i&&g<=7&&link(T_UBP+'Special:Search/'+i+'_(move)','Bulbapedia [en]','Bulbapedia'+T_EN);i&&g<=6&&link(T_UVE+'moves/'+i.toLowerCase(),'Veekun 1-6Gen [en]','Veekun: 1ª a 6ª'+T_G+T_EN);i&&g<=3&&link(T_USA+'/'+i.toLowerCase().replace(new RegExp('\\s','g'),'')+SHTML,T_S+' 3Gen [en]',T_S+': 3ª'+T_G+T_EN);i&&g<=4&&link(T_USA+'-dp/'+i.toLowerCase().replace(new RegExp('\\s','g'),'')+SHTML,T_S+' 4Gen [en]',T_S+': 4ª'+T_G+T_EN);i&&g<=5&&link(T_USA+'-bw/'+i.toLowerCase().replace(new RegExp('\\s','g'),'')+SHTML,T_S+' 5Gen [en]',T_S+': 5ª'+T_G+T_EN);i&&g<=6&&link(T_USA+'-xy/'+i.toLowerCase().replace(new RegExp('\\s','g'),'')+SHTML,T_S+' 6Gen [en]',T_S+': 6ª'+T_G+T_EN);i&&g<=7&&link(T_USA+'-sm/'+i.toLowerCase().replace(new RegExp('\\s','g'),'')+SHTML,T_S+' 7Gen [en]',T_S+': 7ª'+T_G+T_EN);i&&g<=7&&link(T_USM+'moves/'+i.toLowerCase().replace(new RegExp('\\s','g'),'_'),T_SM+' 7Gen [en]',T_SM+': 7ª'+T_G+T_EN)},genBaya=function(){var i=_vars.ingles,n=_vars.num,sn=n.toString();link('http://www.pokexperto.net/index2.php?seccion=nds/berrydexDS&baya='+sn,'Pokexperto 4Gen','Pokexperto: 4ª'+T_G);link(T_UBP+toCamel(i),'Bulbapedia [en]','Bulbapedia'+T_EN);link(T_UVE+'items/berries/'+i.toLowerCase(),'Veekun [en]','Veekun'+T_EN);link('http://www.serebii.net/berrydex-dp/'+zPadLeft(sn,2)+SHTML,T_S+' 4Gen [en]',T_S+': 4ª'+T_G+T_EN);link(T_USM+'items/'+i.toLowerCase().replace(new RegExp('\\s','g'),'_'),T_SM+' [en]',T_SM+T_EN)},link=function(url,text,caption){if(!_rendered&&_renderFn){_renderFn(_vars.tipo);_rendered=true}if(_rendered&&_renderLink){_renderLink(url,text,caption)}},registerRenderFn=function(fn){if(typeof fn==='function'){_renderFn=fn}},registerLinkFn=function(fn){if(typeof fn==='function'){_renderLink=fn}};return{init:init,registerRenderFn:registerRenderFn,registerLinkFn:registerLinkFn}})(jQuery,mw);
//</pre>

// Versión comprimida. Véase [[MediaWiki:Common.js/Clases/PlantillaPlegable.js]] <pre>
(function(){var $=jQuery,$UT=UtilityTools;var f='plegable-ctrl',K_MOSTRAR='mostrar',K_OCULTAR='ocultar';PlantillaPlegable=function(a,b){this.oElem=a;this.oCtrl=null;this.bPlegada=false;this.bInicialPlegada=(b||false);this.bAjustado=false;this.init()};PlantillaPlegable.prototype={version:'1.2',init:function(){if(this.oElem.tagName.toLowerCase()!='table'||!this.oElem.rows.length)return;var d=this.oElem.rows[0];for(var i=0,ss=d.getElementsByTagName('span');i<ss.length;i++){if($UT.hasClass(ss[i],f)){ss[i].tabIndex='0';this.oCtrl=ss[i];break}}if(!this.oCtrl){var c=d.cells[d.cells.length-1];this.oCtrl=$UT.create('span',{'class':f,tabindex:'0'});c.hasChildNodes()?c.insertBefore(this.oCtrl,c.firstChild):c.appendChild(this.oCtrl)}$UT.addHandler(this.oCtrl,'click',function(a){return function(){a.cambiarEstado(!a.bPlegada)}}(this));$UT.addHandler(this.oCtrl,'keyup',function(b){return function(e){var a=e.keyCode||e.charCode||0;if(a==13){b.cambiarEstado(!b.bPlegada)}}}(this));this.cambiarEstado(this.bInicialPlegada)},cambiarEstado:function(a){this.oCtrl.innerHTML='';$UT.makeChildren([(a?K_MOSTRAR:K_OCULTAR)],this.oCtrl);var b=$(this.oElem);var c=b.width();for(var i=1,rs=this.oElem.rows;i<rs.length&&a!=this.bPlegada;i++){var d=$(rs[i]);if(a){d.hide()}else{d.show()}}this.bPlegada=a;var e=b.width();if(a&&e!==c&&this.oElem.style.width===''){this.bAjustado=true;b.width(c)}if(this.bAjustado&&!a)this.oElem.style.width=''}}})();
//</pre>

/* <pre>
 * Thickbox4MediaWiki v3.10 - Based on Thickbox 3.1 By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2010 - 2015 Jesús Martínez (User:Ciencia_Al_Poder), Original Thickbox Copyright (c) 2007 Cody Lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
window.Thickbox = (function($, mw) {
	'use strict';
	var _version = '3.10',
	// Dimensiones mínimas
	_minWidth = 210,
	// Margen entre la imagen y el borde de ThickBox
	_imageMarginWidth = 15,
	// Margen mínimo hasta el borde de la ventana. Si se supera la imagen se reducirá
	_minMarginWidth = 30,
	_minMarginHeight = 15,
	// Tiempo de espera para la aparición del loader en ms
	_loaderWait = 500,
	// Internos
	_imgPreloader = null,
	_galleryData = null,
	_galleryIndex = -1,
	_width = null,
	_height = null,
	_getCaption = null,
	_imgTip = null,
	_imgTipTarget = null,
	_imgTipVisible = false,
	_loaderPresent = false,
	_loaderTm = null,
	_logger = null,
	// Funciones privadas
	_init = function() {
		// Se podría haber puesto un evento directamente en cada 'a.image', pero esto es mucho más rápido y eficiente (tarda solo el 20% en FF2) que recorrerse todo el DOM
		$('#mw-content-text').off('click.thickbox mouseover.thickbox_imgtip').on({
			'click.thickbox': _triggerEvent,
			'mouseover.thickbox_imgtip': _imgTipEvent
		});
	},
	_triggerEvent = function(e) {
		// Si hay alguna tecla especial pulsada, salimos
		if (e.ctrlKey || e.altKey || e.shiftKey) {
			return true;
		}
		var target = e.target;
		if (_isTag(target,'img')) { // Gallery o thumb
			var a = target.parentNode;
			// Imágenes con enlaces a otros artículos no tienen la clase "image", excepto en Wikia donde sí la tiene y añaden "link-internal" o "link-external"
			if (!a || !_isTag(a,'a') || !_isClass(a,'image') || _isClass(a, 'link-internal') || _isClass(a, 'link-external')) {
				return true;
			}
			// Galería Wikia 2
			if (_isClass(a,'lightbox')) {
				target.blur();
				_getCaption = _getCaptionWikia;
				_galleryData = $(target).closest('div.wikia-gallery').find('> div.wikia-gallery-item > div.thumb > div.gallery-image-wrapper > a.lightbox');
				if (_galleryData.length === 0) {
					_galleryData = $(target).closest('div.wikia-gallery').find('> div.wikia-gallery-row > div.wikia-gallery-item > div.thumb > div.gallery-image-wrapper > a.lightbox');
				}
				if (_galleryData.length === 0) {
					return true;
				}
				_galleryIndex = _galleryData.index(a);
				_showImage(a);
				return false;
			}
			if (_isClass(target,'thumbimage')) {
				// Es thumb
				a.blur();
				_getCaption = _getCaptionThumb;
				_showImage(a);
				return false;
			}
			var gb = a.parentNode.parentNode.parentNode.parentNode;
			// MediaWiki gallery
			if (_isTag(gb,'li') && _isClass(gb,'gallerybox')) {
				var t = gb.parentNode;
				if (_isTag(t,'ul') && _isClass(t,'gallery')) {
					a.blur();
					_getCaption = _getCaptionMW;
					_galleryData = $(t).find('div.thumb a.image');
					_galleryIndex = _galleryData.index(a);
					_showImage(a);
					return false;
				}
			}
			// Es thumb genérico
			a.blur();
			_getCaption = _getCaptionEmpty;
			_showImage(a);
			return false;
		} else if (_isTag(target,'a')) {
			var sup = target.parentNode;
			if (!_isTag(sup,'sup') || !_isClass(sup,'reference')) {
				return true;
			}
			target.blur();
			_showElement(target);
			return false;
		}
		return true;
	},
	// Helper and speedy functions
	_isClass = function(el, cn) {
		return el.className && (el.className === cn || (' '+el.className+' ').indexOf(' '+cn+' ') != -1);
	},
	_isTag = function(el, tn) {
		return (el.nodeName && el.nodeName.toUpperCase() === tn.toUpperCase());
	},
	// Loader image
	_startLoader = function() {
		if (_loaderPresent || _loaderTm) {
			return;
		}
		if (_loaderWait > 0) {
			_loaderTm = setTimeout(_displayLoader, _loaderWait);
		} else {
			_displayLoader();
		}
	},
	_stopLoader = function() {
		var t = _loaderTm;
		_loaderTm = null;
		if (t) {
			clearTimeout(t);
		}
		if (_loaderPresent) {
			$('#TB_load').remove();
			_loaderPresent = false;
		}
	},
	_displayLoader = function() {
		_loaderPresent = true;
		_loaderTm = null;
		$(document.body).append('<div id="TB_load">');
	},
	// Main functions
	_preload = function() {
		$(document.body).addClass('thickbox_loaded');
		$('#TB_overlay').add('#TB_window').add('#TB_load').remove();
		$(document.body).append('<div id="TB_overlay"></div><div id="TB_window" class="fixedpos"></div>');
		$('#TB_overlay').click(_remove);
		_startLoader();
	},
	_showImage = function(elem) {
		try {
			var url, $a, $img, descUrl, TB_secondLine = '', TB_descLink;
			_preload();
			$a = $(elem);
			$img = $a.find('> img').eq(0);

			url = _getUrlFromThumb( $img.attr('src') );
			descUrl = $a.attr('href');
			if ($img.data('image-key')) {
				// image-key es el nombre para la URL. No usar image-name porque está codificado doble (& --> &amp;amp;)
				descUrl = mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')['6'] + ':' + decodeURIComponent($img.data('image-key')));
			}
			TB_descLink = '<a id="TB_descLink" class="sprite details" title="Ir a la página de descripción de la imagen"></a>';
			// Se trata de un gallery?
			if (_galleryIndex != -1) {
				TB_secondLine = '<div id="TB_secondLine">'+
					'<span id="TB_imageCount"></span>'+
					'<span id="TB_prev"><a href="#" title="Ver imagen anterior [A]">&lt; Ant.</a></span>'+
					'<span id="TB_next"><a href="#" title="Ver imagen siguiente [S]">Sig. &gt;</a></span></div>';
			}
			$('#TB_window').append('<div id="TB_closeWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div><div id="TB_ImageOff"><img id="TB_Image" alt="Imagen" title="Cerrar" />' + TB_descLink + '</div>' + TB_secondLine + '<div id="TB_caption"></div>');
			if (_galleryIndex != -1) {
				_updateNavigation();
			}
			$('#TB_caption').html( ( _getCaption($a) || null ) );

			$('#TB_Image').add('#TB_closeWindowButton').click(_remove);
			$(document).on('keyup.thickbox', _keyListener);
			$('#TB_prev').add('#TB_next').click(_navigate);
			$('#TB_descLink').attr('href', descUrl);
			$('#TB_ImageOff').on({
				mouseover: function() {
					$('#TB_descLink').css('display','block');
				},
				mouseout: function() {
					$('#TB_descLink').css('display','none');
				}
			});

			if (_imgPreloader === null) {
				_imgPreloader = new Image();
			}
			_imgPreloader.onload = _imageLoaded;
			_imgPreloader.onerror = _imageError;
			_imgPreloader.src = ''; // chromium bug 7731
			_imgPreloader.src = url;

		} catch(e) {
			_log(e);
		}
	},
	_showElement = function(target) {
		try {
			var url = target.href, idx = url.indexOf('#');
			if (idx == -1) {
				return false;
			}
			var baseurl = url.substr(0, idx),
				hash = url.substr(idx + 1),
				// Comprobamos que la URL sea del mismo documento
				locbase = document.location.href.replace(baseurl, ''),
				rel = document.getElementById(hash);
			if ((locbase !== '' && locbase.indexOf('#') !== 0) || rel === null) {
				return false;
			}

			$('#TB_overlay').add('#TB_window').remove();
			$(document.body).append('<div id="TB_overlay" class="transparent"></div><div id="TB_window"></div>');
			$('#TB_overlay').click(_remove);

			var titleHTML = '<div id="TB_title"><div id="TB_closeAjaxWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div></div>',
				wnd = $('#TB_window'),
				cel = $(rel).clone();
			cel.contents().eq(0).remove();
			cel.find('> sup').remove();
			wnd.width(_minWidth).append(titleHTML+'<div id="TB_ajaxContent">'+cel.html()+'</div>');

			var tgEl = $(target),
				// espacio horizontal a cada lado del elemento
				elOffset = tgEl.offset(),
				lw = elOffset.left,
				rw = $(document).width() - elOffset.left - tgEl.width(),
				// Calculamos las dimensiones óptimas. Calculamos el área y determinamos que lo ideal es proporción 3/2
				prefw = parseInt(Math.sqrt(wnd.width()*wnd.height()*3/2),10),
				// Corrección de ancho mínimo en caso de producirse scroll
				cd = $('#TB_ajaxContent')[0];
			prefw += cd.scrollWidth-cd.clientWidth;
			// No se debe reducir el ancho mínimo
			if (prefw < _minWidth) {
				prefw = _minWidth;
			}
			// Posición. 5px de margen respecto el origen. Situación ideal: a la derecha del elemento
			var margen = 5, left = $(document).width() - rw + margen;
			if (rw > prefw + margen) {
				// ya es correcto
			} else if (lw > prefw + margen) {
				left = lw - prefw - margen;
			} else if (lw < 250 || rw < 250) { // No cabe en ninguno de los dos lados. Miramos si no puede usarse el ancho mínimo (250). En ese caso el ancho lo forzamos y lo ponemos a la derecha
				prefw = 250;
			} else if (rw > lw) { // Se usa el ancho disponible del lado mayor
				prefw = rw - margen;
			} else {
				prefw = lw - margen*2;
				left = margen;
			}
			wnd.css({width: prefw, left: left});
			// Ahora la posición vertical. necesita que hayamos asignado el width para que lo calcule bien
			var top = elOffset.top - parseInt(wnd.height(), 10) - margen;
			// Si no cabe arriba lo colocamos debajo
			if (top < margen) {
				top = elOffset.top + tgEl.height() + margen;
			}
			wnd.css({top: top, visibility: 'visible'});
			// Animación si queda fuera del campo visual
			if (($('html')[0].scrollTop||$('body')[0].scrollTop) > top-margen) {
				$('html,body').animate({scrollTop: top - margen}, 250, 'swing');
			}

			$('#TB_closeWindowButton').click(_remove);
			$(document).on('keyup.thickbox', _keyListener);
		} catch (e) {
			_log(e);
		}
	},
	//helper functions below
	_displayClean = function() {
		_stopLoader();
		$('#TB_window').css('visibility','visible');
	},
	_remove = function() {
		$(document).off('keyup.thickbox');
		_galleryData = null;
		_galleryIndex = -1;
		if (_imgPreloader !== null) {
			_imgPreloader.onload = null;
			_imgPreloader.onerror = null;
		}
		$('#TB_ImageOff').add('#TB_Image').add('#TB_closeWindowButton').add('#TB_prev').add('#TB_next').off();
		$('#TB_window').add('#TB_Image').queue('fx',[]).stop();
		$('#TB_window').fadeOut('fast',function(){$('#TB_window').add('#TB_overlay').off().remove();});
		_stopLoader();
		$(document.body).removeClass('thickbox_loaded');
		return false;
	},
	_keyListener = function(e) {
		var keycode = e.which;
		if (keycode == 27) { // close
			_remove();
		} else if (keycode == 65) { // 'A' display previous image
			$('#TB_prev').click();
		} else if (keycode == 83) { // 'S' display next image
			$('#TB_next').click();
		}
	},
	_position = function(anim) {
		// Ancho mínimo
		var border = 4;
		if (_width < _minWidth) {
			_width = _minWidth;
		}
		var o = {marginLeft: '-' + parseInt((_width / 2)+border,10).toString() + 'px', width: _width + 'px', marginTop: '-' + parseInt((_height / 2)+border,10).toString() + 'px'};
		if (anim) {
			$('#TB_window').animate(o, {queue: false, duration: 'fast'});
		} else {
			$('#TB_window').css(o);
		}
	},
	_getPageSize = function() {
		var de = document.documentElement,
			w = window.innerWidth || (de&&de.clientWidth) || document.body.clientWidth,
			h = window.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
		return [w,h];
	},
	_getUrlFromThumb = function(thumb) {
		if (thumb.indexOf('.svg/') != -1) {
			return thumb;
		}
		// Wikia
		return thumb.replace(/\/revision\/latest\/scale-to-width(-down)?\/\d+/, '');
		/*
		// Si la imagen no es thumb, o bien es un SVG, usamos la imagen tal cual.
		if (thumb.indexOf('/thumb/') == -1 || thumb.indexOf('.svg/') != -1 ) {
			return thumb;
		}
		var urlparts = thumb.split('/');
		return thumb.replace('/thumb/','/').replace('/'+urlparts[urlparts.length-1], '');
		*/
	},
	_getCaptionThumb = function(elem) {
		return elem.closest('.thumbinner').find('> .thumbcaption').clone().find('> div.magnify').remove().end().html();
	},
	_getCaptionEmpty = function(elem) {
		return $('<div>').text((elem.attr('title')||'')).html();
	},
	_getCaptionMW = function(gitem) {
		return gitem.closest('li.gallerybox').find('div.gallerytext').eq(0).html();
	},
	_getCaptionWikia = function(gitem) {
		return gitem.closest('div.wikia-gallery-item').find('> div.lightbox-caption').eq(0).html();
	},
	_imageError = function() {
		_stopLoader();
	},
	_imageLoaded = function() {
		var navigation = (_galleryIndex != -1),
			img = $('#TB_Image'),
			wndH = $('#TB_window').height(),
			// Resizing large images - orginal by Christian Montoya edited by me.
			pagesize = _getPageSize(),
			// Dimensiones máximas
			x = pagesize[0] - _minMarginWidth * 2 - _imageMarginWidth * 2,
			y = pagesize[1] - _minMarginHeight * 2 - wndH + img.height(),
			imageWidth = _imgPreloader.width,
			imageHeight = _imgPreloader.height,
			firstNav, imgOpt;
		// Puede entrar por una o por las dos. De hecho, con esta comprobación basta, ya que si tiene que pasar por las dos da igual por qué lado se reduzca primero
		if (imageWidth > x) {
			imageHeight = imageHeight * (x / imageWidth);
			imageWidth = x;
		}
		if (imageHeight > y) {
			imageWidth = imageWidth * (y / imageHeight);
			imageHeight = y;
		}
		// End Resizing

		firstNav = (img.attr('src') || '') === '';
		// Dimensiones de la ventana Thickbox para posicionar
		_width = imageWidth + _imageMarginWidth * 2; // 15px de espacio en cada lado
		// La altura de la ventana la conocemos. Solo hay que reemplazar la imagen antigua y poner la nueva, esto es, sus dimensiones. El height se tiene que hacer diferente porque intervienen más elementos que en el ancho
		_height = wndH - img.height() + imageHeight;
		img.attr({
			src: _imgPreloader.src,
			alt: $('#TB_caption').text()
		});

		imgOpt = {width: imageWidth, height: imageHeight, opacity: 1};
		// Miramos si se carga al abrir o después de navegar. Si viene de abrirse, sin animación
		if (firstNav) {
			img.css(imgOpt);
		} else {
			img.animate(imgOpt, {duration: 'fast'});
		}

		_position(navigation && !firstNav);
		_displayClean();
	},
	_updateNavigation = function() {
		var seq = _galleryIndex, len = _galleryData.length;
		$('#TB_prev').css('display', (seq === 0 ? 'none' : ''));
		$('#TB_next').css('display', (seq >= len-1 ? 'none' : ''));
		$('#TB_imageCount').text('Imagen ' + (seq+1) + ' de ' + len);
	},
	_navigate = function() {
		var url, seq = _galleryIndex + (this.id == 'TB_prev' ? -1 : 1), len = _galleryData.length, gitem;
		if (seq < 0 || seq > len - 1) {
			return false;
		}
		_galleryIndex = seq;
		gitem = _galleryData.eq(seq);
		url = _getUrlFromThumb(gitem.find('> img').eq(0).attr('src'));
		_updateNavigation();
		if (_imgPreloader.src != url) {
			$('#TB_window').stop();
			$('#TB_Image').queue('fx',[]).stop().animate({opacity: 0}, {duration: 'fast', complete: function() {
				_startLoader();
				_imgPreloader.src = url;
			}});
		}
		// Si la función no encuentra el elemento, puede devolver undefined, y en este caso no cambia el contenido. Forzamos un null en ese caso
		$('#TB_caption').html( ( _getCaption(gitem) || null ) );
		$('#TB_descLink').attr('href',gitem.attr('href'));
		return false;
	},
	_setParams = function(p) {
		var val;
		if (typeof p != 'object') {
			return;
		}
		for (var n in p) {
			if (p.hasOwnProperty(n)) {
				val = p[n];
				switch(n) {
					case 'minWidth':
						_minWidth = val;
						break;
					case 'imageMarginWidth':
						_imageMarginWidth = val;
						break;
					case 'minMarginWidth':
						_minMarginWidth = val;
						break;
					case 'minMarginHeight':
						_minMarginHeight = val;
						break;
					case 'loaderWait':
						_loaderWait = (typeof val == 'number' && val);
						break;
					case 'logger':
						_logger = (typeof val == 'function' && val);
						break;
				}
			}
		}
	},
	_log = function(msg) {
		if (_logger) {
			_logger(msg);
		}
	},
	_imgTipEvent = function(e) {
		var target = e.target, a, t;
		if (e.ctrlKey || e.altKey || e.shiftKey) {
			_hideImgTip();
			return;
		}
		if (_isTag(target,'img')) { // Gallery o thumb
			a = target.parentNode;
			if (!_isTag(a,'a') || !_isClass(a,'image') || _isClass(a,'link-internal')) {
				_hideImgTip();
				return;
			}
			t = $(target);
			// Mostramos solo si la imagen tiene un tamaño mínimo
			if (t.width() < 40 || t.height() < 40) {
				return;
			}
			_showImgTip(t);
			return;
		}
		_hideImgTip();
	},
	_imgTipClickEvent = function() {
		if (_imgTipTarget) {
			$(_imgTipTarget).click();
			return false;
		}
	},
	_createImgTip = function() {
		_imgTip = $('<div id="TB_imagetip" title="Clic sobre la imagen para ampliar. Ctrl, Alt o Mayús. para acceder a la página de descripción de la imagen.">').appendTo(document.body);
		_imgTip.on('click',_imgTipClickEvent);
	},
	_showImgTip = function(target) {
		if (!_imgTip) {
			_createImgTip();
		}
		var of = target.offset();
		_imgTip.css({
			display: 'block',
			left: of.left + target.width(),
			top: of.top + target.height()
		});
		_imgTipVisible = true;
		_imgTipTarget = target;
	},
	_hideImgTip = function() {
		if (_imgTipVisible) {
			_imgTip.css('display','none');
			_imgTipVisible = false;
			_imgTipTarget = null;
		}
	};

	// Public functions
	return {
		init: _init,
		showImage: _showImage,
		showElement: _showElement,
		remove: _remove,
		setParams: _setParams
	};

}(jQuery, mw));

if (mw.config.get('wgAction', '') != 'history' || !(mw.config.get('wgNamespaceNumber', 0) == -1 && mw.config.get('wgCanonicalSpecialPageName', '') == 'Recentchanges')) {
	$(window.Thickbox.init);
}
/* </pre> */

/*
* LazyLoadVideo - Muestra un botón para activar (mostrar) el reproductor de vídeos, para que no se carguen desde el inicio
* Copyright (C) 2012 - 2015 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
(function($) {

var _title = (window.lazyloadvideotitle || 'Clic para activar el vídeo'),
_thumbUrl = 'http://i1.ytimg.com/vi/{0}/hqdefault.jpg',
_init = function() {
	$('div.video > .youtube', '#mw-content-text').each(_muestraThumb);
},
// Agrega una imagen del vídeo en la posición del contenedor
_muestraThumb = function() {
	var oDiv = $(this), vid = oDiv.data('youtubevid'), w, h;
	// Se comprueba que esté oculto, para sincronizar con CSS
	if (vid && vid.length == 11 && oDiv.find('> iframe').length === 0) {
		w = oDiv.width().toString();
		h = oDiv.height().toString();
		oDiv.append(
			$('<img class="videothumb">').attr('src', _thumbUrl.replace('{0}', vid)).attr({width: w, height: h})).append(
			$('<div class="videodiscoveryoverlay">').css({width: w.concat('px'), height: h.concat('px')}).attr('title', _title).bind('click', _insertVideo));
	}
},
// Evento al hacer clic en el overlay
_insertVideo = function() {
	var p = $(this).parent(), iframe;
	p.empty();
	iframe = $('<iframe>').attr({
		'type': 'text/html',
		width: p.css('width'),
		height: p.css('height'),
		src: 'http://www.youtube.com/embed/' + p.data('youtubevid') + '?iv_load_policy=3&rel=0',
		frameborder: '0',
		allowfullscreen: ''
	}).appendTo(p);
};

// Muy lazy load
(typeof(window.safeOnLoadHook)=='function'?window.safeOnLoadHook:$)(function() {
	window.setTimeout(_init, 2000);
});

})(jQuery);

if (mw.config.get('wgCanonicalSpecialPageName', '') != 'MyHome') {
	window.wgEnableImageLightboxExt = false;
	// Por si ya se ha cargado (a veces pasa)
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		$('#'+(window.bodyContentId||'bodyContent')).unbind('.lightbox');
	});
}

/**
* SkinPropagation: Propaga el &useskin= de la URL (siempre que sea posible) por los enlaces y formularios
* Copyright (C) 2010-2017  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
(function($, mw) {
	'use strict';
	var _skin = '',
	_init = function() {
		var url;
		if (window.location.href.indexOf('useskin=') == -1) return;
		url = _parseURL(window.location.href);
		// Si existe propagateskin, se propagará este en los siguientes enlaces en lugar del useskin (p.ej. enlaces para 
		if (url.query.useskin) {
			_skin = (url.query.propagateskin || url.query.useskin);
		}
		if (_skin) {
			$(document.body).bind('click.skinpropagation', _clicEvent);
			$('form').bind('submit.skinpropagation', _submitEvent);
		}
	},
	_parseURL = function(url) {
		var ret = { base:'', qs:'', query: {}, hash: '' }, loc = url.indexOf('#'), paras, i, p;
		if (loc != -1) {
			ret.hash = url.substr(loc + 1);
			url = url.substr(0, loc);
		}
		loc = url.indexOf('?');
		if (loc != -1) {
			ret.qs = url.substr(loc + 1);
			url = url.substr(0, loc);
			paras = ret.qs.split('&');
			for (i = 0; i < paras.length; i++) {
				p = paras[i].split('=');
				if (p.length == 2) {
					ret.query[p[0]] = p[1];
				}
			}
		}
		ret.base = url;
		return ret;
	},
	_getURL = function(url) {
		var nurl, p;
		nurl = url.base + '?';
		for (p in url.query) {
			if (url.query.hasOwnProperty(p) && (url.query[p] || url.query[p] === '')) {
				nurl += p + '=' + url.query[p] + '&';
			}
		}
		nurl = nurl.substr(0, nurl.length - 1);
		if (url.hash) {
			nurl += '#' + url.hash;
		}
		return nurl;
	},
	_clicEvent = function(e) {
		var url, thisloc;
		if (e.target.tagName.toLowerCase() != 'a') return;
		if (e.target.href.indexOf(mw.config.get('wgServer')) !== 0) return;
		url = _parseURL(e.target.href);
		thisloc = _parseURL(window.location.href);
		// Si es enlace a sección, no hacer nada
		if (url.base == thisloc.base && url.qs == thisloc.qs && url.hash) {
			return;
		}
		if (url.query.useskin && url.query.useskin != _skin) {
			url.query.propagateskin = _skin;
		} else {
			url.query.useskin = _skin;
		}
		e.target.href = _getURL(url);
	},
	_submitEvent = function(e) {
		var url;
		if (this.action.indexOf(mw.config.get('wgServer')) !== 0) return;
		if (this.method.toLowerCase() == 'post') {
			url = _parseURL(this.action);
			url.query.useskin = _skin;
			this.action = _getURL(url);
		} else {
			$('<input type="hidden" name="useskin">').val(_skin).appendTo(this);
		}
	},
	_addUseSkin = function(url, skin) {
		var nurl = _parseURL(url);
		nurl.query.useskin = skin;
		nurl.query.propagateskin = false;
		return _getURL(nurl);
	};

	window.SkinPropagation = {
		addUseSkin: _addUseSkin
	};

	$(_init);

})(jQuery, mw);
//<pre>
// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

function Wikidex_ElementLoader() {
	var nDesplegadas = 0, cnPlegables;

	if ( window.PlantillaPlegable && !window.disablePlantillaPlegable ) {
		cnPlegables = $('table.plegable', '#mw-content-text').map(function() {
			var $t = $(this), tp;
			if ($t.hasClass('plegable-plegada')) {
				tp = new PlantillaPlegable(this, true);
			} else {
				tp = new PlantillaPlegable(this);
				nDesplegadas++;
				if (!$t.hasClass('plegable-desplegada')) {
					return tp;
				}
			}
		}).get();
		if (MaxDesplegadas != -1 && nDesplegadas > MaxDesplegadas) {
			$.each(cnPlegables, function() {
				this.cambiarEstado(true);
			});
		}
	}
	/*@cc_on
	var disableTableManager = true;
	@*/
	if ( window.YAHOO && !window.disableTableManager ) {
		var ar = jQuery.makeArray( $('table.tablemanager,table.movmtmo,table.movtutor,table.movhuevo,table.movnivel,table.tabmov', '#mw-content-text') );
		postloadFunctionData['tablemanager'] = postloadFunctionData['tablemanager'].concat(ar);
		if (postloadFunctionData['tablemanager'].length != 0) {
			importScript('MediaWiki:Common.js/Clases/TableManager-min.js');
		}
	}
}

if ((mw.config.get('wgAction') == 'view' || mw.config.get('wgAction') == 'edit' || mw.config.get('wgAction') == 'submit') && (mw.config.get('wgCanonicalSpecialPageName', '') != 'Recentchanges')) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(Wikidex_ElementLoader);
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		importScript('MediaWiki:Common.js/Clases/ImageSwitcher-min.js');
	});
}

if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload' || mw.config.get('wgCanonicalSpecialPageName', '') == 'MultipleUpload') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
			if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
			importScript('MediaWiki:Common.js/Clases/UploadValidator.bootstrap.js');
		});
	});
}

// Enlaces navegador para especies en el título
function navegadorCuadroPokemon() {
	var $nn = $('#numeronacional');
	if ($nn.length == 0) return;
	var prev = $nn.prev('a').clone();
	var next = $nn.next('a').clone();
	var ccn = $nn.closest('div.cuadro_pokemon').eq(0).attr('class').split(' ');
	var tipo = '';
	for (var i = 0; i < ccn.length; i++) {
		if (ccn[i].indexOf('tipo1-') == 0 || ccn[i].indexOf('tipo2-') == 0) {
			if (tipo != '') {
				tipo += ' ';
			}
			tipo += ccn[i];
		}
	}
	var fh = $('#firstHeading');
	fh.addClass(tipo).contents().eq(0).wrap('<span class="ctipo navtitulo"></span>');
	fh.addClass('navcp');
	if (prev.exists()) {

		$('<span class="ctipo navprev">').append(prev.text('« '+prev.text())).appendTo(fh);
	}
	if (next.exists()) {
		$('<span class="ctipo navnext">').append(next.text(next.text()+' »')).appendTo(fh);
	}
}

if (mw.config.get('wgNamespaceNumber') === 0) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(navegadorCuadroPokemon);
}

// TOC en categorías
function TOCCategorias() {
	$('#firstHeading').after('<ul id="categorytoc"><li style="font-weight:bold;">Contenidos:</li><li><a href="#mw-subcategories">Subcategorías</a></li> &#124; <li><a href="#mw-pages">Artículos</a></li> &#124; <li><a href="#mw-category-media">Archivos</a></li> &#124; <li><a href="#catlinks">Categorías</a></li></ul>');
	$('div.pagingLinks').prepend('<span style="font-weight:bold;">Navegación: </span>');
}
if (mw.config.get('wgNamespaceNumber') == 14 && mw.config.get('wgAction') == 'view') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(TOCCategorias);
}

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (mw.config.get('skin') != 'oasis' && mw.config.get('wgAction') == 'view' &&
		(mw.config.get('wgNamespaceNumber') == 0 || mw.config.get('wgNamespaceNumber') == 6 || mw.config.get('wgNamespaceNumber') == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#'+(window.bodyContentId||'bodyContent')).children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+mw.config.get('wgArticlePath', '').replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().closest('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
	});
}

if (mw.config.get('wgNamespaceNumber', 0) != -1) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		importScript('MediaWiki:Common.js/Clases/SVGDirecto.js');
	});
}

// Impedir el renombrado de página de usuario
function disableUserpageMove() {
	var url = window.location.toString();
	var pn = mw.config.get('wgPageName', '');
	var pos = url.indexOf(pn);
	if (pos == -1) {
		url = decodeURIComponent(url);
	}
	pos = url.indexOf(pn);
	if (pos == -1) return; // fail :(
	var page = url.substr(url.indexOf(pn)+pn.length+1);
	pos = page.indexOf('?');
	if (pos != -1) {
		page = page.substr(0, pos);
	}
	pos = page.indexOf('/');
	if (pos != -1) {
		// Si hay barra es que se está trasladando una subpágina. Ok, lo permitimos
		return;
	}
	// Es página de usuario?
	var re_user = new RegExp('^(user|'+mw.config.get('wgFormattedNamespaces')['2']+'):', 'i');
	if (re_user.test(page)) {
		// Excluir admin y otros
		for (var i = 0; i < mw.config.get('wgUserGroups', []).length; i++) {
			if (mw.config.get('wgUserGroups')[i] == 'sysop' || mw.config.get('wgUserGroups')[i] == 'asistente' || mw.config.get('wgUserGroups')[i] == 'rollback') {
				return true;
			}
		}
		window.location = mw.config.get('wgArticlePath', '').replace('$1', 'Ayuda:Renombrar_mi_cuenta');
	}
}

if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Movepage') {
	try {
		disableUserpageMove();
	} catch(e) {
		typeof(window.trataError)=='function'&&trataError(e);
	}
}

if (mw.config.get('wgIsMainPage')) {
	importScript('MediaWiki:Slider.js');
}

function inicializarAjaxRC() {
	if (mw.config.get('wgNamespaceNumber') == -1) {
		switch (mw.config.get('wgCanonicalSpecialPageName')) {
			case 'Recentchanges':
			case 'WikiActivity':
			case 'Newpages':
			case 'Watchlist':
				window.AjaxRCRefreshText = 'Actualizar automáticamente';
				window.AjaxRCRefreshHoverText = 'Con la casilla marcada, esta página se actualizará automáticamente cada 60 segundos';
				window.ajaxRefresh = 60000;
				window.ajaxPages = [ mw.config.get('wgPageName') ];
				importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
				break;
		}
	}
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(inicializarAjaxRC);

function mejorarEspecialNuevasImagenes() {
	$('.wikia-gallery-item').each(function() {
		var $item = $(this), $img = $item.find('.thumbimage'), title = $img.attr('alt'), inm = $img.data('image-name'), capt = $item.find('.lightbox-caption'), $a;
		if (title) {
			// alt no incluye la extensión
			title += inm.substr(inm.lastIndexOf('.'));
			// Corrección de valor en image-key, vienen cosas como data-image-key="Logo_serie_XY_%26amp%3B_Z.png" que confunden a thickbox
			$img.data('image-key', encodeURIComponent(title.replace(/ /g, '_')));
			$a = $('<a>').text(title).attr( {title: title, href: $item.find('.image').attr('href')} );
			capt.prepend('<br>');
			capt.prepend($a);
		}
	});
}

if (mw.config.get('wgCanonicalSpecialPageName') === 'Newimages' || mw.config.get('wgCanonicalSpecialPageName') === 'Images') {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(mejorarEspecialNuevasImagenes);
}

// Parches
// 20160909: Reportado hace más de 1 mes, no les da la gana de hacer que cargue el Group-sysop.js de nuevo
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	if (mw.config.get('wgUserGroups') && $.inArray('sysop', mw.config.get('wgUserGroups')) !== -1 && !mw.config.get('wgGroupSysopScriptsLoaded')) {
		importScript('MediaWiki:Group-sysop.js');
	}
});

// Notificar dirty diffs en ediciones hechas con VE
(function() {

	var _revId = '',
	_init = function() {
		if (mw.config.get('wgNamespaceNumber', -1) === 0 && mw.config.get('wgUserName') && /[\?&]diff=\d+/.test(window.location.toString()) && _getRevisionID()) {
			window.setTimeout(function() {
				mw.loader.using('mediawiki.api', _getRevProps);
			}, 1500);
		}
	},
	_getRevProps = function() {
		var api = new mw.Api();
		api.get({ action: 'query', revids: _revId, prop: 'revisions', rvprop: 'tags' }).done(_checkTags);
	},
	_getRevisionID = function() {
		var re, href = $('a', '#mw-diff-ntitle1').eq(0).attr('href');
		if (href) {
			re = new RegExp('\\boldid=(\\d+)\\b');
			_revId = re.exec(href)[1];
			return _revId;
		}
	},
	_checkTags = function(data) {
		var tags;
		if (data && data.query && data.query.pages) {
			for (var pp in data.query.pages) {
				if (data.query.pages[pp].revisions && data.query.pages[pp].revisions.length > 0) {
					tags = data.query.pages[pp].revisions[0].tags;
					if (tags && tags.length) {
						for (var i = 0; i < tags.length; i++) {
							if (tags[i] == 'visualeditor') {
								_setReportLink();
								return;
							}
						}
					}
				}
			}
		}
	},
	_setReportLink = function() {
		var $a = $('<a>').attr({href: mw.config.get('wgArticlePath').replace('$1', 'Especial:Contactar/bug'),
			title:'Reportar a Wikia un "diff sucio" ("dirty diff") causado por el Editor Visual'}).text(
			'Reportar a Wikia un "diff sucio" ("dirty diff") causado por el Editor Visual').on('click',
			_reportClick).wrap('<div></div>').parent().css({'text-align':'center'});
		$('table.diff').eq(0).after($a);
	},
	_reportClick = function(e) {
		var wh, $target = $(e.target);
		wh = window.open($target.attr('href'), 'vedirtydiffreport'+_revId.toString());
		$(wh).on('load', function(winref) {
			return function() {
				_onWinLoaded(winref);
			};
		}(wh));
		return false;
	},
	_onWinLoaded = function(winref) {
		var $form = $(winref.document.body).find('#contactform');
		$form.find('input[name="wpContactWikiName"]').val(window.location.toString());
		$form.find('input[name="wpFeature"]').val('VisualEditor');
		$form.find('textarea[name="wpDescription"]').val('English: As Kirkburn suggested, we\'re reporting dirty diffs from Visual Editor in our wiki. They need to go away.\n\nComo sugirió Kirkburn, estamos reportando los diffs sucios que deja el Editor Visual en nuestro wiki. Estos tienen que dejar de producirse.');
	};

	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(_init);

})();

//</pre>