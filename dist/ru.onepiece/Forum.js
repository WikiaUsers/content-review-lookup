// ВЕСЬ КОД ВЗЯТ С ВУКИПЕДИИ И РАЗРЕШЕН К ИСПОЛЬЗОВАНИЮ
// Смотреть также Шаблон:GIF

$('.btn_ForumMessage').unbind('click').click(function()
{
	sSection = 'new';

	ShowForumMessageWindow('0', 1);
});

$('.btn_ForumReply').unbind('click').click(function()
{
	sHeader = $(this).parents('.BlockForumMessage, .BlockForumReply').prev('h6');
	sLink= sHeader.find('.mw-editsection .mw-editsection-divider').next('a').attr('href');
	sID  = sHeader.find('.mw-headline').attr('id');
	sSection = sLink.replace(/.*section=(\d*)\b.*/, '$1');

	ShowForumMessageWindow(sID, 2);
});

mw.loader.load('ext.wikiEditor');

function InsertText( sPre, sPost)
{
	$.wikiEditor.modules.toolbar.fn.doAction(
		$('span.tool').data('context'), 
		{type: 'encapsulate', options: {pre: sPre, post: sPost} }
	);
	
	$('span.tool').data('context');
}

function ShowForumMessageWindow(SenderID, CaptionID)
{
	sTemplateSource = 'Шаблон:GIF';
	sCaption = new Array();
	sCaption[0] = '';
	sCaption[1] = 'Новое сообщение';
	sCaption[2] = 'Ответ на сообщение';
	
	if ( $('#pnl_ForumMessageWindow').length=== 0 )
	{
		$.get( wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } ).then( 
			function( data )
			{
				sMessageWindow= $(data).find( '#temple_ForumMessageWindow').html().replace(/\{caption}/g, sCaption[CaptionID]);

				if (sMessageWindow === undefined)
				{ 
					mw.notify( 'Объект "temple_ForumMessageWindow" на странице "'+ sTemplateSource +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
					return;
				}

				sMessage= $(data).find( '#temple_ForumMessageCell').html();

				if (sMessage === undefined)
				{ 
					mw.notify( 'Объект "temple_ForumMessageCell" на странице "'+ sTemplateSource +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
					return;
				}
				
        		$('body').append('<div id="EditTools_LayerBG" style="display: block;" onclick="CloseForumMessageWindow()"></div>')
					     .append(sMessageWindow);
				
				context= {"$textarea" : $('#wpTextbox1')};
				
				$('span.tool').data('context', context);
				$('#pnl_ForumMessageWindow').attr('data-SenderID', SenderID);
				
				$('#bnt_SaveMessage').click(SaveForumMessage);
				$('#bnt_ShowPreview').click(ShowPreview);
				$('#bnt_ClosePreview').click(ClosePreview);
				$('#btn_CancelMessage').click(CloseForumMessageWindow);
				$('#btn_angle_qoutation_marks').click(function (){InsertText('«','»');});
				$('#btn_bold').click(function (){InsertText('\'\'\'','\'\'\'');});
				$('#btn_italic').click(function (){InsertText('\'\'','\'\'');});
				$('#btn_dash').click(function (){InsertText('—','');});
			},
			function( )
			{
				mw.notify( 'Страница "'+ sTemplateSource +'" не найдена.', { title: 'Ошибка!', type: 'error' } );
			}
		);		
	}
	else
	{
		$('#pnl_ForumMessageWindow, #EditTools_LayerBG').toggle();
		$('#pnl_ForumMessageWindow').attr('data-SenderID', SenderID);
		$('#pnl_ForumMessageWindow th').text(sCaption[CaptionID]);
	}
}

function CloseForumMessageWindow()
{
	$('#pnl_ForumMessageWindow, #EditTools_LayerBG').toggle();
}

function ShowPreview()
{
	if ( $('#wpTextbox1').val() === '' )
	{ 
		mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
		return;
	}
	
	$.post("https://onepiece.fandom.com/ru/api.php", {action: "parse", format: "json", formatversion: "2", prop: "text|indicators|displaytitle|modules|jsconfigvars|categorieshtml|templates|langlinks|limitreporthtml", text: $('#wpTextbox1').val(), pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "oasis", uselang: "ru"})
	.done(function(data)
	{
		$( "#wpTextbox1, #wikiPreview, #bnt_ShowPreview, #bnt_ClosePreview" ).toggle();
		
		$('#wikiPreview').html(data.parse.text);
	});
}

function ClosePreview()
{
  $( "#wpTextbox1, #wikiPreview, #bnt_ShowPreview, #bnt_ClosePreview" ).toggle();
}

function SaveForumMessage()
{
	if ( $('#wpTextbox1').val() === '' )
	{ 
		mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
		return;
	}
	
	SenderID = $('#pnl_ForumMessageWindow').attr('data-SenderID');

    $.get( wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } ).then( 
        function( data )
        {
            sMessage= $(data).find( '#temple_ForumMessageCell').html();
            
            if (sMessage === undefined)
            {
				mw.notify( 'Объект "temple_ForumMessageCell" на странице '+ sTemplateSource +' не найден.', { title: 'Ошибка!', type: 'error' } ); 
				return;
			}

			dNow = new Date();
			iDay = dNow.getDate();
			iMon = dNow.getMonth()+1;
			iYear = dNow.getFullYear();
			iHour = dNow.getHours();
			iMin = dNow.getMinutes();
			iSec = dNow.getSeconds();
			
			sMessageDateTime= iDay+'.'+ iMon +'.'+ iYear +' в '+ iHour +':'+ iMin;
			sMessageID= 'mes_'+ wgUserId +'-'+ iHour +'-'+ iMin +'-'+ iSec;
			
			sMessageText = $('#wpTextbox1').val();
			
			sMessage= sMessage.replace(/\{messageid}/g, sMessageID).replace(/\{username}/g, '[[Участник:'+wgUserName+'|'+wgUserName+']]').replace(/\{datetime}/g, sMessageDateTime).replace(/\{messagetext}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');
			
			sToken= mw.user.tokens.get('csrfToken');
					
            if (sSection === 'new')
            {
				
				mw.notify( 'Сообщение успешно добавлено! Обновите страницу.', { title: 'Ok!', type: 'info' } ); 
			}
			else
			{
				oCurr   = $('#'+SenderID).parents('h6').next('.BlockForumReply, .BlockForumMessage');
				iLevelMax = 5;
				iLevel = Number( oCurr.attr('data-level') );
				iLevel = Math.min(iLevel+1, iLevelMax);
				sMessage= '\n'+ sMessage.replace(/BlockForumMessage/g, 'BlockForumReply').replace(/Level\d/, 'Level'+iLevel ).replace(/data-level="\d"/, 'data-level="'+iLevel+ '"' );
			
				if ( iLevel === 2)
				{
					oLast= oCurr.nextUntil('.BlockForumMessage').filter('.BlockForumReply').last();					
				}
				else
				{
					oLast= oCurr.nextUntil('.BlockForumMessage').filter('[data-level='+ iLevel +'], [data-level='+ Math.min(iLevel+iLevelMax, iLevelMax) +']').last();
				}
			
				if (oLast.length ===0)
				{
					oLast = oCurr;
				}
			
				sSection= oLast.prev('h6').find('.mw-editsection .mw-editsection-divider').next('a').attr('href').replace(/.*section=(\d*)\b.*/, '$1');
				
				mw.notify( 'Ответ успешно добавлен! Обновите страницу.', { title: 'Ok!', type: 'info' } ); 
			}
			
			$.post("https://onepiece.fandom.com/ru/api.php", {action: "edit", title: wgPageName, section: sSection, appendtext: sMessage, token: sToken}); 	
			
			$('#wpTextbox1').val('');
			CloseForumMessageWindow();
		});
}