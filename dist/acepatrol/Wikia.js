/* General */
/** WikiaScriptLoader **/
// From http://dragonage.wikia.com/wiki/MediaWiki:Common.js
// Wikia's own WikiaScriptLoader isn't automatically included in other skins such as monobook.
// Presumably this is because they no longer support them. This checks to see if WikiaScriptLoader 
// function reference has been declared, and if it has not, it creates it. Backwards compatibility
// for everybody! - Blame User:Tierrie @ DA Wiki if this works. Blame someone else if it breaks.
if(typeof WikiaScriptLoader === 'undefined') {
  var WikiaScriptLoader=WikiaScriptLoader?WikiaScriptLoader:function(){var b=navigator.userAgent.toLowerCase();this.useDOMInjection=b.indexOf("opera")!=-1||b.indexOf("firefox")!=-1&&b.indexOf("/4.0b")==-1;this.isIE=b.indexOf("opera")==-1&&b.indexOf("msie")!=-1;this.headNode=document.getElementsByTagName("HEAD")[0]}; WikiaScriptLoader.prototype={loadScript:function(b,c){this.useDOMInjection?this.loadScriptDOMInjection(b,c):this.loadScriptDocumentWrite(b,c)},loadScriptDOMInjection:function(b,c){var a=document.createElement("script");a.type="text/javascript";a.src=b;var d=function(){a.onloadDone=true;typeof c=="function"&&c()};a.onloadDone=false;a.onload=d;a.onreadystatechange=function(){a.readyState=="loaded"&&!a.onloadDone&&d()};this.headNode.appendChild(a)},loadScriptDocumentWrite:function(b,c){document.write('<script src="'+ b+'" type="text/javascript"><\/script>');var a=function(){typeof c=="function"&&c()};typeof c=="function"&&this.addHandler(window,"load",a)},loadScriptAjax:function(b,c){var a=this,d=this.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText;if(a.isIE)eval(e);else{var f=document.createElement("script");f.type="text/javascript";f.text=e;a.headNode.appendChild(f)}typeof c=="function"&&c()}};d.open("GET",b,true);d.send("")},loadCSS:function(b,c){var a=document.createElement("link"); a.rel="stylesheet";a.type="text/css";a.media=c||"";a.href=b;this.headNode.appendChild(a)},addHandler:function(b,c,a){if(window.addEventListener)window.addEventListener(c,a,false);else window.attachEvent&&window.attachEvent("on"+c,a)},getXHRObject:function(){var b=false;try{b=new XMLHttpRequest}catch(c){for(var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],d=a.length,e=0;e<d;e++){try{b=new ActiveXObject(a[e])}catch(f){continue}break}}return b}};window.wsl=new WikiaScriptLoader;
}

/** Social Media buttons **/
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Mainpage */
/** Mainpage sliders **/
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  var image1Source = 'https://images.wikia.nocookie.net/acepatrol/images/a/ab/Mainpage-Header-Home.png';
  var image2Source = 'https://images.wikia.nocookie.net/acepatrol/images/0/06/Mainpage-Header-Ace_Patrol.png';
  var image3Source = 'https://images.wikia.nocookie.net/acepatrol/images/3/30/Mainpage-Header-Pacific_Skies.png';
  var image4Source = 'https://images.wikia.nocookie.net/acepatrol/images/1/16/Mainpage-Header-Media.png';
  var image1Alt = 'Home';
  var image2Alt = 'Ace Patrol';
  var image3Alt = 'Pacific Skies';
  var image4Alt = 'Media';
  currentTab = 1;
  prevDisabled = false;
  nextDisabled = false;
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    var sliderNumber = this.className.replace("portal_sliderlink_", "");
    $(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
    $(".mainpage-box-home").addClass("slider-" + sliderNumber);
    currentTab = this.className.replace("portal_sliderlink_", "");
    if( currentTab == 1 ) {
		$(".mainpage-header-home img").attr("src",image1Source);
		$(".mainpage-header-home img").attr("alt",image1Alt);
    }	    
    else if( currentTab == 2 ) {
		$(".mainpage-header-home img").attr("src",image2Source);	
		$(".mainpage-header-home img").attr("alt",image2Alt);
    }
    else if( currentTab == 3 ) {
		$(".mainpage-header-home img").attr("src",image3Source);	
		$(".mainpage-header-home img").attr("alt",image3Alt);
    }
    else if( currentTab == 4 ) {
		$(".mainpage-header-home img").attr("src",image4Source);
		$(".mainpage-header-home img").attr("alt",image4Alt);		
    }
    else {
		$(".mainpage-header-home img").attr("src",image1Source);
		$(".mainpage-header-home img").attr("alt",image1Alt);		
    }
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
	if(nextDisabled == false) {
		nextDisabled = true;
		prevDisabled = true;
		$('#portal_next').css('opacity','0.5');
		$('#portal_prev').css('opacity','0.5');
		setTimeout(function() {
			$('#portal_next').css('opacity','');
			$('#portal_prev').css('opacity','');
			nextDisabled = false;
			prevDisabled = false;
		},300);
		currentTab++;
		if(currentTab == 5) {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-1");
			currentTab = 1;
		}
		else {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-"+currentTab);
		}
		if( currentTab == 1 ) {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);
		}
		else if( currentTab == 2 ) {
			$(".mainpage-header-home img").attr("src",image2Source);	
			$(".mainpage-header-home img").attr("alt",image2Alt);
		}
		else if( currentTab == 3 ) {
			$(".mainpage-header-home img").attr("src",image3Source);	
			$(".mainpage-header-home img").attr("alt",image3Alt);
		}
		else if( currentTab == 4 ) {
			$(".mainpage-header-home img").attr("src",image4Source);
			$(".mainpage-header-home img").attr("alt",image4Alt);		
		}
		else {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);		
		}
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
		return false;
		}
  });
  $('#portal_prev').click(function() { // bind click event to link
	if(prevDisabled == false) {
		prevDisabled = true;
		nextDisabled = true;
		$('#portal_prev').css('opacity','0.5');
		$('#portal_next').css('opacity','0.5');
		setTimeout(function() {
			$('#portal_prev').css('opacity','');
			$('#portal_next').css('opacity','');
			prevDisabled = false;
			nextDisabled = false;
		},300);
		currentTab--;
		if(currentTab == 0) {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-4");
			currentTab = 4;
		}
		else {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-"+currentTab);
		}
		$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
		$(".mainpage-box-home").addClass("slider-"+currentTab);
		if( currentTab == 1 ) {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);
		}
		else if( currentTab == 2 ) {
			$(".mainpage-header-home img").attr("src",image2Source);	
			$(".mainpage-header-home img").attr("alt",image2Alt);
		}
		else if( currentTab == 3 ) {
			$(".mainpage-header-home img").attr("src",image3Source);	
			$(".mainpage-header-home img").attr("alt",image3Alt);
		}
		else if( currentTab == 4 ) {
			$(".mainpage-header-home img").attr("src",image4Source);
			$(".mainpage-header-home img").attr("alt",image4Alt);		
		}
		else {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);		
		}
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
		return false;
	}
  });
});
 
/* Mainpage */
if(wgPageName == "Sid_Meiers_Ace_Patrol_Wiki") {
	addOnloadHook(function() {
		/** Poll class **/
		$('.mainpage-box-poll .total').parent().addClass('pollText');

		
		/** Load home box header images silently **/
		var img = new Image(); img.src = 'https://images.wikia.nocookie.net/acepatrol/images/a/ab/Mainpage-Header-Home.png';
		var img2 = new Image(); img2.src = 'https://images.wikia.nocookie.net/acepatrol/images/0/06/Mainpage-Header-Ace_Patrol.png';
		var img3 = new Image(); img3.src = 'https://images.wikia.nocookie.net/acepatrol/images/3/30/Mainpage-Header-Pacific_Skies.png';
		var img4 = new Image(); img4.src = 'https://images.wikia.nocookie.net/acepatrol/images/1/16/Mainpage-Header-Media.png';
	});
}