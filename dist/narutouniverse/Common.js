/**
 * 06:20, 27 November 2020 (UTC)
 * http://naruto.fandom.com/wiki/MediaWiki:Common.js
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Monobook).
 * Scripts imported in MediaWiki:ImportJS
 */

(function (window, $, mw) {
	"use strict";

	// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';

	
	// Add custom class for styling long list of refs
	if ($('.references li').length > 9)
        $('.references').addClass('compactreferences');


	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {

		// Detach the AJAX feature from Page/Image Creation/Upload
		// because the pop-up form does not obey the preloads and such.
		$(window).load(function() {
			$('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
		});

        // Template adder on file pages
        if (mw.config.get('wgCanonicalNamespace') === 'File')
        $(function() {
            if ($.inArray("autoconfirmed", mw.config.get("wgUserGroups")) === -1)
                return;

            var Options = {
                    '{\{No license}}': 'Unlicensed image',
                    '{\{No rationale}}': 'No Fairuse info',
                    '{\{Unused}}': 'Unused image',
                    '{\{Poor filename}}': 'Poor name'
                },
                tempOptStr = '';
         
            for (var i in Options) {
                tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
            }
         
            var html = '<select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
            $('.comments').after(html);
            $('#templateSubmit').click(function() {
                $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
                new mw.Api().post({
                        format: 'json',
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        token: mw.user.tokens.get('editToken'),
                        summary: 'Adding template: ' + $('#FileTemplateAdder').val(),
                        minor: true,
                        prependtext: $('#FileTemplateAdder').val() + "\n"
                    })
                    .done(function() {
                        $('#templateSubmit').text('Add this Template too!');
                        new BannerNotification('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully', 'confirm').show();
                    })
                    .fail(function() {
                        new BannerNotification('Template addition failed!', 'error').show();
                    });
            });
        });
	}

    /*
	// Make edit with form as default when available 
    var $edit = $('#ca-edit'),
        $pencil = $edit.find('img'),
        $formedit = $('#ca-formedit');
        
    if ($formedit.length) {
        $edit.attr('href', '?action=formedit').text('Edit with form').prepend($pencil);
        $formedit.attr('href', '?action=edit').text('Edit this page');
    } //*/

}(window, jQuery, mediaWiki));