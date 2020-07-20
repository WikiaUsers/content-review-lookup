//Import MediaWiki:Common.js
importScript("MediaWiki:Common.js");

// New User Welcome Message
 
if (mw.config.get('wgUserGroups').indexOf('staff') === -1 && mw.config.get('wgUserGroups').indexOf('helper') === -1 && mw.config.get('wgUserGroups').indexOf('vstf') === -1 &&
mw.config.get('wgUserGroups').indexOf('sysop') === -1) {
    if (localStorage.newUser !== "true") {
        $.showCustomModal("Welcome to the Epic Heroes Wiki!", '<form class="WikiaForm" method="" name=""><fieldset>Hello and welcome! We have noticed that you are a new user here and we would like welcome you to the wiki. Please create an account so we can distinguish who you are.<br /><br />Before you get started reading and editing we need you to take a look at our <a href="http://epicheroesgame.wikia.com/wiki/Rules">Wiki Rules</a>.<br /><br />If you have any questions you can come and ask us in the <a href="http://epicheroesgame.wikia.com/wiki/Special:Forum">forum</a>.</fieldset ></form>', {
            id: "newuser-modal",
            width: 650,
            buttons: [{
                id: "submit",
                defaultButton: true,
                message: "Okay, I am ready to continue!",
                handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
  }
            }]
        });
    }
}

//Social media buttons
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};
importScriptPage('SocialIcons/code.js','dev');

// JavaScript Document

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-200;//100 is half popup's height
	popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-250;//250 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}
function popup(windowname) {
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
}