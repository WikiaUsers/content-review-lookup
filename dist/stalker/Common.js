/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// BEGIN Template:Games
// ============================================================

function addTitleGames()
{
    var titleDiv = document.getElementById("title-games");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

$( addTitleGames );

// ============================================================
// END Template:Games
// ============================================================

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// ============================================================
// BEGIN demo widgets
// ============================================================

addWidgets = function() {
   var widgets = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
   for(var i = 0; i < widgets.length; i++){
      widgets[i].innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='300' height='250' align='middle' id='wikia_widget'><param name='allowScriptAccess' value='always' /><param name='movie' value='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' /><param name='quality' value='high' /> <param name='wmode' value='transparent' /><embed src='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' FlashVars='backgroundColor=000000&backgroundImage=&borderColor=92947c&dropShadow=on&headerColor=92947c&headerAlpha=.05&headerBorderColor=000000&headline1=The Vault presents&headline1Color=CCCCCC&headline2=Most Wanted DLC Items&headline2Color=FFFFFF&clickURL=http://fallout.wikia.com&wikiURLColor=FFFFFF&wikiaLogoColor=FFFFFF&type=slideshow&slideshowImages=https://images.wikia.nocookie.net/fallout/images/8/8b/Widget_Auto-Axe.png,https://images.wikia.nocookie.net/fallout/images/f/ff/Widget_Gauss-Rifle.png,https://images.wikia.nocookie.net/fallout/images/6/6f/Widget_WidPower-Armor.png,https://images.wikia.nocookie.net/fallout/images/1/1c/Get_Shock-Sword.png&=Preview images in the widget&' quality='high' wmode='transparent' width='300' height='250' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' name='wikia_widget' /></object>";
   }
}

$(addWidgets);

// ============================================================
// END demo widgets
// ============================================================