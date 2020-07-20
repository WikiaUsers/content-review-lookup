/**
 * catGallery.js
 * 
 * - Generates a gallery based on a category
 * - Works only on pages with the Gallery: pseudonamespace
 * - See template:gallery for more info
 */

$(function() {
    if (mw.config.get('wgPageName').split(':')[0] == 'Gallery') {
        var page = mw.config.get('wgPageName').split(':')[1];
        $('.cat-gallery').each(function() {
            var $this = $(this);
            $this.html('<img style="display: block; margin: 0 auto;" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif"/>');
            $.get(mw.util.wikiScript('api'), {
                action: 'query',
                titles: 'Category:' + page + ' images',
                indexpageids: '',
                format: 'json'
            }, function(data) {
                if (!data.query.pages[data.query.pageids[0]].missing) {
                    $.get(mw.util.wikiScript('api'), {
                        action: 'query',
                        list: 'categorymembers',
                        cmtitle: 'Category:' + page + ' images',
                        cmlimit: 500,
                        cmtype: 'file',
                        format: 'json'
                    }, function(data) {
                        var gallery = '<gallery hideaddbutton="true">\n';
                        for (var i in data.query.categorymembers) {
                            gallery += data.query.categorymembers[i].title + '\n';
                        }
                        gallery += '</gallery>';
                        $.get(mw.util.wikiScript('api'), {
                            action: 'parse',
                            text: gallery,
                            disablepp: '',
                            format: 'json'
                        }, function(data) {
                            $this.html(data.parse.text['*'] + '<div style="margin: 0 auto;"><a class="wikia-button" href="/wiki/Special:Upload?upload=galleryimage&character=' + page + '">Add an image to this gallery</a></div>');
                        });
                    });
                }
            });
        });
    }
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Upload' && $.getUrlVar('upload') == 'galleryimage') {
        $('.mw-htmlform-field-HTMLTextAreaField').after('<tr><td class="mw-label">Categories added:</td><td class="mw-input"><a href="/wiki/Category:' + $.getUrlVar('character') + '_images">' + decodeURIComponent($.getUrlVar('character')).replace(/\_/g, ' ') + ' images</a></td></tr>');
        $('#mw-upload-form').on('submit', function() {
            if ($('#wpUploadDescription').val()) {
                $('#wpUploadDescription').val($('#wpUploadDescription').val() + '\n[[Category:' + decodeURIComponent($.getUrlVar('character')).replace(/\_/g, ' ') + ' images]]');
            } else {
                $('#wpUploadDescription').val('[[Category:' + decodeURIComponent($.getUrlVar('character')).replace(/\_/g, ' ') + ' images]]');
            }
        });
    }
});