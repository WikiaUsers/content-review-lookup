window.UserTagsJS = {
    modules: {},
    tags: {
        // These will be added to people by UserTagsJS.modules.custom
        chatmod: { u: 'Chat room Moderator', order: 0 },
        rollback: { u: 'Moderator', order: 10 },
        "founder": { u: 'Founder of BotF', order: -4 },
        "wcao": { u: 'Website creator and Owner', order: -3 },
        "MP": { u: 'Master Programmer', order: -1 },
        DF: { u: 'Digital Frontiersman', order: -2},
        SU: { u: 'Superuser', order: -1 },
        formerAdmin: { u: 'Former Admin', order: 0 },
        formerArtist: { u: 'Former Design Artist', order: 0 },
        inactiveAdmin: { u: 'Inactive Admin', order: -1 },
        pharmacist: { u: 'Erotic Pharmacist', order: 10 },
        XM: { u: 'XM', order: -1 }
    }
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder', 'wcao']
};
UserTagsJS.modules.implode = {
	inactiveAdmin: ['sysop', 'inactive']
};
UserTagsJS.modules.custom = {
	// 'User Name': ['list', 'of', 'tags', 'at', 'the', 'top']
};
UserTagsJS.modules.custom = {
	'MythicConditor': ['wcao', 'MP', 'DF','SU', 'XM'],
	'DJ Zoobith': ['formerAdmin', 'formerArtist'],
	'Tlock69': ['formerAdmin', 'pharmacist'],
	'ZesT Wawiaa': ['rollback', 'chatmod']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


//<nowiki>
/**
*
* Description:
* 		Updates file links in use on the wiki when image is renamed.
*
* @Author MythicConditor
*
**/
 
// Options processing
 
if (typeof (LIRoptions) !== "undefined"){
	if (typeof (LIRoptions.bottomMessage) === "undefined"){
		LIRoptions.bottomMessage = "";
	}
 
	if (typeof (LIRoptions.editSummary) === "undefined"){
		LIRoptions.editSummary = "Updating file links (automatic)";
	}
 
	if (typeof (LIRoptions.singleButtonText) !== "undefined"){
		if (LIRoptions.singleButtonText == ""){
			LIRoptions.singleButtonText = "Rename and replace";
		}
	}else{
		LIRoptions.singleButtonText = "Rename and replace";
	}
 
	if (typeof (LIRoptions.queueButtonText) !== "undefined"){
		if (LIRoptions.queueButtonText == ""){
			LIRoptions.queueButtonText = "Rename and add to queue";
		}
	}else{
		LIRoptions.queueButtonText = "Rename and add to queue";
	}
}else{		
	LIRoptions = {
		bottomMessage: "",
		editSummary: 'Updating file links (automatic)',
		singleButtonText: 'Rename and replace',
		queueButtonText: 'Rename and add to queue'
	}
}
 
if (typeof localStorage.LIRQueuedUpdates === "undefined"){
	localStorage.LIRQueuedUpdates = 0;
	localStorage.LIRQueuedUpdatesPos = 1;
}
 
LIR = {
	started: false,
 
	/*************************************
	// Add image to queue function chain
	**************************************/
 
	start: function(type){
		if (!Storage){
			return false;
		}
 
		/* Checks if function has already started */
		if (LIR.started == true && typeof LIR.queuePosition === "undefined"){
			return false;
		}
 
		/* Checks whether renaming single image or adding to queue */
		if (typeof(type) !== "undefined"){
			if (type == "single"){
				LIR.started = true;
				/* Toggles appearance of the loading GIF */
				document.getElementById("liveLoader").style.display="inline-block";
				$("#queueStatus").html(" Processing");
				LIR.type = "single";
			}else if (type == "multi"){
				LIR.started = true;
 
				if (typeof LIR.queuePosition === "undefined"){
					LIR.queuePosition = ++localStorage.LIRQueuedUpdates;
 
					/* Toggles appearance of the loading GIF */
					document.getElementById("liveLoader").style.display="inline-block";
				}
 
				if (LIR.queuePosition != localStorage.LIRQueuedUpdatesPos){
					$("#queueStatus").html(" Number " + (LIR.queuePosition - localStorage.LIRQueuedUpdatesPos) + " in line to add to queue");
					setTimeout(function(){LIR.start(type)}, 500);
					return false;
				}
 
				$("#queueStatus").html(" Processing");
				LIR.type = "multi";
			}else{
				alert("Incorrect type specified");
				return false;
			}
		}else{
			LIR.started = true;
			/* Toggles appearance of the loading GIF */
			document.getElementById("liveLoader").style.display="inline-block";
			$("#queueStatus").html(" Processing");
			LIR.type = "single";
		}
 
		/* Retrieves queue, or resets variables if doesn't exist */
		if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined" && typeof (localStorage[wgUserName + "_LIRPageKey"]) !== "undefined"){
			LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
			LIR.pageKey = JSON.parse(localStorage[wgUserName + "_LIRPageKey"]);
		}else{
			LIR.queueData = [];
			LIR.pageKey = [];
		}
 
		/* Sets variables used by the function */
		var oldImageName = $('input[name="wpOldTitle"]').val().slice(5);
		var newImageName = document.getElementById("wpNewTitleMain").value;
		var current = {
			page: 0,
			content: ""
		}
 
		/* Checks old or new file name is currently part of the queue */
		for (i=0; i<LIR.queueData.length; i++){
			if (LIR.queueData[i].newImage == oldImageName || LIR.queueData[i].newImage == newImageName){
				alert("Image is already added to the queue, or the destination image name is already queued to be used by another file.");
				LIR.started = false;
				$("#queueStatus").html("");
				if (typeof LIR.queuePosition !== "undefined"){
					localStorage.LIRQueuedUpdatesPos++;
					delete LIR.queuePosition;
				}
				document.getElementById("liveLoader").style.display="none";
				return false;
			}
		}
 
		/* Checks if destination file name is valid (since Wikia's server-sided code usually validates this) */
		if (newImageName.slice(-4).search(/\.png/i) == -1 && newImageName.slice(-4).search(/\.jpg/i) == -1 && newImageName.slice(-5).search(/\.jpeg/i) == -1 && newImageName.slice(-4).search(/\.gif/i) == -1 && newImageName.slice(-4).search(/\.svg/i) == -1){
			alert("File name does not contain a valid file extension.  Please add a valid file extension.");
			LIR.started = false;
			$("#queueStatus").html("");
			if (typeof LIR.queuePosition !== "undefined"){
				localStorage.LIRQueuedUpdatesPos++;
				delete LIR.queuePosition;
			}
			document.getElementById("liveLoader").style.display="none";
			return false;
		}
 
		/* Check if detination file name is in use */
		$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+encodeURIComponent(newImageName)+"&format=json", function(result){
			if (result.query.imageusage.length == 0){
				/* If not, then get file usage for image */
				$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+encodeURIComponent(oldImageName)+"&iulimit=500&format=json", function(result){
					imageUsage = result.query.imageusage;
					if (console) console.log("Image usage successfully retrieved");
					if (imageUsage.length > 0){
 
						/* Resets queue-related variables if only renaming and replacing a single image */
						if (LIR.type == "single"){
							LIR.queueData = [];
							LIR.pageKey = [];
						}						
 
						/* Adds pages image is used on to window.LIR.pageKey to help keep track of pages in window.LIR.pageData later on */
						for (current.page = 0; current.page < imageUsage.length; current.page++){
							if (console) console.log("Beginning page "+current.page);
 
							var title = imageUsage[current.page].title;
 
							if (LIR.pageKey.indexOf(title) == -1){
								LIR.pageKey[LIR.pageKey.length] = title;
							}
 
							/* Temporary until Wikia fixes issue with editing blog comments through the API */
							if (title.search(/User blog comment/i) == -1){
								LIR.queueData[LIR.queueData.length] = {
									oldImage: oldImageName,
									newImage: newImageName,
									title: title,
								}
							}else{
								LIRBlogComment = true;
							}
						}
 
						/* Temporary until Wikia fixes issue with editing blog comments through the API */
						if (typeof(LIRBlogComment) === "undefined"){
							/* Stores queue if renaming multiple images, or updates file usage if only renaming one */
							if (LIR.type == "multi"){
								LIR.storeQueue(function() {
									LIR.started = false;
									localStorage.LIRQueuedUpdatesPos++;
									$("#wpReason").val($("#wpReason").val() + " (pages added to update queue)");
									$("#movepage").submit();
								});
							}else{
								/* This may seem odd, but because I use LIR.processQueue() for both single and multiple image 
									updating, it requires LIR.started to be false to start */
								LIR.started = false;
								LIR.processQueue(function(){
									$("#movepage").submit();
								});
							}
						}else{
							$("#queueStatus").html("");
							if (typeof LIR.queuePosition !== "undefined"){
								localStorage.LIRQueuedUpdatesPos++;
								delete LIR.queuePosition;
							}
							document.getElementById("liveLoader").style.display="none";
 
							alert("One of pages this image is used on is a blog comment. There is currently a bug with Wikia's API concerning editing blog comments.  Please update the file links manually.");
						}
 
 
					}else{
						/* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
						alert("Image is not being used on any pages.  Please use the regular rename button.");
						LIR.started = false;
						$("#queueStatus").html("");
						if (typeof LIR.queuePosition !== "undefined"){
							localStorage.LIRQueuedUpdatesPos++;
							delete LIR.queuePosition;
						}
						document.getElementById("liveLoader").style.display="none";
					}
				});
			}else{
				alert("This desired file name already exists. If you wish to use that file name, please either delete or rename the existing image.");
				LIR.started = false;
				$("#queueStatus").html("");
				if (typeof LIR.queuePosition !== "undefined"){
					localStorage.LIRQueuedUpdatesPos++;
					delete LIR.queuePosition;
				}
				document.getElementById("liveLoader").style.display="none";
			}
		});
	},
 
	storeQueue: function(callback){
		/* Standalone function to store the queue in window.localStorage
			uses wgUserName as a variable key so mulitple-user computers on the same wiki don't get each other's queue*/
		localStorage[wgUserName + "_LIRPageKey"] = JSON.stringify(LIR.pageKey);
		localStorage[wgUserName + "_LIRQueueData"] = JSON.stringify(LIR.queueData);
 
		if (typeof(callback) === "function"){
			callback();
		}
 
	},
 
	/**************************************
	// Process stored queue function chain
	**************************************/
 
	processQueue: function(callback){
		if (localStorage.LIRQueuedUpdates < localStorage.LIRQueuedUpdatesPos && localStorage.LIRQueuedUpdates != 0){
			localStorage.LIRQueuedUpdates = 0;
			localStorage.LIRQueuedUpdatesPos = 1;
		}
 
		/* Check if operation already started */
		if (LIR.started == true){
			return false;
		}
 
		/* Defaults to multi, since this function is called standalone when processing an existing queue */
		if (typeof(LIR.type) === "undefined"){
			LIR.type = "multi";
		}
 
		/* Variable redeclaration */
		LIR.started = true;
		LIR.requestCompleted  = [];
		LIR.pageData = [];
 
		/* Queue retrieval, returns false if no queue */
		if (LIR.type == "multi" && localStorage.LIRQueuedUpdates == 0){
			if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined" && typeof (localStorage[wgUserName + "_LIRPageKey"]) !== "undefined"){
				LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
				LIR.pageKey = JSON.parse(localStorage[wgUserName + "_LIRPageKey"]);
				if (console) console.log("Queue retrieved sucessfully.");
			}else{
				if (console) console.log("Queue does not exist or was unable to be retrieved.");
				alert("Queue does not exist or was unable to be retrieved.");
				LIR.started = false;
				return false;
			}
		}else if (LIR.type == "multi" && localStorage.LIRQueuedUpdates != 0){
			if (console) console.log("Pages still being added to the queue.");
			alert("Pages are still waiting to be added to the queue.  If this is not the case, please use the \"Reset waiting pages\" button to be able to process the queue.");
			LIR.started = false;
			return false;
		}
 
		if (console) console.log("Begin queue execution");
 
		/* Sets progress checking variables */
		for (i = 0; i<LIR.pageKey.length; i++){
			LIR.requestCompleted[i] = false;
		}
 
		/* Begin getting page contents */
		if (console) console.log("Getting page contents");
		titlesString = "";
 
		/* Constructing string of page titles for API query */
		for (i in LIR.pageKey){
			if (i == 0){
			titlesString += LIR.pageKey[i];
			}else{
			titlesString += "|"+LIR.pageKey[i];
			}
		}
 
		/* Calls API for page contents */
		$.post(
			"/api.php",
			{
				action: "query",
				prop: "revisions",
				rvprop: "content",
				titles: titlesString,
				format: "json"
			},
			function(result){
				/* Saves page contents for each page in window.LIR.pageData */
				for (i in result.query.pages){
					keyNum = LIR.pageKey.indexOf(result.query.pages[i].title);
					LIR.pageData[keyNum] = {title: LIR.pageKey[keyNum], content: result.query.pages[i].revisions[0]["*"], changed: false};
				}
				if (console) console.log("Page contents retrieved and saved");
				LIR.log("Page contents retrieved and saved");
 
				if (console) console.log("Begin processing page content.");
 
				/* Replacing image name on each page */
				for (i=0; i<LIR.queueData.length; i++){
					pageKey = LIR.pageKey.indexOf(LIR.queueData[i].title);
					escapedName = window.LIR.queueData[i].oldImage.replace(/\*/gi, "\\*").replace(/\?/gi, "\\?").replace(/\./gi, "\\.").replace(/ /gi, "[ _]*?").replace(/\(/gi, "\\(").replace(/\)/gi, "\\)");
					pageReplacement = new RegExp("(\\n[ ]*?|:?File:[ ]*?|=[ ]*?|\\|)" + escapedName + "([ ]*?\\n|[ ]*?\\||\\]|\\})", "gi");
					replacementReg = new RegExp(escapedName, "gi");
 
					if (LIR.pageData[pageKey].content.search(pageReplacement) != -1){
						LIR.pageData[pageKey].changed = true;
						if (console) console.log("\""+LIR.queueData[i].oldImage+"\" replaced on page \""+LIR.queueData[i].title+"\"");
 
						while ((regExec = pageReplacement.exec(LIR.pageData[pageKey].content)) != null){
							LIR.pageData[pageKey].content = LIR.pageData[pageKey].content.replace(regExec[0], regExec[0].replace(replacementReg, LIR.queueData[i].newImage));
							pageReplacement.lastIndex += (regExec[0].replace(replacementReg, LIR.queueData[i].newImage).length - regExec[0].length) - (regExec[2].length);
						}
					}else{
						if (LIR.type == "multi"){
							LIR.failedLog(LIR.queueData[i].oldImage, LIR.queueData[i].newImage, LIR.queueData[i].title);
						}else{
							alert("Unable to find \""+LIR.queueData[i].oldImage+"\" on page \""+LIR.queueData[i].title+"\". Please rename manually.");
						}
					}
				}
				LIR.log("Page content processed, saving");
				if (console) console.log("Begin submitting processed page content.");
 
				/* Submits edited pages */
				if (LIR.type == "multi"){
					$(".modalToolbar").prepend("<div id='LIRQueueProgress' style='float: left; width: 200px; border: 2px solid black; height: 17px;'><div id='LIRProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
					LIR.queueProgress = 0;
				}
 
				for (i=0; i<LIR.pageData.length; i++){
					if (LIR.pageData[i].changed == true){
						LIR.submitChangedPages(i, callback);
					}else{
						LIR.requestCompleted[i] = true;
					}
				}
			},
			"json"
		);
	},
 
	submitChangedPages: function(pageKey, callback) {
 
		$.ajax({
			url: "/api.php",
			type: "POST",
			async: true,
			data: {
				action: "edit",
				title: LIR.pageData[pageKey].title,
				summary: LIRoptions.editSummary,
				text: LIR.pageData[pageKey].content,
				minor: true,
				nocreate: true,
				redirect: false,
				bot: true,
				token: mediaWiki.user.tokens.get("editToken")
			},
			contentType: "application/x-www-form-urlencoded",
			error: function(){
				LIR.requestCompleted[pageKey] = true;
				alert("Unable to publish page \""+LIR.pageKey[pageKey]+"\".  Please rename images on that page manually.");
				if (LIR.requestCompleted.indexOf(false) == -1){
					delete localStorage[wgUserName + "_LIRPageKey"];
					delete localStorage[wgUserName + "_LIRQueueData"];
					LIR.started = false;
 
					if (typeof(callback) === "function"){
						callback();
					}
				}	
			},
			success: function(){
				LIR.requestCompleted[pageKey] = true;
				if (console) console.log("Posted page \""+LIR.pageKey[pageKey]+"\"");
				if (LIR.type == "multi"){
					$("#LIRProgressInd").css("width", ((++LIR.queueProgress) / LIR.pageKey.length * 100) + "%");
				}
 
 
				if (LIR.requestCompleted.indexOf(false) == -1){
					if (LIR.type == "multi"){
						/* Cleans up localStorage variables */
						delete localStorage[wgUserName + "_LIRPageKey"];
						delete localStorage[wgUserName + "_LIRQueueData"];
						LIR.started = false;
						$("#LIRQueueProgress").remove();
					}
					/* Call callback if exists */
					if (typeof(callback) === "function"){
						callback();
					}
				}
			}					
		});
	},
 
	/**************************************
	// Modal-related functions
	**************************************/
 
	log: function(message){
		if (typeof(LIR.logMessages) === "undefined"){
			LIR.logMessages = "<div style='font-weight: bold'>Queue system started.</div>";
		}
		LIR.logMessages = LIR.logMessages + "<div style='font-weight: bold'>" + message + "</div>";
 
		if ($("#LIRLog").length > 0){
			document.getElementById("LIRLog").innerHTML = LIR.logMessages;
			$("#LIRLog").scrollTop(100000000)
			$("#LIRLog div:odd").css("background-color", "grey");
		}
	},
 
	failedLog: function(oldI, newI, page){
		if (typeof(LIR.logFailed) === "undefined"){
			LIR.logFailed = "";
		}
		LIR.logFailed += "<div><a target='_blank' href='/wiki/File:" + encodeURIComponent(oldI.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + oldI + "</a> --&gt; <a target='_blank' href='/wiki/File:" + encodeURIComponent(newI.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + newI + "</a> on <a target='_blank' href='/wiki/" + encodeURIComponent(page.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + page + "</a></div>";
 
		if ($("#LIRFailedLog").length > 0){
			document.getElementById("LIRFailedLog").innerHTML = LIR.logFailed;
			$("#LIRFailedLog div:odd").css("background-color", "darkred");
		}
	},
 
	updateQueueListing: function(){
		if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined"){
			LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
		}else{
			document.getElementById("LIRQueue").innerHTML = "<div>There is currently nothing in the queue.</div>";
			LIR.log("Queue updated.");
			return false;
		}
 
		LIRCurrentQueueData = LIR.queueData;
		queueToAdd = "";
 
		for (i = 0; i<LIRCurrentQueueData.length; i++){
			queueToAdd += "<div><a target='_blank' href='/wiki/File:" + encodeURIComponent(LIRCurrentQueueData[i].oldImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + LIRCurrentQueueData[i].oldImage + "</a> --&gt; <a target='_blank' href='/wiki/File:" + encodeURIComponent(LIRCurrentQueueData[i].newImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + LIRCurrentQueueData[i].newImage + "</a> on <a target='_blank' href='/wiki/" + encodeURIComponent(LIRCurrentQueueData[i].title.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"'>" + LIRCurrentQueueData[i].title + "</a></div>";
		}
 
		document.getElementById("LIRQueue").innerHTML = queueToAdd;
		$("#LIRQueue div:odd").css("background-color", "lightgrey");
		LIR.log("Queue updated.");
	},
 
	showQueueModal: function(){
		$.showCustomModal( 
			"Image link updating queue", 
			'<div id="LIRContainer" style="width: 100%;"> <div id="LIRQueue" style="overflow: scroll; width: 580px; height: 300px; float: left; border: 1px solid black; font-weight: bold; background-color: #FFFFFF;"></div> <div id="LIRLog" style="overflow-x: scroll; height: 300px; width: 200px; float: right; background-color: lightgrey; border: 1px solid black;"></div> <div style="clear: both"></div> <div id="LIRFailedLog" style="width: 790px; margin: 5px auto 0px auto; background-color: red; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll;">Failed items appear here after execution.</div> </div>', 
			{
				id: "optionsWindow",
				width: 800,
				buttons: [
					{
						id: "close",
						message: "Close",
						handler: function () {
							$(".close").click();
						}
					},
					{
						id: "resetCounter",
						message: "Reset waiting pages",
						handler: function () {
							if (confirm("This will reset the list of pages waiting to be added to the queue in-case there was a problem processing a page that's preventing you from executing the queue.  \n\nNote that there are still " + (localStorage.LIRQueuedUpdates - localStorage.LIRQueuedUpdatesPos - 1) + " page(s) waiting to be added to the queue.  If you are absolutely positive that you currently have no pages open that are waiting in line to be processed or a problem has occured that has halted page processing, then press OK to clear the list of waiting pages. \n\nIf you do have any pages waiting to be processed, you will have to reload and resubmit those pages to the queue to add them.")){
								localStorage.LIRQueuedUpdates = 0;
								localStorage.LIRQueuedUpdatesPos = 1;
								alert("List of waiting pages cleared");
							}
						}
					},
					{
						id: "updateButton",
						message: "Refresh",
						handler: function(){
							LIR.updateQueueListing();
						}
					},
					{
						id: "executeButton",
						message: "Execute",
						defaultButton: true,
						handler: function(){
							if (typeof localStorage[wgUserName + "_LIRQueueData"] !== "undefined" && typeof localStorage[wgUserName + "_LIRPageKey"] !== "undefined"){
								LIR.log("Queue execution started.");
								LIR.processQueue(function(){
									LIR.log("Queue executed.");
									LIR.updateQueueListing();
								});
							}else{
								LIR.log("No queue exists to be executed");
							}
						}
					}/*,
					{
						id: "saveQueue",
						defaultButton: true,
						message: "Save",
						handler: function () {
							if (confirm("Save the queue?  These changes can't be undone.")){
 
							}
						}
					}
					*/
				],
				callback: function(){
					$(".blackout, .close").off("click").click(function(){
						if ((LIR.started == false || typeof(LIR.started) === "undefined")){
							delete LIRCurrentQueueData;
							delete LIRCurrentPageKey;
							$("#optionsWindow").remove();
							$(".blackout").fadeOut(function(){
								$(this).remove();
							});
						}
					});
 
					LIR.log("Queue system opened.");
					LIR.updateQueueListing();
				}
			}
		);
	}
}
 
if (wgPageName.indexOf("Special:MovePage/File:") != -1){
	LIR.appendButtonText = "<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.start(\"single\")'>" + LIRoptions.singleButtonText + "</a>";
 
	if (Storage){
		LIR.appendButtonText += "<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.start(\"multi\")'>" + LIRoptions.queueButtonText + "</a>";
	}
 
	LIR.appendButtonText += "<span id='liveLoader' style='display:none'><img src='https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif' /></span><span id='queueStatus' style='font-weight: bold'></span></span><br /><br /><div style='width: 850px; white-space: normal;'>The <b>\""+LIRoptions.singleButtonText+"\"</b> button updates file usages across pages for a single image, while the <b>\""+LIRoptions.queueButtonText+"\"</b> button adds the file usages of the image to a queue to be updated at one time as a group. When updating file usages using the queue, usages located on like pages are grouped together into one edit, rather than one edit per usage. The queue can be accessed and executed through any file page inside the \"Edit\" drop-down. Please note that a saved queue is local to the computer being used, and does not carry over to other computers.</div>";
 
	if (LIRoptions.bottomMessage != ""){
	LIR.appendButtonText += ('<br /><div style="font-weight: bold; width: 850px; white-space: normal;">' + LIRoptions.bottomMessage + '</div>');
	}
 
	$('td.mw-submit').append(LIR.appendButtonText);
}
 
if (wgCanonicalNamespace == "File" && Storage){
	$("#WikiaPageHeader nav ul").append("<li><a onclick='LIR.showQueueModal()'>Queue</a></li>");
}
 

//compare it to a predefined list of levels,
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    if ($("#UserProfileMasthead").size()) {
      editRanks = {
        1:"Newbie",
        10:"Starter",
        50:"Beginner",
        100:"Whatever",
        100000:"Through the roof",
      }
      editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
      if (editCount) {
        for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
        $("#UserProfileMasthead hgroup").append($("<div>").addClass("tag").html(editRank));
      }
    }
  }
}

/* Main page */
/** Poll text **/
$(document).ready(function() {
	$(".ajax-poll .total").parent().addClass("pollText");
});
 
/**************************************************************/
/* sliders using jquery by User:Tierrie in Dragon Age Wiki */
/**************************************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
});
} );

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
 
/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny)
 */
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = '<br>Auto-Refresh',
	refreshHover = 'Enable auto-refreshing of this page',
        RecentChangesLocal,
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges','Special:WikiActivity' );
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" );
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		}
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false,
		appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
	appTo.append( '&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).show();
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		var	$collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
		if ( location.href == settings.url ) {
			$( this ).hide();
			for ( var i = 0; i < ajaxCallAgain.length; i++ ) {
				ajaxCallAgain[i]();
			}
			if ( $collapsibleElements.length ) {
				$collapsibleElements.makeCollapsible();
			}
			if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
				mw.special.recentchanges.init();
                                if ( $( '.mw-recentchanges-table' ).find( '.WikiaDropdown' ).length ) {
						RecentChangesLocal.init();
				}
			}
		}
	} );
	$( '#ajaxToggle' ).click( toggleAjaxReload );
	$( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
	if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
		loadPageData();
	}
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = '#mw-content-text';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( loadPageData, ajaxRefresh );
		}
	} );
}
 
/**
 * Load the script on specific pages
 */
$( function () {
	for ( var x = 0; x < ajaxPages.length; x++ ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );
 
        /**
	 * Temp Hack: copy the RC filter JS since it can't be accessed
	 * @source <https://github.com/Wikia/app/blob/dev/extensions/wikia/RecentChanges/js/RecentChanges.js>
	 */
	RecentChangesLocal = {
		init: function () {
			this.$table = $( '.mw-recentchanges-table' );
			this.$dropdown = this.$table.find( '.WikiaDropdown' );
			this.$submit = this.$table.find('input[type="submit"]');
			this.$submit.on( 'click.RecentChangesDropdown', $.proxy( this.saveFilters, this ) );
			this.$submit.removeAttr( 'disabled' ); //FF clean
			this.dropdown = new Wikia.MultiSelectDropdown( this.$dropdown );
			this.dropdown.on( 'change', $.proxy( this.onChange, this ) );
 
		},
 
		saveFilters: function( event ) {
			var self = this;
 
			event.preventDefault();
 
			self.dropdown.disable();
			self.$submit.attr( 'disabled', 'disabled' );
 
			if ( self.dropdown.getSelectedValues().length === 0 ) {
				self.dropdown.doSelectAll( true );
			}
 
			$.nirvana.sendRequest( {
				controller: 'RecentChangesController',
				method: 'saveFilters',
				data: {
					filters: self.dropdown.getSelectedValues()
				},
				type: 'POST',
				format: 'json',
				callback: function ( data ) {
					window.location.reload();
				}
			} );
		}
	};
 
//**Back to top**//
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* tabber: changing the tab displayed by default for certain pages */
/* (source: http://community.wikia.com/wiki/Forum:Extension:Tabber_-_Setting_the_default_tab_displayed) */
 
if (mw.config.get('wgPageName') === 'Human_Vanguard' || mw.config.get('wgPageName') === 'Human_Infiltrator' || mw.config.get('wgPageName') === 'Human_Adept') {
    $(window).on('load.tabberhack', function() {
        $('.tabberlive')[0].tabber.tabShow(1);
        $(window).off('load.tabberhack');
    });
};
 
 
 
 
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
$(function () {
    var rights = {};
    var majestic = "<a href=http://deusex.wikia.com/wiki/Francis_Pritchard><font color=GhostWhite><u>Nucl3arsnake</u></a>";
    var admin = "mech-aug";
    var bureaucrat = "<a href=http://deusex.wikia.com/wiki/Deus_Ex_Wiki:Administrators><font color=GhostWhite><u>nano-aug</u></a>";
    var staff = "Staff";
    var vstf = "VSTF";
 
    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
 
   //Administrator
 
    rights['Someone is an admin']          = [admin],
    rights['Someone else is an admin']     = [admin],
 
 
   //Bureaucrat and VSTF
 
    rights["ResistanZ"]                     = [bureaucrat, majestic],
 
   //Bureaucrat
 
    rights[""]                    = [bureaucrat],
 
 
   //Staff
 
    rights[""]                  = [staff];
 
    // End list of accounts given extra user rights icons
 
 
    if (wgPageName.indexOf("Special:Contributions") != -1) {
        newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        unfinishedTitle = newTitle;
 
        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }
 
        userName = unfinishedTitle;
 
    } else {
        userName = wgTitle;
        userName.replace("User:", "");
    }
 
    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
/**
 * Helper script for the .hlist class in [[MediaWiki:Common.css]] and [[MediaWiki:Wikia.css]]
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 */
( function ( mw, $ ) {
    var profile = $.client.profile();
    if ( profile.name === 'msie' && profile.versionNumber === 8 ) {
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            $content.find( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
                .addClass( 'hlist-last-child' );
        } );
    }
}( mediaWiki, jQuery ) );
 
// ============================================================
// BEGIN Template:Games
// ============================================================
 
// Description: Add icons to article title
// Credit:      User:Porter21 (modifications by User:Rappy and User:Gardimuer)
 
$(function addTitleIcons () {
   if (skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
		case 'monobook':
			insertTarget = $('#firstHeading');
			break;
 
		case 'oasis':
			if (wgAction != 'submit' && wgNamespaceNumber != 112 && $('#va-titleicons').length > 0) {
				insertTarget = $('#WikiaPageHeader .tally');
				$('#WikiaPageHeader .tally').html(' ').css('width', '200px');
			}
			break;
      }
 
      if (insertTarget) {
		$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		$('#va-titleicons-more').append('<img width="0" height="0" class="va-titleicons-chevron" src="' + wgBlankImgUrl + '">');
 
		$('#va-titleicons').hover(
			function () {
				$(this).addClass('va-titleicons-hover');
			}, function () {
				$(this).removeClass('va-titleicons-hover');
			});
      }
   }
});
 
// ============================================================
// END Template:Games
// ============================================================