/**
 *
 * Description:
 * Updates page links in use on the wiki when the page is renamed.
 *
 * @Author Foodbandlt
 * Using code by Jr Mime
 */
(function() {
    if (window.PRA || !/content-moderator|helper|staff|sysop|content-volunteer|wiki-representative|wiki-specialist/g.test(mw.config.get('wgUserGroups').join('|'))) {
        return;
    }
    window.PRAoptions = $.extend({
        editSummary: 'Updating page links (automatic)',
        interval: 500
    }, window.PRAoptions);
    window.PRA = {

        started: false,
        
        wg: mw.config.get([
            'wgScriptPath'
        ]),
        
        updateStatus: function(gifDisplay, message){
            if ($("#PRAStatus").length === 0) return false;
        
            if (typeof gifDisplay === "string"){
                message = gifDisplay;
            }else if (typeof gifDisplay === "boolean"){
                if (gifDisplay === false){
                    displayValue = "none";
                }else{
                    displayValue = "inline-block";
                }
                document.getElementById("liveLoader").style.display = displayValue;
            }else{
                return false;
            }
            
            if (typeof message === "string"){
                $("#PRAStatus").html(" " + message);
            }
            return true;
        },
        
        start: function(callback){
            
            /* Checks if function has already started */
            if (PRA.started === true){
                return false;
            }
            
            PRA.started = true;
            PRA.updateStatus(true, PRA.getMessage("process"));
            $("#PRAprocess").css("display", "none");
            PRA.toggleInputs(false);

            /* Sets variables used by the function */
            PRA.oldName = decodeURIComponent($.getUrlVar('pagename').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'"),
            PRA.newName = $("#wpNewTitleMain").val();
            PRA.reason = $("#wpReason").val();

            
            PRA.pageKey = [];            

            /* Check if destination page name is in use */
            $.getJSON(PRA.wg.wgScriptPath + "/api.php?action=query&prop=revisions&rvprop=content&titles="+encodeURIComponent(PRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"&format=json", function(result){
                if (typeof result.query.pages[-1] !== "undefined"){
                    
                    $.getJSON(PRA.wg.wgScriptPath + "/api.php?action=query&list=embeddedin&eititle=" + encodeURIComponent(PRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&eilimit=5000&format=json", function(result){
                        var transUsage = result.query.embeddedin;

                        $.getJSON(PRA.wg.wgScriptPath + "/api.php?action=query&bllimit=5000&list=backlinks&bltitle=" + encodeURIComponent(PRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json", function(result){
                            var pageLinks = result.query.backlinks;
                            var pageUsage = transUsage.concat(pageLinks);
                            
                            if (console) console.log("Usage successfully retrieved");
                            if (pageUsage.length > 0){
                            
                                PRA.queueData = [];
                                PRA.pageKey = [];
                                
                                for (var currentPage = 0; currentPage < pageUsage.length; currentPage++){
                                    var title = pageUsage[currentPage].title;
                                    PRA.queueData.push(title);
                                    /* Temporary until Wikia fixes issue with editing blog comments through the API */
                                    if (title.search(/User blog comment/i) != -1){
                                        var PRABlogComment = true;
                                    }
                                }
                                
                                
                                
                                /* Temporary until Wikia fixes issue with editing blog comments through the API */
                                if (typeof(PRABlogComment) === "undefined"){
                                    PRA.updateStatus(false, PRA.getMessage("success"));
                                    PRA.started = false;
                                    PRA.toggleInputs(true);
                                    $("#PRAprocess").css("display", "inline-block");
                                    PRA.updateQueueListing();
                                }else{
                                    PRA.started = false;
                                    PRA.updateStatus(false, PRA.getMessage("blogcomment"));
                                    PRA.toggleInputs(true);
                                    if (typeof(callback) === "function"){
                                        callback(false, "blogcomment");
                                    }
                                }
                                

                            }else{
                                /* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
                                PRA.started = false;
                                PRA.updateStatus(false, PRA.getMessage("filenotused"));
                                PRA.toggleInputs(true);
                                if (typeof(callback) === "function"){
                                    callback(false, "filenotused");
                                }
                            }
                        });
                    });
                }else{
                    PRA.started = false;
                    PRA.updateStatus(false, PRA.getMessage("destinuse"));
                    PRA.toggleInputs(true);
                    if (typeof(callback) === "function"){
                        callback(false, "destinuse");
                    }
                }
            });
            
        },

        /**************************************
        // Processing-related functions
        **************************************/
        
        processQueue: function(){
            /* Check if operation already started */
            if (PRA.started === true){
                return false;
            }

            /* Variable redeclaration */
            PRA.started = true;
            PRA.toggleInputs(false);
            PRA.requestCompleted  = [];
            PRA.pageData = [];
            PRA.updateStatus(true, PRA.getMessage("process"));

            /* Queue retrieval, returns false if no queue */

            PRA.movePage(function(){
                PRA.processPageContent(function(){
                    PRA.queueData = [];
                    PRA.updateStatus(false, PRA.getMessage("success") + ": <a target='_blank' href='" + PRA.wg.wgScriptPath + "/wiki/"+encodeURIComponent(PRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"'>Link</a>");
                    PRA.updateQueueListing();
                });
            });
        },

        processPageContent: function(callback) {
            /* Sets progress checking variables */
            for (i = 0; i<PRA.queueData.length; i++){
                PRA.requestCompleted[i] = false;
            }
            
            var pageDataRetrieved = 0;

            if (console) console.log("Getting page contents");


            for (var j = 0; j < (Math.floor(PRA.queueData.length/500)+1); j++){
                var tempArray = [];

                for (var k = (j * 500); k < (j * 500) + 500; k++){
                    if (k == PRA.queueData.length){
                        break;
                    }

                    tempArray.push( PRA.queueData[k] );
                }
                
            /* Calls API for page contents */
                $.post(
                    PRA.wg.wgScriptPath + "/api.php",
                    {
                        action: "query",
                        prop: "revisions",
                        rvprop: "content",
                        titles: tempArray.join("|"),
                        format: "json"
                    },
                    function(result){
                        /* Saves page contents for each page in PRA.pageData */
                        for (var i in result.query.pages){
                            var keyNum = PRA.queueData.indexOf(result.query.pages[i].title);
                            PRA.pageData[keyNum] = {
                                title: PRA.queueData[keyNum],
                                content: result.query.pages[i].revisions[0]["*"],
                                changed: false
                            };
                            pageDataRetrieved++;
                        }

                        if (pageDataRetrieved == PRA.queueData.length){
                            if (console) console.log("Page contents retrieved and saved");

                            if (console) console.log("Begin processing page content.");

                            /* Replacing image name on each page */
                            var escapedName0 = window.PRA.oldName.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/( |_)/g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+");
                            if ( escapedName0.substr(0,1).match(/[A-z]/i) ){
                                var escapedName = "[" + escapedName0.substr(0,1).toUpperCase() + escapedName0.substr(0,1).toLowerCase() + "]" + escapedName0.substr(1);
                            }else{
                                var escapedName = escapedName0;
                            }
                            
                            var pageReplacement = new RegExp("(:?|=[ ]*?|\\||\\[|\\{)" + escapedName + "(.*?\\n|[ ]*?\\||\\]|\\})", "g");
                            var replacementReg = new RegExp(escapedName, "g");
                            
                            for (i=0; i<PRA.pageData.length; i++){
                                
                                if (PRA.pageData[i].content.search(pageReplacement) != -1){
                                    PRA.pageData[i].changed = true;
                                    if (console) console.log("\""+PRA.oldName+"\" replaced on page \""+PRA.pageData[i].title+"\"");

                                    while ((regExec = pageReplacement.exec(PRA.pageData[i].content)) !== null){
                                        PRA.pageData[i].content = PRA.pageData[i].content.replace(regExec[0], regExec[0].replace(replacementReg, PRA.newName));
                                        pageReplacement.lastIndex += (regExec[0].replace(replacementReg, PRA.newName).length - regExec[0].length) - (regExec[2].length);
                                    }
                                }else{
                                    PRA.failedLog(PRA.pageData[i].title);
                                }
                            }

                            if (console) console.log("Begin submitting pages");

                            /* Adds progress bar for page submission (since this is the longest part and something entertaining needs to happen) */
                            $(".PRAinfo").append("<div id='PRAQueueProgress' style='float: right; width: 200px; border: 2px solid black; height: 17px; margin: 6px 5px 0px 0px;'><div id='PRAProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
                            PRA.queueProgress = 0;

                            var l = 0;

                            var throttle = setInterval(function(){
                                if (PRA.pageData[l].changed === true){
                                    PRA.submitChangedPages(l, callback);
                                }else{
                                    PRA.requestCompleted[l] = true;
                                }

                                l++;

                                if (l == PRA.pageData.length){
                                    clearInterval(throttle);
                                }
                            }, PRAoptions.interval);
                        }else if (k == PRA.queueData.length && pageDataRetrieved != PRA.queueData.length){
                            if(console) console.log("There was a problem retrieving one or more pages. Retrieved " + PRA.pageData.length + " of " + PRA.queueData.length + " pages");  
                        }
                    },
                    "json"
                );
            }
        },

        submitChangedPages: function(pageKey, callback) {

            $.ajax({
                url: PRA.wg.wgScriptPath + "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "edit",
                    title: PRA.pageData[pageKey].title,
                    summary: PRAoptions.editSummary,
                    text: PRA.pageData[pageKey].content,
                    minor: true,
                    nocreate: true,
                    redirect: false,
                    bot: true,
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function(){
                    PRA.requestCompleted[pageKey] = true;
                    alert("Unable to publish page \""+PRA.pageData[pageKey].title+"\".  Please update links on that page manually.");

                    PRA.started = false;

                    if (typeof(callback) === "function"){
                        callback();
                    }
    
                },
                success: function(result){
                    PRA.requestCompleted[pageKey] = true;
                    if (console) console.log("Posted page \""+PRA.pageData[pageKey].title+"\"");
                    
                    $("#PRAProgressInd").css("width", ((++PRA.queueProgress) / PRA.pageData.length * 100) + "%");

                    if (typeof result.error !== "undefined"){
                        alert("The page \"" + PRA.pageData[pageKey].title + "\" could not be submitted because of error code:\"" + result.error.code + "\". Please update the link(s) on that page manually.");

                        PRA.failedLog(PRA.pageData[pageKey].title);
                    }

                    if (PRA.requestCompleted.indexOf(false) == -1){

                        PRA.started = false;
                        $("#PRAQueueProgress").remove();
                        
                        /* Call callback if exists */
                        if (typeof(callback) === "function"){
                            callback();
                        }
                    }
                }                    
            });
        },

        movePage: function(callback) {

            $.ajax({
                url: PRA.wg.wgScriptPath + "/api.php",
                type: "POST",
                async: true,
                data: {
                    action: "move",
                    from: PRA.oldName,
                    to: PRA.newName,
                    reason: PRA.reason,
                    movetalk: false,
                    noredirect: true,
                    ignorewarnings: true,
                    token: mediaWiki.user.tokens.get("editToken"),
                    format: "json"
                },
                contentType: "application/x-www-form-urlencoded",
                error: function(){
                    alert("Unable to move page \"" + PRA.oldName + "\" to \"" + PRA.newName + "\".");
                    PRA.started = false;
                    PRA.toggleInputs(true);
                },
                success: function(result){
                    if (typeof result.error === "undefined"){
                        if (console) console.log("Moved page \"" + PRA.oldName + "\"");

                        /* Call callback if exists */
                        if (typeof(callback) === "function"){
                            callback();
                        }
                    }else if (result.error.code == "articleexists" || result.error.code == "invalidtitle"){
                        var promptResponse = prompt("The page \"" + PRA.oldName + "\" was unable to be moved to \"" + PRA.newName + "\" for reason: " + result.error.code + ". \n Please enter another destination name for this file.");

                        if (promptResponse !== null && promptResponse !== ""){
                            PRA.newName = promptResponse;
                            PRA.movePage(callback);
                        }else{
                            alert(PRA.oldName + " was unable to be moved.");
                            PRA.started = false;
                            PRA.toggleInputs(true);
                        }
                    }else{
                        alert("The page \"" + PRA.oldName + "\" was unable to be moved to \"" + PRA.newName + "\" for reason: " + result.error.code + ".");
                        PRA.started = false;
                        PRA.toggleInputs(true);
                    }
                }
            });
        },

        /**************************************
        // Modal-related functions
        **************************************/
        
        toggleInputs: function(toggle){
            $("#wpNewTitleMain, #wpReason").attr("disabled", (toggle === false));
        },
        
        getMessage: function(message, number){
            switch (message){
                case "":
                    break;
                case "nameinuse":
                    return "Destination name is already queued to be used or is currently in use.";
                case "blogcomment":
                    return "Page linked in blog comment. Unable to update blog comments due to API bug.";
                case "filenotused":
                    return "Page not linked on any pages.";
                case "destinuse":
                    return "Destination name already in use.";
                case "process":
                    return "Processing...";
                case "success":
                    return "Successful.";
                case "varsundef":
                    return "Variables undefined, check code.";
                case "queueupdate":
                    return "Queue updated.";
                case "nothinginqueue":
                    return "There is currently nothing in the queue.";
                case "trydiffname":
                    return "Please enter a page name.";
            }
        },

        failedLog: function(page){
            if (typeof(PRA.logFailed) === "undefined"){
                PRA.logFailed = "";
            }
            PRA.logFailed += "<div><a target='_blank' href='" + PRA.wg.wgScriptPath + "/wiki/" + encodeURIComponent(page.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + page + "</a></div>";

            if ($("#PRAFailedLog").length > 0){
                document.getElementById("PRAFailedLog").innerHTML = PRA.logFailed;
                $("#PRAFailedLog div:odd").css("background-color", "darkred");
            }
        },

        updateQueueListing: function(){
            if (typeof PRA.queueData == "undefined" || PRA.queueData.length < 1){
                document.getElementById("PRAQueue").innerHTML = "<div>" + PRA.getMessage("nothinginqueue") + "</div>";
                document.getElementById("PRAQueueLengthBox").innerHTML = "0";
                return false;
            }

            var PRACurrentQueueData = PRA.queueData;
            var queueToAdd = "";

            for (i = 0; i<PRACurrentQueueData.length; i++){
                queueToAdd += "<div><a target='_blank' href='" + PRA.wg.wgScriptPath + "/wiki/" + encodeURIComponent(PRACurrentQueueData[i].replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + PRACurrentQueueData[i] + "</a></div>";
            }

            document.getElementById("PRAQueue").innerHTML = queueToAdd;
            document.getElementById("PRAQueueLengthBox").innerHTML = PRA.queueData.length;
            $("#PRAQueue div:odd").css("background-color", "lightgrey");
        }
    };

    /* Actions performed on page load to add script elements */

    if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'pageusageupdate') {
        var decodedOldPage = decodeURIComponent($.getUrlVar('pagename').replace(/_/g, " ")).replace(/(%22|")/g, '&quot;').replace(/(%27|')/g, "&#39;");
        (function() {
    /* Text */        var form = '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>Renaming Page:' + decodedOldPage + '</h1></div>Using the form below will rename a page by changing the page names on pages that the page is used on. Be sure to check <a href="' + PRA.wg.wgScriptPath + '/wiki/Special:WantedCategories">wanted categories</a>. You are responsible for making sure that links continue to point where they are supposed to go.<br /><br />Note that the page will <strong>not</strong> be moved if there is already a page at the new title.<br /><br /><strong>Warning!</strong> This can be drastic and unexpected for a popular page; please be sure you understand the consequences of this before proceeding.<br />'
    /* Current name */        + '<fieldset><legend>Rename page & update usage</legend><table border="0" id="mw-renamepage-table"><tr><td class="mw-label">Current name:</td><td class="mw-input"><strong><a href="' + PRA.wg.wgScriptPath + '/wiki/' + $.getUrlVar('pagename') + '">' + decodedOldPage + '</a></strong></td></tr>'
    /* Rename page */        + '<tr><td class="mw-label">Rename page:</td><td class="mw-input"><input name="wpNewTitleMain" size="79.5" value="' + decodedOldPage + '" type="text" id="wpNewTitleMain" maxlength="255"></td></tr>'
    /* Reason box */        + '<tr><td class="mw-label">Reason:</td><td class="mw-input"><textarea name="wpReason" id="wpReason" cols="60" rows="2" maxlength="255"></textarea></td></tr>'
    /* Buttons and misc */        + '<tr><td>&#160;</td><td class="mw-submit"><a style="margin-left: 0px;" class="wikia-button" id="PRAstart" onclick="PRA.start()">Populate list</a> <a style="margin-left: 5px; display: none;" class="wikia-button" id="PRAprocess" onclick="PRA.processQueue()">Process queue</a><span id="liveLoader" style="display:none"><img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif" /></span><span id="PRAStatus" style="font-weight: bold"></span></td></tr>'
    /* Queue box */         + '<tr><td class="mw-label">Queued items:</td><td class="mw-input"><div id="PRAQueue" style="overflow: scroll; width: 798px; height: 300px; float: left; border: 1px solid black; font-weight: bold; background-color: #FFFFFF;"></div></td></tr>'
    /* Counter */               + '<tr><td class="mw-label">&#160;</td><td class="mw-input PRAinfo"><div id="PRAQueueLength" style="float: left;margin: 5px 15px 0px 0px; font-weight: bold;">Pages in queue: <span id="PRAQueueLengthBox"></span></div></td></tr>'
    /* Error box */            + '<tr><td class="mw-label">Failed items:</td><td class="mw-input"><div id="PRAFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll;">Failed items appear here after execution. Note that pages that the page is transcluded through a template on will also appear here falsely.</div></td></tr>';
            $('#WikiaArticle').html(form);
        })();
        
        document.title = 'Page Rename Auto-Update';
        PRA.updateQueueListing();
    } else if (wgCanonicalNamespace != "Special" && wgCanonicalNamespace != "Mediawiki" && wgCanonicalNamespace != "Category" && wgCanonicalNamespace != "Category Talk" && wgCanonicalNamespace != "User Talk" ) {
        /* Page */
        $('.page-header__contribution-buttons .wds-list').append(
            $('<li/>').append(
                $('<a/>', {
                    'href': PRA.wg.wgScriptPath + '/wiki/Special:BlankPage?blankspecial=pageusageupdate&pagename=' + encodeURIComponent(mw.config.get('wgPageName').replace(/ /g, "_")) + '&namespace=' + wgNamespaceNumber,
                    'title': 'Rename & update',
                    'html': 'Rename & update'
                })
            )
        );
    }
})();