$(document).ready(function() {
	var location = 'https://static.wikia.nocookie.net/clashofclans/images/';
	var Theme;
	
	$('.HeroSkinMenu').each(function () {
		$(this).find('.HeroSkinSelectCol > div:first-child').addClass('active');
		$(this).find('.Model:first-child').addClass('active');
	});
	
	$(".SkinIcon").click(function () {
		//Play the "click" sound
		new Audio('https://static.wikia.nocookie.net/e12dragon_testing/images/0/06/Button_click.ogg').play();
		
		//When icon is clicked, find the name of the skin, theme and the hero
		var Skin = $(this).attr("data-name");
		if ($(this).attr("data-name")) {
			Theme = $(this).attr("data-theme");
		}else {
			Theme = "Default";	
		}
		var Hero = $(this).parents('.HeroSkinMenu').attr('data-hero');
		if ($(this).attr("data-type")) {
			Type = $(this).attr("data-type");
		}else {
			Type = "Default";	
		}
		
		//Hide the last active skin for the hero
		$('.HeroSkinMenu[data-hero="' + Hero + '"] .SkinIcon, .HeroSkinMenu[data-hero="' + Hero + '"] .Model, .HeroSkinMenu[data-hero="' + Hero + '"] .Theme').removeClass("active");
		
		//Make all things associated with the skin active (not hidden)
		$('.Model[data-name="' + Skin + '"]').addClass("active");
		$('.Theme[data-name="' + Skin + '"]').addClass("active");
		$(this).addClass("active");
		
		//Add tier to preview
		if ($(this).attr('data-type')) {
			var tier = $(this).attr('data-type');
			$('.HeroSkinMenu[data-hero="' + Hero + '"] .SkinPreview').attr('data-type', tier);
			$('.HeroSkinMenu[data-hero="' + Hero + '"] .Subtitle').text(Type);
		}else {
			$('.HeroSkinMenu[data-hero="' + Hero + '"] .SkinPreview').removeAttr('data-type');
			$('.HeroSkinMenu[data-hero="' + Hero + '"] .Subtitle').text('');
		}
		
		//Change title and subtitle
		$('.HeroSkinMenu[data-hero="' + Hero + '"] .Title').text(Skin);
		
		//Check if there needs to be a theme icon
		if ($('.HeroSkinMenu[data-hero="' + Hero + '"] .Theme[data-theme="' + Theme + '"]') ) {
			$('.HeroSkinMenu[data-hero="' + Hero + '"] .SkinPreview').attr('data-theme', Theme);
		}
		
		//Sound for skins
		var sfx;
		var randomnumber = Math.floor(Math.random() * (2) + 1);
		//If skin has specific sfx, play it, else play default audio
		if ($(this).attr('data-sfx')) {
			sfx = new Audio(location + $(this).attr('data-sfx'));
		}else if (Hero == 'BK') {
				if (randomnumber == 1) {
					sfx = new Audio(location + '7/72/Barbarian_King_Pose.ogg');
				}else {
					sfx = new Audio(location + 'f/fd/Barbarian_King_Deploy.ogg');
				}
		}else if (Hero == 'AQ') {
				if (randomnumber == 1) {
					sfx = new Audio(location + '5/54/Archer_Queen_Pose.ogg');
				}else {
					sfx = new Audio(location + '1/11/Archer_Queen_Deploy.ogg');
				}
		}else if (Hero == 'GW') {
					sfx = new Audio(location + 'a/a1/Grand_Warden_Pose.ogg');
		}else {
					sfx = new Audio(location + 'e/e1/Royal_Champion_Pose.ogg');
		}
		//Play the sfx on click
		sfx.play();
		//Stop any existing skin sfx when another one is played
		$(".SkinIcon").click(function () {
			sfx.pause();
			sfx.currentTime = 0;
		});
	});
});