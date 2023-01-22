/* __NOWYSIWYG__<source lang="javascript"> */

/*!
 * Mark for standards
 * 
 * Adds a button to the toolbar that automatically adds {{standards|reason}} to the top of a page
 * so that users can quickly mark spam or inappropriate pages for standards
 * 
 * Modified from MarkForDeletion, located at:
 * http://dev.wikia.com/wiki/MarkForDeletion
 */

/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */

allowedUserGroups = [
    'sysop',
    'cleanup'
    ];
if (cac.checkAccess(allowedUserGroups)) {
    if (mediaWiki.config.get("wgAction") === "view" && mediaWiki.config.get("wgNamespaceNumber") !== -1 && mediaWiki.config.get("wgUserName") !== null && allowedUserGroup) {
        (function ($, mw, window, document) {
            "use strict";
            
            var wgServer = mw.config.get("wgServer"),
                wgPageNameEncoded = window.encodeURIComponent(mw.config.get("wgPageName"));
            
            // uses MW API to automatically edit the page and insert the Standards template at the top
            function setStandardsNotice(standardsReason) {
                var xhr = new XMLHttpRequest(),
                    summary = "marked for standards: " + standardsReason,
                    content = "{{Standards|" + standardsReason + "}}",
                    editToken = mw.user.tokens.get("editToken"),
                    url = wgServer + "/api.php?action=edit&title=" + wgPageNameEncoded + "&summary=" + window.encodeURIComponent(summary) + "&format=json&prependtext=" + window.encodeURIComponent(content) + "&token=" + window.encodeURIComponent(editToken);
                
                xhr.open("POST", url);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        window.location.reload();
                    }
                };
                xhr.send();
            }
            
            // adds a "Mark for standards" button to the user's toolbar
            function initStandardsNoticeButton() {
                var $button, toolbar, $mytoolsLI, $customizeLI;
                
                // don't create duplicate buttons
                if (document.getElementById("mark-for-standards-link") !== null) {
                    return;
                }
                
                // create button
                $button = $('<li><a id="mark-for-standards-link" style="cursor: pointer;">Mark for standards</a></li>');
                $button.click(function StandardsNoticeButtonClickHandler() {
                    var promptedStandardsReason = "Insufficient Content";
                    if (typeof window.MarkForStandards === "object" && window.MarkForStandards !== null && typeof window.MarkForStandards.promptedStandardsReason === "string") {
                        promptedStandardsReason = window.MarkForStandards.promptedStandardsReason;
                    }
                    
                    var standardsReason = window.prompt("Enter standards violation to quickly mark this page for standards:", promptedStandardsReason);
                    
                    if (typeof standardsReason === "string" && standardsReason.length > 0) {
                        setStandardsNotice(standardsReason);
                    }
                });
                
                // add button to toolbar
                toolbar = document.getElementById("WikiaBarWrapper");
                if (toolbar !== null) {
                    // oasis
                    $mytoolsLI = $(toolbar).find("li.mytools");
                    if ($mytoolsLI.length > 0) {
                        // insert link before My Tools
                        $mytoolsLI.before($button);
                    } else {
                        // try to insert link before Customize
                        $customizeLI = $(toolbar).find("a.tools-customize").parent();
                        $customizeLI.before($button);
                    }
                } else {
                    // monobook
                    toolbar = document.getElementById("p-tb");
                    if (toolbar !== null) {
                        $(toolbar).find("ul").append($button);
                    }
                }
            }
            
            // add button on DOMReady
            $(initStandardsNoticeButton);
        }(jQuery, mediaWiki, window, document));
    }
}
/* </source> */