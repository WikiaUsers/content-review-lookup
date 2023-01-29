/* <pre> */
/* Any JavaScript here will be loaded for all users on every page load. */

if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:Poke/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  hookEvent( 'load', function()
  { new CollapsibleTables(); } );
}

function formatDate(t)
{
	var month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	
	y = t.getUTCFullYear();
	M = t.getUTCMonth();
	D = t.getUTCDate();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();
	
	if (h > 0 || m > 0 || s > 0)
	{
		hms = '';
		
		if (s > 10)
			hms = ':' + s;
		else if (s > 0)
			hms = ':0' + s;
		
		if (m > 10)
			hms = ':' + m + hms;
		else if (m > 0)
			hms = ':0' + m + hms;
			
		if (h > 12)
			hms = (h - 12) + hms + ' PM';
		else if (h > 0)
			hms = h + hms + ' AM';
		else
			hms = '12' + hms + ' AM';
		
		return hms + ', ' + month[M] + ' ' + D + ', ' + y;
	} else {
		return month[M] + ' ' + D + ', ' + y;
	}
}

function formatTime(h, m, s)
{
	var o = '';
	
	if (h != 1)
	{
		o = h + ' hours ';
	} else {
		o = '1 hour ';
	}
	
	if (m != 1)
	{
		o += m + ' minutes ';
	} else {
		o += '1 minute ';
	}
	
	if (s != 1)
	{
		o += s + ' seconds';
	} else {
		o += '1 second';
	}
	
	return o;
}

function updateClocks()
{
	var t = new Date();

	setTimeout(updateClocks, 1000);
	
	D = t.getUTCDate();
	M = t.getUTCMonth();
	y = t.getUTCFullYear();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();

	t = Date.UTC(y, M, D, h, m, s);

	t = (T - t) / 1000;
	
	if (t < 0 && t > -86400 && (h > 0 || m > 0 || s > 0))
	{
		document.getElementById('countdown-big').innerHTML = 'Today';
		document.getElementById('countdown-small').innerHTML = '';
		document.getElementById('countdown-target').innerHTML = 'is ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
		
		return;
	} else if (t < 0) {
		document.getElementById('countdown-big').innerHTML = 'Past';
		document.getElementById('countdown-target').innerHTML = formatDate(new Date(T + tzOffset)) + ' ' + tz;	
		
		return;
	}
	
	D = Math.floor(t / 86400.0);
	h = Math.floor(t % 86400.0 / 3600.0);
	m = Math.floor(t % 3600.0 / 60.0);
	s = Math.floor(t % 60.0)

	if (D == 1)
	{
		document.getElementById('countdown-big').innerHTML = '1 day';
	} else if (D == 0) {
		document.getElementById('countdown-big').innerHTML = '';
	} else {
		document.getElementById('countdown-big').innerHTML = D + ' days';
	}
	
	document.getElementById('countdown-small').innerHTML = formatTime(h, m, s);
}

function startCountdown()
{
	document.getElementById('countdown-target').innerHTML = 'to ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
	document.getElementById('countdown').style.display = 'block';
	updateClocks();
}

/* Show/Hide */
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
ShowHideConfig.autoCollapse
}
ShowHideConfig.autoCollapse

/* </pre> */