// Copied from PopCap's site.
// ++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTIONS
// ++++++++++++++++++++++++++++++++++++++++++++++++++
function firePea () {
	$('#site-map').append('<img src="/sites/all/themes/popcap_2012/img/footer/pea.png" class="pea_fire" />');
    $('.pea_fire').show().css({left:'50px'}).animate({left:'2000px'},1000);
}

// GAMES MENU
var menuOver;
var menuid;
function closeDropdown (menuid) {
    if (!menuOver) {
		var btn_color = '#FF5400';
		// can't be changed until background image is fixed to have 3rd green state
		//if (menuid == 21799) btn_color = '#279c00';
		$('#block-menu_block-1 ul.menu li.menu-mlid-'+menuid+' > ul.menu').stop(true, true).slideUp(150);
		$('#block-menu_block-1 ul.menu li.menu-mlid-'+menuid+' > a').stop().delay(150).css({color: btn_color, backgroundPosition: '0 0'});
    }
}

// Set platform cookie
if (!$.cookie('platform')) {

  var ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('android') >= 0) {
    platform = 'android';
  }
  else if (ua.indexOf('ipad') >= 0) {
    platform = 'ipad';
  }
  else if (ua.indexOf('iphone') >= 0) {
    platform = 'iphone';
  }
  else if (ua.indexOf('aspen') >= 0) {
    platform = 'iphone';
  }
  else if (ua.indexOf('ipod') >= 0) {
    platform = 'iphone';
  }
  else if (ua.indexOf('mac') >= 0) {
    platform = 'mac';
  }
  else {
    platform = false;
  }

  if (platform) {
    $.cookie('platform', platform, { expires: 360, path: '/', domain: '.popcap.com' });
  }

}


//++++++++++++++++++++++++++++++++++++++++++++++++++
// INIT
//++++++++++++++++++++++++++++++++++++++++++++++++++

$(document).ready(function(){

	var platform = 'pc';

	//use cookied values if available
	if ($.cookie("platform") != null) platform = $.cookie("platform");

	function platformFilter() {
		if (platform == 'mac') {
			//bej twist
			$('.menu-mlid-27057').hide();
			$('.menu-mlid-28999').hide();
			$('.menu-mlid-29000').hide();
			$('.menu-mlid-29001').hide();
			$('.menu-mlid-29002').hide();
			// bwa2
			$('.menu-mlid-27060').hide();
			// bwa
			$('.menu-mlid-27059').hide();
			// aa tomb
			$('.menu-mlid-27066').hide();
			// aa world
			$('.menu-mlid-27067').hide();
			// mpi ny
			$('.menu-mlid-27075').hide();
			// mpi vegas
			$('.menu-mlid-27076').hide();
			// mpi lottery
			$('.menu-mlid-27077').hide();
		}
	}

  	//++++++++++++++++++++++++++++++++++++++++++++++++++
	// GAMES DROPDOWN
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	$('#block-menu_block-1 ul.menu li.menu-mlid-12438 > a').bind('mouseenter', function(){
		$('#block-menu_block-1 ul.menu li.menu-mlid-12438 > ul.menu').stop(true, true).slideDown(150).animate({top:'73px'},150).animate({top:'77px'},150);
		$('#block-menu_block-1 ul.menu li.menu-mlid-12438 > a').stop().css({backgroundPosition: '0 -180px',color:'#fff',zIndex: '100000'});
		closeDropdown(21799);
		menuOver = true;
	}).bind('mouseleave', function (){
		menuOver = false;
		setTimeout(function(){
			closeDropdown(12438);
		}, 500);
	});

	$('#block-menu_block-1 ul.menu li.menu-mlid-12438 > ul.menu').hide();
	$('#block-menu_block-1 ul.menu li.menu-mlid-12438 > ul.menu').bind('mouseenter', function(){
		closeDropdown(21799);
		menuOver = true;
	}).bind('mouseleave', function(){
		menuOver = false;
		setTimeout(function(){
			closeDropdown(12438);
		}, 500);
	});

  	//++++++++++++++++++++++++++++++++++++++++++++++++++
	// ONLINE GAMES DROPDOWN
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	$('#block-menu_block-1 ul.menu li.menu-mlid-21799 > a').bind('mouseenter', function(){
		$('#block-menu_block-1 ul.menu li.menu-mlid-21799 > ul.menu').stop(true, true).slideDown(150).animate({top: '73px'},150).animate({top: '77px'},150);
		$('#block-menu_block-1 ul.menu li.menu-mlid-21799 > a').css({backgroundPosition: '0 -180px', color: '#fff', zIndex: '100000'});
		closeDropdown(12438);
		menuOver = true;
	}).bind('mouseleave', function (){
		menuOver = false;
		setTimeout(function(){
			closeDropdown(21799);
		}, 500);
	});

	$('#block-menu_block-1 ul.menu li.menu-mlid-21799 > ul.menu').hide();
	$('#block-menu_block-1 ul.menu li.menu-mlid-21799 > ul.menu').bind('mouseenter', function(){
		closeDropdown(12438);
		menuOver = true;
	}).bind('mouseleave', function(){
		menuOver = false;
		setTimeout(function(){
			closeDropdown(21799);
		}, 500);
	});

	//++++++++++++++++++++++++++++++++++++++++++++++++++
	// LANGUAGE SELECTORS
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	var langDropdownTimer;
	//$('#block-popcap_lang_switcher-0, #block-popcap_lang_switcher-1').hide();

	$('.lang_select').toggle(function(){
		$('#block-popcap_lang_switcher-0').slideDown(100);
		$('#block-popcap_lang_switcher-0').bind('mouseenter', function() {
			clearInterval(langDropdownTimer);
		}).bind('mouseleave', function() {
			langDropdownTimer = setTimeout(function () {
				$('.lang_select').trigger("click");
			}, 2000);
		});

	}, function(){
		$('#block-popcap_lang_switcher-0').unbind('mouseenter').unbind('mouseleave');
		$('#block-popcap_lang_switcher-0').slideUp(100);
	});

	$('#lang_switch').toggle(function(){
		$('#block-popcap_lang_switcher-1').slideDown(100);
		$('#block-popcap_lang_switcher-1').bind('mouseenter', function() {
			clearInterval(langDropdownTimer);
		}).bind('mouseleave', function() {
			langDropdownTimer = setTimeout(function () {
				$('#lang_switch').trigger("click");
			}, 2000);
		});
	}, function(){
		$('#block-popcap_lang_switcher-1').unbind('mouseenter').unbind('mouseleave');
		$('#block-popcap_lang_switcher-1').slideUp(100);
	});



	//++++++++++++++++++++++++++++++++++++++++++++++++++
	// FRANCHISE BUTTONS
	//++++++++++++++++++++++++++++++++++++++++++++++++++
	var franchiseLogoSpeed = 60;

	/////////// BEJEWELED /////////
	$('#franchise_bj').bind('mouseenter', function() {
		var logoW = 148;
		$('#bj_bg').stop(true,true).fadeIn();
		$('#bj_gem_orange').stop().show().animate({top:'0px',left:'90px'},100);
		$('#bj_gem_red').stop().show().animate({top:'0px',left:'12px'},150);
		$('#bj_gem_green').stop().show().animate({top:'95px',left:'15px'},200);
	}).bind('mouseleave', function() {
		$('#bj_bg').fadeOut();
		$('#bj_glow').fadeOut();
		$('#bj_gem_orange').stop().animate({top:'40px',left:'50px'},150);
		$('#bj_gem_red').stop().animate({top:'40px',left:'50px'},200);
		$('#bj_gem_green').stop().animate({top:'40px',left:'50px'},250);
	});

	/////////// BOOKWORM /////////
	$('#franchise_bookworm').bind('mouseenter', function() {
		var logoW = 140;
		$('#bookworm_bg').stop(true,true).fadeIn();

/*		$('#bookworm_logo').stop()
		.animate({scale: '1.2'}, franchiseLogoSpeed)
		.animate({scale: '1.0'}, franchiseLogoSpeed)
		.animate({scale: '1.1'}, franchiseLogoSpeed)
*/;

		$('#bookworm_lex').stop().show().animate({bottom:'-30px',left:'-5px'}, 120);
		$('#bookworm_l').stop().show().animate({top:'4px',left:'110px'}, 130);
		$('#bookworm_h').stop().show().animate({bottom:'-25px',left:'105px'}, 140);
		$('#bookworm_m').stop().show().animate({top:'10px',left:'10px'}, 150);
	}).bind('mouseleave', function() {
		$('#bookworm_bg').fadeOut();
		$('#bookworm_lex').stop().animate({bottom:'-80px', left:'-10px'}, 120);
		$('#bookworm_l').stop().animate({top:'-30px',left:'110px'}, 130);
		$('#bookworm_h').stop().animate({bottom:'-55px',left:'110px'}, 140);
		$('#bookworm_m').stop().animate({top:'20px',left:'-35px'}, 150);
/* 		$('#bookworm_logo').stop().animate({scale: '1.0'}, franchiseLogoSpeed); */
	});

	/////////// HOG /////////
	$('#franchise_hog').bind('mouseenter', function() {
		var logoW = 165;
		$('#hog_bg').stop(true,true).fadeIn();
		$('#hog_pic1').stop().show().animate({bottom:'-5px',left:'-12px'},90);
		$('#hog_pic2').stop().show().animate({bottom:'-10px',left:'25px'},150);
		$('#hog_mag').stop().show().animate({top:'10px',right:'8px'},100);
	}).bind('mouseleave', function() {
		$('#hog_bg').fadeOut();
		$('#hog_pic1').stop().animate({bottom:'-40px',left:'-60px'},90);
		$('#hog_pic2').stop().animate({bottom:'-40px',left:'-50px'},150);
		$('#hog_mag').stop().animate({top:'20px',right:'-80px'},100);
	});

	/////////// PEGGLE /////////
	$('#franchise_peggle').bind('mouseenter', function() {
		var logoW = 133;
		$('#peggle_bg').stop(true,true).fadeIn();
		$('#peggle_ball').stop().show().animate({top:'60px',left:'20px'},150);
		$('#peggle_hu').stop().show().animate({bottom:'-30px',right:'5px'},160);
		$('#peggle_ufo').stop().show().animate({top:'2px',left:'70px'},120);
		$('#peggle_yingyang').stop().show().animate({top:'-4px',left:'-30px'},200);
	}).bind('mouseleave', function() {
		$('#peggle_bg').fadeOut();
		$('#peggle_ball').stop().animate({top:'10px',left:'180px'});
		$('#peggle_hu').stop().animate({bottom:'-70px',right:'-60px'});
		$('#peggle_ufo').stop().animate({top:'-42px',left:'100px'});
		$('#peggle_yingyang').stop().animate({top:'-65px',left:'-40px'});
	});

	/////////// PVZ /////////
	$('#franchise_pvz').bind('mouseenter', function() {
		var logoW = 138;
		$('#pvz_bg').stop(true,true).fadeIn();
		$('#pvz_wallnut').stop().show().animate({top:'100px',left:'-10px'},120)
		$('#pvz_pepper').stop().show().animate({top:'12px',left:'-5px'},150)
		$('#pvz_zombie').stop().show().animate({top:'12px',right:'-55px'},160)
		$('#pvz_imp').stop().show().animate({bottom:'-22px',left:'100px'},170)
	}).bind('mouseleave', function() {
		$('#pvz_bg').fadeOut();
		$('#pvz_wallnut').stop().animate({top:'125px',left:'-40px'},120);
		$('#pvz_pepper').stop().animate({top:'8px',left:'-45px'},150);
		$('#pvz_zombie').stop().animate({top:'10px',right:'-85px'},160);
		$('#pvz_imp').stop().animate({bottom:'-55px',left:'114px'},170);
	});

	/////////// ZUMA /////////
	$('#franchise_zuma').bind('mouseenter', function() {
		var logoW = 135;
		$('#z_bg').stop(true,true).fadeIn();
		$('#z_frog').stop().show().animate({bottom:'-15px',right:'30px'},200);
		$('#z_leaf1').stop().show().animate({top:'-60px',right:'-30px'},200);
		$('#z_leaf2').stop().show().animate({bottom: '-30px', left: '-30px'},180);
	}).bind('mouseleave', function() {
		$('#z_bg').fadeOut();
		$('#z_frog').stop().show().animate({bottom:'-65px',left:'100px'},200);
		$('#z_leaf1').show().animate({top:'-110px',right:'-100px'},200);
		$('#z_leaf2').stop().show().animate({bottom: '-110px',left: '0px'},180);
	});

		// ++++++++++++++++++++++++++++++++++++++++++++++++++
		// ZOMBIE ARM
		// ++++++++++++++++++++++++++++++++++++++++++++++++++
		var rotationAmount = -133;
		var zombieWait;
		var zombieArmAnimated = false;

		$('#socialTrigger').bind('mouseenter', function (e) {
			zombieWait = setTimeout (function(){
				$('#zombie_rope_footer').stop()
				.animate({rotate: (rotationAmount - 40 ) + 'deg'}, 300)
				.animate({rotate: (rotationAmount + 20 ) + 'deg'}, 100)
				.animate({rotate: (rotationAmount - 10 ) + 'deg'}, 100)
				.animate({rotate: (rotationAmount + 5 ) + 'deg'}, 50)
				.animate({rotate: (rotationAmount - 2 ) + 'deg'}, 20)
				.animate({rotate: rotationAmount + 'deg', scale: '1.0'}, 100, function () {
					$('#zombeyes_l, #zombeyes_r').stop().animate({top: '51px'}, 200);
				});
				zombieArmAnimated = true;
			}, 350);

		}).bind('mouseleave', function () {
			if (zombieArmAnimated) {
				$('#zombie_rope_footer').stop()
				.animate({rotate: '10deg', scale: '1.0'}, 300)
				.animate({rotate: '0deg', scale: '1.0'}, 100, function(){
					$('#zombeyes_l, #zombeyes_r').stop().animate({top: '55px'}, 400);
				});
				zombieArmAnimated = false;
			} else {
				clearTimeout(zombieWait);
			}
		});

		// ++++++++++++++++++++++++++++++++++++++++++++++++++
		// PEASHOOTER/DISCO ZOMBIE INTERACTION
		// ++++++++++++++++++++++++++++++++++++++++++++++++++
		var zombieBob;
		$('#peashooter_footer').bind('mouseover', function(){
			clearInterval(zombieBob);
			$('#peashooter_footer').stop().animate({bottom: '-70px'},150);
			$('#disco_zombie_footer').clearQueue().stop(true,true).animate({bottom: '-310px'},400);
			}).bind('mouseleave', function(){
			$('#peashooter_footer').stop().animate({bottom: '-100px'},150);
			$('#disco_zombie_footer').stop().delay(400).animate({bottom: '-100px'},500);
			zombieBob = setInterval(function(){
				$("#disco_zombie_footer").animate({bottom: '-90px'}, 520).animate({bottom: '-100px'}, 540);
			}, 200);

		}).bind('click', function(){
			firePea();
		});

		$('#peashooter_footer').trigger('mouseleave');

	// ++++++++++++++++++++++++++++++++++++++++++++++++++
	// OTHER
	// ++++++++++++++++++++++++++++++++++++++++++++++++++
	$('#chuzzle').bind('click', function(){
		$('#chuzzle').append('<img src="img/chuzzle.png"/>');

		$('#chuzzle img').animate({
			bottom: '-400px'
		}, function(){
			$(this).remove();
		});
	});

	$('#little_zombie').css({right:'-2000px',top:'-20px'}).animate({right:'200px',top:'-20px'}, 6000);
	$('#scuba_zombie').css({top:'500px'}).animate({top:'40px'}, 2000);

	// About us Timeline
	var aboutPopup = function(year, view) {
		$(year).bind('click',function(){
			$(view).show();
			$('#mat').show();
		});
	}
	$('#mat').bind('click',function() {
		$('.view').hide();
		$('#mat').hide();
	});
	aboutPopup('#year00','#view00');
	aboutPopup('#year01','#view01');
	aboutPopup('#year02','#view02');
	aboutPopup('#year03','#view03');
	aboutPopup('#year04','#view04');
	aboutPopup('#year04','#view45');
	aboutPopup('#year05','#view05');
	aboutPopup('#year06','#view06');
	aboutPopup('#year07','#view07');
	aboutPopup('#year08','#view08');
	aboutPopup('#year09','#view09');
	aboutPopup('#year10','#view10');
	aboutPopup('#year10b','#view10');
	aboutPopup('#year11','#view11');

	// for IE7's special needs
	$('.view_guts').click(function() {
		$('.view').hide();
		$('#mat').hide();
	});

	//Misc Styling
	$("#more_games .logos a:last").addClass('last');
	$("#language-select-list li:last-child").addClass('last');
	$("#popcap_blog div.blog_post:last").addClass('last');
	$(".menu-block-1 > ul.menu > li:nth-child(2)").addClass('company');
	$("#catalog_breadcrumb a.active").next().addClass('last');

	// FANCYBOX
	$('a[rel="screenshots"]').fancybox({
		'overlayShow' : true,
    	'transitionIn' : 'elastic',
    	'transitionOut' : 'elastic',
    	'showNavArrows' : true,
    	'padding' : 20,
    	'centerOnScroll' : true,
    	'overlayColor' : '#FFFFFF',
    	'showNavArrows' : true,
    	'zIndex' : 9999,
    	'titlePosition' : 'inside',
    	'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
		    return '<div id="fancybox-counter">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + '</div><div id="fancybox-caption">' + title + '</div>';
		}
	});
	$('a[rel="video"]').fancybox({
			'overlayShow' : true,
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'width'			: 680,
			'height'		: 495,
			'type'			: 'swf',
			'swf'			: {
			   	'wmode'		: 'transparent',
				'allowfullscreen'	: 'true'
			}
	});
	$('#sys_reqs .toggle').fancybox({
			'overlayShow' : true,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'centerOnScroll' : true,
			'overlayColor' : '#FFFFFF',
			'padding' : 0,
			'onStart': function() {
				$('#sys_reqs_popup').show();
			},
			'onCleanup': function() {
				$('#sys_reqs_popup').hide();
			}
	});

	 $(".node-type-iphone.product-bejeweled-3 .popcap-game-link-67").text('Bejeweled');
	 $(".node-type-ipad.product-bejeweled-3 .popcap-game-link-67").text('Bejeweled HD');

	//flyout sub menus
	$('#block-menu_block-1 ul.menu li.menu-mlid-12438 ul.menu li.expanded').bind('mouseenter',function(){
		var parent_top = ($(this).offset().top) - 10;
		$(this).children("ul.menu").stop().show();
		$(this).children("ul.menu").offset({ top: parent_top });
		platformFilter();
	}).bind('mouseleave',function(){
		$('#block-menu_block-1 ul.menu li.menu-mlid-12438 ul.menu li.expanded > ul.menu').stop().delay(1000).hide();
	});
	$('#block-menu_block-1 ul.menu li.menu-mlid-21799 ul.menu li.expanded').bind('mouseenter',function(){
		var parent_top = ($(this).offset().top) - 10;
		$(this).children("ul.menu").stop().show();
		$(this).children("ul.menu").offset({ top: parent_top });
		platformFilter();
	}).bind('mouseleave',function(){
		$('#block-menu_block-1 ul.menu li.menu-mlid-21799 ul.menu li.expanded > ul.menu').stop().delay(1000).hide();
	});

	//cash game menus
	//set default values if cookies don't exist for some reason
	var geo = 'us';
	var lcid = 1033;
	if ($.cookie("geo_location") != null) {
		geo = $.cookie("geo_location").toLowerCase();
	}
	if ($.cookie("lcid") != null) {
		lcid = $.cookie("lcid").toLowerCase();
	}
	if (lcid == 1033 && (geo == 'us' || geo == 'ca')) {
		$('.menu-mlid-27097').hide();
	}
	else if (lcid == 1033 && (geo == 'uk' || geo == 'gb')) {
		$('.menu-mlid-27096').hide();
	}
	else {
		$('.menu-mlid-27096').hide();
		$('.menu-mlid-27097').hide();
	}


  var fancyboxCashPageOpts = {
			'overlayShow' : true,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'centerOnScroll' : true,
			'overlayColor' : '#FFFFFF',
			'padding' : 0,
			'titleShow' : false,
			'width' : 822,
			'height' : 472
	};

  $('.top-bar-section a[href*="worldwinner.com"]').click(function(e) {
    e.preventDefault();
    var url = "/?worldwinner=" + $(this).attr("href");

    fancyboxCashPageOpts.type = "iframe";
    fancyboxCashPageOpts.href = url;

    $.fancybox(fancyboxCashPageOpts);
  });


	$('.menu-mlid-27098 a, .menu-mlid-27099 a, .menu-mlid-27100 a, .menu-mlid-27101 a, .menu-mlid-27102 a, .menu-mlid-27103 a, .menu-mlid-27104 a, .menu-mlid-27105 a, .menu-mlid-27106 a').click(function() {
	  $(this).addClass("iframe");
	});
	$('.menu-mlid-27098 a, .menu-mlid-27099 a, .menu-mlid-27100 a, .menu-mlid-27101 a, .menu-mlid-27102 a, .menu-mlid-27103 a, .menu-mlid-27104 a, .menu-mlid-27105 a, .menu-mlid-27106 a').fancybox({
			'overlayShow' : true,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'centerOnScroll' : true,
			'overlayColor' : '#FFFFFF',
			'padding' : 0,
			'titleShow' : false,
			'width' : 822,
			'height' : 472
	});






});