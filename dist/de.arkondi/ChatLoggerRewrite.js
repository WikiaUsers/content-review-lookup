/*
 *  Arbeit unterbrochen
 */

/*
 * Original: http://runescape.wikia.com/wiki/User:Joeytje50/ChatLogger.js
 * Rewrite by: [[Benutzer:Arkondi]]
 */

var i18n = {
  submit_button_text  : 'Submit Log',
  submit_button_title : 'Submit chat log',
  names_for_months    : mw.config.get( 'wgMonthNames' ).slice(1),
  location            : 'Project:Chat/Logs/',
  edit_summary        : 'added with [[MediaWiki:ChatLoggerRewrite.js|ChatLoggerRewrite]]',
  api_error           : 'API-Fehler',
  submit_failed_1     : 'Fehler beim Schreiben von: ',
  submit_failed_2     : ''
}

if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Chat' && mw.config.get( 'skin' ) == 'oasis' ) {
$( '<a></a>' )
  .addClass( 'wikia-button' )
  .css({
    'position' : 'absolute',
    'right'    : '50px',
    'top'      : '0'
  })
  .attr({
    'title' : i18n.submit_button_title,
    'href'  : 'javascript:submitLog()'
  })
  .text( i18n.submit_button_text )
  .appendTo( 'form#Write' );

if ( $.cookie( 'lastRestart' ) == '' ) {
  $.cookie( 'lastRestart', 0, 1000 )
}

//-------

function restartChat() {
  window.chatwindow = window.open( '/index.php?title=Special:Chat&useskin=wikia' );
  window.chatwindow.onload = function() {
    (function( wgUserName ) {
      importArticles({
        type     : 'script',
        articles : [
          'w:c:community:User:' + wgUserName + '/global.js',
          'User:' + wgUserName + '/wikia.js'
          ]
      });
      importArticles({
        type     : 'style',
        articles : [
          'w:c:community:User:' + wgUserName + '/global.css',
          'User:' + wgUserName + '/wikia.css'
        ]
      });
    })( mw.config.get( 'wgUserName' ) );
    window.close();
  }
}

var d = new Date()
var timeTillMidnight = ((23-d.getUTCHours())*60*60000)+((59-d.getUTCMinutes())*60000)+((60-d.getUTCSeconds())*1000)
setTimeout('setInterval("submitLog()",86400000)',timeTillMidnight)
setTimeout('submitLog()',timeTillMidnight)
var logInterval = logInterval ? logInterval : 3600000;

//-------

function toUTCTime(ts) {
  var tz = d.getTimezoneOffset()/60;
  var hour = parseInt(ts.split(':')[0]);
  var UTChour = hour+tz;
  if (UTChour<1) {
    UTChour = 12+UTChour;
  } else if (UTChour>12) {
    UTChour = UTChour-12;
  }
  var UTCtime = ((UTChour+'').length==1?'0':'')+UTChour+':'+ts.split(':')[1]+(ts.split(':').length>=3?':'+ts.split(':')[2]:'');
  return UTCtime;
}

//-------

function getLog(exists,content) {
  //Getting arrays with messages and senders
  var allmsgs = document.getElementsByClassName('Chat')[0].getElementsByClassName('message');
  var message = allmsgs[0].innerHTML;
  var msguser = allmsgs[0].parentNode.getAttribute('data-user');
  var msgtime = toUTCTime(allmsgs[0].parentNode.getElementsByClassName('time')[0].innerHTML);
  for (i=1;allmsgs[i];i++) {
    message += '<|>'+allmsgs[i].innerHTML;
    msguser += '<|>'+allmsgs[i].parentNode.getAttribute('data-user');
    msgtime += '<|>'+toUTCTime(allmsgs[i].parentNode.getElementsByClassName('time')[0].innerHTML);
  }
  message = message.split('<|>')
  msguser = msguser.split('<|>')
  msgtime = msgtime.split('<|>')
  //Turning the format into a log instead of arrays
  var ChatLog='';
  for (i=0;message[i];i++) {
    ChatLog += '['+msgtime[i]+'] <'+msguser[i]+'> '+message[i]+'\n'
  }
  while (ChatLog.match(/\n[^\[]/)) {
    ChatLog = ChatLog.replace(/\[(\d\d?:\d\d)\] <([^>]*)> (.*)\n([^\[<])/g, '[$1] <$2> $3\n[$1] <$2> $4')
  }
  var wikilinks = new RegExp('<a href="'+wgServer+'/wiki/([^"]*)">([^<]*)</a>','g')
  ChatLog = ChatLog.replace(/( |  ){2,}/g, ' ').replace(/<img src="[^"]+".*?alt="([^"]+)"[^>]*>/g, '$1').replace(wikilinks, function(match,page,title) {return '[['+page.replace(/_/g,' ')+'|'+title+']]'}).replace(/\[\[([^\]]*?) {2,}/g, '[[$1 ').replace(/\[\[([^|]*)\|\1]]/g, '[[$1]]').replace(/<a href="([^"]+)">[^<]*<\/a>/g, '$1').replace('[['+wgServer+'/wiki/]]', wgServer+'/wiki/') //HTML img and a tag fixes
  active().clearWindow()
  var returnThis = exists ? content.replace('</pre>',ChatLog+'</pre>'):'<pre class="ChatLog">\n'+ChatLog+'</pre>\n[[Category:Wikia Chat logs|<strong class="error">Fehler: Ungültige Zeitangabe</strong>]]'
  return returnThis
}

function callAPI(data, method, callback) {
  data.format = 'json';
  $.ajax({
    data     : data,
    dataType : 'json',
    url      : mw.util.wikiScript( 'api' ),
    type     : method,
    success  : function( response ) {
      if ( response.error ) {
        showError( 'API error: ' + response.error.info );
      }
      else {
        callback( response );
      }
    },
    error    : function( xhr, error ) {
      showError( 'AJAX error: ' + error );
    }
  });
}

function submitLog( restart ) {
  restart = restart ? restart : false;
  var d = new Date()
  var monthNames = i18n.names_for_months;
  var date = d.getUTCDate() + '_' + monthNames[d.getUTCMonth()] + '_' + d.getUTCFullYear()
  mw.loader.using( 'mediawiki.api', function() {
    ( new mw.Api() )
      .get( {
        action       : 'query',
        prop         : 'info|revisions',
        intoken      : 'edit',
        titles       : i18n.location + date,
        rvprop       : 'content',
        rvlimit      : '1',
        indexpageids : '',
        format       : 'json'
      } )
      .done( function( response ){
        var page = response.query.pages[response.query.pageids[0]];
        var pageExists = !page.hasOwnProperty( 'missing' );
        var content = typeof( page.revisions ) != 'undefined' ? page.revisions[0]['*'] : '';
        (new mw.Api() )
          .post( {
            minor          : '',
            bot            : '',
            summary        : i18n.edit_summary,
            action         : 'edit',
            title          : i18n.location + date,
            starttimestamp : page.starttimestamp,
            token          : page.edittoken,
            text           : getLog( pageExists, content )
          } )
          .done( function(){
            restart ? restartChat() : '';
          } )
          .fail( function(){
            console.log( i18n.submit_failed_1 + i18n.location + date + i18n.submit_failed_2 );
          } );
      } )
      .fail( function( response ){
        console.log( i18n.api_error + '\n' + response.error.info );
      } );
  } );
}

setInterval('submitLog()', logInterval);

}