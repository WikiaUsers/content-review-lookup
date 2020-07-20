/**
*
* Description:
* Updates category links in use on the wiki when category is renamed.
*
* @Authors Foodbandlt and Jr Mime (Layout of page)
*
**/

if (typeof CRA === "undefined"){
	// Start script 

	CRA = {
		supportedLanguages: ['en', 'de', 'es', 'fr', 'ko', 'nl', 'pl', 'pt-br'],
		
		/* 
			To insert new languages, add the language code to the supportedLanguages array above and 
			make a sub-page of CategoryRenameAuto-update with the name of your language code
			example: CategoryRenameAuto-update/en.js
		*/
			
		i18n: {
			// Compatibility...
			en: {
				categoryNamespace: 'Category'
			}
		},
		// Wiki's selected language
		lang: '',
		// User's selected language
		userLang: '',
		
		started: false,
		
		delay: 1000,
 
		updateStatus: function(gifDisplay, message){
			if ($("#CRAStatus").length == 0) return false;
 
			if (typeof gifDisplay === "string"){
				message = gifDisplay;
			}else if (typeof gifDisplay === "boolean"){
				if (gifDisplay == false){
					displayValue = "none";
				}else{
					displayValue = "inline-block";
				}
				document.getElementById("liveLoader").style.display = displayValue;
			}else{
				return false;
			}
 
			if (typeof message === "string"){
				$("#CRAStatus").html(" " + message);
			}
			return true;
		},
		
		updateProgress: function(show, progress){
			if (typeof progress == "undefined" && typeof show == "boolean")
				progress = 0;
				
			if (typeof progress == "undefined" && typeof show == "number")
				progress = show;
				
			if (typeof show == "boolean"){

				if (show)
					$('.mw-submit:has("#CRAStatus")').append("<div id='CRAQueueProgress' style='float: right; width: 200px; border: 2px solid black; height: 17px;'><div id='CRAProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
				else
					$("#CRAQueueProgress").remove();
			}
			
			if (typeof progress == "number"){
				$("#CRAProgressInd").css("width", ((progress * 100) + "%"));
				return;
			}
		},
		
		start: function(type){
			CRA.rand = Math.floor( Math.random()*1000 );
			/* Checks if function has already started */
			if (CRA.started == true){
				return false;
			}
			
			if (document.getElementById("CRADeleteRadio").checked != true && 
			document.getElementById("CRARedirectRadio").checked != true && 
			document.getElementById("CRANothingRadio").checked != true && 
			document.getElementById("CRAReplaceRadio").checked != true){
				CRA.updateStatus(false, CRA.userLang.chooseOldPage);
				return false;
			}
			
			CRA.started = true;
			
			CRA.updateStatus(true, CRA.userLang.checkingNewTitle);
			
			/* Sets variables used by the function */
			CRA.oldName = decodeURIComponent($.getUrlVar('categoryname').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'"),
			CRA.newName = document.getElementById("wpNewTitleMain").value,
			CRA.reason = $("#wpReason").val();
			CRA.pageKey = [];
			CRA.pageData = [];
			CRA.queueData = [];
			CRA.requestCompleted = [];
			CRA.oldCategoryContent = "";
			
			if (localStorage[wgUserName + "_CRANamespaceSelection"] === false){
				var namespaceSelection = "&blnamespace=0";
			}else{
				var namespaceSelection = "";
			}
 
			/* Check if destination file name is in use */
			$.getJSON("/api.php?action=query&prop=revisions&rvprop=content&titles=" + CRA.lang.categoryNamespace + ":" + encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json&v=" + CRA.rand, function(result){
				if (typeof result.query.pages[-1] !== "undefined"){
					CRA.updateStatus(true, CRA.userLang.gettingCatMembers);
					/* If not, then get file usage for category */
					$.getJSON("/api.php?action=query&list=categorymembers&cmtitle=" + CRA.lang.categoryNamespace + ":" + encodeURIComponent(CRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&cmprop=title&cmlimit=5000&format=json&v=" + CRA.rand, function(result){
						var categoryUsage = result.query.categorymembers;
						
						$.getJSON("/api.php?action=query" + namespaceSelection + "&list=backlinks&bltitle=" + CRA.lang.categoryNamespace + ":" + encodeURIComponent(CRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json&v=" + CRA.rand, function(result){
							var categoryLinks = result.query.backlinks;
							var totalCatUsage = categoryUsage.concat(categoryLinks);
 
							if (console) console.log("Category usage successfully retrieved");
							if (totalCatUsage.length > 0){

								/* Adds pages category is used on to window.CRA.pageKey to help keep track of pages in window.CRA.pageData later on */
								for (var currentPage = 0; currentPage < totalCatUsage.length; currentPage++){
									var title = totalCatUsage[currentPage].title;

									if (CRA.pageKey.indexOf(title) == -1){
										CRA.pageKey[CRA.pageKey.length] = title;
									}
								}
								
								/* Processing page content first to not have to send a separate API request
									to retrieve old category contents */
								CRA.updateStatus(true, CRA.userLang.fetchingContents);
								
								CRA.processPageContent(function(){
									CRA.updateStatus(true, CRA.userLang.creatingNewPage);
									
									CRA.createNewPage(function(){
										CRA.updateStatus(true, CRA.userLang.submittingPages);
										
										if (console) console.log("Begin submitting pages");
										
										//CRA.log("Submitting page content");
					
										CRA.updateProgress(true);
										CRA.queueProgress = 0;
										
										
										var l = 0;

										var throttle = setInterval(function(){
											CRA.submitChangedPages(l, function(){
												var completeMessage = CRA.userLang.renameComplete + ': <a href="/wiki/'+ CRA.lang.categoryNamespace +':' +  encodeURIComponent(CRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + '">' + CRA.newName + '</a>.';
												if (document.getElementById("CRADeleteRadio").checked === true){
													CRA.deleteOldPage(function() {
														CRA.updateStatus(false, completeMessage);
														CRA.updateProgress(false);
													});
												}else if (document.getElementById("CRARedirectRadio").checked === true){
													CRA.replaceOldContents("#REDIRECT [[:" + CRA.lang.categoryNamespace + ":" + CRA.newName + "]]", 
													CRA.lang.redirToNew + " → [[" + CRA.lang.categoryNamespace + ":" + CRA.newName + "]] (" + CRA.lang.automatic + ")", 
													function(){
														CRA.updateStatus(false, completeMessage);
														CRA.updateProgress(false);
													});
												}else if (document.getElementById("CRAReplaceRadio").checked){
													CRA.replaceOldContents($("#CRAReplaceText").val(), 
													CRA.reason + " (" + CRA.lang.automatic + ")", 
													function(){
														CRA.updateStatus(false, completeMessage);
														CRA.updateProgress(false);
													});
												}else{
													CRA.updateStatus(false, completeMessage);
													CRA.updateProgress(false);
												}	
											});

											l++;

											if (l == CRA.pageData.length){
												clearInterval(throttle);
											}
										}, (CRAoptions.delay || CRA.delay));
										
									});
								});
							}else{
								/* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
								CRA.started = false;
								CRA.updateStatus(false, CRA.userLang.catNotUsed);
							}
						});
					});
				}else{
					CRA.started = false;
					CRA.updateStatus(false, CRA.userLang.destExists);
				}
			});
 
		},
		
		createNewPage: function(callback){
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "edit",
					title: CRA.lang.categoryNamespace + ":" + CRA.newName,
					summary: CRA.reason + " (" + CRA.lang.automatic + ")",
					text: CRA.oldCategoryContent,
					minor: true,
					recreate: true,
					createonly: true,
					bot: true,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					alert(CRA.userLang.unableToCreate + " \"" + CRA.newName + "\".");
					CRA.started = false;
				},
				success: function(result){
					if (console) console.log(CRA.userLang.createdNewCat + " \"" + CRA.newName + "\"");

					if (typeof result.error !== "undefined"){
						CRA.failedLogCustom(CRA.userLang.pageNotCreated[0] + " \"" + CRA.newName + "\" " + CRA.userLang.pageNotCreated[1] + ":\"" + result.error.code + "; " + result.error.info + "\".");
						return false;
					}
					
					/* Call callback if exists */
					if (typeof(callback) === "function"){
						callback();
					}
				}					
			});
		},
		
		processPageContent: function(callback) {
			if (console) console.log("Start processing page content");
			
			/* Sets progress checking variables */
			for (i = 0; i<CRA.pageKey.length; i++){
				CRA.requestCompleted[i] = false;
			}

			if (console) console.log("Getting page contents");
			
			/* Calls API for page contents */
			$.post(
				"/api.php",
				{
					action: "query",
					prop: "revisions",
					rvprop: "content",
					titles: CRA.pageKey.join("|") + "|" + CRA.lang.categoryNamespace + ":" + CRA.oldName,
					format: "json",
					v: CRA.rand
				},
				function(result){
					var oldCatExists = false;
					for (var i in result.query.pages){
						if (typeof result.query.pages[i].missing != 'undefined') continue;
						
						var keyNum = CRA.pageKey.indexOf(result.query.pages[i].title);
						
						if (result.query.pages[i].title == CRA.lang.categoryNamespace + ":" + CRA.oldName){
							CRA.oldCategoryContent = (result.query.pages[i].revisions[0]["*"] !== "" ? result.query.pages[i].revisions[0]["*"] : ".");
							oldCatExists = true;
						}else{
							CRA.pageData[keyNum] = {
								title: CRA.pageKey[keyNum],
								content: result.query.pages[i].revisions[0]["*"],
							};
						}
					}
					
					if (!oldCatExists)
						CRA.oldCategoryContent = ".";
						
					if (console) console.log("Page contents retrieved and saved");
					
					if (console) console.log("Begin processing page content.");
					
					/* Replacing category name on each page */
					for (i=0; i<CRA.pageData.length; i++){
						var escapedName0 = CRA.oldName.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/ /g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
						
						if ( escapedName0.substr(0,1).match(/[A-z]/i) ){
							var escapedName = "[" + escapedName0.substr(0,1).toUpperCase() + escapedName0.substr(0,1).toLowerCase() + "]" + escapedName0.substr(1);
						}else{
							var escapedName = escapedName0;
						}
						
						var pageReplacement = new RegExp("(\\[:?(" + CRA.lang.categoryNamespace + "|" + CRA.i18n.en.categoryNamespace + "):[ ]*?)" + escapedName + "(\\]|[ ]*?\\|)", "g");
						var replacementReg = new RegExp(escapedName, "g");
						var regExec;
						
						if (CRA.pageData[i].content.search(pageReplacement) != -1){
							while ( (regExec = pageReplacement.exec(CRA.pageData[i].content)) !== null){
								CRA.pageData[i].content = CRA.pageData[i].content.replace(regExec[0], regExec[0].replace(replacementReg, CRA.newName));
								pageReplacement.lastIndex += (regExec[0].replace(replacementReg, CRA.newName).length - regExec[0].length) - (regExec[3].length);
							}
						}else{
							CRA.failedLogCustom(CRA.lang.unableToFind[0] + " \"" + CRA.oldName + "\" " + CRA.lang.unableToFind[1] + " \"" + CRA.pageData[i].title + "\"" + CRA.lang.unableToFind[2]);
						}
						
					}
					
					if (typeof(callback) === "function"){
						callback();
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
					title: CRA.pageData[pageKey].title,
					summary: CRA.lang.updating + " " + CRA.lang.categoryNamespace + ":" + CRA.oldName + " → [[" + CRA.lang.categoryNamespace + ":" + CRA.newName + "]] (" + CRA.lang.automatic + ")",
					text: CRA.pageData[pageKey].content,
					minor: true,
					nocreate: true,
					redirect: false,
					bot: true,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					CRA.requestCompleted[pageKey] = true;
					CRA.queueProgress++;
					CRA.updateProgress(CRA.queueProgress / CRA.pageData.length);
					alert("Unable to publish page \""+CRA.pageKey[pageKey]+"\".  Please rename categories on that page manually.");
					if (CRA.requestCompleted.indexOf(false) == -1){
						if (typeof(callback) === "function"){
							callback();
						}
					}	
				},
				success: function(result){
					CRA.requestCompleted[pageKey] = true;
					CRA.queueProgress++;
					CRA.updateProgress(CRA.queueProgress / CRA.pageData.length);
					if (console) console.log("Posted page \""+CRA.pageKey[pageKey]+"\"");
					CRA.updateStatus(true, CRA.userLang.submittedPage + " \"" + CRA.pageData[pageKey].title + "\"");

					if (typeof result.error !== "undefined"){
						CRA.failedLogCustom(CRA.userLang.pageNotSubmitted[0] + " \"" + CRA.pageData[pageKey].title + "\" " + CRA.userLang.pageNotSubmitted[1] + ":\"" + result.error.code + "; " + result.error.info + "\". " + CRA.userLang.pageNotSubmitted[2] + ".");
					}
					
					if (CRA.requestCompleted.indexOf(false) == -1){
						/* Call callback if exists */

						if (typeof(callback) === "function"){
							callback();
						}
					}
				}					
			});
		},
		
		deleteOldPage: function(callback){
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "delete",
					title: CRA.lang.categoryNamespace + ":" + CRA.oldName,
					reason: CRA.reason + " (" + CRA.lang.automatic + ")",
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json",
					bot: true
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					alert("Unable to delete category \"" + CRA.newName + "\".  Please delete manually.");
					CRA.started = false;
					
					if (typeof(callback) === "function"){
						callback();
					}
				},
				success: function(result){
					if (console) console.log("Deleted category page \"" + CRA.newName + "\"");

					if (typeof result.error !== "undefined"){
						CRA.failedLogCustom(CRA.userLang.pageNotDeleted[0] + " \"" + CRA.lang.categoryNamespace + ":" + CRA.oldName + "\" " + CRA.userLang.pageNotDeleted[1] + ":\"" + result.error.code + "; " + result.error.info + "\".  " + CRA.userLang.pageNotDeleted[2] + ".");
					}
					
					/* Call callback if exists */
					if (typeof(callback) === "function"){
						callback();
					}
				}					
			});
		},
		
		redirectOldPage: function(callback) {
			
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "edit",
					title: CRA.lang.categoryNamespace + ":" + CRA.oldName,
					summary: CRA.lang.redirToNew + " → [[" + CRA.lang.categoryNamespace + ":" + CRA.newName + "]] (" + CRA.lang.automatic + ")",
					text: "#REDIRECT [[:" + CRA.lang.categoryNamespace + ":" + CRA.newName + "]]",
					minor: true,
					nocreate: true,
					redirect: false,
					bot: true,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					alert("Unable to publish page \"" + CRA.oldName + "\".  Please update that page manually.");
					if (typeof(callback) === "function"){
						callback();
					}
				},
				success: function(result){
					if (console) console.log("Posted page \"" + CRA.oldName + "\"");

					if (typeof result.error !== "undefined"){
						CRA.failedLogCustom(CRA.userLang.pageNotSubmitted[0] + " \"" + CRA.oldName + "\" " + CRA.userLang.pageNotSubmitted[1] + ":\"" + result.error.code + "; " + result.error.info + "\". " + CRA.userLang.pageNotSubmitted[2] + ".");
					}
					
					/* Call callback if exists */
					if (typeof(callback) === "function"){
						callback();
					}
				}					
			});
		},
		
		replaceOldContents: function(text, reason, callback){
			$.ajax({
				url: "/api.php",
				type: "POST",
				async: true,
				data: {
					action: "edit",
					title: CRA.lang.categoryNamespace + ":" + CRA.oldName,
					summary: reason,
					text: text,
					minor: true,
					nocreate: true,
					redirect: false,
					bot: true,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function(){
					alert("Unable to publish page \"" + CRA.oldName + "\".  Please update that page manually.");
					if (typeof(callback) === "function"){
						callback();
					}
				},
				success: function(result){
					if (console) console.log("Posted page \"" + CRA.oldName + "\"");

					if (typeof result.error !== "undefined"){
						CRA.failedLogCustom(CRA.userLang.pageNotSubmitted[0] + " \"" + CRA.oldName + "\" " + CRA.userLang.pageNotSubmitted[1] + ":\"" + result.error.code + "; " + result.error.info + "\". " + CRA.userLang.pageNotSubmitted[2] + ".");
					}
					
					/* Call callback if exists */
					if (typeof(callback) === "function"){
						callback();
					}
				}					
			});
		},
		
		updateNamespaceSelection: function(){
			if (document.getElementById("CRANamespaceToggleCheck").checked === true){
				localStorage[wgUserName + "_CRANamespaceSelection"] = "checked";
			}else{
				localStorage[wgUserName + "_CRANamespaceSelection"] = "";
			}
		},
		
		failedLogCustom: function(text){
			if (typeof(CRA.logFailed) === "undefined"){
				CRA.logFailed = "";
			}
			CRA.logFailed += "<div>" + text + "</div>";

			if ($("#CRAFailedLog").length > 0){
				document.getElementById("CRAFailedLog").innerHTML = CRA.logFailed;
				$("#CRAFailedLog div:odd").css("background-color", "red");
			}
		},
		
		initialize: function(){
			window.CRAoptions = window.CRAoptions || {};
			
			if (typeof CRA.supportedLanguages.indexOf(mediaWiki.config.get('wgContentLanguage')) == -1){
				if (mw.config.get('wgAction') == 'view' && mw.config.get('wgNamespaceNumber') == 14) {
					$('#WikiaPageHeader > .wikia-menu-button .WikiaMenuElement').append(
						$('<li/>').append(
							$('<a/>', {
								'href': 'http://dev.wikia.com/wiki/Talk:CategoryRenameAuto-update',
								'title': 'Request/provide translations',
								'html': 'CRA lang not supported'
							})
						)
					);
				}
			}else{
				if (typeof localStorage[wgUserName + "_CRANamespaceSelection"] === "undefined"){
					localStorage[wgUserName + "_CRANamespaceSelection"] = "";
				}
				
				if (typeof CRA.supportedLanguages.indexOf(mediaWiki.config.get('wgUserLanguage')) == -1){
					var userLang = "en";
				}else{
					var userLang = mediaWiki.config.get('wgUserLanguage');
				}
				
				if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'categoryrename')
					$('#WikiaArticle').html('<div style="text-align: center; margin-top: 40px;"><img style="margin-bottom: 7px;" src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif" /><span style="font-weight: bold; font-size: 20px; padding-left: 10px;">Loading language "' + mediaWiki.config.get('wgContentLanguage') + '"...</span></div>');
				
				$.ajax({
					url: "http://dev.wikia.com/wiki/CategoryRenameAuto-update/" + mediaWiki.config.get('wgContentLanguage') + ".js?action=raw&ctype=text/javascript",
					dataType: "script",
					cache: true,
					success: function(){
						if (console) console.log('CategoryRenameAuto-update: Loaded language pack ' + mediaWiki.config.get('wgContentLanguage'));
						CRA.lang = CRA.i18n[mediaWiki.config.get('wgContentLanguage')];
						
						if (userLang != mediaWiki.config.get('wgContentLanguage')){
							$.ajax({
								url: "http://dev.wikia.com/wiki/CategoryRenameAuto-update/" + userLang + ".js?action=raw&ctype=text/javascript",
								dataType: "script",
								cache: true,
								success: function(){
									if (console) console.log('CategoryRenameAuto-update: Loaded secondary language pack ' + userLang);
									CRA.userLang = CRA.i18n[userLang];
									CRA.makeUI();
								}
							});
						}else{
							CRA.userLang = CRA.lang;
							CRA.makeUI();
						}
					},
					error: function(){
						console.log("Could not load language pack " + mediaWiki.config.get('wgUserLanguage'));
					}
				});
			}
		},
		
		makeUI: function(){
			(function ($, mw) {
				'use strict';
				$(function () {
					if (mw.config.get('wgAction') !== 'view' || mw.config.get('wgNamespaceNumber') !== 14) {
						return;
					}

					$('#WikiaPageHeader > .wikia-menu-button .WikiaMenuElement').append(
						$('<li/>').append(
							$('<a/>', {
								'href': '/wiki/Special:Blankpage?blankspecial=categoryrename&categoryname=' + encodeURIComponent(mw.config.get('wgTitle').replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27"),
								'title': 'Rename',
								'html': 'Rename'
							})
						)
					);
				}());
			 
			// Blank page setup

				if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'categoryrename') {
					var decodedOldCat = decodeURIComponent($.getUrlVar('categoryname').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'");
					var createCategoryRenameForm = function() {
			/* Text */		var form = '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>' + CRA.userLang.renamingCat + ':' + $.getUrlVar('categoryname') + '</h1></div>' + CRA.userLang.mainDescription + '<br />'
			/* Current name */		+ '<fieldset><legend>' + CRA.userLang.renameFieldset + '</legend><table border="0" id="mw-renamecategory-table"><tr><td class="mw-label">' + CRA.userLang.currentName + ':</td><td class="mw-input"><strong><a href="/wiki/' + CRA.lang.categoryNamespace + ':' + $.getUrlVar('categoryname') + '">' + CRA.lang.categoryNamespace + ':' + decodedOldCat + '</a></strong></td></tr>'
			/* Rename category */		+ '<tr><td class="mw-label">' + CRA.userLang.renameFieldset + ':</td><td class="mw-input"><strong>' + CRA.lang.categoryNamespace + ':</strong><input name="wpNewTitleMain" size="79.5" value="' + decodedOldCat + '" type="text" id="wpNewTitleMain" maxlength="255"></td></tr>'
			/* Reason box */		+ '<tr><td class="mw-label">' + CRA.userLang.reason + ':</td><td class="mw-input"><textarea name="wpReason" id="wpReason" cols="60" rows="2" maxlength="255"></textarea></td></tr>'
			/* Buttons and misc */		+ '<tr><td>&#160;</td><td class="mw-submit"><div id="CRANamespaceToggle" style="margin: 5px 5px 5px 0px;"><label><input type="checkbox" id="CRANamespaceToggleCheck" onchange="CRA.updateNamespaceSelection()" ' + localStorage[wgUserName + "_CRANamespaceSelection"] + '>' + CRA.userLang.includeLinks + '</label></div><label><input type="radio" name="options" value="redirect" id="CRARedirectRadio">' + CRA.userLang.leaveRedir + '</label><br /><label><input type="radio" name="options" value="delete" id="CRADeleteRadio">' + CRA.userLang.deleteOldCat + '</label><br /><label><input type="radio" name="options" value="replace" id="CRAReplaceRadio">' + CRA.userLang.replaceOldContents + ':</label> <input type="text" size="15" id="CRAReplaceText"><br /><label><input type="radio" name="options" value="nothing" id="CRANothingRadio">' + CRA.userLang.doNothing + '</label></td></tr><tr><td>&#160;</td><td class="mw-submit"><a style="margin-left: 0px;" class="wikia-button" onclick="CRA.start()">' + CRA.userLang.rename + '</a><span id="liveLoader" style="display:none"><img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif" /></span><span id="CRAStatus" style="font-weight: bold"></span></td></tr>'
			/* Error box */			+ '<tr><td class="mw-label">' + CRA.userLang.failedItems + ':</td><td class="mw-input"><div id="CRAFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll; color: #3a3a3a;">' + CRA.userLang.failedDescription + '</div></td></tr>';
						$('#WikiaArticle').html(form);
					};
					
					document.title = CRA.userLang.pageTitle;
					createCategoryRenameForm();
				}
			}(window.jQuery, window.mediaWiki));

		}
	};
	CRA.initialize();