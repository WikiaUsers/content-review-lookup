// Dies ist ein Schadens Rechner, welcher berechnet wie viel % an Bonus Schaden der Spieler erhält, basierend auf seiner Stärke.
// Made by https://theforest.fandom.com/User:Daveyg103.

// Page: [[Stärke]]
// Usage: <div class="damageCalc" style="display:none"></div>
mw.hook( 'wikipage.content' ).add( function ( $content ) {
	'use strict';
	$content.find( '.damageCalc:not(.loaded)' ).each( function ( _, ele ) {
		var output, input;
		ele.classList.add( 'loaded' );
		ele.style.removeProperty( 'display' );
		ele.innerHTML =
			'<p>Gib deine Stärke ein</p>' +
			'<input class="damageCalcInput" type="text" placeholder="Stärke" maxlength="2" autocomplete="off" spellcheck="false">' +
			'<button class="damageCalcButton">Schaden</button>' +
			'<p>Bonus Schaden</p>' +
			'<span class="damageCalcOutput">+0%</span>';

		output = ele.querySelector( '.damageCalcOutput' );
		input = ele.querySelector( '.damageCalcInput' );
		ele.querySelector( '.damageCalcButton' ).addEventListener( 'click', function () {
			var str = Number( input.value );
			if ( isNaN( str ) ) {
				output.textContent = 'Stärke muss eine Nummer sein.';
			} else if ( str < 10 || str > 99 ) {
				output.textContent = 'Stärke muss zwischen 10 und 99 liegen.';
			} else {
				output.textContent = '+' + ( str * 100 / 140 ).toFixed( 2 ) + '%';
			}
		} );
	} );
} );