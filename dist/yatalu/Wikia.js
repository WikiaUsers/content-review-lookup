var newElement = [
 '<section class="module">',
 '   <h1>Chatango</h1>',
 '   <script id="sid0020000076229116977">(function() {function async_load(){s.id="cid0020000076229116977";s.src=(window.location.href.indexOf(\'file:///\') > -1 ? \'http:\' : \'\') + \'//st.chatango.com/js/gz/emb.js\';s.style.cssText="width:280px;height:420px;";s.async=true;s.text=\'{"handle":"lusiopartis","arch":"js","styles":{"a":"ffffff","b":86,"c":"000000","d":"000000","e":"eaeeff","f":86,"i":86,"k":"ccccff","l":"ccccff","m":"ccccff","o":86,"q":"9999ff","r":86}}\';var ss = document.getElementsByTagName(\'script\');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id==\'sid0020000076229116977\'){ss[i].id +=\'_\';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement(\'script\');if (s.async==undefined){if (window.addEventListener) {addEventListener(\'load\',async_load,false);}else if (window.attachEvent) {attachEvent(\'onload\',async_load);}}else {async_load();}})();</script>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);
 
if ($("#WikiaArticle div").hasClass("templateheader")) {
var languageCode = $("#content_language").text();
$("#ORM-1").html(languageCode);
}