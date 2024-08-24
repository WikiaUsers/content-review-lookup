function getRatings() {
	return new Promise(function(resolve, reject) {
		return (new mw.Api()).get({
			action: 'parse',
			prop: 'wikitext',
			page: 'MediaWiki:Custom-Rating.json',
			formatversion: 2
		}).then(function(res) {
			return JSON.parse(res.parse.wikitext);
		}).then(resolve)
		.catch(reject);
	});
}

function createRating() {
	var input1 = new OO.ui.TextInputWidget( { 
		placeholder: 'A form text field'
	} ),
	input2 = new OO.ui.TextInputWidget( { 
		placeholder: 'A form text field'
	} ),
	input3 = new OO.ui.TextInputWidget( { 
		placeholder: 'A form text field with help'
	} ),
	input4 = new OO.ui.CheckboxInputWidget( {
		selected: true
	} ),
			
	// Create a fieldset layout.
	fieldset = new OO.ui.FieldsetLayout( { 
		label: 'FieldsetLayout: Examples of label alignment and help text',
		classes: [ 'container' ]
	} );

	// Add field layouts that contain the form elements to the fieldset. Items can 
	// also be specified with the FieldsetLayout's `items` config option: 
	fieldset.addItems( [
		new OO.ui.FieldLayout( input1, { 
			label: 'Top-aligned label, providing fastest scanability', 
			align: 'top', 
			help: 'A bit of help',
			helpInline: true
		} ),
			
		new OO.ui.FieldLayout( input2, {
			label: 'Left-aligned label, the default', 
			align: 'left' 
		} ),
	
		new OO.ui.FieldLayout( input3, { 
			label: 'Right-aligned label',
			align: 'right' 
		} ),
	
		new OO.ui.FieldLayout( input4, { 
			label: 'Inline label', 
			align: 'inline' 
		} )
	] );

	mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function() {
		OO.ui
			.alert(fieldset.$element, { size: 'medium' })
			.done(function () {
	    		mw.notify( 'User closed the dialog.', { type: 'info' } );
			});
	});
}

function renderRatingButton(container) {
	getRatings().then(function(ratings) {
		var ratingLabel, btn;
		container.textContent = '';
		container.style.margin = '5px 2px';
		var allRatings = ratings.filter(function(rating) {
			return rating.pageName === container.dataset.name;
		});
		var myRating = allRatings.find(function(rating) {
			return rating.username === mw.user.getName();
		});
		var otherRatings = allRatings.filter(function(rating) {
			return rating.username !== mw.user.getName();
		});
		var formatter = new Intl.NumberFormat('de-DE', {
		    minimumFractionDigits: 2,
		    maximumFractionDigits: 2
		});
		var average = otherRatings.reduce(function(carry, rating) {
			return carry + rating.rating;
		}, 0) / otherRatings.length;

		if (typeof myRating === 'undefined') {
			ratingLabel = Object.assign(document.createElement('p'), {
				textContent: otherRatings.length
					? 'Es haben bereits ' + otherRatings.length + ' Benutzer*innen eine Bewertung (Ø ' + formatter.format(average) + ') abgegeben'
					: 'Es wurde noch keine Bewertung abgegeben. Sei die*der erste!',
			});
			ratingLabel.style.marginBottom = 0;
			container.append(ratingLabel);
			btn = Object.assign(document.createElement('button'), {
				textContent: 'Bewerte "' + container.dataset.name + '" (' + container.dataset.type + ')',
				//title: 'Episode "' + container.dataset.name + '" als ' + (episodes.has(container.dataset.name) ? 'noch nicht angesehen' : 'angesehen') + ' markieren',
				className: 'wds-button wds-is-secondary'
			});
			btn.addEventListener('click', createRating.bind(window, btn, container.dataset.type, container.dataset.name, null));
			container.append(btn);
		} else {
			ratingLabel = Object.assign(document.createElement('p'), {
				textContent: 'Mit ' + myRating.rating + '/5 (Ø ' + formatter.format(average) + ') bewertet',
			});
			ratingLabel.style.marginBottom = 0;
			container.append(ratingLabel);
			btn = Object.assign(document.createElement('button'), {
				textContent: 'Bewertung von "' + container.dataset.name + '" (' + container.dataset.type + ') anpassen',
				//title: 'Episode "' + container.dataset.name + '" als ' + (episodes.has(container.dataset.name) ? 'noch nicht angesehen' : 'angesehen') + ' markieren',
				className: 'wds-button wds-is-secondary'
			});
			btn.addEventListener('click', createRating.bind(window, btn, container.dataset.type, container.dataset.name, myRating));
			container.append(btn);
		}
	});
}

//mw.hook("wikipage.content").add(function($content) {
document.addEventListener('DOMContentLoaded', function() {
    var ratingBtns = document.getElementsByClassName('rating-button');
    for (var i = 0; i < ratingBtns.length; i++) {
    	renderRatingButton(ratingBtns[i]);
    }
});