/*
---------------------
 Hero Skin Wardrobes
---------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- HeroSkins.css

---------
 AUTHORS 
---------
- E12Dragon: current and original version
*/
$(document).ready(function() {
	var location = 'https://static.wikia.nocookie.net/clashofclans/images/';

	//Define an undefined active model div and mode 
	$('.HeroSkinMenu:not([data-mode])').each(function () {
		$(this).attr('data-mode', 'Preview');
		$(this).find('.Models > div:first-child').addClass('active');
	});
	//Set GWM for GW wardrobe
	$('.HeroSkinMenu[data-hero="GW"]').attr('data-gwm', 'Ground');
	
	$('.HeroSkinMenu .Toggle, .HeroSkinMenu .GWM').click(function () {
		var Wardrobe = $(this).parents('.HeroSkinMenu');
		var Hero = $(Wardrobe).attr('data-hero');
		var Skin = $(this).siblings('.Title').text();
		var Mode = $(Wardrobe).attr('data-mode');
		var GWM = $(Wardrobe).attr('data-gwm');
		
		//Toggle through the different models
		if ($(this).hasClass('Toggle')) {
			$(Wardrobe).find('.Models > div').removeClass('active');
			if (Mode == 'Preview') {
				Mode = 'Idle';
			}else if (Mode == 'Idle') {
				//Check if poses exist
				if ( $(Wardrobe).find('.Models .Poses').length ) {
					Mode = 'Pose';
				}else {
					Mode = 'KO';
				}
			}else if (Mode == 'Pose') {
				Mode = 'KO';
			}else if (Mode == 'KO') {
				Mode = 'Downed';
			}else {
				Mode = 'Preview';
			}
			//When clicking the Mode toggle, we want to only add active to a single model mode. 
			if (Mode == 'Preview') {
				//First, if we are on preview, there is only one
				$(Wardrobe).find('.Models .' + Mode + 's').addClass('active');
			}else if (GWM == 'Air') {
				//If in GW wardrobe and set to air, we need to activate only the air ones. Does not apply to preview
				$(Wardrobe).find('.Models .' + Mode + 's.Air').addClass('active');
			}else {
				//If we are on ground or in another wardrobe
				$(Wardrobe).find('.Models .' + Mode + 's:not(.Air)').addClass('active');
			}
			$(Wardrobe).attr('data-mode', Mode);
		}else { //Then GWM button must have be clicked instead
		
			//Switch GWM
			if (GWM == 'Ground') {
				GWM = 'Air';
				//If Mode is Preview we don't want to remove active as Preview is unique
				$(Wardrobe).find('.Models .' + Mode + 's:not(.Air):not(.Previews)').removeClass('active'); 
				$(Wardrobe).find('.Models .' + Mode + 's.Air').addClass('active');
			}else {
				GWM = 'Ground';
				$(Wardrobe).find('.Models .' + Mode + 's.Air').removeClass('active');
				$(Wardrobe).find('.Models .' + Mode + 's:not(.Air)').addClass('active');
			}
			//Replace wardrobe value with new value
			$(Wardrobe).attr('data-gwm', GWM);
		}
	});
	
	$(".SkinIcon").click(function () {
		if (!$(this).hasClass('active')) {
			//Get Skin
			var Skin = $(this).attr("data-name");
			// Get Wardrobe
			var Wardrobe = $(this).parents('.HeroSkinMenu');
			//Get Hero
			var Hero = Wardrobe.attr('data-hero');
			//Get Tier (e.g. Gold, Legendary)
			var Tier = $(this).attr("data-type");
			//Get Mode
			var Mode = $(Wardrobe).attr('data-mode');
			//Get theme (icon)
			var Theme;
			if ( $(Wardrobe).find('.Theme[data-name="' + Skin + '"]').length ) {
				Theme = $(Wardrobe).find('.Theme[data-name="' + Skin + '"]').attr("data-theme");
			}else {
				Theme = '';
			}
			
			//Add transition class when changing skins
			if (!$(Wardrobe).hasClass('transition')) {
				$(this).closest(Wardrobe).addClass("transition");
				end = setTimeout(function () {
					$(Wardrobe).removeClass("transition");
				}, 300);
			}
			
			//Hide the last active skin for the hero
			$(Wardrobe).find('.SkinIcon, .Load, .Theme, .Preview, .Idle, .Pose, .KO, .Downed').removeClass("active");
			$(Wardrobe).find('.SkinIcon').removeClass('played');
	
			//Make all things associated with the skin active (so they are visible)
			$(Wardrobe).find('.Preview[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Idle[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Pose[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.KO[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Downed[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Theme[data-name="' + Skin + '"]').addClass("active");
			$(this).addClass("active");
			
			//Add Tier to preview
			if ($(this).attr('data-type')) {
				$(Wardrobe).find('.SkinPreview').attr('data-type', Tier);
				$(Wardrobe).find('.Subtitle').text(Tier);
			}else {
				$(Wardrobe).find('.SkinPreview').removeAttr('data-type');
				$(Wardrobe).find('.Subtitle').text('');
			}
			
			//Add theme to preview
			if (Theme !== '') {
				$(Wardrobe).find('.SkinPreview').attr('data-theme', Theme);
			}else {
				$(Wardrobe).find('.SkinPreview').removeAttr('data-theme');
			}
			
			//Change Skin Title
			$(Wardrobe).find('.Title').text(Skin);
		}
	});
	
	$('.HeroSkinMenu .SkinIcon, .HeroSkinMenu .Toggle, .HeroSkinMenu .GWM').click(function () {
		var Wardrobe = $(this).parents('.HeroSkinMenu');
		var Hero = $(Wardrobe).attr('data-hero');
		var Skin = $(Wardrobe).find('.Title').text();
		var Mode = $(Wardrobe).attr('data-mode');
		
		//Lazyloading loading icon
		if ($(Wardrobe).find('.Models > div.active > div.active img').hasClass('lazyload') ) {
				$(Wardrobe).find('.Load').addClass('active');
				var interval = setInterval(function () {
					if ( $(Wardrobe).find('.Models > div.active > div.active img').hasClass('lazyloaded') ) {
						clearInterval(interval);
						$(Wardrobe).find('.Load').removeClass('active');
					}
			}, 10 );
		}
			
		//Audio below
		var sfx;
		var randomnumber = Math.floor(Math.random() * (2) + 1);
		
		/* 
		sfx played is defined using the data-sfx attribute.
		If there is no unique sfx, then play default audio
		If a skin has more than one audio for an animation,
		then an exception needs to be outlined here. 
		*/
		
		//Play the "click" sound
		new Audio(location + 'e/e6/Button_Click.ogg').play();
				
		if (Mode !== 'Downed') {
			if ($(Wardrobe).find('.Models > div.active > div.active').attr('data-sfx')) {
				sfx = new Audio(location + $(Wardrobe).find('.Models > div.active > div.active').attr('data-sfx'));
			}else if (Hero == 'BK') {
				if (Mode == 'KO') {
					sfx = new Audio(location + 'b/b0/Barbarian_King_Death.ogg');
				}else if (Mode == 'Idle') {
					sfx = new Audio(location + 'f/fd/Barbarian_King_Deploy.ogg');
				}else if (randomnumber == 1) {
					sfx = new Audio(location + '7/72/Barbarian_King_Pose.ogg');
				}else {
					sfx = new Audio(location + 'f/fd/Barbarian_King_Deploy.ogg');
				}
			}else if (Hero == 'AQ') {
				if (Mode == 'Idle') {
					sfx = new Audio(location + '1/11/Archer_Queen_Deploy.ogg'); 
				}else if (Mode == 'KO') {
						sfx = new Audio(location + '0/09/Archer_Queen_Death.ogg'); 
				}else if (randomnumber == 1) {
					sfx = new Audio(location + '5/54/Archer_Queen_Pose.ogg');
				}else {
					sfx = new Audio(location + '1/11/Archer_Queen_Deploy.ogg');
				}
			}else if (Hero == 'GW') {
				if (Mode == 'KO') {
					if (Skin == 'Party Warden') {
						randomnumber = Math.floor(Math.random() * (3) + 1);
						if (randomnumber == 1) {
							sfx = new Audio(location + '9/9c/Party_Warden_Death_1.ogg');
						}else if (randomnumber == 2) {
							sfx = new Audio(location + 'e/e8/Party_Warden_Death_2.ogg');
						}else {
							sfx = new Audio(location + '7/7b/Party_Warden_Death_3.ogg');
						}
					}else {
						sfx = new Audio(location + '9/99/Grand_Warden_Death.ogg');
					}
				}else if (Mode == 'Idle') {
					if (Skin == 'Champion Warden') {
						randomnumber = Math.floor(Math.random() * (2) + 1);
						if (randomnumber == 1) {
							sfx = new Audio(location + 'a/a4/Champion_Warden_Deploy_1.ogg');
						}else {
							sfx = new Audio(location + '1/14/Champion_Warden_Deploy_2.ogg');
						}
					}else {
						sfx = new Audio(location + '2/2b/Grand_Warden_Deploy.ogg');
					}
				}else {
					sfx = new Audio(location + 'a/a1/Grand_Warden_Pose.ogg');
				}
			}else if (Hero == 'RC') {
				if (Mode == 'Idle') {
					sfx = new Audio(location + 'e/e9/Royal_Champion_Deploy.ogg');
				}else if (Mode == 'KO') {
					sfx = new Audio(location + '8/85/Royal_Champion_Death.ogg');
				}else {
					sfx = new Audio(location + 'e/e1/Royal_Champion_Pose.ogg');
				}
			}else if (Hero == 'BM') {
				if (Mode == 'KO') {
					sfx = new Audio(location + 'b/ba/Battle_Machine_Death.ogg');
				}else {
					sfx = new Audio(location + '0/04/Battle_Machine_Deploy.ogg');
				}
			}
			
			//Play the sfx on click
			if (!$(this).hasClass('played')) {
				sfx.play();
			}
		}
		//Stop any existing skin sfx when another one is played
		if (Mode !== 'Downed') {
			$('.HeroSkinMenu .SkinIcon, .HeroSkinMenu .Toggle, .HeroSkinMenu .GWM').click(function () {
					if (Skin !== $(this).attr('data-name')) {
						sfx.pause();
						sfx.currentTime = 0;
					}
			});
		}
		
		//Prevent spamming the same sound with SkinIcons
		if ( $(this).hasClass('SkinIcon') ) {
			$(this).addClass('played');
		}
	});
});