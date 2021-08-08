$(function() {
	var location = 'https://static.wikia.nocookie.net/clashofclans/images/';
	var audio;
	$(".SkinIcon").click(function () {
		new Audio('https://static.wikia.nocookie.net/e12dragon_testing/images/0/06/Button_click.ogg').play();
	});
	
	$(".SkinIcon").click(function () {
		var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
		var Parent = $(this).parents('.HeroSkinMenu').attr('class').replace(" hidden", "").replace("HeroSkinMenu ", "").replace(" active", "").replace("active", "");
		$('.HeroSkinMenu').removeClass("active");
		if (Parent == 'Wardrobe-BK') {
			$('.Wardrobe-BK .SkinIcon, .Wardrobe-BK .Title, .Wardrobe-BK .Subtitle, .Wardrobe-BK .Model, .Wardrobe-BK .theme-icon').removeClass("active");
			$("." + Class).addClass("active");
			$(this).addClass("active");
			$('.Wardrobe-BK .SkinPreview .Subtitle').removeClass('active');
			if ($(this).attr('data-type') === 'Gold') {
				$('.Wardrobe-BK .SkinPreview .Subtitle[data-type="Gold"]').addClass('active');
			}else if ($(this).attr('data-type') === 'Legendary') {
				$('.Wardrobe-BK .SkinPreview .Subtitle[data-type="Legendary"]').addClass('active');
			}else if (Class !== 'BK-Original'){
				$('.Wardrobe-BK .SkinPreview .Subtitle[data-type="Standard"]').addClass('active');
			}
			if ($(this).attr('data-type')) {
			$('.Wardrobe-BK .SkinPreview .Background').attr('data-type', $(this).attr('data-type'));
			}else {
			$('.Wardrobe-BK .SkinPreview .Background').attr('data-type', "Standard");
			}
			if ( $(this).attr('data-sfx')) {
			  var audio = new Audio (location + $(this).attr('data-sfx'));
			}else {
			var randomnumber = Math.floor(Math.random() * (2) + 1);
				if (randomnumber == 1) {
					audio = new Audio(location + '7/72/Barbarian_King_Pose.ogg');
				}else {
					audio = new Audio(location + 'f/fd/Barbarian_King_Deploy.ogg');
				}
			}
			audio.play();
			$(".SkinIcon").click(function () {
				audio.pause();
				audio.currentTime = 0;
			});
		}else if (Parent == 'Wardrobe-AQ') {
			$('.Wardrobe-AQ .SkinIcon, .Wardrobe-AQ .Title, .Wardrobe-AQ .Subtitle, .Wardrobe-AQ .Model, .Wardrobe-AQ .theme-icon').removeClass("active");
			$("." + Class).addClass("active");
			$(this).addClass("active");
			$('.Wardrobe-AQ .SkinPreview .Subtitle').removeClass('active');
			if ($(this).attr('data-type') === 'Gold') {
				$('.Wardrobe-AQ .SkinPreview .Subtitle[data-type="Gold"]').addClass('active');
			}else if ($(this).attr('data-type') === 'Legendary') {
				$('.Wardrobe-AQ .SkinPreview .Subtitle[data-type="Legendary"]').addClass('active');
			}else if (Class !== 'AQ-Original'){
				$('.Wardrobe-AQ .SkinPreview .Subtitle[data-type="Standard"]').addClass('active');
			}
			if ($(this).attr('data-type')) {
			$('.Wardrobe-AQ .SkinPreview .Background').attr('data-type', $(this).attr('data-type'));
			}else {
			$('.Wardrobe-AQ .SkinPreview .Background').attr('data-type', "Standard");
			}
			if ( $(this).attr('data-sfx')) {
			  var audio = new Audio(location + $(this).attr('data-sfx'));
			}else {
			   var randomnumber = Math.floor(Math.random() * (2) + 1);
				if (randomnumber == 1) {
					audio = new Audio(location + '5/54/Archer_Queen_Pose.ogg');
				}else {
					audio = new Audio(location + '1/11/Archer_Queen_Deploy.ogg');
				}	
			}
			audio.play();
			
			$(".SkinIcon").click(function () {
				audio.pause();
				audio.currentTime = 0;
			});
		}else if (Parent == 'Wardrobe-GW') {
			$("." + Class).addClass("active");
			$('.Wardrobe-GW .SkinPreview .Subtitle').removeClass('active');
			$("." + Class).addClass("active");
			$(this).addClass("active");
			if ($(this).attr('data-type') === 'Gold') {
				$('.Wardrobe-GW .SkinPreview .Subtitle[data-type="Gold"]').addClass('active');
			}else if ($(this).attr('data-type') === 'Legendary') {
				$('.Wardrobe-GW .SkinPreview .Subtitle[data-type="Legendary"]').addClass('active');
			}else if (Class !== 'GW-Original'){
				$('.Wardrobe-GW .SkinPreview .Subtitle[data-type="Standard"]').addClass('active');
			}
			if ($(this).attr('data-type')) {
			$('.Wardrobe-GW .SkinPreview .Background').attr('data-type', $(this).attr('data-type'));
			}else {
			$('.Wardrobe-GW .SkinPreview .Background').attr('data-type', "Standard");
			}
			if ( $(this).attr('data-sfx')) {
			  var audio = new Audio(location + $(this).attr('data-sfx'));
			}else {
					audio = new Audio(location + 'a/a1/Grand_Warden_Pose.ogg');
			}
			audio.play();
			
			$(".SkinIcon").click(function () {
				audio.pause();
				audio.currentTime = 0;
			});
			
		}else {
			$("." + Class).addClass("active");
			$('.Wardrobe-RC .SkinPreview .Subtitle').removeClass('active');
			$("." + Class).addClass("active");
			$(this).addClass("active");
			if ($(this).attr('data-type') === 'Gold') {
				$('.Wardrobe-RC .SkinPreview .Subtitle[data-type="Gold"]').addClass('active');
			}else if ($(this).attr('data-type') === 'Legendary') {
				$('.Wardrobe-RC .SkinPreview .Subtitle[data-type="Legendary"]').addClass('active');
			}else if (Class !== 'RC-Original'){
				$('.Wardrobe-RC .SkinPreview .Subtitle[data-type="Standard"]').addClass('active');
			}
			if ($(this).attr('data-type')) {
			$('.Wardrobe-RC .SkinPreview .Background').attr('data-type', $(this).attr('data-type'));
			}else {
			$('.Wardrobe-RC .SkinPreview .Background').attr('data-type', "Standard");
			}
			if ( $(this).attr('data-sfx')) {
			  var audio = new Audio(location + $(this).attr('data-sfx'));
			}else {
				   audio = new Audio(location + 'e/e1/Royal_Champion_Pose.ogg');
			}
			audio.play();
			
			$(".SkinIcon").click(function () {
				audio.pause();
				audio.currentTime = 0;
			});
		}
	});
});