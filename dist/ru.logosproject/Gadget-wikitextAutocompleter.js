/**
 * WikitextAutocompleter
 * Provides Autocomplete (a dropdown list) for wiki editing such as for 
 * completing templates
 * Uses https://yuku-t.com/textcomplete/
 *
 * Notes:
 * - Won't work with CodeEditor since it doesn't use a textarea but that's fine
 *   since CodeEditor won't be used for wikitext
 * Bugs:
 * - Overlapping strategies, e.g. "{{Template1|param1|para{{Templ"; it seems 
 *   both run, but the earlier strategy in the array registered appears?
 */

if (mw.config.get("wgAction") == "edit") {
	
	var api = new mw.Api();
	var killSwitchCount = 10; // a limit for recursive mw.api queries
	
	/** Global Variables */
	strategies = []; // Array of strategies
	templates = {}; // Contains all the parameter arrays/definitions
	autoComplete = {}; // Contains supporting variables, e.g. initialismsArray, createTemplateStrategy()
	
	/** Supporting definitions */


	/** Template parameter definitions */
	
	/* Template:Color */
	templates.Color = {};
	$.get( "https://hytale-ru.gamepedia.com/Шаблон:Цвет текста?action=raw", function( data ) {
		var colorsArray = [];
		data.split("</includeonly>")[0]
			.split("#switch:{{{1\|}}}")[1]
			.split("\|#default")[0]
			.match(/\|[a-zA-Z0-9 ]*/g)
			.forEach(function(value, index){
				var name = value.slice(1).trim();
				colorsArray.push(name);
			});
		templates.Color = {
			"1": colorsArray
		};
	});
	
	/* Template:KSTest */
	templates.KSTest = {
		"1": ["testparam1value1","testparam1value2","testparam1value3"],
		"2": ["testparam2value1","testparam2value2","testparam2value3"],
		"3": ["testparam3value1","testparam3value2","testparam3value3"]
	};
	
	/* Template:Icon */
	templates.Icon = {};
	$.get( "https://hytale-ru.gamepedia.com/Шаблон:Надпись?action=raw", function( data ) {
		var iconsArray = [];
		data.split("</includeonly>")[0]
			.split("\|#default")[0]
			.match(/\n\|[a-zA-Z0-9-+ ]*/g)
			.forEach(function(value, index){
				var name = value.slice(2).trim();
				iconsArray.push(name);
			});
		templates.Icon = {
			"1": iconsArray
		};
	});
	
	/* Template:Exp Game */
	templates["Exp Game"] = {};
	templates["Exp Game"].getParams = function(paramName) {
		return autoComplete.initialismsArray; // Assumes an integer paramName > 0
	};
	
	/** Strategy to autocomplete template names */
	/* Get the template name list */
	autoComplete.templatesArray = [];
	var templateListQuery = {
		"action": "query",
		"format": "json",
		"prop": "",
		"list": "allpages",
		"apnamespace": "10", // Template
		"aplimit": "max"
	};
	killSwitchCount = 10;
	var templateListQueryAjax = function() {
		api.get( templateListQuery ).done( function ( data ) {
			killSwitchCount--;
			if (killSwitchCount < 0) return;
			//console.log( data.query.allpages );
			data.query.allpages.forEach(function(current) {
				autoComplete.templatesArray.push(current.title.slice("Шаблон:".length));
			});
			if ("continue" in data) {
				templateListQuery["continue"]   = data["continue"]["continue"];
				templateListQuery.apcontinue = data["continue"].apcontinue;
				templateListQueryAjax();
			}
		} );
	};
	templateListQueryAjax();
	
	/* Create the template name strategy */
	autoComplete.templateListStrategy = 
	{
		id: "TemplateList",
		match: /(\{\{)([^#<>{}_\[\]\|]*)$/, // invalid article title characters https://www.mediawiki.org/wiki/Manual:Page_title#Invalid_page_titles
		search: function (term, callback) {
			console.log("term: " + term);
			var nameArray;
			if (term === "")
				nameArray = autoComplete.templatesArray;
			else
				nameArray = autoComplete.templatesArray.filter(function(currentValue) { return currentValue.startsWith(term); });
			callback(nameArray); // List of possible completions ("names")
		},
		template: function (name) {
			var displayName = name;
			return displayName; // What to display in the list
		},
		replace: function (name) {
			var replacementString = "$1" + name;
			return replacementString; // What to replace the matched typed text with
		}
	};
	
	/** Strategy to autocomplete boilerplate */
	autoComplete.boilerplateMap = {};
	autoComplete.boilerplateNameArray = [];
	/* Get the template name list */
	var boilerplateListQuery = {
		"action": "query",
		"format": "json",
		"prop": "",
		"list": "allpages",
		"apnamespace": "450", //Boilerplate namespace
		"aplimit": "max"
	};
	killSwitchCount = 10;
	var boilerplateListQueryAjax = function() {
		api.get( boilerplateListQuery ).done( function ( data ) {
			killSwitchCount--;
			if (killSwitchCount < 0) return;
			//console.log( data.query.allpages );
			data.query.allpages.forEach(function(current) {
				autoComplete.boilerplateNameArray.push(current.title.slice("Boilerplate:".length));
			});
			if ("continue" in data) {
				boilerplateListQuery["continue"]   = data["continue"]["continue"];
				boilerplateListQuery.apcontinue = data["continue"].apcontinue;
				boilerplateListQueryAjax();
			} else {
				// Callback
				//console.log(autoComplete.boilerplateNameArray);
				autoComplete.boilerplateNameArray.forEach(function(boilerplateName, index){
					$.get( "https://hytale-ru.gamepedia.com/Boilerplate:" + boilerplateName + "?action=raw", function( data ) {
						//console.log(data);
						autoComplete.boilerplateMap[boilerplateName] = 
							data.split("<boilerplate>\n")[1]
								.split("\n</boilerplate>")[0];
					});
				});
			}
		} );
	};
	boilerplateListQueryAjax();
	/* Create the boilerplate strategy */
	autoComplete.boilerplateStrategy = 
	{
		id: "boilerplate",
		match: /(\\boilerplate\:)([^#<>{}_\[\]\|]*)$/, // invalid article title characters https://www.mediawiki.org/wiki/Manual:Page_title#Invalid_page_titles
		search: function (term, callback) {
			console.log("term: " + term);
			var nameArray = Object.keys(autoComplete.boilerplateMap).filter(function(currentValue) { return currentValue.startsWith(term); });
			callback(nameArray); // List of possible completions ("names")
		},
		template: function (name) {
			var displayName = name;
			return displayName; // What to display in the list
		},
		replace: function (name) {
			var replacementString = autoComplete.boilerplateMap[name];
			return replacementString; // What to replace the matched typed text with
		}
	};
	
	/** Registering strategies */
	
	autoComplete.currentHeader = ""; // An attempt to generate a dropdown menu header to describe the parameter in some way, to accompany choices, or when there are no preset choices.
	
	autoComplete.getTextcompleteScript = function() {
		console.log( "Загрузка модели завершения текста..." );
		$.getScript( "https://unpkg.com/textcomplete/dist/textcomplete.min.js", function( data, textStatus, jqxhr ) {
			//console.log( [ data, textStatus, jqxhr.status ] ); // Data returned, Success, 200
			console.log( "Загружена модель завершения текста. (Предупреждение: Модель может ещё не выполняться)" );
			// Textarea object: https://github.com/yuku-t/textcomplete/issues/114#issuecomment-318352383
			Textarea = Textcomplete.editors.Textarea; // Global Variable
			autoComplete.registerStrategies();
		});
	};
	
	/* Note: The param arrays need not exist before strategy is registered */
	autoComplete.registerStrategies = function() {
		var editor = new Textarea(document.getElementById("wpTextbox1"))
		  , options = {
				dropdown: {
					maxCount: 5000,
					header: function() { return autoComplete.currentHeader; },
					style: { "margin-top": (-parseFloat($("body").css("margin-top")))+"px" }
				}
			}
		  , textcomplete = new Textcomplete(editor, options);
		
		/** Register strategies */ // The earier strategy in the list will appear if both match (both still run I think)
		strategies.push(autoComplete.boilerplateStrategy);
		strategies.push(autoComplete.templateListStrategy);
		strategies.push(autoComplete.createTemplateStrategy());
		textcomplete.register(strategies);
	};
	
	autoComplete.createTemplateStrategy = function() {
		//console.log("/* createTemplateStrategy - start */");
		
		// Get text preceding text cursor, 
		// like https://github.com/yuku-t/textcomplete/blob/6f07195c47ace5e787cf7b46604b37a8bd5c6d30/src/textarea.js#L82
		var getBeforeCursor = function(/**textarea*/) { 
			textarea = document.getElementById("wpTextbox1");
			return textarea.selectionStart !== textarea.selectionEnd ? null : textarea.value.substring(0, textarea.selectionEnd);
		};
		
		var getLastTemplateOpenBracketPos = function(text) { // Assumes no "{{{" and "}}}" (perhaps ok even with these, anyway?), nor <nowiki> tags that would render "{{" or "}}" escaped/inactive,
			var count = 0
			  , index = text.length - 2
			  , foundBracketPair
			  , chars;
			while (index >= 0) {
				chars = [text.charAt(index), text.charAt(index+1)];
				///console.log(chars);
				foundBracketPair = false;
				if (chars[0] === '}' && chars[1] === '}') {
					count++;
					foundBracketPair = true;
				} else if (chars[0] === '{' && chars[1] === '{') {
					count--;
					foundBracketPair = true;
				}
				if (count < 0) return index;
				if (foundBracketPair) index -= 2; else index -= 1;
			}
			return -1;
		};
		
		var templateStrategy = 
		{
			id: "Templates",
			match: /(\|(?:[^\|\=]*= ?)?)([^\|]*)$/,
			search: function (term, callback) {
				console.log("[templateStrategy] Started search");
				var text = getBeforeCursor();
				//console.log(" * Text before cursor: " + text);
				text = text.slice(0, text.length - term.length);
				//console.log(" * Text before term: " + text);
				var templateStartPos = getLastTemplateOpenBracketPos(text);
				var templateBody = text.slice(templateStartPos + "{{".length);
				//console.log(" * templateBody: " + templateBody);
				var templateName = templateBody.slice(0,templateBody.indexOf("|")).trim(); // Assumes stuff like {{Test|, not {{Test{{aTemplate}}|
				console.log("[templateStrategy] templateName: " + templateName);
				/* 
				 * Remove the templates [TODO: and tables, and internal links, and escaped pipes] (there are no unmatched template brackets within this string?)
				 * - Loop a regex removal of {{..}} pairs, inside out
				 * - There should be no unmatched pairs due to having called 
				 *   getLastTemplateOpenBracketPos(text)
				 * - Use "?" in the regex to "lazy" match, or else it matches 
				 *   the biggest {{...}}, which renders the following method 
				 *   non-functional
				 * - The match will only have one "}}" at the end, due to ltr 
				 *   lazy regex search?
				 * - Then remove the rightmost/innermost {{...}} that includes 
				 *   this "}}", by reversing so the pair is on the left side of 
				 *   the string, lazy matching, then reversing back
				 */
				var templateBodyTrimmed = templateBody;
				while (templateBodyTrimmed != (templateBodyTrimmed = templateBodyTrimmed.replace(/\{\{[^]*?\}\}/g, function (match) {
						var matchInner = match.slice(2, match.length - 2); // Remove outer braces
						if (matchInner.includes("{{")) { 
							// Remove the last (inner) pair of "{{" and "}}"
							return match.split("").reverse().join("") // Reverse
									.replace(/\}\}[^]*?\{\{/, "") // Pairs become "}}...{{" when the string is reversed
									.split("").reverse().join(""); //Reverse back
						} else {
							return "";
						}
					})
				));
				
				// Count the number of "|" in text to determine which number 
				// parameter (e.g. templateBodyTrimmed = "templateName|x=param1|param2|currentParam" )
				var paramSplit = templateBodyTrimmed.split("|")
				  , lastParam = paramSplit[paramSplit.length - 1]
				  , paramTerm = term.replace(/^\s+/,"") //left trim
				  , paramName;
				if (lastParam.indexOf("=") > -1) { // Named parameter
					paramName = lastParam.split("=")[0].trim();
				} else { // Anon/numbered parameter
					paramName = 1;
					for (var i=paramSplit.length-2; i>0; i--) { // Ignore the templateName and currentParam elements at the ends
						if (paramSplit[i].indexOf("=") < 0) paramName++; //increment the param number for every param that doesn't have an equals sign
					}
				}
				console.log("[templateStrategy] paramName: " + paramName);
				console.log("[templateStrategy] paramTerm: " + paramTerm);
				
				var paramArray = [];
				if (templates[templateName] !== undefined) {
					if (typeof templates[templateName].getParams === "function") {
						paramArray = templates[templateName].getParams(paramName);
					} else {
						if (templates[templateName][paramName] !== undefined)
							paramArray = templates[templateName][paramName];
					}
				}
				//console.log(" * paramArray: " + paramArray);
				autoComplete.currentHeader = templateName + "-" + paramName; // testing out header
				var nameArray = paramArray.filter(function(currentValue) { return currentValue.startsWith(paramTerm); });
				//console.log(" * nameArray: " + paramArray);
				console.log("[templateStrategy] End of search, calling callback()");
				callback(nameArray); // List of possible completions ("names")
			},
			template: function (name) {
				var displayName = name;
				return displayName; // What to display in the list
			},
			replace: function (name) {
				var replacementString = "$1" + name;
				return replacementString; // What to replace the matched typed text with
			}
		};
		
		//console.log("/* createTemplateStrategy - end */");
		
		return templateStrategy;
		
	};
	
	/** Load Textcomplete then register the strategies */
	$(document).ready(autoComplete.getTextcompleteScript);
	
}