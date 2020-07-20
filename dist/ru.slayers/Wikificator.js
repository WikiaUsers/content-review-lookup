// Копия [[Wikipedia:ru:MediaWiki:Wikificator.js]] согласно [[Wikipedia:ru:ВП:ВФ-ИУ]].

/* <pre> */ 

	var txt;
	
	var wmFullText = 'Wikificator will process ALL text on this page. Continue?';
	var wmCantWork = 'Wikificator cannot work in your browser';
	var wmWontWork = 'Wikificator will not work in Netscape 4.x and less';


	var wmCategoryNS = 'Категория';
	var wmTemplateNS = 'Шаблон';
	var wmUserNS = 'Участник';
	var wmImageNS = 'Изображение';
	var wmMediaNS = 'Медиа';

	var wmLocaleNS = new Array ( wmCategoryNS, wmTemplateNS, wmUserNS, wmImageNS, wmMediaNS );
	var wmEnNS = new Array ( 'category', 'template', 'user', 'image', 'media');


if (window.event){
  document.onkeypress = pressed;
}

function pressed() //On Ctrl+Enter (MSIE)
{key = window.event.keyCode;if (key==10){Wikify();}}
//======================================
function Wikify()
{
check_regexp(); // Check whether regular expressions are supported

// Только если пользователь указал в персональном скрипте auto_comment = 1;

// Раскоментировал, теперь не должно ругаться (добавил определение переменной в общий монобук) 
// - если все равно ругается откатите и забаньте меня

 if (auto_comment == 1) {
   var wpS = document.editform.wpSummary;
   if (wpS.value != '' && wpS.value.charAt(wpS.value.length-2) != '/') {
     wpS.value += ', Викификатор'
   } else {
     wpS.value += 'Викификатор'
   }
 }

document.editform.wpTextbox1.focus();
var txtarea = document.editform.wpTextbox1;
if(document.selection  && !is_gecko)/* IE */ {
	txt = " "+document.selection.createRange().text;
	if (txt == " ")	{all_text();} // If nothing was selected;
	else{
		Process();
		txt = txt.substr (1, txt.length-1);
		document.selection.createRange().text = txt;
		}
	}
else if((txtarea.selectionStart || txtarea.selectionStart == '0')&&(navigator.productSub>20031000)) /*Gecko-browsers older then 10.2003*/  {
 		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		var scrollTop=txtarea.scrollTop;
		txt = " "+(txtarea.value).substring(startPos, endPos);
		if (txt == " ")	{all_text();} // If nothing was selected;
		else{
			Process();
			txt = txt.substr (1, txt.length-1);
			txtarea.value = txtarea.value.substring(0, startPos) + txt + txtarea.value.substring(endPos, txtarea.value.length);
			txtarea.focus();
			}
		}
else{if (confirm(wmFullText)) {all_text();}} // Other browsers
}
//======================================
function all_text()// Process all text
{
txt = " "+document.editform.wpTextbox1.value;
Process();
txt = txt.substr (1, txt.length-1);
document.editform.wpTextbox1.value=txt;
}
//======================================
function check_regexp()// Check whether regular expressions are supported
{
var reg1 = "code";
reg1 = reg1.replace(/d/g, "r");
if (reg1 != "core"){alert(wmCantWork);exit;}
b_ver = navigator.appVersion.substr (0, 1);
if (navigator.appName=="Netscape"&&b_ver<5){alert(wmWontWork);exit;}
return ;
}
function Process()
// We have 2 more pairs of safe chars in \x1E — \x1F !
{
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4) {
 var sigs = txt.match(/\d\d:\d\d, \d\d? \S{3,9} 20\d\d \(UTC\)/g);
 if (sigs && sigs.length > 1)
   if (!confirm('Пожалуйста, не обрабатывайте Викификатором реплики других участников. Вы уверены, что хотите продолжить?')) 
     return;
}
//var nowiki = ReplaceElements( '\<math\>(.|\r|\n)+?\<\/math\>, "\x03", "\x04" );
//That variant will make ReplaceTags() function unnecessary, but it's so ugly...

var nowiki = ReplaceTags( 'nowiki', "\x03", "\x04" );
var pre = ReplaceTags( 'pre', "\x12", "\x13" );
var code = ReplaceTags( 'code', "\x1c", "\x1d" );
var math = ReplaceTags( 'math', "\x05", "\x06" );
var gallery = ReplaceTags( 'gallery', "\x14", "\x15" );

// Exclude lines starting with space
f_space = txt.substr (0, 1)
txt = txt.substr (1, txt.length-1)
var sp_lines = ReplaceElements( "^( )(.+)$", "\x16", "\x17" );
txt = f_space + txt

ProcessNS( wmEnNS , wmLocaleNS );
CorrectRanges();

// Exclude templates and internal links
var templates = ReplaceElements( "\\{\\{(.|\\r|\\n)+?\\}\\}", "\x18", "\x19" );
var links = ReplaceElements( "(\\[\\[)(.*?)(\\||\\]\\])", "\x10", "\x11" );
var ext_links = ReplaceElements( "\\[(http|https|ftp|tftp|news|nntp|telnet|irc|gopher)://(.*?)\\]", "\x1A", "\x1B");

HTML2Wiki();

// Exclude tags and tag attributes (all text in quotes after "=" sign)
var attrs = ReplaceElements( '(=)(\\s?)(\\' + '")(.*?)(\\")', "\x0E", "\x0F");
var tags = ReplaceElements( "<([^>]*?)>", "\x01", "\x02");

ProcessTypography();
ProcessTypography(); // Second call

//alert(txt);

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

}

function HTML2Wiki()
{


// Replace <b>, <strong> tags with ''' and <i>, <em> with ''
txt = txt.replace(/\<\/?(b|strong)\>/gim, "\'\'\'")
txt = txt.replace(/\<\/?(i|em)\>/gim, "\'\'")

// Replace <hr> tag with ----, improve <hr> and <br> tags
txt = txt.replace(/\<hr ?\/?\>/gi, "----")
txt = txt.replace(/\<hr ([^\>\/]+?) ?\/?\>/gi, "<hr $1 />")
txt = txt.replace(/\<br\/?\>/gi, "<br />")
txt = txt.replace(/\<br ([^\>\/]+?) ?\/?\>/gi, "<br $1 />")

// Replace small and big tags with inline styling

/// txt = txt.replace(/(\<small\>)/g, "<span style=\"font-size\:smaller\;\">");
/// txt = txt.replace(/(\<\/small\>)/g, "<\/span>");
/// txt = txt.replace(/(\<big\>)/g, "<span style=\"font-size\:1.25em\;\">");
/// txt = txt.replace(/(\<\/big\>)/g, "<\/span>");

}

// Process default namespaces

function ProcessNS( En_NS_List , Loc_NS_List )
{

for (i=0; i < En_NS_List.length; i++)
  {
  //alert("(\\[\\[)(:?)(" + En_NS_List[i] + "|" +
  //Loc_NS_List[i] + ")(:)( *)");
  
  txt = txt.replace( new RegExp( "(\\[\\[:?)(" + En_NS_List[i] + "|" +
  Loc_NS_List[i] + "):( *)" , "gi" ), "$1" + Loc_NS_List[i] + ":");

  }
}

//======================================
// Replace '<replaced_tag> ... </replaced_tag>' (<nowiki> <br/> </nowiki>)
// with 'opepening_char + tag's counter + closing_char' ('\x03'+1'+'\x04')
//======================================

function ReplaceTags(replaced_tag, op_char, cl_char )

// @replaced_tag - tag to be replaced
// @op_char, @cl_char (opening & closing chars) - "Safe" pair of 
// unicode unprintable characters, that will be used in replacement

{

var counter = 0; //tags counter

// RegExp pattern
var pattern = "\\<" + replaced_tag + "\\>(.|\r|\n)+?\<\\/" + replaced_tag + "\\>";

// RegExp template to be replaced (multiline text between 
// <replaced_tag> and </replaced_tag> case sensitive tags)
var replaced_regexp = new RegExp(pattern , "im")

// Buffer for replaced matches storage. It's array of matching substrings -
// multiline text between <replaced_tag> and </replaced_tag> case sensitive tags ()
matches_buffer = txt.match( new RegExp(pattern , "gim") );

// while some substring of txt matches replaced_regexp...
while (replaced_regexp.test(txt))
  {
  txt = txt.replace(replaced_regexp, op_char + ++counter + cl_char );
  }
return matches_buffer;
}

//======================================
// Replace '<replaced_tag> ... </replaced_tag>' (<nowiki> <br/> </nowiki>)
// with 'opepening_char + tag's counter + closing_char' ('\x03'+1'+'\x04')
//======================================

function ReplaceElements( req_exp, op_char, cl_char )

// @req_exp - reqular expression to be replaced
// @op_char, @cl_char (opening & closing chars) - "Safe" pair of 
// unicode unprintable characters, that will be used in replacement

{

var counter = 0; //tags counter

// RegExp template to be replaced (multiline, case sensitive)
var replaced_regexp = new RegExp( req_exp , "m" )

// Buffer for replaced matches storage. It's array of matching substrings.
// (multiline, case sensitive, global)
matches_buffer = txt.match( new RegExp( req_exp , "gm" ) );

// while some substring of txt matches replaced_regexp...
while (replaced_regexp.test(txt))
  {
  //alert(txt.match(replaced_regexp));
  txt = txt.replace(replaced_regexp, op_char + ++counter + cl_char );
  }
return matches_buffer;
}

//======================================
// Restore text, that was damaged by replacing 3 chars with substring from array
//======================================

function RestoreElements( replaced_buffer, op_char, cl_char )

// @replaced_buffer - array of replaced substrings.
// @op_char, @cl_char (opening & closing chars) - "Safe" pair 
// to be replaced with <replaced_tag> and </replaced_tag> accordingly

{

var counter = 0; //tags counter

// RegExp template to be replaced (3 chars: tag's counter 
// surrunded by "Safe" pair)
var replaced_regexp = new RegExp("\\" +op_char+ "([0-9]*)\\" +cl_char );

//replaced_regexp = /\x03([0-9]*)\x04/

// while some substring of txt matches replaced_regexp...
while (replaced_regexp.test(txt))
{
  txt = txt.replace(replaced_regexp, replaced_buffer[counter++]);
}
return txt;
}

// Corrects year and century ranges (as links) in text
function CorrectRanges() {
// Correct year ranges
txt = txt.replace(/(?!ISBN)(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, "$1$2—$4$5")
txt = txt.replace(/(\[\[[12]?\d{3}\]\]) ?(г\.|гг\.)/g, "$1\u00A0$2")
// Correct century ranges
txt = txt.replace(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, "$1$2—$4$5")
txt = txt.replace(/(\[\[[IVX]{1,5}\]\]) ?(в\.|вв\.)/g, "$1\u00A0$2")
}

/***************************************************
	Typographical considerations
***************************************************/
function ProcessTypography() {

// Insert spaces in titles
txt = txt.replace(/^(=+)([ \t\f\v]*)(.*?)([ \t\f\v]*)(=+)$/gm, "$1 $3 $1")
//======================================
// Use 1 character to display squaring and cubing
txt = txt.replace(/(<sup>2<\/sup>|&sup2;)/g, "²");
txt = txt.replace(/(<sup>3<\/sup>|&sup3;)/g, "³");
txt = txt.replace(/(\^2)(\D)/g, "²$2");
txt = txt.replace(/(\^3)(\D)/g, "³$2");
//======================================
// Replace right HTML symbols with wrong ones in order to process everything
txt = txt.replace(/–/g, "-")
txt = txt.replace(/(«|»|“|”|„|\&((la|ra|bd|ld)quo|#132|#147|#148|quot);)/g, "\"")
//======================================
// Replace double hyphen with a dash
txt = txt.replace(/(--)(\[\[Участник|\~\~\~)/g, "—$2")
//======================================
// Replace set of 'less then' or 'greater then' symbols (<< or >>) with usual double quotes
txt = txt.replace(/(<<)(\S.+\S)(>>)/g, "\"$2\"")
//======================================
// Process degree sign "°", "+-" and "~="
txt = txt.replace(/(\+[--])|(&plusmn;)/g, "±")
txt = txt.replace(/(~=)/g, "≈")
txt = txt.replace(/\&deg;/g, "°")
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, "$1$2\u00A0°C")
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, "$1$2\u00A0°F")
//======================================
// Replace "...", "&hellip;" and "&#133;" with ellipsis
txt = txt.replace(/(\.{3}|\&(hellip|#133);)/g, '…')
// Apostrophe handler
txt = txt.replace(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g, "$1’$2")
// Minus handler
txt = txt.replace(/(sup\>|sub\>|\s)-(\d)/g, "$1−$2")
//======================================
// Replace hyphens and en dashes with normal dashes
txt = txt.replace(/\&(#151|[nm]dash);/g, "—")
txt = txt.replace(/(&nbsp;|[\f\n\r\t\v\u00A0\u2028\u2029])(-|--|–) /g, "$1— ")
txt = txt.replace(/(\d)--(\d)/g, "$1—$2")
// Insert non-breaking space before dashes
txt = txt.replace(/(\S) (-|--|–|—) (\S)/g, "$1\u00A0— $3")
//======================================
// Special characters: ©, ®, ™, §, €, ¥ и £.
txt = txt.replace(/\&copy;/gi, "©")
txt = txt.replace(/\&reg;/gi, "®")
txt = txt.replace(/(\((tm|тм)\)|\&trade;)/gi, "™")
txt = txt.replace(/\&sect;/gi, "§")
txt = txt.replace (/\&euro;/gi, "€")
txt = txt.replace (/\&yen;/gi, "¥")
txt = txt.replace (/\&pound;/gi, "£")
//======================================
// Correct year ranges
txt = txt.replace(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-|--|–|—) ?([12]?\d{3})(\W)/g, "$1$2—$4$5")
txt = txt.replace(/([12]?\d{3}) ?(г\.|гг\.)/g, "$1\u00A0$2")
// Correct century ranges
txt = txt.replace(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-|--|–|—) ?([IVX]{1,5})(\W)/g, "$1$2—$4$5")
txt = txt.replace(/([IVX]{1,5}) ?(в\.|вв\.)/g, "$1\u00A0$2")
// Correct the reductions
txt = txt.replace(/(Т|т)\. ?е\./g, "$1о есть")
txt = txt.replace(/(Т|т)\. ?к\./g, "$1ак как")
txt = txt.replace(/(В|в) т\. ?ч\./g, "$1 том числе")
txt = txt.replace(/и т\. ?д\./g, "и\u00A0т\.\u00A0д\.")
txt = txt.replace(/и т\. ?п\./g, "и\u00A0т\.\u00A0п\.")
txt = txt.replace(/(Т|т)\. ?н\./g, "$1\.\u00A0н\.")
txt = txt.replace(/н\. ?э\./g, "н\.\u00A0э\.")
txt = txt.replace(/(Д|д)(о|\.) н\. ?э\./g, "$1о\u00A0н\.\u00A0э\.")
txt = txt.replace(/(\d) ?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]?г|с)\.?( ([^\.А-ЯЁ])|[,;.])(?!\[.*?\|[А-Я].*?\])/g, "$1\u00A0$2$3")
txt = txt.replace(/(\d) (тыс)([^\.А-Яа-яЁё])/g, "$1\u00A0$2.$3")

//txt = txt.replace(/(\d) (млн|млрд|трлн)([^А-Яа-яЁё])/g, "$1\u00A0$2$3")
// Insert missing and delete unnecessary spaces
txt = txt.replace(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, "$1\u00A0$2\u00A0$3")
txt = txt.replace(/([А-Я]\.)([А-Я]\.)/g, "$1 $2")
txt = txt.replace(/^([#\*:]+)([ \t\f\v]*)([^ \t\f\v\*#:])/gm, "$1 $3")
txt = txt.replace(/([а-я])(\.)([А-ЯA-Z])/g, "$1$2 $3")
txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s*)(\,)([а-яa-z\(\«\„\"\[])/g, "$1$3 $4")
txt = txt.replace(/([а-яa-z\)\»\“\"\]])(\s)([\,\;])(\s)([а-яa-z\(\«\„\"\[])/g, "$1$3 $5")
txt = txt.replace(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, "$1\u00A0$2")
txt = txt.replace(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, "$1$2")
txt = txt.replace(/([№§])(\s*)(\d)/g, "$1\u00A0$3")
txt = txt.replace(/(^|[^ \t])([ \t]+)($|\n)/gm, "$1$3")
txt = txt.replace(/(\()( +)/g, "$1");
txt = txt.replace(/( +)(\))/g, "$2");
//======================================
// Avoid double spaces
txt = txt.substr (1, txt.length-1);
txt = txt.replace(/(\S)([ \t]{2,})([\S\r])/g, "$1 $3")
txt = " " + txt
//======================================
// Replace double quotes ("")  with double angle quotes («»)
txt = txt.replace(/([\x01-(\s\|\"]|\/|\+)(\")([^\"]{0,})([^\s\"(\|])(\")/g, "$1«\$3\$4»")
// Quotations in quotes
if (/"/.test(txt))
{
  txt = txt.replace(/([\x01(\s\"])(\")([^\"]{0,})([^\s\"(\|])(\")/g, "\$1«\$3\$4»")
  while (/(«)([^»]*)(«)/.test(txt))
    txt = txt.replace(/(«)([^»]*)(«)([^»]*)(»)/g, "\$1\$2„\$4“")
}

}

/* </pre> */