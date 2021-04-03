/** 
 * Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

( function( window, $, mw ) { 
    "use strict";
    
    // Creating the main UserTags object
    const UserTags = { };
    
    // The loader constructor
    UserTags.Loader = function( dispatcher ) { 
    	// The current page title
    	const USERNAME = mw.config.get( "wgTitle" );
    	
    	// The current namespace
    	const NAMESPACE = mw.config.get( "wgNamespaceNumber" ) | 0;
    	
    	// A list of supported namespaces to load the script
    	const ALLOWED = Object.freeze( [ -1, 2, 3, 500, 1200 ] );
    	
    	// Determines whether the namespace is supported
    	const IS_ALLOWED = ALLOWED.includes( NAMESPACE );
    	
    	// Determines whether it is a subpage
    	const IS_SUBPAGE = IS_ALLOWED && NAMESPACE !== -1 && USERNAME.includes( "/" );
    	
    	// Determines whether the script has been loaded
    	this.loaded = false;
    	
    	// Dispatcher function
    	this.dispatch = function( callback ) { 
    		
    	};
    	
    	// Handles special user pages
    	this.handleSpecial = function( ) { 
    		
    	};
    	
    	if ( NAMESPACE !== -1 ) {
    		
    	}
    	
    	this.handleSpecial( );
    };
} )( window, jQuery, mediaWiki );