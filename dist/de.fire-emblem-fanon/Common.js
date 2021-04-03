/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* ============================= Selector =============================== */
/* Description: Improves the display functionality of content.
   Note: Used for Template:Selector.
   Author: KhangND */
var max = 30; // max number of fields
var containers = $('.sel-container');
var fields = $('.fields');

for (indx = 0; indx < containers.length; indx++) {
    var cur = indx + 1;
    var selector = '#select' + cur;
    $(fields[indx]).attr('id', 'select' + cur);

    //Prepare options
    var options = "";
    for (i = 1; i <= max; i++) {
        text = $(selector + ' #option' + i).text();
        if (text !== '') {
            options += "<option value='" + i + "'>" + text + "</option>";
            $(selector + ' #option' + i).css('display', 'none');
        }
    }

    //Append to container
    $(containers[indx]).append("<select id='selector" + cur + "' onchange='change(" + cur + ")'>" + options + "</select>");
}

//Onchange handler
function change(indx) {
    var selector = '#select' + indx;
    var option = $('#selector' + indx).val();
    for (i = 1; i <= max; i++) {
        if (i != option)
            $(selector + ' #changefield' + i).css('display', 'none');
        else
            $(selector + ' #changefield' + i).css('display', 'block');
    }
}

/* ======================= Gallery spoiler alert ======================== */
/* Description: Display or hide the gallery that contains spoiler.
   Note: Used for Template:Spoiler/Gallery
   Author: KhangND */
var _alert = ".spoiler-alert";
$(_alert).next("div").hide();

$(_alert + " span").click(function() {
    $(this).attr('id') === "y" ?
        $(this).parents(_alert).next("div").fadeIn() :
        $(this).parents(_alert).next("div").hide();
    $(this).parents(_alert).hide();
});


/* ========================== Mono B2T Button =========================== */
/* Description: Creates a back to top button for monobook skin.
   Original author: Noemon from dev.wikia.com (oasis skin). */
var startPos = 600;
var scrollSpeed = 500;

if (skin == 'monobook') {
    $('<div />', {
            id: 'b2t-btn',
            class: 'b2t-btn',
            title: 'Back to Top',
            style: 'position: fixed; z-index: 9999; bottom: 15px; left: 15px',
            text: '>'
        })
        .appendTo('#column-one');

    $("#b2t-btn").hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > startPos)
            $('#b2t-btn').fadeIn();
        else
            $('#b2t-btn').fadeOut();
    });
}

$('#b2t-btn').click(function() {
    $('body, html').animate({
        scrollTop: 0
    }, scrollSpeed);
    return false;
});


/* ====================================================================== */

/* Add a custom button to the edit toolbar */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/fireemblem/images/c/c8/Button_redirect.png/revision/latest?cb=20090312204241",
        "speedTip": "Redirect",
        "tagOpen": "",
        "tagClose": "",
        "sampleText": "#REDIRECT [[]]"
    }
}