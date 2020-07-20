// why does this get executed for anons randomly?
if ($("body").hasClass("ns-112")) { 
console.log("AutoLeseliste Feb 2015 geladen");
 
function getCookie(name) {
                    var re = new RegExp(name + "=([^;]+)");
                    var value = re.exec(document.cookie);
                    return (value != null) ? unescape(value[1]) : null;
                }
 
function reEnableAutoLeseListe() {
document.cookie = "AutoLeseListe=ooooo";
$("#reenableALL").fadeOut();
}
 
if ($("#wpTextbox1").length > 0 || wgUserName === null || getCookie("AutoLeseListe") === "deaktiviert") {
// nothing, do not execute
setTimeout(function() {

if (wgUserName === null) {

function haveRead() {
console.log("haveRead should be disabled now");
}

} else {

$("#notifbox .inner").prepend('<div style="color: darkgreen;" id="reenableALL">Hier kannst du das Automatische hinzufügen gelesener Geschichten wieder aktivieren: <a onclick="reEnableAutoLeseListe()" class="button">Aktivieren</a></div><hr>');
}
 
}, 4000);
}
else {
if (wgUserName === null) {
console.log("haveRead should not be executed");
} else { 

leseliste_loaded = 0;
scrolledThrough = 0;
var now = new Date().getTime();
console.log("autoleseliste geladen");

} 
}


$.fn.is_on_screen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};
 
if( $('.target').length > 0 ) { // if target element exists in DOM
	if( $('.target').is_on_screen() ) { // if target element is visible on screen after DOM loaded
        $('.log').html('<div class="alert alert-success">target element is visible on screen</div>'); // log info		
	} else {
        $('.log').html('<div class="alert">target element is not visible on screen</div>'); // log info
	}
}

LeselisteWasExecutedOnce = 0;

$(window).scroll(function(){ 
	if( $('#storyfooter').length > 0 ) { 
		if( $('#storyfooter').is_on_screen() ) { 
			if (wgUserName === null) { } else {
				if (LeselisteWasExecutedOnce > 0) { /* do nothing */ }
				else { haveRead(); LeselisteWasExecutedOnce = 1; }
			}
		} else {
			/* do nothing */
		}
	}
});

/* ^ http://web-profile.com.ua/jquery/dev/jquery-check-if-element-is-visible-on-screen/ */
   
function disableAutoList() {
    var today = new Date();
    var expire = new Date();
    var nDays = 365;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    var cookieName = "AutoLeseListe";
    var cookieValue = "deaktiviert";
    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
 
removeRead(); 
 
var _all = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer')
};
 
var todayA = new Date();
            var h = todayA.getHours();
            var m = todayA.getMinutes();
            var s = todayA.getSeconds();
            var d = todayA.getDate();
            var mo = todayA.getMonth()+1;
            var y = todayA.getFullYear();
             if(s<10){
                 s = "0"+s;
             } if(m<10){
                 m = "0"+m;
             } if(d<10){
                 d = "0"+d;
             } if(mo<10){
                 mo = "0"+mo;
             }
             posttime = y+mo+d+h+m+s;
 
var url = _all.server + '/api.php?action=edit&title=' + encodeURIComponent("Vorlage:AutoLeseListe/" + wgUserName) + '&appendtext=' + encodeURIComponent("{{AutoLeseListe-deaktiviert}}\n" + posttime + "\n<!--" + wgPageName + "-->") + '&token=' + encodeURIComponent(_all.edittoken) + '&summary=AutoLeseListe deaktiviert&bot=1';
 
setTimeout(function() { 
$.post(url, function () {
    })
.done(function() {
console.log("url done");
}).fail(function() {
console.log("url fail");
});
 
}, 1500);
 
}
}