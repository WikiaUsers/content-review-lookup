;(function (mw, $) {
	if (wgCanonicalNamespace !== 'File')
		return;
 
	FT = {
		buttons: function () {
			$(
					'td:nth-child(1) > a:first-child'
				)
				.each(function () {
					if (!$(this)
						.parent('td')
						.find(
							'.mw-revdelundel-link a')
						.length) return;
 
					$(this)
						.after(
							'<center><button class="wikia-button" onclick="FT.delete(this);" style="cursor:pointer;">Del!</button></center>'
						);
					$(this)
						.parent()
						.find('br')
						.remove();
				});
 
			$(
					'td:nth-child(2) > a:first-child'
				)
				.each(function () {
					$(this)
						.after(
							'<center>' +
							'<button class="wikia-button" onclick="FT.revert(this);" style="cursor:pointer;">Rev!</button>' +
							'</center>'
						);
				});
		},
 
		refresh: function () {
			$(
					'#mw-imagepage-section-filehistory'
				)
				.load('/wiki/' + mw.config.get(
						'wgPageName') +
					' #mw-imagepage-section-filehistory',
					function () {
						FT.buttons();
					});
		},
 
		protect: function () {
			$.post('/api.php', {
				action: 'protect',
				title: mw.config.get(
					'wgPageName'),
				protections: 'upload=sysop',
				reason: 'Phá hoại.',
				expiry: '2 weeks',
				token: mw.user.tokens.values.editToken
			}, function () {
				$('#filehistory')
					.after(
						'<div class="mw-warning-with-logexcerpt" style="margin:5px 0; text-align:center;">Protected!</div>'
					);
			});
		},
 
		revert: function (that) {
			var archname = $(that)
				.parents('td')
				.find('a:first-child')
				.attr('href')
				.replace(/.*oldimage=(.+)&.*/,
					'$1');
 
			$.post("/api.php", {
				action: 'filerevert',
				filename: mw.config.get(
						'wgPageName')
					.replace(/^[^:]+:(.+)/, '$1'),
				archivename: decodeURIComponent(
					archname),
				comment: 'Reverting.',
				token: mw.user.tokens.values.editToken
			}, function () {
				FT.refresh();
			});
		},
 
		clean: function (that) {
			var leng = $(
					'#mw-imagepage-section-filehistory tr'
				)
				.length;
 
			for (var i = 3; i <= leng; i++) {
				var rev = $(
						'#mw-imagepage-section-filehistory tr:nth-child(' +
						i +
						') > td:first-child > a:first-child'
					)
					.attr('href')
					.replace(
						/.*oldimage=(.+)(&.*)?/, '$1'),
					num = i;
 
				$.post('/api.php', {
					action: 'delete',
					title: mw.config.get(
						'wgPageName'),
					oldimage: decodeURIComponent(
						rev),
					reason: 'Dọn dẹp.',
					token: mw.user.tokens.values.editToken
				}, function () {
					if (num == leng) {
						FT.refresh();
					}
				});
			}
		},
 
		delete: function (that) {
			var delname = $(that)
				.parents('td')
				.find('a:first-child')
				.attr('href')
				.replace(/.*oldimage=(.+)(&.*)?/,
					'$1');
 
			$.post("/api.php", {
				action: 'delete',
				title: mw.config.get(
					'wgPageName'),
				oldimage: decodeURIComponent(
					delname),
				reason: 'Dọn dẹp.',
				token: mw.user.tokens.values.editToken
			}, function () {
				$(that)
					.parents('tr')
					.css('opacity', '0.2');
			});
		},
 
		init: function () {
			$('[data-tab-body="history"] h2')
				.after(
					'<button class="wikia-button" onclick="FT.clean();" style="cursor:pointer;">Delete all revisions!</button>' +
					' &bull; ' +
					'<button class="wikia-button" onclick="FT.refresh();" style="cursor:pointer;">Refresh table</button>' +
					' &bull; ' +
					'<button class="wikia-button" onclick="FT.protect();" style="cursor:pointer;">Protect file!</button>'
				);
 
			FT.buttons();
		}
	};
 
	$(FT.init);
})(this.mediaWiki, this.jQuery);