"use strict";

module.exports = Promise.resolve([
	"u:dev:MediaWiki:Crypto/utils/stringify.js"
]).then(function(dependencies) {
	return importArticles({ type: "script", articles: dependencies }).then(function(){ return dependencies; });
}).then(function(dependencies){
	return Promise.all(dependencies.map(require));
}).then(function(dependencies){
	var stringify = dependencies[0];
	
	/**
	 * Name string is a fully-qualified domain name
	 * 
	 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
	 */
	var NameSpace_DNS = new Uint8Array([
	    0x6b, 0xa7, 0xb8, 0x10,
	    0x9d, 0xad,
	    0x11, 0xd1,
	    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
	]);
	
	/**
	 * Name string is a URL
	 * 
	 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
	 */
	var NameSpace_URL = new Uint8Array([
	    0x6b, 0xa7, 0xb8, 0x11,
	    0x9d, 0xad,
	    0x11, 0xd1,
	    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
	]);
	
	/**
	 * Name string is an X.500 DN (in DER or a text output format)
	 * 
	 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
	 */
	var NameSpace_OID = new Uint8Array([
	    0x6b, 0xa7, 0xb8, 0x12,
	    0x9d, 0xad,
	    0x11, 0xd1,
	    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
	]);
	
	/**
	 * Name string is an ISO OID
	 * 
	 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
	 */
	var NameSpace_X500 = new Uint8Array([
	    0x6b, 0xa7, 0xb8, 0x14,
	    0x9d, 0xad,
	    0x11, 0xd1,
	    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
	]);
	
	/**
	 * uuid V5
	 * 
	 * ```js
	 * const name = "example.com";
	 * const encoder = new TextEncoder();
	 * const buff = encoder.encode(name);
	 * const uuid = await v5(buff, NameSpace_URL);
	 * ```
	 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
	 * 
	 * @param { Uint8Array } value the value from which to generate a UUID
	 * @param { Uint8Array } namespace UUID of the namespace
	 * @returns { Promise<string> } resulting UUID
	 */
	function v5(value, namespace) {
		var bytes = new Uint8Array(value.byteLength + namespace.byteLength);
		bytes.set(namespace);
		bytes.set(value, namespace.length);
		return crypto.subtle.digest("SHA-1", bytes).then(function(data) {
			var hash = new Uint8Array(data);
			hash[6] = (hash[6] & 0x0f) | 0x50;
			hash[8] = (hash[8] & 0x3f) | 0x80;
			return stringify(hash);
		});
	}
	
	return {
		NameSpace_DNS: NameSpace_DNS,
		NameSpace_URL: NameSpace_URL,
		NameSpace_OID: NameSpace_OID,
		NameSpace_X500: NameSpace_X500,
		v5: v5
	};
});