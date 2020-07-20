/* Any JavaScript here will be loaded for all users on every page load. */
// *************************************************
    // Pagetitle rewrite
    //
    // Rewrites the page's title, used by Template:Title
    // *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

/* add history to the dropdown menu for pages - 3/8/11 */
if ( wgNamespaceNumber == 0 ) {
function NewSectionDropdownMenuItem() {
	if ($('ul.wikia-menu-button').length === 0) {
 		$('#WikiaPageHeader a.wikia-button').removeClass('wikia-button').wrap('<ul class="wikia-menu-button" />').wrap('<li/>');
		$('ul.wikia-menu-button').append('<img class="chevron" src="https://images.wikia.nocookie.net/__cb34175/common/skins/common/blank.gif"><ul></ul>');
	}
		$('ul.wikia-menu-button ul').append('<li><a href="/index.php?title='+ encodeURIComponent (wgPageName) +'&action=edit&section=new">New Section</a></li>');
}
 
addOnloadHook(NewSectionDropdownMenuItem);
}