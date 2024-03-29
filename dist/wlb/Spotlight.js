	/*<nowiki>
	@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
	@ Some functions added by Jr Mime (pop-up layout, variables)
	@ Adds a pop up modal form for spotlights
	@ License: CC-BY-NC-SA
	@ License Jurisdiction: International
	*/
;(function($, mw) {
	'use strict';
	// Variables for later on
	// Keep these in an object for organization
	var config = mw.config.get([
		'wgNamespaceNumber',
		'wgPageName',
		'wgServer',
		'wgUserLanguage',
		'wgUserName'
	]),
	signature = '~~' + '~~',
	spotlightFinalAction,
	spotlightTemplate,
	spot_final_template,
	page,
	form_open = false;

	if (config.wgPageName !== 'Spotlight:Requests') return;

	var messages = {
			get: function(name) {
		return (messages[config.wgUserLanguage.toUpperCase()]||messages.EN)[name];
			},
			languages: {
				AR: 'ar - العربية',
				CS: 'cs - Česky',
				DA: 'da - Dansk',
				FA: 'fa - فارسی',
				HU: 'hu - Magyar',
				ID: 'id - Bahasa Indonesia',
				MS: 'ms - Malay',
				NN: 'nn - ‪Norsk (nynorsk)‬',
				NO: 'no - Norsk (bokmål)‬',
				SV: 'sv - Svenska',
				TR: 'tr - Türkçe',
				XX: 'Other'
			},
		};
	 
	 importScriptPage("MediaWiki:ApiKey.js", "wlb");
	 
	// English / default
	messages.EN = {
		"button-open": "Click here to add a new request",
		"button-close": "Click here to close the request",
		"form-language-choose": "Choose language",
	};
	 
	function hideForm() {
		$('#request-form').fadeOut();
			setTimeout(function() {
				$('#request-form').remove();
				console.log("Form removed successfully");
			}, 1000);
	}

	
	// Add buttons depending on user language
	$("head").append("<style>#spotlight input { margin-bottom: 15px; }</style>");		

	var buttonappend = document.createElement('a');
		buttonappend.className = 'wds-button';
		buttonappend.textContent = messages.get('button-open');
		buttonappend.addEventListener('click', function() {
			form_open = !form_open;
			form_open ? openFormSpotlight() : hideForm();
			this.textContent = messages.get(form_open ? 'button-close' : 'button-open');
		});
	document.getElementById("lang-EN").textContent = '';
	document.getElementById("lang-EN").append(buttonappend);
	var dropdown = '<select name="language" id="language" value="'+config.wgUserLanguage.toUpperCase()+'">';
	dropdown += '<option value="" selected disabled>' + messages.get('form-language-choose') + '</option>';
	for (var i in messages.languages) {
		dropdown += '<option value="'+i+'">'+messages.languages[i]+'</option>';
	}
	dropdown += '</select>';

if (config.wgNamespaceNumber === 118) {
	// reject reason
	function rejectReason() {

	$( "select[name='reject-reason']" ).change(function () {
		var reason_text = '',
		comment_text = '';
		switch($(this).val()) {
			case 'NoResponse30Days':
				reason_text = 'No response for extra information for 30 days';
				comment_text = 'Hello again! We asked for extra information regarding this request, but there has been no reaction for over 30 days.\n\nIf you would still like to request a spotlight for this wiki, please return to [[Spotlight:Requests]] and create a new request. Keep in mind that you still need to provide the info we asked for!\n\nHope to see you again :) &#126;&#126;&#126;';
				break;

			case 'Articles':
				reason_text = 'Wiki has less than 50 articles';
				comment_text = 'Hi! Thank you for making a spotlight request. However, your wiki does not have enough articles yet to be eligible for a spotlight. \n\nPlease write some more articles on your wiki. When you\'re done and you have more than 50 articles, you\'re very welcome to create a new request.\n\nHope to see you again soon :) &#126;&#126;&#126;';
				break;

			case 'Language':
				reason_text = 'Wiki\'s language to be requested elsewhere';
				comment_text = 'Hello, and thanks for making a spotlight request! However, the language that your wiki is in, has a dedicated place where you can request the spotlight. \n\nPlease check out the list at [[Spotlight:Requests]] and go to the link for your language. This also means that you don\'t have to make your request in English ;)\n\nGood luck with your spotlight! &#126;&#126;&#126;';
				break;

			case 'NoURL':
				reason_text = 'No fandom URL provided';
				comment_text = 'Hello, and thanks for making a spotlight request! However, you did not provide a URL to your project and thus we were not able to determine if it meets the criteria. &#126;&#126;&#126;&#126;';
				break;

			case 'Spam':
				reason_text = 'Spam';
				comment_text = '';
				break;
		}
		$('#official-reason textarea').val(reason_text);
		$('#spotlight-comment textarea').val(comment_text);
	});
	}
	
	function pendingReason() {

	$( "select[name='pending-reason']" ).change(function () {
		if ($(this).val() == 'pending_dropdowntext_wordmarkdesign') {
			$('#official-reason textarea')
				.val("Improving the wiki's design");
			$('#spotlight-comment textarea')
				.val("Hi! Thank you for creating a spotlight request. Your wiki's content looks nice and sufficient to keep readers entertained. However, your design is quite default.\n\nCould you please make sure to customize the colors and/or background of the wiki through the [[w:c:_______:Special:ThemeDesigner|theme designer]]. Also, you need to add a graphic wordmark as a wiki logo.\n\nThanks! &#126;&#126;&#126;");
			
		
		} else if ($(this).val() == 'pending_dropdowntext_provideurloflocalproject' ) {
			$('#official-reason textarea')
				.val("No URL given to localized project");
			$('#spotlight-comment textarea')
				.val("Hi, thank you for requesting a spotlight. We would like to see the Fandom you've requested a spotlight for - currently, your link goes to _____.\n\nPlease make sure that you provide us a URL to your localized project.\n\nThanks :) &#126;&#126;&#126;");


 		} else if ($(this).val() == 'dropdowntext_mainpage' ) {
			$('#official-reason textarea')
				.val("Main page needs to be cleared up");
			$('#spotlight-comment textarea')
				.val("Hi, thank you for requesting a spotlight. It looks like you put a lot of effort in your wiki. However, your main page might be a bit confusing or unattractive for new visitors.\n\nPlease make sure that your main page contains not only large chunks of text, but also links to the most important articles and at least one image.\n\nThanks :) &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_uncatimg' ) {
			$('#official-reason textarea')
				.val("There are too many uncategorized pages");
			$('#spotlight-comment textarea')
				.val("Hey, thanks for making a spotlight request! Did you remember to check [[w:c:_______:Special:UncategorizedPages|the uncategorized pages report]]? You will need to categorize most of them before we can spotlight your wiki.\n\nThank you! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_articlelimit' ) {
			$('#official-reason textarea')
				.val("Please add some more content");
			$('#spotlight-comment textarea')
				.val("Hello, thanks for requesting a spotlight here. However, the wiki seems to be a couple of articles short on our fifty good articles minimum.\n\nIf you have 50 articles already, check out [[w:c:_______:Special:ShortPages|the short pages report]], your articles might just be a bit short. In that case, just pick a couple of short pages and write a bit more about them.\n\nThanks :) &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_notadmin' ) {
			$('#official-reason textarea')
				.val("Wiki's administrator needs to approve");
			$('#spotlight-comment textarea')
				.val("Hi, thanks for requesting a spotlight for this wiki! The wiki you linked looks good, but it appears that you are not an administrator there.\n\nPlease ask an [[w:c:_______:Special:ListAdmins|admin of the wiki]] to reply to this request that he/she approves and wants a spotlight too. You can also link to a discussion with said admin\n\nThank you! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_nocaption' ) {
			$('#official-reason textarea')
				.val("Spotlight caption is missing");
			$('#spotlight-comment textarea')
				.val("Hello, and thanks for requesting a spotlight. However, it seems like you haven't written a caption (the sentence below the wiki title).\n\nPlease make sure to keep it short, catchy, and don't just write the wiki title. Also, don't forget to add an English translation, too!\n\nThank you :) &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_badcaption' ) {
			$('#official-reason textarea')
				.val("Caption needs improvement");
			$('#spotlight-comment textarea')
				.val("Hi! Thank you for making a spotlight request for this wiki it seems like you've got everything covered. However, one small thing: the caption.\n\nYour caption contains the wiki name, which will already be mentioned on the first line. Can you please try to write something else?\n\nThanks! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_noencaption' ) {
			$('#official-reason textarea')
				.val("Caption needs translation");
			$('#spotlight-comment textarea')
				.val("Hey! Thanks for creating a spotlight request for your wiki. However, it seems that you have not provided an English translation for the spotlight caption you want.\n\nThe caption you gave in your language looks good, but we would also like to know its meaning in English. Can you please add a translation for us?\n\nThank you! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_nopic' ) {
			$('#official-reason textarea')
				.val("Please provide a spotlight image");
			$('#spotlight-comment textarea')
				.val("Hello! Thanks for requesting a spotlight :) however, it seems like you have forgotten to add a picture that we can use to make your spotlight.\n\nWould you please provide a picture that is at least 300px wide and 200px tall? Keep in mind that it has to be related to the wiki's topic and that it can't contain any text.\n\nThanks! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_pictoosmall' ) {
			$('#official-reason textarea')
				.val("Please provide a bigger image");
			$('#spotlight-comment textarea')
				.val("Hi! Thanks for making a spotlight request, the wiki definitely looks suitable to be spotlighted on Fandom. However, the picture you provided is not big enough.\n\nPlease provide a picture that is at least 300px wide and 200px tall. Also, keep in mind that it has to be related to the wiki's topic and not contain text.\n\nThank you! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_pictextbased' ) {
			$('#official-reason textarea')
				.val("Image cannot be text-based");
			$('#spotlight-comment textarea')
				.val("Hi, thanks for creating a spotlight request your wiki looks ready to be spotlighted on Fandom! However, your picture is dominated by text.\n\nSince the caption will already be there, we need a picture that is not a logo or is largely dominated by text. Can you please provide a new image?\n\nThanks! &#126;&#126;&#126;");

		} else if ($(this).val() == 'dropdowntext_other' ) {
			$('#official-reason textarea')
				.val("Various reasons (see below)");
			$('#spotlight-comment textarea')
				.val("Hello, thanks for requesting a spotlight. However, we need some more information:\n* (add item here)\n* (add item here)\nPlease let us know if anything is still unclear! Thank you :)\n&#126;&#126;&#126;");

		}
	});
	}
	
}	 

	// This opens the form for the users to fill out
	 
	function openFormSpotlight() {
	
		if (config.wgUserName === null) { 
			alert('Please log in to continue');
			window.location = 'https://wlb.fandom.com/wiki/Special:UserLogin?returnto=Spotlight:Requests';
			
		} else {
			// [[File:PadSpotlightCaption.png]] [[File:Spotlight-bobleponge-255-fr.png]][[File:Yourwiki.png]]
			$("#lang-EN").after('<div id="request-form" style="min-width: 660px; margin: 0 auto;"><h2>Spotlight request</h2><div style="margin: 0 auto;"><h3>Example spotlights</h3><img alt="PadSpotlightCaption" src="https://static.wikia.nocookie.net/wlb/images/1/18/PadSpotlightCaption.png/revision/latest" width="255" height="123"><img alt="Spotlight-bobleponge-255-fr" src="https://static.wikia.nocookie.net/wlb/images/6/67/Spotlight-bobleponge-255-fr.png/revision/latest" width="255" height="123"><img alt="Yourwiki" src="https://static.wikia.nocookie.net/wlb/images/7/75/Yourwiki.png/revision/latest" width="255" height="123"></div><form class="WikiaForm" method="" name="" id="spotlight" style="width: "><fieldset style="text-align: left; width: 660px;"><span style="font-family:Arial"><span style="font-weight:bold">Wiki name</span><br><input id="wikiname" type="text" placeholder="Community Central" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">URL</span><br><span style="color:gray">https://</span><input id="wikiurl" type="text" placeholder="community" style="width:304px"/><span style="color:gray">.fandom.com</span><br><span id="br2" /><span style="font-weight:bold">Select your language</span> (' + dropdown + ')<br><span style="color:gray">These languages cannot be requested and will not be worked on here: <a href="https://community.fandom.com/wiki/Community_Central:Spotlights">en</a>, <a href="https://comunidad.fandom.com/wiki/Wikia:Spotlights">ca/es</a>, <a href="https://community.fandom.com/de/wiki/Spotlight-Antrag">de</a>, <a href="https://yhteiso.fandom.com/wiki/Project:Valokeilat">fi</a>, <a href="https://communaute.fandom.com/wiki/Wiki_des_communaut%C3%A9s:%C3%80_la_une">fr</a>, <a href="https://community.fandom.com/it/wiki/Wiki_della_Community%3ASpotlight">it</a>, <a href="https://community.fandom.com/ja/wiki/Wikia:%E3%82%B9%E3%83%9D%E3%83%83%E3%83%88%E3%83%A9%E3%82%A4%E3%83%88">ja</a>, <a href="https://community.fandom.com/ko/wiki/%EC%9C%84%ED%82%A4%EC%95%84:%EC%8A%A4%ED%8F%AC%ED%8A%B8%EB%9D%BC%EC%9D%B4%ED%8A%B8">ko</a>, <a href="https://community.fandom.com/nl/wiki/Wikia_Spotlights">nl</a>, <a href="https://spolecznosc.fandom.com/wiki/Project%3ASpotlight">pl</a>, <a href="https://comunidade.fandom.com/wiki/Ajuda%3APedidos_de_Spotlight">pt</a>, <a href="https://community.fandom.com/ru/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D1%8F%3A_%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D1%8B_%D0%BD%D0%B0_%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D1%8B">ru</a>, <a href="https://congdong.fandom.com/wiki/Wikia:Yêu_cầu_nổi_bật">vi</a>, <a href="https://community.fandom.com/zh/wiki/Board:%E9%A2%86%E5%85%BB%E5%92%8C%E6%8F%90%E5%8D%87%E7%BB%B4%E5%9F%BA">zh</a>.</span><br><span id="br2" /><div style="height: 15px;"></div><span style="font-weight:bold">Caption (Your language) - maximum 40 characters.</span><br><input id="intcaption" type="text" placeholder="Caption in your language" maxlength="40" style="width:400px;"/><br><span id="br2" /><span style="font-weight:bold">Caption (English)</span><br><input id="englishcaption" type="text" placeholder="English translation of caption" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Signature</span><br><input id="signatureplace" type="text" value="' + signature + '"style="width:400px"/></span><br><span style="font-weight:bold">Image</span><br>Please add the image after you sent the request.<br><span id="br2" /><br><b>Tell us why your wiki should be featured fandom-wide:</b><br><span id="br2" /><div style="clear: both;"></div><textarea style="width: 100%; min-height: 100px;" id="tell_us_why" name="tell_us_why" placeholder="Add your text here!"></textarea></fieldset></form><button class="wds-button" id="form-submit">Submit request</button></div>');
		}
		document.getElementById('form-submit').addEventListener('click', submitformSpotlight2);
	}

	function submitformSpotlight2() {
	console.log('Starting to submit...');
		var $form = $('#spotlight'),
			wikiname = $form.find('#wikiname').val(),
			url = $form.find('#wikiurl').val(),
			intcaption = $form.find('#intcaption').val(),
			lang = $form.find('#language').val(),
			encaption = $form.find('#englishcaption').val(),
			image = $form.find('#image').val(),
			reason = $form.find('#tell_us_why').val(),
			signatureplace = $form.find('#signatureplace').val(),
			page = '{{Spotlight header}}\n{{Open}}\n{{Image container|[[File:Placeholder|center|200px]]}}\n* [[w:c:' + url + '|' + wikiname + ']] ([[w:c:' + url + ':Special:ListUsers/sysop|<span title="List of admins">al</span>]] &bull; [[w:c:' + url + ':Special:ShortPages|<span title="Shortest pages">sp</span>]] &bull; [[w:c:' + url + ':Special:UncategorizedPages|<span title="Pages without categories">up</span>]])\n* Caption\n** '+ lang + ': ' + intcaption + '\n** EN: ' + encaption + '\n* {{userInfo|' + config.wgUserName + '}}\n' + reason + '\n\n' + signatureplace + '\n==Response==';
		// If language or header is blank, return alerts
		if (!lang) {
			alert('Please select a language!');
			return;
		}
		if (!wikiname) {
			alert('Please fill in wikiname!');
			return;
		}
	console.log('Performed checks...');
	 
		// Ajax URL
		new mw.Api().postWithEditToken({
			action: 'edit',
			title: 'Spotlight:' + lang + '-' + wikiname,
			text: page,
			summary: 'New spotlight request (' + lang + ')',
			createonly: 1
		}).done(function (r) {
			console.log('Should be done now:');
			window.location = config.wgServer + '/wiki/Spotlight:' + encodeURIComponent(lang) + '-' + encodeURIComponent(wikiname) + '?newspotlightrequest=1';
		});
	console.log('Sent request...');
	}





	/* auto reply buttons */
	var staffUsers = [
		"MehrBot", "MtaÄ", "Vuh", "Yatalu", "Hulothe"
	];
	if (($.inArray( config.wgUserName, staffUsers ) !== -1)) {

	$(".notifbox.status").after('<div id="reply-container"></div>');

	$(".notifbox.status").prepend('<div style="float: right;">' +
		'<select name="spotlight-action" id="spotlight-action" value="?">' +
		'<option value="" selected disabled>Choose an action</option>' +
		'<option value="Accept">Accept</option>' +
		'<option value="Reject">Reject</option>' +
		'<option value="MoreInfo">Request more info</option>' +
		'</select></div>'
	);

	var spotlightAction = '';

	var spotlightReplyForm = '<div id="request-reply" class="request-reply-form">' +
	'<h2><span id="spotlight-action-heading">' + spotlightAction + '</span> this spotlight</h2>' +
	'<div id="official-reason"><b>Official reason for your chosen action</b><br><textarea></textarea></div>' +
	'<div id="spotlight-comment"><b>Enter a comment</b><br><textarea></textarea></div>' +
	'<button id="reply-submit">Submit</button>' +
	'</div>';
	document.getElementById('reply-submit').addEventListener('click', submitSpotlightReply);

	$( "select[name='spotlight-action']" ).change(function () {
	    $('#spotlight-comment textarea').val('');
	    
		if ($(this).val() == 'Accept') {
	//        alert("Hello accept");
			spotlightAction = "Accept";
			spotlightFinalAction = "Accept";
			spotlightTemplate = "Accepted";
			$("#reply-container").html(spotlightReplyForm);
			$("#spotlight-action-heading").text(spotlightAction);
			cssAdjustments();
			$("#official-reason").remove();
			$('#spotlight-comment textarea').val(
			    'Hi, thank you for requesting an international spotlight! I\'ve looked at your wiki and it meets all the criteria for a spotlight: your request is accepted.\n\n' +
			    'I have uploaded a spotlight image under "Final spotlight" in the green box. Please let me know within a week if you like it, and if I can use it as a spotlight image. Thank you!\n\n' +
                '&#126;&#126;&#126;'
			);
			
			
		} else if ($(this).val() == 'Reject' ) {
	//        alert("Hello reject");
			spotlightAction = "Reject";
			spotlightFinalAction = "Reject";
			spotlightTemplate = "Rejected";
			$("#reply-container").html(spotlightReplyForm);
			$("#spotlight-action-heading").text(spotlightAction);
			cssAdjustments();


			$('#official-reason b').append('&nbsp;<select name="reject-reason" id="reject-reason" value="?">' +
		'<option value="" selected disabled>Choose an action</option>' +
		'<option value="NoResponse30Days">No answer in 30 days</option>' +
		'<option value="Articles">Too few articles</option>' +
		'<option value="Language">Language not allowed</option>' +
		'<option value="NoURL">No URL provided / Fandom does not exist</option>' +
		'<option value="Spam">Spam</option>' +
		'</select>');


			rejectReason();
					

		} else if ($(this).val() == 'MoreInfo' ) {
	//        alert("GIVE ME MOAR INFO");
			spotlightAction = "Request more information about";
			spotlightFinalAction = "MoreInfo";
			spotlightTemplate = "Waiting";
			$("#reply-container").html(spotlightReplyForm);
			$("#spotlight-action-heading").text(spotlightAction);
			cssAdjustments();
			//$("#official-reason").remove();
			
			$('#official-reason b').append('&nbsp;<select name="pending-reason" id="pending-reason" value="?">' +
		'<option value="" selected disabled>Choose an action</option>' +
		'<option value="pending_dropdowntext_provideurloflocalproject">No localized URL given</option>' +
		'<option value="pending_dropdowntext_wordmarkdesign">Wordmark/design</option>' +
		'<option value="dropdowntext_mainpage">Messy main page</option>' +
		'<option value="dropdowntext_uncatimg">Uncategorized images</option>' +
		'<option value="dropdowntext_articlelimit">Not enough articles</option>' +
		'<option value="dropdowntext_notadmin">Not an admin</option>' +
		'<option value="dropdowntext_nocaption">Missing caption</option>' +
		'<option value="dropdowntext_badcaption">Need better caption</option>' +
		'<option value="dropdowntext_noencaption">No English caption</option>' +
		'<option value="dropdowntext_nopic">Picture missing</option>' +
		'<option value="dropdowntext_pictoosmall">Picture too small</option>' +
		'<option value="dropdowntext_pictextbased">Text-based picture</option>' +
		'<option value="dropdowntext_other">Various reasons</option>' +
		'</select>');
			pendingReason();
		}
	});
	
	function cssAdjustments() {
	$("#request-reply textarea").css("box-sizing", "border-box").css("width", "100%").css("height", "75px");
	}

	function submitSpotlightReply() {

	$(".request-reply-form").after('<div id="rawtext" style="display: none;"></div>');
	$("#rawtext").load(config.wgServer + "/wiki/" + config.wgPageName + "?action=raw");
	$("*").css('cursor', 'wait');

	var additionalComment = $("#spotlight-comment textarea").val();

	setTimeout(function() {
		$("#rawtext").append("\n\n" + additionalComment);
	}, 1000);
		
	setTimeout(function() {

	var currentPage = $("#rawtext").html();

		var officialReason = $("#official-reason textarea").val();

		
		setTimeout(function() {
			// determine state 
			if (spotlightTemplate === "Accepted") {
				spot_final_template = '{{' + spotlightTemplate + '}}';
				page = currentPage.replace('{{Waiting}}', spot_final_template).replace('{{Rejected}}', spot_final_template).replace('{{Open}}', spot_final_template);
			
			} else if (spotlightTemplate === "Rejected") {
				spot_final_template = '{{' + spotlightTemplate + '|1=' + officialReason + '}}';
				page = currentPage.replace('{{Accepted}}', spot_final_template).replace('{{Waiting}}', spot_final_template).replace('{{Open}}', spot_final_template);
					
			} else if (spotlightTemplate === "Waiting") {
				spot_final_template = '{{' + spotlightTemplate + '|1=' + officialReason + '}}';
				page = currentPage.replace('{{Accepted}}', spot_final_template).replace('{{Rejected}}', spot_final_template).replace('{{Open}}', spot_final_template);
				
			}

			new mw.Api().postWithEditToken({
				action: 'edit',
				title: config.wgPageName,
				text: page,
				summary: 'Replied to request'
			}).done(function (r) {
				console.log('Should be done now:');
				window.location.reload();
			});
		
		}, 2000);
		
	}, 2000);

	}

	} else {
	
		$('#upload-helper').remove();
	
	}

	/* functions always to be called */
	$(window).ready(function () {
		setTimeout(function() {
	
	/* modal */
			if (location.search.match(/\?newspotlightrequest\=1/g) !== null ) {
				
				$.showCustomModal('Suggest a picture for your spotlight!', 'Please add a spotlight picture now. Make sure that it meets the criteria, which is:<br><br>' +
				'<ul style="margin-left: 1em;"><li>- The picture should show the most relevant thing/person of the series - everyone who knows the series and sees this image should know instantly what your topic is.</li>' +
				'<li>- The picture at least 200x300px big (wallpaper size preferred)</li>' +
				'<li>- The picture does not contain large text.</li>' +
				'<li>- The picture is not just a logo of the series.</li><br><div style="float: right;"><button onclick="$(this).parent().parent().parent().parent().parent().closeModal();">OK</button></div></ul>');
				
			} else {
				// do nothing
			}
		}, 1000);
	
	/* optical fixes for image box */
	
		$('#spotlight-imagebox #userimage figure > a').unwrap();
		$('#spotlight-imagebox #userimage figcaption').remove();
		$('#spotlight-imagebox #userimage img').attr('height', 96);
		$('#spotlight-imagebox #userimage img').attr('width', 200);
	
	});
})(window.jQuery, window.mediaWiki);
// </nowiki>