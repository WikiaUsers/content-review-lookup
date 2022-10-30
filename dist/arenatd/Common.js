/* Any JavaScript here will be loaded for all users on every page load. */


/*QUiz*/
window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Thanks for completing our quiz!","Did you study?","你在做什么？重做!","LowestScoreDetectedOhNoFrickWhyUghDidYouTryGuessingIt",
    "Nice take on that quiz!","Thanks for particpating!","How did you find that? Hard? pffft.","Not the best - but not the worst","Hopefully you didn't wase StreetCred trying this out.","Did I make it hard enough?","Knowledge might just make the heart grow fonder. Good Job."
    "Woah! Nice one - thats the highest score yet!","Amazing.","Swag!",
];
window.questions = [
    ["Which person has the highest levels in game? ",
    "SkyDynamicGamerTv",
    "SkyDynamicOfficial",
    "SkyDynamicGamer01",
    "Sky"], 

    ["Hydra Arena was made by...",
    "EsCuba",
    "Billie",
    "Khomphell",
    "Deadox"],
    
    ["Click the true statement.",
    "Reactor houses the shooting range.",
    "Reactor houses 2 libraries.",
    "There are 2 libraries in game. ",
    "The shooting range has a KFP."],
    
	["How many types of clouds are there in the background? ",
    "2",
    "1",
    "5",
    "3"], 
    
    ["The Wiki Staff Roblox Account is...",
    "ATDWiki",
    "ATDWikiStaff",
    "WikiStaff",
    "WikiStaffATD"],
    
    ["What was the bot previously used for moderation called?",
    "SleepyDoggo",
    "SleepyCatto",
    "CarlBot",
    "N/A"],
 
    ["How many offical game artists are there? .",
    "2",
    "1",
    "3 ",
    "5"],

    ["What were the names of the soundtracks used in Black Blizzard? ",
    "Cold Cabin & Black Blizzard.",
    "Cold Cabin & Frosty War",
    "Black Blizzard & Hijacked ",
    "Winter Roads & Eternal Blizzard"],

    ["What company outsources the music used in lobby?",
    "APM Music",
    "Roblox",
    "Spotify ",
    "Epidemic Sound",],
        
   ["What is the time on the Ruby Dream non-analog clock set to? ",
    "11:11",
    "22:22",
    "XXI ",
    "IIV",], 
    
   ["What is the FANDOM username of the wiki founder?",
    "DonutBoi12",
    "SlasherZA",
    "Slasher10",
    "DonutBoi09",],  
    
   ["On what flight was the Currencies page written on?",
    "(Lufthansa) LH1115 Madrid - Frankfurt ",
    "(Lufthansa) LH1113 Madrid - Frankfurt ",
    "(Iberia) IB 8710 Madrid - Frankfurt ",
    "(Air Europa) UX 1509 Madrid - Frankfurt",],  
    
   ["Select one artist who drew for the Home Page Banner.",
    "jella",
    "Euvulla",
    "Casey",
    "Paro",],
    
   ["The longest serving Wiki Staff after enews is ______.",
    "Justin",
    "Bonnie",
    "Uchu",
    "enews",],

   ["What is the probability for getting the Did You Know box statement twice?",
    "2.85714286%",
    "2.941172637",
    "9.019%",
    "2.85714286",]
]

;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr;

	$.CBPQTRotator = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.CBPQTRotator.defaults = {
		// default transition speed (ms)
		speed : 700,
		// default transition easing
		easing : 'ease',
		// rotator interval (ms)
		interval : 8000
	};

	$.CBPQTRotator.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.CBPQTRotator.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			// show current item
			this.$items.eq( this.current ).addClass( 'cbp-qtcurrent' );
			// set the transition to the items
			if( this.support ) {
				this._setTransition();
			}
			// start rotating the items
			this._startRotator();

		},
		_config : function() {

			// the content items
			this.$items = this.$el.children( 'div.cbp-qtcontent' );
			// total items
			this.itemsCount = this.$items.length;
			// current item´s index
			this.current = 0;
			// support for CSS Transitions
			this.support = Modernizr.csstransitions;
			// add the progress bar
			if( this.support ) {
				this.$progress = $( '<span class="cbp-qtprogress"></span>' ).appendTo( this.$el );
			}

		},
		_setTransition : function() {
			setTimeout( $.proxy( function() {
				this.$items.css( 'transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing );
			}, this ), 25 );
		},
		_startRotator: function() {

			if( this.support ) {
				this._startProgress();
			}

			setTimeout( $.proxy( function() {
				if( this.support ) {
					this._resetProgress();
				}
				this._next();
				this._startRotator();
			}, this ), this.options.interval );

		},
		_next : function() {

			// hide previous item
			this.$items.eq( this.current ).removeClass( 'cbp-qtcurrent' );
			// update current value
			this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
			// show next item
			this.$items.eq( this.current ).addClass('cbp-qtcurrent');

		},
		_startProgress : function() {
			
			setTimeout( $.proxy( function() {
				this.$progress.css( { transition : 'width ' + this.options.interval + 'ms linear', width : '100%' } );
			}, this ), 25 );

		},
		_resetProgress : function() {
			this.$progress.css( { transition : 'none', width : '0%' } );
		},
		destroy : function() {
			if( this.support ) {
				this.$items.css( 'transition', 'none' );
				this.$progress.remove();
			}
			this.$items.removeClass( 'cbp-qtcurrent' ).css( {
				'position' : 'relative',
				'z-index' : 100,
				'pointer-events' : 'auto',
				'opacity' : 1
			} );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.cbpQTRotator = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'cbpQTRotator' );
				if ( !instance ) {
					logError( "cannot call methods on cbpQTRotator prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cbpQTRotator instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'cbpQTRotator' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'cbpQTRotator', new $.CBPQTRotator( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for secret mail. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};