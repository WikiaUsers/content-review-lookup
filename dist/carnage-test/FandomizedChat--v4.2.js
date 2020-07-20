(function($, mw, mainRoom){
    if (typeof window.FandomizedChat !== 'undefined' && fc_config.disabled) return;
	var FC = {};
	
	// General objects
	FC.mwc = mw.config.get('wgUserName wgContentLanguage wgUserLanguage wgSiteName wgCityId wgChatEmoticons wgUserGroups wgChatMyAvatarUrl'.split(/\s+/g));
	FC.loadTime = 20; // in seconds
	FC.room = mainRoom;
	FC.i18n = {};
	
	// Chat elements
	FC.$chatWindow = $('.ChatWindow');
	FC.$chatHeader = $('#ChatHeader');
	FC.$selfUser = $('#ChatHeader .User');
	FC.$chatRail = $('#Rail');
	FC.$publicChatList = $('#WikiChatList');
	FC.$privateChatList = $('#PrivateChatList');
	FC.$chatContent = $('.Chat');
	FC.$message = $('#Write .message');
	FC.$messagebox = $('#Write [name="message"]');
	
	// Custom elements
	FC.$loadingScreen = $('<section />', { 'class': 'FandomizedChatLoadingScreen FandomizedChatLoader chat-loading-screen', 'id': 'FandomizedChatLoadingScreen' });
	FC.$optionsRail = $('<aside />', { 'class': 'FandomizedChatOptionsRail options-rail', 'id': 'FandomizedChatOptionsRail' });
	FC.$toolbar = $('<footer />', { 'class': 'FandomizedChatToolbar chat-toolbar', 'id': 'FandomizedChatToolbar' });
	FC.$wordmark = $('<img />', { 'class': 'FandomizedChatWordmark wordmark' });
	
	// Custom selectors
	FC.$loadingScreenSelector = $('#FandomizedChatLoadingScreen');
	FC.$loadingScreenPercentage = $('#FandomizedChatLoadingScreen .loading-percentage');
	FC.$optionsRailSelector = $('#FandomizedChatOptionsRail');
	FC.$toolbarSelector = $('#FandomizedChatToolbar');
	
	// Deferred objects
	FC.loaded = $.Deferred();
	FC.resourcesLoaded = $.Deferred();
	FC.loadingScreenInserted = $.Deferred();
	FC.wordmarkLoaded = $.Deferred();
	FC.chatTopicLoaded = $.Deferred();
	
	// FandomizedChat methods
	FC.preload = function(){
		$.when(
			this.loaded,
			this.resourcesLoaded
		).done($.proxy(this.init, this));
		$.when(this.loadingScreenInserted).done($.proxy(function(){
			this.loaded.progress($.proxy(function(progress){
				var percentage = progress.currPercentage,
					state = progress.state,
					total = progress.totalPercentage;
				this.$loadingScreenPercentage.text(percentage + ' / ' + total);
				if (state === 'completed'){
					this.loadResources(function(){
						this.log('All scripts has been loaded. Welcome to the ' + this.mwc.wgSiteName + ' chat!');
						this.resourcesLoaded.resolve();
						this.loaded.resolve();
					});
				}
			}, this));
		}, this));
	};
	
	FC.createPreloader = function(){
		this.loadWordmark(function(wordmark){
			var $preloaderContent = $('<div>').addClass('FandomizedChatLoadingScreenContent chat-loading-screen-content loading-screen-chat').attr('id', 'FandomizedChatLoadingScreenContent'),
			    $preloaderHTML = [
			        $('<header>').addClass('FandomizedChatLoadingScreenHeader chat-loading-screen-header loading-screen-header').attr('id', 'FandomizedChatLoadingScreenHeader')
			            .html([
			                this.$wordmark.attr('src', wordmark),
			                $('<h3>').addClass('FandomizedChatLoadingScreenHeading chat-loading-screen-heading loading-screen-heading').text(
			                    this.parse('Welcome to {sitename} Chat!', {
			                        sitename: this.mwc.wgSiteName
			                    })
			                )
			            ]),
			        $('<ul>').addClass('FandomizedChatLoadingScreenLogs chat-loading-screen-logs loading-screen-logs').attr('id', 'FandomizedChatLoadingScreenLogs')
			    ];
		}, function(){
			
		});
		this.preload();
	};
}(jQuery, mediaWiki, mainRoom));