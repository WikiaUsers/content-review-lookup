/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Значительная часть кода взята с ru.fallout.wikia.com/wiki/MediaWiki:Masthead.js */
function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}

// ============================================================
// BEGIN Template:Games
// ============================================================

// Description: Add game icons to top right corner of articles
// Credit:      User:Porter21

function addTitleIcons() {
   if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
      var insertTarget;

      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaArticle');
            }
            break;
      }

      if (insertTarget) {
         $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
      }
   }
}

jQuery(function($) {
   addTitleIcons();
});

// ============================================================
// END Template:Games
// ============================================================

// ============================================================
// BEGIN Collapsible tables
// ============================================================

// Description: Allow tables to be collapsible
// Credit:      This script is from Wikipedia. Please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
//              Customized for Fallout Wiki by User:Porter21

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
   var reCache = {};
   return function (element, className) {
      return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
   };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 1;
var collapseCaption = "скрыть";
var expandCaption = "показать";

function collapseTable(tableIndex) {
   var Button = document.getElementById( "collapseButton" + tableIndex );
   var Table = document.getElementById( "collapsibleTable" + tableIndex );

   if ( !Table || !Button ) {
      return false;
   }

   var Rows = Table.rows;

   if ( Button.firstChild.data == collapseCaption ) {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = "none";
      }
      Button.firstChild.data = expandCaption;
   } else {
      for ( var i = 1; i < Rows.length; i++ ) {
          Rows[i].style.display = Rows[0].style.display;
      }
      Button.firstChild.data = collapseCaption;
   }
}

function createCollapseButtons() {
   var tableIndex = 0;
   var collapseIndex = 0;
   var NavigationBoxes = new Object();
   var Tables = document.getElementsByTagName( "table" );

   for ( var i = 0; i < Tables.length; i++ ) {
      if ( hasClass( Tables[i], "collapsible" ) ) {

         /* only add button and increment count if there is a header row to work with */
         var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
         if (!HeaderRow) continue;
         var Header = HeaderRow.getElementsByTagName( "th" )[0];
         if (!Header) continue;

         NavigationBoxes[ tableIndex ] = Tables[i];
         Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

         var Button     = document.createElement( "span" );
         var ButtonLink = document.createElement( "a" );
         var ButtonText = document.createTextNode( collapseCaption );

         Button.style.styleFloat = "right";
         Button.style.cssFloat = "right";
         Button.style.fontWeight = "normal";
         Button.style.textAlign = "right";
         Button.style.width = "5em";
         Button.className = "t_show_hide";

         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
         ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild( ButtonText );

         Button.appendChild( document.createTextNode( "[" ) );
         Button.appendChild( ButtonLink );
         Button.appendChild( document.createTextNode( "]" ) );

         Header.insertBefore( Button, Header.childNodes[0] );

         if ( !hasClass( Tables[i], "nocount" ) ) {
            collapseIndex++;
	 }
         tableIndex++;
      }
   }

   for ( var i = 0;  i < tableIndex; i++ ) {
      if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
         collapseTable( i );
      } 
      else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
         var element = NavigationBoxes[i];
         while (element = element.parentNode) {
            if ( hasClass( element, "outercollapse" ) ) {
               collapseTable ( i );
               break;
            }
         }
      }
   }
}

jQuery(function($) {
   createCollapseButtons();
});

// ============================================================
// END Collapsible tables
// ============================================================

// ============================================================
// BEGIN ArchiveTool
// ============================================================

// Description: Add tool for easier talk page archiving
// Credit:      User:Dantman (original), User:Porter21 (Oasis & Monobook support)

var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
};

// ============================================================
// END ArchiveTool
// ============================================================

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;
 
	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}
 
	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}
 
var auto_comment = 0;

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
       if (wgCanonicalNamespace != "Special") {
               document.write('<script type="text/javascript" src="/index.php' +
               '?title=MediaWiki:Onlyifediting.js&action=raw' +
               '&ctype=text/javascript&dontcountme=s"></script>');
       }
}

window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: '',
	epilogue: '\nНажмите кнопу «отмена» и внесите соответствующие изменения. Если же вы уверены, что данное предупреждение сработало ошибочно, то вы можете сохранить страницу, нажав кнопку «OK»',
	noForumheader: 'Вы удалили (либо забыли добавить) шапку форума. Пожалуйста, добавьте в начало страницы шаблон {{Forumheader}}.\n\n',
	noSignature: 'Вы забыли добавить подпись к своему сообщению с помощью четырёх тильда ~ ~ ~ ~ (без пробелов)\n',
        forumheader: 'Forumheader'
};

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

/* ################################################## */
/* ### Неактивные пользователи                    ### */
/* ################################################## */

InactiveUsers = { 
    months: 3,
    text: 'НЕАКТИВЕН'
};
 
// ###############################//
// ### Новые функции Anno Вики ### //
// ### Version 1.1             ### //
// ############################### //
/*****************************/
/*** FloatingToc by Pecoes ***/
/*****************************/
(function (module, mw, $, window) {
 
    'use strict';
 
    if (module.loaded) return;
    module.loaded = true;
 
    var translations = {
        en: {
            contents: 'Contents',
            toc: 'Table of Contents',
            open: 'Open',
            close: 'Close',
            back: 'Back to Top',
            reset: 'Reset'
        },
        de: {
            contents: 'Inhalt',
            toc: 'Inhaltsverzeichnis',
            open: 'Öffnen',
            close: 'Schließen',
            back: 'Seitenanfang',
            reset: 'Zurücksetzen'
        },
        hu: {
            contents: 'Tartalom',
            toc: 'Tartalomjegyzék',
            open: 'Kinyit',
            close: 'Összecsuk',
            back: 'Vissza a tetejére',
            reset: 'Alaphelyzetbe állítás'
        },
        pl: {
            contents: 'Treść',
            toc: 'Spis treści',
            open: 'Otwórz',
            close: 'Zamknij',
            back: 'Powrót na górę',
            reset: 'Reset'
        },
        ca: {
            contents: 'Continguts',
            toc: 'Taula de continguts',
            open: 'Obrir',
            close: 'Tancar',
            back: 'Tornar a dalt',
            reset: 'Restablir configuració'
        },
        es: {
            contents: 'Contenidos',
            toc: 'Tabla de contenidos',
            open: 'Abrir',
            close: 'Cerrar',
            back: 'Volver arriba',
            reset: 'Restablecer configuración'
        },
        ru: {
            contents: 'Содержание',
            toc: 'Вернуться к содержанию',
            open: 'Развернуть',
            close: 'Закрыть',
            back: 'В начало страницы',
            reset: 'Обновить'
        },
        uk: {
            contents: 'Зміст',
            toc: 'Повернутися до змісту',
            open: 'Показати',
            close: 'Сховати',
            back: 'Повернутися до початку',
            reset: 'Оновити'
        }
    };
 
    var SPEED = 300;
 
    var win, page, toc, i18n, tocLinks;
 
    function initStyles () {
 
        var pageBright = window.dev.colors.parse(window.dev.colors.wikia.page).isBright(),
            menuBright = window.dev.colors.parse(window.dev.colors.wikia.menu).isBright(),
            icons = {
                white:     '//images.wikia.com/dev/images/c/c2/Ui-icons_ffffff_256x240.png',
                black:     '//images.wikia.com/dev/images/a/aa/Ui-icons_222222_256x240.png',
                lightGray: '//images.wikia.com/dev/images/4/48/Ui-icons_cccccc_256x240.png',
                darkGray:  '//images.wikia.com/dev/images/8/89/Ui-icons_666666_256x240.png',
                url: function (color) { return 'url("' + this[color] + '");'; }
            },
 
            styles = '#tocDialog.toc ul ul{margin:0 0 0 2em}#tocDialog{margin-top:0;border:none!important;left:auto;right:auto;top:auto;bottom:auto;height:auto;width:auto;float:none!important}.toc-dialog{border:2px solid $border;z-index:20000002 !important}.toc-dialog .ui-corner-all{border-radius:6px 6px 6px 6px}.toc-dialog .ui-dialog-titlebar,#open-toc-win.ui-state-hover{background:$menu;background:-moz-linear-gradient(top,$gradient 35%,$menu 65%);background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,$gradient),color-stop(65%,$menu));background:-webkit-linear-gradient(top,$gradient 35%,$menu 65%);background:-o-linear-gradient(top,$gradient 35%,$menu 65%);background:-ms-linear-gradient(top,$gradient 35%,$menu 65%);background:linear-gradient(to bottom,$gradient 35%,$menu 65%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="$gradient",endColorstr="$menu",GradientType=0)}#open-toc-win.ui-state-hover{border:1px solid $page-border-gray}.toc-dialog .ui-dialog-titlebar{border:1px solid $menu;color:$contrast;font-weight:normal;padding:.25em 1em}.toc-dialog,.toc-dialog .toc{background-color:$page;color $text}#toc-back,#toc-maximize{background:transparent;border:0;height:20px;position:absolute;top:2px;width:22px}#toc-back{right:50px}#toc-maximize{right:25px}#tocDialog a{color:$link;font-size:85%}#open-toc-win{background:transparent;border:1px solid $page-border-gray;height:18px;margin:0 4px;vertical-align:middle;width:18px;display:inline-block}#toc.tochidden #open-toc-win{display:none}.toc-dialog.ui-widget-content .ui-icon{background-image:$menu-gray-icons}#open-toc-win .ui-icon{background-image:$page-gray-icons}#open-toc-win.ui-state-hover .ui-icon,.toc-dialog .ui-dialog-titlebar .ui-icon{background-image:$menu-bw-icons}.toc-dialog .ui-dialog-titlebar-close.ui-state-hover,#toc-maximize.ui-state-hover,#toc-back.ui-state-hover{background:$contrast;background:-moz-linear-gradient(top,$menu 35%,$gradient 65%);background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,$menu),color-stop(65%,$gradient));background:-webkit-linear-gradient(top,$menu 35%,$gradient 65%);background:-o-linear-gradient(top,$menu 35%,$gradient 65%);background:-ms-linear-gradient(top,$menu 35%,$gradient 65%);background:linear-gradient(to bottom,$menu 35%,$gradient 65%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="$menu",endColorstr="$gradient",GradientType=0);border:1px solid $gradient}body.mediawiki.scroll-lock{overflow:hidden !important;}body.mediawiki.adjust-scroll{margin-left: -16px !important;}.toc-link{ display:inline-block;height:12px;margin-left:12px;opacity:.8;position:relative;vertical-align:baseline;width:12px;}.page-dark .toc-link{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAIklEQVR42mJgRAIMjAwgBAYQDkKGHGUgAqISziHFNIAAAwAgIwBoFh42eAAAAABJRU5ErkJggg==") repeat scroll 0 0 transparent}.page-bright .toc-link{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAIklEQVR42mJgRAIMjAwgBAYQDkKGHGUgAqISziHFNIAAAwAgIwBoFh42eAAAAABJRU5ErkJggg==") repeat scroll 0 0 transparent}';
 
        $(window.document.head).append(
            '<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />' +
            '<style type="text/css">' +
                window.dev.colors.replace(styles, {
                    'page-border-gray': pageBright ? '#CCCCCC' : '#666666',
                    'menu-gray-icons':  menuBright ? icons.url('darkGray') : icons.url('lightGray'),
                    'page-gray-icons':  pageBright ? icons.url('lightGray') : icons.url('darkGray'),
                    'menu-bw-icons':    menuBright ? icons.url('black') : icons.url('white')
                }) +
            '</style>'
        );
 
        $(document.body).removeClass('TOC_hide');
 
        $('<a href="#toc" class="toc-link" title="Table of Contents"></a>')
        .insertBefore($('#mw-content-text').find('h2,h3').find('.editsection'));
        tocLinks = $('.toc-link');
    }
 
    function initToc () {
 
        var root = $('#toc'),
            offset = root.offset(),
            list = root.find('ol:first'),
            tocTitle = $('#toctitle'),
            tocButton, wrapper, css;
 
        function contents () {
            return list.html();
        }
 
        function show () {
            wrapper.slideDown(SPEED);
        }
 
        css = {
            fontSize: parseInt(root.css('font-size'), 10) + 'px'
        };
 
        tocTitle.css('white-space', 'nowrap');
 
        root.wrap('<div id="toc-wrapper"></div>'); 
        wrapper = $('#toc-wrapper');
 
        tocButton = $('<button id="open-toc-win"></button>')
        .appendTo(tocTitle)
        .button({
            icons: {
                primary: "ui-icon-newwin"
            },
            text: false
        })
        .attr('title', i18n.open)
        .one('click', function () {
            toc.width  = list.width();
            toc.height = list.height();
        })
        .click(function () {
            wrapper.slideUp(SPEED);
            tocLinks.css('display', 'none');
        });
 
        wrapper
        .css({
            display: 'inline-block',
            marginTop: root.css('margin-top'),
            marginBottom: root.css('margin-bottom'),
            maxWidth: root.outerWidth()
        });
 
        root.css('margin', '0');
 
        toc = {
            top: offset.top,
            left: offset.left,
            button: tocButton,
            show: show,
            contents: contents,
            css: css
        };
    }
 
    function initDialog () {
 
        var core, panel, resizing = false;
 
        function fixPosition () {
            if (panel.css('position') === 'fixed') return;
            var offset = panel.offset();
            panel.css({
                top: offset.top - win.scrollTop() + 'px',
                left: offset.left - win.scrollLeft(),
                position: 'fixed'
            });
        }
 
        function create () {
            /*jshint validthis:true*/
            panel = $(this).parent();
 
            var closeButton = panel.find('.ui-dialog-titlebar-close')
            .attr('title', i18n.close);
 
            $(document.body)
            .prepend('<a name="top" style="display: none;"></a>');
 
            $('<button id="toc-back"></button>')
            .insertBefore(closeButton)
            .button({
                icons: {
                    primary: 'ui-icon-arrowreturnthick-1-n'
                },
                text: false
            })
            .attr('title', i18n.back)
            .click(function() {
                window.location.hash = '#top';
                win.scrollTop(0);
            });
 
            $('<button id="toc-maximize"></button>')
            .insertBefore(closeButton)
            .button({
                icons: {
                    primary: 'ui-icon-refresh'
                },
                text: false
            })
            .attr('title', i18n.reset)
            .click(reset);
        }
 
        function reset () {
            var leftGutter = page.offset().left - toc.width - 30,
                posLeft = leftGutter > 0 ? Math.floor(leftGutter * 0.75) : 'center',
                height = Math.min(toc.height + 30, win.height() - 8),
                topGutter = win.height() - height,
                posTop = topGutter > 200 ? Math.floor(topGutter * 0.2) : 'center';
            core.dialog('option', 'height', height);
            core.dialog('option', 'width', toc.width + 30);
            core.dialog('option', 'position', [posLeft, posTop]);
        }
 
        function open () {
            panel.css('display', 'none');
            reset();
            panel.slideDown(SPEED);
            window.setTimeout(function () {
                fixPosition();
                core.find('a').blur();
            }, SPEED + 50);
        }
 
        function beforeClose () {
            panel.css({
                position: 'absolute',
                top: panel.offset().top + 'px',
                left: panel.offset().left + 'px'
            });
            window.location.href = '#toc';
            if (win.scrollTop() > toc.top) {
                if (toc.top + toc.height < win.height()) {
                    win.scrollTop(0);
                } else {
                    win.scrollTop(toc.top - 20);
                }
            }
            toc.show();
            panel.stop().slideUp(SPEED);
            tocLinks.css('display', 'inline-block');
        }
 
        function resizeStart () {
            resizing = true;
        }
 
        function resizeStop () {
            resizing = false;
            fixPosition();
        }
 
        function init () {
 
            core
            .dialog({
                dialogClass: 'toc-dialog',
                height: Math.min(toc.height + 30, win.height() - 8),
                width: toc.width + 30,
                position: { my: 'center', at: 'center', of: toc.root },
                create: create,
                beforeClose: beforeClose,
                open: open,
                resizeStart: resizeStart,
                resizeStop: resizeStop
            });
 
            panel = core.parent()
            .draggable('option', 'scroll', false)
            .draggable('option', 'containment', 'window');
 
            toc.button
            .click(function () {
                core.dialog('open');
            });
 
            var resizeTimeout = false;
            win.resize(function () {
                if (core.dialog('isOpen') && !resizing) {
                    panel.css('display', 'none');
                    if (resizeTimeout) window.clearTimeout(resizeTimeout);
                    resizeTimeout = window.setTimeout(function () {
                        reset();
                        panel.slideDown(SPEED);
                    }, 200);
                }
            });
         }
 
        core = $(
        '<div id="tocDialog" class="toc" title="' + i18n.contents + '" style="display: none;"><ul>' +
            toc.contents() +
        '</ul></div>')
        .appendTo('#WikiaArticle')
        .css(toc.css);
 
        toc.button
        .one('click', init);
    }
 
    $(function () {
        if (window.document.getElementById('toc')) {
            win = $(window);
            page = $('#WikiaPage');
            i18n = translations[
                module.lang || mw.config.get('wgContentLanguage')
            ] || translations.en;
            $.getScript('/load.php?mode=articles&only=scripts&debug=false&articles=u:dev:Colors/code.js')
            .done(initStyles);
            mw.loader.using(['jquery.ui.dialog', 'jquery.effects.slide'], function () {
                initToc();
                initDialog();
            });
        }
    });
 
}((window.dev = window.dev || {}).floatingToc = window.dev.floatingToc || {}, mediaWiki, jQuery, window));
/*****************************/
/*****************************/
/*****************************/
 
/**********************************************************************************************/
/*** CustomGalleryButton by RyaNayR; Cqm; Prince(ss) Platinum; Bobogoobo; AnimatedCartoons; ***/
/**********************************************************************************************/
(function ($) {
    if ($('.wikia-photogallery-add').length) {
        var galleryButtonText = window.galleryButtonText || 'Додати фото / Редагувати галереї',
            galleryButtonIcon = window.galleryButtonIcon || 'https://images.wikia.nocookie.net/dev/images/a/af/Gallery-add-photo.gif',
            galleryButtonIconHidden = window.galleryButtonIconHidden || false;
        if (galleryButtonIconHidden) {
            $('.wikia-photogallery-add').text(galleryButtonText);
        } else {
            $('.wikia-photogallery-add').html('<img src="' + galleryButtonIcon + '" />&nbsp;' + galleryButtonText);
        }
    }
}(jQuery));
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
 
/**********************************/
/*** Автообновление (Настройки) ***/
/**********************************/
 var ajaxPages =["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges","Служебная:NewFiles"];
var AjaxRCRefreshText = 'Автообновление';
/**********************************/
/**********************************/
/**********************************/
 
/*****************/
/*** NavButton ***/
/*****************/
//Nav button hover animation
jQuery(document).ready(function($) {
	$(".NavButton").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
 
//App button hover animation
jQuery(document).ready(function($) {
	$(".AppButton").mouseleave(function(){
		$(this).find('#amove').animate({ top: '115px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#amove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
/*****************/
/*****************/
/*****************/

/******************************************/
/*** Закрытие блога для комментирования ***/
/******************************************/
window.LockOldBlogs = {
        expiryDays: 30,
        expiryMessage: "Этот блог был неактивен в течение <expiryDays> дней. Просьба не редактировать его.",
        nonexpiryCategory: "Заархивированные блоги"
    };
/******************************************/
/******************************************/
/******************************************/