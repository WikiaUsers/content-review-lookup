var wmVersion = '2010-04-03'
var wmCantWork = 'Викификатор не может работать в вашем браузере\n\nWikificator can not work in your browser'
var wmFullText = 'Викификатор обработает ВЕСЬ текст на этой странице. Продолжить?'
var wmTalkPage = 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nВыделите ваше сообщение — обработано будет только оно'

function Wikify(){
 var txt='', hidden = [], wpTextbox1 = document.editform.wpTextbox1
 var winScroll = document.documentElement.scrollTop

 try {txt='ая'.replace(/а/g,'б').replace(/б(?=я)/,'в')} catch(e){}//check regexp support
 if (txt != 'вя' || 
  (navigator.appName=='Netscape' && navigator.appVersion.substr (0, 1) < 5))
  { alert(wmCantWork); return }

 wpTextbox1.focus()

 if (typeof wpTextbox1.selectionStart != 'undefined' 
    && (navigator.productSub > 20031000 || is_safari || is_opera)) { //Mozilla/Opera/Safari3
    var textScroll = wpTextbox1.scrollTop
    var startPos = wpTextbox1.selectionStart
    var endPos = wpTextbox1.selectionEnd
    txt = wpTextbox1.value.substring(startPos, endPos)
    if (txt == '') processAllText()
    else{
      processText()
      wpTextbox1.value = wpTextbox1.value.substring(0, startPos) + txt + wpTextbox1.value.substring(endPos)
    }
    wpTextbox1.selectionStart = startPos
    wpTextbox1.selectionEnd = startPos + txt.length
    wpTextbox1.scrollTop = textScroll

 }else if (document.selection && document.selection.createRange) { //IE
   var range = document.selection.createRange()
   txt = range.text
   if (txt == '') processAllText()
   else{
     processText()
     range.text = txt
     if (range.moveStart) range.moveStart('character', - txt.length)
     range.select() 
   }
  
 }else // other browsers
   if (confirm(wmFullText)) processAllText()

 document.documentElement.scrollTop = winScroll // scroll back, for IE/Opera


//functions

function processAllText(){
 txt = wpTextbox1.value
 if (txt=='version') alert('Викификатор '+wmVersion)
 processText()
 r(/^[\n\r]+/, '')
 wpTextbox1.value = txt
 txt = ''
 if (window.auto_comment && window.insertSummary && !document.editform.wpSection.value)
   insertSummary('викификатор')
}

function processText(){

var u = '\u00A0' //unbreakable space
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4) { //is talk page
 u = ' '
 var sigs = txt.match(/\d\d:\d\d, \d\d? \S{3,8} 20\d\d \(UTC\)/g)
 if (sigs && sigs.length > 1) {
   alert(wmTalkPage); return
 }
}

hideTag('nowiki')
hideTag('pre')
hideTag('source')
hideTag('code')
hideTag('tt')
hideTag('math')
hide(/{\{[\s\S]+?}}/g)//templates
hide(/^ .*/mg)
hide(/(https?|ftp|news|nntp|telnet|irc|gopher):\/\/[^\s\[\]<>"]+ ?/gi)
hide(/^#(redirect|перенапр(авление)?)/i)
hideTag('gallery')


r(/ +(\n|\r)/g,'$1')//spaces at EOL
txt = '\n'+txt+'\n'



//LINKS
r(/(\[\[:?)(category|категория):( *)/ig, '$1Категория:')
r(/(\[\[:?)(image|изображение|file):( *)/ig, '$1Файл:')
//Linked years, centuries and ranges
r(/(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, '$1$2—$4$5')
r(/(\[\[[12]?\d{3}\]\]) ?(гг?\.)/g, '$1'+u+'$2')
r(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, '$1$2—$4$5')
r(/(\[\[[IVX]{1,5}\]\]) ?(вв?\.)/g, '$1'+u+'$2')
r(/\[\[(\d+)\]\]\sгод/g, '[[$1'+u+'год]]')
r(/\[\[(\d+)\sгод\|\1\]\]\sгод/g, '[[$1'+u+'год]]')
r(/\[\[(\d+)\sгод\|\1\sгод([а-я]{0,3})\]\]/g, '[[$1'+u+'год]]$2')
r(/\[\[((\d+)(?: (?:год )?в [\wa-яёА-ЯЁ ]+\|\2)?)\]\][\u00A0 ](год[а-яё]*)/g, '[[$1'+u+'$3]]')
r(/\[\[([XVI]+)\]\]\sвек/g, '[[$1'+u+'век]]')
r(/\[\[([XVI]+)\sвек\|\1\]\]\sвек/g, '[[$1'+u+'век]]')
r(/\[\[([XVI]+)\sвек\|\1\sвек([а-я]{0,3})\]\]/g, '[[$1'+u+'век]]$2')
r(/\[\[(([XVI]+) век\|\2)\]\][\u00A0 ]век/g, '[[$2'+u+'век]]')
// Nice links
r(/(\[\[[^|\[\]]*)[\u00AD\u200E\u200F]+([^\[\]]*\]\])/g, '$1$2') // Soft Hyphen & DirMark
r(/\[\[ *([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-—.\/0-9:;=?\\@\^_`’~]+) *\| *(\1)([a-zа-яё]*) *\]\]/g, '[[$2]]$3') // "
r(/\[\[ *([^|\[\]]+)([^|\[\]]+) *\| *\1 *\]\]\2/g, '[[$1$2]]') // -повтор текста за ссылкой
r(/\[\[ *(?!Файл:|Категория:)([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-—.\/0-9:;=?\\@\^_`’~]+) *\| *([^|[\]]+) *\]\]([a-zа-яё]+)/g, '[[$1|$2$3]]') // "
hide(/\[\[[^\]|]+/g)//only link part


//TAGS
r(/<<(\S.+\S)>>/g, '"$1"') //<< >>
r(/(sup>|sub>|\s)-(\d)/g, '$1−$2') //minus
r(/(<sup>2<\/sup>|&sup2;)/gi, '²');
r(/(<sup>3<\/sup>|&sup3;)/gi, '³');
r(/<(b|strong)>(.*?)<\/(b|strong)>/gi,"'''$2'''")
r(/<(i|em)>(.*?)<\/(i|em)>/gi,"''$2''")
r(/^<hr ?\/?>/gim, '----')
r(/<\/?(hr|br)( [^\/>]+?)? ?\/?>/gi, '<$1$2 />')
r(/(\n== *[a-zа-я\s\.:]+ *==\n+)<references *\/?>/ig,'$1{\{примечания}}')
hide(/<[a-z][^>]*?>/gi)

hide(/^({\||\|-).*/mg)//table/row def
hide(/(^\||^!|!!|\|\|) *[a-z]+=[^|]+\|(?!\|)/mgi)//cell style
hide(/\| +/g)//formatted cell

r(/[ \t]+/g,' ')//double spaces

// Headings
r(/^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1') //add spaces inside
r(/([^\r\n])(\r?\n==.*==\r?\n)/g, '$1\n$2') //add empty line before
r(/^== см(\.?|отри|отрите) ?также ==$/gmi, '== См. также ==')
r(/^== сноски ==$/gmi, '== Примечания ==')
r(/^== внешние\sссылки ==$/gmi, '== Ссылки ==')
r(/^== (.+)[.:] ==$/gm, '== $1 ==')

r(/«|»|“|”|„/g, '"')//temp

// Hyphens and en dashes to pretty dashes
r(/–/g, '-') //&ndash; ->  hyphen
r(/&(#151|[nm]dash);/g, '—') // -> &mdash;
r(/(&nbsp;|\s)-{1,3} /g, '$1— ') // hyphen -> &mdash;
r(/(\d)--(\d)/g, '$1—$2') // -> &mdash;

// Entities etc. → Unicode chars
r(/&#x([0-9a-f]{1,4});/gi, function(n,a){return String.fromCharCode(eval('0x'+a.substr(-4)))})  //&#x301;
r(/&copy;/gi,'©')
r(/&reg;/gi,'®')
r(/&sect;/gi,'§')
r(/&euro;/gi,'€')
r(/&yen;/gi,'¥')
r(/&pound;/gi,'£')
r(/&deg;/g,'°')
r(/\(tm\)|\(тм\)|&trade;/gi,'™')
r(/\.\.\.|&hellip;/g,'…')
r(/\+-(?!\+|-)|&plusmn;/g,'±')
r(/~=/g,'≈')
r(/\^2(\D)/g,'²$1')
r(/\^3(\D)/g,'³$1')
r(/&((la|ra|bd|ld)quo|quot);/g,'"')
r(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g,'$1’$2') //'
r(/№№/g,'№')

// Year and century ranges
r(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-{1,3}|—) ?([12]?\d{3})(?![\w-])/g, '$1$2—$4')
r(/([12]?\d{3}) ?(гг?\.)/g, '$1'+u+'$2')
r(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-{1,3}|—) ?([IVX]{1,5})(?![\w-])/g, '$1$2—$4')
r(/([IVX]{1,5}) ?(вв?\.)/g, '$1'+u+'$2')

// Reductions
r(/(Т|т)\.\s?е\./g, '$1о есть')
r(/(Т|т)\.\s?к\./g, '$1ак как')
r(/(В|в)\sт\. ?ч\./g, '$1 том числе')
r(/(И|и)\sт\.\s?д\./g, '$1'+u+'т\.'+u+'д\.')
r(/(И|и)\sт\.\s?п\./g, '$1'+u+'т\.'+u+'п\.')
r(/(Т|т)\.\s?н\./g, '$1\.'+u+'н\.')
r(/(И|и)\.\s?о\./g, '$1\.'+u+'о\.')
r(/н\.\s?э\./g, 'н\.'+u+'э\.')
r(/(Д|д)(о|\.)\sн\.\s?э\./g, '$1о'+u+'н\.'+u+'э\.')
r(/(\d)[\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\.?(?=[,;.]| "?[а-яё-])/g, '$1'+u+'$2')
r(/(\d)[\u00A0 ](тыс)([^\.А-Яа-яЁё])/g, '$1'+u+'$2.$3')
r(/ISBN:\s?(?=[\d\-]{8,17})/,'ISBN ')

// Insert/delete spaces
r(/^([#*:]+)[ \t\f\v]*([^ \t\f\v*#:;])/gm, '$1 $2') //space after #*:
r(/(\S) (-{1,3}|—) (\S)/g, '$1'+u+'— $3')
r(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, '$1'+u+'$2'+u+'$3')
r(/([А-Я]\.)([А-Я]\.)/g, '$1 $2')
r(/([а-я]\.)([А-ЯA-Z])/g, '$1 $2') // word. word
r(/([)"а-яa-z\]])\s*,([\[("а-яa-z])/g, '$1, $2') // word, word
r(/([)"а-яa-z\]])\s([,;])\s([\[("а-яa-z])/g, '$1$2 $3')
r(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, '$1'+u+'$2') //5 %
r(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2') //5%-й
r(/([№§])(\s*)(\d)/g, '$1'+u+'$3')
r(/\( +/g, '('); r(/ +\)/g, ')') //inside ()

//Temperature
r(/([\s\d=≈≠≤≥<>—("'|])([+±−-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[\s"').,;!?|])/gm, '$1$2'+u+'°C') //'
r(/([\s\d=≈≠≤≥<>—("'|])([+±−-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[\s"').,;|!?])/gm, '$1$2'+u+'°F') //'

//Dot → comma in numbers
r(/(\s\d+)\.(\d+[\u00A0 ]*[%‰°])/gi, '$1,$2')

//"" → «»
for (var i=1; i<=2; i++)
 r(/([\s\x02!|#'"\/(;+-])"([^"]*)([^\s"(|])"([^a-zа-яё])/ig, '$1«$2$3»$4') //"
while (/«[^»]*«/.test(txt)) 
 r(/«([^»]*)«([^»]*)»/g, '«$1„$2“')

txt=txt.substr(1, txt.length-2)
if ('0'.replace('0','$$') == '$') ////$ in replacing string is special, except in IE
 for (var i=0; i<hidden.length; i++) hidden[i] = hidden[i].replace(/\$/g, '$$$$')
while (hidden.length>0) 
 r('\x01'+hidden.length+'\x02', hidden.pop())

}

function r(r1, r2){ txt = txt.replace(r1, r2) }
function hide(re){ r(re, function(s){return '\x01'+hidden.push(s)+'\x02'})}
function hideTag(tag){ hide(RegExp('<' + tag + '( [^>]+)?>[\\s\\S]+?<\\/' + tag + '>','gi')) }

}