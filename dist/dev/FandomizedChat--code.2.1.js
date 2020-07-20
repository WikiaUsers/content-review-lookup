/**
 * FandomizedChat v2.1.1
 * @description This script makes the chat more modern
 *              and adds more features that would make
 *              the chat easier to use.
 *
 * @author Ultimate Dark Carnage
 **/

// Making sure that the MediaWiki API loads by default
window.mediaWiki.loader.load('mediawiki.api');

// Initializing the script
(function(mw, $, config){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    // Creating the main object
    var FandomizedChat = Object.create(null);
    /**
     * @method importResources
     * @description This function imports scripts and stylesheets from
     *              the current wiki and other wikis.
     * @param {Array} resources - The resource(s) that will be imported to
     *                            the wiki.
     **/
    FandomizedChat.importResources = function(resources){
        var object = { style: [], script: [] };
        resources = resources.map(function(resource){
            var type = '';
            if (resource.endsWith('.css')) type = 'style';
            else if (resource.endsWith('.js')) type = 'script';
            return {
                type: type,
                article: resource
            };
        });
        resources.forEach(function(resource){
            var keys = Object.keys(object);
            if (keys.indexOf(resource.type) > -1){
                object[resource.type].push(resource.article);
            }
        });
        for (var key in object){
            if (object.hasOwnProperty(key)){
                importArticles({
                    type: key,
                    articles: object[key]
                });
            }
        }
    };
    
    /**
     * @property room
     * @description This is the main chat room object
     **/
    FandomizedChat.room = mainRoom;
    
    /**
     * @property i18n
     * @description This property allows for custom translations from other
     *              languages.
     **/
    FandomizedChat.i18n = $.extend(true, {
		en: {
			showAway: 'Away',
			showHere: 'Here',
			isTyping: {
				1: '$1 is typing...',
				2: '$1 and $2 are typing...',
				3: '$1, $2, and $3 are typing...',
				more: '$1, $2, and others are typing...'
			},
			expandChatList: 'Show Chat List',
			collapseChatList: 'Hide Chat List'
		}
	}, config.i18n);
	
	/**
	 * @property queue
	 * @description This property creates a queue for scripts that require it
	 **/
	FandomizedChat.queue = $.extend(true, {
		isTyping: []
	}, config.queue);
	
	/**
	 * @method createQueueBranch
	 * @description This property allows you to extend the queue object
	 * @param {String} name - The name of the branch that will be created
	 * @param def - The default value to be used on the branch
	 * @param {Boolean} clearAndReplace - Determines whether the queue branch should be rewritten
	 **/
	FandomizedChat.createQueueBranch = function(name, def, clearAndReplace){
		def = def || [];
		clearAndReplace = clearAndReplace || false;
		if (this.queue.hasOwnProperty(name)){
			var q = this.queue[name];
			if ([null, ''].indexOf(q) > -1){
				this.queue[name] = def;
			} else {
				if (clearAndReplace){
					this.queue[name] = def;
				}
			}
		} else {
			this.queue[name] = def;
		}
	};
	
	/**
	 * @method setQueueBranch
	 * @description This property allows you to set the value for the queue branch
	 * @param {String} name - The name of the branch that will be set
	 * @param value - The value to be set on the branch
	 **/
	FandomizedChat.setQueueBranch = function(name, value){
		if (typeof value == 'undefined'){
			throw new Error('A value is required for the queue branch: ' + name + '.');
		}
		this.createQueueBranch(name, value, true);
	};
	
	/**
	 * @method getQueueBranch
	 * @description This property fetches the value of the queue branch
	 * @param {String|Array} name - The name(s) of the branch used to find the values
	 **/
	FandomizedChat.getQueueBranch = function(name){
		var isArray = typeof name == 'object' && name instanceof Array,
			res = null;
		if (isArray){
			res = {};
			for (var n = 0; n < name.length; n++){
				var _name = name[n],
					value = this.queue[_name];
				if (typeof value == 'undefined'){
					res[_name] = null;
				} else {
					res[_name] = value;
				}
			}
			return res;
		} else if (typeof name == 'string'){
			return this.queue[name];
		} else {
			return null;
		}
	};
	
	/**
	 * @method clearQueueBranch
	 * @description This property removes the value from the queue branch
	 * @param {String} name - The name of the branch that would be cleared
	 * @param {Boolean} _delete - Determines whether the branch should be deleted completely
	 **/
	FandomizedChat.clearQueueBranch = function(name, _delete){
		if (this.queue.hasOwnProperty(name)){
			if (typeof _delete == 'boolean' && _delete){
				delete this.queue[name];
			} else {
				this.queue[name] = null;
			}
		} else {
			throw new Error('The queue branch "' + name + '" has not been found.');
		}
	};
}(this.mediaWiki, this.jQuery, typeof this.FCConfig == 'object' ? this.FCConfig : {}));