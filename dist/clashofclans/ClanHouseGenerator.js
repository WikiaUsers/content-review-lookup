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
		var mode = $(this).attr('data-type');
		$('.chg-container .chg-tabs > div, .chg-container .chg-tabber > div').removeClass('active');
		$(this).parents('.chg-container').find('.chg-tabber div[data-type="' + mode + '"]').addClass('active');
		$(this).addClass('active');
	});
	
	//Create download name
	var config = mw.config.get([
		'wgUserName'
	]);
	var username = config.wgUserName;
	var filename;
	if (username == null) {
		filename = 'ClanHouse.png';
	}else {
		filename = username + '_ClanHouse.png';
	}
	
	//Create canvas
	$('.chg-canvas').append(
		'<div class="chg-names"></div>' +
        '<canvas id="chg-canvas" width="210" height="210"></canvas>' +
        '<img src="" id="chg-mirror" />' +
        '<center>' +
            '<a href="#" id="dwn-clanhouse" download=' +  filename + '><div><span>Download</span></div></a>' +
        '</center>'
    );
    
    //Defining vars
    var location = 'https://static.wikia.nocookie.net/clashofclans/images/';

    var ground = {
    	0: '2/21/CHG_Ground_Default_Ground.png',
    	1: 'f/fd/CHG_Ground_Wooden_Floor.png',
    	2: '5/54/CHG_Ground_Stone_Floor.png',
    	3: 'c/c6/CHG_Ground_Gold_Floor.png',
    	4: 'e/ed/CHG_Ground_Checkered_Floor.png',
    	5: 'e/ed/CHG_Ground_Snow_Floor.png',
    	6: '6/6e/CHG_Ground_Garden_Floor.png',
    	7: '3/36/CHG_Ground_White_Fence.png',
    	8: '9/91/CHG_Ground_Gold.png',
    	9: '0/0b/CHG_Ground_Gingerbread_Floor.png',
    };
    
    var groundnames = {
    	0: 'Default Ground',
    	1: 'Wooden Floor',
    	2: 'Stone Floor',
    	3: 'Gold Floor',
    	4: 'Checkered Floor',
    	5: 'Snow Floor',
    	6: 'Garden Floor',
    	7: 'White Fence',
    	8: 'Gold',
    	9: 'Gingerbread Floor',
    };
    
    var walls = {
    	0: 'b/b1/CHG_Walls_Default_Walls.png',
    	1: '2/27/CHG_Walls_Thatched_Walls.png',
    	2: '2/29/CHG_Walls_Stone_Walls.png',
    	3: '1/1a/CHG_Walls_Concentric_Diamond_Walls.png',
    	4: '3/30/CHG_Walls_Majestic_Walls.png',
    	5: '4/4f/CHG_Walls_Dark_Stone_Walls.png',
    	6: '9/9d/CHG_Walls_Stilt_Walls.png',
    	7: 'e/e6/CHG_Walls_Garden-like_Walls.png',
    	8: '1/19/CHG_Walls_Cabin_Walls.png',
    	9: '6/6d/CHG_Walls_Igloo_Walls.png',
    	10: '0/01/CHG_Walls_Gingerbread_Walls.png',
    };
    
    var wallnames = {
    	0: 'Default Walls',
    	1: 'Thatched Walls',
    	2: 'Stone Walls',
    	3: 'Concentric Diamond Walls',
    	4: 'Majestic Walls',
    	5: 'Dark Stone Walls',
    	6: 'Stilt Walls',
    	7: 'Garden-Like Walls',
    	8: 'Cabin Walls',
    	9: 'Igloo Walls',
    	10: 'Gingerbread Walls',
    };
    
    var roof = {
    	0: '5/56/CHG_Roof_Default_Roof_Orange.png',
    	1: 'd/d7/CHG_Roof_Default_Roof_Blue.png',
    	2: 'b/bd/CHG_Roof_Default_Roof_Red.png',
    	3: '8/8f/CHG_Roof_Default_Roof_Black.png',
    	4: 'a/ad/CHG_Roof_Thatched_Roof.png',
    	5: '6/67/CHG_Roof_Gable_Thatched_Roof.png',
    	6: '9/96/CHG_Roof_Open_Tent_Roof_Orange.png',
    	7: '8/85/CHG_Roof_Open_Tent_Roof_Blue.png',
    	8: '8/87/CHG_Roof_Open_Tent_Roof_Green.png',
    	9: '4/41/CHG_Roof_Gable_Brick_Roof_1.png',
    	10: '5/52/CHG_Roof_Gable_Brick_Roof_2.png',
    	11: '5/59/CHG_Roof_Clan_Symbol_Roof.png',
    	12: 'c/c2/CHG_Roof_Capital_Symbol_Roof.png',
    	13: '1/14/CHG_Roof_Black_Capital_Symbol_Roof.png',
    	14: 'c/ce/CHG_Roof_Tall_Tent_Roof_Brown.png',
    	15: '8/8a/CHG_Roof_Tall_Tent_Roof_Blue.png',
    	16: 'e/ec/CHG_Roof_Tall_Tent_Roof_Red.png',
    	17: 'e/ed/CHG_Roof_Tall_Tent_Roof_Yellow.png',
    	18: '9/9c/CHG_Roof_Cross_Roof_Blue.png',
    	19: 'b/b2/CHG_Roof_Cross_Roof_Red.png',
    	20: '9/98/CHG_Roof_Cross_Roof_Green.png',
    	21: '2/26/CHG_Roof_Castle_Roof_Orange.png',
    	22: 'c/ca/CHG_Roof_Castle_Roof_Blue.png',
    	23: 'f/f1/CHG_Roof_Castle_Roof_Red.png',
    	24: '2/2e/CHG_Roof_Castle_Roof_Black.png',
    	25: 'f/f2/CHG_Roof_Castle_Roof_Yellow.png',
    	26: '9/96/CHG_Roof_Pagoda_Roof_Blue.png',
    	27: '8/80/CHG_Roof_Pagoda_Roof_Red.png',
    	28: '4/4b/CHG_Roof_Pagoda_Roof_Green.png',
    	29: 'b/b8/CHG_Roof_Pagoda_Roof_Black.png',
    	30: 'c/c1/CHG_Roof_Pagoda_Roof_White.png',
    	31: '7/7b/CHG_Roof_Stone_Roof.png',
    	32: '3/36/CHG_Roof_Grass_Roof_1.png',
    	33: '6/60/CHG_Roof_Grass_Roof_2.png',
    	34: '2/20/CHG_Roof_Windmill_Roof_Orange.png',
    	35: '1/17/CHG_Roof_Windmill_Roof_Blue.png',
    	36: '9/9d/CHG_Roof_Windmill_Roof_Red.png',
    	37: 'c/cb/CHG_Roof_Windmill_Roof_Green.png',
    	38: '7/7f/CHG_Roof_Windmill_Roof_White.png',
    	39: '7/76/CHG_Roof_Snow-Covered_Roof.png',
    	40: '4/41/CHG_Roof_Igloo_Roof.png',
    	41: 'e/e7/CHG_Roof_Gingerbread_Roof.png',
    };
    
    var roofnames = {
    	0: 'Orange Default Roof',
    	1: 'Blue Default Roof',
    	2: 'Red Default Roof',
    	3: 'Black Default Roof',
    	4: 'Thatched Roof',
    	5: 'Gable Thatched Roof',
    	6: 'Orange Open Tent Roof',
    	7: 'Blue Open Tent Roof',
    	8: 'Green Open Tent Roof',
    	9: 'Gable Brick Roof Type 1',
    	10: 'Gable Brick Roof Type 2',
    	11: 'Clan Symbol Roof',
    	12: 'Capital Symbol Roof',
    	13: 'Black Capital Symbol Roof',
    	14: 'Brown Tall Tent Roof',
    	15: 'Blue Tall Tent Roof',
    	16: 'Red Tall Tent Roof',
    	17: 'Yellow Tall Tent Roof',
    	18: 'Blue Cross Roof',
    	19: 'Red Cross Roof',
    	20: 'Green Cross Roof',
    	21: 'Orange Castle Roof',
    	22: 'Blue Castle Roof',
    	23: 'Red Castle Roof',
    	24: 'Black Castle Roof',
    	25: 'Yellow Castle Roof',
    	26: 'Blue Pagoda Roof',
    	27: 'Red Pagoda Roof',
    	28: 'Green Pagoda Roof',
    	29: 'Black Pagoda Roof',
    	30: 'White Pagoda Roof',
    	31: 'Stone Roof',
    	32: 'Grass Roof Type 1',
    	33: 'Grass Roof Type 2',
    	34: 'Orange Windmill Roof',
    	35: 'Blue Windmill Roof',
    	36: 'Red Windmill Roof',
    	37: 'Green Windmill Roof',
    	38: 'White Windmill Roof',
    	39: 'Snow-Covered Roof',
    	40: 'Igloo Roof',
    	41: 'Gingerbread Roof',
    };
    
    var decoration = {
    	0: 'e/e9/CHG_Decoration_Barrel.png',
    	1: '2/2b/CHG_Decoration_Practice_Target.png',
    	2: '0/0c/CHG_Decoration_Sword_Rack.png',
    	3: '9/91/CHG_Decoration_Axe_and_Log.png',
    	4: 'd/d7/CHG_Decoration_Anvil.png',
    	5: 'e/e2/CHG_Decoration_Bomb.png',
    	6: '5/5e/CHG_Decoration_Campfire.png',
    	7: '9/91/CHG_Decoration_Capital_Symbol.png',
    	8: '5/5e/CHG_Decoration_Barbarian_Statue.png',
    	9: 'd/d4/CHG_Decoration_Tree.png',
    	10: '7/7d/CHG_Decoration_Snowman.png',
    	11: '9/9f/CHG_Decoration_Flamingo.png',
    	12: '5/58/CHG_Decoration_Stone.png',
    	13: '2/2e/CHG_Decoration_Gingerbread_Archer.png',
    	14: '9/90/CHG_Decoration_Candy_Cane.png',
    };
    
    var decorationnames = {
    	0: 'Barrel',
    	1: 'Practice Target',
    	2: 'Sword Rack',
    	3: 'Axe and Log',
    	4: 'Anvil',
    	5: 'Bomb',
    	6: 'Campfire',
    	7: 'Capital Symbol',
    	8: 'Barbarian Statue',
    	9: 'Tree',
    	10: 'Snowman',
    	11: 'Flamingo',
    	12: 'Stone',
    	13: 'Gingerbread Archer',
    	14: 'Candy Cane',
    };
    
    //Add containers
    $( '.chg-tabber > div' ).append(
        '<div class="container">' +
            '<div class="container-values">' +
        '</div>'
    );
    
    //Load ground images for selection
    $.each(ground, function(i, ground) {
	   $('.chg-tabber > div[data-type="ground"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="ground" data-id="' + i + '" title="' + groundnames[i] + '"><img class="img-toggler" src="' + location + ground + '" width="100" height="100" /></div>'
    	);
	});
	
	//Load wall images for selection
	$.each(walls, function(i, walls) {
	   $('.chg-tabber > div[data-type="walls"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="walls" data-id="' + i + '" title="' + wallnames[i] + '"><img class="img-toggler" src="' + location + walls + '" width="100" height="100" /></div>'
    	);
	});
	
	//Load roof images for selection
	$.each(roof, function(i, roof) {
	   $('.chg-tabber > div[data-type="roof"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="roof" data-id="' + i + '" title="' + roofnames[i] + '"><img class="img-toggler" src="' + location + roof + '" width="100" height="100" /></div>'
    	);
	});
	
	//Load decoration images for selection
	$.each(decoration, function(i, decoration) {
	   $('.chg-tabber > div[data-type="decoration"] .container-values').append(
        '<div class="img-toggler-wrapper" data-type="decoration" data-id="' + i + '" title="' + decorationnames[i] + '"><img class="img-toggler" src="' + location + decoration + '" width="100" height="100" /></div>'
    	);
	});
	
	//Ensure the first ones appear to be active
	$('.chg-tabber .container-values > div:first-child').addClass('img-selected');

	//Clicking each image
	var timeout;
	$( '.img-toggler-wrapper' ).click(function() {
		new Audio(location + 'e/e6/Button_Click.ogg').play();
        var type = $(this).attr( 'data-type' ), //What type it is
            number = $(this).attr( 'data-id' ), //Number in list
            name = $(this).attr('title'); //Name of the part
        
        //Make name appear (briefly)
        $('.chg-names').text(name).addClass('active');
        clearTimeout(timeout);
        timeout = setTimeout(function() {
        	$('.chg-names').removeClass('active'); 
        }, 1000);

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
        new Audio(location + '3/3f/Clan_House.ogg').play();
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