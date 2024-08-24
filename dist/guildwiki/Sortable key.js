/* Used by [[MediaWiki:sortable_mod.js]] 
 */
/* 
=== key functions ===
<pre> */
/* </pre>
==== key_caseinsensitive(a) ====
<pre> */
function key_caseinsensitive(a) {
	return a.toLowerCase();
}
/* </pre>
==== key_date(date) ====
<pre> */
function key_date(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	dt = "00000000";
	if (date.length == 11) {
		monthstr = date.substr(3,3);
		monthstr = monthstr.toLowerCase();
		switch(monthstr) {
			case "jan": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "apr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "aug": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dec": var month = "12"; break;
			// default: var month = "00";
		}
		dt = date.substr(7,4)+month+date.substr(0,2);
		return dt;
	} else if (date.length == 10) {
		if (europeandate == false) {
			dt = date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
			return dt;
		} else {
			dt = date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
			return dt;
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (europeandate == true) {
			dt = yr+date.substr(3,2)+date.substr(0,2);
			return dt;
		} else {
			dt = yr+date.substr(0,2)+date.substr(3,2);
			return dt;
		}
	}
	return dt;
}
/* </pre>
==== convert_numeric(a) ====
<pre> */
function convert_numeric(a){
	return a.replace(/¼/, ".25").replace(/½/, ".5").replace(/¾/, ".75").replace(/,/, "");
}
/* </pre>
==== key_numeric(a) ====
<pre> */
function key_numeric(a){
	a = parseFloat(a);
	a = (isNaN(a) ? 0 : a);
	return a;
}
/* </pre>

==== key_numeric_unit(a) ====
<pre> */
function key_numeric_unit(a) {
	var aa_idx = a.search(/[^\d.¼½¾]/);
	var aa_num = key_numeric(convert_numeric(a.substr(0,aa_idx)));
	var aa_unit = key_unit(a.substr(aa_idx));
	if (aa_num == 0){
		aa_unit='';
	}
//debug('Parsing "'+a+'" as "'+aa_unit+'" and "'+aa_num+'"');
	return [aa_unit, aa_num];
}
/* </pre>

==== key_unit_numeric(a) ====
<pre> */
function key_unit_numeric(a) {
	var aa_idx = a.search(/[\d.¼½¾]/);
	var aa_unit = a.substr(0,aa_idx);
	var aa_num = convert_numeric(a.substr(aa_idx));
	return [key_unit(aa_unit), key_numeric(aa_num)];
}
/* </pre>

==== key_unit(a) ====
<pre> */
function key_unit(a) {
	return key_caseinsensitive(trim(a));
}
/* </pre>
*/