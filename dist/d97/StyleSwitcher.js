// Styleswitcher

// Set initial skin
setTimeout(function() { 
	if($.cookie('ssSkinType')=='normal') {
		goNormal();
	} else if($.cookie('ssSkinType')=='fall') {
		goFall();
	} else if($.cookie('ssSkinType')=='summer') {
		goSummer();
	} else if($.cookie('ssSkinType')=='night') {
		goNight();
	} else if($.cookie('ssSkinType')=='winter') {
		goWinter();
	} else if($.cookie('ssSkinType')=='spring') {
		goSpring();
	} else if($.cookie('ssSkinType')=='spaceaurora') {
		goSpaceAurora();
	} else if($.cookie('ssSkinType')=='pokemon') {
		goPokemon();
    } else if($.cookie('ssSkinType')=='minimal') {
        goMinimal();
	} else if($.cookie('ssSkinType')=='left') {
		goLeft();
	} else {
                goNormal();
        }
        if($.cookie('ssCircleType')=='circle') {
            addLoadingImage();
            $('head').append(roundCss);
            $.cookie('ssCircleType','circle',{expires: 5});
            ssCircleType = "circle";
            $('head').append(logoFixCss);
            removeLoadingImage();
        } else {
            addLoadingImage();
            $('#ChatSkinsCircle').remove();
            $.cookie('ssCircleType','square',{expires: 5});
            ssCircleType = "square";
            $('#ChatSkinsLogoFix').remove();
            removeLoadingImage();
        }
        if($.cookie('ssAlignType')=='left') {
            addLoadingImage();
            $('head').append(leftCss);
            $.cookie('ssAlignType','left',{expires: 5});
            ssAlignType = "left";
            removeLoadingImage();
        } else {
            addLoadingImage();
            $('#ChatSkinsLeft').remove();
            $.cookie('ssAlignType','right',{expires: 5});
            ssAlignType = "right";
            removeLoadingImage();
        }
}, 1000);
console.log("Chat skins intitialized.");
$('.ChatWindow').attr('id','ChatWindow');
$('#ChatHeader > h1.public.wordmark > a').remove();

// Variable declarations

// Styles
var leftCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:LeftChat.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLeft"/>';
var roundCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Round.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsCircle"/>';
var logoFixCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:LogoBackgroundFix.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLogoFix"/>';
var fallCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Autumn.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var summerCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Summer.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var winterCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var nightCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Night.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var springCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Spring.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var clearCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>';
var spaceauroraCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:SpaceAurora.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var pokemonCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Oras.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var minimalCss = '<link href="http://d97.wikia.com/index.php?title=MediaWiki:Minimal.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';

// Variables
var ssSkinType = 'fall';
var ssCircleType = 'circle';
var ssAlignType = 'right';

// Assets
var loadingImage = '<img src="https://images.wikia.nocookie.net/__cb20140916212923/animalcrossing/images/0/07/Loading_icon_128px.GIF" id="LoadingIcon" style="position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); opacity:0.1;" />'

// Logos
var logohtmlDay = '<a href="/wiki/Animal_Crossing_Wiki" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="https://images.wikia.nocookie.net/__cb20130512211940/animalcrossing/images/thumb/8/89/Wiki-wordmark.png/115px-Wiki-wordmark.png" id="HeaderLogoImg"></a>'
var logohtmlNight = '<a href="/wiki/Animal_Crossing_Wiki" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png" id="HeaderLogoImg"></a>'
var logohtmlYellow = '<a href="/wiki/Animal_Crossing_Wiki" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="https://images.wikia.nocookie.net/__cb20140919191135/d97/images/f/f9/Wordmark_yellow.png" id="HeaderLogoImg"></a>'


function addLoadingImage() {
    $('body').append(loadingImage);
}

function removeLoadingImage() {
    $('#LoadingIcon').remove();
}

// Prevent message from sending
function unKey(that) {
	$(that).unbind('keypress').val('');
}

// Inline alerts
function inlineAlert(text) {
	mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} ));
}

// Switch to normal skin - change every season change
function goNormal() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'fall';
	$('head').append(fallCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','',{expires: 5});
        removeLoadingImage();
}
// Switch to fall skin
function goFall() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'fall';
	$('head').append(fallCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','fall',{expires: 5});
        removeLoadingImage();
}
// Switch to spring skin
function goSpring() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'spring';
	$('head').append(springCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','spring',{expires: 5});
        removeLoadingImage();
}
// Switch to night skin
function goNight() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'night';
	$('head').append(nightCss);
        $('#ChatHeader').append(logohtmlNight);
	$.cookie('ssSkinType','night',{expires: 5});
        removeLoadingImage();
}
// Switch to summer skin
function goSummer() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'summer';
	$('head').append(summerCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','summer',{expires: 5});
        removeLoadingImage();
}
// Switch to left skin
function goLeft() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'left';
	$('head').append(roundCss);
	$('head').append(leftCss);
	$.cookie('ssSkinType','left',{expires: 5});
        removeLoadingImage();
}
// Switch to winter skin
function goWinter() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'winter';
	$('head').append(winterCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','winter',{expires: 5});
        removeLoadingImage();
}
// Switch to aurora skin
function goSpaceAurora() {
        addLoadingImage();
	clearOld();
	$('head').append(clearCss);
	$('head').append(spaceauroraCss);
        $('#ChatHeader').append(logohtmlNight);
	ssSkinType = 'spaceaurora';
	$.cookie('ssSkinType','spaceaurora',{expires: 5});
        removeLoadingImage();
}
// Switch to ORAS skin
function goPokemon() {
        addLoadingImage();
	clearOld();
	$('head').append(clearCss);
	$('head').append(pokemonCss);
        $('#ChatHeader').append(logohtmlYellow);
	ssSkinType = 'pokemon';
	$.cookie('ssSkinType','pokemon',{expires: 5});
        removeLoadingImage();
}
// Switch to minimal skin
function goMinimal() {
        addLoadingImage();
	clearOld();
	ssSkinType = 'minimal';
	$('head').append(minimalCss);
        $('#ChatHeader').append(logohtmlDay);
	$.cookie('ssSkinType','minimal',{expires: 5});
        removeLoadingImage();
}
// Reset page for new skin
function clearOld() {
        addLoadingImage();
	$('#skinBackground').remove();
	$('#ChatSkins').remove();
        $('#ChatSkinsAdditional').remove();
        $('#ChatSkinsTransparent').remove();
        $('#HeaderLogo').remove();
        removeLoadingImage();
}

// Adding a dropdown menu

if (!$(".stylechanger").length) { 
    $('#Rail').prepend('<select name="style" class="stylechanger" onchange="report(this.value)"> <option value="default">Style switcher</option><option value="normal">Default theme</option><option value="spring">Spring</option><option value="summer">Summer</option><option value="autumn">Autumn</option><option value="winter">Winter</option><option value="night">Night</option><option value="aurora">Aurora</option><option value="pokemon">Pokémon ORAS</option></select><div class="circles-div" onclick="circleToggle()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="circle-button wikia-button"> Circle </a></div><div class="align-div" onclick="alignToggle()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="align-button wikia-button"> Align </a></div>');
}

// Style changer
function report(styleswitch) {
  if (styleswitch=="default") {
    return;
  } else if (styleswitch=="autumn") {
    clearOld();
    goFall();
  } else if (styleswitch=="summer") {
    clearOld();
    goSummer();
  } else if (styleswitch=="winter") {
    clearOld();
    goWinter();
  } else if (styleswitch=="spring") {
    clearOld();
    goSpring();
  } else if (styleswitch=="night") {
    clearOld();
    goNight();
  } else if (styleswitch=="aurora") {
    clearOld();
    goSpaceAurora();
  } else if (styleswitch=="pokemon") {
    clearOld();
    goPokemon();
  } else if (styleswitch=="minimal") {
    clearOld();
    goMinimal();
  } else if (styleswitch=="normal") {
    clearOld();
    goNormal();
  } 
}

// Circle toggler
function circleToggle() {
  if (ssCircleType=="circle") {
    addLoadingImage();
    $('#ChatSkinsCircle').remove();
    $('head').append(logoFixCss);
    $.cookie('ssCircleType','square',{expires: 5});
    ssCircleType = "square";
    removeLoadingImage();
  } else {
    addLoadingImage();
    $('#ChatSkinsLogoFix').remove();
    $('head').append(roundCss);
    $.cookie('ssCircleType','circle',{expires: 5});
    ssCircleType = "circle";
    removeLoadingImage();
  }
}

// Alignment toggler
function alignToggle() {
  if (ssAlignType=="left") {
    addLoadingImage();
    $('#ChatSkinsLeft').remove();
    $.cookie('ssAlignType','right',{expires: 5});
    ssAlignType = "right";
    removeLoadingImage();
  } else {
    addLoadingImage();
    $('head').append(leftCss);
    $.cookie('ssAlignType','left',{expires: 5});
    ssAlignType = "left";
    removeLoadingImage();
  }
}


// easter egg

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {
  kkeys.push( e.keyCode );
  if ( kkeys.toString().indexOf( konami ) >= 0 ) {
    $(document).unbind('keydown',arguments.callee);    
    goMinimal();  
  }
});

// END styleswitcher