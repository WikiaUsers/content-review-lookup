/**
 * Prints the list of namespaces and their namespace numbers onto a page.
 * [[MediaWiki:Namespace numbers]]
 */
(function() {
	var pageName = "MediaWiki:Namespace numbers",
		mainSpaceText,
		list,
		listItemBase,
		generateListItem;

	if (mw.config.get("wgPageName") !== pageName.replace(/ /g, "_")) {
		return;
	}

	mainSpaceText = "(main space)";
	list = $("<ul>").attr("id", "namespace-numbers-list");
	listItemBase = $("<li>").append(
		$("<span>").css("font-weight", "bold")
	);
	generateListItem = function(namespaceNumber, namespaceName) {
		var listItem = listItemBase.clone();

		if (!namespaceName) {
			namespaceName = mainSpaceText;
		}

		listItem.children("span").text(namespaceNumber);
		listItem.append(" — " + namespaceName);

		return listItem;
	};

	$.each(mw.config.get("wgFormattedNamespaces"), function(namespaceNumber, namespaceName) {
		list.append(generateListItem(namespaceNumber, namespaceName));
	});

	mw.util.$content.append(list);
})();