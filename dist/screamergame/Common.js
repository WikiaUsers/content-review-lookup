/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    function initializeScreamerIcon() {
        const iconContainer = document.querySelector('.screamer-corner-icon');
        if (!iconContainer) {
            return;
        }

        let attempts = 0;
        const maxAttempts = 15;
        const checkInterval = 100;

        const waitForLayout = setInterval(function() {
            const mainContentArea = document.querySelector('.page__main');
            const fandomHeader = document.querySelector('.fandom-community-header');
            
            if (mainContentArea && fandomHeader) {
                clearInterval(waitForLayout);

                const pageHeader = mainContentArea.querySelector('.page-header');

                const finalTopPosition = fandomHeader.getBoundingClientRect().bottom + 20;
                const finalRightPosition = window.innerWidth - mainContentArea.getBoundingClientRect().right + 15;

                iconContainer.style.top = finalTopPosition + 'px';
                iconContainer.style.right = finalRightPosition + 'px';
                
                const iconImages = iconContainer.querySelectorAll('img');
                iconImages.forEach(function(img) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                });
                
                if (pageHeader) {
                    const isCategorized = pageHeader.querySelector('.page-header__categories-container');
                    if (!isCategorized) {
                        const spacer = document.createElement('div');
                        spacer.style.height = '50px';
                        pageHeader.prepend(spacer);
                    }
                }

                iconContainer.style.display = 'block';

            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(waitForLayout);
                }
            }
        }, checkInterval);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeScreamerIcon);
    } else {
        initializeScreamerIcon();
    }
})();

/* vehicle viewer */

(function(window, $, mw) {
    var App = {
        state: {
            activeTab: 'vehicle',
            activeModelId: 'horizon',
            modelLiveryState: {},
            wasVideoPlayingBeforeScrub: true,
            isLiveryPanelVisible: false,
            activeFilter: 'all',
            isScrubbing: false
        },
        teamLogos: {},
        vehicleData: {
            'horizon': { name: 'Horizon', category: 'base', interior: 'https://static.wikia.nocookie.net/screamergame/images/4/43/Horizon_interior.png/revision/latest?cb=20250206211759', liveries: {
                'angels': { name: 'Angels', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest?cb=20250107211749', icon: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Angels_horizon_front.png/revision/latest?cb=20250130211242', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/9/97/S2_angels_horizon_mp4.mp4/revision/latest?cb=20250807201227' }},
                'wasp': { name: 'Wasp', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest?cb=20250110193740', icon: 'https://static.wikia.nocookie.net/screamergame/images/9/92/Wasp_horizon_front.png/revision/latest?cb=20250130211652', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/8/82/S2_wasp_horizon_mp4.mp4/revision/latest?cb=20250807201903' }},
                'condor': { name: 'Condor', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest?cb=20250106212324', icon: 'https://static.wikia.nocookie.net/screamergame/images/2/28/Condor_horizon_front.png/revision/latest?cb=20250130211550', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/5/50/S2_condor_horizon_mp4.mp4/revision/latest?cb=20250807201549' }},
                'zeus': { name: 'Zeus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/5/5e/Zeus%27s_logo.png/revision/latest?cb=20250109210321', icon: 'https://static.wikia.nocookie.net/screamergame/images/a/aa/Zeus_horizon_front.png/revision/latest?cb=20250130211736', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/5/58/S2_zeus_horizon_mp4.mp4/revision/latest?cb=20250807202240' }}
            }},
            'nebula': { name: 'Nebula', category: 'base', interior: 'https://static.wikia.nocookie.net/screamergame/images/2/28/Nebula_interior.png/revision/latest?cb=20250206211855', liveries: {
                'angels': { name: 'Angels', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest?cb=20250107211749', icon: 'https://static.wikia.nocookie.net/screamergame/images/3/3a/Angels_nebula_front.png/revision/latest?cb=20250202182226', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/4d/S2_angels_nebula_mp4.mp4/revision/latest?cb=20250807201302' }},
                'wasp': { name: 'Wasp', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest?cb=20250110193740', icon: 'https://static.wikia.nocookie.net/screamergame/images/7/75/Wasp_nebula_front.png/revision/latest?cb=20250202182403', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/7/75/S2_wasp_nebula_mp4.mp4/revision/latest?cb=20250807201929' }},
                'condor': { name: 'Condor', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest?cb=20250106212324', icon: 'https://static.wikia.nocookie.net/screamergame/images/8/89/Condor_nebula_front.png/revision/latest?cb=20250202182318', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/b/b9/S2_condor_nebula_mp4.mp4/revision/latest?cb=20250807201618' }},
                'zeus': { name: 'Zeus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/5/5e/Zeus%27s_logo.png/revision/latest?cb=20250109210321', icon: 'https://static.wikia.nocookie.net/screamergame/images/5/54/Zeus_nebula_front.png/revision/latest?cb=20250202182439', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/8/8a/S2_zeus_nebula_mp4.mp4/revision/latest?cb=20250807202302' }}
            }},
            'spark': { name: 'Spark', category: 'base', interior: 'https://static.wikia.nocookie.net/screamergame/images/8/8f/Spark_interior.png/revision/latest?cb=20250206211941', liveries: {
                'angels': { name: 'Angels', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest?cb=20250107211749', icon: 'https://static.wikia.nocookie.net/screamergame/images/3/34/Angels_spark_front.png/revision/latest?cb=20250203205542', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/40/S2_angels_spark_mp4.mp4/revision/latest?cb=20250807201332' }},
                'wasp': { name: 'Wasp', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest?cb=20250110193740', icon: 'https://static.wikia.nocookie.net/screamergame/images/6/62/Wasp_spark_front.png/revision/latest?cb=20250203210652', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/0/02/S2_wasp_spark_mp4.mp4/revision/latest?cb=20250807201959' }},
                'condor': { name: 'Condor', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest?cb=20250106212324', icon: 'https://static.wikia.nocookie.net/screamergame/images/4/4c/Condor_spark_front.png/revision/latest?cb=20250203210613', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/e/e6/S2_condor_spark_mp4.mp4/revision/latest?cb=20250807201640' }},
                'zeus': { name: 'Zeus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/5/5e/Zeus%27s_logo.png/revision/latest?cb=20250109210321', icon: 'https://static.wikia.nocookie.net/screamergame/images/4/4e/Zeus_spark_front.png/revision/latest?cb=20250203210730', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/f/f8/S2_zeus_spark_mp4.mp4/revision/latest?cb=20250807202329' }}
            }},
            'radiance': { name: 'Radiance', category: 'base', interior: 'https://static.wikia.nocookie.net/screamergame/images/c/c3/Radiance_interior.png/revision/latest?cb=20250206212232', liveries: {
                'angels': { name: 'Angels', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest?cb=20250107211749', icon: 'https://static.wikia.nocookie.net/screamergame/images/3/3d/Angels_radiance_front.png/revision/latest?cb=20250204213249', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/a/a8/S2_angels_radiance_mp4.mp4/revision/latest?cb=20250807201404' }},
                'wasp': { name: 'Wasp', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest?cb=20250110193740', icon: 'https://static.wikia.nocookie.net/screamergame/images/2/2c/Wasp_radiance_front.png/revision/latest?cb=20250204213401', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/44/S2_wasp_radiance_mp4.mp4/revision/latest?cb=20250807202050' }},
                'condor': { name: 'Condor', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest?cb=20250106212324', icon: 'https://static.wikia.nocookie.net/screamergame/images/9/9c/Condor_radiance_front.png/revision/latest?cb=20250204213326', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/e/e3/S2_condor_radiance_mp4.mp4/revision/latest?cb=20250807201716' }},
                'zeus': { name: 'Zeus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/5/5e/Zeus%27s_logo.png/revision/latest?cb=20250109210321', icon: 'https://static.wikia.nocookie.net/screamergame/images/0/07/Zeus_radiance_front.png/revision/latest?cb=20250204213444', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/40/S2_zeus_radiance_mp4.mp4/revision/latest?cb=20250807202356' }}
            }},
            'hornet': { name: 'Hornet', category: 'bonus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest?cb=20250110193740', interior: 'https://static.wikia.nocookie.net/screamergame/images/0/05/Wasp_hornet_interior.png/revision/latest?cb=20250206212329', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/6/6c/S2_wasp_hornet_mp4.mp4/revision/latest?cb=20250807202140' }, icon: 'https://static.wikia.nocookie.net/screamergame/images/c/c5/Wasp_hornet_front.png/revision/latest?cb=20250206202619'},
            'thunder': { name: 'Thunder', category: 'bonus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/5/5e/Zeus%27s_logo.png/revision/latest?cb=20250109210321', interior: 'https://static.wikia.nocookie.net/screamergame/images/4/4e/Zeus_thunder_interior.png/revision/latest?cb=20250206212402', display: { type: 'static', src: 'https://static.wikia.nocookie.net/screamergame/images/2/2c/Zeus_thunder_front.png/revision/latest?cb=20250206203732' }, icon: 'https://static.wikia.nocookie.net/screamergame/images/2/2c/Zeus_thunder_front.png/revision/latest?cb=20250206203732'},
            'aphrodite': { name: 'Aphrodite', category: 'bonus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest?cb=20250107211749', interior: 'https://static.wikia.nocookie.net/screamergame/images/1/13/Angels_aphrodite_interior.png/revision/latest?cb=20250206212433', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/1/1b/S2_angels_aphrodite_mp4.mp4/revision/latest?cb=20250807201447' }, icon: 'https://static.wikia.nocookie.net/screamergame/images/8/81/Angels_aphrodite_front.png/revision/latest?cb=20250206204425'},
            'blackclaw': { name: 'Black Claw', category: 'bonus', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest?cb=20250106212324', interior: 'https://static.wikia.nocookie.net/screamergame/images/9/95/Condor_blackclaw_interior.png/revision/latest?cb=20250206212504', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/b/b2/S2_condor_black-claw.mp4/revision/latest?cb=20250807201743' }, icon: 'https://static.wikia.nocookie.net/screamergame/images/f/fb/Condor_blackclaw_front.png/revision/latest?cb=20250206205141'}
        },
        gatherTeamLogos: function() {
            var logos = {};
            $.each(App.vehicleData, function(modelId, model) {
                if (model.category === 'bonus' && model.teamLogo) {
                    var match = model.teamLogo.match(/([a-zA-Z]+)%27s_logo/);
                    var teamId = match && match[1] ? match[1].toLowerCase() : modelId;
                    if (!logos[teamId]) {
                        logos[teamId] = model.teamLogo;
                    }
                } else if (model.liveries) {
                    $.each(model.liveries, function(liveryId, livery) {
                        if (!logos[liveryId]) {
                            logos[liveryId] = livery.teamLogo;
                        }
                    });
                }
            });
            App.teamLogos = logos;
        },
        parseAndLoadData: function() {
            var $source = $('#vva-data-source');
            if (!$source.length) return;
            $source.find('.vva-data-entry').each(function() {
                var $entry = $(this);
                var carId = $entry.data('car-id');
                if (App.vehicleData[carId]) {
                    App.vehicleData[carId].description = $entry.find('.vva-description').html() || 'No description available.';
                    var $statsContainer = $entry.find('.vva-stats');
                    var stats = {};
                    if ($statsContainer.length) {
                        var rawStatsHtml = $statsContainer.html().replace(/;Statistics/g, '');
                        var lines = rawStatsHtml.split(/<br\s*\/?>|\n/).filter(function(line) { return line.trim() !== ''; });
                        lines.forEach(function(line) {
                            var cleanedLine = $('<div>').html(line).text().trim();
                            if (cleanedLine.startsWith(':')) {
                                var parts = cleanedLine.substring(1).split(':');
                                if (parts.length > 1) {
                                    var key = parts[0].trim();
                                    var value = parts.slice(1).join(':').trim();
                                    var link = $statsContainer.find('a').filter(function() { return $(this).text().trim() === value; }).first();
                                    if (link.length) { stats[key] = link.prop('outerHTML'); } else { stats[key] = value; }
                                }
                            }
                        });
                    }
                    App.vehicleData[carId].stats = stats;
                }
            });
        },
        showView: function() {
            if (App.state.activeTab !== 'vehicle' && App.state.isLiveryPanelVisible) {
                App.toggleLiveryPanel();
            }
            $('.vva-main-content').removeClass('vva-show-side-borders');
            var model = App.vehicleData[App.state.activeModelId];
            var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
            var selector = '';
            var $activeView;
            var $lsButton = $('.vva-livery-toggle-button');
            var $tickerBar = $('.vva-ticker-bar');
            var displayData;
            if (App.state.activeTab === 'vehicle') {
                $lsButton.addClass('is-visible');
                var teamId = '';
                if (model.category === 'base') {
                    $lsButton.removeClass('is-disabled').css('cursor', 'pointer');
                    teamId = activeLiveryId;
                    displayData = model.liveries[activeLiveryId].display;
                } else {
                    $lsButton.addClass('is-disabled').css('cursor', 'default');
                    var match = model.teamLogo.match(/([a-zA-Z]+)%27s_logo/);
                    if (match && match[1]) { teamId = match[1].toLowerCase(); }
                    displayData = model.display;
                }
                App.updateLiveryToggleButtonIcon(teamId);
                $tickerBar.css('display', 'flex');
                if (displayData && displayData.type !== 'video') {
                    $tickerBar.removeClass('scrubber-visible').addClass('text-visible');
                }
            } else {
                $lsButton.removeClass('is-visible');
                $tickerBar.css('display', 'none');
            }
            switch(App.state.activeTab) {
                case 'vehicle':
                    $('.vva-main-content').addClass('vva-show-side-borders');
                    selector = model.category === 'base'
                        ? '.vva-view[data-model-id="' + App.state.activeModelId + '"][data-view-type="vehicle"][data-livery-id="' + activeLiveryId + '"]'
                        : '.vva-view[data-model-id="' + App.state.activeModelId + '"][data-view-type="vehicle"]';
                    break;
                case 'interior':
                    $('.vva-main-content').addClass('vva-show-side-borders');
                    selector = '.vva-view[data-model-id="' + App.state.activeModelId + '"][data-view-type="interior"]';
                    break;
                case 'info':
                    $activeView = $('.vva-view[data-view-type="info"]').empty();
                    var infoMediaData;
                    if (model.category === 'base') {
                        infoMediaData = model.liveries[activeLiveryId].display;
                    } else {
                        infoMediaData = model.display;
                    }
                    var infoMediaTag = infoMediaData.type === 'video' ?
                        '<video src="' + infoMediaData.src + '" autoplay loop muted playsinline></video>' : '<img src="' + infoMediaData.src + '" />';
                    var statsHtml = '';
                    if (model.stats) {
                        $.each(model.stats, function(key, value) { statsHtml += '<li><span>' + key + '</span><span>' + value + '</span></li>'; });
                    }
                    var infoHtml = '<div class="vva-info-header"><div class="vva-info-gif">' + infoMediaTag + '</div><div class="vva-info-description">' + model.description + '</div></div>' +
                                     '<div class="vva-info-stats"><h4>Statistics</h4><ul>' + statsHtml + '</ul></div>';
                    $activeView.html(infoHtml);
                    selector = '.vva-view[data-view-type="info"]';
                    break;
            }
            $activeView = $activeView || $(selector);
            if ($activeView.length) {
                $('.vva-view:visible').not($activeView).stop(true, true).fadeOut(200);
                $activeView.css('display', 'flex').hide().fadeIn(200);
                var $video = $activeView.find('video');
                if ($video.length) {
                    $video.each(function() {
                        this.currentTime = 0;
                        this.play().catch(function(){});
                    });
                }
            }
        },
        updateLiveryUI: function(model, isAnimated) {
            var $iconWrapper = $('.vva-livery-icon-wrapper');
            var populate = function() {
                $iconWrapper.empty();
                var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
                $.each(model.liveries, function(liveryId, livery) {
                    var $liveryIcon = $('<div>', { class: 'vva-livery-icon' + (liveryId === activeLiveryId ? ' vva-active' : ''), 'data-livery-id': liveryId })
                        .append($('<img>', { src: livery.icon }), $('<div>', { class: 'vva-livery-name', text: livery.name }));
                    $iconWrapper.append($liveryIcon);
                });
                if (isAnimated) {
                    $iconWrapper.stop(true, true).fadeIn(200);
                }
            };
            if (isAnimated) {
                $iconWrapper.stop(true, true).fadeOut(200, populate);
            } else {
                populate();
            }
        },
        updateLiveryToggleButtonIcon: function(teamId) {
            var $button = $('.vva-livery-toggle-button');
            var $activeIcon = $button.find('img:visible');
            var $newIcon = $button.find('img[data-team-id="' + teamId + '"]');
            if (!$newIcon.length || $newIcon.is($activeIcon)) {
                return;
            }

            if ($activeIcon.length) {
                $activeIcon.stop(true, true).fadeOut(200, function() {
                    $newIcon.stop(true, true).fadeIn(200);
                });
            } else {
                $newIcon.stop(true, true).fadeIn(200);
            }
        },
        toggleLiveryPanel: function() {
            App.state.isLiveryPanelVisible = !App.state.isLiveryPanelVisible;
            $('.vva-livery-panel').toggleClass('vva-open', App.state.isLiveryPanelVisible);
            $('.vva-livery-toggle-button').toggleClass('vva-open', App.state.isLiveryPanelVisible);
        },
        setActiveTab: function(e) {
            var $tab = $(e.currentTarget);
            var tabName = $tab.data('tab');
            if (tabName === App.state.activeTab) return;
            var proceedToTabChange = function() {
                var $visibleView = $('.vva-view:visible');
                var updateAndShow = function() {
                    App.state.activeTab = tabName;
                    $('.vva-tab').removeClass('vva-active');
                    $tab.addClass('vva-active');
                    App.showView();
                };
                if ($visibleView.length) {
                    $visibleView.stop(true, true).fadeOut(200, updateAndShow);
                } else {
                    updateAndShow();
                }
            };
            var waitTime = 0;
            if (App.state.isLiveryPanelVisible) {
                App.toggleLiveryPanel();
                waitTime = 300;
            }
            if (App.state.activeTab === 'vehicle' && tabName !== 'vehicle') {
                $('.vva-livery-toggle-button').removeClass('is-visible');
                waitTime = Math.max(waitTime, 200);
            }
            if (waitTime > 0) {
                setTimeout(proceedToTabChange, waitTime);
            } else {
                proceedToTabChange();
            }
        },
        setActiveModel: function(e) {
            var modelId = $(e.currentTarget).data('model-id');
            if (modelId === App.state.activeModelId) return;
            var newModel = App.vehicleData[modelId];
            var updateAndShow = function() {
                App.state.activeModelId = modelId;
                $('.vva-vehicle-icon').removeClass('vva-active');
                var $activeIcon = $('.vva-vehicle-icon[data-model-id="' + modelId + '"]');
                $activeIcon.addClass('vva-active');
                if (App.state.isLiveryPanelVisible && newModel.category === 'base') {
                    App.updateLiveryUI(newModel, true);
                }
                App.showView();
                if ($activeIcon[0]) {
                    $activeIcon[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            };
            if (App.state.isLiveryPanelVisible && newModel.category === 'bonus') {
                App.toggleLiveryPanel();
                setTimeout(function() {
                    $('.vva-view:visible').stop(true, true).fadeOut(200, updateAndShow);
                }, 300);
            } else {
                $('.vva-view:visible').stop(true, true).fadeOut(200, updateAndShow);
            }
        },
        setActiveLivery: function(e) {
            e.stopPropagation();
            var modelId = App.state.activeModelId;
            var liveryId = $(e.currentTarget).data('livery-id');
            if (App.state.modelLiveryState[modelId] === liveryId) {
                return;
            }
            var $visibleView = $('.vva-view:visible');
            var updateAndShow = function() {
                App.state.modelLiveryState[modelId] = liveryId;
                App.updateMainVehicleIcon(modelId);
                App.showView();
                var model = App.vehicleData[modelId];
                App.updateLiveryUI(model, false);
            };
            if ($visibleView.length) {
                $visibleView.stop(true, true).fadeOut(200, updateAndShow);
            } else {
                updateAndShow();
            }
        },
        updateMainVehicleIcon: function(modelId) {
            var model = App.vehicleData[modelId];
            if (!model || !model.liveries) return;
            var activeLiveryId = App.state.modelLiveryState[modelId];
            if (!activeLiveryId) return;
            var newIconSrc = model.liveries[activeLiveryId].icon;
            var $iconImg = $('.vva-vehicle-icon[data-model-id="' + modelId + '"] img');
            $iconImg.stop(true, true).fadeOut(200, function() { $(this).attr('src', newIconSrc).fadeIn(200); });
        },
        gatherAllAssets: function() {
            var assets = [];
            $.each(App.vehicleData, function(_, model) {
                if (model.icon) assets.push(model.icon);
                if (model.interior) assets.push(model.interior);
                if (model.display && model.display.src) assets.push(model.display.src);
                if (model.teamLogo) assets.push(model.teamLogo);
                if (model.liveries) {
                    $.each(model.liveries, function(_, livery) {
                        if (livery.icon) assets.push(livery.icon);
                        if (livery.teamLogo) assets.push(livery.teamLogo);
                        if (livery.display && livery.display.src) assets.push(livery.display.src);
                    });
                }
            });
            return $.unique(assets);
        },
        startPreloading: function(assetList) {
            var totalAssets = assetList.length;
            var loadedAssets = 0;
            var $progressBar = $('#vva-progress-bar-inner');
            if (totalAssets === 0) {
                App.onLoadingComplete();
                return;
            }
            assetList.forEach(function(url) {
                var onAssetLoaded = function() {
                    loadedAssets++;
                    var percent = (loadedAssets / totalAssets) * 100;
                    $progressBar.css('width', percent + '%');
                    if (loadedAssets === totalAssets) {
                        App.onLoadingComplete();
                    }
                };
                if (url && url.endsWith('.mp4')) {
                    var video = document.createElement('video');
                    video.oncanplaythrough = onAssetLoaded;
                    video.onerror = onAssetLoaded;
                    video.src = url;
                } else if (url && /\.(jpeg|jpg|gif|png|webp)$/i.test(url)) {
                    var img = new Image();
                    img.onload = onAssetLoaded;
                    img.onerror = onAssetLoaded;
                    img.src = url;
                } else {
                    onAssetLoaded();
                }
            });
        },
        build: function() {
            var $app = $('#vehicle-viewer-app');
            var mainContentHtml = '';
            $.each(App.vehicleData, function(modelId, model) {
                if (model.category === 'base') {
                    $.each(model.liveries, function(liveryId, livery) {
                        mainContentHtml += '<div class="vva-view" data-model-id="' + modelId + '" data-view-type="vehicle" data-livery-id="' + liveryId + '"><video src="' + livery.display.src + '" loop muted playsinline></video></div>';
                    });
                } else {
                    var mediaTag = model.display.type === 'video' ? '<video src="' + model.display.src + '" loop muted playsinline></video>' : '<img src="' + model.display.src + '" />';
                    mainContentHtml += '<div class="vva-view" data-model-id="' + modelId + '" data-view-type="vehicle">' + mediaTag + '</div>';
                }
                mainContentHtml += '<div class="vva-view" data-model-id="' + modelId + '" data-view-type="interior"><img src="' + model.interior + '" /></div>';
            });
            var lsButtonHtml = '<button class="vva-livery-toggle-button">';
            $.each(App.teamLogos, function(teamId, url) {
                lsButtonHtml += '<img src="' + url + '" data-team-id="' + teamId + '" style="display: none;"/>';
            });
            lsButtonHtml += '</button>';
            var appHtml = `
                <div id="vva-loading-screen">
                    <div class="vva-loading-text">Loading...</div>
                    <div id="vva-progress-bar-outer"><div id="vva-progress-bar-inner"></div></div>
                </div>
                <div id="vva-main-container">
                    <div class="vva-header">
                        <div class="vva-tab-wrapper">
                            <button class="vva-tab vva-active" data-tab="vehicle">Vehicle</button>
                            <button class="vva-tab" data-tab="interior">Interior</button>
                            <button class="vva-tab" data-tab="info">Info</button>
                        </div>
                    </div>
                    <div class="vva-livery-panel"><div class="vva-livery-icon-wrapper"></div></div>
                    ${lsButtonHtml}
                    <div class="vva-ls-tooltip">Bonus vehicles cannot have their livery changed.</div>
                    <div class="vva-main-content">
                        ${mainContentHtml}
                        <div class="vva-view vva-info-page" data-view-type="info"></div>
                    </div>
                    <div class="vva-ticker-bar" style="display: none;">
                        <div class="vva-ticker-content">
                            <div class="vva-ticker-text">Click the preview to pause and rotate the vehicle using the scrubber. Drag the scrubber to a new position and release to view the vehicle at different angles.</div>
                            <input type="range" class="vva-scrubber" min="0" max="100" value="0" step="3.33">
                        </div>
                    </div>
                    <div class="vva-footer">
                        <div class="vva-footer-content-wrapper">
                            <div class="vva-filter-controls">
                                <button class="vva-filter-button vva-active" data-filter="all">All Cars</button>
                                <button class="vva-filter-button" data-filter="base">Regular</button>
                                <button class="vva-filter-button" data-filter="bonus">Bonus</button>
                            </div>
                            <div class="vva-vehicle-selector"></div>
                        </div>
                    </div>
                </div>`;
            $app.html(appHtml);
        },
        onLoadingComplete: function() {
            $('#vva-loading-screen').fadeOut(400, function() {
                $(this).remove();
                $('#vva-main-container').css('display', 'flex').hide().fadeIn(400, function() {
                    App.updateVehicleSelector();
                    App.showView();
                    $('.vva-ticker-bar').addClass('text-visible');
                    App.runTickerSequence();
                });
            });
        },
        runTickerSequence: function() {
            var $tickerText = $('.vva-ticker-text');
            var $tickerBar = $('.vva-ticker-bar');
            if (!$tickerBar.hasClass('text-visible')) return;
            setTimeout(function() {
                if ($tickerBar.hasClass('scrubber-visible')) return;
                $tickerText.addClass('is-scrolling');
                $tickerText.one('animationend', function() {
                    $(this).fadeOut(400);
                });
            }, 2000);
        },
        init: function() {
            // START: Temporary Debug Triangle
            var $debugTriangle = $('<div>').css({
                'position': 'absolute',
                'top': '100px',
                'left': '5px',
                'width': '0',
                'height': '0',
                'border-left': '15px solid transparent',
                'border-right': '15px solid transparent',
                'border-bottom': '25px solid yellow',
                'z-index': '9999',
                'filter': 'drop-shadow(0 0 3px #000)'
            });
            $('#vehicle-viewer-app').append($debugTriangle);
            // END: Temporary Debug Triangle

            if ($('#vehicle-viewer-app').children().length > 1) return;
            App.parseAndLoadData();
            $.each(App.vehicleData, function(modelId, model) {
                if (model.liveries) {
                    var firstLiveryId = Object.keys(model.liveries)[0];
                    if (firstLiveryId) { App.state.modelLiveryState[modelId] = firstLiveryId; }
                }
            });
            var allAssets = App.gatherAllAssets();
            App.gatherTeamLogos();
            App.build();
            App.startPreloading(allAssets);
            var $app = $('#vehicle-viewer-app');
            var $mainContent = $app.find('.vva-main-content');
            $mainContent.on('click', '.vva-view video', function() {
                var $tickerBar = $('.vva-ticker-bar');
                var $tickerText = $('.vva-ticker-text');
                if (this.paused) {
                    this.play();
                    $tickerBar.removeClass('scrubber-visible').addClass('text-visible');
                } else {
                    this.pause();
                    $tickerBar.removeClass('text-visible').addClass('scrubber-visible');
                    $tickerText.stop(true, true).removeClass('is-scrolling').fadeOut(200);
                }
            });
            $mainContent.on('timeupdate', '.vva-view video', function() {
                if (!App.state.isScrubbing && this.duration) {
                    var newPercent = (this.currentTime / this.duration) * 100;
                    $('.vva-scrubber').val(newPercent);
                }
            });
            $app.on('mousedown', '.vva-scrubber', function() {
                var $video = $('.vva-view:visible video');
                if (!$video.length) return;
                App.state.isScrubbing = true;
                App.state.wasVideoPlayingBeforeScrub = !$video[0].paused;
                $video[0].pause();
                $('.vva-ticker-bar').removeClass('text-visible').addClass('scrubber-visible');
                $('.vva-ticker-text').stop(true, true).removeClass('is-scrolling').fadeOut(200);
            });
            $app.on('input', '.vva-scrubber', function() {
                var $video = $('.vva-view:visible video');
                if ($video.length && $video[0].duration) {
                    var newTime = ($video[0].duration / 100) * parseFloat(this.value);
                    $video[0].currentTime = newTime;
                }
            });
            $app.on('mouseup', '.vva-scrubber', function() {
                App.state.isScrubbing = false;
                var $video = $('.vva-view:visible video');
                if (!$video.length) return;
                if (App.state.wasVideoPlayingBeforeScrub) {
                    $video[0].play();
                    $('.vva-ticker-bar').removeClass('scrubber-visible').addClass('text-visible');
                }
            });
            $app.on('click', '.vva-livery-icon', App.setActiveLivery);
            $app.on('click', '.vva-livery-toggle-button', function() {
                var model = App.vehicleData[App.state.activeModelId];
                if (model.category === 'base') {
                    App.updateLiveryUI(model, false);
                    App.toggleLiveryPanel();
                }
            });
            $app.on('click', '.vva-tab', App.setActiveTab);
            $app.on('click', '.vva-vehicle-icon', App.setActiveModel);
            $app.on('click', '.vva-filter-button', App.setFilter);
            var $selector = $app.find('.vva-vehicle-selector');
            var isDown = false;
            var startX;
            var scrollLeft;
            $selector.on('mousedown', function(e) {
                e.preventDefault();
                isDown = true;
                $selector.addClass('is-dragging');
                startX = e.pageX - $selector.offset().left;
                scrollLeft = $selector.scrollLeft();
            }).on('mouseleave', function() {
                isDown = false;
                $selector.removeClass('is-dragging');
            }).on('mouseup', function() {
                isDown = false;
                $selector.removeClass('is-dragging');
            }).on('mousemove', function(e) {
                if (!isDown) return;
                e.preventDefault();
                var x = e.pageX - $selector.offset().left;
                var walk = (x - startX) * 2;
                $selector.scrollLeft(scrollLeft - walk);
            });
            $app.on('contextmenu', function(e) {
                e.preventDefault();
            });
        },
        destroy: function() {
            $('#vehicle-viewer-app').empty().off();
        },
        setFilter: function(e) {
            var filter = $(e.currentTarget).data('filter');
            if (filter === App.state.activeFilter) return;
            App.state.activeFilter = filter;
            $('.vva-filter-button').removeClass('vva-active');
            $(e.currentTarget).addClass('vva-active');
            $('.vva-vehicle-selector').stop(true, true).fadeOut(200, function() {
                App.updateVehicleSelector();
                $(this).fadeIn(200);
            });
        },
        updateVehicleSelector: function() {
            var $selector = $('.vva-vehicle-selector').empty();
            $.each(App.vehicleData, function(modelId, model) {
                if (App.state.activeFilter === 'all' || App.state.activeFilter === model.category) {
                    var iconSrc = model.icon || (model.liveries && model.liveries[App.state.modelLiveryState[modelId] || Object.keys(model.liveries)[0]].icon);
                    var $icon = $('<div>', { class: 'vva-vehicle-icon', 'data-model-id': modelId });
                    $icon.append($('<img>', { src: iconSrc }));
                    $icon.append($('<div>', { class: 'vva-vehicle-name', text: model.name }));
                    if (modelId === App.state.activeModelId) { $icon.addClass('vva-active'); }
                    $selector.append($icon);
                }
            });
        }
    };
    mw.hook('wikipage.content').add(function($content) {
        if ($content.find('#vehicle-viewer-app').length) { App.init(); }
    });
})(window, jQuery, mediaWiki);



















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