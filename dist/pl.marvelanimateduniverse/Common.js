/* Autor: Szynka013 & Luksiak */
// DODATKOWE PRZYCISKI W NAWIGACJI by Szynka013
$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Project:O nas">O nas</a></li> <li><a class="subnav-2a" href="/wiki/Project:Regulamin">Zasady</a></li> <li><a class="subnav-2a" href="/wiki/Project:Administratorzy">Admini</a></li>');


// PRZYCISKI NAWIGACYJNE STRON PROJEKTU by Lukisiak
$('.mppabout').on('click', function() {
    location.href = 'http://pl.marvelanimateduniverse.wikia.com/wiki/Marvel_Animated_Universe_Wikia:O_nas'
});

$('.mpprules').on('click', function() {
    location.href = 'http://pl.marvelanimateduniverse.wikia.com/wiki/Marvel_Animated_Universe_Wikia:Regulamin'
});

$('.mppadmin').on('click', function() {
    location.href = 'http://pl.marvelanimateduniverse.wikia.com/wiki/Marvel_Animated_Universe_Wikia:Administratorzy'
});

$('.mpphelp').on('click', function() {
    location.href = 'http://pl.marvelanimateduniverse.wikia.com/wiki/Pomoc:Spis_treści'
});


// LOKALIZACJA IKON by pl.arrow
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});