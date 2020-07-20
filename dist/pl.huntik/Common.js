/*<pre>*/
 
 /* Chatango */
/* Cookie functions
   Author: http://www.quirksmode.org/js/cookies.html */
 
function createCookie(name,value,days) {
        if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
}
 
function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
}
 
function eraseCookie(name) {
        createCookie(name,"",-1);
}
 
/* Floating Chatango Window for Wikia
   Author: Rakharow (Ofkorse) 
   Version: 29.09.2013 */
 
function ChatangoToggle()
{
        $("#ChatangoFloatingWnd").toggle();
        SaveChatangoCookie();
}
 
function SaveChatangoCookie()
{
        var left = parseInt($("#ChatangoFloatingWnd").css("left"));
        var top = parseInt($("#ChatangoFloatingWnd").css("top"));
        var date = new Date;
        date.setMonth(date.getMonth()+1);
        createCookie("ChatangoWnd", ($("#ChatangoFloatingWnd").is(":visible")?"1":"0")+"|"+left+"|"+top, date);
}
 
if (!readCookie("ChatangoWnd"))
{
        var date = new Date;
        date.setMonth(date.getMonth()+1);
        createCookie("ChatangoWnd", "0|50|50", date);
}
var ChatangoConfig = readCookie("ChatangoWnd").split("|");
 
$.getScript("http://code.jquery.com/ui/1.10.3/jquery-ui.js", function(){
        $("<div id='ChatangoFloatingWnd'></div>").css({
                position:"fixed", 
                boxShadow:"0 0 10px #006CAF", 
                background:"black",
                padding:"6px",
                display:(ChatangoConfig[0]==0?"none":"block"),
                top:ChatangoConfig[2]+"px",
                left:ChatangoConfig[1]+"px",
                cursor:"move",
                zIndex:999
        }).appendTo("body").draggable({stop:function(){
                SaveChatangoCookie();
        }});
        $(".WikiHeader .buttons").css({width:"310px"});
        $("<a class='wikia-menu-button secondary' onclick='ChatangoToggle()'>Pokaż/schowaj Chatango</a>").css({padding:"0 4px 0px 4px", marginTop:"1px", boxShadow:"none"}).insertBefore(".buttons nav");
        $("#ChatangoFloatingWnd").append("<div id='sid0010000041474007396'></div>");
        (function() {function async_load(){s.id="cid0010000041474007396";s.src='http://st.chatango.com/js/gz/emb.js';s.style.cssText="width:310px;height:400px;";s.async=true;s.text='{"handle":"plhuntikwiki","styles":{"a":"3A1600","b":100,"c":"FF6666","d":"CCCCFF","e":"E1E1E1","g":"990000","h":"E1E1E1","j":"663300","k":"E90F00","l":"2B2B2B","m":"525418","n":"FFFFFF","s":1}}';var ss = document.getElementsByTagName('div');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id=='sid0010000041474007396'){ss[i].id +='_';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement('script');if (s.async==undefined){if (window.addEventListener) {addEventListener('load',async_load,false);}else if (window.attachEvent) {attachEvent('onload',async_load);}}else {async_load();}})();
});
/* END Chatango */

/* Przesyłanie plików */
function preloadUploadDescAddSummary(field) {
	if(field && !field.summaryAdded) {
		field.appendChild(document.createTextNode("[[Kategoria:Fairuse]]"));
		field.summaryAdded = true;
	}
}
function preloadUploadDesc() {
	if (wgPageName.toLowerCase() == 'specjalna:prześlij')
		preloadUploadDescAddSummary(document.getElementById('wpUploadDescription'));
 
	UploadPhotos.destFileSetRedir = UploadPhotos.destFileSet
	UploadPhotos.destFileSet = function() {
		preloadUploadDescAddSummary(UploadPhotos.d.find('form')[0].wpUploadDescription);
		return UploadPhotos.destFileSetRedir();
	}
}
addOnloadHook(preloadUploadDesc)
/* END Przesyłanie plików */
/*</pre>*/