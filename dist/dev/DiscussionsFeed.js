/**
* @author: Flightmare (https://elderscrolls.fandom.com/wiki/User:Flightmare)
* @version: 1.1
* @license: CC-BY-SA 3.0
* @description: Creates a flat feed for discussions module on Special:DiscussionsFeed. Includes moderation tools.
*/
(function() {
    var msg;
    
    function strPad(n) {
        return String("00" + n).slice(-2);
    }
    
    function updateContent(content, isMod, canBlock, arr) {
        for (var i = arr._embedded["doc:posts"].length - 1; i > -1; i--) {
            var text = arr._embedded["doc:posts"][i].rawContent,
                user = arr._embedded["doc:posts"][i].createdBy.name,
                userId = arr._embedded["doc:posts"][i].createdBy.id,
                epoch = arr._embedded["doc:posts"][i].creationDate.epochSecond,
                postID = arr._embedded["doc:posts"][i].id,
                threadID = arr._embedded["doc:posts"][i].threadId,
                isReported = Boolean(arr._embedded["doc:posts"][i].isReported),
                forumName = arr._embedded["doc:posts"][i].forumName,
                dt = new Date(epoch * 1000),
                formattedDate = strPad(dt.getHours()) + ":" + strPad(dt.getMinutes()) + ":" + strPad(dt.getSeconds());
    
            //Create HTML for date:
            var spanDate = document.createElement("span");
            spanDate.className = "df-date";
            spanDate.textContent = formattedDate + " — ";
    
            //Create HTML for message body:
            var aMessage = document.createElement("a");
            aMessage.className = "df-content";
            aMessage.href = mw.config.get('wgScriptPath') + "/f/p/" + threadID;
            aMessage.target = "_blank";
            aMessage.textContent = text;
    
            //Create HTML for user:
            var aUser = document.createElement("a");
            aUser.className = "df-user";
            aUser.href = mw.config.get('wgScriptPath') + "/f/u/" + userId;
            aUser.target = "_blank";
            aUser.textContent = " — " + user;
    
            //Create HTML for category:
            var spanCategory = document.createElement("span");
            spanCategory.className = "df-category";
            spanCategory.textContent = " in " + forumName;
    
            //Create block button
            var aBlock;
            if (canBlock) {
                aBlock = document.createElement("a");
                aBlock.className = "df-block";
                aBlock.href = mw.util.getUrl("Special:Block/") + user;
                aBlock.target = "_blank";
                aBlock.textContent = " (block)";
            }
    
            //Put everything together
            var par = document.createElement("p");
            par.className = "df-entry";
            if (isReported) {
                par.className += " df-reported";
            }
            par.appendChild(spanDate);
            par.appendChild(aMessage);
            par.appendChild(aUser);
            par.appendChild(spanCategory);
            if (canBlock) {
                par.appendChild(aBlock);
            }
            content.insertBefore(par, content.firstChild);
        }
    }
    
    //TODO: enable end user to disable auto refresh
    function updateFeed(content, isMod, canBlock, epoch) {
        var rcLimit = 50,
            dt = new Date(epoch * 1000 + 1), //since epochs are rounded down to the nearest second, add 1 ms to prevent requesting the last post a second time
            request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(request.readyState == 4) {
                switch(request.status) {
                    case 200:
                        var arr = JSON.parse(request.responseText);
                        updateContent(content, isMod, canBlock, arr);
                        //fetch timestamp of newest post, required for next request
                        if (arr._embedded["doc:posts"].length > 0) {
                            epoch = arr._embedded["doc:posts"][0].creationDate.epochSecond;
                        }
                        break;
                    default:
                        setTimeout(updateFeed, 120000, content, isMod, canBlock, epoch); //set new timer (2m)
                }
            }
        };
        request.open("GET", mw.util.wikiScript("wikia") + "?controller=DiscussionPost&method=getPosts&limit=" + rcLimit + "&since=" + dt.toISOString() + "&page=0&responseGroup=small&reported=false&viewableOnly=" + (!isMod).toString(), true);
        request.setRequestHeader('Accept', 'application/hal+json');
        request.withCredentials = true;
        request.send();
    }
    
    function initFeed(content, isMod, canBlock) {
        var rcLimit = 50,
            request = new XMLHttpRequest();
        request.timeout = 30000; // 30 seconds
        request.ontimeout = function() {
            content.innerHTML = msg('unableToLoad').escape();
        };
        request.onreadystatechange = function() {
            if(request.readyState == 4) {
                switch(request.status) {
                    case 200:
                        var arr = JSON.parse(request.responseText);
                        content.innerHTML = '';
                        updateContent(content, isMod, canBlock, arr);
                        //fetch timestamp of newest post, required for next request
                        var epoch = arr._embedded["doc:posts"][0].creationDate.epochSecond;
                        setTimeout(updateFeed, 120000, content, isMod, canBlock, epoch); //set new timer (2m)
                        break;
                    case 404:
                        content.innerHTML = msg('noPosts').escape();
                        break;
                    default:
                        content.innerHTML = msg('unableToLoad').escape();
                }
            }
        };
        
        request.open("GET", mw.util.wikiScript("wikia") + "?controller=DiscussionPost&method=getPosts&limit=" + rcLimit + "&page=0&responseGroup=small&reported=false&viewableOnly=" + (!isMod).toString(), true);
        request.setRequestHeader('Accept', 'application/hal+json');
        request.withCredentials = true;
        request.send();
    }
    
    function createDiscussionsFeed() {
        if(mw.config.get('wgNamespaceNumber') == -1 && mw.config.get('wgTitle') == "DiscussionsFeed") { //TODO: i18n make dictionary
            document.title = msg('discFeed').plain() + ' - ' + mw.config.get('wgSiteName');
            var ug = mw.config.get('wgUserGroups');
            var canBlock = Boolean(ug.indexOf('sysop') > -1 || ug.indexOf('staff') > -1 || ug.indexOf('wiki-specialist') > -1 || ug.indexOf('soap') > -1 || ug.indexOf('global-discussions-moderator') > -1),
                isMod = Boolean(canBlock || ug.indexOf('threadmoderator') > -1);
            document.getElementById("firstHeading").textContent = msg('discFeed').plain();
            var content = document.getElementById("mw-content-text");
            content.innerHTML = 'Loading feed... <img src="https://images.wikia.nocookie.net/wlb/images/7/74/WIP.gif" /></div>';
            initFeed(content, isMod, canBlock);
        }
    }
    
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('DiscussionsFeed').done(function (i18no) {
            msg = i18no.msg;
            mw.loader.using('mediawiki.util').then(createDiscussionsFeed);
    	});
    });
    importArticles({
        type: 'script',
        articles: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();