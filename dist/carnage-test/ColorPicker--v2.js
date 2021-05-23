/**
 * ColorPicker
 **/
( function( mw ) { 
	"use strict";
	
	function ColorPicker( options ) { 
		//
		const color = this;
		
		//
		color.$wrapper = document.createElement( "section" );
		
		// 
		color.$box = document.createElement( "div" );
		
		//
		color.$boxInner = document.createElement( "canvas" );
		
		//
		color.$boxThumb = document.createElement( "span" );
		
		//
		color.$boxctx = color.$boxInner.getContext( "2d" );
		
		//
		color.$strip = document.createElement( "div" );
		
		//
		color.$stripInner = document.createElement( "canvas" );
		
		//
		color.$stripThumb = document.createElement( "span" );
		
		//
		color.$stripctx = color.$stripInner.getContext( "2d" );
		
		//
		color.$minsize = 300;
		
		//
		color.$maxsize = 500;
		
		//
		color.$defaults = Object.freeze( { 
			size: 400,
			id: "",
			init: null,
			hue: "",
			rgbaColor: "rgba(255, 0, 0, 1)",
			vertical: false,
			target: document.querySelector( ".colorpicker-wrapper" )
		} );
		
		//
		color.$setters = Object.freeze( { 
			size: function( v ) { 
				return Max.max( color.$minsize, Math.min( v, color.$maxsize ) );
			},
			init: function( v ) { 
				return typeof v === "function" ? v : null;
			},
			rgbaColor: function( v ) { 
				if ( Array.isArray( v ) ) { 
					if ( v.length < 3 ) throw new ReferenceError( "The length of the array must be at least 3." );
					if ( v.length === 3 ) v.push( 1 );
					return "rgba(" + v.join( ", " ) + ")";
				}
				
				return String( v );
			},
			target: function( v ) { 
				const acceptedTypes = Object.freeze( [ 
					Element,
					NodeList,
					HTMLCollection
				] );
				
				const object = Object( v );
				
				for ( var i = 0; i < acceptedTypes.length; i++ ) { 
					const acceptedType = acceptedTypes[ i ];
					if ( acceptedType.prototype.isPrototypeOf( object ) ) { 
						return v;
					}
				}
				
				return null;
			}
		} );
		
		//
		color.$options = { };
		
		//
		color.$drag = false;
		
		//
		color.$boxX = color.$boxY = color.$stripX = color.$stripY = 0;
		
		//
		color.setOptions = function( opts ) { 
			Object
				.getOwnPropertyNames( opts )
				.forEach( function( key ) { 
					const setter = color.$setters[ key ];
					
					if ( typeof setter === "function" ) { 
						const value = setter( opts[ key ] );
						color.$options[ key ] = value || color.$defaults[ key ];
					}
					
					color.$options[ key ] = opts[ key ] || color.$defaults[ key ];
				} );
		};
		
		//
		color.create = function( ) { 
			color.$options.target.innerHTML = "";
			
			color.$boxInner.height = color.$options.size;
			color.$boxInner.width = color.$options.size;
			
			if ( color.$options.vertical ) { 
				color.$stripInner.height = color.$stripSize;
				color.$stripInner.width = color.$options.size;
			} else {
				color.$stripInner.width = color.$stripSize;
				color.$stripInner.height = color.$options.size;
			}
			
			color.$wrapper.classList.add( "color-picker__wrapper" );
			color.$wrapper.append( color.$box, color.$strip, color.$preview );
			
			color.$box.classList.add( "color-picker__box-wrapper" );
			color.$boxInner.classList.add( "color-picker__box-inner" );
			color.$boxThumb.classList.add( "color-picker__box-thumb" );
			color.$box.append( color.$boxInner, color.$boxThumb );
			
			color.$strip.classList.add( "color-picker__strip-wrapper" );
			color.$stripInner.classList.add( "color-picker__strip-inner" );
			color.$stripThumb.classList.add( "color-picker__strip-thumb" );
			color.$strip.append( color.$stripInner, color.$stripThumb );
			
			if ( color.$options.id ) { 
				color.$wrapper.setAttribute( "id", color.$options.id );
			}
		};
	} 
} )( mediaWiki );