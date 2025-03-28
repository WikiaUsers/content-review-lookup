/*
---------------------
 Hero Skin Wardrobes
---------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- HeroSkins.css

-----------------------
 AUTHORS & MAINTAINERS
-----------------------
- E12Dragon: current and original version

--------------
 INFORMATION
--------------
- Used for the Skin Menus (Template:Wardrobe-BK etc)
- Post June 2023 Hero Skin Wardrobes

*/
$(document).ready(function() {
	if ( !$( '.HSM-Container').length ) return;
	
	var location = 'https://static.wikia.nocookie.net/clashofclans/images/';
	
	//Global Wardrobe Sound on/off
	$('.HSM-Container .HSM-Sound').click(function () {
		$('.HSM-Container').toggleClass('muted');
		if (!$(this).parents('.HSM-Container').hasClass('muted')) {
			new Audio(location + 'e/e6/Button_Click.ogg').play();
		}
	});
	
	//Function for scrolling buttons
	$('.HSM-Scroll-Right').click(function() {
		var element = $(this).parents('.HSM-Container').find('.HSM-Icons');
		var width = Math.floor( element.width() - 30); //Less than full width helps user recognise how far it scrolled
		event.preventDefault();
		$(element).animate({
			scrollLeft: "+=" + width + "px"
		}, "slow");
	});
	$('.HSM-Scroll-Left').click(function() {
		var element = $(this).parents('.HSM-Container').find('.HSM-Icons');
		var width = Math.floor( element.width() - 30);
		event.preventDefault();
		$(element).animate({
			scrollLeft: "-=" + width + "px"
		}, "slow");
	});
	
	//Function to show all skins
	$('.HSM-Container .HSM-Author').click(function () {
		$(this).parents('.HSM-Container').addClass('all-skins');
	});
	
	//Define an undefined active model div and mode 
	$('.HSM-Container:not([data-mode])').each(function () {
		$(this).attr('data-mode', 'Preview');
		$(this).find('.HSM-Models > div:first-child').addClass('active');
	});
	
	//Set GWM for GW wardrobe
	$('.HSM-Container[data-hero="GW"]').attr('data-gwm', 'Ground');
	
	//If finished loading JS
	$('.HSM-Container').addClass('loaded');
	
	//Clicking toggle or GWM
	$('.HSM-Container .HSM-Toggle, .HSM-Container .HSM-GWM').click(function () {
		var Wardrobe = $(this).parents('.HSM-Container');
		var Hero = $(Wardrobe).attr('data-hero');
		var Skin = $(this).siblings('.HSM-Title').text();
		var Mode = $(Wardrobe).attr('data-mode');
		var GWM = $(Wardrobe).attr('data-gwm');
		
		//Toggle through the different models
		if ($(this).hasClass('HSM-Toggle')) {
			$(Wardrobe).find('.HSM-Models > div').removeClass('active');
			if (Mode == 'Preview') {
				Mode = 'Idle';
			}else if (Mode == 'Idle') {
				//Only set mode to poses if it exists
				if ( $(Wardrobe).find('.HSM-Models-Pose').length ) {
					Mode = 'Pose';
				}else {
					Mode = 'KO';
				}
			}else if (Mode == 'Pose') {
				Mode = 'KO';
			}else if (Mode == 'KO') {
				Mode = 'Downed';
			}else if (Mode == 'Downed') {
				if ( $(Wardrobe).find('.HSM-Models-Ability').length ) {
					//Only set mode to ability if it exists
					Mode = 'Ability';
				}else {
					Mode = 'Preview';
				}
			}else if (Mode == 'Ability') {
				Mode = 'Preview';
			}
			
			//When clicking the Mode toggle, we want to only add active to a single model mode. 
			if (Mode == 'Preview') {
				//First, if we are on preview, there is only one
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode).addClass('active');
			}else if (GWM == 'Air') {
				//If in GW wardrobe and set to air, we need to activate only the air ones. Does not apply to preview
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + '.Air').addClass('active');
			}else {
				//If we are on ground or in another wardrobe
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + ':not(.Air)').addClass('active');
			}
			$(Wardrobe).attr('data-mode', Mode);
		}else { //Then GWM button must have be clicked instead
		
			//Switch GWM
			if (GWM == 'Ground') {
				GWM = 'Air';
				//If Mode is Preview we don't want to remove active as Preview is unique
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + ':not(.Air):not(.Previews)').removeClass('active'); 
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + '.Air').addClass('active');
			}else {
				GWM = 'Ground';
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + '.Air').removeClass('active');
				$(Wardrobe).find('.HSM-Models .HSM-Models-' + Mode + ':not(.Air)').addClass('active');
			}
			//Replace wardrobe value with new value
			$(Wardrobe).attr('data-gwm', GWM);
		}
	});
	
	$(".HSM-Container .SkinIcon").click(function () {
		if (!$(this).hasClass('active')) {
			//Get Skin
			var Skin = $(this).attr("data-name");
			// Get Wardrobe
			var Wardrobe = $(this).parents('.HSM-Container');
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
			$(Wardrobe).find('.SkinIcon, .HSM-Load, .HSM-Ability-Text, .Theme, .Preview, .Idle, .Pose, .KO, .Downed, .Ability').removeClass("active");
			$(Wardrobe).find('.SkinIcon').removeClass('played');
	
			//Make all things associated with the skin active (so they are visible)
			$(Wardrobe).find('.Preview[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Idle[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Pose[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.KO[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Downed[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Ability[data-name="' + Skin + '"]').addClass("active");
			$(Wardrobe).find('.Theme[data-name="' + Skin + '"]').addClass("active");
			$(this).addClass("active");
			
			//Add Tier to preview
			if ($(this).attr('data-type')) {
				$(Wardrobe).attr('data-type', Tier);
				$(Wardrobe).find('.HSM-Subtitle').text(Tier);
			}else {
				$(Wardrobe).removeAttr('data-type');
				$(Wardrobe).find('.HSM-Subtitle').text('');
			}
			
			//Add theme to preview
			if (Theme !== '') {
				$(Wardrobe).attr('data-theme', Theme);
			}else {
				$(Wardrobe).removeAttr('data-theme');
			}
			
			//Check for custom spawns
			if ( $(Wardrobe).find('.Ability[data-name="' + Skin + '"]').hasClass('custom-troop') ) {
				$('.HSM-Ability-Text').addClass('active');
			}
			
			//Change Skin Title
			$(Wardrobe).find('.HSM-Title').text(Skin);
		}
	});
	
	$('.HSM-Container .SkinIcon, .HSM-Container .HSM-Toggle, .HSM-Container .HSM-GWM, .HSM-Container .HSM-Sound').click(function () {
		var Wardrobe = $(this).parents('.HSM-Container');
		var Hero = $(Wardrobe).attr('data-hero');
		var Skin = $(Wardrobe).find('.HSM-Title').text();
		var Mode = $(Wardrobe).attr('data-mode');
		
		//Lazyloading loading icon
		//If an image is in the process of loading, the loading icon shows up
		if ($(Wardrobe).find('.HSM-Models > div.active > div.active img').hasClass('lazyload') ) {
				$(Wardrobe).find('.HSM-Load').addClass('active');
				var interval = setInterval(function () {
					if ( $(Wardrobe).find('.HSM-Models > div.active > div.active img').hasClass('lazyloaded') ) {
						clearInterval(interval);
						$(Wardrobe).find('.HSM-Load').removeClass('active');
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
		
		//Play the "click" sfx
		if (!$(this).hasClass('played') && !$(this).hasClass('HSM-Sound') && !$(Wardrobe).hasClass('muted')) {
			new Audio(location + 'e/e6/Button_Click.ogg').play();
		}
				
		if (Mode !== 'Downed') {
			if ($(Wardrobe).find('.HSM-Models > div.active > div.active').attr('data-sfx')) {
				sfx = new Audio(location + $(Wardrobe).find('.HSM-Models > div.active > div.active').attr('data-sfx'));
			}else if (Hero == 'BK') {
				if (Mode == 'KO') {
					sfx = new Audio(location + 'b/b0/Barbarian_King_Death.ogg');
				}else if (Mode == 'Idle') {
					sfx = new Audio(location + 'f/fd/Barbarian_King_Deploy.ogg');
				}else if (Mode == 'Ability') {
					sfx = new Audio(location + '3/3e/Barbarian_King_Ability.ogg');
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
				}else if (Mode == 'Ability') {
					sfx = new Audio(location + 'b/bc/Archer_Queen_Ability.ogg'); 
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
				}else if (Mode == 'Preview'){
					sfx = new Audio(location + 'c/c3/Battle_Machine_Preview.ogg');
				}else {
					sfx = new Audio(location + '0/04/Battle_Machine_Deploy.ogg');
				}
			}else if (Hero == 'BC') {
				if (Mode == 'KO') {
					sfx = new Audio(location + 'f/f9/Battle_Copter_Death.ogg');
				}else if (Mode == 'Preview'){
					sfx = new Audio(location + 'd/d0/Battle_Copter_Preview.ogg');
				}else {
					sfx = new Audio(location + '0/04/Battle_Machine_Deploy.ogg');
				}
			}else if (Hero == 'MP') {
				if (Mode == 'KO') {
					sfx = new Audio(location + '3/3c/Minion_Prince_Death.ogg');
				}else if (Mode == 'Preview'){
					sfx = new Audio(location + '2/2f/Minion_Prince_Preview.ogg');
				}else if (Mode == 'Pose'){
					sfx = new Audio(location + 'd/df/Minion_Prince_Pose.ogg');
				}else {
					sfx = new Audio(location + 'd/dc/Minion_Prince_Deploy.ogg');
				}
			}
			
			//Play the sfx on click unless it has already been played or the wardrobe is muted or we are clicking the sound button
			if (!$(this).hasClass('played') && !$(this).hasClass('HSM-Sound') && !$(Wardrobe).hasClass('muted')) {
				sfx.play();
			}
			
			//Muting part way through playing sound
			$('.HSM-Container .HSM-Sound').click(function () {
				if ( $(Wardrobe).hasClass('muted')) {
					sfx.volume = 0;
				}else {
					sfx.volume = 1;
				}
			});
		}
		
		//Stop any existing skin sfx when another one is played
		if (Mode !== 'Downed') {
			$('.HSM-Container .SkinIcon, .HSM-Container .HSM-Toggle, .HSM-Container .HSM-GWM').click(function () {
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