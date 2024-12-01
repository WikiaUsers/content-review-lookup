/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/*删除速率*/
window.batchDeleteDelay = 500;
/*移动速率*/
window.massRenameDelay = 3500;
// 不活跃标签
InactiveUsers = { 
    months: 2,
    gone: ['PWMJ'],
    text: '不活跃'
};
importScriptPage('InactiveUsers/code.js', 'dev');

// 防止原有标签丢失
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.BackToTopModern = true;
window.BackToTopSpeed = 600;
window.BackToTopStart = 800;

//防剧透配置
window.SpoilerAlertJS = {
    question: '此部分含有剧透内容。是否要继续观看？',
    yes: '是',
    no: '否',
    fadeDelay: 500
};

//侧边栏小块
window.AddRailModule = [{prepend: true}];
window.AddRailModule = [{maxage:86400}];

// 导入Dev Wiki的脚本
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:HTML5AudioPlayer/code.js',//html5播放器，功能较多
        'u:dev:MediaWiki:BackToTopButton/code.js',//在页面右下角添加一个返回顶端的按钮
        'u:dev:MediaWiki:UserUnusedFiles/code.js',//可在Special:UserUnusedFiles中获取一个用户上传的从未使用过的文件
        'u:dev:MediaWiki:MassProtect/code.js',//添加一个批量保护工具
	    'u:dev:MediaWiki:AddAnnouncement/code.js',//使用户可以直接从博客命名空间添加公告
        'u:dev:MediaWiki:WikiActivity.js',//在右下角添加“wiki活动”选项
        'u:dev:MediaWiki:MassRename/code.js',//添加一个批量移动工具
        'u:dev:MediaWiki:TemplateTypeButtons/code.js',//在模板页添加模板类型按钮，可以直接点击以切换模板类型
        'u:dev:MediaWiki:MassPatrol/code.js',//在页面差异页能够批量回退
        'u:dev:MediaWiki:AdminDashboard_block/code.js',//在管理员面板添加封禁用户的入口
        'u:dev:MediaWiki:AdminDashboard_JS-Button/code.js',//添加一个common.js入口于管理员面板
        'u:dev:MediaWiki:AddUserRightsTag/code.js',//在用户个人档案添加按钮以便管理员编辑
        'u:dev:MediaWiki:AddBlockUserTag/code.js',//为被封禁的用户添加“已封禁”标签
        'u:dev:MediaWiki:AjaxBatchDelete.js',//添加批量删除工具
        'u:dev:MediaWiki:AddRailModule/code.js',//为右侧轨添加一个内容公告
        'u:dev:MediaWiki:ThemeToggler.js',//添加一个临时切换主题的按钮在左上角
        'u:dev:MediaWiki:NullEditButton/code.js',//在页面选项中添加一个空编辑选项，用于刷新
        'u:dev:MediaWiki:MassCategorization/code.js',//添加一个批量分类管理工具
        'u:dev:MediaWiki:CommunityPageRailModule.js',//为右侧轨添加社区模块
        'u:dev:MediaWiki:OggPlayer.js',//ogg播放器，可自定义播放按钮
        'MediaWiki:CombatCard.js',//战斗书页js
        'MediaWiki:AbnormalityPage.js',//异想体书页js
        'MediaWiki:Story.js',//配音切换js
        'MediaWiki:CombatPageInputBox.js',//战斗书页数据查找
        'MediaWiki:CombatCardFilter.js',//战斗书页检索
        'MediaWiki:KeyPage.js',//核心书页
        'MediaWiki:AdminDashboardImportJS.js',//在管理员面板添加一个importjs的快捷入口
        'u:dev:MediaWiki:ReferencePopups/code.js',//注释提示框
        'u:dev:MediaWiki:DivEditor/code.js',//div编辑器
       // 'u:dev:MediaWiki:GadgetsStateToggler.js'//启用小工具快速切换，但是不小心被fandom毙了
    ]
});

//注释弹窗的设定。这段必须放在这不然会出bug
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };