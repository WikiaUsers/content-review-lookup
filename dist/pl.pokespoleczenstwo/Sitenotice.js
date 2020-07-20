/***************************************************

                Dynamic sitenotice

***************************************************/

var sitenotice = {
	isActive: true,

    cookieName: 'sitenotice-displayed-count',
    maxDisplayCount: 5,
    api: new mw.Api(),
    params: {
      action: 'parse',
      contentmodel: 'wikitext',
      formatversion: 2,
      page: 'MediaWiki:Sitenotice'
    },
    
    getCookie: function() {
        return parseInt(mw.storage.session.get(this.cookieName) || 0);
    },
    
    parse: function() {
    	return this.api.get(this.params)
    		.then(function(response) { return response.parse.text; });
    },

    updateCookie: function(currValue) {
        mw.storage.session.set(this.cookieName, currValue + 1);
        return this;
    },

    display: function() {
    	return this.parse(this.content)
    		.then(function(notice) {
		        $(notice).prependTo('#content');
		        return this;
    		});
    }
};

if (sitenotice.isActive) {
    var displayedCount = sitenotice.getCookie();

    if (displayedCount < sitenotice.maxDisplayCount) {
        sitenotice.updateCookie(displayedCount).display();
    }
}