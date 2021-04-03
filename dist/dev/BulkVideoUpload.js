/**
 * Ajax Bulk Video Upload
 * @description Bulk adds a list of videos to the wiki
 * Able to add all videos in a YouTube playlist
 * @author Caburum
 */
(function(window, $, mw) {
    'use strict';
    var placement,
        preloads = 2,
        videoUploadModal,
        paused = true,
        isUCP = mw.config.get('wgVersion') !== '1.19.24';

    function preload() {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            init();
        }
    }

    function init() {
        placement.script('BulkVideoUpload');
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 't-bvu',
                    text: 'Bulk Video Upload',
                    click: click
                })
            )
        );
    }

    function click() {
        if (videoUploadModal) {
            videoUploadModal.show();
            return;
        }
        videoUploadModal = new window.dev.modal.Modal({
            content: formHtml(),
            id: 'form-bulk-video-upload',
            size: isUCP ? 'large' : 'medium',
            title: 'Ajax Bulk Video Upload',
            buttons: [{
                    id: 'bvu-start',
                    text: 'Initiate',
                    primary: true,
                    event: 'start'
                },
                {
                    id: 'bvu-pause',
                    text: 'Pause',
                    primary: true,
                    event: 'pause',
                    disabled: true
                },
                {
                    text: 'Add YouTube Playlist',
                    primary: true,
                    event: 'addPlaylist'
                },
                {
                    text: 'Close',
                    event: 'close'
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
        return $('<form>', {
            'class': 'WikiaForm'
        }).append(
            $('<fieldset>').append(
                $('<p>', {
                    text: 'Put the URL of every video you want to upload on a separate line:'
                }),
                $('<textarea>', {
                    id: 'text-bulk-video-upload'
                }),
                $('<p>', {
                    text: 'Any errors encountered will appear below:'
                }),
                $('<div>', {
                    id: 'text-error-output'
                })
            )
        ).prop('outerHTML');
    }

    function pause() {
        paused = true;
        document.getElementById('bvu-pause').setAttribute('disabled', '');
        document.getElementById('bvu-start').removeAttribute('disabled');
    }

    function start() {
        paused = false;
        document.getElementById('bvu-start').setAttribute('disabled', '');
        document.getElementById('bvu-pause').removeAttribute('disabled');
        process();
    }

    function process() {
        if (paused) {
            return;
        }
        var txt = document.getElementById('text-bulk-video-upload'),
            urls = txt.value.split('\n'),
            currentURL = urls[0];
        if (!currentURL) {
            $('#text-error-output').append(
                'Finished! Nothing left to do, or next line is blank.<br />'
            );
            pause();
        } else {
            performAction(currentURL);
        }
        urls = urls.slice(1, urls.length);
        txt.value = urls.join('\n');
    }

    function addPlaylist() {
        var playlist = prompt('Please enter a valid YouTube playlist ID:');
        if (!playlist) {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=1000&key=AIzaSyCwjY2VjQJWUKuqdyFV0yLWL4fGpYyZv7I&playlistId=' + playlist, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    var playlist = res.items;
                    processPlaylist(playlist);
                } else if (xhr.status == 400 || xhr.status == 403 || xhr.status == 404) {
                    outputError(res.error.code + ': ' + res.error.message);
                }
            }
        };
        xhr.send(null);
    }

    function processPlaylist(data) {
        for (var i = 0; i <= data.length; i++) {
            if (i === data.length) {
                console.log('Playlist added');
                return;
            }

            var obj = data[i];
            var video = 'https://youtube.com/watch?v=' + obj.contentDetails.videoId;

            $('#text-bulk-video-upload').val(
                $('#text-bulk-video-upload').val() +
                video +
                '\n'
            );
        }
    }

    function outputError(error) {
        console.error('ERROR: ' + error);
        $('#text-error-output').append('ERROR: ' + error, '<br />');
    }

    function performAction(url) {
        var token = mw.user.tokens.get('editToken');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', mw.config.get('wgScriptPath') + '/wikia.php?controller=Fandom\\Video\\IngestionController&method=uploadVideo', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    if (res.success) {
                        console.log('SUCCESS: ' + res.status);
                    } else {
                        outputError(res.status);
                    }
                } else {
                    outputError(res.status + ' ' + res.error + ': ' + res.details);
                }
            }
        };
        xhr.send('url=' + encodeURIComponent(url) + '&token=' + encodeURIComponent(token));

        setTimeout(process, window.bulkVideoUploadDelay || 1000);
    }

    mw.hook('dev.modal').add(preload);
    mw.hook('dev.placement').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:Placement.js'
        ]
    });
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:BulkVideoUpload.css'
    });
}(this, jQuery, mediaWiki));