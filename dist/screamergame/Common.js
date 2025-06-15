/* Any JavaScript here will be loaded for all users on every page load. */

/* notification panel */

(function(window, $, mw) {
    if (window.notificationPanelInitialized) return;
    window.notificationPanelInitialized = true;

    const App = {
        config: {
            title: "Notification Panel",
            version: "v1.03",
        },
        state: {
            currentContentHash: null,
            isEditor: false,
        },

        simpleHash(str) {
            if (!str) return 0;
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = char + (hash << 6) + (hash << 16) - hash;
            }
            return hash;
        },
        
        markNewsAsRead() {
            $('#np-force-show-button').removeClass('sn-has-notification');
            localStorage.setItem('screamerNewsLastSeenHash', App.state.currentContentHash);
        },

        openPanel() {
            setTimeout(function() {
                $('#sn-container').addClass('is-visible');
            }, 10);
            $('#np-force-show-button').addClass('is-hidden');
            sessionStorage.setItem('screamerPanelView', 'panel');
            
            if ($('#sn-page-news').hasClass('sn-page--active')) {
                App.markNewsAsRead();
            }
        },

        closePanel() {
            $('#sn-container').removeClass('is-visible');
            $('#np-force-show-button').removeClass('is-hidden');
            sessionStorage.removeItem('screamerPanelView');
            // FIX: Do not remove the last tab from session storage to remember it across loads.
            // sessionStorage.removeItem('screamerPanelLastTab');
        },

        openModal() {
            $('#sn-modal-overlay').addClass('is-visible');
            sessionStorage.setItem('screamerPanelView', 'modal');
        },

        closeModal() {
            $('#sn-modal-overlay').removeClass('is-visible');
            sessionStorage.removeItem('screamerPanelView');
        },

        navigateTabs(e) {
            const $button = $(e.currentTarget);
            const targetPageId = $button.data('target');
            const $container = $button.closest('#sn-container');

            $container.find('.sn-page').removeClass('sn-page--active');
            $('#' + targetPageId).addClass('sn-page--active');
            sessionStorage.setItem('screamerPanelLastTab', targetPageId);

            if (targetPageId === 'sn-page-news') {
                App.markNewsAsRead();
            }

            let newTitle = 'News';
            switch (targetPageId) {
                case 'sn-page-menu': newTitle = 'Menu'; break;
                case 'sn-page-settings': newTitle = 'Settings'; break;
                case 'sn-page-help': newTitle = 'Help'; break;
                case 'sn-page-credits': newTitle = 'Credits'; break;
            }
            
            const $subHeader = $container.find('.sn-sub-header h3');
            $subHeader.fadeTo(100, 0, function() {
                $(this).text(newTitle).fadeTo(100, 1);
            });
        },

        saveCheckboxSetting() {
            const isChecked = $('#sn-hide-permanently').is(':checked');
            localStorage.setItem('screamerNewsShowPref', isChecked ? 'true' : 'false');
        },
        
        forceOpenToNews() {
            const $container = $('#sn-container');
            if (!$('#sn-page-news').hasClass('sn-page--active')) {
                $container.find('.sn-page').removeClass('sn-page--active');
                $('#sn-page-news').addClass('sn-page--active');
                $container.find('.sn-sub-header h3').text('News');
                sessionStorage.setItem('screamerPanelLastTab', 'sn-page-news');
            }
            App.openPanel();
        },
        
        handleBellClick() {
            const shouldAutoOpen = (localStorage.getItem('screamerNewsShowPref') !== 'false');
            if (shouldAutoOpen) {
                App.forceOpenToNews();
            } else {
                // FIX: Restore state *before* opening the panel to ensure the correct tab is active.
                App.restorePanelState();
                App.openPanel();
            }
        },
        
        restorePanelState() {
            const lastTab = sessionStorage.getItem('screamerPanelLastTab');
            if (lastTab && lastTab !== 'sn-page-news') {
                const $container = $('#sn-container');
                $container.find('.sn-page').removeClass('sn-page--active');
                $container.find('#' + lastTab).addClass('sn-page--active');
                
                let newTitle = 'News';
                 switch (lastTab) {
                    case 'sn-page-menu': newTitle = 'Menu'; break;
                    case 'sn-page-settings': newTitle = 'Settings'; break;
                    case 'sn-page-help': newTitle = 'Help'; break;
                    case 'sn-page-credits': newTitle = 'Credits'; break;
                 }
                $container.find('.sn-sub-header h3').text(newTitle);
            }
        },

        buildAndInit(data) {
            const $content = $('<div>').html(data);
            const liveMode = $content.find('#sn-live-mode').text().trim().toLowerCase() !== 'n';
            const isAuthorized = liveMode || App.state.isEditor;

            if (!isAuthorized) return;
            
            const isEditorMode = App.state.isEditor && !liveMode;
            const buttonClass = isEditorMode ? 'is-editor-mode' : '';
            $('body').append(`<div id="np-force-show-button" class="${buttonClass}" title="Show Notification Panel"></div>`);

            const snippetHTML = $content.find('.sn-snippet-content').html();
            const expandedHTML = $content.find('.sn-expanded-content').html();
            const helpHTML = $content.find('.sn-help-content').html() || 'Help content will be available soon.';
            const creditsHTML = $content.find('.sn-credits-content').html() || 'Credits will be available soon.';

            const $snippetClone = $content.find('.sn-snippet-content').clone();
            const $expandedClone = $content.find('.sn-expanded-content').clone();
            $expandedClone.find('#sn-read-more-visibility, #sn-live-mode').remove();
            App.state.currentContentHash = App.simpleHash($snippetClone.html() + $expandedClone.html());

            const editorModeIndicatorHTML = isEditorMode ? `<span class="sn-editor-mode">(Editor Mode)</span>` : '';
            const readMoreButtonHTML = $content.find('#sn-read-more-visibility').text().trim().toLowerCase() !== 'n' ? `<div id="sn-read-more" class="sn-nav-button">Read More</div>` : '';
            const shouldAutoOpen = (localStorage.getItem('screamerNewsShowPref') !== 'false');
            const isCheckedAttribute = shouldAutoOpen ? 'checked' : '';
            const modalTitle = $content.find('.sn-modal-title-override').first().html() || 'New Updates';

            const panelHTML = `
                <div id="sn-container">
                    <div class="sn-header">
                        <div class="sn-title-wrapper"><span class="sn-version">${App.config.version}</span><p class="sn-title">${App.config.title}</p>${editorModeIndicatorHTML}</div>
                        <div id="sn-close-button" class="sn-close"></div>
                    </div>
                    <div class="sn-sub-header"><h3>News</h3></div>
                    <div class="sn-page-container">
                        <div id="sn-page-news" class="sn-page sn-page--active"><div class="sn-content">${snippetHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div>${readMoreButtonHTML}</div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-menu" class="sn-page"><div class="sn-content-body"><div class="sn-nav-button" data-target="sn-page-news">News</div><div class="sn-nav-button" data-target="sn-page-settings">Settings</div><div class="sn-nav-button" data-target="sn-page-help">Help</div><div class="sn-nav-button" data-target="sn-page-credits">Credits</div></div><div class="sn-footer"><div class="sn-options"></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-settings" class="sn-page"><div class="sn-content-body"><div class="sn-options"><input type="checkbox" id="sn-hide-permanently" ${isCheckedAttribute}><label for="sn-hide-permanently">Automatically open the Notification Panel to the News tab when the news is updated</label></div></div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-help" class="sn-page"><div class="sn-content">${helpHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-credits" class="sn-page"><div class="sn-content">${creditsHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                    </div>
                </div>
                <div id="sn-modal-overlay">
                    <div class="sn-modal-wrapper">
                        <div id="sn-modal-close-button" class="sn-close sn-close--modal"></div>
                        <div class="sn-header sn-header--modal"><h2>${modalTitle}</h2></div>
                        <div class="sn-content sn-content--modal">${expandedHTML}</div>
                        <div class="sn-footer sn-footer--modal"><img src="https://static.wikia.nocookie.net/screamergame/images/1/12/Logo_Screamer_%282026%29.png/revision/latest" class="sn-footer-logo-large" alt="Screamer Logo" /></div>
                    </div>
                </div>
            `;
            $('body').append(panelHTML);

            $('#sn-container a, #sn-modal-overlay a').each(function() {
                const $link = $(this);
                const href = $link.attr('href');
                if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                    $link.attr({
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    });
                }
            });

            const lastSeenHash = localStorage.getItem('screamerNewsLastSeenHash');
            const isNewContent = lastSeenHash != App.state.currentContentHash;
            const persistedView = sessionStorage.getItem('screamerPanelView');

            if (persistedView === 'modal') {
                App.openModal();
            } else if (isNewContent && shouldAutoOpen) {
                App.forceOpenToNews();
                // FIX: Explicitly mark as read to prevent the notification icon from reappearing.
                App.markNewsAsRead();
            } else if (persistedView === 'panel') {
                App.restorePanelState();
                App.openPanel();
                if (isNewContent) {
                    $('#np-force-show-button').addClass('sn-has-notification');
                }
            } else if (isNewContent) {
                $('#np-force-show-button').addClass('sn-has-notification');
            }
        },

        init() {
            if (new URLSearchParams(window.location.search).has('newsbox')) return;

            App.state.isEditor = (mw.config.get('wgUserGroups') || []).some(g =>
                ['sysop', 'content-moderator', 'administrator'].includes(g));

            $(document)
                .on('click', '#np-force-show-button', App.handleBellClick)
                .on('click', '#sn-close-button', App.closePanel)
                .on('click', '#sn-read-more', App.openModal)
                .on('click', '#sn-modal-close-button', App.closeModal)
                .on('click', '.sn-nav-button:not(#sn-read-more)', App.navigateTabs)
                .on('change', '#sn-hide-permanently', App.saveCheckboxSetting);

            $.get('/wiki/Template:ScreamerNews?action=render&cb=' + new Date().getTime())
                .done(App.buildAndInit)
                .fail(() => console.error('Notification Panel: Failed to load template.'));
        }
    };

    $(App.init);

})(window, jQuery, mediaWiki);

/* audio player */

$(function() {
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        if (isNaN(secs) || isNaN(minutes)) {
            return '0:00';
        }
        return minutes + ':' + (secs < 10 ? '0' : '') + secs;
    }

    $('.structured-quote-sound .mw-file-element').each(function() {
        var originalPlayer = $(this).get(0);
        var soundContainer = $(this).parent();
        
        $(this).hide();

        var customPlayerHTML = `
            <div class="cap-player">
                <button class="cap-play-pause">
                    <svg class="play-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>
                    <svg class="pause-icon" viewBox="0 0 24 24" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
                <div class="cap-time">
                    <span class="cap-current-time">0:00</span>
                    <span class="cap-separator"> / </span>
                    <span class="cap-duration">0:00</span>
                </div>
                <div class="cap-progress-wrap">
                    <div class="cap-progress-bar"></div>
                </div>
                <div class="cap-volume-wrap">
                    <button class="cap-volume-btn">
                        <svg class="vol-icon-high" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                        <svg class="vol-icon-muted" viewBox="0 0 24 24" style="display:none;"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                    </button>
                    <div class="cap-volume-slider-wrap">
                        <input type="range" class="cap-volume-slider" min="0" max="1" step="0.05" value="1">
                    </div>
                </div>
            </div>
        `;

        var customPlayer = $(customPlayerHTML).appendTo(soundContainer);
        var playPauseBtn = customPlayer.find('.cap-play-pause');
        var currentTimeEl = customPlayer.find('.cap-current-time');
        var durationEl = customPlayer.find('.cap-duration');
        var progressWrap = customPlayer.find('.cap-progress-wrap');
        var progressBar = customPlayer.find('.cap-progress-bar');
        var volumeBtn = customPlayer.find('.cap-volume-btn');
        var volumeSlider = customPlayer.find('.cap-volume-slider');
        var volIconHigh = customPlayer.find('.vol-icon-high');
        var volIconMuted = customPlayer.find('.vol-icon-muted');
        var lastVolume = 1;
        
        var savedVolume = localStorage.getItem('customAudioPlayerVolume');
        if (savedVolume !== null) {
            var newVolume = parseFloat(savedVolume);
            originalPlayer.volume = newVolume;
            originalPlayer.muted = newVolume === 0;
            lastVolume = newVolume > 0 ? newVolume : 1;
        }

        var setDuration = function() {
            durationEl.text(formatTime(originalPlayer.duration));
        };

        if (originalPlayer.readyState > 0) {
            setDuration();
        } else {
            originalPlayer.addEventListener('loadedmetadata', setDuration);
        }

        originalPlayer.addEventListener('timeupdate', function() {
            currentTimeEl.text(formatTime(originalPlayer.currentTime));
            var progress = (originalPlayer.currentTime / originalPlayer.duration) * 100;
            progressBar.css('width', progress + '%');
        });

        originalPlayer.addEventListener('ended', function() {
            playPauseBtn.find('.pause-icon').hide();
            playPauseBtn.find('.play-icon').show();
            progressBar.css('width', '0%');
            currentTimeEl.text(formatTime(0));
        });

        playPauseBtn.on('click', function() {
            if (originalPlayer.paused) {
                originalPlayer.play();
                playPauseBtn.find('.play-icon').hide();
                playPauseBtn.find('.pause-icon').show();
            } else {
                originalPlayer.pause();
                playPauseBtn.find('.pause-icon').hide();
                playPauseBtn.find('.play-icon').show();
            }
        });
        
        progressWrap.on('click', function(e) {
            var rect = this.getBoundingClientRect();
            var clickX = e.clientX - rect.left;
            var newTime = (clickX / rect.width) * originalPlayer.duration;
            originalPlayer.currentTime = newTime;
        });

        volumeSlider.on('input', function() {
            var newVolume = parseFloat(this.value);
            originalPlayer.volume = newVolume;
            originalPlayer.muted = newVolume === 0;
            localStorage.setItem('customAudioPlayerVolume', newVolume);
        });
        
        originalPlayer.addEventListener('volumechange', function() {
            var currentVolume = originalPlayer.muted ? 0 : originalPlayer.volume;
            volumeSlider.val(currentVolume);
            if (currentVolume > 0) {
                lastVolume = currentVolume;
                volIconMuted.hide();
                volIconHigh.show();
            } else {
                volIconHigh.hide();
                volIconMuted.show();
            }
        });
        
        volumeBtn.on('click', function() {
           if (originalPlayer.muted || originalPlayer.volume === 0) {
               var volumeToRestore = lastVolume > 0 ? lastVolume : 1;
               originalPlayer.muted = false;
               originalPlayer.volume = volumeToRestore;
               localStorage.setItem('customAudioPlayerVolume', volumeToRestore);
           } else {
               originalPlayer.muted = true;
               localStorage.setItem('customAudioPlayerVolume', 0);
           }
        });
    });
});

/* navbox animations */

jQuery(function($) {
    'use strict';

    var FADE_DURATION = 400;
    var SLIDE_DURATION = 400;

    var $navboxWrapper = $('#screamer-navbox-wrapper');
    if (!$navboxWrapper.length) {
        return;
    }

    $navboxWrapper.on('click', '.mw-collapsible-toggle a', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $toggle = $(this);
        var $toggleText = $toggle.find('.mw-collapsible-text');
        var $header = $toggle.closest('.mw-collapsible');

        if ($header.hasClass('is-animating')) {
            return;
        }
        $header.addClass('is-animating');

        var $contentToAnimate;
        if ($header.is('table')) {
            $contentToAnimate = $header.children('tbody');
        } else {
            $contentToAnimate = $header.nextUntil('.mw-collapsible');
        }

        if (!$contentToAnimate.length) {
            $header.removeClass('is-animating');
            return;
        }

        var isCurrentlyVisible = $contentToAnimate.first().is(':visible');

        if (isCurrentlyVisible) {
            $toggleText.text('Show');
            $contentToAnimate.animate({ opacity: 0 }, FADE_DURATION, function() {
                $contentToAnimate.slideUp(SLIDE_DURATION, function() {
                    $header.addClass('mw-collapsed').removeClass('is-animating');
                });
            });
        } else {
            $toggleText.text('Hide');
            $contentToAnimate.hide().css('opacity', 0);
            
            $contentToAnimate.slideDown(SLIDE_DURATION, function() {
                $contentToAnimate.animate({ opacity: 1 }, FADE_DURATION, function() {
                    $header.removeClass('mw-collapsed').removeClass('is-animating');
                });
            });
        }
    });
});

/* importArticles JS extensions */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WdsTabs.js',
        'u:dev:MediaWiki:Toggler.js',
        'u:dev:WdsTooltips.js',
        'u:dev:DiscordIntegrator/code.js'
    ]
});