/* Any JavaScript here will be loaded for all users on every page load. */
 
// ============================================================
// displayTimer
// ============================================================
 
// Add a clock to the WikiHeader
// Modified from work by Patrick Westerhoff [poke]:
// http://bulbapedia.bulbagarden.net/wiki/MediaWiki:Monobook.js
 
hookEvent( 'load', displayTimer );
 
function displayTimer() {
  if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
    return;
 
  var date;
 
  if (skin == 'oasis') {
    var timerParent = document.getElementById( 'WikiHeader' ).getElementsByTagName( 'div' )[0];
  }
 
  if (skin == 'monobook') {
    var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
  }
 
  var timerLink = document.createElement( 'a' );
  var timerObj = document.createElement( 'li' );
  timerLink.href = '/wiki/' + wgPageName + '?action=purge';
  timerLink.title = 'Limpar a cache do servidor e actualizar o conteúdo desta página.'
  timerObj.id = 'displayTimer';
  timerObj.style.textTransform = 'none';
  timerObj.style.fontWeight = 'bold';
  timerObj.style.fontSize = '100%';
  timerObj.appendChild( timerLink );
  timerParent.insertBefore( timerObj, timerParent.firstChild );
 
  if (skin == 'oasis') {
    $('#displayTimer').css({'position': "inherit", 'right': "10px", 'top': "-50px"});
  }
 
  var month = new Array(12);
      month[0] = "Jan";
      month[1] = "Fev";
      month[2] = "Mar";
      month[3] = "Abr";
      month[4] = "Maio";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Ago";
      month[8] = "Set";
      month[9] = "Out";
      month[10] = "Nov";
      month[11] = "Dez";
 
    function actualizeUTC ()
    {
        timerDate           = new Date();
        timerLink.innerHTML = ( timerDate.getUTCDate()     < 10 ? '0' : '' ) + timerDate.getUTCDate()     + ' '
                            + ( timerDate.getUTCMonth()    < 10 ? '' : ''  ) + month[timerDate.getUTCMonth()] + ' '
                            + ( timerDate.getUTCFullYear() < 10 ? '0' : '' ) + timerDate.getUTCFullYear() + ' '
                            + ( timerDate.getUTCHours()    < 10 ? '0' : '' ) + timerDate.getUTCHours()    + ':'
                            + ( timerDate.getUTCMinutes()  < 10 ? '0' : '' ) + timerDate.getUTCMinutes()  + ':'
                            + ( timerDate.getUTCSeconds()  < 10 ? '0' : '' ) + timerDate.getUTCSeconds()  + ' (UTC)';
    }
 
    function actualizeCustom ()
    {
        timerDate           = new Date();
        timerDate.setMinutes  ( timerDate.getMinutes() + timerDate.getTimezoneOffset() + timerTimezone * 60 );
        timerLink.innerHTML = ( timerDate.getDate()     < 10 ? '0' : '' ) + timerDate.getDate()     + ' '
                            + ( timerDate.getMonth()    < 10 ? '' : ''  ) + month[timerDate.getMonth()] + ' '
                            + ( timerDate.getFullYear() < 10 ? '0' : '' ) + timerDate.getFullYear() + ' '
                            + ( timerDate.getHours()    < 10 ? '0' : '' ) + timerDate.getHours()    + ':'
                            + ( timerDate.getMinutes()  < 10 ? '0' : '' ) + timerDate.getMinutes()  + ':'
                            + ( timerDate.getSeconds()  < 10 ? '0' : '' ) + timerDate.getSeconds()
                            + ' (UTC' + ( timerTimezone  < 0 ? '' : '+' ) + timerTimezone + ')';
    }
 
    // start
    if ( typeof( timerTimezone ) !== 'number' )
    {
        actualizeUTC();
        setInterval( actualizeUTC, 1000 );
    }
    else
    {
        actualizeCustom();
        setInterval( actualizeCustom, 1000 );
    }
}