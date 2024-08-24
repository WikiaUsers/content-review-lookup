if (mw.config.get('wgCanonicalSpecialPageName', '') != 'MyHome') {
	window.wgEnableImageLightboxExt = false;
	// Por si ya se ha cargado (a veces pasa)
	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
		$('#'+(window.bodyContentId||'bodyContent')).unbind('.lightbox');
	});
}

if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') {
	$(function() {
		importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
	});
}

// BOTONES DE EDICI�N PERSONALIZADOS
// Esto esta basado en el c�digo original: Wikipedia:Tools/Editing tools
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirijir Articulo",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insertar texto"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/f/f0/BotonDegradado.png",
     "speedTip": "Insertar Degradado en Tablas",
     "tagOpen": " background:-moz-linear-gradient(top, COLOR ARRIBA 0%, COLOR ABAJO 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,COLOR ARRIBA), color-stop(100%,COLOR ABAJO)); ",
     "tagClose": "",
     "sampleText": ""};
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/0/0d/Box-shadow.png",
     "speedTip": "Insertar Sombra en Tablas",
     "tagOpen": "-moz-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA; -webkit-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA;",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/d/d3/En_construccion.png",
     "speedTip": "Advertir de que este articulo esta en contrucci�n",
     "tagOpen": "{{En construcci�n|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Texto Tachado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto a tachar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Subrayar",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Texto a Subrayar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
     "speedTip": "texto Grande",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Texto Grande"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
     "speedTip": "Texto Peque�o",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Texto Peque�o"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Centrar",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Centrar Texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nombre de la Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020123837/central/images/c/ce/Button_no_include.png",
     "speedTip": "No Incluir",
     "tagOpen": "<noinclude>",
     "tagClose": "</noinclude>",
     "sampleText": "No Incluir"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Espacio en Fuente",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
  
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/3/31/Mensaje_oculto.png",
     "speedTip": "Insertar Comentario Oculto",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comentario"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"}; 
 
} 
 
// </source>

/*****************/
/* NOMBREUSUARIO */
/*****************/
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Volver Arriba" onClick="goToTop();">Volver Arriba</button></li>').appendTo('#WikiaBarWrapper .toolbar > ul.tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
// **************************************************
//  Fin - BackToTopButton
// **************************************************

/* <pre>
 * Thickbox4MediaWiki v3.10 - Based on Thickbox 3.1 By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2010 - 2015 Jes�s Mart�nez (User:Ciencia_Al_Poder), Original Thickbox Copyright (c) 2007 Cody Lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
window.Thickbox = (function($, mw) {
    'use strict';
    var _version = '3.10',
    // Dimensiones m�nimas
    _minWidth = 210,
    // Margen entre la imagen y el borde de ThickBox
    _imageMarginWidth = 15,
    // Margen m�nimo hasta el borde de la ventana. Si se supera la imagen se reducir�
    _minMarginWidth = 30,
    _minMarginHeight = 15,
    // Tiempo de espera para la aparici�n del loader en ms
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
        // Se podr�a haber puesto un evento directamente en cada 'a.image', pero esto es mucho m�s r�pido y eficiente (tarda solo el 20% en FF2) que recorrerse todo el DOM
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
            // Im�genes con enlaces a otros art�culos no tienen la clase "image", excepto en Wikia donde s� la tiene y a�aden "link-internal" o "link-external"
            if (!a || !_isTag(a,'a') || !_isClass(a,'image') || _isClass(a, 'link-internal') || _isClass(a, 'link-external')) {
                return true;
            }
            // Galer�a Wikia 2
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
            // Es thumb gen�rico
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
                // image-key es el nombre para la URL. No usar image-name porque est� codificado doble (& --> &amp;amp;)
                descUrl = mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')['6'] + ':' + decodeURIComponent($img.data('image-key')));
            }
            TB_descLink = '<a id="TB_descLink" class="sprite details" title="Ir a la p�gina de descripci�n de la imagen"></a>';
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
                // Calculamos las dimensiones �ptimas. Calculamos el �rea y determinamos que lo ideal es proporci�n 3/2
                prefw = parseInt(Math.sqrt(wnd.width()*wnd.height()*3/2),10),
                // Correcci�n de ancho m�nimo en caso de producirse scroll
                cd = $('#TB_ajaxContent')[0];
            prefw += cd.scrollWidth-cd.clientWidth;
            // No se debe reducir el ancho m�nimo
            if (prefw < _minWidth) {
                prefw = _minWidth;
            }
            // Posici�n. 5px de margen respecto el origen. Situaci�n ideal: a la derecha del elemento
            var margen = 5, left = $(document).width() - rw + margen;
            if (rw > prefw + margen) {
                // ya es correcto
            } else if (lw > prefw + margen) {
                left = lw - prefw - margen;
            } else if (lw < 250 || rw < 250) { // No cabe en ninguno de los dos lados. Miramos si no puede usarse el ancho m�nimo (250). En ese caso el ancho lo forzamos y lo ponemos a la derecha
                prefw = 250;
            } else if (rw > lw) { // Se usa el ancho disponible del lado mayor
                prefw = rw - margen;
            } else {
                prefw = lw - margen*2;
                left = margen;
            }
            wnd.css({width: prefw, left: left});
            // Ahora la posici�n vertical. necesita que hayamos asignado el width para que lo calcule bien
            var top = elOffset.top - parseInt(wnd.height(), 10) - margen;
            // Si no cabe arriba lo colocamos debajo
            if (top < margen) {
                top = elOffset.top + tgEl.height() + margen;
            }
            wnd.css({top: top, visibility: 'visible'});
            // Animaci�n si queda fuera del campo visual
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
        // Ancho m�nimo
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
            // Dimensiones m�ximas
            x = pagesize[0] - _minMarginWidth * 2 - _imageMarginWidth * 2,
            y = pagesize[1] - _minMarginHeight * 2 - wndH + img.height(),
            imageWidth = _imgPreloader.width,
            imageHeight = _imgPreloader.height,
            firstNav, imgOpt;
        // Puede entrar por una o por las dos. De hecho, con esta comprobaci�n basta, ya que si tiene que pasar por las dos da igual por qu� lado se reduzca primero
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
        // La altura de la ventana la conocemos. Solo hay que reemplazar la imagen antigua y poner la nueva, esto es, sus dimensiones. El height se tiene que hacer diferente porque intervienen m�s elementos que en el ancho
        _height = wndH - img.height() + imageHeight;
        img.attr({
            src: _imgPreloader.src,
            alt: $('#TB_caption').text()
        });

        imgOpt = {width: imageWidth, height: imageHeight, opacity: 1};
        // Miramos si se carga al abrir o despu�s de navegar. Si viene de abrirse, sin animaci�n
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
        // Si la funci�n no encuentra el elemento, puede devolver undefined, y en este caso no cambia el contenido. Forzamos un null en ese caso
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
            // Mostramos solo si la imagen tiene un tama�o m�nimo
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
        _imgTip = $('<div id="TB_imagetip" title="Clic sobre la imagen para ampliar. Ctrl, Alt o May�s. para acceder a la p�gina de descripci�n de la imagen.">').appendTo(document.body);
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

/* Plantilla de sonido en perfiles */
$(function () { $('.youtubeplayer').each(function () { var esc = mw.html.escape, $this = $(this); playertype = esc('' + $this.data('playertype')), id = esc($this.data('id') || ''), width = esc('' + $this.data('width')), height = esc('' + $this.data('height')), autoplay = esc('' + $this.data('autoplay')), args = esc('' + $this.data('args'));  if ( id === '' ) { return; } $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>'); }); })
$(function () { $('.audio').each(function () { var esc = mw.html.escape, $this = $(this); options = esc('' + $this.data('options')), src = esc('' + $this.data('src')), type = esc('' + $this.data('type')); $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>'); }); }); $(function () { $('.video').each(function () { var esc = mw.html.escape, $this = $(this); width = esc('' + $this.data('width')), height = esc('' + $this.data('height')), options = esc('' + $this.data('options')), src = esc('' + $this.data('src')), type = esc('' + $this.data('type')); $this.html('<video width="' + width + '" height="' + height + '" ' + options + '><source src="' + src + '" type="'+ type + '"</video>'); }); }); $('.norc').bind('contextmenu', function(e) { return false; });
}); $('.norc').bind('contextmenu', function(e) { return false; });