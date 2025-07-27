/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function() {
  if (document.querySelector('.screamer-corner-icon')) {
    document.body.classList.add('has-corner-icon');
  }
});

/* notification panel */

(function(window, $, mw) {
    if (window.notificationPanelInitialized) return;
    window.notificationPanelInitialized = true;

    const App = {
        config: {
            title: "Notification Panel",
            version: "v1.06",
            tabNames: {
                'sn-page-news': 'News',
                'sn-page-menu': 'Menu',
                'sn-page-settings': 'Settings',
                'sn-page-help': 'Help',
                'sn-page-credits': 'Credits',
                'sn-page-debug': 'Debug'
            },
            editorTabs: ['sn-page-debug']
        },
        state: {
            currentContentHash: null,
            isEditor: false,
            isAsNonEditor: false,
            asNonEditorTimeout: null,
            currentLiveStatus: null,
            needsRefresh: false
        },

        accessManager: {
            liveStatusPoller: null,
            accessCheckPoller: null,
            init: function() {
                App.accessManager.liveStatusPoller = setInterval(App.accessManager.pollLiveStatus, 60000);
                App.accessManager.pollLiveStatus();
            },
            pollLiveStatus: function() {
                $.get('/wiki/Template:ScreamerNews?action=raw&cb=' + new Date().getTime())
                    .done(function(data) {
                        const match = /id="sn-live-mode"[^>]*>([^<]+)<\/span>/.exec(data);
                        const liveModeContent = match ? match[1].trim().toLowerCase() : '';
                        const liveModeEnabled = liveModeContent !== 'n';

                        if (App.state.currentLiveStatus === liveModeEnabled) return;
                        App.state.currentLiveStatus = liveModeEnabled;

                        if (liveModeEnabled) {
                            App.accessManager.restoreAccess();
                        } else {
                            App.accessManager.startAccessCheck();
                        }
                    })
                    .fail(function() {
                        if (App.state.currentLiveStatus === false) return;
                        App.state.currentLiveStatus = false;
                        App.accessManager.startAccessCheck();
                    });
            },
            startAccessCheck: function() {
                App.accessManager.stopAccessCheck();
                App.accessManager.accessCheckPoller = setInterval(function() {
                    if (App.isEffectivelyNonEditor()) {
                        App.accessManager.enforceDenial();
                        App.accessManager.stopAccessCheck();
                    } else {
                        App.accessManager.stopAccessCheck();
                    }
                }, 5000);
                if (App.isEffectivelyNonEditor()) {
                    App.accessManager.enforceDenial();
                }
            },
            stopAccessCheck: function() {
                if (App.accessManager.accessCheckPoller) {
                    clearInterval(App.accessManager.accessCheckPoller);
                    App.accessManager.accessCheckPoller = null;
                }
            },
            enforceDenial: function() {
                if ($('#sn-container').hasClass('is-visible')) {
                    $('#sn-close-button').trigger('click');
                }
                App.fadeSwapBellIcon(function($bell) {
                    const hasNotif = $bell.hasClass('sn-has-notification');
                    $bell.removeClass('is-editor-mode').addClass('is-maintenance-mode');
                    if (hasNotif) {
                        $bell.addClass('sn-has-notification');
                    }
                });
            },
            restoreAccess: function() {
                App.accessManager.stopAccessCheck();
                if (!App.state.isEditor) {
                    App.state.needsRefresh = true;
                }
                
                if (localStorage.getItem('screamerPanelPersistAsNonEditorPref') === 'true') {
                    localStorage.removeItem('screamerPanelPersistAsNonEditorPref');
                    $('#np-persist-as-non-editor-checkbox').prop('checked', false);
                }

                if ($('#sn-as-non-editor-checkbox').is(':checked')) {
                    App.disableAsNonEditorMode();
                }
                App.updateBellIcon();
            },
        },
        
        fadeSwapBellIcon: function(updateCallback) {
            const $bell = $('#np-force-show-button');
            if (!$bell.length) return;
            
            $bell.css('opacity', 0);
            setTimeout(function() {
                updateCallback($bell);
                $bell.css('opacity', 1);
            }, 400);
        },

        updateBellIcon: function() {
            App.fadeSwapBellIcon(function($bell) {
                const isEditorInMaint = App.state.isEditor && !App.state.currentLiveStatus;
                $bell.removeClass('is-editor-mode is-maintenance-mode');
                if (isEditorInMaint) {
                    $bell.addClass('is-editor-mode');
                }
            });
        },

        isEffectivelyNonEditor: function() {
            return !App.state.isEditor || App.state.isAsNonEditor;
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
            $('#np-force-show-button').addClass('is-hidden');
            sessionStorage.setItem('screamerPanelView', 'panel');

            if (App.state.isEditor) {
                const $bell = $('#np-force-show-button');
                const $debugCheckbox = $('#sn-debug-maint-checkbox');
                if ($debugCheckbox.length) {
                    $debugCheckbox.prop('checked', $bell.hasClass('is-maintenance-mode'));
                }
            }
            
            setTimeout(function() {
                $('#sn-container').addClass('is-visible');
            }, 50);
        },

        closePanel() {
            if (App.state.isEditor) App.saveFailsafeTimer();
            $('#sn-container').removeClass('is-visible');
            $('#np-force-show-button').removeClass('is-hidden');
            sessionStorage.removeItem('screamerPanelView');
        },

        openModal() {
            $('#sn-modal-overlay').addClass('is-visible');
            sessionStorage.setItem('screamerPanelView', 'modal');
        },

        closeModal() {
            $('#sn-modal-overlay').removeClass('is-visible');
            sessionStorage.removeItem('screamerPanelView');
        },

        navigateToTabById(targetPageId, $container) {
            $container = $container || $('#sn-container');
            if ($container.find('#' + targetPageId).length) {
                $container.find('.sn-page').removeClass('sn-page--active');
                $container.find('#' + targetPageId).addClass('sn-page--active');
                
                const $subHeaderH3 = $container.find('.sn-sub-header h3');
                $subHeaderH3.fadeTo(100, 0, function() {
                    $(this).text(App.config.tabNames[targetPageId] || '').fadeTo(100, 1);
                });
                
                sessionStorage.setItem('screamerPanelLastTab', targetPageId);
            }
        },

        navigateTabs(e) {
            if (App.state.isEditor) App.saveFailsafeTimer();
            const $button = $(e.currentTarget);
            const targetPageId = $button.data('target');
            App.navigateToTabById(targetPageId, $button.closest('#sn-container'));
        },

        saveCheckboxSetting() {
            const isChecked = $('#sn-hide-permanently').is(':checked');
            localStorage.setItem('screamerNewsShowPref', isChecked ? 'true' : 'false');
        },
        
        saveResetOnCloseSetting() {
            const isChecked = $('#sn-reset-on-close').is(':checked');
            localStorage.setItem('screamerPanelResetOnClose', isChecked ? 'true' : 'false');
        },
        
        saveFailsafeTimer() {
            let newTime = parseInt($('#np-failsafe-input').val(), 10);
            if (isNaN(newTime) || newTime < 1) {
                newTime = 1;
            } else if (newTime > 600) {
                newTime = 600;
            }
            $('#np-failsafe-input').val(newTime);
            localStorage.setItem('screamerPanelFailsafeTime', newTime);

            if (App.state.isAsNonEditor) {
                clearTimeout(App.state.asNonEditorTimeout);
                const failsafeTime = newTime * 1000;
                const expiration = Date.now() + failsafeTime;
                
                if (localStorage.getItem('screamerPanelPersistAsNonEditorPref') === 'true') {
                    sessionStorage.setItem('screamerPanelFailsafeTimestamp', expiration);
                }
                
                App.state.asNonEditorTimeout = setTimeout(function() {
                    App.disableAsNonEditorMode();
                }, failsafeTime);
            }
        },

        savePersistenceSetting() {
            const isChecked = $('#np-persist-as-non-editor-checkbox').is(':checked');
            localStorage.setItem('screamerPanelPersistAsNonEditorPref', isChecked ? 'true' : 'false');
        },

        forceOpenToNews() {
            App.navigateToTabById('sn-page-news');
            App.openPanel();
        },

        handleBellClick(e) {
            const autoOpenPref = (localStorage.getItem('screamerNewsShowPref') !== 'false');
            const lastSeenHash = localStorage.getItem('screamerNewsLastSeenHash');
            const isNewContent = lastSeenHash != App.state.currentContentHash;
            
            if (autoOpenPref && isNewContent && !$(e.currentTarget).hasClass('is-maintenance-mode')) {
                App.forceOpenToNews();
                return;
            }

            const resetOnClose = (localStorage.getItem('screamerPanelResetOnClose') === 'true');
            let tabToOpen = sessionStorage.getItem('screamerPanelLastTab');

            if (resetOnClose || !tabToOpen) {
                 tabToOpen = localStorage.getItem('screamerPanelDefaultTab') || 'sn-page-news';
            }
            
            App.navigateToTabById(tabToOpen);
            App.openPanel();
        },

        restorePanelState() {
            const lastTab = sessionStorage.getItem('screamerPanelLastTab');
            if (lastTab) {
                App.navigateToTabById(lastTab);
            } else {
                const defaultTab = localStorage.getItem('screamerPanelDefaultTab') || 'sn-page-news';
                App.navigateToTabById(defaultTab);
            }
        },

        handleMaintDebugToggle() {
            App.fadeSwapBellIcon(function($bell) {
                const isChecked = $('#sn-debug-maint-checkbox').is(':checked');
                if (isChecked) {
                    $bell.removeClass('is-editor-mode sn-has-notification').addClass('is-maintenance-mode');
                    $bell.attr('title', '');
                } else {
                    $bell.removeClass('is-maintenance-mode').addClass('is-editor-mode');
                    $bell.attr('title', 'Show Notification Panel');
                }
            });
        },

        disableAsNonEditorMode: function() {
            $('#sn-as-non-editor-checkbox').prop('checked', false);
            clearTimeout(App.state.asNonEditorTimeout);
            App.state.isAsNonEditor = false;
            $('#np-exit-as-non-editor').hide();
            $('#np-non-editor-options-modal').removeClass('is-visible');
            sessionStorage.removeItem('screamerPanelFailsafeTimestamp');
            App.updateBellIcon();
            App.accessManager.stopAccessCheck();
        },

        toggleAsNonEditor: function() {
            const isChecked = $('#sn-as-non-editor-checkbox').is(':checked');
            
            if (isChecked) {
                App.state.isAsNonEditor = true;
                $('#np-exit-as-non-editor').show();
                App.accessManager.startAccessCheck();
                
                const failsafeTime = (parseInt(localStorage.getItem('screamerPanelFailsafeTime'), 10) || 60) * 1000;
                const expiration = Date.now() + failsafeTime;
                
                if (localStorage.getItem('screamerPanelPersistAsNonEditorPref') === 'true') {
                    sessionStorage.setItem('screamerPanelFailsafeTimestamp', expiration);
                }
                
                App.state.asNonEditorTimeout = setTimeout(function() {
                    App.disableAsNonEditorMode();
                }, failsafeTime);
            } else {
                App.disableAsNonEditorMode();
            }
        },
        
        updateDefaultTabStatus(fade) {
            const defaultTabId = localStorage.getItem('screamerPanelDefaultTab') || 'sn-page-news';
            const tabName = App.config.tabNames[defaultTabId] || 'News';
            const $status = $('#sn-default-tab-status');
            const newText = 'The default tab is currently ' + tabName + '.';
            
            if (fade) {
                $status.removeClass('is-visible');
                setTimeout(function() {
                    $status.text(newText).addClass('is-visible');
                }, 300);
            } else {
                $status.text(newText);
            }
        },
        
        populateDefaultTabDropdown() {
            const $dropdown = $('#sn-default-tab-dropdown');
            $dropdown.empty();
            const currentDefault = localStorage.getItem('screamerPanelDefaultTab') || 'sn-page-news';
            
            $('.sn-page').each(function() {
                const pageId = this.id;
                if (!pageId || App.config.editorTabs.includes(pageId) || pageId === currentDefault) {
                    return;
                }
                const tabName = App.config.tabNames[pageId] || pageId;
                $dropdown.append(
                    $('<div>', {
                        'class': 'sn-dropdown-option',
                        'text': tabName,
                        'data-target': pageId
                    })
                );
            });
        },

        setDefaultTab(e) {
            const newDefaultTabId = $(e.currentTarget).data('target');
            localStorage.setItem('screamerPanelDefaultTab', newDefaultTabId);
            App.updateDefaultTabStatus(true);
            $('#sn-default-tab-dropdown').slideUp(200);
        },

        buildAndInit(data) {
            const $content = $('<div>').html(data);
            const liveMode = $content.find('#sn-live-mode').text().trim().toLowerCase() !== 'n';
            App.state.currentLiveStatus = liveMode;

            if (!liveMode && App.isEffectivelyNonEditor()) {
                $('body').append('<div id="np-force-show-button" class="is-maintenance-mode"></div>');
                $('body').append('<div id="sn-maint-tooltip">The Notification Panel is currently under maintenance.</div>');
                if (App.state.isEditor) {
                     $('body').append('<div id="np-exit-as-non-editor" style="display: block;"></div>');
                }
                return;
            }
            
            $('body').append('<div id="np-force-show-button" title="Show Notification Panel"></div>');
            $('body').append('<div id="sn-maint-tooltip">The Notification Panel is currently under maintenance.</div>');
            $('body').append('<div id="np-exit-as-non-editor"></div>');
            
            App.updateBellIcon();

            const snippetHTML = $content.find('.sn-snippet-content').html();
            const expandedHTML = $content.find('.sn-expanded-content').html();
            const helpHTML = $content.find('.sn-help-content').html() || 'Help content will be available soon.';
            const creditsHTML = $content.find('.sn-credits-content').html() || 'Credits will be available soon.';

            const $snippetClone = $content.find('.sn-snippet-content').clone();
            const $expandedClone = $content.find('.sn-expanded-content').clone();
            $expandedClone.find('#sn-read-more-visibility, #sn-live-mode').remove();
            App.state.currentContentHash = App.simpleHash($snippetClone.html() + $expandedClone.html());

            const editorModeIndicatorHTML = (App.state.isEditor && !App.state.currentLiveStatus) ? `<span class="sn-editor-mode">(Editor Mode)</span>` : '';
            const readMoreButtonHTML = $content.find('#sn-read-more-visibility').text().trim().toLowerCase() !== 'n' ? `<div id="sn-read-more" class="sn-nav-button">Read More</div>` : '';
            
            const autoOpenPref = (localStorage.getItem('screamerNewsShowPref') !== 'false');
            const autoOpenChecked = autoOpenPref ? 'checked' : '';
            
            const resetOnClosePref = (localStorage.getItem('screamerPanelResetOnClose') === 'true');
            const resetOnCloseChecked = resetOnClosePref ? 'checked' : '';
            
            const persistAsNonEditorPref = (localStorage.getItem('screamerPanelPersistAsNonEditorPref') === 'true');
            const persistAsNonEditorChecked = persistAsNonEditorPref ? 'checked' : '';
            
            const failsafeTime = localStorage.getItem('screamerPanelFailsafeTime') || 60;

            const modalTitle = $content.find('.sn-modal-title-override').first().html() || 'New Updates';

            const debugPageContent = `
                <div class="sn-setting-item">
                    <div class="sn-options" style="justify-content: flex-start;">
                        <input type="checkbox" id="sn-debug-maint-checkbox">
                        <label for="sn-debug-maint-checkbox" class="sn-checkbox-label">Enable maintenance icon</label>
                    </div>
                </div>
                <div class="sn-setting-item">
                    <div class="sn-options" style="justify-content: space-between; align-items: center;">
                        <div>
                           <input type="checkbox" id="sn-as-non-editor-checkbox">
                           <label for="sn-as-non-editor-checkbox" class="sn-checkbox-label">Appear as non-editor</label>
                        </div>
                        <div id="np-non-editor-options-button" class="sn-nav-button">Options</div>
                    </div>
                    <div id="np-non-editor-options-modal">
                        <div class="sn-setting-item">
                            <label for="np-failsafe-input">Failsafe timer (1-600s). Default: 60.</label>
                            <input type="number" id="np-failsafe-input" min="1" max="600" value="${failsafeTime}">
                        </div>
                        <div class="sn-setting-item">
                            <div class="sn-options" style="justify-content: flex-start;">
                                <input type="checkbox" id="np-persist-as-non-editor-checkbox" ${persistAsNonEditorChecked}>
                                <label for="np-persist-as-non-editor-checkbox" class="sn-checkbox-label">Persist after refresh (will not persist in new tabs).</label>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const isEditorMode = App.state.isEditor && !liveMode;
            const debugNavButtonHTML = isEditorMode ? `<div class="sn-nav-button" data-target="sn-page-debug">Debug</div>` : '';
            const debugPageHTML = isEditorMode ? `
                <div id="sn-page-debug" class="sn-page">
                    <div class="sn-content-body" style="justify-content: flex-start; flex-direction: column; gap: 0;">
                        ${debugPageContent}
                    </div>
                    <div class="sn-footer">
                        <div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div>
                        <div class="sn-read-more-placeholder">&nbsp;</div>
                    </div>
                </div>` : '';

            const settingsPageContent = `
                <div class="sn-setting-item">
                    <div class="sn-options">
                        <input type="checkbox" id="sn-hide-permanently" ${autoOpenChecked}>
                        <label for="sn-hide-permanently" class="sn-checkbox-label">Automatically open the Notification Panel to the News tab when the news is updated</label>
                    </div>
                </div>
                <div class="sn-setting-item">
                    <div id="sn-default-tab-wrapper">
                         <div id="sn-default-tab-button" class="sn-nav-button">Set Default Tab</div>
                         <div id="sn-default-tab-dropdown"></div>
                    </div>
                </div>
                <div class="sn-setting-item">
                    <div class="sn-options" style="justify-content: flex-start;">
                        <input type="checkbox" id="sn-reset-on-close" ${resetOnCloseChecked}>
                        <label for="sn-reset-on-close" class="sn-checkbox-label">Load the default tab if the panel is closed</label>
                    </div>
                </div>
            `;
            
            const panelHTML = `
                <div id="sn-container">
                    <div class="sn-header">
                        <div class="sn-title-wrapper"><span class="sn-version">${App.config.version}</span><p class="sn-title">${App.config.title}</p>${editorModeIndicatorHTML}</div>
                        <div id="sn-close-button" class="sn-close"></div>
                    </div>
                    <div class="sn-sub-header"><h3>News</h3></div>
                    <div class="sn-page-container">
                        <div id="sn-page-news" class="sn-page sn-page--active"><div class="sn-content">${snippetHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div>${readMoreButtonHTML}</div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-menu" class="sn-page"><div class="sn-content-body"><div class="sn-nav-button" data-target="sn-page-news">News</div><div class="sn-nav-button" data-target="sn-page-settings">Settings</div><div class="sn-nav-button" data-target="sn-page-help">Help</div><div class="sn-nav-button" data-target="sn-page-credits">Credits</div>${debugNavButtonHTML}</div><div class="sn-footer"><div class="sn-options"></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-settings" class="sn-page"><div class="sn-content-body" style="justify-content: flex-start; flex-direction: column; gap: 0;">${settingsPageContent}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div><div id="sn-default-tab-status"></div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-help" class="sn-page"><div class="sn-content">${helpHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        <div id="sn-page-credits" class="sn-page"><div class="sn-content">${creditsHTML}</div><div class="sn-footer"><div class="sn-options"><div class="sn-nav-button" data-target="sn-page-menu">Menu</div></div><div class="sn-read-more-placeholder">&nbsp;</div></div></div>
                        ${debugPageHTML}
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

            App.updateDefaultTabStatus(false);

            const newsTabNode = document.getElementById('sn-page-news');
            if (newsTabNode) {
                const observer = new MutationObserver(function(mutationsList) {
                    for (const mutation of mutationsList) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (mutation.target.classList.contains('sn-page--active')) {
                                App.markNewsAsRead();
                            }
                        }
                    }
                });
                observer.observe(newsTabNode, { attributes: true });
            }

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
            } else if (isNewContent && autoOpenPref) {
                App.forceOpenToNews();
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

        init: function() {
            if (new URLSearchParams(window.location.search).has('newsbox')) return;

            App.state.isEditor = (mw.config.get('wgUserGroups') || []).some(g =>
                ['sysop', 'content-moderator', 'administrator'].includes(g));
            
            $.get('/wiki/Template:ScreamerNews?action=render&cb=' + new Date().getTime())
                .done(function(data) {
                    let resumeAsNonEditor = false;
                    let remainingTime = 0;
                    if (localStorage.getItem('screamerPanelPersistAsNonEditorPref') === 'true' && App.state.isEditor) {
                        const timestamp = sessionStorage.getItem('screamerPanelFailsafeTimestamp');
                        if (timestamp) {
                            remainingTime = parseInt(timestamp, 10) - Date.now();
                            if (remainingTime > 0) {
                                resumeAsNonEditor = true;
                            } else {
                                sessionStorage.removeItem('screamerPanelFailsafeTimestamp');
                            }
                        }
                    }
                    
                    App.buildAndInit(data);

                    $(document)
                        .on('click', '#np-force-show-button', function(e) {
                            if (App.state.needsRefresh) {
                                location.reload();
                                return;
                            }
                            if (App.isEffectivelyNonEditor() && $(this).hasClass('is-maintenance-mode')) {
                                return;
                            }
                            App.handleBellClick(e);
                        })
                        .on('mouseenter', '#np-force-show-button', function() {
                            const $bell = $(this);
                            if ($bell.hasClass('is-maintenance-mode')) {
                                const $tooltip = $('#sn-maint-tooltip');
                                const bellRect = $bell[0].getBoundingClientRect();
                                
                                $tooltip.addClass('is-visible');
                                const tooltipRect = $tooltip[0].getBoundingClientRect();
        
                                const top = bellRect.top - tooltipRect.height - 8;
                                const left = bellRect.left;
                                
                                $tooltip.css({
                                    top: top + 'px',
                                    left: left + 'px',
                                });
                            }
                        })
                        .on('mouseleave', '#np-force-show-button', function() {
                            $('#sn-maint-tooltip').removeClass('is-visible');
                        })
                        .on('click', '#sn-close-button', App.closePanel)
                        .on('click', '#sn-read-more', App.openModal)
                        .on('click', '#sn-modal-close-button', App.closeModal)
                        .on('click', '.sn-nav-button:not(#sn-read-more)', App.navigateTabs)
                        .on('change', '#sn-hide-permanently', App.saveCheckboxSetting)
                        .on('change', '#sn-debug-maint-checkbox', App.handleMaintDebugToggle)
                        .on('change', '#sn-reset-on-close', App.saveResetOnCloseSetting)
                        .on('change', '#sn-as-non-editor-checkbox', App.toggleAsNonEditor)
                        .on('change', '#np-persist-as-non-editor-checkbox', App.savePersistenceSetting)
                        .on('click', '#np-exit-as-non-editor', function() {
                            if (!App.state.isEditor) return;
                            App.disableAsNonEditorMode();
                        })
                        .on('click', '#np-non-editor-options-button', function() {
                            $('#np-non-editor-options-modal').toggleClass('is-visible');
                        })
                        .on('change blur', '#np-failsafe-input', App.saveFailsafeTimer)
                        .on('click', '#sn-default-tab-button', function() {
                            App.populateDefaultTabDropdown();
                            $('#sn-default-tab-dropdown').slideToggle(200);
                        })
                        .on('click', '#sn-default-tab-dropdown .sn-dropdown-option', App.setDefaultTab)
                        .on('mouseenter', '#sn-default-tab-wrapper', function() {
                            App.updateDefaultTabStatus(false);
                            $('#sn-default-tab-status').addClass('is-visible');
                        })
                        .on('mouseleave', '#sn-default-tab-wrapper', function() {
                            $('#sn-default-tab-status').removeClass('is-visible');
                        });
                    
                    if (resumeAsNonEditor) {
                        App.state.isAsNonEditor = true;
                        $('#sn-as-non-editor-checkbox').prop('checked', true);
                        $('#np-exit-as-non-editor').show();
                        App.accessManager.enforceDenial();
                        App.state.asNonEditorTimeout = setTimeout(function() {
                            App.disableAsNonEditorMode();
                        }, remainingTime);
                    }
        
                    App.accessManager.init();
                })
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

/* vehicle viewer */

(function() {
    'use strict';

    function initVehicleViewer() {
        const container = document.querySelector('.vv-container');
        if (!container) return;

        const infoBlocks = container.querySelectorAll('.vv-info-block');
        const images = container.querySelectorAll('.vv-image');
        const liveryButtons = container.querySelector('.vv-livery-selectors');

        let state = {
            car: 'horizon',
            team: 'angels',
            view: 'front'
        };

        function updateDisplay() {
            const currentCarButton = container.querySelector(`.vv-car-button[data-car="${state.car}"]`);
            if (!currentCarButton) return;

            const isBonus = currentCarButton.dataset.isBonus === 'true';

            infoBlocks.forEach(block => block.classList.toggle('active', block.dataset.car === state.car));
            container.querySelectorAll('.vv-car-button').forEach(btn => btn.classList.toggle('active', btn.dataset.car === state.car));
            container.querySelectorAll('.vv-view-button').forEach(btn => btn.classList.toggle('active', btn.dataset.view === state.view));

            liveryButtons.classList.toggle('hidden', isBonus);
            if (!isBonus) {
                liveryButtons.querySelectorAll('.vv-livery-button').forEach(btn => btn.classList.toggle('active', btn.dataset.livery === state.team));
            }

            images.forEach(img => {
                const imgId = img.dataset.imageId;
                let shouldBeActive = false;

                if (state.view === 'interior') {
                    if (imgId.includes(state.car) && imgId.includes('interior')) {
                        shouldBeActive = true;
                    }
                } else {
                    if (imgId.includes(state.team) && imgId.includes(state.car) && imgId.includes(state.view)) {
                        shouldBeActive = true;
                    }
                }
                img.classList.toggle('active', shouldBeActive);
            });
        }

        container.addEventListener('click', function(e) {
            const target = e.target.closest('button');
            if (!target) return;

            if (target.classList.contains('vv-car-button')) {
                state.car = target.dataset.car;
                if (target.dataset.isBonus === 'true') {
                    state.team = target.dataset.team;
                } else {
                    state.team = 'angels';
                }
            } else if (target.classList.contains('vv-livery-button')) {
                state.team = target.dataset.livery;
            } else if (target.classList.contains('vv-view-button')) {
                state.view = target.dataset.view;
            }
            updateDisplay();
        });

        updateDisplay();
    }

    mw.hook('wikipage.content').add(initVehicleViewer);
})();