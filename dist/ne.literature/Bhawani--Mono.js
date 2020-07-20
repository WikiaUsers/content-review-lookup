/**
 * Beginning of Transliteration Tool
 * Author: Junaid P V [[user:Junaidpv]]
 * added date: 2010-09-28
 */
function addOptionToSimpleSearch() {
	var searchform=document.getElementById('searchform');
	var searchInput=document.getElementById('searchInput');
	
	var transListBox = document.createElement("select");
	transListBox.style.fontSize="0.9em";
	transListBox.style.marginBottom = "0.1em";
	if (transListBox.addEventListener) 
		transListBox.addEventListener("change", writingStyleLBChanged, false);
	else if (transListBox.attachEvent) 
		transListBox.attachEvent("onchange", writingStyleLBChanged);
	
	var numOfSchemes = transettings.schemes.length;
	for(var i=0; i < numOfSchemes; i++) {
		var schemeOption = document.createElement("option");
		schemeOption.appendChild( document.createTextNode(transettings.schemes[i].text) );
		schemeOption.value = transettings.schemes[i].text;
		if(transettings.default_scheme_index==i) schemeOption.selected=true;
		transListBox.appendChild( schemeOption );
	}
	searchform.insertBefore(transListBox,searchInput);
}
importScriptURI('//ne.wikipedia.org/w/index.php?title=User:Bhawani Gautam/translit.js&action=raw&ctype=text/javascript');
importScriptURI('//ne.wikipedia.org/w/index.php?title=User:Bhawani Gautam/Inscript.js&action=raw&ctype=text/javascript');
importScriptURI('//ne.wikipedia.org/w/index.php?title=User:Bhawani Gautam/Nepali.js&action=raw&ctype=text/javascript');
function transetup() {

	transettings.schemes[0] = tr_sa;
	transettings.schemes[1] = tr_sa_inscript;
	transettings.shortcut.controlkey =true;
	transettings.shortcut.key = 'M';
	transettings.checkbox.text =  "नेपाली ("+transettings.shortcut.toString()+")";
	transettings.checkbox.link.href = "//sa.wikipedia.org/wiki/Help:Typing";
	transettings.checkbox.simple_text = 'नेपाली';
	transettings.checkbox.link.tooltip = "नेपाली टाइप गर्न यसको प्रयोग गर्नुहोस्, की बोर्डबाट: "+transettings.shortcut.toString();
	setDefaultSchmeIndex(readCookie("transToolIndex"));

	transliterate('searchInput', 'wpTextbox1', 'wpSummary', 'searchText', 'powerSearchText', 'wpNewTitle', 'wpReason', 'nsfrom', 'username', 'mwProtect-reason', 'nsto','wpText',  'wpUploadDescription', 'wpDestFile');
	addTransliterationOption('searchInput', 'searchText', 'powerSearchText', 'wpNewTitle', 'wpReason', 'nsfrom', 'username', 'mwProtect-reason', 'nsto','wpText', 'wpUploadDescription', 'wpDestFile');
	transettings.checkbox.position = "before";
	addTransliterationOption( 'wpTextbox1', 'wpSummary' );
	addOptionToSimpleSearch();
	initMultiScheme();
	translitStateSynWithCookie('searchInput', 'wpTextbox1', 'wpSummary', 'searchText', 'powerSearchText', 'wpNewTitle', 'wpReason', 'nsfrom', 'username', 'mwProtect-reason', 'nsto','wpText');
}

if (window.addEventListener){
	window.addEventListener('load', transetup, false);
} else if (window.attachEvent){
	window.attachEvent('onload', transetup);
}
/* End of Transliteration Tool */