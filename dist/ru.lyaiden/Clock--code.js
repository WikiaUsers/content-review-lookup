( function( $, mw, window, Date ) { 
	"use strict";
	
	// Double-run protection
	if ( window.UTCClock ) return;
	
	// Creating the UTCClock
	window.UCX = $.extend( { }, window.UCX );
	
	// Creating the configuration object
	const config = $.extend( 
		{ },  
		window.DisplayClockJS, // For compatibility purposes
		window.UTCClockConfig
	);
	
	config.kill = $.noop;
	
	// Creating the UTCClock object
	const UTCClock = { 
		defaults: Object.freeze( { 
			format: "%2H:%2M:%2S %d %b %Y (UTC+3)",
			location: "navigation",
			// Shannon's Sampling Theorem: Signal=1Hz, sample it at 2Hz for 100% accuracy
			interval: 500,
			fontFamily: "Rubik, Helvetica, Arial, sans-serif",
			offset: 180,
			hoverText: "Ляйденское время",
			render: null
		} ),
		interval: null,
		killClock: function( ) { 
			if ( this.interval !== null ) { 
				clearInterval( this.interval );
				this.interval = null;
				this.$el.remove( );
			}
			
			delete this.config.kill;
		},
		init: function( ) { 
			this.config = $.extend( 
				{ },
				this.defaults,
				config
			);
			
			if ( typeof this.config.hoverText === "string" ) 
				return this.load( );
			
			const c = this;
			
			importArticle( { 
				type: "script",
				article: "u:dev:MediaWiki:I18n-js/code.js"
			} ).then( function( ) { 
				mw.hook( "dev.i18n" ).add( c.loadMsg.bind( c ) );
			} );
		},
		loadMsg: function( i18n ) { 
			i18n.loadMessages( this.name )
				.then( this.setMsg.bind( this ) );
		},
		setMsg: function( i18n ) { 
			this.config.hoverText = i18n.msg( "hoverText" ).escape( );
			return this.load( );
		},
		load: function( ) { 
			const $el = $( "<a>" ).prop( { 
				href: "?action=purge",
				title: this.config.hoverText
			} ).data( "UTCClock", this.config );
			
			this.create( $el );
		},
		create: function( $el ) { 
			if ( $( "#displayClock, #displayTimer, #showdate" ).length ) return;
			
			const append = Object.freeze( [ "toolbar", "navigation" ] );
			
			const parents = Object.freeze( { 
				toolbar: $( ".toolbar > .tools" ),
				navigation: $( ".fandom-community-header" ),
				header: $( ".page-header" )
			} );
			
			const location = 
				parents.hasOwnProperty( this.config.location ) ?
					this.config.location :
					"toolbar";
				
			const $parent = parents[ location ];
			
			if ( !$parent.length ) { 
				return console.error( "UTCClock: Cannot find an attachment point. Aborting script." );
			}
			
			const $result = $parent.is( "ul" ) ? 
				$( "<li>" ).append( $el ) :
				$el;
			
			if ( $parent.is( ".tools" ) ) $result.css( { 
				"float": "right" ,
				"border-right": "0"
			} );
			
			if (location === "navigation") {
				mw.util.addCSS("\
					.fandom-community-header__top-container {\
						grid-column: 2 / span 2;\
					}\
					.has-no-logo .fandom-community-header__top-container {\
						grid-column: 1 / span 3;\
					}\
				");
			}
			
			if ( append.includes( location ) ) 
				$parent.append( $result.prop( "id", "UTCClock" ) );
			else
				$parent.prepend( $result.prop( "id", "UTCClock" ) );
				
			this.$el = $el;
			
			this.$el.css( { 
				fontFamily: this.config.fontFamily
			} );
			
			this.update( $el );
			
			$el.data( "location", location );
			
			const interval = Math.max( 
				500, 
				Math.min( this.config.interval , Infinity ) 
			) || 500;
			
			this.interval = window.setInterval( 
				this.update.bind( this, $el ), 
				interval 
			);
			
			this.config.kill = this.killClock;
		},
		update: function( $el ) { 
			if ( !$el.data( "UTCClock" ) ) return this.killClock( );
			
			const d = new Date( );
			d.setMinutes( 
				d.getMinutes( ) + 
				d.getTimezoneOffset( ) + 
				this.config.offset
			);
			
			const c = this;
			
			mw.loader.using( "mediawiki.language.months", function( ) { 
				const format = c.getFormatted( );
				
				$el.text( format( d, c.config.format + "" ) );
			} );
		},
		getFormatted: function( ) { 
			return this.format( 
				mw.language.months.names,
				mw.language.months.abbrev
			);
		},
		format: function( monthsLong, monthsShort, daysLong, daysShort ) {
			/* jshint bitwise: false */
			const cases = { 
				// Double percent (insert percent character)
				"%": function( ) { return "%"; },
				// Day of month (1-31)
				d: function( d ) { 
					const r = d.getDate( );
					return { v: r, i: r - 1 };
				},
				// ISO 8601 Year, used in conjunction with %V
				G: function( d ) { 
					var r = d.getFullYear,
						day = d.getDate( ),
						month = d.getMonth;
						
					if ( month === 0 && day < 4 ) { 
						day = d.getDay( );
						
						if ( day === 0 || day > 4 ) r--;
					} else if ( month === 11 && day > 28 ) { 
						month = d.getDay( );
						
						if ( month !== 0 && month < day - 27 ) ++r;
					}
					
					return r;
				},
				// ISO 8601 Short 2 digit year
				g: function( d ) { return cases.G( d ) % 100; },
				// Hour number (0-23)
				H: function( d ) { return d.getHours( ); },
				// Hour number (1-12)
				I: function( d ) { 
					const r = d.getHours( ) % 12;
					return { i: r, v: r || 12 };
				},
				// Day of year (1-366)
				j: function( d, ys ) { 
					const r = ( d - ys ) / 864e5 | 0;
					return { i: r, v: r + 1 };
				},
				// Month (0-12)
				m: function( d ) { 
					const r = d.getMonth( );
					return { i: r, v: r + 1 };
				},
				// Minute (0-59)
				M: function( d ) { return d.getMinutes( ); },
				// AM/PM
				p: function( d ) { return d.getHours( ) < 12 ? "AM" : "PM"; },
				// Seconds (0-59)
				S: function( d ) { return d.getSeconds( ); },
				// Day of the week (1-7) [1=Monday]
				u: function( d ) { 
					const r = ( d.getDay( ) + 6 ) % 7;
					return { i: r, v: r + 1 };
				},
				// Week of year using Sunday as the first day of the week (0-53)
				U: function( d, ys ) { 
					var doy = cases.j( d, ys ).i;
					doy += ys.getDay( ) || 7;
					return ( doy / 7 ) | 0;
				},
				// ISO 8601 Week (Monday is first day, Week 1 is the one with the first Thursday)
				// Range: 1-53
				V: function calculateISOWeek( d, ys ) { 
					var r = { v: cases.W( d, ys ) }, thurs = ys.getDay( );
					
					if ( thurs > 1 && thurs < 5 ) { 
						++r.v;
					} else if ( r.v === 0 ) { 
						r = d.getFullYear( ) - 1;
						return calculateISOWeek( new Date( r, 11, 31 ), new Date( r, 0, 1 ) );
					}
					
					r.i = r.v - 1;
					return r;
				},
				// Day of the week (1-7) [1=Sunday]
				w: function( d ) { 
					const r = d.getDay( );
					return { i: r, v: r + 1 };
				},
				// Week of the year using Monday as the first day of the week (0-53)
				W: function( d, ys ) { 
					var doy = cases.j( d, ys ).i;
					doy += ( ys.getDay( ) + 6 ) % 7 || 7;
					
					return ( doy / 7 ) | 0;
				},
				// Locale dependent time string
				X: function( d ) { 
					return d.toLocaleTimeString( );
				},
				// Locale dependent date string
				x: function( d ) { 
					return d.toLocaleDateString( );
				},
				// Year (last two digits only)
				y: function( d ) { return d.getFullYear( ) % 100; },
				// Full year
				Y: function( d ) { return d.getFullYear( ); }
			};
			
			if ( daysLong ) cases.A = function( d ) { 
				return daysLong[ d.getDay( ) ]; 
			};
			
			if ( daysShort ) cases.a = function( d ) { 
				return daysShort[ d.getDay( ) ]; 
			};
			
			if ( monthsLong ) cases.B = function( d ) { 
				return monthsLong[ d.getMonth( ) ]; 
			};
			
			if ( monthsShort ) cases.b = function( d ) { 
				return monthsShort[ d.getMonth( ) ]; 
			};
			
			function pad( s, l, c ) { 
				c = c || ( typeof s === "number" ? "0" : " " );
				l = l - ( s += "" ).length | 0;
				if ( l <= 0 ) return s;
				
				do { 
					if ( ( l & 1 ) === 1 ) s = c + s;
					c += c;
				} while ( ( l >>>= 1 ) !== 0 );
				
				return s;
			}
			
			function format( date, string ) { 
				const pattern = /%([0-9]*)(?:\{([^\}]*)\})?([A-Za-z%])/gi;
				
				var result = "",
					start = new Date( date.getFullYear( ), 0, 1 ),
					lastIndex = 0,
					match, list, parsed, dispatcher;
				
				while ( ( match = pattern.exec( string ) ) !== null ) { 
					result += string.substring( lastIndex, match.index );
					lastIndex = pattern.lastIndex;
					
					dispatcher = cases[ match[ 3 ] ];
					if ( typeof dispatcher !== "function" ) { 
						result += '¿' + match[3] + '?';
						continue;
					}
					
					parsed = dispatcher( date, start );
					
					if ( match[ 2 ] ) { 
						if ( typeof parsed === "object" ) { 
							parsed = parsed.i === void 0 ? parsed.v : parsed.i;
						}
						
						if ( typeof parsed === "number" ) { 
							list = match[ 2 ].split( ";" );
							if ( !( parsed > 1 && parsed < list.length ) ) parsed = list.length - 1;
							parsed = list[ parsed ];
						}
					} else if ( typeof parsed === "object" ) { 
						parsed = parsed.v;
					}
					
					result += pad( parsed, parseInt( match[ 1 ], 10 ) );
				}
				
				result += string.substr( lastIndex );
				return result;
			}
			
			return format;
		}
	};
	
	UTCClock.init( );
	window.UTCClock = window.UCX.UTCClock = UTCClock;
	mw.hook( "dev.utc-clock" ).fire( window.UTCClock );
} )( jQuery, mediaWiki, window, Date );