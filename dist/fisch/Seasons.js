/**
 * Unified Season System
 * @version 4.0
 * 
 * Complete season tracking system for game seasons
 * Combines grid view, current season, next season, and target season functionality
 * 
 * Features:
 * - Season grid with visual states
 * - Current and next season displays
 * - Target season prediction
 * - Optional timers for all components
 * - Real-time updates
 * - MediaWiki integration
 */

/*jshint jquery:true, browser:true, esversion:5*/
/*global mediaWiki*/

;(function (window, mw, $) {
    'use strict';

    // Configuration
    var CONFIG = {
        SEASON_LENGTH: 576 * 60,
        UPDATE_INTERVAL: 1000,
        ACTIVE_GLOW: '0 0 10px',
        SEASONS: [
            { name: 'Spring', color: '#90EE90' },
            { name: 'Summer', color: '#FFD700' },
            { name: 'Autumn', color: '#FFA500' },
            { name: 'Winter', color: '#87CEEB' }
        ]
    };

    // Utility functions
    var Utils = {
        getCurrentTime: function() {
            return Math.floor(Date.now() / 1000);
        },

        getCurrentSeason: function() {
            return Math.floor((this.getCurrentTime() % (CONFIG.SEASON_LENGTH * 4)) / CONFIG.SEASON_LENGTH);
        },

        getNextSeason: function() {
            return (this.getCurrentSeason() + 1) % 4;
        },

        getSeasonIndex: function(seasonName) {
            return CONFIG.SEASONS.findIndex(function(season) {
                return season.name.toLowerCase() === seasonName.toLowerCase();
            });
        },

        getNextSeasonTime: function(seasonIndex) {
            var now = this.getCurrentTime();
            var cycleStart = Math.floor(now / (CONFIG.SEASON_LENGTH * 4)) * CONFIG.SEASON_LENGTH * 4;
            var targetStart = cycleStart + (seasonIndex * CONFIG.SEASON_LENGTH);
            
            return targetStart <= now ? targetStart + CONFIG.SEASON_LENGTH * 4 : targetStart;
        },

        formatTime: function(seconds) {
            if (seconds < 0) return '0s';

            var d = Math.floor(seconds / 86400);
            var h = Math.floor((seconds % 86400) / 3600);
            var m = Math.floor((seconds % 3600) / 60);
            var s = seconds % 60;
            
            var parts = [];
            
            if (d > 0) parts.push(d + 'd');
            if (h > 0) parts.push(h + 'h');
            if (m > 0) parts.push(m + 'm');
            if (s > 0 || parts.length === 0) parts.push(s + 's');
            
            return parts.join(' ');
        }
    };

    // Season Display Controller
    var SeasonController = {
        createSeasonSpan: function(seasonIndex, showGlow) {
            var season = CONFIG.SEASONS[seasonIndex];
            var style = 'color: ' + season.color + ';';
            if (showGlow) {
                style += 'text-shadow: ' + CONFIG.ACTIVE_GLOW + ' ' + season.color + ';';
                style += 'font-weight: bold;';
            }
            return '<span style="' + style + '">' + season.name + '</span>';
        },

        updateGridStyle: function(currentSeason) {
            $('.season-name').each(function(index) {
                var $season = $(this);
                if (index === currentSeason) {
                    $season.css('text-shadow', CONFIG.ACTIVE_GLOW + ' ' + CONFIG.SEASONS[index].color);
                    $season.css('font-weight', 'bold');
                } else {
                    $season.css('text-shadow', 'none');
                    $season.css('font-weight', 'normal');
                }
            });
        },

        updateTimers: function() {
            var currentSeason = Utils.getCurrentSeason();
            var currentTime = Utils.getCurrentTime();

            // Update grid timers
            $('.season-timer:not(.component-timer)').each(function() {
                var $timer = $(this);
                var seasonIndex = parseInt($timer.attr('data-season'), 10);
                var timeLeft;
                var prefix;

                if (seasonIndex === currentSeason) {
                    timeLeft = Utils.getNextSeasonTime((currentSeason + 1) % 4) - currentTime;
                    prefix = 'Ends:';
                } else {
                    timeLeft = Utils.getNextSeasonTime(seasonIndex) - currentTime;
                    prefix = 'Starts:';
                }

                $timer.text(prefix + ' ' + Utils.formatTime(timeLeft));
            });

            // Update current season components
            $('.current-season').each(function() {
                ComponentController.updateCurrentSeason($(this));
            });

            // Update next season components
            $('.next-season').each(function() {
                ComponentController.updateNextSeason($(this));
            });

            // Update target season components
            $('.target-season').each(function() {
                ComponentController.updateTargetSeason($(this));
            });
        },

        startUpdates: function() {
            this.updateGridStyle(Utils.getCurrentSeason());
            this.updateTimers();
            
            var self = this;
            window.setTimeout(function() {
                self.startUpdates();
            }, CONFIG.UPDATE_INTERVAL);
        }
    };

    // Component Controller
    var ComponentController = {
        updateCurrentSeason: function($element) {
            var currentSeasonIndex = Utils.getCurrentSeason();
            var showTimer = $element.data('timer') === true;
            
            if (showTimer) {
                var timeLeft = Utils.getNextSeasonTime((currentSeasonIndex + 1) % 4) - Utils.getCurrentTime();
                var $container = $('<div>').addClass('season-container')
                    .append(SeasonController.createSeasonSpan(currentSeasonIndex, true))
                    .append('<span class="timer-separator"> - </span>')
                    .append('<span class="season-timer component-timer">Ends: ' + Utils.formatTime(timeLeft) + '</span>');
                $element.html($container);
            } else {
                $element.html(SeasonController.createSeasonSpan(currentSeasonIndex, true));
            }
        },

        updateNextSeason: function($element) {
            var nextSeasonIndex = Utils.getNextSeason();
            var showTimer = $element.data('timer') === true;
            
            if (showTimer) {
                var timeLeft = Utils.getNextSeasonTime(nextSeasonIndex) - Utils.getCurrentTime();
                var $container = $('<div>').addClass('season-container')
                    .append(SeasonController.createSeasonSpan(nextSeasonIndex, false))
                    .append('<span class="timer-separator"> - </span>')
                    .append('<span class="season-timer component-timer">Starts: ' + Utils.formatTime(timeLeft) + '</span>');
                $element.html($container);
            } else {
                $element.html(SeasonController.createSeasonSpan(nextSeasonIndex, false));
            }
        },

        updateTargetSeason: function($element) {
            var seasonName = $element.data('season');
            var showTimer = $element.data('timer') === true;
            var seasonIndex = Utils.getSeasonIndex(seasonName);
            
            if (seasonIndex === -1) {
                $element.html('<span style="color: red;">Invalid season name</span>');
                return;
            }

            var currentSeason = Utils.getCurrentSeason();
            var isCurrent = currentSeason === seasonIndex;
            
            if (showTimer) {
                var timeLeft;
                var prefix;
                
                if (isCurrent) {
                    timeLeft = Utils.getNextSeasonTime((seasonIndex + 1) % 4) - Utils.getCurrentTime();
                    prefix = 'Ends:';
                } else {
                    timeLeft = Utils.getNextSeasonTime(seasonIndex) - Utils.getCurrentTime();
                    prefix = 'Starts:';
                }

                var $container = $('<div>').addClass('season-container')
                    .append(SeasonController.createSeasonSpan(seasonIndex, isCurrent))
                    .append('<span class="timer-separator"> - </span>')
                    .append('<span class="season-timer component-timer">' + prefix + ' ' + Utils.formatTime(timeLeft) + '</span>');
                
                $element.html($container);
            } else {
                $element.html(SeasonController.createSeasonSpan(seasonIndex, isCurrent));
            }
        }
    };

    // Initialization
    function init($content) {
        $content = $content || $(document);
        
        // Find all season components that haven't been initialized
        var $components = $content.find('.season-timer:not(.initialized), ' +
                                     '.current-season:not(.initialized), ' +
                                     '.next-season:not(.initialized), ' +
                                     '.target-season:not(.initialized)');
        
        if (!$components.length) return;

        // Mark components as initialized
        $components.addClass('initialized');
        
        // Start update cycle
        SeasonController.startUpdates();
    }

    // Register handlers
    $(function() {
        init();
        mw.hook('wikipage.content').add(init);
    });

}(window, mediaWiki, jQuery));