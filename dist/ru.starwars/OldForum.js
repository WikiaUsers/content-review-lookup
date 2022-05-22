/*
Страница скриптов для вывода на экран окон для написания сообщений и ячеек с написанными ссообщениями. Макеты окна и ячеек хранятся на странице-хранилище (Шаблон:GIF) в виде "сырой" (блоке <PRE>) HTML-разметки.

Используется преимущественно на страницах пространства Forum, но также может работать и на других пространствах.
*/
// страница-хранилище, с разметкой окна в HTML-виде
sTemplateSource = 'Шаблон:GIF';
sSection = 'new';

// кнопка для вызова окна нового сообщения. Добавляет на страницу новый раздел с заголовком (невидимым) в котором хранится дата и время сообшения + и id автора сообщения
$('.btn_ForumMessage').unbind('click').click(function()
{
	// специальное значение для создания нового раздела. Должно быть только "new"
	sSection = 'new';
	// непосредственно вызов окна сообщения
	ShowForumMessageWindow('0', 1);
});

// кнопка для вызова окна ответа на сообщение. Добавляет на страницу новый подраздел с заголовком к конкретному разделу. Т.о. выстраивается дерево вложенных ответов
$('.btn_ForumReply').unbind('click').click(function()
{
	// поиск заголовка сообщения, на которое нужно ответить
	sHeader = $(this).parents('.BlockForumMessage, .BlockForumReply').prev('h6');
	// поиск ссылки "Править" в заголовке
	sLink= sHeader.find('.mw-editsection a').attr('href');
	// поиск атрибута id в ссылке
	sID  = sHeader.find('.mw-headline').attr('id');
	// поиск номера раздела (сообщения, на которое нужно ответить) в атрибуте id после ключевого слова "section" и до границы слова
	sSection = sLink.replace(/.*section=(\d*)\b.*/, '$1');
	// непосредственно вызов окна сообщения
	ShowForumMessageWindow(sID, 2);
});

// кнопка для вызова окна для создания новой темы на форуме
$('.btn_ForumTopic').unbind('click').click(function()
{
	// значение для создания нового раздела
	sSection = 'new_topic';
	// непосредственно вызов окна сообщения
	ShowForumMessageWindow('0', 3);
});

//загрузка на страницу страницы-дополнения "wikiEditor"
mw.loader.load('ext.wikiEditor');

/* функция вставки символа в текстовое поле при щелчке по кнопке
sPre - текст, что вставляется ДО курсора
sPost - ПОСЛЕ курсора

Кнопки должны быть выполнены в виде тегов <SPAN> с классом TOOL
*/
function InsertText( sPre, sPost)
{
	// привязка функции вставки текст к кнопкам
	$.wikiEditor.modules.toolbar.fn.doAction(
		$('span.tool').data('context'), 
		{type: 'encapsulate', options: {pre: sPre, post: sPost} }
	);
	// закрепление вставляемого текста к кнопкам  
	$('span.tool').data('context');
}

/*
вызов окна сообщения
SenderID - id раздела, на который нужно ответить. 0, если вызывается не при ответах
CaptionID - id заголовка в окне
*/
function ShowForumMessageWindow(SenderID, CaptionID)
{
	// массив заголовков окна
	sCaption = new Array();
	sCaption[0] = '';
	sCaption[1] = 'Новое сообщение';
	sCaption[2] = 'Ответ на сообщение';
	sCaption[3] = 'Новая тема';
	
	// если окна сообщения еще нет на странице (при первичной загрузке)
	if ( $('#pnl_ForumMessageWindow').length=== 0 )
	{
		// запрос на чтение HTML-разметки окна со страницы-хранилища
		$.get( mw.config.values.wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } ).then( 
			function( data ) // данные, полученные при чтении
			{
				// подстановка заголовка окна в HTML-разметку
				sMessageWindow= $(data).find( '#temple_ForumMessageWindow').html().replace(/\{Caption}/g, sCaption[CaptionID]);
				
				// если на странице-хранилище не обнаружилось нужной разметки - выход с предупреждением
				if (sMessageWindow === undefined)
				{ 
					mw.notify( 'Объект "temple_ForumMessageWindow" на странице "'+ sTemplateSource +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
					return;
				}
				
				// чтение HTML-разметки для ячейки, в которой будет выводиться сообщение/ответ после сохранения
				sMessage= $(data).find( '#temple_ForumMessageCell').html();
				
				// если на странице-хранилище не обнаружилось нужно разметки - выход с предупреждением
				if (sMessage === undefined)
				{ 
					mw.notify( 'Объект "temple_ForumMessageCell" на странице "'+ sTemplateSource +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
					return;
				}
				
				// добавление на страницу окна сообщения и тёмного фона
        		$('body').append('<div id="BlockScreenBG" style="display: block;" onclick="CloseForumMessageWindow()"></div>')
					     .append(sMessageWindow);
					     
				// при создании новой темы в окне сообщения показывать поле для ввода заголовка
	            if (sSection === 'new_topic')
	            {
	            	$('#block_NewTopic').css('display', 'block');
				}
				
				// назначение текстового поля с id #wpTextbox1 объектом, куда вставляется текст при щелчке по кнопке
				context= {"$textarea" : $('#wpTextbox1')};
				// привязка  текстового поля к кнопкам (их данным под именем "context")
				$('span.tool').data('context', context);
				// внесение id раздела, на который нужно ответить, в окно сообщения
				$('#pnl_ForumMessageWindow').attr('data-SenderID', SenderID);
				
				// добавление кнопок в окно сообщения 
				$('#bnt_SaveMessage').click(SaveForumMessage);
				$('#bnt_ShowPreview').click(ShowPreview);
				$('#bnt_ClosePreview').click(ClosePreview);
				$('#btn_CancelMessage').click(CloseForumMessageWindow);
				$('#btn_angle_qoutation_marks').click(function (){InsertText('«','»');});
				$('#btn_bold').click(function (){InsertText('\'\'\'','\'\'\'');});
				$('#btn_italic').click(function (){InsertText('\'\'','\'\'');});
				$('#btn_dash').click(function (){InsertText('—','');});
				$('#btn_postscript_canon').click(function (){InsertText('[[/Канон|',']]');});
				$('#btn_square_brackets').click(function (){InsertText('[[\|',']]');});
				$('#btn_square_brackets_only').click(function (){InsertText('[[',']]');});
				$('#btn_ref').click(function (){InsertText('<ref>','</ref>');});
				$('#btn_quote').click(function (){InsertText('{{Цитата|','||}}');});
			},
			// если страница-хранилище не найдена -- сообщение об ошибке
			function( )
			{
				mw.notify( 'Страница "'+ sTemplateSource +'" не найдена.', { title: 'Ошибка!', type: 'error' } );
			}
		);		
	}
	// если окна сообщения уже есть на странице, оно просто становистя видимым 
	else
	{
		$('#pnl_ForumMessageWindow, #BlockScreenBG').toggle();
		$('#pnl_ForumMessageWindow').attr('data-SenderID', SenderID);
		$('#pnl_ForumMessageWindow th').text(sCaption[CaptionID]);
	}
}

// сокрытие окна сообщения без удаления его со страницы
function CloseForumMessageWindow()
{
	$('#pnl_ForumMessageWindow, #BlockScreenBG').toggle();
}

// отображение блока с предосмотром
function ShowPreview()
{
	// если тест сообщения не введен
	if ( $('#wpTextbox1').val() === '' )
	{ 
		mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
		return;
	}
	
	// запрос на страницу api.php для конвертации вики-разметки в HTML. 
	//Документация по запросу хранися на странице https://starwars.fandom.com/ru/api.php
	$.post("https://starwars.fandom.com/ru/api.php", {action: "parse", format: "json", formatversion: "2", prop: "text|indicators|displaytitle|modules|jsconfigvars|categorieshtml|templates|langlinks|limitreporthtml", text: $('#wpTextbox1').val(), pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "fandomdesktop", uselang: "ru"})
	.done(function(data) // при успешном запросе
	{
		// на окна сообщения скрываются/отображаются кнопки 
		$( "#wpTextbox1, #wikiPreview, #bnt_ShowPreview, #bnt_ClosePreview" ).toggle();
		// в блоке предосмотра отображается сгенерированный HTML
		$('#wikiPreview').html(data.parse.text);
	});
}

// сокрытие блока с предосмотром
function ClosePreview()
{
  $( "#wpTextbox1, #wikiPreview, #bnt_ShowPreview, #bnt_ClosePreview" ).toggle();
}

/*
чтение HTML-разметки для ячейки с текстом новой темы или сообшения/ответа
- i -- id ячейки
- sPage -- название страницы-хранилища
- data -- скоп данных, заранее полученных со страницы-хранилища
*/
function LoadCell(i, sPage, data)
{
	// массив с id ячеек
	sCell = new Array();
	sCell[0] = '';
	sCell[1] = '#temple_ForumMainCell';	// id ячейки с текстом новой темы
	sCell[2] = '#temple_ForumMessageCell';// id ячейки с текстом сообшения/ответа
	
	// поиск ячейки в скопе данных "data"
	sMessage= $(data).find( sCell[i] ).html();
	
	// если ячейка не найдена -- сообщение об ошибке, выход
	if (sMessage === undefined)
	{
	  mw.notify( 'Объект "'+sCell[i]+'" на странице "'+ sPage +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
	  return 0;
	}
	
	return sMessage;
}

/*
запись темы/сообщения/ответа
- sMessageText -- текст сообщения
- sPageName -- страница, куда нужно внести текст
*/
function SaveForumMessage(sMessageText, sPage)
{
	// если тест сообщения не введен -- сообщение об ошибке, выход
	if ( $('#wpTextbox1').val() === '' )
	{ 
		mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
		return;
	}
  
	//текст темы/сообщения/ответа
	if (sMessageText === undefined)
	{
		// если не указан, берется из поля wpTextbox1 ИЛИ присваивается пустой текст
		sMessageText = $('#wpTextbox1').val() || '';
	}
	
	//страница для записи
	if (sPage === undefined)
	{
		// если не указана, берется текущая
		sPage = mw.config.values.wgPageName;
	}

	// запрос на чтение HTML-разметки окна со страницы-хранилища
	$.get( mw.config.values.wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } )
	.then( function( data ) // данные, полученные при чтении
	{
		// текущие дата и время
	    dNow = new Date();
	    iDay = dNow.getDate();
	    iMon = dNow.getMonth()+1;
	    iYear = dNow.getFullYear();
	    iHour = dNow.getHours();
	    iMin = dNow.getMinutes();
	    iSec = dNow.getSeconds();
	    // текущие дата и время одной строкой
		sMessageDateTime= iDay+'.'+ iMon +'.'+ iYear +' в '+ iHour +':'+ iMin;
		// добавление в строку id автора темы/сообщения/ответа
		sMessageID= 'mes_'+ mw.config.values.wgUserId +'-'+ iHour +'-'+ iMin +'-'+ iSec;
		// токен автора темы/сообщения/ответа
		sToken= mw.user.tokens.get('csrfToken');
		
		// если в sSection хранится "new" -- новое сообшение
		if (sSection === 'new')
		{
			//загрузка HTML-разметки для ячейки сообшения
			sMessage= LoadCell(2, sTemplateSource, data);
		
			if ( sMessage=== 0 )
			{
				return;
			}
			
			// подстановка id. имения автора сообщения, текста сообщения и пр. в HTML-разметку ячейки
			sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+mw.config.values.wgUserName+'|'+mw.config.values.wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');

      // вывод сообщения о записи
			mw.notify( 'Обновите страницу.', { title: 'Сообщение успешно добавлено!', type: 'info' } ); 
			// запрос на запись сообщения в БД вики
			$.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: sPage, section: sSection, appendtext: sMessage, token: sToken}); 	
		}
		
		// если в sSection хранится число -- ответ на сообшение
		if (Number.isInteger( Number(sSection) ) )
		{
			//загрузка HTML-разметки для ячейки ответа
			sMessage= LoadCell(2, sTemplateSource, data);
			
			if ( sMessage=== 0 )
			{
				return;
			}
			
			// внесение id раздела, на который нужно ответить, в окно сообщения
			SenderID = $('#pnl_ForumMessageWindow').attr('data-SenderID');
			// поиск заголовка раздела, на который отвечают
			oCurr   = $('#'+SenderID).parents('h6').next('.BlockForumReply, .BlockForumMessage');
			// макс. вложенность ответов
			iLevelMax = 5;
			// поиск уровня вложенности раздела, на который нужно ответить
			iLevel = Number( oCurr.attr('data-level') );
			// у ответа уровень вложенности больше на 1, но не больше 5
			iLevel = Math.min(iLevel+1, iLevelMax);
			
			// подстановка id., имени автора ответа и пр. в HTML-разметку ячейки ответа
			sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+mw.config.values.wgUserName+'|'+mw.config.values.wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');
			// подстановка номер вложенности в HTML-разметку ячейки
			sMessage= '\n'+ sMessage.replace(/BlockForumMessage/g, 'BlockForumReply').replace(/Level\d/, 'Level'+iLevel ).replace(/data-level="\d"/, 'data-level="'+iLevel+ '"' );
			
			// если уровень вложенности = 2, ответ записывается после последнего сообщения на странице
			if ( iLevel === 2)
			{
				oLast= oCurr.nextUntil('.BlockForumMessage').filter('.BlockForumReply').last();	
			}
			// иначе вклинивается между сообщениями или между ответами с предыдущиим уровнем вложенности
			else
			{
				oLast= oCurr.nextUntil('.BlockForumMessage').filter('[data-level='+ iLevel +'], [data-level='+ Math.min(iLevel+iLevelMax, iLevelMax) +']').last();
			}
			// если последнего сообщения еще нет, ответ пишется после 1-го сообщения
			if (oLast.length ===0)
			{
				oLast = oCurr;
			}
			
			// поиск номера раздела (сообщения, на которое нужно ответить) в атрибуте id после ключевого слова "section" и до границы слова
			sSection= oLast.prev('h6').find('.mw-editsection a').attr('href').replace(/.*section=(\d*)\b.*/, '$1');
			// вывод сообщения о записи
			mw.notify( 'Обновите страницу.', { title: 'Ответ успешно добавлен!', type: 'info' } ); 
			// запрос на запись ответа в БД вики
			$.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: mw.config.values.wgPageName, section: sSection, appendtext: sMessage, token: sToken}); 	
		}
		
		// если в sSection хранится "new_topic" -- создание новой темы
		if (sSection === 'new_topic')
		{
			//загрузка HTML-разметки для ячейки темы
			sMessage= LoadCell(1, sTemplateSource, data);
		
			if ( sMessage=== 0 )
			{
				return;
			}
		
			// чтение названия новой темы
			sTopic = $('#input_NewTopic').val();
			
			// если название не заполнено - ошибка и выход
			if ( sTopic === '' )
			{ 
				mw.notify( 'Введите название темы!', { title: 'Внимание!', type: 'warn' } ); 
				return;
			}
			
			// подстановка id., имени автора ответа и пр. в HTML-разметку ячейки темы
			sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+mw.config.values.wgUserName+'|'+mw.config.values.wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'').replace(/\{Topic}/g, sTopic).replace(/\{TopicCategory}/g, mw.config.values.wgTitle).replace(/\{TopicLevelName}/g, mw.config.values.wgTitle);
			
			// вывод сообщения о записи
			mw.notify( 'Обновите страницу.', { title: 'Тема успешно создана!', type: 'info' } );
			// запрос на запись ответа в БД вики
			$.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: 'Forum:'+sTopic, text: sMessage, token: sToken}); 
		}
		// очистка полей ввода
		$('#input_NewTopic').val('');
	    $('#wpTextbox1').val('');
	    
	    // сокрытие окна 
	    CloseForumMessageWindow();
  });
}