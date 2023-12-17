/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/*删除速率*/
window.batchDeleteDelay = 500;

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

// 导入Dev Wiki的脚本
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:HTML5AudioPlayer/code.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:MediaWiki:UserUnusedFiles/code.js',
        'u:dev:MediaWiki:dev:SpoilerTags.js',
        'u:dev:MediaWiki:SpoilerAlert/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:AddAnnouncement/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:TemplateTypeButtons/code.js',
        'u:dev:MediaWiki:WikiActivity.js',
        'u:dev:MediaWiki:MassPatrol/code.js',
        'u:dev:MediaWiki:AdminDashboard_block/code.js',
        'u:dev:MediaWiki:WikiStatistics/code.js',
        'u:dev:MediaWiki:AdminDashboard_JS-Button/code.js',
        'u:dev:MediaWiki:AddUserRightsTag/code.js',
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:AddRailModule/code.js',
        'u:dev:MediaWiki:Digital Clock.js',
        'u:dev:MediaWiki:ThemeToggler.js'
    ]
});