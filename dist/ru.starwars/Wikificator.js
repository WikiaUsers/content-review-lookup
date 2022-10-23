// ВНИМАНИЕ! Внося изменения в код, не забывайте обновлять справку на странице [[Вукипедия:Викификатор]] 
var txt = ''        // временное хранилище вукифицируемого текста
// сообщения!
var wmDontWikify = 'Пожалуйста, не обрабатывайте Викификатором реплики других участников. Вы уверены, что хотите продолжить?';
// страница-хранилище, с разметкой окна в HTML-виде
var sTemplateSource = 'Шаблон:GIF';

// ---------------------------------------------------------------------------------

/* доп. запрос на вывод панели с категориями при щелчке на предосмотр статьи */
$('#wpPreview').click(function() 
{
	$('#catlinks').detach();
	
	txt= String( $('#wpTextbox1').val().match(/\[\[\s?[кК]атегория:.*?\s?\]\]/g) );

	$.post("https://starwars.fandom.com/ru/api.php", {
    action: "parse", format: "json", formatversion: "2", prop: "categorieshtml", text: txt, pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "oasis", uselang: "ru"}).done(function(data) 
	{
		txt = data.parse.categorieshtml;
		$('#wikiPreview').after(txt);
	});
});

/* копировние кода статьи с анг. вики по указанному анг. названию*/
function CopyEngArticleInfo()
{
	// поиск в адрессной строке переменной sous с названием анг. статьи
	result = location.search.match(/&sous=(.*)/);
	
	if (result != null)
	{
	  s = result[0].replace(/.*=/, '');
	  
	  console.log(s);
	}
	else
	{
	  s = prompt('Укажите англоязычную статью');
	}

	if (s !== null && s !== undefined) 
	{
		$.get( 'https://starwars.fandom.com/index.php', { title: s, action: 'raw', ctype: 'text/plain' } )
		.then(function( data )			
		{		
			$('#wpTextbox1').val(data.replace(/\|ru=.+\n/, '' ).replace(/\{\{Interlang/, '{{Interlang\n|en='+s));
			mw.notify( 'Исходный код статьи "'+ s +'" удачно скопирован!' );
			Wikify('WIKIFY');
		},
		function()
		{
			mw.notify( 'Указанная статья "'+ s +'" на Wookieepedia не найдена!', { title: 'Ошибка!', type: 'error' } );
		}
		);
	}
}

/* копировние описания картинки с анг. вики */
function CopyEngImgInfo() 
{
  sArticle= $('#wpUploadFile')[0].files[0].name;
  
  $.get( 'https://starwars.fandom.com/index.php', { title: 'file:'+sArticle, action: 'raw', ctype: 'text/plain' } )
  .then( 
        function( data )			
        {			
			$('#wpUploadDescriptionEng').html(data.replace(/\n/g, '<br />'));
			
			$('#wpUploadDescription').val(
			data.replace(/\|attention=/g, '|внимание=').replace(/\|description=/g, '|описание=').replace(/\|source=/g, '|источник=').replace(/\|artist=/g, '|автор=').replace(/\|filespecs=/g, '|спецификация=').replace(/\|licensing=/g, '|лицензирование=').replace(/\|other versions=/g, '|другие версии=').replace(/\|cat artist=/g, '|кат художник=').replace(/\|cat licensee=/g, '|кат лицензиат=').replace(/\|cat subject=/g, '|кат субъект=').replace(/\|cat type=/g, '|кат тип=').replace(/\==.*\n/g, '').replace(/\{\{Information/g, '{{Информация')
			);
			
			mw.notify( 'Описание файла удачно скопировано!' );
        },
        function()
        {
			 mw.notify( 'Файл '+sArticle+' на Wookieepedia не найден!', { title: 'Ошибка!', type: 'error' } );
        }
  );
}

function ShowEditTools()
{
  $('div.mw-editTools, #BlockScreenBG').fadeIn();
}

function InsertText( sPre, sPost){
  $.wikiEditor.modules.toolbar.fn.doAction($('span.tool').data('context'), 
	{type: 'encapsulate', options: {pre: sPre, post: sPost} });
}

function Wikify()
{
    startPos= 0;     // начальная позиция выделенного текста
    endPos= 0;       // конечная позиция выделенного текста
    wmEnNS = [];     // массив анг. названий для автоперевода
    wmLocaleNS = []; // массив рус. названий для автоперевода

    // временное сокрытие кнопок автозамены 
    $('#btn_wikifikator2, #btn_quoter, #btn_AutoChangeApp_Canon, #btn_AutoChangeApp_Legends, #btn_AutoChangeApp_Dates, #btn_AutoChangeApp_RWP, #btn_categorizer').css('visibility', 'hidden');
        
    txtarea = $('#wpTextbox1, #wpUploadDescription')  ;

    // поиск позиций выделенного текста 
    startPos = txtarea.selectionStart;
    endPos   = txtarea.selectionEnd;
    // извлечение выделенного текста 
    txt = txtarea.val().substring(startPos, endPos) ||  txtarea.val();

    if (mw.config.values.wgNamespaceNumber % 2 || mw.config.values.wgNamespaceNumber==4) 
    {
        var sigs = txt.match(/\d\d:\d\d, \d\d? \S{3,9} 20\d\d \(UTC\)/g);
 
        if (sigs && sigs.length > 1)
            if (!confirm(wmDontWikify)) 
                return;
    }

    // искажение вики-тегов, чтобы их не "съела" автозамена
    var nowiki  = ReplaceTags( 'nowiki', "\x03", "\x04" );
    var pre     = ReplaceTags( 'pre', "\x12", "\x13" );
    var code    = ReplaceTags( 'code', "\x1c", "\x1d" );
    var math    = ReplaceTags( 'math', "\x05", "\x06" );
    var gallery = ReplaceTags( 'gallery', "\x14", "\x15" );

    // отброс строки, начинающиеся с пробела
    //    f_space = txt.substr (0, 1);
    //    txt = txt.substr (1, txt.length-1);

    var sp_lines = ReplaceElements( "^( )(.+)$", "\x16", "\x17" );
    //    txt = f_space + txt;

    // корректировка дат в ссылках
    CorrectRanges();

    // отброс шаблонов и внешних ссылок
    var templates = ReplaceElements( "\\{\\{(.|\\r|\\n)+?\\}\\}", "\x18", "\x19" );
    var links     = ReplaceElements( "(\\[\\[)(.*?)(\\||\\]\\])", "\x10", "\x11" );
    var ext_links = ReplaceElements( "\\[(http|https|ftp|tftp|news|nntp|telnet|irc|gopher)://(.*?)\\]", "\x1A", "\x1B");

    // замена дефисов и коротких тире на длинное тире
    txt = txt.replace(/\&(#151|[nm]dash);/g, "—");
    txt = txt.replace(/( |[\f\n\r\t\v\u00A0\u2028\u2029])(-|--|–) /g, "$1— ");
    txt = txt.replace(/(\d)--(\d)/g, "$1—$2");

    // конвертация HTML-тегов в вики-разметку
    txt = txt.replace(/\<\/?(b|strong)\>/gim, "\'\'\'").replace(/\<\/?(i|em)\>/gim, "\'\'").replace(/\<hr ?\/?\>/gi, "----");
    txt = txt.replace(/\<hr ([^\>\/]+?) ?\/?\>/gi, "<hr $1 />").replace(/\<br\/?\>/gi, "<br />").replace(/\<br ([^\>\/]+?) ?\/?\>/gi, "<br $1 />");

    // отброс тегов и их атрибутов
    var attrs = ReplaceElements( '(=)(\\s?)(\\' + '")(.*?)(\\")', "\x0E", "\x0F");
    var tags  = ReplaceElements( "<([^>]*?)>", "\x01", "\x02");

    // автозамена текста регулярными выражениями
    //    ProcessTypography();
    // вставка проделов между знаком = и текстов заголовка
    txt = txt.replace(/^(=+)([ \t\f\v]*)(.*?)([ \t\f\v]*)(=+)$/gm, "$1 $3 $1");

    // вставка символов квадратной и кубической степеней
    txt = txt.replace(/(<sup>2<\/sup>|&sup2;)/g, "²");
    txt = txt.replace(/(<sup>3<\/sup>|&sup3;)/g, "³");
    txt = txt.replace(/(\^2)(\D)/g, "²$2");
    txt = txt.replace(/(\^3)(\D)/g, "³$2");

    // замена правильных HTML-символов на неправильные, чтобы дальше обработать их вместе с остальными неправильными
    txt = txt.replace(/–/g, "-");
    txt = txt.replace(/(“|”|„|\&((la|ra|bd|ld)quo|#132|#147|#148|quot);)/g, "\"");

    // замена двух дефисов подряд на тире
    txt = txt.replace(/(--)(\[\[Участник|\~\~\~)/g, "—$2");

    // замена двух знаков подряд << (меньше, чем) или >> (больше, чем) на соответствующие символы
    txt = txt.replace(/(<<)(\S.+\S)(>>)/g, "\"$2\"");

    // вставка знаков градусов "°", "+-" and "~="
    txt = txt.replace(/(\+[--])|(&plusmn;)/g, "±");
    txt = txt.replace(/(~=)/g, "≈");
    txt = txt.replace(/\&deg;/g, "°");
    txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, "$1$2\u00A0°C");
    txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, "$1$2\u00A0°F");

    // замена трёх точек подряд (...), символов "&hellip;" и "&#133;" на символ троеточия
    txt = txt.replace(/(\.{3}|\&(hellip|#133);)/g, '…');

    // Minus handler
    txt = txt.replace(/(sup\>|sub\>|\s)-(\d)/g, "$1−$2");

    // вставка неразрывного пробела пере тире 
    txt = txt.replace(/(\S) (-|--|–|—) (\S)/g, "$1\u00A0— $3");

    // вставка спецфимволов: ©, ®, ™, §, €, ¥ и £
    txt = txt.replace(/\&copy;/gi, "©");
    txt = txt.replace(/\&reg;/gi, "®");
    txt = txt.replace(/(\((tm|тм)\)|\&trade;)/gi, "™");
    txt = txt.replace(/\&sect;/gi, "§");
    txt = txt.replace (/\&euro;/gi, "€");
    txt = txt.replace (/\&yen;/gi, "¥");
    txt = txt.replace (/\&pound;/gi, "£");

    // корректировка годов
    txt = txt.replace(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-|--|–|—) ?([12]?\d{3})(\W)/g, "$1$2—$4$5");
    txt = txt.replace(/([12]?\d{3}) ?(г\.|гг\.)/g, "$1\u00A0$2");

    // корректировка столетий
    txt = txt.replace(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-|--|–|—) ?([IVX]{1,5})(\W)/g, "$1$2—$4$5");
    txt = txt.replace(/([IVX]{1,5}) ?(в\.|вв\.)/g, "$1\u00A0$2");

    // корректировка сокращений
    txt = txt.replace(/(Т|т)\. ?е\./g, "$1о есть");
    txt = txt.replace(/(Т|т)\. ?к\./g, "$1ак как");
    txt = txt.replace(/(В|в) т\. ?ч\./g, "$1 том числе");
    txt = txt.replace(/и т\. ?д\./g, "и\u00A0т\.\u00A0д\.");
    txt = txt.replace(/и т\. ?п\./g, "и\u00A0т\.\u00A0п\.");
    txt = txt.replace(/(Т|т)\. ?н\./g, "$1\.\u00A0н\.");
    txt = txt.replace(/н\. ?э\./g, "н\.\u00A0э\.");
    txt = txt.replace(/(Д|д)(о|\.) н\. ?э\./g, "$1о\u00A0н\.\u00A0э\.");
    txt = txt.replace(/(\d) ?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]?г|с)\.?( ([^\.А-ЯЁ])|[,;.])(?!\[.*?\|[А-Я].*?\])/g, "$1\u00A0$2$3");
    txt = txt.replace(/(\d) (тыс)([^\.А-Яа-яЁё])/g, "$1\u00A0$2.$3");

    // вставка недостающих пробелов
    txt = txt.replace(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, "$1\u00A0$2\u00A0$3");
    txt = txt.replace(/([А-Я]\.)([А-Я]\.)/g, "$1 $2");
    txt = txt.replace(/(.+\n)(^=)/gim, "$1\n$2");// вставка пустой строки перед заголовком
    txt = txt.replace(/([а-я])(\.)([А-ЯA-Z])/g, "$1$2 $3");
    txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s*)(\,)([а-яa-z\(\«\„\"\[])/g, "$1$3 $4");
    txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s)([\,\;])(\s)([а-яa-z\(\«\„\"\[])/g, "$1$3 $5");
    txt = txt.replace(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, "$1\u00A0$2");
    txt = txt.replace(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, "$1$2");
    txt = txt.replace(/([№§])(\s*)(\d)/g, "$1\u00A0$3");
    txt = txt.replace(/(^|[^ \t])([ \t]+)($|\n)/gm, "$1$3");
    txt = txt.replace(/(\()( +)/g, "$1");
    txt = txt.replace(/( +)(\))/g, "$2");

    // удаление двойных пробелов
    txt = txt.replace(/(\S)([ \t]{2,})([\S\r])/g, "$1 $3");

    // замена прямых кавычек ("") ёлочками («»)
    txt = txt.replace(/([\x01-(\s\|\"]|\/|\+)(\")([^\"]{0,})([^\s\"(\|])(\")/g, "$1«\$3\$4»");

    // замена кавычек-ёлочек в цитатах

    if (/"/.test(txt))
    {
      txt = txt.replace(/([\x01(\s\"])(\")([^\"]{0,})([^\s\"(\|])(\")/g, "\$1«\$3\$4»");
      /*
                  while (/(«)([^»]*)(«)/.test(txt))
                  {
                      txt = txt.replace(/(«)([^»]*)(«)([^»]*)(»)/g, "\$1\$2„\$4“");
                  }
              */
    }

    // восстановление вики-тегов
    RestoreElements( tags, "\x01", "\x02");
    RestoreElements( attrs, "\x0E", "\x0F");
    RestoreElements( ext_links, "\x1A", "\x1B" );
    RestoreElements( links, "\x10", "\x11" );
    RestoreElements( templates, "\x18", "\x19" );
    RestoreElements( sp_lines, "\x16", "\x17" );
    RestoreElements( gallery, "\x14", "\x15" );
    RestoreElements( math, "\x05", "\x06" );
    RestoreElements( code, "\x1c", "\x1d" );
    RestoreElements( pre, "\x12", "\x13" );
    RestoreElements( nowiki, "\x03", "\x04" );

    // вставка пробелов в тезах (только после восстановления символов)
    txt = txt.replace(/^([#\*:]+)([ \t\f\v]*)([^ \t\f\v\*#:])/gm, "$1 $3");

	// загрузка пар автозамены для основного пространства имён
    $.get( mw.config.values.wgScript, { title: 'Шаблон:Wikificator-source', action: 'raw', ctype: 'text/plain' } ).done( function( data )
    {
		oTermSource = data;

        // загрузка пар автозамены для категорий
        $.get( mw.config.values.wgScript, { title: 'Шаблон:Wikificator-source-categ', action: 'raw', ctype: 'text/plain' } ).done( function( data )
        {
			oTermSource = oTermSource + data;	
			// счётчик пар автозамены
			i= 0;
			
            // загрузка  искомого текста автозамены в массив и экранирование прямой черты и квадратных скоб
            $(oTermSource).find('td:nth-child(1)').each( function()
            {
                wmEnNS[i] = $(this).text().replace(/\]\]/g, "\\]\\]").replace(/\|/g, "\\|").replace(/ИЛИ/g, "|");
                i = i+1; 
            });

          	i =0;
            // загрузка  подставляемого текста автозамены в массив
            $(oTermSource).find(' td:nth-child(2)').each( function()
            {
                wmLocaleNS[i] = $(this).text().replace(/\\\[\\\[/g, "[[");
                i = i+1; 
            });
                                           
            // автоманена 
            for (i=0; i < wmEnNS.length ; i++)
            {
				try 
				{
					txt = txt.replace( new RegExp( wmEnNS[i], "gim" ), wmLocaleNS[i]);
				} 
				catch (e) 
				{
					console.log('Ошибка в выражении: ', wmEnNS[i]);
				}
            }
          
            console.log(wmEnNS[45], wmLocaleNS[45]);  
          
            // если нет выделенного текста, викифицируется весь текст
            if (startPos == endPos)
            {
                txtarea.val(txt);
            }
            // иначе только выделенный фрагмент
            else 
            {
                txtarea.val(txtarea.val().substring(0, startPos) + txt + txtarea.val().substring(endPos, txtarea.val().length) );
            }

            // возврат кнопок автозамены на панель
            $('#btn_wikifikator2, #btn_quoter, #btn_AutoChangeApp_Canon, #btn_AutoChangeApp_Legends, #btn_AutoChangeApp_Dates, #btn_AutoChangeApp_RWP, #btn_categorizer').css('visibility', 'visible');
          
        });
    });   
}
// ---------------------------------------------------------------------------------
// проверка поддержки регулярных выражений
/*
function check_regexp()
{
    var reg1 = "code";
    reg1 = reg1.replace(/d/g, "r");
 
    if (reg1 != "core")
    {
        alert(wmCantWork);
        exit;
    }
 
    return ;
}
*/
// ---------------------------------------------------------------------------------
// искажение вики-тегов, чтобы их не "съела" автозамена
// Replace '<replaced_tag> ... </replaced_tag>' ( <br/> )
// with 'opepening_char + tag's counter + closing_char' ('\x03'+1'+'\x04')
function ReplaceTags(replaced_tag, op_char, cl_char )
// @replaced_tag -- тег, который нужно исказить
// @op_char, @cl_char -- открывающий и закрывающий символы соответственно, "безопасные" непечатаемые символы в кодировке unicode
{
    var counter = 0; //счётчик тегов
 
    // маска регулярного выражения
    var pattern = "\\<" + replaced_tag + "\\>(.|\r|\n)+?\<\\/" + replaced_tag + "\\>";
 
    // регулярное выражение, текст которого нужно заменить (между переменными <replaced_tag> и </replaced_tag>)
    var replaced_regexp = new RegExp(pattern , "im");
 
    // Буфер для хранения заменяемых совпадений, т.е. массив из найденных строк переменными <replaced_tag> и </replaced_tag>
    matches_buffer = txt.match( new RegExp(pattern , "gim") );
 
    // пока переменная replaced_regexp не пуста, запускаем цикл
    while (replaced_regexp.test(txt))
    {
        txt = txt.replace(replaced_regexp, op_char + ++counter + cl_char );
    }
 
    return matches_buffer;
}
 
// ---------------------------------------------------------------------------------
function ReplaceElements( req_exp, op_char, cl_char )
// Replace '<replaced_tag> ... </replaced_tag>' ( <br/> )
// with 'opepening_char + tag's counter + closing_char' ('\x03'+1'+'\x04')
// @req_exp - reqular expression to be replaced
// @op_char, @cl_char (opening & closing chars) - "Safe" pair of unicode unprintable characters, that will be used in replacement
{
    var counter = 0; //счётчик тегов
 
    // регулярное выражение, текст которого нужно заменить (многострочный, чувствительный к регистру)
    var replaced_regexp = new RegExp( req_exp , "m" );
 
    // Буфер для хранения заменяемых совпадений (многострочный, чувствительный к регистру, общий)
    matches_buffer = txt.match( new RegExp( req_exp , "gm" ) );
 
    // пока переменная replaced_regexp не пуста, запускаем цикл
    while (replaced_regexp.test(txt))
    {
        txt = txt.replace(replaced_regexp, op_char + ++counter + cl_char );
    }
 
    return matches_buffer;
}
 
// ---------------------------------------------------------------------------------
// восстановление текста, повреждённого после замены трёх символов
function RestoreElements( replaced_buffer, op_char, cl_char )
// @replaced_buffer -- список хаменяемых строк
// @op_char, @cl_char -- открывающий и закрывающий символы соответственно
{
    var counter = 0; // счётчик тегов
 
    // регулярное выражение, текст которого нужно заменить (3 символа: счётчик тегов, открывающий и закрывающий символы)
    var replaced_regexp = new RegExp("\\" +op_char+ "([0-9]*)\\" +cl_char );
 
    // пока переменная replaced_regexp не пуста, запускаем цикл
    while (replaced_regexp.test(txt))
    {
        txt = txt.replace(replaced_regexp, replaced_buffer[counter++]);
    }
 
    return txt;
}
 
// ---------------------------------------------------------------------------------
// корректировка диапазонов годов и столетий в ссылках текста
function CorrectRanges() 
{
    // корректировка годов
    txt = txt.replace(/(?!ISBN)(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, "$1$2—$4$5");
    txt = txt.replace(/(\[\[[12]?\d{3}\]\]) ?(г\.|гг\.)/g, "$1\u00A0$2");
 
    // корректировка столетий
    txt = txt.replace(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, "$1$2—$4$5");
    txt = txt.replace(/(\[\[[IVX]{1,5}\]\]) ?(в\.|вв\.)/g, "$1\u00A0$2");
}


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
	ShowGlassWindow(sID, 2);
});

// кнопка для вызова окна для создания новой темы на форуме
$('.btn_ForumTopic').unbind('click').click(function()
{
	// значение для создания нового раздела
	sSection = 'new_topic';
	// непосредственно вызов окна сообщения
	ShowGlassWindow('0', 3);
});

// кнопка для вызова окна нового сообщения. Добавляет на страницу новый раздел с заголовком (невидимым) в котором хранится дата и время сообшения + и id автора сообщения
$('.btn_ForumMessage').unbind('click').click(function()
{
	// специальное значение для создания нового раздела. Должно быть только "new"
	sSection = 'new';
	// непосредственно вызов окна сообщения
	ShowGlassWindow('0', 1);
});

// отображение списка инфобоксов, доступных для вставки в исходный код статьи
function ShowInfoboxInsertWindow() 
{
	ShowGlassWindow(0,4) ;
}

function ShowGlassWindow(SenderID, CaptionID) 
{

	// массив заголовков окна
	sCaption = new Array();
	sCaption[0] = '';
	sCaption[1] = 'Новое сообщение';
	sCaption[2] = 'Ответ на сообщение';
	sCaption[3] = 'Новая тема';
	sCaption[4] = 'Загрузка кода инфобокса';

	sElements = '';

	// если окна сообщения еще нет на странице (при первичной загрузке)
	if ($('#win_GlassWindow').length === 0)
	{
		// запрос на чтение HTML-разметки окна со страницы-хранилища
		$.get(mw.config.values.wgScript, {title: sTemplateSource, action: 'raw', ctype: 'text/plain'})
			.then(function(data) // данные, полученные при чтении
			{

				// подстановка заголовка окна в HTML-разметку
				sMessageWindow = $(data).find('#temple_GlassWindow').html();

				// если на странице-хранилище не обнаружилось нужной разметки - выход с предупреждением
				if (CheckLoadedElements(sMessageWindow, '#temple_GlassWindow', sTemplateSource) == 0) { return; }

				// подстановка заголовка окна в HTML-разметку
				sMessageWindow = sMessageWindow.replace(/\{Caption}/g, sCaption[CaptionID]);

				// проверка номера заголовка
				switch (CaptionID) 
				{
					// загрузка начинки окна для форума
					case 1: case 2: case 3: 
					LoadForumMessageElements(data, SenderID); 
					break;
					
					// загрузка начинки окна для вставки инфобокса
					case 4:	
					LoadInsertInfoboxElements(data);
					break;
				}

			},
			// если страница-хранилище не найдена -- сообщение об ошибке
			function() 
			{
				mw.notify('Страница "' + sTemplateSource + '" не найдена.', {title: 'Ошибка!',type: 'error'});
			}
		);

	}
	// если окна сообщения уже есть на странице, оно просто становистя видимым 
	else 
	{
		$('#BlockScreenBG, #win_GlassWindow').fadeIn(0);
		$('#win_GlassWindow').attr('data-SenderID', SenderID);
		$('#win_GlassWindow th').text(sCaption[CaptionID]);
	}
}

// сокрытие окна сообщения без удаления его со страницы
function CloseHideable() 
{
	$('.BlockHideable').fadeOut(0);
}

function LoadForumMessageElements(data, SenderID) 
{
	let sElements = $(data).find('#temple_ForumMessageElements').html();

	// если на странице-хранилище не обнаружилось нужной разметки - выход с предупреждением
	if (CheckLoadedElements(sElements, '#temple_ForumMessageElements', sTemplateSource) == 0) { return; }

	sMessageWindow = sMessageWindow.replace(/\{Content}/g, sElements);

	ApplyLoadedElements(sMessageWindow);
	
	// при создании новой темы в окне сообщения показывать поле для ввода заголовка
	if (sSection === 'new_topic')
	{
		$('#block_NewTopic').css('display', 'block');
	}

	// назначение текстового поля с id #wpTextbox1 объектом, куда вставляется текст при щелчке по кнопке
	context= {"$textarea" : $('#wpTextbox1')};
	// привязка	текстового поля к кнопкам (их данным под именем "context")
	$('span.tool').data('context', context);
	// внесение id раздела, на который нужно ответить, в окно сообщения
	$('#win_GlassWindow').attr('data-SenderID', SenderID);

	// добавление кнопок в окно сообщения 
	$('#bnt_SaveMessage').click(function (){SaveForumMessage('', '');} );
	$('#bnt_ShowPreview').click(ShowPreview);
	$('#bnt_ClosePreview').click(ClosePreview);
	$('#btn_CancelMessage').click(CloseHideable);
	$('#btn_angle_qoutation_marks').click(function (){InsertText('«','»');});
	$('#btn_bold').click(function (){InsertText('\'\'\'','\'\'\'');});
	$('#btn_italic').click(function (){InsertText('\'\'','\'\'');});
	$('#btn_dash').click(function (){InsertText('—','');});
	$('#btn_postscript_canon').click(function (){InsertText('[[/Канон|',']]');});
	$('#btn_square_brackets').click(function (){InsertText('[[\|',']]');});
	$('#btn_square_brackets_only').click(function (){InsertText('[[',']]');});
	$('#btn_ref').click(function (){InsertText('<ref>','</ref>');});
	$('#btn_quote').click(function (){InsertText('{{Цитата|','||}}');});
}

function LoadInsertInfoboxElements(data) 
{
	let sElements = $(data).find('#temple_InfoboxList').html();
	let api = new mw.Api();

	api.get({action: 'query', format: 'json', list: 'categorymembers', cmtitle: 'Категория:Инфобоксы_с_описанием', cmlimit: '200', cmnamespace: '10' })
	.done(function(data) 
	{
		let pages = data.query.categorymembers;
		let p, s = '';
		for (p in pages) 
		{
			s = s + '<p class="BlockRounded btn_Charinsert" onclick="InsertInfobox(\'' + pages[p].title + '\')">' + (pages[p].title).replace(/Шаблон:/, '') + '</p>';
		}

		sElements = sElements.replace(/\{Content}/g, s);
		sMessageWindow = sMessageWindow.replace(/\{Content}/g, sElements);

		ApplyLoadedElements(sMessageWindow);

    // добавление событий кнопкам
		$('#btn_CancelMessage').click(CloseHideable);
	});
}

function ApplyLoadedElements(MessageWindow) 
{
  $('body').append(MessageWindow);
  $('#BlockScreenBG').fadeIn();
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
	
	let api = new mw.Api();
	// запрос на страницу api.php для конвертации вики-разметки в HTML. 
	//Документация по запросу хранися на странице
	api.post({action: "parse", format: "json", formatversion: "2", prop: "text|indicators|displaytitle|modules|jsconfigvars|categorieshtml|templates|langlinks|limitreporthtml", text: $('#wpTextbox1').val(), pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "fandomdesktop", uselang: "ru"})
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

  // если на странице-хранилище не обнаружилось нужной разметки - выход с предупреждением
  if (CheckLoadedElements(sMessage, sCell[i], sTemplateSource) == 0) { return; }
	
	return sMessage;
}

/*
запись темы/сообщения/ответа
- sMessageText -- текст сообщения. Если не задан, берётся из текстового поля 
- sPageName -- страница, куда нужно внести текст. Если не задана, берётся текущая
*/
function SaveForumMessage(sMessageText, sPage)
{
 
	//текст темы/сообщения/ответа
	if (sMessageText.length == 0)
	{
    s = $('#wpTextbox1').val();
    // если тест сообщения не введен -- сообщение об ошибке, выход
    if ( s === '' )
    { 
      mw.notify( 'Введите текст сообщения!', { title: 'Внимание!', type: 'warn' } ); 
      return;
    }
    
    // если не указан, берется из поля wpTextbox1 ИЛИ присваивается пустой текст
		sMessageText = s;
	}
	
	//страница для записи
	if (sPage.length == 0)
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
	    // текущие дата и время одной строкой
		sMessageDateTime= dNow.toLocaleString();
		// добавление в строку id автора темы/сообщения/ответа
		sMessageID= 'mes_'+ mw.config.values.wgUserId +'-'+ dNow.valueOf();
		// токен автора темы/сообщения/ответа
		sToken= mw.user.tokens.get('csrfToken');
		
		// если в sSection хранится "new" -- новое сообшение
		if (sSection === 'new')
		{
			//загрузка HTML-разметки для ячейки сообшения
			sMessage= LoadCell(2, sTemplateSource, data);

			// подстановка id. имения автора сообщения, текста сообщения и пр. в HTML-разметку ячейки
			sMessage= sMessage.replace(/\{MessageID}/g, sMessageID).replace(/\{UserName}/g, '[[Участник:'+mw.config.values.wgUserName+'|'+mw.config.values.wgUserName+']]').replace(/\{DateTime}/g, sMessageDateTime).replace(/\{MessageText}/g, sMessageText).replace(/<tbody>|<\/tbody>/g,'');
     
      // вывод сообщения о записи
			mw.notify( 'Обновите страницу.', { title: 'Сообщение успешно добавлено!', type: 'info' } ); 
			
			let api = new mw.Api();
			// запрос на запись сообщения в БД вики
			api.post({action: "edit", title: sPage, section: sSection, appendtext: sMessage, token: sToken}); 	
		}
		
		// если в sSection хранится число -- ответ на сообшение
		if (Number.isInteger( Number(sSection) ) )
		{
			//загрузка HTML-разметки для ячейки ответа
			sMessage= LoadCell(2, sTemplateSource, data);
			// внесение id раздела, на который нужно ответить, в окно сообщения
			SenderID = $('#win_GlassWindow').attr('data-SenderID');
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
      
  console.log( sSection, sMessage);
  //return;
			// вывод сообщения о записи
			mw.notify( 'Обновите страницу.', { title: 'Ответ успешно добавлен!', type: 'info' } );
			
			let api = new mw.Api();
			// запрос на запись ответа в БД вики
			api.post({action: "edit", title: mw.config.values.wgPageName, section: sSection, appendtext: sMessage, token: sToken}); 	
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
			
			let api = new mw.Api();
			// запрос на запись ответа в БД вики
			api.post({action: "edit", title: 'Forum:'+sTopic, text: sMessage, token: sToken}); 
		}
		// очистка полей ввода
		$('#input_NewTopic').val('');
	    $('#wpTextbox1').val('');
	    
	    // сокрытие окна 
	    CloseHideable();
  });
}

/*
проверка результата jQ-выборки со страницы sSource
- sElement -- результат jQ-выборка
- sID -- ID тега, который должен попасть в результат jQ-выборки
- sSource -- страница, с которой выполняется jQ-выборка
*/
function CheckLoadedElements(sElement, sID, sSource)
{
  if (sElement === undefined)
	{ 
		mw.notify( 'Объект "'+sID+'" на странице "'+ sSource +'" не найден.', { title: 'Ошибка!', type: 'error' } ); 
		return 0;
	}
  
  return 1;
}

function InsertInfobox(sSource) 
{
	let api = new mw.Api();
	//let sSource = 'Шаблон:'+ $(this).text();
	
	api.get({action: "parse", format: "json", formatversion: "2", prop: "text", page: sSource, preview: "true", disableeditsection: "true" })
	.done(function(data) // при успешном запросе
	{
		$('body').append('<div id="div_PureCode"></div>');

		let s = $('#div_PureCode').html(data.parse.text).find('.BlockPseudoPre:first').text();
		s = s.replace(/\|/g, '\n|').replace(/\}\}/g, '\n}}');
		
		console.log(s);

		InsertText(s, '');

		$('.BlockHideable').fadeOut(0);
    $('#div_PureCode').detach();
	});

}