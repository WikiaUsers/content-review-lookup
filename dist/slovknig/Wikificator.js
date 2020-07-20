var wmCantWork = 'Викификатор не может работать в вашем браузере.\n\nWikificator can not work in your browser.' // English, for those unable to see Cyrillic characters
var wmFullText = 'Викификатор обработает ВЕСЬ текст на этой странице. Продолжить?'
var wmTalkPage = 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nВыделите ваше сообщение — обработано будет только оно.'


function Wikify(){
 if (('code'.replace(/d/g, 'r') != 'core') //check regexp support
    || (navigator.appName=='Netscape' && navigator.appVersion.substr (0, 1) < 5))
  { alert(wmCantWork); return }

 var txt, hidden = [], hidIdx = -1, wpTextbox1 = document.editform.wpTextbox1
 var winScroll = document.documentElement.scrollTop //remember window scroll
 wpTextbox1.focus()

 if (typeof wpTextbox1.selectionStart != 'undefined' 
    && (navigator.productSub > 20031000 || is_safari)) { //Mozilla/Opera/Safari3
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
 txt = '\n' + wpTextbox1.value
 processText()
 r(/^[\n\r]+/, '')
 wpTextbox1.value = txt
 txt = ''
 if (window.auto_comment && window.insertSummary) insertSummary('викификатор')
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
hideTag('gallery')
hide('{\\{[\\s\\S]+?}}') //templates
hide('^ .*') //lines starting with space
hide('(http|https|ftp|tftp|news|nntp|telnet|irc|gopher)://[^ \n\r\u00A0]* ?') //links
hide('^#(redirect|перенапр(авление)?)')

r(/(\[\[:?)(category|категория):( *)/ig, '$1Категория:')
r(/(\[\[:?)(image|изображение|file):( *)/ig, '$1Файл:')
// Year and century ranges
r(/(?!ISBN)(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, '$1$2—$4$5')
r(/(\[\[[12]?\d{3}\]\]) ?(гг?\.)/g, '$1'+u+'$2')
r(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-{1,3}|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, '$1$2—$4$5')
r(/(\[\[[IVX]{1,5}\]\]) ?(вв?\.)/g, '$1'+u+'$2')

// Year and century links
r(/\[\[(\d+)\]\][\u00A0 ]год/g, '[[$1 год]]')
r(/\[\[((\d+)(?: (?:год )?в [\wa-яёА-ЯЁ ]+\|\2)?)\]\][\u00A0 ](год[а-яё]*)/g, '[[$1\u00A0$3]]')
r(/\[\[([XVI]+)\]\][\u00A0 ]век/g, '[[$1 век]]')
r(/\[\[(([XVI]+) век\|\2)\]\][\u00A0 ]век/g, '[[$2 век]]')
 
// Nice links
r(/(\[\[[^|\[\]:]*)[\u00AD\u200E\u200F]+([^\[\]]*\]\])/g, '$1$2') // Soft Hyphen & DirMark
r(/\[\[ *([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-.\/0-9:;=?\\@\^_`’~]+) *\| *(\1)([a-zа-яё]*) *\]\]/g, '[[$2]]$3') // "
r(/\[\[ *([a-zA-Zа-яёА-ЯЁ\u00A0-\u00FF %!\"$&'()*,\-.\/0-9:;=?\\@\^_`’~]+) *\| *([^|[\]]+) *\]\]([a-zа-яё]+)/g, '[[$1|$2$3]]') // "

hide('\\[\\[[^\\]|]+') //internal links

r(/<<(\S.+\S)>>/g, '"$1"') //<<text>> -> "text"
//square and cube
r(/(<sup>2<\/sup>|&sup2;)/gi, '²');
r(/(<sup>3<\/sup>|&sup3;)/gi, '³');
//tags → wikicode
r(/<\/?(b|strong)>/gi, "'''")
r(/<\/?(i|em)>/gi, "''")
r(/<hr ?\/?>/gi, '----')
//improve hr and br
r(/<(hr|br)( [^\/>]+?)? ?\/?>/gi, '<$1$2 />')
//№№ → №
r(/№№/g,'№')


hide('<[^>]*?>') //tags
hide('\\w+ *= *"[^"]*"') //tables attributes

r(/(\S)[ \t]+( |\n|\r)/g,'$1$2') //remove double spaces and spaces at EOL
r(/^([#*:]+)[ \t\f\v]*([^ \t\f\v*#:;])/gm, '$1 $2') //space after #*: at the line start

// Entities 
r(/&#(\d+);/g, function(n,a){return String.fromCharCode(a)})                        //&#769;
r(/&#x([0-9a-f]{1,4});/gi, function(n,a){return String.fromCharCode(eval('0x'+a.substr(-4)))})  //&#x301;

// Headings
r(/^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1') //add spaces in section headers
r(/([^\r\n])(\r?\n==.*==\r?\n)/g, '$1\n$2') //add empty line before section header
r(/^== (С|с)м(\.?|отрите) ?также ==$/gm, '== См. также ==')
r(/^== (С|с)носки ==$/gm, '== Примечания ==')
r(/^== (.+)[.:] ==$/gm, '== $1 ==')


// Temporary replacements
r(/–/g, '-')
r(/«|»|“|”|„/g, '"')
txt = ' ' + txt

// Minus handler
r(/(sup>|sub>|\s)-(\d)/g, '$1−$2')
// Hyphens and en dashes to pretty dashes
r(/&(#151|[nm]dash);/g, '—')
r(/(&nbsp;|[\f\n\r\t\v\u00A0\u2028\u2029])(-{1,3}|–) /g, '$1— ')
r(/(\d)--(\d)/g, '$1—$2')

// Entities etc. → Unicode chars
r(/&copy;/gi,'©')
r(/&reg;/gi,'®')
r(/&sect;/gi,'§')
r(/&euro;/gi,'€')
r(/&yen;/gi,'¥')
r(/&pound;/gi,'£')
r(/&deg;/g,'°')
r(/\(tm\)|\(тм\)|&trade;/gi,'™')
r(/\.\.\.|&hellip;/g,'…')
r(/\+[--]|&plusmn;/g,'±')
r(/~=/g,'≈')
r(/\^2(\D)/g,'²$1')
r(/\^3(\D)/g,'³$1')
r(/&((la|ra|bd|ld)quo|quot);/g,'"')
r(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g,'$1’$2') //'

// Year and century ranges
r(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-{1,3}|–|—) ?([12]?\d{3})(\W)/g, '$1$2—$4$5')
r(/([12]?\d{3}) ?(гг?\.)/g, '$1'+u+'$2')
r(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-{1,3}|–|—) ?([IVX]{1,5})(\W)/g, '$1$2—$4$5')
r(/([IVX]{1,5}) ?(вв?\.)/g, '$1'+u+'$2')

// Reductions
r(/(Т|т)\. ?е\./g, '$1о есть')
r(/(Т|т)\. ?к\./g, '$1ак как')
r(/(В|в) т\. ?ч\./g, '$1 том числе')
r(/и т\. ?д\./g, 'и'+u+'т\.'+u+'д\.')
r(/и т\. ?п\./g, 'и'+u+'т\.'+u+'п\.')
r(/(Т|т)\. ?н\./g, '$1\.'+u+'н\.')
r(/н\. ?э\./g, 'н\.'+u+'э\.')
r(/(Д|д)(о|\.) н\. ?э\./g, '$1о'+u+'н\.'+u+'э\.')
r(/(\d)[\u00A0 ]?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]г)\.?( ([^\.А-ЯЁ\d])|[,;.])(?!\[.*?\|[А-Я].*?\])/g, '$1'+u+'$2$3')
r(/(\d)[\u00A0 ](тыс)([^\.А-Яа-яЁё])/g, '$1'+u+'$2.$3')

// Insert/delete spaces
r(/(\S) (-{1,3}|–|—) (\S)/g, '$1'+u+'— $3')
r(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, '$1'+u+'$2'+u+'$3')
r(/([А-Я]\.)([А-Я]\.)/g, '$1 $2')
r(/([а-я]\.)([А-ЯA-Z])/g, '$1 $2') // word. word
r(/([)"а-яa-z\]])\s*,([\[("а-яa-z])/g, '$1, $2') // word, word
r(/([)"а-яa-z\]])\s([,;])\s([\[("а-яa-z])/g, '$1$2 $3')
r(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, '$1'+u+'$2') //5 %
r(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2') //5%-й
r(/([№§])(\s*)(\d)/g, '$1'+u+'$3')
r(/\( +/g, '('); r(/ +\)/g, ')') //inside ()

// Temperature
r(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, '$1$2'+u+'°C') //'
r(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, '$1$2'+u+'°F') //'

// Dot → comma in numbers
r(/(\s\d+)\.(\d+[\u00A0 ]*[%‰°])/gi, '$1,$2')

// "" → «»
r(/([\x01-("\s|+\/\-])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
if (/"/.test(txt)){ //quotes inside "
  r(/([\x01-("\s|\-])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
  while (/«[^»]*«/.test(txt))
    r(/«([^»]*)«([^»]*)»/g, '«$1„$2“')
}

txt = txt.substr(1) // leading space

restoreAll()

}


function r(r1, r2){ txt = txt.replace(r1, r2) }

function hide(expr){
 r(RegExp(expr, 'mgi'), function(s){
   if ('0'.replace('0','$$') == '$') s = s.replace(/\$/g, '$$$$')//$ in string is special, except in IE
   hidden[++hidIdx] = s
   return '\x01' + hidIdx + '\x02'
 })
}

function hideTag(tag){
  hide('<' + tag + '( [^>]+)?>[\\s\\S]+?<\\/' + tag + '>')
}

function restoreAll(){
 for (var i=hidIdx; i>=0; i--) r('\x01' + i + '\x02', hidden[i])
}

}