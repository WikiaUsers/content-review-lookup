/* Based on https://dev.fandom.com/wiki/MediaWiki:DiscussionsRailModule/UCP.js */

(function (window, $, mw) {
	$.when(mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.jqueryMsg"]), mw.hook("wikipage.content"))
	.then(function() {
		return new mw.Api().loadMessagesIfMissing(["recirculation-discussions-latest-discussions", "recirculation-discussion-link-text", "recirculation-discussions-in", "recirculation-discussion-title"]);
	})
	.then(function() {
		if (typeof window.discussEmbed === "undefined") {
			const discussEmbed = {};
			window.discussEmbed = discussEmbed;
		}

		if (!discussEmbed.isActive) {
			discussEmbed.isActive = true;

			if (!window.discussEmbedLimit) {
				window.discussEmbedLimit = 5;
			}
			
			if (!window.discussEmbedSortTrending) {
				window.discussEmbedSortTrending = 0;
			}

			/* - elements - */

			discussEmbed.el = {
				section: {
					$e: document.createElement("div"),
					header: {
						$e: document.createElement("header"),
						text: {
							$e: document.createElement("span")
						},
						link: {
							$e: document.createElement("a"),
							icon: {
								$e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
								src: {
									$e: document.createElementNS("http://www.w3.org/2000/svg", "use")
								}
							}
						}
					},
					list: {
						$e: document.createElement("ul"),
						items: []
					},
					error: {
						$e: document.createElement("div")
					}
				}
			};

			/* - section - */

			discussEmbed.el.section.$e.classList.add("mcf-card", "mcf-card-discussions");
			discussEmbed.el.section.$e.id = "discussions-activity-embed";

			$(".discussions-embed").append(discussEmbed.el.section.$e);

			/* - section : header - */

			discussEmbed.el.section.header.$e.classList.add("mcf-card-discussions__header");
			discussEmbed.el.section.$e.appendChild(discussEmbed.el.section.header.$e);

			/* - section : header : text - */

			if (window.discussEmbedSortTrending === 1) {
				discussEmbed.el.section.header.text.$e.innerHTML = mw.msg('recirculation-discussion-title');
			} else {
				discussEmbed.el.section.header.text.$e.innerHTML = mw.msg('recirculation-discussions-latest-discussions');
			}
			discussEmbed.el.section.header.$e.appendChild(discussEmbed.el.section.header.text.$e);

			/* - section : header : link - */

			discussEmbed.el.section.header.link.$e.classList.add("mcf-card-discussions__link");
			discussEmbed.el.section.header.link.$e.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f");
			discussEmbed.el.section.header.link.$e.innerHTML = mw.msg('recirculation-discussion-link-text');
			discussEmbed.el.section.header.$e.appendChild(discussEmbed.el.section.header.link.$e);

			/* - section : header : link : icon - */

			discussEmbed.el.section.header.link.icon.$e.classList.add("wds-icon", "wds-icon-small", "mcf-card-discussions__link-icon");
			discussEmbed.el.section.header.link.icon.$e.setAttributeNS(null, "viewBox", "0 0 24 24");
			discussEmbed.el.section.header.link.$e.appendChild(discussEmbed.el.section.header.link.icon.$e);

			/* - section : header : link : icon : src - */

			discussEmbed.el.section.header.link.icon.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-arrow");
			discussEmbed.el.section.header.link.icon.$e.appendChild(discussEmbed.el.section.header.link.icon.src.$e);

			/* - section : list - */

			discussEmbed.el.section.list.$e.classList.add("mcf-card-discussions__list");

			/* - Set up query - */

			var query = {};
			query.controller = "DiscussionThread";
			query.method = "getThreads";
			query.limit = window.discussEmbedLimit;
			if (window.discussEmbedForum) {
				query.forumId = window.discussEmbedForum;
			}
			if (window.discussEmbedSortTrending === 1) {
				query.sortKey = "trending";
			} else {
				query.sortKey = "creation_date";
			}

			$.ajax({
				url: mw.util.wikiScript("wikia"),
				type: "GET",
				data: query
			}).done(function (data) {
				var discussionsThreads = data._embedded.threads;

				var i = 0;

				function threadsLoop() {
					if (i < discussionsThreads.length) {
						return new Promise(
							function (resolve) {
								var imageEl;
								if (discussionsThreads[i].createdBy.avatarUrl) {
									imageEl = document.createElement("img");
								} else {
									imageEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
								}

								var item = {
									$e: document.createElement("li"),
									user: {
										$e: document.createElement("a"),
										avatar: {
											$e: document.createElement("div"),
											image: {
												$e: imageEl,
												src : {
													$e: document.createElementNS("http://www.w3.org/2000/svg", "use")
												}
											}
										},
										text: {
											$e: document.createElement("span")
										}
									},
									content: {
										$e: document.createElement("a"),
										title: {
											$e: document.createElement("div")
										},
										meta: {
											$e: document.createElement("div"),
											forum: {
												$e: document.createElement("div")
											},
											counters: {
												$e: document.createElement("div"),
												heart: {
													$e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
													src: {
														$e: document.createElementNS("http://www.w3.org/2000/svg", "use")
													}
												},
												heartText: {
													$e: document.createElement("span")
												},
												comment: {
													$e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
													src: {
														$e: document.createElementNS("http://www.w3.org/2000/svg", "use")
													}
												},
												commentText: {
													$e: document.createElement("span")
												}
											}
										}
									}
								};

								/* - item - */

								item.$e.classList.add("mcf-card-discussions__item");
								discussEmbed.el.section.list.$e.appendChild(item.$e);

								/* - item : user - */
								
								item.user.$e.classList.add("mcf-card-discussions__user-info");
								item.user.$e.href = encodeURI(mw.util.getUrl(mw.Title.makeTitle(2, discussionsThreads[i].createdBy.name).getPrefixedText()));
								item.$e.appendChild(item.user.$e);

								/* - item : user : avatar - */

								item.user.avatar.$e.classList.add("wds-avatar");
								item.user.$e.appendChild(item.user.avatar.$e);

								/* - item : user : avatar : image - */

								item.user.avatar.image.$e.classList.add("wds-avatar__image");

								if (discussionsThreads[i].createdBy.avatarUrl) {
									item.user.avatar.image.$e.src = discussionsThreads[i].createdBy.avatarUrl;
									item.user.avatar.$e.appendChild(item.user.avatar.image.$e);
								} else {
									item.user.avatar.image.$e.setAttributeNS(null, "viewBox", "0 0 24 24");
									item.user.avatar.$e.appendChild(item.user.avatar.image.$e);

									/* - item : user : avatar : image : src - */

									item.user.avatar.image.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-avatar");
									item.user.avatar.image.$e.appendChild(item.user.avatar.image.src.$e);
								}

								/* - item : user : text - */

								item.user.text.$e.classList.add("mcf-card-discussions__user-subtitle");
								item.user.text.$e.innerHTML = discussionsThreads[i].createdBy.name;
								item.user.$e.appendChild(item.user.text.$e);

								/* - item : content - */

								item.content.$e.href = encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + discussionsThreads[i].id);
								item.$e.appendChild(item.content.$e);

								/* - item : content : title - */

								item.content.title.$e.classList.add("mcf-card-discussions__content");
								item.content.title.$e.innerHTML = discussionsThreads[i].title;
								item.content.$e.appendChild(item.content.title.$e);

								/* - item : content : meta - */

								item.content.meta.$e.classList.add("mcf-card-discussions__meta");
								item.content.$e.appendChild(item.content.meta.$e);

								/* - item : content : meta : forum - */

								item.content.meta.forum.$e.classList.add("mcf-card-discussions__in");
								item.content.meta.forum.$e.innerHTML = mw.msg("recirculation-discussions-in") + " " + discussionsThreads[i].forumName;
								item.content.meta.$e.appendChild(item.content.meta.forum.$e);

								/* - item : content : meta : counters - */

								item.content.meta.counters.$e.classList.add("mcf-card-discussions__counters");
								item.content.meta.$e.appendChild(item.content.meta.counters.$e);

								/* - item : content : meta : counters : heart - */

								item.content.meta.counters.heart.$e.classList.add("wds-icon", "wds-icon-tiny");
								item.content.meta.counters.heart.$e.setAttributeNS(null, "viewBox", "0 0 24 24");
								item.content.meta.counters.$e.appendChild(item.content.meta.counters.heart.$e);

								/* - item : content : meta : counters : heart : src - */

								item.content.meta.counters.heart.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-heart");
								item.content.meta.counters.heart.$e.appendChild(item.content.meta.counters.heart.src.$e);

								/* - item : content : meta : counters : heartText - */

								item.content.meta.counters.heartText.$e.innerHTML = discussionsThreads[i].upvoteCount;
								item.content.meta.counters.$e.appendChild(item.content.meta.counters.heartText.$e);

								/* - item : content : meta : counters : comment - */

								item.content.meta.counters.comment.$e.classList.add("wds-icon", "wds-icon-tiny");
								item.content.meta.counters.comment.$e.setAttributeNS(null, "viewBox", "0 0 24 24");
								item.content.meta.counters.$e.appendChild(item.content.meta.counters.comment.$e);

								/* - item : content : meta : counters : comment : src - */

								item.content.meta.counters.comment.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-comment");
								item.content.meta.counters.comment.$e.appendChild(item.content.meta.counters.comment.src.$e);

								/* - item : content : meta : counters : commentText - */

								item.content.meta.counters.commentText.$e.innerHTML = discussionsThreads[i].postCount;
								item.content.meta.counters.$e.appendChild(item.content.meta.counters.commentText.$e);

								resolve();
							}
						).then(
							function () {
								i++;
								threadsLoop();
							}
						);
					} else {
						discussEmbed.el.section.$e.appendChild(discussEmbed.el.section.list.$e);
					}
				}
				threadsLoop();
			}).fail(function () {
				/* - section : error - */
				Object.assign(discussEmbed.el.section.error.$e.style, {
					color: "var(--theme-alert-color)"
				});

				discussEmbed.el.section.error.$e.innerHTML = "An error has occurred. Unable to get a list of messages.";

				discussEmbed.el.section.$e.appendChild(discussEmbed.el.section.error.$e);

				return;
			});
		}
	});
})(this, jQuery, mediaWiki);