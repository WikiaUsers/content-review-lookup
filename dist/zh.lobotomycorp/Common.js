/*删除速率*/
window.batchDeleteDelay = 500;
/*移动速率*/
window.massRenameDelay = 3500;
// 不活跃标签
InactiveUsers = { 
    months: 2,
    gone: [''],
    text: '不活跃'
};
importScriptPage('InactiveUsers/code.js', 'dev');

// 防止原有标签丢失
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

window.BackToTopModern = true;
window.BackToTopSpeed = 600;
window.BackToTopStart = 800;

//侧边栏小块
window.AddRailModule = [{prepend: true}];
window.AddRailModule = [{maxage:86400}];
//以上部分必须放在js导入前面
// js导入
importArticles({
    type: 'script',
    articles: [
    	'MediaWiki:AbnormalitySearch.js',//异想体搜索
    	'u:dev:MediaWiki:InactiveUsers/code.js',
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
        'u:dev:MediaWiki:ReferencePopups/code.js',//注释提示框
        'u:dev:MediaWiki::MarkBlocked.js',
		'u:dev:MediaWiki::MessageWallUserTags/code.js',
		'u:dev:MediaWiki::ProfileTags.js',
		'u:dev:MediaWiki::InactiveUsers/code.js',
		'u:dev:MediaWiki::WdsTooltips.js',
		'u:dev:MediaWiki::BlockSummary.js',
		'u:dev:MediaWiki:UserBlockNotification.js'
    ]
});

//Abn_Infobox Work_preference 数据形式切换
var workPreferenceButtonCount = 0;

document.getElementById("work_preference_button").addEventListener("click", function(){
	var workPreferenceButton = document.getElementById("work_preference_button");
    var level = document.getElementsByClassName("work_preference_level");
    var stat = document.getElementsByClassName("work_preference_stat");
	console.log("workPreference button clicked");
	if (workPreferenceButtonCount==0){
		workPreferenceButton.innerHTML = "显示文字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "none";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "block";
		}
		workPreferenceButtonCount = 1;
	}else{
		workPreferenceButton.innerHTML = "显示数字";
		for (i = 0; i < level.length; i++) {
			level[i].style.display = "block";
		}
		for (i = 0; i < stat.length; i++) {
			stat[i].style.display = "none";
		}
		workPreferenceButtonCount = 0;
	}
});

// Retrans 左侧工具栏按钮
    //按钮位置剪切
document.getElementsByClassName("page-side-tools")[0].appendChild(document.getElementById("retrans-button"));

    //按钮切换功能
var retransButtonCount = 0;
document.getElementById("retrans-button").addEventListener("click", function(){
	var preRetrans = document.getElementsByClassName("pre-retrans");
    var postRetrans = document.getElementsByClassName("post-retrans");
    var retransButton = document.getElementById("retrans-button");
	console.log("retrans button clicked");
	if (retransButtonCount==0){
		retransButton.innerHTML = "原";
		for (i = 0; i < preRetrans.length; i++) {
			preRetrans[i].style.display = "none";
		}
		for (i = 0; i < postRetrans.length; i++) {
			postRetrans[i].style.display = "inline";
		}
    	retransButtonCount = 1;
    }else{
    	retransButton.innerHTML = "译";
    	for (i = 0; i < preRetrans.length; i++) {
			preRetrans[i].style.display = "inline";
		}
		for (i = 0; i < postRetrans.length; i++) {
			postRetrans[i].style.display = "none";
		}
    	retransButtonCount = 0;
    }
});

//注释弹窗的设定。这段必须放在这不然会出bug
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };