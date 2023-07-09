( function ( mw, array ) {

/**
 * Delay between two automatic cycling frames.
 */
const autoInterval = 1500;

/**
 * Whether automatic cycling has been enabled, i.e. at least one automatic
 * slideshow is enabled or was enabled before the last slide update.
 */
var cyclingEnabled = false;

/**
 * The click events added to elements in a slideshow.
 * @typedef ClickEvents
 * @property {EventListener}               [slide] On all slides.
 * @property {Map<Element, EventListener>} titles  On each slide title.
 */

/**
 * The click events added to each slideshow.
 * @type {Map<Element, ClickEvents>}
 */
const clickEvents = new Map();

/**
 * The list of enabled slideshows cycling automatically.
 * @type {Element[]}
 */
const auto = [];

/**
 * Called when some text should be processed.
 * @param {JQuery} $content The content element to process.
 */
function onContentLoaded( $content ) {
	init( $content[ 0 ] );
}

/**
 * Enables all slideshows in a container.
 * @param {Element} container The container.
 * @returns {Element[]} The enabled slideshows in the container.
 */
function init( container ) {
	return array.filter.call(
		container.getElementsByClassName( 'infobox2-slideshow' ),
		enable
	);
}

/**
 * Enables a slideshow.
 * @param {HTMLElement} slideshow The slideshow to enable.
 * @returns True if the slideshow is now enabled, false if it is now
 *          disabled.
 */
function enable( slideshow ) {
	if (
		!slideshow ||
		slideshow.classList.contains( 'infobox2-slideshow-disabled' )
	) {
		return false;
	}

	if ( isEnabled( slideshow ) ) {
		return true;
	}

	const slides = getSlides( slideshow );
	if ( slides.length < 2 ) {
		disable( slideshow );
		return false;
	}

	var titleFound = false;

	/** @type {ClickEvents} */
	const newClickEvents = { titles: new Map() };

	slideshow.classList.add( 'infobox2-slideshow-enabled' );

	const titlebar = document.createElement( 'div' );
	titlebar.classList.add( 'infobox2-slideshow-titlebar' );

	/** @type {Element[]} */
	const titles = [];
	for ( var i = 0; i < slides.length; ++i ) {
		const title = enableTitle( slides[ i ], newClickEvents );
		titles.push( title );
		if ( title ) {
			titleFound = true;
		}
	}

	if ( titleFound ) {
		const as = titlebar.getElementsByTagName( 'a' );
		while ( as.length ) {
			unwrap( as[ 0 ] );
		}
	}

	const activeIndex = slideshow.classList.contains( 'dlc-slideshow' ) ? slides.length - 1 : 0;
	const activeSlide = slides[ activeIndex ];
	const activeTitle = titles[ activeIndex ];

	activeSlide.classList.add( 'infobox2-slide-active' );
	if ( activeTitle.classList.contains( 'infobox2-slide-title' ) ) {
		activeTitle.classList.add( 'infobox2-slide-title-active' );
	}

	if (
		!slideshow.classList.contains( 'infobox2-slideshow-hidden' ) &&
		!slideshow.getElementsByClassName( 'infobox2-slideshow' ).length
	) {
		newClickEvents.slide = function () { cycle( slideshow ); };
		for ( i = 0; i < slides.length; ++i ) {
			slides[ i ].addEventListener( 'click', newClickEvents.slide );
		}
	}

	const titlePlaceholder = document.createElement( 'span' );
	titlePlaceholder.classList.add( 'infobox2-slide-title-placeholder' );
	for ( i = 0; i < titles.length; ++i ) {
		titles[ i ].replaceWith( titlePlaceholder.cloneNode( true ) );
		titlebar.appendChild( titles[ i ] || document.createElement( 'span' ) );
	}

	if ( slideshow.classList.contains( 'infobox2-slideshow-auto' ) ) {
		makeAuto( slideshow );
	}

	clickEvents.set( slideshow, newClickEvents );

	if ( titleFound ) {
		slideshow.insertBefore( titlebar, slideshow.firstChild );
	}
	setMinHeight( slideshow );

	return true;
}

/**
 * Makes a slideshow cycle slides automatically.
 * @param {Element} slideshow The slideshow.
 */
function makeAuto( slideshow ) {
	slideshow.classList.add( 'infobox2-slideshow-auto' );
	if ( !isEnabled( slideshow ) || auto.indexOf( slideshow ) !== -1 ) {
		return;
	}

	auto.push( slideshow );
	if ( cyclingEnabled ) {
		return;
	}

	cyclingEnabled = true;
	setTimeout( runAutoInterval, autoInterval );
}

/**
 * Disables a slideshow.
 * @param {Element} slideshow The slideshow to disable.
 */
function disable( slideshow ) {
	if ( !slideshow || slideshow.classList.contains( 'infobox2-slideshow-disabled' ) ) {
		return;
	}

	/** @type {number} */
	var i;
	const slides = getSlides( slideshow );

	slideshow.classList.add( 'infobox2-slideshow-disabled' );

	if ( !isEnabled( slideshow ) ) {
		for ( i = 0; i < slides.length; ++i ) {
			const title = getSlideTitle( slides[ i ] );
			if ( title ) {
				title.remove();
			}
		}
		return;
	}

	const titleBar         = getTitleBar( slideshow );
	const localClickEvents = clickEvents.get( slideshow );

	slideshow.classList.remove( 'infobox2-slideshow-enabled' );

	for ( i = 0; i < slides.length; ++i ) {
		const slide = slides[ i ];
		slide.classList.remove( 'infobox2-slide-active' );
		slide.removeEventListener( 'click', localClickEvents.slide );
		if ( !titleBar ) {
			continue;
		}

		const title = getSlideTitle( slide );
		if ( !title ) {
			continue;
		}

		title.classList.remove( 'infobox2-slide-title-active' );

		const titlePlaceholders = slide.getElementsByClassName( 'infobox2-slide-title-placeholder' );
		if ( titlePlaceholders.length ) {
			titlePlaceholders[ 0 ].replaceWith( title );
		}

		title.removeEventListener( 'click', localClickEvents.titles.get( title ) );
	}

	if ( titleBar ) {
		titleBar.remove();
	}

	clickEvents.delete( slideshow );
}

/**
 * Sets a slide as the active one of a slideshow.
 * @param {Element} slide   The slide to set as active one.
 * @param {Element} [title] The title of the slide.
 */
function setActiveSlide( slide, title ) {
	if ( !slide ) {
		return;
	}

	const slideshow = slide.parentElement;

	const activeSlide = getActiveSlide( slideshow );
	if ( activeSlide ) {
		activeSlide.classList.remove( 'infobox2-slide-active' );
	}
	slide.classList.add( 'infobox2-slide-active' );

	const titlebar = getTitleBar( slideshow );
	if ( !titlebar ) {
		return;
	}

	var activeTitle = getSlideTitle( activeSlide );
	if ( activeTitle ) {
		activeTitle.classList.remove( 'infobox2-slide-title-active' );
	}

	if ( !title ) {
		title = getSlideTitle( slide );
	}
	if ( title && title.classList.contains( 'infobox2-slide-title' ) ) {
		title.classList.add( 'infobox2-slide-title-active' );
	}
}

/**
 * Sets the next slide as the active one of a slideshow.
 * @param {Element} slideshow The slideshow.
 */
function cycle( slideshow ) {
	if ( !slideshow ) {
		return;
	}

	const activeSlide = getActiveSlide( slideshow );
	setActiveSlide(
		getNextSiblingByClassName( activeSlide, 'infobox2-slide' ) ||
		getChildByClassName( slideshow, 'infobox2-slide' )
	);
}

/**
 * Removes a slide from a slideshow.
 * @param {Element} slide The slide to remove.
 */
function removeSlide( slide ) {
	if ( !slide ) {
		return;
	}

	const title = getSlideTitle( slide );
	slide.remove();

	if ( title ) {
		title.remove();
	}

	const slideshow = slide.parentElement;
	if ( getSlides( slideshow ).length < 2 ) {
		disable( slideshow );
	}
}

/**
 * Indicates whether a slideshow is enabled.
 * @param {Element} slideshow The slideshow.
 * @returns True if the slideshow is enabled, false otherwise.
 */
function isEnabled( slideshow ) {
	return slideshow.classList.contains( 'infobox2-slideshow-enabled' );
}

/**
 * Gets all slides of a slideshow.
 * @param {Element}       slideshow The slideshow to enable.
 * @returns An array of all slides of the slideshow.
 */
function getSlides( slideshow ) {
	return getChildrenByClassName( slideshow, 'infobox2-slide' );
}

/**
 * Gets the currently active slide of a slideshow.
 * @param {Element} slideshow The slideshow to enable.
 * @returns The currently active slide of the slideshow, null if there is
 *          not any.
 */
function getActiveSlide( slideshow ) {
	return getChildByClassName( slideshow, 'infobox2-slide-active' );
}

/**
 * Gets the title bar of a slideshow.
 * @param {Element} slideshow The slideshow.
 * @returns The title bar of the slideshow, null if it does not have any.
 */
function getTitleBar( slideshow ) {
	return getChildByClassName( slideshow, 'infobox2-slideshow-titlebar' );
}

/**
 * Gets the title of a slide.
 * @param {Element} slide The slide.
 * @returns The title of the slide, null if it does not have any.
 */
function getSlideTitle( slide ) {
	if ( !slide ) {
		return null;
	}

	const slideshow = slide.parentElement;
	const titlebar  = getTitleBar( slideshow );
	if ( titlebar ) {
		return titlebar.children[
			getSlides( slideshow ).indexOf( slide )
		];
	}

	const titles = slide.getElementsByClassName( 'infobox2-slide-title' );
	for ( var j = 0; j < titles.length; ++j ) {
		const title = titles[ j ];
		if ( !isInSlideshow( title ) ) {
			return title;
		}
	}

	return null;
}

/**
 * Gets a slide from its title.
 * @param {Element} title The title.
 * @returns The associated slide, null if there is not any.
 */
function getTitleSlide( title ) {
	if ( !title ) {
		return null;
	}

	var parent = title.parentElement;
	if ( !parent ) {
		return null;
	}

	if ( parent.classList.contains( 'infobox2-slideshow-titlebar' ) ) {
		const index = array.slice.call( parent.children ).indexOf( title );
		return getSlides( parent.parentElement )[ index ];
	}

	do {
		if ( parent.classList.contains( 'infobox2-slide' ) ) {
			return parent;
		}
		parent = parent.parentElement;
	} while ( parent );

	return null;
}

/**
 * Enables the click action from a title to its slide.
 * @param {Element}     slide       The slide.
 * @param {ClickEvents} clickEvents The click events of the slideshow.
 * @returns The title of the slide, null if there is not any.
 */
function enableTitle( slide, clickEvents ) {
	const title = getSlideTitle( slide );
	if ( !title ) {
		return null;
	}

	const click = function () {
		if ( title.classList.contains( 'infobox2-slide-title-active' ) ) {
			return;
		}
		setActiveSlide(
			getTitleSlide( title ),
			title
		);
	};

	clickEvents.titles.set( title, click );
	title.addEventListener( 'click', click );

	return title;
}

/**
 * Clycles slides of all enabled slideshows.
 */
function runAutoInterval() {
	if ( !auto.length ) {
		cyclingEnabled = false;
		return;
	}

	auto.forEach( cycle );

	setTimeout( runAutoInterval, autoInterval );
}

/**
 * Sets a minimum height to a slideshow to prevent other elements from
 * moving on the page while switching slides.
 * @param {HTMLElement} slideshow The slideshow.
 */
function setMinHeight( slideshow ) {
	if ( !slideshow ) {
		return;
	}

	const activeSlide = getActiveSlide( slideshow );
	if ( !activeSlide ) {
		return;
	}

	var minHeight = 0;

	activeSlide.classList.remove( 'infobox2-slide-active' );

	const slides = getSlides( slideshow );
	for ( var j = slides.length - 1; j >= 0; --j ) {
		slides[ j ].classList.add( 'infobox2-slide-active' );
		minHeight = Math.max(
			minHeight,
			slideshow.getBoundingClientRect().height
		);
		slides[ j ].classList.remove( 'infobox2-slide-active' );
	}

	activeSlide.classList.add( 'infobox2-slide-active' );

	slideshow.style.minHeight = minHeight + 'px';
}

/**
 * Indicates whether an element is in a slideshow.
 * @param {Element} element   The element.
 * @param {Element} [container] The container (one of the parents of the
 *                              element) in which the search will be done,
 *                              the entire hierarchy otherwise.
 * @returns True if the element is in a slideshow, false otherwise.
 */
function isInSlideshow( element, container ) {
	var parent = element.parentElement;

	while ( parent != container ) { // not !==, container can be undefined
		if ( parent.classList.contains( 'infobox2-slideshow' ) ) {
			return false;
		}
		parent = parent.parentElement;
	}

	return true;
}

/**
 * Gets the first element following an element which has a given class.
 * @param {Element} element   The element.
 * @param {string}  className The class name.
 * @returns An element following the given element which has the given
 *          class, null if there is not any.
 */
function getNextSiblingByClassName( element, className ) {
	element = element.nextElementSibling;

	while ( element ) {
		if ( element.classList.contains( className ) ) {
			return element;
		}
		element = element.nextElementSibling;
	}

	return null;
}

/**
 * Gets the first element within a container which has a given class.
 * @param {Element} container The container.
 * @param {string}  className The class name.
 * @returns An element from the container which has the given class, null
 *          if there is not any.
 */
function getChildByClassName( container, className ) {
	if ( !container ) {
		return null;
	}

	const elements = container.getElementsByClassName( className );
	for ( var i = 0; i < elements.length; ++i ) {
		if ( elements[ i ].parentElement === container ) {
			return elements[ i ];
		}
	}

	return null;
}

/**
 * Gets all elements within a container which have a given class.
 * @param {Element} container The container.
 * @param {string}  className The class name.
 * @returns An array of all elements from the container which have the
 *          given class.
 */
function getChildrenByClassName( container, className ) {
	if ( !container ) {
		return [];
	}

	/** @type {Element[]} */
	const list     = [];
	const elements = container.getElementsByClassName( className );

	for ( var i = 0; i < elements.length; ++i ) {
		if ( elements[ i ].parentElement === container ) {
			list.push( elements[ i ] );
		}
	}

	return list;
	/*
	var list    = [],
	    element = container.firstElementChild;
	while ( element ) {
		if ( element.classList.contains( className ) ) {
			list.push( element );
		}
		element = element.nextElementSibling;
	}
	return list;
	*/
}

/**
 * Removes an element, leaving its content in place.
 * @param {Element} element The element to remove.
 */
function unwrap( element ) {
	const parent = element.parentElement;
	if ( !parent ) {
		return;
	}

	var childNode = element.firstChild;
	if ( !childNode ) {
		element.remove();
		return;
	}

	while ( childNode ) {
		parent.insertBefore( childNode, element );
		childNode = element.firstChild;
	}

	element.remove();
}

module.exports = {
	init: init,
	enable: enable,
	makeAuto: makeAuto,
	disable: disable,
	setActiveSlide: setActiveSlide,
	cycle: cycle,
	removeSlide: removeSlide,
	isEnabled: isEnabled,
	getSlides: getSlides,
	getActiveSlide: getActiveSlide,
	getTitleBar: getTitleBar,
	getSlideTitle: getSlideTitle,
	getTitleSlide: getTitleSlide
};

mw.hook( 'wikipage.content' ).add( onContentLoaded );

} )( mediaWiki, Array.prototype );