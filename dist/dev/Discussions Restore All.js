;(function($, mw) {
	"use strict";
	if (mw.config.get("wgCanonicalSpecialPageName") != "Contributions") return;

	var username = mw.config.get("wgRelevantUserName");
	if (username === null) {
		// Do nothing if only on Special:Contributions and not a subpage
		return;
	}
	mw.hook( 'dev.wds' ).add( function( wds ) {
		mw.loader.using(["mediawiki.user", "mediawiki.util"]).then(function() {
			if (!mw.user.getRights) { return $.Deferred().rejectWith(this, arguments).promise(); } // Disable for non-updated MediaWiki to avoid throwing errors
			return mw.user.getRights();
		}).then(function(rights) {
			if (rights.indexOf("threads:delete") !== -1) {
				//Only do anything if the user has undeletion rights and is on the contributions page

				var api = new mw.Api();
				var optionalNotificationsSystemPromise = mw.loader.using("mw.notify");

				function errorMessageNotification(errorMessage) {
					mw.log.error(errorMessage);
					optionalNotificationsSystemPromise.then(function() {
						mw.notify(errorMessage, { type: "error" });
					});
				}

				api.get({
					action: "query",
					format: "json",
					list: "users",
					ususers: username
				}).then(function(data) {
					var userID = data.query.users[0].userid;
					var LIMIT = 100;

					function undeleteForum(ID) {
						var requestUrl = mw.util.wikiScript("wikia") +
							"?controller=DiscussionPost&method=undelete&postId=" + ID;
						return fetch(requestUrl, {
							"credentials": "include",
							"method": "POST",
						});
					}

					function undeleteWall(post, wallOwners) {
						var wallOwnerId;
						for (var owner in wallOwners){
							if (wallOwners[owner].wallContainerId == post.forumId) {
								wallOwnerId = wallOwners[owner].userId
							}
						}
						if (!wallOwnerId) {
							// I don't really know what to do in this situation
							return Promise.resolve()
						}

						return $.ajax({
							method: "POST",
							url: mw.util.wikiScript("wikia") + "?" + $.param({
								controller: "Fandom\\MessageWall\\MessageWall",
								method: "undeleteReply",
								format: "json",
							}),
							data: $.extend(false, {
								token: mw.user.tokens.get("csrfToken"),
								wallOwnerId: wallOwnerId,
								postId: post.id
							}),
						});
					}

					function undeleteComment(post) {
						return $.ajax({
							method: "POST",
							url: mw.util.wikiScript("wikia") + "?" + $.param({
								controller: "Fandom\\ArticleComments\\Api\\ArticleComments",
								method: "undeletePost",
								format: "json",
							}),
							data: $.extend(false, {
								token: mw.user.tokens.get("csrfToken"),
								postId: post.id
							}),
						});
					}

					function undeleteSingle(post, wallOwners) {
						var containerType = post._embedded.thread[0].containerType;

						if (containerType == "FORUM") {
							return undeleteForum(post.id)
						} else if (containerType == "WALL") {
							return undeleteWall(post, wallOwners)
						} else if (containerType == "ARTICLE_COMMENT") {
							return undeleteComment(post)
						} else {
							return Promise.resolve()
						}
					}

					function loopThroughAllPosts(posts, wallOwners, i) {
						if (i < posts.length) {
							if (posts[i].isDeleted) {
								return undeleteSingle(posts[i], wallOwners).catch(errorMessageNotification).then(function() {
									return loopThroughAllPosts(posts, wallOwners, i+1);
								});
							} else {
								return loopThroughAllPosts(posts, wallOwners, i+1);
							}
						} else {
							return Promise.resolve();
						}
					}

					function _undeleteAll(page) {
						return $.ajax(mw.util.wikiScript("wikia") + "?controller=DiscussionContribution&method=getPosts&userId="+userID+"&responseGroup=full&viewableOnly=false&limit="+LIMIT+"&page="+page, {
							async: true,
							method: "GET",
							xhrFields: {
								withCredentials: true
							}
						}).then(function(resp) {
							var posts = resp._embedded["doc:posts"];
							var wallOwners = resp._embedded.wallOwners;

							return loopThroughAllPosts(posts, wallOwners, 0).then(function() {
								if (posts.length === LIMIT) {
									return _undeleteAll(page+1);
								}
							});
						});
					}

					function undeleteAll() {
						return _undeleteAll(0);
					}

					// var restorationButton = new OO.ui.ButtonWidget( {
					// 	label: "Restore all posts",
					// 	active: true
					// } );
					var restorationButton = $('<button class="wds-button">');
						restorationButton.append(wds.icon( 'trash-open-small' ));
						restorationButton.append('<span>Restore all posts</span>');

					$( ".mw-contributions-user-tools" ).append( $( document.createElement("div") ).append( restorationButton ) );

					restorationButton.on("click", function() {
						restorationButton.prop("disabled", true);
						optionalNotificationsSystemPromise.then(function() {
							mw.notify("Restoration in progress...", { type: "info" });
						});
						return undeleteAll()
							.then(function() {
								optionalNotificationsSystemPromise.then(function() {
									mw.notify("All posts restored.", { type: "success" });
								});
							})
							.catch(errorMessageNotification)
							.always(function() {
							restorationButton.prop("disabled", false);
						});
					});
				}).catch(errorMessageNotification);
			}
		});
	});
	importArticle( {
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WDSIcons/code.js'
		]
	} );
})(window.jQuery, window.mediaWiki);