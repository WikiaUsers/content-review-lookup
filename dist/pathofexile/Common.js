var articles = [];

if (document.getElementById('AtlasOfWorlds')) articles.push('MediaWiki:Atlas of Worlds.js');
if (document.getElementById('monster_main')) articles.push('MediaWiki:Monster.js');

if (articles.length) importArticle({ type: 'script', articles: articles });

/* global $ */
/* jshint strict:false, browser:true */

( function() {
'use strict';
/* DO NOT ADD CODE ABOVE THIS LINE */

/* Translation strings */
var i18n = {
    expand: 'Expand',
    collapse: 'Collapse'
};

/*
 * Responsive tables
 * @param  tables  Table elements to be transformed into responsive tables
 */
function reponsive_table (tables) {
	if ( tables.length > 0 ) {
		var expand = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg><span>' + i18n.expand + '</span>';
		var collapse = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"></path></svg><span>' + i18n.collapse + '</span>';
		var do_toggle = function( wrap ) {
			if ( wrap.classList.contains('is-expanded') ) {
				this.innerHTML = expand;
				wrap.classList.remove('is-expanded');
			} else {
				this.innerHTML = collapse;
				wrap.classList.add('is-expanded');
			}
		};
		for ( var i = 0; i < tables.length; i++ ) {
			var table = tables[i];
			var wrap = document.createElement('div');
			wrap.classList.add('c-responsive-table');
			table.before(wrap);
			var scroll = document.createElement('div');
			scroll.classList.add('c-responsive-table__scroll');
			wrap.appendChild(scroll);
			scroll.appendChild(table);
			table.classList.add('c-responsive-table__table');
			if ( scroll.offsetHeight < scroll.scrollHeight ) {
				var toolbar = document.createElement('div');
				toolbar.classList.add('c-responsive-table__toolbar');
				scroll.before(toolbar);
				var toggle = document.createElement('button');
				toggle.classList.add('c-responsive-table__toolbar-button');
				toggle.innerHTML = expand;
				toolbar.appendChild(toggle);
				toggle.addEventListener( 'click', do_toggle.bind(toggle, wrap) );
			}
		}
	}
}

/**
 * Hoverbox
 * @param  config  Object containing configuration
 */
function hoverbox(config) {
    var defaults = {
        mainClass: 'hoverbox',
        activatorClass: 'hoverbox__activator',
        displayClass: 'hoverbox__display'
    };
    config = Object.assign(defaults, config);
    var timestamp = Date.now(),
        $container = $('#hoverbox-displays-' + timestamp);
    if ( $container.length === 0 ) {
        $container = $('<div id="hoverbox-displays-' + timestamp + '" class="hoverbox-display-container"></div>');
    }
    $('body').append($container);
    var $hoverbox = $('.' + config.mainClass),
        idCounter = 0;
    $hoverbox.each(function() {
        var $this = $(this),
            $activator = $this.find('.' + config.activatorClass).first(),
            $display = $this.find('.' + config.displayClass).first(),
            id = $this.data('hoverbox-id') || idCounter++,
            $target = $container.find('[data-hoverbox-target="' + id + '"]');
        if ( $target.length === 0 ) {
            $container.append($display);
            $display.attr('data-hoverbox-target', id);
        } else {
            $display.remove();
            $display = $target;
        }
        $activator.hover(function() {
            var viewport = {},
                activator = {},
                display = {},
                position, // position relative to the activator
                location; // location relative to the viewport
            viewport.width = document.documentElement.clientWidth;
            viewport.height = document.documentElement.clientHeight;
            viewport.top = document.documentElement.scrollTop;
            viewport.left = document.documentElement.scrollLeft;
            viewport.bottom = viewport.top + viewport.height;
            viewport.right = viewport.left + viewport.width;
            activator.width = $activator.outerWidth();
            activator.height = $activator.outerHeight();
            activator.top = $activator.offset().top;
            activator.left = $activator.offset().left;
            activator.bottom = activator.top + activator.height;
            activator.right = activator.left + activator.width;
            display.width = $display.outerWidth();
            display.height = $display.outerHeight();
            if (viewport.width < display.width) { // Don't bother showing the hoverbox at all if the viewport is too small
                return false;
            }
            if (activator.left > viewport.width - activator.right) {
                location = 'right';
            } else {
                location = 'left';
            }
            if (activator.top - display.height > viewport.top) {
                position = 'above';
                display.top = activator.top - display.height;
                display.left = activator.left + (activator.width / 2) - (display.width / 2);
            } else if (activator.right + display.width < viewport.right) {
                position = 'right-of';
                display.top = activator.top + (activator.height / 2) - (display.height / 2);
                display.left = activator.right;
            } else if (activator.left - display.width > viewport.left) {
                position = 'left-of';
                display.top = activator.top + (activator.height / 2) - (display.height / 2);
                display.left = activator.left - display.width;
            } else {
                position = 'below';
                display.top = activator.bottom;
                display.left = activator.left + (activator.width / 2) - (display.width / 2);
            }
            display.top = Math.max(viewport.top, display.top);
            display.left = Math.max(viewport.left, Math.min(viewport.right - display.width, display.left));
            $display.addClass('is-visible is-' + position + '-activator is-' + location + '-side-of-viewport').offset(display);
        }, function() {
            $display.removeClass('is-visible is-above-activator is-below-activator is-left-of-activator is-right-of-activator is-left-side-of-viewport is-right-side-of-viewport');
        });
    });
}

/*
 * Veiled modifiers
 */
function veiledModifier() {
    var mainClass = 'veiled'; // Class name of veiled modifier elements
    var affixCount = 6; // Number of veiled prefixes and veiled suffixes
    var affixClass = '-m0$1'; // $1 is replaced with a random number between 1 and affixCount
    var elements = document.getElementsByClassName(mainClass);
    if ( elements.length > 0 ) {
        var last, random;
        for ( var i = 0; i < elements.length; i++ ) {
            var element = elements[i];
            if ( last === undefined ) { // Choose with a random integer between 1 and affixCount
                random = Math.floor(Math.random() * affixCount) + 1;
            } else { // Continue choosing random integers in the same range while ensuring no repeats
                random = Math.floor(Math.random() * (affixCount - 1)) + 1;
                if ( random >= last ) {
                    random = random + 1;
                }
            }
            last = random;
            element.classList.add(affixClass.replace('$1', random));
        }
    }
}

function boolean_table() {
	document.querySelectorAll('.boolean-table table td').forEach(function(ele) {
		var text = ele.textContent.trim();
		if (text === '0') {
			ele.textContent = '✗';
			ele.classList.add('table-cell-xmark');
		} else if (text === '1') {
			ele.textContent = '✓';
			ele.classList.add('table-cell-checkmark');        
		}
	});
}

function quality_selector() {
    $('.quality-section-select').click(function () {
        var index;
        var classes = $(this).attr('class').split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            var match = classes[i].match('(?:quality\-)([0-9]+)');
            if (match) {
                index = Number(match[1]);
                break;
            }
        }
        $('.quality-section-select').removeClass('quality-selected');
        $('.quality-box').removeClass('quality-selected');
        $('.quality .quality-' + index).addClass('quality-selected');
    });
}

/* Fires when DOM is ready */
$(function() {
    /* For adding expand/collapse all buttons for mw-collapsible */
    $(".mw-collapsible-collapse-all").on("click", function () {
        $('.mw-collapsible-toggle-expanded a').trigger('click');
    });
    $(".mw-collapsible-expand-all").on("click", function () {
        $(".mw-collapsible-toggle-collapsed a").trigger('click');
    });
    
    // Responsive tables
    reponsive_table( document.getElementsByClassName('responsive-table') );
    var table_containers = document.getElementsByClassName('responsive-table-container');
    for (var i = 0; i < table_containers.length; i++) {
        reponsive_table( table_containers[i].getElementsByTagName('table') );
    }

    // Hoverbox
    hoverbox();

    // Item hoverbox
    hoverbox({
        mainClass: 'c-item-hoverbox',
        activatorClass: 'c-item-hoverbox__activator',
        displayClass: 'c-item-hoverbox__display'
    });

    // Veiled modifiers
    veiledModifier();
    
    // Quality selector in item box
    quality_selector();
    
    // Change 1 & 0 to checkmarks in tables 
    boolean_table();
    
});
/* End DOM ready */

/* DO NOT ADD CODE BELOW THIS LINE */
}() );