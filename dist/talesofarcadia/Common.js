/* Any JavaScript here will be loaded for all users on every page load. */
// Rating Widget; credit to Merlin Wiki
jQuery(function($) {
        "use strict";

        // Disable on pages without a ratings widget, since it just crashes.
        if (!$('.rw-ui-container').length) return;

        // Async Rating-Widget initialization.
        window.RW_Async_Init = function(){
            RW.init("0e7e491357ad1e8f1bcf333d61ab8074", // WARNING: This key is wiki-specific DO NOT COPY THIS. You must generate your OWN key for each separate wiki to avoid mixing ratings together. Go to http://rating-widget.com/ and generate a user key using the "Get Widget" tool at the bottom.
            {
                advanced: {
                    star: {
                        stars: 10
                    },
                    font: {
                        color: "#bfd1e6"
                    },
                    layout: {
                        align: {
                            hor: "center",
                            ver: "top"
                        },
                        dir: "ltr"
                    }
                },
                size: "medium",
                color: "yellow",
                type: "star"
            });
            RW.render();
        };

        // Append Rating-Widget JavaScript library.
        if (typeof(window.RW) === "undefined"){
            // <div class="rw-js-container"> (Part of the interface contract)
            var rw = document.createElement('div');
            rw.className = 'rw-js-container';
            var rw2 = document.createElement("script");
            rw2.type = "text/javascript";
            rw2.src = "http://js.rating-widget.com/external.min.js?t=js";
            rw.appendChild(rw2);
            document.body.appendChild(rw);
        }
});

/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function(){
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active');
});

/* load audio player for message wall and forums */
if (1201 === wgNamespaceNumber || 2000 === wgNamespaceNumber || 'Forum' === wgCanonicalSpecialPageName) {
    $.getScript('/extensions/OggHandler/OggPlayer.js');
}

/* Template:USERNAME */
$(function () {
    $('.insertusername').text(mw.config.get('wgUserName'));
});

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/* Autocreate user pages */
window.AutoCreateUserPagesConfig = {
            content: {
             2: '{{sub'+'st:autouserpage}}',
             3: '{{autowelcome|<span style="font-family:Trollhunters;">[[User:Merlin_the_Immortal|<span style="color:#454427;">Merlin the Immortal</span>]] [[User_talk:Merlin_the_Immortal|<span style="color:#454427;">﴾Talk Page﴿</span>]]</span>}}',
             1202: false
},
            summary: '<span class="script">Script: Creating profile and talkpage on first edit - automatically by Wiki</script>'
};
function hide(){
	var line = document.getElementsByClassName("mw-changeslist-line");
	for (let i = 0; i < line.length; i++) {
		if (line[i].innerHTML.search("Script: Creating profile and talkpage on first edit - automatically by Wiki") != -1) {
			line[i].classList.add("hidden-script");
		}
	}
	setInterval(function(){
		if (document.getElementsByClassName("mw-rcfilters-ui-filterTagItemWidget")[0] === undefined) {
			var hidden = document.getElementsByClassName("hidden-script");
			for (let i = 0; i < hidden.length; i++) {
				hidden[i].classList.remove("hidden-script");
			}
		}
	},840);
	
}

setTimeout(function(){
	if (document.getElementsByClassName("mw-rcfilters-ui-filterTagItemWidget")[0] !== undefined) {hide()}
},3000);