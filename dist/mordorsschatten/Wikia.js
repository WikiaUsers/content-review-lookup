/* General */
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="French">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['pt'] = '<img class="pt-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/5/5c/Flag_of_Portugal.svg" alt="Portuguese">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/05/Flag_of_Brazil.svg" alt="Brazilian Portuguese">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';


	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
 
/*** Click tracking ***/
jQuery( function($) {
	var track = Wikia.Tracker.buildTrackingFunction({
		category: 'interlanguage-nav',
		action: Wikia.Tracker.ACTIONS.CLICK,
		trackingMethod: 'ga'
	});
	/** Wikia Interlanguage Default Link **/
	var $WikiaInterlanguageDefaultLink = $('nav.WikiaArticleInterlang');
	$WikiaInterlanguageDefaultLink.on( 'mousedown', 'a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-deafult-link'
		});
	} );
	/** WikiaInterlanguageCustomLink **/
	var $WikiaInterlanguageCustomLink = $('.WikiaPageHeader');
	$WikiaInterlanguageCustomLink.on( 'mousedown', '.chooselanguage a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-custom-link'
		});
	} );
} );

/* Other */
/** Fantasy Face-Off **/
if (wgPageName === 'Benutzer_Blog:Foppes/Fantasy_Versus_Wettbewerb') {
	challengers = {};
 
	//Shadow of Mordor challenger images
	challengers['Talion'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/8/81/Talion.jpg';
	challengers['Sauron'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/7/7d/Sauron_with_background_square.png';
	challengers['Celebrimbor'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/d/d9/Celebrimbor_square.png';
	challengers['Hammer'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/b/be/The_Hammer_square.png';
	challengers['Graug'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/e/ed/Character-Graug.png';
 	challengers['Königin Marwen'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/3/3d/Queen_Marwen_square.png';			
 
	//Shadow of Mordor challenger links
	challengers['Talion-link'] = 'http://mordorsschatten.wikia.com/wiki/Talion';
	challengers['Sauron-link'] = 'http://mordorsschatten.wikia.com/wiki/Sauron';
	challengers['Celebrimbor-link'] = 'http://mordorsschatten.wikia.com/wiki/Celebrimbor';
	challengers['Hammer-link'] = 'http://mordorsschatten.wikia.com/wiki/Hammer';
	challengers['Graug-link'] = 'http://mordorsschatten.wikia.com/wiki/Graug';
 	challengers['Königin Marwen-link'] = 'http://mordorsschatten.wikia.com/wiki/Königin_Marwen';		
 
	// Non-Shadow of Mordor challenger images
	challengers['Batman'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/7/75/Batman-square.jpg';
	challengers['Godzilla Junior'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/e/e8/Godzilla_Jr.jpg';
	challengers['Thor'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/2/23/Thor.jpg';
	challengers['Harry Potter'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/8/8b/Harry-potter.jpg';
	challengers['Trevor'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/2/21/Trevor-square.png';
	challengers['Meredith'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/4/4d/Meredith.png';
	challengers['Edward Kenway'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/3/31/Edward_Kenway.jpg';
	challengers['Urdnot Wrex'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/e/e8/Mass-effect-urdnot-wrex.jpg';
	challengers['Barbaren-König'] = 'https://images.wikia.nocookie.net/shadowofmordor/de/images/a/a2/Barbaren-K%C3%B6nig.png';
        challengers['Darth Vader'] = 'https://images.wikia.nocookie.net/__cb20140911090931/shadowofmordor/de/images/b/b7/VadersKubus.jpg';
 
	// Non-Shadow of Mordor challenger links
	challengers['Batman-link'] = 'http://de.batman.wikia.com/wiki/Batman';
	challengers['Godzilla Junior-link'] = 'http://de.godzilla.wikia.com/wiki/Godzilla_Junior';
	challengers['Thor-link'] = 'http://de.marvel-filme.wikia.com/wiki/Thor_Odinson';
	challengers['Harry Potter-link'] = 'http://de.harrypotter.wikia.com/wiki/Harry_Potter';
	challengers['Trevor-link'] = 'http://de.gta.wikia.com/wiki/Trevor_Philips';
	challengers['Meredith-link'] = 'http://de.dragonage.wikia.com/wiki/Meredith_Stannard';
	challengers['Edward Kenway-link'] = 'http://de.assassinscreed.wikia.com/wiki/Edward_Kenway';
	challengers['Urdnot Wrex-link'] = 'http://de.masseffect.wikia.com/wiki/Urdnot_Wrex';
	challengers['Barbaren-König-link'] = 'http://de.clashofclans.wikia.com/wiki/Barbaren-K%C3%B6nig';
        challengers['Darth Vader-link'] = 'http://www.jedipedia.de/wiki/Darth_Vader'; 
 
	challengerPoll = {
		init: function() {
			$('.ajax-poll').each(function() {
				var pollID = $(this).attr('id').split('-')[2];
				$('.pollAnswerName label', this).each(function(index) {
					var challenger = $(this).text();
					var radioID = $('input', this).attr('id');
					var radioValue = $('input', this).attr('value');
					if (index === 0) {
						var challenger1 = challenger.trim();
						challengerPoll.beautify(this, challenger1, pollID, radioID, radioValue);
					}
					else {
						var challenger2 = challenger.trim();
						challengerPoll.beautify(this, challenger2, pollID, radioID, radioValue);
					}
				});
			});
 
			$('.ajax-poll').on('click', '.challenger img', function() {
				$(this).closest('.ajax-poll').children().find('.challenger').attr('class','challenger');
				$(this).parent().addClass('active');
 
				var pollID = $(this).attr('data-poll');
				var pollRadio = $(this).attr('data-radio');
				var pollValue = $(this).attr('data-value');
				var params = {};
				params['action'] = 'ajax';
				params['rs'] = 'axAjaxPollSubmit';
				params['title'] = wgPageName;
				params['wpPollId'] = pollID;
				params['wpVote'] = 'Vote!';
				params[pollRadio] = pollValue;
				$.post('index.php', params, function(data) {
					var total = data.total;
 
					var votedSpan = '#wpPollVote' + pollID + '-' + pollValue;
					var votedBar = '#wpPollBar' + pollID + '-' + pollValue;
 
					$(votedSpan).text(data.votes[pollValue].value);
					$(votedSpan).attr('title',data.votes[pollValue].percent + '%');
					$(votedBar).css('width',data.votes[pollValue].percent + '%');
 
					if(pollValue == 2) {
						pollValueNot = 3;
					}
					else {
						pollValueNot = 2;
					}
					var notVotedValue = total - data.votes[pollValue].value;
					var notVotedPercentage = notVotedValue / total * 100;
					notVotedPercentage = +notVotedPercentage.toFixed(2);
 
					var notVotedSpan = '#wpPollVote' + pollID + '-' + pollValueNot;
					var notVotedBar = '#wpPollBar' + pollID + '-' + pollValueNot;
 
					$(notVotedSpan).text(notVotedValue);
					$(notVotedSpan).attr('title',notVotedPercentage + '%');	
					$(notVotedBar).css('width',notVotedPercentage + '%');				
				}, "json");
			});
 
		},	
		beautify: function(element, challenger, poll, radio, value) {
			var challengerLink = challenger + '-link';
			$(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 200px; height: 200px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
		}
	};
 
	$(document).ready(function() {
		$('.ajax-poll .total').parent().attr('class','description');
		$('.ajax-poll .pollAnswerVotes span').each(function () {
			var titleReplace = $(this).attr('title');
			if (titleReplace == 0) {
				$(this).attr('title','0%');				
			}
			else if (titleReplace) {
				var titleReplace = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
				$(this).attr('title',titleReplace);
			}
			else {
				$(this).attr('title','0%');		
			}
		});
		challengerPoll.init();
	});
}