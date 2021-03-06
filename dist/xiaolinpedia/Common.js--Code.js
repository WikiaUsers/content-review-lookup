/* <pre> v223 */

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
{{:MediaWiki:Common.js/Clases/UtilityTools-min.js}}
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

// Page tracker
try {
	window._gaq = window._gaq || [];
	if (mw.config.get('wgCityId', '').length === 4 && mw.config.get('wgCityId')[0] == mw.config.get('wgCityId')[3] && mw.config.get('wgCityId')[1] == mw.config.get('wgCityId')[2] && mw.config.get('wgCityId').substr(2) == '21') {
		_gaq.push(['local._setAccount', 'UA-20514523-1']);
		_gaq.push(['local._setDomainName', 'none']);
		//_gaq.push(['local._setCampaignTrack', false]);
		_gaq.push(['local._setCustomVar',1,'Skin',mw.config.get('skin', '')+((window.location.toString().indexOf('useskin=') != -1) ? '_useskin' : ''),3]);
		_gaq.push(['local._setCustomVar',3,'IsMember',((typeof mw.config.get('wgUserName') == 'string') ? 'Yes' : 'No'),3]);
		if (mw.config.get('wgAction') && mw.config.get('wgPageName')) {
			_gaq.push(['local._setCustomVar',2,mw.config.get('wgAction', '')+'Page',mw.config.get('wgPageName', ''),3]);
		}
		_gaq.push(['local._trackPageview']);
	}
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}
// End Page tracker

//// Intento de mejora de LinkSuggest. Modificado por [[User:Ciencia Al Poder]]
function improveLinkSuggest(){
	if (!window.YAHOO || !YAHOO.example || !YAHOO.example.AutoCompleteTextArea) return;
	YAHOO.example.AutoCompleteTextArea.prototype._sendQuery = function(sQuery) {
		var text = this._elTextbox.value.replace(/\r/g, "");
		var caret = this.getCaret(this._elTextbox);
		var sQueryStartAt;
		var closedTemplateFound = false;
		var closedLinkFound = false;

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
				sQueryReal = this._originalQuery
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

/* === Sorttable corregido/mejorado ===
Al ordenar tablas donde una columna contenga sólo imágenes, se produce un error.
*/
window.ts_getInnerText = function(el){
	return $UT.getInnerText(el);
};
/* == Herramientas de edición == */

// Datos para scripts que se cargan de forma asíncrona:
var postloadFunctionData = {
	'tablemanager': [],
	'charinsert': {
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categoría:',']]'], ['#REDIRECCIÓN [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['\x3Cgallery widths="190px">\n','\n</gallery>'], ['<code>','</code>'], '\x7B{PAGENAME}}', ['\x7B{t|','}}'], ['\x7B{S|','}}'] ],
		"Japonés - Katakana": ['ア','ァ','イ','ィ','ウ','ヴ','ゥ','エ','ェ','オ','ォ','カ','ガ','キ','ギ','ク','グ','ケ','ゲ','コ','ゴ','サ','ザ','シ','ジ','ス','ズ','セ','ゼ','ソ','ゾ','タ','ダ','チ','ヂ','ツ','ヅ','ッ','テ','デ','ト','ド','ナ','ニ','ヌ','ネ','ノ','ハ','バ','パ','ヒ','ビ','ピ','フ','ブ','プ','ヘ','ベ','ペ','ホ','ボ','ポ','マ','ミ','ム','メ','モ','ヤ','ャ','ユ','ュ','ヨ','ョ','ラ','リ','ル','レ','ロ','ワ','ヷ','ヰ','ヸ','ヱ','ヹ','ヲ','ヺ','ン','、','。',['「','」'],['『','』'],'ゝ','ゞ','々','ヽ','ヾ'],
		"Japonés - R\u014Dmaji": ['Ā','ā','Ē','ē','Ī','ī','Ō','ō','Ū','ū'],
		"Alfabeto fonético": ['ɨ','ʉ','ɯ','ɪ','ʏ','ʊ','ø','ɘ','ɵ','ɤ','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','ɶ','ɑ','ɒ','ɚ','ɝ','ʰ','ʱ','ʲ','ʴ','ʷ','˞','ˠ','ˤ','ʼ','ˈ','ˌ','ː','ˑ','.','ʈ','ɖ','ɟ','ɢ','ʔ','ɱ','ɳ','ɲ','ŋ','ɴ','ʙ','ʀ','ɾ','ɽ','ɸ','β','θ','ð','ʃ','ʒ','ʂ','ʐ','ʝ','ɣ','χ','ʁ','ħ','ʕ','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','ɰ','ɭ','ʎ','ʟ','ʍ','ɥ','ʜ','ʢ','ʡ','ɕ','ʑ','ɺ','ɧ','ɡ','ɫ'],
		"Plantillas de licencias": [['\x7B{Art Oficial|','}}'], '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Carátula}}', '\x7B{Fair use}}', ['\x7B{Fanart|','}}'], '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pokémon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}'],
		"Imágenes para tipos": ['\x7B{t|Acero}}', '\x7B{t|Agua}}', '\x7B{t|Bicho}}', '\x7B{t|Dragón}}', '\x7B{t|Eléctrico}}', '\x7B{t|Fantasma}}', '\x7B{t|Fuego}}', '\x7B{t|Hielo}}', '\x7B{t|Lucha}}', '\x7B{t|Normal}}', '\x7B{t|Planta}}', '\x7B{t|Psíquico}}', '\x7B{t|Roca}}', '\x7B{t|Siniestro}}', '\x7B{t|Tierra}}', '\x7B{t|Veneno}}', '\x7B{t|Volador}}'],
		"Enlaces a videojuegos": ['[[Pokémon Verde]], [[Pokémon Rojo|Rojo]], [[Pokémon Azul|Azul]] y [[Pokémon Amarillo|Amarillo]]', '[[Pokémon Oro y Plata|Pokémon Oro, Plata]] y [[Pokémon Cristal|Cristal]]', '[[Pokémon Rubí y Zafiro|Pokémon Rubí, Zafiro]] y [[Pokémon Esmeralda|Esmeralda]]', '[[Pokémon Rojo Fuego y Verde Hoja]]', '[[Pokémon Diamante y Perla|Pokémon Diamante, Perla]] y [[Pokémon Platino|Platino]]', '[[Pokémon Oro HeartGold y Plata SoulSilver]]', '[[Pokémon Negro y Blanco]]']
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
	for (var i=1;i<7;i++){
		for (var j=0,hs=document.getElementsByTagName('h'+i.toString());j<hs.length;j++){
			var ss=$UT.getElementsByClassName('editsection', 'span', hs[j]);
			if (ss.length !== 0){
				ss[0].className+=' editsection-nf';
				ss[0].removeAttribute('style'); // BigButton fix
				hs[j].appendChild(ss[0]);
			}
		}
	}
}

(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(moveEditSection);

// </pre> Otras clases, ver [[MediaWiki:Common.js/Clases]]
{{:MediaWiki:Common.js/Clases/CreaEnlacesDex-min.js}}

{{:MediaWiki:Common.js/Clases/PlantillaPlegable-min.js}}

{{:MediaWiki:Common.js/Clases/Thickbox4MediaWiki.js}}

{{:MediaWiki:Common.js/Clases/LazyLoadVideo.js}}

if (mw.config.get('wgCanonicalSpecialPageName', '') != 'MyHome') {
	window.wgEnableImageLightboxExt = false;
	// Por si ya se ha cargado (a veces pasa)
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		$('#'+(window.bodyContentId||'bodyContent')).unbind('.lightbox');
	});
}

{{MediaWiki:Common.js/Clases/SkinPropagation.js}}
//<pre>
// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

function Wikidex_ElementLoader(){
	var plegables = [],
		nDesplegadas = 0,
		cnPlegables = [],
		cnTableManager = [],
		tp,
		bc = $UT.get(window.bodyContentId||'bodyContent');

	if ( window.PlantillaPlegable && !window.disablePlantillaPlegable ) {
		cnPlegables = $UT.getElementsByClassName('plegable', 'table', bc);
		for (var i=0; i < cnPlegables.length; i++) {
			var t = cnPlegables[i];
			if ($UT.hasClass(t, 'plegable-plegada')) {
				tp = new PlantillaPlegable(t, true);
			} else {
				tp = new PlantillaPlegable(t);
				if (! $UT.hasClass(t, 'plegable-desplegada')){
					plegables[plegables.length] = tp;
				}
				nDesplegadas++;
			}
		}
		if (MaxDesplegadas != -1 && nDesplegadas > MaxDesplegadas) {
			for (var i=0; i < plegables.length; i++) {
				plegables[i].cambiarEstado(true);
			}
		}
	}
	/*@cc_on
	var disableTableManager = true;
	@*/
	if ( window.YAHOO && !window.disableTableManager ) {
		var ar = [];
		ar = ar.concat( $UT.getElementsByClassName('tablemanager', 'table', bc) );
		ar = ar.concat( $UT.getElementsByClassName('movmtmo', 'table', bc) );
		ar = ar.concat( $UT.getElementsByClassName('movtutor', 'table', bc) );
		ar = ar.concat( $UT.getElementsByClassName('movhuevo', 'table', bc) );
		ar = ar.concat( $UT.getElementsByClassName('movnivel', 'table', bc) );
		ar = ar.concat( $UT.getElementsByClassName('tabmov', 'table', bc) );
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

if (mw.config.get('wgNamespaceNumber', 0) == -1 && (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload' || mw.config.get('wgCanonicalSpecialPageName', '') == 'MultipleUpload')) {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
			if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
			importScript('MediaWiki:Common.js/Clases/UploadValidator.js');
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
		
		$('<span class="ctipo navprev"></span>').append(prev.text('« '+prev.text())).appendTo(fh);
	}
	if (next.exists()) {
		$('<span class="ctipo navnext"></span>').append(next.text(next.text()+' »')).appendTo(fh);
	}
};

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

// Page tracker
try {
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		if (!window._gaq || typeof window._gaq.length == 'undefined') return;
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	});
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}
// End Page tracker
//</pre>