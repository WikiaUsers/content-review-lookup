(function () {
	/* only local and global staff and if script has not already run */
	if (
		window.EditUserTalkArchiveLoaded ||
		!/sysop|staff|helper|wiki-manager|content-team-member|content-volunteer|soap/.test(mw.config.get("wgUserGroups").join())
	) {
		return;
	}
	
	/* Prevent redirect when trying to edit user talk pages on wikis with Message Walls
		and remove Add Topic button since user talk pages are not used on these wikis.
		This works for subpages as well. */
	if (mw.config.get("wgNamespaceNumber") === 3) {
		if($(".page-header__page-subtitle a[title*='Message Wall']").length){
			var relativeLink = mw.config.get("wgArticlePath").replace("$1", mw.config.get("wgPageName"));
			var classLink = "wds-button";
			var editText = $("#ca-edit").text().trim();
			if(mw.config.get("skin")=="fandomdesktop"){
				classLink += " wds-is-text page-header__action-button has-label";
				$(".page-side-tools #ca-addsection").replaceWith('<a class="page-side-tool page-side-edit" id="EUTA-edit" href="' + relativeLink + '?action=edit&redirect=no" title="' + editText + '"></a>');
			}
			$("#ca-edit")
				.attr("href", relativeLink + "?action=edit&redirect=no")
				.html("<span>" + editText + "</span>")
				.addClass(classLink);
			$(".page-header #ca-addsection").replaceWith($("#ca-edit"));
			$("#ca-history").attr("href", relativeLink + "?action=history&redirect=no");
			$("#ca-protect").attr("href", relativeLink + "?action=protect&redirect=no");
			$("#ca-delete").attr("href", relativeLink + "?action=delete&redirect=no");
		}
		
		// Prepend icon to edit button if dev.wds properly imports
		mw.hook("dev.wds").add(function(wds) {
			$("#ca-edit").prepend(wds.icon("pencil-small"));
			$("#EUTA-edit").append(wds.icon("pencil-small"));
		});
	}
	
	/* Add button on Message Walls to user talk pages */
	if (mw.config.get("wgNamespaceNumber") === 1200) {
	    // Add button above Message Wall
		var talkLink = mw.config.get("wgServer") + mw.config.get("wgArticlePath").replace("$1", "User_talk:" + mw.config.get("wgTitle"));
		$("#MessageWall").before('<div id="euta_buttons" style="margin-bottom: 1em; text-align: right;"><a id="euta_button" class="wds-button wds-is-secondary" href="' + talkLink + '?redirect=no"><span>User Talk Archive</span></a></div>');
		
		// Prepend icon to button if dev.wds properly imports
		mw.hook("dev.wds").add(function(wds) {
			$("#euta_button").prepend(wds.icon("bubble-small"));
		});
	}
	
	/* Import WDS */
	if (mw.config.get("wgNamespaceNumber") === 3 || mw.config.get("wgNamespaceNumber") === 1200) {
		if(!window.dev.wds){ importArticle({ type: "script", article: "u:dev:MediaWiki:WDSIcons/code.js" }); }
	}
	
	window.EditUserTalkArchiveLoaded = true;
}());