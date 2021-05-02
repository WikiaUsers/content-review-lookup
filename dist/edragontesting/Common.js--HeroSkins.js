$(function() {
	var location = 'https://static.wikia.nocookie.net/clashofclans/images/';
	$(".SkinIcon").click(function () {
		new Audio('https://static.wikia.nocookie.net/e12dragon_testing/images/0/06/Button_click.ogg').play();
	});
	
	$(".Wardrobe-BK .SkinIcon").click(function () {
		$('.Wardrobe-BK .SkinIcon, .Wardrobe-BK .SkinPreview').removeClass("active");
		$(this).addClass("active");
		var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
		$("." + Class).addClass("active");
		
		if ( $(this).attr('data-sfx') == 'BK-Gladiator' ) {
			var audio = new Audio(location + '0/03/Gladiator_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Skeleton' ) {
			audio = new Audio(location + '7/72/Barbarian_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Jolly' ) {
			audio = new Audio(location + '9/9d/Jolly_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Clockwork' ) {
			audio = new Audio(location + '3/3b/Clockwork_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Party' ) {
			audio = new Audio(location + 'c/c8/Party_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Champion' ) {
			audio = new Audio(location + 'e/e2/Champion_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Pirate' ) {
			audio = new Audio(location + '4/4b/Pirate_King_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'BK-Warrior' ) {
			audio = new Audio(location + 'c/ce/Warrior_King_Pose.ogg');
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
	});

	$(".Wardrobe-AQ .SkinIcon").click(function () {
		$('.Wardrobe-AQ .SkinIcon, .Wardrobe-AQ .SkinPreview').removeClass("active");
		$(this).addClass("active");
		var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
		$("." + Class).addClass("active");
		
		if ( $(this).attr('data-sfx') == 'AQ-Warrior' ) {
			var audio = new Audio(location + '5/54/Archer_Queen_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'AQ-Clockwork' ) {
			audio = new Audio(location + 'f/f9/Clockwork_Queen_Pose.ogg');
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
	});

	$(".Wardrobe-GW .SkinIcon").click(function () {
		$('.Wardrobe-GW .SkinIcon, .Wardrobe-GW .SkinPreview').removeClass("active");
		$(this).addClass("active");
		var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
		$("." + Class).addClass("active");
		
		if ( $(this).attr('data-sfx') == 'GW-Party' ) {
			var audio = new Audio(location + 'f/f5/Party_Warden_Pose.ogg');
		}else if ( $(this).attr('data-sfx') == 'GW-Clockwork' ) {
			audio = new Audio(location + '2/21/Clockwork_Warden_Pose.ogg');
		}else {
				audio = new Audio(location + 'a/a1/Grand_Warden_Pose.ogg');
		}
		audio.play();
		
		$(".SkinIcon").click(function () {
			audio.pause();
			audio.currentTime = 0;
		});
	});

	$(".Wardrobe-RC .SkinIcon").click(function () {
		$('.Wardrobe-RC .SkinIcon, .Wardrobe-RC .SkinPreview').removeClass("active");
		$(this).addClass("active");
		var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
		$("." + Class).addClass("active");
		var audio = new Audio(location + 'e/e1/Royal_Champion_Pose.ogg');
		audio.play();
		
		$(".SkinIcon").click(function () {
			audio.pause();
			audio.currentTime = 0;
		});
	});
});