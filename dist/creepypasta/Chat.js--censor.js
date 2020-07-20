$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/kyke|nigger|nigga|beaner|faggot/gi, '(fail)');
	}
})