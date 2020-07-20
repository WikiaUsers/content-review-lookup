
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.1
* @license: CC-BY-SA 3.0
* @description: Creates a flat feed for discussions module on Special:DiscussionsFeed. Includes moderation tools.
*/

function strPad(n) {
    return String("00" + n).slice(-2);
}

function updateContent(content, isMod, canBlock, arr) {
    for (var i = arr["_embedded"]["doc:posts"].length - 1; i > -1; i--) {
        var text = arr["_embedded"]["doc:posts"][i].rawContent;
        var user = arr["_embedded"]["doc:posts"][i]["createdBy"].name;
        var userId = arr["_embedded"]["doc:posts"][i]["createdBy"].id;
        var epoch = arr["_embedded"]["doc:posts"][i]["creationDate"].epochSecond;
        var postID = arr["_embedded"]["doc:posts"][i].id;
        var threadID = arr["_embedded"]["doc:posts"][i].threadId;
        var isReported = Boolean(arr["_embedded"]["doc:posts"][i].isReported);
        var forumName = arr["_embedded"]["doc:posts"][i].forumName;
        var dt = new Date(epoch * 1000);
        var formattedDate = strPad(dt.getHours()) + ":" + strPad(dt.getMinutes()) + ":" + strPad(dt.getSeconds());

        //Create HTML for date:
        var spanDate = document.createElement("span");
        spanDate.className = "df-date";
        var spanDateText = document.createTextNode(formattedDate + " — ");
        spanDate.appendChild(spanDateText);

        //Create HTML for message body:
        var aMessage = document.createElement("a");
        aMessage.className = "df-content";
        aMessage.href = "/d/p/" + threadID;
        aMessage.target = "_blank";
        var aMessageText = document.createTextNode(text);
        aMessage.appendChild(aMessageText);

        //Create HTML for user:
        var aUser = document.createElement("a");
        aUser.className = "df-user";
        aUser.href = "/d/u/" + userId;
        aUser.target = "_blank";
        var aUserText = document.createTextNode(" — " + user);
        aUser.appendChild(aUserText);

        //Create HTML for category:
        var spanCategory = document.createElement("span");
        spanCategory.className = "df-category";
        var spanCategoryText = document.createTextNode(" in " + forumName);
        spanCategory.appendChild(spanCategoryText);

        //Create block button
        if (canBlock) {
            var aBlock = document.createElement("a");
            aBlock.className = "df-block";
            aBlock.href = "/wiki/Special:Block/" + user;
            aBlock.target = "_blank";
            var aBlockText = document.createTextNode(" (block)");
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
    var rcLimit = 50;
    var dt = new Date(epoch * 1000 + 1); //since epochs are rounded down to the nearest second, add 1 ms to prevent requesting the last post a second time
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            switch(request.status) {
                case 200:
                    var arr = JSON.parse(request.responseText);
                    updateContent(content, isMod, canBlock, arr);
                    //fetch timestamp of newest post, required for next request
                    if (arr["_embedded"]["doc:posts"].length > 0) {
                        epoch = arr["_embedded"]["doc:posts"][0]["creationDate"].epochSecond;
                    }
                default:
                    setTimeout(updateFeed, 120000, content, isMod, canBlock, epoch); //set new timer (2m)
            }
        }
    };
    request.open("GET", "https://services.wikia.com/discussion/" + wgCityId + "/posts?limit=" + rcLimit + "&since=" + dt.toISOString() + "&page=0&responseGroup=small&reported=false&viewableOnly=" + (!isMod).toString(), true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.send();
}

function initFeed(content, isMod, canBlock) {
    var rcLimit = 50;
    var request = new XMLHttpRequest();
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
                    var epoch = arr["_embedded"]["doc:posts"][0]["creationDate"].epochSecond;
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
    request.open("GET", "https://services.wikia.com/discussion/" + wgCityId + "/posts?limit=" + rcLimit + "&page=0&responseGroup=small&reported=false&viewableOnly=" + (!isMod).toString(), true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.send();
}

function createDiscussionsFeed() {
    if(wgNamespaceNumber == -1 && wgTitle == "DiscussionsFeed") { //TODO: i18n make dictionary
        document.title = 'Discussions Feed - ' + wgSiteName;
        var canBlock = Boolean(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('helper') > -1 || wgUserGroups.indexOf('vstf') > -1);
        var isMod = Boolean(canBlock || wgUserGroups.indexOf('threadmoderator') > -1);
        if (window.skin == "oasis") {
            document.getElementById("WikiaPageHeader").getElementsByTagName("h1")[0].innerHTML = "<h1>Discussions Feed</h1>"; //Oasis skin title
        } else if (window.skin == "monobook") {
            document.getElementById("firstHeading").innerHTML = '<h1 id="firstHeading" class="firstHeading">Discussions Feed</h1>'; //Monobook skin title
        }
        var content = document.getElementById("mw-content-text");
        content.innerHTML = 'Loading feed... <img src="https://vignette.wikia.nocookie.net/wlb/images/7/74/WIP.gif/revision/latest?cb=20130731182655" /></div>';
        initFeed(content, isMod, canBlock);
    }
}

//include guard
{
    var j = -1;
    for (var i = 0; i < onloadFuncts.length && j < 0; i++) {
        if (onloadFuncts[i].name == "createDiscussionsFeed") {
            j = i;
        }
    }
    if (j < 0) {
        addOnloadHook(createDiscussionsFeed);
    }
}