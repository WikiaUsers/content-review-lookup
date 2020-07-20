/* Brizingr5: WeaponInfobox */
var Infobox_x = false;

$('.Infobox_Parent').mouseenter(function () {
    if (Infobox_x === false) {
        $('.Infobox_Collapsible').css('height', '24px');
        $('.Infobox_Collapsible').css('margin-bottom', '2px');
    }
});

$('.Infobox_Parent').mouseleave(function () {
    if (Infobox_x === false) {
        $('.Infobox_Collapsible').css('height', '0px');
        $('.Infobox_Collapsible').css('margin-bottom', '0px');
    }
});

$('.Infobox_Parent').click(function () {
    if (Infobox_x === false) {
        Infobox_x = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (Infobox_x === true) {
        Infobox_x = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});
/* END Brizingr5: Infobox */

/* START Emailformygames : Collapsible Infoboxes */
var einfobox_clicked = false;

$('.einfobox').mouseenter(function () {
    if (einfobox_clicked === false) {
        $('.einfobox_collapsible').css('display', 'table-row');
    }
});

$('.einfobox').mouseleave(function () {
    if (einfobox_clicked === false) {
        $('.einfobox_collapsible').css('display', 'none');
    }
});

$('.einfobox').click(function () {
    if (einfobox_clicked === false) {
        einfobox_clicked = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (einfobox_clicked === true) {
        einfobox_clicked = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});

/*Unused Files bits*/
/*This creates a text list for use with Autowikibrowser for deletion*/
/*This first one is for unused image and sound files */
if (mediaWiki.config.get("wgPageName") === "Special:UnusedFiles") {
    $(function () {
        var str = "";
        $('.gallerytext > a').each(function () {
            str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
        });
        var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
        $textarea.val(str);
        $('.gallery').before($textarea);
    });
}

/*This one is for unused video files */
if (mediaWiki.config.get("wgPageName") === "Special:UnusedVideos") {
    $(function () {
        var str = "";
        $('.gallerytext > a').each(function () {
            str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
        });
        var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
        $textarea.val(str);
        $('.gallery').before($textarea);
    });
}

/*This one is for category files */
if (mediaWiki.config.get("wgPageName") === "Category%3ADiorama_Photos") {
    $(function () {
        var str = "";
        $('.gallerytext > a').each(function () {
            str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
        });
        var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
        $textarea.val(str);
        $('.gallery').before($textarea);
    });
}


/* Mini Mouse hover bits */

//Mouse X coordinate
var mouseX;
//Mouse Y coordinate
var mouseY;
//If the mouse moves, update the coordinates
$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});  
//We have a class that if we move the mouse over
$(".nepeta").mouseover(function(){
  //this is our div line. If you mouse over the class
  //show this div if you want
  //based on our coordinates $('#leaf').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
});

/************ AÑADIDO 09.03.2018  ***************/
/* Any JavaScript here will be loaded for all users on every page load. */
/* Please don't change without Admin's permission. That means another Admin, not just you. */
 
window.HCScripts = {};
HCScripts.__import = function(resources){
    var res = { scripts: [], styles: [] };
    for (var i = 0, len = resources.length; i < len; i++){
        var resource = resources[i],
            isJS = resource.endsWith('.js'),
            isCSS = resource.endsWith('.css');
        if (isJS){
            res.scripts[res.scripts.length] = resource;
        } else if (isCSS){
            res.styles[res.styles.length] = resource;
        } else {
            continue;
        }
    }
    importArticles(
        { type: 'script', articles: res.scripts },
        { type: 'style', articles: res.styles }
    );
};
HCScripts.__importLocalScripts = function(resources){
    resources = resources.filter(function(resource){
        return !(/^(?:w\:c\:|u\:)(.*)/.test(resource));
    });
    this.__import(resources);
};
HCScripts.__importFromBase = function(resources, base){
    resources = resources.filter(function(resource){
        return !(/^(?:w\:c\:|u\:)(.*)/.test(resource));
    }).map(function(resource){
        return base + resource;
    });
    this.__importLocalScripts(resources);
};
HCScripts.__importFromBase(['news.js', 'rfa.js', 'modal.js', 'clock.js', 'slideshow.js'], 'MediaWiki:Wikia.js');