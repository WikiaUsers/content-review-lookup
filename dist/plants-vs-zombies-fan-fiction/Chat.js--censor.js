//Chat censor filter. Some inappropriate words are excluded to prevent false positives. For example, "retard", since it may be used for "flame retardant", and "ass" may be used in "assessment", thus false  positives WILL occur if they're censored
//Additonally there are some words that you shouldn't add. They're mostly abbreviated swears, but as long as it isnt directly written, it's ok. crap and damn are NOT swear words, even though some ppl say so.
/* EXCLUDED: COCK, COON, DICK, ASS, FAG, RETARD, GAY, CUM, DAGO, PAKI, PAKIS, INDON, PRICK, CRACK, TIT, HELL, PENETRATE, PENETRATION, HARDCORE */
//Dago is actually a derogatory term for Italians, BUT IT'S ALSO AN AREA IN BANDUNG, INDONESIA.
//Indon is a derogatory term for Indonesians, but it will also censor "Indonesia".
//Paki is a derogatory term for Pakistan people, but itll also censor "Pakistan".
//Dick can be used as a name, such as "Phillip K. Dick". We dont want ppl to complain about that writer getting censored here.
//Tit is used in the words "Titanium" and "Titanic".
//Cum is used on the phrase "cum laude"
//Cock is used in the words "cocktail", "cockpit", "cockroach", etc.
//The words penetrate and penetration have a vulgar meaning, but there are some inoffensive uses of it, such as "penetrates body armor".
//Hardcore is a Minecraft game mode, besides a vulgar word.

//Do not add these words. Supercell censored most of the words below. However, I dont know exactly why.
/* DO NOT ADD: CRAP, DAMN, 69, 420, 666, WTF, STFU, RTFM, FUBAR, SNAFU, FML, SSDD, HITLER, JACK THE RIPPER, JACKTHERIPPER, DAHMER, JEFFREY DAHMER, JEFFREYDAHMER, ADOLF HITLER, ADOLFHITLER, SATAN, email, esome, eway, ISIS, SWASTIKA, mary jane, maryjane, june 4, poop, poo, domination */
//Personally, I dont think that swastika's even offensive.
//And why the hell is email, esome, and eway censored? Guess theyre just random words added to the filter. But they seem to censor email for privacy reasons.
//Not sure why Hitler, Jack the Ripper, or Dahmer's censored.
//I dont know why domination is a bad word. Theres a game titled Downhill Domination and it's just a normal cycling race.

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/kyke|fuck|shit|shat|blowjob|lesbian|bisexual|rimjob|handjob|bitch|moron|pussy|whore|slut|clit|erection|piss|transgender|sapiosexual|homosexual|transexual|penis|vagina|asshole|nigger|nigga|beaner|faggot|cocksucker|threesome|cunnilingus|carpetmunch|dominatrix|jizz|sperm|testicle|ejaculate|ejaculation|cumshot|redtube|pornhub|tube8|mysearchdial|hao123|mywot|bratasoe|proek|kemenkominfo|menkominfo|/gi, '(fail)');
	}
})