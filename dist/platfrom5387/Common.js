/* Any JavaScript here will be loaded for all users on every page load. */

//Global vars
window.mcw = {};
window.mcw.baseURL = '/';
window.mcw.wikiURL = '/wiki/';
var mcw = window.mcw = {};

/* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Grid
	gridPrefix: 'Grid',
	gridModsURL: 'Mods',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

mcw.animation = function() {
	/**
	 * Element animator
	 *
	 * Will cycle the active class on any child elements
	 * within an element with the animated class.
	 */
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
				if ( !current.next().length ) {
					next = $( this ).children().eq( 0 );
				}
				next.addClass( 'active' );
			} );
		}, 2000 );
	}
	
	
	/**
	 * Frame loader 
	 * 
	 * Loads a semi-colon (;) separated list of images
	 * to be animated by the element animator
	 * 
	 * Has special support for [[Template:Grid]]
	 */
	var $animate = $( '.animated' ), size = {}, fileNamespace = mw.config.get( 'wgFormattedNamespaces' )[6];
	if ( $animate.length ) {
		$animate.each( function() {
			var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ),
				grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
			
			if ( !imgs ) {
				return true;
			}
			if ( grid.length ) {
				grid = true;
				imgSize = '32x32';
			} else {
				grid = false;
				if ( imgSize ) {
					imgSize = imgSize.split( 'x' );
					imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
					imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
					
					if ( imgSize[1] ) {
						imgSize[0] += 'x' + imgSize[1];
					}
					
					imgSize = imgSize[0];
				} else {
					imgSize = '';
				}
			}
			
			if ( size[imgSize] === undefined ) {
				size[imgSize] = [];
			}
			
			imgs = imgs.split( ';' );
			imgs.shift();
			$.each( imgs, function() {
				if ( !this.trim() ) {
					return true;
				}
				
				var parts, name;
				if ( grid ) {
					if ( this.indexOf( ':' ) > -1 ) {
						parts = $.map( this.split( /[:,]+/ ), $.trim );
						if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + ' (' + parts[0] + ').png';
						}
					} else {
						parts = $.map( this.split( ',' ), $.trim );
						if ( !mod ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + ' (' + mod + ').png';
						}
					}
					
					if ( size[imgSize].indexOf( name ) < 0 ) {
						size[imgSize].push( name );
					}
				} else if ( size[imgSize].indexOf( fileNamespace + ':' + this.trim() ) < 0 ) {
					size[imgSize].push( fileNamespace + ':' + this.trim() );
				}
			} );
		} );
		
		var redirectPromise = [], urlPromise = [], redirects = {}, urls = {};
		$.each( size, function( size ) {
			var titles = this;
			if ( !titles ) {
				return true;
			}
			
			// Split titles up into blocks of 50, which is the API's title limit for standard users
			for ( var i = 0; i < titles.length; i += 50 ) { ( function() {
				var section = titles.slice( i, i + 50 ).join( '|' );
			
				redirectPromise.push(
					// Thanks to bug 23750 (https://bugzilla.wikimedia.org/show_bug.cgi?id=23750)
					// &redirects doesn't work properly with prop=imageinfo. Some of the images
					// will return without any imageinfo, even though they are valid.
					// So the redirects have to be resolved in a separate request...
					$.ajax( {
						type: 'POST',
						url: '/api.php?action=query&format=json&redirects',
						data: { titles: section },
						timeout: 20000
					} ).done( function( data ) {
						if ( data.query.redirects ) {
							$.each( data.query.redirects, function() {
								redirects[this.to] = this.from;
								section = section.replace( this.from, this.to );
							} );
						}
						
						var thumburl = '', sizes = size.split( 'x' );
						if ( sizes[0] ) {
							thumburl = '&iiurlwidth=' + sizes[0];
							
							if ( sizes[1] ) {
								thumburl += '&iiurlheight=' + sizes[1];
							}
						}
						urlPromise.push(
							$.ajax( {
								type: 'POST',
								url: '/api.php?action=query&format=json&prop=imageinfo&iiprop=url' + thumburl,
								data: { titles: section },
								timeout: 20000
							} ).done( function( data ) {
								$.each( data.query.pages, function( index ) {
									if ( index < 0 ) {
										return true;
									}
									if ( !this.imageinfo ) {
										mw.log( 'Imageinfo is empty' );
										return true;
									}
									
									var url = this.imageinfo[0].thumburl || this.imageinfo[0].url;
									if ( redirects.hasOwnProperty( this.title ) ) {
										urls[redirects[this.title].replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									} else {
										urls[this.title.replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									}
								} );
							} ).fail( function( error ) {
								mw.log( error );
							} )
						);
					} ).fail( function( error ) {
						mw.log( error );
					} )
				);
			} )(); }
		} );
		
		$.when.apply( $, redirectPromise ).then( function() {
			$.when.apply( $, urlPromise ).then( function() {
				$animate.each( function() {
					var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ), html = '',
						grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
					
					if ( !imgs ) {
						return true;
					}
					if ( grid.length ) {
						grid = true;
						imgSize = '32x32';
					} else {
						grid = false;
						if ( imgSize ) {
							imgSize = imgSize.split( 'x' );
							imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
							imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
							
							if ( imgSize[1] ) {
								imgSize[0] += 'x' + imgSize[1];
							}
							
							imgSize = imgSize[0];
						} else {
							imgSize = '';
						}
					}
					
					imgs = imgs.split( ';' );
					imgs.shift();
					$.each( imgs, function() {
						if ( !this.trim() ) {
							if ( grid ) {
								html += '<span class="image">&nbsp;</span>';
							}
							return true;
						}
						
						var parts, name, link, url, num;
						if ( grid ) {
							if ( this.indexOf( ':' ) > -1 ) {
								parts = $.map( this.split( /[:,]+/ ), $.trim );
								if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
									name = link = parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[2];
								} else {
									name = parts[1] + ' (' + parts[0] + ')';
									link = mcw.i18n.gridModsURL + '/' + parts[0] + '/' + parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[2];
								}
							} else {
								parts = $.map( this.split( ',' ), $.trim );
								if ( !mod ) {
									name = link = parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[1];
								} else {
									name = parts[0] + ' (' + mod + ')';
									link = mcw.i18n.gridModsURL + '/' + mod + '/' + parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[1];
								}
							}
							
							html += '<span class="image">';
							if ( name ) {
								if ( url ) {
									html += '<a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '"><img width="32" height="32" src="' + url + '" alt="' + name + '"></a>';
									if ( num ) {
										html += '<span class="number"><a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '">' + num + '</a></span>';
									}
								} else {
									html += '<a class="new" title="' + fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + name + '.png" href="/index.php?title=Special:Upload&wpDestFile=' + mcw.i18n.gridPrefix + '_' + name.replace( / /g, '_' ) + '.png"></a>';
								}
							} else {
								html += '&nbsp;';
							}
							html += '</span>';
						} else {
							name = this.trim();
							html += '<span>';
							if ( urls[name + imgSize] ) {
								html += '<a href="/' + fileNamespace + ':' + name.replace( / /g, '_' ) + '"><img src="' + urls[name + imgSize] + '" alt="' + name + '"></a>';
							} else {
								html += '<a class="new" title="' + fileNamespace + ':' + name + '" href="/index.php?title=Special:Upload&wpDestFile=' + name.replace( / /g, '_' ) + '">' + fileNamespace + ':' + name + '</a>';
							}
							html += '</span>';
						}
					} );
					
					$( this ).append( html ).data( 'imgs', null );
				} );
			} );
		} );
	}
};
mcw.animation();

/**
 * Keep out of global scope
 */
window.ftbw = {};

$( function() {
'use strict';

window.ftbw.animation = function() {
    //Based on http://www.minecraftwiki.net/wiki/MediaWiki:Common.js
	/**
	 * Element animator
	 *
	 * Will cycle the active class on any child elements
	 * within an element with the animated class.
	 */
	if ( window.ftbw.animate === undefined && $( '.animated' ).length ) {
		window.ftbw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
				if ( !current.next().length ) {
					next = $( this ).children().eq( 0 );
				}
				next.addClass( 'active' );
			} );
		}, 2000 );
	}


	/**
	 * Frame loader
	 *
	 * Loads a semi-colon (;) separated list of images
	 * to be animated by the element animator
	 *
	 * Has special support for [[Template:Grid]]
	 */
	var $animate = $( '.animated' ), size = {};
	if ( $animate.length ) {
		$animate.each( function() {
			var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ),
				grid = $( this ).closest( '.grid' );

			if ( !imgs ) {
				return true;
			}
			if ( grid.length ) {
				grid = true;
				imgSize = '32x32';
			} else {
				grid = false;
				if ( imgSize ) {
					imgSize = imgSize.split( 'x' );
					imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
					imgSize[1] = imgSize[1].replace( /[\D ]/, '' );

					if ( imgSize[1] ) {
						imgSize[0] += 'x' + imgSize[1];
					}

					imgSize = imgSize[0];
				} else {
					imgSize = '';
				}
			}

			if ( size[imgSize] === undefined ) {
				size[imgSize] = [];
			}

			imgs = imgs.split( ';' );
			imgs.shift();
			$.each( imgs, function() {
				if ( !this.trim() ) {
					return true;
				}

				var parts, name;
				if ( grid ) {
					parts = $.map( this.split( ',' ), $.trim );
					name = 'File:Grid ' + parts[0] + '.png';

					if ( size[imgSize].indexOf( name ) < 0 ) {
						size[imgSize].push( name );
					}
				} else if ( size[imgSize].indexOf( 'File:' + this.trim() ) < 0 ) {
					size[imgSize].push( 'File:' + this.trim() );
				}
			} );
		} );

		var redirectPromise = [], urlPromise = [], redirects = {}, urls = {}, origurls = {};
		$.each( size, function( size ) {
			var titles = this;
			if ( !titles ) {
				return true;
			}

			// Split titles up into blocks of 50, which is the API's title limit for standard users
			for ( var i = 0; i < titles.length; i += 50 ) {
				var section = titles.slice( i, i + 50 ).join( '|' );

				redirectPromise.push(
					// Thanks to bug 23750 (https://bugzilla.wikimedia.org/show_bug.cgi?id=23750)
					// &redirects doesn't work properly with prop=imageinfo. Some of the images
					// will return without any imageinfo, even though they are valid.
					// So the redirects have to be resolved in a separate request...
					$.ajax( {
						type: 'POST',
						url: '/api.php?action=query&format=json&redirects',
						data: { titles: section },
						timeout: 20000
					} ).done( function( data ) {
						if ( data.query.redirects ) {
							$.each( data.query.redirects, function() {
								redirects[this.to] = this.from;
								section = section.replace( this.from, this.to );
							} );
						}

						var thumburl = '', sizes = size.split( 'x' );
						if ( sizes[0] ) {
							thumburl = '&iiurlwidth=' + sizes[0];

							if ( sizes[1] ) {
								thumburl += '&iiurlheight=' + sizes[1];
							}
						}
						urlPromise.push(
							$.ajax( {
								type: 'POST',
								url: '/api.php?action=query&format=json&prop=imageinfo&iiprop=url' + thumburl,
								data: { titles: section },
								timeout: 20000
							} ).done( function( data ) {
								$.each( data.query.pages, function( index ) {
									if ( index < 0 ) {
										return true;
									}
									if ( !this.imageinfo ) {
										console.error( 'Imageinfo is empty' );
										return true;
									}

									var url = this.imageinfo[0].thumburl || this.imageinfo[0].url;
									var origurl = this.imageinfo[0].url;
									if ( redirects.hasOwnProperty( this.title ) ) {
										urls[redirects[this.title].replace( /File:(.*)/, '$1' ) + size] = url;
										origurls[redirects[this.title].replace( /File:(.*)/, '$1' ) + size] = origurl;
									} else {
										urls[this.title.replace( /File:(.*)/, '$1' ) + size] = url;
										origurls[this.title.replace( /File:(.*)/, '$1' ) + size] = origurl;
									}
								} );
							} ).fail( function( error ) {
								console.error( error );
							} )
						);
					} ).fail( function( error ) {
						console.error( error );
					} )
				);
			}
		} );

		$.when.apply( $, redirectPromise ).then( function() {
			$.when.apply( $, urlPromise ).then( function() {
				$animate.each( function() {
					var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ), html = '',
						grid = $( this ).closest( '.grid' );

					if ( !imgs ) {
						return true;
					}
					if ( grid.length ) {
						grid = true;
						imgSize = '32x32';
					} else {
						grid = false;
						if ( imgSize ) {
							imgSize = imgSize.split( 'x' );
							imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
							imgSize[1] = imgSize[1].replace( /[\D ]/, '' );

							if ( imgSize[1] ) {
								imgSize[0] += 'x' + imgSize[1];
							}

							imgSize = imgSize[0];
						} else {
							imgSize = '';
						}
					}

					imgs = imgs.split( ';' );
					imgs.shift();
					$.each( imgs, function() {
						if ( !this.trim() ) {
							if ( grid ) {
								html += '<span class="image">&nbsp;</span>';
							}
							return true;
						}

						var parts, name, link, url, num;
						if ( grid ) {
							parts = $.map( this.split( ',' ), $.trim );
							name = link = parts[0];
							url = urls['Grid ' + parts[0] + '.png' + imgSize];
							num = parts[1];

							html += '<span class="image">';
							if ( name ) {
								if ( url ) {
									html += '<a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '"><img width="32" height="32" src="' + url + '" alt="' + name + '"></a>';
									if ( num ) {
										html += '<span class="number"><a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '">' + num + '</a></span>';
									}
								} else {
									html += '<a class="new" title="File:Grid ' + name + '.png" href="/index.php?title=Special:Upload&wpDestFile=Grid_' + name.replace( / /g, '_' ) + '.png"></a>';
								}
							} else {
								html += '&nbsp;';
							}
							html += '</span>';
						} else {
							name = this.trim();
							html += '<span>';
							if ( urls[name + imgSize] ) {
								html += '<a class="image fancybox" href="' + origurls[name + imgSize] + '" rel="group"><img src="' + urls[name + imgSize] + '" alt="' + name + '"></a>';
							} else {
								html += '<a class="new" title="File:' + name + '" href="/index.php?title=Special:Upload&wpDestFile=' + name.replace( / /g, '_' ) + '">File:' + name + '</a>';
							}
							html += '</span>';
						}
					} );

					$( this ).append( html ).data( 'imgs', null );
				} );
			} );
		} );
	}
};
window.ftbw.animation();


/**
 * Pause grid GUI templates (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#content' ).delegate( '.grid-Crafting_Table, .grid-furnace, .grid-Brewing_Stand', {
	'mouseenter': function() {
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
} );

} );

/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 *
 * Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );


/**
 * Pause MCUI templates (e.g. [[Template:Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#mw-content-text' ).on( {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'animated-paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.animated-paused' ).removeClass( 'animated-paused' ).addClass( 'animated' );
	}
}, '.mcui' );

/******************************************
 * Adds Tooltips                          *
 *****************************************/
$(function() {
	var mc_tooltip = null;
	
	$(".a1, .a2, .a3, .b1, .b2, .b3, .c1, .c2, .c3, .output, .gridbox, .tooltip").on({
	    'mouseenter.tooltip': function(e) {
	        var $me = $(this);
	        
	        // Make sure this isn't a link to upload a new file
	        if ($me.find('.new').length > 0) {
	        	// This isn't one we want to show a tooltip for
	        	return;
	        }
	        
	        // Try to get the title
	        var title = $me.data('tooltip');
	        
	        // See if we can find a title elsewhere
	        // Check this element or its child
	        if (title === undefined) {
	            title = $me.attr('title') || $me.children(':first').attr('title');
	            
	            // Check if we found anything
	            if (title) {
	                // Save it for later
	                $me.data('tooltip', title);
	            }
	            else {
	                // Didn't find anything, no sense continuing
	                return;
	            }
	        }
	        
	        // Remove any title elements to avoid the default tooltip
	        $me.add('*', $me).filter('[title]').removeAttr('title');
	        
	        // Check to see if we've already created the div
	        if (!$('#tooltip-display').length) {
	            $('body').append('<div id="tooltip-display" />');
	        }
	        mc_tooltip = $('#tooltip-display');
	        
	        // Trim up the tooltip to avoid putting the mod name in there
	        // Basically, remove everything after and including '('
	        title = title.split('(',1)[0].trim();
	        
	        // Add the text to the tooltip
	        mc_tooltip.html(title);
	        
	        // Need to update the position to the cursor position
	        $me.trigger('mousemove', e);
	    },
	    'mousemove.tooltip': function (e) {
	        // Check if the element exists already, create it if it doesn't
	        if (!$('#tooltip-display').length) {
	            $(this).trigger('mouseenter');
	            return;
	        }
	        
	        // Get dimensions for bounds checking
	        var top = e.pageY - 30,
	            height = mc_tooltip.outerHeight(true),
	            left = e.pageX + 15,
	            width = mc_tooltip.outerWidth(true);
	        
	        // Get window dimensions
	        var $w = $(window),
	            win_width = $w.width(),
	            win_height = $w.height();
	        
	        // TODO: Make it so it doesn't go off the sides
	        
	        // Apply the position
	        mc_tooltip.css({
	            top: top,
	            left: left
	        });
	    },
	    'mouseleave.tooltip': function (e) {
	        // Make sure the tooltip is there before we use it
	        if (!mc_tooltip) {
	            return;
	        }
	        
	        mc_tooltip.remove();
	    },
	});
});

/******************************************
 * Resizes the fluid gauges               *
 *****************************************/
$(function() {
	$('.fluid-meter').each(function() {
		var meter = $(this);
		var gauge = meter.find('.gauge');
		
		// Set the background image as we can't do it directly
		gauge.css('background-image', 'url(' + meter.data('image') + ')');
		
		var height = meter.data('height');
		var width = meter.data('width');
		var amount = meter.data('amount');
		var amount_px = null;
		
		// Test what size of gauge we are using
		if (height == 116) {
			// We are using 116px high gauges
			amount_px = Math.min((amount > 0 && amount < 0.3) ? 2 : amount * 12-2, 116);
		}
		else { 
			amount_px = Math.min(amount * 12, height);
		}
		
		gauge.css('height', amount_px);
		gauge.css('width', width);
	});
});


/*******************************************************************
 * Set size for unknown itemref images with non-default dimensions *
 ******************************************************************/
$(function() {
	$('.itemref a.new:first-child').each(function() {
		var itemref = $(this);
		var size = itemref.parent().data('size');
		if (size !== null) {
		    itemref.css('background-size', size + ' ' + size);
		    itemref.css('height', size);
		    itemref.css('width', size);
		}
	});
});

$(function() {
	var grids = $('.grid-bg');
	if(grids.length) {
		grids.each(function() {
			var self = $(this);
			var craftgrid = self[0].children[0];
			var dest = craftgrid.children[0];
			var grid = self.data('grid');
			if(!grid)
				return;
			var width = craftgrid.style.width;
			var height = craftgrid.style.height;
			var svg = 
				'<svg' +
						' xmlns="http://www.w3.org/2000/svg"' +
						' version="1.1"' +
						' width="' + width + '"' +
						' height="' + height + '"' +
					'>' +
					'<style type="text/css">' +
						'*' +
						'{' +
							'stroke: #999;' +
							'stroke-width: 1.5px;' +
						'}' +
					'</style>' +
					'<path d="' + mw.html.escape(grid) + '" />' +
				'</svg>';
			var url = "data:image/svg+xml," + encodeURIComponent(svg);
			dest.style.backgroundImage = 'url("' + url + '")';
		});
	}
});

//Global vars
window.mcw = {};
window.mcw.baseURL = '/';
window.mcw.wikiURL = '/wiki/';

/* Variables for interface text used throughout the script, for ease of translating */
mcw.i18n = {
	// Collapsible tables and page loader
	hideText: 'hide',
	showText: 'show',
	
	// Grid
	gridPrefix: 'Grid',
	gridModsURL: 'Mods',
	
	// Page loader
	loadErrorTitle: 'An error occurred loading the content',
	
	// File upload
	defaultLicense: 'License'
};

mcw.animation = function() {
	/**
	 * Element animator
	 *
	 * Will cycle the active class on any child elements
	 * within an element with the animated class.
	 */
	if ( mcw.animate === undefined && $( '.animated' ).length ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
				if ( !current.next().length ) {
					next = $( this ).children().eq( 0 );
				}
				next.addClass( 'active' );
			} );
		}, 2000 );
	}
	
	
	/**
	 * Frame loader 
	 * 
	 * Loads a semi-colon (;) separated list of images
	 * to be animated by the element animator
	 * 
	 * Has special support for [[Template:Grid]]
	 */
	var $animate = $( '.animated' ), size = {}, fileNamespace = mw.config.get( 'wgFormattedNamespaces' )[6];
	if ( $animate.length ) {
		$animate.each( function() {
			var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ),
				grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
			
			if ( !imgs ) {
				return true;
			}
			if ( grid.length ) {
				grid = true;
				imgSize = '32x32';
			} else {
				grid = false;
				if ( imgSize ) {
					imgSize = imgSize.split( 'x' );
					imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
					imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
					
					if ( imgSize[1] ) {
						imgSize[0] += 'x' + imgSize[1];
					}
					
					imgSize = imgSize[0];
				} else {
					imgSize = '';
				}
			}
			
			if ( size[imgSize] === undefined ) {
				size[imgSize] = [];
			}
			
			imgs = imgs.split( ';' );
			imgs.shift();
			$.each( imgs, function() {
				if ( !this.trim() ) {
					return true;
				}
				
				var parts, name;
				if ( grid ) {
					if ( this.indexOf( ':' ) > -1 ) {
						parts = $.map( this.split( /[:,]+/ ), $.trim );
						if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[1] + ' (' + parts[0] + ').png';
						}
					} else {
						parts = $.map( this.split( ',' ), $.trim );
						if ( !mod ) {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + '.png';
						} else {
							name = fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + parts[0] + ' (' + mod + ').png';
						}
					}
					
					if ( size[imgSize].indexOf( name ) < 0 ) {
						size[imgSize].push( name );
					}
				} else if ( size[imgSize].indexOf( fileNamespace + ':' + this.trim() ) < 0 ) {
					size[imgSize].push( fileNamespace + ':' + this.trim() );
				}
			} );
		} );
		
		var redirectPromise = [], urlPromise = [], redirects = {}, urls = {};
		$.each( size, function( size ) {
			var titles = this;
			if ( !titles ) {
				return true;
			}
			
			// Split titles up into blocks of 50, which is the API's title limit for standard users
			for ( var i = 0; i < titles.length; i += 50 ) { ( function() {
				var section = titles.slice( i, i + 50 ).join( '|' );
			
				redirectPromise.push(
					// Thanks to bug 23750 (https://bugzilla.wikimedia.org/show_bug.cgi?id=23750)
					// &redirects doesn't work properly with prop=imageinfo. Some of the images
					// will return without any imageinfo, even though they are valid.
					// So the redirects have to be resolved in a separate request...
					$.ajax( {
						type: 'POST',
						url: '/api.php?action=query&format=json&redirects',
						data: { titles: section },
						timeout: 20000
					} ).done( function( data ) {
						if ( data.query.redirects ) {
							$.each( data.query.redirects, function() {
								redirects[this.to] = this.from;
								section = section.replace( this.from, this.to );
							} );
						}
						
						var thumburl = '', sizes = size.split( 'x' );
						if ( sizes[0] ) {
							thumburl = '&iiurlwidth=' + sizes[0];
							
							if ( sizes[1] ) {
								thumburl += '&iiurlheight=' + sizes[1];
							}
						}
						urlPromise.push(
							$.ajax( {
								type: 'POST',
								url: '/api.php?action=query&format=json&prop=imageinfo&iiprop=url' + thumburl,
								data: { titles: section },
								timeout: 20000
							} ).done( function( data ) {
								$.each( data.query.pages, function( index ) {
									if ( index < 0 ) {
										return true;
									}
									if ( !this.imageinfo ) {
										mw.log( 'Imageinfo is empty' );
										return true;
									}
									
									var url = this.imageinfo[0].thumburl || this.imageinfo[0].url;
									if ( redirects.hasOwnProperty( this.title ) ) {
										urls[redirects[this.title].replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									} else {
										urls[this.title.replace( new RegExp( fileNamespace + ':(.*)' ), '$1' ) + size] = url;
									}
								} );
							} ).fail( function( error ) {
								mw.log( error );
							} )
						);
					} ).fail( function( error ) {
						mw.log( error );
					} )
				);
			} )(); }
		} );
		
		$.when.apply( $, redirectPromise ).then( function() {
			$.when.apply( $, urlPromise ).then( function() {
				$animate.each( function() {
					var imgs = $( this ).data( 'imgs' ), imgSize = $( this ).data( 'img-size' ), html = '',
						grid = $( this ).closest( '.grid' ), mod = $( this ).data( 'mod' );
					
					if ( !imgs ) {
						return true;
					}
					if ( grid.length ) {
						grid = true;
						imgSize = '32x32';
					} else {
						grid = false;
						if ( imgSize ) {
							imgSize = imgSize.split( 'x' );
							imgSize[0] = imgSize[0].replace( /[\D ]/, '' );
							imgSize[1] = imgSize[1].replace( /[\D ]/, '' );
							
							if ( imgSize[1] ) {
								imgSize[0] += 'x' + imgSize[1];
							}
							
							imgSize = imgSize[0];
						} else {
							imgSize = '';
						}
					}
					
					imgs = imgs.split( ';' );
					imgs.shift();
					$.each( imgs, function() {
						if ( !this.trim() ) {
							if ( grid ) {
								html += '<span class="image">&nbsp;</span>';
							}
							return true;
						}
						
						var parts, name, link, url, num;
						if ( grid ) {
							if ( this.indexOf( ':' ) > -1 ) {
								parts = $.map( this.split( /[:,]+/ ), $.trim );
								if ( parts[0].toLowerCase() === 'v' || parts[0].toLowerCase() === 'vanilla' ) {
									name = link = parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[2];
								} else {
									name = parts[1] + ' (' + parts[0] + ')';
									link = mcw.i18n.gridModsURL + '/' + parts[0] + '/' + parts[1];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[2];
								}
							} else {
								parts = $.map( this.split( ',' ), $.trim );
								if ( !mod ) {
									name = link = parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + parts[0] + '.png' + imgSize];
									num = parts[1];
								} else {
									name = parts[0] + ' (' + mod + ')';
									link = mcw.i18n.gridModsURL + '/' + mod + '/' + parts[0];
									url = urls[mcw.i18n.gridPrefix + ' ' + name + '.png' + imgSize];
									num = parts[1];
								}
							}
							
							html += '<span class="image">';
							if ( name ) {
								if ( url ) {
									html += '<a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '"><img width="32" height="32" src="' + url + '" alt="' + name + '"></a>';
									if ( num ) {
										html += '<span class="number"><a title="' + link + '" href="/' + link.replace( / /g, '_' ) + '">' + num + '</a></span>';
									}
								} else {
									html += '<a class="new" title="' + fileNamespace + ':' + mcw.i18n.gridPrefix + ' ' + name + '.png" href="/index.php?title=Special:Upload&wpDestFile=' + mcw.i18n.gridPrefix + '_' + name.replace( / /g, '_' ) + '.png"></a>';
								}
							} else {
								html += '&nbsp;';
							}
							html += '</span>';
						} else {
							name = this.trim();
							html += '<span>';
							if ( urls[name + imgSize] ) {
								html += '<a href="/' + fileNamespace + ':' + name.replace( / /g, '_' ) + '"><img src="' + urls[name + imgSize] + '" alt="' + name + '"></a>';
							} else {
								html += '<a class="new" title="' + fileNamespace + ':' + name + '" href="/index.php?title=Special:Upload&wpDestFile=' + name.replace( / /g, '_' ) + '">' + fileNamespace + ':' + name + '</a>';
							}
							html += '</span>';
						}
					} );
					
					$( this ).append( html ).data( 'imgs', null );
				} );
			} );
		} );
	}
};
mcw.animation();
 
 
/**
 * Pause grid GUI templates (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( 'body' ).delegate( '.grid, .grid-Crafting_Table, .grid-furnace, .grid-Brewing_Stand', {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
} );

/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
 * Use mcw.useNativeMinetip = true to use normal tooltips, with the description added
 */

/**mcw.minetip = {
	// Add normal minetip events, removing legacy tooltip
	create: function() {
		var tooltip;
		
		$( '#mw-content-text' ).on( {
			'mouseenter.minetip': function( e ) {
				var $elem = $( this ),
					title = $elem.data( 'minetip-title' ),
					description = $elem.data( 'minetip-text' );
				
				if ( title === undefined ) {
					// Use title attribute of the element or the first link directly under it
					title = $elem.attr( 'title' ) || $elem.find( '> a:first' ).attr( 'title' );
					
					if ( title ) {
						// Set the retrieved title as data for future use
						$elem.data( 'minetip-title', title );
					} else {
						return;
					}
				}
				
				$elem.add( '*', $elem ).filter( '[title]' ).removeAttr( 'title' );
				
				if ( title === 0 ) {
					return;
				}
				
				var text = '<span class="title">' + title + '&f</span>';
				if ( description ) {
					text += '\n<span class="description">' +
						description.replace( /\\\//g, '&#47;' ).replace( /\//g, '<br>' ) +
						'&f</span>';
				}
				
				if ( !$( '#minetip-tooltip' ).length ) {
					$( 'body' ).append( '<div id="minetip-tooltip"/>' );
				}
				tooltip = $( '#minetip-tooltip' );
				
				// Add classes for minecraft formatting codes
				while ( text.match( /&[0-9a-el-o]/ ) ) {
					text = text.replace( /&([0-9a-el-o])(.*?)(&f|$)/g, '<span class="format-$1">$2</span>&f' );
				}
				// Remove reset formatting
				text = text.replace( /&f/g, '' );
				
				tooltip.html( text );
				
				// Trigger a mouse movement to position the tooltip
				$elem.trigger( 'mousemove', e );
			},
			'mousemove.minetip': function( e, trigger ) {
				if ( !$( '#minetip-tooltip' ).length ) {
					$( this ).trigger( 'mouseenter' );
					return;
				}
				
				// Get event data from remote trigger
				e = trigger || e;
				
				var top = e.clientY - 34,
					left = e.clientX + 14,
					width = tooltip.outerWidth( true ),
					height = tooltip.outerHeight( true ),
					
					$win = $( window ),
					winWidth = $win.width(),
					winHeight = $win.height();
				
				// If going off the right of the screen, go to the left of the cursor
				if ( left + width > winWidth ) {
					left -= width + 36;
				}
				
				// If now going off to the left of the screen, resort to going below the cursor
				if ( left < 0 ) {
					left = 0;
					top += 82;
					
					// Go above the cursor if too low
					if ( top + height > winHeight ) {
						top -= 77 + height;
					}
				// Don't go off the top of the screen
				} else if ( top < 0 ) {
					top = 0;
				// Don't go off the bottom of the screen
				} else if ( top + height > winHeight ) {
					top = winHeight - height;
				}
				
				// Apply the positions
				tooltip.css( {
					top: top,
					left: left
				} );
			},
			'mouseleave.minetip': function() {
				if ( !tooltip ) {
					return;
				}
				
				tooltip.remove();
			}
		}, '.minetip, .grid .image' ).off( '.minetipNative' );
	},
	// Remove all events
	destroy: function() {
		$( '#mw-content-text' ).off( '.minetip .minetipNative' );
		$( '#minetip-tooltip' ).remove();
	},
	// Add native browser tooltip events, removing normal minetip
	native: function() {
		$( '#mw-content-text' ).on( 'mouseenter.minetipNative', '.minetip, .grid .image', function() {
			var title = $( this ).data( 'minetip-title' ),
				description = $( this ).data( 'minetip-text' ),
				existingTitle = $( this ).attr( 'title' ) || $( this ).find( '> a:first' ).attr( 'title' );
			
			if ( title || title === 0 || $( this ).attr( 'title' ) ) {
				// Remove titles within so they don't interfere
				$( this ).find( '[title]' ).removeAttr( 'title' );
			}
			
			if ( title === 0 ) {
				$( this ).removeAttr( 'title' );
				return;
			} else if ( !title && ( !existingTitle || !description ) ) {
				return;
			} else if ( !title && existingTitle ) {
				$( this ).data( 'minetip-title', existingTitle );
			}
			
			var text = title || existingTitle;
			if ( description ) {
				text += '\n' + description;
			}
			
			// Remove formatting
			text = text.replace( /&([0-9a-fl-o])/g, '' )
				.replace( /\\\//g, '&#47;' )
				.replace( /\//g, '\n' )
				.replace( /&#47;/g, '/' );
			
			$( this ).attr( 'title', text );
		} ).off( '.minetip' );
	}
};

if ( mcw.useNativeMinetip ) {
	mcw.minetip.native();
} else {
	mcw.minetip.create();
}
*/

SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};

importArticles({
    type: 'script',
    articles: [
        'w:czechitout:SimpleAgegate.js'
    ]
});
 

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's MediaWiki:Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               Wikipedia:NavFrame on Wikipedia for more info.
  *  Taken from Wikipedia's MediaWiki:Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See Wikipedia:NavFrame on Wikipedia.
  *  Taken from Wikipedia's MediaWiki:Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );

/** Blog social media icons **/
if(wgCanonicalNamespace == "User_blog") {
        addOnloadHook(function() {
                var blogImage = new Image(); blogImage.src = 'https://images.wikia.nocookie.net/egamia/images/4/4c/Blog_icon_active.png';
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/egamia/images/5/53/Facebook_icon_active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/egamia/images/9/91/Twitter_icon_active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/egamia/images/1/18/Google%2B_icon_active.png';
                var rssImage = new Image(); rssImage.src = 'https://images.wikia.nocookie.net/egamia/images/1/10/RSS_icon_active.png';
        
                $('.news-share .blog img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/4/4c/Blog_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/2/22/Blog_icon.png');
                });  
				
                $('.news-share .facebook img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/5/53/Facebook_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/3/3f/Facebook_icon.png');
                });  				
				
                $('.news-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/9/91/Twitter_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/5/54/Twitter_icon1.png');
                });  				
				
                $('.news-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/1/18/Google%2B_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/d/d6/Google%2B_icon.png');
                });  				
				
                $('.news-share .rss img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/1/10/RSS_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/egamia/images/b/b1/RSS_icon.png');
                });  					
        });
}

/* Kickstarter Portal widget and video */
$(function() {
    if (wgPageName == "Portal:Kickstarter_Games") {
        $('#KickstarterFeaturedVideo').html('<iframe width="440" height="248" src="https://www.kickstarter.com/projects/dunritegames/rift-of-raigard-ror/widget/video.html" frameborder="0" scrolling="no"> </iframe>');
        $('#KickstarterFeaturedWidget').html('<iframe src="https://www.kickstarter.com/projects/dunritegames/rift-of-raigard-ror/widget/card.html?v=2" width="220" height="420" frameborder="0" scrolling="no"></iframe>');
    }
});