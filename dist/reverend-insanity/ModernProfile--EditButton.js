$(function() {
	var actions = mw.config.get("wgWikiaPageActions"),
		oldbtn = $(".UserProfileActionButton"),
		masthead = $(".masthead-info hgroup");

	function getAction(id) {
		return actions.filter(function(action){return action.id === "page:"+id})[0]
	}

	function renderSVGs(wds) {
		wds.render(".UserProfileMasthead .wds-button-group")
	}

	if(mw.config.get("wgNamespaceNumber") == 2 && oldbtn.length && masthead.length) {
		importArticle({type: "style", article: "u:dev:MediaWiki:ModernProfile/EditButton.css"})

		oldbtn.remove();

		if(actions) {
			var newbtn, drop, dropbtns = [];

			var a_edit = getAction("Edit")
			if(a_edit) {
				newbtn = $("<a>").attr({
					"class": "wds-button wds-is-secondary wds-is-squished",
					"id": "ca-edit",
					"href": a_edit.href
				}).append(
					$("<span>").attr({
						"class": "dev-wds-icon",
						"id": "dev-wds-icons-pencil-small"
					}),
					$("<span>").text(a_edit.caption)
				)
			}

			["History", "Move", "Protect", "Delete"].forEach(function(id){
				var a = getAction(id);
				if(a) dropbtns.push($("<li>").append($("<a>").attr("href", a.href).text(a.caption)))
			})

			if(dropbtns.length) {
				var dropcontent = $("<ul>").attr("class", "wds-list wds-is-linked")
				drop = $("<div>").attr("class", "wds-dropdown").append(
					$("<div>")
					.attr("class", "wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle")
					.append(
						$("<span>").attr({
							"class": "dev-wds-icon",
							"id": "dev-wds-icons-dropdown-tiny"
						})
					),
					$("<div>")
					.attr("class", "wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned")
					.append(dropcontent)
				);
				dropbtns.forEach(function(e){dropcontent.append(e)})
			}

			masthead.prepend(
				$("<div>")
				.attr("class", "wds-button-group")
				.css({"float": "right"})
				.append(newbtn, drop)
			)

			if(!window.dev || !window.dev.wds) {
				mw.hook("dev.wds").add(renderSVGs);
				importArticle({type: "script", articles: "u:dev:WDSIcons/code.js"})
			} else renderSVGs(window.dev.wds)
		}
	}
});