/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 *
 * Imported as of 09/06/2011 from [[User:ErrantX/defaultsummaries.js]]
 * Edited version from [[User:MC10/defaultsummaries.js]]
 * Implements default edit summary dropdown boxes
 */

(function ($) { // Wrap with anonymous function
    // The original value of the edit summary field is stored here
    var editsummOriginalSummary = "";

    function editsummAddOptionToDropdown(dropdown, optionText) {
        var option = document.createElement("option");
        var optionTextNode = document.createTextNode(optionText);
        option.appendChild(optionTextNode);
        dropdown.appendChild(option);
    }

    function editsummAddCatToDropdown(dropdown, catText) {
        var option = document.createElement("option");
        option.disabled = true;
        option.selected = true;
        var optionTextNode = document.createTextNode(catText);
        option.appendChild(optionTextNode);
        dropdown.appendChild(option);
    }

    function editsummOnCannedSummarySelected() {
        // Save the original value of the edit summary field
        editsummOriginalSummary = document.getElementById("wpSummary");
        if (editsummOriginalSummary) {
            editsummOriginalSummary = editsummOriginalSummary.value;
        } else {
            editsummOriginalSummary = "";
        }

        var idx = this.selectedIndex;
        var canned = this.options[idx].text;

        var newSummary = editsummOriginalSummary;

        // Append old edit summary with space, if exists,
        // and last character != space
        if (newSummary.length !== 0 && newSummary.charAt(newSummary.length - 1) !== " ") {
            newSummary += " ";
        }
        newSummary += canned;
        document.getElementById("wpSummary").value = newSummary;
    }

    $(function () {
        var insertBeforeThis = document.getElementById("wpSummary");

        // Loop through siblings, looking for editCheckboxes class
        while (insertBeforeThis) {
            if (insertBeforeThis.className === "editCheckboxes") {
                break;
            }

            insertBeforeThis = insertBeforeThis.nextSibling;
        }

        // If we failed to find the editCheckboxes class, or insertBeforeThis is null
        if (!insertBeforeThis || insertBeforeThis.className !== "editCheckboxes") {
            return;
        }

        editsummOriginalSummary = editsummOriginalSummary.value;
        // For convenience, add a dropdown box with some canned edit
        // summaries to the form.
        var dropdown = document.createElement("select");
        dropdown.style.width = "38%";
        dropdown.style.margin = "0 4px 0 0";
        dropdown.onchange = editsummOnCannedSummarySelected;

        var minorDropdown = document.createElement("select");
        minorDropdown.style.width = "38%";
        minorDropdown.onchange = editsummOnCannedSummarySelected;

        editsummAddCatToDropdown(minorDropdown, "Common minor edit summaries – click to use");
        editsummAddCatToDropdown(dropdown, "Common edit summaries – click to use");

		editsummAddOptionToDropdown(minorDropdown, "Null edit");
        editsummAddOptionToDropdown(minorDropdown, "Spelling/grammar correction");
        editsummAddOptionToDropdown(minorDropdown, "Fixing style/layout errors");
        editsummAddOptionToDropdown(minorDropdown, "Reverting vandalism or test edit");
        editsummAddOptionToDropdown(minorDropdown, "Reverting unexplained content removal");
        editsummAddOptionToDropdown(minorDropdown, "Copyedit (minor)");

        if (mw.config.get('wgNamespaceNumber') === 0) {
            editsummAddOptionToDropdown(dropdown, "Expanding article");
            editsummAddOptionToDropdown(dropdown, "Adding/improving reference(s)");
            editsummAddOptionToDropdown(dropdown, "Adding/removing category/ies");
            editsummAddOptionToDropdown(dropdown, "Adding/removing external link(s)");
            editsummAddOptionToDropdown(dropdown, "Adding/removing wikilink(s)");
            editsummAddOptionToDropdown(dropdown, "Removing unsourced content");
            editsummAddOptionToDropdown(dropdown, "Removing linkspam");
            editsummAddOptionToDropdown(dropdown, "Clean up");
            editsummAddOptionToDropdown(dropdown, "Copyedit (major)");
        } else {
            editsummAddOptionToDropdown(dropdown, "Expanding article");
            editsummAddOptionToDropdown(dropdown, "Updating article");
            editsummAddOptionToDropdown(dropdown, "Editing/Revising article");
            if ((mw.config.get('wgNamespaceNumber') % 2 !== 0) & (mw.config.get('wgNamespaceNumber') !== 3)) {
                editsummAddOptionToDropdown(dropdown, "Tagging");
                editsummAddOptionToDropdown(dropdown, "Assessment");
            }
        }

        var theParent = insertBeforeThis.parentNode;
        theParent.insertBefore(dropdown, insertBeforeThis);
        theParent.insertBefore(minorDropdown, insertBeforeThis);
        theParent.insertBefore(document.createElement("br"), dropdown);
    });
}(jQuery)); // End wrap with anonymous function