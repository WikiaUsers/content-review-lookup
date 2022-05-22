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
					
					function undeleteSingle(ID, isThread) {
						var requestUrl = mw.util.wikiScript("wikia") + "?controller=Discussion"+(isThread ? "Thread" : "Post")+"&method=undelete&"+(isThread ? "thread" : "post")+"Id="+ID;
						return fetch(requestUrl, {
							"credentials": "include",
							"method": "POST",
						});
					}

					function loopThroughAllPosts(posts, i) {
						if (i < posts.length) {
							if (posts[i].isDeleted) {
								return undeleteSingle(posts[i].id).catch(errorMessageNotification).finally(function() {
									return loopThroughAllPosts(posts, i+1);
								});
							} else {
								return loopThroughAllPosts(posts, i+1);
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
							
							return loopThroughAllPosts(posts, 0).then(function() {
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