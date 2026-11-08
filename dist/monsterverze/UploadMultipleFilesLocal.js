/* MonsterVerze Upload Multiple Files
 *
 * Local version of dev:UploadMultipleFiles.js
 * Removes the external I18n-js dependency and uses English labels directly.
 */

;(function ($, mw) {
	'use strict';

	var config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'UMFBypassLicenseCheck',
		'wgScriptPath'
	]);

	if (
		window.MonsterVerzeUploadMultipleFilesLoaded ||
		config.wgCanonicalSpecialPageName !== 'Upload'
	) {
		return;
	}

	window.MonsterVerzeUploadMultipleFilesLoaded = true;


	/* ---------------------------------------------------------
	 * LOCAL TEXT
	 *
	 * Keeping these here means we no longer depend on:
	 * dev:MediaWiki:I18n-js/code.js
	 * --------------------------------------------------------- */

	var messages = {
		multiupload: 'Upload multiple files?',
		yes: 'Yes',
		no: 'No',
		sourcefiles: 'Source files:',
		uploadfiles: 'Upload files',
		nofiles: 'Please select at least one file.',
		nolicense: 'Please select a license before uploading.',
		uploading: 'Uploading files…',
		uploaded: 'Uploaded files',
		failed: 'Failed uploads',
		done: 'Upload complete.'
	};


	function msg(key) {
		return messages[key] || key;
	}


	function escapeHtml(value) {
		return $('<div>').text(String(value || '')).html();
	}


	function init() {

		/* Prevent duplicate controls if something causes init twice. */
		if ($('#mv-multiple-files-row').length) {
			return;
		}


		var $regularFile =
			$('#wpUploadFile').closest('tr');


		/*
		 * Some Fandom skins/forms may not use a table row.
		 * Fall back to the file input's nearest form field container.
		 */

		if (!$regularFile.length) {
			$regularFile =
				$('#wpUploadFile').parent().parent();
		}


		if (!$('#wpUploadFile').length) {
			return;
		}


		$regularFile.addClass('regularFileSelect');


		/* -----------------------------------------------------
		 * YES / NO SWITCH
		 * ----------------------------------------------------- */

		var switchHtml =
			'<tr id="mv-multiple-files-row">' +
				'<td class="mw-label">' +
					escapeHtml(msg('multiupload')) +
				'</td>' +
				'<td class="mw-input">' +

					'<label>' +
						'<input ' +
							'type="radio" ' +
							'name="multipleFiles" ' +
							'value="yes" /> ' +
						escapeHtml(msg('yes')) +
					'</label>' +

					' &nbsp; ' +

					'<label>' +
						'<input ' +
							'type="radio" ' +
							'name="multipleFiles" ' +
							'value="no" ' +
							'checked /> ' +
						escapeHtml(msg('no')) +
					'</label>' +

				'</td>' +
			'</tr>';


		$regularFile.before(switchHtml);


		/* -----------------------------------------------------
		 * MULTIPLE FILE INPUT
		 * ----------------------------------------------------- */

		var multipleHtml =
			'<tr ' +
				'id="mv-multiple-files-select-row" ' +
				'class="multipleFileSelect" ' +
				'style="display:none">' +

				'<td class="mw-label">' +
					escapeHtml(msg('sourcefiles')) +
				'</td>' +

				'<td class="mw-input">' +
					'<input ' +
						'type="file" ' +
						'id="multiupload" ' +
						'multiple />' +
				'</td>' +

			'</tr>';


		$regularFile.after(multipleHtml);


		/* -----------------------------------------------------
		 * MARK NORMAL SINGLE-UPLOAD CONTROLS
		 * ----------------------------------------------------- */

		$('input[name="wpUpload"]')
			.addClass('regularFileSelect');


		$('#wpDestFile')
			.closest('tr')
			.addClass('regularFileSelect');


		$('#wpIgnoreWarning')
			.closest('tr')
			.addClass('regularFileSelect');


		/* -----------------------------------------------------
		 * MULTI-UPLOAD BUTTON
		 * ----------------------------------------------------- */

		$('input[name="wpUpload"]').after(
			'<input ' +
				'type="button" ' +
				'value="' + escapeHtml(msg('uploadfiles')) + '" ' +
				'class="multipleFileSelect" ' +
				'style="display:none" ' +
				'id="multiFileSubmit" />'
		);


		/* -----------------------------------------------------
		 * SWITCH BETWEEN SINGLE / MULTIPLE
		 * ----------------------------------------------------- */

		$('input[name="multipleFiles"]').on(
			'change',
			function () {

				if (this.value === 'yes') {

					$('.regularFileSelect').hide();
					$('.multipleFileSelect').show();

				} else {

					$('.regularFileSelect').show();
					$('.multipleFileSelect').hide();

				}
			}
		);


		/* -----------------------------------------------------
		 * MULTIPLE UPLOAD
		 * ----------------------------------------------------- */

		$('#multiFileSubmit').on(
			'click',
			function () {

				var input =
					$('#multiupload')[0];


				if (!input) {
					return false;
				}


				var files =
					input.files;


				if (!files || files.length === 0) {

					alert(msg('nofiles'));

					return false;
				}


				/* ---------------------------------------------
				 * LICENSE
				 * --------------------------------------------- */

				var $license =
					$('#wpLicense');


				if (
					$license.length &&
					$license.find('option:selected').val() === '' &&
					!config.UMFBypassLicenseCheck
				) {

					alert(msg('nolicense'));

					return false;
				}


				/* ---------------------------------------------
				 * DESCRIPTION
				 *
				 * UploadCredits.js and UploadCategories.js
				 * already write into this field.
				 *
				 * Therefore those values are copied to every
				 * file uploaded through this multi-uploader.
				 * --------------------------------------------- */

				var comment =
					$('#wpUploadDescription').val() || '';


				var license =
					'';


				if (
					$license.length &&
					$license.find('option:selected').val() !== ''
				) {

					license =
						'\n== ' +
						mw.msg('license-header') +
						' ==\n' +
						$license.find('option:selected').prop('title');

				}


				var text =
					(comment !== ''
						? '== ' +
							mw.msg('filedesc') +
							' ==\n' +
							comment
						: ''
					) +
					license;


				/* ---------------------------------------------
				 * WATCHLIST
				 * --------------------------------------------- */

				var watch =
					'preferences';


				if ($('#wpWatchthis').is(':checked')) {

					watch = 'watch';

				} else {

					watch = 'nochange';

				}


				/* ---------------------------------------------
				 * PREPARE RESULTS DISPLAY
				 * --------------------------------------------- */

				var currentFile =
					0;


				$('#firstHeading')
					.text(msg('uploading'));


				$('#mw-content-text').html(

					'<h3>' +
						escapeHtml(msg('uploaded')) +
					'</h3>' +

					'<ul id="mv-multi-upload-success"></ul>' +

					'<div ' +
						'id="multiUploadFailed" ' +
						'style="display:none">' +

						'<h3>' +
							escapeHtml(msg('failed')) +
						'</h3>' +

						'<ul></ul>' +

					'</div>'
				);


				/* ---------------------------------------------
				 * UPLOAD NEXT FILE
				 * --------------------------------------------- */

				function uploadNextFile() {

					if (currentFile >= files.length) {

						$('#mw-content-text').append(

							'<h3>' +
								escapeHtml(msg('done')) +
							'</h3>'
						);

						return;
					}


					var file =
						files[currentFile];


					var formData =
						new FormData();


					formData.append(
						'action',
						'upload'
					);


					formData.append(
						'token',
						mw.user.tokens.get('csrfToken')
					);


					formData.append(
						'filename',
						file.name
					);


					formData.append(
						'file',
						file
					);


					formData.append(
						'comment',
						comment
					);


					formData.append(
						'text',
						text
					);


					formData.append(
						'watchlist',
						watch
					);


					formData.append(
						'ignorewarnings',
						1
					);


					formData.append(
						'format',
						'json'
					);


					$.ajax({

						url:
							config.wgScriptPath +
							'/api.php',

						method:
							'POST',

						data:
							formData,

						cache:
							false,

						contentType:
							false,

						processData:
							false

					})
					.done(function (response) {

						if (
							response &&
							!response.error &&
							response.upload
						) {

							var filename =
								response.upload.filename ||
								file.name;


							var descriptionUrl =
								response.upload.imageinfo &&
								response.upload.imageinfo.descriptionurl
									? response.upload.imageinfo.descriptionurl
									: '';


							if (descriptionUrl) {

								$('#mv-multi-upload-success')
									.append(

										$('<li>').append(

											$('<a>')
												.attr(
													'href',
													descriptionUrl
												)
												.attr(
													'target',
													'_blank'
												)
												.text(
													filename
												)

										)
									);

							} else {

								$('#mv-multi-upload-success')
									.append(

										$('<li>')
											.text(filename)

									);

							}

						} else {

							$('#multiUploadFailed ul')
								.append(
									$('<li>')
										.text(file.name)
								);


							$('#multiUploadFailed')
								.show();

						}


						currentFile++;

						uploadNextFile();

					})
					.fail(function () {

						$('#multiUploadFailed ul')
							.append(
								$('<li>')
									.text(file.name)
							);


						$('#multiUploadFailed')
							.show();


						currentFile++;

						uploadNextFile();

					});
				}


				uploadNextFile();


				return false;
			}
		);
	}


	/* =========================================================
	 * LOAD REQUIRED MEDIAWIKI MODULES
	 * ========================================================= */

	mw.loader
		.using([
			'mediawiki.api',
			'jquery'
		])
		.then(function () {

			return new mw.Api()
				.loadMessagesIfMissing([
					'filedesc',
					'license-header'
				]);

		})
		.then(function () {

			init();

		});

})(window.jQuery, window.mediaWiki);