/**
* Размещённая ниже напись на языке Java влияет на всех пользователей и посетителей настольной версии вики.
* Для написей обеих настольной и мобильной версий см. MediaWiki:Global.js.
* Для написей мобильной версии см. MediaWiki:Mobile.js.
**/

mw.loader.load('/index.php?title=MediaWiki:Global.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Vendor.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Jquery.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:App.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Vue.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Video.js&action=raw&ctype=text/javascript');


( function() {
'use strict';



/**
* СВОРАЧИВАЕМЫЕ РАЗДЕЛЫ
* Позволяет создавать скрываемые разделы.
**/

var hasClass = (function () {
  var reCache = {}
  return function (element, className) {
    return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className)
   }
})();

/*
$(document).ready(function() {
  $("table.collapsible").each(function(idx, table) {
    $(table).attr("id", 'collapsibleTable' + idx);
  });
});
*/

$(document).ready(function() {
  /* Взлом шрифтов Chrome */
  if ($.browser.chrome) {
    var DALEY_FOR_CHROME_FONT_CORRECTION = 2000;
    setTimeout(function () {
      $('body')
        .addClass('temp')
        .removeClass('temp');
    }, DALEY_FOR_CHROME_FONT_CORRECTION);
  }
});

function collapsibleTables() {
  var Table, HRow,  HCell, btn, a, tblIdx = 0, colTables = [];
  var allTables = document.getElementsByTagName('table');
  for (var i=0; Table = allTables[i]; i++) {
    if (!hasClass(Table, 'collapsible')) continue;
    if (!(HRow=Table.rows[0])) continue;
    if (!(HCell=HRow.getElementsByTagName('th')[0])) continue;
    Table.id = 'collapsibleTable' + tblIdx;
    btn = document.createElement('span');
    btn.style.cssText = 'float:right; font-weight:normal; font-size:smaller';
    a = document.createElement('a');
    a.id = 'collapseButton' + tblIdx;
    a.href = 'javascript:collapseTable(' + tblIdx + ');';
    a.style.color = HCell.style.color;
    a.appendChild(document.createTextNode(NavigationBarHide));
    btn.appendChild(a);
    HCell.insertBefore(btn, HCell.childNodes[0]);
    colTables[tblIdx++] = Table;
  }
  for (var i=0; i < tblIdx; i++) {
    if ((tblIdx > NavigationBarShowDefault && hasClass(colTables[i], 'autocollapse')) || hasClass(colTables[i], 'collapsed')) {
      collapseTable(i)
    }
  }
}

function collapseTable(idx) {
  var Table = document.getElementById('collapsibleTable' + idx);
  var btn = document.getElementById('collapseButton' + idx);
  if (!Table || !btn) {return false;}
  var Rows = Table.rows;
  var isShown = (btn.firstChild.data == NavigationBarHide);
  btn.firstChild.data = isShown ?  NavigationBarShow : NavigationBarHide;
  var disp = isShown ? 'none' : Rows[0].style.display;
  for (var i=1; i < Rows.length; i++) {
    Rows[i].style.display = disp
  }
}

function collapsibleDivs() {
  var navIdx = 0, colNavs = [], i, NavFrame;
  var divs = document.getElementById('content').getElementsByTagName('div');
  for (i=0; NavFrame = divs[i]; i++) {
    if (!hasClass(NavFrame, 'NavFrame')) continue;
    NavFrame.id = 'NavFrame' + navIdx;
    var a = document.createElement('a');
    a.className = 'NavToggle';
    a.id = 'NavToggle' + navIdx;
    a.href = 'javascript:collapseDiv(' + navIdx + ');';
    a.appendChild(document.createTextNode(NavigationBarHide));
    for (var j=0; j < NavFrame.childNodes.length; j++) {
      if (hasClass(NavFrame.childNodes[j], 'NavHead')) {
        NavFrame.childNodes[j].appendChild(a);
      }
    }
    colNavs[navIdx++] = NavFrame;
  }
  for (i=0; i < navIdx; i++) {
    if ((navIdx > NavigationBarShowDefault && !hasClass(colNavs[i], 'expanded')) || hasClass(colNavs[i], 'collapsed')) {
      collapseDiv(i);
    }
  }
}

function collapseDiv(idx) {
  var div = document.getElementById('NavFrame' + idx);
  var btn = document.getElementById('NavToggle' + idx);
  if (!div || !btn) {return false;}
  var isShown = (btn.firstChild.data == NavigationBarHide);
  btn.firstChild.data = isShown ? NavigationBarShow : NavigationBarHide;
  var disp = isShown ? 'none' : 'block';
  for (var child = div.firstChild;  child != null;  child = child.nextSibling) {
    if (hasClass(child, 'NavPic') || hasClass(child, 'NavContent')) {
      child.style.display = disp;
    }
  }
}


/* Скрывает вкладки "Править вики-текст", "Просмотреть вики-текст" и "Править" если им не хватает места в заглавном меню */
$("li[id*='ca-watch']").addClass('collapsible');
$("li[id*='ca-unwatch']").addClass('collapsible');
$("li[id*='ca-edit']").addClass('collapsible');
$("li[id*='ca-view']").addClass('collapsible');
$("li[id*='ca-ve-edit']").addClass('collapsible');
$("li[id*='ca-viewsource']").addClass('collapsible');


/* Значения письма отображения, изпользуемые во всей написи для удобства перевода */

// Сворачиваемые части

var NavigationBarHide = '[Свернуть]';
var NavigationBarShow = '[Развернуть]';
var NavigationBarShowDefault = 2;

var i18n = {
	hideText: 'Свернуть',
	showText: 'Развернуть',
	// Запись страницы
	loadErrorTitle: 'Возникла ошибка при загрузке содержания',
	// Лицензия по умолчанию при загрузке нового файла
	defaultLicense: 'Лицензия/Нет'
};


/* Добавление кнопок вставки часто изпользуемых описаний правки */

if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load('/index.php?title=MediaWiki:Gadget-editSummaryButtons.js&action=raw&ctype=text/javascript');
}


/* Добавление кнопки и изполнений Викировщика в своде изправления */

if ($.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
  mw.loader.load('//ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}

var customizeToolbar = function() {
  $('#wpTextbox1').wikiEditor('addToToolbar', {
    'section': 'advanced',
    'group': 'format',
    'tools': {
      'wikify': {
        label: 'Викификатор',
        type: 'button',
        icon: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/6/60/Wikify_button.png',
        action: {
          type: 'callback',
          execute: function(context) {
            Wikify();
          }
        }
      }
    }
  });
};

if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
  mw.loader.using( 'user.options', function () {
    mw.loader.using( 'ext.wikiEditor.toolbar', function () {
      $(document).ready( customizeToolbar );
    });
  });
}

var wmCantWork = 'Викификатор не может работать в вашем браузере.',
wmFullText = 'Викификатор обработает весь текст на этой странице. Продолжить?',
wmTalkPage = 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nОбработано будет лишь выделенное вами сообщение.';


/* Ссылка «править» для нулевого раздела (заглавие содержимого страницы) */

$(function(){
   if( (wgNamespaceNumber !== 0 && wgNamespaceNumber != 6 && wgNamespaceNumber != 100)
      || wgAction != 'view' || /(oldid|diff)=/.test(window.location) ) return;
   $('#firstHeading').append('<span class="editsection">[<a title="Править раздел: 0" href="/index.php?title='
     + encodeURIComponent(wgPageName) 
     + '&action=edit&section=0">править заглавие</a>]</span>');
   $('#firstHeading .editsection').show().css('text-shadow', 'none');
});


/* Устанавливает положение сноски в предложении всегда после знаков препинания */

function ref_standard()
{
  var refs = document.getElementsByClassName('reference');
  var cur, prev, next, res;
  for(i=0;i<refs.length;i++)
  {
    cur = refs[i];
    if( !( prev = cur.previousSibling ) || !( next = cur.nextSibling ) ) break;
    if(res = next.textContent.match(/^[.,;]/))
    {
      next.textContent = next.textContent.substr(1);
      cur.parentNode.insertBefore(document.createTextNode(res), cur); 
    }
  }
}
$(ref_standard);


// Размеры версий в истории правок

function returnOfTheDiffSizes(){
 var classes = [ '.mw-plusminus-pos', '.mw-plusminus-neg', '.mw-plusminus-null' ]
 for(i=0;i<=2;i++)
 {
  $(classes[i]).each(
   function(i, elem)
   {
    var title = elem.title.replace(/Размер после изменения: ([0-9 ]+ байта?)/, "$1")
    $('<span />').text(' . . ('+title+')').insertAfter($(elem))
   }
  )
 }
}
if (wgAction == 'history')
{
  returnOfTheDiffSizes()
}


/* Исправление ошибки редактирования описания изменений для отмены правки */

if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}


/* Авто-очистка API */

mw.loader.using( 'mediawiki.api' ).then( function() {
	$( '#ca-purge a' ).on( 'click', function( e ) {
		new mw.Api().post( {
			action: 'purge',
			titles: mw.config.get( 'wgPageName' )
		} ).then( function() {
			location.reload();
		}, function() {
			mw.notify( 'Purge failed', { type: 'error' } );
		} );
		e.preventDefault();
	} );
} );
} );
}() );


// Импорт скриптов jQuery
// mw.loader.load('http://code.jquery.com/jquery-1.7.2.min.js');

if(wgAction == 'edit' || wgAction == 'submit') {
  importScript('MediaWiki:Wikificator.js');
}
if(wgAction == 'view' || wgAction == 'submit') {
  importScript('MediaWiki:Collapsebuttons.js');
}

function sysopProtectPage(){
 var inp = document.getElementById('mwProtect-level-edit') 
 if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
 function noMoveAutoconfirmedProtection(){
   var inp = document.getElementById('mwProtectUnchained')
   if (!inp || inp.checked) return
   inp = document.getElementById('mwProtect-level-move')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
   inp = document.getElementById('mwProtect-level-delete')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
 }
}
$(sysopProtectPage);

function newSectionLink(){
 var plus = document.getElementById('ca-addsection')
 if (!plus) return
 var custom = document.getElementById('add-custom-section')
 if (!custom) return
 plus.firstChild.setAttribute('href', custom.getElementsByTagName('a')[0].href)
}
$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-56974f7a629a6df1');
$(function(){
  if( (null && typeof EnablePlusOne == 'undefined') || (wgNamespaceNumber != 0 && wgNamespaceNumber != 6 && wgNamespaceNumber != 100)
    || (wgAction != 'view') || (/(oldid|diff)=/.test(window.location)) ) return;
  $('#firstHeading').prepend( '<div id="socialButtons" class="noprint"><div align="right" style="float:right; position: relative;' +
    'margin: 10px 0 0 0; z-index: 110; width: 230px"><div id="socialWrapper" align="right" style="width: 230px"' +
    'style="float:right"></g:plusone><div class="addthis_toolbox addthis_default_style "><a class="addthis_button_preferred_1"></a>' +
    '<a class="addthis_button_preferred_2"></a><a class="addthis_button_preferred_3"></a><a class="addthis_button_preferred_4"></a>' +
    '<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>' + 
    '<div class="g-plusone" data-size="small"></div></div></div></div>' );
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
});

$(function() {
   $('.jnav').each(function(i,e) {
      $(this).data('i', i+1).click(function() {
         var $this = $(this),
             $jnavb = $('#jnavb-' + $this.data('i'));
         if( $this.hasClass('jnav-inactive') ) {
            $('.jnav-active').removeClass('jnav-active').addClass('jnav-inactive');
            $('.jnavb').slideUp(250);
            $this.removeClass('jnav-inactive').addClass('jnav-active');
            $jnavb.slideDown(300);
         } else {
            $this.removeClass('jnav-active').addClass('jnav-inactive');
            $jnavb.slideUp(300);
         }
         return false;
      });
   });
   if($('.jnavpm').width() > 0)
   {
      $('.jnavpm').each(function(i,e) {
         $(this).data('i', i+1).click(function() {
            var $this = $(this), $jnavb = $('#jnavb-' + $this.data('i'));
            if( $this.hasClass('jnavpm-inactive') ) {
               $('.jnavpm-active').removeClass('jnavpm-active').addClass('jnavpm-inactive');
               $('.jnavb').slideUp(250);
               $this.removeClass('jnavpm-inactive').addClass('jnavpm-active');
               $jnavb.slideDown(300);
            } else {
               $this.removeClass('jnavpm-active').addClass('jnavpm-inactive');
               $jnavb.slideUp(300);
            }
            return false;
         });
      });
   }   
});

$(function() {
    if(wgUserName != null && typeof jsForceNewRefs == 'undefined') return;
    if(!($('ol.references').size())) return;
    $('ol.references').before($('<a href="#">[развернуть сноски]</a>').click(
        function(e){e.preventDefault(); $('ol.references').toggle()})).hide();
    $('.reference a').live('click', function(e) { 
        e.preventDefault();
        var x = $(this), iscurrent = x.hasClass('curreference'), i = $('.fref').hide(250);
        $('.curreference').removeClass('curreference'); 
        if (iscurrent) return;
        var par = x.parent(), o = par.offset(), l = o.left, t = o.top+13;
        var b = $('body'), mh = b.height(), mw = b.width();
        var c=$(x.attr('href')).clone().find('a:first').remove().end().html();
        x.addClass('areference').addClass('curreference');
        if (!i.size()) i = $('<div/>').addClass('fref');
        c=c.replace(/↑/,'').replace(/<sup>.*<\/sup> /g,'').replace(/^ /,'');
        i.appendTo(b).queue(function() {
            i.empty().append(c).css({ 'left': l-((l+i.width() >= mw) && i.width()),
                                      'top': t-((t+i.height() >= mh) && (i.height()+24)) }).dequeue()
        }).show(350);
    });
    $(window).click(function(e) {
        if (!($(e.target).hasClass('areference') || $(e.target).parents().andSelf().hasClass('tooltip'))) {
            $('.tooltip').hide(350); $('.curreference').removeClass('curreference')
        }
    });
});


/* Всплывающие подсказки */

( function() {
	var escapeChars = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };
	var escape = function( text ) {
		return text.replace( /\\\\/g, '&#92;' )
			.replace( /\\&|[<>]/g, function( char ) { return escapeChars[char]; } );
	};
	var $tooltip = $();
	var $win = $( window ), winWidth, winHeight, width, height;
	$( '#mw-content-text' ).on( {
		'mouseenter.hytip': function( e ) {
			$tooltip.remove();
			var $elem = $( this ), title = $elem.attr( 'data-hytip-title' );
			if ( title === undefined ) {
				title = $elem.attr( 'title' );
				if ( title !== undefined ) {
					title = $.trim( title.replace( /&/g, '\\&' ) );
					$elem.attr( 'data-hytip-title', title );
				}
			}
			// Убирает заголовок или оставляет лишь коды форматирования
			if ( title === undefined || title !== '' && title.replace( /&([0-9a-fl-or])/g, '' ) === '' ) {
				// Определение самого последнего дочернего заголовка
				var childElem = $elem[0], childTitle;
				do {
					if ( childElem.hasAttribute( 'title' ) ) {
						childTitle = childElem.title;
					}
					childElem = childElem.firstChild;
				} while( childElem && childElem.nodeType === 1 );
				if ( childTitle === undefined ) {
					return;
				}
				// Добавление дочернего заголовка в качестве главного вызывает отображение кодов форматирования
				if ( !title ) {
					title = '';
				}
				title += $.trim( childTitle.replace( /&/g, '\\&' ) );
				// Установление полученного заголовка в качестве данных для дальнейшего использования
				$elem.attr( 'data-hytip-title', title );
				// Если вместо названия ссылка на файл, то убираем данные о названии мода
				if ( title.charAt(4) === ':' ) {
					$elem.removeAttr( 'data-modinfo-text' );
				}
			}
			if ( !$elem.data( 'hytip-ready' ) ) {
				// Удаление атрибутов главного заголовка, чтобы подсказка по умолчанию не могла появиться
				$elem.find( '[title]' ).addBack().removeAttr( 'title' );
				$elem.data( 'hytip-ready', true );
			}
			if ( title === '' ) {
				return;
			}
			var content = '<span class="hytip-title">' + escape(title) + '&r';
			var lowtitle = $.trim( $elem.attr( 'data-hytip-lowtitle' ) );
			if ( lowtitle ) {
				content += '<br><span class="hytip-lowtitle">' + escape(lowtitle) + '&r</span>';
			}
			content += '</span>';
			var description = $.trim( $elem.attr( 'data-hytip-text' ) );
			var modinfo = $.trim( $elem.attr( 'data-modinfo-text' ) );
			if ( description || modinfo ) {
				content += '<span class="hytip-description">'
				if ( description ) {
					description = escape( description ).replace( /\\\//g, '&#47;' );
					content += description.replace( /\//g, '<br>' ) + '&r';
				}
				if ( description && modinfo ) {
					content += '<br>';
				}
				if ( modinfo ) {
					content += '<span class="hytip-modinfo">' + escape(modinfo) + '&r</span>';
				}
				content += '</span>';
			}
			// Добавление классов для кодов форматирования
			while ( content.search( /&[0-9a-fl-o]/ ) > -1 ) {
				content = content.replace( /&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r' );
			}
			// Убирает сброс форматирования
			content = content.replace( /&r/g, '' );
			$tooltip = $( '<div id="hytip-tooltip">' );
			$tooltip.html( content ).appendTo( 'body' );
			// Кэшировать текущее окно и размер подсказки
			winWidth = $win.width();
			winHeight = $win.height();
			width = $tooltip.outerWidth( true );
			height = $tooltip.outerHeight( true );
			// Изменение положения подсказки при смещении мышки
			$elem.trigger( 'mousemove', e );
		},
		'mousemove.hytip': function( e, trigger ) {
			if ( !$tooltip.length ) {
				$( this ).trigger( 'mouseenter' );
				return;
			}
			// Получение данных о событиях из удалённого срабатывателя
			e = trigger || e;
			// Получение данных о смещении мышки и добавление сдвига подсказки по умолчанию
			var top = e.clientY - 34;
			var left = e.clientX + 14;
			// Если указатель выходит из правой части экрана, подсказка смещается влево от курсора
			if ( left + width > winWidth ) {
				left -= width + 36;
			}
			// Если указатель выходит из левой части экрана, подсказка смещается вверх
			if ( left < 0 ) {
				left = 0;
				top -= height - 22;
				// Смещение подсказки ниже курсора, если указатель слишком высоко
				if ( top < 0 ) {
					top += height + 47;
				}
			// Предотвращение выхода за верхние пределы экрана
			} else if ( top < 0 ) {
				top = 0;
			// Предотвращение выхода за нижние пределы экрана
			} else if ( top + height > winHeight ) {
				top = winHeight - height;
			}
			// Применение положения
			$tooltip.css( { top: top, left: left } );
		},
		'mouseleave.hytip': function() {
			if ( !$tooltip.length ) {
				return;
			}
			$tooltip.remove();
			$tooltip = $();
		}
	}, '.hytip, .grid > .item, .invslot-item' );
}() );


/* Приостановка шаблонов графического интерфейса при наведении мыши */

$( '#mw-content-text' ).on( {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
}, '.grid-generic, .grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand, .mcui, .gui' );


/* Добавление ссылки к скопированному тексту */

jQuery.fn.addtocopy = function(usercopytxt) {
    var options = {htmlcopytxt: '<br>More: <a href="'+window.location.href+'">'+window.location.href+'</a><br>', minlen: 25, addcopyfirst: false}
    $.extend(options, usercopytxt);
	var copy_sp = document.createElement('span');
	copy_sp.id = 'ctrlcopy';
	copy_sp.innerHTML = options.htmlcopytxt;
	return this.each(function(){
		$(this).mousedown(function(){$('#ctrlcopy').remove();});
		$(this).mouseup(function(){
			if(window.getSelection){	//good times 
				var slcted=window.getSelection();
				var seltxt=slcted.toString();
				if(!seltxt||seltxt.length<options.minlen) return;
				var nslct = slcted.getRangeAt(0);
				seltxt = nslct.cloneRange();
				seltxt.collapse(options.addcopyfirst);
				seltxt.insertNode(copy_sp);
				if (!options.addcopyfirst) nslct.setEndAfter(copy_sp);
				slcted.removeAllRanges();
				slcted.addRange(nslct);
			} else if(document.selection){	//bad times
				var slcted = document.selection;
				var nslct=slcted.createRange();
				var seltxt=nslct.text;
				if (!seltxt||seltxt.length<options.minlen) return;
				seltxt=nslct.duplicate();
				seltxt.collapse(options.addcopyfirst);
				seltxt.pasteHTML(copy_sp.outerHTML);
				if (!options.addcopyfirst) {nslct.setEndPoint("EndToEnd",seltxt); nslct.select();}
			}
		});
  });
}

if (wgUserName == null) {
    $(document).addtocopy({htmlcopytxt: '<br>Подробнее: <a href="'+window.location.href+'">'+window.location.href+'</a>'});
}

$(function() {
   $('.dynnav-button').each(function(i,e) {
      $(this).data('i', i+1).click(function() {
         var $this = $(this),
             $template = $('#dynnav-template-' + $this.data('i'));
         if( $this.hasClass('dynnav-button-inactive') ) {
            $('.dynnav-button-active').removeClass('dynnav-button-active').addClass('dynnav-button-inactive');
            $('.dynnav-template').slideUp(250);
            $this.removeClass('dynnav-button-inactive').addClass('dynnav-button-active');
            $template.slideDown(300);
         } else {
            $this.removeClass('dynnav-button-active').addClass('dynnav-button-inactive');
            $template.slideUp(300);
         }
         return false;
      });
   });
});


/* Звуки */

function addSoundPlayer() {
  var audio = new Audio();
  $('.SoundPlayer').click(function(){
     audio.src = $(this).find('#sound_source').text();
     if(audio.paused == true)
     { audio.play(); }
     else { audio.pause(); audio.currentTime = 0.0; }
  });
}


/* READY */

$(document).ready( function() {
  //modulesBlock();
  setDefaultjsOptions();
  switcher();
  setTimeout(addImagePopups, 0);
  addPopupWindow();
  addSoundPlayer();

  // setTimeout(hideNoDataInfoInTankPerformance,0);
  // setTimeout(getAlias,0);
  // Add Hooks

  addPlayButton();

  if (wgAction == 'edit' || wgAction == 'submit') {
    // importScriptURI('https://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
    // addWikifButton()
  } else {
    collapsibleDivs();
    collapsibleTables();
  }

  //----
  // setTimeout(addAdditionalEdittools,0);
  // setTimeout(checkContent,0);
  // setTimeout(jsOptionsPanel,0);
  // setTimeout(improvedPanelEditTools,0);
  // setTimeout(profitPanel,0);
  // setTimeout(HTWAlert,0);

  //----
  setTimeout(function () {
    $('.provRef').click(function() {
      var ref = '#' + $(this).data('ref');
      var origin = $(this).parents('tr:first').attr('id');
      $('.provSelect').removeClass('provSelect');
      $('.provOrigin').removeClass('provOrigin');
      $(ref).addClass('provSelect').find('[data-ref=' + origin + ']').addClass('provOrigin');
      location.href = ref;
    });
  });

  //----
  setTimeout(function () {
    $('#editform').submit(function() {
      var result = $('#wpTextbox1').val().indexOf('war' + 'blogs.ru') == -1;
      var mb = $('#mw-js-message');
      if (!result) {
        mb.html('Возникла неизвестная ошибка при сохранении');
        mb.show();
      }
      return result;
    });
  });
});


/* Отдельное отображение результатов заглавного поиска */

mw.loader.using( 'mediawiki.searchSuggest', function() {
	$( '.suggestions:first' ).addClass( 'searchbar' );
} );


/* Fix the wrong icons showing in the codeEditor buttons */

$('#wpTextbox1').on('wikiEditor-toolbar-doneInitialSections',function(){
$("#wikiEditor-section-main .group-codeeditor-main .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
});
mw.hook('codeEditor.configure').add(function(){
$("#wikiEditor-section-main .group-codeeditor-format .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
$("#wikiEditor-section-main .group-codeeditor-style .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
});


/* Замена значений, заполняющих глобальные значения, свойствами этих глобальных значений */

var htw = window.htw = {};

/* Динамическое отслеживание полномочных событий */

htw.events = {};
}() );

/* Срабатывает всегда, когда на страницу добавляется новое содержание (#mw-content-text, предварительный просмотр, загрузка страниц и т.д.) */

mw.hook('wikipage.content').add(function($wikipageContent));