importScriptPage('ShowHide/code.js', 'dev');

sortfn = ts_sort_caseinsensitive;
	if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^[\u00a3$\u20ac]/)) // pound dollar euro
		sortfn = ts_sort_currency;
	if (itm.match(/^[\d.,\-]+\%?$/))
		sortfn = ts_sort_numeric;