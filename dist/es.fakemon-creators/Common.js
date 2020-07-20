/* <pre> */
/* == Funciones comunes ==
Funciones compartidas por otros scripts del sitio. Evitar hacer modificaciones importantes: Algunos usuarios pueden estar haciendo uso de ellas. Usos que se tenga constancia: [[MediaWiki:Edit.js]], [[MediaWiki:Mergetables.js]]
</pre> */
{{MediaWiki:Common.js/Clases/UtilityTools-min.js}}

//<pre>
var $UT = UtilityTools;
if (!window.$G){
	window.$G = $UT.get;
}

/* Compatibilidad, al inicio del resto de carga de elementos */
function oasisCompatElements() {
	$(document.body).append('<section id="positioned_elements"></section>');
	var wa = $('#WikiaArticle');
	if (wa.exists()) {
		$('<div id="bodyContent"></div>').prependTo(wa);
		var bc = $('#bodyContent');
		wa.contents().not(bc).appendTo(bc);
	}
}

if (window.skin == 'oasis') {
	$(oasisCompatElements);
}

/* == Parches == */
// Está obligando a hacer login para editar si no tiene cookies habilitadas
if (document.cookie.length == 0) {
	wgComboAjaxLogin = false;
}

// agregar "ie6" como clase de body. Comentario condicional para IE
/*@cc_on
if (navigator.appVersion.indexOf('MSIE 6') != -1) {
	$(function(){ document.body.className += ' ie6'; });
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

$(improveLinkSuggest);


/* === Transparencia en imágenes PNG en IE === */
/*
 Mostrar transparencia en imágenes PNG para Internet Explorer
 Si no se pasa el parámetro @image recorrerá todas las imágenes
 @image: (HTMLImageElement) Imagen a parchear
 by: Ciencia Al Poder
 COMENTARIO CONDICIONAL PARA IE
*/
/*@cc_on
function IEPNGAlphaFix(image){
	if (typeof image === 'undefined' || !image.tagName){
		// Solo infobox:
		var d = $UT.getElementsByClassName('vnav','div','bodyContent');
		if (!d) return;
		for (var i=0; i<d.length; i++){
			for (var j=0, bi = d[i].getElementsByTagName('img'); j<bi.length; j++) {
				IEPNGAlphaFix(bi[j]);
			}
		}
	} else if (image.tagName.toLowerCase() == 'img' && image.width && image.width > 0){
		var imageUrl = image.src;
		if (imageUrl.length<4||imageUrl.substr(imageUrl.length-4).toLowerCase() != '.png') return;
		image.width = image.width;//Para img que no tienen el atributo definido
		image.src = 'https://images.wikia.nocookie.net/es.pokemon/images/2/2f/Blankdot.gif?1';
		image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + imageUrl + ", sizingMethod='scale')";
	}
}

try{
	if (navigator.appVersion.indexOf('MSIE 6') != -1) {
		$(IEPNGAlphaFix);
	}
}catch(e){}
@*/
/* === Sorttable corregido/mejorado ===
Al ordenar tablas donde una columna contenga sólo imágenes, se produce un error.
*/
window.ts_getInnerText = function(el){
	return $UT.getInnerText(el);
};
/* === Extensiones en minúscula al subir archivos === */
function adaptUploadFilename(){
	var ff = $G('mw-upload-form').wpDestFile;
	var fn = ff.value;
	if (fn.length < 4) return;
	var fe = fn.substr(fn.length-4,4);
	if (fe != fe.toLowerCase())
		ff.value = ff.value.substr(0,fn.length-4)+fe.toLowerCase();
}

$(function(){
	var uf = $G('mw-upload-form');
	if (uf && uf.wpDestFile) $UT.addHandler(uf,'submit',adaptUploadFilename);
});
/* == Herramientas de edición == */

// Datos para scripts que se cargan de forma asíncrona:
var postloadFunctionData = {
	'tablemanager': [],
	'charinsert': {
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categoría:',']]'], ['#REDIRECCIÓN [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<gallery widths\x3D\x22190px\x22>\n','\n</gallery>'], ['<tt>','</tt>'], '\x7B{PAGENAME}}', ['\x7B{t|','}}'], ['\x7B{S|','}}'] ],
		"Japonés - Katakana": ['ア','ァ','イ','ィ','ウ','ヴ','ゥ','エ','ェ','オ','ォ','カ','ガ','キ','ギ','ク','グ','ケ','ゲ','コ','ゴ','サ','ザ','シ','ジ','ス','ズ','セ','ゼ','ソ','ゾ','タ','ダ','チ','ヂ','ツ','ヅ','ッ','テ','デ','ト','ド','ナ','ニ','ヌ','ネ','ノ','ハ','バ','パ','ヒ','ビ','ピ','フ','ブ','プ','ヘ','ベ','ペ','ホ','ボ','ポ','マ','ミ','ム','メ','モ','ヤ','ャ','ユ','ュ','ヨ','ョ','ラ','リ','ル','レ','ロ','ワ','ヷ','ヰ','ヸ','ヱ','ヹ','ヲ','ヺ','ン','、','。',['「','」'],['『','』'],'ゝ','ゞ','々','ヽ','ヾ'],
		"Japonés - R\u014Dmaji": ['Ā','ā','Ē','ē','Ī','ī','Ō','ō','Ū','ū'],
		"Alfabeto fonético": ['ɨ','ʉ','ɯ','ɪ','ʏ','ʊ','ø','ɘ','ɵ','ɤ','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','ɶ','ɑ','ɒ','ɚ','ɝ','ʰ','ʱ','ʲ','ʴ','ʷ','˞','ˠ','ˤ','ʼ','ˈ','ˌ','ː','ˑ','.','ʈ','ɖ','ɟ','ɢ','ʔ','ɱ','ɳ','ɲ','ŋ','ɴ','ʙ','ʀ','ɾ','ɽ','ɸ','β','θ','ð','ʃ','ʒ','ʂ','ʐ','ʝ','ɣ','χ','ʁ','ħ','ʕ','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','ɰ','ɭ','ʎ','ʟ','ʍ','ɥ','ʜ','ʢ','ʡ','ɕ','ʑ','ɺ','ɧ','ɡ','ɫ'],
		"Plantillas de licencias": [['\x7B{Art Oficial|','}}'], '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Carátula}}', '\x7B{Fair use}}', ['\x7B{Fanart|','}}'], '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pokémon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}'],
		"Categorías de imágenes": ['[[Categoría:Sprites de Pokémon Rojo y Azul]]', '[[Categoría:Sprites de Pokémon Verde]]', '[[Categoría:Sprites de Pokémon Amarillo]]', '[[Categoría:Sprites de espaldas de la primera generación]]', '[[Categoría:Sprites de Pokémon Oro]]', '[[Categoría:Sprites brillantes de Pokémon Oro]]', '[[Categoría:Sprites de Pokémon Plata]]', '[[Categoría:Sprites brillantes de Pokémon Plata]]', '[[Categoría:Sprites de Pokémon Cristal]]', '[[Categoría:Sprites brillantes de Pokémon Cristal]]', '[[Categoría:Sprites de espaldas de la segunda generación]]', '[[Categoría:Sprites brillantes de espaldas de la segunda generación]]', '[[Categoría:Sprites de Pokémon Rubí y Zafiro]]', '[[Categoría:Sprites brillantes de Pokémon Rubí y Zafiro]]', '[[Categoría:Sprites de Pokémon Esmeralda]]', '[[Categoría:Sprites brillantes de Pokémon Esmeralda]]', '[[Categoría:Sprites de Pokémon Rojo Fuego y Verde Hoja]]', '[[Categoría:Sprites brillantes de Pokémon Rojo Fuego y Verde Hoja]]', '[[Categoría:Sprites de espaldas de la tercera generación]]', '[[Categoría:Sprites brillantes de espaldas de la tercera generación]]', '[[Categoría:Sprites de Pokémon Diamante y Perla]]', '[[Categoría:Sprites brillantes de Pokémon Diamante y Perla]]', '[[Categoría:Sprites de Pokémon Platino]]', '[[Categoría:Sprites brillantes de Pokémon Platino]]', '[[Categoría:Sprites de espaldas de la cuarta generación]]', '[[Categoría:Sprites brillantes de espaldas de la cuarta generación]]', '[[Categoría:Iconos de Pokémon de la primera generación]]', '[[Categoría:Iconos de Pokémon de la segunda generación]]', '[[Categoría:Iconos de Pokémon de la tercera generación]]', '[[Categoría:Iconos de Pokémon de la cuarta generación]]'],
		"Imágenes para tipos": ['\x7B{t|Acero}}', '\x7B{t|Agua}}', '\x7B{t|Bicho}}', '\x7B{t|Dragón}}', '\x7B{t|Eléctrico}}', '\x7B{t|Fantasma}}', '\x7B{t|Fuego}}', '\x7B{t|Hielo}}', '\x7B{t|Lucha}}', '\x7B{t|Normal}}', '\x7B{t|Planta}}', '\x7B{t|Psíquico}}', '\x7B{t|Roca}}', '\x7B{t|Siniestro}}', '\x7B{t|Tierra}}', '\x7B{t|Veneno}}', '\x7B{t|Volador}}'],
		"Enlaces a videojuegos": ['[[Pokémon Verde]], [[Pokémon Rojo|Rojo]], [[Pokémon Azul|Azul]] y [[Pokémon Amarillo|Amarillo]]', '[[Pokémon Oro y Plata|Pokémon Oro, Plata]] y [[Pokémon Cristal|Cristal]]', '[[Pokémon Rubí y Zafiro|Pokémon Rubí, Zafiro]] y [[Pokémon Esmeralda|Esmeralda]]', '[[Pokémon Rojo Fuego y Verde Hoja]]', '[[Pokémon Diamante y Perla|Pokémon Diamante, Perla]] y [[Pokémon Platino|Platino]]', '[[Pokémon Oro HeartGold y Plata SoulSilver]]', '[[Pokémon Negro y Blanco]]']
	}
};

function loadEditJS(){
	if ($G('editform') || $G('mw-upload-form')){
		importScript('MediaWiki:Common.js/Clases/CharInsert-min.js');
		if (wgAction == 'edit' && wgNamespaceNumber == 2 && window.location.toString().indexOf('undo=') < 0 && window.location.toString().indexOf('undoafter=') < 0){
			importScript('MediaWiki:Common.js/Clases/DisableFirstSubmit.js');
		}
	}
	var uplTb = $G('wpUploadDescription');
	// Agregamos LinkSuggest en Secial:Upload
	if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName === 'Upload' && uplTb && !window.LS_PrepareTextarea && window.YAHOO){
		if (!$G('wpTextbox1_container')){
			uplTb.parentNode.appendChild($UT.create('div', {'id':'wpTextbox1_container','class':'yui-ac-container'}));
		}
		$.getScript(wgExtensionsPath+'/wikia/LinkSuggest/LinkSuggest.js?'+wgStyleVersion, function(){
			improveLinkSuggest();
			if (window.LS_PrepareTextarea){
				var oDS = new YAHOO.widget.DS_XHR(wgServer + wgScriptPath, ["\n"]);
				oDS.responseType = YAHOO.widget.DS_XHR.TYPE_FLAT;
				oDS.scriptQueryAppend = 'action=ajax&rs=getLinkSuggest';
				LS_PrepareTextarea ('wpUploadDescription', oDS);
			}
		});
	}
}

$(loadEditJS);

/* == Acopla tablas ==
Para unir las filas en una sola tabla. [[MediaWiki:Mergetables.js]]
*/

function acopla_tablas(){
	switch(window.wgPageName){
		case "Lista_de_Pokémon":
		case "Lista_de_movimientos":
			importScript('MediaWiki:Mergetables.js').defer = 'defer';
			break;
	}
}

$(acopla_tablas);

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

$(moveEditSection);

function setupMultipleUpload(){
	var f = $G('upload');
	if (!f) return;
	// Convertir descripcion en textarea
	var table = f.getElementsByTagName('table')[0], contador = 0;
	for (var i = 0, rs = table.rows; i < rs.length; i++){
		if (rs[i].cells.length < 3) continue;
		var c = rs[i].cells[2];
		if (c.getElementsByTagName('input').length == 0) continue;
		var oldValue = c.getElementsByTagName('input')[0].value,
			newName = 'wpUploadDescription_'+contador.toString();
		while (c.firstChild) c.removeChild(c.firstChild);
		c.appendChild($UT.create('textarea', {tabindex:'3', 'name':newName, 'id':newName}, oldValue));
		contador++;
	}
	// Tamaño normal en selector de licencia
	if ($G('wpLicense')) $G('wpLicense').removeAttribute('style');
}

if (wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName === 'MultipleUpload'){
	$(setupMultipleUpload);
}

// </pre> Otras clases, ver [[MediaWiki:Common.js/Clases]]
{{MediaWiki:Common.js/Clases/CreaEnlacesDex-min.js}}

{{MediaWiki:Common.js/Clases/PlantillaPlegable-min.js}}

{{MediaWiki:Common.js/Clases/Thickbox4MediaWiki.js}}

if (!(wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome')) {
	window.wgEnableImageLightboxExt = false;
}

{{MediaWiki:Common.js/Clases/SkinPropagation.js}}
//<pre>
function creaEnlacesDex_init(){
	if (!window.CreaEnlacesDex) return;
	new CreaEnlacesDex();
}

$(creaEnlacesDex_init);

// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

function Wikidex_ElementLoader(){
	var plegables = [],
		nDesplegadas = 0,
		cnPlegables = [],
		cnTableManager = [],
		tp,
		bc = $UT.get('bodyContent');

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

window.wgEPLastGif = 83; // Número de último episodio en el que el formato de imagen es GIF

if ((wgAction == 'view' || wgAction == 'edit' || wgAction == 'submit') && (wgNamespaceNumber != -1 || window.wgCanonicalSpecialPageName != 'Recentchanges')) {
	$(Wikidex_ElementLoader);
	importScript('MediaWiki:Common.js/Clases/ImageSwitcher.js');
}

if (wgNamespaceNumber == -1 && (window.wgCanonicalSpecialPageName == 'Upload' || window.wgCanonicalSpecialPageName == 'MultipleUpload')) {
	importScript('MediaWiki:Common.js/Clases/UploadValidator.js');
}

/* Marcar con [RTE] las ediciones hechas con el RTE activado
function editSummaryCheckRTE() {
	if (!$('#wysiwygData').length) return;
	var tag = '[RTE]';
	if ($('#editform').hasClass('source_mode')) {
		tag = '[RTEs]';
	}
	var wps = $('#wpSummaryEnhanced').get(0);
	if ((wps.value).indexOf(tag) != 0) {
		wps.value = tag + ' ' + wps.value;
	}
	return 1;
}

if (wgAction == 'edit' || wgAction == 'submit') {
	$(function(){
		$('#wpSave').bind('click',editSummaryCheckRTE);
	});
}*/

// Enlaces navegador para especies en el título
function navegadorCuadroPokemon() {
	var nn = document.getElementById('numeronacional');
	if (!nn) return;
	var prev = $(nn).prev('a').clone();
	var next = $(nn).next('a').clone();
	var ccn = $(nn).parents('div.cuadro_pokemon').eq(0).attr('class').split(' ');
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

if (window.wgNamespaceNumber == 0) {
	$(navegadorCuadroPokemon);
}

if (window.wgUserGroups && (','+wgUserGroups.join(',')+',').indexOf(',sysop,') != -1) {
	importScript('MediaWiki:Common.js/Extra/SysopTools.js');
}
//</pre>