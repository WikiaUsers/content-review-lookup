// --------------------------------------------------
// Upload Validation
// Includes:
//   Force lowercase file extensions - This ensures uploaded files have their extension in lowercase
//   Make the Source required
//   Add a space before Desc and Source for after the equals signs in the output template (temp)
// --------------------------------------------------

function upload_validation() {
	
	$('#mw-upload-form').on('submit', function(){
		
		//Add space preceding text in Desc and Source
		$('#mw-input-source, #wpUploadDescription').each(function() {
			var valFirstChar = $(this).val().charAt(0);
			if (valFirstChar !== '' && valFirstChar !== ' ')
				$(this).val( ' ' + $(this).val() );
		});
		
		//Make file extension lowercase
		var fileName = $('#wpDestFile').val()
		  , ext = fileName.substring(fileName.lastIndexOf('.')+1).toLowerCase();
		$('#wpDestFile').val( fileName.slice(0, -1*ext.length) + ext );
		
	});
	
	//Add the html5 'required' property and 'pattern' attribute to the Source field on Special:Upload
	$('#mw-input-source').prop('required', true).attr('pattern', '.*\\S.*');
	//Add helpful links to Guidelines:Files
	$('label[for=mw-input-source]').html('Source (<a href="/Guidelines:Files#Sourcing" target="_blank" title="Guidelines:Files">help</a>)');
	$('label[for=mw-input-subject]').html('Subject (<a href="/Guidelines:Files#Subject" target="_blank" title="Guidelines:Files">help</a>)');
	
}
if ( mw.config.get('wgPageName') === 'Special:Upload' ) {
	$( upload_validation() );
}