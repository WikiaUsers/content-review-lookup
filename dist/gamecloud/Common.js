function executeOnAllPages() {
	/*
         * The "inputbox" should redirect to view page instead of edit page.
         */
	var createboxes = document.getElementsByClassName("createbox");
	for (var i = 0; i < createboxes.length; i++) {
		var inputs = createboxes[i].getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].name == "action") {
				if (inputs[i].value == "edit") {
					inputs[i].value = "view";
				}
			}
		}
	}
}

/* 
 * isThisScriptToLoad is used to define an alternative script
 * in another location, for instance [[Special:Mypage/monobook.js]].
 * The alternative version will be loaded instead
 * of [[MediaWiki:Common.js]].
 */

var isThisScriptToLoad = true;
if (typeof(wgDeveloperFlag) == 'undefined') {
	/*
	 * Not a developer
	 * Should load [[MediaWiki:Common.js]]
	 */
	isThisScriptToLoad = (typeof(loadFlag) == 'undefined');
} else {
	/*
	 * A developer
	 * Should load [[Special:Mypage/monobook.js]]
	 */
	isThisScriptToLoad = (typeof(loadFlag) != 'undefined');
}

var loadFlag = true;

if (((typeof(wgAction) == 'undefined') || (wgAction == "view") || (wgAction == "purge") || (wgAction == "submit"))) {
	if (document.getElementById('ca-viewsource') == null) {
		if (wgNamespaceNumber == 0) {
			if (isThisScriptToLoad) {
	var NB_SCRITS_TO_LOAD = 3;
	
	/*
	 * Object keeping track of included scripts, so a script ain't included twice
	 */
	var importedScripts = {};
	var nbLoadedScripts = 0;

	/**
	 * Import script.
	 */
	function importScript(page, onLoad) {
		if (importedScripts[page]) {
			return;
		}
		if (onLoad == null) {
			onLoad = '';
		}
		importedScripts[page] = true;
		var andCharacter = '&';
		andCharacter = andCharacter[0] + '';
		var url = wgScriptPath
		+ '/index.php?title='
		+ encodeURIComponent(page.replace( / /g, '_'))
		+ andCharacter
		+ 'action=raw'
		+ andCharacter
		+ 'ctype=text/javascript';
		var scriptElem = document.createElement('script');
		scriptElem.setAttribute('onLoad', onLoad);
		scriptElem.setAttribute('src', url);
		scriptElem.setAttribute('type', 'text/javascript');
		document.getElementsByTagName('head')[0].appendChild(scriptElem);
	}

	/**
	 * Execute the scripts when they are all loaded.
	 */
	function onScriptLoad() {
		nbLoadedScripts = nbLoadedScripts + 1;
		if (nbLoadedScripts == NB_SCRITS_TO_LOAD) {
			init();
		}
	}

	/**
	 * Display a splashscreen.
	 */
	function startSplashscreen() {
		var splashscreenDiv = document.createElement("div");
		splashscreenDiv.id = "splashscreenDiv";
		splashscreenDiv.align = "center";
		splashscreenDiv.style.display = "inline";
		splashscreenDiv.style.padding = "5px";
		splashscreenDiv.style.backgroundColor = "#445";
		splashscreenDiv.style.border = "solid 2px";
		splashscreenDiv.style.borderColor = "#aaa";
		splashscreenDiv.style.position = "fixed";
		splashscreenDiv.style.top = "50.0%";
		splashscreenDiv.style.left = "50.0%";
		splashscreenDiv.style.zIndex = "1000";
		splashscreenDiv.innerHTML = '<span style="color:white; font-size: 150%;">Loading...</span>'
			+ '<br/>'
			+ '<img src="https://images.wikia.nocookie.net/gamecloud/images/4/42/Loading.gif"/>';
		document.getElementsByTagName('body')[0].appendChild(splashscreenDiv);
	}
	
	/**
	 * Hide the splashscreen.
	 */
	function stopSplashscreen() {
		if (skin == "oasis") {
			gameMarkup = document.getElementById("WikiaArticle");
		} else if (skin == "wikiamobile") {
			gameMarkup = document.getElementById("wkPage");
		} else {
			gameMarkup = document.getElementById("bodyContent");
		}
			
		gameMarkup.style.visibility = "visible";
		document.getElementById("splashscreenDiv").style.display = "none";
	}

	var gameMarkup = null;
	var sourceData = null;
	var isLoaded = false;

	var startInitialization = function() {
		
		if (!isLoaded) {
			isLoaded = true;
			
			executeOnAllPages();
			startSplashscreen();
			
			if (skin == "oasis") {
				gameMarkup = document.getElementById("WikiaArticle");
			} else if (skin == "wikiamobile") {
				gameMarkup = document.getElementById("wkPage");
			} else {
				gameMarkup = document.getElementById("bodyContent");
			}
			
			if ((typeof(wgCurRevisionId) == 'undefined') || (wgCurRevisionId != 0)) {
				/*
				 * The page already exists.
				 */
				sourceData = gameMarkup.getElementsByTagName("p")[0];
			} else {
				/*
				 * The page doesn't exist yet.
				 */
				sourceData = gameMarkup.getElementsByClassName("noarticletext")[0];
				sourceData.className = "";
				sourceData.tagName = "p";
				sourceData.innerHTML = ""
+ "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n"
+ "x.................................................................................x\n"
+ "x....i............................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.................................................................................x\n"
+ "x.....................x...........................................................x\n"
+ "x.....................x............................b.............................ox\n"
+ "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";
			}
	
			/*
			 * Important scripts.
			 */
			importScript("MediaWiki:GamePlayer.js", "onScriptLoad()");
			importScript("MediaWiki:GameEditor.js", "onScriptLoad()");
			importScript("MediaWiki:GameCloud.js", "onScriptLoad()");
	
			/*
			 * Additionnal scripts.
			 */
			importScript("MediaWiki:WikiaRating.js", "");
		}
	}
	if (document.readyState == "complete") {
		startInitialization();
	} else {
		window.onload = startInitialization;
	}
} else {
	window.onload = function() {
		executeOnAllPages();
	}
}
} else {
	window.onload = function() {
		executeOnAllPages();
	}
}
} else {
	window.onload = function() {
		executeOnAllPages();
	}
}
} else {
	window.onload = function() {
		executeOnAllPages();
	}
}