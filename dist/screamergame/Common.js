/* Any JavaScript here will be loaded for all users on every page load. */

/* vehicle viewer */

$(function() {
    if (!$('#vehicle-viewer-app').length) {
        return;
    }

    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js', function() {
        (function(window, $, mw) {
            var App = {
                initialState: {
                    activeView: 'vehicle',
                    previousView: 'vehicle',
                    activeModelId: 'horizon',
                    modelLiveryState: {},
                    modelGearState: {},
                    activeSubPanel: null,
                    filters: { base: true, bonus: true },
                    isTransitioning: false,
                    tooltipTimeout: null,
                    unitSystem: 'imperial',
                    isVehicleViewFocused: false,
                    isAutoplaying: false,
                    wasAutoplayingBeforeSeek: false,
                    animationFrameId: null,
                    pendingLiveryPanel: false,
                    isGearTransitioning: false,
                    liveryTooltipTimeout: null,
                    isLiveryTooltipHovered: false,
                    audioInitialized: false,
                    isInitializing: false,
                    kbFocusId: 'car-horizon',
                    kbFocusActive: false,
                    spaceKeyIsDown: false,
                    wasAutoplayingOnSpaceDown: false,
                    isHoldingSpace: false,
                    spaceHoldTimer: null,
                },
                state: {},
                constants: {
                    FRAME_RATE: 60,
                },
                elements: {},
                sounds: {
                    liverySlide: {
                        synth: 'NoiseSynth',
                        options: {
                            volume: -28,
                            noise: { type: "brown" },
                            envelope: { attack: 0.1, decay: 0.6, sustain: 0 },
                            filterEnvelope: {
                                attack: 0.1,
                                decay: 0.5,
                                sustain: 0,
                                baseFrequency: 2500,
                                octaves: 1.5,
                                Q: 2
                            }
                        },
                        paramHandler: function(options, param) {
                            if (param === 'close') {
                                var newOptions = Object.assign({}, options, {
                                    filterEnvelope: Object.assign({}, options.filterEnvelope, {
                                        baseFrequency: 1500
                                    })
                                });
                                return newOptions;
                            }
                            return options;
                        }
                    },
                    tabSwap: 'liverySlide'
                },
                teamData: {
                    'angels': { name: 'Angels', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/d/d1/Angels%27_logo.png/revision/latest' },
                    'wasp':  { name: 'Wasp',  teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/4/46/Wasp%27s_logo.png/revision/latest' },
                    'condor': { name: 'Condor', teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Condor%27s_logo.png/revision/latest' },
                    'zeus':  { name: 'Zeus',  teamLogo: 'https://static.wikia.nocookie.net/screamergame/images/6/6e/Zeus%27s_logo.png/revision/latest/scale-to-width-down/600?cb=20250109210321' }
                },
                vehicleData: {
                    'horizon': {
                        name: 'Horizon', category: 'base',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/b/bd/Horizon_gear_n.png/revision/latest?cb=20251103185728',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/1/10/Horizon_gear_1.png/revision/latest?cb=20251103185746',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/e/e1/Horizon_gear_2.png/revision/latest?cb=20251103185801',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/1/18/Horizon_gear_3.png/revision/latest?cb=20251103185818',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/a/aa/Horizon_gear_4.png/revision/latest?cb=20251103185833'
                        },
                        liveries: {
                            'angels': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/e/e2/Angels_horizon_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/21/S2_angels_car_icon.png/revision/latest', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/9/97/S2_angels_horizon_mp4.mp4/revision/latest' }},
                            'wasp':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/9/92/Wasp_horizon_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/9/97/S2_wasp_car_icon.png/revision/latest', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/8/82/S2_wasp_horizon_mp4.mp4/revision/latest' }},
                            'condor': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/28/Condor_horizon_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/0/05/S2_condor_car_icon.png/revision/latest', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/5/50/S2_condor_horizon_mp4.mp4/revision/latest' }},
                            'zeus':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/a/aa/Zeus_horizon_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/c/c0/S2_zeus_car_icon.png/revision/latest', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/5/58/S2_zeus_horizon_mp4.mp4/revision/latest' }}
                        }
                    },
                    'nebula': {
                        name: 'Nebula', category: 'base',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/8/83/Nebula_gear_n.png/revision/latest?cb=20251103185911',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/a/a0/Nebula_gear_1.png/revision/latest?cb=20251103185933',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/0/09/Nebula_gear_2.png/revision/latest?cb=20251103185949',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/4/45/Nebula_gear_3.png/revision/latest?cb=20251103190012',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/e/e7/Nebula_gear_4.png/revision/latest?cb=20251103190029',
                        },
                        liveries: {
                            'angels': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/3/3a/Angels_nebula_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/7/78/S2_angels_nebula_icon.png/revision/latest?cb=20250907194758', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/4d/S2_angels_nebula_mp4.mp4/revision/latest' }},
                            'wasp':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/7/75/Wasp_nebula_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/2a/S2_wasp_nebula_icon.png/revision/latest?cb=20250907194848', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/7/75/S2_wasp_nebula_mp4.mp4/revision/latest' }},
                            'condor': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/8/89/Condor_nebula_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/a/aa/S2_condor_nebula_icon.png/revision/latest?cb=20250907194826', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/b/b9/S2_condor_nebula_mp4.mp4/revision/latest' }},
                            'zeus':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/5/54/Zeus_nebula_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/d/d3/S2_zeus_nebula_icon.png/revision/latest?cb=20250907194905', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/8/8a/S2_zeus_nebula_mp4.mp4/revision/latest' }}
                        }
                    },
                    'spark': {
                        name: 'Spark', category: 'base',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/2/26/Spark_gear_n.png/revision/latest?cb=20251103190247',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/d/da/Spark_gear_1.png/revision/latest?cb=20251103190305',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/5/5c/Spark_gear_2.png/revision/latest?cb=20251103190331',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/6/68/Spark_gear_3.png/revision/latest?cb=20251103190348',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/f/f2/Spark_gear_4.png/revision/latest?cb=20251103190423'
                        },
                        liveries: {
                            'angels': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/3/34/Angels_spark_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/21/S2_angels_spark_icon.png/revision/latest?cb=20250907203308', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/40/S2_angels_spark_mp4.mp4/revision/latest' }},
                            'wasp':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/6/62/Wasp_spark_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/4/42/S2_wasp_spark_icon.png/revision/latest?cb=20250907203345', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/0/02/S2_wasp_spark_mp4.mp4/revision/latest' }},
                            'condor': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/4/4c/Condor_spark_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/3/3e/S2_condor_spark_icon.png/revision/latest?cb=20250907203330', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/e/e6/S2_condor_spark_mp4.mp4/revision/latest' }},
                            'zeus':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/4/4e/Zeus_spark_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/f/fc/S2_zeus_spark_icon.png/revision/latest?cb=20250907203402', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/f/f8/S2_zeus_spark_mp4.mp4/revision/latest' }}
                        }
                    },
                    'radiance': {
                        name: 'Radiance', category: 'base',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/2/22/Radiance_gear_n.png/revision/latest?cb=20251103190050',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/f/f9/Radiance_gear_1.png/revision/latest?cb=20251103190108',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/e/e6/Radiance_gear_2.png/revision/latest?cb=20251103190149',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/0/0b/Radiance_gear_3.png/revision/latest?cb=20251103190204',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/a/a0/Radiance_gear_4.png/revision/latest?cb=20251103190223'
                        },
                        liveries: {
                            'angels': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/3/3d/Angels_radiance_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/e/ef/S2_angels_radiance_icon.png/revision/latest?cb=20250920101112', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/a/a8/S2_angels_radiance_mp4.mp4/revision/latest' }},
                            'wasp':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/2c/Wasp_radiance_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/7/70/S2_wasp_radiance_icon.png/revision/latest?cb=20250920101206', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/44/S2_wasp_radiance_mp4.mp4/revision/latest' }},
                            'condor': { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/9/9c/Condor_radiance_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/e/e5/S2_condor_radiance_icon.png/revision/latest?cb=20250920101141', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/e/e3/S2_condor_radiance_mp4.mp4/revision/latest' }},
                            'zeus':  { carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/0/07/Zeus_radiance_front.png/revision/latest', navIcon: 'https://static.wikia.nocookie.net/screamergame/images/1/1e/S2_zeus_radiance_icon.png/revision/latest?cb=20250920101226', display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/4/40/S2_zeus_radiance_mp4.mp4/revision/latest' }}
                        }
                    },
                    'hornet': {
                        name: 'Hornet', category: 'bonus',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/1/1d/Hornet_gear_n.png/revision/latest?cb=20251103190454',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/8/8d/Hornet_gear_1.png/revision/latest?cb=20251103190513',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/8/89/Hornet_gear_2.png/revision/latest?cb=20251103190529',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/9/94/Hornet_gear_3.png/revision/latest?cb=20251103190551',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/f/f3/Hornet_gear_4.png/revision/latest?cb=20251103190621'
                        },
                        liveries: {
                            'wasp': { 
                                carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/c/c5/Wasp_hornet_front.png/revision/latest', 
                                navIcon: 'https://static.wikia.nocookie.net/screamergame/images/b/be/S2_wasp_hornet_icon.png/revision/latest?cb=20250920104525', 
                                display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/6/6c/S2_wasp_hornet_mp4.mp4/revision/latest' }
                            }
                        }
                    },
                    'thunder': {
                        name: 'Thunder', category: 'bonus',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/2/25/Thunder_gear_n.png/revision/latest?cb=20251103190643',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/c/c5/Thunder_gear_1.png/revision/latest?cb=2S0251103190710',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/8/87/Thunder_gear_2.png/revision/latest?cb=20251103190741',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/7/7b/Thunder_gear_3.png/revision/latest?cb=20251103190802',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/2/21/Thunder_gear_4.png/revision/latest?cb=20251103190830'
                        },
                        liveries: {
                            'zeus': {
                                carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/2/2c/Zeus_thunder_front.png/revision/latest',
                                navIcon: 'https://static.wikia.nocookie.net/screamergame/images/6/69/S2_zeus_thunder_icon.png/revision/latest?cb=20250920104538',
                                display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/b/b3/S2_zeus_thunder.mp4/revision/latest' }
                            }
                        }
                    },
                    'aphrodite': {
                        name: 'Aphrodite', category: 'bonus',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/8/84/Aphrodite_gear_n.png/revision/latest?cb=20251103185355',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/4/41/Aphrodite_gear_1.png/revision/latest?cb=20251103185419',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/2/27/Aphrodite_gear_2.png/revision/latest?cb=20251103185435',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/c/cb/Aphrodite_gear_3.png/revision/latest?cb=20251103185450',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/5/57/Aphrodite_gear_4.png/revision/latest?cb=20251103185506'
                        },
                        liveries: {
                            'angels': {
                                carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/8/81/Angels_aphrodite_front.png/revision/latest',
                                navIcon: 'https://static.wikia.nocookie.net/screamergame/images/a/ab/S2_angels_aphrodite_icon.png/revision/latest?cb=20250920104449',
                                display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/1/1b/S2_angels_aphrodite_mp4.mp4/revision/latest' }
                            }
                        }
                    },
                    'blackclaw': {
                        name: 'Black Claw', category: 'bonus',
                        interiorGears: {
                            'n': 'https://static.wikia.nocookie.net/screamergame/images/6/6e/Blackclaw_gear_n.png/revision/latest?cb=20251103185533',
                            '1': 'https://static.wikia.nocookie.net/screamergame/images/7/7b/Blackclaw_gear_1.png/revision/latest?cb=20251103185607',
                            '2': 'https://static.wikia.nocookie.net/screamergame/images/8/81/Blackclaw_gear_2.png/revision/latest?cb=20251103185630',
                            '3': 'https://static.wikia.nocookie.net/screamergame/images/8/80/Blackclaw_gear_3.png/revision/latest?cb=20251103185648',
                            '4': 'https://static.wikia.nocookie.net/screamergame/images/d/db/Blackclaw_gear_4.png/revision/latest?cb=20251103185704'
                        },
                        liveries: {
                            'condor': {
                                carouselIcon: 'https://static.wikia.nocookie.net/screamergame/images/f/fb/Condor_blackclaw_front.png/revision/latest',
                                navIcon: 'https://static.wikia.nocookie.net/screamergame/images/6/60/S2_condor_blackclaw_icon.png/revision/latest?cb=20250920104509',
                                display: { type: 'video', src: 'https://static.wikia.nocookie.net/screamergame/images/b/b2/S2_condor_black-claw.mp4/revision/latest' }
                            }
                        }
                    }
                },
                parseAndLoadData: function() {
                    var $source = $('#vva-data-source');
                    if (!$source.length) return;
                    var extractStat = function(key, lines) {
                        var line = lines.find(function(l) { return l.trim().startsWith(':' + key + ':'); });
                        return line ? line.split(':').slice(2).join(':').trim() : null;
                    };
                    var extractStatWithHtml = function(key, lines, container) {
                        var lineText = extractStat(key, lines);
                        if (!lineText) return 'N/A';
                        
                        var link = container.find('a').filter(function() {
                            return $(this).text().trim() === lineText;
                        }).first();
                        return link.length ? link.attr('draggable', 'false').prop('outerHTML') : (lineText || 'N/A');
                    };
                    $source.find('.vva-data-entry').each(function() {
                        var $entry = $(this);
                        var carId = $entry.data('car-id');
                        if (App.vehicleData[carId]) {
                            App.vehicleData[carId].description = $entry.find('.vva-description').html() || 'No description available.';
                            
                            var $statsContainer = $entry.find('.vva-stats');
                            var stats = {};
                            if ($statsContainer.length) {
                                var rawStatsHtml = $statsContainer.html();
                                var lines = rawStatsHtml.split(/<br\s*\/?>|\n/).map(function(line) {
                                    return $('<div>').html(line).text();
                                });
                                var mphText = extractStat('Top Speed MPH', lines);
                                var kmhText = extractStat('Top Speed KMH', lines);
                                var mph = mphText ? parseInt(mphText, 10) : null;
                                var kmh = kmhText ? parseInt(kmhText, 10) : null;
                                if (mph && !kmh) {
                                    kmh = Math.round(mph * 1.60934);
                                } else if (kmh && !mph) {
                                    mph = Math.round(kmh / 1.60934);
                                }
                                if (mph && kmh) {
                                    stats['Top Speed'] = { imperial: mph + ' MPH', metric: kmh + ' KM/H' };
                                } else {
                                    stats['Top Speed'] = 'N/A';
                                }
                                
                                var transmissionType = extractStat('Transmission', lines);
                                if (transmissionType && transmissionType.trim() !== '') {
                                    stats['Transmission'] = '4-speed ' + transmissionType;
                                } else {
                                    stats['Transmission'] = 'N/A';
                                }
                                
                                stats['Real Car'] = extractStatWithHtml('Real Car', lines, $statsContainer);
                            }
                            App.vehicleData[carId].stats = stats;
                        }
                    });
                },
                initializeAudio: function() {
                    if (App.state.audioInitialized || typeof Tone === 'undefined') {
                        return Promise.resolve();
                    }
                    
                    return new Promise(function(resolve, reject) {
                        var onLoaded = function() {
                            App.state.audioInitialized = true;
                            resolve();
                        };
                        
                        var onStarted = function() {
                            Tone.loaded().then(onLoaded).catch(reject);
                        };
                
                        if (Tone.context.state !== 'running') {
                            Tone.start().then(onStarted).catch(function(e) {
                                console.error("Audio context failed to start.", e);
                                reject(e); 
                            });
                        } else {
                            onStarted();
                        }
                    });
                },
                playSound: function(soundId, param) {
                    param = (param === undefined) ? null : param;
                    if (!App.state.audioInitialized || typeof Tone === 'undefined' || App.state.isInitializing) return;
                    
                    var soundConfig = App.sounds[soundId];
                    
                    var depth = 0;
                    while (typeof soundConfig === 'string' && depth < 5) {
                        soundConfig = App.sounds[soundConfig];
                        depth++;
                    }
                    if (typeof soundConfig !== 'object') return;
                    
                    try {
                        var now = Tone.now();
                        if (typeof soundConfig.customTrigger === 'function') {
                            soundConfig.customTrigger(now, param);
                            return;
                        }
                        if (!soundConfig.synth || !soundConfig.options) return;
                        var synth;
                        var soundOptions = Object.assign({}, soundConfig.options);
                        if (typeof soundConfig.paramHandler === 'function') {
                            soundOptions = soundConfig.paramHandler(soundOptions, param);
                        }
                        if (soundConfig.synth === 'NoiseSynth') {
                            synth = new Tone.NoiseSynth(soundOptions).toDestination();
                        } else if (soundConfig.synth === 'MembraneSynth') {
                            synth = new Tone.MembraneSynth(soundOptions).toDestination();
                        } else {
                            return;
                        }
                        if (soundConfig.synth === 'MembraneSynth') {
                            synth.triggerAttackRelease("C1", "8n", now);
                        } else {
                            synth.triggerAttack(now);
                        }
                        var durationInMs = 300;
                        if (soundOptions.envelope) {
                                durationInMs = ((soundOptions.envelope.attack || 0) + (soundOptions.envelope.decay || 0) + (soundOptions.envelope.release || 0.1)) * 1000 + 200;
                        }
                        
                        setTimeout(function() { synth.dispose(); }, durationInMs);
                    } catch (e) {
                        console.error("Error playing sound:", soundId, e);
                    }
                },
                performTransition: function(options, actionCallback, onCompleteCallback) {
                    var $overlay = $('#vva-transition-overlay');
                    var outEffect = options.out || null;
                    var inEffect = options.in || null;
                    var outDuration = (outEffect === 'default') ? (options.duration || 200) : 0;
                    var inDuration = (inEffect === 'default') ? (options.duration || 200) : 0;
                    var color = (options.color || '#000');
                    
                    if (App.state.isInitializing) {
                        outDuration = 0;
                        inDuration = 0;
                    }
                    $overlay.css('background-color', color);
                    var fadeIn = function() {
                        if (inEffect === 'default') {
                            $overlay.fadeTo(inDuration, 0, function() {
                                $overlay.css('visibility', 'hidden');
                                if (onCompleteCallback) onCompleteCallback();
                            });
                        } else {
                            $overlay.css({ 'opacity': 0, 'visibility': 'hidden' });
                            if (onCompleteCallback) onCompleteCallback();
                        }
                    };
                    var doAction = function() {
                        if (actionCallback) {
                            actionCallback();
                        }
                        fadeIn();
                    };
                    if (outEffect === 'default') {
                        $overlay.css('visibility', 'visible');
                        $overlay.fadeTo(outDuration, 1, doAction);
                    } else {
                        if (inEffect !== 'default') {
                            $overlay.css({ 'opacity': 0, 'visibility': 'hidden' });
                        }
                        doAction();
                    }
                },
                showView: function() {
                    var model = App.vehicleData[App.state.activeModelId];
                    var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
                    var $activeView;
                    
                    App.updateAllIconVisibility();
                    
                    var isVehicleView = App.state.activeView === 'vehicle';
                    $('.vva-rotate-icon-button').toggleClass('is-visible', isVehicleView && !App.state.isAutoplaying);
                    $('.vva-interior-gear-controls').toggleClass('is-visible', App.state.activeView === 'interior');
                    
                    $('.vva-view').hide();
                    
                    if(isVehicleView) {
                        $('.vva-video-player-view').css('display', 'flex');
                    } else {
                        $('.vva-video-player-view').hide();
                    }
                    var selector = '';
                    switch(App.state.activeView) {
                        case 'vehicle':
                            var videoSrc;
                            videoSrc = model.liveries[activeLiveryId].display.src;
                            
                            if (App.elements.videoPlayerForward.attr('src') !== videoSrc) {
                                App.elements.videoPlayerForward.attr('src', videoSrc);
                            }
                            App.elements.videoPlayerForward.addClass('is-active');
                            App.setAutoplay(true);
                            
                            return;
                        case 'interior':
                            selector = `.vva-view[data-model-id="${App.state.activeModelId}"][data-view-type="interior"]`;
                            var currentGear = App.state.modelGearState[App.state.activeModelId] || 'n';
                            if (model.interiorGears && model.interiorGears[currentGear]) {
                                var $view = $(selector);
                                $view.find('img').remove(); 
                                $view.append($('<img>', { 
                                    src: model.interiorGears[currentGear], 
                                    alt: model.name + ' interior' 
                                }));
                                $('.vva-interior-gear-controls .vva-gear-button').removeClass('vva-active');
                                $('.vva-interior-gear-controls .vva-gear-button[data-gear="' + currentGear + '"]').addClass('vva-active');
                            }
                            break;
                        case 'info':
                            $activeView = $('.vva-view[data-view-type="info"]').empty();
                            
                            var infoMediaData = model.liveries[activeLiveryId].display;
                            var infoMediaTag = infoMediaData.type === 'video' ?
                                '<video src="' + infoMediaData.src + '" autoplay loop muted playsinline ondragstart="return false;"></video>' : '<img src="' + infoMediaData.src + '" />';
                            var statsHtml = '';
                            if (model.stats) {
                                $.each(model.stats, function(key, value) { 
                                    var statDisplayValue = '';
                                    var dataAttrs = '';
                                    var statClass = 'vva-stat-value';
                                    
                                    if (typeof value === 'object' && value.imperial && value.metric) {
                                        statDisplayValue = value[App.state.unitSystem];
                                        dataAttrs = 'data-imperial="' + value.imperial + '" data-metric="' + value.metric + '"';
                                        if (key === 'Top Speed') {
                                            statClass += ' vva-stat-speed';
                                        }
                                    } else {
                                        statDisplayValue = value;
                                        if (key === 'Real Car' && String(statDisplayValue).startsWith('<a')) {
                                            var $link = $(statDisplayValue);
                                            $link.attr('data-focus-id', 'info-link');
                                            $link.attr('data-focus-group', 'info-panel');
                                            statDisplayValue = $link.prop('outerHTML');
                                        }
                                    }
                                    statsHtml += '<li><span>' + key + '</span><span><span class="' + statClass + '" ' + dataAttrs + '>' + statDisplayValue + '</span></span></li>';
                                });
                            }
                            var infoHtml = '<div class="vva-info-content-wrapper">' +
                                            '<div class="vva-info-header"><div class="vva-info-gif">' + infoMediaTag + '</div><div class="vva-info-description">' + model.description + '</div></div>' +
                                            '<div class="vva-info-stats"><h4>Statistics</h4><ul>' + statsHtml + '</ul></div>' +
                                        '</div>';
                            $activeView.html(infoHtml);
                            selector = '.vva-view[data-view-type="info"]';
                            break;
                    }
                    $activeView = $(selector);
                    if ($activeView.length) {
                        $('.vva-view:visible').not($activeView).hide();
                        $activeView.css('display', 'flex');
                        
                        var $infoVideo = $activeView.find('video');
                        if ($infoVideo.length) {
                            $infoVideo.each(function() {
                                this.currentTime = 0;
                                this.play().catch(function(){});
                            });
                        }
                    }
                },
                updateAllIconVisibility: function() {
                    var model = App.vehicleData[App.state.activeModelId];
                    var $lsButton = $('.vva-nav-icon-ls-livery-select');
                    
                    var showLsButton = App.state.activeView === 'vehicle';
                    
                    $lsButton.toggleClass('is-faded-out', !showLsButton);
                    if (showLsButton) {
                        var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
                        App.updateLiveryToggleButtonIcon(activeLiveryId);
                        
                        if (Object.keys(model.liveries).length > 1) {
                            $lsButton.removeClass('is-disabled');
                        } else {
                            $lsButton.addClass('is-disabled');
                        }
                    }
                },
                updateLiveryToggleButtonIcon: function(teamId) {
                    var $button = $('.vva-nav-icon-ls-livery-select');
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
                updateLiveryUI: function(model) {
                    var $iconWrapper = $('.vva-livery-icon-wrapper');
                    $iconWrapper.empty();
                    var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
                    $.each(model.liveries, function(liveryId, livery) {
                        var team = App.teamData[liveryId];
                        if (!team) return; 
                        var $liveryIcon = $('<button>', { 
                            class: 'vva-livery-icon' + (liveryId === activeLiveryId ? ' vva-active' : ''), 
                            'data-livery-id': liveryId,
                            'data-focus-id': 'livery-' + liveryId,
                            'data-focus-group': 'livery-panel',
                            'aria-label': 'Select ' + team.name
                        })
                            .append($('<img>', { src: livery.carouselIcon }), $('<div>', { class: 'vva-livery-name', text: team.name }));
                        $iconWrapper.append($liveryIcon);
                    });
                },
                toggleSubPanel: function(panelType, forceOpen) {
                    forceOpen = (forceOpen === undefined) ? null : forceOpen;
                    App.initializeAudio().then(function() {
                        if (panelType !== 'livery') {
                            App.forceHideLiveryTooltip();
                        }
                        var currentPanel = App.state.activeSubPanel;
                        var isOpening = false;
                        if (forceOpen === true) {
                            isOpening = true;
                        } else if (forceOpen === false) {
                            isOpening = false;
                        } else {
                            isOpening = (currentPanel !== panelType);
                        }
                        if (currentPanel) {
                            if (currentPanel === 'livery') {
                                $('.vva-livery-panel').removeClass('vva-open');
                                App.playSound('liverySlide', 'close');
                            } else if (currentPanel === 'settings') {
                                $('#vva-settings-panel').removeClass('is-visible');
                            } else if (currentPanel === 'info') {
                                $('#vva-app-info-tooltip').removeClass('is-visible');
                            }
                        }
                        
                        App.state.activeSubPanel = null;
                        if (isOpening && panelType) {
                            var model = App.vehicleData[App.state.activeModelId];
                            var $newPanelElem;
                            if (panelType === 'livery') {
                                if (Object.keys(model.liveries).length <= 1) { 
                                    App.showLiveryTooltip('temp');
                                    return; 
                                }
                                $newPanelElem = $('.vva-livery-panel').addClass('vva-open');
                                App.updateLiveryUI(model);
                                App.playSound('liverySlide');
                            } else if (panelType === 'settings') {
                                $newPanelElem = $('#vva-settings-panel').addClass('is-visible');
                                App.updateSettingsUI();
                            } else if (panelType === 'info') {
                                $newPanelElem = $('#vva-app-info-tooltip').addClass('is-visible');
                            }
                            if ($newPanelElem) {
                                App.state.activeSubPanel = panelType;
                            }
                        }
                    });
                },
                updateSettingsUI: function() {
                    $(`input[name="unit-system"][value="${App.state.unitSystem}"]`).prop('checked', true);
                },
                endTransition: function(callback) {
                    setTimeout(function() {
                        App.state.isTransitioning = false;
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }, App.state.isInitializing ? 0 : 100);
                },
                setActiveView: function(e) {
                    App.initializeAudio().then(function() {
                        if (App.state.isInitializing && !e.force) return;
                        if (App.state.isTransitioning && !App.state.isInitializing) return;
                        App.forceHideLiveryTooltip();
                        
                        var $button = $(e.currentTarget);
                        var newViewName = $button.data('view');
                        if (newViewName === App.state.activeView) {
                            var previousViewName = App.state.previousView;
                            if (previousViewName !== newViewName) {
                                var $previousButton = $('.vva-right-icons .vva-icon-button[data-view="' + previousViewName + '"]');
                                if ($previousButton.length) {
                                    App.setActiveView({ currentTarget: $previousButton[0] });
                                }
                            }
                            return;
                        }
                        
                        App.playSound('tabSwap');
                        App.state.isTransitioning = true;
                        
                        var proceedToViewChange = function() {
                            var updateAndShow = function() {
                                App.state.previousView = App.state.activeView;
                                App.state.activeView = newViewName;
                                if (newViewName === 'vehicle') {
                                    App.setAutoplay(true);
                                } else {
                                    App.setAutoplay(false);
                                }
                                $('.vva-right-icons .vva-icon-button').removeClass('vva-active');
                                $button.addClass('vva-active');
                                App.showView();
                            };
                            
                            var onTransitionComplete = function() {
                                App.endTransition(function() {
                                    if (App.state.pendingLiveryPanel && App.state.activeView === 'vehicle') {
                                        App.toggleSubPanel('livery', true);
                                        App.state.pendingLiveryPanel = false;
                                    }
                                });
                            };
                            
                            if (App.state.activeView === 'vehicle') {
                                $('.vva-rotate-icon-button').removeClass('is-visible');
                            } else if (App.state.activeView === 'interior') {
                                $('.vva-interior-gear-controls').removeClass('is-visible');
                            }
                            App.performTransition(
                                { out: 'default', in: 'default', duration: 200 }, 
                                updateAndShow, 
                                onTransitionComplete
                            );
                        };
                        
                        if (App.state.activeSubPanel === 'livery') {
                            $('.vva-livery-panel').one('transitionend', proceedToViewChange);
                            App.toggleSubPanel(null, false);
                        } else {
                            if (App.state.activeSubPanel) {
                                App.toggleSubPanel(null, false);
                            }
                            proceedToViewChange();
                        }
                    });
                },
                setActiveModel: function(e) {
                    App.initializeAudio().then(function() {
                        if (App.state.isInitializing && !e.force) return;
                        if (App.state.isTransitioning && !App.state.isInitializing) return;
                        App.forceHideLiveryTooltip();
                        var modelId = $(e.currentTarget).data('model-id');
                        if (modelId === App.state.activeModelId) return;
                        
                        App.state.isTransitioning = true;
                        var newModel = App.vehicleData[modelId];
                        var updateAndShow = function() {
                            App.state.activeModelId = modelId;
                            $('.vva-vehicle-icon').removeClass('vva-active');
                            var $activeIcon = $('.vva-vehicle-icon[data-model-id="' + modelId + '"]');
                            $activeIcon.addClass('vva-active');
                            
                            App.updateVehiclePreviewIcon();
                            if (App.state.activeSubPanel === 'livery' && Object.keys(newModel.liveries).length > 1) {
                                App.updateLiveryUI(newModel);
                            }
                            App.showView();
                            if (!App.state.isInitializing && $activeIcon.length && $activeIcon[0].scrollIntoView) {
                                $activeIcon[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            }
                        };
                        var proceedWithModelChange = function() {
                            if (App.state.activeView === 'vehicle') {
                                $('.vva-rotate-icon-button').removeClass('is-visible');
                            } else if (App.state.activeView === 'interior') {
                                $('.vva-interior-gear-controls').removeClass('is-visible');
                            }
                            
                            App.performTransition(
                                { out: 'default', in: 'default', duration: 200 }, 
                                updateAndShow,
                                function() { App.endTransition(); }
                            );
                        };
                        if (App.state.activeSubPanel === 'livery' && Object.keys(newModel.liveries).length <= 1) {
                            $('.vva-livery-panel').one('transitionend', proceedWithModelChange);
                            App.toggleSubPanel('livery', false);
                        } else {
                            proceedWithModelChange();
                        }
                    });
                },
                setActiveLivery: function(e) {
                    App.initializeAudio().then(function() {
                        if (App.state.isInitializing && !e.force) return;
                        if (App.state.isTransitioning && !App.state.isInitializing) return;
                        e.stopPropagation();
                        var modelId = App.state.activeModelId;
                        var liveryId = $(e.currentTarget).data('livery-id');
                        if (App.state.modelLiveryState[modelId] === liveryId) return;
                        
                        App.state.isTransitioning = true;
                        App.state.modelLiveryState[modelId] = liveryId;
                        App.updateCarouselIcon(modelId);
                        App.updateVehiclePreviewIcon();
                        App.updateLiveryToggleButtonIcon(liveryId);
                        var model = App.vehicleData[modelId];
                        App.updateLiveryUI(model);
                        var $visibleView = $('.vva-view:visible, .vva-video-player-view:visible');
                        var updateAndShow = function() {
                            App.showView();
                        };
                        if ($visibleView.length) {
                            if (App.state.activeView === 'vehicle') {
                                $('.vva-rotate-icon-button').removeClass('is-visible');
                            } else if (App.state.activeView === 'interior') {
                                $('.vva-interior-gear-controls').removeClass('is-visible');
                            }
                            
                            App.performTransition(
                                { out: 'default', in: 'default', duration: 200 },
                                updateAndShow,
                                function() { App.endTransition(); }
                            );
                        } else {
                            updateAndShow();
                            App.endTransition();
                        }
                    });
                },
                updateCarouselIcon: function(modelId) {
                    var model = App.vehicleData[modelId];
                    if (!model || !model.liveries) return;
                    var activeLiveryId = App.state.modelLiveryState[modelId];
                    if (!activeLiveryId || !model.liveries[activeLiveryId] || !model.liveries[activeLiveryId].carouselIcon) return;
                    
                    var newIconSrc = model.liveries[activeLiveryId].carouselIcon;
                    var $iconImg = $('.vva-vehicle-icon[data-model-id="' + modelId + '"] img');
                    
                    if (App.state.isInitializing) {
                        $iconImg.attr('src', newIconSrc);
                        return;
                    }
                    
                    $iconImg.stop(true, true).fadeOut(200, function() {
                        $(this).attr('src', newIconSrc).fadeIn(200);
                    });
                },
                updateVehiclePreviewIcon: function() {
                    var model = App.vehicleData[App.state.activeModelId];
                    var iconSrc = '';
                    var activeLiveryId = App.state.modelLiveryState[App.state.activeModelId];
                    var livery = model.liveries[activeLiveryId];
                    
                    if (livery) {
                        iconSrc = livery.navIcon || livery.carouselIcon;
                    }
                    var $iconImg = $('.vva-nav-icon-vp-vehicle-preview img');
                    if ($iconImg.attr('src') !== iconSrc) {
                        if (App.state.isInitializing) {
                            $iconImg.attr('src', iconSrc).show();
                            return;
                        }
                        $iconImg.stop(true, true).fadeOut(200, function() {
                            $(this).attr('src', iconSrc).fadeIn(200);
                        });
                    }
                },
                setGear: function(gear) {
                    App.initializeAudio().then(function() {
                        if (App.state.isInitializing) return;
                        
                        if (App.state.activeView !== 'interior') return;
                        if (App.state.isGearTransitioning) return;
                        var modelId = App.state.activeModelId;
                        var model = App.vehicleData[modelId];
                        var currentGear = App.state.modelGearState[modelId] || 'n';
                        if (!model || !model.interiorGears || !model.interiorGears[gear] || currentGear === gear) {
                            return;
                        }
                        App.state.isGearTransitioning = true;
                        App.state.modelGearState[modelId] = gear;
                        $('.vva-interior-gear-controls .vva-gear-button').removeClass('vva-active');
                        $('.vva-interior-gear-controls .vva-gear-button[data-gear="' + gear + '"]').addClass('vva-active');
                        
                        var $activeInteriorView = $('.vva-view[data-model-id="' + modelId + '"][data-view-type="interior"]');
                        var newImgSrc = model.interiorGears[gear];
                        var $oldImg = $activeInteriorView.find('img');
                        var $newImg = $('<img>', {
                            src: newImgSrc,
                            alt: model.name + ' interior ' + gear,
                        });
                        $newImg.css('opacity', 1);
                        $activeInteriorView.prepend($newImg);
                        if ($oldImg.length) {
                            if (App.state.isInitializing) {
                                $oldImg.remove();
                                App.state.isGearTransitioning = false;
                            } else {
                                $oldImg.stop(true, false).animate({ opacity: 0 }, 200, function() {
                                    $(this).remove();
                                    App.state.isGearTransitioning = false;
                                });
                            }
                        } else {
                            App.state.isGearTransitioning = false;
                        }
                    });
                },
                gatherAllAssets: function(isVideo) {
                    var assets = [];
                    $.each(App.vehicleData, function(modelId, model) {
                        if (!isVideo) {
                            if (model.interiorGears) {
                                $.each(model.interiorGears, function(gear, url) {
                                    assets.push(url);
                                });
                            }
                        }
                        if (model.liveries) {
                            $.each(model.liveries, function(liveryId, livery) {
                                if (!isVideo) {
                                    if (livery.carouselIcon) assets.push(livery.carouselIcon);
                                    if (livery.navIcon) assets.push(livery.navIcon);
                                }
                                if(isVideo && livery.display) {
                                    if(livery.display.src) assets.push(livery.display.src);
                                }
                            });
                        }
                    });
                    if (!isVideo) {
                        $.each(App.teamData, function(teamId, team) {
                            if (team.teamLogo) assets.push(team.teamLogo);
                        });
                    }
                    var seen = {};
                    var uniqueAssets = assets.filter(function(url) {
                        var duplicate = seen.hasOwnProperty(url);
                        seen[url] = true;
                        return !duplicate;
                    });
                    return uniqueAssets;
                },
                startPreloading: function(assetList, onComplete) {
                    var totalAssets = assetList.length;
                    var loadedAssets = 0;
                    var $progressBar = $('#vva-progress-bar-inner');
                    
                    if (totalAssets === 0) {
                        if(onComplete) onComplete();
                        return;
                    }
                    var onAssetLoaded = function() {
                        loadedAssets++;
                        var percent = (loadedAssets / totalAssets) * 100;
                        $progressBar.css('width', percent + '%');
                        if (loadedAssets === totalAssets) {
                            if(onComplete) onComplete();
                        }
                    };
                    assetList.forEach(function(url) {
                        if (url.endsWith('.mp4')) {
                            var video = document.createElement('video');
                            video.oncanplaythrough = onAssetLoaded;
                            video.onerror = onAssetLoaded;
                            video.preload = 'auto';
                            video.muted = true;
                            video.src = url;
                            video.load();
                        } else if (/\.(jpeg|jpg|gif|png|webp)$/i.test(url)) {
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
                    var interiorViewsHtml = '';
                    $.each(App.vehicleData, function(modelId, model) {
                        if (model.interiorGears && model.interiorGears.n) {
                            interiorViewsHtml += '<div class="vva-view" data-model-id="' + modelId + '" data-view-type="interior">' +
                                '<img src="' + model.interiorGears.n + '" alt="'+ model.name +' interior"/>' +
                                '</div>';
                        }
                    });
                    
                    var leftIcons = 
                        '<button class="vva-icon-button vva-nav-icon-ls-livery-select" data-focus-id="livery-button" data-focus-group="left-icons" aria-label="Select Livery"></button>' +
                        '<div id="vva-livery-tooltip" class="vva-tooltip">Bonus cars do not have additional liveries.</div>' +
                        '<button class="vva-icon-button vva-nav-icon-settings" data-focus-id="settings-button" data-focus-group="left-icons" aria-label="Toggle Settings">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M19.43,12.98c0.04-0.32,0.07-0.64,0.07-0.98s-0.03-0.66-0.07-0.98l2.11-1.65c0.19-0.15,0.24-0.42,0.12-0.64l-2-3.46 c-0.12-0.22-0.39-0.3-0.61-0.22l-2.49,1c-0.52-0.4-1.08-0.73-1.69-0.98l-0.38-2.65C14.46,2.18,14.25,2,14,2h-4 c-0.25,0-0.46,0.18-0.49,0.42L9.13,5.07c-0.61,0.25-1.17,0.59-1.69,0.98l-2.49-1c-0.23-0.09-0.49,0-0.61,0.22l-2,3.46 c-0.13,0.22-0.07,0.49,0.12,0.64l2.11,1.65c-0.04,0.32-0.07,0.65-0.07,0.98s0.03,0.66,0.07,0.98l-2.11,1.65 c-0.19,0.15-0.24,0.42-0.12,0.64l2,3.46c0.12,0.22,0.39,0.3,0.61,0.22l2.49-1c0.52,0.4,1.08,0.73,1.69,0.98l0.38,2.65 c0.03,0.24,0.24,0.42,0.49,0.42h4c0.25,0,0.46-0.18,0.49,0.42l0.38-2.65c0.61-0.25,1.17-0.59,1.69-0.98l2.49,1 c0.23,0.09,0.49,0,0.61,0.22l2-3.46c0.12-0.22,0.07-0.49-0.12-0.64L19.43,12.98z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5 s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z"/></svg>' +
                        '</button>' +
                        '<button class="vva-icon-button vva-nav-icon-app-info" data-focus-id="help-button" data-focus-group="left-icons" aria-label="Toggle Help & Hotkeys">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></svg>' +
                        '</button>';
                    
                    var appInfoTooltip = 
                        '<div id="vva-app-info-tooltip" class="vva-tooltip">' +
                            '<h4>Hotkeys</h4>' +
                            '<ul>' +
                                '<li><span>↑ / ↓</span> Navigate UI</li>' +
                                '<li><span>← / →</span> Cycle Items</li>' +
                                '<li><span>ENTER</span> Select Item</li>' +
                                '<li><span>SPACE</span> Toggle Rotation (Tap)</li>' +
                                '<li><span>SPACE</span> Rotate Vehicle (Hold)</li>' +
                                '<li><span>L</span> Toggle Livery Panel</li>' +
                                '<li><span>I</span> Toggle Help</li>' +
                                '<li><span>N, 1-4</span> Change Gear (Interior)</li>' +
                            '</ul>' +
                        '</div>';
                    var settingsPanel = 
                        '<div id="vva-settings-panel" class="vva-tooltip">' +
                            '<div class="vva-settings-content">' +
                                '<span class="vva-setting-label">Unit System:</span>' +
                                '<div class="vva-radio-group">' +
                                    '<label data-focus-id="unit-imperial" data-focus-group="settings-panel" class="vva-kb-radio-label"><input type="radio" name="unit-system" value="imperial" checked> Imperial</label>' +
                                    '<label data-focus-id="unit-metric" data-focus-group="settings-panel" class="vva-kb-radio-label"><input type="radio" name="unit-system" value="metric"> Metric</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    
                    var rightIcons = 
                        '<button class="vva-icon-button vva-nav-icon-vp-vehicle-preview vva-active" data-focus-id="view-vehicle" data-focus-group="right-icons" data-view="vehicle" aria-label="Vehicle View">' +
                            '<img src="" alt=""/>' +
                        '</button>' +
                        '<button class="vva-icon-button vva-nav-icon-ip-interior-preview" data-focus-id="view-interior" data-focus-group="right-icons" data-view="interior" aria-label="Interior View">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8.5 8.62v6.76L5.12 12 8.5 8.62M10 5l-7 7 7 7V5zm4 0v14l7-7-7-7z"/></svg>' +
                        '</button>' +
                        '<button class="vva-icon-button vva-nav-icon-vehicle-info" data-focus-id="view-info" data-focus-group="right-icons" data-view="info" aria-label="Vehicle Info">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>' +
                        '</button>';
                    
                    var modalHtml = 
                        '<div id="vva-modal-overlay">' +
                            '<div id="vva-modal">' +
                                '<h3 id="vva-modal-title"></h3>' +
                                '<p id="vva-modal-content"></p>' +
                                '<div id="vva-modal-actions">' +
                                    '<button id="vva-modal-cancel">Cancel</button>' +
                                    '<button id="vva-modal-confirm">Confirm</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    var appHtml = 
                        '<div id="vva-loading-screen">' +
                            '<div class="vva-loading-text">Loading Assets...</div>' +
                            '<div id="vva-progress-bar-outer"><div id="vva-progress-bar-inner"></div></div>' +
                        '</div>' +
                        '<div id="vva-main-container">' +
                            modalHtml +
                            '<div class="vva-top-border"></div>' +
                            '<div class="vva-livery-panel"><div class="vva-livery-icon-wrapper"></div></div>' +
                            '<div class="vva-main-content">' +
                               '<div id="vva-transition-overlay"></div>' +
                               interiorViewsHtml +
                               '<div class="vva-view vva-info-page" data-view-type="info"></div>' +
                               '<div class="vva-video-player-view">' +
                                   '<video class="vva-video-forward" loop muted playsinline preload="auto" oncontextmenu="return false;"></video>' +
                               '</div>' +
                            '</div>' +
                            '<div class="vva-bottom-border-bar">' +
                                '<div class="vva-bottom-bar-center-wrapper">' +
                                    '<button class="vva-rotate-icon-button" data-direction="right" aria-label="Rotate Right">&#x21BB;</button>' +
                                '</div>' +
                                '<div class="vva-interior-gear-controls">' +
                                    '<button class="vva-gear-button" data-focus-id="gear-n" data-focus-group="gears" data-gear="n" aria-label="Set Gear to Neutral">N</button>' +
                                    '<button class="vva-gear-button" data-focus-id="gear-1" data-focus-group="gears" data-gear="1" aria-label="Set Gear to 1">1</button>' +
                                    '<button class="vva-gear-button" data-focus-id="gear-2" data-focus-group="gears" data-gear="2" aria-label="Set Gear to 2">2</button>' +
                                    '<button class="vva-gear-button" data-focus-id="gear-3" data-focus-group="gears" data-gear="3" aria-label="Set Gear to 3">3</button>' +
                                    '<button class="vva-gear-button" data-focus-id="gear-4" data-focus-group="gears" data-gear="4" aria-label="Set Gear to 4">4</button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="vva-icon-button-container vva-left-icons">' + leftIcons + '</div>' +
                            '<div class="vva-icon-button-container vva-right-icons">' + rightIcons + '</div>' +
                            appInfoTooltip +
                            settingsPanel +
                            '<div class="vva-footer">' +
                                '<div class="vva-footer-content-wrapper">' +
                                    '<div class="vva-filter-controls">' +
                                        '<button class="vva-filter-button" data-focus-id="filter-base" data-focus-group="filters" data-filter="base">Regular</button>' +
                                        '<button class="vva-filter-button" data-focus-id="filter-bonus" data-focus-group="filters" data-filter="bonus">Bonus</button>' +
                                    '</div>' +
                                    '<div class="vva-vehicle-selector"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    $app.html(appHtml);
                    
                    App.elements.videoPlayerForward = $app.find('.vva-video-forward');
                    
                    var $liveryButton = $app.find('.vva-nav-icon-ls-livery-select');
                    $.each(App.teamData, function(teamId, team) {
                        $liveryButton.append($('<img>', { src: team.teamLogo, 'data-team-id': teamId, style: 'display: none;' }));
                    });
                },
                finishLoading: function() {
                    App.state.isInitializing = true;
                    var $app = $('#vehicle-viewer-app');
                    var $loadingScreen = $('#vva-loading-screen');
                    var $mainContainer = $('#vva-main-container');
                    var originalModel = App.state.activeModelId;
                    var originalView = App.state.activeView;
                    $.each(App.vehicleData, function(modelId, model) {
                        App.state.activeModelId = modelId;
                        
                        if (model.liveries) {
                            $.each(model.liveries, function(liveryId) {
                                App.state.modelLiveryState[modelId] = liveryId;
                                App.state.activeView = 'info';
                                App.showView();
                            });
                        }
                        
                        if (model.interiorGears) {
                            App.state.activeView = 'interior';
                            App.showView(); 
                            $.each(model.interiorGears, function(gear) {
                                App.setGear(gear); 
                            });
                        }
                    });
                    
                    App.state.activeModelId = App.initialState.activeModelId;
                    App.state.activeView = App.initialState.activeView;
                    App.state.previousView = App.initialState.previousView;
                    App.state.modelLiveryState = Object.assign({}, App.initialState.modelLiveryState);
                    App.state.modelGearState = Object.assign({}, App.initialState.modelGearState);
                    $.each(App.vehicleData, function(modelId, model) {
                        if (model.liveries) {
                            var firstLiveryId = Object.keys(model.liveries)[0];
                            if (firstLiveryId) { App.state.modelLiveryState[modelId] = firstLiveryId; }
                        }
                        App.state.modelGearState[modelId] = 'n';
                    });
                    App.updateSettingsUI();
                    $('.vva-filter-button').addClass('vva-active');
                    App.updateVehicleSelector();
                    App.updateVehiclePreviewIcon();
                    App.showView(); 
                    $mainContainer.css('display', 'flex');
                    
                    setTimeout(function() {
                        $loadingScreen.fadeOut(400, function() {
                            $(this).remove();
                            App.state.isInitializing = false; 
                        });
                    }, 200);
                },
                setAutoplay: function(isPlaying) {
                    App.state.isAutoplaying = isPlaying;
                    var video = App.elements.videoPlayerForward[0];
                    if (!video) return;
                    if (isPlaying) {
                        video.play().catch(function(e) { console.error("Playback failed", e); });
                    } else {
                        video.pause();
                    }
                    
                    var $seekButtons = $('.vva-rotate-icon-button');
                    if (App.state.activeView === 'vehicle') {
                        $seekButtons.toggleClass('is-visible', !isPlaying);
                    } else {
                        $seekButtons.removeClass('is-visible');
                    }
                },
                showLiveryTooltip: function(mode) {
                    var $tooltip = $('#vva-livery-tooltip');
                    clearTimeout(App.state.liveryTooltipTimeout); 
                    App.state.liveryTooltipTimeout = null;
                    
                    if (mode === 'hover') {
                        App.state.isLiveryTooltipHovered = true;
                    }
                    
                    if ($tooltip.hasClass('is-visible') && (mode === 'temp' || mode === 'click')) {
                        $tooltip.removeClass('vva-flash');
                        void $tooltip[0].offsetWidth; 
                        $tooltip.addClass('vva-flash'); 
                    } else {
                        $tooltip.addClass('is-visible');
                    }
                    
                    if (mode === 'temp' || mode === 'click') {
                        App.state.liveryTooltipTimeout = setTimeout(function() { App.hideLiveryTooltip('temp'); }, 3000);
                    }
                },
                hideLiveryTooltip: function(mode) {
                    if (mode === 'hover') {
                        App.state.isLiveryTooltipHovered = false;
                    }
                    
                    if (!App.state.isLiveryTooltipHovered) {
                        clearTimeout(App.state.liveryTooltipTimeout);
                        App.state.liveryTooltipTimeout = null;
                        $('#vva-livery-tooltip').removeClass('is-visible');
                    }
                },
                forceHideLiveryTooltip: function() {
                    clearTimeout(App.state.liveryTooltipTimeout);
                    App.state.liveryTooltipTimeout = null;
                    App.state.isLiveryTooltipHovered = false;
                    $('#vva-livery-tooltip').removeClass('is-visible');
                },
                getAllFocusableElements: function() {
                    var elements = [];
                    $('[data-focus-id]:visible').not('.is-faded-out').each(function() {
                        var $el = $(this);
                        var rect = this.getBoundingClientRect();
                        if (rect.width > 0 && rect.height > 0) {
                            elements.push({
                                id: $el.data('focus-id'),
                                element: $el,
                                rect: rect,
                                group: $el.data('focus-group')
                            });
                        }
                    });
                    return elements;
                },
                findNearestElementInGroup: function(targetGroup, fromRect, allCandidates) {
                    var groupCandidates = allCandidates.filter(function(c) { return c.group === targetGroup; });
                    if (!groupCandidates.length) return null;
                    
                    var minScore = Infinity;
                    var bestCandidate = groupCandidates[0]; 
                    groupCandidates.forEach(function(candidate) {
                        var rect = candidate.rect;
                        var dy = (rect.top + rect.height / 2) - (fromRect.top + fromRect.height / 2);
                        var dx = (rect.left + rect.width / 2) - (fromRect.left + fromRect.width / 2);
                        var score = (dy * dy) + (dx * dx); 
                        
                        if (score < minScore) {
                            minScore = score;
                            bestCandidate = candidate;
                        }
                    });
                    return bestCandidate;
                },
                findParallelElementInGroup: function(targetGroup, fromRect, allCandidates) {
                    var groupCandidates = allCandidates.filter(function(c) { return c.group === targetGroup; });
                    if (!groupCandidates.length) return null;
                    var minDy = Infinity;
                    var bestCandidate = groupCandidates[0];
                    var fromY = fromRect.top + fromRect.height / 2;
                    groupCandidates.forEach(function(candidate) {
                        var rect = candidate.rect;
                        var dy = Math.abs((rect.top + rect.height / 2) - fromY);
                        
                        if (dy < minDy) {
                            minDy = dy;
                            bestCandidate = candidate;
                        }
                    });
                    return bestCandidate;
                },
                findNextInGroup: function(current, group, direction, allCandidates) {
                    var items = allCandidates.filter(function(c) { return c.group === group; });
                    if (items.length <= 1) return null;
                    var isHorizontal = ['carousel', 'filters', 'gears', 'settings-panel', 'livery-panel', 'info-panel'].indexOf(group) !== -1;
                    var isCycling = ['carousel', 'filters', 'gears'].indexOf(group) !== -1;
                    
                    if (isHorizontal) {
                        items.sort(function(a, b) { return a.rect.left - b.rect.left; });
                    } else {
                        items.sort(function(a, b) { return a.rect.top - b.rect.top; });
                    }
                    var currentIndex = -1;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id === current.id) {
                            currentIndex = i;
                            break;
                        }
                    }
                    if (currentIndex === -1) return items[0];
                    if (direction === 'ArrowRight') {
                        if (currentIndex < items.length - 1) {
                            return items[currentIndex + 1];
                        }
                        return isCycling ? items[0] : null;
                    } else if (direction === 'ArrowLeft') {
                        if (currentIndex > 0) {
                            return items[currentIndex - 1];
                        }
                        return isCycling ? items[items.length - 1] : null;
                    } else if (direction === 'ArrowDown') {
                        if (currentIndex < items.length - 1) {
                            return items[currentIndex + 1];
                        }
                        return null;
                    } else if (direction === 'ArrowUp') {
                        return items[currentIndex > 0 ? currentIndex - 1 : items.length - 1];
                    }
                    return null;
                },
                findFocusExit: function(current, currentGroup, direction, allCandidates) {
                    var findNearest = function(group) { return App.findNearestElementInGroup(group, current.rect, allCandidates); };
                    var findParallel = function(group) { return App.findParallelElementInGroup(group, current.rect, allCandidates); };
                    if (currentGroup === 'gears' && direction === 'ArrowUp') {
                        if (current.id === 'gear-n' || current.id === 'gear-1') {
                            return findNearest('left-icons');
                        }
                        if (current.id === 'gear-3' || current.id === 'gear-4') {
                            return findNearest('right-icons');
                        }
                        if (current.id === 'gear-2') {
                            return Math.random() < 0.5 ? findNearest('left-icons') : findNearest('right-icons');
                        }
                    }
                    
                    if (App.state.activeSubPanel === 'livery') {
                        if (currentGroup === 'left-icons' && direction === 'ArrowRight') {
                            return findNearest('livery-panel');
                        }
                        if (currentGroup === 'right-icons' && direction === 'ArrowLeft') {
                            return findNearest('livery-panel');
                        }
                    }
                    if (App.state.activeSubPanel === 'settings') {
                        if (currentGroup === 'left-icons' && direction === 'ArrowRight') {
                            return findNearest('settings-panel');
                        }
                        if (currentGroup === 'right-icons' && direction === 'ArrowLeft') {
                            return findNearest('settings-panel');
                        }
                    }
                    if (App.state.activeView === 'info') {
                        if (currentGroup === 'left-icons' && direction === 'ArrowRight') {
                            return findNearest('info-panel');
                        }
                        if (currentGroup === 'right-icons' && direction === 'ArrowLeft') {
                            return findNearest('info-panel');
                        }
                    }
                    switch (currentGroup) {
                        case 'left-icons':
                            if (direction === 'ArrowUp') return findNearest('carousel');
                            if (direction === 'ArrowDown') {
                                if (App.state.activeView === 'info') return findNearest('info-panel');
                                if (App.state.activeView === 'interior') return findNearest('gears');
                                return findNearest('filters');
                            }
                            if (direction === 'ArrowRight') return findParallel('right-icons');
                            if (direction === 'ArrowLeft') return findParallel('right-icons');
                            break;
                        case 'right-icons':
                            if (direction === 'ArrowUp') return findNearest('carousel');
                            if (direction === 'ArrowDown') {
                                if (App.state.activeView === 'info') return findNearest('info-panel');
                                if (App.state.activeView === 'interior') return findNearest('gears');
                                return findNearest('filters');
                            }
                            if (direction === 'ArrowLeft') return findParallel('left-icons');
                            if (direction === 'ArrowRight') return findParallel('left-icons');
                            break;
                        case 'filters':
                            if (direction === 'ArrowUp') {
                                if (App.state.activeView === 'info') return findNearest('info-panel');
                                if (App.state.activeView === 'interior') return findNearest('gears');
                                return (current.id === 'filter-base') ? findNearest('left-icons') : findNearest('right-icons');
                            }
                            if (direction === 'ArrowDown') return findNearest('carousel');
                            if (direction === 'ArrowLeft') return findNearest('left-icons');
                            if (direction === 'ArrowRight') return findNearest('right-icons');
                            break;
                        case 'carousel':
                            if (direction === 'ArrowUp') return findNearest('filters');
                            if (direction === 'ArrowDown') {
                                return Math.random() < 0.5 ? findNearest('left-icons') : findNearest('right-icons');
                            }
                            if (direction === 'ArrowLeft') return findParallel('right-icons');
                            if (direction === 'ArrowRight') return findParallel('left-icons');
                            break;
                        case 'gears':
                            if (direction === 'ArrowDown') return findNearest('filters');
                            if (direction === 'ArrowLeft') return findParallel('left-icons');
                            if (direction === 'ArrowRight') return findParallel('right-icons');
                            break;
                        case 'info-panel':
                            if (direction === 'ArrowUp') return allCandidates.find(function(c) { return c.id === 'view-info'; });
                            if (direction === 'ArrowDown') return findNearest('filters');
                            if (direction === 'ArrowLeft') return findParallel('left-icons');
                            if (direction === 'ArrowRight') return findNearest('right-icons');
                            break;
                        case 'settings-panel':
                            if (direction === 'ArrowLeft') return allCandidates.find(function(c) { return c.id === 'settings-button'; });
                            if (direction === 'ArrowRight') return findParallel('right-icons');
                            break;
                        case 'livery-panel':
                            if (direction === 'ArrowLeft') return allCandidates.find(function(c) { return c.id === 'livery-button'; });
                            if (direction === 'ArrowRight') return findParallel('right-icons');
                            break;
                    }
                    return null;
                },
                findNextFocus: function(direction) {
                    var $currentEl = App.getKbFocusElement();
                    if (!$currentEl.length || !$currentEl.is(':visible')) {
                        var $defaultEl = $('[data-focus-id="car-horizon"]:visible');
                        if (!$defaultEl.length) $defaultEl = $('[data-focus-id="filter-base"]:visible');
                        App.state.kbFocusId = $defaultEl.data('focus-id') || 'filter-base';
                        return;
                    }
                    var allCandidates = App.getAllFocusableElements();
                    if (!allCandidates.length) return;
                    var current = allCandidates.find(function(c) { return c.id === App.state.kbFocusId; });
                    if (!current) { 
                        App.state.kbFocusId = allCandidates[0].id;
                        return;
                    }
                    var currentGroup = current.group;
                    var bestCandidate = null;
                    var horizontalGroups = ['carousel', 'filters', 'gears', 'settings-panel', 'livery-panel', 'info-panel'];
                    var verticalGroups = ['left-icons', 'right-icons'];
                    var isHorizontalMove = (direction === 'ArrowLeft' || direction === 'ArrowRight');
                    var isVerticalMove = (direction === 'ArrowUp' || direction === 'ArrowDown');
                    if (currentGroup) {
                        if (isHorizontalMove && horizontalGroups.indexOf(currentGroup) !== -1) {
                            bestCandidate = App.findNextInGroup(current, currentGroup, direction, allCandidates);
                        } else if (isVerticalMove && verticalGroups.indexOf(currentGroup) !== -1) {
                            bestCandidate = App.findNextInGroup(current, currentGroup, direction, allCandidates);
                        }
                    }
                    if (!bestCandidate) {
                        bestCandidate = App.findFocusExit(current, currentGroup, direction, allCandidates);
                    }
                    
                    if (bestCandidate) {
                        App.state.kbFocusId = bestCandidate.id;
                    }
                },
                getKbFocusElement: function() {
                    return $('[data-focus-id="' + App.state.kbFocusId + '"]');
                },
                updateKbFocus: function() {
                    $('.vva-kb-focus').removeClass('vva-kb-focus');
                    if (!App.state.kbFocusActive) return;
                    var $target = App.getKbFocusElement();
                    if ($target.length && $target.is(':visible')) {
                        $target.addClass('vva-kb-focus');
                        if ($target.data('focus-group') === 'carousel' && $target[0].scrollIntoView) {
                            $target[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    } else {
                        var $defaultEl = $('[data-focus-id="car-horizon"]:visible');
                        if (!$defaultEl.length) $defaultEl = $('[data-focus-id="filter-base"]:visible');
                        App.state.kbFocusId = ($defaultEl.length ? $defaultEl.data('focus-id') : 'filter-base');
                        $('[data-focus-id="' + App.state.kbFocusId + '"]').addClass('vva-kb-focus');
                    }
                },
                initKeyboardAndSeekControls: function() {
                    var $app = $('#vehicle-viewer-app');
                    $app.on('click', '.vva-video-player-view video', function() {
                        App.initializeAudio().then(function() {
                            App.state.isVehicleViewFocused = true;
                            App.setAutoplay(!App.state.isAutoplaying);
                        });
                    });
                    $app.on('click', '.vva-icon-button', function() {
                        App.initializeAudio().then(function() {
                            App.state.isVehicleViewFocused = false;
                        });
                    });
                    
                    $(document).on('keydown', function(e) {
                        var key = e.key;
                        var isArrowKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(key) !== -1;
                        if (isArrowKey) {
                            e.preventDefault();
                            if (!App.state.kbFocusActive) {
                                App.state.kbFocusActive = true;
                            }
                            App.findNextFocus(key);
                            App.updateKbFocus();
                            return; 
                        }
                        switch (key) {
                            case ' ':
                                e.preventDefault();
                                if (App.state.spaceKeyIsDown || App.state.activeView !== 'vehicle') return;
                                App.state.spaceKeyIsDown = true;
                                if (App.state.isAutoplaying) {
                                    App.state.wasAutoplayingOnSpaceDown = true;
                                } else {
                                    App.state.spaceHoldTimer = setTimeout(function() {
                                        App.state.isHoldingSpace = true;
                                        App.elements.videoPlayerForward[0].play();
                                    }, 200);
                                }
                                break;
                            
                            case 'Enter':
                                if (!App.state.kbFocusActive) return;
                                e.preventDefault();
                                var $focusedEl = App.getKbFocusElement();
                                
                                if ($focusedEl.length && $focusedEl.is(':visible')) {
                                    if ($focusedEl.is('label.vva-kb-radio-label')) {
                                        $focusedEl.find('input[type="radio"]').prop('checked', true).trigger('change');
                                    } else {
                                        $focusedEl.trigger('click');
                                    }
                                    
                                    var focusId = $focusedEl.data('focus-id');
                                    
                                    if (focusId.startsWith('car-') || focusId === 'view-vehicle' || focusId === 'view-interior' || focusId.startsWith('filter-')) {
                                        App.state.kbFocusActive = false;
                                        App.updateKbFocus();
                                    }
                                }
                                break;
                                
                            case 'n':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                                if (App.state.activeView === 'interior') {
                                    e.preventDefault();
                                    App.setGear(key);
                                }
                                break;
                            case 'l':
                                e.preventDefault();
                                if (App.state.activeView !== 'vehicle') {
                                    App.state.pendingLiveryPanel = true;
                                    $('[data-focus-id="view-vehicle"]').trigger('click');
                                } else {
                                    App.toggleSubPanel('livery');
                                }
                                break;
                            case 'i':
                                e.preventDefault();
                                App.toggleSubPanel('info');
                                break;
                        }
                    }).on('keyup', function(e) {
                        if (e.key === ' ') {
                            e.preventDefault();
                            clearTimeout(App.state.spaceHoldTimer);
                            if (App.state.isHoldingSpace) {
                                App.elements.videoPlayerForward[0].pause();
                                App.state.isHoldingSpace = false;
                            } else if (App.state.wasAutoplayingOnSpaceDown) {
                                App.setAutoplay(false);
                            } else if (!App.state.isAutoplaying && App.state.spaceKeyIsDown) {
                                App.setAutoplay(true);
                            }
                            App.state.wasAutoplayingOnSpaceDown = false;
                            App.state.spaceKeyIsDown = false;
                        }
                    });
                },
                updateVehicleSelector: function() {
                    var $selector = $('.vva-vehicle-selector').empty();
                    
                    if (!App.state.filters.base && !App.state.filters.bonus) {
                        App.state.filters.base = true; 
                    }
                    var visibleCars = [];
                    $.each(App.vehicleData, function(modelId, model) {
                        if ( (App.state.filters.base && model.category === 'base') || (App.state.filters.bonus && model.category === 'bonus') ) {
                            visibleCars.push(modelId);
                            var iconSrc;
                            var activeLiveryId = App.state.modelLiveryState[modelId] || Object.keys(model.liveries)[0];
                            iconSrc = model.liveries[activeLiveryId].carouselIcon;
                            var $icon = $('<button>', { 
                                class: 'vva-vehicle-icon', 
                                'data-model-id': modelId,
                                'data-focus-id': 'car-' + modelId,
                                'data-focus-group': 'carousel',
                                'aria-label': 'Select ' + model.name
                            });
                            $icon.append($('<img>', { src: iconSrc }));
                            $icon.append($('<div>', { class: 'vva-vehicle-name', text: model.name }));
                            if (modelId === App.state.activeModelId) { $icon.addClass('vva-active'); }
                            $selector.append($icon);
                        }
                    });
                    if (visibleCars.indexOf(App.state.activeModelId) === -1) {
                        if (visibleCars.length > 0) {
                            var $firstIcon = $selector.find('.vva-vehicle-icon').first();
                            if (!App.state.isInitializing) {
                                $firstIcon.trigger('click');
                            } else {
                               App.setActiveModel({ currentTarget: $firstIcon[0], force: true });
                            }
                        }
                    }
                },
                setUnitSystem: function(e) {
                    App.initializeAudio().then(function() {
                        var newUnitSystem = $(e.currentTarget).val();
                        if (newUnitSystem === App.state.unitSystem && !App.state.isInitializing) return;
                        
                        App.state.unitSystem = newUnitSystem;
                        try {
                            localStorage.setItem('vva-unitSystem', newUnitSystem);
                        } catch (e) {
                            console.error("Could not save setting to localStorage.");
                        }
                        
                        $('.vva-stat-value').not('.vva-stat-speed').each(function() {
                            var $stat = $(this);
                            var imperialValue = $stat.data('imperial');
                            var metricValue = $stat.data('metric');
                            if (imperialValue && metricValue) {
                                $stat.text(App.state.unitSystem === 'metric' ? metricValue : imperialValue);
                            }
                        });
                        var $speedStat = $('.vva-stat-speed');
                        if ($speedStat.length) {
                            var imperialValue = $speedStat.data('imperial');
                            var metricValue = $speedStat.data('metric');
                            if (imperialValue && metricValue) {
                                var newValue = App.state.unitSystem === 'metric' ? metricValue : imperialValue;
                                var duration = App.state.isInitializing ? 0 : 200;
                                if (duration === 0) {
                                    $speedStat.text(newValue);
                                } else {
                                    $speedStat.stop(true, true).animate({ opacity: 0 }, duration, function() {
                                        $(this).text(newValue).animate({ opacity: 1 }, duration);
                                    });
                                }
                            }
                        }
                    });
                },
                init: function() {
                    if ($('#vehicle-viewer-app').children().length > 1 && !window.vvaIsReloading) return;
                    window.vvaIsReloading = false;
                    
                    App.state = JSON.parse(JSON.stringify(App.initialState));
                    
                    try {
                        var savedUnitSystem = localStorage.getItem('vva-unitSystem');
                        if (savedUnitSystem) {
                            App.state.unitSystem = savedUnitSystem;
                        }
                    } catch (e) {
                        console.error("Could not read settings from localStorage.");
                    }
                    App.parseAndLoadData();
                    $.each(App.vehicleData, function(modelId, model) {
                        if (model.liveries) {
                            var firstLiveryId = Object.keys(model.liveries)[0];
                            if (firstLiveryId) { App.state.modelLiveryState[modelId] = firstLiveryId; }
                        }
                        App.state.modelGearState[modelId] = 'n';
                    });
                    
                    App.build();
                    
                    var imageAssets = App.gatherAllAssets(false);
                    var videoAssets = App.gatherAllAssets(true);
                    App.startPreloading(imageAssets, function() {
                        $('.vva-loading-text').text('Loading Videos...');
                        $('#vva-progress-bar-inner').css('width', '0%');
                        App.startPreloading(videoAssets, function() {
                            App.finishLoading();
                        });
                    });
                    
                    var $app = $('#vehicle-viewer-app');
                    var $liveryPanel = $app.find('.vva-livery-panel');
                    
                    $liveryPanel.on('transitionend', function() {
                        if ($liveryPanel.hasClass('vva-open') && App.state.activeView !== 'vehicle') {
                            App.toggleSubPanel('livery', false);
                        }
                    });
                    $app.on('click', '.vva-nav-icon-ls-livery-select', function() { 
                        App.toggleSubPanel('livery'); 
                    });
                    $app.on('mouseenter', '.vva-nav-icon-ls-livery-select', function() {
                        var model = App.vehicleData[App.state.activeModelId];
                        var isBonus = Object.keys(model.liveries).length <= 1;
                        if (isBonus && App.state.activeView === 'vehicle') {
                            App.showLiveryTooltip('hover');
                        }
                    });
                    $app.on('mouseleave', '.vva-nav-icon-ls-livery-select', function() {
                        App.hideLiveryTooltip('hover');
                    });
                    
                    $app.on('animationend', '#vva-livery-tooltip', function() {
                        $(this).removeClass('vva-flash');
                    });
                    $app.on('click', '.vva-nav-icon-settings', function() { App.toggleSubPanel('settings'); });
                    $app.on('click', '.vva-nav-icon-app-info', function() { App.toggleSubPanel('info'); });
                    
                    $app.on('click', '.vva-livery-icon', App.setActiveLivery);
                    $app.on('click', '.vva-right-icons .vva-icon-button', App.setActiveView);
                    $app.on('change', 'input[name="unit-system"]', App.setUnitSystem);
                    $app.on('click', '.vva-vehicle-icon', App.setActiveModel);
                    $app.on('click', '.vva-filter-button', function(e) {
                        App.setFilter(e);
                        });
                    
                    $app.on('click', '.vva-gear-button', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var gear = $(this).data('gear');
                            App.setGear(gear);
                        });
                    
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
                    
                    $(document).on('mousedown', function(e) {
                        if (App.state.kbFocusActive) {
                            var $target = $(e.target).closest('[data-focus-id]');
                            if (!$target.length) {
                                App.state.kbFocusActive = false;
                                App.updateKbFocus();
                            }
                        }
                    });
                    
                    App.initKeyboardAndSeekControls();
                },
                destroy: function() {
                    $(document).off('keydown keyup mousedown');
                    $('#vehicle-viewer-app').empty().off();
                },
                setFilter: function(e) {
                    App.initializeAudio().then(function() {
                        if (App.state.isTransitioning) return;
                        var filter = $(e.currentTarget).data('filter');
                        
                        App.state.isTransitioning = true;
                        App.state.filters[filter] = !App.state.filters[filter];
                        if (!App.state.filters.base && !App.state.filters.bonus) {
                            App.state.filters[filter === 'base' ? 'bonus' : 'base'] = true;
                        }
                        
                        $('.vva-filter-button[data-filter="base"]').toggleClass('vva-active', App.state.filters.base);
                        $('.vva-filter-button[data-filter="bonus"]').toggleClass('vva-active', App.state.filters.bonus);
                        
                        var $currentFocus = App.getKbFocusElement();
                        var focusWasInCarousel = $currentFocus.data('focus-group') === 'carousel';
                        $('.vva-vehicle-selector').stop(true, true).fadeOut(200, function() {
                            App.updateVehicleSelector();
                            $(this).fadeIn(200);
                            App.endTransition();
                            
                            if (focusWasInCarousel && !App.getKbFocusElement().is(':visible')) {
                                App.state.kbFocusId = 'filter-base';
                                App.updateKbFocus();
                            }
                        });
                    });
                }
            };
            App.init();
        })(window, jQuery, mw);
    });
});

/* structured quote */

$(function() {
    function setupQuoteSync(wrapper) {
        var $lines = wrapper.find('.quote-line');
        var $audio = wrapper.find('audio');

        if ($lines.length === 0 || $audio.length === 0) {
            return;
        }

        var audio = $audio[0];

        function updateLineVisibility() {
            var currentTimeMs = audio.currentTime * 1000;
            
            var $activeLines = wrapper.find('.quote-page.is-active .quote-line');
            if ($activeLines.length === 0) {
                $activeLines = $lines;
            }

            $activeLines.each(function() {
                var $line = $(this);
                var lineTime = parseInt($line.data('time'), 10);

                if (isNaN(lineTime)) {
                    return;
                }

                if (currentTimeMs >= lineTime) {
                    if (!$line.hasClass('is-visible')) {
                        var fadeDuration = $line.data('fade');
                        if (fadeDuration) {
                            $line.css('transition-duration', parseInt(fadeDuration, 10) + 'ms');
                        } else {
                            $line.css('transition-duration', '');
                        }
                        $line.addClass('is-visible');
                    }
                } else {
                    if ($line.hasClass('is-visible')) {
                        $line.removeClass('is-visible');
                    }
                }
            });
        }
        
        wrapper.data('updateVisibilityFunc', updateLineVisibility);

        $audio.on('play', function() {
            wrapper.addClass('quote-is-playing');
            updateLineVisibility();
        });

        $audio.on('pause', function() {
            if (audio.currentTime === 0) {
                wrapper.removeClass('quote-is-playing');
            }
        });

        $audio.on('ended', function() {
            wrapper.removeClass('quote-is-playing');
        });

        $audio.on('timeupdate', updateLineVisibility);
        $audio.on('seeked', updateLineVisibility);

        updateLineVisibility();
    }

    function setupQuotePagination(wrapper) {
        var $pages = wrapper.find('.quote-page');
        var $quoteBelow = wrapper.find('.structured-quote-below');
        var totalPages = $pages.length;

        if (totalPages <= 1) {
            if (totalPages === 1) {
                 $pages.addClass('is-active');
            }
            return;
        }

        var paginationHTML =
            '<div class="structured-quote-pagination">' +
            '<button class="page-prev" title="Previous page">&lt;</button>' +
            '<div class="page-display">' +
            '<input type="number" class="page-input" value="1" min="1" max="' + totalPages + '">' +
            '<span>/ ' + totalPages + '</span>' +
            '</div>' +
            '<button class="page-next" title="Next page">&gt;</button>' +
            '</div>';

        var $soundDiv = $quoteBelow.find('.structured-quote-sound');
        if ($soundDiv.length > 0) {
            $soundDiv.before(paginationHTML);
        } else {
            $quoteBelow.append(paginationHTML);
        }

        var $pagination = $quoteBelow.find('.structured-quote-pagination');
        var $prevBtn = $pagination.find('.page-prev');
        var $nextBtn = $pagination.find('.page-next');
        var $input = $pagination.find('.page-input');
        var currentPage = 0;

        function goToPage(pageIndex) {
            if (pageIndex < 0 || pageIndex >= totalPages) {
                return;
            }
            currentPage = pageIndex;

            $pages.removeClass('is-active');
            $pages.eq(currentPage).addClass('is-active');

            $input.val(currentPage + 1);
            $prevBtn.prop('disabled', currentPage === 0);
            $nextBtn.prop('disabled', currentPage === totalPages - 1);
            
            var updateFunc = wrapper.data('updateVisibilityFunc');
            if (updateFunc) {
                updateFunc();
            }
        }

        $prevBtn.on('click', function() {
            goToPage(currentPage - 1);
        });

        $nextBtn.on('click', function() {
            goToPage(currentPage + 1);
        });

        $input.on('change', function() {
            var newPage = parseInt($(this).val(), 10) - 1;
            if (isNaN(newPage) || newPage < 0 || newPage >= totalPages) {
                $(this).val(currentPage + 1);
            } else {
                goToPage(newPage);
            }
        });
        
        $input.on('keydown', function(e) {
             if (e.key === 'Enter') {
                 $(this).trigger('change');
                 $(this).blur();
             }
        });

        goToPage(0);
    }

    $('.structured-quote-wrapper').each(function() {
        var $wrapper = $(this);
        
        setupQuotePagination($wrapper);
        
        var $soundDiv = $wrapper.find('.structured-quote-sound');

        if ($soundDiv.length === 0) {
            var $pages = $wrapper.find('.quote-page');
            if ($pages.length > 0 && !$pages.hasClass('is-active')) {
                 $pages.eq(0).addClass('is-active');
            }
            return;
        }

        if ($soundDiv.find('audio').length > 0) {
            setupQuoteSync($wrapper);
            return;
        }

        var checkInterval = setInterval(function() {
            if ($soundDiv.find('audio').length > 0) {
                clearInterval(checkInterval);
                setupQuoteSync($wrapper);
            }
        }, 100);
    });
});

/* notification panel */

(function(window, $, mw) {
    if (window.notificationPanelInitialized) return;
    window.notificationPanelInitialized = true;

    const App = {
        config: {
            title: "Notification Panel",
            version: "v1.07",
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
            needsRefresh: false,
            notifyOnChange: 'y'
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
            const isNewNotifyingContent = isNewContent && App.state.notifyOnChange === 'y';
            
            if (autoOpenPref && isNewNotifyingContent && !$(e.currentTarget).hasClass('is-maintenance-mode')) {
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
            
            const notifyOnChange = $content.find('#sn-notify-on-change').text().trim().toLowerCase() || 'y';
            App.state.notifyOnChange = notifyOnChange;

            const $snippetClone = $content.find('.sn-snippet-content').clone();
            const $expandedClone = $content.find('.sn-expanded-content').clone();
            $expandedClone.find('#sn-read-more-visibility, #sn-live-mode, #sn-notify-on-change').remove();
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
            const hasContentChanged = lastSeenHash != App.state.currentContentHash;
            const isNewNotifyingContent = hasContentChanged && App.state.notifyOnChange === 'y';
            const persistedView = sessionStorage.getItem('screamerPanelView');

            if (persistedView === 'modal') {
                App.openModal();
            } else if (isNewNotifyingContent && autoOpenPref) {
                App.forceOpenToNews();
            } else if (persistedView === 'panel') {
                App.restorePanelState();
                App.openPanel();
                if (isNewNotifyingContent) {
                    $('#np-force-show-button').addClass('sn-has-notification');
                }
            } else if (isNewNotifyingContent) {
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

/* importarticles */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WdsTabs.js',
        'u:dev:MediaWiki:Toggler.js',
        'u:dev:MediaWiki:Tabber.js',
        'u:dev:MediaWiki:Sliders.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
    ]
});