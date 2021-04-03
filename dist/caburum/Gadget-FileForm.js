(function() {
	// Variables
	var page = mw.config.get('wgCanonicalSpecialPageName'),
	file = {
		description: '',
		type: '',
		source: '',
		author: '',
		license: ''
	};

	// Only run on Upload page
	if (page != 'Upload') { return; }

	// Disable original form fields
	$('.mw-special-Upload tr.mw-htmlform-field-Licenses').css('display', 'none');
	$('.mw-special-Upload tr.mw-htmlform-field-HTMLTextAreaField').css('display', 'none');

	// Create new form fields
	var $formDescription = $(`<tr class="fileform-description">
		<td class="mw-label"><label for="fileform-description">File description:</label></td>
		<td class="mw-input"><textarea name="fileform-description" id="fileform-description" cols="80" rows="2" placeholder="Please enter a brief description of the file"></textarea></td>
	</tr>`);
	var $formType = $(`<tr class="fileform-type">
		<td class="mw-label"><label for="fileform-type">File type:</label></td>
		<td><select name="fileform-type" id="fileform-type">
			<option value="Screenshot">Screenshot: for screenshots from the game itself</option>
			<option value="Announcement">Announcement: for screenshots of in-game announcements</option>
			<option value="Concept Art">Concept Art: for concept artwork</option>
			<option value="Promotional">Promotional: for promotional artwork</option>
			<option value="Developer">Developer: for pictures of Innersloth developers</option>
			<option value="Hat">Hat: for hats that players can customize their character with</option>
			<option value="Pet">Pet: for pets that players can customize their character with</option>
			<option value="Skin">Skin: for skins that players can customize their character with</option>
			<option value="Color">Color: for colors that players can select from</option>
			<option value="Audio">Audio: for audio files</option>
			<option value="Video">Video: for video files</option>
			<option value="Game Asset">Game Asset: for assets (mainly images) extracted from the game files that don't belong in a different category</option>
			<option value="Merchandise">Merchandise: for merchandise that can be/could have been bought in the Innersloth Merchandise Store</option>
		</select></td>
	</tr>`);
	var $formSource = $(`<tr class="fileform-source">
		<td class="mw-label"><label for="fileform-source">File source:</label></td>
		<td class="mw-input"><input name="fileform-source" id="fileform-source" size="80" value="[[Among Us]]"></input></td>
	</tr>`);
	var $formAuthor = $(`<tr class="fileform-author">
		<td class="mw-label"><label for="fileform-author">File author:</label></td>
		<td class="mw-input"><input name="fileform-author" id="fileform-author" size="80" value="[[Innersloth]]"></input></td>
	</tr>`);
	var $formLicense = $('.mw-htmlform-field-Licenses').css('display', '').addClass('fileform-license');

	var $form = $formDescription.add($formType).add($formSource).add($formAuthor).add($formLicense);

	// Insert new form fields into old form
	$('.mw-special-Upload #mw-htmlform-description > tbody').append($form);
	
	// Events to update summary
	$('#fileform-type').change(updateSummary());
	$('#fileform-type').change(updateSummary());
	$('#fileform-source').change(updateSummary());
	$('#fileform-author').change(updateSummary());
	$('#wpLicense').change(updateSummary());

	// Update summary
	function updateSummary() {
		// Populate summary
		file = $.extend({}, file, {
			description: $.trim($('#fileform-description').val()),
			type: $('#fileform-type').val(),
			source: $('#fileform-source').val(),
			author: $('#fileform-author').val(),
			license: $('#wpLicense').val()
		});

		// Generate summary
		description = `{{File\n|description = ${file.description}\n|type = ${file.type}\n|source = ${file.source}\n|author = ${file.author}\n|license = ${file.license}\n}}`

		// Set summary
		$('#wpUploadDescription').val(description);
	};
})();