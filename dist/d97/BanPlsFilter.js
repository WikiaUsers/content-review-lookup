$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/ban pls|ban please|ban plz|block pls|block plz|block please|pls ban|plz ban|pls block|plz block/gi, " ");
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/get rekt|rekt|wreckt|shrekt|shrekd|shrek'd|shrek't|rek't|rek'd|rekd/gi, " ");
	}
})