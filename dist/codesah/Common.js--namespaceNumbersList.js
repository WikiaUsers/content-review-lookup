/**
 * <pre>
 * Thin script that takes the list of namespaces and their namespace numbers
 * and prints the information out on a certain page for super-easy reference.
 * http://codesah.wikia.com/wiki/MediaWiki:Namespace_numbers
 */
(function() {
    // The page to run the script on (please leave in replacement to make
    // it easy for others to edit if need-be)
    var namespaceListPageName = "MediaWiki:Namespace numbers".replace(/ /g, "_"),
        // The ID of the element on the page to put the list in
        listElementID = "namespace-numbers-list",
        // The text to display for the mainspace (rather than just an empty string)
        mainSpaceText = "(main space)";

    // Abort if not on the defined page
    if (mw.config.get("wgPageName") !== namespaceListPageName) {
        return;
    }

    var wgFormattedNamespaces = mw.config.get("wgFormattedNamespaces"),
        namespaceList = document.createElement("ul"),
        elementToInsertList = document.getElementById(listElementID);

    for (var namespaceNumber in wgFormattedNamespaces) {
        var listItem = document.createElement("li"),
            namespaceNumberTag = document.createElement("span"),
            // Make the mainspace say it's the mainspace rather than just
            // printing an empty string
            namespaceName = namespaceNumber === "0" ? mainSpaceText : wgFormattedNamespaces[namespaceNumber];

        namespaceNumberTag.style.fontWeight = "bold";
        namespaceNumberTag.appendChild(document.createTextNode(namespaceNumber));

        listItem.appendChild(namespaceNumberTag);
        listItem.appendChild(document.createTextNode(" - " + namespaceName));

        namespaceList.appendChild(listItem);
    }

    // Blank the list element and append to the namepscae list to it.

    while (elementToInsertList.firstChild) {
        elementToInsertList.removeChild(elementToInsertList.firstChild);
    }

    elementToInsertList.appendChild(namespaceList);
})();

// </pre>