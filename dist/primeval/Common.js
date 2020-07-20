function MainPageLink() {
		$('.mainpage-primeval-1').wrap('<a href="/wiki/Primeval"></a>');
		$('.mainpage-newworld-1').wrap('<a href="/wiki/Primeval:_New_World"></a>');
}

addOnloadHook(MainPageLink);