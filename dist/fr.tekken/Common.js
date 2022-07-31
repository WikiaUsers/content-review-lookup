/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Modèle:Tabs
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
// END of Modèle:Tabs