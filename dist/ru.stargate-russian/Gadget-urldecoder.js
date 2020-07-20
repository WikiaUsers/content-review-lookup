//[[ВП:Гаджеты/Упрощение ссылок]]

if( wgAction == 'edit' || wgAction == 'submit' ){
  mwCustomEditButtons['urldecoder'] = [urlDecoderRun, 'commons/9/91/Link_go.png', 'Раскодировать URL перед курсором или все URL в выделенном тексте']
  if( ! $.fn.textSelection ) mw.loader.load([ 'jquery.textSelection' ])
}

function urlDecoderRun(){ //main function


//2nd-lvl WMF domains; old secure link:     .../wikipedia/mediawiki, .../wikipedia/foundation 
var wmDomain  = {
 mediawiki: 'mw',
 wikimediafoundation: 'foundation' }
//2nd-lvl WMF domains with multiple languages; old secure link:   wikinews/en 
var wmDomainM = {
 wikipedia:'w',
 wikibooks:'b',
 wikinews:'n',
 wikiquote:'q',
 wikisource:'s',
 wikiversity:'v',
 wiktionary:'wikt'}
//3rd-lvl WMF domains on .wikimedia.org; for some reason old secure link is  wikipedia/*
var wmSubDomains = /^(meta|commons|incubator|species|strategy)$/

var httpRegExp = '(https?:\\/\\/[^\\]\\[\\n\\r<>" ]+)' //  any chars except []<>" and \n and spaces
var localPrefix = WMPrefixes( unSecure(wgServer.replace(/^\/\//,'http://') + wgScript) )
var oldText, newText, isBeforeCursor, colonNS

tbox = $('#wpTextbox1').focus()
oldText =  tbox.textSelection( 'getSelection' )


if( oldText ){ //there was selection

 var rx = RegExp('(\\[{0,2})' + httpRegExp + '([^\\]\\[\\n\\r]*?\\]\\]?)?', 'ig')
 newText = oldText.replace(rx, simplifyMatched)

 if( window.urlDecoderIntLinks ){
   var ut = '(' + wgFormattedNamespaces[3].replace(/ /g,'_') + '|user_talk)' //both localized and canonical 'user_talk'
   ut = RegExp ('\\[\\[' + ut.toLowerCase() + ':[^#]+$', 'i')
   newText = newText.replace(/\[\[[^\]\|\n]+/g, function(lnk){
      return ut.test(lnk) ? lnk : decodeAnchor(lnk) // skip user_talk, usually found in signatures
   })
 }

 if( newText == oldText) return


}else{ //process text before cursor

 isBeforeCursor = true

 //move back enough characters
 var caretPos = tbox.textSelection('getCaretPosition')
 var beginPos = caretPos - 2000
 if( beginPos < 0 ) beginPos = 0
 tbox.textSelection( 'setSelection', {start:beginPos, end:caretPos} )
 oldText = tbox.textSelection( 'getSelection' )
 tbox.textSelection( 'setSelection', {start:caretPos, end:caretPos} )

 //try to find http in oldText
 var rx = new RegExp('(\\[{0,2})'+httpRegExp+'( +[^\\]\n]+)?\\]{0,2}$', 'i')
 var ma = rx.exec( oldText ) // result: (whole string)' '[', 'http:...', ' name]'
 if( !ma ) return
 oldText = ma[0]
 if( ma[3] ) //link with name: automatically add brackets
   newText = simplifyMatched(ma[0], '[', ma[2], ma[3]+']')
 else //just url: add closing bracket only if there is leading bracket
   newText = simplifyMatched(ma[0], ma[1], ma[2], ma[1]?']':'')

 if( oldText == newText ) return
 tbox.textSelection( 'setSelection', {start: caretPos - oldText.length, end: caretPos} )

}

//replace text
tbox.textSelection( 'encapsulateSelection', {replace:true, peri:newText} )

//end of main code
return





//---FUNCTIONS


function simplifyMatched(str, bracket, url, rest){//arguments: (whole string), '[', url, ' name]'

 if( !bracket ){//no brackets, just url
   var trail = RegExp(
     '['
      + ',;\\\\\.:!\\?' //trailing punctuation, per Parser.php
      + ( /\(/.test(url) ? '' : '\\)' ) //also closing bracket without opening bracket
      + ']+$'
      + "|''+$" //or possible bold/italic at the end of url
    )
    .exec( url )  
   if( trail ){
     url = url.substring( 0, url.length - trail[0].length ) //move these out of url
   }
   return decodeUrl(url) + str.substring(url.length)

 }else if( rest ){ //both brackets and possibly name
   return decodeUrl(url, rest.replace(/\]+$|^ +| +$/g,'')) //trim ending brackets and spaces in 'name]'

 }else{
   return str //probably broken wikicode in selected text
 }
 
}



function decodeUrl(url, name){ //url -> %-decoded -> [[link|name]] (if possible); name is optional

 var decodingFailed //need to skip some strange percent-encoded URIs
 url = unSecure(url)

 //percent-decoding
 if( url.indexOf('%') != -1 )
 try {
   url = decodeURI(url)
   url = url.replace(/%(3B|2F|2C|3A)/g, decodeURIComponent) //decode ;/,:
   url = url.replace(/[ <>"\[\]\n\r|]/g, encodeURIComponent) //" some disallowed chars, and pipe can screw template params
 } catch(e){
   decodingFailed = true
 }

 if( isBeforeCursor ) //user-defined conversion to eng keywords
   for( var n in window.urlDecoderEngNames )
     url = url.replace(RegExp('(title=|wiki\/)('+urlDecoderEngNames[n]+':)'), '$1' + n + ':')

 //try converting to internal link
 if( !decodingFailed && !/(\}\}|\|)$/.test(url) ) //trailing | or }}  could mean a part of a template, skip to be safe
   var link = toWikilink(url)

 //user-defined function
 if( window.urlDecoderCustom ){
     url = urlDecoderCustom(url)
     if( ! /^(https?:\/\/|\{\{)/.test(url) ) link = url //was converted to internal link
 }

 //return internal link
 if( link ){
   link = link.replace(/%(3f|26|22)/ig, decodeURIComponent) //decode ?&"
    if( (wgNamespaceNumber==0 || wgNamespaceNumber==14) && isBeforeCursor )
      link = link.replace(/^:/,'') //probably user adding interwiki
   return '[\[' + link + (name?'|'+name:'') + ']]'
 }

 //or return external link
 if( typeof name == 'string' ){
   if( isBeforeCursor ) url = url.replace(/''/g,'%27%27') //techically '' should stop URL, but more likely it's part of it
   return '[' + url + (name?' '+name:'') + ']' //empty name
 }else{
   return url
 }

}



function toWikilink(url){ // 'http://xx.wikipedia.org/wiki/YY'   ->   xx:YY

 //add bugzilla to user-defined prefixes
 urlDecoderPrefixes = $.extend( window.urlDecoderPrefixes,
   { 'https://bugzilla.wikimedia.org/show_bug.cgi?id=' : 'mediazilla' } )

 //apply user-defined prefixes
 for( var key in urlDecoderPrefixes )
   if( url.toLowerCase().indexOf(key) != -1 )
      return urlDecoderPrefixes[key] + ':' + url.substring( url.indexOf(key) + key.length )

 //check if we can convert to internal link with WM prefixes
 var ma = /^(https?:\/\/[^\/]+)\/wiki\/([^?]+)$/.exec( url )// 1:'http://domain.org'  2:part after /wiki/
 if( !ma ) return null
 var linkPrefix = WMPrefixes( ma[1] )
 if( !linkPrefix) return null

 //convert to internal
 var title = decodeAnchor( ma[2] )
 var prefixes = ''
 if( linkPrefix[0] && (linkPrefix[0] != localPrefix[0]) ) prefixes = linkPrefix[0]
 if( linkPrefix[1] && (linkPrefix[1] != localPrefix[1]) ) prefixes += ':' + linkPrefix[1]
 if( prefixes || isColonNeeded(title) ) prefixes += ':' //colon after prefix or leading colon on cat/file link
 return prefixes + title

}




function decodeAnchor(link){//simplify internal link: replace %20 and _ then decode anchor
 link = link.replace(/(_|%20)/g, ' ').replace(/^ +| +$/g, '')
 var parts = link.split('#')
 if( parts.length != 2 ) return link //no anchor
 var anchor = parts[1], hidIdx = -1, hidden = []
 //decode 4, 3 and 2-byte: http://en.wikipedia.org/wiki/UTF-8
 anchor = anchor.replace(/\.F[0-4]\.[89AB][\dA-F]\.[89AB][\dA-F]\.[89AB][\dA-F]/g, deChar)
 anchor = anchor.replace(/\.E[\dA-F]\.[89AB][\dA-F]\.[89AB][\dA-F]/g, deChar)
 anchor = anchor.replace(/\.[CD][\dA-F]\.[89AB][\dA-F]/g, deChar)
 anchor = anchor.replace( //hide IPs
/(?:^|[^0-9A-F\.])(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/,
   function(s){ hidden[++hidIdx] = s; return '\x01' + hidIdx + '\x02' }
 )
 //decode 1-byte chars: all symbols except  -.:_  and []{} prohibited in links
 anchor = anchor.replace(/\.[2-7][0-9A-F]/g, function(hhh){
   var ch = deChar(hhh)
   if( '!"#$%&\'()*+,/;<=>?@\\^`~'.indexOf(ch) >= 0 ) return ch
   else return hhh
 })
 //unhide IPs and return
 for( var i=hidIdx; i>=0; i-- ) anchor = anchor.replace('\x01'+i+'\x02', hidden[i])
 if( anchor.indexOf("''") != -1 ) return link //cannot have double '' in link
 else return parts[0] + '#' + anchor

 function deChar(ss){
  try{ss = decodeURIComponent(ss.replace(/\.([0-9A-F][0-9A-F])/g, '%$1'))} catch(e){}
  return ss
 }
}





function WMPrefixes(url){  // http: //en.wikipedia.org/wiki/...  -> [ 'w',  'en']

 var dd = /^https?:\/\/([a-z\.]+)\.org/.exec( url.toLowerCase() )
 if( !dd ) return null
 dd = dd[1].split('.') //domains, e.g. ['en','wikipedia']
 if( dd.length > 2 ) return null //too many subdomains, possibly mobile site XX.m.wikipedia.org/

 var lang = '', proj = '', domain = dd.pop(), subdomain = dd.pop()
 if( subdomain == 'www' ) subdomain = ''

 if( domain == 'wikimedia' ){  // *.wikimedia.org
   if( !subdomain )
     proj = 'foundation'
   else if( wmSubDomains.test(subdomain) )
     proj = subdomain
   else 
     return null

 }else if( (proj = wmDomain[domain]) && !subdomain ){ // mediawiki.org & wikimediafoundation.org
    //done: proj is set 

 }else if( proj = wmDomainM[domain] ){ //multi-lang domains
   if( !subdomain );
     //done: e.g. 'wikisource.org'
   else if( proj == 'w' && subdomain == 'test' )
     proj = 'testwiki'
   else if( subdomain.length >= 2 )
     lang = subdomain
   else
     return null

 }else return null //unrecognized domain

 return [proj, lang]

}



function unSecure(url){
 
 var mm = /https:\/\/secure\.wikimedia\.org\/(\w+)\/(\w+)\/([^\]\|\n\r ]+)/i.exec( url )
 if( !mm) return url
 var domain = mm[1].toLowerCase(), sub = mm[2].toLowerCase()

 if( ! wmDomainM[domain] ) return url //domain not recognized
 
 if( domain == 'wikipedia' ) //handle some special cases
   switch( sub ){ 
     case 'mediawiki':  sub = 'www'; domain = 'mediawiki'; break
     case 'foundation': sub = ''; domain = 'wikimediafoundation'; break
     case 'sources':    sub = ''; domain = 'wikisource'; break
     default: 
       if( wmSubDomains.test(sub) )  domain = 'wikimedia' // .../wikipedia/meta -> meta.wikimedia.org
       //otherwise: consider it language: .../wikipedia/en
   }
 
 return 'http://' + (sub ? sub + '.' : '') + domain + '.org/' + mm[3]
        
}

function isColonNeeded(pg){
 if( ! /:/.test(pg) ) return false
 if( ! colonNS ){ //define list of all possible category and file namespaces
    var list = ['file', 'category'] //canonical aliases
    //if( !window.wgNamespaceIds ) return  alert('Warning: wgNamespaceIds not defined, old MediaWiki version?');
    for( var name in wgNamespaceIds )
      if( (wgNamespaceIds[name]==6 || wgNamespaceIds[name]==14) && $.inArray(name, list) == -1 )
          list.push(name)
    colonNS = RegExp( '^(' + list.join('|') + ') *:', 'i')
 }
 return colonNS.test( $.trim(pg) )
}
 
 
}