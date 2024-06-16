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
	// окно с напоминаниями об изменениях в обсуждениях страниц
	ShowRecentChangesWindow();

	// щелчок по самодельному переключателю
	$('.btn_Trigger').unbind().click(function( )
	{
	  $(this).parent().find('.btn_Trigger').removeClass('Active');
	  $(this).addClass('Active');
	  $('#'+ $(this).attr('data-id') ).parent().children().hide();
	  $('#'+ $(this).attr('data-id') ).show( 400 );
	});

	// скрыть заголовок на Заглавной
	if (RLCONF.wgPageName === 'Заглавная страница')
	{
	  $('.page-header__bottom').css('display', 'none');
	}
	
	// если на странице есть слайд-шоу
	if ( $("#SlideShowGallery").length > 0)
	{
		importScript('MediaWiki:SlideShow.js');
	}
	
	addHideButtons();

	// случайный пункт из списка ссылок
	iImgIndex= Math.floor( Math.random() * 17);
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
    
	// сам прокрутчик
	$(".global-navigation").prepend("<div id='Scroller' title='Панель быстрой навигации по странице'></div>");	
	// иконка прокрутчика
	$(".global-navigation").prepend("<div id='ScrollerText' ></div>");	
	
	// вызов функций прокруткаи страницы для загрузки соот-щей иконки
	$(document).scroll();
 
    // функция при щелчке
    $(" #Scroller, #ScrollerText").click (function ()
    {
		iPosition = $( document ).scrollTop();
		
		if (iPosition === 0) {
			// прокрутка документа, не доходя но "подвала"
			$(document).scrollTop( $( document ).height() /*- $( "footer.wds-global-footer" ).height() - $( "#mixed-content-footer" ).height() */- document.documentElement.clientHeight  );
		}
		else{
			// прокрутка документа в самый верх
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
    if (RLCONF.wgCanonicalSpecialPageName === 'Upload') 
    {
        importScript('MediaWiki:Wikificator.js');
        
        // список лицензий
        var selector = document.getElementById("wpLicense");
        // поле краткого описания изображения
        var memo ;
        // шаблон выбранной лицензии 
        var selection;
		
		$('#mw-htmlform-source').before
		(
		  '<div id="UploadFileURLContainer" >'+
		'<input id="btn_OpenURLContainer" value="Указать URL файла" onclick="OpenURLContainer()" type="button" style=" cursor: pointer;" class="wds-button">'+
		  '<table style="display: none;" id="tbl_UploadFileURL">'+
			'<tr><td width="100%">'+
			  '<label id="lbl_UploadFileURL">URL файла, расположенного на Wookieepedia <small>(типы PNG, GIF, JPG, JPEG, WEBP, ICO, SVG)</small>:</label>'+
			  '<input id="edit_UploadFileURL" name="edit_UploadFileURL" size="60" class="NewStyleMemo" placeholder="Вставьте сюда URL файла и нажмите кнопку Загрузить" aria-disabled="false">'+
			  '</td>'+
			  '<td><div class="mw-toolbar-editbutton-big" title="Загрузить файл по URL" id="btn_UploadFileURL" onclick="UploadFileURL()">Загрузить</div></td>'+
			'</tr>'+
		  '</table>'+
		  '</div>'+
		'<label><small>или загрузите исходный файл непосредственно со своего устройства</small></label>'
		);

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
    if (RLCONF.wgCanonicalSpecialPageName === 'Movepage') 
    {
        $('input[name=wpMove]').click(function() {
            alert('Не забудьте переименовать страницу изображений!');
        });
    }

    // если на странице есть шаблон {inuse}
    if (CheckINUSE())
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
	
	// если страница редактируется или если открыта страница форума
	if (RLCONF.wgAction === 'edit' || RLCONF.wgAction === 'submit' || RLCONF.wgCanonicalNamespace === 'Forum') 
	{
		$.when( mw.loader.using( 'ext.wikiEditor' ), $.ready).then( SetToolbar );
		
	    importScript('MediaWiki:Wikificator.js');
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
    $('.insertusername').html(RLCONF.wgUserName);
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
	  ).append(
		'<span onclick="InsertText(\'{{Цитата|\',\'||}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_quote"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон цитаты" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="InsertText(\'\\n{{Interlang\\n|en=\',\'\\n}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_interlang"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон межъязыковых ссылок" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="Wikify(\'WIKIFY\');" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_wikifikator2"><a class="oo-ui-buttonElement-button" role="button" title="Вукификатор" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-link"></span></a></span>'+
		'<span onclick="CopyEngArticleInfo();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_copy_engcode"><a class="oo-ui-buttonElement-button" role="button" title="Скопировать код оригинальной статьи" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-link"></span></a></span>'
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
		$('#wikiEditor-section-main div.group-insert').append(
			'<span onclick="ShowEditTools();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_EditTools"><a class="oo-ui-buttonElement-button" role="button" title="Вставка вики-текста" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
		); 
		// добавление чёрной подложки
		$('body').append('<div id="BlockScreenBG" class="BlockHideable"></div>');
		// бодавление под. классов к панели Больше [+]
		$('div.mw-editTools').addClass('Restandart').addClass('BlockHideable');
		// добавление заголовка на панель [Больше+]
		$('div.mw-editTools a, #BlockScreenBG, #pnl_InfoboxInsertWindow .btn_Charinsert').click(function()
		{
			$('.BlockHideable').fadeOut();
		})
	}
	$('#wikiEditor-section-main div.group-codemirror').append(
		'<span onclick="ShowInfoboxInsertWindow();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_InfoboxInsert"><a class="oo-ui-buttonElement-button" role="button" title="Вставка инфобокса" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
	); 
	
}

// проверка на наличие в статье шаблона {Inuse} и имени уастника
function CheckINUSE() 
{
	// если статья не входит в категорию активно редактирующихся -- выход
	if (RLCONF.wgCategories.includes('Активно редактирующиеся статьи') == false)
	{ 
		return false;
	}
	// если статью просматривает модератор или админ -- выход
	if (['sysop', 'content-moderator' ].indexOf( mw.config.get( 'wgUserGroups' ) ) == 1) 
	{ 
		return false;
	}	
	// если статью никто не зарезервировал -- выход
	if ( $('#iduser').text() === undefined ) 
	{ 
		return false;
	}	
	// если статью просматривает участник, не зарезервировавший её, или участник-аноним 
    if ( $('#iduser').text()!== RLCONF.wgUserName || RLCONF.wgUserName === undefined )
    {
       return true;
    }
	
	return false;
}

function ShowRecentChangesWindow()
{
	d = new Date();

	if (localStorage.SWRUWikiRC == undefined)
	{
		sLastDate = d.getFullYear() +'-'+ ('0' + d.getMonth()).slice(-2) +'-'+ ('0' + d.getDate()).slice(-2) +' 00:00:00'+ d.toString().replace(/.*GMT(.\d\d\d\d).*/, '$1') ;
	}
	else
	{
		sLastDate = localStorage.SWRUWikiRC;
	}

	sCurDate = d.getFullYear() +'-'+ ('0' + (d.getMonth()+1)).slice(-2) +'-'+ ('0' + d.getDate()).slice(-2) +' '+ ('0' + d.getHours()).slice(-2) +':'+ ('0' + d.getMinutes()).slice(-2) +':'+ ('0' + d.getSeconds()).slice(-2) + d.toString().replace(/.*GMT(.\d\d\d\d).*/, '$1');
	
	api = new mw.Api();
	
	api.get( {action: 'query',list: 'recentchanges',rcprop: 'title|user|timestamp',rcnamespace: '1|15|110',rclimit: '3',rctoponly: 'true',rcend: sLastDate,format: 'json'} ).done( function ( data )
	{
		rc = data.query.recentchanges,
		i=0,
		s='';
	
		if (rc.length > 0)
		{
			$('body').prepend(
			'<table id="RecentChangesWindow" class="BlockSpoiler2 ColoredCell">'+
				'<tr><th>'+
					'<h2 class="HeaderBlue">'+
						'<small><small>ОБНОВЛЕНИЯ НА ФОРУМЕ / ОБСУЖДЕНИЯХ СТРАНИЦ</small></small>'+
						'<div id="btn_MarkAllAsRead" class="mw-toolbar-editbutton-big" title="Отметить всё как прочитанное" data-curdate="'+ sCurDate +'" >✖</div>'+
					'</h2>'+
				'</th></tr>'+
				'<tr>'+
					'<td><ul id="list_RecentChanges"></ul>'+
				'</td></tr>'+
			'</table>'
			);
		}
		
		for ( i in rc ) 
		{
			d = new Date(rc[i].timestamp);
			s = s + '<li><a href="/ru/wiki/'+ rc[i].title +'">'+ rc[i].title +'</a> <small class="text_Hint">(<a href="/ru/wiki/Участник:'+ rc[i].user +'" class="">'+rc[i].user+'</a> от '+ d.toLocaleString() +')</small></li>'
		}
		
		$('#list_RecentChanges').html(s);
	
		// щелчок по кнопке "Отметить всё как прочитанное" окно с напоминаниями 
		$('#btn_MarkAllAsRead').click(function( )
		{
			localStorage.SWRUWikiRC = $(this).attr('data-curdate');
			$('#RecentChangesWindow').detach();
		});
	} );
}

// смена фона страницы в зависимости от времени суток
(function($) {
    'use strict';
 
    var h = (new Date()).getHours(), s, i;
 
    if (h >= 0 && h <= 5) {
        // Время от 0:00 до 5:59
        s = [
        'https://static.wikia.nocookie.net/ru.starwars/images/2/27/Background_dromund.jpg',
        'https://static.wikia.nocookie.net/ru.starwars/images/d/d7/Backgroung_narshaddaa_night.jpg',
         'https://static.wikia.nocookie.net/ru.starwars/images/1/14/Background_night.jpg',
         'https://static.wikia.nocookie.net/ru.starwars/images/c/c5/Background_Starkiller_1.jpg',
         'https://static.wikia.nocookie.net/ru.starwars/images/6/66/Background_ice_4.jpg',
         'https://static.wikia.nocookie.net/rustarwars/images/f/f1/Green_background_2.jpg',
         'https://static.wikia.nocookie.net/rustarwars/images/f/f8/Background_new_13.jpg'
        ];
    } else if (h > 5 && h <= 6) {
        // Время от 6:00 до 6:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/a/ae/Background_Naboo_morning.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/b/b2/Green_background_3.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/3/3c/Green_background_11.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/0/07/Background_early_morning.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/c/c7/Background_new_10.jpg'
        ];
    } else if (h > 6 && h <= 8) {
        // Время от 7:00 до 8:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/6/6d/Background_8.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/3/38/Background_morning.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/c/ca/Background_Alderaan_1.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/a/a0/Background_Hoth_9.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/9/99/Background_new_5.jpg'
        ];
    } else if (h > 8 && h <= 9) {
        // Время от 9:00 до 9:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/9/90/Background_ice_1.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/b/b2/Art_Challenge_2016,_Andrew_Bosley_1.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/3/37/Green_background_4.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/69/Green_background_6.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/8/81/Background_new_4.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/65/Background_new_9.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/7/78/Background_Hoth_2.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/d/d9/Background_day_2.jpg'
        ];
    } else if (h > 9 && h <= 11) {
        // Время от 10:00 до 11:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/7/78/Background_Hoth_2.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/e/ee/Background_ice_5.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/d/dc/Green_background_9.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/e/e9/Background_new_12.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/d/dc/Background_new_16.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/d/d9/Background_day_2.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/8/8b/Background_ice_3.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/1/15/Background_day.jpg'
        ];
    } else if (h > 11 && h <= 13) {
        // Время от 12:00 до 13:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/1/15/Background_day.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/8/82/Background_day_war.jpg',	
            'https://static.wikia.nocookie.net/ru.starwars/images/b/bd/Background_Hoth_3.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/a/a9/Background_Starkiller_2.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/2/24/Background_Hoth_11.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/8/8b/Background_ice_3.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/d/dc/Background_new_16.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/a/a1/Background_new_17.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/5/51/Background_Alderaan_3.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/1/10/Green_background_10.jpg'
        ];
    } else if (h > 13 && h <= 17) {
        // Время от 14:00 до 17:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/1/10/Green_background_10.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/b/b9/Background_day_corellia.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/8/80/Background_Hoth_5.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/5/51/Background_Alderaan_3.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/0/04/Background_ice_2.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/4/4c/Art_Challenge_2016,_MAREK_RAKU%C4%8C%C3%81K_1.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/f/f6/Background_Alderaan_2.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/d/d2/Background_Hoth_6.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/a/ad/Background_Hoth_8.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/6b/Background_new_3.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/a/a1/Background_new_17.jpg'
        ];
    } else if (h > 17 && h <= 19) {
        // Время от 18:00 до 19:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/1/15/Background_evening_transport.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/66/Art_Challenge_2016,_Daniel_Kyle_1.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/d/dc/Background_5.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/a/a8/Background_6.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/f/f9/Background_7.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/a/a4/Background_evening.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/4/42/Background_new_1.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/4/49/Background_new_2.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/8/81/Background_new_6.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/7/77/Background_new_7.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/c/c2/Background_new_8.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/a/a5/Background_new_11.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/e/e3/Background_new_15.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/6b/Background_new_3.jpg'
        ];
    } else {
        // Время от 20:00 до 23:59
        s = [
            'https://static.wikia.nocookie.net/ru.starwars/images/4/4c/Background_late.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/6/6c/Background_tor_1.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/f/f6/Background_cantina_1.jpg',
            'https://static.wikia.nocookie.net/ru.starwars/images/6/6b/Background_Hoth_10.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/e/e0/Background_Hoth_7.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/6/6a/Background_new_14.jpg',
            'https://static.wikia.nocookie.net/rustarwars/images/0/0f/Background_new_18.jpg'
        ];
    }
  
    i = Math.floor( Math.random() * s.length );
 
    $('body.skin-fandomdesktop').css({
        'background-image': 'url(' + s[i] +')',
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed'
    });
})(this.jQuery);