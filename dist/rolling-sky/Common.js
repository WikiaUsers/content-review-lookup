/* Any JavaScript here will be loaded for all users on every page load. */

/* I moved the code up because it wasn't running at the end of the script. */
/* This code is used to display a tile from the tileset, since the tileset is always updating, it would be inneficent to keep uploading all 1144 tiles to the wiki. */
var allObstacleDisplays;

function replaceObstacleDisplays() {
	function updateObstacleDisplays() {
		allObstacleDisplays = document.querySelectorAll('div[class^="display-obstacle-"]');
		window.requestAnimationFrame(updateObstacleDisplays);
		allObstacleDisplays.forEach(function(e) {
				if (e.classList.contains('displayed')) {return;}
				if (e == null || e == undefined) {return;}
				var split = e.classList[0].split('-');
				var size = 85;
				if (split.length == 4) {
					size = split.pop();
				}
				if (e.classList.contains('ve-ce-paragraphNode')) {
					split[split.length-1] = 'paragraphNode';
				}
				e.innerHTML = '<iframe width="'+size+'" height="'+size+'" src="https://sqdldev.github.io/rolling-sky/tileset/display?tile='+split.pop()+'">';
				e.style.cssText = "display: inline-block; height: max-content;";
			   e.classList.add('displayed');
		});
	}
	window.requestAnimationFrame(updateObstacleDisplays);
}
replaceObstacleDisplays();

/* Username replace feature. Inserts viewing user's name into <span class="insertusername"></span> */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
 
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:NewPagesUser.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});
 
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
(function() {
    if(!$('#WikiaRail').exists()) {
        return;
    }
    $.get('https://services.wikia.com/discussion/2575/threads', function(d) {
        var elements = d._embedded.contributors[0].userInfo.splice(0, 5).map(function(el) {
            return $('<a>', {
                href: mw.util.wikiGetlink('User:' + el.name),
                class: 'wds-avatar-stack__avatar',
                title: el.name
            }).append(
                $('<img>', {
                    class: 'wds-avatar',
                    src: (el.avatarUrl || 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest') + '/scale-to-width-down/30'
                })
            );
        });
        if($('.discussions-module').exists()) {
            $('.discussions-module .wds-avatar-stack').append(elements);
        } else {
            var interval = setInterval(function() {
                if($('.discussions-module').exists()) {
                    clearInterval(interval);
                    $('.discussions-module .wds-avatar-stack').append(elements);
                }
            }, 100);
        }
    });
})();
 
$(function(){
    $('a[data-canonical="random"]').text("Randomizer");
});
 
// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
$('<a>', {
	href: '#toc',
	class: 'toc-link',
	title: 'Table of Contents'
}).insertBefore('#mw-content-text h2 .editsection, #mw-content-text h3 .editsection');
 
$('.Wall.Board').on('input','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
        sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id'),$(this).val());
    }
    else if(parent.hasClass('new-message')) {
        sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_new',$(this).val());
    }
});
 
$('.Wall.Board').on('focus','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
        $(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id')));
    }
    else if(parent.hasClass('new-message')) {
        $(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_new'));
    }
});
 
$('.Wall.Board').on('keypress','.cke_source',function(e) {
    if(e.which === 13 && e.ctrlKey) {
        $(this).closest('.SpeechBubble').find('.replyButton').click();
    }
});
 
toolbar = skin == 'oasis' ? $('.wikia-bar .toolbar .tools') : $('.portlet#p-tb .pBody > ul');
$(toolbar).append(
    $('<li />').append(
        $('<a />').attr('href','#').text('Invert Color Brightness').click(function() { 
            $('body').toggleClass('body.theme-bright');
        })
    )
);

window.SpoilerAlertJS = {
    question: 'This area is under heavy construction. Would you like to previe it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};