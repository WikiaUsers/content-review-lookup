/**
 * @module ext.gadget.api
 */
'use strict';
/**
 * A class for interacting with MediaWiki's Action API.
 * @version 1.0.0
 */
class Api {
	/**
	 * A response returned by the Action API, or an HTTP error formatted as one.
	 * @typedef {Object} ApiResponse
	 */
	/**
	 * A handler for API responses.
	 * @callback handler
	 * @param {ApiResponse} data - The API response to be handled.
	 */
	/**
	 * Creates an `Api` instance.
	 * @param {string} [site] - The domain name of a secure website running
	 *	MediaWiki, followed by the path to its `api.php` (if any is required).
	 *	This is only necessary if you need to interact with a foreign MediaWiki
	 *	site. Example: `en.wikipedia.org/w`.
	 * @param {handler} [handler] - A handler for fulfilled API requests.
	 * @param {handler} [errorHandler] - A handler for rejected API requests.
	 */
	constructor(site, handler, errorHandler) {
		this.version = '1.0.0';
		this._site = site ? `https://${site}/api.php?origin=*` :
			`${mw.util.wikiScript('api')}?`;
		this._handler = handler;
		this._errorHandler = errorHandler;
		this.errorCount = 0;
		this.errors = {
			temporary: ['http', 'maxlag', 'ratelimited', 'readonly'],
			persistent: [
				'permissiondenied',
				'protectedpage',
				'articleexists',
				'selfmove',
				'tpt-table-type-mixed-rows',
				'tpt-table-unique-column-index-not-unique-values',
			],
			spam: {
				3241: 'Communism spam present in wikitext',
				492211: 'URL shorteners present in wikitext',
				1067245: 'R-word present in wikitext',
				1090708: 'N-word present in wikitext',
			},
		};
	}

	/**
	 * A set of API parameters to be used in a request.
	 * @typedef {Object} ApiParams
	 */
	/**
	 * Builds the URL search parameters for the API request.
	 * @param {ApiParams} params - The API parameters to be used in the request.
	 * @returns {URLSearchParams} The complete URL search parameters for the API
	 *	request.
	 * @since 1.0.0
	 * @private
	 */
	_urlSearchParams(params) {
		return new URLSearchParams({
			action: 'query',
			errorformat: 'plaintext',
			...params,
			formatversion: 2,
			format: 'json',
			maxlag: 3,
		});
	}

	/**
	 * Performs the actual API request and does some initial handling of the
	 *	results.
	 * @param {string} resource - The URL of the resource being requested.
	 * @param {RequestInit} [options] - Custom settings to be sent with the
	 *	request, such as a request body.
	 * @returns {ApiResponse} The API response returned by the request.
	 * @since 1.0.0
	 * @private
	 */
	async _fetch(resource, options) {
		const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
		let data;
		try {
			const response = await fetch(resource, options);
			data = await response.json();
			if (data.errors) {
				throw data;
			}
			if (data.warnings) {
				for (const warning of data.warnings) {
					console.warn(warning.code, warning.text);
				}
			}
			if (this._handler) {
				this._handler(data);
			}
		} catch (e) {
			this.errorCount++;
			data = e.errors ? e : {errors: [{
				code: 'http',
				text: typeof e === 'string' ? e : JSON.stringify(e),
			}]};
			for (const error of data.errors) {
				console.error(error.code, error.text);
			}
			if (this._errorHandler) {
				this._errorHandler(data);
			}
			if (data.errors.every(
				e => this.errors.temporary.includes(e.code)
			)) {
				console.log('Stand by for resubmit...');
				await sleep(1000 * (this.errorCount ** 2));
				return this._fetch(resource, options);
			}
		}
		return data;
	}

	/**
	 * Perform an API GET request.
	 * @param {ApiParams} params - The API parameters to be used in the request.
	 * @returns {ApiResponse} The API response returned by the request.
	 * @since 1.0.0
	 */
	get(params) {
		return this._fetch(`${this._site}&${this._urlSearchParams(params)}`);
	}

	/**
	 * Perform an API POST request.
	 * @param {ApiParams} params - The API parameters to be used in the request.
	 * @returns {ApiResponse} The API response returned by the request.
	 * @since 1.0.0
	 */
	post(params) {
		return this._fetch(this._site, {
			method: 'POST',
			body: this._urlSearchParams(params),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		});
	}
}

mw.custom = mw.custom || {};
mw.custom.Api = mw.custom.Api || Api;

// {{JavaScript category}}