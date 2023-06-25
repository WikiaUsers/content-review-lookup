/*
----------------------
 Clan House Generator
----------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- ClanHouseGenerator.css

-----------------------
 AUTHORS & MAINTAINERS
-----------------------
- E12Dragon: current and orginal version

---------------
 Adapted from
---------------
- BadgeGenerator.js
*/

$(document).ready(function() {
	if ( !$( '.chg-container').length ) return;
	
    var location = 'https://static.wikia.nocookie.net/clashofclans/images/';
	
	//Tabbing function
	$('.chg-container .chg-tabs > div').click (function () {
		new Audio(location + 'e/e6/Button_Click.ogg').play();
		var mode = $(this).attr('data-type');
		$(this).parents('.chg-container').find('.chg-tabs > div, .chg-tabber > div').removeClass('active');
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
	
	//Function to show all parts
	$('.page-counter__value').click(function() {
		$('.chg-container').addClass('all-parts');
	});
	
	//Create canvas
	$('.chg-canvas').append(
		'<div class="chg-names"></div>' +
        '<canvas id="chg-canvas" width="210" height="210"></canvas>' +
        '<img src="" id="chg-mirror" />' +
        '<center>' +
            '<a href="#" id="dwn-clanhouse" download=' +  filename + '><div><span>Download</span></div></a>' +
        '</center>'
    );
    
    //Defining house part vars
    var ground = [
    	['2/21/CHG_Ground_Default_Ground.png', 'Brown Fence'],
    	['f/fd/CHG_Ground_Wooden_Floor.png', 'Terrace'],
    	['5/54/CHG_Ground_Stone_Floor.png', 'Stone Floor'],
    	['c/c6/CHG_Ground_Gold_Floor.png', 'Gold Floor'],
    	['e/ed/CHG_Ground_Checkered_Floor.png', 'Checkered Floor'],
    	['6/6e/CHG_Ground_Garden_Floor.png', 'Grass Ground'],
    	['3/36/CHG_Ground_White_Fence.png', 'White Fence'],
    	['9/91/CHG_Ground_Gold.png', 'Gold'],
    	['e/ed/CHG_Ground_Snow_Floor.png', 'Snow'],
    	['0/0b/CHG_Ground_Gingerbread_Floor.png', 'Gingerbread Floor'],
    	['3/3b/CHG_Ground_Goblin_Floor.png', 'Goblin Ground'],
    	['d/d1/CHG_Ground_Chess_Floor.png', 'Chess Floor'],
    	['1/16/CHG_Ground_Greenhouse_Floor.png', 'Greenhouse Ground'],
    ];
    
    var walls = [
    	['b/b1/CHG_Walls_Default_Walls.png', 'Classic Walls'],
    	['2/27/CHG_Walls_Thatched_Walls.png', 'Thatched Walls'],
    	['2/29/CHG_Walls_Stone_Walls.png', 'Stone Walls'],
    	['1/1a/CHG_Walls_Concentric_Diamond_Walls.png', 'Concentric Diamond Walls'],
    	['3/30/CHG_Walls_Majestic_Walls.png', 'Fancy Walls'],
    	['4/4f/CHG_Walls_Dark_Stone_Walls.png', 'Dark Stone Walls'],
    	['9/9d/CHG_Walls_Stilt_Walls.png', 'Stilt Walls'],
    	['e/e6/CHG_Walls_Garden-like_Walls.png', 'Grass Walls'],
    	['1/19/CHG_Walls_Cabin_Walls.png', 'Winter Walls'],
    	['6/6d/CHG_Walls_Igloo_Walls.png', 'Igloo Walls'],
    	['0/01/CHG_Walls_Gingerbread_Walls.png', 'Gingerbread Walls'],
    	['3/3a/CHG_Walls_Goblin_Walls.png', 'Goblin Walls'],
    	['a/a8/CHG_Walls_Chess_Walls_1.png', 'Chess Walls Type 1'],
    	['f/f8/CHG_Walls_Chess_Walls_2.png', 'Chess Walls Type 2'],
    	['b/bc/CHG_Walls_Greenhouse_Walls.png', 'Greenhouse Walls'],
    	['c/c4/CHG_Walls_Summer_Walls.png', 'Summer Walls'],
    ];
    
    var roof = [
    	['5/56/CHG_Roof_Default_Roof_Orange.png', 'Orange Classic Roof'],
    	['d/d7/CHG_Roof_Default_Roof_Blue.png', 'Blue Classic Roof'],
    	['b/bd/CHG_Roof_Default_Roof_Red.png', 'Red Classic Roof'],
    	['8/8f/CHG_Roof_Default_Roof_Black.png', 'Black Classic Roof'],
    	['a/ad/CHG_Roof_Thatched_Roof.png', 'Thatched Roof'],
    	['6/67/CHG_Roof_Gable_Thatched_Roof.png', 'Gable Thatched Roof'],
    	['9/96/CHG_Roof_Open_Tent_Roof_Orange.png', 'Orange Square Roof'],
    	['8/85/CHG_Roof_Open_Tent_Roof_Blue.png', 'Blue Square Roof'],
    	['8/87/CHG_Roof_Open_Tent_Roof_Green.png', 'Green Square Roof'],
    	['4/41/CHG_Roof_Gable_Brick_Roof_1.png', 'Gable Brick Roof Type 1'],
    	['5/52/CHG_Roof_Gable_Brick_Roof_2.png', 'Gable Brick Roof Type 2'],
    	['5/59/CHG_Roof_Clan_Symbol_Roof.png', 'Clan Symbol Roof'],
    	['c/c2/CHG_Roof_Capital_Symbol_Roof.png', 'Capital Symbol Roof'],
    	['1/14/CHG_Roof_Black_Capital_Symbol_Roof.png', 'Black Capital Symbol Roof'],
    	['c/ce/CHG_Roof_Tall_Tent_Roof_Brown.png', 'Brown Tent Roof'],
    	['8/8a/CHG_Roof_Tall_Tent_Roof_Blue.png', 'Blue Tent Roof'],
    	['e/ec/CHG_Roof_Tall_Tent_Roof_Red.png', 'Red Tent Roof'],
    	['e/ed/CHG_Roof_Tall_Tent_Roof_Yellow.png', 'Yellow Tent Roof'],
    	['9/9c/CHG_Roof_Cross_Roof_Blue.png', 'Blue Cross Roof'],
    	['b/b2/CHG_Roof_Cross_Roof_Red.png', 'Red Cross Roof'],
    	['9/98/CHG_Roof_Cross_Roof_Green.png', 'Green Cross Roof'],
    	['2/26/CHG_Roof_Castle_Roof_Orange.png', 'Orange Castle Roof'],
    	['c/ca/CHG_Roof_Castle_Roof_Blue.png', 'Blue Castle Roof'],
    	['f/f1/CHG_Roof_Castle_Roof_Red.png', 'Red Castle Roof'],
    	['2/2e/CHG_Roof_Castle_Roof_Black.png', 'Black Castle Roof'],
    	['f/f2/CHG_Roof_Castle_Roof_Yellow.png', 'Yellow Castle Roof'],
    	['9/96/CHG_Roof_Pagoda_Roof_Blue.png', 'Blue Pagoda Roof'],
    	['8/80/CHG_Roof_Pagoda_Roof_Red.png', 'Red Pagoda Roof'],
    	['4/4b/CHG_Roof_Pagoda_Roof_Green.png', 'Green Pagoda Roof'],
    	['b/b8/CHG_Roof_Pagoda_Roof_Black.png', 'Black Pagoda Roof'],
    	['c/c1/CHG_Roof_Pagoda_Roof_White.png', 'White Pagoda Roof'],
    	['7/7b/CHG_Roof_Stone_Roof.png', 'Stone Roof'],
    	['3/36/CHG_Roof_Grass_Roof_1.png', 'Grass Roof Type 1'],
    	['6/60/CHG_Roof_Grass_Roof_2.png', 'Grass Roof Type 2'],
    	['2/20/CHG_Roof_Windmill_Roof_Orange.png', 'Orange Windmill Roof'],
    	['1/17/CHG_Roof_Windmill_Roof_Blue.png', 'Blue Windmill Roof'],
    	['9/9d/CHG_Roof_Windmill_Roof_Red.png', 'Red Windmill Roof'],
    	['c/cb/CHG_Roof_Windmill_Roof_Green.png', 'Green Windmill Roof'],
    	['7/7f/CHG_Roof_Windmill_Roof_White.png', 'White Windmill Roof'],
    	['7/76/CHG_Roof_Snow-Covered_Roof.png', 'Winter Roof'],
    	['4/41/CHG_Roof_Igloo_Roof.png', 'Igloo Roof'],
    	['e/e7/CHG_Roof_Gingerbread_Roof.png', 'Gingerbread Roof'],
    	['c/cd/CHG_Roof_Gingerbread_Roof_2.png', 'Gingerbread Roof Type 2'],
    	['f/fd/CHG_Roof_Goblin_Roof.png', 'Goblin Roof'],
    	['d/d2/CHG_Roof_Chess_Roof_1.png', 'Chess Roof Type 1'],
    	['c/c7/CHG_Roof_Chess_Roof_2.png', 'Chess Roof Type 2'],
    	['c/c0/CHG_Roof_Greenhouse_Roof.png', 'Greenhouse Roof'],
    	['7/79/CHG_Roof_Summer_Roof.png', 'Summer Roof'],
    ];
    
    var decoration = [
    	['e/e9/CHG_Decoration_Barrel.png', 'Barrel'],
    	['2/2b/CHG_Decoration_Practice_Target.png', 'Practice Target'],
    	['0/0c/CHG_Decoration_Sword_Rack.png', 'Sword Rack'],
    	['f/fc/CHG_Decoration_Sign.png', 'Sign'],
    	['4/43/CHG_Decoration_Sword.png', 'Sword Statue'],
    	['3/37/CHG_Decoration_PEKKA.png', 'P.E.K.K.A Statue'],
    	['9/91/CHG_Decoration_Axe_and_Log.png', 'Axe and Log'],
    	['d/d7/CHG_Decoration_Anvil.png', 'Anvil'],
    	['e/e2/CHG_Decoration_Bomb.png', 'Bomb'],
    	['5/5e/CHG_Decoration_Campfire.png', 'Campfire'],
    	['9/91/CHG_Decoration_Capital_Symbol.png', 'Capital Symbol'],
    	['5/5e/CHG_Decoration_Barbarian_Statue.png', 'Barbarian Statue'],
    	['d/d4/CHG_Decoration_Tree.png', 'Tree'],
    	['9/9f/CHG_Decoration_Flamingo.png', 'Flamingo'],
    	['5/59/CHG_Decoration_Pebble.png', 'Pebbles'],
    	['5/58/CHG_Decoration_Stone.png', 'Stone'],
    	['7/7d/CHG_Decoration_Snowman.png', 'Snowman'],
    	['2/2e/CHG_Decoration_Gingerbread_Archer.png', 'Gingerbread Archer'],
    	['9/90/CHG_Decoration_Candy_Cane.png', 'Candy Cane'],
    	['a/a4/CHG_Decoration_Chocolate_Tree.png', 'Chocolate Tree'],
    	['c/c0/CHG_Decoration_Goblin_Spears.png', 'Goblin Spears'],
    	['d/d7/CHG_Decoration_Chess_Piece.png', 'Chess Piece'],
    	['f/fa/CHG_Decoration_Well.png', 'Greenhouse Well'],
    	['a/af/CHG_Decoration_Liferings.png', 'Summer Life Rings'],
    	['8/86/CHG_Decoration_Bonfire.png', 'Summer Bonfire'],
    	['6/65/CHG_Decoration_Laundry.png', 'Laundry'],
    	['b/b7/CHG_Decoration_Crystal.png', 'Crystals'],
    	['b/b7/CHG_Decoration_Cauldron.png', 'Cauldron'],
    	['c/cd/CHG_Decoration_Log.png', 'Log'],
    ];
    
    //Add containers
    $( '.chg-tabber > div' ).append(
        '<div class="container">' +
            '<div class="container-values">' +
        '</div>'
    );
    
    //Load ground images for selection
	$.each(ground, function(i, groundItem) {
		var groundImage = groundItem[0];
		var groundName = groundItem[1];

		$('.chg-tabber > div[data-type="ground"] .container-values').append(
		'<div class="img-toggler-wrapper" data-type="ground" data-id="' + i + '" title="' + groundName + '"><img class="img-toggler" src="' + location + groundImage + '" /></div>'
    	);
	});
	
	//Load wall images for selection
	$.each(walls, function(i, wallsItem) {
		var wallsImage = wallsItem[0];
		var wallsName = wallsItem[1];

		$('.chg-tabber > div[data-type="walls"] .container-values').append(
		'<div class="img-toggler-wrapper" data-type="walls" data-id="' + i + '" title="' + wallsName + '"><img class="img-toggler" src="' + location + wallsImage + '" /></div>'
    	);
	});
	
	//Load roof images for selection
	$.each(roof, function(i, roofItem) {
		var roofImage = roofItem[0];
		var roofName = roofItem[1];

		$('.chg-tabber > div[data-type="roof"] .container-values').append(
		'<div class="img-toggler-wrapper" data-type="roof" data-id="' + i + '" title="' + roofName + '"><img class="img-toggler" src="' + location + roofImage + '" /></div>'
    	);
	});
	
	//Load decoration images for selection
	$.each(decoration, function(i, decorationItem) {
		var decorationImage = decorationItem[0];
		var decorationName = decorationItem[1];

		$('.chg-tabber > div[data-type="decoration"] .container-values').append(
		'<div class="img-toggler-wrapper" data-type="decoration" data-id="' + i + '" title="' + decorationName + '"><img class="img-toggler" src="' + location + decorationImage + '" /></div>'
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
    img1.src = location + ground[0][0];
 
    function loadimg2() {    
        img2.addEventListener( 'load', loadimg3 );
        img2.src = location + walls[0][0];
    }
 
    function loadimg3() {    
        img3.addEventListener( 'load', loadimg4 );
        img3.src = location + roof[0][0];
    }
 
    function loadimg4() {    
        img4.addEventListener( 'load', buildHouse );
        img4.src = location + decoration[0][0];
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
        img1.src = location + ground[i][0];
    }
    
    function setWalls( i ) {
        img2.addEventListener( 'load', buildHouse );
        img2.src = location + walls[i][0];
    }
    
    function setRoof( i ) {
        img3.addEventListener( 'load', buildHouse );
        img3.src = location + roof[i][0];
    }

	function setDecoration( i ) {
        img4.addEventListener( 'load', buildHouse );
        img4.src = location + decoration[i][0];
    }
 
});