/* Filter for List of Untergangers
 * by mfaizsyahmi, 2017
 */

(function (window, $, mw) { 
	var init = function() {
		// preps the table with filter values in dataset
		var tds = $('.untergangers tbody td');
		tds.each(function() {
			//if (this.dataset['sort-value']) {
			//	this.dataset["filtervalue"] = this.dataset['sort-value'];
			//} else {
				this.dataset["filtervalue"] = (isNaN(this.innerText))? this.innerText.toLowerCase() : parseInt(this.innerText);
			//}
		});

		// construct ui
		$('#filterBox').remove();
		var filterBox = $('<div>').prop({id:'filterBox'}).css('display','flex');
		$('<input>').prop({
				type:'text', 
				id:'filter', 
				placeholder: 'Filter text e.g. "Fegel ctry:US -sb:B"',
				value: $('.untergangers').attr('data-filter') || ''
			}).on('keyup', function(e) {
				if(e.key=='Enter') filter($(this).val(), tds);
			}).css('flex-grow','1').appendTo(filterBox);
		$('<button>').text('Filter')
			.on('click', function(e) {
				filter($('#filter').val(), tds);
			}).appendTo(filterBox);
		$('<button>').text('Clear')
			.on('click', function(e) {
				$('#filter').val('');
				$('.filtered').removeClass('filtered');
			}).appendTo(filterBox);
		$('.untergangers').before(filterBox);
		
		// if the unterganger table has data-filter set, filter immediately
		if($('.untergangers').attr('data-filter')) filter($('.untergangers').attr('data-filter'))
		// loaded flag
		window.louFilterLoaded = true;
	};
	
	var filter = function(text, tds) {
		//var tds = $('.untergangers tbody td')
		/* pattern legend 
		 * 	1: regular match
		 *  2,3: quoted string
		 *  4: - (filter out)
		 *  5: filter key (column class)
		 *  6: filter operator - : (string), currently unused
		 *  7: filter value
		 */
		text = text.toLowerCase();
		var pattern = /(?:^|\s+)("([^\\"]*|\\.*)"|'([^\\']*|\\.*)'|(-?)(\w+)(:|[=><]{1,2})([^\s]+)|[^-\s]+)/g,
		m, selectors=[], i;
		
		$('.filtered').removeClass('filtered');
		while((m = pattern.exec(text)) !== null) {
			if (i>1000) break;
			if(m[5]==='vids' && !isNaN(m[7])) {
				// filter video count
				selectors.push( (m[4])? '.vids[data-filtervalue="'+m[7]+'"]': '.vids:not([data-filtervalue="'+m[7]+'"])');
			} else if (m[5]==='sb' || m[5]==='sbgrade') {
				// filter sbgrade (exact value)
				selectors.push( (m[4])? '.sbgrade[data-filtervalue="'+m[7]+'"]': '.sbgrade:not([data-filtervalue="'+m[7]+'"])');
			} else if(m[6]) {
				// filter other keys (include value)
				selectors.push( (m[4])? '.'+m[5]+'[data-filtervalue*="'+m[7]+'"]': '.'+m[5]+':not([data-filtervalue*="'+m[7]+'"])');
			} else {
				// name
				var val = m[3] || m[2] || m[1];
				selectors.push('.name:not([data-filtervalue*="'+val+'"])');
			}
			i++;
		}
		console.log(selectors, tds.filter(selectors.join(',')));
		tds.filter(selectors.join(',')).parent().addClass('filtered');
		//$('.filtered').parent().addClass('filtered');
	}
	
	// run the initialization code
	if (!window.louFilterLoaded) init();
}(this, jQuery, mediaWiki));