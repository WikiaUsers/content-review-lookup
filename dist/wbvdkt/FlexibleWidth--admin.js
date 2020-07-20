function MoveEditButton() {
	$('#WikiaPageHeader').prepend('<a href="/index.php?title=' + wgPageName + '&action=protect" class="wikia-button" style="float:right;margin-left:10px;">Protect</a>');
	$('#WikiaPageHeader').prepend('<a href="/index.php?title=' + wgPageName + '&action=delete" class="wikia-button" style="float:right;margin-left:10px;">Delete</a>');
}

$(function () {
	$('#mw-sidebar #mw-sidebar-menurep').append('<a href="/wiki/Special:AdminDashboard">Admin Dashboard</a>');
});