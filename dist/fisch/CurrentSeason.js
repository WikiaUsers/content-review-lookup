/*
 * CurrentSeason Module
 * Shows current season name with glow effect and bold text
 */
mw.loader.using(['mediawiki.util'], function() {
    'use strict';
    
    var SEASONS = [
        { name: 'Spring', color: '#90EE90' },
        { name: 'Summer', color: '#FFD700' },
        { name: 'Autumn', color: '#FFA500' },
        { name: 'Winter', color: '#87CEEB' }
    ];
    
    var SEASON_LENGTH = 576 * 60; // 576 minutes in seconds
    
    function initCurrentSeason() {
        $('.current-season').each(function() {
            var $element = $(this);
            
            function updateSeason() {
                var currentTime = Math.floor(Date.now() / 1000);
                var currentSeasonIndex = Math.floor((currentTime % (SEASON_LENGTH * 4)) / SEASON_LENGTH);
                var season = SEASONS[currentSeasonIndex];
                
                // Apply text-shadow for glow effect and make text bold
                $element.html(`<span style="
                    color: ${season.color};
                    text-shadow: 0 0 10px ${season.color};
                    font-weight: bold;"
                >${season.name}</span>`);
            }
            
            // Update immediately and then every minute
            updateSeason();
            setInterval(updateSeason, 60000);
        });
    }
    
    // Initialize on page load and when content changes
    $(document).ready(initCurrentSeason);
    mw.hook('wikipage.content').add(initCurrentSeason);
});