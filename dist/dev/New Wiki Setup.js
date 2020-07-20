/* <source lang="javascript">
 * New Wiki Setup
 * 
 * Performs basic New Wiki tasks. Created for Wiki Managers, but maybe useful to others
 * 
 * @author TyA
 * Parts were shamelessly adapted from https://dev.fandom.com/wiki/CategoryRenameAuto-update
 */
 

(function (window, $, mw) {
    if(
        
        window.NWSLoaded ||
        mw.config.get('wgNamespaceNumber') != -1 || // Special: namespace
        mw.config.get('wgCanonicalSpecialPageName') != "Blankpage" || // Special:BlankPage
		$.getUrlVar('blankspecial') != 'NWS'
    ) {
        return;
    }
 
    window.NWSLoaded = true; 
    var NWS = {
		init: function() {
			this.api = new mw.Api();
			this.step;
			this.buildForm();
			this.parentCategory = wgSitename;
			this.headerColor = mw.config.get('wgSassParams')["color-community-header"];
			this.errorLog = "";
		},
		
		onClick: function() {
			this.step = $.getUrlVar('wpStep');
			if (typeof(this.step) == 'undefined')
				this.step = document.getElementById('wpStep').value;
				if(typeof(this.step) == 'undefined')
					this.step = 1;
				
			if(isNaN(this.step)){
				this.step = 1;
			}
			
			this.step = Number(this.step);
			
			// Use a switch to allow easy step based resuming
			switch(this.step) {
				case 1: 
					this.edit("File:Wiki-background", "This file contains the wiki's background. It is modified via [[Help:ThemeDesigner|]].\n\n[[Category:Wiki Files]]", this.step);
					
					this.step++;
					
				case 2: 
					this.edit("Category:Wiki Files", "This category contains files related to the wiki itself.\n\n[[Category:Images]]", this.step);
					
					this.step++;
					
				case 3:
					this.edit("File:Wiki-wordmark.png", "This file is the wiki's wordmark.\n\n[[Category:Wiki Files]]", this.step);
					
					this.step++;
					
				case 4: 
					this.edit("File:Favicon.ico", "This file is the wiki's favicon.\n\n[[Category:Wiki Files]].", this.step);
					
					this.step++;
					
				case 5:
					this.appendText("Category:Article stubs", "\n\n[[Category:Wiki Maintenance]]", this.step);
					
					this.step++;
					
				case 6: 
					this.edit("Category:Wiki Maintenance", "This category contains items related to Wiki Maintenance. Please help us fix them if you can!\n\n[[Category:" + this.parentCategory + "]]", this.step);
					
					this.step++;
					
				case 7: 
					this.appendText("File:CC-BY-SA3.png", "\n\n[[Category:Wiki Files]]", this.step);
					
					this.step++;
					
				case 8: 
					this.appendText("File:PublicDomain.png", "\n\n[[Category:Wiki Files]]", this.step);
					
					this.step++;
					
				case 9: 
					this.edit("Category:Templates/Infobox", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
				case 10: 
					this.edit("Category:Templates/Context-link", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
				case 11: 
					this.edit("Category:Templates/Quote", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
				case 12: 
					this.edit("Category:Templates/Notice", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
				case 13: 
					this.edit("Category:Templates/Navbox", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
				
					this.step++;
					
				case 14: 
					this.edit("Category:Templates/Design", "This category contains {{subst:SUBPAGENAME}} templates.\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
				case 15:
					this.edit("Category:Article management templates", "This category contains Article management templates\n\n[[Category:Templates]]", this.step);
					
					this.step++;
					
					
				case 16: 
					this.edit("Category:Pages with broken file links", "This category contains {{subst:PAGENAME}}. Please help us fix them! \n\n__HIDDENCAT__\n[[Category:Wiki Maintenance]]", this.step);
					
					this.step++;
					
					
				case 17: 
					this.edit("Category:Hidden categories", "This  category contains Hidden categories, which are hidden on the pages they are in unless the appropriate [[Help:Preferences|preference]] is set. To add a page to this category, please add <nowiki>__HIDDENCAT__</nowiki> to the page.\n\n[[Category:Wiki Maintenance]]", this.step);
					
					this.step++;
					
					
				case 18:
					this.edit("Category:Hatnote templates with errors", "This category contains pages where a [[Template:Hatnote]] template is used incorrectly. Please fix it if you can!\n\n__HIDDENCAT__[[Category:Wiki Maintenance]]\n[[Category:Templates]]", this.step);
					
					this.step++;
					
					
				case 19:
					this.prependText("Module:Mbox", "-- <pre>\n", this.step);
					
					this.step++;
					
					
				case 20:
					this.edit("Category:Episodes", "This category contains articles on episodes in the series.\n\n[[Category:" + this.parentCategory + "]]", this.step);
					
					this.step++;
					
					
				case 21:
					this.edit("Category:Locations", "This category contains articles related to locations in the series.\n\n[[Category:" + this.parentCategory + "]]", this.step);
					
					this.step++;
					
					
				case 22:
					this.edit("Template:CharacterPortal", '<div style="background-color:{{{color1|' + this.headerColor + '}}}; border-radius: 8px; padding: 0px; width: 150px; height: {{{height|150px}}}; position: relative; border:2px solid #FFFFFF;"><div style="border-radius: 6px; overflow: hidden; width: 150px; height: {{{height|150px}}}; background-color: ' + this.headerColor + ';">[[File:{{{image}}}|150px|{{{name}}}|link={{{articlename|{{{name}}}}}}]]</div><span style="width: {{{namewidth|auto}}}; background-color: ' + this.headerColor + '; position: absolute; right: 0px; bottom: 0px; font-weight:300; font-size:100%; color: white; padding: 0 3px; border-radius: 5px 0; border-top:1.5px solid #FFFFFF;border-left:1.5px solid #FFFFFF">[[{{{articlename|{{{name}}}}}}|<span style="color: white">{{{name}}}</span>]]{{#if:{{{namewidth|}}}|<br/><br/>}}</span></div><noinclude>[[Category:Templates/Design]]</noinclude>', this.step);
					
					this.step++;
					
					
				case 23:
					this.edit("MediaWiki:Custom-Wiki Manager", mw.config.get("wgUserName"), this.step);
					
					this.step++;
					
					
				case 24:
					this.edit("MediaWiki:ImportJS", "dev:WikiManager Nameplate.js", this.step);
					
					this.step++;
					
					
				case 25:
					this.edit("Template:MP Header", '<div style="border: 1px solid transparent; border-radius: 0.3em; font-size: 130%; font-weight: bold; margin: 5px 0 10px; overflow: auto; padding: 0.3em 0.4em 0.2em; text-align: center; background-color:' + this.headerColor + '; color:#ffffff">{{{message}}}</div><noinclude>\n\n;Documentation:\n* <pre>{{MP Header|message=awefawef}}</pre>\n[[Category:Templates/Design]]', this.step);
					
					this.step++;
					
					
				case 26:
					this.getPageText("Template:Hatnote/doc", function(text) {
						text = text.replace("The template has several formats, including:", "The template has several formats, including:\n<pre>");
						text = text.replace(":the last being produced by e.g. {{T|For|similar terms|Main Page|Main Page|Main Page|Main Page}}.", ":the last being produced by e.g. {{T|For|similar terms|Main Page|Main Page|Main Page|Main Page}}.\n</pre>");
						
						NWS.edit("Template:Hatnote/doc", text, this.step);
					
					});
					
					
					this.step++;
					
					
				case 27:
					this.edit("Category:" + this.parentCategory, "This is the main category for " + this.parentCategory + ". A full list of existing categories can be found at [[Special:Categories]].", this.step);
					
					this.step++;
					
					
				// Start moving Category:Browse -> Category:parentCategory
				case 28:
					this.replaceText("Category:Blog posts", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
					
				case 29:
					this.replaceText("Category:Candidates for deletion", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
					
				case 30:
					this.replaceText("Category:Disambiguations", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
					
				case 31:
					this.replaceText("Category:Help", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
					
				case 32:
					this.replaceText("Category:Images", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
					
				case 33:
					this.replaceText("Category:Templates", "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step );
					
					this.step++;
					
				case 34: // change category on main page 
					this.replaceText(this.parentCategory, "[[Category:Browse]]", "[[Category:" + this.parentCategory + "]]", this.step);
					
					this.step++;
					
				case 35: 
					this.delete("Category:Browse", this.step);
					
					this.step++;
				
				
			}
			
			
			
		},
		
		/**
		 * Edits a page, replacing all text with the provided text 
		 */
		edit: function(page, text, step) {
			setTimeout(function() {
							NWS.api.post({
				action: 'edit',
				title: page,
				token: mw.user.tokens.get('editToken'),
				bot:true,
				text: text,
				summary: 'Performing New Wiki Setup via script'
			}).done(function(e) {
				if(e.error) {
					console.error(e);
					NWS.logError(page, step, e.error.info);
					// add to log 
				} else {
					// success 
				}
			});
			}, 1000);

		},
		
		/** 
		 *Appends text to the end of the article
		 */
		appendText: function(page, text, step) {
			this.getPageText(page, function(oldText) {
				NWS.edit(page, oldText + text, step);
			});

			
		},
		
		/**
		 * Prepends text to the page
		 */
		 
		prependText: function(page, text, step) {
			this.getPageText(page, function(oldText) {
				NWS.edit(page, text + oldText, step);
			});
		},
		
		/**
		 * oldText can be either a string or a regex. it makes the edit too. 
		 *   if you want to do more, don't use this helper function
		 */
		replaceText: function(page, oldText, newText, step) {
			this.getPageText(page, function(text) {
				text = text.replace(oldText, newText);
				NWS.edit(page, text, step);
			});
		},
		
		/**
		 * deletes a page
		 */
		 
		delete: function(page, step) {
			this.api.post({
				action: "delete",
				title: page,
				reason: "Performing New Wiki Setup via script",
				token: mw.user.tokens.get('editToken'),
				bot:true,
				format:"json"
			}).done(function(e) {
				if(e.error) {
					console.error(e);
					NWS.logError(page, step, e.error.info);
				} else {
					// was success 
				}
			});
		},
		
		/**
		 * Gets page contents. To use the content, use a callback. 
		 */
		getPageText: function(page, callback, step) {
			var out;
			this.api.get({
				action: "query",
				prop: "revisions",
				rvprop: "content",
				titles: page,
				format: "json"
			}).done(function(e) {
				if(e.error) {
					console.error(e);
					NWS.logError(page, step, e.error.info);
				} else {
					for(var i in e.query.pages) {
						if(typeof e.query.pages[i].missing != 'undefined') 
							continue; // if the page doesn't exist, don't continue with processing
						
						if(e.query.pages[i].title == page) {
							console.log(e.query.pages);
							out = e.query.pages[i].revisions[0]['*'];
						}
					}
					
					if(typeof out == 'undefined')
						out = ""; // page doesn't exist, probably;
					callback(out);
					
				}
			});
		},
		
		logError: function(page, step, error) {
			this.errorLog += "<div>" + page + " on step " + step + " had error: " + error + "</div>";
			if ($("#NWSFailedLog").length > 0){
				document.getElementById("NWSFailedLog").innerHTML = this.errorLog;
				$("#NWSFailedLog div:odd").css("background-color", "red");
			}
		},
		
		buildForm: function() {
			var formHtml = '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>New Wiki Setup</h1></div>This page allows for you to perform basic wiki creation tasks automatically.<br />' + 
				'<fieldset>' +
					'<legend>New Wiki Setup</legend>' + 
					'<table border="0" id="mw-nws-table">' +
						'<tr>' +
							'<td class="mw-label">Step:</td>' +
							'<td>' + 
								'<input name="wpStep" size="79.5" value="1" type="number" id="wpStep" maxlength="255">' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td>&#160;</td>' + 
							'<td class="mw-submit">' + 
								'<a style="margin-left: 0px;" class="wds-button" id="btn-nws-start">Start</a><span id="liveLoader" style="display:none">' + 
									'<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif" />'+
								'</span>' + 
								'<span id="NWSStatus" style="font-weight: bold"/>' + 
							'</td>' + 
						'</tr>' + 
						'<tr>' + 
							'<td class="mw-label">Errors:</td>' + 
							'<td class="mw-input">' + 
								'<div id="NWSFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll; color: #3a3a3a;">Errors will appear here. If an error occurs, feel free to reload the page and put the relevant Step number into the appropriate box. If errors continue, try advancing a step.</div>' + 
							'</td>' + 
						'</tr>' + 
					'</table>' + 
				'</fieldset>' + 
			'</div>';

			$('#WikiaArticle').html(formHtml);
			$('#btn-nws-start').click($.proxy(this.onClick, this));
			document.title = "New Wiki Setup";
		}
		

	};
	mw.loader.using('mediawiki.api', $.proxy(NWS.init, NWS));
 
 
}(this, jQuery, mediaWiki));