// Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur.
// Commentaires en anglais.

/* replace the title when
   snbz category is detected */
/** SN: BZ (title) **/
if($('a[href="/fr/wiki/Cat%C3%A9gorie:Subnautica:_Below_Zero"]').length) {
	// Title changing
	const titles = $('.fandom-community-header__community-name');
	if (titles.length) {
		/* change title */
		titles.first().html('Wiki <span class="wikititle_sub_part">Sub</span>nautica: <span class="wikititle_bz_part">Below Zero</span>');
	}
} else {
	// Logo changing
	const logos = $('a.fandom-community-header__image img');
	if (logos.length) {
		logos.first().attr('src', 'https://static.wikia.nocookie.net/subnautica/images/b/be/Peeper_Fauna.png/revision/latest?cb=20180202132712&path-prefix=fr').css('left', '80px');
	}
	// Title changing
	const titles = $('a.fandom-community-header__community-name');
	if (titles.length) {
		titles.first().html('Wiki <span class="wikititle_sub_part">Sub</span>nautica');
	}
}