/* Any JavaScript here will be loaded for all users on every page load.                      */
/* JS placed here is optional and will force the equalization the main page layout columns   */
/*                                                                                           */
/* This section js has been moved to two different pages: MediaWiki:3colmainpage.js and      */
/* MediaWiki:2colmainpage.js                                                                 */
/* Wiki managers can either use one or the other for their wiki and overwrite this page with */
/* customized version, or use the import commands shown below                                */
/*                                                                                           */
/* The following is for the regular 2 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:2colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/*                                                                                           */
/* The following is for the regular 3 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:3colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/* ***************************************************************************************** */

//Automatically expand pages to full-width and hide right bar on FandomDesktop by default
$(function() {
    if( !$('body.skin-fandomdesktop').length ){
        return;
    }
	//common.js is loaded BEFORE skin.fandomdesktop.js module.
	mw.loader.using("skin.fandomdesktop.js").then(function(){
	    if( !$('.is-content-expanded').length ){
	        if( ((mw.config.get("wgUserName") === null) ? localStorage.contentwidth : mw.user.options.get('contentwidth')) !== "collapsed"){
	        	$("button.content-size-toggle").click();
	    	}
	    }
	    if( !$('aside.page__right-rail.is-rail-hidden').length ){
	    	if( (mw.config.get("wgUserName") !== null) && (mw.user.options.get('rightrailvisible') !== "visible") ){
	    		$("button.right-rail-toggle").click();
	    	}
	    }
	});
	
});

/* used to check if js reloaded */
/*$(function () {
	var myElement = document.getElementById('l1');
	myElement.innerHTML = '1623';
});*/

$(function () {
	/*var myElement2 = document.getElementById('l2');
	myElement2.addEventListener('click', () => {
		myElement2.style.display="none";
	});*/
	$("#l1").click(function () {
		$("#l1").css("background-color", "rgba(0,0,0,0.3)");
		$("#l2").css("background-color", "initial");
		$("#l3").css("background-color", "initial");
		$("#l4").css("background-color", "initial");
		$(".level1").css("display", "contents");
		$(".level2").css("display", "none");
		$(".level3").css("display", "none");
		$(".level4").css("display", "none");
	});

	$("#l2").click(function () {
		$("#l1").css("background-color", "initial");
		$("#l2").css("background-color", "rgba(0,0,0,0.3)");
		$("#l3").css("background-color", "initial");
		$("#l4").css("background-color", "initial");
		$(".level1").css("display", "none");
		$(".level2").css("display", "contents");
		$(".level3").css("display", "none");
		$(".level4").css("display", "none");
	});

	$("#l3").click(function () {
		$("#l1").css("background-color", "initial");
		$("#l2").css("background-color", "initial");
		$("#l3").css("background-color", "rgba(0,0,0,0.3)");
		$("#l4").css("background-color", "initial");
		$(".level1").css("display", "none");
		$(".level2").css("display", "none");
		$(".level3").css("display", "contents");
		$(".level4").css("display", "none");
	});

	$("#l4").click(function () {
		$("#l1").css("background-color", "initial");
		$("#l2").css("background-color", "initial");
		$("#l3").css("background-color", "initial");
		$("#l4").css("background-color", "rgba(0,0,0,0.3)");
		$(".level1").css("display", "none");
		$(".level2").css("display", "none");
		$(".level3").css("display", "none");
		$(".level4").css("display", "contents");
	});
});