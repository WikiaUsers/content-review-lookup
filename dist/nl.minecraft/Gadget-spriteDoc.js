/** 
 * @title SpriteDoc
 * @version 1.1.0
 * @author DarkShadowTNT
 * @license CC-BY-SA-4.0
 * 
 * @dependencies mediawiki.api, mediawiki.notify, mediawiki.notification
 *				 mediawiki.util
 */
'use-strict';

/** Set some variables first, to ensure the script will work as intended.    **/

var i18n = {
	/**
	 * loadsprite 'element'. Example: <loadsprite sprite="{{{1}}}"/>, where:
	 * 
	 * @key loadspriteElement - corresponds to 'loadsprite' in example.
	 * @key loadspriteSpriteAttribute - corresponds to 'sprite' in example.
	 */
	loadspriteElement: 'loadsprite',
	loadspriteSpriteAttribute: 'sprite',
	
	/**
	 * Sprite module. This is the main module where sprite data is loaded.
	 * 
	 * @key spriteModule - corresponds to the name of the sprite module.
	 * @key spriteModuleGetRawSpriteDataFunction - corresponds to the name of
	 *					the function which loads the raw sprite data from the
	 *					module.
	 * @key spriteSuffix - Default suffix for the spritesheet image.
	 */
	spriteModule: 'sprite',
	spriteModuleGetRawSpriteDataFunction: 'getRawSpriteData',
	spriteSuffix: 'CSS.png',
	
	/**
	 * FileUrl template.
	 * @key fileUrlTemplate - name of the FileUrl template.
	 */
	fileUrlTemplate: 'FileUrl',
	 
	 /**
	  * Error messages to show when things go wrong.
	  * 
	  * @key warning - Title of all warning notification.
	  * @key loadingSpriteDataFailed - Warning message to show when sprite data
	  * 							   could not be loaded.
	  * @key loadingSpriteImageFailed - Warning message to show when the sprite
	  * 							    sheet could not be loaded.
	  */
	 warning: 'Waarschuwing',
	 loadingSpriteDataFailed: 'Spritedata kon niet geladen worden.',
	 loadingSpriteImageFailed: 'Spritesheet kon niet geladen worden.',
	 
	 /**
	  * i18n for the table of contents.
	  * 
	  * @key TOCText - Title of the table of contents.
	  */
	 TOCText: 'Inhoud',
};

var spritedocElement = document.getElementById('spritedoc');

var sprites = [];

var spriteDataIds; // This variable will contain all sprite data
var spriteDataSections;
var spriteDataSettings;

var spritesheetUrl;

var currentTimestamp = Date.now();

// These variables are for the sprite editor to not load too soon
var lastSection;
var lastBox;

// Sprite defaults. Values will be overridden with values from the settings object in the API call.
var spriteDefaults = {
	scale: 1,
	sheetsize: 256,
	size: 16,
	pos: 1,
	align: 'text-top',
};

/** Actual spritedoc loading implementation starts here                      **/

/**
 * Determine if there are any sprites to load.
 */
$(document).ready( function() {
	if (loadspriteCount() !== 0) {
		getSpriteNames();
		
		for (var i = 0; i < sprites.length; i++) {
			renderSpriteDoc(sprites[i]);
		}
	}
});

/**
 * Check if there is a loadsprite element
 */
function loadspriteCount() {
	return $(i18n.loadspriteElement).get().length;
}

/**
 * This function gets the sprite names to load based on the value of loadsprite
 * element's sprite attribute.
 */
function getSpriteNames() {
	var loadspriteElements = $(i18n.loadspriteElement).get();
	
	for (var i = 0; i < loadspriteCount(); i++) {
		sprites.push(loadspriteElements[i].getAttribute(i18n.loadspriteSpriteAttribute));
	}
}

/**
 * This function is responsible for rendering the spritedoc.
 * 
 * @param sprite - sprite to load.
 */
function renderSpriteDoc(sprite) {
	var spriteModule = "{{#invoke\:" + i18n.spriteModule + "|" + i18n.spriteModuleGetRawSpriteDataFunction + "|" + sprite + "}}"; // Colon is escaped here to prevent a redlink from showing up in some category. This won't affect the script itself.
	
	$.ajax({
		type: 'GET',
		url: mw.util.wikiScript('api'),
		data: {
			action: 'expandtemplates',
			prop: 'wikitext',
			format: 'json',
			text: spriteModule,
		},
		dataType: 'json',
		success: function(response) {
			// We want to use the actual sprite data here, stored in
			// expandtemplates.wikitext
			var spriteData = response.expandtemplates.wikitext;
			
			// Strip trailing zero which gets added after parsing the wikitext.
			//  Incase it gets fixed, check if it's trailing.
			//
			// The trailing zero is intentionally checked greedily, as testing
			// proved it is *nor* a string *nor* a number
			if (spriteData.charAt(-1) == 0) {
				spriteData = spriteData.slice(0, -1);
			}
			
			// Convert sprite data to an object
			spriteData = JSON.parse(spriteData);
			
			// Create separate variable for ids, sorted alphabetically. Also
			// convert it to an array with objects
			spriteDataIds = sortKeys(spriteData.ids);
			spriteDataIds = convertObjectToArrayAndRetainKeys(spriteDataIds);
			spriteDataSections = spriteData.sections;
			spriteDataSettings = spriteData.settings;
			
			// The first function gets the URL of the spritesheet, which is
			// needed to actually render the sprites of the spritedoc.
			//
			// The second and third functions generate the spritedoc content and
			// table of contents, respectively.
			getSpritesheetUrl();
			createSpriteDocSections();
			generateTOC();
			
			$(i18n.loadspriteElement).remove();
			
			// This function checks if the spritedoc has fully loaded using the
			// variables lastSection and lastBox. They represent the last
			// section loaded and the last box of a section, respectively. If
			// both variables are true, it proceeds loading the sprite editor.
			// Else it waits 100ms before trying again.
			(function checkIfLoaded() {
				if (lastSection === true && lastBox === true) {
					spriteEditLoader();
				} else {
					setTimeout(checkIfLoaded, 100);
				}
			})();
			
		},
		error: function() {
			return mw.notify(loadingSpriteDataFailed, {autoHide: false, title: warning});
		}
	});
}

/**
 * This function is responsible for creating the sections where all images will
 * sit.
 */
function createSpriteDocSections() {
	// Wait until the variable spritesheetUrl is set. This is because we need
	// the URL to continue, else we'll end up with an invalid one and no
	// sprites.
	if (spritesheetUrl || spritesheetUrl === false) {
		for (var i = 0; i < spriteDataSections.length; i++) {
			var spriteSectionName = spriteDataSections[i].name;
			var spriteSectionId = spriteDataSections[i].id;
			
			var spriteSectionBox = createSpriteDocBoxes(spriteSectionId);
			
			var spritedocHeader = "<h3><span id='" + spriteSectionName.replace(/ /g, "_") + "' class='mw-headline'>" + spriteSectionName + "</span></h3>";
			var spritedocSection = "<div class='spritedoc-section' id='spritedocsection" + spriteSectionId + "' data-section-id='" + spriteSectionId + "'>" + spritedocHeader + spriteSectionBox + "</div>";
			
			$('#spritedoc').append(spritedocSection);
			
			if (i + 1 === spriteDataSections.length) {
				lastSection = true;
			} else {
				lastSection = false;
			}
		}
	} else {
		setTimeout(createSpriteDocSections, 100);
	}
}

/**
 * This function is responsible for creating the content (= boxes with in there
 * the sprite names) of the page.
 * 
 * @param spriteSectionId - In what section the sprites should be put,
 *							identified by a section id.
 */
function createSpriteDocBoxes(spriteSectionId) {
	var spriteDocBox = "<ul class='spritedoc-boxes'>";
	
	// Filter the sprites for the section we want
	var spritesFilteredOnSection = filterArrayWithObjects(spriteDataIds, "section", spriteSectionId);
	
	// Filter on sprite position
	var spritesFilteredOnPos = removeDuplicatesOfArrayWithObjects(spritesFilteredOnSection, "pos");
	
	spriteDocBox += createSpriteDocBoxContent(spritesFilteredOnSection, spritesFilteredOnPos);
	spriteDocBox += "</ul>";
	
	return spriteDocBox;
}

/**
 * This function lists the names of the sprites based on their pos key.
 * 
 * @param sprites - Array of sprites, unfiltered
 * @param uniqueSprites - Array of unique sprites (= without duplicate
 *						  positions, for example)
 */
function createSpriteDocBoxContent(sprites, uniqueSprites) {
	var spriteDocContent = ""; // empty string is needed to prevent 'undefined' from appearing everywhere
	
	for (var i = 0; i < uniqueSprites.length; i++) {
		var uniqueSpritePosition = uniqueSprites[i].pos;
		var filteredSpritesOnPos = filterArrayWithObjects(sprites, "pos", uniqueSpritePosition);
		
		spriteDocContent += "<li class='spritedoc-box' data-pos='" + uniqueSpritePosition + "'>";
		spriteDocContent += getSpriteFromSheet(uniqueSpritePosition);
		spriteDocContent += "<ul class='spritedoc-names'>";
		
		for (j = 0; j < filteredSpritesOnPos.length; j++) {
			spriteDocContent += "<li class='spritedoc-name'>"
				+ "<code" + (filteredSpritesOnPos[j].deprecated ? " class='spritedoc-deprecated'" : "") + ">" + filteredSpritesOnPos[j].name + "</code>"
				+ "</li>";
		}
		
		spriteDocContent += "</ul></li>";
		
		if (i + 1 === uniqueSprites.length) {
			lastBox = true;
		} else {
			lastBox = false;
		}
	}
	
	return spriteDocContent;
}

/**
 * This function creates the sprite images and needed HTML elements.
 * 
 * @param spritePos - sprite position of the wanted sprite.
 */
function getSpriteFromSheet(spritePos) {
	var backgroundImage = "background-image:url(" + (spritesheetUrl + "&version=" + currentTimestamp) + ");";
	var calculatedSpritePosition = calculateSpritePositionOnSheet(spritePos);
	var sprite = "<div class='spritedoc-image'>"
		+ "<span class='sprite " + spriteDataSettings.name.toLowerCase() + "-sprite' style='" + backgroundImage + calculatedSpritePosition + "'>"
		+ "<br>"
		+ "</span>"
		+ "</div>";
	
	return sprite;
}

/**
 * This function generates a table of contents above the sprite boxes.
 * 
 * Internally, the function uses the global variable spriteDataSections to get
 * the names of the sections and generates the table of contents based upon
 * that.
 */
function generateTOC() {
	var language = mw.config.get('wgUserLanguage');
	var TOCText = i18n.TOCText;
	
	var toc = "<div id='spritetoc' class='toc' style='float:right'>"
		+ "<input id='spritetoctogglecheckbox' class='toctogglecheckbox' type='checkbox' role='button' style='display:none'>"
		+ "<div class='toctitle' lang='" + language + "'>"
		+ "<h2>" + TOCText + "</h2>"
		+ "<span class='toctogglespan'>"
		+ "<label class='toctogglelabel' for='spritetoctogglecheckbox'></label>"
		+ "</span>"
		+ "</div>"
		+ "<ul>";
	
	for (var i = 0; i < spriteDataSections.length; i++) {
		var spriteSectionName = spriteDataSections[i].name;
		
		toc += "<li class='toclevel-1 tocsection-" + (i + 1) + "'>\xA0"
			+ "<a href='#" + spriteSectionName.replace(/ /g, "_") + "'>"
			+ "<span class='tocnumber'>" + (i + 1) + "</span>"
			+ "<span class='toctext'>" + spriteSectionName + "</span>"
			+ "</a>"
			+ "</li>";
	}
	
	toc += "</ul>"
		+ "</div>";
	
	$('#spritedoc').prepend(toc);
}

/** Sprite editor loading implementation starts here.                        **/
/** @author Majr                                                             **/

/**
 * Add an edit button which loads the sprite editor
 *
 * If spriteaction=edit is in the URL, the editor will be loaded
 * immediately, otherwise it will wait for the button to be clicked.
 */
function spriteEditLoader() {
	var editPage = $('#sprite-editor-message').data('page') || null;
	
	if (!$('#spritedoc').length && !editPage) {
		
		return;
	}
	
	var $editTab = $('#ca-edit');
	
	if (!$editTab.length) {
		$editTab = $('#ca-viewsource');
	}
	
	var $spriteEditLink = $('<a>').text('Sprite bewerken').attr('href',
		mw.util.getUrl(editPage, {spriteaction: 'edit'})
	);
	
	var $spriteEditTab = $('<li>').attr('id', 'ca-spriteedit').append(
		$('<span>').append($spriteEditLink)
	);
	
	$spriteEditTab.insertAfter($editTab);
	
	// Page to sprite edit is not here, so no need to bind events
	if (editPage) {
		return;
	}
	
	var loadSpriteEditor = function() {
		$spriteEditTab.add('#ca-view').toggleClass('selected');
		
		return mw.loader.using('ext.gadget.spriteEdit');
	};
	
	if ( location.search.match('[?&]spriteaction=edit') ) {
		loadSpriteEditor();
		
		return;
	}
	
	var $win = $(window);
	
	$spriteEditLink.one('click.spriteEditLoader', function(e) {
		// Initially add the history so it is not delayed waiting
		// for the editor to load. The editor will handle it from now.
		history.pushState({}, '', this.href);
		
		loadSpriteEditor().then(function() {
			$win.off('.spriteEditLoader');
		});
		
		e.preventDefault();
	});
	
	// If the page is reloaded while the editor isn't loaded, navigating
	// back to the editor won't work, so an initial navigation check is
	// necessary to load the editor, where it will then monitor navigation
	$win.on('popstate.spriteEditLoader', function() {
		if (
			location.search.match('[?&]spriteaction=edit') &&
			!$('html').hasClass('spriteedit-loaded')
		) {
			loadSpriteEditor().then( function() {
				$win.off('.spriteEditLoader');
			});
		}
	});
}

/** Helper functions                                                         **/

/**
 * This function sorts an object based on what it's passed.
 * 
 * @param unsortedKeys - object with unsorted keys.
 */
function sortKeys(unsortedKeys) {
	var orderedKeys = {};
	
	Object.keys(unsortedKeys).sort().forEach(function(key) {
		orderedKeys[key] = unsortedKeys[key];
	});
	
	return orderedKeys;
}

/**
 * This function converts an object into an array, while retaining all keys as
 * well. In this case, the key is repositioned in the object and named 'name'.
 * 
 * @param convertableObject - Object to convert to an array.
 */
function convertObjectToArrayAndRetainKeys(convertableObject) {
	var convertedArray = [];
	
	for (var key in convertableObject) {
		convertedArray.push(Object.assign(convertableObject[key], {name: key}));
	}
	
	return convertedArray;
}

/**
 * This function filters an array with objects, based on what it's given.
 * 
 * @param unfilteredArray - the unfiltered array.
 * @param filterOn - string of the key of the object it needs to filter on.
 * @param valueToFilterOn - requested value where it needs to filter on
 */
function filterArrayWithObjects(unfilteredArray, filterOn, valueToFilterOn) {
	var filteredArray = unfilteredArray.filter(function(element) {
		return element[filterOn] === valueToFilterOn;
	});
	
	return filteredArray;
}

/**
 * This function removes duplicates of an array with objects, based on what is
 * passed to it.
 * 
 * @param arrayWithDuplicates - array with objects with (possible) duplicate
 *								values.
 * @param filterOn - string of the key of the object where it needs to filter
 *					 on.
 */
function removeDuplicatesOfArrayWithObjects(arrayWithDuplicates, filterOn) {
	var distinct = [];
	
	/* NOTE: There ought to be a better way to do this, but for now it's fine. */
	for (var i = 0; i < arrayWithDuplicates.length; i++) {
		var duplicate;
		
		// Check if the to be filtered value is already in the distinct array
		for (var j = 0; j < distinct.length; j++) {
			if (arrayWithDuplicates[i][filterOn] === distinct[j][filterOn]) {
				// if it is, set duplicate to true and break the for loop
				duplicate = true;
				
				break;
			} else {
				// else set this on false
				duplicate = false;
			}
		}
		
		// if it isn't a duplicate, add it to the distinct array
		if (!duplicate) {
			distinct.push(arrayWithDuplicates[i]);
		}
	}
	
	return distinct;
}

/**
 * This function gets the image of the sprite based on the
 * spriteDataSettings.image key value. It depends on the FileUrl template, with
 * as name i18n.fileUrlTemplate and as single argument the requested image.
 */
function getSpritesheetUrl() {
	var image = spriteDataSettings.image ? spriteDataSettings.image : (spriteDataSettings.name + i18n.spriteSuffix );
	var fileUrlText = "\{\{" + i18n.fileUrlTemplate + "|" + image + "\}\}"; // The curly brackets are escaped to prevent a redlink from appearing
	
	$.ajax({
		type: 'GET',
		url: mw.util.wikiScript('api'),
		data: {
			action: 'parse',
			prop: 'text',
			format: 'json',
			text: fileUrlText,
			contentmodel: 'wikitext',
			disablelimitreport: true,
		},
		dataType: 'json',
		success: function(response) {
			var spritesheetUrlArray = response.parse.text["*"].match(/url\((.*?)\)/);
			
			return spritesheetUrl = spritesheetUrlArray[1];
		},
		error: function() {
			mw.notify(loadingSpriteImageFailed, {autoHide: false, title: warning});
			
			return spritesheetUrl = false;
		}
	});
}

/**
 * This function calculates the X and Y of the sprite on the spritesheet, based
 * on the sprite position it's given. This function is based upon the p.base
 * function in the sprite module, minus additional functionality like built-in
 * link support and the like.
 * 
 * @param spritePos - the sprite's position on the sheet.
 */
function calculateSpritePositionOnSheet(spritePos) {
	var pos;
	var size = spriteDataSettings.size ? spriteDataSettings.size : spriteDefaults.size;
	var sheetWidth = spriteDataSettings.sheetsize ? spriteDataSettings.sheetsize : spriteDefaults.sheetsize;
	var tiles = sheetWidth / size;
	var scale = spriteDataSettings.scale ? spriteDataSettings.scale : spriteDefaults.scale;
	var autoScale = spriteDataSettings.autoscale ? spriteDataSettings.autoscale : spriteDefaults.autoscale;
	
	var spritePositionAndCSS;
	
	if (spritePos) {
		pos = spritePos - 1;
	} else if (spriteDataSettings.pos) {
		pos = spriteDataSettings.pos - 1;
	} else {
		pos = spriteDefaults.pos - 1;
	}
	
	var left = pos % tiles * size * scale;
	var top = Math.floor(pos / tiles) * size * scale;
	
	spritePositionAndCSS = "background-position:-" + left + "px -" + top + "px;";
	
	if (autoScale && scale !== spriteDefaults.scale) {
		spritePositionAndCSS += "background-size:" + (sheetWidth * scale) + "px auto;";
	}
	
	if (size !== spriteDefaults.size || (autoScale && scale !== spriteDefaults.scale)) {
		spritePositionAndCSS += "height:" + (size * scale) + "px;";
		spritePositionAndCSS += "width:" + (size * scale) + "px;";
	}
	
	return spritePositionAndCSS;
}