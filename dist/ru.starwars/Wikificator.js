// ВНИМАНИЕ! Внося изменения в код, не забывайте обновлять справку на странице [[Вукипедия:Викификатор]] 
var 
    txt = ''        // временное хранилище вукифицируемого текста

// сообщения!
var 
    wmDontWikify = 'Пожалуйста, не обрабатывайте Викификатором реплики других участников. Вы уверены, что хотите продолжить?';

// ---------------------------------------------------------------------------------
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
  $('div.mw-editTools, #EditTools_LayerBG').fadeIn(150);
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

    if (wgNamespaceNumber % 2 || wgNamespaceNumber==4) 
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
    $.get( wgScript, { title: 'Шаблон:Wikificator-source', action: 'raw', ctype: 'text/plain' } ).done( function( data )
    {
		oTermSource = data;

        // загрузка пар автозамены для категорий
        $.get( wgScript, { title: 'Шаблон:Wikificator-source-categ', action: 'raw', ctype: 'text/plain' } ).done( function( data )
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