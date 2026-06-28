// Konfiguracja tooltipów
var tooltips_list = [
	{
		classname: 'card-tooltip',
		parse: '{'+'{k/tooltip|<#card#>}}',
	},
	{
		classname: 'keyword-tooltip',
		parse: '{'+'{Definicja|<#ability#>}}'
	}
];

// Nowy przycisk edycji profilu
// by [[User:Luqgreg]]
$(function() {
	if(mw.config.get("wgNamespaceNumber") == 2 & $(".UserProfileActionButton").length & $(".masthead-info hgroup").length) {
		var actions = mw.config.get("wgWikiaPageActions");
		var curAction;
 
		$('.UserProfileActionButton').remove();
 
		if(actions) {
			var button = '<div class="page-header__contribution-buttons" style="float: right; margin-top: 2px;"><div class="wds-button-group">'
 
			curAction = actions.filter(function(action){return action.id === "page:Edit";})[0];
			if(curAction) button += '<a href="'+curAction.href+'" class="wds-is-squished wds-is-secondary wds-button" id="ca-edit" data-tracking="ca-edit" accesskey="e"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path></svg><span>'+curAction.caption+'</span></a>';
			else button += '<a href="?action=edit" class="wds-is-squished wds-is-secondary wds-button" id="ca-viewsource" data-tracking="ca-viewsource"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-lock-small"><path d="M11 6H7V5c0-1.1.9-2 2-2s2 .9 2 2v1zm-1 6.7V14H8v-1.3c-.6-.3-1-1-1-1.7 0-1.1.9-2 2-2s2 .9 2 2c0 .7-.4 1.4-1 1.7zM9 1C6.8 1 5 2.8 5 5v1H3c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-2V5c0-2.2-1.8-4-4-4z" fill-rule="evenodd"></path></svg><span>Tekst źródłowy</span></a>';
 
			button += '<div class="wds-dropdown"><div class="wds-button wds-is-secondary wds-is-squished wds-dropdown__toggle"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned"><ul class="wds-list wds-is-linked">';
 
			curAction = actions.filter(function(action){return action.id === "page:History";})[0];
			if(curAction) button += '<li><a id="ca-history" href="'+curAction.href+'" data-tracking="ca-history-dropdown">'+curAction.caption+'</a></li>';
 
			curAction = actions.filter(function(action){return action.id === "page:Move";})[0];
			if(curAction) button += '<li><a id="ca-move" href="'+curAction.href+'" data-tracking="ca-move-dropdown">'+curAction.caption+'</a></li>'
 
			curAction = actions.filter(function(action){return action.id === "page:Protect";})[0];
			if(curAction) button += '<li><a id="ca-protect" href="'+curAction.href+'" data-tracking="ca-protect-dropdown">'+curAction.caption+'</a></li>';
 
			curAction = actions.filter(function(action){return action.id === "page:Delete";})[0];
			if(curAction) button += '<li><a id="ca-delete" href="'+curAction.href+'" data-tracking="ca-delete-dropdown">'+curAction.caption+'</a></li>';
 
			button += '</ul></div></div></div>';
			$(button).appendTo(".masthead-info hgroup").css({float: "right"});
		}
	}
});


$(function() {

	// Szablon:Aktualizacja
	var img = $('.pi-theme-update .pi-image img');
	img.attr('src', '/wiki/Special:Filepath/' + img.data('image-key'));
	img.attr('srcset', '/wiki/Special:Filepath/' + img.data('image-key'));

	// Kategorie w kafelkach
	$('.notitle a').attr('title', null)
});

	// Dynamiczne ramki oraz karty premium w infoboksach
mw.hook('wikipage.content').add(function($content) {

	function decodeFandomFileName(str) {
		if (!str) return '';

		str = String(str).trim();

		try {
			str = decodeURIComponent(str);
		} catch (e) {}

		return str.replace(/_((?:C[2-9A-F]|D[0-9A-F])_[89AB][0-9A-F]|E[0-9A-F](?:_[89AB][0-9A-F]){2}|F[0-4](?:_[89AB][0-9A-F]){3})/gi, function(match, bytes) {
			try {
				return decodeURIComponent('%' + bytes.replace(/_/g, '%'));
			} catch (e) {
				return match;
			}
		});
	}

	function formatWikiUrl(str) {
		if (!str) return '';

		return encodeURIComponent(decodeFandomFileName(str).replace(/ /g, '_'))
			.replace(/'/g, '%27')
			.replace(/\(/g, '%28')
			.replace(/\)/g, '%29')
			.replace(/!/g, '%21')
			.replace(/\*/g, '%2A')
			.replace(/~/g, '%7E');
	}

	$content.find('.pi-image[data-item-name="premium"]').each(function() {
		var $wrapper = $(this);
		var $videoImg = $wrapper.find('img[data-video-key]');
		var $infobox = $wrapper.closest('.portable-infobox');

		var $dataDiv = $infobox.nextAll('.card-infobox-data').first();
		var videoName = $dataDiv.attr('data-premium-video');

		if (!videoName && $videoImg.length) {
			videoName = $videoImg.attr('data-video-key');
		}

		videoName = decodeFandomFileName(videoName);

		if (videoName) {
			var videoUrl = '/Specjalna:Filepath/' + formatWikiUrl(videoName);

			var $video = $('<video>', {
				src: videoUrl,
				loop: true,
				class: 'pi-image-thumbnail'
			});

			$video.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
				var isFullscreen = (document.fullscreenElement === this ||
									document.webkitFullscreenElement === this ||
									document.mozFullScreenElement === this ||
									document.msFullscreenElement === this);

				this.controls = isFullscreen;
			});

			var $link = $wrapper.find('a.image');
			if ($link.length) {
				$link.empty().append($video);

				$link.on('click', function(e) {
					e.preventDefault();
					var videoElement = $video[0];
					if (videoElement.requestFullscreen) {
						videoElement.requestFullscreen();
					} else if (videoElement.webkitRequestFullscreen) {
						videoElement.webkitRequestFullscreen();
					} else if (videoElement.mozRequestFullScreen) {
						videoElement.mozRequestFullScreen();
					} else if (videoElement.msRequestFullscreen) {
						videoElement.msRequestFullscreen();
					}
				});
			} else {
				$wrapper.empty().append($video);
			}

			function zarzadzajOdtwarzaniem() {
				var isVisible = $wrapper.is(':visible') &&
								$wrapper.css('display') !== 'none' &&
								!$wrapper.hasClass('pi-image-collection-filter-hidden');

				var isPhysicallyVisible = $wrapper[0] && ($wrapper[0].offsetWidth > 0 || $wrapper[0].offsetHeight > 0);

				if (isVisible || isPhysicallyVisible) {
					if ($video[0].paused) {
						$video.prop('muted', false);
						$video.removeAttr('muted');
						$video[0].currentTime = 0;

						var playPromise = $video[0].play();
						if (playPromise !== undefined) {
							playPromise.catch(function(error) {
								$video.prop('muted', true);
								$video.attr('muted', 'muted');
								$video[0].play();
							});
						}
					}
				} else {
					if (!$video[0].paused) {
						$video[0].pause();
					}
				}
			}

			if ($infobox.length) {
				$infobox.on('click', function() {
					setTimeout(zarzadzajOdtwarzaniem, 20);
					setTimeout(zarzadzajOdtwarzaniem, 150);
					setTimeout(zarzadzajOdtwarzaniem, 400);
				});
			}

			setTimeout(zarzadzajOdtwarzaniem, 200);
		}
	});

	$content.find('.card-infobox-data').each(function() {
		var $data = $(this);
		var $infobox = $data.prevAll('.portable-infobox.type-card').first();

		if (!$infobox.length) return;

		var rodzaj = $data.attr('data-rodzaj');

		if (rodzaj === 'Umiejętność') return;

		var rzadkosc = $data.attr('data-rzadkosc');
		var frakcja = $data.attr('data-frakcja');
		var kolor = $data.attr('data-kolor');
		var sila = $data.attr('data-sila');
		var werbunek = $data.attr('data-werbunek');
		var pancerz = $data.attr('data-pancerz');

		if (!rzadkosc || !frakcja) return;

		var showSila = (rodzaj === 'Jednostka');
		var showWerbunek = (werbunek && werbunek !== '0' && werbunek !== '');
		var showPancerz = (pancerz && pancerz !== '0' && pancerz !== '');

		var bgRzadkosc = "url('/Specjalna:Filepath/Karta_rzadkość_" + formatWikiUrl(rzadkosc) + ".png')";
		var bgRodzaj = "url('/Specjalna:Filepath/Karta_rodzaj_" + formatWikiUrl(rodzaj) + ".png')";
		var bgKolor = "url('/Specjalna:Filepath/Karta_kolor_" + formatWikiUrl(kolor) + ".png')";

		var bgWerbunekIkona = showWerbunek ? "url('/Specjalna:Filepath/Karta_ikona_werbunku.png')" : "none";
		var bgWerbunekTlo = showWerbunek ? "url('/Specjalna:Filepath/Karta_tło_werbunku_" + formatWikiUrl(frakcja) + ".png')" : "none";
		var bgWerbunek = showWerbunek ? "url('/Specjalna:Filepath/Karta_koszt_werbunku_" + formatWikiUrl(werbunek) + ".png')" : "none";

		var bgSilaTlo = "url('/Specjalna:Filepath/Karta_tło_rodzaju_" + formatWikiUrl(frakcja) + ".png')";
		var bgSila = showSila ? "url('/Specjalna:Filepath/Karta_siła_" + formatWikiUrl(sila) + ".png')" : "none";
		var bgPancerzTlo = showPancerz ? "url('/Specjalna:Filepath/Karta_tło_pancerza.png')" : "none";
		var bgPancerz = showPancerz ? "url('/Specjalna:Filepath/Karta_pancerz_" + formatWikiUrl(pancerz) + ".png')" : "none";

		var style = $infobox[0].style;
		style.setProperty('--bg-rzadkosc', bgRzadkosc);
		style.setProperty('--bg-rodzaj', bgRodzaj);
		style.setProperty('--bg-sila-tlo', bgSilaTlo);
		style.setProperty('--bg-sila', bgSila);
		style.setProperty('--bg-kolor', bgKolor);
		style.setProperty('--bg-werbunek-ikona', bgWerbunekIkona);
		style.setProperty('--bg-werbunek-tlo', bgWerbunekTlo);
		style.setProperty('--bg-werbunek', bgWerbunek);
		style.setProperty('--bg-pancerz-tlo', bgPancerzTlo);
		style.setProperty('--bg-pancerz', bgPancerz);
	});
});