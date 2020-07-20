function test() {
	if(mw.config.get('wgPageName') === 'JS_Test') {
		alert('Test');
	}
}
$(function() {
	test();
});