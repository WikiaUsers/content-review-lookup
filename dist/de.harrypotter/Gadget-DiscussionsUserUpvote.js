var upvoteCount = 0;
function getUpvoteCount(id, page, callback) {
    href = '/' + wgCityId + '/users/' + id + '/posts?responseGroup=full&sortDirection=descending&sortKey=creation_date&viewableOnly=false&limit=100&page=' + page;
    $.get('https://services.wikia.com/discussion' + href, function(res) {
        upvoteCount += res._embedded['doc:posts'].reduce(function(a,b) {
            return a + b.upvoteCount;
        }, 0);
		if (res._links.hasOwnProperty('next')) {
			getUpvoteCount(id, page + 1, callback);
        }
		else if (typeof callback === 'function') {
			callback(upvoteCount);
        }
    });
}
 
upvoteSVG = '<svg id="upvote-reply" viewBox="0 0 10 10" width="100%" height="100%"><g fill-rule="evenodd"><path class="upvote-icon-background" d="M-4-4h18v18H-4z"></path><path d="M9.707 4.292l-4-4C5.615.2 5.504.127 5.382.076c-.244-.1-.52-.1-.764 0-.123.05-.233.124-.325.216l-4 4c-.39.39-.39 1.023 0 1.414C.488 5.9.743 6 1 6c.256 0 .512-.1.707-.294L4 3.413V9c0 .55.448 1 1 1s1-.45 1-1V3.412l2.293 2.293C8.488 5.9 8.743 6 9 6c.256 0 .512-.1.707-.294.39-.39.39-1.023 0-1.414"></path></g></svg>';
$('.masthead-info .discussion-details.tally').append(
    '&ensp;',
    $('<span />', { class: 'discussion-details-upvote' }).append(
        '(',
        upvoteSVG,
        ' ' ,
        $('<span />', { class: 'discussion-details-upvote-count', html: 'calculate&hellip;' }).css('float', 'none'),
        ')'
    )
);
$('.discussion-details-upvote > svg').height(10).width(10).css({ verticalAlign: 'middle', padding: 2, fill: '#666' });
$('.upvote-icon-background').remove();

url = $('#discussionAllPostsByUser').attr('href').split('/')
userid = url[url.length - 1];
 
getUpvoteCount(userid, 0, function(upvoteCount) {
	$('.discussion-details-upvote-count').text(upvoteCount);
});