// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (window.skin != 'oasis' && wgAction == 'view' &&
		(wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14) &&
		window.location.toString().indexOf('diff=') == -1) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			if ($('#catlinks').length == 0) {
				$('#bodyContent').children('div.printfooter').after('<div id="catlinks" class="catlinks"></div>');
			}
			if ($('#mw-normal-catlinks').length == 0) {
				$('#catlinks').prepend('<div id="mw-normal-catlinks"><a title="Especial:Categorías" href="'+wgArticlePath.replace('$1', 'Especial:Categorías')+'">Categorías</a></div>');
			}
			$('#mw-normal-catlinks').children('a').eq(0).after('<span class="noprint">&nbsp;<span>(<a style="cursor: pointer;" title="Modificar categorías"><span>+<sup>+</sup></span></a>)</span></span>').next().find('a').click(function() {
				$(this).unbind().parents('span.noprint').eq(0).remove();
				importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
				return false;
			});
			$('#catlinks').removeClass('catlinks-allhidden');
		}
	});
} else if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Upload') {
	importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
}

// Arregla los enlaces de los resultados de búsqueda
function fixSearchResultLinks() {
	$('ul.mw-search-results').find('a').each(function() {
		var a = $(this);
		a.attr('href', wgArticlePath.replace('$1', encodeURIComponent(a.text().replace(new RegExp(' ', 'g'), '_')).replace(new RegExp('%3A','g'),':')));
	});
}
 
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Search') {
	$(fixSearchResultLinks);
}

// Añadir encabezado (h2) en 'category-gallery' (solo categorías)
function encabezadoCategorias() {
	$('.category-gallery').before('<h2>Muestrario de la categoría</h2>');
}
 
// TOC en categorías
function TOCCategorias() {
	$('#firstHeading').after('<ul id="categorytoc"><li style="font-weight:bold;">Contenidos:</li><li><a href="#mw-subcategories">Subcategorías</a></li> &#124; <li><a href="#mw-pages">Artículos</a></li> &#124; <li><a href="#mw-category-media">Archivos</a></li> &#124; <li><a href="#catlinks">Categorías</a></li></ul>');
	$('div.pagingLinks').prepend('<span style="font-weight:bold;">Navegación: </span>');
}
if (window.wgNamespaceNumber == 14 && window.wgAction == 'view') {
	$(TOCCategorias);
	$(encabezadoCategorias);
}

/* <pre> */
/* == Funciones comunes == Funciones compartidas por otros scripts del sitio. Evitar hacer modificaciones importantes: Algunos usuarios pueden estar haciendo uso de ellas. Usos que se tenga constancia: [[MediaWiki:Edit.js]], [[MediaWiki:Mergetables.js]] </pre> */
{{MediaWiki:Common.js/Clases/UtilityTools.js}}
//<pre>
var $UT = UtilityTools;
if (!window.$G){
	window.$G = $UT.get;
}

/* === Transparencia en imágenes PNG en IE === */
/* Mostrar transparencia en imágenes PNG para Internet Explorer Si no se pasa el parámetro @image recorrerá todas las imágenes @image: (HTMLImageElement) Imagen a parchear by: Ciencia Al Poder COMENTARIO CONDICIONAL PARA IE */
/*@cc_on function IEPNGAlphaFix(image){ 	if (typeof image === 'undefined' || !image.tagName){ 		// Solo infobox: 		var d = $UT.getElementsByClassName('vnav','div','bodyContent'); 		if (!d) return; 		for (var i=0; i<d.length; i++){ 			for (var j=0, bi = d[i].getElementsByTagName('img'); j<bi.length; j++) { 				IEPNGAlphaFix(bi[j]); 			} 		} 	} else if (image.tagName.toLowerCase() == 'img' && image.width && image.width > 0){ 		var imageUrl = image.src; 		if (imageUrl.length<4||imageUrl.substr(imageUrl.length-4).toLowerCase() != '.png') return; 		image.width = image.width;//Para img que no tienen el atributo definido 		image.src = 'https://images.wikia.nocookie.net/es.pokemon/images/2/2f/Blankdot.gif?1'; 		image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + imageUrl + ", sizingMethod='scale')"; 	} }   try{ 	if (navigator.appVersion.indexOf('MSIE 6') != -1) { 		$(IEPNGAlphaFix); 	} }catch(e){} @*/
/* === Sorttable corregido/mejorado === Al ordenar tablas donde una columna contenga sólo imágenes, se produce un error. */
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
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categoría:',']]'], ['#REDIRECCIÓN [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['\x3Cgallery widths="190px">\n','\n</gallery>'], ['<tt>','</tt>'], '\x7B{PAGENAME}}', ['\x7B{t|','}}'], ['\x7B{S|','}}'] ],
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
 
/* == Acopla tablas == Para unir las filas en una sola tabla. [[MediaWiki:Mergetables.js]] */
 
function acopla_tablas(){
	switch(window.wgPageName){
		case "Lista_de_Pokémon":
		case "Lista_de_movimientos":
			importScript('MediaWiki:Mergetables.js').defer = 'defer';
			break;
	}
}
 
$(acopla_tablas);
 
/* == Enlaces "editar" al lado del texto == Para desactivar, pon window.oldEditsectionLinks=1; en tu monobook.js */
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