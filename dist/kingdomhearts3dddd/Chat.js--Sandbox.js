window.importArticles({
    type: "style",
    articles: [
        "u:kingdomhearts3dddd:MediaWiki:Commands.css"
    ]
});
    
window._chat = window._chat || function(callback){
	var isChat = (mw.config.get('wgCanonicalSpecialPageName', wgCanonicalSpecialPageName) == 'Chat') ? true : false;
	if (isChat === true){
		var modules = {
			'Options': {
				name: 'Chat Options',
				loaded: false,
				load: function(){
					importScriptPage('MediaWiki:Chat.js/Options.js');
					return true;
				}
			}, 'Shortcuts': {
				name: 'Chat Shortcuts',
				loaded: false,
				load: function(){
					importScriptPage('MediaWiki:Chat.js/Shortcuts.js');
					return true;
				}
			}, 'Party Mode': {
				name: 'Party Mode',
				loaded: false,
				load: function(){
					importScriptPage('MediaWiki:Chat.js/PartyMode.js');
					return true;
				}
			}, 'Help': {
				name: 'Help',
				loaded: false,
				load: function(){
					importScriptPage('MediaWiki:Chat.js/Help.js');
					return true;
				}
			}
		};
		
		var globalContainer = document.createElement('nav');
		globalContainer.className = 'ChatNavigation GlobalContainer module-container vertical';
		globalContainer.id = 'GlobalContainer';
		
		for (var i in modules){
			var globalModuleP = document.createElement('div');
			globalModuleP.innerHTML = '<a href="#" class="GlobalLink nav-link module-link">' + i + '<span class="tooltip">' + modules[i].name + '</span></a>';
			globalModuleP.className = 'GlobalModuleP GlobalModuleParent';
			globalModuleP.setAttribute('data-name', modules[i].name);
			globalContainer.appendChild(globalModuleP);
			modules[i].loaded = Function.prototype.apply.call(modules[i].action, window, []);
		}
		$('.ChatHeader .wordmark').after(globalContainer);
		if (typeof callback == "function") Function.prototype.apply.call(callback, window, []);
	}
};

onload = _chat(function(){
    console.log('Modules loaded!');
});