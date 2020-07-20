/**
 * Add a message in the web console.
 * @param message
 */
function Debug(message) {
	var console = window['console'];
	if (console && console.log) {
		console.log(message);
	}
}