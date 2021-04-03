/* Any JavaScript here will be loaded for sysops only */
var QuickToolsAdvancedtop = false;

massRenameDelay = 1000;
massRenameSummary = 'automatic';

window.AjaxDelete = {
    autoCheckWatch: false
};
window.AjaxBlock = {
    blockReasons: {
        '[[Help:Vandalism]]': 'Phá hoại',
        '[[Help:Spam]]': 'Spam',
        'Chèn thông tin sai lệch, vô giá trị': 'Thêm vớ vẩn',
        'Tên/Avatar không phù hợp': 'Name/avatar',
        'Xóa nội dung/Xóa trắng trang': 'Xóa trang'
    },
    check: {
        creation: false,
        talk: true,
        autoBlock: true,
        override: true
    }
};

window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.topLevelCat = '';

mw.loader.using(['mediawiki.util', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:AjaxUndo/code.js',
            'u:dev:MediaWiki:AnchoredRollback/code.js',
            'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
            'u:dev:MediaWiki:AjaxBatchUndelete/code.js',
            'u:dev:MediaWiki:AjaxBlock/code.js',
            'u:dev:MediaWiki:AjaxDelete/code.js',
            'u:dev:MediaWiki:AjaxRename/code.js',
            'u:dev:MediaWiki:AutoEditPages/code.js',
            'u:dev:MediaWiki:CacheCheck/code.js',
            'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
            'u:dev:MediaWiki:FileUsageAuto-update/code.js',
            'u:dev:MediaWiki:Linksweeper/code.js',
            'u:dev:MediaWiki:MassCategorization/code.js',
            'u:dev:MediaWiki:MassBlock/code.js',
            'u:dev:MediaWiki:MassProtect/code.js',
            'u:dev:MediaWiki:MassRename/code.js',
            'u:dev:MediaWiki:MassRenameRevert/code.js',
            'u:dev:MediaWiki:Nuke/code.js',
            'u:dev:MediaWiki:PageRenameAuto-update/code.js',
            'u:dev:MediaWiki:PortableCSSPad/code.js',
            'u:dev:MediaWiki:QuickDelete/code.js',
            'u:dev:MediaWiki:QuickContribs/code.js',
            'u:dev:MediaWiki:RedirectManagement/code.js',
            'u:dev:MediaWiki:WHAM/code.js',
            'u:dev:MediaWiki:WHAM/code.2.js',
            'u:sonako:MediaWiki:FastRevert.js',
            'u:sonako:MediaWiki:FileTools.js',
            'u:sonako:MediaWiki:MergeFile.js'
        ]
    });
});