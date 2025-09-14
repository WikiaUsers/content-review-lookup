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