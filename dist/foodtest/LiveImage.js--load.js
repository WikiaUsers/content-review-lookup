// See [[FileUsageAuto-update/code.js/load.js]] for code!
//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>
/**
*
* Description:
* Updates file links in use on the wiki when image is renamed.
*
* @Author Foodbandlt
* @Author Jr Mime
* Last updated 3 April, 2015
**/

// Options processing
	
if (typeof LIR === "undefined"){

	LIR = {
		/**************************************
		// Multilingual support (sorry about the amount of messages...)
		**************************************/
		supportedLanguages: ["en", "fr", "pl"],

		/* 
			To insert new languages, add the language code to the supportedLanguages array above and 
			make a sub-page of FileUsageAuto-update with the name of your language code
			example: FileUsageAuto-update/en.js
		*/
		
		i18n: {
			// Compatibility with how Wikia handles non-English wikis... ugh
			en: {
				fileNamespace: 'File',
				imageNamespace: 'Image',
				videoNamespace: 'Video',
			}
		},
		// Wiki's selected language
		lang: '',
		// User's selected language
		userLang: '',
		
		ERRORS: [],
		
		/**************************************
		// Object instance-related functions
		**************************************/
	
		constructInstance: function(button){
			this.started = false;
			
			this.buttonId = button;
			
			this.method = '',
			
			this.updateStatus = function(gifDisplay, message){
				if ($("#queueStatus-" + this.buttonId).length == 0  && $("#liveLoader-" + this.buttonId).length == 0) return false;
			
				if (typeof gifDisplay === "string"){
					message = gifDisplay;
				}else if (typeof gifDisplay === "boolean"){
					if (gifDisplay == false){
						displayValue = "none";
					}else{
						displayValue = "inline-block";
					}
					if ($("#liveLoader-" + this.buttonId).length > 0){
						$("#liveLoader-" + this.buttonId).css("display", displayValue);
					}
				}else{
					return false;
				}
				
				if (typeof message === "string" && $("#queueStatus-" + this.buttonId).length > 0){
					$("#queueStatus-" + this.buttonId).html(" " + message);
				}
				return true;
			};
			
			this.start = function(type, oldName, newName, reason, callback){
				LIR.rand = Math.floor( Math.random()*1000 );
				/*Variable used for closure to access the instance of the object*/
				var objectInst = this;
				
				if (!Storage){
					return false;
				}
				
				/* Checks if function has already started */
				if ((this.started == true || LIR.started == true) && typeof this.queuePosition === "undefined"){
					return false;
				}
				
				/* Treat manual additions like multi because I'm lazy */
				if (type == "manual"){
					type = "multi";
					this.method = "manual";
					
					this.updateStatus(true, LIR.userLang.processing);
				}
				
				/* Checks whether renaming single image or adding to queue */
				if (typeof(type) !== "undefined"){
					if (type == "single"){
						this.started = true;
						this.updateStatus(true, LIR.userLang.processing);
						this.type = "single";
					}else if (type == "multi"){
						this.started = true;
						
						if (typeof this.queuePosition === "undefined"){
							this.queuePosition = ++localStorage.LIRQueuedUpdates;
							this.updateStatus(true);
						}
						
						if (this.queuePosition != localStorage.LIRQueuedUpdatesPos){
							this.updateStatus( LIR.userLang.waitList[0] + " " + ((this.queuePosition - localStorage.LIRQueuedUpdatesPos)) + " " + LIR.userLang.waitList[1] );
							setTimeout(function(){
								objectInst.start(type, oldName, newName, reason, callback)
							}, 
							500);
							return false;
						}
						
						this.updateStatus(LIR.userLang.processing);
						this.type = "multi";
					}else{
						if (console) console.log("Incorrect type specified");
						return false;
					}
				}else{
					this.started = true;
					this.updateStatus(true, LIR.userLang.processing);
					this.type = "single";
				}
				
				/* Retrieves queue, or resets variables if doesn't exist */
				if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined"){
					this.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
				}else{
					this.queueData = [];
				}

				/* Sets variables used by the function */
				if (typeof oldName != "undefined" && typeof newName != "undefined"){
					if (oldName == "" || newName == ""){
						this.updateStatus(false, LIR.userLang.fileNameBlank);
						this.started = false;
						localStorage.LIRQueuedUpdatesPos++;
						delete this.queuePosition;
						return false;
					}
					var oldImageName = oldName,
						newImageName = newName;
						if (typeof reason == "undefined") var reason = "";
				}else{
					var oldImageName = $('input[name="wpOldTitle"]').val().slice(LIR.lang.fileNamespace.length + 1),
						newImageName = $("#wpNewTitleMain").val(),
						reason = $("#wpReason").val();
				}
				
				if ( $("#wpLeaveRedirect").length != 0 ){
					var leaveRedirect = $("#wpLeaveRedirect").is(":checked");
				}else{
					var leaveRedirect = false;
				}
				
				this.pageKey = [];
				
				/* Checks if old or new file name is currently part of the queue */
				for (i=0; i<this.queueData.length; i++){
					if (this.queueData[i].newImage == oldImageName || 
						this.queueData[i].newImage == newImageName || 
						this.queueData[i].oldImage == oldImageName || 
						this.queueData[i].oldImage == newImageName){
						
						this.started = false;
						if (typeof this.queuePosition !== "undefined"){
							localStorage.LIRQueuedUpdatesPos++;
							delete this.queuePosition;
						}
						
						if (this.queueData[i].oldImage == oldImageName || this.queueData[i].newImage == oldImageName){
							var errorMessage = 'alreadyInQueue';
						}else{
							var errorMessage = 'nameInUse';
						}
						
						this.updateStatus(false, LIR.userLang[errorMessage]);
						if (typeof(callback) === "function"){
							callback(false, errorMessage);
						}
						return false;
					}
				}
				var isVideo = true;
				for (var ext in wgFileExtensions){
					if (oldImageName.indexOf("." + wgFileExtensions[ext]) != -1){
						isVideo = false;
						break;
					}
				}
				
				/* Checks if destination file name is the same as file being renamed (since Wikia's server-sided code usually validates this) */
				var oldExt = oldImageName.slice(oldImageName.lastIndexOf(".")).toLowerCase();
				var newExt = newImageName.slice(newImageName.lastIndexOf(".")).toLowerCase();
				
				if (oldExt != newExt && 
					!((oldExt == ".jpeg" || oldExt == ".jpg") && (newExt == ".jpeg" || newExt == ".jpg")) && // Same MIME type bugfix
					this.method != "manual" && 
					!isVideo){
					
					this.started = false;
					if (typeof this.queuePosition !== "undefined"){
						localStorage.LIRQueuedUpdatesPos++;
						delete this.queuePosition;
					}
					this.updateStatus(false, LIR.userLang.invalidExtension);
					if (typeof(callback) === "function"){
						callback(false, "invalidExtension");
					}
					return false;
				}
				
				if (localStorage[wgUserName + "_LIRNamespaceSelection"] == false){
					var namespaceSelection = "&blnamespace=0";
				}else{
					var namespaceSelection = "";
				}
				

				/* Check if destination file name is in use */
				$.getJSON("/api.php?action=query&prop=revisions&rvprop=content&titles=" + LIR.lang.fileNamespace + ":"+encodeURIComponent(newImageName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"&format=json&v=" + LIR.rand, function(result){
					if (typeof result.query.pages[-1] !== "undefined" || objectInst.method == "manual"){
						/* If not, then get file usage for image */
						$.getJSON("/api.php?action=query&list=imageusage&iutitle=" + LIR.lang.fileNamespace + ":"+encodeURIComponent(oldImageName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"&iulimit=20&format=json&v=" + LIR.rand, function(result){
							var imageUsage = result.query.imageusage;
							
							$.getJSON("/api.php?action=query" + namespaceSelection + "&list=backlinks&bltitle=" + LIR.lang.fileNamespace + ":" + encodeURIComponent(oldImageName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json&v=" + LIR.rand, function(result){
								var imageLinks = result.query.backlinks;
								var totalImageUsage = imageUsage.concat(imageLinks);
								
								if (console) console.log("Image usage successfully retrieved");
								if (totalImageUsage.length > 0){
								
									/* Resets queue-related variables if only renaming and replacing a single image */
									if (objectInst.type == "single"){
										
										objectInst.queueData = [];
										objectInst.queueDataList = [];
										objectInst.pageKey = [];
										
										for (var currentPage = 0; currentPage < totalImageUsage.length; currentPage++){
											var title = totalImageUsage[currentPage].title;
											/* Temporary until Wikia fixes issue with editing blog comments through the API */
											if (title.search( new RegExp(LIR.lang.userBlogCommentNamespace, "i") ) != -1){
												var LIRBlogComment = true;
											}
										}
										
										objectInst.queueDataList.push({
											oldImage: oldImageName,
											newImage: newImageName,
											reason: reason,
											move: true,
											noRedirect: !leaveRedirect
										});
										
									}else{
										objectInst.queueData.push({
											oldImage: oldImageName,
											newImage: newImageName,
											reason: reason,
											move: (objectInst.method == "manual" ? false : true),
											noRedirect: !leaveRedirect
										});
											
										for (var currentPage = 0; currentPage < totalImageUsage.length; currentPage++){
											var title = totalImageUsage[currentPage].title;
											/* Temporary until Wikia fixes issue with editing blog comments through the API */
											if (title.search( new RegExp(LIR.lang.userBlogCommentNamespace, "i") ) != -1){
												var LIRBlogComment = true;
											}
										}
									}
									
									/* Stores queue if renaming multiple images, or updates file usage if only renaming one */
									if (objectInst.type == "multi"){
										objectInst.storeQueue();
										objectInst.started = false;
										localStorage.LIRQueuedUpdatesPos++;
										
										objectInst.updateStatus(false, LIR.userLang.successful);
										
										if (wgCanonicalSpecialPageName == "Movepage" && 
											(wgPageName.indexOf(LIR.lang.fileNamespace + ":") != -1 || 
											wgPageName.indexOf(LIR.i18n.en.fileNamespace + ":") != -1 ||
											wgPageName.indexOf(LIR.lang.imageNamespace + ":") != -1 ||
											wgPageName.indexOf(LIR.i18n.en.imageNamespace + ":") != -1 ||
											wgPageName.indexOf(LIR.lang.videoNamespace + ":") != -1 ||
											wgPageName.indexOf(LIR.i18n.en.videoNamespace + ":") != -1)
										){
											window.location = "/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(oldImageName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27");
										}else{
											if (typeof callback == "function")
												callback(true);
										}
									}else{
										/* This may seem odd, but because I use LIR.processQueue() for both single and multiple image 
											updating, it requires this.started to be false to start */
										objectInst.started = false;
										LIR.processQueue(function(){
											window.location = "/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(newImageName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27");
										});
									}
									

								}else{
									/* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
									objectInst.started = false;
									if (typeof objectInst.queuePosition !== "undefined"){
										localStorage.LIRQueuedUpdatesPos++;
										delete objectInst.queuePosition;
									}
									objectInst.updateStatus(false, LIR.userLang.fileNotUsed);
									if (typeof(callback) === "function"){
										callback(false, "fileNotUsed");
									}
								}
							});
						});
					}else{
						objectInst.started = false;
						if (typeof objectInst.queuePosition !== "undefined"){
							localStorage.LIRQueuedUpdatesPos++;
							delete objectInst.queuePosition;
						}
						objectInst.updateStatus(false, LIR.userLang.destInUse);
						if (typeof(callback) === "function"){
							callback(false, "destInUse");
						}
					}
				});
				
			};
			
			this.storeQueue = function(){
				/* Standalone function to store the queue in window.localStorage
					uses wgUserName as a variable key so multi-user computers on the same wiki don't get each other's queue */
				localStorage[wgUserName + "_LIRQueueData"] = JSON.stringify(this.queueData);
			};
		},
		
		instances: [],


		/**************************************
		// Processing-related functions
		**************************************/

		started: false,
		
		delay: 1000,
		
		updateProgress: function(show, progress){
			if (typeof progress == "undefined" && typeof show == "boolean")
				progress = 0;
				
			if (typeof show == "boolean"){
				if (LIR.instances[0].type == "multi"){
					if (show)
						$(".modalToolbar").prepend("<div id='LIRQueueProgress' style='float: left; width: 200px; border: 2px solid black; height: 17px;'><div id='LIRProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
					else
						$("#LIRQueueProgress").remove();
				}
			}
			
			if (typeof progress == "number"){
				$("#LIRProgressInd").css("width", ((progress * 100) + "%"));
				return;
			}
				
			if (typeof show == "number")
				$("#LIRProgressInd").css("width", ((show * 100) + "%"));
		},
		
		getUsage: function(index, callback){
			if (localStorage[wgUserName + "_LIRNamespaceSelection"] == false){
				var namespaceSelection = "&blnamespace=0";
			}else{
				var namespaceSelection = "";
			}

			$.getJSON("/api.php?action=query&list=imageusage&iutitle=" + LIR.lang.fileNamespace + ":"+encodeURIComponent(LIR.queueDataList[index].oldImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"&iulimit=5000&format=json&v=" + LIR.rand, function(result){
				var imageUsage = result.query.imageusage;

				$.getJSON("/api.php?action=query" + namespaceSelection + "&bllimit=5000&list=backlinks&bltitle=" + LIR.lang.fileNamespace + ":" + encodeURIComponent(LIR.queueDataList[index].oldImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json&v=" + LIR.rand, function(result){
					var imageLinks = result.query.backlinks;
					var totalImageUsage = imageUsage.concat(imageLinks);

					if (console) console.log("Image usage successfully retrieved");

					/* Adds pages image is used on to window.LIR.pageKey to help keep track of pages in window.LIR.pageData later on */
					for (var currentPage = 0; currentPage < totalImageUsage.length; currentPage++){
						var title = totalImageUsage[currentPage].title;

						if (LIR.pageKey.indexOf(title) == -1){
							LIR.pageKey[LIR.pageKey.length] = title;
						}

						for (i = 0; i <= LIR.queueData.length; i++){
							if (i == LIR.queueData.length){
								LIR.queueData[LIR.queueData.length] = {
									oldImage: LIR.queueDataList[index].oldImage,
									newImage: LIR.queueDataList[index].newImage,
									title: title,
									move: LIR.queueDataList[index].move
								};
								break;
							}else if (LIR.queueData[i].title == title && 
								LIR.queueData[i].oldImage == LIR.queueDataList[index].oldImage && 
								LIR.queueData[i].newImage == LIR.queueDataList[index].newImage){
								break;
							}
						}
					}

					if (typeof(callback) === "function"){
						callback();
					}
				});
			});
		},
		
		processQueue: function(callback){
			if (localStorage.LIRQueuedUpdates < localStorage.LIRQueuedUpdatesPos && localStorage.LIRQueuedUpdates != 0){
				localStorage.LIRQueuedUpdates = 0;
				localStorage.LIRQueuedUpdatesPos = 1;
			}

			/* Check if operation already started */
			if (LIR.started == true){
				return false;
			}

			/* this.type is already set if processing single update */
			if (typeof(LIR.instances[0].type) === "undefined"){
				LIR.instances[0].type = "multi";
			}

			/* Variable redeclaration */
			LIR.started = true;
			LIR.requestCompleted  = [];
			LIR.pageData = [];

			/* Queue retrieval, returns false if no queue */
			if ( (LIR.instances[0].type == "multi" && localStorage.LIRQueuedUpdates == 0) || LIR.instances[0].type == "single"){
				if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined" || LIR.instances[0].type == "single"){
					if (LIR.instances[0].type == "multi"){
						LIR.queueDataList = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
						LIR.updateProgress(true);
						if (console) console.log("Queue retrieved successfully.");
					}else{
						LIR.queueDataList = LIR.instances[0].queueDataList;
					}

					LIR.usageRequested = 0;
					LIR.usageProgress = 0;
					LIR.moveRequested = LIR.queueDataList.length;
					LIR.moveProgress = 0;
					LIR.queueData = [];
					LIR.pageKey = [];
					LIR.timer = 0;

					for (var index in LIR.queueDataList){
						if (LIR.queueDataList[index].move == true){
							LIR.moveFile(index, function(index){
								LIR.updateProgress( ((++LIR.moveProgress) / LIR.moveRequested) / 2 );
								LIR.usageRequested++;
								LIR.getUsage(index, function(){
									LIR.usageProgress++;
									if (LIR.moveProgress == LIR.moveRequested && LIR.usageProgress == LIR.usageRequested){
										LIR.processPageContent(callback);
									}
								});
							},
							function(callback){
								LIR.updateProgress( ((++LIR.moveProgress) / LIR.moveRequested) / 2 );

								if (LIR.moveProgress == LIR.moveRequested && LIR.usageProgress == LIR.usageRequested){
									LIR.processPageContent(callback);
								}
							});
						}else{
							LIR.updateProgress( ((++LIR.moveProgress) / LIR.moveRequested) / 2 );
							LIR.usageRequested++;
							LIR.getUsage(index, function(){
								LIR.usageProgress++;
								if (LIR.moveProgress == LIR.moveRequested && LIR.usageProgress == LIR.usageRequested){
									LIR.processPageContent(callback);
								}
							});
						}
					}
				}else{
					if (console) console.log("Queue does not exist or was unable to be retrieved.");
					LIR.started = false;
					return false;
				}


			}else if (LIR.instances[0].type == "multi" && localStorage.LIRQueuedUpdates != 0){
				if (console) console.log("Pages are still being added to the queue.");
				alert(LIR.userLang.pagesWaiting);
				LIR.started = false;
				return false;
			}else if (LIR.instances[0].type == "single"){
				LIR.processPageContent(callback);
			}
		},
		
		lowerUpperReg: function(input){
			return "[" + input.substr(0,1).toUpperCase() + input.substr(0,1).toLowerCase() + "]" + input.substr(1);
		},

		processPageContent: function(callback) {
			if (console) console.log("Begin queue execution");

			/* Sets progress checking variables */
			for (i = 0; i<LIR.pageKey.length; i++){
				LIR.requestCompleted[i] = false;
			}
			var pageDataRetrieved = 0;

			if (console) console.log("Getting page contents");


			for (var j = 0; j < (Math.floor(LIR.pageKey.length/500)+1); j++){
				var tempArray = [];

				for (var k = (j * 500); k < (j * 500) + 500; k++){
					if (k == LIR.pageKey.length){
						break;
					}

					tempArray.push( LIR.pageKey[k] );
				}
				
			/* Calls API for page contents */
				$.post(
					"/api.php",
					{
						action: "query",
						prop: "revisions",
						rvprop: "content",
						titles: tempArray.join("|"),
						format: "json"
					},
					function(result){
						/* Saves page contents for each page in LIR.pageData */
						for (var i in result.query.pages){
							var keyNum = LIR.pageKey.indexOf(result.query.pages[i].title);
							LIR.pageData[keyNum] = {
								title: LIR.pageKey[keyNum],
								content: result.query.pages[i].revisions[0]["*"],
								changed: false
							};
							pageDataRetrieved++;
						}

						if (pageDataRetrieved == LIR.pageKey.length){
							if (console) console.log("Page contents retrieved and saved");
							LIR.log(LIR.userLang.contentsRetrieved);

							if (console) console.log("Begin processing page content.");

							/* Replacing image name on each page */
							for (i=0; i<LIR.queueData.length; i++){
								var pageKey = LIR.pageKey.indexOf(LIR.queueData[i].title);
								var escapedName0 = window.LIR.queueData[i].oldImage.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/( |_)/g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+");

								if ( escapedName0.substr(0,1).match(/[A-z]/i) ){
									var escapedName = LIR.lowerUpperReg(escapedName0);
								}else{
									var escapedName = escapedName0;
								}

								var pageReplacement = new RegExp("(\\n[ ]*?|\\[:?(" + LIR.lowerUpperReg(LIR.lang.fileNamespace) + "|" + LIR.lowerUpperReg(LIR.lang.imageNamespace) + "|" + LIR.lowerUpperReg(LIR.lang.videoNamespace) + "|" + LIR.lowerUpperReg(LIR.i18n.en.fileNamespace) + "|" + LIR.lowerUpperReg(LIR.i18n.en.imageNamespace) + "|" + LIR.lowerUpperReg(LIR.i18n.en.videoNamespace) + "):[ ]*?|=[ ]*?|\\|)" + 
									escapedName + 
									"([ ]*?\\n|[ ]*?\\||[ ]*?\\]|[ ]*?\\}|[ ]*?;)", "g");
								var replacementReg = new RegExp(escapedName, "g");
								var regExec;

								if (LIR.pageData[pageKey].content.search(pageReplacement) != -1){
									LIR.pageData[pageKey].changed = true;
									if (console) console.log("\""+LIR.queueData[i].oldImage+"\" replaced on page \""+LIR.queueData[i].title+"\"");

									while ((regExec = pageReplacement.exec(LIR.pageData[pageKey].content)) != null){
										if (LIR.queueData[i].newImage == "" && LIR.queueData[i].move == false){ // Removing links/usages
											if (regExec[1].search(/\n/g) != -1 || regExec[3].search(/\n/g) != -1 || regExec[1].search(/=/g) != -1){//If surrounded by newlines or equals, we need to keep them to prevent things from breaking
												LIR.pageData[pageKey].content = LIR.pageData[pageKey].content.replace(regExec[0], regExec[0].replace(replacementReg, "<nowiki>" + LIR.queueData[i].oldImage + "</nowiki>"));
												pageReplacement.lastIndex += "<nowiki></nowiki>".length;
											}else{
												LIR.pageData[pageKey].content = LIR.pageData[pageKey].content.replace(regExec[0], "<nowiki>" + regExec[0] + "</nowiki>");
												pageReplacement.lastIndex += "<nowiki></nowiki>".length;
											}
										}else{ // Everything else
											LIR.pageData[pageKey].content = LIR.pageData[pageKey].content.replace(regExec[0], regExec[0].replace(replacementReg, LIR.queueData[i].newImage));
											pageReplacement.lastIndex += (regExec[0].replace(replacementReg, LIR.queueData[i].newImage).length - regExec[0].length) - (regExec[3].length);
										}
									}
								}else{
									if (LIR.instances[0].type == "multi"){
										LIR.failedLog(LIR.queueData[i].oldImage, LIR.queueData[i].newImage, LIR.queueData[i].title);
									}else{
										alert(
											LIR.userLang.unableToFind[0] + 
											' "' + LIR.queueData[i].oldImage + '" ' +
											LIR.userLang.unableToFind[1] +
											' "' + LIR.queueData[i].title + '"; ' + 
											LIR.userLang.unableToFind[2]
										);
									}
								}
							}

							LIR.log(LIR.userLang.submittingContent);
							if (console) console.log("Begin submitting pages");

							var l = 0;
							
							if (LIR.instances[0].type == "multi")
								LIR.queueProgress = 0;

							var throttle = setInterval(function(){
								if (LIR.pageData[l].changed == true){
									LIR.submitChangedPages(l, callback);
								}else{
									LIR.requestCompleted[l] = true;
								}

								l++;

								if (l == LIR.pageData.length){
									clearInterval(throttle);
								}
							}, (LIRoptions.delay || LIR.delay));
						}else if (k == LIR.pageKey.length && pageDataRetrieved != LIR.pageKey.length){
							if(console) console.log("There was a problem retrieving one or more pages. Retrieved " + LIR.pageData.length + " of " + LIR.pageKey.length + " pages");  
						}
					},
					"json"
				);
			}
		},

		submitChangedPages: function(pageKey, callback) {

			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "edit",
					title: LIR.pageData[pageKey].title,
					summary: (LIRoptions.editSummary || LIR.lang.editSummary),
					text: LIR.pageData[pageKey].content,
					minor: true,
					nocreate: true,
					redirect: false,
					bot: true,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					LIR.requestCompleted[pageKey] = true;
					alert("Unable to publish page \""+LIR.pageKey[pageKey]+"\".  Please rename images on that page manually.");
					if (LIR.requestCompleted.indexOf(false) == -1){
						delete localStorage[wgUserName + "_LIRQueueData"];
						LIR.started = false;

						if (typeof(callback) === "function"){
							callback();
						}
					}	
				},
				success: function(result){
					LIR.requestCompleted[pageKey] = true;
					if (console) console.log("Posted page \""+LIR.pageKey[pageKey]+"\"");
					if (LIR.instances[0].type == "multi"){
						LIR.updateProgress( ( ((++LIR.queueProgress) / LIR.pageKey.length) / 2) + 0.5);
						//LIR.userLang.blogComment
						if (typeof result.error !== "undefined"){
							if ( LIR.pageData[pageKey].title.search(new RegExp(LIR.lang.userBlogCommentNamespace, "i")) != -1){
								LIR.failedLogCustom(LIR.userLang.blogComment + 
									' → <a target="_blank" href="/wiki/' + 
										encodeURIComponent(LIR.pageData[pageKey].title.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + '">' +
										LIR.pageData[pageKey].title + 
									'</a>'
								);
							}else{
								LIR.failedLogCustom(
									LIR.userLang.unableToSubmit[0] + 
									' "' + LIR.pageData[pageKey].title + '" ' +
									LIR.userLang.unableToSubmit[1] +
									' "' + result.error.code + '; ' + result.error.info + '" . ' + 
									LIR.userLang.unableToSubmit[2]
								);
							}
							
							for (var i in LIR.queueData){
								if (LIR.queueData[i].title === LIR.pageData[pageKey].title){
									LIR.failedLog(LIR.queueData[i].oldImage, LIR.queueData[i].newImage, LIR.queueData[i].title);
								}
							}
						}
					}else{
						if (typeof result.error !== "undefined"){
							if ( LIR.pageData[pageKey].title.search(new RegExp(LIR.lang.userBlogCommentNamespace, "i")) != -1){
								alert(LIR.userLang.blogComment + 
									' → ' + 
										LIR.lang.fileNamespace + ':' + LIR.pageData[pageKey].title 
								);
							}else{
								alert(LIR.userLang.unableToSubmit[0] + 
									' "' + LIR.pageData[pageKey].title + '" ' +
									LIR.userLang.unableToSubmit[1] +
									'"' + result.error.code + '". ' +
									LIR.userLang.unableToSubmit[2]
								);
							}
						}
					}


					if (LIR.requestCompleted.indexOf(false) == -1){
						if (LIR.instances[0].type == "multi"){
							/* Cleans up localStorage variables */
							delete localStorage[wgUserName + "_LIRQueueData"];
							LIR.started = false;
							LIR.updateProgress(false);
						}
						/* Call callback if exists */
						if (typeof(callback) === "function"){
							callback();
						}
					}
				}					
			});
		},

		moveFile: function(index, callback, failure) {
			var data = {
				action: "move",
				from: LIR.lang.fileNamespace + ":" + LIR.queueDataList[index].oldImage,
				to: LIR.lang.fileNamespace + ":" + LIR.queueDataList[index].newImage,
				reason: LIR.queueDataList[index].reason,
				movetalk: true,
				ignorewarnings: true,
				token: mediaWiki.user.tokens.get("editToken"),
				format: "json"
			};
			
			if ( LIR.queueDataList[index].noRedirect ){
				data = $.extend(data, {noredirect: true});
			}
			setTimeout(function(){
				$.ajax({
					url: "/api.php",
					type: "POST",
					async: true,
					data: data,
					contentType: "application/x-www-form-urlencoded",
					error: function(){
						alert("Unable to move file \"" + LIR.queueDataList[index].oldImage + "\" to \"" + LIR.queueDataList[index].newImage + "\".");
					},
					success: function(result){
						if (typeof result.error === "undefined" || LIR.queueDataList[index].move == false){
							if (console) console.log("Moved file \"" + LIR.queueDataList[index].oldImage + "\"");

							/* Call callback if exists */
							if (typeof(callback) === "function"){
								callback(index);
							}
						}else if (result.error.code == "articleexists" || result.error.code == "invalidtitle"){
							var promptResponse = prompt(
								LIR.userLang.unableToMove[0] + 
								' "' + LIR.queueDataList[index].oldImage + '" ' + 
								LIR.userLang.unableToMove[1] + 
								' "' + LIR.queueDataList[index].newImage + '" ' + 
								LIR.userLang.unableToMove[2] + 
								' "' + result.error.code + '" . \n' + 
								LIR.userLang.unableToMoveChoose
							);

							if (promptResponse != null && promptResponse != ""){
								LIR.queueDataList[index].newImage = promptResponse;
								LIR.moveFile(index, callback, failure);
							}else{
								if (LIR.instances[0].type == "multi"){
									LIR.failedLogCustom('"' + LIR.queueDataList[index].oldImage + '" ' + LIR.userLang.unableToMoveFail);

									if (LIR.queueDataList.length == 1){
										delete localStorage[wgUserName + "_LIRQueueData"];
										LIR.started = false;
										LIR.log( LIR.userLang.queueComplete );
										LIR.updateQueueListing();
									}else{
										delete LIR.queueDataList[index];

										failure();
									}
								}else{
									LIR.started = false;
									LIR.instances[0].updateStatus(false, 
										LIR.userLang.unableToMove[0] + 
										' "' + LIR.queueDataList[index].oldImage + '" ' + 
										LIR.userLang.unableToMove[1] + 
										' "' + LIR.queueDataList[index].newImage + '" ' + 
										LIR.userLang.unableToMove[2] + 
										' "' + result.error.code + '" .'
									);
								}
							}
						}else{
							LIR.failedLogCustom(
								LIR.userLang.unableToMove[0] + 
								' "' + LIR.queueDataList[index].oldImage + '" ' + 
								LIR.userLang.unableToMove[1] + 
								' "' + LIR.queueDataList[index].newImage + '" ' + 
								LIR.userLang.unableToMove[2] + 
								' "' + result.error.code + '; ' + result.error.info + '" . ' + 
								'"' + LIR.queueDataList[index].oldImage + '" ' + LIR.userLang.unableToMoveFail
							);
							LIR.ERRORS.push(result);

							if (LIR.queueDataList.length == 1){
								delete localStorage[wgUserName + "_LIRQueueData"];
								LIR.started = false;
								LIR.log(LIR.userLang.queueComplete);
								LIR.updateQueueListing();
							}else{
								delete LIR.queueDataList[index];

								failure();
							}
						}
					}
				});
			}, (LIR.timer++) * (LIRoptions.delay || LIR.delay));
		},

		removeFromQueue: function(queueOldName, callback){
			LIR.instances[0].queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
			
			for (var i in LIR.instances[0].queueData){
				if (queueOldName.match(new RegExp(LIR.instances[0].queueData[i].oldImage.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/( |_)/g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+"), "gi") ) != null){
					LIR.instances[0].queueData.splice(i, 1);
					break;
				}
			}

			if (LIR.instances[0].queueData.length > 0){
				LIR.instances[0].storeQueue();
			}else{
				delete localStorage[wgUserName + "_LIRQueueData"];
			}
			
			if (typeof(callback) === "function"){
				callback();
			}
		},

		/**************************************
		// Modal-related functions
		**************************************/

		log: function(message){
			if (typeof LIR.logMessages === "undefined"){
				LIR.logMessages = "";
			}

			LIR.logMessages = LIR.logMessages + "<div style='font-weight: bold'>" + message + "</div>";

			if ($("#LIRLog").length > 0){
				$("#LIRLog").html(LIR.logMessages);
				$("#LIRLog").scrollTop(100000000)
				$("#LIRLog div:odd").css("background-color", "grey");
			}
		},

		failedLog: function(oldI, newI, page){
			LIR.failedLogCustom("<a target='_blank' href='/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(oldI.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + oldI + "</a> → <a target='_blank' href='/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(newI.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + newI + "</a> on <a target='_blank' href='/wiki/" + encodeURIComponent(page.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + page + "</a>");
		},
		
		failedLogCustom: function(text){
			if (typeof(LIR.logFailed) === "undefined"){
				LIR.logFailed = "";
			}
			LIR.logFailed += "<div>" + text + "</div>";
			LIR.updateFailedListing();
		},
		
		updateFailedListing: function() {
			if ($("#LIRFailedLog").length > 0 && typeof LIR.logFailed != "undefined"){
				$("#LIRFailedLog").html(LIR.logFailed);
				$("#LIRFailedLog div:odd").css("background-color", "red");
			}
		},

		updateQueueListing: function(callback){
			if (typeof (localStorage[wgUserName + "_LIRQueueData"]) !== "undefined"){
				LIR.queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
			}else{
				$("#LIRQueue").html("<div>" + LIR.userLang.nothingInQueue + "</div>");
				$("#LIRQueueLengthBox").html("0");
				LIR.log( LIR.userLang.queueUpdate );
				return false;
			}

			var LIRCurrentQueueData = LIR.queueData;
			var queueToAdd = "";

			for (i = 0; i<LIRCurrentQueueData.length; i++){
				queueToAdd += "<div style='position:relative; padding-left: 20px; " + (!LIRCurrentQueueData[i].move && LIRCurrentQueueData[i].newImage != "" ? 'background-color: lightyellow !important;' : '') + (!LIRCurrentQueueData[i].move && LIRCurrentQueueData[i].newImage == "" ? 'background-color: #ffbfbf !important;' : '') + "'><div class='LIRDeleteButton' title='" + LIR.userLang.removeFromQueue + "' style='cursor: pointer; width: 15px; height: 15px; position: absolute; left: 3px; top: 2px;'><img width='15' height='15' src='http://upload.wikimedia.org/wikipedia/commons/b/ba/Red_x.svg' /></div><a class='LIROldName' target='_blank' href='/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(LIRCurrentQueueData[i].oldImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + LIRCurrentQueueData[i].oldImage + "</a> → "+ (!LIRCurrentQueueData[i].move && LIRCurrentQueueData[i].newImage == "" ? "(Removing)" : "<a class='LIRNewName' target='_blank' href='/wiki/" + LIR.lang.fileNamespace + ":" + encodeURIComponent(LIRCurrentQueueData[i].newImage.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + LIRCurrentQueueData[i].newImage + "</a>") + "</div>";
			}

			$("#LIRQueue").html(queueToAdd);
			$("#LIRQueueLengthBox").html(LIR.queueData.length);
			$("#LIRQueue > div:odd").css("background-color", "lightgrey");
			LIR.log( LIR.userLang.queueUpdate );
			
			
		},

		updateNamespaceSelection: function(){
			if ($("#LIRNamespaceToggleCheck").is(":checked")){
				localStorage[wgUserName + "_LIRNamespaceSelection"] = "checked";
			}else{
				localStorage[wgUserName + "_LIRNamespaceSelection"] = "";
			}
		},

		showQueueModal: function(){
			$.showCustomModal( 
				LIR.userLang.queueModalTitle, 
				'<div id="LIRContainer" style="width: 100%;">' + 
				'<div id="LIRQueue" style="overflow-y: scroll; width: 590px; height: 300px; float: left; border: 1px solid black; font-weight: bold; background-color: #FFFFFF;"></div>'+
				'<div id="LIRLog" style="overflow-y: scroll; height: 300px; width: 200px; float: right; background-color: lightgrey; border: 1px solid black;"></div>'+
				'<div id="LIRQueueLength" style="float: left;margin: 5px 15px 0px 0px; font-weight: bold;">' + LIR.userLang.filesInQueue + ': <span id="LIRQueueLengthBox"></span></div>'+
				'<div id="LIRNamespaceToggle" style="float: left; margin: 5px 5px 0px 0px;"><label><input type="checkbox" id="LIRNamespaceToggleCheck" onchange="LIR.updateNamespaceSelection()" ' + localStorage[wgUserName + "_LIRNamespaceSelection"] + '>' + 
					LIR.userLang.namespaceCheckbox + 
				'</label></div>'+
				'<span id="liveLoader-0" style="display: none; float: right;margin-top: 7px;"><img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif"></span>'+
				'<div style="clear: both"></div> <div id="LIRFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow-y: scroll;">' + 
					LIR.userLang.failedDescription + 
				'</div> </div>', 
				{
					id: "queueModal",
					width: 800,
					buttons: [
						{
							id: "close",
							message: LIR.userLang.queueModalClose,
							handler: function () {
								$("#queueModal .close").click();
							}
						},
						{
							id: "openManualModal",
							message: LIR.userLang.queueModalManual,
							handler: function () {
								if (LIR.started){ return false;}
								LIR.showManualModal();
							}
						},
						{
							id: "resetCounter",
							message: LIR.userLang.queueModalReset,
							handler: function () {
								if (LIR.started || LIR.instances[0].started){ return false;}
								if (confirm(
									LIR.userLang.queueModalWaitConfirm[0] + "\n\n" + 
									LIR.userLang.queueModalWaitConfirm[1] + 
									" " +(localStorage.LIRQueuedUpdates - localStorage.LIRQueuedUpdatesPos + 1) + " " +
									LIR.userLang.queueModalWaitConfirm[2] + "\n\n" + 
									LIR.userLang.queueModalWaitConfirm[3]
									)){
									
									localStorage.LIRQueuedUpdates = 0;
									localStorage.LIRQueuedUpdatesPos = 1;
									LIR.log(LIR.userLang.waitCleared);
								}
							}
						},
						{
							id: "updateButton",
							message: LIR.userLang.queueModalUpdate,
							handler: function(){
								LIR.updateQueueListing();
							}
						},
						{
							id: "executeButton",
							message: LIR.userLang.queueModalExecute,
							defaultButton: true,
							handler: function(){
								if (typeof localStorage[wgUserName + "_LIRQueueData"] !== "undefined"){
									LIR.log( LIR.userLang.queueStarted );
									LIR.instances[0].updateStatus(true);
									LIR.processQueue(function(){
										LIR.log( LIR.userLang.queueComplete );
										LIR.instances[0].updateStatus(false);
										LIR.updateQueueListing();
									});
								}else{
									LIR.log(LIR.userLang.noQueueExists);
								}
							}
						}
					],
					callback: function(){
						$(".blackout, #queueModal .close").off("click").click(function(){
							if ((LIR.started == false || typeof(LIR.started) === "undefined")){
								delete LIRCurrentQueueData;
								$(document).off("click", ".LIRDeleteButton");
								$("#queueModal").remove();
								$(".blackout").fadeOut(function(){
									$(this).remove();
								});
							}
						});
						
						$(document).on("click", ".LIRDeleteButton", function(){
							LIR.removeFromQueue($(this).parent().find("a.LIROldName").html(), function(){
								LIR.log(LIR.userLang.itemRemoved);
								LIR.updateQueueListing();
							});
						});

						LIR.updateQueueListing();
						LIR.updateFailedListing();
					}
				}
			);
		},
	
		addToQueueButton: function(buttonId) {
			if ( $("#fuau-button-" + buttonId).attr("data-fuau-from") != "undefined" && $("#fuau-button-" + buttonId).attr("data-fuau-from") != ""){
				if ( $("#fuau-button-" + buttonId).attr("data-fuau-to") != "undefined" && $("#fuau-button-" + buttonId).attr("data-fuau-to") != ""){
					$("#fuau-button-" + buttonId).css("display", "none");
				
					LIR.instances[buttonId].start("multi", decodeURIComponent( $("#fuau-button-" + buttonId).attr("data-fuau-from") ), decodeURIComponent( $("#fuau-button-" + buttonId).attr("data-fuau-to").replace(/_/g, " ") ), LIR.userLang.using + " [[w:c:dev:FileUsageAuto-update#Other_features|FileUsageAuto-update]].", function(successful, error){
						if (successful){
							LIR.instances[buttonId].updateStatus(false, LIR.userLang.successful);
						}
						
						if (typeof error != "undefined"){
							switch (error){
								case "nameInUse":
								case "invalidExtension":
								case "destInUse":
									$("#fuau-button-" + buttonId).css("display", "inline-block");
									LIR.showFuauModal( $("#fuau-button-" + buttonId), buttonId, error );
									break;
							}
						}
					});
				}else{
					LIR.showFuauModal( $("#fuau-button-" + buttonId), buttonId, "toUndef");
				}
			}else{
				LIR.instances[buttonId].updateStatus(false, LIR.userLang.varsUndef);
			}
		},
		
		showFuauModal: function(buttonObj, Id, message){
			$.showCustomModal(
				LIR.userLang.queueAddition,
				'<fieldset><span> ' + LIR.userLang[message] + '  ' + LIR.userLang.tryDiffName + ' </span><br><span style="font-weight:bold">' + LIR.userLang.oldFileName + ':</span><br>' + LIR.lang.fileNamespace + ':<input disabled id="modalOldName" type="text" style="width:400px" value="' + decodeURIComponent( buttonObj.attr("data-fuau-from") ).replace(/_/g, " ") + '" /><br><span style="font-weight:bold">' + LIR.userLang.newFileName + ':</span><br>' + LIR.lang.fileNamespace + ':<input id="modalNewName" type="text" style="width:400px" value="' + (typeof buttonObj.attr("data-fuau-to") != "undefined" ? decodeURIComponent( buttonObj.attr("data-fuau-to") ).replace(/_/g, " ") : "") + '" /><br><input id="modalId" type="text" value="' + Id + '" style="display: none;" /></fieldset>',
				{
					id: "fuauModal",
					width: 650,
					buttons: [
						{
							id: "cancel",
							message: LIR.userLang.queueModalClose,
							handler: function(){
								$(".close").click();
							}
						},
						{
							id: "submit",
							defaultButton: true,
							message: LIR.userLang.addToQueue,
							handler: function(){
								var Id = $("#modalId").val();
								if ( $("#modalNewName").val() != "" ){
									$("#fuau-button-" + Id).attr( "data-fuau-to", encodeURIComponent( $("#modalNewName").val() ).replace(/'/g, "%27") );
									$(".close").click();
									LIR.addToQueueButton(Id);
								}
							}
						}
					],
					callback: function(){
						$(".blackout, .close").off("click").click(function(){
								$("#fuauModal").remove();
								$(".blackout").fadeOut(function(){
									$(this).remove();
								});
						});
					}
				}
			);
		},
		
		showManualModal: function(){
			$.showCustomModal(
				LIR.userLang.queueAddition,
				'<fieldset><span>' + LIR.userLang.manualModalDescription + '</span><br><br><span style="font-weight:bold">' + LIR.userLang.oldFileName + ':</span><br> ' + LIR.lang.fileNamespace + ':<input id="modalOldName" type="text" style="width:400px" /><br><span style="font-weight:bold">' + LIR.userLang.newFileName + ':</span><br>' + LIR.lang.fileNamespace + ':<input id="modalNewName" type="text" style="width:400px" /><br><span id="liveLoader-0" style="display:none"><img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif" /></span><span id="queueStatus-0" style="font-weight: bold"></span></fieldset>',
				{
					id: "manualModal",
					width: 650,
					buttons: [
						{
							id: "cancel",
							message: LIR.userLang.queueModalClose,
							handler: function(){
								$("#manualModal .close").click();
							}
						},
						{
							id: "submit",
							defaultButton: true,
							message: LIR.userLang.addToQueue,
							handler: function(){
								if (LIR.instances[0].started){ return false; }
								LIR.instances[0].start("manual", $("#modalOldName").val(), $("#modalNewName").val(), "", function(res){
									if (res){
										delete LIR.instances[0].queuePosition;
										$("#modalOldName, #modalNewName").val('');
										$("#modalOldName").focus();
										LIR.updateQueueListing();
									}
								});
							}
						}
					],
					callback: function(){
						$(".blackout, #manualModal .close").off("click").click(function(){
							if (!LIR.instances[0].started){
								$("#manualModal").remove();
								$(".blackout").fadeOut(function(){
									$(this).remove();
								});
							}
						});
						
						$("#modalOldName, #modalNewName").on("keypress", function(e){
							if (e.which == 13){
								$("#manualModal #submit").click();
							}
						})
					}
				}
			);
		},
		
		initialize: function(){
			if (typeof LIR.supportedLanguages.indexOf(mediaWiki.config.get('wgContentLanguage')) == -1){
				if (mw.config.get('wgAction') == 'view' && (mw.config.get('wgCanonicalNamespace') == "File" || mw.config.get('wgCanonicalNamespace') == "Image" || mw.config.get('wgCanonicalNamespace') == "Video") ) {
					$('#WikiaPageHeader > .wikia-menu-button .WikiaMenuElement').append(
						$('<li/>').append(
							$('<a/>', {
								'href': 'http://dev.wikia.com/wiki/Talk:FileUsageAuto-update',
								'title': 'Request/provide translations',
								'html': 'Queue lang not supported'
							})
						)
					);
				}else if (wgCanonicalSpecialPageName == "Movepage" && 
					(wgPageName.indexOf(LIR.i18n.en.fileNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.i18n.en.imageNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.lang.imageNamespace + ":") != -1 ||
					wgPageName.indexOf(wgFormattedNamespaces[6] + ":") != -1)
				){
					$('td.mw-submit').append("<br /><br /><div style='width: 850px; white-space: normal; font-weight: bold;'>FileUsageAuto-update language not supported</div>");
				}
			}else{
				if (typeof LIR.supportedLanguages.indexOf(mediaWiki.config.get('wgUserLanguage')) == -1){
					var userLang = "en";
				}else{
					var userLang = mediaWiki.config.get('wgUserLanguage');
				}
				
				if (typeof localStorage.LIRQueuedUpdates === "undefined"){
					localStorage.LIRQueuedUpdates = 0;
					localStorage.LIRQueuedUpdatesPos = 1;
				}
				
				if (typeof LIRoptions == "undefined")
					LIRoptions = {};
				
				if (typeof localStorage[wgUserName + "_LIRNamespaceSelection"] === "undefined"){
					localStorage[wgUserName + "_LIRNamespaceSelection"] = "";
				}
				
				if (window.skin == "monobook"){
					$("head").append("<style>#queueModal {line-height: 1.5em; font-size: 127%;}</style>");
				}
				 
				 /* Get language pack! */
				$.ajax({
					url: "http://dev.wikia.com/wiki/FileUsageAuto-update/" + mediaWiki.config.get('wgContentLanguage') + ".js?action=raw&ctype=text/javascript",
					dataType: "script",
					cache: true,
					success: function(){
						if (console) console.log('FileUsageAuto-update: Loaded language pack ' + mediaWiki.config.get('wgContentLanguage'));
						LIR.lang = LIR.i18n[mediaWiki.config.get('wgContentLanguage')];
						
						if (userLang != mediaWiki.config.get('wgContentLanguage')){
							$.ajax({
								url: "http://dev.wikia.com/wiki/FileUsageAuto-update/" + userLang + ".js?action=raw&ctype=text/javascript",
								dataType: "script",
								cache: true,
								success: function(){
									if (console) console.log('FileUsageAuto-update: Loaded secondary language pack ' + userLang);
									LIR.userLang = LIR.i18n[userLang];
									LIR.makeUI();
								}
							});
						}else{
							LIR.userLang = LIR.lang;
							LIR.makeUI();
						}
					}
				});
			}
		},
		
		makeUI: function(){
			/* Actions performed on page load to add script elements */
			if (wgCanonicalSpecialPageName == "Movepage" && 
					(wgPageName.indexOf(LIR.lang.fileNamespace + ":") != -1 || 
					wgPageName.indexOf(LIR.i18n.en.fileNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.lang.imageNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.i18n.en.imageNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.lang.videoNamespace + ":") != -1 ||
					wgPageName.indexOf(LIR.i18n.en.videoNamespace + ":") != -1) && 
				Storage){
				/* File move page */
				LIR.instances[0] = new LIR.constructInstance(0);
				// Buttons
				LIR.appendButtonText = "<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.instances[0].start(\"single\")'>" + (LIRoptions.singleButtonText || LIR.userLang.singleButtonText) + "</a>" + 
					"<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.instances[0].start(\"multi\")'>" + (LIRoptions.queueButtonText || LIR.userLang.queueButtonText) + "</a>";
				// Loading icon and message / instructions
				LIR.appendButtonText += "<span id='liveLoader-0' style='display:none'><img src='https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif' /></span>" + 
					"<span id='queueStatus-0' style='font-weight: bold'></span>" + 
					// "<div id='LIRFailedLog' style='margin: 5px 0px; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll;'>" + 
						// LIR.userLang.failedDescription + "</div>" + 
					"<br /><div style='width: 850px; white-space: normal;'>" + LIR.userLang.movePageDescription[0] + " <b>\""+
						(LIRoptions.singleButtonText || LIR.userLang.singleButtonText)+"\"</b> " + LIR.userLang.movePageDescription[1] + 
						" <b>\""+(LIRoptions.queueButtonText || LIR.userLang.queueButtonText)+"\"</b> " + LIR.userLang.movePageDescription[2] + "</div>";
				// Optional bottom message
				if (LIRoptions.bottomMessage){
					LIR.appendButtonText += ('<br /><div style="font-weight: bold; width: 850px; white-space: normal;">' + LIRoptions.bottomMessage + '</div>');
				}
				
				LIR.appendButtonText += ('<br /><div style="font-weight: bold; width: 850px; white-space: normal;">' + LIR.userLang.movePageInfo[0] + ' 3rd of April, 2015.  ' + LIR.userLang.movePageInfo[1] + '</div>');
				
				$('td.mw-submit').append(LIR.appendButtonText);
				$('#mw-movepage-table tr:eq(4)').after('<tr><td></td><td class="mw-input"><label><input type="checkbox" id="LIRNamespaceToggleCheck" onchange="LIR.updateNamespaceSelection()" ' + localStorage[wgUserName + "_LIRNamespaceSelection"] + '>&nbsp;' + LIR.userLang.namespaceCheckbox + ' <span style="font-size: 9px;">' + LIR.userLang.movePageNamespaceSelect[0] + ' ' + (LIRoptions.singleButtonText || LIR.userLang.singleButtonText) + ' ' + LIR.userLang.movePageNamespaceSelect[1] + '</span></label></td></tr>');
			}else if ((mw.config.get('wgCanonicalNamespace') == "File" || mw.config.get('wgCanonicalNamespace') == "Image" || mw.config.get('wgCanonicalNamespace') == "Video") && Storage){
				/* File page */
				LIR.instances[0] = new LIR.constructInstance(0);
				if (window.skin == "oasis")
					$("#WikiaPageHeader nav ul").append("<li><a onclick='LIR.showQueueModal()'>" + LIR.userLang.queue + "</a></li>");
				else
					$("#ca-move").after("<li style='cursor:pointer'><a onclick='LIR.showQueueModal()'>" + LIR.userLang.queue + "</a></li>");
				
				if (typeof localStorage[wgUserName + "_LIRQueueData"] !== "undefined"){
					LIR.instances[0].queueData = JSON.parse(localStorage[wgUserName + "_LIRQueueData"]);
				
				
					for (var i in LIR.instances[0].queueData){
						if (wgTitle.match(new RegExp(LIR.instances[0].queueData[i].oldImage.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/( |_)/g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+"), "gi") ) != null){
							
							if (window.skin == "oasis")
								$("#WikiaArticle").prepend('<table id="LIRNotification" class="metadata plainlinks ambox ambox-notice" style="border-left: 10px solid lightgreen;"><tbody><tr><td class="mbox-image"><div style="width: 52px;"><img alt="" src="http://upload.wikimedia.org/wikipedia/commons/b/bd/Checkmark_green.svg" width="46" height="40"></div></td><td class="mbox-text" style="">' + LIR.userLang.fileInQueue + '<br>' + LIR.userLang.newFileName + ': <span style="font-weight: bold;">'+LIR.instances[0].queueData[i].newImage+'</span></td></tr><tr><td>&nbsp;</td><td style="text-align: right;"><a id="LIRRemoveFromQueue" style="cursor: pointer">' + LIR.userLang.removeFromQueue + '</a></td></tr></tbody></table>');
							else
								$("#filetoc").after('<table id="LIRNotification" class="metadata plainlinks ambox ambox-notice" style="border-left: 10px solid lightgreen;"><tbody><tr><td class="mbox-image"><div style="width: 52px;"><img alt="" src="http://upload.wikimedia.org/wikipedia/commons/b/bd/Checkmark_green.svg" width="46" height="40"></div></td><td class="mbox-text" style="">' + LIR.userLang.fileInQueue + '<br>' + LIR.userLang.newFileName + ': <span style="font-weight: bold;">'+LIR.instances[0].queueData[i].newImage+'</span></td></tr><tr><td>&nbsp;</td><td style="text-align: right;"><a id="LIRRemoveFromQueue" style="cursor: pointer">' + LIR.userLang.removeFromQueue + '</a></td></tr></tbody></table>');
						
							$("#LIRRemoveFromQueue").on("click", function(){
								LIR.removeFromQueue(LIR.instances[0].queueData[i].oldImage, function(){
									$("#LIRNotification").slideUp("fast", function(){
										this.remove();
									});
								});
							});
							break;
						}
					}
				}
			}else if ($(".fuau").length > 0){
				/* Add to queue button placeholders */
				LIR.buttonIndex = 0;
				$(".fuau").each(function(){
					LIR.instances[LIR.buttonIndex] = new LIR.constructInstance(LIR.buttonIndex);
					$(this).html("<a class='wikia-button' id='fuau-button-" + LIR.buttonIndex + "' data-fuau-from='" + $(this).attr('data-fuau-from') + "' data-fuau-to='" + $(this).attr('data-fuau-to') + "' onclick='LIR.addToQueueButton(" + LIR.buttonIndex + ")'>" + LIR.userLang.addToQueue + "</a><span id='liveLoader-" + LIR.buttonIndex + "' style='display:none'><img src='https://images.wikia.nocookie.net/__cb1395341051/common/skins/common/images/ajax.gif' /></span><span id='queueStatus-" + LIR.buttonIndex + "' style='font-weight: bold'></span>");
					LIR.buttonIndex++;
				});
				delete LIR.buttonIndex;
			}else{
				if (console) console.log("Looks like FileUsageAuto-update isn't supported");
			}
		}
	};
	
	LIR.initialize();
}

//</nowiki>
//</source>