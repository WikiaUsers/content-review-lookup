mw.loader.getScript('https://fastly.jsdelivr.net/npm/mediawiki-inpageedit').then(function () {
	// 在顶部添加快速编辑按钮
	mw.hook("InPageEdit").add(function () {
		if (mw.config.get("wgIsArticle")) {
			mw.hook("dfgh.i18n").add(function (i18no) {
				i18no.loadMessages("InPageEdit-v2").then(function (i18n) {
					$("#ca-edit").after(
						$("<li>", {
							id: "ca-quick-edit",
							class: "collapsible"
						}).append(
							$("<span>").append(
								$("<a>", {
									text: i18n.msg("quick-edit").escape() + ("Wikiplus" in window && Wikiplus.version ? "(IPE)" : "")
								}).on('click', function () {
									InPageEdit.quickEdit({
										page: mw.config.get("wgPageName"),
										revision: mw.config.get("wgRevisionId")
									});
								})
							)
						)
					);
				});
			});
		}
	});
});