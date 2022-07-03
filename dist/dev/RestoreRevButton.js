$( function() {
	var pname = mw.config.get("wgPageName");
	var revid = "";
	$("#pagehistory > li").each(function() {
		revid = $(this).attr("data-mw-revid");
		$(this).append(
			(" "),
			$("<span>", {
				"class": "mw-changeslist-links restore-revid"
			}).append(
				$("<span>").append(
					$("<a>", {
						href: mw.util.getUrl(pname) + '?action=edit&oldid=' + revid,
						title: "Restore this revision",
						text: "restore"
					})
				)
			)
		);
	});
	mw.util.addCSS( "#pagehistory > li:not(.selected) .restore-revid { display: none }" );
} );