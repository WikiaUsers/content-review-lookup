// Tooltip configuration (https://dev.wikia.com/wiki/Tooltips)
var tooltips_list = [
    {
        classname: 'card-image-tooltip',
        parse: '[[File:<#parameter#>.png|265px|link=]]',
        delay: 100
    }
]
var tooltips_config = {
    offsetX: 8,
    offsetY: 8,
    waitForImages: true
    /*events: ['CustomEvent'],*/
};

// Back to top button configuration (https://dev.wikia.com/wiki/BackToTopButton)
window.BackToTopModern = true;
window.BackToTopStart = 600;

// Allow for 'open in new tab' links.
mw.hook('wikipage.content').add(function(content) {
    var openInNewTab = content.find('.mdw-newtab');
    if (openInNewTab.length > 0)
        openInNewTab.find('a').attr('target', '_blank');
});