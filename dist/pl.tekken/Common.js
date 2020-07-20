/*--- Chatango ---*/
//Made by Rakharow
 
function toggleChatangoWnd()
{
	if (parseInt($("#ChatangoWnd").css("left"))!==0) $("#ChatangoWnd").animate({left:"0px"}, 700);
	else $("#ChatangoWnd").animate({left:"-281px"}, 700); 
}
 
$("<div id='ChatangoWnd' onclick='toggleChatangoWnd()'></div>").css({
	width:"301px", 
	height:"390px", 
	position:"fixed",
	top:"150px",
	left:"-281px",
	padding:"11px 0px 0px 11px",
	zIndex:300,
	backgroundImage:"url(https://images.wikia.nocookie.net/risenpedia/pl/images/7/7c/Ramka_Chatango.png)"
}).appendTo("body");
 
$("<div id='sid0010000041709336728'></div>").appendTo("#ChatangoWnd");
(function() {function async_load(){s.id="cid0010000041709336728";s.src='http://st.chatango.com/js/gz/emb.js';s.style.cssText="width:255px;height:359px;";s.async=true;s.text='{"handle":"tekkenpolskawikia","styles":{"b":100,"c":"666666","d":"666666","f":46,"j":"BCE27F","k":"666666","l":"000000","s":1}}';var ss = document.getElementsByTagName('div');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id=='sid0010000041709336728'){ss[i].id +='_';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement('script');if (s.async==undefined){if (window.addEventListener) {addEventListener('load',async_load,false);}else if (window.attachEvent) {attachEvent('onload',async_load);}}else {async_load();}})();