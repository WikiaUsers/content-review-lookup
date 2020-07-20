/* Any JavaScript here will be loaded for sysops only */
importScriptURI('//sonako.fandom.com/index.php?title=MediaWiki:FileTools.js&action=raw&ctype=text/javascript');

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
window.replyAndClose = {
    reason: 'Xem post thứ $1 để biết lý do đóng Thớt',
    def: 'Đã quá tải. Mỗi thớt chỉ nên có tối đa 150 bình luận.\n\nCác bạn hãy sang ver mới: ',
    generic: {
        'Không phù hợp': 'Chào bạn!\n\nThớt này không phù hợp với {{SITENAME}} nên mình buộc phải khóa. Mong bạn sau này lưu ý hơn\n\nNếu có gì thắc mắc bạn có thể liên lạc với 1 trong các admin của {{SITENAME}}.',
        'Spam': 'Chào bạn!\n\nHành động spam của bạn là không được phép trên đây. Mong bạn sau này lưu ý hơn.'
    }
};

window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.topLevelCat = '';

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AjaxUndo/code.js',
        'u:dev:AnchoredRollback/code.js',
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxBlock/code.js',
        'u:dev:AjaxDelete/code.js',
        'u:dev:QuickToolsv2/code.js',
        'u:dev:QuickContribs/code.js',
        'u:dev:AjaxRename/code.js',
        'u:dev:PortableCSSPad/code.js',
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:AjaxBatchUndelete/code.js',
        'u:dev:Thread_Inspection/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:CacheCheck/code.js',
        'u:dev:MassRename/code.js',
        'u:dev:MassRenameRevert/code.js',
        'u:dev:PageRenameAuto-update/code.js',
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:MediaWiki:MassBlock/code.js',
        'u:dev:MediaWiki:QuickDelete/multiCats.js',
        'u:dev:MediaWiki:ReplyAndClose/code.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
        'u:dev:Linksweeper/code.js',
        'u:dev:QuickThreads/code.js',
        'u:dev:AutoEditPages/code.js',
        'u:dev:MassCategorization/code.js',
        'u:dev:QuickComments/code.js',
        'u:dev:QuickComments/advanced.js',
        'u:kocka:MediaWiki:MessageWallActions/code.js',
        'u:sonako:MediaWiki:MergeFile.js',
        'u:sonako:MediaWiki:CommentsDelete.js',
        'u:sonako:MediaWiki:FastRevert.js'
    ]
});

$(window).load(function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Nuke/code.js',
            'u:dev:MediaWiki:WHAM/code.js',
            'u:dev:MediaWiki:WHAM/code.2.js'
        ]
    });
});