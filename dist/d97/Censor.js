// Objectionable content filter
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/fajit|fegit|faggot|fagot|phaggot| fag |fags|nigger|nigga|tranny|shemale|she male|she-male|dyke|kike|niglet|nignog|fgt|nig-nog|negas|ngga|cishet|retard|newfag|oldfag|encyclopediadramatica.es\/offended|\/anne.jpg/gi, '***');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/could care less/gi, 'couldn\'t care less');
	}
})

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/fuggin/gi, 'fuckin');
	}
})

// END Censor

console.log('[CENSOR] Loaded');