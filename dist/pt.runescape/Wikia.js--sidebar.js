;(function ($, mw) {
	'use strict';

	function addRSWGuideModule() {
		$('<section>')
			.attr('id', 'custom-module')
			.addClass('module custom-module')
			.css('text-align', 'center')
			.append(
				$('<div>')
					.append(
						$('<p>')
							.append('Oi!')
							.css({
								'font-size': '20px',
								'margin-bottom': '15px'
							})
					)
					.append(
						$('<p>')
							.append('Mudámos de domínio!')
					)
					.append(
						$('<p>')
							.append(
							    $('<a>')
        							.attr('href', 'https://pt.rs.wiki')
        							.text('pt.rs.wiki')
        							.css({
        								'font-family': 'Cinzel',
        								'font-size': '1.3em'
        							})
        					)
					)
					.append(
						$('<a>')
							.attr('href', 'https://pt.rs.wiki')
							.addClass('sidebar-contribuir')
							.text('IR')
							.css({
								'font-family': 'Cinzel'
							})
					)
					.css({
						'margin': '10px auto 0 auto',
						'font-size': '16px',
						'width': '90%',
						'font-family': 'MuseoSans'
					})
			)
			.insertBefore('.activity-module');

		$('<section>')
			.attr('id', 'custom-module')
			.addClass('module custom-module')
			.css('text-align', 'center')
			.append(
				$('<a>')
					.attr('href', 'https://discord.gg/runescapewiki')
					.append(
						$('<img>')
							.attr('src', 'http://pt.runescape.wikia.com/wiki/Special:FilePath/Discord_logo.svg')
							.css({
								width: '65%',
							})
					)
					.css({
						'margin-top': '0px',
						'margin-bottom': '10px'
					})
			)
			.append(
				$('<div>')
					.append(
						$('<p>')
							.append('A RuneScape Wiki agora é parceira do Discord! Clique abaixo e acesse o canal!')
							.css({
								'margin': '10px auto 0 auto',
								'font-size': '13px',
								'width': '90%'
							})
					)
					.append(
						$('<a>')
							.attr('href', 'https://discord.gg/runescapewiki')
							.addClass('sidebar-discord')
							.text('CONVIDE-ME')
					)
			)
			.append(
				$('<a>')
					.attr('href', 'https://facebook.com/rswikiptbr')
					.append(
						$('<img>')
							.attr('src', 'http://pt.runescape.wikia.com/wiki/Special:FilePath/Facebook_logo.png')
							.css({
								width: '65%',
							})
					)
					.css({
						'display': 'inline-block',
						'margin-top': '30px',
						'margin-bottom': '10px'
					})
			)
			.append(
				$('<div>')
					.append(
						$('<p>')
							.append('Curta nossa página no Facebook! Ajude-nos a crescer, curta e compartilhe as postagens!')
							.css({
								'margin': '10px auto 0 auto',
								'font-size': '13px',
								'width': '90%'
							})
					)
					.append(
						$('<a>')
							.attr('href', 'https://facebook.com/rswikiptbr')
							.addClass('sidebar-facebook')
							.text('CURTIR')
					)
			)
			.insertBefore('.activity-module');
	}
 
	function init(i) {
		if ($('#custom-module').length) {
			mw.log('Sidebar custom module already loaded');
			return;
		}
		
		if(i === undefined) {
			i = 0;
		}
		
		if ($('.activity-module').length) {
			mw.log('Found sidebar module, adding custom one');
			addRSWGuideModule();
			return;
		}
		
		if (i < 10) { // retry for 10 seconds
			mw.log('Failed to find sidebar module, waiting 500ms...');
			i++;
			setTimeout(function() {
				init(i);
			}, 1000);
		}
	}
	
	mw.loader.using( ['mediawiki.util'], function() {
		$(function() {
			init(0);
		});
	});
}(this.jQuery, this.mediaWiki));