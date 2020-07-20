$('.WikiaPageHeader > .wikia-menu-button').after('<a style="cursor:pointer; margin-left:10px;" id="switchskin" ' + 'class="wikia-button print-no dotEPUBremove entry-unrelated" href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile" title="Chuyển sang Giao diện Mobile">Bản Mobile[ĐT]</a>');
$(function() {
	$("h1:contains('Changes:')").after('<a class="button" data-id="history" href="/' + wgPageName + '?action=history" style="margin-top:2px; vertical-align:top;" title="Xem Lịch sử trang">History</a>&nbsp;');
});