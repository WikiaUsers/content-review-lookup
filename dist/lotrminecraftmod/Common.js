/* Any JavaScript here will be loaded for all users on every page load. */

//TODO: Organise names, maybe collect all names in an array to reduce code redundancy

  //***************************************************\\
 //***Admin, mod, and Temp Mod Post Colours for Forums and Message Walls***\\
//*******************************************************\\
(function() {
    var border_admin = "6px double ";//+color
    var background_admin = "rgba(216, 180, 88, 0.85) url('https://images.wikia.nocookie.net/__cb20140625215453/lotrminecraftmod/images/0/03/Admin1_120.png') bottom center no-repeat";
    var admins = [
        {name: "Thorin11", color:"#A7B200"},
        {name: "Gen._Grievous1138", color:"#DC143C"},
        {name: "Areades", color:"#81BEF7"},
        {name: "Beijing1000", color:"#136613"},
        {name: "Glflegolas", color:"#387C44"},
        {name: "Quipp", color:"#00CCFF"},
        {name: "SamwiseFilmore", color:"#D07130"},
        {name: "Glaerdir", color:"#F962A5"},
        {name: "Thorin_Stonehelm", color:"#0078FF"},
        {name: "EpicSpacePanda", color:"#0EC79F"},
        {name: "MilkMC", color:"#3333FF"},
        {name: "CaptCaptain", color:"#00CCFF"}          // FB mod, same colour as Quipp!!
    ];
    
    var border_mod = "2px solid ";//+color
    var background_mod = "rgba(214, 188, 136, 0.85) url('https://images.wikia.nocookie.net/__cb20141205133613/lotrminecraftmod/images/d/d1/Mod.png') bottom center no-repeat";
    var mods = [
        {name: "Seb_TheDunlending", color:"#49C71E"},    // FB mod
        {name: "Smaug_the_Tyrannical", color:"#CCAC00"},
        {name: "Commandogregor1234", color:"#BD33A4"},
        {name: "Ffets", color:"#C4E838"},
        {name: "Special_Elf_Friend", color:"#00CED1"},
        {name: "Narvin", color:"#24A0D0"},
        {name: "High_Prince_Imrahil", color:"#5C8AE6"},
        {name: "GandalftheTurquoise", color:"#00CED1"},
        {name: "War_Pig1237", color:"#0099CC"},
        {name: "Arantoer", color:"#4AA02C"},
        {name: "AlteOgre", color:"#669900"},
        {name: "High_King_Ithilion", color:"#3F00FF"},
        {name: "LysurusPeriphragmoides789", color:"#c63d00"},
        {name: "Recneps", color:"#8B008B"},
        {name: "Gorbag12", color:"#000000"},
        {name: "Dinopizzagamer", color:"#8FBC8F"},
        {name: "Catfishperson", color:"#13A005"},
        {name: "Rayn_Turammarth", color:"#00AF9B"},
        {name: "Adaneth_Mirim%C3%AB", color:"#9370DB"}
    ];
    
    var background_tempmod = "rgba(205, 192, 176, 0.66) url('https://vignette.wikia.nocookie.net/lotrminecraftmod/images/b/b2/Temp_mod_tag_3.png/revision/latest?cb=20150605193955') bottom center no-repeat";
    var tempmods = [
        {name:"TomtheBom"},
        {name:"Rocket_Engineer"},
        {name:"GimliBurper"}
    ];
    
    function get_filter(profile) {
        return eval("(function() {return $(this).has(\"a[href$=':"+profile.name+"']\").length;})");
    }
    
    var avatars = $('.speech-bubble-avatar');
    
    (function(){
        var mevans = {name: "LOTRMod", color:"#B55A15"};
        avatars.filter(get_filter(mevans)).next().css({
            background: "rgb(216, 180, 88) url('https://images.wikia.nocookie.net/__cb20141225003527/lotrminecraftmod/images/thumb/4/4e/Modcreator.png/250px-Modcreator.png') bottom center no-repeat",
            padding: '10px',
            border: border_admin+mevans.color
        });
        avatars.filter(get_filter(mevans)).next().addClass('admin');
    })();
    
    var i;
    for (i in admins) {
        var admin = admins[i];
        avatars.filter(get_filter(admin)).next().css({
            background: background_admin,
            padding: '10px',
            border: border_admin+admin.color
        });
        avatars.filter(get_filter(admin)).next().addClass('admin');
    }
    for (i in mods) {
        var mod = mods[i];
        avatars.filter(get_filter(mod)).next().css({
            background: background_mod,
            padding: '10px',
            border: border_mod+mod.color
        });
        avatars.filter(get_filter(mod)).next().addClass('mod');
    }
    for (i in tempmods) {
        var tempmod = tempmods[i];
        avatars.filter(get_filter(tempmod)).next().css({
            background: background_tempmod,
            padding: '10px',
        });
        avatars.filter(get_filter(tempmod)).next().addClass('tempmod');
    }
})();

// OTHER CODE //

/* Makes all quotes collapsible by default, excluding the first line.
 */
var quote = $('.quote:not(.customquote)');
quote.addClass("mw-collapsible mw-collapsed");
quote.each(function() {
    $(this).html(
        $(this).html().replace(
            /^(.* wrote:(?:\n|<br>))([\s\S]*)$/m,
            // [\s\S] = whitespace or non-whitespace = match all ~= [.\n]
            '$1<span class="mw-collapsible-content">$2</span>'
        )
    );
});

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName) {
    $(".insertusername").text(wgUserName);
}

// EXTERNAL SCRIPTS
importArticles({
    type: "script",
    articles: [
        // File Deletion
        "u:dev:ListFiles/code.js",
        "u:dev:AjaxBatchDelete/code.2.js",
        // AJAX Recent Changes Refresh
        "w:c:dev:AjaxRC/code.js"
    ]
});

/* Ajax-refresh button config options */
ajaxPages = ["Special:Contributions","Special:Log","Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:AbuseLog"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// Pre-sorted tables
// Any sortable table with the class "sorted" will be presorted by
// its first column, descending
$(function() {
    setTimeout(function() {
        $("table.article-table.sortable.sorted .headerSort:first-child").click();
    }, 0);
});

// Shuffle servers
if(mw.config.get('wgPageName') == 'Servers'){
    var $servers = $("#lotr-serverlist > tbody > tr");
    var count = $servers.length;
    var rows = [];
    for(var i = 1; i <= count; i++){
        $servers.eq(i).attr("id", i);
        rows.push(i);
    }
    var randrows = rows;
    randrows.sort(function() { return 0.5 - Math.random(); });
    for(var i = 1; i <= count; i++){
        if(randrows[i] != i){
            $("#"+i).insertBefore($("#"+randrows[i]));
        }
    }
}

/* This script adds "&format=original" to the end of Wikia image addresses in articles to load the original PNG/JPG etc. forms instead of the WEBP versions.  Excludes avatars & sprites such as the edit pencil, and only applies to article content. */
//Infobox images
$(".pi-image-thumbnail").each(function(){ 
    var srcsetvar = $(this).attr("srcset");
    var srcarray = srcsetvar.split(" ");
    $(this).attr("srcset", srcarray[0]+"&format=original");
});
//Article Images
$(".WikiaArticle img:not('.avatar, .sprite, .forum-user-avatar, .wds-avatar__image')").on("load", function(){
    var srcvar = $(this).attr("src");
    if(srcvar && !srcvar.endsWith("format=original") && (srcvar.startsWith("https://vignette.wikia.nocookie.net") || srcvar.startsWith("https://images.wikia.nocookie.net"))){
        if(srcvar.includes("?")) {
            $(this).attr("src", srcvar+"&format=original");
        } else {
            $(this).attr("src", srcvar+"?format=original");
        }
    }
}).each(function() {
  if(this.complete) { //imágenes en caché
      $(this).trigger("load");
  }
});
 

  //********************************************\\
 //** Worldmap (Template:MiddleEarthMap) [WIP] **\\
//************************************************\\

var maps = document.getElementsByClassName("worldmap");
for (var i = 0; i < maps.length; i++) {
    var map = maps[i];
    
/* Doesn't work due to missing CORS for image server :-(

getPixel = function(x, y) {
    var p = canvas.context.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);  
    return hex;
}

rgbToHex = function(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

    var img = document.createElement("img");
    img.src = 'https://vignette.wikia.nocookie.net/lotrminecraftmod/images/7/70/MiddleEarth.png/revision/latest?cb=20150605200727';
    img.style.visibility = "hidden";
//    document.body.appendChild(img);

    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style.border = "2px solid red";
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.style.visibility = "hidden";
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    document.body.appendChild(canvas);

alert("debug:" + GetPixel(10, 10));
alert("sucess");
*/
    
    // The current background-position; usually negative
    map.offX = -500;
    map.offY = -500;
    // The position where the dragging was started
    map.dragX = 0;
    map.dragY = 0;
    // The position to which the background will be moved
    map.newX = 0;
    map.newY = 0;
    // The current zoom level. Higher zoom level means bigger map
    map.zoom = 1.0;
    
    var MAX_ZOOM = 4.0;
    var MIN_ZOOM = 0.2;
    var ZOOM_SPEED = 0.1;
    
    // Called when the mouse cursor is pressed down inside the map
    var dragStart = function(e) {
        e.preventDefault();
        map.dragX = e.clientX;
        map.dragY = e.clientY;
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", update);
        return false;
    }
    // Called when the cursor is released anywhere on the screen.
    // This event is only triggered after a call of dragStart. It stops the listeners for this event and the update event.
    var dragEnd = function(e) {
        e.preventDefault();
        // If the mouse has not moved, it's no drag but a simple click action
        if (map.dragX == e.clientX && map.dragY == e.clientY) {
            var x = Math.floor(e.clientX * map.zoom - map.offX);
            var y = Math.floor(e.clientY * map.zoom - map.offY);
            //alert("Single click at position "+x+"|"+y);
            // TODO: Link to biome page
            document.removeEventListener("mousemove", update);
            document.removeEventListener("mouseup", dragEnd);
            return false;
        }
        map.offX = map.newX;
        map.offY = map.newY;
        document.removeEventListener("mousemove", update);
        document.removeEventListener("mouseup", dragEnd);
        return false;
    }
    // Called whenever the mouse moves while it is dragging the map
    var update = function(e) {
        map.newX = map.offX + e.clientX - map.dragX;
        map.newY = map.offY + e.clientY - map.dragY;
        var newpos = map.newX.toString() + "px " + map.newY.toString() + "px";
        map.style.backgroundPosition = newpos;
    }
    // Called whenever the mousewheel is scrolled while the cursor is inside the map
    var zoom = function(e) {
        e.preventDefault();
        // Delta always is a multiple of 3
        var delta = e.deltaY / 3;
        var old_zoom = map.zoom;
        map.zoom -= delta * (map.zoom / 15);
        // Apply zoom limits
        if (map.zoom < MIN_ZOOM) {
            map.zoom = MIN_ZOOM;
            return false;
        }
        if (map.zoom > MAX_ZOOM) {
            map.zoom = MAX_ZOOM;
            return false;
        }
        var sizeX = 3200 * map.zoom;
        var sizeY = 4000 * map.zoom;
        var newsize = "" + sizeX + "px " + sizeY + "px";
        map.style.backgroundSize = newsize;
        map.offX *= map.zoom / old_zoom;
        map.offY *= map.zoom / old_zoom;
        map.offX += ZOOM_SPEED * map.zoom * delta * (e.clientX - (map.clientWidth / 2));
        map.offY += ZOOM_SPEED * map.zoom * delta * (e.clientY - (map.clientHeight / 2));
        var newpos = "" + map.offX + "px " + map.offY + "px";
        map.style.backgroundPosition = newpos;
        return false;
    }
    // Start the initial event listeners
    map.addEventListener("mousedown", dragStart);
    map.addEventListener("wheel", zoom);
}