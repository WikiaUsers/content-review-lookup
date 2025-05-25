var userAvatarDefault = '<svg class="icon user-avatar__image" viewBox="0 0 40 40"><svg id="avatar" viewBox="0 0 24 24" width="100%" height="100%"> <path fill="#123154" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.267 22.667c-3.415 0-6.447-1.61-8.4-4.107l.12-.058c1.325-.59 3.288-2.105 6.192-2.64-.747-.797-1.305-2.048-1.893-3.54-.34-.863-.282-1.6-.282-2.645 0-.77-.146-2.005.044-2.683.644-2.303 2.277-2.94 4.19-2.94 1.912 0 3.544.633 4.19 2.933.19.68.045 1.918.045 2.69 0 1.044.058 1.778-.28 2.638-.583 1.485-1.15 2.738-1.898 3.54 2.928.523 4.905 2.05 6.238 2.64.047.022.086.043.13.063-1.95 2.498-4.983 4.11-8.398 4.11z" id="design"></path></svg></svg>';
var el = $('.js-related-discussions');
if(!!el.length && !!el.data('threadids')) {
	el.html(
		$('<section />', { class: 'related-discussions-module' }).append(
			$('<h2 />', { text: 'Discussions concerning this article' }),
			$('<ul />', { class: 'related-discussions-list wds-has-lines-between wds-list' })
		)
	);
	var threadIDs = el.data('threadids');
	console.log(threadIDs);
	threadIDs.forEach(function(id) {
		getThread(id, function (post) {
            console.log(post);
			dateCreated = new Date(post.creationDate.epochSecond * 1000);
			thread = $('<li />').append(
				$('<h3 />').append(
                    $('<img />', { src: post.createdBy.avatarUrl, class: 'avatar' }),
					$('<a />', { href: mw.config.get('wgScriptPath') + '/d/p/' + post.id }).text(post.title),
					' von ',
					$('<a />',{
						href: mw.util.getUrl('User:' + post.createdBy.name),
						text: post.createdBy.name
					}),
					' ',
					$('<time />', {
                        class: "timeago",
                        datetime: dateCreated.toISOString(),
						text: dateCreated.toLocaleString()
					})
				),
				$('<small />').append($('<a />', { text: 'In ' + post.forumName, href:  mw.config.get('wgScriptPath') + '/d/p/' + post.forumId })),
				$('<div />', { class: 'avatars' }).append(
                    $('<div />', { class: 'wds-avatar-stack contributors' })
                ),
				$('<div />', { class: 'related-discussions-teaser' }).text(post.rawContent)
			).appendTo($('.related-discussions-list'));
			for(var i = 0; i < Math.min(post._embedded.contributors[0].count, 5); i++) {
                var user = post._embedded.contributors[0].userInfo[i];
                $('.contributors',thread).append(
                    $('<div />', { class: 'wds-avatar' }).append(
                        user.avatarUrl ?
                            $('<a />', {
                                href: mw.util.getUrl('User:' + user.name),
                                title: user.name
                            }).append(
                                $('<img />', {
                                    src: user.avatarUrl,
                                    alt: user.name,
                                    class: 'wds-avatar__image'
                                })
                            )
                        :
                            $('<figure>',{
                                alt: '02alex05',
                                class:'wds-avatar__image'
                            }).html(userAvatarDefault)
                    )
			    );
			}
			if(post._embedded.contributors[0].count > 5) {
                $('.contributors', thread).append(
                    $('<div />', {class: 'wds-avatar-stack__overflow'}).text('+' + (post._embedded.contributors[0].count - 5))
                );
			}
			if(post.postCount) {
			    answers = $('<div />', { class: 'related-discussions-answers' }).appendTo(thread);
    			for(var i = 0; i < Math.min(post.postCount, 2); i++) {
    			    answer = post._embedded['doc:posts'];
    			    answers.append(
			        	$('<div />', { class: 'related-discussions-teaser' }).text(answer.rawContent)
    			    );
    			}
    			if(post.postCount > 2) {
    			    answers.append((post.postCount - 2) + ' weitere...');
    			}
			}
			$('time.timeago').timeago();
		});
	});
}
 
function getThread(threadId, callback) {
    $.getJSON(mw.config.get('wgScriptPath') + '/wikia.php', {
		controller: 'DiscussionThread',
		method: 'getThread',
		limit: 3,
		responseGroup: 'full',
		threadId: threadId,
	}, function(data) {
       callback(data); 
    });
}