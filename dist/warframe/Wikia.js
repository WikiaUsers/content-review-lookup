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

/* An0num0us Sortie Count Down */
(function(Counter) {
    'use strict';
 
    var sortieCounter = new Counter();
    sortieCounter.setResetTime(16);
    sortieCounter.setDisplayElement('.countDownSortie');
    sortieCounter.init();
 
})( function() {
 
    this.resetTime = 0;
    this.displayElement = '';
    this.timeLeft = 0;
 
    this.setResetTime = function(resetTime) {
        this.resetTime = resetTime;
    }
 
    this.setDisplayElement = function(displayElement) {
        this.displayElement = document.querySelector(displayElement);
    }
 
    this.recalculateTime = function() {
        if( new Date().getUTCHours() >= this.resetTime ) {
            this.timeLeft = (24 + this.resetTime) * 3600 - new Date().getUTCHours() * 3600 - new Date().getUTCMinutes() * 60 - new Date().getUTCSeconds();
        } else {
            this.timeLeft = this.resetTime * 3600 - new Date().getUTCHours() * 3600 - new Date().getUTCMinutes() * 60 - new Date().getUTCSeconds();
        }
    }
 
    this.formatTime = function() {
        var formattedTime = [
            Math.floor( this.timeLeft / 3600 ),
            '',
 
            Math.floor( this.timeLeft / 60 % 60 ),
            '',
 
            Math.floor( this.timeLeft % 60 ),
            'seconds',
        ];
 
        if( formattedTime[0] === 1 ) { 
            formattedTime[1] = 'hour'; 
        } else { 
            formattedTime[1] = 'hours'; 
        }
 
        if( formattedTime[2] === 1 ) { 
            formattedTime[3] = 'minute'; 
        } else { 
            formattedTime[3] = 'minutes'; 
        }
 
        return formattedTime.join(' ');
    },
 
    this.displayTime = function() {
        this.displayElement.innerHTML = this.formatTime();
    }
 
    this.countDown = function() {
        this.recalculateTime();
        this.displayTime();
 
        setTimeout(function() {
            this.countDown();
        }.bind(this), 1000);
    }
 
    this.init = function() {
        if( this.displayElement ) {
            this.countDown();
        }
    }
 
} );

//Pagewide collapse/expand collapsibles
$(function() {
//collapse all
    $('#collapse-global-hide').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'none\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-expanded\').addClass(\'mw-collapsible-toggle-collapsed\')">Collapse All</a>');
//expand all
    $('#collapse-global-show').html('<a class="wikia-button" onclick="$(\'.mw-collapsible-content\').css(\'display\', \'\') ; $(\'.mw-collapsible-toggle\').removeClass(\'mw-collapsible-toggle-collapsed\').addClass(\'mw-collapsible-toggle-expanded\')">Expand All</a>');
});

// Temporary fix for Slideshow Gallery not being able to be clicked on and activate Lightbox
$(".wikia-slideshow-images-wrapper img.thumbimage").wrap("<a class='image lightbox'></a>");
$(".wikia-slideshow-images-wrapper a.wikia-slideshow-image" ).remove();