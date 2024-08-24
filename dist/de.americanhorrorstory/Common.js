/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.UserTagsJS = {
    modules: {},
    tags: {
        Gagahs: { u:'Misty Day' },
    }
};

 
UserTagsJS.modules.custom = {
	'Gagahs': ['Gagahs']
};

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* Spoiler tag + buttons */
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').html('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').html('Show Spoilers');
    }
});
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'Klicke, um den Spoiler zu zeigen');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'Klicke, um den Spoiler zu zeigen');
    });
};
$('.spoiler.on').each(spoilerConfig);

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
// - end - RailWAM
 
// ** Recent Wiki Activity and Recent changes auto refresh ** //
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];
// - end - Auto-refresh



(function(d, t, e, m){
    
    // Async Rating-Widget initialization.
    window.RW_Async_Init = function(){
                
        RW.init({
            huid: "402430",
            uid: "bfcd525c2758072904227b57ebe8c274",
            source: "website",
            options: {
                "advanced": {
                    "layout": {
                        "lineHeight": "24px"
                    },
                    "font": {
                        "size": "16px"
                    },
                    "text": {
                        "rateThis": "Bewerten",
                        "like": "Mag ich",
                        "dislike": "Mag ich nicht"
                    }
                },
                "size": "large",
                "lng": "de",
                "style": "christmas",
                "isDummy": false
            } 
        });
        RW.render();
    };
        // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0], id = "rw-js",
        l = d.location, ck = "Y" + t.getFullYear() + 
        "M" + t.getMonth() + "D" + t.getDate(), p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
    if (d.getElementById(id)) return;              
    rw = d.createElement(e);
    rw.id = id; rw.async = true; rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
    }(document, new Date(), "script", "rating-widget.com/"));