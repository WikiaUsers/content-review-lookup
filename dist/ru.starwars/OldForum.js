$('.btn_ForumMessage').unbind('click').click(function()
{
	sSection = 'new';

	ShowForumMessageWindow('0', 1);
});

$('.btn_ForumReply').unbind('click').click(function()
{
	sHeader = $(this).parents('.BlockForumMessage, .BlockForumReply').prev('h6');
	sLink= sHeader.find('.mw-editsection a').attr('href');
	sID  = sHeader.find('.mw-headline').attr('id');
	sSection = sLink.replace(/.*section=(\d*)\b.*/, '$1');

	ShowForumMessageWindow(sID, 2);
});

$('.btn_ForumTopic').unbind('click').click(function()
{
	sSection = 'new_topic';

	ShowForumMessageWindow('0', 3);
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
	sCaption[3] = 'Новая тема';
	
	if ( $('#pnl_ForumMessageWindow').length=== 0 )
	{
		$.get( wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } ).then( 
			function( data )
			{
				sMessageWindow= $(data).find( '#temple_ForumMessageWindow').html().replace(/\{Caption}/g, sCaption[CaptionID]);

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
				
	            if (sSection === 'new_topic')
	            {
	            	$('#block_NewTopic').css('display', 'block');
				}
				
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
				$('#btn_postscript_canon').click(function (){InsertText('[[/Канон|',']]');});
				$('#btn_square_brackets').click(function (){InsertText('[[\|',']]');});
				$('#btn_square_brackets_only').click(function (){InsertText('[[',']]');});
				$('#btn_ref').click(function (){InsertText('<ref>','</ref>');});
				$('#btn_quote').click(function (){InsertText('{{Цитата|','||}}');});
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
	
	$.post("https://starwars.fandom.com/ru/api.php", {action: "parse", format: "json", formatversion: "2", prop: "text|indicators|displaytitle|modules|jsconfigvars|categorieshtml|templates|langlinks|limitreporthtml", text: $('#wpTextbox1').val(), pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "fandomdesktop", uselang: "ru"})
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

function LoadCell(i, sPage, data)
{
	sCell = new Array();
  sCell[0] = '';
	sCell[1] = '#temple_ForumMainCell';
	sCell[2] = '#temple_ForumMessageCell';
  sCell[3] = '#kika';
 
	sMessage= $(data).find( sCell[i] ).html();
  
	if (sMessage === undefined)
	{
	  mw.notify( 'Объект "'+sCell[i]+'" на странице "'+ sPage +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
	  return 0;
	}
  
	return sMessage;
}

function SaveForumMessage()
{
	if ( $('#wpTextbox1').val() === '' )
	{ 
		mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
		return;
	}

  $.get( wgScript, { title: sTemplateSource, action: 'raw', ctype: 'text/plain' } ).then( function( data )
  {
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

    sToken= mw.user.tokens.get('csrfToken');

    if (sSection === 'new')
    {
      sMessage= LoadCell(2, sTemplateSource, data);
      
      if ( sMessage=== 0 )
      {
        return;
      }

      sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+wgUserName+'|'+wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');

      mw.notify( 'Обновите страницу.', { title: 'Сообщение успешно добавлено!', type: 'info' } ); 

      $.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: wgPageName, section: sSection, appendtext: sMessage, token: sToken}); 	
    }
    
    if (Number.isInteger( Number(sSection) ) )
    {
			sMessage= LoadCell(2, sTemplateSource, data);
      
      if ( sMessage=== 0 )
      {
        return;
      }
      
			SenderID = $('#pnl_ForumMessageWindow').attr('data-SenderID');
      oCurr   = $('#'+SenderID).parents('h6').next('.BlockForumReply, .BlockForumMessage');
      iLevelMax = 5;
      iLevel = Number( oCurr.attr('data-level') );
      iLevel = Math.min(iLevel+1, iLevelMax);

	  	sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+wgUserName+'|'+wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');
	  
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

      sSection= oLast.prev('h6').find('.mw-editsection a').attr('href').replace(/.*section=(\d*)\b.*/, '$1');

      mw.notify( 'Обновите страницу.', { title: 'Ответ успешно добавлен!', type: 'info' } ); 
      
      $.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: wgPageName, section: sSection, appendtext: sMessage, token: sToken}); 	
    }

    if (sSection === 'new_topic')
    {
      sMessage= LoadCell(1, sTemplateSource, data);
      
      if ( sMessage=== 0 )
      {
        return;
      }
      
      sTopic = $('#input_NewTopic').val();
      
      if ( sTopic === '' )
      { 
        mw.notify( 'Введите название темы!', { title: 'Внимание!', type: 'warn' } ); 
        return;
      }
      
	  sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+wgUserName+'|'+wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'').replace(/\{Topic}/g, sTopic).replace(/\{TopicCategory}/g, wgTitle).replace(/\{TopicLevelName}/g, wgTitle);
      
      mw.notify( 'Обновите страницу.', { title: 'Тема успешно создана!', type: 'info' } ); 

      $.post("https://starwars.fandom.com/ru/api.php", {action: "edit", title: 'Forum:'+sTopic, text: sMessage, token: sToken}); 	
    }

		$('#input_NewTopic').val('');
    $('#wpTextbox1').val('');
    CloseForumMessageWindow();
  });
}