/*
Adds a toggle to pages in the Class namespace to show or hide deprecated members.
https://roblox.fandom.com/wiki/User:Joritochip/common.js?oldid=1367324
*/
mw.hook('wikipage.content').add(function() {
    var indicator = $('#mw-indicator-deprecated-toggle');
    if (!indicator || indicator.children().length > 0) return;
    
    var isShownOnLoad = mw.cookie.get('deprecated-members-shown', null, 'false') == 'true';
    
    var input = $('<input>', {
        type: 'checkbox',
        checked: isShownOnLoad
    });
    
    $('<label>').append(input, $('<span>').text('Show deprecated members')).appendTo(indicator);
    
    function updateMemberVisibility(visible) {
        mw.cookie.set('deprecated-members-shown', visible ? 'true' : 'false', {
            expires: 86400 * 30
        });
        
        var tables = $('div.deprecated-member');
        if (visible) { tables.show(); } else { tables.hide(); }
        
        $('#toc a').each(function() {
            var anchor = $(this);
            var headline = $(document.getElementById(decodeURI(anchor.attr('href').slice(1))));
            if (headline.closest('div.deprecated-member').length) {
                if (visible) { anchor.parent().show(); } else { anchor.parent().hide(); }
            }
        });
    }
    
    updateMemberVisibility(isShownOnLoad);
    
    // re-scroll to initial url anchor in case page shifted
    var initAnchorId = window.location.hash.substr(1);
    if (initAnchorId && initAnchorId.length > 0) {
        var initElement = document.getElementById(initAnchorId);
        if (initElement) { initElement.scrollIntoView(); }
    }
    
    input.change(function() {
        updateMemberVisibility(this.checked);
    });
});