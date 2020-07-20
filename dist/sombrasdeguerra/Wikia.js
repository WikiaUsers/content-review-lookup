/***** Any JavaScript here will be applied to the Wikia/Oasis on the entire site. *****/
/* Skin */
/** Legal Info box **/
addOnloadHook(function() {
	if (wgPageName != "Shadow_of_Mordor_Wikia") {
		checkRightRail = setInterval(addLegalModule,100);
	}
});
 
function addLegalModule() {
	if ($("#WikiaRail .loading").length === 0) {
		var legalHTML = '<div class="LegalInfoModule module"><h1 class="header-legalinfo">Información legal</h1><div class="box-legalinfo"><div class="legal-ESRB"></div><div class="legal-logos"><div class="legal-Monolith"></div><div class="legal-WBGames"></div></div><div class="legal-text">MIDDLE-EARTH: SHADOW OF MORDOR &copy; 2013 Warner Bros. Entertainment Inc. Desarollado por Monolith. en colaboración con WingNut Films. &copy; 2013 New Line Productions, Inc. &copy; The Saul Zaentz Company. LA TIERRA MEDIA: SOMBRAS DE MORDOR, EL HOBBIT; y los nombres de personajes, objetos, eventos y lugares incluidos son marcas registradas de The Saul Zaentz Company d/b/a Middle-earth Enterprises bajo licencia de Warner Bros. Interactive Entertainment. Otras marcas registradas y derechos de autor son propiedad de sus respectivos dueños. Todos los derechos reservados.<br /><br />EL LOGO DE MONOLITH, EL LOGO DE WB GAMES Y ESCUDO DE WB: &trade; &amp; &copy; Warner Bros. Entertainment Inc. (s13)</div></div></div>'
		$('#WikiaRail').append(legalHTML);
		clearInterval(checkRightRail);
	}
}
 
/* Main page */
 
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
 
/** Social Media icons **/
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Other */
if (wgPageName === 'User_blog:MarkvA/Fantasy_Face-Off') {
	challengers = {};
 
	//Shadow of Mordor challenger images
	challengers['Talion'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/8/81/Talion.jpg';
	challengers['Sauron'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/7/7d/Sauron_with_background_square.png';
	challengers['Celebrimbor'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/d/d9/Celebrimbor_square.png';
	challengers['The Hammer'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/be/The_Hammer_square.png';
	challengers['The Tower'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/6/6e/The_Tower_square.png';
	challengers['Graug'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/e/ed/Character-Graug.png';
 	challengers['Ioreth'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/e/e9/Ioreth_square.png';	
 	challengers['Queen Marwen'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/3/3d/Queen_Marwen_square.png';		
 	challengers['Galadriel'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/e/ef/Galadriel_square.png';		
 
	//Shadow of Mordor challenger links
	challengers['Talion-link'] = 'http://shadowofmordor.wikia.com/wiki/Talion';
	challengers['Sauron-link'] = 'http://shadowofmordor.wikia.com/wiki/Sauron';
 	challengers['Celebrimbor-link'] = 'http://shadowofmordor.wikia.com/wiki/Celebrimbor';
 	challengers['The Hammer-link'] = 'http://shadowofmordor.wikia.com/wiki/The_Hammer';
 	challengers['The Tower-link'] = 'http://shadowofmordor.wikia.com/wiki/The_Tower';
 	challengers['Graug-link'] = 'http://shadowofmordor.wikia.com/wiki/Graug';	
 	challengers['Ioreth-link'] = 'http://shadowofmordor.wikia.com/wiki/Ioreth';	
 	challengers['Queen Marwen-link'] = 'http://shadowofmordor.wikia.com/wiki/Queen_Marwen';
 	challengers['Galadriel-link'] = 'http://shadowofmordor.wikia.com/wiki/Galadriel';		
 
	// Non-Shadow of Mordor challenger images
	challengers['Diablo'] = 'https://images.wikia.nocookie.net/diablo/images/a/ac/DiabPort.jpg';
	challengers['Zuko'] = 'https://pbs.twimg.com/profile_images/1211337903/zuzu.jpg';
	challengers['Ichigo Kurosaki'] = 'https://images.wikia.nocookie.net/bleach/en/images/a/ae/Ep113IchigoKurosaki.png';
	challengers['Deadman'] = 'https://images.wikia.nocookie.net/marvel_dc/images/9/98/Deadman_The_Nail_001.png';
	challengers['Jon Snow'] = 'https://images.wikia.nocookie.net/gameofthrones/images/d/d4/Jon_Snow_family_tree_image.jpg';
	challengers['Yuya Sasaki'] = 'https://images.wikia.nocookie.net/yugioh-arcv/images/a/a3/Yuya_Sakaki_HQ.png';
	challengers['Thor'] = 'http://static.comicvine.com/uploads/original/13/132352/3549631-thor+4.jpg';
	challengers['Lady Sif'] = 'https://pbs.twimg.com/profile_images/378800000616205412/93968b245696837fc4b04c196e1f3bf8.jpeg';
	challengers['Lief'] = 'http://rs1226.pbsrc.com/albums/ee419/LuxRayLionheart/Deltora%20Quest/DeltoraQuest-EP15-GoodLuckBadLuck-LiefwhilegazingatNeridah-1.jpg~c200';
	challengers['Delsin Rowe'] = 'https://lh6.googleusercontent.com/-8lnJDw8gOZs/AAAAAAAAAAI/AAAAAAAAABQ/IaQfjnG7-ts/photo.jpg';
	challengers['Iron Golem'] = 'http://fc07.deviantart.net/fs71/i/2013/227/0/0/minecraft_iron_golem_render_by_danixoldier-d6i7xrk.jpg';
	challengers['Hive Ogre'] = 'https://images.wikia.nocookie.net/destinypedia/images/9/9c/Hive_Ogre_square.png';
	challengers['Elvira Grey'] = 'http://static.giantbomb.com/uploads/square_small/0/5364/891311-lgrey.jpg';
	challengers['Darkseid'] = 'https://images.wikia.nocookie.net/superman/images/f/f4/Darkseid-smallville.jpg';
	challengers['Triss Merigold'] = 'http://images.coolestwallpapers.com/download/688/my-beautiful-dark-twisted-fantasy-the-witcher-triss-merigold-artwork-books-1024x1024.jpg';
	challengers['Drizzt Do\'Urden'] = 'http://static.giantbomb.com/uploads/square_small/0/7564/557150-31930_drizzt_do_urden_400.jpg';
	challengers['Meredith'] = 'http://i1104.photobucket.com/albums/h339/AugustArria/Meredith.png?t=1343252133';
	challengers['Arisen'] = 'https://images.wikia.nocookie.net/dragonsdogma/images/9/9d/Savan_square.png';
	challengers['Viconia DeVir'] = 'http://www.unikgamer.com/characters/face/viconia-devir-2082.jpg';
	challengers['Harry Potter'] = 'http://1.bp.blogspot.com/-8SGiRpulyVk/Tn0uO2QE4qI/AAAAAAAAD38/P2jbCWbpHLM/s1600/harry-potter-pix1.jpg';
	challengers['Eragon'] = 'https://images.wikia.nocookie.net/inheritance/images/4/4e/Eragon_square.png';
	challengers['Kvothe'] = 'https://images.wikia.nocookie.net/nameofthewind/images/5/5c/Kvothe_square.png';
	challengers['Gwyn, Lord of Cinder'] = 'https://images.wikia.nocookie.net/darksouls/images/5/5b/Gwyn_square.png';
	challengers['Veronica Santangelo'] = 'http://4.bp.blogspot.com/-f14zUtiSfAA/TwZVTRsKSEI/AAAAAAAAAZU/Kl2rKUoyxmE/s1600/Fallout-veronica.jpg';
	challengers['Corvo Attano'] = 'http://cloud-3.steampowered.com/ugc/595912128025440140/B16F211E6C35E107A0ACEC3BA234FC8173202C8C/268x268.resizedimage';
	challengers['Urdnot Wrex'] = 'http://wallpaper.pickywallpapers.com/ipad/mass-effect-urdnot-wrex.jpg';
 
	// Non-Shadow of Mordor challenger links
	challengers['Diablo-link'] = 'http://diablo.wikia.com/wiki/Diablo';
	challengers['Zuko-link'] = 'http://avatar.wikia.com/wiki/Zuko';
	challengers['Ichigo Kurosaki-link'] = 'http://bleach.wikia.com/wiki/Ichigo_Kurosaki';
	challengers['Deadman-link'] = 'http://dc.wikia.com/wiki/Deadman';
	challengers['Jon Snow-link'] = 'http://gameofthrones.wikia.com/wiki/Jon_Snow';
	challengers['Yuya Sasaki-link'] = 'http://yugioh.wikia.com/wiki/Yuya_Sasaki';
	challengers['Thor-link'] = 'http://marvel.wikia.com/wiki/Thor';
	challengers['Lady Sif-link'] = 'http://agentsofshield.wikia.com/wiki/Lady_Sif';
	challengers['Lief-link'] = 'http://deltoraquest.wikia.com/wiki/Lief';
	challengers['Delsin Rowe-link'] = 'http://infamous.wikia.com/wiki/Delsin_Rowe';
	challengers['Iron Golem-link'] = 'http://minecraft.wikia.com/wiki/Iron_Golem';
	challengers['Hive Ogre-link'] = 'http://destiny.wikia.com/wiki/Hive_Ogre';
	challengers['Elvira Grey-link'] = 'http://fable.wikia.com/wiki/Elvira_Grey';
	challengers['Darkseid-link'] = 'http://villains.wikia.com/wiki/Darkseid';
	challengers['Triss Merigold-link'] = 'http://thewitcher.wikia.com/wiki/Triss_Merigold';
	challengers['Drizzt Do\'Urden-link'] = 'http://forgottenrealms.wikia.com/wiki/Drizzt_Do\'Urden';
	challengers['Meredith-link'] = 'http://dragonage.wikia.com/wiki/Meredith';
	challengers['Arisen-link'] = 'http://dragonsdogma.wikia.com/wiki/Arisen';
	challengers['Viconia DeVir-link'] = 'http://baldursgate.wikia.com/wiki/Viconia_DeVir';
	challengers['Harry Potter-link'] = 'http://harrypotter.wikia.com/wiki/Harry_Potter';
	challengers['Eragon-link'] = 'http://inheritance.wikia.com/wiki/Eragon';
	challengers['Kvothe-link'] = 'http://kingkiller.wikia.com/wiki/Kvothe';
	challengers['Gwyn, Lord of Cinder-link'] = 'http://darksouls.wikia.com/wiki/Gwyn,_Lord_of_Cinder';
	challengers['Veronica Santangelo-link'] = 'http://fallout.wikia.com/wiki/Veronica_Santangelo';
	challengers['Corvo Attano-link'] = 'http://dishonored.wikia.com/wiki/Corvo_Attano';
	challengers['Urdnot Wrex-link'] = 'http://masseffect.wikia.com/wiki/Urdnot_Wrex';
 
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