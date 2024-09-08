$(function() {
	$(".wiki-tools > .wds-dropdown > .wds-dropdown__content > .wds-list").append('<li class="theme-swapper-button"><a title="Swaps theme colors without saving or reloading the page">Swap theme colors</a></li>');
	$(".theme-swapper-button a").click(function() {
		var targetTheme = $("body").hasClass("theme-fandomdesktop-light") ? "dark" : "light";

		$.when(
			$.get(mw.util.wikiScript("wikia") + "?controller=ThemeApi&method=themeVariables&variant=" + targetTheme + "&cb=" + (new Date().getTime())),
			$.get(mw.util.wikiScript("load") + "?modules=ext.fandom.DesignSystem.GlobalNavigation.brand." + targetTheme + ".css%7Cext.fandom.DesignSystem.brand." + targetTheme + ".css&only=styles")
		).done(function(wikiCss, brandCss) {
			var combinedCss = wikiCss[0] + brandCss[0];
			var $s = $("#theme-swapper")[0] || $("<style>").attr("id", "theme-swapper").appendTo("body");
			$($s).text(combinedCss);
			
			$("body").removeClass("theme-fandomdesktop-light theme-fandomdesktop-dark").addClass("theme-fandomdesktop-" + targetTheme);
		});
	});
});