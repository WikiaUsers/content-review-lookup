$(function() {
    initStatTabs();
    
    mw.hook('wikipage.content').add(function() {
        initStatTabs();
    });
    
    function initStatTabs() {
        $('.item-stat-tabs').each(function() {
            var $tabContainer = $(this);
            var itemId = $tabContainer.data('item-id');
            var $statsArea = $('.item-stats-area[data-item-id="' + itemId + '"]');
            
            $tabContainer.find('.stat-tab').on('click', function(e) {
                e.preventDefault();
                var $button = $(this);
                var tabIndex = $button.data('tab-index');
                
                $tabContainer.find('.stat-tab').removeClass('active');
                $button.addClass('active');
                
                var statsJson = $statsArea.attr('data-tab-' + tabIndex);
                if (statsJson) {
                    try {
                        var stats = JSON.parse(statsJson);
                        
                        $statsArea.empty();
                        
                        var statsHtml = renderStats(stats);
                        $statsArea.append(statsHtml);
                    } catch (error) {
                        console.error('Error parsing stats JSON:', error, 'JSON:', statsJson);
                    }
                }
            });
            
            $tabContainer.find('.stat-tab').on('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    $(this).trigger('click');
                }
            });
        });
    }
    
    function renderStats(stats) {
        var html = '';
        
        var statOrder = [
            "criticalchance", "criticalchanceboost", "criticalchancepenalty",
            "damage", "damageboost", "damagepenalty",
            "duration",
            "fovboost", "fovpenalty",
            "jumpboost", "jumppenalty",
            "levelrequirement",
            "luckboost", "luckpenalty",
            "miningspeed",
            "radius",
            "speedboost", "speedpenalty"
        ];
        
        statOrder.forEach(function(statName) {
            if (stats[statName] && stats[statName] !== 0) {
                var statValue = stats[statName];
                var displayValue = formatStatValue(statName, statValue);
                var tooltipContent = formatStatName(statName);
                
                html += '<div class="item-stat">' +
                    '<div class="stat-icon-wrapper stat-icon-with-tooltip">' +
                    '<div class="stat-icon ' + statName + '"></div>' +
                    '<div class="stat-icon-tooltip">' + tooltipContent + '</div>' +
                    '</div>' +
                    '<span class="stat-value">' + displayValue + '</span>' +
                    '</div>';
            }
        });
        
        return html;
    }
    
    function formatStatValue(statName, value) {
        var suffix = "%";
        var noSuffixStats = {
            damage: true,
            duration: true,
            levelrequirement: true,
            radius: true
        };
        
        if (noSuffixStats[statName]) {
            suffix = "";
        }
        
        return value + suffix;
    }
    
    function formatStatName(statName) {
        var nameMap = {
            criticalchance: "Critical Chance",
            criticalchanceboost: "Crit Chance Boost",
            criticalchancepenalty: "Crit Chance Penalty",
            damage: "Damage",
            damageboost: "Damage Boost",
            damagepenalty: "Damage Penalty",
            duration: "Duration",
            fovboost: "FOV Boost",
            fovpenalty: "FOV Penalty",
            jumpboost: "Jump Boost",
            jumppenalty: "Jump Penalty",
            levelrequirement: "Level Requirement",
            luckboost: "Luck Boost",
            luckpenalty: "Luck Penalty",
            miningspeed: "Mining Speed",
            radius: "Radius",
            speedboost: "Speed Boost",
            speedpenalty: "Speed Penalty"
        };
        return nameMap[statName] || statName;
    }
});