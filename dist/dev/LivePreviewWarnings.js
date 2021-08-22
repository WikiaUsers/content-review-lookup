$.when(mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"])).then(function(){
    return new mw.Api().loadMessagesIfMissing(["preview", "previewnote", "continue-editing"]);
}).then(function(){
	if(window.LIVEPREVIEWWARNINGSLoaded || mw.config.get("wgAction") != "edit" || !mw.user.options.get("uselivepreview")){
		return;
	}
	window.LIVEPREVIEWWARNINGSLoaded = true;

	$("input#wpPreview").on("click", function(){
		if(!$("#wikiPreview > .previewnote").length){
			$("#wikiPreview").prepend($("<div>", {
				class: "previewnote"
			}));
		}
		$("#wikiPreview > .previewnote").empty();
		$("#wikiPreview > .previewnote").append([
			$("<h2>", {
				id: "mw-previewheader",
				text: mw.msg("preview")
			}),
			$("<p>" + mw.msg("previewnote") + "</p>").append($("<span>", {
				class: "mw-continue-editing",
				append: $("<a>", {
					href: "#editform",
					text: (" → " + mw.msg("continue-editing"))
				})
			}))
		]);
		new mw.Api().post({
			action: "parse",
			text: $("textarea#wpTextbox1").val(),
			prop: "parsewarnings",
			title: mw.config.get("wgPageName"),
			format: "json"
		}).then(function(data){
			var allWarnings = "";
			data.parse.parsewarnings.forEach(function(warning){
				allWarnings = allWarnings + "<p>" +  warning + "</p>";
			});
			allWarnings = allWarnings + "<hr>";
			new mw.Api().post({
				action: "parse",
				text: allWarnings,
				disablelimitreport: true,
				format: "json"
			}).then(function(parsedWarningData){
				var parsedWarnings = parsedWarningData.parse.text["*"].replace(/^<div class\=\"mw-parser-output\">([\s\S]*)<\/div>$/g, "$1");
				$("#wikiPreview > .previewnote").append($(parsedWarnings));
			});
		});
	});
});