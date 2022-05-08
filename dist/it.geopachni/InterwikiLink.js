// Set the 'label' option to plain text, a jQuery selection of elements, 
// or a function. 
var buttonWithLabel = new OO.ui.ButtonWidget( { 
	label: 'Button Label'
} );
$( document.body ).append( buttonWithLabel.$element );

var buttonHome = new OO.ui.ButtonWidget( {
	label: 'Click Me!',
	href: 'https://www.mediawiki.org',
	target: '_blank'
} );    
$( document.body ).append( buttonHome.$element );

// Create a popup button. The 'popup' config contains the 
// configurations that will be passed to the popup.
var popupButton = new OO.ui.PopupButtonWidget( { 
		label: 'Popup button with options', 
		icon: 'menu', 
		popup: {
			$content: $( '<p>Additional options here.</p>' ),
			padded: true,
			align: 'forwards'
		}
	} );
// Append the button to the DOM.
$( document.body ).append( popupButton.$element );