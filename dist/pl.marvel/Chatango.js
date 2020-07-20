/*--- Chatango ---*/
//Made by Rakharow
function toggleChatangoWnd()
{
	if (parseInt($("#ChatangoWnd").css("right"))!==0) $("#ChatangoWnd").animate({right:"0"}, 700);
	else $("#ChatangoWnd").animate({right:"-281px"}, 700); 
}
$("<div id='ChatangoWnd' onclick='toggleChatangoWnd()'></div>").css({
	width:"269px", 
	height:"390px", 
	position:"fixed",
	top:"150px",
	right:"-281px",
	padding:"11px 0 0 42px",
	zIndex:300,
	backgroundImage:"url(https://images.wikia.nocookie.net/ponuraaak/images/7/7c/Ramka_Chatango.png)"
}).appendTo("body");
$("<div id='sid0010000041709336728'></div>").appendTo("#ChatangoWnd");
(function() {function async_load(){s.id="cid0010000041709336728";s.src='http://st.chatango.com/js/gz/emb.js';s.style.cssText="width:255px;height:359px;";s.async=true;s.text='{"handle":"marveluniversewiki","styles":{"b":100,"v":0,"w":0,"ac":1}}';var ss = document.getElementsByTagName('div');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id=='sid0010000041709336728'){ss[i].id +='_';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement('script');if 
(s.async==undefined){if (window.addEventListener) {addEventListener('load',async_load,false);}else if (window.attachEvent) {attachEvent('onload',async_load);}}else {async_load();}})();