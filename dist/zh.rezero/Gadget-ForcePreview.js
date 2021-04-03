// Force Preview and Edit-Summary - Start
if (mw.config.get("wgAction") === "edit")
	$.when(mw.loader.using("user.options"), $.ready).then(function () {
		var $wpSave = $("#wpSave"),
			$wpPreview = $("#wpPreview"),
			saveVal = $wpSave.val(),
			classNames = "oo-ui-widget-enabled oo-ui-flaggedElement-progressive oo-ui-flaggedElement-primary";
		if (!mw.user.options.get("forceeditsummary") || mw.user.options.get("previewonfirst"))
			mw.loader.using("mediawiki.api", function () {
				new mw.Api().saveOptions({forceeditsummary: 1, previewonfirst: 0});
			});
		if (!$("#wikiPreview,#wikiDiff").is(":visible") && $wpSave.length && $wpPreview.length) {
			$wpSave.prop("disabled", true)
				.val("Save page (use preview first)")
				.parent().removeClass(classNames).addClass("oo-ui-widget-disabled");
			$wpPreview.one("click", function (e) { // re-enable 
				$wpSave.prop("disabled", false)
					.val(saveVal)
					.parent().removeClass("oo-ui-widget-disabled").addClass(classNames);
			}).parent().addClass(classNames);
		}
	});
// Force Preview and Edit-Summary - End