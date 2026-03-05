/**
 * @name	Jahannam
 * @author	Headquarter8302
 * @description	Library for interacting with the Nirvana backend, a.k.a `wikia.php`
 * @license	MIT
 * @license	CC-BY-SA-3.0 Caburum for the Nirvana docs (https://caburum.fandom.com/wiki/Nirvana)
 * @version	v0
 * <nowiki>
 */

; ((window, mw) => {
	/** @type {Version} */
	const version = "v0";

	/** @param {any} msg */
	function debug(msg) {
		console.debug(`[Jahannam] ${msg}`);
	}

	/**
	 * @param {any} msg
	 * @param {any} [data]
	 * @returns {false}
	*/
	function error(msg, ...data) {
		console.error(`[Jahannam] ${msg}`, ...data);
		return false;
	}

	// @ts-expect-error
	(window.dev = window.dev || {}).jahannam = {};
	// @ts-expect-error
	window.dev.jahannam.cfg = window.dev.jahannam.cfg || {};

	debug(version);

	class Jahannam {
		/**
		 * @param {import('./index.d.ts').Jahannam.Config} cfgInput
		*/
		constructor (cfgInput) {
			/**
			 * Holds the configuration for the script. Will be overwritten by the class config input
			 * @type {import('./index.d.ts').Jahannam['cfg']}
			 * @namespace
			 */
			this.cfg = {
				cityId: mw.config.get('wgCityId'),
				endpoints: {
					wikia: new URL('https://'
						.concat(mw.config.get('wgWikiID'))
						.concat('.fandom.com/wikia.php')),
					service: new URL(mw.config.get('wgServicesExternalDomain')),
				},
				version: version
			};

			// what's optional chaining?
			if (cfgInput) {
				if (cfgInput.cityId) this.cfg.cityId = cfgInput.cityId;
				if (cfgInput.endpoints) {
					if (cfgInput.endpoints.wikia) this.cfg.endpoints.wikia = cfgInput.endpoints.wikia;
					if (cfgInput.endpoints.service) this.cfg.endpoints.service = cfgInput.endpoints.service;
				}
			}

			// readonly
			Object.freeze(this.cfg);
			Object.freeze(this.cfg.endpoints);

			/**
			 * @type {import('./index.d.ts').Jahannam['util']}
			 * @namespace
			 */
			this.util = {
				/**
				 * GETs a given URL. Note that as of February 2026, Fandom still has not allowed interwiki cross-origin requests, you will get a CORS error
				 * @async
				 * @method get
				 */
				get: (opts) => {
					if (
						!opts
						|| !opts.controller
						|| !opts.method
					) return Promise.resolve(error("Invalid parameter on 'get()'"));

					const url = opts.url || this.cfg.endpoints.wikia;
					const controller = opts.controller;
					const method = opts.method;
					const format = opts.format || 'json';
					const parameters = opts.parameters || {};

					const fullURL = this.util.createURL(url, {
						controller,
						method,
						format,
						parameters
					});

					const isCors = url.origin !== window.location.origin;

					/** @type {RequestInit} */
					const fetchParams = {
						cache: 'no-cache',
						method: 'GET',
						mode: isCors ? 'cors' : 'same-origin'
					};

					return fetch(fullURL, fetchParams)
						.then(response => {
							if (!response.ok) return error("Request error:", response.statusText, response.status);
							return response.json();
						})
						.catch(reason => {
							return error("Request error", reason.message);
						});
				},

				/**
				 * Creates a URL with the given kv pair of URL parameters
				 * @method createURL
				 */
				createURL(baseURL, paramPair = {}) {
					const url = new URL(baseURL);
					for (const [k, v] of Object.entries(paramPair)) {
						if (v && typeof v === "object") {
							for (const [param, paramV] of Object.entries(v))
								url.searchParams.append(param, paramV);
							continue;
						}
						if (typeof v === "string") url.searchParams.append(k, v);
					}
					return url;
				}
			};

			/**
			 * UserProfile
			 * @type {import('./index.d.ts').Jahannam['UserProfile']}
			 * @namespace
			 */
			this.UserProfile = {
				/**
				 * A user's special pages on the wiki, their avatar, their edit and post count, whether they are blocked
				 * @method getUserData
				 */
				getUserData: (userId) => {
					return this.util.get({
						controller: 'UserProfile',
						method: 'getUserData',
						parameters: { 'userId': userId.toString() }
					});
				}
			};

			/**
			 * Fandom\FeedsAndPosts\Discussion\DiscussionPost
			 * @type {import('./index.d.ts').Jahannam['DiscussionPost']}
			 * @namespace
			 */
			this.DiscussionPost = {
				/**
				 * Gets information of a specific post by its ID
				 * @method getPost
				 */
				getPost: (postId) => {
					return this.util.get({
						controller: 'DiscussionPost',
						method: 'getPost',
						parameters: { 'postId': postId.toString() }
					});
				},
			};

			/**
			 * DWDimensionApi
			 * @type {import('./index.d.ts').Jahannam['DWDimensionApi']}
			 * @namespace
			 */
			this.DWDimensionApi = {
				/**
				 * Returns wiki metadata
				 * @method getWikis
				 */
				getWikis: (limit = 100, after_wiki_id) => {
					/** @type {Record<string, string>} */
					const params = {
						'limit': limit.toString(),
					};
					if (after_wiki_id) params['after_wiki_id'] = after_wiki_id.toString();
					return this.util.get({
						controller: 'DWDimensionApi',
						method: 'getWikis',
						parameters: params
					});
				},

				/**
				 * Returns user data
				 * @method getUsers
				 */
				getUsers: (limit = 100, after_user_id) => {
					/** @type {Record<string, string>} */
					const params = {
						'limit': limit.toString(),
					};
					if (after_user_id) params['after_user_id'] = after_user_id.toString();
					return this.util.get({
						controller: 'DWDimensionApi',
						method: 'getUsers',
						parameters: params
					});
				},
			};

			debug("Instanced");
		}
	}

	mw.hook('dev.jahannam').fire(window.dev.jahannam.class = Jahannam);
	return;
})(window, mediaWiki);