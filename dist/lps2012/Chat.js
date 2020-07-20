//importScript('MediaWiki:Snow.js');

importArticles({
    type: 'script',
	articles: [
        'MediaWiki:JQuery_Notifications.js',
        //'MediaWiki:Snow.js',
        //'MediaWiki:Hearts.js'
    ]
});

/*Animated winter logo begin*/

$(".wordmark").find("img").first().attr("src", "https://vignette.wikia.nocookie.net/lps2012/images/8/89/Wiki-wordmark.png/revision/latest?cb=20151227123648"); //works for any current logo; if it's not animated, then does nothing.

/*Animated winter logo end*/

var isActive = true;

function emoticonDowngrade(imgHTML){
    var emotext = imgHTML.substring(imgHTML.search("alt=") + 5, imgHTML.search("alt=") + 5 + imgHTML.substring(imgHTML.search("alt=") + 5).search("\""));
    return emotext;
}

function linkExtraction(linkHTML){
    var linktext = linkHTML.substring(linkHTML.search("href=") + 6, linkHTML.search("href=") + 6 + linkHTML.substring(linkHTML.search("href=") + 6).search("\""));
    return linktext;
}

function popUpMessage(elementObj){
    elementString = elementObj.innerHTML;
    if (elementString.search("src=") != -1){
        var userIcon  = elementString.substring(elementString.search("src=") + 5, elementString.search("src=") + 5 + elementString.substring(elementString.search("src=") + 5).search("\""));
        var messageText = "";
        if (elementObj.children[3].innerHTML.search("<img") != -1){
            var tmpMsg = elementObj.children[3].innerHTML;
            while (tmpMsg.search("<img") != -1){
                var imgText = tmpMsg.substring(tmpMsg.search("<img "), tmpMsg.search("<img ") + tmpMsg.substring(tmpMsg.search("<img ")).search(">") + 1);
                tmpMsg = tmpMsg.replace(imgText, emoticonDowngrade(imgText));
            }
            messageText = tmpMsg;
        } else {
            if (elementObj.children[3].innerHTML.search("<a") != -1){
                var tmpMsg2 = elementObj.children[3].innerHTML;
                while (tmpMsg2.search("<a") != -1){
                    var linkText = tmpMsg2.substring(tmpMsg2.search("<a"), tmpMsg2.search("<a") + tmpMsg2.substring(tmpMsg2.search("<a")).search("/a>") + 3);
                    tmpMsg2 = tmpMsg2.replace(linkText, linkExtraction(linkText));
                }
            messageText = tmpMsg2;
            } else {
                messageText = elementObj.children[3].innerHTML;
            }
        }
        var options = {
            iconUrl: userIcon,
            title: elementObj.children[2].innerHTML,
            body: messageText,
            };
        $.notification(options);
    }
}

function notifyMe(elementObj){
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        //var notification = new Notification(elementString);
        popUpMessage(elementObj);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                popUpMessage(elementObj);
            }
        });
    }
}

function phantomMessage(msg){
    var phantomMsg = document.createElement('li');
    phantomMsg.setAttribute("data-user", "Littlest_Pet_Shop_(2012_TV_series)_Wiki_chat");
    var image1 = document.createElement('img');
    image1.setAttribute("class", "avatar");
    image1.setAttribute("src", "https://vignette.wikia.nocookie.net/lps2012/images/8/89/Wiki-wordmark.png/revision/20140125183732");
    image1.setAttribute("height", "28");
    image1.setAttribute("width", "28");
    phantomMsg.appendChild(image1);
    var span1 = document.createElement('span');
    span1.setAttribute("class", "time");
    span1.innerHTML = new Date().getHours() + ":" + (new Date().getMinutes()<10?"0":"") + new Date().getMinutes();
    phantomMsg.appendChild(span1);
    var span2 = document.createElement('span');
    span2.setAttribute("class", "username");
    span2.innerHTML = "Littlest Pet Shop (2012 TV series) Wiki chat";
    phantomMsg.appendChild(span2);
    var span3 = document.createElement('span');
    span3.setAttribute("class", "message");
    span3.innerHTML = msg;
    phantomMsg.appendChild(span3);
    notifyMe(phantomMsg);
    phantomMsg.remove();
}

function addMessageListener(chatElement){
    phantomMessage("Notifications have been enabled.");
    chatElement.addEventListener("DOMNodeInserted", function(e){
        if (isActive === false) {
            notifyMe(e.target);
        }
    });
}

function removeMessageListener(chatElement){
    phantomMessage("Notifications have been disabled.");
    chatElement.removeEventListener("DOMNodeInserted", function(e){}, false);
}

window.onload = function() {
    $(".Chat").prepend("<div><table id=\"" + document.getElementsByClassName("Chat")[0].id + "-ntf\" class=\"notificationQuestion\" align=\"center\"><tr><th colspan=\"2\" align=\"center\">Would you like to enable \"New message notification\" for this chat?</th></tr><tr><td align=\"center\"><button>Yes</button></td><td align=\"center\"><button>No</button></td></tr></table></div>");
    document.getElementById(document.getElementsByClassName("Chat")[0].id + "-ntf").children[0].children[1].children[0].children[0].addEventListener("click", function(e){
        if (e.target.innerHTML == "Yes"){
            addMessageListener(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]);
            $(e.target.parentElement.parentElement.parentElement.parentElement.parentElement).slideUp("slow");
        } 
    });
    document.getElementById(document.getElementsByClassName("Chat")[0].id + "-ntf").children[0].children[1].children[1].children[0].addEventListener("click", function(e){
        if (e.target.innerHTML == "No"){
            $(e.target.parentElement.parentElement.parentElement.parentElement.parentElement).slideUp("slow");
        } 
    });
    
    document.getElementById("WikiaPage").addEventListener("DOMNodeInserted", function(e){
        if (e.target.nodeName == "DIV" && e.target.className == "Chat"){
            $(e.target).prepend("<div><table id=\"" + e.target.id + "-ntf\" class=\"notificationQuestion\" align=\"center\"><tr><th colspan=\"2\" align=\"center\">Would you like to enable \"New message notification\" for this chat?</th></tr><tr><td align=\"center\"><button>Yes</button></td><td align=\"center\"><button>No</button></td></tr></table></div>");
            document.getElementById(e.target.id + "-ntf").children[0].children[1].children[0].children[0].addEventListener("click", function(e){
                if (e.target.innerHTML == "Yes"){
                    addMessageListener(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1]);
                    $(e.target.parentElement.parentElement.parentElement.parentElement.parentElement).slideUp("slow");
                } 
            });
            document.getElementById(e.target.id + "-ntf").children[0].children[1].children[1].children[0].addEventListener("click", function(e){
                if (e.target.innerHTML == "No"){
                    $(e.target.parentElement.parentElement.parentElement.parentElement.parentElement).slideUp("slow");
                } 
            });
        }
    });
};

$(window).focus(function() {
    isActive = true;
});


$(window).blur(function() {
    isActive = false;
});