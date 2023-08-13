$(function() {
	var imageUrl = "https://vignette.wikia.nocookie.net/civilization/images/";
    var wrapWidth = $("#ssv_wrapper").width(),
        wrapHeight = Math.round(wrapWidth * 0.75),
        ship = $("#ssv_ship"),
        api_type = mw.config.get('wgPageName').replace('_(Starships)', ''),
        api_source = {
            Supremacy: [
                imageUrl + "c/c7/Viewer_supremacy00_%28starships%29.jpg",
                imageUrl + "2/29/Viewer_supremacy01_%28starships%29.jpg",
                imageUrl + "4/46/Viewer_supremacy02_%28starships%29.jpg",
                imageUrl + "f/f7/Viewer_supremacy03_%28starships%29.jpg",
                imageUrl + "6/63/Viewer_supremacy04_%28starships%29.jpg",
                imageUrl + "4/44/Viewer_supremacy05_%28starships%29.jpg",
                imageUrl + "1/17/Viewer_supremacy06_%28starships%29.jpg",
                imageUrl + "6/61/Viewer_supremacy07_%28starships%29.jpg",
                imageUrl + "1/15/Viewer_supremacy08_%28starships%29.jpg",
                imageUrl + "f/fc/Viewer_supremacy09_%28starships%29.jpg",
                imageUrl + "8/86/Viewer_supremacy10_%28starships%29.jpg",
                imageUrl + "a/ac/Viewer_supremacy11_%28starships%29.jpg",
                imageUrl + "b/b5/Viewer_supremacy12_%28starships%29.jpg",
                imageUrl + "d/d6/Viewer_supremacy13_%28starships%29.jpg",
                imageUrl + "4/48/Viewer_supremacy14_%28starships%29.jpg",
                imageUrl + "8/8b/Viewer_supremacy15_%28starships%29.jpg",
                imageUrl + "5/57/Viewer_supremacy16_%28starships%29.jpg",
                imageUrl + "a/a8/Viewer_supremacy17_%28starships%29.jpg",
                imageUrl + "0/0d/Viewer_supremacy18_%28starships%29.jpg",
                imageUrl + "7/7e/Viewer_supremacy19_%28starships%29.jpg",
                imageUrl + "a/ac/Viewer_supremacy20_%28starships%29.jpg",
                imageUrl + "6/6f/Viewer_supremacy21_%28starships%29.jpg",
                imageUrl + "5/5f/Viewer_supremacy22_%28starships%29.jpg",
                imageUrl + "9/90/Viewer_supremacy23_%28starships%29.jpg",
                imageUrl + "a/a1/Viewer_supremacy24_%28starships%29.jpg",
                imageUrl + "6/61/Viewer_supremacy25_%28starships%29.jpg",
                imageUrl + "0/0f/Viewer_supremacy26_%28starships%29.jpg",
                imageUrl + "d/d6/Viewer_supremacy27_%28starships%29.jpg",
                imageUrl + "4/43/Viewer_supremacy28_%28starships%29.jpg",
                imageUrl + "9/93/Viewer_supremacy29_%28starships%29.jpg",
                imageUrl + "8/8b/Viewer_supremacy30_%28starships%29.jpg",
                imageUrl + "1/10/Viewer_supremacy31_%28starships%29.jpg",
                imageUrl + "6/6b/Viewer_supremacy32_%28starships%29.jpg",
                imageUrl + "3/37/Viewer_supremacy33_%28starships%29.jpg",
                imageUrl + "0/09/Viewer_supremacy34_%28starships%29.jpg",
                imageUrl + "8/8f/Viewer_supremacy35_%28starships%29.jpg"
            ],

            Purity: [
                imageUrl + "1/12/Viewer_purity00_%28starships%29.jpg",
                imageUrl + "f/f8/Viewer_purity01_%28starships%29.jpg",
                imageUrl + "1/18/Viewer_purity02_%28starships%29.jpg",
                imageUrl + "d/d4/Viewer_purity03_%28starships%29.jpg",
                imageUrl + "8/8f/Viewer_purity04_%28starships%29.jpg",
                imageUrl + "2/28/Viewer_purity05_%28starships%29.jpg",
                imageUrl + "c/c9/Viewer_purity06_%28starships%29.jpg",
                imageUrl + "6/67/Viewer_purity07_%28starships%29.jpg",
                imageUrl + "3/33/Viewer_purity08_%28starships%29.jpg",
                imageUrl + "b/be/Viewer_purity09_%28starships%29.jpg",
                imageUrl + "7/70/Viewer_purity10_%28starships%29.jpg",
                imageUrl + "8/8d/Viewer_purity11_%28starships%29.jpg",
                imageUrl + "0/0d/Viewer_purity12_%28starships%29.jpg",
                imageUrl + "0/0a/Viewer_purity13_%28starships%29.jpg",
                imageUrl + "2/2f/Viewer_purity14_%28starships%29.jpg",
                imageUrl + "6/60/Viewer_purity15_%28starships%29.jpg",
                imageUrl + "f/f7/Viewer_purity16_%28starships%29.jpg",
                imageUrl + "1/1c/Viewer_purity17_%28starships%29.jpg",
                imageUrl + "3/34/Viewer_purity18_%28starships%29.jpg",
                imageUrl + "b/bc/Viewer_purity19_%28starships%29.jpg",
                imageUrl + "8/88/Viewer_purity20_%28starships%29.jpg",
                imageUrl + "9/9f/Viewer_purity21_%28starships%29.jpg",
                imageUrl + "e/e3/Viewer_purity22_%28starships%29.jpg",
                imageUrl + "6/62/Viewer_purity23_%28starships%29.jpg",
                imageUrl + "f/fe/Viewer_purity24_%28starships%29.jpg",
                imageUrl + "5/51/Viewer_purity25_%28starships%29.jpg",
                imageUrl + "f/f5/Viewer_purity26_%28starships%29.jpg",
                imageUrl + "b/ba/Viewer_purity27_%28starships%29.jpg",
                imageUrl + "2/2a/Viewer_purity28_%28starships%29.jpg",
                imageUrl + "0/08/Viewer_purity29_%28starships%29.jpg",
                imageUrl + "f/f9/Viewer_purity30_%28starships%29.jpg",
                imageUrl + "4/46/Viewer_purity31_%28starships%29.jpg",
                imageUrl + "d/d0/Viewer_purity32_%28starships%29.jpg",
                imageUrl + "b/b1/Viewer_purity33_%28starships%29.jpg",
                imageUrl + "5/53/Viewer_purity34_%28starships%29.jpg",
                imageUrl + "6/6d/Viewer_purity35_%28starships%29.jpg"
            ],

            Harmony: [
                imageUrl + "b/b7/Viewer_harmony00_%28starships%29.jpg",
                imageUrl + "b/b6/Viewer_harmony01_%28starships%29.jpg",
                imageUrl + "6/66/Viewer_harmony02_%28starships%29.jpg",
                imageUrl + "9/92/Viewer_harmony03_%28starships%29.jpg",
                imageUrl + "0/0f/Viewer_harmony04_%28starships%29.jpg",
                imageUrl + "e/e0/Viewer_harmony05_%28starships%29.jpg",
                imageUrl + "0/0b/Viewer_harmony06_%28starships%29.jpg",
                imageUrl + "5/58/Viewer_harmony07_%28starships%29.jpg",
                imageUrl + "9/99/Viewer_harmony08_%28starships%29.jpg",
                imageUrl + "8/8e/Viewer_harmony09_%28starships%29.jpg",
                imageUrl + "3/33/Viewer_harmony10_%28starships%29.jpg",
                imageUrl + "3/30/Viewer_harmony11_%28starships%29.jpg",
                imageUrl + "f/fc/Viewer_harmony12_%28starships%29.jpg",
                imageUrl + "f/f1/Viewer_harmony13_%28starships%29.jpg",
                imageUrl + "3/33/Viewer_harmony14_%28starships%29.jpg",
                imageUrl + "e/ee/Viewer_harmony15_%28starships%29.jpg",
                imageUrl + "5/5e/Viewer_harmony16_%28starships%29.jpg",
                imageUrl + "e/ed/Viewer_harmony17_%28starships%29.jpg",
                imageUrl + "b/bd/Viewer_harmony18_%28starships%29.jpg",
                imageUrl + "c/c2/Viewer_harmony19_%28starships%29.jpg",
                imageUrl + "3/35/Viewer_harmony20_%28starships%29.jpg",
                imageUrl + "f/ff/Viewer_harmony21_%28starships%29.jpg",
                imageUrl + "8/8e/Viewer_harmony22_%28starships%29.jpg",
                imageUrl + "b/bb/Viewer_harmony23_%28starships%29.jpg",
                imageUrl + "a/aa/Viewer_harmony24_%28starships%29.jpg",
                imageUrl + "5/52/Viewer_harmony25_%28starships%29.jpg",
                imageUrl + "0/05/Viewer_harmony26_%28starships%29.jpg",
                imageUrl + "3/31/Viewer_harmony27_%28starships%29.jpg",
                imageUrl + "3/3a/Viewer_harmony28_%28starships%29.jpg",
                imageUrl + "c/c2/Viewer_harmony29_%28starships%29.jpg",
                imageUrl + "2/2d/Viewer_harmony30_%28starships%29.jpg",
                imageUrl + "1/19/Viewer_harmony31_%28starships%29.jpg",
                imageUrl + "a/aa/Viewer_harmony32_%28starships%29.jpg",
                imageUrl + "0/0b/Viewer_harmony33_%28starships%29.jpg",
                imageUrl + "5/5c/Viewer_harmony34_%28starships%29.jpg",
                imageUrl + "a/ac/Viewer_harmony35_%28starships%29.jpg"
            ]
        },

        loadingFrameCount = 0,
        totalFrameCount = 35;
	console.log(api_type);
	resizeViewer(wrapWidth, wrapHeight);

	var api = ship.spritespin({
        source		: 	api_source[ api_type ],
		frameTime	: 	60,
		animate		:	false,
		onProgress	:	function() {
			loadingFrameCount += 1;
			percent = loadingFrameCount / totalFrameCount;
			percent  = (percent > 1) ? 1 : percent;
			width = Math.round($("#ssv_progressBar").width() * percent);
							
			$("#ssv_progress").css('width', width + "px");
			$("#ssv_progress").css('height', $("#ssv_progressBar").height);
		},
		onLoad		:	function() {
			$("#ssv_loading").delay( 300 ).fadeOut( 1200 );
		},
		width   	: 	wrapWidth,
		height  	: 	wrapHeight
	}).spritespin("api");					

	api.stopAnimation();
	
	$("#ssv_buttonEngine").click(function() {
		showInfoPanel("Engine");
	});
	$("#ssv_buttonShield").click(function() {
		showInfoPanel("Shield");
	});
	$("#ssv_buttonArmor").click(function() {
		showInfoPanel("Armor");
	});
	$("#ssv_buttonCannon").click(function() {
		showInfoPanel("Cannon");
	});
	$("#ssv_buttonLaser").click(function() {
		showInfoPanel("Laser");
	});
	$("#ssv_buttonTorpedo").click(function() {
		showInfoPanel("Torpedo");
	});
	$("#ssv_buttonSensor").click(function() {
		showInfoPanel("Sensor");
	});
	$("#ssv_buttonStealth").click(function() {
		showInfoPanel("Stealth");
	});
	$("#ssv_buttonHangar").click(function() {
		showInfoPanel("Hangar");
	});
					
	$("#ssv_buttonLeft").click(function() {
		api.data.reverse = false;
		$("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");
		api.startAnimation();
		$("#ssv_buttonRight").removeClass("ssv_highlight");
		$("#ssv_buttonLeft").addClass("ssv_highlight");
	});
	$("#ssv_buttonRight").click(function() {
		api.data.reverse = true;
		$("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");
		api.startAnimation();
		$("#ssv_buttonRight").addClass("ssv_highlight");
		$("#ssv_buttonLeft").removeClass("ssv_highlight");
	});
	$("#ssv_buttonPlay").click(function() {
		if(api.isPlaying()) {
			$("#ssv_buttonPlay").attr("src", imageUrl + "2/26/Viewer_play_%28starships%29.png");
			
			$("#ssv_buttonRight").removeClass("ssv_highlight");
			$("#ssv_buttonLeft").removeClass("ssv_highlight");
		}
		else {
			$("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");

			if(api.data.reverse) {
				$("#ssv_buttonRight").addClass("ssv_highlight");
			}
			else {
				$("#ssv_buttonLeft").addClass("ssv_highlight");
			}
		}
		api.toggleAnimation();
	});
	$("#ssv_buttonInfo").click(function() {
		if($("#ssv_submenu").is(":visible")) {
			showInfoPanel("hide");
		}
		$("#ssv_buttonInfo").toggleClass("ssv_highlight");
		$("#ssv_submenu").toggle();
	});

});

$( window ).resize(function() {

	var wrapWidth = $("#ssv_wrapper").width();
	var wrapHeight = Math.round(wrapWidth * 0.75);

	resizeViewer(wrapWidth, wrapHeight);
						
});

function resizeViewer(width, height) {

	$("#ssv_wrapper").height(height);
	$("#ssv_loading").height(height);
	
	var ratio = height / 768;
	
	var progressTop = Math.round(ratio * 500);
	var progressLeft = Math.round(ratio * 256);
	$("#ssv_progressBar").height(ratio * 32);
	$("#ssv_progressBar").width(ratio * 506);
	$("#ssv_progressBar").css({ top: progressTop });					
	$("#ssv_progressBar").css({ left: progressLeft });					
	$("#ssv_progress").css({ top: progressTop });					
	$("#ssv_progress").css({ left: progressLeft });					
	$("#ssv_progress").css({ width: $("#ssv_progressBar").width() });

	var buttonTop = ratio * 30;
	var buttonLeft = ratio * 435;
	$("#ssv_buttonBar").height(ratio * 51);
	$("#ssv_buttonBar").width(ratio * 153);
	$("#ssv_buttonBar").css({ top: buttonTop });
	$("#ssv_buttonBar").css({ left: buttonLeft });
	$(".ssv_button").height(ratio * 51);
	$(".ssv_button").width(ratio * 51);

	var submenuTop = Math.round(ratio * 60);
	
	$("#ssv_submenu").height(ratio * 349);
	$("#ssv_submenu").width(ratio * 235);
	$(".ssv_subButton").height(ratio * 61);
	$(".ssv_subButton").width(ratio * 107);
	$("#ssv_submenu").css({ top: submenuTop });					
	$(".ssv_clear").height(ratio * 15);
	$(".ssv_shipMenuTitle span").css({top: (ratio * 7)});
	$(".ssv_shipMenuTitle span").css({left: (ratio * 10)});
	$(".ssv_shipMenuTitle").height(ratio * 16);
	
	$(".ssv_infoPanel").height(ratio * 180);
	$(".ssv_infoPanel").width(ratio * 340);
	$(".ssv_infoPanel").css({ top: (ratio * 60)});					
	$(".ssv_infoPanel").css({ left: (ratio * 10)});					
	$(".ssv_infoPanel img").height(ratio * 128);
	$(".ssv_infoPanel img").width(ratio * 128);
	$(".ssv_infoPanel img").css({margin: (ratio * 8)});
	$(".ssv_shipPartInfo").css({"font-size": (ratio * 12) + "px" });
	$(".ssv_infoPanel").css({"line-height": (ratio * 22) + "px" });

	var badgeTextHeight = Math.round(ratio * 53);
	var shipBottom = Math.round(ratio * 57);
	var affinityBottom = Math.round(ratio * -6);

	$(".ssv_shipName").height(badgeTextHeight);
	$(".ssv_shipAffinity").height(badgeTextHeight);
	
	$(".ssv_shipName").css({ bottom: shipBottom + "px" });
	$(".ssv_shipAffinity").css({ bottom: affinityBottom + "px" });
	
	$(".ssv_shipName, .ssv_shipAffinity, .ssv_shipMenuTitle, .ssv_shipPartInfo").textfill({
			maxFontPixels: 50
	});
}

function showInfoPanel(name) {

	var show = true;

	if($("#ssv_info" + name).is(":visible")) {
		show = false;
	}
	
	if(name === "hide") {
		show = false;
	}
	
	$("[id^='ssv_info']:not(#ssv_infoArea)").hide();
	$("[id^='ssv_button']").removeClass("ssv_highlight");
	
	if(show) {
		$("#ssv_info" + name).show();
		$("#ssv_button" + name).addClass("ssv_highlight");
	}
}