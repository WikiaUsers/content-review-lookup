// Add any test code here.
// DO NOT SUBMIT TO JSRT!
/* jshint undef:true, esversion: 6 */

this.addEventListener('fetch', event => { //  ignore:line
	console.log(event);

	event.respondWith(new Promise(async function(resolve, reject) { // jshint ignore:line
		try {
			resolve(await fetch(event.request)); // jshint ignore:line
		} catch(e) {
			reject(e);
		}
	}));
});

this.addEventListener('activate', event => {
	console.log(event);
});

this.addEventListener('install', event => {
	console.log(event);	
});