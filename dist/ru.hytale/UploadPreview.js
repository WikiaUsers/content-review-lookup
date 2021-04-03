/*
  Preview button for file uploads. Adapted from http://commons.wikimedia.org/wiki/MediaWiki:UploadForm.js by Lupo, March 2008. 
  Adaptation by http://rationalwiki.org/wiki/User:Nx
  Source: http://rationalwiki.org/wiki/MediaWiki:UploadPreview.js
  Modified for compatibility with Zelda Wiki's FileInfo template.
  Modified according to https://www.mediawiki.org/wiki/ResourceLoader/Legacy_JavaScript
  License: GPL
*/

if (typeof(UploadForm) === 'undefined') { //START - Check that UploadForm is not already defined
	
var UploadForm = {
	
	isInstalled : false,
	isReupload  : false,
	formElement : null,
	
	install : function() { //Install
		
		//Don't install in the obvious cases
		var dontInstall =
			   mw.config.get('wgPageName') !== 'Special:Upload'
			|| document.URL.indexOf('uploadpreview=disabled') > -1
			|| UploadForm.isInstalled;
		if (dontInstall) return; // Stop if shouldn't install
		
		//Don't install if missing page elements
		var form    = document.getElementById('mw-upload-form')
		  , summary = document.getElementById('wpUploadDescription');
		if (!form || !summary) return; // Stop if no form nor summary elements
		
		//Check if reupload
		var reupload = document.getElementById('wpForReUpload'); //A hidden element for a reupload (that has value 1?)
		UploadForm.isReupload = ( reupload || document.URL.indexOf('wpForReUpload=1') > -1 );
		
		UploadForm.formElement = form;
		
		if (!UploadForm.isReupload) UploadForm.addPreviewButton();
		
		UploadForm.isInstalled = true;
		
	},
	
	preview : function(e) { //Generate then preview the file page content
		
		wgUploadWarningObj.checkNow($('#wpDestFile').val()); //Check manually in case the user clicks preview right after changing the filename
		
		if ( UploadForm.isOverwrite() ) {
			
			UploadForm.showPreview(
				'<div style="border:1px solid red; padding:0.5em;">' +
					'<div class="error">' +
						'You will upload over an already existing file.' +
						'If you proceed, the information in this form will not appear on the description page.' +
					'</div>' +
				'</div>'
			);
			
		} else {
			
			var summaryText   = document.getElementById('wpUploadDescription').value
			  , sourceText    = document.getElementById('mw-input-source').value
			  , licensingText = $('#mw-input-licensing').val()
			  , typeText      = $('#mw-input-type').val()
			  , gameText      = $('#mw-input-game').val()
			  , text =
				'<div class="previewnote">\n' +
					'<h2 id="mw-previewheader">Preview</h2>\n' +
					'<div class="previewnote">\n' +
						'{{int:previewnote}}\n' +
						'<hr>\n' +
					'</div>\n' +
				'</div>\n' +
				'{{FileInfo' +
				'|summary='   + summaryText +
				'|type='      + typeText +
				'|source='    + sourceText +
				'|game='      + gameText +
				'|licensing=' + licensingText +
				'}}';
			
			//Make the Ajax call
			var destFilename = document.getElementById('wpDestFile')
			  , destFilenameText = '';
			if (destFilename) destFilenameText = destFilename.value;
			
			$('#wpUploadPreview').injectSpinner('wpUploadPreviewSpinner'); //#wpUploadPreview is the id of the upload preview button
			
			(new mw.Api()).get({ //Does this not cache by default?
				action: 'parse',
				text: text,
				title: ( destFilenameText ? 'File:' + destFilenameText : '' ),
				prop: 'text|categories'
			}).done(function(data){
				var parsedText = data.parse.text['*']
				  , categories = data.parse.categories;
				console.log(parsedText);
				console.log(categories);
				parsedText += UploadForm.makeCatBar(categories);
				UploadForm.showPreview(parsedText);
			}).always(function(){
				$.removeSpinner('wpUploadPreviewSpinner');
			});
			
		}
		
		return true; //For the preview button's onclick?
		
	},
	
	makeCatBar : function( categories ) { //html for a mock-up of a category bar
		
		var catBar = '';
		
		if (categories.length > 0) {
			
			//Sort the categories first
			categories.sort(function(a, b){
				var key_a = a['*'].toLowerCase()
				  , key_b = b['*'].toLowerCase();
				if (key_a < key_b) return -1;
				if (key_a > key_b) return  1;
				return 0;
			});
			
			//Make the category bar
			catBar =
				'<div id="catlinks" class="catlinks">' +
					'<div id="mw-normal-catlinks" class="mw-normal-catlinks">' +
						'<a href="/Special:Categories" title="Special:Categories">Categories</a>: <ul>';
			
			for (var i = 0; i < categories.length; i++) {
				var catName = categories[i]['*'].replace(/_/g, ' ')
				  , catNameEncoded = encodeURIComponent(categories[i]['*'].replace(/ /g, '_'));
				catBar += '<li><a href="/Category:' + catNameEncoded + '" title="Category:' + catNameEncoded + '">' + catName + '</a></li>';
			}
			
			catBar += '</ul></div></div>';
			
		}
		
		return catBar;
		
	},
	
	isOverwrite : function () {
		
		//Is an overwrite if warning says this
		if ( $('#wpDestFile-warning > p').text().startsWith('A file with this name exists') )
			return true;
		
		var filename = $('#wpDestFile').val();
		
		//Not an overwrite if no filename given
		if ( !filename )
			return false; //No filename entered
		
		//Is an overwrite (backup method) if image shown in warning box has same name
		sentenceCasedFilename = filename.substr(0,1).toUpperCase()+filename.substr(1);
		if ( $('#wpDestFile-warning img').attr('alt') === sentenceCasedFilename )
			return true;
		
		//Not an overwrite
		return false;
		
	},
	
	showPreview : function(content) {
		
		var preview = document.getElementById('wpUploadPreviewDisplay'); //null if not created yet
		if (preview === null) { //Create preview container if not created
			form = UploadForm.formElement;
			preview = document.createElement('div');
			preview.id = 'wpUploadPreviewDisplay';
			
			form.parentNode.insertBefore(preview, form); //Insert preview before the form
		}
		try {
			preview.innerHTML = content;
		} catch(e) {
			preview.innerHTML = '<div class="error">Error. Could not insert preview.</div>';
		}
		
		preview.scrollIntoView();
		
	},
	
	addPreviewButton : function() {
		
		var uploadButton = document.getElementsByName('wpUpload')[0];
		
		if (uploadButton === null) return; // Stop if can't find the upload button
		
		var previewButton = document.createElement('input');
		previewButton.id        = 'wpUploadPreview';
		previewButton.name      = 'wpUploadPreview';
		previewButton.type      = 'button';
		previewButton.accessKey = 'p';
		previewButton.value     = 'Предпросмотр';
		previewButton.title     = 'Предварительный просмотр внесённых изменений. Пожалуйста, используйте его перед сохранением! ['+previewButton.accessKey+']';
		previewButton.style     = 'margin-left: 0.5em;';
		previewButton.onclick   = UploadForm.preview;
		mw.loader.using('jquery.accessKeyLabel').then(function(){
			$(previewButton).updateTooltipAccessKeys();
		});
		uploadButton.parentNode.insertBefore(previewButton, uploadButton.nextSibling);
		
	},
	
};

} //END - Check that UploadForm is not already defined

$(document).ready( UploadForm.install() );