// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};

window.DisplayClockJS = '%2I:%2M:%2S %p, %b %2d, %Y (UTC)';

// Augmentation for CSS plural.
// Everything is plural by default, need to tag nodes which shouldn't be.
// "1 Like"
if (mediaWiki.config.get('wgNamespaceNumber') === 2000 && mediaWiki.config.get('wgUserLanguage') === 'en') {
    $(function($) {
        'use strict';
        $('#Forum.Board .thread .activity > .posts').each(function() {
            var txt = this.textContent || this.innerText;
            if (/^\s*1\s/.test(txt)) {
                this.className += ' one';
            }
        });
    });
}

$(window).load(function() {
    $('#WikiaRail').append($('<section/>', {
        id:'sitenotice',
        html:'' //insert your html here
    }));
});