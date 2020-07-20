$('#WikiaHeader div.buttons').prepend('<a href="/wiki/Form:Software" title="Create a page" class="wikia-button secondary" data-id="createpage">Create a page</a>');
$('a.wikia-button[data-id=createpage]').prepend('<img width="0" height="0" class="sprite new" src="https://images.wikia.nocookie.net/__cb29161/common/skins/common/blank.gif">');
$('.WikiHeader nav, .WikiHeader .buttons').css('width','auto');
$('.WikiHeader .buttons a:last-child').css('margin-left','5px');