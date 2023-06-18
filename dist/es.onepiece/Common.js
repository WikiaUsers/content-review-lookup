$(function UserNameReplace() {
    var username = mw.config.get('wgUserName');
    if (username) {
        var spans = document.getElementsByClassName('insertusername');
  
        for (var i = 0; i < spans.length; i++){
            spans[i].textContent = username;
        }
    }
});

// Plantilla:Partes
$(function() {
	// If a sub-tab is "selected", make the parent tabs also "selected"
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabs
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Plantilla:Partes
window.MassCategorizationGroups = ['sysop', 'moderador de contenido'];