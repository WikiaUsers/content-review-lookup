/* [[Form:Dienstoffizier]] */
(function(mw) {
	'use strict';
	var $content;

	/* Returns an array of image names for the species and gender */
	function getImageNames( species, gender ) {
		var iconNameDiv = $content.find( "#doff-icons-" + species + "-" + gender )[0];

		if ( iconNameDiv !== null && iconNameDiv.innerHTML !== "" ) {
			return iconNameDiv.innerHTML.split(";");
		} else {
			return [];
		}
	}

	/* Takes the image off the button if there was one and hides it. */
	function hideImageButton( index ) {
		var button = $content.find( '#doff-common-headshot-' + index )[0];
	
		button.innerHTML = '';
		button.style.display = 'none';
	}

	/* Gets the species name in the species input. */
	function getSpecies() {
		return $content.find( '[name="Doffseite[spezies]"]' )[0].value.replace(/'/, '_');
	}

	/* Gets the gender from the selected gender input. */
	function getGender() {
		var inputs = $content.find( '[name="Doffseite[geschlecht]"]' );
		
		if ( inputs[0].checked ) return inputs[0].value;
		if ( inputs[1].checked ) return inputs[1].value;
		return '';
	}

	/* Sets the provided image name to the image input */
	function setImageName(ele) {
		var index = ele.srcElement.dataset.index;
		var iconNames = getImageNames( getSpecies( ), getGender( ) );
		var name = iconNames[index].substring(5, iconNames[index].length - 9).replace(/ /g, "_");
		$content.find( '[name="Doffseite[image]"]' )[0].value = name;
	}

	/* Puts the correct image on the button and shows it. */
	function showImageButton( iconName, index ) {
		var button = $content.find( '#doff-common-headshot-' + index );

		var file = iconName.substring(5).replace(/ /g, "_");
		var path = '/Special:FilePath/' + file;

		button.innerHTML = '<img src="' + path + '">';
		button.style.display = '';
	}

	/* Constructs the HTML code for the entire gallery shot. */
	function makeGallery( species, gender ) {
		var iconNames = getImageNames( species, gender );

		for (var i = 1; i <= 40; ++i) {
			if ( i <= iconNames.length ) {
				showImageButton( iconNames[i - 1], i );
			} else {
				hideImageButton( i );
			}
		}
	}

	/* Creates the headshot gallery if there is enough information. */
	function getHeadshots() {
		var spezies = getSpecies();
		var gender = getGender();

		var gallery = $content.find( '#doff-headshot-gallery' );
		gallery.innerNode = makeGallery( spezies, gender );
	}

	/* Attaches the function that attempts to retrieve the appropriate headshots
		to the form input elements having the given name. */
	function attachEventsToInput( name ) {
		var inputs = $content.find('#' + name );

		for ( var i = 0; i < inputs.length; ++i ) {
			inputs[i].addEventListener( 'change', getHeadshots, false );
		}
	}

	/* Attaches the function that attempts to retrieve the appropriate headshots
		to the change event of the appropriate form fields. */
	function attachInputEvents() {
		attachEventsToInput( 'Doffseite[species]' );
		attachEventsToInput( 'Doffseite[geschlecht]' );
	}

	mw.hook('wikipage.content').add(function(content) {
		var main = content.find('#Dienstoffiziersymbole:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		$content = content;
		main.id = 'doff-headshot-gallery';
		for (var i=1; i<41; i++) {
			var button = document.createElement('button');
			button.id = 'doff-common-headshot-' + String(i);
			button.style.display = 'none';
			button.type = 'button';
			button.dataset.index = i - 1;
			button.addEventListener('click', setImageName);
			main.append(button);
		}

		attachInputEvents();
		getHeadshots();
	});
})(window.mediaWiki);