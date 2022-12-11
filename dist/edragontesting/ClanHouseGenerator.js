/*
----------------------
 Clan House Generator
----------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- ClanHouseGenerator.css

---------
 AUTHORS 
---------
- E12Dragon: current and orginal version

---------------
 Adapted from
---------------
- BadgeGenerator.js
*/

$(document).ready(function() {
	if ( !$( '.chg-container').length ) return;
	
	//Tabbing function
	$('.chg-container .chg-tabs > div').click (function () {
		new Audio('https://static.wikia.nocookie.net/clashofclans/images/e/e6/Button_Click.ogg').play();
		var mode = $(this).attr('data-name');
		$('.chg-container .chg-tabs > div, .chg-container .chg-tabber > div').removeClass('active');
		$(this).parents('.chg-container').find('.chg-tabber div[data-name="' + mode + '"]').addClass('active');
		$(this).addClass('active');
	});
	
	//Create download name
	var config = mw.config.get([
		'wgUserName'
	]);
	var username = config.wgUserName;
	var filename;
	if (username !== '') {
		filename = username + '_ClanHouse.png';
	}else {
		filename = 'ClanHouse.png';
	}
	
	//Create canvas
	$('.chg-canvas').append(
        '<canvas id="chg-canvas" width="210" height="210"></canvas>' +
        '<img src="" id="chg-mirror" />' +
        '<center>' +
            '<a href="#" class="button" id="dwn-clanhouse" download=' +  filename + '><div><span>Download</span></div></a>' +
        '</center>'
    );
    
    //Defining vars
    var location = 'https://images.wikia.nocookie.net/e12dragon_testing/images/';

    var ground = {
    	0: '1/19/CH_Ground_1.png',
    	1: 'a/a5/CH_Ground_2.png',
    	2: 'a/a5/CH_Ground_2.png',
    	3: 'a/a5/CH_Ground_2.png',
    	4: 'a/a5/CH_Ground_2.png',
    	5: 'a/a5/CH_Ground_2.png',
    	6: 'a/a5/CH_Ground_2.png',
    	7: 'a/a5/CH_Ground_2.png',
    	8: 'a/a5/CH_Ground_2.png',
    	9: 'a/a5/CH_Ground_2.png',
    };
    
    var walls = {
    	0: 'b/bd/CH_Wall_1.png',
    	1: '2/2a/CH_Wall_2.png',
    };
    
    var roof = {
    	0: 'f/f5/CH_Roof_1.png',
    	1: 'b/bf/CH_Roof_2.png',
    	2: '8/84/CH_Roof_3.png',
    };
    
    var decoration = {
    	0: '7/78/CH_Decoration_1.png',
    	1: '2/2c/CH_Decoration_2.png',
    	2: 'c/c2/CH_Decoration_3.png',
    };
    
    //Add containers
    $( '.chg-tabber > div' ).append(
        '<div class="container">' +
            '<div class="container-values">' +
        '</div>'
    );
    
    //Load images for selection
    $.each(ground, function(i, ground) {
	   $('.chg-tabber > div[data-name="ground"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="ground" data-id="' + i + '"><img class="img-toggler" src="' + location + ground + '" width="100" height="100" /></div>'
    	);
	});
	
	$.each(walls, function(i, walls) {
	   $('.chg-tabber > div[data-name="walls"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="walls" data-id="' + i + '"><img class="img-toggler" src="' + location + walls + '" width="100" height="100" /></div>'
    	);
	});
	
	$.each(roof, function(i, roof) {
	   $('.chg-tabber > div[data-name="roof"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="roof" data-id="' + i + '"><img class="img-toggler" src="' + location + roof + '" width="100" height="100" /></div>'
    	);
	});
	
	$.each(decoration, function(i, decoration) {
	   $('.chg-tabber > div[data-name="decoration"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="decoration" data-id="' + i + '"><img class="img-toggler" src="' + location + decoration + '" width="100" height="100" /></div>'
    	);
	});
	
	//Ensure the first ones appear to be active
	$('.chg-tabber .container-values > div:first-child').addClass('img-selected');

	//Clicking each image
	$( '.img-toggler-wrapper' ).on( 'click', function() {
		new Audio('https://static.wikia.nocookie.net/clashofclans/images/e/e6/Button_Click.ogg').play();
        var type = $(this).attr( 'data-type' ), //What type it is
            number = $(this).attr( 'data-id' ); //Number in list

		//active images
		$('.img-toggler-wrapper[data-type="' +  type + '"]').removeClass('img-selected');
        $(this).addClass( 'img-selected' );
		
		//Calling on functions and send number with
		if (type == 'ground') {
			setGround(number);
		}else if (type == 'walls') {
			setWalls(number);
		}else if (type == 'roof') {
			setRoof(number);
		}else if (type == 'decoration') {
			setDecoration(number);
		}
	});
	
	//Some more vars to define
    var canvas = document.getElementById( 'chg-canvas' ),
        mirror = document.getElementById( 'chg-mirror' ),
        dwnbutton = document.getElementById('dwn-clanhouse'),
        context = canvas.getContext( '2d' );
	
	//Create images for the canvas
    var img1 = new Image(), //ground
        img2 = new Image(), //walls
        img3 = new Image(), //roof
        img4 = new Image(); //decoration
 
    img1.crossOrigin = "anonymous";
    img2.crossOrigin = "anonymous";
    img3.crossOrigin = "anonymous";
    img4.crossOrigin = "anonymous";

	//Download function
    dwnbutton.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        dwnbutton.href = dataURL;
        new Audio('https://static.wikia.nocookie.net/e12dragon_testing/images/3/3a/Chg.ogg/revision/latest?cb=20221210045312&format=original').play();
    });
 
	//Initial firing of the script on page load
    img1.addEventListener( 'load', loadimg2 );
    img1.src = location + ground[0];
 
    function loadimg2() {    
        img2.addEventListener( 'load', loadimg3 );
        img2.src = location + walls[0];
    }
 
    function loadimg3() {    
        img3.addEventListener( 'load', loadimg4 );
        img3.src = location + roof[0];
    }
 
    function loadimg4() {    
        img4.addEventListener( 'load', buildHouse );
        img4.src = location + decoration[0];
    }
 
	//Make changes to canvas
    function buildHouse(){
        canvas.width = mirror.width = img1.width;
        canvas.height = mirror.height = img1.height;
 
        context.globalAlpha = 1.0;
        context.drawImage( img1, 0, 0 );
        context.drawImage( img2, 0, 0 );
        context.drawImage( img3, 0, 0 );
        context.drawImage( img4, 0, 0 );

        img1.removeEventListener( 'load', loadimg2 );
        img2.removeEventListener( 'load', loadimg3 );
        img3.removeEventListener( 'load', loadimg4 );
        img1.removeEventListener( 'load', buildHouse );
        img2.removeEventListener( 'load', buildHouse );
        img3.removeEventListener( 'load', buildHouse );
        img4.removeEventListener( 'load', buildHouse );
 
        var dataURL = canvas.toDataURL( 'image/png' );
        mirror.src = dataURL;
    }
 
	//Changing image values for canvas on click
    function setGround( i ) {
        img1.addEventListener( 'load', buildHouse );
        img1.src = location + ground[i];
    }
    
    function setWalls( i ) {
        img2.addEventListener( 'load', buildHouse );
        img2.src = location + walls[i];
    }
    
    function setRoof( i ) {
        img3.addEventListener( 'load', buildHouse );
        img3.src = location + roof[i];
    }

	function setDecoration( i ) {
        img4.addEventListener( 'load', buildHouse );
        img4.src = location + decoration[i];
    }
 
});