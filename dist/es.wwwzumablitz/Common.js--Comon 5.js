// Frameworks y funciones externas
var $ = jQuery,
	$UT = UtilityTools;
//Constantes
var K_CTRL = 'plegable-ctrl',
	K_MOSTRAR = 'mostrar',
	K_OCULTAR = 'ocultar';

PlantillaPlegable = function(el, iniPlegada){
	// Elemento a convertir en plegable
	this.oElem = el;
	// Elemento con el control a plegar/desplegar
	this.oCtrl = null;
	// Estado
	this.bPlegada = false;
	// Estado inicial
	this.bInicialPlegada = (iniPlegada||false);
	// Indica si se ha ajustado el ancho al plegar
	this.bAjustado = false;
	this.init();
};

PlantillaPlegable.prototype = {
	version:'1.2',
	// Inicialización. Por ahora solo soporte para tablas
	init: function(){
		if (this.oElem.tagName.toLowerCase() != 'table' || !this.oElem.rows.length) return;
		var r0 = this.oElem.rows[0];
		// Miramos si ya existe
		for (var i = 0, ss = r0.getElementsByTagName('span'); i < ss.length; i++){
			if ($UT.hasClass(ss[i], K_CTRL)){
				ss[i].tabIndex = '0';
				this.oCtrl = ss[i];
				break;
			}
		}
		if (!this.oCtrl){
			var c = r0.cells[r0.cells.length-1];
			this.oCtrl = $UT.create('span', {'class':K_CTRL,tabindex:'0'});
			c.hasChildNodes() ? c.insertBefore(this.oCtrl, c.firstChild) : c.appendChild(this.oCtrl);
		}
		$UT.addHandler(this.oCtrl, 'click', function(thisArg) {
			return function() {
				thisArg.cambiarEstado(!thisArg.bPlegada);
			};
		}(this));
		$UT.addHandler(this.oCtrl, 'keyup', function(thisArg) {
			return function(e) {
				var key = e.keyCode || e.charCode || 0;
				if (key == 13) {
					thisArg.cambiarEstado(!thisArg.bPlegada);
				}
			};
		}(this));
		this.cambiarEstado(this.bInicialPlegada);
	},
	// Evento de cambio. plegar: [bool] indica si cambiar a estado plegado
	cambiarEstado: function(plegar){
		// Control
		this.oCtrl.innerHTML='';
		$UT.makeChildren([( plegar ? K_MOSTRAR : K_OCULTAR )], this.oCtrl);
		// Almacenamos dimensiones antes y después de aplicar visibilidad
		var jqElem = $(this.oElem);
		var oldWidth = jqElem.width();
		for (var i = 1, rs = this.oElem.rows; i < rs.length && plegar != this.bPlegada; i++){
			var jqRow = $(rs[i]);
			if (plegar){
				jqRow.hide();
			} else {
				jqRow.show();
			}
		}
		this.bPlegada = plegar;
		var newWidth = jqElem.width();
		// Si ha cambiado el ancho, forzamos el mismo que tenía, para evitar que se redimensione al plegar
		if (plegar && newWidth !== oldWidth && this.oElem.style.width === ''){
			this.bAjustado = true;
			jqElem.width(oldWidth);
		}
		if (this.bAjustado && !plegar)
			this.oElem.style.width = '';
	}
};
})();
//

//
// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

$(function() {
	var plegables = [],
		nDesplegadas = 0,
		cnPlegables = [],
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
});

// Datos para scripts que se cargan de forma asíncrona:
var postloadFunctionData = {
	'tablemanager': [],
	'charinsert': {
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categoría:',']]'], ['#REDIRECCIÓN [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<gallery widths\x3D\x22190px\x22>\n','\n</gallery>'], ['<tt>','</tt>'], '\x7B{PAGENAME}}', ['\x7B{t|','}}'], ['\x7B{S|','}}'] ],
		"Japonés - Katakana": ['ア','ァ','イ','ィ','ウ','ヴ','ゥ','エ','ェ','オ','ォ','カ','ガ','キ','ギ','ク','グ','ケ','ゲ','コ','ゴ','サ','ザ','シ','ジ','ス','ズ','セ','ゼ','ソ','ゾ','タ','ダ','チ','ヂ','ツ','ヅ','ッ','テ','デ','ト','ド','ナ','ニ','ヌ','ネ','ノ','ハ','バ','パ','ヒ','ビ','ピ','フ','ブ','プ','ヘ','ベ','ペ','ホ','ボ','ポ','マ','ミ','ム','メ','モ','ヤ','ャ','ユ','ュ','ヨ','ョ','ラ','リ','ル','レ','ロ','ワ','ヷ','ヰ','ヸ','ヱ','ヹ','ヲ','ヺ','ン','、','。',['「','」'],['『','』'],'ゝ','ゞ','々','ヽ','ヾ'],
		"Japonés - R\u014Dmaji": ['Ā','ā','Ē','ē','Ī','ī','Ō','ō','Ū','ū'],
		"Alfabeto fonético": ['ɨ','ʉ','ɯ','ɪ','ʏ','ʊ','ø','ɘ','ɵ','ɤ','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','ɶ','ɑ','ɒ','ɚ','ɝ','ʰ','ʱ','ʲ','ʴ','ʷ','˞','ˠ','ˤ','ʼ','ˈ','ˌ','ː','ˑ','.','ʈ','ɖ','ɟ','ɢ','ʔ','ɱ','ɳ','ɲ','ŋ','ɴ','ʙ','ʀ','ɾ','ɽ','ɸ','β','θ','ð','ʃ','ʒ','ʂ','ʐ','ʝ','ɣ','χ','ʁ','ħ','ʕ','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','ɰ','ɭ','ʎ','ʟ','ʍ','ɥ','ʜ','ʢ','ʡ','ɕ','ʑ','ɺ','ɧ','ɡ','ɫ'],
		"Plantillas de licencias": [['\x7B{Art Oficial|','}}'], '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Carátula}}', '\x7B{Fair use}}', ['\x7B{Fanart|','}}'], '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pokémon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}'],
		"Categorías de imágenes": ['[[Categoría:Imágenes de Mario & Luigi: Viaje al Centro de Bowser]]', '[[Categoría:Imágenes de Mario & Luigi: Superstar Saga]]', '[[Categoría:Imágenes de Mario & Luigi: Compañeros en el Tiempo]]', '[[Categoría:Imágenes de Super Mario Galaxy 2]]', '[[Categoría:Imágenes de Super Mario Galaxy]]', '[[Categoría:Imágenes de Super Mario Shunshine]]', '[[Categoría:Imágenes de Super Mario 64]]', '[[Categoría:Imágenes de Super Mario World]]', '[[Categoría:Imágenes de Super Mario Bros. 3]]', '[[Categoría:Imágenes de Super Mario Bros. 2]]', '[[Categoría:Imágenes de Super Mario Bros.]]', '[[Categoría:Imágenes de Paper Mario]]', '[[Categoría:Imágenes de Paper Mario: La Puerta Milenaria]]', '[[Categoría:Imágenes de Super Paper Mario]]', '[[Categoría:Imágenes de Paper Mario 3DS]]', '[[Categoría:Imágenes de Super Mario Kart]]', '[[Categoría:Imágenes de Mario Kart 64]]', '[[Categoría:Imágenes de Mario Kart: Double Dash!!]]', '[[Categoría:Imágenes de Mario Kart: Super Circuit]]', '[[Categoría:Imágenes de Mario Kart DS]]', '[[Categoría:Imágenes de Mario Kart Wii]]', '[[Categoría:Imágenes de Mario Kart 3DS]]', '[[Categoría:Imágenes de Mario Party 1]]', '[[Categoría:Imágenes de Mario Party 2]]', '[[Categoría:Imágenes de Mario Party 3]]', '[[Categoría:Imágenes de Mario Party 4]]', '[[Categoría:Imágenes de Mario Party 5]]', '[[Categoría:Imágenes de Mario Party 6]]', '[[Categoría:Imágenes de Mario Party 7]]', '[[Categoría:Imágenes de Mario Party 8]]'],
	}
};

function loadEditJS(){
	if ($G('editform') || $G('mw-upload-form')){
		importScript('MediaWiki:Common.js/Clases/CharInsert.js');
		if (wgNamespaceNumber == 2 && window.location.toString().indexOf('action=edit') != -1 && window.location.toString().indexOf('undo=') < 0 && window.location.toString().indexOf('undoafter=') < 0){
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