$(function() {
	$(".Wardrobe-BK .SkinIcon").click(function () {
		$('.Wardrobe-BK .SkinIcon, .Wardrobe-BK .SkinPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
});

$(function() {
	$(".Wardrobe-AQ .SkinIcon").click(function () {
		$('.Wardrobe-AQ .SkinIcon, .Wardrobe-AQ .SkinPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
});

$(function() {
	$(".Wardrobe-GW .SkinIcon").click(function () {
		$('.Wardrobe-GW .SkinIcon, .Wardrobe-GW .SkinPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
});

$(function() {
	$(".Wardrobe-RC .SkinIcon").click(function () {
		$('.Wardrobe-RC .SkinIcon, .Wardrobe-RC .SkinPreview').removeClass("active");
		  $(this).addClass("active").click; {
			 var Class = $(this).attr("class").replace(" active", "").replace("SkinIcon ", "");
			 $("." + Class).addClass("active");
		}
	});
});

$(function() {
	var interval = setInterval(function () {
    var minNumber = 1; 
    var maxNumber = 1;
    var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
    $(".SwitchSound").attr("id", randomnumber);
	}, 1000);
});