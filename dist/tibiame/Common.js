/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
	/* Outfitter */
	if (mw.config.get('wgPageName') === 'Outfitter') {
    	importArticles({
        	type: 'script',
        	articles: ['MediaWiki:Outfitter.js']
	    });
    	importArticles({
        	type: 'style',
        	articles: ['MediaWiki:Outfitter.css']
	    });
	}
	/* End of Outfitter */

	/* Mapper */
	if (mw.config.get('wgPageName') === 'Mapper' || $('a[href*="/wiki/Mapper"]').length) {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:Mapper.js'
	    });
	}
	/* End of Mapper */

	/* Load /wiki/Creature_Ranks.css */
	importArticles({
	    type: 'style',
	    article: 'MediaWiki:CreatureRanks.css'
	});
	/* end of Load /wiki/Creature_Ranks.css */
});

/* Template:DynamicGallery */
$(function () {
	if (document.getElementById("gallery_list")) {
		importArticles({
			type: 'script',
			article: 'MediaWiki:DynamicGallery.js'
	    });
	}
});

/* custom spoiler toggle (used by [[Template:Infobox Achievement]]) */

function custom_spoiler() {

    var button = document.createElement('button'); //define variable button

    button.appendChild(document.createTextNode("Show/Hide spoiler")); //add text to this button

    $(".custom_spoiler_button").append(button).click(function () {

        $(".custom_spoiler_content").toggle('slow');

    });

}

if (mw.config.get('wgAction') === 'view' || mw.config.get('wgAction') === 'submit' || mw.config.get('wgAction') === 'purge') {

    $(custom_spoiler);

}

/* end of custom spoiler toggle */

/* Cookies */
function setCookie(name, value, offset) {
    var time;
    if (offset === undefined) {
        offset = 1000 * 60 * 60 * 365 * 10;
    }
    time = new Date(+new Date() + offset);
    document.cookie = name + "=" + value + (offset ? "; expires=" + time.toGMTString() : "") + "; path=/";
}

function removeCookie(name) {
    setCookie(name, "", -1);
}

function getCookie(name) {
    var n = name + '=',
        arr = document.cookie.split(';'),
        i, len, cookie;
    for (i = 0, len = arr.length; i < len; i += 1) {
        cookie = arr[i];
        // trim leading spaces
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(n) === 0) {
            return cookie.substring(n.length, cookie.length);
        }
    }
    return null;
}

(function () {
    /* Settings */
    if (mw.config.get('wgPageName') === 'TibiaME Wiki:Settings') {
        $(function () {
            var html = '';
            // Cookie: TW_showcontent
            html += 'Hidden content?';
            html += '<select id="set-showcontent">';
            html += '<option value="-1">(no change)</option>';
            html += '<option value="0">Hide</option>';
            html += '<option value="1">Show</option>';
            html += '</select>';
            $('#tw-settings').append(html);
            // Change settings
            $("#set-showcontent").change(function (e) {
                if (this.value === "-1") {
                    return;
                }
                setCookie("TW_showcontent", this.value);
            });
        });
    }
}());

(function () {
    /* Run commands (that require cookies/JS) */
    var commands, cmd;
    commands = {
        'showhide-content': function setupContentHider(e) {
            var $e = $(e), $ch = $e.children(), userSetting = !!parseInt((getCookie("TW_showcontent") || "0"), 10);
            function toggleVisibility() {
                if ($e.data("showhide-value") === "hidden") {
                    $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
                } else {
                    $e.addClass("showhide-hidden").removeClass("showhide-visible").data("showhide-value", "hidden");
                }
            }
            $ch.each(function () {
                var $this = $(this);
                if ($this.data("showhide-element") === "header") {
                    $this.click(toggleVisibility);
                    return false;
                }
            });
            // Confirmed: JS enabled, remove showhide init class
            $e.removeClass("showhide-init");
            // User has opted to show the hidden content
            if (userSetting) {
                $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
            }
        }
    };
    cmd = $('.tw-cmd');
    if (cmd.length) {
        cmd.each(function () {
            var cmd = this.getAttribute('data-command');
            if (cmd && typeof commands[cmd] === 'function') {
                commands[cmd](this);
            }
        });
    }
}());