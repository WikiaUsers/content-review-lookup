(function(mw, $) {
	if (window.location.hash && window.location.hash.match(/!nonameresolve/)) return;

	function getName(dnUserText) {
		return dnUserText.match(/\((.*?:(.*))\)$/);
	}

	$(function() {
		var n = $("#firstHeading .displayName");
		if (n.length) {
			var u = getName(n.find(".dnUser").text()), d = n.find(".dnDisplay").text(), same = u[2] == d;
			var extra = same ? "" : $("<span class='hdnDisplayTitle'>").text("[" + d + "]");
			n.replaceWith($("<span>").text(u[1]).after(" ", extra));
			$("title").text(u[1] + (!same ? " [" + d + "]" : "") + " - " + mw.config.get("wgSiteName"));
		}
		$("body.ns-110 .forum_editor > a").addClass("mw-userlink");
		$("a > span.displayName").each(function() {
			var $this = $(this), $parent = $this.parent(), isUserLink = $parent.hasClass("mw-userlink") || $parent.next("a").text() == "talk";
			var u = getName($this.find(".dnUser").text()), d = $this.find(".dnDisplay").text();
			$this.text(isUserLink ? d : u[1]).removeClass("displayName");
			if (u[2] == d) {
			} else if (isUserLink) {
				$parent.attr("title", u[1]).addClass("hdnDisplayUser").css("border-bottom", "1px dotted #888");
			} else {
				$parent.after(" ", $("<span class='hdnDisplayPage'>").text("[" + d + "]"));
			}
		});
	});
}(mediaWiki, jQuery));