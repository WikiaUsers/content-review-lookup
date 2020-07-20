/* COMMON ROUTINES FOR HPW 
 * started by mfaizsyahmi
 * This is an initiative to centralize all helper functions 
 * used in various niche implementations around HPW (e.g. ytlinkpopup)
 * in order to cut down overall script size
 */

// defining namespaces
hpw = hpw || {};
hpw.util = hpw.util || {};

// COMMAFY
// put thousands separator in numbers
// currently used in ytlinkpopup
hpw.util.commafy = function(num) { /* from stackoverflow */
	/* trying to catch an error in Chrome about num being undefined */
	if (typeof num == 'undefined') return null;
	var str = num.toString().split('.');
	if (str[0].length >= 4) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	if (str[1] && str[1].length >= 4) {
		str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	}
	return str.join('.');
};

// NEWTIMESTRING
// takes the ISO-formatted string duration format returned by YT API
// returns the common HH:MM:SS duration string
// used by ytlinkpopup
hpw.util.newTimeString = function(duration) { /* adapted from stackoverflow/22148885 */
	var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/),
		arr = [];
	var hours = (parseInt(match[1]) || 0),
		minutes = (parseInt(match[2]) || 0),
		seconds = (parseInt(match[3]) || 0);
	if (hours > 0) arr.push(hours);
	arr.push( ('0' + minutes).slice(-2) );
	arr.push( ('0' + seconds).slice(-2) );
	return arr.join(':');
};

// GETSELECTIONTEXT
// returns the selected text
// bind this with the mouseup jQuery event
// currently used in object.js
hpw.util.getSelectionText = function() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
};

// A function-based way to check for page name
// should use this instead of the hackish jQuery class matching
hpw.util.getPageName = function() { return mw.config.get('wgPageName') };
hpw.util.isPageName = function(str) {
    return mw.config.get('wgPageName') == str;
};

// COOKIE FUNCTIONS
// copied from my UMS Topdown renderer
// might be more feasible to use jQuery one, which is already native
//  --> https://github.com/carhartl/jquery-cookie
hpw.util.createCookie = function(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};
hpw.util.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};
hpw.util.eraseCookie = function(name) {
	createCookie(name,"",-1);
};


// ARRAY OF FUNCTIONS TO CALLBACK
hpw.callbacks = hpw.callbacks || [];
// PROCESSES CALLBACKS
// args: flush - resets the callback array, defaults to true
hpw.processCallbacks = function(flush) {
    if (typeof flush == 'undefined') flush = true;
    for(var i=0; i<hpw.callbacks.length; i++) {
        if(typeof hpw.callbacks[i] == 'function') hpw.callbacks[i]();
    }
    if(flush) hpw.callbacks = [];
};
hpw.processCallbacks(true);