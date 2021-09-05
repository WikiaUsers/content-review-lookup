var slideshows = {

	/**
	 * Whether automatic cycling has been enabled, i.e. at least one automatic
	 * slideshow is enabled or was enabled before the last slide update.
	 */
	cyclingEnabled: false,

	/**
	 * Internal data used by this script.
	 */
	data: {
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
		clickEvents: new Map(),
		/**
		 * The list of enabled slideshows cycling automatically.
		 * @type {Element[]}
		 */
		auto: []
	},

	/**
	 * Enables all slideshows in a container.
	 * @param {Element|Document} [container] The container, the entire document
	 *                                       otherwise.
	 * @returns {Element[]} The enabled slideshows in the container.
	 */
	init: function ( container ) {
		return Array.prototype.filter.call(
			( container || document ).getElementsByClassName(
				'infobox2-slideshow'
			),
			slideshows.enable
		);
	},

	/**
	 * Enables a slideshow.
	 * @param {HTMLElement} slideshow The slideshow to enable.
	 * @returns True if the slideshow is now enabled, false if it is now
	 *          disabled.
	 */
	enable: function ( slideshow ) {
		if (
			!slideshow ||
			slideshow.classList.contains( 'infobox2-slideshow-disabled' )
		) {
			return false;
		}
		if ( slideshows.isEnabled( slideshow ) ) {
			return true;
		}
		var slides = slideshows.getSlides( slideshow );
		if ( slides.length < 2 ) {
			slideshows.disable( slideshow );
			return false;
		}
		var /** @type {Element} */
			title,
			/** @type {HTMLCollectionOf<Element>} */
			as,
			/** @type {Element} */
			activeTitle,
			/** @type {ClickEvents} */
			clickEvents      = { titles: new Map() },
			/** @type {Element[]} */
			titles           = [],
			titlebar         = document.createElement( 'div' ),
			titleFound       = false,
			titlePlaceholder = document.createElement( 'span' ),
			activeIndex      = slideshow.classList.contains( 'dlc-slideshow' ) ?
				slides.length - 1 :
				0,
			activeSlide      = slides[ activeIndex ];
		titlebar.classList.add( 'infobox2-slideshow-titlebar' );
		slideshow.classList.add( 'infobox2-slideshow-enabled' );
		for ( var i in slides ) {
			title = slideshows.enableTitle( slides[ i ], clickEvents );
			titles.push( title );
			if ( title ) {
				titleFound = true;
			}
		}
		if ( titleFound ) {
			as = titlebar.getElementsByTagName( 'a' );
			while ( as.length ) {
				slideshows.unwrap( as[ 0 ] );
			}
		}
		activeTitle = titles[ activeIndex ];
		activeSlide.classList.add( 'infobox2-slide-active' );
		if ( activeTitle.classList.contains( 'infobox2-slide-title' ) ) {
			activeTitle.classList.add( 'infobox2-slide-title-active' );
		}
		if (
			!slideshow.classList.contains( 'infobox2-slideshow-hidden' ) &&
			!slideshow.getElementsByClassName( 'infobox2-slideshow' ).length
		) {
			clickEvents.slide = function () {
				slideshows.cycle( slideshow );
			};
			for ( i in slides ) {
				slides[ i ].addEventListener( 'click', clickEvents.slide );
			}
		}
		titlePlaceholder.classList.add( 'infobox2-slide-title-placeholder' );
		for ( i in titles ) {
			titles[ i ].replaceWith( titlePlaceholder.cloneNode( true ) );
			titlebar.appendChild(
				titles[ i ] || document.createElement( 'span' )
			);
		}
		if ( slideshow.classList.contains( 'infobox2-slideshow-auto' ) ) {
			slideshows.makeAuto( slideshow );
		}
		slideshows.data.clickEvents.set( slideshow, clickEvents );
		if ( titleFound ) {
			slideshow.insertBefore( titlebar, slideshow.firstChild );
		}
		slideshows.setMinHeight( slideshow );
		return true;
	},

	/**
	 * Enables the click action from a title to its slide.
	 * @param {Element}     slide       The slide.
	 * @param {ClickEvents} clickEvents The click events of the slideshow.
	 * @returns The title of the slide, null if there is not any.
	 */
	enableTitle: function ( slide, clickEvents ) {
		var title = slideshows.getSlideTitle( slide );
		if ( !title ) {
			return null;
		}
		var click = function () {
			if ( title.classList.contains( 'infobox2-slide-title-active' ) ) {
				return;
			}
			slideshows.setActiveSlide(
				slideshows.getTitleSlide( title ),
				title
			);
		};
		clickEvents.titles.set( title, click );
		title.addEventListener( 'click', click );
		return title;
	},

	/**
	 * Makes a slideshow cycle slides automatically.
	 * @param {Element} slideshow The slideshow.
	 */
	makeAuto: function ( slideshow ) {
		slideshow.classList.add( 'infobox2-slideshow-auto' );
		if (
			!slideshows.isEnabled( slideshow ) ||
			slideshows.data.auto.indexOf( slideshow ) !== -1
		) {
			return;
		}
		slideshows.data.auto.push( slideshow );
		if ( slideshows.cyclingEnabled ) {
			return;
		}
		slideshows.cyclingEnabled = true;
		( function interval() {
			if ( !slideshows.data.auto.length ) {
				slideshows.cyclingEnabled = false;
				return;
			}
			slideshows.data.auto.forEach( slideshows.cycle );
			setTimeout( interval, 1500 );
		} )();
	},

	/**
	 * Sets a minimum height to a slideshow to prevent other elements from
	 * moving on the page while switching slides.
	 * @param {HTMLElement} slideshow The slideshow.
	 */
	setMinHeight: function ( slideshow ) {
		if ( !slideshow ) {
			return;
		}
		var slides      = slideshows.getSlides( slideshow ),
			activeSlide = slideshows.getActiveSlide( slideshow );
		if ( !activeSlide ) {
			return;
		}
		var minHeight = 0;
		activeSlide.classList.remove( 'infobox2-slide-active' );
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
	},

	/**
	 * Disables a slideshow.
	 * @param {Element} slideshow The slideshow to disable.
	 */
	disable: function ( slideshow ) {
		if (
			!slideshow ||
			slideshow.classList.contains( 'infobox2-slideshow-disabled' )
		) {
			return;
		}
		var /** @type {string} */
			i,
			/** @type {Element} */
			title,
			slides = slideshows.getSlides( slideshow );
		slideshow.classList.add( 'infobox2-slideshow-disabled' );
		if ( !slideshows.isEnabled( slideshow ) ) {
			for ( i in slides ) {
				title = slideshows.getSlideTitle( slides[ i ] );
				if ( title ) {
					title.remove();
				}
			}
			return;
		}
		var /** @type {Element} */
			slide,
			/** @type {HTMLCollectionOf<Element>} */
			titlePlaceholders,
			titleBar    = slideshows.getTitleBar( slideshow ),
			clickEvents = slideshows.data.clickEvents.get( slideshow );
		slideshow.classList.remove( 'infobox2-slideshow-enabled' );
		for ( i in slides ) {
			slide = slides[ i ];
			slide.classList.remove( 'infobox2-slide-active' );
			slide.removeEventListener( 'click', clickEvents.slide );
			if ( !titleBar ) {
				continue;
			}
			title = slideshows.getSlideTitle( slide );
			if ( !title ) {
				continue;
			}
			title.classList.remove( 'infobox2-slide-title-active' );
			titlePlaceholders = slide.getElementsByClassName(
				'infobox2-slide-title-placeholder'
			);
			if ( titlePlaceholders.length ) {
				titlePlaceholders[ 0 ].replaceWith( title );
			}
			title.removeEventListener(
				'click',
				clickEvents.titles.get( title )
			);
		}
		if ( titleBar ) {
			titleBar.remove();
		}
		slideshows.data.clickEvents.delete( slideshow );
	},

	/**
	 * Sets a slide as the active one of a slideshow.
	 * @param {Element} slide   The slide to set as active one.
	 * @param {Element} [title] The title of the slide.
	 */
	setActiveSlide: function ( slide, title ) {
		if ( !slide ) {
			return;
		}
		var slideshow   = slide.parentElement,
			titlebar    = slideshows.getTitleBar( slideshow ),
			activeSlide = slideshows.getActiveSlide( slideshow );
		if ( activeSlide ) {
			activeSlide.classList.remove( 'infobox2-slide-active' );
		}
		slide.classList.add( 'infobox2-slide-active' );
		if ( !titlebar ) {
			return;
		}
		var activeTitle = slideshows.getSlideTitle( activeSlide );
		if ( activeTitle ) {
			activeTitle.classList.remove( 'infobox2-slide-title-active' );
		}
		if ( !title ) {
			title = slideshows.getSlideTitle( slide );
		}
		if ( title && title.classList.contains( 'infobox2-slide-title' ) ) {
			title.classList.add( 'infobox2-slide-title-active' );
		}
	},

	/**
	 * Sets the next slide as the active one of a slideshow.
	 * @param {Element} slideshow The slideshow.
	 */
	cycle: function ( slideshow ) {
		if ( !slideshow ) {
			return;
		}
		var activeSlide = slideshows.getActiveSlide( slideshow );
		slideshows.setActiveSlide(
			slideshows.getNextSiblingByClassName(
				activeSlide,
				'infobox2-slide'
			) ||
			slideshows.getChildByClassName( slideshow, 'infobox2-slide' )
		);
	},

	/**
	 * Removes a slide from a slideshow.
	 * @param {Element} slide The slide to remove.
	 */
	removeSlide: function ( slide ) {
		if ( !slide ) {
			return;
		}
		var slideshow = slide.parentElement,
			title     = slideshows.getSlideTitle( slide );
		slide.remove();
		if ( title ) {
			title.remove();
		}
		if ( slideshows.getSlides( slideshow ).length < 2 ) {
			slideshows.disable( slideshow );
		}
		return;
	},

	/**
	 * Indicates whether a slideshow is enabled.
	 * @param {Element} slideshow The slideshow.
	 * @returns True if the slideshow is enabled, false otherwise.
	 */
	isEnabled: function ( slideshow ) {
		return slideshow.classList.contains( 'infobox2-slideshow-enabled' );
	},

	/**
	 * Indicates whether an element is in a slideshow.
	 * @param {Element} element   The element.
	 * @param {Element} [container] The container (one of the parents of the
	 *                              element) in which the search will be done,
	 *                              the entire hierarchy otherwise.
	 * @returns True if the element is in a slideshow, false otherwise.
	 */
	isInSlideshow: function ( element, container ) {
		var parent = element.parentElement;
		while ( parent != container ) { // not !==, container can be undefined
			if ( parent.classList.contains( 'infobox2-slideshow' ) ) {
				return false;
			}
			parent = parent.parentElement;
		}
		return true;
	},

	/**
	 * Gets all slides of a slideshow.
	 * @param {Element}       slideshow The slideshow to enable.
	 * @returns An array of all slides of the slideshow.
	 */
	getSlides: function ( slideshow ) {
		return slideshows.getChildrenByClassName(
			slideshow,
			'infobox2-slide'
		);
	},

	/**
	 * Gets the currently active slide of a slideshow.
	 * @param {Element} slideshow The slideshow to enable.
	 * @returns The currently active slide of the slideshow, null if there is
	 *          not any.
	 */
	getActiveSlide: function ( slideshow ) {
		return slideshows.getChildByClassName(
			slideshow,
			'infobox2-slide-active'
		);
	},

	/**
	 * Gets the title bar of a slideshow.
	 * @param {Element} slideshow The slideshow.
	 * @returns The title bar of the slideshow, null if it does not have any.
	 */
	getTitleBar: function ( slideshow ) {
		return slideshows.getChildByClassName(
			slideshow,
			'infobox2-slideshow-titlebar'
		);
	},

	/**
	 * Gets the title of a slide.
	 * @param {Element} slide The slide.
	 * @returns The title of the slide, null if it does not have any.
	 */
	getSlideTitle: function ( slide ) {
		if ( !slide ) {
			return null;
		}
		var slideshow = slide.parentElement,
			titlebar  = slideshows.getTitleBar( slideshow );
		if ( titlebar ) {
			return titlebar.children[
				slideshows.getSlides( slideshow ).indexOf( slide )
			];
		}
		var /** @type {Element} */
			title,
			titles = slide.getElementsByClassName( 'infobox2-slide-title' );
		for ( var j = 0; j < titles.length; ++j ) {
			title = titles[ j ];
			if ( !slideshows.isInSlideshow( title ) ) {
				return title;
			}
		}
		return null;
	},

	/**
	 * Gets a slide from its title.
	 * @param {Element} title The title.
	 * @returns The associated slide, null if there is not any.
	 */
	getTitleSlide: function ( title ) {
		if ( !title ) {
			return null;
		}
		var parent = title.parentElement;
		if ( !parent ) {
			return null;
		}
		if ( parent.classList.contains( 'infobox2-slideshow-titlebar' ) ) {
			return slideshows.getSlides( parent.parentElement )[
				Array.prototype.slice.call( parent.children ).indexOf( title )
			];
		}
		do {
			if ( parent.classList.contains( 'infobox2-slide' ) ) {
				return parent;
			}
			parent = parent.parentElement;
		} while ( parent );
		return null;
	},

	/**
	 * Gets the first element following an element which has a given class.
	 * @param {Element} element   The element.
	 * @param {string}  className The class name.
	 * @returns An element following the given element which has the given
	 *          class, null if there is not any.
	 */
	getNextSiblingByClassName: function ( element, className ) {
		element = element.nextElementSibling;
		while ( element ) {
			if ( element.classList.contains( className ) ) {
				return element;
			}
			element = element.nextElementSibling;
		}
		return null;
	},

	/**
	 * Gets the first element within a container which has a given class.
	 * @param {Element} container The container.
	 * @param {string}  className The class name.
	 * @returns An element from the container which has the given class, null
	 *          if there is not any.
	 */
	getChildByClassName: function ( container, className ) {
		if ( !container ) {
			return null;
		}
		var elements = container.getElementsByClassName( className );
		for ( var i = 0; i < elements.length; ++i ) {
			if ( elements[ i ].parentElement === container ) {
				return elements[ i ];
			}
		}
		return null;
	},

	/**
	 * Gets all elements within a container which have a given class.
	 * @param {Element} container The container.
	 * @param {string}  className The class name.
	 * @returns An array of all elements from the container which have the
	 *          given class.
	 */
	getChildrenByClassName: function ( container, className ) {
		if ( !container ) {
			return [];
		}
		var /** @type {Element[]} */
			list     = [],
			elements = container.getElementsByClassName( className );
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
	},

	/**
	 * Removes an element, leaving its content in place.
	 * @param {Element} element The element to remove.
	 */
	unwrap: function ( element ) {
		var parent = element.parentElement;
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
};

if ( window !== this && !window.slideshows ) {
	window.slideshows = slideshows;
}