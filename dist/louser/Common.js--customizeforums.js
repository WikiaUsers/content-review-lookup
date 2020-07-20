/* Wikia forum feature changes (possibly more to come)
 * by: [[User:The 888th Avatar]]
 */

/* Start a Discussion > Start a discussion */

$(function() {
	if (wgNamespaceNumber == 2000) {
		$('h4.heading').html('Start a discussion');
	}
});