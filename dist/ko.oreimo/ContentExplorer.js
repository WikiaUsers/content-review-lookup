/**
 * Accessible-Accordian-Class-Pure-JS-CSS
 * https://github.com/benbowes/Accessible-Accordian-Class-Pure-JS-CSS
 * @Author: Ben Bowes, 2015
 * @License: MIT License
 * Customized version
 */
var ContentExplorer = {};

ContentExplorer.Accordion = function( containerId ) {
	this.master = []; // Master list of collapsable panels
	this.container = document.getElementById( containerId );
	this.panels = this.container.querySelectorAll( "a:not(:only-child)" );

	for ( var i = 0, j = this.panels.length; i < j; i++ ) {
		this.makePanel( this.panels[i], i );
	}
};

ContentExplorer.Accordion.prototype = {
	// makePanel( <HTMLElement>, <position index used for naming> )
	// Spawns a new AccordionPanel and pushes it into the master list of AccordionPanels controlled by Accordion
	makePanel: function( panelElement, index ) {
		var panel = new ContentExplorer.AccordionPanel( panelElement, index );
		this.master.push( panel );
	}
};

ContentExplorer.AccordionPanel = function( headingEl, index ) {
	// The AccordionPanel Class controls each of the collapsable panels spawned from Accordion Class
	var self = this;

	this.index = index;
	this.headingEl = headingEl; // this is the clickable heading
	this.contentEl = headingEl.nextElementSibling;
	this.isSelected = false;

	this.setupAccessibility();

	this.headingEl.addEventListener( "click", function( event ) {
		event.preventDefault();

		if ( self.isSelected ) {
			self.unselect(); // already open, presume user wants it closed
		}
		else {
			self.select(); // then open desired panel

			// close opened panel by clicking anywhere outside of it (by [[User:Cafeinlove]])
			document.addEventListener( "click", function( event ) {

				if ( !self.headingEl.contains( event.target )
					 && !self.contentEl.contains(event.target ) ) {
					self.unselect();
				}

			});
		}
	});

	return this;
};

ContentExplorer.AccordionPanel.prototype = {
	setupAccessibility: function() {
		this.headingEl.setAttribute( "role", "tab" );
		this.headingEl.setAttribute( "aria-selected", "false" );
		this.headingEl.setAttribute( "id", "accordionHeading_" + this.index );
		this.headingEl.setAttribute( "aria-controls", "accordionContent_" + this.index );
		this.headingEl.setAttribute( "tabindex", "0" );
		this.headingEl.setAttribute( "aria-expanded", "false" ); // dynamic html attribute

		this.contentEl.setAttribute( "id", "accordionContent_" + this.index );
		this.contentEl.setAttribute( "aria-labelledby", "accordionHeading_" + this.index );
		this.contentEl.setAttribute( "role", "tabpanel" );
		this.contentEl.setAttribute( "aria-hidden", "true" ); // dynamic html attribute
	},
	select: function() {
		this.isSelected = true;

		this.headingEl.classList.add( "active" );
		this.headingEl.setAttribute( "aria-expanded", "true" );
		this.headingEl.setAttribute( "aria-selected", "true" );

		this.contentEl.classList.add( "active" );
		this.contentEl.setAttribute( "aria-hidden", "false" );
	},
	unselect: function() {
		this.isSelected = false;

		this.headingEl.classList.remove( "active" );
		this.headingEl.setAttribute( "aria-expanded", "false" );
		this.headingEl.setAttribute( "aria-selected", "false" );

		this.contentEl.classList.remove( "active" );    
		this.contentEl.setAttribute( "aria-hidden", "true" );
	}
};

ContentExplorer.init = function () {
    // Create Accordian instance and turn the elements with id "contentNav" into AccordianPanel Class intances.
    if ( mw.config.get( "wgIsMainPage" ) ) {
        this.accordionContainer = new ContentExplorer.Accordion( "contentNav" );
    }
    // store the panel selectors in Accordian Class - Accordion( { heading: <String>, content: <String>} )
};

ContentExplorer.init();