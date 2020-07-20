// Objectionable content filter
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/secretcaves|the-off-topic-xd|bronies.wikia|fegit|faggot|fagot|phaggot| fag |nigger|nigga|tranny|shemale|dyke|kike|niglet|nignog|fgt|nig-nog|retard|encyclopediadramatica.es\/offended|papa-louie-fan-contests-games/gi, '***');
	}
})

// END Censor