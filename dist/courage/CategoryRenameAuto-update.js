/**
 *
 * Description:
 * Updates category links in use on the wiki when category is renamed.
 *
 * @Authors Foodbandlt and Jr Mime (Layout of page)
 *
 **/


// Create button

;(function ($, mw) {
    'use strict';

    var progressIndicator = 'https://images.wikia.nocookie.net/__cb20140116215409/courage/images/d/de/Ajax-loader.gif';

    $(function () {
        if (mw.config.get('wgAction') !== 'view' || mw.config.get('wgNamespaceNumber') !== 14) {
            return;
        }

        $('#WikiaPageHeader > .wikia-menu-button .WikiaMenuElement').append(
            $('<li/>').append(
            $('<a/>', {
                'href': '/wiki/Special:BlankPage?blankspecial=categoryrename&categoryname=' + encodeURIComponent(mw.config.get('wgTitle').replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27"),
                'title': 'Rename',
                'html': 'Rename'
            })
            )
            );
    }());

// Blank page setup



    if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'categoryrename') {
        var decodedOldCat = decodeURIComponent($.getUrlVar('categoryname').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'");
        var createCategoryRenameForm = function () {
            /* Text */		var form = '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>Renaming Category:' + $.getUrlVar('categoryname') + '</h1></div>Using the form below will rename a category by changing the category names on pages that the category is used on. You can decide what to do with the old category pages, and a new category page will be created with the content from the old category. Be sure to check <a href="/wiki/Special:WantedCategories">wanted categories</a>. You are responsible for making sure that links continue to point where they are supposed to go.<br /><br />Note that the page will <strong>not</strong> be moved if there is already a page at the new title.<br /><br /><strong>Warning!</strong> This can be drastic and unexpected for a popular category; please be sure you understand the consequences of this before proceeding.<br />'
                /* Current name */ + '<fieldset><legend>Rename category</legend><table border="0" id="mw-renamecategory-table"><tr><td class="mw-label">Current name:</td><td class="mw-input"><strong><a href="/wiki/Category:' + $.getUrlVar('categoryname') + '">Category:' + decodedOldCat + '</a></strong></td></tr>'
                /* Rename category */ + '<tr><td class="mw-label">Rename category:</td><td class="mw-input">Category:<input name="wpNewTitleMain" size="79.5" value="' + decodedOldCat + '" type="text" id="wpNewTitleMain" maxlength="255"></td></tr>'
                /* Reason box */ + '<tr><td class="mw-label">Reason:</td><td class="mw-input"><textarea name="wpReason" id="wpReason" cols="60" rows="2" maxlength="255"></textarea></td></tr>'
                /* Buttons and misc */ + '<tr><td>&#160;</td><td class="mw-submit"><input type="radio" name="options" value="redirect" id="CRARedirectRadio">Leave a redirect behind<br /><input type="radio" name="options" value="delete" id="CRADeleteRadio">Delete the old category<br /><input type="radio" name="options" value="nothing" id="CRANothingRadio">Do none of the above</input></td></tr><tr><td>&#160;</td><td class="mw-submit"><a style="margin-left: 0px;" class="wikia-button" onclick="CRA.start()">Rename</a><span id="liveLoader" style="display:none"><img src="' + progressIndicator + '" /></span><span id="CRAStatus" style="font-weight: bold"></span></td></tr>'
                /* Error box */ + '<tr><td class="mw-label">Failed items:</td><td class="mw-input"><div id="LIRFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll; color: black;">Failed items appear here after execution. Note that pages that the category is transcluded through a template on will also appear here falsely.</div></td></tr>';
            $('#WikiaArticle').html(form);
        };

        document.title = 'CategoryRenameAuto-update';
        createCategoryRenameForm();
    }

}(this.jQuery, this.mediaWiki));


// Start script
if (typeof CRA === "undefined") {

    CRA = {
        started: false,
        updateStatus: function (gifDisplay, message) {
            if (!$("#CRAStatus").length)
                return false;

            if (typeof gifDisplay === "string") {
                message = gifDisplay;
            } else if (typeof gifDisplay === "boolean") {
                if (!gifDisplay) {
                    displayValue = "none";
                } else {
                    displayValue = "inline-block";
                }
                document.getElementById("liveLoader").style.display = displayValue;
            } else {
                return false;
            }

            if (typeof message === "string") {
                $("#CRAStatus").html(" " + message);
            }
            return true;
        },
        start: function (type) {

            /* Checks if function has already started */
            if (CRA.started) {
                return false;
            }

            CRA.updateStatus(true, "Checking if new title exists");

            /* Sets variables used by the function */
            CRA.oldName = decodeURIComponent($.getUrlVar('categoryname').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'"),
                CRA.newName = document.getElementById("wpNewTitleMain").value,
                CRA.reason = $("#wpReason").val();
            CRA.pageKey = [];
            CRA.pageData = [];
            CRA.queueData = [];
            CRA.requestCompleted = [];
            CRA.oldCategoryContent = "";

            /* Check if destination file name is in use */
            $.getJSON("/api.php?action=query&prop=revisions&rvprop=content&titles=Category:" + encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json", function (result) {
                if (typeof result.query.pages[-1] !== "undefined") {
                    CRA.updateStatus(true, "Getting category members");
                    /* If not, then get file usage for category */
                    $.getJSON("/api.php?action=query&list=categorymembers&cmtitle=Category:" + encodeURIComponent(CRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&cmprop=title&cmlimit=5000&format=json", function (result) {
                        var categoryUsage = result.query.categorymembers;

                        if (console)
                            console.log("Category usage successfully retrieved");
                        if (categoryUsage.length > 0) {

                            /* Adds pages category is used on to window.CRA.pageKey to help keep track of pages in window.CRA.pageData later on */
                            for (var currentPage = 0; currentPage < categoryUsage.length; currentPage++) {
                                var title = categoryUsage[currentPage].title;

                                if (CRA.pageKey.indexOf(title) === -1) {
                                    CRA.pageKey[CRA.pageKey.length] = title;
                                }
                            }

                            /* Processing page content first to not have to send a separate API request
                             to retrieve old category contents */
                            CRA.updateStatus(true, "Fetching page contents from API");

                            CRA.processPageContent(function () {
                                CRA.updateStatus(true, "Creating new page");

                                CRA.createNewPage(function () {
                                    CRA.updateStatus(true, "Begin submitting pages");

                                    if (console)
                                        console.log("Begin submitting pages");

                                    for (i = 0; i < CRA.pageData.length; i++) {
                                        CRA.submitChangedPages(i, function () {

                                            if (document.getElementById("CRADeleteRadio").checked) {
                                                CRA.deleteOldPage(function () {
                                                    CRA.updateStatus(false, 'Rename complete.  New category: <a href="/wiki/Category:' + encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + '">' + CRA.newName + '</a>.');
                                                });
                                            } else if (document.getElementById("CRARedirectRadio").checked) {
                                                CRA.redirectOldPage(function () {
                                                    CRA.updateStatus(false, 'Rename complete.  New category: <a href="/wiki/Category:' + encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + '">' + CRA.newName + '</a>.');
                                                });
                                            } else {
                                                CRA.updateStatus(false, 'Rename complete.  New category: <a href="/wiki/Category:' + encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + '">' + CRA.newName + '</a>.');
                                            }
                                        });
                                    }
                                });
                            });
                        } else {
                            /* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
                            CRA.started = false;
                            CRA.updateStatus(false, "Category not used on any pages, rename manually.");
                        }
                    });
                } else {
                    CRA.started = false;
                    CRA.updateStatus(false, "Destination name already exists.");
                }
            });

        },
        createNewPage: function (callback) {
            $.ajax({
                url: "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "edit",
                    title: "Category:" + CRA.newName,
                    summary: CRA.reason + " (automatic)",
                    text: CRA.oldCategoryContent,
                    minor: true,
                    recreate: true,
                    createonly: true,
                    bot: true,
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    alert("Unable to create category \"" + CRA.newName + "\".");
                    CRA.started = false;
                },
                success: function (result) {
                    if (console)
                        console.log("Created new category page \"" + CRA.newName + "\"");

                    if (typeof result.error !== "undefined") {
                        alert("The page \"" + CRA.newName + "\" could not be submitted because of error code:\"" + result.error.code + "\".");
                        return false;
                    }

                    /* Call callback if exists */
                    if (typeof (callback) === "function") {
                        callback();
                    }
                }
            });
        },
        processPageContent: function (callback) {
            if (console)
                console.log("Start processing page content");

            /* Sets progress checking variables */
            for (i = 0; i < CRA.pageKey.length; i++) {
                CRA.requestCompleted[i] = false;
            }

            if (console)
                console.log("Getting page contents");

            /* Calls API for page contents */
            $.post(
                "/api.php",
                {
                    action: "query",
                    prop: "revisions",
                    rvprop: "content",
                    titles: CRA.pageKey.join("|") + "|Category:" + CRA.oldName,
                    format: "json"
                },
            function (result) {
                /* Saves page contents for each page in CRA.pageData */
                for (var i in result.query.pages) {
                    var keyNum = CRA.pageKey.indexOf(result.query.pages[i].title);

                    if (result.query.pages[i].title === "Category:" + CRA.oldName) {
                        CRA.oldCategoryContent = result.query.pages[i].revisions[0]["*"];
                    } else {
                        CRA.pageData[keyNum] = {
                            title: CRA.pageKey[keyNum],
                            content: result.query.pages[i].revisions[0]["*"]
                        };
                    }
                }

                if (console)
                    console.log("Page contents retrieved and saved");

                if (console)
                    console.log("Begin processing page content.");

                /* Replacing category name on each page */
                for (i = 0; i < CRA.pageData.length; i++) {
                    var escapedName0 = CRA.oldName.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/ /g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

                    if (escapedName0.substr(0, 1).match(/[A-z]/i)) {
                        var escapedName = "[" + escapedName0.substr(0, 1).toUpperCase() + escapedName0.substr(0, 1).toLowerCase() + "]" + escapedName0.substr(1);
                    } else {
                        var escapedName = escapedName0;
                    }

                    var pageReplacement = new RegExp("(\\[:?Category:[ ]*?|=[ ]*?|\\|)" + escapedName + "([ ]*?\\||\\]|\\})", "g");
                    var replacementReg = new RegExp(escapedName, "g");
                    var regExec;

                    if (CRA.pageData[i].content.search(pageReplacement) !== -1) {
                        regExec = pageReplacement.exec(CRA.pageData[i].content);
                        CRA.pageData[i].content = CRA.pageData[i].content.replace(regExec[0], regExec[0].replace(replacementReg, CRA.newName));
                    } else {
                        alert("Unable to find \"" + CRA.oldName + "\" on page \"" + CRA.pageData[i].title + "\"; it may be transcluded through a template. Please check and update manually if needed.");
                    }
                }

                //CRA.log("Submitting page content");

                /* Adds progress bar for page submission (since this is the longest part and something entertaining needs to happen)
                 if (CRA.type == "multi"){
                 $(".modalToolbar").prepend("<div id='CRAQueueProgress' style='float: left; width: 200px; border: 2px solid black; height: 17px;'><div id='CRAProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
                 CRA.queueProgress = 0;
                 }
                 */

                if (typeof (callback) === "function") {
                    callback();
                }
            },
                "json"
                );
        },
        submitChangedPages: function (pageKey, callback) {

            $.ajax({
                url: "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "edit",
                    title: CRA.pageData[pageKey].title,
                    summary: "Updating Category:" + CRA.oldName + " → [[Category:" + CRA.newName + "]] (automatic)",
                    text: CRA.pageData[pageKey].content,
                    minor: true,
                    nocreate: true,
                    redirect: false,
                    bot: true,
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    CRA.requestCompleted[pageKey] = true;
                    alert("Unable to publish page \"" + CRA.pageKey[pageKey] + "\".  Please rename images on that page manually.");
                    if (CRA.requestCompleted.indexOf(false) === -1) {
                        if (typeof (callback) === "function") {
                            callback();
                        }
                    }
                },
                success: function (result) {
                    CRA.requestCompleted[pageKey] = true;
                    if (console)
                        console.log("Posted page \"" + CRA.pageKey[pageKey] + "\"");
                    CRA.updateStatus(true, "Submitted page \"" + CRA.pageData[pageKey].title + "\"");

                    if (typeof result.error !== "undefined") {
                        alert("The page \"" + CRA.pageData[pageKey].title + "\" could not be submitted because of error code:\"" + result.error.code + "\". Please update the link(s) on that page manually.");
                    }

                    if (CRA.requestCompleted.indexOf(false) === -1) {
                        /* Call callback if exists */
                        if (typeof (callback) === "function") {
                            callback();
                        }
                    }
                }
            });
        },
        deleteOldPage: function (callback) {
            $.ajax({
                url: "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "delete",
                    title: "Category:" + CRA.oldName,
                    reason: CRA.reason + " (automatic)",
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    alert("Unable to delete category \"" + CRA.newName + "\".  Please delete manually.");
                    CRA.started = false;

                    if (typeof (callback) === "function") {
                        callback();
                    }
                },
                success: function (result) {
                    if (console)
                        console.log("Deleted category page \"" + CRA.newName + "\"");

                    if (typeof result.error !== "undefined") {
                        alert("The page \"Category:" + CRA.oldName + "\" could not be deleted because of error code:\"" + result.error.code + "\".  Please delete manually.");
                    }

                    /* Call callback if exists */
                    if (typeof (callback) === "function") {
                        callback();
                    }
                }
            });
        },
        redirectOldPage: function (pageKey, callback) {

            $.ajax({
                url: "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "edit",
                    title: "Category:" + CRA.oldName,
                    summary: "Redirecting to new category → [[Category:" + CRA.newName + "]] (automatic)",
                    text: "#REDIRECT [[:Category:" + CRA.newName + "]]",
                    minor: true,
                    nocreate: true,
                    redirect: false,
                    bot: true,
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function () {
                    alert("Unable to publish page \"" + CRA.oldName + "\".  Please update that page manually.");
                    if (typeof (callback) === "function") {
                        callback();
                    }
                },
                success: function (result) {
                    if (console)
                        console.log("Posted page \"" + CRA.oldName + "\"");

                    if (typeof result.error !== "undefined") {
                        alert("The page \"" + CRA.pageData[pageKey].title + "\" could not be submitted because of error code:\"" + result.error.code + "\". Please update the link(s) on that page manually.");
                    }

                    /* Call callback if exists */
                    if (typeof (callback) === "function") {
                        callback();
                    }
                }
            });
        }
    };
}