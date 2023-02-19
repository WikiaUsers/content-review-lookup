//<source lang=javascript>
var wmCantWork = 'Wikificator cannot work in your browser'
var wmFullText = 'Wikificator will process ALL text on this page. Continue?'
var wmTalkPage = 'Викификатор не обрабатывает обсуждения\n\nWikificator doesn\'t work on discussion pages'
 
 
function Wikify(){
 if (('code'.replace(/d/g, 'r') != 'core') //check regexp support
    || (navigator.appName=='Netscape' && navigator.appVersion.substr (0, 1) < 5))
  { alert(wmCantWork); return }
 
 var txt, hidden = [], hidIdx = 0, wpTextbox1 = document.editform.wpTextbox1
 
 if (document.selection && document.selection.createRange) { //IE/Opera
   var winScroll = document.documentElement.scrollTop //remember window scroll
   wpTextbox1.focus()
   var range = document.selection.createRange()
   txt = range.text
   if (txt == '') processAllText()
   else{
     processText()
     range.text = txt
     //restore selection   
     if (range.moveStart) range.moveStart('character', - txt.length)
     range.select() 
   }
   document.documentElement.scrollTop = winScroll
 
 }else if ((wpTextbox1.selectionStart || wpTextbox1.selectionStart == '0') //Mozilla
    && (navigator.productSub > 20031000)) /*Gecko-browsers older then 10.2003*/  {
    var textScroll = wpTextbox1.scrollTop
    wpTextbox1.focus()
    var startPos = wpTextbox1.selectionStart
    var endPos = wpTextbox1.selectionEnd
    txt = wpTextbox1.value.substring(startPos, endPos)
    if (txt == '') processAllText()
    else{
      processText()
      wpTextbox1.value = wpTextbox1.value.substring(0, startPos) + txt + wpTextbox1.value.substring(endPos)
    }
    //restore selection and textarea scroll
    wpTextbox1.selectionStart = startPos
    wpTextbox1.selectionEnd = endPos
    wpTextbox1.scrollTop = textScroll
 
 }else // other browsers
   if (confirm(wmFullText)) processAllText()
 
 
 
function processAllText(){
 txt = wpTextbox1.value
 txt = txt.replace(/^[\n\r]+/, '') //newlines at start
 processText()
 wpTextbox1.value = txt
}
 
 
 
function processText(){
 
 
if (wgNamespaceNumber % 2 || wgNamespaceNumber==4) { //is talk page
 var sigs = txt.match(/\d\d:\d\d, \d\d? \S{3,8} 20\d\d \(UTC\)/g)
 if (sigs && sigs.length > 1) {
   alert(wmTalkPage); return
 }
} 
 
hideTag('nowiki')
hideTag('pre')
hideExpr('<source [^>]+>[\\s\\S]+?<\\/source>')
hideTag('code')
hideTag('tt')
hideTag('math')
hideTag('gallery')
hideExpr('{\\{[\\s\\S]+?}}') //templates
hideExpr('^ .*$') //lines starting with space
hideExpr('(http|https|ftp|tftp|news|nntp|telnet|irc|gopher)://[^ \n\r\u00A0]* ?') //links
 
 
txt = txt.replace(/(\[\[:?)category:( *)/ig, '$1Категория:')
// Year ranges
txt = txt.replace(/(?!ISBN)(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, '$1$2—$4$5')
txt = txt.replace(/(\[\[[12]?\d{3}\]\]) ?(г\.|гг\.)/g, '$1\u00A0$2')
// Century ranges
txt = txt.replace(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, '$1$2—$4$5')
txt = txt.replace(/(\[\[[IVX]{1,5}\]\]) ?(в\.|вв\.)/g, '$1\u00A0$2')
 
hideExpr('\\[\\[[^\\]|]+') //internal links
 
 
txt = txt.replace(/<<(\S.+\S)>>/g, '"$1"') //<<text>> -> "text"
//square and cube
txt = txt.replace(/(<sup>2<\/sup>|&sup2;)/gi, '²');
txt = txt.replace(/(<sup>3<\/sup>|&sup3;)/gi, '³');
//tags → wikicode
txt = txt.replace(/<\/?(b|strong)>/gi, "'''")
txt = txt.replace(/<\/?(i|em)>/gi, "''")
txt = txt.replace(/<hr ?\/?>/gi, '----')
//improve hr and br
txt = txt.replace(/<hr ([^\/>]+?) ?\/?>/gi, '<hr $1 />')
txt = txt.replace(/<br( [^\/>]+?)? ?\/?>/gi, '<br$1 />')
 
 
hideExpr('<[^>]*?>') //hide tags
hideExpr('\\w+ *= *"[^"]*"') //also tables attributes //[ \w%;:]
 
 
txt = txt.replace(/(\S)([ \t]{2,})([\S\r])/g, '$1 $3') //remove double spaces
txt = txt.replace(/[ \t]+(\n|\r)/g, '$1') //spaces at EOL
 
txt = txt.replace(/^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1') //spaces in section headers
txt = txt.replace(/([^\r\n])(\r?\n==.*==\r?\n)/g, '$1\n$2') //empty line before section header
 
 
//Temporary
txt = txt.replace(/–/g, '-')
txt = txt.replace(/«|»|“|”|„/g, '"')
txt = ' ' + txt
 
// Minus handler
txt = txt.replace(/(sup>|sub>|\s)-(\d)/g, '$1−$2')
// Replace hyphens and en dashes with normal dashes
txt = txt.replace(/&(#151|[nm]dash);/g, '—')
txt = txt.replace(/(&nbsp;|[\f\n\r\t\v\u00A0\u2028\u2029])(-|--|–) /g, '$1— ')
txt = txt.replace(/(\d)--(\d)/g, '$1—$2')
 
// Entities etc. -> Unicode chars
txt = txt.replace(/&copy;/gi,'©')
txt = txt.replace(/&reg;/gi,'®')
txt = txt.replace(/&sect;/gi,'§')
txt = txt.replace(/&euro;/gi,'€')
txt = txt.replace(/&yen;/gi,'¥')
txt = txt.replace(/&pound;/gi,'£')
txt = txt.replace(/&deg;/g,'°')
txt = txt.replace(/\(tm\)|\(тм\)|&trade;/gi,'™')
txt = txt.replace(/\.\.\.|&hellip;|&#133;/g,'…')
txt = txt.replace(/\+[--]|&plusmn;/g,'±')
txt = txt.replace(/~=/g,'≈')
txt = txt.replace(/\^2(\D)/g,'²$1')
txt = txt.replace(/\^3(\D)/g,'³$1')
txt = txt.replace(/&((la|ra|bd|ld)quo|#132|#147|#148|quot);/g,'"')
txt = txt.replace(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g,'$1’$2') //'
 
// Year ranges
txt = txt.replace(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-|--|–|—) ?([12]?\d{3})(\W)/g, '$1$2—$4$5')
txt = txt.replace(/([12]?\d{3}) ?(г\.|гг\.)/g, '$1\u00A0$2')
// Century ranges
txt = txt.replace(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-|--|–|—) ?([IVX]{1,5})(\W)/g, '$1$2—$4$5')
txt = txt.replace(/([IVX]{1,5}) ?(в\.|вв\.)/g, '$1\u00A0$2')
 
// Reductions
txt = txt.replace(/(Т|т)\. ?е\./g, '$1о есть')
txt = txt.replace(/(Т|т)\. ?к\./g, '$1ак как')
txt = txt.replace(/(В|в) т\. ?ч\./g, '$1 том числе')
txt = txt.replace(/и т\. ?д\./g, 'и\u00A0т\.\u00A0д\.')
txt = txt.replace(/и т\. ?п\./g, 'и\u00A0т\.\u00A0п\.')
txt = txt.replace(/(Т|т)\. ?н\./g, '$1\.\u00A0н\.')
txt = txt.replace(/н\. ?э\./g, 'н\.\u00A0э\.')
txt = txt.replace(/(Д|д)(о|\.) н\. ?э\./g, '$1о\u00A0н\.\u00A0э\.')
txt = txt.replace(/(\d) ?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]?г|с)\.?( ([^\.А-ЯЁ])|[,;.])(?!\[.*?\|[А-Я].*?\])/g, '$1\u00A0$2$3')
txt = txt.replace(/(\d) (тыс)([^\.А-Яа-яЁё])/g, '$1\u00A0$2.$3')
txt = txt.replace(/^== (Смотрите|См) также ==$/gm, '== См. также ==')
//txt = txt.replace(/(\d) (млн|млрд|трлн)([^А-Яа-яЁё])/g, '$1\u00A0$2$3')
 
// Insert/delete spaces
txt = txt.replace(/(\S) (-|--|–|—) (\S)/g, '$1\u00A0— $3')
txt = txt.replace(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, '$1\u00A0$2\u00A0$3')
txt = txt.replace(/([А-Я]\.)([А-Я]\.)/g, '$1 $2')
txt = txt.replace(/^([#*:]+)[ \t\f\v]*([^ \t\f\v*#:;])/gm, '$1 $2') //space after #*:
txt = txt.replace(/([а-я]\.)([А-ЯA-Z])/g, '$1 $2') // word. word
txt = txt.replace(/([)"а-яa-z\]])\s*,([\[("а-яa-z])/g, '$1, $2') // word, word
txt = txt.replace(/([)"а-яa-z\]])\s([,;])\s([\[("а-яa-z])/g, '$1$2 $3')
txt = txt.replace(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, '$1\u00A0$2') //5 %
txt = txt.replace(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2') //5%-й
txt = txt.replace(/([№§])(\s*)(\d)/g, '$1\u00A0$3')
txt = txt.replace(/\( +/g, '(').replace(/ +\)/g, ')') // (no spaces)
 
// Degrees
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, '$1$2\u00A0°C') //'
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, '$1$2\u00A0°F') //'
 
 
// "" → «»
txt = txt.replace(/([\x01-("\s|+\/])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
if (/"/.test(txt)){ //quotes inside "
  txt = txt.replace(/([\x01-("\s|])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
  while (/«[^»]*«/.test(txt))
    txt = txt.replace(/«([^»]*)«([^»]*)»/g, '«$1„$2“')
}
 
txt = txt.substr(1) //remove leading space
 
restoreAll()
 
if (window.auto_comment && insertSummary) insertSummary('Викификатор')
 
}
 
 
function hideExpr(expr){
 var ma = txt.match(new RegExp(expr, 'mgi'))
 if (!ma) return
 for (var i=0; i<ma.length; i++) {
   hidden[hidIdx] = ma[i].replace(/\$/g, '$$$$') //make all $ into $$ so they won't confuse replace() on restore
   txt = txt.replace(ma[i], '\x01' + hidIdx + '\x02')
   hidIdx++
 }
}
 
function hideTag(tag){
  hideExpr('<' + tag + '>[\\s\\S]+?<\\/' + tag + '>')
}
 
function restoreAll(){
 for (var i=hidIdx-1; i>=0; i--)
   txt = txt.replace('\x01' + i + '\x02', hidden[i])
}
 
}
//</source>