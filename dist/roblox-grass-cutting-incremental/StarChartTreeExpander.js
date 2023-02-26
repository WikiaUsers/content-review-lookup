// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:StarChartTreeExpander.js
function addStarChartTreeExpander() {
    if (document.getElementById('StarChartTreeExpanderToggle') !== null && document.getElementById('StarChartTreeExpanderToggleContainer') === null && mw.config.get('wgPageName') === 'Star_Chart') {
        console.log("[Star Chart Tree Expander] [LOG]: Current page is 'Star Chart', and the ID has been located. Running script.");
        var autoStatus,autoResult,speedStatus,speedResult,progressionStatus,progressionResult,res;

        function adjustTreeVis(tree) {
            switch (tree) {
                case 0:
                    tree = 'Automation';
                    res = autoResult;
                    break;
                case 1:
                    tree = 'Speed';
                    res = speedResult;
                    break;
                case 2:
                    tree = 'Progression';
                    res = progressionResult;
            }

            function adjuster(id) {
                id = 'StarChart' + tree + 'Toggle' + id;
                var i = 0;
                document.getElementById(id).setAttribute('style', res);
                while (i < document.getElementById(id).getElementsByClassName('mw-collapsible mw-collapsed mw-made-collapsible').length) {
                    document.getElementById(id).getElementsByClassName('mw-collapsible mw-collapsed mw-made-collapsible')[i].setAttribute('style', res);
                    i++;
                }
            }

            switch (tree) {
                case 'Automation':
                    if (autoStatus === true) {
                        autoStatus = false;
                        autoResult = 'display:none';
                    } else {
                        autoStatus = true;
                        autoResult = '';
                    }
					adjuster('1a'),adjuster('1b'),adjuster('1c'),adjuster('2a'),adjuster('3a'),adjuster('3b'),adjuster('3c'),adjuster('4a'),adjuster('4b'),adjuster('5a'),adjuster('6a'),adjuster('6b'),adjuster('6c'),adjuster('6d'),adjuster('7a'),adjuster('7b'),adjuster('7c'),adjuster('7d'),adjuster('8a'),adjuster('9a'),adjuster('9b');
                    break;
                case 'Speed':
                    if (speedStatus === true) {
                        speedStatus = false;
                        speedResult = 'display:none';
                    } else {
                        speedStatus = true;
                        speedResult = '';
                    }
					adjuster('1a'),adjuster('1b'),adjuster('1c'),adjuster('2a'),adjuster('2b'),adjuster('3a'),adjuster('3b'),adjuster('3c'),adjuster('3d'),adjuster('3e'),adjuster('4a'),adjuster('4b'),adjuster('4c'),adjuster('4d'),adjuster('5a'),adjuster('5b'),adjuster('5c'),adjuster('6a'),adjuster('6b'),adjuster('6c'),adjuster('7a'),adjuster('7b'),adjuster('7c'),adjuster('8a'),adjuster('8b'),adjuster('9a'),adjuster('9b'),adjuster('10a');
                    break;
                case 'Progression':
                    if (progressionStatus === true) {
                        progressionStatus = false;
                        progressionResult = 'display:none';
                    } else {
                        progressionStatus = true;
                        progressionResult = '';
                    }
                    adjuster('1a'),adjuster('2a'),adjuster('3a'),adjuster('4a'),adjuster('5a'),adjuster('6a'),adjuster('1b'),adjuster('7a'),adjuster('8a'),adjuster('9a'),adjuster('10a'),adjuster('11a'),adjuster('1c'),adjuster('12a'),adjuster('13a'),adjuster('14a'),adjuster('15a'),adjuster('16a'),adjuster('1d'),adjuster('17a'),adjuster('18a'),adjuster('19a'),adjuster('20a'),adjuster('21a');
                    break;
                default:
                    adjustTreeVis(0),adjustTreeVis(1),adjustTreeVis(2);
            }
        }
        var treeToggleText = 'Automation';

        function updateSelectedTree() {
            switch (Number(document.getElementById('StarChartTreeExpanderSelectionSlider').value)) {
                case 0:
                    treeToggleText = 'Automation';
                    break;
                case 1:
                    treeToggleText = 'Speed';
                    break;
                case 2:
                    treeToggleText = 'Progression';
                    break;
                case 3:
                    treeToggleText = 'ALL';
            }
            document.getElementById('StarChartTreeExpanderSelectedTree').innerHTML = treeToggleText;
        }
        document.getElementById('StarChartTreeExpanderToggle').setAttribute('class', 'templatedesktop');
        document.getElementById('StarChartTreeExpanderToggle').setAttribute('style', 'padding:0.25em;margin:0.5em;overflow:auto;border-radius:initial;width:25%');
        document.getElementById('StarChartTreeExpanderToggle').innerHTML = "<div id='StarChartTreeExpanderToggleContainer'>Selected tree: <b>[<span id='StarChartTreeExpanderSelectedTree'>Automation</span>]</b><br><input id='StarChartTreeExpanderSelectionSlider' class='slider' type='range' value='0' min='0' max='3' style='width:50%'/><br>Toggle visibility:<br><button id='StarChartTreeExpanderVisibilityToggle'>Switch!</button></div>";
        document.getElementById('StarChartTreeExpanderSelectionSlider').addEventListener('input', updateSelectedTree);
        document.getElementById('StarChartTreeExpanderVisibilityToggle').addEventListener('click', function() {
            adjustTreeVis(Number(document.getElementById('StarChartTreeExpanderSelectionSlider').value));
        });
    } else {
        console.log("[Star Chart Tree Expander] [LOG] Failed to locate ID, interface already exists or the current article is not the 'Star Chart' article. Cancelling script.");
    }
}
addStarChartTreeExpander();
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:StarChartTreeExpander.js