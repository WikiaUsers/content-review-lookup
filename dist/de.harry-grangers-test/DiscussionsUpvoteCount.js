posts = [];
function getUserDiscussionsUpvoteCount(userId,callback) {
	$.getJSON('https://services.wikia.com/discussion/' + wgCityId + '/users/' + userId + '/posts?page=0&limit=100&responseGroup=full&viewableOnly=false',function(res) {
        params={};
        timeSpanDays = 90;
        page = 1;
        timeSpanTS = new Date().getTime() - (timeSpanDays * 24 * 60 * 60 * 1000);
		if(res._links.hasOwnProperty('last')) {
        	res._links.last[0].href.match(/\/\d+\/users\/\d+\/posts\?(.*)/)[1].replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){params[k]=v});
			lastPage = 0;
        }
        posts = res._embedded['doc:posts'];
 
        if(new Date(posts[posts.length - 1].creationDate.epochSecond * 1000) > timeSpanTS) {
            getUserDiscussionContribs(page,timeSpanTS,posts,callback);
        }
		else {
			processUserDiscussionContribs(posts,callback);
        }
    });
}
 
function getUserDiscussionContribs(page,ts,_posts,callback) {
	$.getJSON('https://services.wikia.com/discussion/1965/users/5301680/posts?page=' + page + '&limit=100&responseGroup=full&viewableOnly=false',function(res) {
		posts = _posts.concat(res._embedded['doc:posts']);
        if(new Date(posts[posts.length - 1].creationDate.epochSecond * 1000) > ts) {
            getUserDiscussionContribs(page + 1,ts,posts,callback);
        }
		else {
			processUserDiscussionContribs(posts,callback);
        }
    });
}
 
function processUserDiscussionContribs(contribs,callback) {
	console.log(posts.reduce(function(a,b) {
		return a + b.upvoteCount;
	},0));
	callback(posts.reduce(function(a,b) {
		return a + b.upvoteCount;
	},0));
}
 
if(wgNamespaceNumber == 2) {
    getUserDiscussionsUpvoteCount(wgTrackID,function(upvotes) {
        $('.masthead-info-lower .discussion-details.tally').after(
            $('<div />',{class: 'tally'}).append(
                $('<a />',{id: 'discussionUpvoteCountForUser'}).css('color','black').append(
                    $('<em />').text(upvotes),
                    $('<span />',{class: 'discussion-label'}).text('Upvotes erhalten in den letzten 90 Tagen')
                )
            )
        )
    });
}