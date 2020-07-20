/* ##################### START OF MediaWiki:Wikia.js ##################### */
/* Javascript placed here will be applied to the Wikia skin.               */

/* ####################################################################### */
/* ### THEME STYLES                                                    ### */
/* ####################################################################### */

/* Fancy background animation (requires styles in Wikia.css) */
	function renderbganim() {
	   // generate the html
	   var bganimhtml = '<div class="bganim-outer">';
	   bganimhtml += '<div class="bganim-inner">';
	   bganimhtml += '</div>';
	   bganimhtml += '</div>';
	
	   // add it to the DOM tree
	   $( "#WikiaPage" ).prepend( bganimhtml );
	};
	renderbganim();

/* ###################### END OF MediaWiki:Wikia.js ###################### */
console.info("Loaded MediaWiki:Wikia.js version 5");