/**
 * Zaadaptowana wersja skryptu MultiUpload z FANDOM Developers Wiki (https://dev.wikia.com/)
 * Oryginalny kod: https://dev.wikia.com/wiki/MediaWiki:MultiUpload/code.js
 * Autorzy: https://dev.wikia.com/wiki/MediaWiki:MultiUpload/code.js?action=history
 */

// Załaduj zależności (braki mogą powodować problemy w ładowaniu)
mw.loader.using([
	'jquery.client',
	'mediawiki.util',
	'mediawiki.api'
]).then(function() {
	// Nie ładuj dwa razy
	if ( window.MultiUploadLoaded ) {
		return;
	}
	window.MultiUploadLoaded = true;
	var config = mw.config.get([
			'wgContentLanguage',
			'wgUserLanguage',
			'stylepath',
			'wgNamespaceNumber',
			'wgPageName',
			'wgUserGroups',
			'wgUserName'
		]),
		/**
		 * System tłumaczeń 
		 */
		i18n = {
			en: { // English (en)
				multiupload: 'Multi Upload',
				logout: 'You have to be log in and autoconfirmed to upload files',
				update: 'Update the form',
				nofile: 'You have to choose a file to upload it',
				imagename: 'Image n°',
				filename: 'File name : ',
				licensetext: 'File license : ',
				uploadfiles: 'Upload all images',
				browsersupport: 'This browser doesn\'t seem to support the `files` property of file inputs.',
				nolicence: 'None selected',
				problem: 'A problem occured, upload cancelled',
				success: 'Image uploaded successfully.',
				duplicate: 'This image is a doublon of : ',
				alreadyname: 'A image has already this name, please choose an other one below :',
				reset: 'Reset the form',
				description: 'Summary :',
				filedescription: 'File description',
				ignorewarnings: 'Ignore warnings'
			},
			pl: { // polski (pl)
				multiupload: 'Masowe przesyłanie',
				logout: 'Musisz być zalogowany i mieć potwierdzone konto, aby móc przesyłać pliki',
				update: 'Zaktualizuj formularz',
				nofile: 'Musisz wybrać plik, aby go przesłać',
				imagename: 'Obraz n°',
				filename: 'Nazwa pliku : ',
				licensetext: 'Licencja pliku : ',
				uploadfiles: 'Prześlij wszystkie pliki',
				browsersupport: 'Ta przeglądarka nie wspiera właściwości `files` na wejściu.',
				nolicence: 'Nic nie wybrano',
				problem: 'Wystąpił problem, przesyłanie anulowane',
				success: 'Obrazy zostały przesłane.',
				duplicate: 'Ten obraz jest duplikatem : ',
				alreadyname: 'Inny obraz już posiada tą nazwę, proszę wybierz poniżej inną :',
				reset: 'Wyczyść formularz',
				description: 'Opis :',
				filedescription: 'Opis pliku',
				ignorewarnings: 'Ignoruj ostrzeżenia'
			},
		};
	// Język użytkownika > Język treści > Angielski
	i18n = $.extend(
		i18n.en,
		i18n[config.wgContentLanguage],
		i18n[config.wgUserLanguage]
	);

	var MultiUpload = {
		init: function() {
			$('#p-tb-list').append(
				$('<li>', {
					class: 'custom',
					id: 'p-multi-upload'
				}).append(
					$('<a>', {
						href: mw.util.getUrl( 'Special:MultiUpload' ),
						text: i18n.multiupload
					})
				)
			);
			if ( config.wgNamespaceNumber === -1 && config.wgPageName.replace(/.*:/, '') === 'MultiUpload' ) {
				if (config.wgUserName === null || !$.inArray('autoconfirmed', config.wgUserGroups)) { /* If the user don't have multiple upload rights (if it's not autoconfirmed) */
					$('#mw-content-text').html(i18n.logout);
					return false;
				}
				var MultiUploadoption = window.MultiUploadoption || {};
				$.extend(MultiUpload, MultiUploadoption);
				$('#mw-content-text').empty();
				$('#mw-content-text').append('<input type="file" multiple id="fileinput" accept="image/*" />\n<div id="editor">Ici</div>\n<button id="go">' + i18n.update + '</button>');
				$('#editor').css('display', 'none');
				var token = mw.user.tokens.get( 'editToken' );
				$('#firstHeading').html( i18n.multiupload );
				document.title = i18n.multiupload;
				var filename;
			}
		},
		updatelicensebutton: function(licencestext) {
			if (licencestext !== null) {
				var licences = licencestext.trim().split('\n');
				$('.licence').replaceWith('<select class="licence"></select>');
				$('.licence').prepend('<option value="none">' + i18n.nolicence + '</option>');
				for (i = 0; i < licences.length; i++) {
					if (licences[i].indexOf('** ') === 0) {
						licences[i] = licences[i].replace("** ", "");
						if (licences[i].split('|')[0] == MultiUpload.defaultlicence) {
							$('.licence').find('optgroup:last-child').append('<option selected value="' + licences[i].split('|')[0] + '">' + licences[i].split('|')[1] + '</option>');
						} else {
							$('.licence').find('optgroup:last-child').append('<option value="' + licences[i].split('|')[0] + '">' + licences[i].split('|')[1] + '</option>');
						}
					} else {
						licences[i] = licences[i].replace('* ', '');
						$('.licence').append('<optgroup label="' + licences[i] + '"></optgroup');
					}
				}
			}
		},
		getlicence: function() {
			$.ajax({
				type: 'GET',
				url: wgServer + '/api.php?action=query&meta=allmessages&ammessages=Licenses&format=json&amlang=pl',
				success: function(data) {
					var content = data.query.allmessages[0]['*'];
					MultiUpload.updatelicensebutton(content);
				},
				error: function(data) { alert(i18n.errorapi + ' : ' + data.error.info); }
			});
		},
		update: function() {
			if ($('fieldset').length > 0) {
				MultiUpload.handleFileSelect();
				return false;
			}
			$('#editor').css('display', 'block');
			$('#fileinput').attr('disabled', true);
			input = document.getElementById('fileinput');
			$('#editor').html('');
			if (input.files.length === 0) {
				alert(i18n.nofile);
				return false;
			}
			if (!MultiUpload.max || typeof MultiUpload.max !== 'number' || MultiUpload.max < 0 || MultiUpload.max > 101) {
				if ( /sysop|bureaucrat|global_administrator|global_bureaucrat|grasp/.test( config.wgUserGroups.join() ) ) {
					MultiUpload.max = 200;
				} else if ( /moderator|redactor/.test( config.wgUserGroups.join() ) ) {
					MultiUpload.max = 75;
				} else {
					MultiUpload.max = 25;
				}
			}
			if (!MultiUpload.max) {
				alert(lng.problem);
				return false;
			}
			var limit;
			if (MultiUpload.max < input.files.length) {
				limit = MultiUpload.max;
			} else {
				limit = input.files.length;
			}
			for (i = 0; i < limit; i++) {
				$('#editor').append('<fieldset><legend>' + i18n.imagename + (i + 1) + '</legend><br /><div style="float:left">' + i18n.filename + '<input type="text" class="imagename" value="' + input.files[i].name + '" id="imagename' + (i + 1) + '"/></div><div style="float:center; display:none;" id="loading' + (i + 1) + '"><img src="' + config.stylepath + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" /></div><div style="float:right">' + i18n.licensetext + '<input type="text" class="licence" id="licence' + (i + 1) + '"/></div></fieldset>');
			}
			MultiUpload.getlicence();
			$('#editor').append('<fieldset><legend>' + i18n.filedescription + '</legend><table><tr><td>' + i18n.description + '</td><td><textarea rows="8" cols="80" id="UploadDescription"/></td></tr></table></fieldset>');
			$('#go').html(i18n.uploadfiles);
			$('<input type="checkbox" id="ignorewarnings" name="ignorewarnings"></input><label for="ignorewarnings">' + i18n.ignorewarnings + '</label>').insertAfter('#go');
		},
		handleFileSelect: function() {
			input = document.getElementById('fileinput');
			if (!input.files) {
				alert(i18n.browsersupport);
				$('#fileinput').attr("disabled", false);
			} else if (!input.files[0]) {
				alert(i18n.problem);
				$('#fileinput').attr("disabled", false);
			} else {
				$('fieldset').attr('disabled', 'disabled');
				$('#go').attr('disabled', 'disabled');
				var numberfiles = $('fieldset').length - 1;
				if (numberfiles > 0) {
					for (i = 0; i < numberfiles; i++) {
						file = input.files[i];
						filename = $('.imagename').eq(i).val() || input.files[i].name;
						console.log(filename);
						if ($('#mw-content-text').find('select:eq(' + i + ')').find('option:selected').val() !== "none") {
							licence = '{' + '{' + $('#mw-content-text').find('select:eq(' + i + ')').find('option:selected').val() + '}}' + '\n' + $('#UploadDescription').val();
						} else { licence = $('#UploadDescription').val(); }
						console.log(licence);
						$('#loading' + (i + 1)).css('display', 'initial');
						MultiUpload.uploadfiles(file, filename, licence);
					}
					alert(i18n.success);
					$('#go').html(i18n.reset);
					$('#go').removeAttr('disabled');
					$('#go').click(function(event) {
						if ($('#go').html() == i18n.reset) {
							event.stopPropagation();
							$('#mw-content-text').find('*').attr("disabled", false);
							$('#editor').html('');
							$('#editor').css('display', 'none');
							$('#go').html(i18n.update);
							$('#fileinput').val('');
						}
					});
				}
			}
		},
		uploadfiles: function(fileToUpload, fileName, licence) {
			var lFileName = fileName;

			formdata = new FormData(); // see https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
			formdata.append('action', 'upload');
			formdata.append('filename', lFileName);
			formdata.append('token', mw.user.tokens.get('editToken'));
			formdata.append('file', fileToUpload);
			formdata.append('text', licence);
			formdata.append('format', 'json');
			if ($('#ignorewarnings').prop('checked')) { formdata.append('ignorewarnings', '1'); }

			// as we now have created the data to send, we send it...
			$.ajax({ // https://stackoverflow.com/a/8244082
				url: mw.util.wikiScript('api'), //url to api.php 
				contentType: false,
				processData: false,
				type: 'POST',
				data: formdata, //the formdata object we created above
				dataType: 'json',
				async: false,
				success: function(data) {
					//        console.log(data);
					if (data.upload.result == 'Warning') {
						if (data.upload.warnings.hasOwnProperty('duplicate')) {
							//if file is a duplicate, we use the name of the first existing file
							lFileName = data.upload.warnings.duplicate[0];
							alert(i18n.duplicate + lFileName);
							MultiUpload.uploadfinished(false);
						} else if (data.upload.warnings.hasOwnProperty('exists')) {
							lFileName = prompt(i18n.alreadyname, lFileName);
							if (lFileName !== null) {
								lFileName = MultiUpload.uploadfiles(fileToUpload, lFileName, licence);
							} else { MultiUpload.uploadfinished(false); }
						}
					} else { MultiUpload.uploadfinished(true); }
				},
				error: function(xhr, status, error) {
					alert(error);
					MultiUpload.uploadfinished(false);
				}
			});
		},
		uploadfinished: function(result) {
			if (result) {
				$('#loading' + (i + 1) + ' > img').attr('src', 'https://gamepedia.cursecdn.com/minecraft_pl_gamepedia/7/77/Yes.png?version=ae02554f1e0470dfb2524fde1232073d');
			} else {
				$('#loading' + (i + 1) + ' > img').attr('src', 'https://gamepedia.cursecdn.com/minecraft_pl_gamepedia/1/19/Grid_Bariera.png?version=1fcd4958c2ab8ce415b8de03d9f82810');
			}
		}
	};
	$('#mw-content-text').on('click', '#go', function() { MultiUpload.update(); });
	MultiUpload.init(); // Uruchom skrypt
});