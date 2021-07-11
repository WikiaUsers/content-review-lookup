/**
 * 23:19, July 4, 2021 (UTC)
 * http://naruto.wikia.com/wiki/MediaWiki:Common.js
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Fandomdesktop).
 */

(function (window, $, mw) {
	"use strict";
	
	// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';

	// User tags
	window.UserTagsJS = {
		tags: {
			bureaucrat: {
				link: 'Project:Birokrat'
			},
			sysop: {
				link: 'Project:Sysop',
				title: 'Operator Sistem (Pengurus)'
			},
			rollback: {
				link: 'Project:Rollback'
			},
			inactive: {
				title: 'Pengguna belum disunting selama 30 hari terakhir'
			}
		},
		modules: {
			inactive: 30,
			mwGroups: [
				'bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global'
			],
			autoconfirmed: false,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			userfilter: {
				Dimas_Rizward_H: ['bureaucrat'] // Hide bureaucrat from inactive founder
			}
		}
	};

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
                    '{{Tidak ada lisensi}}': 'Gambar tidak berlisensi',
                    '{{Tidak ada alasan}}': 'Tidak ada info penggunaan adil',
                    '{{Tidak digunakan}}': 'Gambar tidak digunakan',
                    '{{Nama berkas buruk}}': 'Nama buruk'
                },
                tempOptStr = '';
         
            for (var i in Options) {
                tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
            }
         
            var html = '<select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Tambah templat</a>';
            $('.comments').after(html);
            $('#templateSubmit').click(function() {
                $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
                new mw.Api().post({
                        format: 'json',
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        token: mw.user.tokens.get('editToken'),
                        summary: 'Menambahkan templat: ' + $('#FileTemplateAdder').val(),
                        minor: true,
                        prependtext: $('#FileTemplateAdder').val() + "\n"
                    })
                    .done(function() {
                        $('#templateSubmit').text('Tambah templat ini juga!!');
                        new BannerNotification('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully', 'confirm').show();
                    })
                    .fail(function() {
                        new BannerNotification('Penambahan templat gagal!', 'error').show();
                    });
            });
        });
	}

}(window, jQuery, mediaWiki));