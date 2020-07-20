/* Bracket JS */
// Note: the brackets do not work with the mobile site. Use the 'MobileWarning' code (using <verbatim>MobileWarning</verbatim>) on any pages with the brackets.
// Note: the page where the bracket script will live needs to have the following content: <verbatim>MobileWarning</verbatim><div class="createbracket"><div class="pageheader"><div class="text">Click on the image you think is better.</div><div class="choices">Remaining votes: <span class="choicesleft"></span>.</div></div><div class="liquid-slider" id="bracketslider"></div></div>.
// Note: the bracket template needs to be set up manually.
// Configuration
var bracketPages = ['Create_your_Bracket/1','Create_your_Bracket/2','Create_your_Bracket/3','Create_your_Bracket/4']; // What pages should the script load on?
var bracketName = 'Create_your_Bracket'; // What is the name of the bracket pages?
var bracketFinal = 4; // What is the final bracket page?
var blogTitle = 'User_blog:MarkvA/Bracket'; // What is the bracket blog title?
var blogID = '2160'; // What is the bracket blog ID?
var templateName = 'Bracket'; // What is the name of the bracket template?
var bracketPageName = 'User:' + wgUserName + '/bracket'; // What should the namespace of the bracket submissions be?
var loginRequired = 'yes'; // Does the user have to be logged in to submit a bracket?
var submittedMessage = 'Your+bracket+has+been+successfully+submitted.'; // What should the confirmation message say when the bracket has been submitted?
var editMessage = 'Your+bracket+has+been+successfully+edited.'; // What should the confirmation message say when the bracket has been edited?
var editSummary = 'Submitting my bracket entry.'; // What should the edit summary say when a user submits a bracket?
var finishError = 'Please finish the entire bracket.'; // What should the error message say when a bracket hasn't been finished?
var genericErrorMessage = 'An error occurred. Please try again.'; // What should the generic error message say?
if(wgPageName == 'Create_your_Bracket/1') {
	var bracketEntries = {
		'left-2-1': [{
			'name': 'Astrid Bergès-Frisbey',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/1/17/Annie1_Astrid_Berges_Frisbey.jpg?allinone=0'
		}, {
			'name': 'Melissa Benoist',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/d/dc/Annie2_Melissa_Benoist.jpg?allinone=0'
		}],
		'left-2-2': [{
			'name': 'Ginny Gardner',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/5/5b/Annie5_Ginny_Gardner.jpg'
		}, {
			'name': 'Alice Englert',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/4/45/Annie6_Alice_Englert.jpg'
		}],
		'right-2-1': [{
			'name': 'Molly Quinn',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/6/6d/Annie3_MollyQuinn.jpg?allinone=0'
		}, {
			'name': 'Saoirse Ronan',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/6/69/Annie4_Saoirse_Ronan.jpg?allinone=0'
		}],
		'right-2-2': [{
			'name': 'Karen Gillan',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/f/fe/Annie7_Karen_Gillan.jpg'
		}, {
			'name': 'Sarah Snook',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/ea/Annie8_Sarah_Snook.jpg'
		}],
		'left-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'right-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],			
		'winner': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],
		'submit': [{
			'buttonText': 'Next Casting', // What should the submit button say?
			'submitText': 'Are you happy with your current selections? If so, click the button below for the next set of choices!' // What should the text accompanying the submit button say?
		}]
	};
}
else if(wgPageName == 'Create_your_Bracket/2') {
	var bracketEntries = {
		'left-2-1': [{
			'name': 'Sigourney Weaver',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/7/7e/Coin1_Sigourney-Weaver.jpg?allinone=0'
		}, {
			'name': 'Meryl Streep',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/2/2b/Coin2_Meryl_streep.jpg?allinone=0'
		}],
		'left-2-2': [{
			'name': 'Blythe Danner',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/e4/Coin5_Blythe_Danner.jpg'
		}, {
			'name': 'Helen Mirren',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/e3/Coin6_Helen_Mirren.jpg'
		}],
		'right-2-1': [{
			'name': 'Kate Winslett',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/b/bc/Coin3_Kate_Winslett.png?allinone=0'
		}, {
			'name': 'Cate Blanchett',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/2/2e/Coin4_Cate_Blanchett.jpg?allinone=0'
		}],
		'right-2-2': [{
			'name': 'Kristin Scott Thomas',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/2/22/Coin7_Kristin_Scott_thomas.jpg'
		}, {
			'name': 'Jane Fonda',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/8/87/Coin8_Jane_Fonda.jpg'
		}],
		'left-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'right-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'winner': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],
		'submit': [{
			'buttonText': 'Next Casting', // What should the submit button say?
			'submitText': 'Are you happy with your current selections? If so, click the button below for the next set of choices!' // What should the text accompanying the submit button say?
		}]
	};
}
else if(wgPageName == 'Create_your_Bracket/3') {
	var bracketEntries = {
		'left-2-1': [{
			'name': 'Teresa Palmer',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/3/3f/Cressida1_Teresa_Palmer.jpg?allinone=0'
		}, {
			'name': 'Eliza Taylor',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/f/f0/Cressida2_Eliza_Taylor.jpg?allinone=0'
		}],
		'left-2-2': [{
			'name': 'Natalie Portman',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/6/6c/Cressida5_Natalie_Portman.jpg'
		}, {
			'name': 'Jessica Szohr',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/c/cb/Cressida6_Jessica_Szohr.jpg'
		}],
		'right-2-1': [{
			'name': 'Odette Annable',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/c/cc/Cressida3_Odette_Annable.jpg?allinone=0'
		}, {
			'name': 'Olivia Hallinan',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/a/ae/Cressida4_Olivia_Hallinan.jpg?allinone=0'
		}],
		'right-2-2': [{
			'name': 'Rutina Wesley',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/e6/Cressida7_Rutina_Wesley.jpg'
		}, {
			'name': 'Kat Graham',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/1/1f/Cressida8_Kat_Graham.jpg'
		}],
		'left-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'right-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'winner': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],
		'submit': [{
			'buttonText': 'Next Casting', // What should the submit button say?
			'submitText': 'Are you happy with your current selections? If so, click the button below for the next set of choices!' // What should the text accompanying the submit button say?
		}]
	};
}
else {
	var bracketEntries = {
		'left-2-1': [{
			'name': 'Alex Pettyfer',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/1/1c/Finnick1_Alex_Pettyfer.jpg?allinone=0'
		}, {
			'name': 'Hunter Parrish',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/b/b4/Finnick2_Hunter_Parrish.jpg?allinone=0'
		}],
		'left-2-2': [{
			'name': 'Arnie Hammer',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/7/74/Finnick5_Arnie_Hammer.jpg'
		}, {
			'name': 'Garrett Hedlund',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/6/6a/Finnick6_Garrett_Hedlund.jpg'
		}],
		'right-2-1': [{
			'name': 'Zac Efron',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/e9/Finnick3_zac-efron.jpg?allinone=0'
		}, {
			'name': 'Xavier Samuel',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/2/2f/Finnick4-Xavier_Samuel.jpg?allinone=0'
		}],
		'right-2-2': [{
			'name': 'Landon Liboiron',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/e/ec/Finnick7_Landon_Liboiron.jpg'
		}, {
			'name': 'Sebastian Stan',
			'image': 'https://images.wikia.nocookie.net/bracketv3/images/0/09/Finnick8_Sebastian_Stan.jpg'
		}],
		'left-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'right-3-1': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],	
		'winner': [{
			'name': '',
			'image': ''
		}, {
			'name': '',
			'image': ''
		}],
		'submit': [{
			'buttonText': 'Submit Casting', // What should the submit button say?
			'submitText': 'Are you happy with your current selections? If so, click the button below to submit your casting!' // What should the text accompanying the submit button say?
		}]
	};
} // What entries do the brackets have?
// End of configuration

// Set cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

// Get cookies
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
} 

// Set up the winning sides and the template
var currentBracketNumber = parseInt(wgPageName.split('/')[1]);
var nextBracketNumber = currentBracketNumber + 1
var highestNumber = 0;
var bracketTemplate = '{{' + templateName + '-' + currentBracketNumber;
var totalNumberLeft = 0;
var totalNumberRight = 0;
$.each(bracketEntries, function(index, value) {
	// Make sure we're not including the winner or submit indexes
	if (index !== 'winner' && index !== 'submit') {
		var side = index.split('-')[0];
		var first = index.split('-')[1];
		var second = index.split('-')[2];
		
		if(side === 'left') {
			// Find the final two
			if (highestNumber <= first) {
				highestNumber = first;						
			}
		}
		if (first == '2') {
			// Set up the template's base
			var firstMinusOne = parseInt(first) - 1;
			if(side === 'left') {
				var second1 = parseInt(second) + totalNumberLeft;
				var second2 = parseInt(second) + totalNumberLeft + 1;	

				bracketTemplate += ' |' + side + '-' + firstMinusOne + '-' + second1 + ' = ' + value[0].name;
				bracketTemplate += ' |' + side + '-' + firstMinusOne + '-' + second2 + ' = ' + value[1].name;
				
				totalNumberLeft++;				
			}
			else {
				var second1 = parseInt(second) + totalNumberRight;
				var second2 = parseInt(second) + totalNumberRight + 1;	

				bracketTemplate += ' |' + side + '-' + firstMinusOne + '-' + second1 + ' = ' + value[0].name;
				bracketTemplate += ' |' + side + '-' + firstMinusOne + '-' + second2 + ' = ' + value[1].name;
				
				totalNumberRight++;
			}		
		}
	}
});
var winnerAfterLeft = 'left-' + highestNumber + '-1';
var winnerAfterRight = 'right-' + highestNumber + '-1';
var thisWinner = '';
// Check whether or not we're on the blog page
if (mediaWiki.config.get('wgPageName') === blogTitle) {
	// Make the comment section full width to fit the bracket - only necessary when the bracket is too wide on small width monitors
	/*$(document).ready(function() {
		$('.WikiaArticleComments').css('width',$('.WikiaPage').width() - 40);
	});

	$(window).on('resize',function() {
		$('.WikiaArticleComments').css('width',$('.WikiaPage').width() - 20);
	});*/
	
	// Confirmation message
	// Get the parameter
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var confirmationMessage = getParameterByName('bracketSubmit').replace(/<[^>]*>?/g, '');
	var confirmationMessageLink = getParameterByName('bracketLink').replace(/<[^>]*>?/g, '');
	if (confirmationMessage != '') {
		$('.WikiaHeader').after('<div class="global-notification confirm"><button class="close wikia-chiclet-button"><img src=" https://images.wikia.nocookie.net/common/skins/oasis/images/icon_close.png"></button><div class="msg"><a href="/wiki/' + confirmationMessageLink + '">' + confirmationMessage + '</a></div></div>');		
	}
}

// Check whether or not we're on the bracket page
if (bracketPages.indexOf(mediaWiki.config.get('wgPageName')) > -1) {
    (function ($, mw, Wikia) {
		// Check if the user is logged in, if that is set as a requirement
		if (!mediaWiki.config.get('wgUserName') && loginRequired === 'yes' || mediaWiki.config.get('wgUserName') == 'null' && loginRequired === 'yes') {
            $('.createbracket').html('<div class="login"><span class="login-header">Oops! It seems you\'re not logged in!</span><br /><span class="login-sub-header">Please <a href="/wiki/Special:UserLogin?returnto=' + mediaWiki.config.get('wgPageName') + '" alt="Log in">log in</a> or <a href="/wiki/Special:UserSignup?returnto=' + mediaWiki.config.get('wgPageName') + '" alt="Sign up">create an account</a> before creating your bracket.</span></div>');
		} 
		else {
			// Slider code - http://liquidslider.com/
			if(typeof Object.create!=="function"){Object.create=function(e){function t(){}t.prototype=e;return new t}}(function(e,t,n,r){var i={makeResponsive:function(){var n=this;e(n.sliderId+"-wrapper").addClass("ls-responsive").css({"max-width":e(n.sliderId+" .panel:first-child").width(),width:"100%"});e(n.sliderId+" .panel-container").css("width",100*n.panelCountTotal+n.pSign);e(n.sliderId+" .panel").css("width",100/n.panelCountTotal+n.pSign);if(n.options.hideArrowsWhenMobile){n.leftWrapperPadding=e(n.sliderId+"-wrapper").css("padding-left");n.rightWrapperPadding=n.$sliderWrap.css("padding-right")}n.responsiveEvents();e(t).bind("resize",function(){n.responsiveEvents();clearTimeout(n.resizingTimeout);n.resizingTimeout=setTimeout(function(){var e=n.options.autoHeight?n.getHeight():n.getHeighestPanel(n.nextPanel);n.adjustHeight(false,e)},500)})},responsiveEvents:function(){var t=this,n=t.options.hideArrowsThreshold||t.options.mobileUIThreshold||t.totalNavWidth+10;if(t.$sliderId.outerWidth()<n){if(t.options.mobileNavigation){t.navigation.css("display","none");t.dropdown.css("display","block");t.dropdownSelect.css("display","block");e(t.sliderId+"-nav-select").val(t.options.mobileNavDefaultText)}if(t.options.dynamicArrows){if(t.options.hideArrowsWhenMobile){t.leftArrow.remove().length=0;t.rightArrow.remove().length=0}else{if(!t.options.dynamicArrowsGraphical){t.leftArrow.css("margin-"+t.options.dynamicTabsPosition,"0");t.rightArrow.css("margin-"+t.options.dynamicTabsPosition,"0")}}}}else{if(t.options.mobileNavigation){t.navigation.css("display","block");t.dropdown.css("display","none");t.dropdownSelect.css("display","none")}if(t.options.dynamicArrows){if(t.options.hideArrowsWhenMobile&&(!t.leftArrow.length||!t.rightArrow.length)){t.addArrows();t.registerArrows()}else{if(!t.options.dynamicArrowsGraphical){t.leftArrow.css("margin-"+t.options.dynamicTabsPosition,t.navigation.css("height"));t.rightArrow.css("margin-"+t.options.dynamicTabsPosition,t.navigation.css("height"))}}}}e(t.sliderId+"-wrapper").css("width","100%");if(t.options.mobileNavigation){t.dropdownSelect.change(function(){t.setNextPanel(parseInt(e(this).val().split("tab")[1],10)-1)})}},adjustHeight:function(e,t,n,r){var i=this;if(e||i.useCSS){if(e){i.configureCSSTransitions("0","0")}i.$sliderId.height(t);if(e){i.configureCSSTransitions()}return}i.$sliderId.animate({height:t+"px"},{easing:n||i.options.heightEaseFunction,duration:r||i.options.heightEaseDuration,queue:false})},getHeight:function(e){var t=this;e=e||t.$panelClass.eq(t.sanatizeNumber(t.nextPanel)-1).outerHeight(true);e=e<t.options.minHeight?t.options.minHeight:e;return e},addArrows:function(t){var n=this,i=n.options.dynamicArrowsGraphical?"-arrow ":" ";n.$sliderWrap.addClass("arrows");if(n.options.dynamicArrowsGraphical){n.options.dynamicArrowLeftText="";n.options.dynamicArrowRightText=""}n.$sliderId.before('<div class="ls-nav-left'+i+(t||"")+'"><a href="#">'+n.options.dynamicArrowLeftText+"</a></div>");n.$sliderId.after('<div class="ls-nav-right'+i+(t||"")+'"><a href="#">'+n.options.dynamicArrowRightText+"</a></div>");n.leftArrow=e(n.sliderId+"-wrapper [class^=ls-nav-left]").css("visibility","hidden").addClass("ls-hidden");n.rightArrow=e(n.sliderId+"-wrapper [class^=ls-nav-right]").css("visibility","hidden").addClass("ls-hidden");if(!n.options.hoverArrows){n.hideShowArrows(r,true,true,false)}},hideShowArrows:function(t,n,r,i){var s=this,o=typeof t!=="undefined"?t:s.options.fadeOutDuration,u=typeof t!=="undefined"?t:s.options.fadeInDuration,a=n?"visible":"hidden";if(!r&&(i||s.sanatizeNumber(s.nextPanel)===1)){s.leftArrow.stop().fadeTo(o,0,function(){e(this).css("visibility",a).addClass("ls-hidden")})}else{if(r||s.leftArrow.hasClass("ls-hidden")){s.leftArrow.stop().css("visibility","visible").fadeTo(u,1).removeClass("ls-hidden")}}if(!r&&(i||s.sanatizeNumber(s.nextPanel)===s.panelCount)){s.rightArrow.stop().fadeTo(o,0,function(){e(this).css("visibility",a).addClass("ls-hidden")})}else{if(r||s.rightArrow.hasClass("ls-hidden")){s.rightArrow.stop().css("visibility","visible").fadeTo(u,1).removeClass("ls-hidden")}}},registerArrows:function(){var t=this;e(t.$sliderWrap.find("[class^=ls-nav-]")).on("click",function(){t.setNextPanel(e(this).attr("class").split(" ")[0].split("-")[2])})},init:function(n,r){var i=this;i.elem=r;i.$elem=e(r);e("body").removeClass("no-js");i.sliderId="#"+i.$elem.attr("id");i.$sliderId=e(i.sliderId);i.options=e.extend({},e.fn.liquidSlider.options,n);i.pSign=i.options.responsive?"%":"px";if(i.options.responsive){i.determineAnimationType()}else{i.options.mobileNavigation=false;i.options.hideArrowsWhenMobile=false}if(i.options.slideEaseFunction==="animate.css"){if(!i.useCSS){i.options.slideEaseFunction=i.options.slideEaseFunctionFallback}else{i.options.continuous=false;i.animateCSS=true}}i.build();i.events();if(!i.options.responsive&&i.options.dynamicArrows){i.$sliderWrap.width(i.$sliderId.outerWidth(true)+i.leftArrow.outerWidth(true)+i.rightArrow.outerWidth(true))}i.loaded=true;e(t).bind("load",function(){i.options.preload.call(i)})},build:function(){var t=this,n;if(t.$sliderId.parent().attr("class")!=="ls-wrapper"){t.$sliderId.wrap('<div id="'+t.$elem.attr("id")+'-wrapper" class="ls-wrapper"></div>')}t.$sliderWrap=e(t.sliderId+"-wrapper");if(t.options.preloader){t.addPreloader()}e(t.sliderId).children().addClass(t.$elem.attr("id")+"-panel panel");t.panelClass=t.sliderId+" ."+t.$elem.attr("id")+"-panel:not(.clone)";t.$panelClass=e(t.panelClass);t.$panelClass.wrapAll('<div class="panel-container"></div>');t.$panelClass.wrapInner('<div class="panel-wrapper"></div>');t.panelContainer=t.$panelClass.parent();t.$panelContainer=t.panelContainer;if(t.options.slideEaseFunction==="fade"){t.$panelClass.addClass("fade");t.options.continuous=false;t.fade=true}if(t.options.dynamicTabs){t.addNavigation()}else{t.options.mobileNavigation=false}if(t.options.dynamicArrows){t.addArrows()}else{t.options.hoverArrows=false;t.options.hideSideArrows=false;t.options.hideArrowsWhenMobile=false}n=t.$leftArrow&&t.$leftArrow.css("position")==="absolute"?0:1;t.totalSliderWidth=t.$sliderId.outerWidth(true)+e(t.$leftArrow).outerWidth(true)*n+e(t.$rightArrow).outerWidth(true)*n;e(t.$sliderWrap).css("width",t.totalSliderWidth);if(t.options.dynamicTabs){t.alignNavigation()}if(t.options.hideSideArrows){t.options.continuous=false}if(t.options.continuous){t.$panelContainer.prepend(t.$panelContainer.children().last().clone().addClass("clone"));t.$panelContainer.append(t.$panelContainer.children().eq(1).clone().addClass("clone"))}var r=t.options.continuous?2:0;t.panelCount=e(t.panelClass).length;t.panelCountTotal=t.fade?1:t.panelCount+r;t.panelWidth=e(t.panelClass).outerWidth();t.totalWidth=t.panelCountTotal*t.panelWidth;e(t.sliderId+" .panel-container").css("width",t.totalWidth);t.slideDistance=t.options.responsive?100:e(t.sliderId).outerWidth();if(t.useCSS){t.totalWidth=100*t.panelCountTotal;t.slideDistance=100/t.panelCountTotal}if(t.options.responsive){t.makeResponsive()}t.prepareTransition(t.getFirstPanel(),true);t.updateClass()},determineAnimationType:function(){var e=this,t="animation",i="",s="Webkit Moz O ms Khtml".split(" "),o="",u=0;e.useCSS=false;if(e.elem.style.animationName){e.useCSS=true}if(e.useCSS===false){for(u=0;u<s.length;u++){if(e.elem.style[s[u]+"AnimationName"]!==r){o=s[u];t=o+"Animation";i="-"+o.toLowerCase()+"-";e.useCSS=true;break}}}if(n.documentElement.clientWidth>e.options.useCSSMaxWidth){e.useCSS=false}},configureCSSTransitions:function(t,n){var r=this,i,s;r.easing={easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175,.885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};if(r.useCSS){i="all "+(t||r.options.slideEaseDuration)+"ms "+r.easing[r.options.slideEaseFunction];s="all "+(n||r.options.heightEaseDuration)+"ms "+r.easing[r.options.heightEaseFunction];e(r.panelContainer).css({"-webkit-transition":i,"-moz-transition":i,"-ms-transition":i,"-o-transition":i,transition:i});if(r.options.autoHeight){r.$sliderId.css({"-webkit-transition":s,"-moz-transition":s,"-ms-transition":s,"-o-transition":s,transition:s})}}},transitionFade:function(){var t=this;e(t.panelClass).eq(t.nextPanel).fadeTo(t.options.fadeInDuration,1).css("z-index",1);e(t.panelClass).eq(t.prevPanel).fadeTo(t.options.fadeOutDuration,0).css("z-index",0);t.callback(t.options.callback,true)},hover:function(){var e=this;e.$sliderWrap.hover(function(){if(e.options.hoverArrows){e.hideShowArrows(e.options.fadeInDuration,true,true,false)}if(e.options.pauseOnHover){clearTimeout(e.autoSlideTimeout)}},function(){if(e.options.hoverArrows){e.hideShowArrows(e.options.fadeOutnDuration,true,false,true)}if(e.options.pauseOnHover&&e.options.autoSlide){e.startAutoSlide()}})},events:function(){var e=this;if(e.options.dynamicArrows){e.registerArrows()}if(e.options.crossLinks){e.registerCrossLinks()}if(e.options.dynamicTabs){e.registerNav()}if(e.options.swipe){e.registerTouch()}if(e.options.keyboardNavigation){e.registerKeyboard()}e.$sliderWrap.find("*").on("click",function(){if(e.options.forceAutoSlide){e.startAutoSlide(true)}else{if(e.options.autoSlide){e.stopAutoSlide()}}});e.hover()},setNextPanel:function(e){var t=this;if(e===t.nextPanel){return}t.prevPanel=t.nextPanel;if(t.loaded){if(typeof e==="number"){t.nextPanel=e}else{t.nextPanel+=~~(e==="right")||-1;if(!t.options.continuous){t.nextPanel=t.nextPanel<0?t.panelCount-1:t.nextPanel%t.panelCount}}if(t.fade||t.animateCSS){t.prepareTransition(t.nextPanel)}else{t.verifyPanel()}}},getFirstPanel:function(){var e=this,n;if(e.options.hashLinking){n=e.getPanelNumber(t.location.hash,e.options.hashTitleSelector);if(typeof n!=="number"){n=0}}return n?n:e.options.firstPanelToLoad-1},getPanelNumber:function(t,n){var r=this,i,s=t.replace("#","").toLowerCase();r.$panelClass.each(function(t){i=r.convertRegex(e(this).find(n).text());if(i===s){s=t+1}});return parseInt(s,10)?parseInt(s,10)-1:s},getFromPanel:function(e,t){var n=this;return n.convertRegex(n.$panelClass.find(e).eq(t).text())},convertRegex:function(e){return e.replace(/[^\w -]+/g,"").replace(/ +/g,"-").toLowerCase()},updateClass:function(){var t=this;if(t.options.dynamicTabs){e(t.$sliderWrap).find(".tab"+t.sanatizeNumber(t.nextPanel)+":first a").addClass("current").parent().siblings().children().removeClass("current")}if(t.options.crossLinks&&t.crosslinks){t.crosslinks.not(t.nextPanel).removeClass("currentCrossLink");t.crosslinks.each(function(){if(e(this).attr("href")==="#"+t.getFromPanel(t.options.panelTitleSelector,t.sanatizeNumber(t.nextPanel)-1)){e(this).addClass("currentCrossLink")}})}t.$panelClass.eq(t.nextPanel).addClass("currentPanel").siblings().removeClass("currentPanel")},sanatizeNumber:function(e){var t=this;if(e>=t.panelCount){return 1}else{if(e<=-1){return t.panelCount}else{return e+1}}},finalize:function(){var e=this;var t=e.options.autoHeight?e.getHeight():e.getHeighestPanel(e.nextPanel);if(e.options.autoHeight){e.adjustHeight(true,t)}if(e.options.autoSlide){e.autoSlide()}if(e.options.preloader){e.removePreloader()}e.onload()},callback:function(t,n){var r=this;if(t&&r.loaded){if(r.useCSS&&typeof n!=="undefined"){e(".panel-container").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(e){t.call(r)})}else{setTimeout(function(){t.call(r)},r.options.slideEaseDuration+50)}}},onload:function(){var e=this;e.options.onload.call(e)},prepareTransition:function(e,t,n,r){var i=this;i.nextPanel=e||0;if(!n){i.pretransition(i.options.pretransition)}i.noAnimation=t;i.noPosttransition=r;if(!i.loaded){i.transition()}else{i.options.pretransition.call(i)}},pretransition:function(){var e=this,t;if(e.options.hashLinking){e.updateHashTags()}if(e.options.mobileNavigation){e.dropdownSelect.val("tab"+(e.nextPanel+1))}if(e.options.hideSideArrows){e.hideShowArrows()}e.updateClass()},getTransitionMargin:function(){var e=this;return-(e.nextPanel*e.slideDistance)-e.slideDistance*~~e.options.continuous},transition:function(){var e=this,t=e.getTransitionMargin();if(e.animateCSS&&e.loaded){e.transitionOutAnimateCSS();return false}if(t+e.pSign!==e.panelContainer.css("margin-left")||t!==-100){if(e.options.autoHeight&&!e.animateCSS){e.adjustHeight(true,e.getHeight())}if(e.fade){e.transitionFade()}else{if(e.animateCSS){e.transitionInAnimateCSS(t)}else{if(e.useCSS){e.transitionCSS(t,e.noAnimation)}else{e.transitionjQuery(t,e.noAnimation)}}}}if(!e.noPosttransition){e.callback(e.options.callback)}},transitionOutAnimateCSS:function(){var t=this;e(t.panelClass).removeClass(t.options.animateIn+" animated");e(t.panelClass).eq(t.prevPanel).addClass("animated "+t.options.animateOut);t.callback(t.transitionInAnimateCSS,r)},transitionInAnimateCSS:function(){var t=this;if(t.options.autoHeight){t.adjustHeight(false,t.getHeight())}t.transitionCSS(t.getTransitionMargin(),!t.loaded);e(t.panelClass).removeClass(t.options.animateOut+" animated");e(t.panelClass).eq(t.nextPanel).addClass("animated "+t.options.animateIn);t.callback(t.options.callback,r)},transitionCSS:function(e,t){var n=this;if(t){n.configureCSSTransitions("0","0")}n.panelContainer.css({"-webkit-transform":"translate3d("+e+n.pSign+", 0, 0)","-moz-transform":"translate3d("+e+n.pSign+", 0, 0)","-ms-transform":"translate3d("+e+n.pSign+", 0, 0)","-o-transform":"translate3d("+e+n.pSign+", 0, 0)",transform:"translate3d("+e+n.pSign+", 0, 0)"});if(t){n.callback(function(){n.configureCSSTransitions()})}else{n.configureCSSTransitions()}},transitionjQuery:function(e,t){var n=this;if(t){n.panelContainer.css("margin-left",e+n.pSign)}else{n.panelContainer.animate({"margin-left":e+n.pSign},{easing:n.options.slideEaseFunction,duration:n.options.slideEaseDuration,queue:false})}},getHeighestPanel:function(){var t=this,n,r=0;t.$panelClass.each(function(){n=e(this).outerHeight(true);r=n>r?n:r});if(!t.options.autoHeight){return r}},verifyPanel:function(){var e=this,t=false;if(e.options.continuous){if(e.nextPanel>e.panelCount){e.nextPanel=e.panelCount;e.setNextPanel(e.panelCount)}else{if(e.nextPanel<-1){e.nextPanel=-1;e.setNextPanel(-1)}else{if(!t&&(e.nextPanel===e.panelCount||e.nextPanel===-1)){e.prepareTransition(e.nextPanel);e.updateClass();clearTimeout(n);var n=setTimeout(function(){if(e.nextPanel===e.panelCount){e.prepareTransition(0,true,true,true)}else{if(e.nextPanel===-1){e.prepareTransition(e.panelCount-1,true,true,true)}}},e.options.slideEaseDuration+50)}else{t=true;e.prepareTransition(e.nextPanel)}}}}else{if(e.nextPanel===e.panelCount){e.nextPanel=0}else{if(e.nextPanel===-1){e.nextPanel=e.panelCount-1}}e.prepareTransition(e.nextPanel)}}};e.fn.liquidSlider=function(t){return this.each(function(){var n=Object.create(i);n.init(t,this);e.data(this,"liquidSlider",n)})};e.fn.liquidSlider.options={autoHeight:true,minHeight:0,heightEaseDuration:1500,heightEaseFunction:"easeInOutExpo",slideEaseDuration:1500,slideEaseFunction:"easeInOutExpo",slideEaseFunctionFallback:"easeInOutExpo",animateIn:"bounceInRight",animateOut:"bounceOutRight",continuous:true,fadeInDuration:500,fadeOutDuration:500,autoSlide:false,autoSlideDirection:"right",autoSlideInterval:6e3,forceAutoSlide:false,pauseOnHover:false,dynamicArrows:true,dynamicArrowsGraphical:true,dynamicArrowLeftText:"&#171; left",dynamicArrowRightText:"right &#187;",hideSideArrows:false,hideSideArrowsDuration:750,hoverArrows:false,hoverArrowDuration:250,dynamicTabs:false,dynamicTabsHtml:true,includeTitle:true,panelTitleSelector:".title",dynamicTabsAlign:"left",dynamicTabsPosition:"top",navElementTag:"div",firstPanelToLoad:1,crossLinks:false,hashLinking:false,hashTitleSelector:".title",keyboardNavigation:false,leftKey:39,rightKey:37,panelKeys:{1:49,2:50,3:51,4:52},responsive:true,mobileNavigation:true,mobileNavDefaultText:"Menu",mobileUIThreshold:0,hideArrowsWhenMobile:true,hideArrowsThreshold:0,useCSSMaxWidth:2200,preload:function(){this.finalize()},onload:function(){},pretransition:function(){this.transition()},callback:function(){},preloader:false,swipe:false,swipeArgs:r}})(jQuery,window,document);jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t+n;return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t+n;return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t+n;return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t*t+n;return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t==0)return n;if(t==i)return n+r;if((t/=i/2)<1)return r/2*Math.pow(2,10*(t-1))+n;return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1)return-r/2*(Math.sqrt(1-t*t)-1)+n;return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;if(!o)o=i*.3*1.5;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);if(t<1)return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n;return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;if((t/=i/2)<1)return r/2*t*t*(((s*=1.525)+1)*t-s)+n;return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-jQuery.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(e,t,n,r,i){if(t<i/2)return jQuery.easing.easeInBounce(e,t*2,0,r,i)*.5+n;return jQuery.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}})

            // Prevent image dragging in the bracket
            $('.createbracket').on('mousedown', 'img', function () {
                return false;
            });
			
			// Remove the edit button
			$('.WikiaPageHeader .wikia-menu-button').remove();

            // Add the HTML to the page
			// Set the number of choices
			$('.createbracket .choicesleft').text(parseInt(Object.keys(bracketEntries).length) - 1);
			
            var number = 0;
            var firstItem = false;
            $.each(bracketEntries, function (index, value) {
                if (number === 0) {
                    var firstItem = true;
                }
                number++;
                if (number === 3) {
                    number = 1;
                }
                if (index !== 'submit' && firstItem !== true) {
                    $('.createbracket .liquid-slider').append('<div><div id="' + number + '"><div id="' + index + '" class="choose clearfix"><div id="option1" class="option"><div class="header">' + value[0].name + '</div><div class="image"><img src="' + value[0].image + '" alt="' + value[0].name + '" /></div></div><div id="option2" class="option"><div class="header">' + value[1].name + '</div><div class="image"><img src="' + value[1].image + '" alt="' + value[1].name + '" /></div></div></div></div></div>');
                } 
				else if (index !== 'submit' && firstItem === true) {
                    $('.createbracket .liquid-slider').append('<div><div id="' + number + '" class="firstitem"><div id="' + index + '" class="choose clearfix"><div id="option1" class="option"><div class="header">' + value[0].name + '</div><div class="image"><img src="' + value[0].image + '" alt="' + value[0].name + '" /></div></div><div id="option2" class="option"><div class="header">' + value[1].name + '</div><div class="image"><img src="' + value[1].image + '" alt="' + value[1].name + '" /></div></div></div></div></div>');
                } 
				else {
                    $('.createbracket .liquid-slider').append('<div><div class="submitslider"><span class="submittext">' + value[0].submitText + '</span><br /><br /><input type="submit" class="submit" value="' + value[0].buttonText + '" /><img style="display:none;" class="loader" src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" alt="Loading..." /><br /><span class="result"></span></div></div>');
                }
            });

            // Enable the slider
            $(function () {
                $('#bracketslider').liquidSlider({
                    hideSideArrows: true,
                    hideSideArrowsDuration: 0
                });
            });

            // Hide the right arrow for now, timed out to prevent issues with the "hideSideArrows" parameter
            setTimeout(function () {
                $('.createbracket .ls-nav-right-arrow').css('display', 'none');
            }, 250);

            // Events that fires once one of the arrows is clicked to handle the visibility of the buttons
            $('.createbracket').on('click', '.ls-nav-left-arrow', function () {
                $('.ls-nav-right-arrow').css('display', 'none');

                var isSubmit = $('.createbracket .currentPanel .submitslider .submit').length;
                var isActive = $('.createbracket .currentPanel .choose .active').length;
                var isFirstItem = $('.createbracket .currentPanel .firstitem').length;
				
                $('.createbracket .choicesleft').text(parseInt($('.createbracket .choicesleft').text()) + 1);
                if (isSubmit === 0 && isActive === 1) {
                    $('.ls-nav-right-arrow').css('display', 'inline');
                }

                if (isFirstItem !== 1) {
                    $('.ls-nav-left-arrow').css('display', 'inline');
                } 
				else {
                    $('.ls-nav-left-arrow').css('display', 'none');
                }
				
                if (isSubmit === 1) {
                    $('.createbracket .pageheader').css('display', 'none');
                }
                else {
                    $('.createbracket .pageheader').css('display', 'block');				
                }
            });

            $('.createbracket').on('click', '.ls-nav-right-arrow', function () {
                $('.ls-nav-right-arrow').css('display', 'none');

                var isSubmit = $('.createbracket .currentPanel .submitslider .submit').length;
                var isActive = $('.createbracket .currentPanel .choose .active').length;
                var isFirstItem = $('.createbracket .currentPanel .firstitem').length;

				$('.createbracket .choicesleft').text(parseInt($('.createbracket .choicesleft').text()) - 1);
                if (isSubmit === 0 && isActive === 1) {
                    $('.ls-nav-right-arrow').css('display', 'inline');
                }

                if (isFirstItem !== 1) {
                    $('.ls-nav-left-arrow').css('display', 'inline');
                } 
				else {
                    $('.ls-nav-left-arrow').css('display', 'none');
                }
				
                if (isSubmit === 1) {
                    $('.createbracket .pageheader').css('display', 'none');
                }
                else {
                    $('.createbracket .pageheader').css('display', 'block');				
                }
            });

            var entries = {};
            var blockNext = false;
            // Event that fires once a choice is made
            $('.createbracket').on('click', '.choose .option', function () {
                if (blockNext === false) {
                    blockNext = true;
                    // Get all the values
                    var that = this;
                    var currentNumber = $(this).parent().parent().attr('id');
                    var currentLevel = $(this).parent().attr('id');
                    var currentOption = $(this).attr('id');
                    var currentName = $('.header', this).text();
                    var currentImage = $('img', this).attr('src');

                    // Visual effects for the boxes
                    $('#' + currentLevel + ' .option').attr('class', 'option');
                    $(this).addClass('active');

                    // Add entry to the variable
                    entries[currentLevel] = currentName;
					if(currentLevel == 'winner') {
						thisWinner = currentName;
					}
                    // Get all the variables for the next selection
                    var currentSide = currentLevel.split('-')[0];
                    var currentSideLevel = parseInt(currentLevel.split('-')[1]);
                    var currentSideItem = parseInt(currentLevel.split('-')[2]);
                    var currentSideComplete = currentSide + '-' + currentSideLevel + '-' + currentSideItem;

                    var nextSideLevel = currentSideLevel + 1;
                    if (currentNumber == 2) {
                        var nextSideItem = currentSideItem / 2;
                    } 
					else {
						var nextSideItem = Math.ceil(currentSideItem / 2);
					}
                    var nextSide = currentSide;
                    var nextComplete = nextSide + '-' + nextSideLevel + '-' + nextSideItem;
                    var nextOption = 'option' + currentNumber;

                    // Check if this is the last choice before the winner
                    if (currentSideComplete == winnerAfterLeft) {
                        nextComplete = 'winner';
                        nextOption = 'option1';
                    }
                    if (currentSideComplete == winnerAfterRight) {
                        nextComplete = 'winner';
                        nextOption = 'option2';
                    }

                    // Update the next selections
                    $('.createbracket #' + nextComplete + ' #' + nextOption + ' .header').text(currentName);
                    $('.createbracket #' + nextComplete + ' #' + nextOption + ' img').attr('alt', currentName);
                    $('.createbracket #' + nextComplete + ' #' + nextOption + ' img').attr('src', currentImage);

                    $('.ls-nav-right-arrow').click();

                    setTimeout(function () {
                        blockNext = false;
                    }, 1500);
                }
            });

            // Call the API
            function callAPI(data, method, callback) {
                data['format'] = 'json';
                $.ajax({
                    data: data,
                    dataType: 'json',
                    url: wgScriptPath + '/api.php',
                    type: method,
                    success: function (response) {
                        if (response.error) {
                            console.log('API error: ' + response.error.info);
                        } 
						else {
                            callback(response);
                        }
                    },
                    error: function (xhr, error) {
                        console.log('AJAX error: ' + error);
                    },
                    timeout: 10000
                });
            }

            // Event fires when the bracket is submitted
            $('.createbracket').on('click', '.submit', function (event) {
                $('.createbracket .choose').each(function () {
                    // Check if it is filled out
                    if ($('#option1', this).hasClass("active") === true || $('#option2', this).hasClass("active") === true) {
                        notFilledOut = false;
                    } else {
                        notFilledOut = true;
                        return false;
                    }
                });
                if (notFilledOut !== true) {
                    event.preventDefault();
                    $('.result').text('');
                    $('.createbracket .loader').css('display', 'inline');
                    var that = this;
                    $(this).attr('disabled', 'disabled');

                    // Get the necessary variables to publish it
                    var userName = mediaWiki.config.get('wgUserName');
                    var pageName = bracketPageName;

                    var content = '';
                    $.each(entries, function (index, value) {
                        content = content + ' |' + index + ' = ' + value;
                    });
                    var finalContent = bracketTemplate + '' + content + '}}';

                    // Check if the bracket page already exists
                    callAPI({
                        'action': 'query',
                        'prop': 'info|revisions',
                        'intoken': 'edit',
                        'titles': pageName,
                        'rvprop': 'content',
                        'rvlimit': '1'
                    }, 'GET', function (response) {
                        var pages = response.query.pages;
                        var page = null;

                        for (var i in pages) {
                            page = pages[i];
                        }
						var cookie = getCookie('bracket');
                        // If not, submit the bracket, post the comment and redirect to the blog
                        if (page.missing == "" || mediaWiki.config.get('wgPageName') == bracketName + '/' + bracketFinal && cookie === '') {
                            callAPI({
                                'minor': 'yes',
                                'summary': editSummary,
                                'action': 'edit',
                                'title': pageName,
                                'startimestamp': page.starttimestamp,
                                'token': page.edittoken,
                                'watchlist': 'unwatch',
								'appendtext': '{{#vardefine:winner-'+currentBracketNumber+'|'+thisWinner+'}}'
                            }, 'POST', function (response) {
								if (response.edit.result == 'Success') {
									if(mediaWiki.config.get('wgPageName') == bracketName + '/' + bracketFinal) {
										$.ajax({
											url: 'index.php',
											type: 'POST',
											data: 'action=ajax&article=' + blogID + '&convertToFormat=&method=axPost&rs=ArticleCommentsAjax&title=' + blogTitle + '&wpArticleComment={{:' + pageName + '}}{{' + templateName + '}}',
										}).done(function (data) {
											$('.createbracket .loader').css('display', 'none');
											var commentText = data.text.toString();
											var commentRegex = /comm-([0-9]+)/g;
											var match = commentRegex.exec(commentText);
											window.location.replace(wgServer + '/wiki/' + blogTitle + '?bracketSubmit=' + submittedMessage + '&bracketLink=#article-comments');
											setCookie('bracket',1,10);
										});
									}
									else {
										$('.createbracket .loader').css('display', 'none');
										window.location.replace(wgServer + '/wiki/Create_your_Bracket/' + nextBracketNumber);								
									}
								} 
								else {
									$('.createbracket .loader').css('display', 'none');
									$('.result').text(genericErrorMessage);
									$(that).removeAttr('disabled');
								}
                            });
                        }
                        // If so, update the bracket page and redirect to the blog
                        else {
                            callAPI({
                                'minor': 'yes',
                                'summary': editSummary,
                                'action': 'edit',
                                'title': pageName,
                                'basetimestamp': page.revisions[0].timestamp,
                                'startimestamp': page.starttimestamp,
                                'token': page.edittoken,
                                'watchlist': 'unwatch',
								'appendtext': '{{#vardefine:winner-'+currentBracketNumber+'|'+thisWinner+'}}'
                            }, 'POST', function (response) {
                                if (response.edit.result == 'Success') {
									if(mediaWiki.config.get('wgPageName') == bracketName + '/' + bracketFinal) {
										$('.createbracket .loader').css('display', 'inline');
										window.location.replace(wgServer + '/wiki/' + blogTitle + '?bracketSubmit=' + editMessage + '&bracketLink=#article-comments');
									}
									else {
										$('.createbracket .loader').css('display', 'none');
										window.location.replace(wgServer + '/wiki/Create_your_Bracket/' + nextBracketNumber);									
									}
                                } 
								else {
                                    $('.createbracket .loader').css('display', 'none');
                                    $('.result').text(genericErrorMessage);
                                    $(that).removeAttr('disabled');
                                }
                            });
                        }
                    });
                }
                // Error message when the bracket is not filled out.
                else {
                    $('.result').text(finishError);
                }
            });
		}
    }(jQuery, mediaWiki, Wikia));
}