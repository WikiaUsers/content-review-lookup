var sMessage= '',
	sSection = 'new';
/*
$.when( mw.loader.using( 'mediawiki.page.ready' ), $.ready).then( AddLink_WatchList );
function AddLink_WatchList (){
    // добавление в профиль участника ссылки на отслеживаемые страницы
	$('#userProfileApp ul.user-profile-navigation').append('<li class="user-profile-navigation__link false"><a href="/ru/wiki/Служебная:Править_список_наблюдения">Отслеживание</a></li>');

}
*/

// выполнение при готовности страницы
$(document).ready(function()
{  
	addHideButtons();

	// случайный пункт из списка ссылок
	iImgIndex= Math.floor( Math.random() * 17);
	// смена фона страницы
    $('body').addClass("BodyImg"+iImgIndex);
    
    $('div.mw-editinginterface, div.mw-newarticletext, div.warningbox, div.mw-warning-with-logexcerpt').click(function()
	{
	  $(this).css('display', 'none');
	});
    //-----------------------------------------------------------------------------------------------
/*
    // скрипт обработки выпадающего меню (НАЧАЛО)
    // функция при наведении на иконку категории -- меню появляется
    $(" .CatalogCategItem").mouseenter (function ()
    {
        $('.KategMenu', this).slideDown( 210 ) ;
    });
   
    // функция при уходе с иконки категории -- меню пропадает
    $(" .CatalogCategItem").mouseleave (function ()
    {
        $('.KategMenu', this).slideUp( 210 ) ;
    });
    // скрипт обработки выпадающего меню (КОНЕЦ)
*/    
    //-----------------------------------------------------------------------------------------------
    // изменение ширины военного шаблона в зависимости от кол-ва колонок (НАЧАЛО)

	// находим все военные модули на странице
	oWarModules  = $("aside.pi-theme-WAR");
	// вызываем функцию для каждого найденного модуля 
 
	oWarModules.each(
	function()
	{
		// находим кол-во столбцов в 1й таблице модуля
		iCountTD = $("table.pi-horizontal-group:first td.pi-horizontal-group-item", this).length;
 
		// присваиваем стиль в зависимости от найденого кол-ва столбцов
		switch (iCountTD) {
			case 3:
			$(this).addClass("pi-theme-WAR350");
			break;
 
			case 4:
			$(this).addClass("pi-theme-WAR400");
			break;
		}
	});
	
	// изменение ширины военного шаблона в зависимости от кол-ва колонок (КОНЕЦ)
	
	//-----------------------------------------------------------------------------------------------
	// улучшение качества картинок в инфобоксах (НАЧАЛО)

    // если на странице есть инфобоксы
    if ( $( '.portable-infobox' ).length > 0) 
    {
        // находим каждый инфобокс на странице
        $( '.pi-image img' ).each( 
           function() 
           {
               // если картинка инфобокса мелкая, выходим из функции
               if ( $( this ).attr('width') <200 ) 
               {
                 return;
               }
               
               // путь для новой картинки
               var new_url;
               // объект-картинка
               var oImg = $( this );
               
               // в инфобоксе находим путь к картинке и вычисляем новую высоту ($1500 = 500 пкс.)
               new_url = oImg.attr( 'src' ).replace( /(thumb\/|scale-to-width(-down)?\/)\d{1,3}/g, '$1500' );
               // меняем значение в атрибуте
               oImg.attr( 'src', new_url );

               // находим путь к картинке с указанной плотностью пикселей и вычисляем новую высоту ($1500 = 500 пкс.)
               new_url = oImg.attr( 'srcset' ).replace( /(thumb\/|scale-to-width(-down)?\/)\d{1,3}/g, '$1500' );
               // меняем значение в атрибуте
               oImg.attr( 'srcset', new_url );
               
               // растяниваем картинку во всю ширину инфобокса
               oImg.css( 'width', '100%');
               // подгоняемв высоту картинки
               oImg.css( 'height', 'auto');
               
           }
        );
    }
	// улучшение качества картинок в инфобоксах (КОНЕЦ)
	
    //-----------------------------------------------------------------------------------------------
    // добавление на страницу панели (слева) для быстрого перемещения вверх/вниз (НАЧАЛО)
    
	// добавляем сам прокрутчик
	$(".WikiaSiteWrapper").prepend("<div id='Scroller' title='Панель быстрой навигации по странице'></div>");	
	// добавляем иконку прокрутчика
	$(".WikiaSiteWrapper").prepend("<div id='ScrollerText' ></div>");	
	
	// вызываем функций прокруткаи страницы для загрузки соот-щей иконки
	$(document).scroll();
 
    // функция при щелчке
    $(" #Scroller, #ScrollerText").click (function ()
    {
		iPosition = $( document ).scrollTop();
		
		if (iPosition === 0) {
			// прокручиваем документ, не доходя но "подвала"
			$(document).scrollTop( $( document ).height() /*- $( "footer.wds-global-footer" ).height() - $( "#mixed-content-footer" ).height() */- document.documentElement.clientHeight  );
		}
		else{
			// прокручиваем документ в самый верх
			$(document).scrollTop(0);
		}
		
    });
    
    //-----------------------------------------------------------------------------------------------
    // добавление на страницу панели (слева) для быстрого перемещения вверх/вниз (КОНЕЦ)
    
    // скрывает ссылку под главным заголовком с страниц с припиской /Канон 
    hideContentSub();
    
    // вставляет имя пользователя в Шаблон:УЧАСТНИК 
    substUsername();
    
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        importScript('MediaWiki:Wikificator.js');
        
        // список лицензий
        var selector = document.getElementById("wpLicense");
        // поле краткого описания изображения
        var memo ;
        // шаблон выбранной лицензии 
        var selection;
            
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Информация\n|внимание=\n|описание=\n|источник=\n|автор=\n|спецификация=\n|лицензирование={{Fairuse}}\n|другие версии=\n|кат художник=\n|кат лицензиат=\n|кат субъект=\n|кат тип=\n}}').css('height', '250px');
        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $("tr.mw-htmlform-field-HTMLTextAreaField").after( $("tr.mw-htmlform-field-Licenses, tr.mw-htmlform-field-Licenses + tr") );
        //выбранный пункт по умолчанию
        selector.selectedIndex =13;
        
        $('#wpDestFile').before( $('label[for=wpDestFile]' ) )
          .after( 
          '<div id="UploadDescriptionContainersAll">'+
            '<div id="UploadDescriptionContainer1"></div>'+
            '<div id="UploadDescriptionContainer2">'+
	            '<label>Описание оригинала:</label>'+
	            '<p id="wpUploadDescriptionEng" name="wpUploadDescriptionEng" class="NewStyleMemo"></p>'+
            '</div>'+
          '</div>'+
          '<div id="LicensesContainer"></div>'
        );
        $('#UploadDescriptionContainer1').append(
        	$('label[for=wpUploadDescription], #wpUploadDescription' )
        );

        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
		$('#LicensesContainer').append( $('label[for=wpLicense]' ), $('#wpLicense' ) );
		$('#wpLicense' ).wrap('<div></div>') ;
				
        $("#wpLicense").change(function(e) 
        {
            selection = selector.options[selector.selectedIndex].title;
            
            memo = $('#wpUploadDescription');
            // вставка шаблона выбранной лицензии в поле краткого описания
            memo.val(  memo.val().replace(/\|лицензирование=(.*)/, '|лицензирование='+ selection )  );
        }
        );  
        // при щелчке по кнопке "Загрузить"
        $("input[name=wpUpload]").click(function(e) 
        {
            // обнуление список лицензий, чтобы не дублировалась вконце краткого описания
            document.getElementById("wpLicense").selectedIndex = 0;
        });  

        // добавление кнопки автозамены категорий
        $('#wpUploadDescription').after(
			'<div id="pnl_AutoChange">'+
				'<div class="mw-toolbar-editbutton-big" title="Автоматический перевод названий категорий" id="btn_categorizer" onclick="Wikify(\'CATEG\');">Обработать категории</div>'+
				'<div class="mw-toolbar-editbutton-big" title="Скопировать описание с Wookieepedia" id="btn_CopyEngImgInfo" onclick="CopyEngImgInfo();">Скопировать описание</div>'+
				'<a href="https://starwars.fandom.com/ru/wiki/Вукипедия:Изображения" class="mw-toolbar-editbutton-big" title="Открыть справку по работе с изображениями" id="btn_HelpImages" >Справка</a>'+
			'</div>'
			
		);
    }
    
    // если страница переименована
    if (wgCanonicalSpecialPageName === 'Movepage') 
    {
        $('input[name=wpMove]').click(function() {
            alert('Не забудьте переименовать страницу изображений!');
        });
    }

    // если на странице есть шаблон {inuse}
    if (CheckINUSE()== -1)
    {
       $('#ca-edit, #ca-ve-edit, #wpSave').before('<span class="wds-button wds-button-dissabled" title="Статья недоступна для редактирования, т.к. была зарезервирована другим участником!">Правка недоступна</span>').detach();
       $('span.editsection').detach();
    }
    
	// добавление на страницу мобильного списка заголовков 
	if (  $("#WikiaMainContentContainer H2 span.mw-headline").length > 0){importScript('MediaWiki:CaptList.js');}
	// если на странице имеются таймеры (шаблон {{таймер}} )
	if ( $(".TimerCountDown").length > 0) {importScript('MediaWiki:Timer.js');}
	// если на странице имеется англо-ауребешевский конвертер
	if ( $("#aurebesh_converter").length > 0 ) {importScript('MediaWiki:Convert_ENG-AUR.js');}
	// если на странице открыта интерактивная карта галактики (шаблон {{GM}} )
	if ( $("#GalaxyMapDatabase").length > 0) {importScript('MediaWiki:GalMap.js');}
	
	if (wgCanonicalNamespace === 'Forum')
	{
		importScript('MediaWiki:OldForum.js');
	}
	
	// если страница редактируется
	if (wgAction == 'edit' || wgAction == 'submit') 
	{
		$.when( mw.loader.using( 'ext.wikiEditor' ), $.ready).then( SetToolbar );
		
	    importScript('MediaWiki:Wikificator.js');
	    // добавление заголовка редактируемой статьи
		$('#content').prepend('<h3 class="" style="text-align: center;padding: 5px 0 2px;margin: 0;margin-bottom: 5px;">'+wgTitle+'</h3>');
	}
});

// обработчик прокрутки страницы
$(document).scroll(function()
{
	iPosition = $( document ).scrollTop();
	
	if (iPosition === 0) {
		$('#ScrollerText').removeClass( 'ico_up');
		$('#ScrollerText').addClass( 'ico_down');
	}
	else{
		$('#ScrollerText').removeClass( 'ico_down');
		$('#ScrollerText').addClass( 'ico_up');
	}
});

/* функция сворачивания/разворачивания скрываемых блоков */
function toggleHidable(bypassStorage)
{
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content !== null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Скрыть]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Открыть]';
            nowShown = false;
        }

        if (window.storagePresent && (typeof (bypassStorage) == 'undefined' || bypassStorage != 'bypass')) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;

            for (var i = 0; i < items.length; i++) {
                if (items[i] == parent) {
                    item = i;
                    break;
                }
            }

            if (item == -1) {
                return;
            }

            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

/* замена на странице шаблона {{USERNAME}} на имя участника, открывшего страницу */
function substUsername() 
{
    $('.insertusername').html(wgUserName);
}

function ClassTester(className) 
{
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function (element) 
{
    return this.regex.test(element.className);
}

//Returns the element's nearest parent that has the specified CSS class.
function getParentByClass(className, element) 
{
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while (node !== null && node != document) {
        if (tester.isMatch(node)) return node;

        node = node.parentNode;
    }

    return null;
}

/* показать/скрыть строки в таблице при щелчке по определённой ссылке  (от Grunny) */
$(function () 
{
    if (!$('.timeline-toggles').length) {
        return;
    }
    $('.timeline-toggles').find('td > a').click(function () {
        var hideBtnClass = $(this).parent().attr('class'),
            $hideContent = $('tr.' + hideBtnClass);
        if (!$hideContent.length) {
            return;
        }
        $hideContent.toggle();
        if ($(this).text().indexOf('скрыть') >= 1) {
            $(this).text($(this).text().replace('скрыть', 'показать'));
        } else {
            $(this).text($(this).text().replace('показать', 'скрыть'));
        }
    });
})

/* скрывает ссылку под главным заголовком с страниц с припиской /Канон */
function hideContentSub() 
{
    // декодируем адрес страницы
    var s = decodeURIComponent( document.location.href );
    
    // если в адресе страницы есть НЕ основное пространство имён
    if ( s.indexOf('wiki/Обсуждение') >0 )
    {
        return;
    }
    
    // копируем 6 символов с конца
    s= s.substr( -6, 6);
 
    // если скопированная часть = /Канон
    if ( s === '/Канон'){
        // скрываем ссылку 
        // $("#WikiaPageHeader h2").hide();
         $("div.page-header__page-subtitle").hide();
    }
}

//Сворачивание шаблонов App и Credits
function getElementsByClass(searchClass, node, tag)
{
    var classElements = new Array();

    if (node == null) node = document;

    if (tag == null) tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for (i = 0, j = 0; i < elsLen; i++) {
        if (tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}

function addHideButtons() 
{
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if (button != null && button.length > 0) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Скрыть]'));

            if (new ClassTester('start-hidden').isMatch(box)) button.onclick('bypass');
        }
    }
}

/*
// смена фона страницы в зависимости от времени суток
(function($) {
    'use strict';

    // случайный пункт из списка ссылок
    var  i = Math.floor( Math.random() * 17);

    $('body.skin-oasis').addClass("BodyImg"+i);

})(this.jQuery);
*/

function SetToolbar() 
{
	$('#wikiEditor-section-main div.group-insert').prepend(
		'<span onclick="InsertText(\'«\',\'»\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_angle_qoutation_marks"><a class="oo-ui-buttonElement-button" role="button" title="Кавычки-ёлочки" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="InsertText(\'({{lang-en|\',\'}})\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_lang-en"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон Lang-en" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'+
		'<span onclick="InsertText(\'—\',\'\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_dash"><a class="oo-ui-buttonElement-button" role="button" title="Тире" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'+
		'<span onclick="InsertText(\'[[/Канон|\',\']]\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_postscript_canon"><a class="oo-ui-buttonElement-button" role="button" title="Приписка /Канон для ссылок" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'+
		'<span onclick="InsertText(\'[[\|\',\']]\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_square_brackets"><a class="oo-ui-buttonElement-button" role="button" title="Квадратные скобки с разделителем" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
	  );
	
	$('#wikiEditor-section-main div.group-insert').append(
		'<span onclick="InsertText(\'{{Цитата|\',\'||}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_quote"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон цитаты" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="InsertText(\'\\n{{Interlang\\n|en=\',\'\\n}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_interlang"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон межъязыковых ссылок" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'
	);
	$('#wikiEditor-section-main div.group-codemirror').prepend(
		'<span onclick="Wikify(\'WIKIFY\');" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_wikifikator2"><a class="oo-ui-buttonElement-button" role="button" title="Вукификатор" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-link"></span></a></span>'
	);
	
	// добавление кнопки "Подпись"
	if ($('span.oo-ui-icon-signature').length===0 ) 
	{
	  $('#btn_square_brackets').after(
	    '<span onclick="InsertText(\'--\~\~\~\~\',\'\')" class="tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget" aria-disabled="false" rel="signature"><a class="oo-ui-buttonElement-button" role="button" title="Подпись с отметкой времени" tabindex="0" aria-disabled="false" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-signature"></span><span class="oo-ui-labelElement-label"></span></a></span>'
	  ); 
	}
	// добавление панели [Больше+]
	if (mw.user.getName()!== 'Starit')
	{
		$('#wikiEditor-section-main div.group-codemirror').prepend(
			'<span onclick="ShowEditTools();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_EditTools"><a class="oo-ui-buttonElement-button" role="button" title="Вставка вики-текста" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
		); 
		// добавление чёрной подложки для панели [Больше+]
		$('div.mw-editTools').after('<div id="EditTools_LayerBG"></div>').addClass('EditTools_FadeIn');
		// добавление заголовка на панель [Больше+]
		$('#editpage-specialchars').prepend('<h2 class="TextOrange">Вставка вики-текста</h2>');
		$('div.mw-editTools a, #EditTools_LayerBG').click(function()
		{
			$('div.mw-editTools, #EditTools_LayerBG').css('display', 'none');
		})
	}
}

function CheckINUSE() 
{
    if (wgCategories.includes('Активно редактирующиеся статьи') == true 
        && ( 
            ($('#iduser').text()!== wgUserName || wgUserName=== null) 
            &&
            ($('#iduser').text()!== null)
            &&
      		(['sysop', 'content-moderator' ].indexOf( mw.config.get( 'wgUserGroups' ) ) !== -1)
           )
       )
    {
       return -1;
    }
	else
	{
		return 1;
	}
}