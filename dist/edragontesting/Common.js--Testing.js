$(function () {
	if ($('#ClashRoyaleLink').length) {
		if ($('.page-header__languages').length) {
			$('<span class="ClashRoyaleLink hovernav hidden" style="display:inline-block; position: relative; top: 8px; margin: -6px 10px;"><a href="https://clashroyale.fandom.com/wiki/"><img src="https://static.wikia.nocookie.net/clashofclans/images/6/6c/Clash_Royale_Logo.png" alt="Clash_Royale_Logo.png" width="97px"></a></span>').insertBefore('.page-header__languages');
		}else {
			$('<span class="ClashRoyaleLink hovernav hidden" style="display:inline-block; position: relative; top: 8px; margin: -6px 10px;"><a href="https://clashroyale.fandom.com/wiki/"><img src="https://static.wikia.nocookie.net/clashofclans/images/6/6c/Clash_Royale_Logo.png" alt="Clash_Royale_Logo.png" width="97px"></a></span>').insertBefore('.page-header__top');
		}
		$('#ClashRoyaleLink').remove();
	}
});