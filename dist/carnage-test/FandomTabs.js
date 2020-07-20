(function($, mw, window){
    function FandomTabs(){
        this.contentLoaded = $.Deferred();
        this.itemsLoaded = {};
        this.fullPageName = mw.config.get('wgPageName');
        this.pageName = this.fullPageName.split('/')[0];
        this.pages = [];
        this.subpages = [];
        this.titles = [];
        this.$sliderElem = $('<nav>').addClass('wiki-page-tabs fandom-tabs');
        this.$tabs = $('.page-tabs');
        return this;
    }
    
    FandomTabs.prototype.getContent = function(){
        this.$items = this.$tabs.children('.tab');
        this.$items.each($.proxy(function(index, elem){
            var subpage = $(elem).attr('data-subpage') || '',
                mainpage = this.pageName,
                isMainPage = subpage === '',
                fullitem = null,
                title = null;
            if (!isMainPage){
                fullitem = mainpage + subpage;
                title = $(elem).attr('data-title');
                this.itemsLoaded[fullitem] = $.Deferred();
                this.pages[this.pages.length] = fullitem;
                this.subpages[this.subpages.length] = fullitem;
                this.titles[this.titles.length] = title;
            } else {
                fullitem = mainpage;
                title = 'Main';
                this.itemsLoaded[fullitem] = $.Deferred();
                this.pages[this.pages.length] = mainpage;
                this.titles[this.titles.length] = title;
            }
        }, this));
    };
    
    FandomTabs.prototype.loadItems = function(){
        $.each(this.itemsLoaded, $.proxy(function(item){
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: {
                    action: 'parse',
                    title: item,
                    format: 'json'
                },
                success: $.proxy(function(response){
                   var content = response.parse.text['*'], elem = $('<div>').html(content);
                }, this)
            });
        }, this));
    };
    
    FandomTabs.prototype.init = function(){
        $.each(this.itemsLoaded, $.proxy(function(item){
            this.itemsLoaded[item].done($.proxy(this.createItem, this));
        }, this));
    };
    
    FandomTabs.prototype.createItem = function(){
            
	};
	
	window.FandomTabs = FandomTabs;
}(jQuery, mediaWiki, window));