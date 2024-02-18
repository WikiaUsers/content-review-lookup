// <syntaxhighlight lang="javascript">
if (mwCustomEditButtons) {
}

//fix edit summary prompt for undo
//this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the edit summary unchanged
//this was added by [[User:Deskana]], code by [[User:Tra]]
//see bug 8912
addOnloadHook(function () {
    if (document.location.search.indexOf("undo=") != -1
        && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
})

/** Edittools javascript loader ************************************************
 *
 *  Description: Pulls in [[MediaWiki:Edittools.js]]. Includes a cache-bypassing
 *  version number in the URL in order to allow any changes to the edittools to
 *  be rapidly deployed to users.
 *
 *  Note that, by default, this function does nothing unless the element with
 *  the ID "editpage-specialchars" (which contains the old edittools code in
 *  [[MediaWiki:Edittools]], and will be retained as a placeholder in the new
 *  implementation) has a class named "edittools-version-NNN", where NNN is a
 *  number.  If the class name has "test" before the number, the code will only
 *  run for users who have set "window.testJsEdittools = true" in their user JS.
 *  The "test" should be retained in the class name until the new edittools
 *  implementation is ready and fully tested, and until at least 30 days have
 *  passed since this loader stub was added (which will be in 27 June 2008).
 *
 *  For compatibility with Alex Smotrov's original implementation, on which this
 *  code is loosely based (see [[mw:User talk:Alex Smotrov/edittools.js]]), this
 *  loader can also be disabled by setting "window.noDefaultEdittools = true".
 *
 *  Maintainers: [[User:Ilmari Karonen]]
 */
 /*
addOnloadHook(function () {
    // needs to be deferred until the DOM has fully loaded
    var placeholder = document.getElementById("editpage-specialchars");
    if (!placeholder || window.noDefaultEdittools) return;
    var match = /(?:^| )edittools-version-(\d+)(?: |$)/.exec(placeholder.className);
 
    // set window.testJsEdittools = true to enable testing before full deployment
    if (!match && window.testJsEdittools)
        match = /(?:^| )edittools-version-(test\d+)(?: |$)/.exec(placeholder.className);
 
    if (!match) return;
    //var url = wgScript + '?title=MediaWiki:Edittools.js&action=raw&ctype=text/javascript&nocache=' + match[1];
    var url = wgScript + '?title=MediaWiki:Edittools.js&action=raw&ctype=text/javascript';
    importScriptURI(url);
});
*/

/**
Adjusting the edit toolbar
*/
addOnloadHook(function(){
	// Adjust symbol toolbar
	var wpEditToolbar=document.getElementById("toolbar");
	if(!wpEditToolbar){return;}
	var editspecialchars=document.getElementById("editpage-specialchars");
	if (editspecialchars) {
		function chooseCharSubset() {// select subsection of special characters
			var s=menu.selectedIndex;
			for (var i = 0,p; p=lines[i] ; i++) {
				p.style.display = i == s ? 'inline' : 'none';
			}
		}
		// Add drop-down menu for special symbols
		var lines = editspecialchars.getElementsByTagName('p');
		var menu=createElement("select",null,{
			'styles':{'display':"inline"},
			'events':{'change':chooseCharSubset}
		});
		for (var i = 0,p; p=lines[i] ; i++) {
			menu.options[i]=new Option(p.title?p.title:p.id);
		}
		editspecialchars.insertBefore(menu,editspecialchars.firstChild);
		chooseCharSubset();
		// Moving the drop-down menu for special symbols
		elementMoveto(editspecialchars , wpEditToolbar , 'after' );
	}
});
/**
Edit summary
*/
function createSummaryInput()
{
	var wpSummaryLabel=document.getElementById("wpSummaryLabel");
	if(!wpSummaryLabel){return;}
	var form = document.getElementById('editform');
	var summarys={};
	var i=0;
	function add(label,summary){
		var val='summary'+(i++);
		summarys[val]=summary;
		var option=new Option(label,val);
		return menu.options[menu.options.length]=option;
	}
	var menu=createElement(
		"select",
		[new Option("Summary type")],
		{id:"summaryMenu",size:1,events:{'change':function(){
			var key=menu.options[menu.selectedIndex].value;
			var s=summarys[key];
			if(s){form.wpSummary.value += ' '+s;}
			menu.selectedIndex=0;
		}}}
	);
	add('New article','New article');
	add('Modifier','Modifier');
	add('Correcting typos','Correcting typos');
	add('Content expansion','Content expansion');
	add('Layout','Adjusting formats, layouts');
	add('Paragraph chapters','Move or adjust paragraph sections');
	add('Internal links','Add or adjust internal links');
	add('Category','Add or adjust categories');
	add('Stub label','Add or adjust stub label');
	add('Disambiguation','Disambiguation');
	add('Articlisation','Articlisation');
	add('Marking for deletion','Submit deletion discussion or speedy deletion request');
	add('Copyright violation','Submit copyright violation request');
	add('Welcome','Welcome users');
	add('Warn','Warn users');
	wpSummaryLabel.appendChild(menu);
 
	//When submitting a new paragraph, disable the subject line under certain circumstances.
	if(document.getElementById('no-new-title') && document.editform.wpSection.value=="new") {
		menu.disabled=true;
		if(summaryinput) summaryinput.disabled=true;
	}
}
addOnloadHook(createSummaryInput);

// </syntaxhighlight>

// [[Category:JavaScript pages]]