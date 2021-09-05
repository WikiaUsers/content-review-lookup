/* jshint maxerr:1000 */

/* 12h Time START */
function twelveHourTime(time, timeBool) {
	var newTime = time;
	var num;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.twelveHourTime === false) {
		timeBool = false;
	}
	
	if (timeBool) {
		num = parseInt(time.replace(/[^0-9]/g, ""), 10);
	
		if (time.replace(/[^0-9]/g, "") !== "") {
			if (num < 1200) {
				if (num < 100) {
					num = num + 1200;
				}
						
				if (num - 100*Math.floor(num/100) < 10) {
					newTime = Math.floor(num/100) + ":0" + (num - 100*Math.floor(num/100));
				} else {
					newTime = Math.floor(num/100) + ":" + (num - 100*Math.floor(num/100));
				}
				newTime = newTime + "am";
			} else {
				if (num >= 1300) {
					num = Math.abs(num - 1200);
				}
					
				if (num - 100*Math.floor(num/100) < 10) {
					newTime = Math.floor(num/100) + ":0" + (num - 100*Math.floor(num/100));
				} else {
					newTime = Math.floor(num/100) + ":" + (num - 100*Math.floor(num/100));
				}
				newTime = newTime + "pm";
			}
		}
	}
	return newTime;
}
/* 12h Time END */

/* Highlight User START */
function highlightUser(block, name, highlightBool) {
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.highlightUsers === false) {
		highlightBool = false;
	}
	
	if (highlightBool) {
		switch(name) {
			// FANDOM Staff
			case "Atvelonis":
			case "CzechOut":
			case "Dioniso7":
			case "JAlbor":
			case "Kirkburn":
			case "MarkvA":
			case "Mr Pie 5":
			case "NinjaFatGuy":
			case "QATestsStaff":
			case "Raylan13":
			case "Shareif":
			case "Yatalu":
				block.style.backgroundColor = "rgba(0,220,250,0.25)";
				break;
			
			// DE Staff
			case "DE_Glen":			
			case "DEDrew":
			case "DEHelen":
			case "Rebulast":
				block.style.backgroundColor = "rgba(250,200,0,0.25)";
				break;
			
			// Admins
			case "6079Smith":			
			case "ArcticEngie":
			case "Brizingr5":
			case "Cephalon Scientia":
			case "ChickenBar":
			case "Darthmufin":
			case "Emailformygames":
			case "FINNER":
			case "Flaicher":
			case "Gat235":
			case "Imargam":
			case "Juper0":
			case "MrDESC":
			case "Noctuaa":
			case "Raigir":
			case "SonyaUliana":
			case "Tnargraef":
			case "Twilight053":
			case "USouLz":
			case "Voqualin":
				block.style.backgroundColor = "rgba(220,0,180,0.25)";
				break;
			
			// Mods
			case "94Connor949":			
			case "Blizt1998":
			case "DaExile":
			case "Doudich":
			case "Grunni":
			case "Hennils":
			case "Hilycker":
			case "Jeloxale":
			case "Kselia":
			case "Misdirected":
			case "NoLngrRomng1":
			case "Protonus":
			case "Rngd444":
			case "Starfreak911":
			case "TunaInABottle":
				block.style.backgroundColor = "rgba(0,220,90,0.25)";
				break;
				
			// Bots
			case "AkulakhanBot":			
			case "Arctic's Ludicrous Anti-Spam Bot":
			case "Catbot":
			case "Default":
			case "FANDOM":
			case "Fandom":
			case "FANDOMbot":
			case "FandomBot":
			case "Flaibot":
			case "JoeBot":
			case "Owlbot":
			case "ScientiaBot":
			case "Wikia":
			case "WikiaBot":
				block.style.backgroundColor = "rgba(250,90,0,0.25)";
				break;
		}
	
		if (window.CustomUCPFeatures && window.CustomUCPFeatures.highlightNames && window.CustomUCPFeatures.highlightColors && (window.CustomUCPFeatures.highlightNames.length === window.CustomUCPFeatures.highlightColors.length)) {
			for (m = 0; m < window.CustomUCPFeatures.highlightNames.length; m++) {
				if (name == window.CustomUCPFeatures.highlightNames[m]) {
					block.style.backgroundColor = window.CustomUCPFeatures.highlightColors[m];
				}
			}
		}
	}
}
/* Highlight User END */


/* Better History START */
$(function() {		 // Highlights admin/mod contributions, and converts
	betterHistory(); // time from 24h to 12h in page history list.
});					 // Requires twelveHourTime() and highlightUser()

function betterHistory() {
	var historyList = document.getElementById("pagehistory");
	var timeStr;
	var timePos;
	var time;
	var name;
	var timeBool = true;
	var highlightBool = true;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.history12hTime === false) {
		timeBool = false;
	}
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.historyHighlight === false) {
		highlightBool = false;
	}
	
	if (historyList !== null) {
		historyList = historyList.children;
		for (i = 0; i < historyList.length; i++) {
			if (!historyList[i].classList.contains("fixed-history")) {
				timeStr = historyList[i].getElementsByClassName("mw-changeslist-date")[0];
				timePos = timeStr.innerText.search(":");
				time = timeStr.innerText.substring(timePos - 2, timePos + 3);
				timeStr.innerHTML = timeStr.innerHTML.replace(time, twelveHourTime(time, timeBool));
				
				name = historyList[i].getElementsByClassName("mw-userlink")[0].innerText;
				highlightUser(historyList[i], name, highlightBool);
				
				historyList[i].classList.add("fixed-history");
			}
		}
	}
}
/* Better History END */


/* Better Difference START */
$(function() {			// Highlights admin/mod contributions, and converts
	betterDifference(); // time from 24h to 12h in page difference comparison.
});					    // Requires twelveHourTime() and highlightUser()

function betterDifference() {
	var oldVer = document.getElementById("mw-diff-otitle1");
	var newVer = document.getElementById("mw-diff-ntitle1");
	var user;
	var timeStr;
	var timePos;
	var time;
	var timeBool = true;
	var highlightBool = true;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.difference12hTime === false) {
		timeBool = false;
	}
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.differenceHighlight === false) {
		highlightBool = false;
	}
	
	if (oldVer !== null && newVer !== null) {
		timeStr = oldVer.children[0].children[0];
		timePos = timeStr.innerText.search(":");
		time = timeStr.innerText.substring(timePos - 2, timePos + 3);
		timeStr.innerHTML = timeStr.innerHTML.replace(time, twelveHourTime(time, timeBool));
		
		timeStr = newVer.children[0].children[0];
		timePos = timeStr.innerText.search(":");
		time = timeStr.innerText.substring(timePos - 2, timePos + 3);
		timeStr.innerHTML = timeStr.innerHTML.replace(time, twelveHourTime(time, timeBool));
		
		oldVer = document.getElementById("mw-diff-otitle2");
		newVer = document.getElementById("mw-diff-ntitle2");
		
		user = oldVer.children[0].innerText;
		highlightUser(oldVer, user, highlightBool);
	
		user = newVer.children[0].innerText;
		highlightUser(newVer, user, highlightBool);
	}
}
/* Better Difference END */


/* Better Comments START */
$(function() {						  // Highlights admin/mod comments and fixes
	betterComments();				  // comment header links.
	setInterval(betterComments, 500); // Requires highlightUser() and fixCommentHeader()
});

function betterComments() {
	var commentList = document.getElementsByClassName("Comment_wrapper__2mxBn");
	var highlightBool = true;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.commentsHighlight === false) {
		highlightBool = false;
	}
	
	if (commentList.length !== 0) {
		var replyList;
		var comment;
		var commentID;
		var replyID;
		var commentHeader;
		var poster;
		var posterName;
		var date;
		
		for (i = 0; i < commentList.length; i++) {
			comment = commentList[i];
			
			if (!comment.classList.contains("fixed-comment-header")) {
				commentID = comment.dataset.threadId;
				replyID = "";
			
				commentHeader = comment.getElementsByClassName("EntityHeader_header-details__1bZ7-")[0];
				
				posterName = commentHeader.children[0].children[0].href;
				posterName = posterName.replace(/https|warframe\.fandom\.com|zh-tw|wiki|User|Special|Contributions|\%E4\%BD\%BF\%E7\%94\%A8\%E8\%80\%85|\:|\//g, "");
				posterName = posterName.replace(/\%20/g, " ");
				posterName = posterName.replace(/\%3A/g, ":");
				
				highlightUser(comment.children[0], posterName, highlightBool);
				
				poster = commentHeader.children[1].innerText;
			
				date = commentHeader.children[3].children[0];
			
				fixCommentHeader(commentID, replyID, commentHeader, poster, posterName, date);
				comment.classList.add("fixed-comment-header");
			}
			
			replyList = comment.getElementsByClassName("ReplyList_list-wrapper__2Cm6p")[0];
			
			if (replyList !== undefined) {
				replyList = replyList.getElementsByClassName("Reply_reply__3O89M");
				
				for (j = 0; j < replyList.length; j++) {
					comment = replyList[j];
					
					if (!comment.classList.contains("fixed-comment-header")) {
						replyID = comment.dataset.replyId;
						
						commentHeader = comment.getElementsByClassName("EntityHeader_header-details__1bZ7-")[0];
						
						posterName = commentHeader.children[0].children[0].href;
						posterName = posterName.replace(/https|warframe\.fandom\.com|zh-tw|wiki|User|Special|Contributions|\%E4\%BD\%BF\%E7\%94\%A8\%E8\%80\%85|\:|\//g, "");
						posterName = posterName.replace(/\%20/g, " ");
						posterName = posterName.replace(/\%3A/g, ":");
						
						highlightUser(comment, posterName, highlightBool);
						
						poster = commentHeader.children[1].innerText;
						
						date = commentHeader.children[3].children[0];
						
						fixCommentHeader(commentID, replyID, commentHeader, poster, posterName, date);
						comment.classList.add("fixed-comment-header");
					}
				}
			}
		}
	}
}

function fixCommentHeader(commentID, replyID, commentHeader, poster, posterName, date) {
	var node1;
	var node2;
	var link = "/wiki/Special:Contributions/" + posterName;
	var commentPic = commentHeader.getElementsByClassName("wds-avatar EntityHeader_avatar__2TDnq")[0];
	
	commentPic = commentHeader.getElementsByClassName("wds-avatar__image")[0];
	commentHeader.innerHTML = "";
	
	node1 = document.createElement("DIV"); node1.className = "wds-avatar EntityHeader_avatar__2TDnq";
	node2 = document.createElement("A"); node2.href = link;
	node2.appendChild(commentPic);
	node1.appendChild(node2);
	commentHeader.appendChild(node1);
	
	node1 = document.createElement("A"); node1.className = "EntityHeader_name__2oRXg";
	node1.href = link;
if ((window.CustomUCPFeatures && window.CustomUCPFeatures.revealAnonIP) || (poster !== "A Fandom user" && poster !== "A Lone Tenno")) {
        node1.innerText = posterName;
    } else if (poster === "A Fandom user") {
        node1.innerText = "A Lone Tenno";
    } else {
        node1.innerText = poster;
    }
	commentHeader.appendChild(node1);
	
	node1 = document.createElement("SPAN"); node1.className = "EntityHeader_middot__2f4XC";
	node1.innerText = "·";
	commentHeader.appendChild(node1);
	
	node1 = document.createElement("A");
	node1.href = window.location.href.split("?")[0] + "?commentId=" + commentID;
	if (replyID !== "") {
		node1.href = node1.href + "&replyId=" + replyID;
	}
	node1.appendChild(date); node1.style.color = "#3a3a3a";
	commentHeader.appendChild(node1);
}
/*  Better Comments END */


/* Better Wiki Activity START */
$(function() {							  // Highlights admin/mod activity and converts
	betterWikiActivity();				  // time from 24h to 12h.
	setInterval(betterWikiActivity, 500); // Requires twelveHourTime() and highlightUser()
});					    								 

function betterWikiActivity() {
	var activityList = document.querySelectorAll("table.mw-enhanced-rc");
	var activityRows;
	var activity;
	var timeStr;
	var time;
	var timePos;
	var nameList;
	var name;
	var timeBool = true;
	var highlightBool = true;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.wikiActivity12hTime === false) {
		timeBool = false;
	}
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.wikiActivityHighlight === false) {
		highlightBool = false;
	}
	
	if (activityList.length !== 0) {
		for (i = 0; i < activityList.length; i++) {
			if (!activityList[i].classList.contains("fixed-activity")) {
				activityRows = activityList[i].getElementsByTagName("TBODY")[0].getElementsByTagName("TR");
				for (j = 0; j < activityRows.length; j++) {
					activity = activityRows[j];
					timeStr = activity.getElementsByClassName("mw-enhanced-rc")[0];
					timePos = timeStr.innerText.search(":");
					if (timePos !== -1) {
						time = timeStr.innerText.substring(timePos - 2, timePos + 3);
						timeStr.innerHTML = timeStr.innerHTML.replace(time, twelveHourTime(time, timeBool));
					}
					
					timeStr = activity.getElementsByClassName("mw-enhanced-rc-time")[0];
					if (timeStr !== undefined) {
						timePos = timeStr.innerText.search(":");
						if (timePos !== -1) {
							time = timeStr.innerText.substring(timePos - 2, timePos + 3);
							timeStr.innerHTML = timeStr.innerHTML.replace(time, twelveHourTime(time, timeBool));
						}
					}
					
					nameList = activity;
					if (nameList.getElementsByClassName("mw-userlink")[0] !== undefined) {
						name = nameList.getElementsByClassName("mw-userlink")[0];
						name = name.title.replace(/User|使用者|\:/g, "");
						name = name.replace(/Special\:Contributions\//g, "");
						highlightUser(activity, name, highlightBool);
					}
					
					if (nameList.getElementsByClassName("changedby")[0] !== undefined) {
						nameList = nameList.getElementsByClassName("changedby")[0].getElementsByTagName("A");
						
						for (k = 0; k < nameList.length; k++) {
							if (name.title) {
								name = name.title.replace(/User|使用者|\:/g, "");
							}
							name = name.replace(/Special\:Contributions\//g, "");
							highlightUser(activity, name, highlightBool);
						}
					}
				}
				
				activityList[i].classList.add("fixed-activity");
			}
		}
	}
}
/* Better Wiki Activity END */


/* Better Social Activity START */
$(function() {								// Highlights admin/mod activity and converts
	betterSocialActivity();					// time from 24h to 12h. Reformats social activity as well.
	setInterval(betterSocialActivity, 500); // Requires twelveHourTime() and highlightUser()
});

function betterSocialActivity() {
	var dataList = document.getElementsByClassName("social-activity-list");
	var bool = true;
	var timeBool = true;
	var highlightBool = true;
	
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.betterSocialActivity === false) {
		bool = false;
	}
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.socialActivity12hTime === false) {
		timeBool = false;
	}
	if (window.CustomUCPFeatures && window.CustomUCPFeatures.socialActivityHighlight === false) {
		highlightBool = false;
	}
	
	if (dataList.length !== 0) {
		var activityList;
		var activity;
		var activityChildren;
		var span;
		var node;
		var nodeText;
		var bigNode;
		var n;
		var time;
		
		for (i = 0; i < dataList.length; i++) {
			activityList = dataList[i].children;
				
			for (j = 0; j < activityList.length; j++) {
				if (!activityList[j].classList.contains("fixed-social")) {
					activity = activityList[j].children[2].children;
					
					time = activityList[j].getElementsByClassName("activity-time")[0];
					time.innerHTML = twelveHourTime(time.innerText, timeBool);
					
					bigNode = document.createElement("DIV");
					
					if (activity.length == 5) {
						n = 2;
					} else {
						n = 3;
					}
					
					node = document.createElement("A");
					textnode = document.createTextNode(activity[n].innerHTML);
					node.appendChild(textnode); node.href = activity[n+2].href;
					bigNode.appendChild(node); bigNode.innerHTML = bigNode.innerHTML + ": ";
					
					node = document.createElement("SPAN");
					textnode = document.createTextNode(activity[n+1].innerHTML);
					node.appendChild(textnode);
					bigNode.appendChild(node); bigNode.innerHTML = bigNode.innerHTML + "<br />&emsp;&ndash;&nbsp;";
					
					node = document.createElement("A");
					highlightUser(activityList[j], activity[0].innerHTML, highlightBool);
					textnode = document.createTextNode(activity[0].innerHTML);
					node.appendChild(textnode); node.href = activity[0].href;
					bigNode.appendChild(node); bigNode.innerHTML = bigNode.innerHTML + " (";
					
					span = document.createElement("SPAN");
					span.className = "mw-usertoollinks";
					activityChildren = activity[1].children;
					
					if (activityChildren[0] !== undefined) {
						node = document.createElement("A");
						textnode = document.createTextNode(activityChildren[0].innerHTML);
						node.appendChild(textnode); node.href = activityChildren[0].href;
						node.title = activityChildren[0].title; node.className = "mw-usertoollinks-wall";
						span.appendChild(node);
					}
					
					if (activityChildren.length == 2) {
						node = document.createElement("A");
						textnode = document.createTextNode("Contribs");
						node.appendChild(textnode); node.href = activityChildren[1].href;
						node.title = activityChildren[1].title; node.className = "mw-usertoollinks-contribs";
						span.innerHTML = span.innerHTML + " | ";
						span.appendChild(node);
					}
					
					bigNode.appendChild(span); bigNode.innerHTML = bigNode.innerHTML + ")";
					
					if (bool) {
						activityList[j].getElementsByClassName("activity-data")[0].innerHTML = bigNode.innerHTML;
					}
					
					activityList[j].classList.add("fixed-social");
				}
			}
		}
	}
}
/* Better Social Activity END */