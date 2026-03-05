/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Thể loại:Trang Đổi Hướng]]';
});

/* Allowing for lists of certain user groups to be rendered */
window.listUsers = {
    talk: true,
    customgroups: ['autopatrol','content-moderator','threadmoderator'],
    limit: 50
};

/* overrides certain i18n strings for MapsExtended */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};

/* 
   for certain marker types like Billboards, 
   using the word "collected" makes little sense.
   instead, we can use "found"
*/
window.dev.i18n.overrides["MapsExtended"]["category-collected-label"] = "Đã tìm thấy $1/$2";
window.dev.i18n.overrides["MapsExtended"]["collected-all-banner"] = "Chúc mừng! Bạn đã tìm thấy toàn bộ <b>$1</b>/<b>$2</b> đánh dấu \"$3\" trên $4.";

/* for [[dev:GlobalFileUsage]] */
window.globalFileUsageConfig = {
    'lang': ['th', 'en', 'es'],
    'auto_show': false
}

/* for [[dev:LinkPreview]] */
window.pPreview = $.extend(true, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {},
    tlen: 1000 
});

window.pPreview.RegExp.noinclude = [
    ".NoLinkPreview", 
    ".LinkPreview-ignore", 
    ".quote", 
    ".mw-ext-cite-error", 
    ".error", 
    ".references", 
    ".reference", 
    ".sup.reference", 
    ".mw-countdown",
    "blockquote"
];

mw.hook('wikipage.content').add(function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList.contains('npage-preview')) {
                    const img = node.querySelector('img');
                    
                    if (img) {
                        const adjustImageSize = function() {
                        	const ratio = img.naturalHeight / img.naturalWidth;
                            const width = img.naturalWidth;
                            //lightcone
                            if (img.naturalHeight > img.naturalWidth) {
                                img.style.width = 'auto'; 
                                img.style.maxHeight = '185px'; 
                                img.style.objectFit = 'contain'; 
                                img.style.display = 'block';
                                img.style.margin = '0 auto'; 
                            }
                            //item
                            else if (ratio >= 0.8 && ratio <= 1.2) {
                                img.style.width = 'auto';
                                img.style.height = '140px';
                                img.style.objectFit = 'contain';
                                img.style.display = 'block';
                                img.style.margin = '0 auto'; 
                            }
                            //banner
                            else {
                                img.style.width = '95%';
                                img.style.height = 'auto';
                            }
                        };

                        if (img.complete) {
                            adjustImageSize();
                        } else {
                            img.onload = adjustImageSize;
                        }
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});