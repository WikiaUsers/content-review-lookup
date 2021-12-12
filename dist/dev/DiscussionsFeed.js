/**
* @author: Flightmare (https://elderscrolls.fandom.com/wiki/User:Flightmare)
* @version: 1.1
* @license: CC-BY-SA 3.0
* @description: Creates a flat feed for discussions module on Special:DiscussionsFeed. Includes moderation tools.
*/

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
        var spanDate = document.createElement("span"),
            spanDateText = document.createTextNode(formattedDate + " — ");
        spanDate.className = "df-date";
        spanDate.appendChild(spanDateText);

        //Create HTML for message body:
        var aMessage = document.createElement("a"),
            aMessageText = document.createTextNode(text);
        aMessage.className = "df-content";
        aMessage.href = mw.config.get('wgScriptPath') + "/f/p/" + threadID;
        aMessage.target = "_blank";
        aMessage.appendChild(aMessageText);

        //Create HTML for user:
        var aUser = document.createElement("a"),
            aUserText = document.createTextNode(" — " + user);
        aUser.className = "df-user";
        aUser.href = mw.config.get('wgScriptPath') + "/f/u/" + userId;
        aUser.target = "_blank";
        aUser.appendChild(aUserText);

        //Create HTML for category:
        var spanCategory = document.createElement("span"),
            spanCategoryText = document.createTextNode(" in " + forumName);
        spanCategory.className = "df-category";
        spanCategory.appendChild(spanCategoryText);

        //Create block button
        if (canBlock) {
            var aBlock = document.createElement("a"),
                aBlockText = document.createTextNode(" (block)");
            aBlock.className = "df-block";
            aBlock.href = mw.util.getUrl("Special:Block/") + user;
            aBlock.target = "_blank";
            aBlock.appendChild(aBlockText);
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
        content.innerHTML = "Unable to load discussions: The service is down or is not enabled for this domain.";
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
                    content.innerHTML = 'There are no posts.';
                    break;
                default:
                    content.innerHTML = "Unable to load discussions: The service is down or is not enabled for this domain.";
            }
        }
    };
    
    request.open("GET", mw.util.wikiScript("wikia") + "?controller=DiscussionPost&method=getPosts&limit=" + rcLimit + "&page=0&responseGroup=small&reported=false&viewableOnly=" + (!isMod).toString(), true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.withCredentials = true;
    request.send();
}

function createDiscussionsFeed() {
    if(wgNamespaceNumber == -1 && wgTitle == "DiscussionsFeed") { //TODO: i18n make dictionary
        document.title = 'Discussions Feed - ' + wgSiteName;
        var canBlock = Boolean(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('wiki-representative') > -1 || wgUserGroups.indexOf('wiki-specialist') > -1 || wgUserGroups.indexOf('helper') > -1 || wgUserGroups.indexOf('soap') > -1 || wgUserGroups.indexOf('global-discussions-moderator') > -1),
            isMod = Boolean(canBlock || wgUserGroups.indexOf('threadmoderator') > -1);
        if (window.skin == "oasis") {
            document.getElementById("PageHeader").getElementsByTagName("h1")[0].textContent = "Discussions Feed"; //Oasis skin title
        } else if (window.skin == "monobook") {
             document.getElementById("firstHeading").textContent = "Discussions Feed"; //Monobook skin title
        }
        var content = document.getElementById("mw-content-text");
        content.innerHTML = 'Loading feed... <img src="https://images.wikia.nocookie.net/wlb/images/7/74/WIP.gif" /></div>';
        initFeed(content, isMod, canBlock);
    }
}

mw.loader.using('mediawiki.util').then(createDiscussionsFeed);