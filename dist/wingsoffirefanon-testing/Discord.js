/**
 * @name Discord.js
 * @description Adds a link to a discord server to the rail
 * @version 1.0.0
 * @author Himmalerin
 */
mw.loader.using(["mediawiki.api", "mediawiki.util"]).then(function () {
	if (document.querySelector("#WikiaRail") === null) return;

	importArticle({
		type: "script",
		article: "u:dev:MediaWiki:Dorui.js",
	});

	const inviteId = "fqxbymC";
	const title = "WoFF Wiki Discord";
	const callToAction = "Join the server!";

	const buildModule = function buildModule(ui) {
		return ui.a({
			class: "discord-module",
			href: ["https://discord.com/invite", inviteId].join("/"),
			children: [
				// Logo
				ui.svg({
					class: "discord-module__logo",
					attrs: {
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 71 55",
						width: 52,
						height: 40,
						fill: "currentColor",
						"aria-hidden": true,
					},
					child: ui.path({
						attrs: {
							d: "M60.1045 4.8978c-4.5253-2.0764-9.378-3.6062-14.4518-4.4824a.2193.2193 0 0 0-.2323.1099c-.6241 1.11-1.3154 2.5581-1.7995 3.6963-5.4572-.817-10.8864-.817-16.2317 0-.4842-1.1635-1.2006-2.5863-1.8275-3.6963a.228.228 0 0 0-.2323-.1099c-5.071.8734-9.9237 2.4032-14.4518 4.4824a.2067.2067 0 0 0-.0951.0817C1.5779 18.7309-.9435 32.1443.2935 45.3914c.0055.0648.0419.1268.0923.1662 6.0729 4.4598 11.9555 7.1673 17.7289 8.9619.0924.0282.1903-.0056.2491-.0817 1.3657-1.865 2.5831-3.8315 3.6269-5.8995.0616-.1211.0028-.2648-.1231-.3127-1.931-.7325-3.7697-1.6256-5.5384-2.6398-.1399-.0817-.1511-.2818-.0224-.3776a30.3377 30.3377 0 0 0 1.0999-.8621.2196.2196 0 0 1 .2295-.031c11.6196 5.3051 24.1992 5.3051 35.6817 0 .0756-.0366.1652-.0253.2323.0282.3555.293.7277.586 1.1027.8649.1287.0958.1203.2959-.0196.3776-1.7687 1.0339-3.6074 1.9073-5.5412 2.637a.2266.2266 0 0 0-.1203.3155c1.0662 2.0651 2.2836 4.0316 3.6241 5.8967a.2251.2251 0 0 0 .2491.0845c5.8014-1.7946 11.684-4.5021 17.7569-8.9619a.2279.2279 0 0 0 .0924-.1634c1.4804-15.3151-2.4796-28.6185-10.4975-40.4119a.1806.1806 0 0 0-.0923-.0845ZM23.7259 37.3253c-3.4983 0-6.3808-3.2117-6.3808-7.156 0-3.9443 2.8266-7.156 6.3808-7.156 3.5821 0 6.4367 3.2399 6.3807 7.156 0 3.9443-2.8266 7.156-6.3807 7.156Zm23.5919 0c-3.4982 0-6.3807-3.2117-6.3807-7.156 0-3.9443 2.8265-7.156 6.3807-7.156 3.5822 0 6.4367 3.2399 6.3808 7.156 0 3.9443-2.7986 7.156-6.3808 7.156Z",
						},
					}),
				}),
				// Title
				ui.div({
					class: "discord-module__title",
					text: title,
				}),
				// Call to action
				ui.div({
					class: "discord-module__call-to-action",
					text: callToAction,
				}),
				// Chevron
				ui.svg({
					class: "discord-module__chevron",
					attrs: {
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 24 24",
						width: 18,
						height: 18,
						fill: "currentColor",
						"aria-hidden": true,
					},
					child: ui.path({
						attrs: {
							d: "M18.5 11.9998a.997.997 0 0 1-.293.707l-11 11a.9998.9998 0 1 1-1.414-1.414l10.293-10.293L5.793 1.7068A.9998.9998 0 1 1 7.207.2928l11 11a.997.997 0 0 1 .293.707",
						},
					}),
				}),
			],
		});
	};

	mw.hook("doru.ui").add(function (ui) {
		mw.util.addCSS(
			[
				'.discord-module  {display: grid; grid-template-areas: "logo title chevron" "logo call-to-action chevron"; grid-template-columns: min-content 1fr min-content; grid-template-rows: min-content min-content; align-items: center; gap: 10px 20px; padding: 20px; border-radius: 3px; background-color: #5966f2; font-size: 16px; line-height: 1; color: #fff; }',
				".discord-module:hover, .discord-module:focus {text-decoration: none; color: #fff; }",
				".discord-module__logo { grid-area: logo; }",
				".discord-module__title { grid-area: title; font-weight: 700; }",
				".discord-module__call-to-action { grid-area: call-to-action; font-weight: 300; }",
				".discord-module__chevron { grid-area: chevron; transition-duration: 0.3s; transition-property: transform; transition-timing-function: ease-out; }",
				".discord-module:hover .discord-module__chevron { transform: translateX(50%); }",
			].join("")
		);

		const module = ui.section({
			classes: ["discord-module-wrapper", "rail-module"],
			children: [
				ui.h2({
					class: "rail-module__header",
					text: "Community Chat",
				}),
				buildModule(ui),
			],
		});

		document.querySelector("#WikiaRail").append(module);
	});
});