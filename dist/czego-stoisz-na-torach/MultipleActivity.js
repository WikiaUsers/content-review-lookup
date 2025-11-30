var nkch = typeof window.nkch != "undefined" ? window.nkch : new Object();
window.nkch = nkch;

nkch.ma = typeof nkch.ma != "undefined" ? nkch.ma : new Object();

if (!nkch.ma.isActive) {
	nkch.ma.isActive = true;
	nkch.ma.details = {
		title: "MultipleActivity",
		titleShort: "MA",
		author: "Не кочан"
	}

	var arrayLength = 100;

	if (mw.config.get("wgNamespaceNumber") === -1 && (
			mw.config.get("wgTitle").toLowerCase() === nkch.ma.details.title.toLowerCase() ||
			mw.config.get("wgTitle").toLowerCase() === nkch.ma.details.titleShort.toLowerCase()
		)) {
		mw.loader.using(
			["mediawiki.api", "mediawiki.util"],

			function () {
				nkch.ma.options = {
					experimentalFeatures: 0
				}

				var urlParamsString = new URL(window.location.href).search;
				var urlParams = new URLSearchParams(urlParamsString);

				if (urlParams.has("experimentalFeatures")) {
					var param = JSON.parse(urlParams.get("experimentalFeatures"));

					if (
						param === 1 ||
						param === true
					) {
						nkch.ma.options.experimentalFeatures = 1;
					}
				}

				if (nkch.ma.options.experimentalFeatures === 1) arrayLength = 200;

				/* ~ Special:MA and other cases → Special:MultipleActivity ~ */
				if (mw.config.get("wgTitle") !== nkch.ma.details.title) {
					var urlPath = window.location.pathname.split("/");
					var newUrlTitle = new mw.Title(nkch.ma.details.title, -1).toString();

					var replaceUrlPath = urlPath[1] === "wiki" ? "/wiki/" + newUrlTitle + urlParamsString : "/" + urlPath[1] + "/wiki/" + newUrlTitle + urlParamsString;

					history.replaceState(null, null, encodeURI(replaceUrlPath));
				}

				mw.util.addCSS(
					".nkch-ma__content { min-height: 500px; }" +
					".nkch-ma__content.is-loading { animation: anim-ma__loading 2s ease infinite; background-color: var(--theme-page-background-color--secondary); border-radius: 3px; }" +
					".nkch-ma__content .wds-list { list-style-type: none; margin: 0; }" +
					".nkch-ma__content .wds-list > li > a { display: flex; align-items: center; gap: 9px; }"
				);

				return new mw.Api().loadMessagesIfMissing(
					["fandom-pagetitle", "rail-popular-pages-header"]
				).then(
					function () {
						mw.hook("dev.i18n").add(
							function (i18n) {
								i18n.loadMessages(nkch.ma.details.title).done(
									function (i18n) {
										mw.hook("dev.wds").add(
											function (wds) {
												const api = new mw.Api();

												switch (mw.config.get("skin")) {
													case "fandomdesktop":
														nkch.ma.details.mode = "desktop";
														return nkch.ma.actions.initDesktop(api, i18n, wds);
													case "fandommobile":
														nkch.ma.details.mode = "mobile";
														return nkch.ma.actions.initMobile(api, i18n, wds);
												}
											}
										);
									}
								)
							}
						);
					}
				);
			},

			function () {
				throw new Error("Cannot load the dependencies.");
			}
		);
	}

	nkch.ma.actions = new Object();

	nkch.ma.actions.initDesktop = function (api, i18n, wds) {
		document.title = mw.message("fandom-pagetitle", nkch.ma.details.title).text();
		document.querySelector("#firstHeading").innerHTML = nkch.ma.details.title;

		document.querySelector(".page").classList.add("has-right-rail", "nkch-ma");

		mw.loader.load(mw.util.wikiScript("load") + "?modules=" + "skin.fandomdesktop.rail.css" + "|" + "skin.fandomdesktop.rail.popularPages.css" + "&only=styles", "text/css");
		mw.loader.using(
			["skin.fandomdesktop.rail.toggle.js"],

			function () {
				mw.util.addCSS(
					"section.nkch-ma__right-rail-module { background: none; }" +
					"section.nkch-ma__right-rail-module--popular-pages { margin-top: 34px; }" +
					".nkch-ma__right-rail-module--wiki-details { overflow: visible; }" +
					".nkch-ma__right-rail-module--wiki-details .nkch-ma__right-rail-module-content { position: relative; }" +
					".nkch-ma__right-rail-module-wiki-name { align-items: center; display: flex; font-size: 20px; font-weight: bold; justify-content: center; text-align: center; }" +
					".nkch-ma__right-rail-module-wiki-stats { display: flex; justify-content: space-around; margin: 12px auto; width: 100%; }" +
					".nkch-ma__right-rail-module-wiki-stat { text-align: center; }" +
					".nkch-ma__right-rail-module-wiki-stat-value { font-size: 16px; font-weight: 700; letter-spacing: .5px; }" +
					".nkch-ma__right-rail-module-wiki-stat-text { font-size: 10px; font-weight: 500; letter-spacing: .5px; line-height: 1.2; opacity: .85; text-transform: uppercase; }" +
					".nkch-ma__right-rail-module-avatars { left: 50%;  margin: 0; position: absolute; transform: translate(-50%, 10px); }" +
					".nkch-ma__right-rail-module--community-corner .nkch-ma__right-rail-module-content { font-size: 14px; }" +

					"@keyframes anim-ma__loading { 0% { opacity: 1; } 50% { opacity: .4; } 100% { opacity: 1; } }"
				);

				const ma__main = document.querySelector(".page__main")
				ma__main.classList.add("nkch-ma__main");

				const ma__rail = document.createElement("aside");
				ma__rail.classList.add("nkch-ma__right-rail", "page__right-rail");

				ma__main.after(ma__rail);

				const ma__content = document.querySelector("#content");
				ma__content.classList.add("nkch-ma__content", "is-loading");
				ma__content.innerHTML = "";

				const ma__list = document.createElement("ul");
				ma__list.classList.add("nkch-ma__list");

				ma__content.append(ma__list);

				if (!mw.user.isAnon()) {
					if (mw.user.options.get("rightrailvisible") === "hidden") ma__rail.classList.add("is-rail-hidden");

					const ma__rail_toggle = document.createElement("button");
					ma__rail_toggle.classList.add("nkch-ma__right-rail-toggle", "right-rail-toggle");

					ma__rail_toggle.setAttribute("data-wds-tooltip", mw.user.options.get("rightrailvisible") === "hidden" ? mw.message("show").text() : mw.message("hide").text());
					ma__rail_toggle.setAttribute("data-wds-tooltip-position", "bottom");

					ma__rail.append(ma__rail_toggle);

					$(ma__rail_toggle).append($("<svg class='wds-icon wds-icon-tiny'><use xlink:href='#wds-icons-menu-control-tiny'></use></svg>"));
				}

				const ma__rail_wrapper = document.createElement("div");
				ma__rail_wrapper.classList.add("nkch-ma__right-rail-wrapper", "right-rail-wrapper");
				ma__rail.append(ma__rail_wrapper);

				nkch.ma.actions.getWikiDetails().then(
					function (data_details) {
						const ma__rail_module_wiki_details = document.createElement("section");
						ma__rail_module_wiki_details.classList.add("nkch-ma__right-rail-module", "nkch-ma__right-rail-module--wiki-details", "rail-module");

						const module_wiki_details__content = document.createElement("div");
						module_wiki_details__content.classList.add("nkch-ma__right-rail-module-content");

						ma__rail_module_wiki_details.append(module_wiki_details__content);

						const module_wiki_details__title = document.createElement("div");
						module_wiki_details__title.classList.add("nkch-ma__right-rail-module-wiki-name");
						module_wiki_details__title.innerText = data_details.wikiVariables.name;

						module_wiki_details__content.append(module_wiki_details__title);

						const module_wiki_details__stats = document.createElement("div");
						module_wiki_details__stats.classList.add("nkch-ma__right-rail-module-wiki-stats");

						module_wiki_details__content.append(module_wiki_details__stats);

						const module_wiki_details__stat_edits = document.createElement("div");
						module_wiki_details__stat_edits.classList.add("nkch-ma__right-rail-module-wiki-stat", "nkch-ma__right-rail-module-wiki-stat--edits");

						module_wiki_details__stats.append(module_wiki_details__stat_edits);

						const module_wiki_details__stat_edits_value = document.createElement("div");
						module_wiki_details__stat_edits_value.classList.add("nkch-ma__right-rail-module-wiki-stat-value");

						module_wiki_details__stat_edits_value.innerText = Number(data_details.wikiDetails.editCount).toLocaleString();

						module_wiki_details__stat_edits.append(module_wiki_details__stat_edits_value);

						const module_wiki_details__stat_edits_text = document.createElement("div");
						module_wiki_details__stat_edits_text.classList.add("nkch-ma__right-rail-module-wiki-stat-text");

						module_wiki_details__stat_edits_text.innerText = i18n.msg("ma-v2-edits").plain();

						module_wiki_details__stat_edits.append(module_wiki_details__stat_edits_text);

						const module_wiki_details__stat_pages = document.createElement("div");
						module_wiki_details__stat_pages.classList.add("nkch-ma__right-rail-module-wiki-stat", "nkch-ma__right-rail-module-wiki-stat--pages");

						module_wiki_details__stats.append(module_wiki_details__stat_pages);

						const module_wiki_details__stat_pages_value = document.createElement("div");
						module_wiki_details__stat_pages_value.classList.add("nkch-ma__right-rail-module-wiki-stat-value");

						module_wiki_details__stat_pages_value.innerText = Number(data_details.wikiDetails.pageCount).toLocaleString();

						module_wiki_details__stat_pages.append(module_wiki_details__stat_pages_value);

						const module_wiki_details__stat_pages_text = document.createElement("div");
						module_wiki_details__stat_pages_text.classList.add("nkch-ma__right-rail-module-wiki-stat-text");

						module_wiki_details__stat_pages_text.innerText = i18n.msg("ma-v2-pages").plain();

						module_wiki_details__stat_pages.append(module_wiki_details__stat_pages_text);

						const module_wiki_details__users = document.createElement("div");
						module_wiki_details__users.classList.add("nkch-ma__right-rail-module-avatars", "wds-avatar-stack");

						for (var i in data_details.wikiDetails.topUsers) {
							var module_wiki_details__avatar = document.createElement("div");
							module_wiki_details__avatar.classList.add("nkch-ma__right-rail-module-avatar", "wds-avatar");

							var module_wiki_details__avatar_link = document.createElement("a");
							module_wiki_details__avatar_link.href = mw.util.getUrl(new mw.Title(data_details.wikiDetails.topUsers[i].name, 2).getPrefixedText());
							module_wiki_details__avatar_link.title = data_details.wikiDetails.topUsers[i].name;

							module_wiki_details__avatar.append(module_wiki_details__avatar_link);

							var module_wiki_details__avatar_img = document.createElement("img");
							module_wiki_details__avatar_img.classList.add("wds-avatar__image");

							if (data_details.wikiDetails.topUsers[i].avatarUrl !== "") {
								module_wiki_details__avatar_img.src = data_details.wikiDetails.topUsers[i].avatarUrl + "/scale-to-width/48";
							} else {
								module_wiki_details__avatar_img.src = "https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/scale-to-width/48"
							}

							module_wiki_details__avatar_link.append(module_wiki_details__avatar_img);

							module_wiki_details__users.append(module_wiki_details__avatar);
						}

						module_wiki_details__content.append(module_wiki_details__users);

						ma__rail_wrapper.prepend(ma__rail_module_wiki_details);


						const ma__rail_module_popular_pages = document.createElement("section");
						ma__rail_module_popular_pages.classList.add("nkch-ma__right-rail-module", "nkch-ma__right-rail-module--popular-pages", "rail-module");

						if (data_details.topArticles.length > 5) data_details.topArticles.length = 5;

						const module_popular_pages__header = document.createElement("h2");
						module_popular_pages__header.classList.add("rail-module__header", "nkch-ma__right-rail-module-header");
						module_popular_pages__header.innerText = mw.message("rail-popular-pages-header").text();

						ma__rail_module_popular_pages.append(module_popular_pages__header);

						const module_popular_pages__content = document.createElement("div");
						module_popular_pages__content.classList.add("nkch-ma__right-rail-module-content");

						ma__rail_module_popular_pages.append(module_popular_pages__content);

						const module_popular_pages__list = document.createElement("ul");
						module_popular_pages__list.classList.add("rail-module__list", "thumbnails");

						for (var i in data_details.topArticles) {
							var module_popular_pages__item = document.createElement("li");
							module_popular_pages__item.classList.add("popular-pages__item");

							module_popular_pages__list.append(module_popular_pages__item);

							var module_popular_pages__item_link = document.createElement("a");
							module_popular_pages__item_link.title = data_details.topArticles[i].title;
							module_popular_pages__item_link.href = data_details.topArticles[i].url;

							module_popular_pages__item.append(module_popular_pages__item_link);

							var module_popular_pages__item_thumb = document.createElement("img");
							module_popular_pages__item_thumb.classList.add("popular-pages__image");
							module_popular_pages__item_thumb.src = data_details.topArticles[i].image.replace(/(?<=\/smart\/)(.*)(?=\?)/, "width/50/height/50");

							module_popular_pages__item_link.append(module_popular_pages__item_thumb);

							var module_popular_pages__item_text = document.createElement("span");
							module_popular_pages__item_text.innerText = data_details.topArticles[i].title

							module_popular_pages__item_link.append(module_popular_pages__item_text);
						}

						module_popular_pages__content.append(module_popular_pages__list);

						ma__rail_module_wiki_details.after(ma__rail_module_popular_pages);
					}
				);

				nkch.ma.actions.getCommunityCorner(api).then(
					function (data_corner) {
						const ma__rail_sticky_module_community_corner = document.createElement("section");
						ma__rail_sticky_module_community_corner.classList.add("nkch-ma__right-rail-module", "nkch-ma__right-rail-module--community-corner", "rail-module");

						const module_community_corner__header = document.createElement("h2");
						module_community_corner__header.classList.add("rail-module__header", "nkch-ma__right-rail-module-header");
						module_community_corner__header.innerText = i18n.msg("ma-v2-community-corner").plain();

						ma__rail_sticky_module_community_corner.append(module_community_corner__header);

						const module_community_corner__content = document.createElement("div");
						module_community_corner__content.classList.add("nkch-ma__right-rail-module-content", "page-content");

						module_community_corner__content.innerHTML = data_corner;

						ma__rail_sticky_module_community_corner.append(module_community_corner__content);

						const ma__rail_sticky_modules = document.createElement("div");
						ma__rail_sticky_modules.classList.add("nkch-ma__right-rail-sticky-modules", "sticky-modules-wrapper");
						ma__rail_wrapper.append(ma__rail_sticky_modules);

						ma__rail_sticky_modules.append(ma__rail_sticky_module_community_corner);
					}
				)

				nkch.ma.actions.init(api, i18n, wds, ma__content, ma__list);
			}
		);
	}

	nkch.ma.actions.initMobile = function (api, i18n, wds) {
		mw.util.addCSS(
			".nkch-ma__content { margin-inline: var(--mw-content-text-side-padding); }"
		);

		document.title = mw.message("fandom-pagetitle", nkch.ma.details.title).text();
		document.querySelector(".wiki-page-header__title").innerHTML = nkch.ma.details.title;

		const articleContent = document.querySelector(".article-content");
		articleContent.classList.add("nkch-ma");
		articleContent.innerHTML = "";

		const ma__content = document.createElement("div");
		ma__content.classList.add("nkch-ma__content", "is-loading");

		articleContent.append(ma__content);

		const ma__list = document.createElement("ul");
		ma__list.classList.add("nkch-ma__list");

		ma__content.append(ma__list);

		nkch.ma.actions.init(api, i18n, wds, ma__content, ma__list);
	}

	nkch.ma.actions.init = function (api, i18n, wds, ma__content, ma__list) {
		Promise.all([nkch.ma.actions.getRecentChanges(), nkch.ma.actions.getDiscussionsPosts(), nkch.ma.actions.getLogs()])
			.then(
				function (data) {

					mw.util.addCSS(
						"ul.nkch-ma__list { display: flex; flex-direction: column; gap: 10px; list-style: none; margin: 0; }" +
						".nkch-ma-entry { background-color: var(--theme-page-text-mix-color-95); border: 1px solid var(--theme-border-color); border-radius: 3px; display: flex; min-height: 50px; width: 100%; }" +
						".nkch-ma-entry__aside { padding: 10px; max-height: 100%; width: 50px; }" +
						".nkch-ma-entry__main { flex: 1; padding-block: 10px; padding-inline-end: 10px; }" +
						".nkch-ma-entry__icon { align-items: center; background: black; border-radius: 50%; color: white; display: flex; height: 30px; justify-content: center; width: 30px; }" +
						".nkch-ma-entry__icon .wds-icon { height: 14px; }" +
						".nkch-ma-entry__header { display: flex; }" +
						".nkch-ma-entry__title { flex: 1; }" +
						".nkch-ma-entry__heading { align-items: center; display: flex; font-size: 18px; font-weight: bold; line-height: 30px; }" +
						".nkch-ma-entry__actions { display: flex; gap: 10px; justify-content: center; }" +
						".nkch-ma-entry__action { align-items: center; display: flex; height: 30px; justify-content: center; width: 30px; }" +
						".nkch-ma-entry__action .wds-dropdown__toggle { align-items: center; display: flex; height: 100%; justify-content: center; width: 100%; }" +
						".nkch-ma-entry__size, .nkch-ma-entry__time { cursor: help; }" +
						".nkch-ma-entry__details { border-top: 1px solid var(--theme-border-color); margin-top: 10px; padding-top: 10px; }" +

						"ul.nkch-ma-entry-poll { display: flex; flex-direction: column; gap: 5px; list-style: none; margin: 0; }" +
						".nkch-ma-entry-poll__answer { align-items: center; background-color: var(--theme-page-background-color); border: 1px solid var(--theme-border-color); border-radius: 3px; display: flex; justify-content: space-between; height: 36px; overflow: hidden; position: relative; }" +
						".nkch-ma-entry-poll__bar { background: var(--theme-link-color); height: 100%; position: absolute; transition: 1s; }" +
						".nkch-ma-entry-poll__text, .nkch-ma-entry-poll__votes { background-color: rgba(var(--theme-page-background-color--rgb), .5); border-radius: 3px; display: inline-block; font-size: 14px; line-height: 14px; margin: 5px; padding: 5px 10px; position: relative; }" +

						".nkch-ma-entry-post-images { display: flex; flex-wrap: wrap; gap: 10px; }" +
						".nkch-ma-entry-post-images__image { align-items: center; border-radius: 3px; display: flex; justify-content: center; overflow: hidden; }" +
						".nkch-ma-entry-post-images__image:hover, .nkch-ma-entry-post-images__image:active, .nkch-ma-entry-post-images__image:focus { text-decoration: none; }" +
						".nkch-ma-entry-post-images__src { max-height: 100px; max-width: 130px; }" +
						".nkch-ma-entry-post-images__more { background-size: cover; height: 100px; width: 130px; }" +
						".nkch-ma-entry-post-images__indicator { align-items: center; background-color: #1115; backdrop-filter: blur(10px); color: white; display: flex; font-size: 20px; font-weight: bold; justify-content: center; height: 100%; width: 100%; }" +

						".nkch-ma-entry__size--add { color: var(--theme-success-color); }" +
						".nkch-ma-entry__size--remove { color: var(--theme-alert-color); }" +
						".nkch-ma-entry__size--no-change { color: gray; }" +

						".nkch-ma-entry__icon--edit { background-color: #0094FF; }" +
						".nkch-ma-entry__icon--new { background-color: limegreen; }" +
						".nkch-ma-entry__icon--delete { background-color: red; }" +
						".nkch-ma-entry__icon--restore { background-color: green; }" +
						".nkch-ma-entry__icon--protect { background-color: #313131; }" +
						".nkch-ma-entry__icon--unprotect { background-color: #313131; }" +
						".nkch-ma-entry__icon--move { background-color: blue; }" +
						".nkch-ma-entry__icon--block { background-color: darkorange; }" +
						".nkch-ma-entry__icon--unblock { background-color: darkcyan; }" +
						".nkch-ma-entry__icon--reblock { background-color: #b34607; }" +
						".nkch-ma-entry__icon--rights { background-color: darkkhaki; }" +
						".nkch-ma-entry__icon--import { background-color: #b151a5; }" +

						".nkch-ma-entry__icon--discussions, .nkch-ma-entry__icon--message-wall, .nkch-ma-entry__icon--article-comment, .nkch-ma-entry__icon--poll, .nkch-ma-entry__icon--quiz { background-color: purple; }"
					);

					const entries = {
						changes: data[0],
						posts: data[1],
						logs: data[2]
					}

					var multipleArray = entries.changes.concat(entries.posts);

					multipleArray.sort(
						function (a, b) {
							if (a.timestamp > b.timestamp) {
								return -1;
							}

							if (a.timestamp < b.timestamp) {
								return 1;
							}
						}
					);

					if (multipleArray.length > arrayLength) multipleArray.length = arrayLength;

					var loopIndex = 0;

					function theLoop() {
						if (loopIndex < multipleArray.length) {
							return new Promise(
								function (resolve) {
									var ma__list_item = document.createElement("li");
									ma__list_item.classList.add("nkch-ma-entry", "nkch-ma-entry--" + (Number(loopIndex) + 1));

									if (multipleArray[loopIndex].rel) ma__list_item.classList.add("nkch-ma-entry--" + multipleArray[loopIndex].rel);

									ma__list.append(ma__list_item);

									var ma__list_item__aside = document.createElement("div");
									ma__list_item__aside.classList.add("nkch-ma-entry__aside");

									ma__list_item.append(ma__list_item__aside);

									var ma__list_item__icon = document.createElement("div");
									ma__list_item__icon.classList.add("nkch-ma-entry__icon");

									ma__list_item__aside.append(ma__list_item__icon);


									var ma__list_item__main = document.createElement("div");
									ma__list_item__main.classList.add("nkch-ma-entry__main");

									ma__list_item.append(ma__list_item__main);

									var ma__list_item__header = document.createElement("div");
									ma__list_item__header.classList.add("nkch-ma-entry__header");

									ma__list_item__main.append(ma__list_item__header);

									var ma__list_item__title = document.createElement("div");
									ma__list_item__title.classList.add("nkch-ma-entry__title");

									ma__list_item__header.append(ma__list_item__title);

									var ma__list_item__heading = document.createElement("div");
									ma__list_item__heading.classList.add("nkch-ma-entry__heading");

									ma__list_item__title.append(ma__list_item__heading);

									var ma__list_item__heading_link = document.createElement("a");
									ma__list_item__heading_link.classList.add("nkch-ma-entry__heading-link");

									ma__list_item__heading.append(ma__list_item__heading_link);

									var ma__list_item__subtitle = document.createElement("div");
									ma__list_item__subtitle.classList.add("nkch-ma-entry__subtitle");

									ma__list_item__main.append(ma__list_item__subtitle);

									var ma__list_item__date_and_size = document.createElement("div");
									ma__list_item__date_and_size.classList.add("nkch-ma-entry__date-and-size");

									ma__list_item__main.append(ma__list_item__date_and_size);

									var ma__list_item__time = document.createElement("time");
									ma__list_item__time.classList.add("nkch-ma-entry__time");

									var date = new Date(multipleArray[loopIndex].timestamp * 1000);

									ma__list_item__time.setAttribute("datetime", date.getFullYear() + "-" + ((date.getMonth() + 1).toString().length < 2 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes());
									ma__list_item__time.innerText = nkch.ma.actions.getTimeAgo(i18n, date);

									ma__list_item__time.setAttribute("data-wds-tooltip", date.toLocaleString(mw.config.get("wgContentLanguage"), {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										second: "numeric"
									}));
									ma__list_item__time.setAttribute("data-wds-tooltip-position", "bottom");

									ma__list_item__date_and_size.append(ma__list_item__time);

									var ma__list_item__details = document.createElement("div");
									ma__list_item__details.classList.add("nkch-ma-entry__details");

									var ma__list_item__actions = document.createElement("div");
									ma__list_item__actions.classList.add("nkch-ma-entry__actions");

									ma__list_item__header.append(ma__list_item__actions);

									var ma__list_item__actions_dropdown = document.createElement("div");
									ma__list_item__actions_dropdown.classList.add("nkch-ma-entry__action", "nkch-ma-entry__actions--dropdown", "wds-dropdown");

									var ma__list_item__actions_dropdown_toggle = document.createElement("div");
									ma__list_item__actions_dropdown_toggle.classList.add("wds-dropdown__toggle");

									$(ma__list_item__actions_dropdown_toggle).append(wds.icon("more-small"));

									ma__list_item__actions_dropdown.append(ma__list_item__actions_dropdown_toggle);

									var ma__list_item__actions_dropdown_content = document.createElement("div");
									ma__list_item__actions_dropdown_content.classList.add("wds-dropdown__content", "wds-is-not-scrollable", "wds-is-right-aligned");

									ma__list_item__actions_dropdown.append(ma__list_item__actions_dropdown_content);

									var ma__list_item__actions_dropdown_list = document.createElement("ul");
									ma__list_item__actions_dropdown_list.classList.add("wds-list", "wds-is-linked");

									ma__list_item__actions_dropdown_content.append(ma__list_item__actions_dropdown_list);

									if (ma__content.classList.contains("is-loading")) ma__content.classList.remove("is-loading");

									switch (multipleArray[loopIndex].rel) {
										case "change":
											ma__list_item__heading_link.innerText = multipleArray[loopIndex].title;
											ma__list_item__heading_link.href = mw.util.getUrl(new mw.Title(multipleArray[loopIndex].title).getPrefixedText());

											var ma__list_item__size = document.createElement("span");
											ma__list_item__size.classList.add("nkch-ma-entry__size");

											ma__list_item__size.setAttribute("data-wds-tooltip", i18n.msg("ma-v2-before").escape() + ": <b>" + multipleArray[loopIndex].oldlen.toLocaleString() + "</b>; " + i18n.msg("ma-v2-after").escape() + ": <b>" + multipleArray[loopIndex].newlen.toLocaleString()) + "</b>";
											ma__list_item__size.setAttribute("data-wds-tooltip-position", "bottom");

											var sizeNumber = multipleArray[loopIndex].newlen - multipleArray[loopIndex].oldlen;

											if (sizeNumber < 0) {
												ma__list_item__size.classList.add("nkch-ma-entry__size--remove");
											} else if (sizeNumber > 0) {
												ma__list_item__size.classList.add("nkch-ma-entry__size--add");
											} else {
												ma__list_item__size.classList.add("nkch-ma-entry__size--no-change");
											}

											if (sizeNumber > 0) {
												sizeNumber = "+" + sizeNumber.toLocaleString();
											}

											ma__list_item__size.innerText = sizeNumber.toLocaleString();

											var ma__list_item__date_and_size__separator = document.createElement("span");
											ma__list_item__date_and_size__separator.innerText = " • ";

											switch (multipleArray[loopIndex].type) {
												case "edit":
													ma__list_item.classList.add("nkch-ma-entry--edit");

													/* ~ icon ~ */
													ma__list_item__icon.classList.add("nkch-ma-entry__icon--edit");
													$(ma__list_item__icon).append(wds.icon("pencil-small"));

													/* ~ subtitle ~ */
													var authorLink = !mw.util.isIPAddress(multipleArray[loopIndex].user) ? new mw.Title(multipleArray[loopIndex].user, 2).getPrefixedText() : new mw.Title("Contributions/" + multipleArray[loopIndex].user, -1).getPrefixedText();

													ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-edit", "[[" + authorLink + "|" + multipleArray[loopIndex].user + "]]").parse() + " (<a href='" + mw.util.getUrl(new mw.Title(multipleArray[loopIndex].title).getPrefixedText()) + "?" + new URLSearchParams({
														"diff": multipleArray[loopIndex].revid
													}).toString() + "'>" + i18n.msg("ma-v2-diff").escape() + "</a>)";

													/* ~ actions ~ */
													if (nkch.ma.options.experimentalFeatures == 1) {
														ma__list_item__actions.append(ma__list_item__actions_dropdown);

														/* ~ actions : undo ~ */
														var edit_dropdown_action_undo = document.createElement("li");
														var edit_dropdown_action_undo_link = document.createElement("a");

														edit_dropdown_action_undo_link.innerText = "Отменить";
														edit_dropdown_action_undo_link.href = mw.util.getUrl(new mw.Title(multipleArray[loopIndex].title).getPrefixedText()) + "?" + new URLSearchParams({
															action: "edit",
															undoafter: multipleArray[loopIndex].old_revid,
															undo: multipleArray[loopIndex].revid
														}).toString();

														$(edit_dropdown_action_undo_link).prepend(wds.icon("flag-small"));

														ma__list_item__actions_dropdown_list.append(edit_dropdown_action_undo);
														edit_dropdown_action_undo.append(edit_dropdown_action_undo_link);
													}

													/* ~ details ~ */
													if (
														multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
													) {
														ma__list_item__main.append(ma__list_item__details);

														ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-summary").escape() + "</b>: " + multipleArray[loopIndex].parsedcomment;
													}

													ma__list_item__date_and_size.prepend(ma__list_item__size);
													ma__list_item__size.after(ma__list_item__date_and_size__separator);
													break;
												case "new":
													ma__list_item.classList.add("nkch-ma-entry--new");

													/* ~ icon ~ */
													ma__list_item__icon.classList.add("nkch-ma-entry__icon--new");
													$(ma__list_item__icon).append(wds.icon("add-small"));

													/* ~ subtitle ~ */
													var authorLink = !mw.util.isIPAddress(multipleArray[loopIndex].user) ? new mw.Title(multipleArray[loopIndex].user, 2).getPrefixedText() : new mw.Title("Contributions/" + multipleArray[loopIndex].user, -1).getPrefixedText();

													ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-new", "[[" + authorLink + "|" + multipleArray[loopIndex].user + "]]").parse();

													/* ~ details ~ */
													if (
														multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
													) {
														ma__list_item__main.append(ma__list_item__details);

														ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-summary").escape() + "</b>: " + multipleArray[loopIndex].parsedcomment;
													}

													ma__list_item__date_and_size.prepend(ma__list_item__size);
													ma__list_item__size.after(ma__list_item__date_and_size__separator);
													break;
												case "log":
													var logsCase = entries.logs.filter(
														function (x) {
															return x.timestamp == multipleArray[loopIndex].timestamp;
														}
													);

													logsCase = logsCase.filter(
														function (x) {
															return x.comment == multipleArray[loopIndex].comment;
														}
													);

													if (logsCase[0].action != undefined) {
														switch (logsCase[0].action) {
															case "delete_redir":
															case "delete":
																ma__list_item.classList.add("nkch-ma-entry--delete");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--delete");
																$(ma__list_item__icon).append(wds.icon("trash-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-delete", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + multipleArray[loopIndex].parsedcomment;
																}
																break;
															case "restore":
																ma__list_item.classList.add("nkch-ma-entry--restore");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--restore");
																$(ma__list_item__icon).append(wds.icon("trash-open-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-restore", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + multipleArray[loopIndex].parsedcomment;
																}
																break;
															case "move_prot":
															case "protect":
																ma__list_item.classList.add("nkch-ma-entry--protect");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--protect");
																$(ma__list_item__icon).append(wds.icon("flag-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-protect", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	(multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ||
																	(logsCase[0].params.description != undefined && logsCase[0].params.description != "")
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	if (multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + multipleArray[loopIndex].parsedcomment + "<br>";
																	if (logsCase[0].params.description != undefined && logsCase[0].params.description != "") ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-params").escape() + "</b>: " + mw.html.escape(logsCase[0].params.description);
																}
																break;
															case "unprotect":
																ma__list_item.classList.add("nkch-ma-entry--unprotect");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--unprotect");
																$(ma__list_item__icon).append(wds.icon("flag-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-unprotect", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();
																break;
															case "move_redir":
															case "move":
																ma__list_item.classList.add("nkch-ma-entry--move");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--move");
																$(ma__list_item__icon).append(wds.icon("move-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-move", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	(multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ||
																	(logsCase[0].params.target_title != undefined && logsCase[0].params.target_title != "")
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	if (multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + multipleArray[loopIndex].parsedcomment + "<br>";
																	if (logsCase[0].params.target_title != undefined && logsCase[0].params.target_title != "") ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-new-name").escape() + "</b>: " + mw.html.escape(logsCase[0].params.target_title);
																}
																break;
															case "block":
																ma__list_item.classList.add("nkch-ma-entry--block");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--block");
																$(ma__list_item__icon).append(wds.icon("lock-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-block", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	(multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ||
																	(logsCase[0].params.duration != undefined && logsCase[0].params.duration != "")
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	if (multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + mw.html.escape(logsCase[0].comment) + "<br>";
																	if (logsCase[0].params.duration != undefined && logsCase[0].params.duration != "") ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-duration").escape() + "</b>: " + mw.html.escape(logsCase[0].params.duration);
																}
																break;
															case "unblock":
																ma__list_item.classList.add("nkch-ma-entry--unblock");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--unblock");
																$(ma__list_item__icon).append(wds.icon("unlock-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-unblock", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + mw.html.escape(logsCase[0].comment) + "<br>";
																}
																break;
                                                            case "reblock":
																ma__list_item.classList.add("nkch-ma-entry--reblock");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--reblock");
																$(ma__list_item__icon).append(wds.icon("lock-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-reblock", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	(multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ||
																	(logsCase[0].params.duration != undefined && logsCase[0].params.duration != "")
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	if (multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + mw.html.escape(logsCase[0].comment) + "<br>";
																	if (logsCase[0].params.duration != undefined && logsCase[0].params.duration != "") ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-duration").escape() + "</b>: " + mw.html.escape(logsCase[0].params.duration);
																}
																break;
															case "rights":
																ma__list_item.classList.add("nkch-ma-entry--rights");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--rights");
																$(ma__list_item__icon).append(wds.icon("users-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-rights", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	(multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ||
																	(logsCase[0].params.oldmetadata != undefined && Array.isArray(logsCase[0].params.oldmetadata)) ||
																	(logsCase[0].params.newmetadata != undefined && Array.isArray(logsCase[0].params.newmetadata))
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	if (multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != "") ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-reason").parse() + "</b>: " + mw.html.escape(logsCase[0].comment) + "<br>";
																	if (logsCase[0].params.oldmetadata != undefined && Array.isArray(logsCase[0].params.oldmetadata)) {
																		if (logsCase[0].params.oldmetadata.length > 0) {
																			var userRights = "";

																			logsCase[0].params.oldmetadata.forEach(
																				function (el) {
																					userRights += "<b>" + el.group + "</b> " + "(→ " + (el.expiry == "infinity" ? el.expiry : new Date(el.expiry).toLocaleString(mw.config.get("wgContentLanguage"), {
																						year: "numeric",
																						month: "long",
																						day: "numeric",
																						hour: "numeric",
																						minute: "numeric",
																						second: "numeric"
																					})) + ") ";
																				}
																			);

																			ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-rights-old").escape() + "</b>: " + mw.html.escape(userRights) + "<br>";
																		} else {
																			ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-rights-old").escape() + "</b>: " + i18n.msg("ma-v2-details-rights-none").escape() + "<br>";
																		}
																	}

																	if (logsCase[0].params.newmetadata != undefined && Array.isArray(logsCase[0].params.newmetadata)) {
																		if (logsCase[0].params.newmetadata.length > 0) {
																			var userRights = "";

																			logsCase[0].params.newmetadata.forEach(
																				function (el) {
																					userRights += "<b>" + el.group + "</b> " + "(→ " + (el.expiry == "infinity" ? el.expiry : new Date(el.expiry).toLocaleString(mw.config.get("wgContentLanguage"), {
																						year: "numeric",
																						month: "long",
																						day: "numeric",
																						hour: "numeric",
																						minute: "numeric",
																						second: "numeric"
																					})) + ") ";
																				}
																			);

																			ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-rights-new").escape() + "</b>: " + mw.html.escape(userRights) + "<br>";
																		} else {
																			ma__list_item__details.innerHTML += "<b>" + i18n.msg("ma-v2-details-rights-new").escape() + "</b>: " + i18n.msg("ma-v2-details-rights-none").escape() + "<br>";
																		}
																	}
																}
																break;
															case "upload":
																ma__list_item.classList.add("nkch-ma-entry--import");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--import");
																$(ma__list_item__icon).append(wds.icon("download-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-import", "[[" + authorLink + "|" + logsCase[0].user + "]]").parse();

																/* ~ details ~ */
																if (
																	multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-summary").parse() + "</b>: " + multipleArray[loopIndex].parsedcomment;
																}
																break;
															default:
																ma__list_item.classList.add("nkch-ma-entry--unknown");

																/* ~ icon ~ */
																ma__list_item__icon.classList.add("nkch-ma-entry__icon--unknown");
																$(ma__list_item__icon).append(wds.icon("question-small"));

																/* ~ subtitle ~ */
																var authorLink = !mw.util.isIPAddress(logsCase[0].user) ? new mw.Title(logsCase[0].user, 2).getPrefixedText() : new mw.Title("Contributions/" + logsCase[0].user, -1).getPrefixedText();

																ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-unknown", "[[" + authorLink + "|" + logsCase[0].user + "]]", "<b>action</b>: <i>" + logsCase[0].action + "</i>; <b>type</b>: <i>" + logsCase[0].type + "</i>").parse();

																/* ~ details ~ */
																if (
																	multipleArray[loopIndex].parsedcomment != undefined && multipleArray[loopIndex].parsedcomment != ""
																) {
																	ma__list_item__main.append(ma__list_item__details);

																	ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-summary").parse() + "</b>: " + mw.html.escape(logsCase[0].comment);
																}
														}
													}

													break;
											}
											break;
										case "post":
											switch (multipleArray[loopIndex]._embedded.thread[0].containerType) {
												case "FORUM":
													switch (multipleArray[loopIndex].funnel) {
														case "POLL":
															ma__list_item.classList.add("nkch-ma-entry--poll");

															/* ~ icon ~ */
															ma__list_item__icon.classList.add("nkch-ma-entry__icon--poll");
															$(ma__list_item__icon).append(wds.icon("poll-small"));

															/* ~ title ~ */
															ma__list_item__heading_link.innerText = multipleArray[loopIndex]._embedded.thread[0].title;
															ma__list_item__heading_link.href = mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId;

															/* ~ subtitle ~ */
															var author = multipleArray[loopIndex].createdBy.name != null ? multipleArray[loopIndex].createdBy.name : multipleArray[loopIndex].creatorIp.replace("/", "");
															var authorLink = multipleArray[loopIndex].createdBy.name != null ? new mw.Title(author, 2).getPrefixedText() : new mw.Title("Contributions/" + author, -1).getPrefixedText();

															var subtitleLink_1 = "[[" + authorLink + "|" + author + "]]",
																subtitleLink_2 = "[" + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f?catId=" + multipleArray[loopIndex].forumId + " " + multipleArray[loopIndex].forumName + "]";

															ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-forum-poll", subtitleLink_1, subtitleLink_2).parse() + " (<a href='" + mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId + "'>" + i18n.msg("ma-v2-view").escape() + "</a>)";

															/* ~ details ~ */
															if (multipleArray[loopIndex].poll != undefined) {
																ma__list_item__main.append(ma__list_item__details);

																var poll_answers = document.createElement("ul");
																poll_answers.classList.add("nkch-ma-entry-poll");

																for (var r in multipleArray[loopIndex].poll.answers) {
																	var poll_answers_each = document.createElement("li");
																	poll_answers_each.classList.add("nkch-ma-entry-poll__answer");

																	var poll_answers_bar = document.createElement("div");
																	poll_answers_bar.classList.add("nkch-ma-entry-poll__bar");

																	poll_answers_each.append(poll_answers_bar);

																	var poll_answers_text = document.createElement("div");
																	poll_answers_text.classList.add("nkch-ma-entry-poll__text");
																	poll_answers_text.innerText = multipleArray[loopIndex].poll.answers[r].text;

																	poll_answers_each.append(poll_answers_text);

																	if (multipleArray[loopIndex].poll.userVotes != null && multipleArray[loopIndex].poll.userVotes.length > 0) {
																		var poll_answers_votes = document.createElement("div");
																		poll_answers_votes.classList.add("nkch-ma-entry-poll__votes");
																		poll_answers_votes.innerText = multipleArray[loopIndex].poll.answers[r].votes;

																		poll_answers_each.append(poll_answers_votes);

																		poll_answers_bar.style.width = Math.round((multipleArray[loopIndex].poll.answers[r].votes / multipleArray[loopIndex].poll.totalVotes) * 100) + "%";
																	}

																	poll_answers.append(poll_answers_each);
																	ma__list_item__details.classList.add("nkch-ma-entry__details--poll");
																}

																ma__list_item__details.append(poll_answers);
															}

															break;
														case "QUIZ":
															ma__list_item.classList.add("nkch-ma-entry--quiz");

															/* ~ icon ~ */
															ma__list_item__icon.classList.add("nkch-ma-entry__icon--quiz");
															$(ma__list_item__icon).append(wds.icon("quiz-small"));

															/* ~ title ~ */
															ma__list_item__heading_link.innerText = multipleArray[loopIndex]._embedded.thread[0].title;
															ma__list_item__heading_link.href = mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId;

															/* ~ subtitle ~ */
															var author = multipleArray[loopIndex].createdBy.name != null ? multipleArray[loopIndex].createdBy.name : multipleArray[loopIndex].creatorIp.replace("/", "");
															var authorLink = multipleArray[loopIndex].createdBy.name != null ? new mw.Title(author, 2).getPrefixedText() : new mw.Title("Contributions/" + author, -1).getPrefixedText();

															ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-forum-quiz", "[[" + authorLink + "|" + author + "]]").parse() + " (<a href='" + mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId + "'>" + i18n.msg("ma-v2-view").escape() + "</a>)";

															break;
														default:
															ma__list_item.classList.add("nkch-ma-entry--discussions");

															/* ~ icon ~ */
															ma__list_item__icon.classList.add("nkch-ma-entry__icon--discussions");
															$(ma__list_item__icon).append(wds.icon("discussions-small"));

															/* ~ title ~ */
															ma__list_item__heading_link.innerText = multipleArray[loopIndex]._embedded.thread[0].title;
															ma__list_item__heading_link.href = mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId;

															/* ~ subtitle ~ */
															var author = multipleArray[loopIndex].createdBy.name != null ? multipleArray[loopIndex].createdBy.name : multipleArray[loopIndex].creatorIp.replace("/", "");
															var authorLink = multipleArray[loopIndex].createdBy.name != null ? new mw.Title(author, 2).getPrefixedText() : new mw.Title("Contributions/" + author, -1).getPrefixedText();

															var subtitleLink_1 = "[[" + authorLink + "|" + author + "]]",
																subtitleLink_2 = "[" + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f?catId=" + multipleArray[loopIndex].forumId + " " + multipleArray[loopIndex].forumName + "]";

															ma__list_item__subtitle.innerHTML = !multipleArray[loopIndex].isReply ?
																i18n.msg("ma-v2-type-forum-new", subtitleLink_1, subtitleLink_2).parse() :
																i18n.msg("ma-v2-type-forum-reply", subtitleLink_1, subtitleLink_2).parse();

															ma__list_item__subtitle.innerHTML += " (<a href='" + mw.config.get("wgScriptPath") + "/f/p/" + multipleArray[loopIndex].threadId + (multipleArray[loopIndex].isReply ? "/r/" + multipleArray[loopIndex].id : "") + "'>" + i18n.msg("ma-v2-view").escape() + "</a>)"

															/* ~ details ~ */
															if (
																multipleArray[loopIndex].jsonModel &&
																multipleArray[loopIndex].jsonModel != "" &&
																multipleArray[loopIndex].jsonModel != null
															) {
																var postContent = nkch.ma.actions.getPostContent(multipleArray[loopIndex].jsonModel);
															}

															var postContentFiltered = postContent.replace(/\s/g, "");
															var postPictures = nkch.ma.actions.getPostPictures(multipleArray[loopIndex]);

															if (
																postContentFiltered.length != 0 ||
																postPictures != null
															) {
																ma__list_item__main.append(ma__list_item__details);

																if (postContentFiltered.length != 0) ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-text").parse() + "</b>: " + postContent;
																if (postPictures != null) ma__list_item__details.append(nkch.ma.actions.getPostPictures(multipleArray[loopIndex]));
															}
													}
													break;
												case "WALL":
													var targetWall = multipleArray[loopIndex].forumName.substring(0, multipleArray[loopIndex].forumName.length - 13);

													ma__list_item.classList.add("nkch-ma-entry--message-wall");

													/* ~ icon ~ */
													ma__list_item__icon.classList.add("nkch-ma-entry__icon--message-wall");
													$(ma__list_item__icon).append(wds.icon("envelope-small"));

													/* ~ title ~ */
													ma__list_item__heading_link.innerText = multipleArray[loopIndex]._embedded.thread[0].title;
													ma__list_item__heading_link.href = mw.util.getUrl(new mw.Title(targetWall, 1200).getPrefixedText()) + "?" + new URLSearchParams({
														threadId: multipleArray[loopIndex].threadId
													}).toString();

													/* ~ subtitle ~ */
													var author = multipleArray[loopIndex].createdBy.name != null ? multipleArray[loopIndex].createdBy.name : multipleArray[loopIndex].creatorIp.replace("/", "");
													var authorLink = multipleArray[loopIndex].createdBy.name != null ? new mw.Title(author, 2).getPrefixedText() : new mw.Title("Contributions/" + author, -1).getPrefixedText();

													var subtitleLink_1 = "[[" + authorLink + "|" + author + "]]",
														subtitleLink_2 = "[[" + new mw.Title(targetWall, 1200).getPrefixedText() + "|" + i18n.msg("ma-v2-message-wall", targetWall.replace(/_/g, " ")).plain() + "]]";

													ma__list_item__subtitle.innerHTML = !multipleArray[loopIndex].isReply ?
														i18n.msg("ma-v2-type-wall-new", subtitleLink_1, subtitleLink_2).parse() :
														i18n.msg("ma-v2-type-wall-reply", subtitleLink_1, subtitleLink_2).parse()

													var urlParamsLink = {
														threadId: multipleArray[loopIndex].threadId
													}

													ma__list_item__subtitle.innerHTML += " (<a href='" + mw.util.getUrl(new mw.Title(targetWall, 1200).getPrefixedText()) + "?" + new URLSearchParams(urlParamsLink).toString() + (multipleArray[loopIndex].isReply ? "#" + multipleArray[loopIndex].id : "") + "'>" + i18n.msg("ma-v2-view").escape() + "</a>)"

													/* ~ details ~ */
													if (
														multipleArray[loopIndex].jsonModel &&
														multipleArray[loopIndex].jsonModel != "" &&
														multipleArray[loopIndex].jsonModel != null
													) {
														var postContent = nkch.ma.actions.getPostContent(multipleArray[loopIndex].jsonModel);
													}

													var postContentFiltered = postContent.replace(/\s/g, "");
													var postPictures = nkch.ma.actions.getPostPictures(multipleArray[loopIndex]);

													if (
														postContentFiltered.length != 0 ||
														postPictures != null
													) {
														ma__list_item__main.append(ma__list_item__details);

														if (postContentFiltered.length != 0) ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-text").parse() + "</b>: " + postContent;
														if (postPictures != null) ma__list_item__details.append(nkch.ma.actions.getPostPictures(multipleArray[loopIndex]));
													}

													/* ~ actions ~ */
													if (nkch.ma.options.experimentalFeatures == 1) {
														ma__list_item__actions.append(ma__list_item__actions_dropdown);

														/* ~ actions : copy link ~ */
														var edit_wall_action_copylink = document.createElement("li");
														var edit_wall_action_copylink_link = document.createElement("a");
														edit_wall_action_copylink_link.innerText = "Копировать ссылку";
														$(edit_wall_action_copylink_link).prepend(wds.icon("link-small"));

														ma__list_item__actions_dropdown_list.append(edit_wall_action_copylink);
														edit_wall_action_copylink.append(edit_wall_action_copylink_link);

														/* ~ actions : report ~ */
														var edit_wall_action_report = document.createElement("li");
														var edit_wall_action_report_link = document.createElement("a");
														edit_wall_action_report_link.innerText = "Сообщить";
														$(edit_wall_action_report_link).prepend(wds.icon("alert-small"));

														ma__list_item__actions_dropdown_list.append(edit_wall_action_report);
														edit_wall_action_report.append(edit_wall_action_report_link);
													}
													break;
												case "ARTICLE_COMMENT":
													ma__list_item.classList.add("nkch-ma-entry--article-comment");

													ma__list_item__icon.classList.add("nkch-ma-entry__icon--article-comment");
													$(ma__list_item__icon).append(wds.icon("comment-small"));

													/* ~ subtitle ~ */
													var author = multipleArray[loopIndex].createdBy.name != null ? multipleArray[loopIndex].createdBy.name : multipleArray[loopIndex].creatorIp.replace("/", "");
													var authorLink = multipleArray[loopIndex].createdBy.name != null ? new mw.Title(author, 2).getPrefixedText() : new mw.Title("Contributions/" + author, -1).getPrefixedText();

													var urlParamsLink = {
														commentId: multipleArray[loopIndex].threadId
													}

													if (multipleArray[loopIndex].isReply) urlParamsLink.replyId = multipleArray[loopIndex].id;

													ma__list_item__subtitle.innerHTML = i18n.msg("ma-v2-type-comment", "[[" + authorLink + "|" + author + "]]").parse();

													$.ajax({
															url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wikia.php"),
															type: "GET",
															data: {
																controller: "FeedsAndPosts",
																method: "getArticleNamesAndUsernames",
																stablePageIds: multipleArray[loopIndex].forumId,
																format: "json"
															}
														})
														.then(
															function (comment) {
																ma__list_item__heading_link.innerText = comment.articleNames[Object.keys(comment.articleNames)[0]].title;
																ma__list_item__heading_link.href = comment.articleNames[Object.keys(comment.articleNames)[0]].relativeUrl;

																ma__list_item__subtitle.innerHTML += " (<a href='" + comment.articleNames[Object.keys(comment.articleNames)[0]].relativeUrl + "?" + new URLSearchParams(urlParamsLink).toString() + "'>" + i18n.msg("ma-v2-view").escape() + "</a>)"
															}
														);

													/* ~ details ~ */
													if (
														multipleArray[loopIndex].jsonModel &&
														multipleArray[loopIndex].jsonModel != "" &&
														multipleArray[loopIndex].jsonModel != null
													) {
														var postContent = nkch.ma.actions.getPostContent(multipleArray[loopIndex].jsonModel);
													}

													var postContentFiltered = postContent.replace(/\s/g, "");
													var postPictures = nkch.ma.actions.getPostPictures(multipleArray[loopIndex]);

													if (
														postContentFiltered.length != 0 ||
														postPictures != null
													) {
														ma__list_item__main.append(ma__list_item__details);

														if (postContentFiltered.length != 0) ma__list_item__details.innerHTML = "<b>" + i18n.msg("ma-v2-details-text").parse() + "</b>: " + postContent;
														if (postPictures != null) ma__list_item__details.append(nkch.ma.actions.getPostPictures(multipleArray[loopIndex]));
													}
													break;
											}
											break;
									}

									var ma__list_separator = document.createElement("h3");
									ma__list_separator.classList.add("nkch-ma__list-separator");

									if (multipleArray[loopIndex].timestamp) {
										var dateEach = new Date(multipleArray[loopIndex].timestamp * 1000);

										multipleArray[loopIndex].date = {
											day: dateEach.getDate(),
											month: dateEach.getMonth(),
											year: dateEach.getFullYear()
										};
									}

									if (multipleArray[Number(loopIndex) - 1] != undefined) {
										if ((multipleArray[loopIndex].date.day != multipleArray[Number(loopIndex) - 1].date.day) ||
											(multipleArray[loopIndex].date.month != multipleArray[Number(loopIndex) - 1].date.month) ||
											(multipleArray[loopIndex].date.year != multipleArray[Number(loopIndex) - 1].date.year)) {
											ma__list_separator.innerHTML = dateEach.toLocaleDateString(mw.config.get("wgContentLanguage"), {
												year: "numeric",
												month: "long",
												day: "numeric"
											});

											ma__list_item.before(ma__list_separator);
										}
									}

									ma__list_item.querySelectorAll("a").forEach(
										function (el) {
											el.removeAttribute("title");
										}
									);

									resolve();
								}
							).then(
								function () {
									loopIndex++;
									theLoop();
								}
							);
						} else {
							function showTooltip(tooltip, element) {
								var tooltipPosition = tooltip.getBoundingClientRect();
								var tooltipDirection = tooltip.dataset.wdsTooltipPosition;

								element.remove();
								element.setAttribute("class", "wds-tooltip");
								element.innerHTML = tooltip.dataset.wdsTooltip || "";
								element.classList.add("is-" + tooltipDirection);

								switch (tooltipDirection) {
									case "right":
										element.style.left = tooltipPosition.right + 6 + "px";
										element.style.top = (tooltipPosition.bottom - tooltipPosition.top) / 2 + tooltipPosition.top + "px";
										break;
									case "top":
										element.style.top = tooltipPosition.top - 6 + "px";
										element.style.left = (tooltipPosition.right - tooltipPosition.left) / 2 + tooltipPosition.left + "px";
										break;
									case "bottom":
										element.style.top = tooltipPosition.bottom + 6 + "px";
										element.style.left = (tooltipPosition.right - tooltipPosition.left) / 2 + tooltipPosition.left + "px";
										break;
									case "left":
										element.style.left = tooltipPosition.left - 6 + "px";
										element.style.top = (tooltipPosition.bottom - tooltipPosition.top) / 2 + tooltipPosition.top + "px";
										break;
								}

								document.body.appendChild(element);
							}

							function hideTooltip(tooltip) {
								tooltip.remove();
							}

							function setupTooltip(tooltip) {
								if (!tooltip.dataset.tooltipAttached && tooltip.dataset.wdsTooltip) {
									var element = document.createElement("div");

									tooltip.addEventListener("mouseenter", (function () {
										showTooltip(tooltip, element);
									}));
									tooltip.addEventListener("focus", (function () {
										showTooltip(tooltip, element);
									}));
									tooltip.addEventListener("mouseleave", (function () {
										hideTooltip(element);
									}));
									tooltip.addEventListener("blur", (function () {
										hideTooltip(element);
									}));
									tooltip.addEventListener("click", (function () {
										hideTooltip(element);
									}));
									tooltip.dataset.tooltipAttached = "1";
								}
							}

							document.querySelectorAll(".nkch-ma [data-wds-tooltip]").forEach(setupTooltip);
						}
					}

					theLoop();
				}
			);
	};

	nkch.ma.actions.getRecentChanges = function () {
		return new Promise(
			function (resolve, reject) {
				new mw.Api().get({
						action: "query",
						list: "recentchanges",
						rcprop: "title|ids|sizes|flags|user|comment|parsedcomment|timestamp",
						rcnamespace: "0|1|2|3|4|5|8|9|10|11|14|15|500",
						rcshow: "!bot",
						rclimit: arrayLength,
						format: "json"
					})
					.done(
						function (data) {
							var changes = data.query.recentchanges;

							for (var i in changes) {
								changes[i].timestamp = Date.parse(changes[i].timestamp) / 1000;
								changes[i].rel = "change";
							}

							resolve(changes);
						}
					)
					.fail(reject);
			}
		);
	};

	nkch.ma.actions.getLogs = function () {
		return new Promise(
			function (resolve, reject) {
				new mw.Api().get({
						action: "query",
						list: "logevents",
						lelimit: "max",
						format: "json"
					})
					.done(
						function (data) {
							var logs = data.query.logevents;

							for (var i in logs) {
								logs[i].timestamp = Date.parse(logs[i].timestamp) / 1000;
								logs[i].rel = "log";
							}

							resolve(logs);
						}
					)
					.fail(reject);
			}
		);
	};

	nkch.ma.actions.getDiscussionsPosts = function () {
		return new Promise(
			function (resolve) {
				$.ajax({
						url: mw.util.wikiScript("wikia"),
						type: "GET",
						data: {
							controller: "DiscussionPost",
							method: "getPosts",
							viewableOnly: true,
							sortKey: "creation_date",
							limit: arrayLength <= 100 ? arrayLength : 100,
							format: "json"
						}
					})
					.then(
						function (data) {
							var posts = data._embedded["doc:posts"];

							for (var i in posts) {
								posts[i].timestamp = posts[i].creationDate.epochSecond;
								posts[i].rel = "post";
							}

							resolve(posts);
						}
					);
			}
		);
	};

	nkch.ma.actions.getWikiDetails = function () {
		return new Promise(
			function (resolve) {
				$.ajax({
						url: encodeURI(mw.util.wikiScript("wikia")),
						type: "GET",
						data: {
							controller: "FeedsAndPosts",
							method: "getAll",
							format: "json"
						}
					})
					.then(
						function (rail) {
							resolve(rail);
						}
					);
			}
		);
	};

	nkch.ma.actions.getCommunityCorner = function (api) {
		return new Promise(
			function (resolve, reject) {
				api.get({
						action: "parse",
						page: "MediaWiki:Community-corner",
						prop: "text",
						format: "json"
					})
					.done(
						function (parse) {
							if (parse.parse) {
								parse = parse.parse.text[Object.keys(parse.parse.text)[0]];
								resolve(parse);
							} else {
								reject(title + ": " + "Community corner has not been found");
							}
						}
					)
					.fail(reject);
			}
		);
	};

	nkch.ma.actions.getTimeAgo = function (i18n, dateSrc) {
		var time, createdAgo;

		var diff = new Date() - dateSrc;

		var msPerMinute = 60 * 1000;
		var msPerHour = msPerMinute * 60;
		var msPerDay = msPerHour * 24;
		var msPerMonth = msPerDay * 30;
		var msPerYear = msPerDay * 365;

		if (diff < msPerMinute) {
			time = Math.round(diff / 1000);
			createdAgo = mw.message("timeago-second", time).text();
		} else if (diff < msPerHour) {
			time = Math.round(diff / msPerMinute);
			createdAgo = mw.message("timeago-minute", time).text();
		} else if (diff < msPerDay) {
			time = Math.round(diff / msPerHour);
			createdAgo = mw.message("timeago-hour", time).text();
		} else {
			time = Math.round(diff / msPerDay);
			createdAgo = mw.message("timeago-day", time).text();
		}

		if (diff >= msPerMonth) {
			if (diff < msPerYear) {
				addtime = Math.round(diff / msPerMonth);
				createdAgo += " (" + i18n.msg("dateAbout").plain() + " " + mw.message("timeago-month", addtime).text() + ")";
			} else {
				addtime = Math.round(diff / msPerYear);
				createdAgo += " (" + i18n.msg("dateAbout").plain() + " " + mw.message("timeago-year", addtime).text() + ")";
			}
		}

		return createdAgo;
	};

	nkch.ma.actions.parsePostContent = function (paragraph) {
		var paragraphArray = [];
		var i = 0;

		switch (paragraph.type) {
			case "paragraph":
				if (paragraph.content) {
					while (i < paragraph.content.length) {
						if (paragraph.content[i].type == "text") {
							if (paragraph.content[i].marks) {
								switch (paragraph.content[i].marks[0].type) {
									case "link":
										paragraphArray.push(mw.html.escape(paragraph.content[i].text));
										break;
									case "strong":
										paragraphArray.push("<strong>" + mw.html.escape(paragraph.content[i].text) + "</strong>");
										break;
									case "em":
										paragraphArray.push("<em>" + mw.html.escape(paragraph.content[i].text) + "</em>");
										break;
								}
							} else if (!paragraph.content[i].marks) {
								paragraphArray.push(mw.html.escape(paragraph.content[i].text));
							}
						}
						i++;
					}
				}
				break;
			case "code_block":
				if (paragraph.content) {
					// another one
					while (i < paragraph.content.length) {
						if (paragraph.content[i].type == "text") {
							paragraphArray.push(mw.html.escape(paragraph.content[i].text));
						}
						i++;
					}
				}
				break;
			case "bulletList":
			case "orderedList":
				if (paragraph.content) {
					while (i < paragraph.content.length) {
						if (paragraph.content[i].type == "listItem") {
							e = 0;
							while (e < paragraph.content[i].content.length) {
								if (paragraph.content[i].content[e].type == "paragraph") {
									a = 0;
									while (a < paragraph.content[i].content[e].content.length) {
										if (paragraph.content[i].content[e].content[a].type == "text") {
											paragraphArray.push(mw.html.escape(paragraph.content[i].content[e].content[a].text) + " ");
										}
										a++;
									}
								}
								e++;
							}
						}
						i++;
					}
				}
				break;
		}

		return paragraphArray.join("");
	};

	nkch.ma.actions.getPostContent = function (content) {
		var postData = JSON.parse(content);

		postArray = [];
		var i = 0;

		while (i < postData.content.length) {
			postArray.push(nkch.ma.actions.parsePostContent(postData.content[i]));
			i++;
		}

		var postString = postArray.join(" ");

		if (postString.length > 250) {
			postString = postString.substring(0, 251) + "...";
		}

		return postString;
	};

	nkch.ma.actions.getPostPictures = function (post) {
		var images = post._embedded.contentImages;

		if (images.length > 0) {
			var post_images = document.createElement("div");
			post_images.classList.add("nkch-ma-entry-post-images");

			var cutCount;
			if (images.length > 5) {
				cutCount = images.length - 5;
				images.length = 5;
			} else if (images.length > 4) {
				cutCount = 1;
			}

			for (var a in images) {
				if (
					images[a].mediaType == "image/png" ||
					images[a].mediaType == "image/jpeg" ||
					images[a].mediaType == "image/gif" ||
					images[a].mediaType == null
				) {
					var post_images_each = document.createElement("a");
					post_images_each.classList.add("nkch-ma-entry-post-images__image");

					switch (a < 4) {
						case true:
							post_images_each.href = images[a].url;

							var post_images_each_src = document.createElement("img");
							post_images_each_src.classList.add("nkch-ma-entry-post-images__src");
							post_images_each_src.src = images[a].url;

							post_images_each.append(post_images_each_src);
							break;
						case false:
							var post_images_each_more = document.createElement("div");
							post_images_each_more.classList.add("nkch-ma-entry-post-images__more");
							post_images_each_more.style.backgroundImage = "url(" + images[a].url + ")";

							var post_images_each_indicator = document.createElement("div");
							post_images_each_indicator.classList.add("nkch-ma-entry-post-images__indicator");

							post_images_each_indicator.innerHTML = "+" + cutCount;

							post_images_each.append(post_images_each_more);
							post_images_each_more.append(post_images_each_indicator);
							break;
					}

					post_images.appendChild(post_images_each);
				}
			}
			return post_images;
		} else {
			return null;
		}
	};

	importArticles({
		type: "script",
		articles: [
			"u:dev:MediaWiki:I18n-js/code.js",
			"u:dev:MediaWiki:WDSIcons/code.js"
		]
	});
}