(function () {
	/* only local and global staff and if script has not already run */
	if (
		window.EditUserTalkArchiveLoaded ||
		!/sysop|staff|helper|wiki-representative|wiki-specialist|content-volunteer|soap/.test(mw.config.get("wgUserGroups").join())
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
				
				/* Replace side tools edit button */
				$(".page-side-tools #ca-addsection-side-tool").replaceWith('<a class="page-side-tool page-side-edit" id="EUTA-edit" href="' + relativeLink + '?action=edit&redirect=no"></a>');
				
				/* Add tooltip, thanks to Bitomic's code from MediaWiki:ThemeToggler.js */
				var EUTAtooltip;
				$("#EUTA-edit").mouseenter(function(){
					var tooltipmsg = editText;
					var topPosition = ($(this).offset().top - $(document).scrollTop() + 20) + "px";
					var leftPosition = ($(this).offset().left + 50) + "px";
					var tooltip = $("<div>", {
						class: "wds-tooltip is-right",
						css: {
							left: leftPosition,
							top: topPosition
						},
						text: tooltipmsg
					});
					$("body").append(tooltip);
					EUTAtooltip = tooltip;
				});
				$("#EUTA-edit").mouseleave(function(){
					var tooltip = EUTAtooltip;
					EUTAtooltip = undefined;
					if(tooltip){
						tooltip.remove();
					}
				});
			}
			
			$("#ca-edit")
				.attr("href", relativeLink + "?action=edit&redirect=no")
				.html("<span>" + editText + "</span>")
				.addClass(classLink);
			$(".page-header #ca-addsection").replaceWith($("#ca-edit"));
			$("#ca-history").attr("href", relativeLink + "?action=history&redirect=no");
			$("#ca-protect").attr("href", relativeLink + "?action=protect&redirect=no");
			$("#ca-delete").attr("href", relativeLink + "?action=delete&redirect=no");
			$("#ca-purge").attr("href", relativeLink + "?action=purge&redirect=no");
			$(".mw-editsection a").each(function(){
				var sectionEdit = $(this).attr("href");
				$(this).attr("href", sectionEdit + "&redirect=no");
			});
		}
		
		// Prepend icon to edit button if dev.wds properly imports
		mw.hook("dev.wds").add(function(wds) {
			$("#ca-edit").prepend(wds.icon("pencil-small"));
			$("#EUTA-edit").append(wds.icon("pencil-small"));
		});
	}
	
	/* Add button on Message Walls to user talk pages */
	if (mw.config.get("wgNamespaceNumber") === 1200) {
		// Add button above Message Wall, only if the User talk page exists
		var EUTA_user = mw.config.get("wgTitle");
		var api = new mw.Api();
		api.get({
			action: "query",
			list: "allpages",
			apfrom: EUTA_user,
			apto: EUTA_user,
			apnamespace: 3,
		}).done(function(d){
			if(!d.error){
				if(d.query.allpages.length){
					var talkLink = mw.config.get("wgServer") + mw.config.get("wgArticlePath").replace("$1", d.query.allpages[0].title);
					const filterCheck = setInterval(function(){
						if($(".messagewall-filters__filters").length){
							clearInterval(filterCheck);
							$(".messagewall-filters__filters").prepend('<div id="euta_wrapper"><a id="euta_button" class="wds-button wds-is-text" href="' + talkLink + '?redirect=no"><span>User Talk Archive</span></a></div>');
							// Prepend icon to button if dev.wds properly imports
							mw.hook("dev.wds").add(function(wds) {
								$("#euta_button").prepend(wds.icon("bubble-small"));
							});
						}
			    	}, 200);
				}
			} else {
				console.error("EditUserTalkArchive: Error when checking for user talk page:" + d.error.code);
			}
		}).fail(function(){
			console.error("EditUserTalkArchive: Failed to check for user talk page");
		});
		
		/* Import CSS */
		if(!window.EUTACSSLoaded){
			importArticle({ type: "style", article: "u:dev:MediaWiki:EditUserTalkArchive.css" });
			window.EUTACSSLoaded = true;
		}
	}
	
	/* Import WDS */
	if (mw.config.get("wgNamespaceNumber") === 3 || mw.config.get("wgNamespaceNumber") === 1200) {
		if(!window.dev.wds){ importArticle({ type: "script", article: "u:dev:MediaWiki:WDSIcons/code.js" }); }
	}
	
	window.EditUserTalkArchiveLoaded = true;
}());