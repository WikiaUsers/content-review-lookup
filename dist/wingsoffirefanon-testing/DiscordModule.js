/**
 * @name DiscordModule.js
 * @description Adds a link to a discord server to the rail
 * @version 1.0.0
 * @author Himmalerin
 * @author Dorumin
 */
$(function () {
	if (window.discordModule) return;

	window.discordModule = {
		api: new mw.Api(),

		defaultMessages: {
			RailLocation: "append",
			Title: "Community Chat",
			Description:
				'<a href="https://discord.com">Discord</a> is a free chat service for public discussions outside Fandom. ' +
				'<a href="https://en.wikipedia.org/wiki/Discord_(software)">Get more from Wikipedia</a>.',
			InviteID: "Vgfu9qb",
			InviteText: "Join",
		},

		customMessages: {},

		/**
		 * Find the rail settings pages, fetch their contents, and build the rail module
		 */
		rail: function rail() {
			this.api
				.get({
					format: "json",
					formatversion: "latest",
					action: "query",
					list: "allpages",
					apnamespace: 8,
					apprefix: "Custom-Discord-Module-",
				})
				.then(this.fetchRailSettings.bind(this))
				.then(this.buildRail.bind(this));
		},

		/**
		 * Fetch the rail module settings
		 * @param {Object} data - Object containing the pages to be fetched
		 */
		fetchRailSettings: function onPagesLoaded(data) {
			const context = this;

			const messages = data.query.allpages.map(function (page) {
				return page.title.replace("MediaWiki:", "");
			});

			return this.api
				.get({
					format: "json",
					formatversion: "latest",
					action: "query",
					meta: "allmessages",
					ammessages: messages,
				})
				.then(function (data) {
					data.query.allmessages.forEach(function (message) {
						const messageName = message.name.split("-").pop();
						context.customMessages[messageName] = message.content;
					});
				});
		},

		/**
		 * Load the module CSS
		 */
		loadCSS: function loadCSS() {
			mw.util.addCSS(
				".discord-module-svg{margin-right:7px;fill:rgba(58, 58, 58, 0.75)}.discord-module-content{display:flex;align-items:center}p.discord-module-guidelines{flex:1;font-size:12px;line-height:1.5}.discord-module .discord-module-content > .discord-module-connect > .discord-module-join{border-color:#7289da;background-color:#7289da;color:#fff}.discord-module .discord-module-content > .discord-module-connect > .discord-module-join.wds-button:focus,.discord-module .discord-module-content > .discord-module-connect > .discord-module-join.wds-button:hover{border-color:#8ea1e1;background-color:#8ea1e1;color:#fff}.mw-parser-output .discord-module{max-width:300px}.mw-parser-output .discord-module-connect{margin-left:10px}"
			);
		},

		/**
		 * UI-js data for creating the module title
		 * @param {String} title - Module title text
		 * @returns {Object} - Object containing UI-js data
		 */
		buildTitle: function buildTitle(title) {
			return {
				type: "h2",
				classes: ["discord-module-title", "has-icon"],
				children: [
					{
						type: "svg",
						classes: ["discord-module-svg"],
						attr: { viewBox: "0 0 28 20", height: "18", width: "18" },
						children: [
							{
								type: "path",
								attr: {
									d:
										"m20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z",
								},
							},
						],
					},
					{
						type: "span",
						text: title,
					},
				],
			};
		},

		/**
		 * UI-js data for creating the join link
		 * @param {String} id - Discord server invite ID
		 * @param {String} text - Text for the join link
		 * @returns {Object} - Object containing UI-js data
		 */
		join: function join(id, text) {
			return {
				type: "div",
				classes: ["discord-module-connect"],
				children: [
					{
						type: "a",
						attr: {
							href: "https://discord.com/invite/" + id,
							target: "_blank",
							rel: "noopener",
						},
						classes: ["discord-module-join", "wds-button", "wds-is-secondary"],
						text: text,
					},
				],
			};
		},

		/**
		 * UI-js data for creating the module body
		 * @param {Object} data - Object containing the join link data
		 * @param {String} data.Description - raw HTML description (parsed by mediawiki for safety)
		 * @param {String} data.InviteID - Discord server invite ID
		 * @param {String} data.InviteText - Text for the join link
		 * @returns {Object} - Object containing UI-js data
		 */
		body: function body(data) {
			return {
				type: "div",
				classes: ["discord-module-content"],
				children: [
					{
						type: "p",
						classes: ["discord-module-guidelines"],
						html: data.description,
					},
					this.join(data.inviteID, data.inviteText),
				],
			};
		},

		/**
		 * Build the rail module with UI-js
		 * @param data - Object containing module data
		 * @returns {HTMLCollection}
		 */
		buildRail: function buildRail() {
			const msgs = {};
			// Module location
			if (typeof this.customMessages.RailLocation === "string") {
				msgs.railLocation = this.customMessages.RailLocation;
			} else msgs.railLocation = this.defaultMessages.RailLocation;
			// Module title
			if (typeof this.customMessages.Title === "string") {
				msgs.title = this.customMessages.Title;
			} else msgs.title = this.defaultMessages.Title;
			// Module description
			if (typeof this.customMessages.Description === "string") {
				msgs.description = this.customMessages.Description;
			} else msgs.description = this.defaultMessages.Description;
			// Module invite link
			if (typeof this.customMessages.InviteID === "string") {
				msgs.inviteID = this.customMessages.InviteID;
			} else msgs.inviteID = this.defaultMessages.InviteID;
			// Module invite text
			if (typeof this.customMessages.InviteText === "string") {
				msgs.inviteText = this.customMessages.InviteText;
			} else msgs.inviteText = this.defaultMessages.InviteText;

			const module = dev.ui({
				type: "section",
				classes: ["rail-module", "discord-module"],
				attr: { id: "wiki-discord-module" },
				children: [
					this.buildTitle(msgs.title),
					{
						type: "div",
						children: [
							this.body({
								description: msgs.description,
								inviteID: msgs.inviteID,
								inviteText: msgs.inviteText,
							}),
						],
					},
				],
			});

			const rail = document.querySelector("#WikiaRail");

			// Wait until the rail has loaded to try to insert it
			const interval = setInterval(function () {
				if (rail && rail.classList.contains("is-ready")) {
					clearInterval(interval);

					if (msgs.railLocation === "append") {
						rail.insertBefore(
							module,
							document.querySelector("#WikiaAdInContentPlaceHolder")
						);
					} else {
						rail.insertBefore(module, rail.firstChild);
					}
				}
			}, 1000);
		},

		/**
		 * Find and build each discord module tag
		 */
		tags: function tags() {
			const context = this;
			const tags = document.querySelectorAll(
				"#mw-content-text .discord-container"
			);

			tags.forEach(function (tag) {
				const msgs = {};

				// Module title
				if (tag.dataset.title) {
					msgs.title = tag.dataset.title;
				} else msgs.title = context.defaultMessages.Title;
				// Module description
				if (tag.dataset.description) {
					msgs.description = tag.dataset.description;
				} else msgs.description = context.defaultMessages.Description;
				// Module invite link
				if (tag.dataset.inviteId) {
					msgs.inviteID = tag.dataset.inviteId;
				} else msgs.inviteID = context.defaultMessages.InviteID;
				// Module invite text
				if (tag.dataset.inviteText) {
					msgs.inviteText = tag.dataset.inviteText;
				} else msgs.inviteText = context.defaultMessages.InviteText;

				const module = dev.ui({
					type: "section",
					classes: ["discord-module"],
					children: [
						context.buildTitle(msgs.title),
						{
							type: "div",
							children: [
								context.body({
									description: msgs.description,
									inviteID: msgs.inviteID,
									inviteText: msgs.inviteText,
								}),
							],
						},
					],
				});

				tag.replaceWith(module);
			});
		},

		init: function init() {
			this.loadCSS();
			this.rail();
			this.tags();
		},
	};

	importArticle({ type: "script", article: "u:dev:MediaWiki:UI-js/code.js" });

	mw.loader.using("mediawiki.api").then(function () {
		mw.hook("dev.ui").add(function () {
			window.discordModule.init();
		});
	});
});