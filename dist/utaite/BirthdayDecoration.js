/**
 * Birthday Poppers Script
 */
(function(window, document, mw) {
    'use strict';

    // Configuration
    var CONFETTI_COLORS = [
        '#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#9370DB', 
        '#32CD32', '#FF8C00', '#4169E1', '#FF1493', '#00FA9A', 
        '#BA55D3', '#00BFFF'
    ];
    var NUM_CONFETTI = 15;
    var CONFETTI_SPEED = 5;
    var FADE_TIME = 6000;
    var COUNTER_PAGE = 'Template:ProcessBirthdayCategory/birthdaycounter';
    var MAX_CLICKS_PER_DAY = 5;
    var SESSION_KEY_PREFIX = 'birthdayClicks_';

    // Helper functions
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getSessionKey(userName, pageName) {
        var dateKey = getDateKey();
        return SESSION_KEY_PREFIX + userName + '_' + pageName + '_' + dateKey;
    }

    function getSessionClicks(userName, pageName) {
        var sessionKey = getSessionKey(userName, pageName);
        var clicks = sessionStorage.getItem(sessionKey);
        return clicks ? parseInt(clicks, 10) : 0;
    }

    function incrementSessionClicks(userName, pageName) {
        var sessionKey = getSessionKey(userName, pageName);
        var currentClicks = getSessionClicks(userName, pageName);
        sessionStorage.setItem(sessionKey, currentClicks + 1);
    }

    function validateUserClicks(userName, pageName, serverClicks) {
        var sessionClicks = getSessionClicks(userName, pageName);
        // Use the higher count between session and server
        return Math.max(sessionClicks, serverClicks);
    }

    function createConfetti() {
        var div = document.createElement('div');
        var color = CONFETTI_COLORS[Math.floor(random(0, CONFETTI_COLORS.length))];
        
        div.style.position = 'fixed';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = color;
        div.style.left = random(-10, window.innerWidth + 10) + 'px';
        div.style.top = '-10px';
        div.style.opacity = '1';
        div.style.transform = 'rotate(' + random(0, 360) + 'deg)';
        div.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        div.style.zIndex = '10000';

        return div;
    }

    function animateConfetti(confetti) {
        var speed = random(2, CONFETTI_SPEED);
        var currentTop = -10;
        var currentLeft = parseFloat(confetti.style.left);
        var rotationSpeed = random(2, 5);
        var lastTime = performance.now();
        
        function updatePosition(currentTime) {
            var deltaTime = (currentTime - lastTime) / 16;
            lastTime = currentTime;
            
            currentTop += speed * deltaTime;
            currentLeft += Math.sin(currentTop / 50) * 2;
            
            confetti.style.top = currentTop + 'px';
            confetti.style.left = currentLeft + 'px';
            confetti.style.transform = 'rotate(' + (currentTop * rotationSpeed) + 'deg)';

            if (currentTop < window.innerHeight + 10) {
                requestAnimationFrame(updatePosition);
            } else {
                document.body.removeChild(confetti);
            }
        }

        requestAnimationFrame(updatePosition);
        
        setTimeout(function() {
            var opacity = 1;
            var fadeInterval = setInterval(function() {
                opacity -= 0.02;
                confetti.style.opacity = opacity;
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }
            }, 50);
        }, FADE_TIME * Math.random());
    }

    function throwConfetti() {
        for (var i = 0; i < NUM_CONFETTI; i++) {
            setTimeout(function() {
                var confetti = createConfetti();
                document.body.appendChild(confetti);
                animateConfetti(confetti);
            }, random(0, 2000));
        }
    }

    function getJSTDate() {
        var now = new Date();
        var jstOffset = 9 * 60;
        var localOffset = now.getTimezoneOffset();
        console.log(now, localOffset)
        return new Date(now.getTime() + (jstOffset + localOffset) * 60000);
    }

    function getDateKey() {
        var jst = getJSTDate();
        return jst.getFullYear() + '-' + 
               String(jst.getMonth() + 1).padStart(2, '0') + '-' + 
               String(jst.getDate()).padStart(2, '0');
    }

    function initializeData(userName, pageName) {
        //console.log('[Birthday Script] Initializing data structure for:', userName, pageName);
        var dateKey = getDateKey();
        return {
            currentDate: dateKey,
            counts: {},
            userClicks: {}
        };
    }

    function ensureDataStructure(data, userName, pageName) {
        //console.log('[Birthday Script] Ensuring data structure for:', userName, pageName);
        
        if (!data || typeof data !== 'object') {
            data = initializeData(userName, pageName);
        }

        if (!data.counts) data.counts = {};
        if (!data.userClicks) data.userClicks = {};
        if (!data.userClicks[userName]) data.userClicks[userName] = {};
        if (typeof data.userClicks[userName][pageName] === 'undefined') {
            data.userClicks[userName][pageName] = 0;
        }
        if (typeof data.counts[pageName] === 'undefined') {
            data.counts[pageName] = 0;
        }

        // Sync with session storage
        data.userClicks[userName][pageName] = validateUserClicks(
            userName,
            pageName,
            data.userClicks[userName][pageName]
        );

        return data;
    }

    function loadCounterData(callback) {
        var userName = mw.config.get('wgUserName') || 'anonymous';
        var pageName = mw.config.get('wgPageName');
        
        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            titles: COUNTER_PAGE,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: '2'
        }).done(function(response) {
            var data = initializeData(userName, pageName);
            
            try {
                if (response.query && 
                    response.query.pages && 
                    response.query.pages[0] && 
                    response.query.pages[0].revisions && 
                    response.query.pages[0].revisions[0] &&
                    response.query.pages[0].revisions[0].slots &&
                    response.query.pages[0].revisions[0].slots.main &&
                    response.query.pages[0].revisions[0].slots.main.content) {
                    
                    var content = response.query.pages[0].revisions[0].slots.main.content;
                    try {
                        var parsedData = JSON.parse(content);
                        data = ensureDataStructure(parsedData, userName, pageName);
                    } catch (parseError) {
                        console.error('[Birthday Script] Parse error:', parseError);
                        data = ensureDataStructure(data, userName, pageName);
                    }
                }
            } catch (error) {
                console.error('[Birthday Script] Error processing API response:', error);
                data = ensureDataStructure(data, userName, pageName);
            }

            var dateKey = getDateKey();
            if (!data.currentDate || data.currentDate !== dateKey) {
                data = initializeData(userName, pageName);
                data = ensureDataStructure(data, userName, pageName);
            }

            callback(data);
        }).fail(function(error) {
            console.error('[Birthday Script] API call failed:', error);
            var data = initializeData(userName, pageName);
            data = ensureDataStructure(data, userName, pageName);
            callback(data);
        });
    }

    function saveCounterData(data, callback) {
        new mw.Api().postWithToken('csrf', {
            action: 'edit',
            title: COUNTER_PAGE,
            text: JSON.stringify(data, null, 2),
            summary: 'Updating birthday celebration counter'
        }).done(function() {
            callback(true);
        }).fail(function(code, error) {
            console.error('[Birthday Script] Save failed:', error);
            callback(false);
        });
    }

     function createBalloonAnimation() {
        // Create container for balloon and tooltip
        var container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '20px';
        container.style.bottom = '20px';
        container.style.zIndex = '10001';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '5px';

        // Create balloon image
        var balloon = document.createElement('img');
        balloon.src = 'https://static.wikia.nocookie.net/nicodougasingers/images/a/ad/Balloon.gif/revision/latest/scale-to-width-down/1000?cb=20250125181245';
        balloon.style.width = '100px';
        balloon.style.height = 'auto';
        balloon.style.cursor = 'not-allowed';

        // Create tooltip
        var tooltip = document.createElement('div');
        tooltip.textContent = 'This balloon is just decorative!';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.textAlign = 'center';
        tooltip.style.maxWidth = '150px';

        // Add elements to container
        container.appendChild(balloon);
        container.appendChild(tooltip);
        document.body.appendChild(container);

        return balloon;
    }

    function createUI() {
        var container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.right = '20px';
        container.style.bottom = '20px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        container.style.zIndex = '10001';
        document.body.appendChild(container);

        var displayContainer = document.createElement('div');
        displayContainer.style.padding = '10px';
        displayContainer.style.backgroundColor = 'rgba(255, 105, 180, 0.9)';
        displayContainer.style.borderRadius = '5px';
        displayContainer.style.color = 'white';
        displayContainer.style.fontWeight = 'bold';
        displayContainer.style.display = 'flex';
        displayContainer.style.flexDirection = 'column';
        displayContainer.style.gap = '5px';
        container.appendChild(displayContainer);

        var counterDisplay = document.createElement('div');
        var limitDisplay = document.createElement('div');
        displayContainer.appendChild(counterDisplay);
        displayContainer.appendChild(limitDisplay);

        var button = document.createElement('button');
        button.innerHTML = '🎉 Celebrate Birthday!';
        button.style.padding = '10px';
        button.style.backgroundColor = '#ff69b4';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.width = '100%';
        container.appendChild(button);

        return {
            container: container,
            counterDisplay: counterDisplay,
            limitDisplay: limitDisplay,
            button: button
        };
    }

    function init() {
        var categories = mw.config.get('wgCategories') || [];
        
        if (categories.indexOf("Today's Birthdays") !== -1) {
            var balloon = createBalloonAnimation();
            var ui = createUI();
            var pageName = mw.config.get('wgPageName');
            var userName = mw.config.get('wgUserName') || 'anonymous';

            loadCounterData(function(data) {
                function updateDisplays() {
                    var count = (data.counts && data.counts[pageName]) || 0;
                    var userClicks = validateUserClicks(
                        userName,
                        pageName,
                        (data.userClicks && 
                         data.userClicks[userName] && 
                         data.userClicks[userName][pageName]) || 0
                    );
                    
                    ui.counterDisplay.innerHTML = 'Today\'s Celebrations: ' + count + ' 🌟';
                    ui.limitDisplay.innerHTML = 'Your Celebrations Left: ' + 
                                              (MAX_CLICKS_PER_DAY - userClicks) + 
                                              '/' + MAX_CLICKS_PER_DAY;
                    
                    ui.button.disabled = userClicks >= MAX_CLICKS_PER_DAY;
                    ui.button.style.opacity = ui.button.disabled ? '0.5' : '1';
                    ui.button.style.cursor = ui.button.disabled ? 'not-allowed' : 'pointer';
                }
                
                updateDisplays();
                
                ui.button.addEventListener('click', function() {
                    if (!ui.button.disabled) {
                        ui.button.disabled = true;
                        data = ensureDataStructure(data, userName, pageName);
                        data.counts[pageName]++;
                        data.userClicks[userName][pageName]++;
                        incrementSessionClicks(userName, pageName);
                        
                        saveCounterData(data, function(success) {
                            if (success) {
                                updateDisplays();
                                throwConfetti();
                            }
                            setTimeout(function() {
                                var totalClicks = validateUserClicks(
                                    userName,
                                    pageName,
                                    data.userClicks[userName][pageName]
                                );
                                ui.button.disabled = totalClicks >= MAX_CLICKS_PER_DAY;
                            }, 2000);
                        });
                    }
                });

                if (data.counts[pageName] === 0) {
                    throwConfetti();
                }
            });
        }
    }

    if (window.mw) {
        mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function() {
            init();
        }).catch(function(error) {
            console.error('[Birthday Script] Failed to load modules:', error);
        });
    } else {
        console.error('[Birthday Script] MediaWiki is not loaded');
    }

})(window, document, mw);