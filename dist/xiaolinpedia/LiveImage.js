//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>
/**
*
* Description:
* 		Updates file links in use on the wiki when image is renamed.
*
* @Author Foodbandlt
*
**/

// Options processing

if (typeof (window.LIRoptions) !== "undefined"){
		if (typeof (window.LIRoptions.bottomMessage) !== "undefined"){
			if (window.LIRoptions.bottomMessage == ""){
				delete window.LIRoptions.bottomMessage;
			}
		}
		if (typeof (window.LIRoptions.editSummary) === "undefined"){
			window.LIRoptions.editSummary = "Updating file link (automatic)";
		}
		if (typeof (window.LIRoptions.buttonText) !== "undefined"){
			if (window.LIRoptions.buttonText == ""){
				window.LIRoptions.buttonText = "Rename image and change all occurrences";
			}
		}else{
			window.LIRoptions.buttonText = "Rename image and change all occurrences";
		}
		
	}else{
		LIRoptions = {
			editSummary: 'Updating file links (automatic)',
			buttonText: 'Rename image and change all occurrences'
		}
	}


window.LIR = {
	started: false,
	
	/*************************************
	// Add image to queue function chain
	**************************************/
	
	addToQueueInit: function(){
		if (window.LIR.started == true){
			return false;
		}
		
		window.LIR.started = true;
		window.LIR.requestPending = [];
		imageAlreadyAdded = false;
		document.getElementById("liveLoader").style.display="inline-block";
		if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined" && typeof (localStorage[wgUserName + "_LIRPageKey"]) !== "undefined"){
			window.LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
			window.LIR.pageKey = JSON.parse(localStorage[wgUserName + "_LIRPageKey"]);
		}else{
			window.LIR.queueData = [];
			window.LIR.pageKey = [];
		}

		var LIR = {
			oldImageName: $('input[name="wpOldTitle"]').val().replace("File:", ""),
			newImageName: $('#wpNewTitleMain').val(),
			current: {
				page: 0,
				content: ""
			}
		}
		
		for (i=0; i<window.LIR.queueData.length; i++){
			if (window.LIR.queueData[i].oldImage == LIR.oldImageName || window.LIR.queueData[i].newImage == LIR.newImageName){
				alert("Image is already added to the queue, or the destination image name is already queued to be used by another file.");
				window.LIR.started = false;
				document.getElementById("liveLoader").style.display="none";
				return false;
			}
		}
		
		if (LIR.newImageName.slice(-4).search(/\.png/i) == -1 && LIR.newImageName.slice(-4).search(/\.jpg/i) == -1 && LIR.newImageName.slice(-5).search(/\.jpeg/i) == -1 && LIR.newImageName.slice(-4).search(/\.gif/i) == -1 && LIR.newImageName.slice(-4).search(/\.svg/i) == -1){
			alert("File name does not contain a valid file extension.  Please add a valid file extension.");
			window.LIR.started = false;
			document.getElementById("liveLoader").style.display="none";
			return false;
		}
		
		$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+LIR.newImageName+"&format=json", function(result){
			if (result.query.imageusage.length == 0){

				$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+LIR.oldImageName+"&iulimit=500&format=json", function(result){
					LIR.imageUsage = result.query.imageusage;
					if (console) console.log("Image usage successfully retrieved");
					if (LIR.imageUsage.length > 0){
						
						for (i = 0; i<LIR.imageUsage.length; i++){
							window.LIR.requestPending[i] = true;
						}
						
						for (LIR.current.page = 0; LIR.current.page < LIR.imageUsage.length; LIR.current.page++){
							if (console) console.log("Beginning page "+LIR.current.page);
							window.LIR.addToQueue(
								LIR.imageUsage[LIR.current.page].title,
								LIR.current.page,
								LIR.oldImageName,
								LIR.oldImageName.replace(/ /g, "_"),
								LIR.newImageName
							)
						}

						}else{
							alert("Image is not being used on any pages.  Please use the regular rename button.");
							window.LIR.started = false;
							document.getElementById("liveLoader").style.display="none";
						}
					});
			}else{
				alert("This desired file name already exists. If you wish to use that file name, please either delete or rename the existing image.");
				window.LIR.started = false;
				document.getElementById("liveLoader").style.display="none";
			}
		});
	},
	
	addToQueue: function(title, pageNum, oldImageName, oldImageNameU, newImageName){
		
		if (window.LIR.pageKey.indexOf(title) == -1){
			window.LIR.pageKey[window.LIR.pageKey.length] = title;
		}
		
			window.LIR.requestPending[pageNum] = false;
			
			if (title.search(/User blog comment/i) == -1){
			
				window.LIR.queueData[window.LIR.queueData.length] = {
					oldImage: oldImageName,
					oldImageU: oldImageNameU,
					newImage: newImageName,
					title: title,
					status: 0
				}
			}else{
				window.LIRBlogComment = true;
			}
		
		
		if (window.LIR.requestPending.indexOf(true) == -1){
			if (typeof(window.LIRBlogComment) === "undefined"){
				LIR.storeQueue(function() {
					window.LIR.started = false;
					$("#wpReason").val($("#wpReason").val() + " (pages added to update queue)")
					$("#movepage").submit();
				});
			}else{
				document.getElementById("liveLoader").style.display="none";
				alert("One of pages this image is used on is a blog comment. There is currently a bug with Wikia's API concerning editing blog comments.  Please update the file links manually.");
			}
		}
	},
	
	storeQueue: function(callback){

		window.localStorage[wgUserName + "_LIRPageKey"] = JSON.stringify(window.LIR.pageKey);
		window.localStorage[wgUserName + "_LIRQueueData"] = JSON.stringify(window.LIR.queueData);

		if (typeof(callback) === "function"){
			callback();
		}
		
	},

	/**************************************
	// Process stored queue function chain
	**************************************/
	
	processQueue: function(callback){
		/* Check if operation already started */
		if (window.LIR.started == true){
			return false;
		}
		
		/* Variable redeclaration */
		window.LIR.started = true;
		window.LIR.requestCompleted  = [];
		window.LIR.pageData = [];
		
		/* Queue retrieval, returns false if no queue */
		if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined" && typeof (localStorage[wgUserName + "_LIRPageKey"]) !== "undefined"){
			window.LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
			window.LIR.pageKey = JSON.parse(localStorage[wgUserName + "_LIRPageKey"]);
			if (console) console.log("Queue retrieved sucessfully.");
		}else{
			if (console) console.log("Queue does not exist or was unable to be retrieved.");
			window.LIR.started = false;
			return false;
		}
		
		if (console) console.log("Begin queue processing");

		/* Sets progress checking variables */
		for (i = 0; i<window.LIR.pageKey.length; i++){
			window.LIR.requestCompleted[i] = false;
		}
		
		/* Begin getting page contents */
		if (console) console.log("Getting page contents");
		titlesString = "";
		
		/* Constructing string of page titles for API query */
		for (i in window.LIR.pageKey){
			if (i == 0){
			titlesString += window.LIR.pageKey[i];
			}else{
			titlesString += "|"+window.LIR.pageKey[i];
			}
		}
		
		/* Calls API for page contents */
		$.ajax({
			url: "/api.php?action=query&prop=revisions&rvprop=content&titles="+encodeURI(titlesString)+"&format=json",
			type: "GET",
			async: true,
			cache: false,
			dataType: "json",
			success: function(result){
				/* Saves page contents for each page in window.LIR.pageData */
				for (i in result.query.pages){
					keyNum = window.LIR.pageKey.indexOf(result.query.pages[i].title);
					window.LIR.pageData[keyNum] = {title: window.LIR.pageKey[keyNum], content: result.query.pages[i].revisions[0]["*"], changed: false};
				}
				if (console) console.log("Page contents retrieved and saved");
				LIR.log("Page contents retrieved and saved");
				LIR.executeQueue(callback);
			}
		});
	},
	 
	executeQueue: function(callback){
		if (console) console.log("Begin processing page content.");
	
		/* Replacing image name on each page */
		for (i=0; i<window.LIR.queueData.length; i++){
		
			if (window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].content.search(RegExp(window.LIR.queueData[i].oldImage, "gi")) != -1 || window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].content.search(RegExp(window.LIR.queueData[i].oldImageU, "gi")) != -1){
				if (window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].content.search(RegExp(window.LIR.queueData[i].oldImage, "gi")) != -1){
					window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].changed = true;
					if (console) console.log("\""+window.LIR.queueData[i].oldImage+"\" replaced on page \""+window.LIR.queueData[i].title+"\"");
					window.LIR.pageData[ window.LIR.pageKey.indexOf(window.LIR.queueData[i].title) ].content = window.LIR.pageData[ window.LIR.pageKey.indexOf(window.LIR.queueData[i].title) ].content.replace(RegExp(window.LIR.queueData[i].oldImage, "gi"), window.LIR.queueData[i].newImage);
				}
				if (window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].content.search(RegExp(window.LIR.queueData[i].oldImageU, "gi")) != -1){
					window.LIR.pageData[window.LIR.pageKey.indexOf(window.LIR.queueData[i].title)].changed = true;
					if (console) console.log("\""+window.LIR.queueData[i].oldImage+"\" replaced on page \""+window.LIR.queueData[i].title+"\"");
					window.LIR.pageData[ window.LIR.pageKey.indexOf(window.LIR.queueData[i].title) ].content = window.LIR.pageData[ window.LIR.pageKey.indexOf(window.LIR.queueData[i].title) ].content.replace(RegExp(window.LIR.queueData[i].oldImageU, "gi"), window.LIR.queueData[i].newImage);
				}
			}else{
			alert("Unable to find \""+window.LIR.queueData[i].oldImage+"\" on page \""+window.LIR.queueData[i].title+"\". Please rename manually.");
			}
		}
		LIR.log("Page content processed, saving");
		
		/* Calls function once for every page retrieved to submit the changed pages */
		for (i=0; i<window.LIR.pageData.length; i++){
			LIR.submitChangedPages(i, callback);
		}
	},
	
	submitChangedPages: function(pageKey, callback) {
		if (console) console.log("Begin submitting processed page content.");
		
		$.ajax({
			url: "/api.php",
			type: "POST",
			async: true,
			data: {
				action: "edit",
				title: window.LIR.pageData[pageKey].title,
				summary: window.LIRoptions.editSummary,
				text: window.LIR.pageData[pageKey].content,
				minor: true,
				nocreate: true,
				redirect: false,
				bot: true,
				token: mediaWiki.user.tokens.get("editToken")
			},
			contentType: "application/x-www-form-urlencoded",
			error: function(){
				window.LIR.requestCompleted[pageKey] = true;
				alert("Unable to publish page \""+window.LIR.pageKey[pageKey]+"\".  Please rename images on that page manually.");
				if (window.LIR.requestCompleted.indexOf(false) == -1){
					delete window.localStorage[wgUserName + "_LIRPageKey"];
					delete window.localStorage[wgUserName + "_LIRQueueData"];
					window.LIR.started = false;
					
					if (typeof(callback) === "function"){
						callback();
					}
				}	
			},
			success: function(){
				window.LIR.requestCompleted[pageKey] = true;
				if (console) console.log("Posted page \""+window.LIR.pageKey[pageKey]+"\"");
				
				if (window.LIR.requestCompleted.indexOf(false) == -1){
					/* Cleans up localStorage variables */
					delete window.localStorage[wgUserName + "_LIRPageKey"];
					delete window.localStorage[wgUserName + "_LIRQueueData"];
					window.LIR.started = false;
					
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
		if (typeof(window.LIR.logMessages) === "undefined"){
			window.LIR.logMessages = "<div style='font-weight: bold'>Queue system started.</div>";
		}
		window.LIR.logMessages = window.LIR.logMessages + "<div style='font-weight: bold'>" + message + "</div>";
		document.getElementById("LIRLog").innerHTML = window.LIR.logMessages;
		$("#LIRLog").scrollTop(100000000)
		$("#LIRLog div:odd").css("background-color", "grey");
	},

	updateQueueListing: function(){
		if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined"){
			window.LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
		}else{
			document.getElementById("LIRQueue").innerHTML = "<div>There is currently nothing in the queue.</div>";
			LIR.log("Queue updated.");
			return false;
		}
		
		window.LIRCurrentQueueData = window.LIR.queueData;
		queueToAdd = "";
		
		for (i = 0; i<window.LIRCurrentQueueData.length; i++){
			queueToAdd += "<div><a target='_blank' href='/wiki/File:"+window.LIRCurrentQueueData[i].oldImage+"'>" + window.LIRCurrentQueueData[i].oldImage + "</a> --&gt; <a target='_blank' href='/wiki/File:"+window.LIRCurrentQueueData[i].newImage+"'>" + window.LIRCurrentQueueData[i].newImage + "</a> on <a target='_blank' href='/wiki/"+window.LIRCurrentQueueData[i].title+"'>" + window.LIRCurrentQueueData[i].title + "</a></div>";
		}
		
		document.getElementById("LIRQueue").innerHTML = queueToAdd;
		$("#LIRQueue div:odd").css("background-color", "lightgrey");
		LIR.log("Queue updated.");
	},

	showQueueModal: function(){
		$.showCustomModal( 
			"Image link updating queue", 
			'<div id="LIRContainer" style="width: 100%;"> <div id="LIRQueue" style="overflow: scroll; width: 580px; height: 400px; float: left; border: 1px solid black; font-weight: bold;"></div> <div id="LIRLog" style="overflow-x: scroll; height: 400px; width: 200px; float: right; background-color: lightgrey; border: 1px solid black;"></div> <div style="clear: both"></div> </div>', 
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
						id: "updateButton",
						message: "Refresh",
						handler: function(){
							window.LIR.updateQueueListing();
						}
					},
					{
						id: "processButton",
						message: "Process",
						handler: function(){
							LIR.log("Queue processing started.");
							LIR.processQueue(function(){
								LIR.log("Queue processed.");
								window.LIR.updateQueueListing();
							});
						}
					},
					{
						id: "saveQueue",
						defaultButton: true,
						message: "Save",
						handler: function () {
							if (confirm("Save the queue?  These changes can't be undone.")){
							
							}
						}
					}
				],
				callback: function(){
					$(".blackout, .close").off("click");
					$(".blackout, .close").click(function(){
						if ((window.LIR.started == false || typeof(window.LIR.started) === "undefined")){
							delete window.LIRCurrentQueueData;
							delete window.LIRCurrentPageKey;
							$("#optionsWindow").remove();
							$(".blackout").fadeOut(function(){
								$(this).remove();
							});
						}
					});
		
					LIR.log("Queue system opened.");
					window.LIR.updateQueueListing();
				}
			}
		);
	}
}
	
if (wgPageName.indexOf("Special:MovePage/File:") != -1 && Storage){
	LIR.appendButtonText = "<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.addToQueueInit()'>Rename image and add to queue for replacement</a><span id='liveLoader' style='display:none'><img src='https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif' /></span><br /><br /><span style='font-weight: bold;'>Access the queue through the edit drop-down of any file page.</span>"; //<span style=\"font-weight: bold\">Note: Only use \"change all occurrences\" when you do not think that the filename will be found inside other filenames on the same page.<br />(ex. renaming \"File:Sitting.png\" will also unintentionally change \"Man sitting.png\")</span>";

	if (typeof (window.LIRoptions.bottomMessage) !== "undefined"){
	//LIR.appendButtonText += ('<br /><br /><span style="font-weight: bold">' + window.LIRoptions.bottomMessage + '</span>');
	}
	
	$('td.mw-submit').append(LIR.appendButtonText);
}
	
if (wgCanonicalNamespace == "File" && Storage){
	$("#WikiaPageHeader nav ul").append("<li><a onclick='LIR.showQueueModal()'>Queue</a></li>");
}


//</nowiki>
//</source>