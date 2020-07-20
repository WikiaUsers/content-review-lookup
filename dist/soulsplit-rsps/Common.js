var WikiaNotificationMessage = "SoulSplit has been shutdown!";
var WikiaNotificationexpiry = 20;
 
importArticles( {
	type: 'script',
	articles: [
			    'u:dev:FloatingToc/code.js', 
                'u:dev:PurgeButton/code.js',
                'u:dev:View_Source/code.js',
                'u:dev:ExternalImageLoader/code.js',
                'w:c:dev:VisualSpellCheck/code.js',
                'u:dev:AjaxRC/code.js',
                'u:dev:User Rights Reasons Dropdown/code.js',
                'w:c:dev:EditcountTag/code.js',
                'u:dev:CacheCheck/code.js',
                'u:dev:AjaxPatrol/code.js',
                'u:dev:WikiaNotification/code.js',
                'u:dev:ExtendedNavigation/code.js',
                'u:dev:TwittWidget/code.js',
                'u:dev:FixWantedFiles/code.js',
                'u:dev:DupImageList/code.js',
                'u:dev:Standard_Edit_Summary/code.js',
                'u:dev:HighlightUsers/code.js',
                'w:c:dev:RevealAnonIP/code.js',
                'u:dev:ListAdmins/code.js',
                'MediaWiki:Common.js/Konami.js',
                'MediaWiki:Common.js/reverseKonami.js'
	]
} );
 
 
highlight = {
    selectAll: false,
    sysop: 'red',
    bureaucrat: '#007316',
    users: {
 
    }
};
 
window.RevealAnonIP = {
    permissions : ['bureaucrat']
};