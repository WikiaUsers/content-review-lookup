/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    const autoStyleRules = [
        { keyword: 'Tool', color: '#ef7e58' },
        { keyword: 'Tools', color: '#ef7e58' },
        { keyword: 'Melee', color: '#c0392b' },
        { keyword: 'Ranged', color: '#2980b9' },
        { keyword: 'Magic', color: '#8e44ad' },
        { keyword: 'Pickaxe', color: '#7f8c8d' },
        { keyword: 'Pickaxes', color: '#7f8c8d' },
        { keyword: 'Armor', color: '#8067ff' },
        { keyword: 'Armors', color: '#8067ff' },
        { keyword: 'Accessory', color: '#ffff7f' },
        { keyword: 'Accessories', color: '#ffff7f' },
        { keyword: 'Spell', color: '#dc70ef' },
        { keyword: 'Spells', color: '#dc70ef' },
        { keyword: 'Consumable', color: '#ef5b5d' },
        { keyword: 'Consumables', color: '#ef5b5d' },
        { keyword: 'Material', color: '#89c3ef' },
        { keyword: 'Materials', color: '#89c3ef' }
        // Add more keywords and their colors here as needed
    ];

    function applyKeywordStyles() {
        autoStyleRules.forEach(function(rule) {
            const keyword = rule.keyword;
            const color = rule.color;

            const regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'gi');

            // Using .not('script, style') to avoid processing code
            $('body *:not(script, style, .mw-parser-output .thumb, .mw-parser-output .floatright, .mw-parser-output .floatleft, .infobox, table)').contents().filter(function() {
                return this.nodeType === 3 && this.nodeValue.trim() !== '';
            }).each(function() {
                let text = this.nodeValue;
                if (regex.test(text)) {
                    let newText = text.replace(regex, '<span style="color:' + color + '; font-weight: bold;">$&</span>');
                    $(this).replaceWith(newText);
                }
            });
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    applyKeywordStyles();
});