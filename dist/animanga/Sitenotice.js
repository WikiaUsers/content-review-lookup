/*<pre>*/

////////////////////////////////////////////
// Sitenotice functions.                  //
//   From [[User:Dantman/monobook.js]]    //
////////////////////////////////////////////

//Dismiss override and Undismiss function for Sitenotice. (Dismiss copied from wikia's script. Undismiss modified from it.)
function dismissNotice() {
	var date = new Date();
	date.setTime(date.getTime() + 30*86400*1000);
	document.cookie = cookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
	var element = document.getElementById('siteNotice');
	if( element ) element.parentNode.removeChild(element);
}
function undismissNotice() {
	var date = new Date();
	date.setTime(date.getTime() - 30*86400*1000);
	document.cookie = cookieName + "0; expires="+date.toGMTString() + "; path=/";
	
	var content = document.getElementById('content');
	var beforeFirstHeading = document.getElementById('beforeFirstHeading');
	var siteNotice = document.getElementById('siteNotice');
	var isBlank = false;
	if( siteNotice != undefined || siteNotice != null ) isBlank = siteNotice.innerHTML.match(/^<script(.|\n)*<\/script>\\s*$/i);
	else isBlank = true;
	if( isBlank ) {
		if( siteNotice == undefined || siteNotice == null ) siteNotice = document.createElement( 'div' );
		siteNotice.id = 'siteNotice';
		siteNotice.innerHTML = '<table width="100%"><tr><td width="80%">'+siteNoticeValue+'</td>'
			+ '<td width="20%" align="right">[<a href="javascript:dismissNotice();">'+msgClose+'</a>]</td></tr></table>';
		content.insertBefore( siteNotice, beforeFirstHeading );
	}
}

/*** SiteNotice changer ***/
function trySiteNoticeChange() {
	if(wgPageName == "MediaWiki:Sitenotice_id" && queryString('action',true).match(/edit|submit/) && queryString('do')) {
		//Are we here to alter the sitenotice id.
		doThis = queryString('do')
		if( doThis == 'inc' ) {
			//Modify the form
			var wpTextbox1 = document.getElementById('wpTextbox1');
			var num = parseInt( wpTextbox1.value.replace( /(.*[^0-9])?([0-9]+)([^0-9].*)?/, '$2' ) ) + 1;
			if( isNaN( num ) ) num = 1;
			wpTextbox1.value = num;
			document.getElementById('wpSummary').value = "Display new Sitenotice (increment id)"
			document.getElementById('wpMinoredit').checked = 'checked';
			//Submit it!
			document.getElementById('editform').submit();
		}
	}
}

/*</pre>*/