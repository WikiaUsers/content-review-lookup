// Grammar fixer

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/offer/gi, 'o­ffer');
	}
})
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/could of/gi, 'could have');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/would of/gi, 'would have');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/should of/gi, 'should have');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/must of/gi, 'must have');
	}
})

// END Grammar

// Text-based emoticons

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(donger\)/gi, 'ヽ༼ຈل͜ຈ༽ﾉ');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(lenny\)/gi, '( ͡° ͜ʖ ͡°)');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(praise\)/gi, '༼ つ ◕_◕ ༽つ');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(disappointed\)/gi, 'ಠ_ಠ');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(denko\)/gi, '(´・ω・`)');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/\(pointynoseman\)/gi, '(˚ㄥ_˚)');
	}
})

console.log("[TEXT] Text emotes loaded");
// END Text-based emoticons