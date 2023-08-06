/* [[Form:Dienstoffizier]] */
(function(mw) {
	'use strict';
	var $content;

	/* Gets the specialization name in the specialization input. */
	function getSpec() {
		return $content.find( '[name="Doffseite[spez]"]' )[0].value.replace(/ /g, '-');
	}

	/* Updates the power list. */
	function getCommonPowers() {
		var spec = getSpec();
		
		for ( var i = 1; i < 14; ++i ) {
			var target = $content.find( '#doff-common-power-' + i )[0];
			if ( spec !== "" ) {
				var source = $content.find( '#doff-common-power-' + spec + i )[0];
				if ( source !== null && source !== target ) {
					target.innerHTML = source.innerHTML;
				} else {
					target.innerHTML = '';
				}
			} else {
				target.innerHTML = '';
			}
			
			if ( target.innerHTML !== '' ) {
				target.style.display = '';
			} else {
				target.style.display = 'none';
			}
		}
	}

	/* Attaches the function that attempts to retrieve the appropriate common powers
		to the form input elements having the given name. */
	function attachPowerEventsToInput( name ) {
		var inputs = $content.find( name );

		for ( var i = 0; i < inputs.length; ++i ) {
			inputs[i].addEventListener( 'change', getCommonPowers, false );
		}
	}

	/* Attaches the function that attempts to retrieve the appropriate common powers
		to the change event of the appropriate form fields. */
	function attachPowerInputEvents() {
		attachPowerEventsToInput( '[name="Doffseite[spez]"]' );
	}

	mw.hook('wikipage.content').add(function(content) {
		var main = content.find('#Dienstoffizierpowers:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		$content = content;
		var olEle = document.createElement('ol');
		olEle.id = 'doff-common-powers';
		for (var i=1; i<14; i++) {
			var liEle = document.createElement('li');
			liEle.id = 'doff-common-power-' + String(i);
			liEle.display = 'none';
			olEle.append(liEle);
		}
		main.outerHTML = olEle.outerHTML;
		attachPowerInputEvents();
		getCommonPowers();
	});
})(window.mediaWiki);