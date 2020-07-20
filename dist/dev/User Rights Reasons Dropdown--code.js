/*
    for more information about this feature, please see:
    [[w:c:dev:User Rights Reasons Dropdown]]
    for discussions about the feature, please see:
    [[w:c:dev:Talk:User Rights Reasons Dropdown]]
*/
$(function() {
    // the current page is [[Special:Userrights]]
    if (mw.config.get("wgCanonicalSpecialPageName") !== "Userrights") {
        return;
    }
    var defReason = window.userReasonDefault || '<option value="">Please select a reason</option>';
    // function for processing the userrights from the imported text for an easier editing
    function injectUserrightsDropdown() {
        for (var userReasonDropdownArrayI = 0; userReasonDropdownArrayI < userReasonDropdownArray.length; userReasonDropdownArrayI++) {
            var userRightesCompiler;
            if (userReasonDropdownArray[userReasonDropdownArrayI].charAt(1) != "*") {
                // this is a section
                if (!userRightsSectionOpened) {
                    // section has yet to be opened
                    userRightesCompiler = '\n<optgroup label="' + userReasonDropdownArray[userReasonDropdownArrayI].substr(1).replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '">';
                    userRightsSectionOpened = true;
                } else {
                    // section exists - close former sections
                    userRightesCompiler = '\n</optgroup>\n<optgroup label="' + userReasonDropdownArray[userReasonDropdownArrayI].substr(1).replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '">';
                }
            } else {
                // this is an option
                userRightesCompiler = '\n<option value="' + userReasonDropdownArray[userReasonDropdownArrayI].substr(2).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '">' + userReasonDropdownArray[userReasonDropdownArrayI].substr(2).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</option>';
            }
            if (userReasonDropdownArrayI + 1 == userReasonDropdownArray.length) {
                // if this is the last line, making sure that the last &lt;optgroup&gt; element is closed
                if (userRightesCompiler.indexOf("<optgroup ") > -1) {
                    userRightesCompiler = userRightesCompiler + '\n</optgroup>';
                }
                // insert processed content to the select element
                $("select#user-reason-dropdown").html(defReason + userRightesCompiler);
            }
        }
    }
    // load the dropdown
    /**
     * Disabling due to possible XSS issues
    $("td.mw-input").load('/index.php?title=MediaWiki:Custom-userrights&action=raw&ctype=text/html', function () {
        // load the reasons
        $("select#user-reason-dropdown").load("/index.php?title=MediaWiki:Custom-userrightsreasons&action=raw&ctype=text/plain", function () {
            userRightesCompiler = "<!-- placeholder -->"; // create varaiable that will contain the text to insert the processed
            userReasonDropdownArray = $("select#user-reason-dropdown").text().split("\n");
            userRightsSectionOpened = false; // boolean - no dropdown section created yet
            // process plain txt content into pure HTML
            injectUserrightsDropdown();
            // picking dropdown or input field
            function promoteUserReason() {
                if ($("input#user-reason-override").val().length > 0) {
                    // reason given
                    $("input#user-reason-override").attr("name", "user-reason");
                    $("select#user-reason-dropdown").removeAttr("name");
                } else if ($("select#user-reason-dropdown").val() != "none_selected") { // no reason given & dropdown option selected
                    $("select#user-reason-dropdown").attr("name", "user-reason");
                    $("input#user-reason-override").removeAttr("name");
                } else { // no reason given & no dropdown option selected
                    $("input#user-reason-override").attr("name", "user-reason");
                    $("select#user-reason-dropdown").removeAttr("name");
                }
            }
            $('input[name="saveusergroups"]').mouseover(function(){
                promoteUserReason();
            });
        });
    });
    */
});