function markBlocked( container ) {

var contentLinks = container ? $(container).find('a') : mw.util.$content.find('a').add('#ca-nstab-user a')

mw.util.addCSS('\
.user-blocked-temp{'   + (window.mbTempStyle||'opacity: 0.7; text-decoration: line-through') + '}\
.user-blocked-indef{'  + (window.mbIndefStyle||'opacity: 0.4; font-style: italic; text-decoration: line-through') + '}\
.user-blocked-tipbox{' + (window.mbTipBoxStyle||'font-size:smaller; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA') + '}\
')
var mbTooltip =  window.mbTooltip || '; blocked ($1) by $2: $3 ($4 ago)'

//get all aliases for user: & user_talk:
var userNS = []
for( var ns in wgNamespaceIds) 
  if( wgNamespaceIds[ns] == 2 || wgNamespaceIds[ns] == 3 ) 
    userNS.push( ns.replace(/_/g, ' ') + ':' )

//RegExp  for all titles that are  User:| User_talk: |  Special:Contributions/ (localized) | Special:Contributions/ (for userscripts)
var userTitleRX = new RegExp('^'
 + '(' + userNS.join('|')
 + '|Служебная:Вклад\\/|Special:Contributions\\/'
 + ')'
 + '([^\\/#]+)$', 'i')

//RegExp for links
var articleRX = new RegExp( '^' + wgArticlePath.replace('$1', '') + '([^#]+)' )
var scriptRX =  new RegExp( '^' + wgScript + '\\?title=([^#&]+)' )

var userLinks = {}
var url, ma, pgTitle


//find all "user" links and save them in userLinks : { 'users': [<link1>, <link2>, ...], 'user2': [<link3>, <link3>, ...], ... }
contentLinks.each(function(i, lnk){
   url = $(lnk).attr('href')
   if( !url || url.charAt(0) != '/' ) return
   else if( ma = articleRX.exec(url) ) pgTitle = ma[1]
   else if( ma =  scriptRX.exec(url) ) pgTitle = ma[1]
   else return
   pgTitle = decodeURIComponent(pgTitle).replace(/_/g, ' ')
   user = userTitleRX.exec(pgTitle)
   if( !user ) return
   user = user[2]
   $(lnk).addClass('userlink')
   if ( !userLinks[user] ) userLinks[user] = []
   userLinks[user].push(lnk)
})


//convert users into array
var users = []
for (var u in userLinks) users.push(u)
if( users.length == 0 ) return

//API request
var wgServerTime, apiRequests = 0
var waitingCSS = mw.util.addCSS('a.userlink {opacity:' + (window.mbLoadingOpacity||0.85) + '}')
while( users.length > 0 ){
  apiRequests++
 $.post( 
    mw.util.wikiScript('api') + '?format=json&action=query',
    { list: 'blocks', bklimit: 100, bkusers: users.splice(0,50).join('|'),
      bkprop: 'user|by|timestamp|expiry|reason' }, //no need for 'id|flags'
    markLinks
  )
}

return //the end



//callback: receive data and mark links
function markLinks(resp, status, xhr){

  wgServerTime = new Date( xhr.getResponseHeader('Date') )
  var list, blk, tip, links, lnk
  if( !resp || !(list=resp.query) || !(list=list.blocks) ) return

  for( var i=0; i<list.length; i++){
    blk = list[i]
    if( /^in/.test(blk.expiry) ){
      clss = 'user-blocked-indef'
      blTime = blk.expiry
    }else{
      clss = 'user-blocked-temp'
      blTime = inHours ( parseTS(blk.expiry) - parseTS(blk.timestamp) )
    }
    tip = mbTooltip.replace('$1', blTime).replace('$2', blk.by).replace('$3', blk.reason)
          .replace('$4', inHours ( wgServerTime - parseTS(blk.timestamp) ) )
    links = userLinks[blk.user]
    for (var k=0; k<links.length; k++){
       lnk = $(links[k]).addClass(clss)
       if( window.mbTipBox )
         $('<span class=user-blocked-tipbox>#</span>').attr('title', tip).insertBefore(lnk)
       else
         lnk.attr( 'title', lnk.attr('title') + tip )
    }
  }

  if( --apiRequests == 0 ){ //last response
    waitingCSS.disabled = true
    $('#ca-showblocks').parent().remove() // remove added portlet link
  }

}


//--------AUX functions

//20081226220605  or  2008-01-26T06:34:19Z   -> date
function parseTS(ts){
 var m = ts.replace(/\D/g,'').match(/(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/)
 return new Date ( Date.UTC(m[1], m[2]-1, m[3], m[4], m[5], m[6]) )
}

function inHours(ms){ //milliseconds -> "2:30" or 5,06d or 21d
 var mm = Math.floor(ms/60000)
 if( !mm ) return Math.floor(ms/1000)+'s'
 var hh = Math.floor(mm/60); mm = mm % 60
 var dd = Math.floor(hh/24); hh = hh % 24
 if (dd) return dd + (dd<10?'.'+zz(hh):'') + 'd'
 else return hh + ':' + zz(mm)
}

function zz(v){ // 6 -> '06'
 if( v <= 9 ) v = '0' + v
 return v
}


}// -- end of main function





//start on some pages
switch( wgAction ){
 case 'edit':
 case 'submit':
   break
 case 'view':
   if( wgNamespaceNumber == 0 ) break
   //otherwise continue with default
 default: //  'history', 'purge'
  $(function(){
     if( window.mbNoAutoStart )
       addPortletLink('p-cactions', 'javascript:markBlocked()', 'XX', 'ca-showblocks')
     else
       markBlocked()
  })
}