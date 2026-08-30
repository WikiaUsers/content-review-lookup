/* Any JavaScript here will be loaded for all users on every page load. */
//back to top button
window.BackToTopModern = true;

//Wikitable Filterable https://community.fandom.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

// PreloadTemplate config
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplates";
window.preloadTemplates_subpage = "syntax";
window.preloadTemplates_namespace = "Template";

//Filter table
importScript('MediaWiki:CardSelectTr.js');

// Auto-positioning of floating tooltips, mainly for [[Template:tt]]
mw.loader.using('oojs-ui-widgets').then(() => { // make sure the PopupWidget library is loaded
	mw.hook('wikipage.content').add((contents)=>{ // hydrate any content inserted
		if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
		if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
		let toggle = $('body').hasClass('gadget-toggle-tooltip');
		contents
		.find('.custom-tt-wrapper.mw-collapsible')
		.each((_, wrapper) => {
			const $wrapper = $(wrapper);
			const isEE = $wrapper.hasClass('giw-extra-effect-wrapper');
			const hover = !toggle || isEE;
			const classes = $wrapper.attr('class').replace(/mw-collapsible|mw-made-collapsible/g, '');
			
			const content = $wrapper.children('.mw-collapsible-content').html();
			$wrapper.children('.mw-collapsible-content').remove();
			
			const toggleCont = $wrapper.children('.toggle-tooltip').html();
			$wrapper.children('.toggle-tooltip').replaceWith(toggleCont);
			const $toggle = $('<span>', {
				'class': 'custom-tt toggle-tooltip'+(isEE ? ' giw-extra-effect' : ''),
				html: $wrapper.html().replace(/mw-collapsible-toggle(-collapsed|-expanded)? ?/g, '')
			});
			const popup = new OO.ui.PopupWidget({
				$content: $('<div>', { html: content }),
				$container: $('.page__main'),
				anchor: !isEE,
			});
			if (isEE) { popup.$element.find('.oo-ui-popupWidget-popup').toggleClass('giw-extra-effect', true); }
			
			// Remove default collapsible
			const newWrap = $('<span>', {
				'class': classes,
				attr: { 'data-tt-text': $wrapper.attr('data-tt-text') },
				html: [
					$toggle,
					popup.$element
				]
			});
			$wrapper.replaceWith(newWrap);
			
			// Functionality
			let time = null;
			$toggle.on('click', ()=> {
				newWrap.toggleClass('cutom-tt-forceStay');
				popup.toggle(newWrap.hasClass('cutom-tt-forceStay'));
			});
			$toggle.add(popup.$element).on('mouseover mouseout', (e) => {
				if (newWrap.hasClass('cutom-tt-forceStay')) {clearTimeout(time); return;}
				else if (time) { clearTimeout(time); }
				time = setTimeout(()=>{
					popup.toggle(e.type==='mouseout' ? false : true);
				}, e.type==='mouseout' ? 250 : 0);
			});
		});
	});
});

//Table progress tracking
//This code adds a percent of checked boxes (completion percent) on every table that has progress tracking. The percent is added in the top left cell. 
function percent_completed() {
    // Selects all tables that have progress tracking.
    const tables = document.querySelectorAll('.table-progress-tracking');
    
    for (let i = 0; i < tables.length; i++) {
    	
    	// Important for updating percentages when page loads.
        observer.observe(tables[i], {
            subtree: true,
            childNodes: true,
            attributes: true
        });
        
        var selected_boxes = 0;
    	var total_boxes = -1; // Omits the table header row.
        for (let row of tables[i].rows) {
            total_boxes += 1;
            for (let cell of row.cells) {
                cell.addEventListener("change", percent_completed); // On cell change, update percent.
                if (cell.getAttribute('data-sort-value') == "1") {
                    selected_boxes += 1;
                }
            }
        }
        
        const th = tables[i].querySelector('th'); // Selects the first table header cell (top left).
        const text = Math.round(selected_boxes / total_boxes * 100) + '%';
        if (th.textContent !== text) {
            th.textContent = text;
        }
    }
}

const observer = new MutationObserver(percent_completed);
percent_completed(); // Execute function on page load.