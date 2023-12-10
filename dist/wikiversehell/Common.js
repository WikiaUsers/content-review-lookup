/* ajaxrename */


window.AjaxRename = {
    renameReasons: {
        'Error': 'Error',
        'Misnamed Page': 'Misnamed Page',
        'Better Name': 'Better Name',
        'Page does not belong in mainspace': 'Page does not belong in mainspace',
        'Move request on talk page': 'Move request on talk page',
    }
};


/* UserTags */


window.UserTagsJS = {
	
	modules: {},
	tags: {
		officialwikicoder: { u:'Official Wiki Coder' },
		codinghelp: { u:'Code Helper' },
		bureaucrat: { u:'Bureaucrat' }, 
		sysop: { u:'Administrator' },
		threadmoderator: { u:'Thread Mod' },
		'content-moderator': { u:'Content Mod' },
		adminapprentice: { u:'Admin Apprentice' },
		maptest: { u:'Map Tester' },
		newuser: { u:'Just Joined!' },
	} 
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'content-moderator', 'threadmoderator'];
UserTagsJS.modules.custom = {
	'.uni.universal.': ['officialwikicoder', 'codinghelp'],
	'Rosellia Teh Hybrid': ['maptest'],
};


/* Msg block */


window.MessageBlock = {
	title: 'Blocked',
	message: 'Hello! You have been blocked for a duration of $2 for the following reasons: $1. If you are blocked indefinitely but believe you can improve/have improved on your behavior, feel free to reply to this message with a properly made ban appeal: the admin who blocked you will have followed this message, so they will be notified. If you were blocked for a certain amount of time, feel free to either wait it out and think on your behavior, or reply with an appeal as well.'
};


/* discussions feed */


/**
 * Embed a list of recent Discussions posts from a specific category onto a wiki page
 * By [[User:Himmalerin]]
 * https://wingsoffirefanon.fandom.com/wiki/MediaWiki:Gadget-Discussions-Feed.js
*/
 
 
mw.loader.using(["mediawiki.util"]).then(function () {
	const newsEmbedPlaceholder = document.querySelector("#discussionsFeed");
	if (!newsEmbedPlaceholder) return;

	importArticle({ type: "script", article: "u:dev:MediaWiki:Dorui.js" });

	const buildEmbedItem = function (ui, data) {
		const author = ui.a({
			class: "discussions-post__author",
			href: "/wiki/User:" + encodeURI(data.authorName),
			children: [
				ui.div({
					class: "wds-avatar",
					child: ui.img({
						class: "wds-avatar__image",
						src: data.authorAvatar + "/zoom-crop/width/26/height/26",
					}),
				}),
				ui.span({
					class: "discussions-post__author-name",
					text: data.authorName,
				}),
			],
		});

		const postMeta = ui.div({
			class: "discussions-post__meta",
			children: [
				ui.div({
					class: "discussions-post__category",
					text: "in ",
					child: ui.a({
						class: "discussions-post__category-name",
						href: "/f?catId=" + data.categoryId,
						text: data.categoryName,
					}),
				}),
				ui.div({
					class: "discussions-post__counters",
					children: [
						ui.div({
							class: "discussions-post__upvotes",
							child: ui.svg({
								classes: ["wds-icon", "wds-icon-tiny"],
								child: ui.use({ href: "#wds-icons-heart" }),
							}),
							text: data.postUpvoteCount,
						}),
						ui.div({
							class: "discussions-post__replies",
							child: ui.svg({
								classes: ["wds-icon", "wds-icon-tiny"],
								child: ui.use({ href: "#wds-icons-comment" }),
							}),
							text: data.postReplyCount,
						}),
					],
				}),
			],
		});

		const post = ui.div({
			class: "discussions-post__content",
			children: [
				ui.a({
					class: "discussions-post__title",
					href: "/f/p/" + data.postId,
					text: data.postTitle,
				}),
				postMeta,
			],
		});

		return ui.li({
			class: "discussions-post",
			children: [author, post],
		});
	};

	const init = function (ui) {
		const categoryId = newsEmbedPlaceholder.dataset.categoryId;
		const postLimit = newsEmbedPlaceholder.dataset.postLimit;

		const url = new URL("/wikia.php", mw.config.get("wgServer"));
		url.searchParams.append("controller", "DiscussionThread");
		url.searchParams.append("method", "getThreads");
		url.searchParams.append("forumId", categoryId);
		url.searchParams.append("limit", postLimit);
		url.searchParams.append("sortKey", "creation_date");

		fetch(url)
			.then(function (body) {
				return body.json();
			})
			.then(function (data) {
				return data._embedded.threads.map(function (thread) {
					return {
						categoryName: thread.forumName,
						categoryId: thread.forumId,
						postId: thread.id,
						postTitle: thread.title,
						// post author data
						authorAvatar: thread.createdBy.avatarUrl,
						authorName: thread.createdBy.name,
						// post metadata
						postReplyCount: thread.postCount,
						postUpvoteCount: thread.upvoteCount,
					};
				});
			})
			.then(function (threads) {
				const embedItems = threads.map(function (thread) {
					return buildEmbedItem(ui, thread);
				});

				newsEmbedPlaceholder.replaceWith(
					ui.ul({
						class: "discussions-post-list",
						children: embedItems,
					})
				);
			});
	};

	mw.hook("doru.ui").add(function (ui) {
		init(ui);
	});
});