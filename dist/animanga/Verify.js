/*<pre>*/

/////////////////////////////////////////////////
// Verification functions for various scripts. //
//   From [[User:Dantman/monobook.js]]         //
/////////////////////////////////////////////////

var isSysop;
var sysopAt;
var isStatusChange;
var statusChangeAt;
var isStressChange;
var stressChangeAt;

if( !isSysop ) for( g = 0; g < wgUserGroups.length; g++ ) {
	if( wgUserGroups[g].match(/sysop|staff|janitor/) ) {
		isSysop = true;
		break;
	}
}
if( !isStatusChange && statusChangeAt ) for( d = 0; d < statusChangeAt.length; d++ ) {
	if( wgServer == 'http://'+statusChangeAt[d] ) {
		isStatusChange = true;
		break;
	}
}
if( !isStressChange && stressChangeAt ) for( d = 0; d < stressChangeAt.length; d++ ) {
	if( wgServer == 'http://'+stressChangeAt[d] ) {
		isStressChange = true;
		break;
	}
}

/*</pre>*/