// This is a weapon stats calculator, which calculates how much speed and damage a weapon has
// based on the number of teeth, feathers and booze applied to it. (Currently Work In Progress).
// Made by this bloke: https://theforest.fandom.com/User:Daveyg103.

// Page: [[Verbesserungen]]
// Usage: <div class="StatCalc" style="display:none"></div>
( function ( mw ) {
	'use strict';

	var i18n = {
			club: 'Keule',
			cAxe: 'Handgemachte Axt',
			cClub: 'Handgemachte Keule',
			machete: 'Machete',
			mAxe: 'Moderne Axt',
			pAxe: 'Flugzeugaxt',
			rAxe: 'Rostige Axt',
			tennis: 'Tennisschläger',
			uRock: 'Verbesserter Stein',
			uStick: 'Verbesserter Stock',
			headerWeapon: 'Wähle eine Waffe',
			headerFeather: 'Anzahl der Federn',
			headerTeeth: 'Anzahl der Zähne',
			headerGlass: 'Anzahl von Schnäpsen',
			range: 'Zwischen 0 und 30',
			outputSpeed: 'Geschw.:',
			outputDamage: 'Schaden:',
			outputBlock: 'Block:',
			button: 'Statistik berechnen',
			errorWeapon: 'Bitte wähle eine Waffe.',
			errorNaN: 'Alle Eingaben müssen Zahlen sein.',
			errorNegative: 'Wie kannst du eine negative Verbesserung haben.',
			errorZero: 'Mindestens eine Verbesserung muss größer als 0 sein.',
			errorAmount: 'Die gesamte Anzahl an Verbesserungen darf 30 nicht überschreiten.'
		},
		weaponStats = {
		// speed, damage, block
			club: [ 1, 7.5, 10 ],
			cAxe: [ 1, 5.5, 9 ],
			cClub: [ 2, 7, 9 ],
			machete: [ 7.25, 5.25, 0 ],
			mAxe: [ 5, 7, 9 ],
			pAxe: [ 5.5, 5.25, 2 ],
			rAxe: [ 3.5, 6, 10 ],
			tennis: [ 5, 2, 5.5 ],
			uRock: [ 5, 7, 0 ],
			uStick: [ 7, 2, 8 ]
		},
		html =
		'<div>' +
			'<div>' +
				'<p>' + i18n.headerWeapon + '</p>' +
				'<select class="weaponList">' +
					'<option value="" selected disabled>-</option>' +
					'<option value="club">' + i18n.club + '</option>' +
					'<option value="cAxe">' + i18n.cAxe + '</option>' +
					'<option value="cClub">' + i18n.cClub + '</option>' +
					'<option value="machete">' + i18n.machete + '</option>' +
					'<option value="mAxe">' + i18n.mAxe + '</option>' +
					'<option value="pAxe">' + i18n.pAxe + '</option>' +
					'<option value="rAxe">' + i18n.rAxe + '</option>' +
					'<option value="tennis">' + i18n.tennis + '</option>' +
					'<option value="uRock">' + i18n.uRock + '</option>' +
					'<option value="uStick">' + i18n.uStick + '</option>' +
				'</select>' +
				'<div>' +
					'<p>' + i18n.headerFeather + '</p>' +
					'<input class="feather" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="' + i18n.range + '">' +
					'<p>' + i18n.headerTeeth + '</p>' +
					'<input class="teeth" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="' + i18n.range + '">' +
					'<p>' + i18n.headerGlass + '</p>' +
					'<input class="glass" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="' + i18n.range + '">' +
				'</div>' +
			'</div>' +
			'<div class="statsSection">' +
				'<div class="baseStats">' +
					'<div class="speed">' +
						'<p>' + i18n.outputSpeed + ' <span class="infoSpeed">0</span></p>' +
						'<div class="statBar speedBar"></div>' +
					'</div>' +
					'<div class="damage">' +
						'<p>' + i18n.outputDamage + ' <span class="infoDamage">0</span></p>' +
						'<div class="statBar damageBar"></div>' +
					'</div>' +
					'<div class="block">' +
						'<p>' + i18n.outputBlock + ' <span class="infoBlock">0</span></p>' +
						'<div class="statBar blockBar"></div>' +
					'</div>' +
				'</div>' +
				'<div>' +
					'<button class="calcButton">' + i18n.button + '</button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="statsOutput"></div>';
	mw.hook( 'wikipage.content' ).add( function ( $content ) {
		$content.find( '.StatCalc:not(.loaded)' ).each( function ( _, ele ) {
			var e;
			ele.classList.add( 'loaded' );
			ele.style.removeProperty( 'display' );
			ele.innerHTML = html;
			e = {
				option: ele.querySelector( '.weaponList' ),
				feather: ele.querySelector( '.feather' ),
				teeth: ele.querySelector( '.teeth' ),
				glass: ele.querySelector( '.glass' ),
				output: ele.querySelector( '.statsOutput' ),
				speedBar: ele.querySelector( '.speedBar' ),
				damageBar: ele.querySelector( '.damageBar' ),
				blockBar: ele.querySelector( '.blockBar' ),
				infoSpeed: ele.querySelector( '.infoSpeed' ),
				infoDamage: ele.querySelector( '.infoDamage' ),
				infoBlock: ele.querySelector( '.infoBlock' )
			};
			function updateBars() {
				var speed = Number( e.infoSpeed.textContent ),
					damage = Number( e.infoDamage.textContent ),
					block = Number( e.infoBlock.textContent ),
					factor = 10;
				e.speedBar.style.width = ( speed * factor ) + 'px';
				e.damageBar.style.width = ( damage * factor ) + 'px';
				e.blockBar.style.width = ( block * factor ) + 'px';
			}
			ele.getElementsByClassName( 'calcButton' )[ 0 ].addEventListener( 'click', function () {
				var f = Number( e.feather.value ),
					t = Number( e.teeth.value ),
					g = Number( e.glass.value ),
					o = e.option.value,
					damage,
					speed;
				if ( o === '' ) {
					e.output.textContent = i18n.errorWeapon;
					return;
				}
				e.output.textContent = '';
				if ( isNaN( f ) || isNaN( t ) || isNaN( g ) ) {
					e.output.textContent = i18n.errorNaN;
				} else if ( f < 0 || t < 0 || g < 0 ) {
					e.output.textContent = i18n.errorNegative;
				} else if ( ( f === 0 && t === 0 && g === 0 ) ) {
					e.output.textContent = i18n.errorZero;
				} else if ( ( f + t + g ) > 30 ) {
					e.output.textContent = i18n.errorAmount;
				} else {
					damage = (
						weaponStats[ o ][ 1 ] + ( ( t * 0.1 ) + ( g * 0.2 ) ) - ( f * 0.05 )
					).toFixed( 2 );
					speed = (
						weaponStats[ o ][ 0 ] - ( ( t * 0.05 ) + ( g * 0.1 ) ) + ( f * 0.1 )
					).toFixed( 2 );
					if ( damage < 0 ) {
						damage = 0;
					}
					if ( speed < 0 ) {
						speed = 0;
					}
					e.infoSpeed.textContent = speed;
					e.infoDamage.textContent = damage;
					updateBars();
				}
			} );
			e.option.addEventListener( 'change', function ( event ) {
				var value = event.target.value;
				e.infoSpeed.textContent = weaponStats[ value ][ 0 ];
				e.infoDamage.textContent = weaponStats[ value ][ 1 ];
				e.infoBlock.textContent = weaponStats[ value ][ 2 ];
				updateBars();
			} );
		} );
	} );
}( window.mediaWiki ) );