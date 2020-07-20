/*
**@name		File Upload Form
**@description	Reformats the Special:Upload page to ensure correct labelling and licensing of uploaded files.
**@author	T3CHNOCIDE
**		- Link complete and upload warnings taken from UltimateSupreme
**		- http://naruto.wikia.com/wiki/MediaWiki:Common.js/FairUseUpload.js
**@description	Reformats the Special:Upload page to ensure correct labelling the licensing of uploaded files.
**@license	CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
*/

if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
	//Null variables
	sourceValue = ''
	
	//Sets content and maintenance buttons to toggle between image subjects
	function toggleContent() {
		$('#subjectDiv').html(subjectContent)
		$("input").change(function(){
			typeSelected()
			updateCategories()
			updateForm()
		});
		$("input").tooltip();
	}
	
	function toggleMaintenance() {
		$('#subjectDiv').html(subjectMaintenance)
		$("input").change(function(){
			typeSelected()
			updateCategories()
			updateForm()
		});
		$("input").tooltip();
	}
	
	//Changes source input selection
	function toggleSource() {
		if ($('#sourceField').val() == 'Website') {
			$('#sourceDiv').html(sourceWebsite)
		} else if ($('#sourceField').val() == 'Game') {
			$('#sourceDiv').html(sourceGame)
		} else if ($('#sourceField').val() == 'Book') {
			$('#sourceDiv').html(sourceBook)
		} else if ($('#sourceField').val() == 'Other') {
			$('#sourceDiv').html(sourceOther)
		} else {
			$('#sourceDiv').html('')
		}
	}
	
	//Sets image source value in output box	
	function updateSource() {
		if ($('#sourceField').val() == 'Website') {
			sourceValue = $('#websiteURL').val()
		} else if ($('#sourceField').val() == 'Game') {
			sourceValue = $('#gameTitle').val() + ' - ' + $('#gameMission').val()
		} else if ($('#sourceField').val() == 'Book') {
			sourceValue = $('#bookTitle').val() + ' - ' + $('#bookPage').val()
		} else if ($('#sourceField').val() == 'Other') {
			sourceValue = $('#otherDescription').val()
		} else if ($('#sourceField').val() == 'None') {
			sourceValue = ''
		}
	}
	
	//Adds and removes image type to category list
	var typeCategory = '';

	function typeSelected() {
		if ($('#typeField').val() != "None") {
		typeCategory = '\n[[Category:' + $('#typeField').val() + ']]'
		} else {
		typeCategory = '';
		}
	}
	
	//Adds and removes image subjects to category list
	var subjectCategories = [];

	function subjectChecked(checkboxId) {
		if ($(checkboxId).is(':checked')) {
			if(jQuery.inArray('\n[[Category:' + $(checkboxId).val() + ']]', subjectCategories) === -1) {
				subjectCategories.push('\n[[Category:' + $(checkboxId).val() + ']]')
			}
		} else {
			if(jQuery.inArray('\n[[Category:' + $(checkboxId).val() + ']]', subjectCategories) > -1) {
				subjectCategories = $.grep(subjectCategories, function(value) {
				return value != '\n[[Category:' + $(checkboxId).val() + ']]';
				});
			}
		}
	}
	
	function updateCategories(){
		subjectChecked('#playerCheckbox')
		subjectChecked('#vehicleCheckbox')
		subjectChecked('#combatCheckbox')
		subjectChecked('#inhabitantCheckbox')
		subjectChecked('#locationCheckbox')
		subjectChecked('#eventCheckbox')
		subjectChecked('#gameCheckbox')
		subjectChecked('#peopleCheckbox')
		subjectChecked('#announcementCheckbox')
		subjectChecked('#merchandiseCheckbox')
		subjectChecked('#templateCheckbox')
		subjectChecked('#categoryCheckbox')
		subjectChecked('#policyCheckbox')
		subjectChecked('#themeCheckbox')
		subjectChecked('#flagCheckbox')
		subjectChecked('#wikiaCheckbox')
	}
	
	//Moves field changes to input box on change
	function updateForm(){
		inputLayout =
		'{{Image summary\n'
		+ '|type= ' + $('#typeField').val() + '\n'
		+ '|description= ' + $('#descriptionField').val() + '\n'
		+ '|source= \'\'' + sourceValue + '\'\'\n'
		+ '|holder= ' + $('#holderField').val() + '\n'
		+ '|license= {{' + $('#licenseField').val() + '}}\n'
		+ '|variants= \n'
		+ '}}\n'
		+ subjectCategories.toString().replace(/\,/g, '')
		+ typeCategory;
		
		$('#wpUploadDescription').val(inputLayout)
	}
	
	//Toggle page contents box
	function toggleFilePage() {
		if ($('#wpUploadDescription').is(':visible')) {
			$('#wpUploadDescription').hide()
		} else {
			$('#wpUploadDescription').show()
		}
	}
	
	//Sets empty field warnings
	function uploadWarning() {
		if ($('#typeField').val() === 'None') {
			window.alert('Please select the image media type before uploading.');
			return false;
		} else if (!$('#descriptionField').val()) {
			window.alert('Please enter short description of the image before uploading.');
			return false;
		} else if ($('#sourceField').val() === 'None') {
			window.alert('Please select the source of this image before uploading.');
			return false;
		} else if ($('#sourceField').val() === 'Website' && $('#websiteURL').val() === '') {
			window.alert('Please enter the image source web address before uploading.');
			return false;
		} else if ($('#sourceField').val() === 'Game' && $('#gameTitle').val() === '' && $('#gameMission').val() === '') {
			window.alert('Please enter the image source game title and mission before uploading.');
			return false;
		} else if ($('#sourceField').val() === 'Book' && $('#bookTitle').val() === '' && $('#bookPage').val() === '') {
			window.alert('Please enter the image source book title and page(s) before uploading.');
			return false;
		} else if ($('#sourceField').val() === 'Other' && $('#otherDescription').val() === '') {
			window.alert('Please enter a short description of the source of this image before uploading.');
			return false;
		} else if ($('#holderField').val() === '') {
			window.alert('Please enter the image\'s coypright holder before uploading.');
			return false;
		} else if ($('#licenseField').val() === 'None') {
			window.alert('Please select the license underwhich this image was taken before uploading.');
			return false;
		}
		typeSelected()
		updateCategories()
		updateForm()
	}

	//Set form format
	var subjectContent =
		'<table><tr>'
		+ '<td><input id="playerCheckbox" title="Does the image prominantly feature one or more players?" type="checkbox" value="Player Images"> Player(s)</td>'
		+ '<td><input id="vehicleCheckbox" title="Does the image prominantly feature one or more vehicles?" type="checkbox" value="Vehicle Images"> Vehicle(s)</td>'
		+ '<td><input id="combatCheckbox" title="Does the image prominantly feature combat?" type="checkbox" value="Combat Images"> Combat</td>'
		+ '<td><input id="inhabitantCheckbox" title="Does the image prominantly feature one or more non-playable characters?" type="checkbox" value="Inhabitant Images"> Inhabitant(s)</td>'
		+ '<td><input id="locationCheckbox" title="Is the image of a location?" type="checkbox" value="Location Images"> Location(s)</td>'
		+ '</tr><tr>'
		+ '<td><input id="eventCheckbox" title="Is the image of an event?" type="checkbox" value="Event Images"> Event(s)</td>'
		+ '<td><input id="gameCheckbox" title="Is the image of a game interface, engine, or of game design?" type="checkbox" value="Game Images"> Game design</td>'
		+ '<td><input id="peopleCheckbox" title="Does the image prominantly feature real world individuals?" type="checkbox" value="People Images"> People</td>'
		+ '<td><input id="announcementCheckbox" title="Is the image of a Destiny promotion?" type="checkbox" value="Announcement Images"> Promotion</td>'
		+ '<td><input id="merchandiseCheckbox" title="Is the image of Destiny/Bungie merchandise?" type="checkbox" value="Merchandise Images"> Merchandise</td>'
		+ '</tr></table>'
	
	var subjectMaintenance =
		'<table><tr>'
		+ '<td><input id="templateCheckbox" title="Is the image primarily designated for use on a template?" type="checkbox" value="Template Images"> Template</td>'
		+ '<td><input id="categoryCheckbox" title="Is the image primarily designated for use on the category system?" type="checkbox" value="Category images"> Category</td>'
		+ '<td><input id="policyCheckbox" title="Is the image primarily designated for use on a policy page?" type="checkbox" value="Policy Images"> Policy</td>'
		+ '<td><input id="themeCheckbox" title="Is the image going to be part of the wiki theme?" type="checkbox" value="Theme Images"> Theme</td>'
		+ '<td><input id="flagCheckbox" title="Is the image of a country flag?" type="checkbox" value="Flag Images"> Flag</td>'
		+ '</tr><tr>'
		+ '<td><input id="ratingCheckbox" title="Is the image from the game ratings system?" type="checkbox" value="Rating Images"> Rating</td>'
		+ '<td><input id="wikiaCheckbox" title="Was the image created by Wikia for use on the wiki?" type="checkbox" value="Wikia Images"> Wikia</td>'
		+ '</tr></table>'
		
	var sourceNone = ''
	
	var sourceWebsite =
		'<table><tr>'
		+ '<td>URL:</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="55" id="websiteURL" value="http://" title="Enter website URL where this image was taken from."></textarea></td>'
		+ '</tr></table>'
		
	var sourceGame =
		'<table><tr>'
		+ '<td>Title:</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="23" id="gameTitle" title="Enter the title of the game this image was taken from."></textarea></td>'
		+ '<td>Mission:</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="23" id="gameMission" title="Enter the mission/level/quest where the image was seen."></textarea></td>'
		+ '</tr></table>'
		
	var sourceBook =
		'<table><tr>'
		+ '<td>Title:</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="23" id="bookTitle" title="Enter the title of the book/magazine this image was taken from."></textarea></td>'
		+ '<td>Page(s):</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="23" id="bookPage" title="Enter the page(s) where the image was seen; use a hyphon to denote page range (i.e. 1-5)."></textarea></td>'
		+ '</tr></table>'
		
	var sourceOther =
		'<table><tr>'
		+ '<td>Source:</td>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="1" cols="53" id="otherDescription" title="Enter a short description of the source of this image."></textarea></td>'
		+ '</tr></table>'
	
	var formLayout =
		//Type field
		'<tr><td class="mw-label"><label for="#typeField">Type:</label></td><td class="mw-input"><select id="typeField" title="What media type is the image?" style="width:50%; margin-left:5px;">'
		+ '<option value="None">None selected</option>'
		+ '<option value="Screenshots">Screenshot</option>'
		+ '<option value="Animations">Animation</option>'
		+ '<option value="Concept Art">Concept Art</option>'
		+ '<option value="Box Art">Box Art</option>'
		+ '<option value="Logos">Logo</option>'
		+ '<option value="Icons">Icon</option>'
		+ '<option value="Scans">Scan</option>'
		+ '</select></td></tr>'

		//Subject field
		+ '<tr><td class="mw-label"><label for="#subjectField">Subject:</label></td><td class="mw-input">'
		+ '&nbsp;&nbsp;<a class="wikia-button" href="javascript:toggleContent()">Content</a>&nbsp;&nbsp;<a class="wikia-button" href="javascript:toggleMaintenance()">Maintenance</a>'
		+ '<div id="subjectDiv">' + subjectContent + '</div>'
		+ '</td></tr>'
	
		//Description field
		+ '<tr><td class="mw-label"><label for="#descriptionField">Description:</label></td><td class="mw-input"><table><tr>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="2" cols="60" id="descriptionField" title="Enter a short description of the image."></textarea></td>'
		+ '</tr></table></td></tr>'
	
		//Source field
		+ '<tr><td class="mw-label"><label for="#sourceField">Source:</label></td><td class="mw-input"><select id="sourceField" title="What source was this image taken from?" style="width:50%; margin-left:5px;">'
		+ '<option value="None">None selected</option>'
		+ '<option value="Website">Website</option>'
		+ '<option value="Game">Game</option>'
		+ '<option value="Book">Book</option>'
		+ '<option value="Other">Other</option>'
		+ '</select>'
		+ '<div id="sourceDiv">' + sourceNone + '</div>'
		+ '</td></tr>'
	
		//Copyright holder field
		+ '<tr><td class="mw-label"><label for="#holderField">Copyright holder:</label></td><td class="mw-input"><table><tr>'
		+ '<td><textarea class="formTextBox" style="resize:none;" rows="2" cols="60" id="holderField" title="Enter the copyright holder of the image (i.e. Bungie). If there is no holder put \'None\'."></textarea></td>'
		+ '</tr></table></td></tr>'
	
		//License field
		+ '<tr><td class="mw-label"><label for="#licenseField">Licensing:</label></td><td class="mw-input"><select id="licenseField" title="Select the license under which the image was taken." style="width:50%; margin-left:5px;">'
		+ '<option value="None">None selected</option>'
		+ '<option value="Copyright">Copyright</option>'
		+ '<option value="Fair Use">Fair Use</option>'
		+ '<option value="Share Alike">Share Alike</option>'
		+ '<option value="Public Domain">Public Domain</option>'
		+ '<option value="Unknown">Unknown</option>'
		+ '</select></td></tr>';
	
	//Reformat DOM to new form design
	$('.mw-htmlform-field-Licenses,.mw-label:contains("Summary")').remove()
	$('#mw-htmlform-description').append($('.mw-htmlform-field-HTMLTextAreaField'))
	$('#wpUploadDescription').attr("cols", 100).attr("rows", 15)
	$('#wpUploadDescription').parent().attr('colspan', '2')
	$('#wpUploadDescription').hide()
	$('.mw-htmlform-field-HTMLTextAreaField').children().prepend('<div style="text-align:center;"><a class="wikia-button" title="Preview page file mark up code." href="javascript:toggleFilePage()">Page Contents</a></div>')
	$('.mw-htmlform-field-HTMLTextField').after(formLayout)
	
	//Set up tool tips after DOM
	$("select,input,.formTextBox,#wpUploadDescription,.wikia-button").tooltip();
	
	//Updates on drop-down and checkbox change
	$("select,input").change(function () {
		typeSelected()
		updateCategories()
		updateForm()
	}).change();
	
	//Changes source input selection
	$('#sourceField').change(function () {
		toggleSource()
		$("select,input,.formTextBox,#wpUploadDescription").tooltip();
		if ($('#sourceField').val() == 'None') {
			updateSource()
			updateForm()
		}
		$('#websiteURL,#gameTitle,#gameMission,#bookTitle,#bookPage,#otherDescription').on('input', function() {
			updateSource()
			updateForm()
		});
	});

	//Updates on textbox change
	$('.formTextBox').on('input', function() {
		typeSelected()
		updateCategories()
		updateForm()
	});
	
	//Adds auto link complete to textboxes
	$.getScript(
		'/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts', function () {
		dev.minicomplete.load(
			$('#mw-htmlform-description').find('.formTextBox')
		);
	});
	
	//Forces upload warnings if fields are empty
	$('#wpUploadDescription').closest('form').submit(uploadWarning);
}

if (mw.config.get('wgCanonicalSpecialPageName') === 'NewFiles') {
	//Force page change to Special:Upload on upload click
	$('.wikia-button.upphotos').click(function() {
		window.location.href = '/wiki/Special:Upload'
	});
}

if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	//Pre-enters image summary template to multiple upload description box
	multipleLayout =
		'{{Image summary\n'
		+ '|type= \n'
		+ '|description= \n'
		+ '|source= \n'
		+ '|holder= \n'
		+ '|license= \n'
		+ '|variants= \n'
		+ '}}\n'
	
	$('#wpUploadDescription').val(multipleLayout)
	$('.mw-htmlform-field-Licenses').remove()
}