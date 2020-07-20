/**
 ************* FastRevert *******************
 * Allows one to restore an old version     *
 *                                          *
 * Author: Quentinv57, for Wikimedia        *
 *          -- 06 Feb. 2010 --              *
 ********************************************
 */
 
// _GET code from NoGray JS Library http://www.nogray.com/new_site/
var _GET = new Array();
var _uri = location.href;
 
var _temp_get_arr = _uri.substring(_uri.indexOf('?')+1, _uri.length).split("&");
 
var _temp_get_arr_1 = new Array();
 
for(_get_arr_i=0; _get_arr_i<_temp_get_arr.length; _get_arr_i++) {
	_temp_get_arr_1 = _temp_get_arr[_get_arr_i].split("=");
	_GET[decodeURI(_temp_get_arr_1[0])] = decodeURI(_temp_get_arr_1[1]);
}
 
delete _uri; delete _temp_get_arr; delete _temp_get_arr_1;

 
$( document ).ready( function () { 
	if (location.href.match(/&action=history/)) {
		var chemin = '//allthetropes.orain.org/w/index.php?action=edit&retablir';
		
		var pagehistory = document.getElementById('pagehistory');
                pagehistory = pagehistory && pagehistory.getElementsByTagName('li');
		
		for (var x = 0; x < pagehistory.length - 1; x++)
		{
			var atags = pagehistory[x].getElementsByTagName('a');
			if (x==0) {
				var user2 = atags[2].innerHTML;
			} else {
				var user = atags[3].innerHTML,
					oldid = atags[2].href.match('&oldid=([0-9]+)')[1],
					revertLink = document.createElement( "a" );
				revertLink.href = chemin+'&oldid='+oldid+'&user='+user+'&user2='+user2;
				revertLink.appendChild( document.createTextNode( "FastRevert" ) );
				pagehistory[x].appendChild( document.createTextNode( "(" ) );
				pagehistory[x].appendChild( revertLink );
				pagehistory[x].appendChild( document.createTextNode( ")" ) );
		}}

	} else if (location.href.match(/&retablir&/)) {
		var message = prompt ('What message do you want to leave?', 'Reverted edits by [[Special:Contributions/'+_GET['user2']+'|'+_GET['user2']+']]');
		
		if (message) {
			document.getElementById('wpSummary').value = message + '; Restore to version '+_GET['oldid']+' by [[Special:Contributions/'+_GET['user']+'|'+_GET['user']+']]';
		} else {
			document.getElementById('wpSummary').value = 'Restore to version '+_GET['oldid']+' by [[Special:Contributions/'+_GET['user']+'|'+_GET['user']+']]';
		}
		
		if (message != null) document.getElementById('editform').submit();
	}
});