'use strict';
mw.custom = mw.custom || {};
mw.custom.Api = mw.custom.Api || class {
	constructor(site) {
		this._site = site ? `https://${site}/api.php?origin=*` :
			`${mw.util.wikiScript('api')}?`;
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
		} catch (e) {
			this.errorCount++;
			data = e.errors ? e : {errors: [{
				code: 'http',
				text: typeof e === 'string' ? e : JSON.stringify(e),
			}]};
			for (const error of data.errors) {
				console.error(error.code, error.text);
			}
			if (
				data.errors.every(e => this.errors.temporary.includes(e.code))
			) {
				console.log('Stand by for resubmit...');
				await sleep(1000 * (this.errorCount ** 2));
				return this._fetch(resource, options);
			}
		}
		return data;
	}
	get(params) {
		return this._fetch(`${this._site}&${this._urlSearchParams(params)}`);
	}
	post(params) {
		return this._fetch(this._site, {
			method: 'POST',
			body: this._urlSearchParams(params),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		});
	}
};

// {{JavaScript category}}