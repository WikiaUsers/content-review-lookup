/**
 * Name:		BulkVideoUpload
 * Version:		v1.1
 * Author:		Caburum
 * Description:	Bulk adds a list of videos to the wiki
 *				Able to add all videos from a YouTube playlist
**/

(function(window, $, mw) {
	'use strict';

	if (window.BulkVideoUploadLoaded) {
		return;
	}
	window.BulkVideoUploadLoaded = true;

	var i18n,
		preloads = 2,
		videoUploadModal,
		paused = true;

	function preload() {
		if (--preloads === 1) {
			window.dev.i18n.loadMessages('BulkVideoUpload').then(init);
		}
	}

	function init(i18nData) {
		i18n = i18nData;

		$('<li>', {
			append: $('<a>', {
				text: i18n.msg('title').escape(),
				click: click,
				css: {
					cursor: 'pointer'
				}
			}),
			prependTo: $('#WikiaBar .toolbar .mytools .tools-menu')
		});
	}

	function click() {
		if (videoUploadModal) {
			videoUploadModal.show();
			return;
		}
		videoUploadModal = new window.dev.modal.Modal({
			content: formHtml(),
			id: 'form-bulk-video-upload',
			size: 'large',
			title: i18n.msg('title').escape(),
			buttons: [{
					id: 'bvu-start',
					text: i18n.msg('start').escape(),
					primary: true,
					event: 'start'
				},
				{
					id: 'bvu-pause',
					text: i18n.msg('pause').escape(),
					primary: true,
					event: 'pause',
					disabled: true
				},
				{
					text: i18n.msg('addPlaylistYT').escape(),
					primary: true,
					event: 'addPlaylist'
				}
			],
			events: {
				pause: pause,
				start: start,
				addPlaylist: addPlaylist
			}
		});
		videoUploadModal.create();
		videoUploadModal.show();
	}

	function formHtml() {
		return $('<form>').append(
			$('<fieldset>', {
				css: {
					border: 'none'
				}
			}).append(
				$('<p>', {
					text: i18n.msg('inputDescription').plain()
				}),
				$('<textarea>', {
					id: 'text-input'
				}),
				$('<p>', {
					text: i18n.msg('logDescription').plain()
				}),
				$('<div>', {
					id: 'text-log'
				})
			)
		).prop('outerHTML');
	}

	function pause() {
		paused = true;
		$('#bvu-pause').prop('disabled', true);
		$('#bvu-start').prop('disabled', false);
	}

	function start() {
		paused = false;
		$('#bvu-start').prop('disabled', true);
		$('#bvu-pause').prop('disabled', false);
		process();
	}

	function process() {
		if (paused) {
			return;
		}
		var txt = $('#text-input'),
			urls = txt.val().split('\n'),
			currentURL = urls[0];
		if (!currentURL) {
			$('#text-log').append(
				i18n.msg('finished').escape() + '<br />'
			);
			pause();
		} else {
			performAction(currentURL);
		}
		urls = urls.slice(1, urls.length);
		txt.val(urls.join('\n'));
	}

	function addPlaylist() {
		var playlistId = prompt(i18n.msg('addPlaylistPromptYT').plain());
		if (!playlistId) return;

		$.ajax({
			data: {
				part: 'contentDetails',
				maxResults: 1000,
				key: window.BulkVideoUploadYTAPIKey || 'AIzaSyCwjY2VjQJWUKuqdyFV0yLWL4fGpYyZv7I',
				playlistId: playlistId,
				hl: mw.config.get('wgUserLanguage')
			},
			dataType: 'jsonp',
			type: 'GET',
			url: 'https://youtube.googleapis.com/youtube/v3/playlistItems'
		})
		.done(function(d) {
			if (d.error.code) return outputError(d.error.code + ': ' + d.error.message);
			var playlist = d.items;
			processPlaylist(playlist);
		})
		.fail(function(e) {
			console.error(e);
		});
	}

	function processPlaylist(data) {
		for (var i = 0; i <= data.length; i++) {
			if (i === data.length) {
				console.log('Playlist added');
				return;
			}

			var obj = data[i];
			var video = 'https://youtube.com/watch?v=' + obj.contentDetails.videoId;

			$('#text-input').val(
				$('#text-input').val() +
				video +
				'\n'
			);
		}
	}

	function outputError(error) {
		console.error('ERROR: ' + error);
		$('#text-log').append(i18n.msg('errorOutput').escape() + ' ' + error, '<br />');
	}

	function performAction(url) {
		$.ajax({
			data: {
				url: url,
				token: mw.user.tokens.get('editToken')
			},
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			type: 'POST',
			url: mw.util.wikiScript('wikia') + '?format=json&controller=Fandom\\Video\\IngestionController&method=uploadVideo&uselang=' + mw.config.get('wgUserLanguage')
		})
		.done(function(d) {
			if (!d.success) return outputError(d.status);
			console.log('SUCCESS: ' + d.status);
		})
		.fail(function(e) {
			var d = e.responseJSON;
			outputError(d.status + ' ' + d.error + ': ' + d.details);
		});

		setTimeout(process, window.bulkVideoUploadDelay || 1000);
	}

	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.modal').add(preload);

	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:Modal.js'
		]
	});

	mw.util.addCSS('\
		#form-bulk-video-upload #text-input {\
			height: 20em;\
			resize: none;\
			width: 100%;\
		}\
		#form-bulk-video-upload #text-log {\
			background-color: var(--theme-page-text-mix-color, #7C7C7C);\
			color: var(--theme-page-text-mix-color-95, #111);\
			font-weight: bold;\
			width: 100%;\
		}\
	');
}(this, jQuery, mediaWiki));