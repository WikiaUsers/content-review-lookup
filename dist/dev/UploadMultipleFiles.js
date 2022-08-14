;(function($, mw) {
	'use strict';
	var config = mw.config.get([
		'wgCanonicalSpecialPageName',
		'UMFBypassLicenseCheck',
		'wgScriptPath',
		'wgContentLanguage'
	]);
	var msg;

	if (config.wgCanonicalSpecialPageName !== 'Upload') return;
	
	function init() {
		$('#wpUploadFile').parent().parent().addClass('regularFileSelect');
		$('tr.regularFileSelect').before(
			'<tr>' +
				'<td class="mw-label">' + msg('multiupload').escape() + '</td>' +
				'<td class="mw-input">' +
					'<label>' +
						'<input type="radio" name="multipleFiles" value="' + msg('yes').escape() + '" /> ' + msg('yes').escape() +
					'</label> &nbsp; ' +
					'<label>' +
						'<input type="radio" name="multipleFiles" value="' + msg('no').escape() + '" checked="" /> ' + msg('no').escape() +
					'</label>' +
				'</td>' +
			'</tr>'
		);
		$('tr.regularFileSelect').after(
			'<tr class="multipleFileSelect" style="display:none">' +
				'<td class="mw-label">' + msg('sourcefiles').escape() + '</td>' +
				'<td class="mw-input"><input type="file" id="multiupload" multiple /></td>' +
			'</tr>'
		);
		$('input[name="wpUpload"]').addClass('regularFileSelect');
		$('#wpDestFile').parent().parent().addClass('regularFileSelect');
		$('#wpIgnoreWarning').parent().parent().addClass('regularFileSelect');
		$('input[name="wpUpload"]').after('<input type="button" value="' + msg('uploadfiles').escape() + '" class="multipleFileSelect" style="display:none" id="multiFileSubmit" />');
		$('input[name="multipleFiles"]').change(function(){
			if (this.value === msg('yes').plain()) {
				$('.regularFileSelect').hide();
				$('.multipleFileSelect').show();
			} else {
				$('.regularFileSelect').show();
				$('.multipleFileSelect').hide();
			}
		});
		$('#multiFileSubmit').click(function() {
			var files = $('#multiupload')[0].files;
			if (files.length === 0) {
				alert(msg('nofiles').plain());
				return false;
			}
			if ($('#wpLicense option:selected').val() === '' && !config.UMFBypassLicenseCheck) {
				alert(msg('nolicense').plain());
				return false;
			}
			var comment = $('#wpUploadDescription').val();
			var license = ($('#wpLicense option:selected').val() === '') ? '' : '\n== ' + mw.msg('license-header') + ' ==\n' + $('#wpLicense option:selected').prop('title');
			var text = (comment !== '' ? '== ' + mw.msg('filedesc') + ' ==\n' + comment : '') + license;
			var watch = 'preferences';
			if ($('#wpWatchthis').is(':checked')) watch = 'watch';
			else watch = 'nochange';
			var curFile = 0;
			$('#firstHeading').text(msg('uploading').plain());
			$('#mw-content-text').html('<h3>' + msg('uploaded').escape() + '</h3><ul></ul><div style="display:none" id="multiUploadFailed"><h3>' + msg('failed').escape() + '</h3><ul></ul></div>');
			function gNF() {
				if(curFile>files.length) {
					$('#mw-content-text').append('<h3>' + msg('done').escape() + '</h3>');
					return;
				}
				if(files[curFile] === undefined) {
					curFile++;
					gNF();
					return;
				}
				var fd = new FormData();
				fd.append("action","upload");
				fd.append("token",mw.user.tokens.get('csrfToken'));
				fd.append("filename",files[curFile].name);
				fd.append("file",files[curFile]);
				fd.append("comment",comment);
				fd.append("text",text);
				fd.append("watchlist",watch);
				fd.append("ignorewarnings",1);
				fd.append("format","json");
				$.ajax({
					url: config.wgScriptPath + '/api.php',
					method: 'POST',
					data: fd,
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST'
				}).done(function(d){
					if (d.error == undefined) {
						$('#mw-content-text > ul').append('<li><a href="' + d.upload.imageinfo.descriptionurl + '" target="_blank">'+d.upload.filename+'</a></li>');
					}
					else {
						$('#multiUploadFailed ul').append('<li>' + files[curFile].name + '</li>');
						$('#multiUploadFailed').show();
					}
					curFile++;
					gNF();
				}).fail(function(d) {
					$('#multiUploadFailed ul').append('<li>' + files[curFile].name + '</li>');
					$('#multiUploadFailed').show();
					curFile++;
					gNF();
				});
			}
			gNF();
		});
	}
	mw.loader.using(['mediawiki.api', 'jquery']).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'filedesc',
			'license-header'
		], {amlang: config.wgContentLanguage});
	}).then(function () {
		mw.hook('dev.i18n').add(function (i18n) {
			i18n.loadMessages('UploadMultipleFiles').done(function (i18no) {
				msg = i18no.msg;
				init();
			});
		});
		importArticles({
			type: 'script',
			articles: 'u:dev:MediaWiki:I18n-js/code.js'
		});
	});
})(window.jQuery, window.mediaWiki);