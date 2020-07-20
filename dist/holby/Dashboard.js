 /* Restores Normal Header To Special Pages */
function ADHeader() {
	if ($('.AdminDashboardHeader').length) {
		var title = document.title.split(" -", 1);
		$('header.AdminDashboardHeader').before('<header id="WikiaPageHeader" class="WikiaPageHeader"><h1>' + title + '</h1><h2>Special page</h2></header>');
	}
}
addOnloadHook(ADHeader);