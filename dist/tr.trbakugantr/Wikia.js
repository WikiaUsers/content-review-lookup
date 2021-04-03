// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
//Automatically refreshes recent changes.
importScriptPage('AjaxRC/code.js', 'dev');
 
 
 
/* skin change buttons */
function CreateSkinChangeButtons() {
	//Oasis buttons
	$('div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook" accesskey="b" class="wikia-button secondary" id="skinChangeButton" data-id="monobookbutton">Monobook</a><a style="margin:0 42px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector" accesskey="v" class="wikia-button secondary" id="skinChangeButton" data-id="vectorbutton">Vector</a>');
	//Monobook buttons
	$('#p-cactions .pBody ul li:nth-last-child(1)').after('<li id="ca-nstab-main" class="skinChangeTab" style="margin:0 3px 0 36px"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li><li id="ca-nstab-main" class="skinChangeTab"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector [v]" id="skinChangeButton" accesskey="o">Vector</a></li>');
}
addOnloadHook(CreateSkinChangeButtons);
 
 
// ============================================================
// displayTimer
// ============================================================
 
//Add a clock to the WikiHeader
//Modified from work by Patrick Westerhoff [poke]:
//http://bulbapedia.bulbagarden.net/wiki/MediaWiki:Monobook.js
 
hookEvent( 'load', displayTimer );
 
function displayTimer ()
{
    if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
        return;
 
    var date;
 
    if (skin == 'oasis')
    {
    var timerParent = document.getElementById( 'WikiHeader' ).getElementsByTagName( 'div' )[0];
    }
 
    if (skin == 'monobook')
    {
    var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
    }
 
    var timerLink   = document.createElement( 'a' );
    var timerObj    = document.createElement( 'li' );
    timerLink.href               = '/wiki/' + wgPageName + '?action=purge';
    timerLink.title              = 'Purge the server cache and update the contents of this page.'
    timerObj.id                  = 'displayTimer';
    timerObj.style.textTransform = 'none';
    timerObj.style.fontWeight    = 'bold';
    timerObj.style.fontSize      = '100%';
    timerObj.appendChild( timerLink );
    timerParent.insertBefore( timerObj, timerParent.firstChild );
 
    if (skin == 'oasis')
    {
        $('#displayTimer').css({'position': "inherit", 'right': "0px", 'top': "-28px"});
    }
 
    var month = new Array(12);
        month[0]  = "Jan";
        month[1]  = "Feb";
        month[2]  = "Mar";
        month[3]  = "Apr";
        month[4]  = "Mayıs";
        month[5]  = "Jun";
        month[6]  = "Jul";
        month[7]  = "Aug";
        month[8]  = "Sep";
        month[9]  = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
 
    function actualizeUTC ()
    {
        timerDate           = new Date();
        timerLink.innerHTML = ( timerDate.getUTCDate()     < 10 ? '0' : '' ) + timerDate.getUTCDate()     + ' '
                            + ( timerDate.getUTCMonth()    < 10 ? '' : ''  ) + month[timerDate.getUTCMonth()] + ' '
                            + ( timerDate.getUTCFullYear() < 10 ? '0' : '' ) + timerDate.getUTCFullYear() + ' '
                            + ( timerDate.getUTC+3Hours()    < 10 ? '0' : '' ) + timerDate.getUTC+3Hours()    + ':'
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