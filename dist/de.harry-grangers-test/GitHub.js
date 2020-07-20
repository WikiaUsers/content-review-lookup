define('GitHub',function() {
    var git = function() {
        this.v = 3;
    };

    _apiURL = 'https://api.github.com/';

    git.prototype.pullsByUser = function(state,author,repo,callback) {
        $.getJSON(_apiURL + 'search/issues?q=state:'+(state ? 'open' : 'closed')+'+author:'+author+'+repo:'+repo+'&sort=created&order=asc',callback);
    };

   return git;
});
require(['GitHub'],function(Git) {
	git = new Git();
	git.pullsByUser('open','shaedrich','Wikia/app',function(data) {
		console.log(data);
    });
});