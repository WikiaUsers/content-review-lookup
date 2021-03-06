importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');

//==================
//Begin ZP spoilerz
//==================
function spoilerLoad(){
    $("[title='Click to display spoiler']").click(function(){$(this.nextSibling).fadeIn()});
}
 
hookEvent('load', spoilerLoad);

function spoilerFade(){
    $("[title='Click to hide spoiler']").click(function(){$(this.nextSibling).fadeOut()});
}
 
hookEvent('fade', spoilerFade);

//==================
//End ZP spoilerz
//==================

// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}

// ============================================================
// BEGIN sliders using jquery by User:Tierrie
// ============================================================
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
wsl.loadScript("http://bioshock.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
 
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    var num = this.className.replace("portal_sliderlink_", "").replace(" jump","");    
    $tabs.tabs('select', num );
    $('.jump').text('·');
    $('.portal_sliderlink_' + num + '.jump').text('•');
    return false;
  });
  $('#portal_next').click(function() {
    var num = ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1;
    $tabs.tabs('select', num ); // switch to next tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    var num = ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1;
    $tabs.tabs('select', num ); // switch to previous tab
    $('.jump').text('·');
    $('.portal_sliderlink_' + (num+1) + '.jump').text('•');
    return false;
  });
});
 
// ============================================================
// END sliders using jquery by User:Tierrie
// ============================================================
 
/* Query string helper */
// get querystring as an array split on "&"
var querystring = location.search.replace( '?', '' ).split( '&' );
// declare object
var queryObj = {};
// loop through each name-value pair and populate object
for ( var i=0; i<querystring.length; i++ ) {
      // get name and value
      var name = querystring[i].split('=')[0];
      var value = querystring[i].split('=')[1];
      // populate object
      queryObj[name] = value;
}