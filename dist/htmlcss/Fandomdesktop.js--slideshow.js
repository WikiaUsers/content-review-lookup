( function( window, mw, $ ) { 
	"use strict";
	
	const Slideshow = { 
		SLIDESHOW_MAIN_CLASS: "slideshow",
		SLIDESHOW_SLIDE_CLASS: "slideshow-slide",
		SLIDESHOW_PREV_CLASS: "slideshow-prev",
		SLIDESHOW_NEXT_CLASS: "slideshow-next",
		SLIDESHOW_IMAGE_CLASS: "slideshow-image-preview",
		
		start: function( $content ) { 
			this.container = $content[ 0 ].querySelector( ".slideshow-container" );
			this.slides = [ ];
			
			this.currentIndex = 0;
			
			this.slideElements = this.container.querySelectorAll( ".slide-data" );
			this.generateSlides( );
			this.createSlideshowUI( );
		},
		generateSlides: function( ) { 
			this.slideElements.forEach( function( slide, index ) { 
				this.slides[ index ] = { };
				
				this.slides[ index ].element = document.createElement( "figure" );
				this.slides[ index ].page = this.slides[ index ].element.dataset.page;
				this.slides[ index ].id = this.slides[ index ].element.dataset.id;
				
				const slideTitle = this.slides[ index ].element.querySelector( ".slide-title" );
				this.slides[ index ].title = slideTitle ? slideTitle.innerHTML : "";
				
				const slideDescription = this.slides[ index ].element.querySelector( ".slide-description" );
				this.slides[ index ].description = slideDescription ? this.slides[ index ].element.querySelector( ".slide-description" ).innerHTML : "";
			}, this );
		},
		createSlideshowUI: function( ) { 
			this.slideshowElement = document.createElement( "section" );
			
		}
	};
} )( window, mediaWiki, jQuery );