/* <pre> */
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
var $UT = UtilityTools;
if (!window.$G){
	window.$G = $UT.get;
}

/* Compatibilidad, al inicio del resto de carga de elementos. Necesario para que todas las utilidades que funcionan en Monobook y Monaco funcionen en oasis 
* Wikia: ¿Quién tuvo la estupenda idea de no respetar los ID's comunes del wiki? */
function oasisCompatElements() {
	$(document.body).append('<section id="positioned_elements"></section>');
	if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Listusers') return; // Wikia is too incompatible
	var wa = $('#WikiaArticle');
	if (wa.exists()) {
		var fb = wa.children('#fb-root').eq(0);
		if (fb.exists()) {
			$('<div id="bodyContent"></div>').insertAfter(fb);
		} else {
			$('<div id="bodyContent"></div>').prependTo(wa);
		}
		if ($('#wikiPreview').exists()) {
			$('#wikiPreview').appendTo('#bodyContent');
		} else {
			var pf = $('#WikiaArticle').children('div.printfooter').eq(0);
			if (pf.exists()) {
				$('#bodyContent').nextAll().not(pf).not(pf.nextAll()).appendTo('#bodyContent');
			}
		}
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
	}
};

function loadEditJS(){
	if ($G('editform') || $G('mw-upload-form')){
		importScript('MediaWiki:Common.js/Clases/CharInsert-min.js');
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
// Versión comprimida. Véase [[MediaWiki:Common.js/Clases/PlantillaPlegable.js]] <pre>
(function(){var $=jQuery,$UT=UtilityTools;var f='plegable-ctrl',K_MOSTRAR='mostrar',K_OCULTAR='ocultar';PlantillaPlegable=function(a,b){this.oElem=a;this.oCtrl=null;this.bPlegada=false;this.bInicialPlegada=(b||false);this.bAjustado=false;this.init()};PlantillaPlegable.prototype={version:'1.2',init:function(){if(this.oElem.tagName.toLowerCase()!='table'||!this.oElem.rows.length)return;var d=this.oElem.rows[0];for(var i=0,ss=d.getElementsByTagName('span');i<ss.length;i++){if($UT.hasClass(ss[i],f)){ss[i].tabIndex='0';this.oCtrl=ss[i];break}}if(!this.oCtrl){var c=d.cells[d.cells.length-1];this.oCtrl=$UT.create('span',{'class':f,tabindex:'0'});c.hasChildNodes()?c.insertBefore(this.oCtrl,c.firstChild):c.appendChild(this.oCtrl)}$UT.addHandler(this.oCtrl,'click',function(a){return function(){a.cambiarEstado(!a.bPlegada)}}(this));$UT.addHandler(this.oCtrl,'keyup',function(b){return function(e){var a=e.keyCode||e.charCode||0;if(a==13){b.cambiarEstado(!b.bPlegada)}}}(this));this.cambiarEstado(this.bInicialPlegada)},cambiarEstado:function(a){this.oCtrl.innerHTML='';$UT.makeChildren([(a?K_MOSTRAR:K_OCULTAR)],this.oCtrl);var b=$(this.oElem);var c=b.width();for(var i=1,rs=this.oElem.rows;i<rs.length&&a!=this.bPlegada;i++){var d=$(rs[i]);if(a){d.hide()}else{d.show()}}this.bPlegada=a;var e=b.width();if(a&&e!==c&&this.oElem.style.width===''){this.bAjustado=true;b.width(c)}if(this.bAjustado&&!a)this.oElem.style.width=''}}})();
//</pre>

/* <pre>
 * Thickbox4MediaWiki v1.8 - Based on Thickbox 3.1 By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2010 Jesús Martínez (User:Ciencia_Al_Poder), Original Thickbox Copyright (c) 2007 Cody Lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
var Thickbox = {
	version: '1.8',
	// Dimensiones mínimas
	minWidth: 210,
	// Margen entre la imagen y el borde de ThickBox
	imageMarginWidth: 15,
	// Margen mínimo hasta el borde de la ventana. Si se supera la imagen se reducirá
	minMarginWidth: 30,
	minMarginHeight: 15,
	// Internos
	imgPreloader: null,
	galleryData: null,
	galleryIndex: -1,
	width: null,
	height: null,
	getCaption: null,
	xhr: null,
	imgTip: null,
	imgTipTarget: null,
	imgTipVisible: false,
	init: function() {
		// Se podría haber puesto un evento directamente en cada 'a.image', pero esto es mucho más rápido y eficiente (tarda solo el 20% en FF2) que recorrerse todo el DOM
		$('#bodyContent').bind('click.thickbox', Thickbox.triggerEvent).bind('mouseover.thickbox_imgtip', Thickbox.imgTipEvent);
	},
	triggerEvent: function(e) {
		if (e.ctrlKey || e.altKey || e.shiftKey) return true;
		var target = e.target;
		if (Thickbox.isTag(target,'img')) { // Gallery o thumb
			var a = target.parentNode;
			if (!a || !Thickbox.isTag(a,'a') || !Thickbox.isClass(a,'image')) return true;
			if (Thickbox.isClass(target,'thumbimage')) {
				// Es thumb
				a.blur();
				Thickbox.getCaption = Thickbox.getCaptionThumb;
				Thickbox.showImage(a);
				return false;
			}
			// Galería Wikia 2
			if (Thickbox.isClass(a,'lightbox')) {
				target.blur();
				Thickbox.getCaption = Thickbox.getCaptionWikia;
				Thickbox.galleryData = $(target).parents('div.wikia-gallery').children('span.wikia-gallery-item').children('div.thumb').children('div.gallery-image-wrapper').children('a.lightbox');
				if (Thickbox.galleryData.length == 0) {
					Thickbox.galleryData = $(target).parents('div.wikia-gallery').children('div.wikia-gallery-row').children('span.wikia-gallery-item').children('div.thumb').children('div.gallery-image-wrapper').children('a.lightbox');
				}
				if (Thickbox.galleryData.length == 0) {
					return true;
				}
				Thickbox.galleryIndex = Thickbox.galleryData.index(a);
				Thickbox.showImage(a);
				return false;
			}
			var gb = a.parentNode.parentNode.parentNode;
			// MediaWiki gallery
			if (Thickbox.isTag(gb,'div') && Thickbox.isClass(gb,'gallerybox') && Thickbox.isTag(gb.parentNode,'td')) {
				var t = gb.parentNode.parentNode.parentNode.parentNode;
				if (Thickbox.isTag(t,'table') && Thickbox.isClass(t,'gallery')) {
					a.blur();
					Thickbox.getCaption = Thickbox.getCaptionMW;
					Thickbox.galleryData = $(t).find('div.gallerybox').children('div.thumb').find('a.image');
					Thickbox.galleryIndex = Thickbox.galleryData.index(a);
					Thickbox.showImage(a);
					return false;
				}
			}
			// Es thumb genérico
			a.blur();
			Thickbox.getCaption = Thickbox.getCaptionEmpty;
			Thickbox.showImage(a);
			return false;
		} else if (Thickbox.isTag(target,'a')) {
			var sup = target.parentNode;
			if (!Thickbox.isTag(sup,'sup') || !Thickbox.isClass(sup,'reference')) return true;
			target.blur();
			Thickbox.showElement(target);
			return false;
		}
		return true;
	},
	// Helper and speedy functions
	isClass: function(el, cn) {
		return ((' '+el.className+' ').indexOf(' '+cn+' ') != -1);
	},
	isTag: function(el, tn) {
		return (el.tagName.toLowerCase() == tn);
	},
	// Main functions
	preload: function() {
		$(document.body).addClass('thickbox_loaded');
		if (Thickbox.xhr) {
			Thickbox.xhr.abort();
			Thickbox.xhr = null;
		}
		$('#TB_overlay').add('#TB_window').add('#TB_load').remove();
		$('#positioned_elements').append('<div id="TB_overlay"></div><div id="TB_window" class="fixedpos"></div><div id="TB_load"></div>');
		$('#TB_overlay').click(Thickbox.remove);
		$('#TB_load').show();//show loader
	},
	showImage: function(elem) {
		try {
			Thickbox.preload();
			elem = $(elem);

			var url = elem.children('img').eq(0).attr('src');
			url = Thickbox.getUrlFromThumb(url);

			var caption = '';
			var TB_secondLine = '';
			var TB_descLink = '<a id="TB_descLink" class="sprite details" href="' + elem.attr('href') + '" title="Ir a la página de descripción de la imagen"></a>';
			// Se trata de un gallery?
			if (Thickbox.galleryIndex != -1) {
				TB_secondLine = '<div id="TB_secondLine">'+
					'<span id="TB_imageCount"></span>'+
					'<span id="TB_prev"><a href="#" title="Ver imagen anterior [A]">&lt; Ant.</a></span>'+
					'<span id="TB_next"><a href="#" title="Ver imagen siguiente [S]">Sig. &gt;</a></span></div>';
			}
			$('#TB_window').append('<div id="TB_closeWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div><div id="TB_ImageOff"><img id="TB_Image" alt="Imagen" title="Cerrar" />' + TB_descLink + '</div>' + TB_secondLine + '<div id="TB_caption"></div>');
			if (Thickbox.galleryIndex != -1) {
				Thickbox.updateNavigation();
			}
			$('#TB_caption').html(Thickbox.getCaption(elem));

			$('#TB_Image').add('#TB_closeWindowButton').click(Thickbox.remove);
			$(document).bind('keyup.thickbox', Thickbox.keyListener);
			$('#TB_prev').add('#TB_next').click(Thickbox.navigate);
			$('#TB_ImageOff').bind('mouseover', function() {$('#TB_descLink').css('display','block');}).bind('mouseout', function() {$('#TB_descLink').css('display','none');});

			if (Thickbox.imgPreloader === null) {
				Thickbox.imgPreloader = new Image();
			}
			Thickbox.imgPreloader.onload = Thickbox.imageLoaded;
			Thickbox.imgPreloader.onerror = Thickbox.imageError;
			Thickbox.imgPreloader.src = url;

		} catch(e) {
			Thickbox.error = e;
		}
	},
	showElement: function(target) {
		try {
			var url = target.href;
			if (url.indexOf('#') == -1) return false;
			var baseurl = url.split('#')[0];
			var hash = url.split('#')[1];
			// Comprobamos que la URL sea del mismo documento
			var locbase = document.location.href.replace(baseurl, '');
			var rel = document.getElementById(hash);
			if ((locbase != '' && locbase.indexOf('#') != 0) || rel === null) return false;
			var inlineEl = $(rel);

			$('#TB_overlay').add('#TB_window').remove();
			$('#positioned_elements').append('<div id="TB_overlay" class="transparent"></div><div id="TB_window"></div>');
			$('#TB_overlay').click(Thickbox.remove);

			var titleHTML = '<div id="TB_title"><div id="TB_closeAjaxWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div></div>';
			var wnd = $('#TB_window');
			var cel = inlineEl.clone();
			cel.contents().eq(0).remove();
			cel.children('sup').remove();
			wnd.width(Thickbox.minWidth).append(titleHTML+'<div id="TB_ajaxContent">'+cel.html()+'</div>');

			var tgEl = $(target);
			// espacio horizontal a cada lado del elemento
			var elOffset = tgEl.offset();
			var lw = elOffset.left;
			var rw = $(document).width() - elOffset.left - tgEl.width();
			// Calculamos las dimensiones óptimas. Calculamos el área y determinamos que lo ideal es proporción 3/2
			var prefw = parseInt(Math.sqrt(wnd.width()*wnd.height()*3/2),10);
			// Corrección de ancho mínimo en caso de producirse scroll
			var cd = $('#TB_ajaxContent')[0];
			prefw += cd.scrollWidth-cd.clientWidth;
			// No se debe reducir el ancho mínimo
			if (prefw < Thickbox.minWidth) {
				prefw = Thickbox.minWidth;
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
			var top = elOffset.top - parseInt(wnd.height()) - margen;
			// Si no cabe arriba lo colocamos debajo
			if (top < margen) {
				top = elOffset.top + tgEl.height() + margen;
			}
			wnd.css({top: top, visibility: 'visible'});
			// Animación si queda fuera del campo visual
			if (($('html')[0].scrollTop||$('body')[0].scrollTop) > top-margen) {
				$('html,body').animate({scrollTop: top-margen}, 250, 'swing');
			}

			$('#TB_closeWindowButton').click(Thickbox.remove);
			$(document).bind('keyup.thickbox', Thickbox.keyListener);
		} catch(e) {
			Thickbox.error = e;
		}
	},
	showPage: function(page, width) {
		try {
			Thickbox.preload();
			Thickbox.xhr = $.getJSON(wgScriptPath+'/api.php?action=parse&page='+encodeURIComponent(page)+'&prop=text&format=json', function(data) {
				Thickbox.xhr = null;
				$('#TB_window').width(width||$(document).width()*0.75).append('<div id="TB_title"><div id="TB_closeAjaxWindow"><a href="#" id="TB_closeWindowButton" title="Cerrar [ESC]">cerrar</a></div></div><div id="TB_ajaxContent">'+data.parse.text['*']+'</div>');
				$('#TB_closeWindowButton').click(Thickbox.remove);
				$(document).bind('keyup.thickbox', Thickbox.keyListener);
				var h = $('#TB_window').height();
				var mh = $(window).height() - (Thickbox.minMarginHeight*2);
				if (h > mh) {
					var ac = $('#TB_ajaxContent');
					ac.height(mh - h + ac.height());
				}
				Thickbox.width = $('#TB_window').width();
				Thickbox.height = $('#TB_window').height();
				Thickbox.position();
				Thickbox.displayClean();
			});
		} catch(e) {
			Thickbox.error = e;
		}
	},
	//helper functions below
	displayClean: function() {
		$('#TB_load').remove();
		$('#TB_window').css('visibility','visible');
	},
	remove: function() {
		$(document).unbind('keyup.thickbox');
		Thickbox.galleryData = null;
		Thickbox.galleryIndex = -1;
		if (Thickbox.imgPreloader !== null) {
			Thickbox.imgPreloader.onload = null;
			Thickbox.imgPreloader.onerror = null;
		}
		$('#TB_ImageOff').add('#TB_Image').add('#TB_closeWindowButton').add('#TB_prev').add('#TB_next').unbind();
		$('#TB_window').add('#TB_Image').queue('fx',[]).stop();
		$('#TB_window').trigger('unload').fadeOut('fast',function(){$('#TB_window').add('#TB_overlay').unbind().remove();});
		$('#TB_load').remove();
		$(document.body).removeClass('thickbox_loaded');
		return false;
	},
	keyListener: function(e) {
		keycode = e.which;
		if(keycode == 27) { // close
			Thickbox.remove();
		} else if(keycode == 65) { // 'A' display previous image
			$('#TB_prev').click();
		} else if(keycode == 83) { // 'S' display next image
			$('#TB_next').click();
		}
	},
	position: function(anim) {
		// Ancho mínimo
		var border = 4;
		if (Thickbox.width < Thickbox.minWidth) {
			Thickbox.width = Thickbox.minWidth;
		}
		var o = {marginLeft: '-' + parseInt((Thickbox.width / 2)+border,10).toString() + 'px', width: Thickbox.width + 'px', marginTop: '-' + parseInt((Thickbox.height / 2)+border,10).toString() + 'px'};
		if (anim) {
			$('#TB_window').animate(o, {queue: false, duration: 'fast'});
		} else {
			$('#TB_window').css(o);
		}
	},
	getPageSize: function() {
		var de = document.documentElement;
		var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
		return [w,h];
	},
	getUrlFromThumb: function(thumb) {
		// Si la imagen no es thumb, o bien es un SVG, usamos la imagen tal cual.
		if (thumb.indexOf('/thumb/') == -1 || thumb.indexOf('.svg/') != -1 ) {
			return thumb;
		}
		var urlparts = thumb.split('/');
		return thumb.replace('/thumb/','/').replace('/'+urlparts[urlparts.length-1], '');
	},
	getCaptionThumb: function(elem) {
		return elem.parents('div.thumbinner').children('div.thumbcaption').clone().children('div.magnify').remove().end().html();
	},
	getCaptionEmpty: function(elem) {
		return $('<div></div>').text(elem.attr('title')).html();
	},
	getCaptionMW: function(gitem) {
		return gitem.parents('div.gallerybox').eq(0).children('div.gallerytext').eq(0).html();
	},
	getCaptionWikia: function(gitem) {
		return gitem.parents('span.wikia-gallery-item').eq(0).children('div.lightbox-caption').eq(0).html();
	},
	imageError: function() {
	},
	imageLoaded: function() {

		var navigation = (Thickbox.galleryIndex != -1);
		var img = $('#TB_Image');
		var wndH = $('#TB_window').height();

		// Resizing large images - orginal by Christian Montoya edited by me.
		var pagesize = Thickbox.getPageSize();
		// Dimensiones máximas
		var x = pagesize[0] - Thickbox.minMarginWidth * 2 - Thickbox.imageMarginWidth * 2;
		var y = pagesize[1] - Thickbox.minMarginHeight * 2 - wndH + img.height();
		var imageWidth = Thickbox.imgPreloader.width;
		var imageHeight = Thickbox.imgPreloader.height;
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

		var firstNav = (!img.attr('src') || img.attr('src') == '');

		// Dimensiones de la ventana Thickbox para posicionar
		Thickbox.width = imageWidth + Thickbox.imageMarginWidth * 2; // 15px de espacio en cada lado
		// La altura de la ventana la conocemos. Solo hay que reemplazar la imagen antigua y poner la nueva, esto es, sus dimensiones. El height se tiene que hacer diferente porque intervienen más elementos que en el ancho
		Thickbox.height = wndH - img.height() + imageHeight;
		img.attr({
			src: Thickbox.imgPreloader.src,
			alt: $('#TB_caption').text()
		});

		var imgOpt = {width: imageWidth, height: imageHeight, opacity: 1};
		// Miramos si se carga al abrir o después de navegar. Si viene de abrirse, sin animación
		if (firstNav) {
			img.css(imgOpt);
		} else {
			img.animate(imgOpt, {duration: 'fast'});
		}

		Thickbox.position(navigation && !firstNav);
		Thickbox.displayClean();
	},
	updateNavigation: function() {
		var seq = Thickbox.galleryIndex;
		var len = Thickbox.galleryData.length;
		$('#TB_prev').css('display', (seq == 0 ? 'none' : ''));
		$('#TB_next').css('display', (seq >= len-1 ? 'none' : ''));
		$('#TB_imageCount').text('Imagen ' + (seq+1) + ' de ' + len);
	},
	navigate: function() {
		var seq = Thickbox.galleryIndex + (this.id == 'TB_prev' ? -1 : 1);
		var len = Thickbox.galleryData.length;
		if (seq < 0 || seq > len - 1) {
			return false;
		}
		Thickbox.galleryIndex = seq;
		var gitem = Thickbox.galleryData.eq(seq);
		var url = gitem.children('img').eq(0).attr('src');
		url = Thickbox.getUrlFromThumb(url);
		Thickbox.updateNavigation();
		if (Thickbox.imgPreloader.src != url) {
			$('#TB_window').stop();
			$('#TB_Image').queue('fx',[]).stop().animate({opacity: 0}, {duration: 'fast', complete: function() {
				Thickbox.imgPreloader.src = url;
			}});
		}
		$('#TB_caption').html(Thickbox.getCaption(gitem));
		$('#TB_descLink').attr('href',gitem.attr('href'));
		return false;
	},
	imgTipEvent: function(e) {
		if (e.ctrlKey || e.altKey || e.shiftKey) return Thickbox.hideImgTip();
		var target = e.target;
		if (Thickbox.isTag(target,'img')) { // Gallery o thumb
			var a = target.parentNode;
			if (!Thickbox.isTag(a,'a') || !Thickbox.isClass(a,'image')) return Thickbox.hideImgTip();
			var t = $(target);
			// Mostramos solo si la imagen tiene un tamaño mínimo
			if (t.width() < 40 || t.height() < 40) return;
			return Thickbox.showImgTip(t);
		}
		Thickbox.hideImgTip();
	},
	imgTipClickEvent: function(e) {
		if (Thickbox.imgTipTarget) {
			$(Thickbox.imgTipTarget).click();
			return false;
		}
	},
	createImgTip: function() {
		Thickbox.imgTip = $('<div id="TB_imagetip" title="Clic sobre la imagen para ampliar. Ctrl, Alt o Mayús. para acceder a la página de descripción de la imagen."></div>').appendTo('#positioned_elements');
		Thickbox.imgTip.bind('click',Thickbox.imgTipClickEvent);
	},
	showImgTip: function(target) {
		if (!Thickbox.imgTip) {
			Thickbox.createImgTip();
		}
		var of = target.offset();
		Thickbox.imgTip.css({
			display: 'block',
			left: of.left + target.width(),
			top: of.top + target.height()
		});
		Thickbox.imgTipVisible = true;
		Thickbox.imgTipTarget = target;
	},
	hideImgTip: function() {
		if (Thickbox.imgTipVisible) {
			Thickbox.imgTip.css('display','none');
			Thickbox.imgTipVisible = false;
			Thickbox.imgTipTarget = null;
		}
	}
};

if (wgAction != 'history' || !(wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Recentchanges')) {
	$(Thickbox.init);
}
/* </pre> */

if (!(wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome')) {
	window.wgEnableImageLightboxExt = false;
}

//<pre>
/**
* SkinPropagation: Propaga el &useskin= de la URL (siempre que sea posible) por los enlaces y formularios
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
window.SkinPropagation = {
	skin: '',
	init: function() {
		if (window.location.href.indexOf('useskin=') == -1) return;
		var url = SkinPropagation.parseURL(window.location.href);
		if (url.query.useskin) {
			SkinPropagation.skin = (url.query.propagateskin || url.query.useskin);
		}
		if (SkinPropagation.skin != '') {
			$(document.body).bind('click.skinpropagation', SkinPropagation.clicEvent);
			$('form').bind('submit.skinpropagation', SkinPropagation.submitEvent);
		}
	},
	parseURL: function(url) {
		var ret = {base:'',qs:'',query:{},hash:''};
		var loc = url.indexOf('#');
		if (loc != -1) {
			ret.hash = url.substr(loc+1);
			url = url.substr(0,loc);
		}
		loc = url.indexOf('?');
		if (loc != -1) {
			ret.qs = url.substr(loc+1);
			url = url.substr(0,loc);
			var paras = ret.qs.split('&');
			for (var i = 0; i < paras.length; i++) {
				var p = paras[i].split('=');
				if (p.length == 2) {
					ret.query[p[0]] = p[1];
				}
			}
		}
		ret.base = url;
		return ret;
	},
	getURL: function(url) {
		var nurl = url.base + '?';
		for (var p in url.query) {
			nurl += p + '=' + url.query[p] + '&';
		}
		nurl = nurl.substr(0,nurl.length-1);
		if (url.hash != '') {
			nurl += '#'+ url.hash;
		}
		return nurl;
	},
	clicEvent: function(e) {
		if (e.target.tagName.toLowerCase() != 'a') return;
		if (e.target.href.indexOf(window.wgServer) != 0) return;
		var url = SkinPropagation.parseURL(e.target.href);
		var thisloc = SkinPropagation.parseURL(window.location.href);
		if (url.base == thisloc.base && url.qs == thisloc.qs && url.hash != '') {
			return;
		}
		if (url.query.useskin && url.query.useskin != SkinPropagation.skin) {
			url.query.propagateskin = SkinPropagation.skin;
		} else {
			url.query.useskin = SkinPropagation.skin;
		}
		e.target.href = SkinPropagation.getURL(url);
	},
	submitEvent: function(e) {
		if (this.action.indexOf(window.wgServer) != 0) return;
		if (this.method == 'post') {
			var url = SkinPropagation.parseURL(this.action);
			url.query.useskin = SkinPropagation.skin;
			this.action = SkinPropagation.getURL(url);
		} else {
			$(this).append('<input type="hidden" name="useskin" value="'+SkinPropagation.skin+'"/>');
		}
	},
	stop: function() {
		$(document.body).unbind('click.skinpropagation');
		$('form').unbind('submit.skinpropagation');
	}
};

$(SkinPropagation.init);
//</pre>
//<pre>

// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

function Wiki_Draw_to_Life_ElementLoader(){
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
	$(Wiki_Draw_to_Life_ElementLoader);
	importScript('MediaWiki:Common.js/Clases/ImageSwitcher-min.js');
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

if (window.wgUserGroups && (','+wgUserGroups.join(',')+',').indexOf(',sysop,') != -1) {
	importScript('MediaWiki:Common.js/Extra/SysopTools.js');
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

//Plantilla:NOMBREUSUARIO, sirve para mostrar el nombre del usuario que ve la plantilla//
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

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

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (wgAction == 'view' && (wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14)) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
		}
	});
}

// Page tracker
try {
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
} catch(e) {window._gaJSerror2 = e;}
// End Page tracker
//</pre>