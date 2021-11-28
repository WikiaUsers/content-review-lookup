//<source lang=javascript>
var wmCantWork = 'Викификатор не может работать в вашем браузере.\n\nWikificator can not work in your browser' // английский текст для тех, кто не видит русские буквы
var wmFullText = 'Викификатор обработает ВЕСЬ текст на этой странице. Продолжить?'
var wmTalkPage = 'Викификатор не обрабатывает страницы обсуждения целиком.\n\nВыделите ваше сообщение — обработано будет только оно.'


function Wikify(){
 if (('code'.replace(/d/g, 'r') != 'core') //check regexp support
    || (navigator.appName=='Netscape' && navigator.appVersion.substr (0, 1) < 5))
  { alert(wmCantWork); return }

 var txt, hidden = [], hidIdx = 0, wpTextbox1 = document.editform.wpTextbox1
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
     //if (!window.opera) txt = txt.replace(/\r/g,'')
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
 txt = txt.replace(/^[\n\r]+/, '')
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
hideExpr('<source [^>]+>[\\s\\S]+?<\\/source>')
hideTag('code')
hideTag('tt')
hideTag('math')
hideTag('gallery')
hideExpr('{\\{[\\s\\S]+?}}') //templates
hideExpr('^ .*') //lines starting with space
hideExpr('(http|https|ftp|tftp|news|nntp|telnet|irc|gopher)://[^ \n\r\u00A0]* ?') //links
hideExpr('^#REDIRECT') 

txt = txt.replace(/(\[\[:?)category:( *)/ig, '$1Категория:')
// Year and century ranges
txt = txt.replace(/(?!ISBN)(\(|\s)(\[\[[12]?\d{3}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[12]?\d{3}\]\])(\W)/g, '$1$2—$4$5')
txt = txt.replace(/(\[\[[12]?\d{3}\]\]) ?(гг?\.)/g, '$1'+u+'$2')
txt = txt.replace(/(\(|\s)(\[\[[IVX]{1,5}\]\])[\u00A0 ]?(-|--|–|—) ?(\[\[[IVX]{1,5}\]\])(\W)/g, '$1$2—$4$5')
txt = txt.replace(/(\[\[[IVX]{1,5}\]\]) ?(вв?\.)/g, '$1'+u+'$2')

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

txt = txt.replace(/(\S)[ \t]+( |\n|\r)/g,'$1$2') //remove double spaces and spaces at EOL
txt = txt.replace(/^([#*:]+)[ \t\f\v]*([^ \t\f\v*#:;])/gm, '$1 $2') //space after #*: at the line start

//Entities 
txt = txt.replace(/&#(\d+);?/g,
                    function(n,a){return String.fromCharCode(a)})                        // &#769;
txt = txt.replace(/&#x([0-9a-f]{1,4});?/gi,
                    function(n,a){return String.fromCharCode(eval('0x'+a.substr(-4)))})  // &#x301;

//Headers
txt = txt.replace(/^(=+)[ \t\f\v]*(.*?)[ \t\f\v]*=+$/gm, '$1 $2 $1') //add spaces in section headers
txt = txt.replace(/([^\r\n])(\r?\n==.*==\r?\n)/g, '$1\n$2') //add empty line before section header
txt = txt.replace(/^== (С|с)м(\.?|отрите) ?также ==$/gm, '== См. также ==')
txt = txt.replace(/^== (С|с)носки ==$/gm, '== Примечания ==')
txt = txt.replace(/^== (.+)[.:] ==$/gm, '== $1 ==')


//Temporary replacements
txt = txt.replace(/–/g, '-')
txt = txt.replace(/«|»|“|”|„/g, '"')
txt = ' ' + txt

// Minus handler
txt = txt.replace(/(sup>|sub>|\s)-(\d)/g, '$1−$2')
// Replace hyphens and en dashes with normal dashes
txt = txt.replace(/&(#151|[nm]dash);/g, '—')
txt = txt.replace(/(&nbsp;|[\f\n\r\t\v\u00A0\u2028\u2029])(-|--|–) /g, '$1— ')
txt = txt.replace(/(\d)--(\d)/g, '$1—$2')

// Entities etc. → Unicode chars
txt = txt.replace(/&copy;/gi,'©')
txt = txt.replace(/&reg;/gi,'®')
txt = txt.replace(/&sect;/gi,'§')
txt = txt.replace(/&euro;/gi,'€')
txt = txt.replace(/&yen;/gi,'¥')
txt = txt.replace(/&pound;/gi,'£')
txt = txt.replace(/&deg;/g,'°')
txt = txt.replace(/\(tm\)|\(тм\)|&trade;/gi,'™')
txt = txt.replace(/\.\.\.|&hellip;/g,'…')
txt = txt.replace(/\+[--]|&plusmn;/g,'±')
txt = txt.replace(/~=/g,'≈')
txt = txt.replace(/\^2(\D)/g,'²$1')
txt = txt.replace(/\^3(\D)/g,'³$1')
txt = txt.replace(/&((la|ra|bd|ld)quo|quot);/g,'"')
txt = txt.replace(/([\wа-яА-ЯёЁ])'([\wа-яА-ЯёЁ])/g,'$1’$2') //'

// Year and century ranges
txt = txt.replace(/(\(|\s)([12]?\d{3})[\u00A0 ]?(-|--|–|—) ?([12]?\d{3})(\W)/g, '$1$2—$4$5')
txt = txt.replace(/([12]?\d{3}) ?(гг?\.)/g, '$1'+u+'$2')
txt = txt.replace(/(\(|\s)([IVX]{1,5})[\u00A0 ]?(-|--|–|—) ?([IVX]{1,5})(\W)/g, '$1$2—$4$5')
txt = txt.replace(/([IVX]{1,5}) ?(вв?\.)/g, '$1'+u+'$2')

// Reductions
txt = txt.replace(/(Т|т)\. ?е\./g, '$1о есть')
txt = txt.replace(/(Т|т)\. ?к\./g, '$1ак как')
txt = txt.replace(/(В|в) т\. ?ч\./g, '$1 том числе')
txt = txt.replace(/и т\. ?д\./g, 'и'+u+'т\.'+u+'д\.')
txt = txt.replace(/и т\. ?п\./g, 'и'+u+'т\.'+u+'п\.')
txt = txt.replace(/(Т|т)\. ?н\./g, '$1\.'+u+'н\.')
txt = txt.replace(/н\. ?э\./g, 'н\.'+u+'э\.')
txt = txt.replace(/(Д|д)(о|\.) н\. ?э\./g, '$1о'+u+'н\.'+u+'э\.')
txt = txt.replace(/(\d) ?(млн|млрд|трлн|(?:м|с|д|к)?м|[км]?г|с)\.?( ([^\.А-ЯЁ])|[,;.])(?!\[.*?\|[А-Я].*?\])/g, '$1'+u+'$2$3')
txt = txt.replace(/(\d) (тыс)([^\.А-Яа-яЁё])/g, '$1'+u+'$2.$3')
//txt = txt.replace(/(\d) (млн|млрд|трлн)([^А-Яа-яЁё])/g, '$1'+u+'$2$3')

// Insert/delete spaces
txt = txt.replace(/(\S) (-|--|–|—) (\S)/g, '$1'+u+'— $3')
txt = txt.replace(/([А-Я]\.) ?([А-Я]\.) ?([А-Я][а-я])/g, '$1'+u+'$2'+u+'$3')
txt = txt.replace(/([А-Я]\.)([А-Я]\.)/g, '$1 $2')
txt = txt.replace(/([а-я]\.)([А-ЯA-Z])/g, '$1 $2') // word. word
txt = txt.replace(/([)"а-яa-z\]])\s*,([\[("а-яa-z])/g, '$1, $2') // word, word
txt = txt.replace(/([)"а-яa-z\]])\s([,;])\s([\[("а-яa-z])/g, '$1$2 $3')
txt = txt.replace(/([^%\/\w]\d+?(?:[.,]\d+?)?) ?([%‰])(?!-[А-Яа-яЁё])/g, '$1'+u+'$2') //5 %
txt = txt.replace(/(\d) ([%‰])(?=-[А-Яа-яЁё])/g, '$1$2') //5%-й
txt = txt.replace(/([№§])(\s*)(\d)/g, '$1'+u+'$3')
txt = txt.replace(/\( +/g, '(').replace(/ +\)/g, ')') //inside ()

// Degrees
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])[CС])(?=[ "').,;!?|]|$)/gm, '$1$2'+u+'°C') //'
txt = txt.replace(/([ =≈≠≤≥<>("'|]|^)([+±−\-]?\d+?(?:[.,]\d+?)?)(([ °^*]| [°^*])F)(?=[ "').,;|!?]|$)/gm, '$1$2'+u+'°F') //'

// "" → «»
txt = txt.replace(/([\x01-("\s|+\/])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
if (/"/.test(txt)){ //quotes inside "
  txt = txt.replace(/([\x01-("\s|])"([^"]*)([^\s"(|])"/g, '$1«$2$3»') //"
  while (/«[^»]*«/.test(txt))
    txt = txt.replace(/«([^»]*)«([^»]*)»/g, '«$1„$2“')
}

txt = txt.substr(1) //remove leading space

restoreAll()

}


function hideExpr(expr){
 var ma = txt.match(new RegExp(expr, 'mgi'))
 if (!ma) return
 for (var i=0; i<ma.length; i++) {
   txt = txt.replace(ma[i], '\x01' + hidIdx + '\x02')
   hidden[hidIdx] = ma[i] 
   if ('0'.replace('0','$$') == '$') //$ in 2nd arg is special even if 1st arg is a string, except in IE
     hidden[hidIdx] = hidden[hidIdx].replace(/\$/g, '$$$$') //$ → $$, then it's converted back to $ on restore
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