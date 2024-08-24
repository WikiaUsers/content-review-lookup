/* Brizingr5: WeaponInfobox */
var Infobox_x = false;

$('.Infobox_Parent').mouseenter(function () {
    if (Infobox_x == false) {
        $('.Infobox_Collapsible').css('height', '24px');
        $('.Infobox_Collapsible').css('margin-bottom', '2px');
    }
});

$('.Infobox_Parent').mouseleave(function () {
    if (Infobox_x == false) {
        $('.Infobox_Collapsible').css('height', '0px');
        $('.Infobox_Collapsible').css('margin-bottom', '0px');
    }
});

$('.Infobox_Parent').click(function () {
    if (Infobox_x == false) {
        Infobox_x = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (Infobox_x == true) {
        Infobox_x = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});
/* END Brizingr5: Infobox */

/* START Emailformygames : Collapsible Infoboxes */
var einfobox_clicked = false;

$('.einfobox').mouseenter(function () {
    if (einfobox_clicked == false) {
        $('.einfobox_collapsible').css('display', 'table-row');
    }
});

$('.einfobox').mouseleave(function () {
    if (einfobox_clicked == false) {
        $('.einfobox_collapsible').css('display', 'none');
    }
});

$('.einfobox').click(function () {
    if (einfobox_clicked == false) {
        einfobox_clicked = true;
        $('.Infobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
        return;
    }
    if (einfobox_clicked == true) {
        einfobox_clicked = false;
        $('.Infobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
        return;
    }
});

/*Section pour les fichiers inutilisés*/
/*Permet de créer une liste pour les gérer par la suite*/
/*Ce premier bout de script correspond aux images et fichiers sons intulisés */
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
/*Celui-ci correspond fichiers video intulisés */
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
/*Celui-ci correspond catégories de fichiers */
if (mediaWiki.config.get("wgPageName") === "Catégorie%3ADiorama_Photos") {
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


//Pagewide collapse/expand collapsibles

$(function () {
    //collapse all
    $('#collapse-global-hide').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'none\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-expanded\').addClass(\'mw-collapsible-toggle-collapsed\')">Collapse All</a>');
    //expand all
    $('#collapse-global-show').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-collapsed\').addClass(\'mw-collapsible-toggle-expanded\')">Expand All</a>');
});