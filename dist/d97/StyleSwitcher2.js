// Necessary for debug purposes

if (typeof stylesheetsArray === 'undefined') {
    console.log("[STYLE] ERROR: No styles defined!");
}

if (typeof ssDefaultSkin === 'undefined') {
    console.log("[STYLE] ERROR: No default skin defined! Setting to 0");
    var ssDefaultSkin = 0;
}

var ssCircleType = "square";
var ssAlignType = "right";
var styleSwitcherLoaded = 0;

// $("#Rail > h1.public.wordmark").css("margin-top","32px"); // Clears space for the buttons

$('.ChatWindow').attr('id','ChatWindow'); // Adds an ID to the chat window. Necessary for background changing

var defaultLogoUrl = $("#ChatHeader > h1.public.wordmark > a > img").attr("src"); // Grabs normal logo

if ($.cookie("ssSkinType") == null) {
    if (typeof ssDefaultSkin != "undefined") {
        var ssSkinType = ssDefaultSkin;
    } else {
        console.log("[STYLE] ERROR: No default skin defined. Setting skin to 0")
        var ssSkinType = "0";
        var ssDefaultSkin = "0";
    }
} else {
    var ssSkinType = $.cookie("ssSkinType");
}

$('#ChatHeader > h1.public.wordmark > a').remove(); // Removes the default logo

if (!$(".stylechanger").length) { 
    $('#sidebar-top').prepend('<table id="StyleButtons" style="margin-left:auto;margin-right:auto;width:95%;"><tr><td colspan=2 style="text-align:center;"><select name="style" class="stylechanger" style="height:20px !important;" onchange="report(this.value)"><option value="default">Style switcher</option></select></td></tr><tr><td><div class="circles-div" onclick="circleToggle()" style="text-align: center; cursor: pointer;"><a class="circle-button wikia-button" style="width:30px"> Circle </a></div></td><td><div class="align-div" onclick="alignToggle()" style="text-align: center; cursor: pointer;"><a class="align-button wikia-button" style="width:30px"> Align </a></div></td></tr></table>');
}

// Adds the dropdown menu to the rail.

if (styleSwitcherLoaded==0){
    for (i=0; i < stylesheetsArray.length; i++) {
        $(".stylechanger").append("<option value='"+String(i)+"'>"+stylesheetsArray[i].name+"</option>");
    }
    styleSwitcherLoaded = 1;
}

// Adds the styles to the dropdown.

function report(styleIDtext) {
    if (styleIDtext!="default") {
        styleID = parseInt(styleIDtext); //Gets the ID of the selected style
	    $('#skinBackground').remove(); //Removes old style
	    $('#ChatSkins').remove(); //Removes old style
        $('#ChatSkinsAdditional').remove(); //Removes old style
        $('#ChatSkinsTransparent').remove(); //Removes old style
        $('#HeaderLogo').remove(); //Removes old style
        ssSkinType = stylesheetsArray[styleID].name; //Sets page variable ssSkinType to the new skin
        $.cookie('ssSkinType',styleID,{expires: 5}); //Sets cookie ssSkinType to the new skin ID

        if (stylesheetsArray[styleID].clear == true) {
             $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
        }

        $('head').append('<link href="'+stylesheetsArray[styleID].url+'" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
        if (stylesheetsArray[styleID].logo != null) {
            $('#ChatHeader').append('<a href="'+wgServer+'" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="'+stylesheetsArray[styleID].logo+'" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
        } else {
            $('#ChatHeader').append('<a href="'+wgServer+'" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="'+defaultLogoUrl+'" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
        }
    } else {
        styleID = parseInt(ssDefaultSkin); //Gets the ID of the default skin
	    $('#skinBackground').remove(); //Removes old style
	    $('#ChatSkins').remove(); //Removes old style
        $('#ChatSkinsAdditional').remove(); //Removes old style
        $('#ChatSkinsTransparent').remove(); //Removes old style
        $('#HeaderLogo').remove(); //Removes old style
        ssSkinType = stylesheetsArray[styleID].name; //Sets page variable ssSkinType to the new skin
        $.cookie('ssSkinType',styleID,{expires: 5}); //Sets cookie ssSkinType to the new skin ID

        if (stylesheetsArray[styleID].clear == true) {
             $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
        }

        $('head').append('<link href="'+stylesheetsArray[styleID].url+'" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
        if (stylesheetsArray[styleID].logo != null) {
            $('#ChatHeader').append('<a href="'+wgServer+'" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="'+stylesheetsArray[styleID].logo+'" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
        } else {
            $('#ChatHeader').append('<a href="'+wgServer+'" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="'+defaultLogoUrl+'" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
        }
    }
}

// Circle toggler
function circleToggle() {
  if (ssCircleType=="circle") {
    $('#ChatSkinsCircle').remove();
    $.cookie('ssCircleType','square',{expires: 5});
    ssCircleType = "square";
  } else {
    $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:Round.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsCircle"/>');
    $.cookie('ssCircleType','circle',{expires: 5});
    ssCircleType = "circle";
  }
}
 
// Alignment toggler
function alignToggle() {
  if (ssAlignType=="left") {
    $('#ChatSkinsLeft').remove();
    $.cookie('ssAlignType','right',{expires: 5});
    ssAlignType = "right";
    $("a.align-button").text("Left");
  } else {
    $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:LeftChat.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLeft"/>');
    $.cookie('ssAlignType','left',{expires: 5});
    ssAlignType = "left";
    $("a.align-button").text("Right");
  }
}

// Loader for cookied skin

report(ssSkinType); 

if ($.cookie("ssAlignType") == "left") {
    alignToggle();
}

if ($.cookie("ssCircleType") == "circle") {
    circleToggle();
}

// Finalise

console.log("[STYLE] Loaded StyleSwitcher version 2.0.2.4");