/* Add show Europe class to body */
function runWhenDOMContentLoaded(runnable) {
	if (/comp|inter|loaded/.test(document.readyState)) {
		runnable();
	} else {
		document.addEventListener('DOMContentLoaded', function() {
			runnable();
		});
	}
}
runWhenDOMContentLoaded(function() {
	var body = document.querySelector('body');
	body.classList.add('show-active-eu');
});