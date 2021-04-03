hookEvent( 'load', displayTimer );



/**** function displayTimer.js
 * (c) 2008 by Patrick Westerhoff
 */
function displayTimer ()
{
  if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
    return;
  
  var date;
  var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
  var timerLink   = document.createElement( 'a' );
  var timerObj    = document.createElement( 'li' );
  timerLink.href               = '/wiki/' + wgPageName + '?action=purge';
  timerLink.title              = 'Purge the server cache and update the contents of this page.'
  timerObj.id                  = 'pt-timer';
  timerObj.style.textTransform = 'none';
  timerObj.style.fontWeight    = 'bold';
  timerObj.appendChild( timerLink );
  timerParent.insertBefore( timerObj, timerParent.firstChild );
  
  function actualizeUTC ()
  {
    timerDate           = new Date();
    timerLink.innerHTML = ( timerDate.getUTCHours()   < 10 ? '0' : '' ) + timerDate.getUTCHours()   + ':'
                        + ( timerDate.getUTCMinutes() < 10 ? '0' : '' ) + timerDate.getUTCMinutes() + ':'
                        + ( timerDate.getUTCSeconds() < 10 ? '0' : '' ) + timerDate.getUTCSeconds() + ' (UTC)';
  }
  
  function actualizeCustom ( offset )
  {
    timerDate           = new Date();
    timerDate.setMinutes( timerDate.getMinutes() + timerDate.getTimezoneOffset() + offset * 60 );
    timerLink.innerHTML = ( timerDate.getHours()   < 10 ? '0' : '' ) + timerDate.getHours()   + ':'
                        + ( timerDate.getMinutes() < 10 ? '0' : '' ) + timerDate.getMinutes() + ':'
                        + ( timerDate.getSeconds() < 10 ? '0' : '' ) + timerDate.getSeconds()
                        + ' (UTC' + ( offset < 0 ? '' : '+' ) + offset + ')';
  }
  
  // start
  if ( typeof( timerTimezone ) !== 'number' )
  {
    actualizeUTC();
    setInterval( actualizeUTC, 1000 );
  }
  else
  {
    actualizeCustom( timerTimezone );
    setInterval( actualizeCustom, 1000, timerTimezone );
  }
}

/* Highlight Admins */
table.diff a[href|="/wiki/User:Unendingfear"], 
ul.special li a[href|="/wiki/User:Unendingfear"], 
span.changedby a[href|="/wiki/User:Unendingfear"], 
div table tr td a[href|="/wiki/User:Unendingfear"], 
ul#pagehistory li a[href|="/wiki/User:Unendingfear"]
table.diff a[href|="/wiki/User:To-mos"], 
ul.special li a[href|="/wiki/User:To-mos"], 
span.changedby a[href|="/wiki/User:To-mos"], 
div table tr td a[href|="/wiki/User:To-mos"], 
ul#pagehistory li a[href|="/wiki/User:To-mos"]
table.diff a[href|="/wiki/User:Halogod35"], 
ul.special li a[href|="/wiki/User:Halogod35"], 
span.changedby a[href|="/wiki/User:Halogod35"], 
div table tr td a[href|="/wiki/User:Halogod35"], 
ul#pagehistory li a[href|="/wiki/User:Halogod35"] {
	color: #009900;
}