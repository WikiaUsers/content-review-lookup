/*<pre>*/
///////////////////////
// Search Switchbox  //
///////////////////////

// Make sure we have namespace and group information.
if( !mwNamespaces ) includeJS( ( overrideNamespaces != undefined ? overrideNamespaces : 'MediaWiki:Namespaces.js' ) );
if( !mwGroups ) includeJS( ( overrideGroups != undefined ? overrideGroups : 'MediaWiki:Groups.js' ) );

//if( mwNamespaces && mwGroups ) addOnloadHook(makeSwitchbox);
//Vars
var switchBox = undefined;
var switchBody = undefined;
var searchHead = undefined;
var searchBody = undefined;
var searchForm = undefined;
var articleForm = undefined;
var editcountForm = undefined;
var indexForm = undefined;
var listuserForm = undefined;
var contribsForm = undefined;
//Functions
function makeSwitchbox() {
	if(!document.getElementById) return;
	//Grab Existant Elements and continue if they are found.
	var searchBox = document.getElementById("p-search");
	searchHead = searchBox.getElementsByTagName('h5')[0];
	searchBody = document.getElementById("searchBody");
	var searchFormForm = document.getElementById("searchform");
	if( searchBody && searchFormForm && mwNamespaces ) {
		switchBox = document.createElement( 'div' );
		switchBox.id = 'p-switch';
		switchBox.className = 'portlet';
		var h = document.createElement( 'h5' );
		h.appendChild( document.createTextNode( 'Switchbox' ) );
		switchBox.appendChild( h );
		switchBody = document.createElement( 'div' );
		switchBody.id = 'switchboxBody';
		switchBody.className = 'pBody';
		
		var ul = document.createElement( 'ul' );
		var li = document.createElement( 'li' );
		var a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'Search' ) );
		a.href = "javascript: switchboxSwitch( 'search' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'Article' ) );
		a.href = "javascript: switchboxSwitch( 'article' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'Editcount' ) );
		a.href = "javascript: switchboxSwitch( 'editcount' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'PageIndex' ) );
		a.href = "javascript: switchboxSwitch( 'index' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'Listusers' ) );
		a.href = "javascript: switchboxSwitch( 'listuser' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		li = document.createElement( 'li' );
		a = document.createElement( 'a' );
		a.appendChild( document.createTextNode( 'Contribs' ) );
		a.href = "javascript: switchboxSwitch( 'contribs' );";
		li.appendChild( a );
		ul.appendChild( li );
		
		switchBody.appendChild( ul );
		switchBox.appendChild( switchBody );
		document.getElementById( 'column-one' ).insertBefore( switchBox, searchBox );
		
		//Create Forms
		searchForm = new SwitchForm();
		searchForm.grab( 'searchform' );
		//	Article Box
		articleForm = new SwitchForm();
		articleForm.create( 'articleform', "/index.php", true );
		articleForm.appendInput( 'text', 'articleInput', 'title', '', 'Title' );
		articleForm.appendInput( 'submit', 'articleViewButton', 'action', 'view', 'View Article' );
		articleForm.appendInput( 'submit', 'articleEditButton', 'action', 'edit', 'Edit Article' );
		//	Editcount Box
		editcountForm = new SwitchForm();
		editcountForm.create( 'editcountform', "Special:Editcount" );
		editcountForm.appendInput( 'text', 'editcountUsername', 'username', '', 'Username' )
		editcountForm['username'].size = 20;
		editcountForm.appendInput( 'submit', 'editcountSubmitButton', 'submit', 'Submit' );
		//	PageIndex Box
		indexForm = new SwitchForm();
		indexForm.create( 'indexform', "/index.php", true );
		indexForm.appendLabel( '', 'Starting' );
		indexForm.appendInput( 'radio', 'indexAll', 'title', 'Special:Allpages', 'Allpages', true );
		indexForm.appendLabel( 'indexAll', 'At' );
		indexForm.appendInput( 'radio', 'indexPrefix', 'title', 'Special:Prefixindex', 'Prefixindex' );
		indexForm.appendLabel( 'indexPrefix', 'With' );
		indexForm.appendInput( 'text', 'indexFrom', 'from', '', 'Start From' );
		indexForm.appendSelect( 'indexNamespace', 'namespace', mwNamespaces, 'Namespace' );
		indexForm.appendInput( 'submit', 'indexSubmitButton', null, 'Go' );
		//	Listusers Box
		listuserForm = new SwitchForm();
		listuserForm.create( 'listusersform', "Special:Listusers" );
		listuserForm.appendSelect( 'listuserGroup', 'group', mwGroups, 'User Group' );
		listuserForm.appendInput( 'text', 'listuserUsername', 'username', '', 'Username' )
		listuserForm['username'].size = 20;
		listuserForm.appendInput( 'hidden', '', 'limit', '100' );
		listuserForm.appendInput( 'submit', 'listusersSubmitButton', 'submit', 'Go' );
		//	Contribs Box
		contribsForm = new SwitchForm();
		contribsForm.create( 'contribsform', "Special:Contributions" );
		contribsForm.appendInput( 'text', 'contribsUsername', 'target', '', 'Username' )
		contribsForm['target'].size = 20;
		mwNamespaces.splice( 0, 0, { value: '', data: '(all)' } );
		contribsForm.appendSelect( 'contribsNamespace', 'namespace', mwNamespaces, 'Namespace' );
		mwNamespaces.splice( 0, 1 );
		contribsForm.appendInput( 'hidden', '', 'limit', '100' );
		contribsForm.appendInput( 'submit', 'contribsSubmitButton', 'submit', 'Go' );
	}
}
function SwitchForm() {
	this.form = undefined;
	this.create = function( id, action, external ) {
		this.form = document.createElement( 'form' );
		if( external ) this.form.action = action;
		else this.form.action = '/index.php';
		this.form.id = id;
		this.form.name = id;
		if( !external ) this.appendInput( 'hidden', '', 'title', action );
		return this.form;
	};
	this.grab = function( id ) {
		this.form = document.getElementById( id );
		var INs = this.form.getElementsByTagName( 'input' );
		for ( var i = 0; i < INs.length; i++ ) {
			this[ INs[ i ].id ] = INs[ i ];
		}
		return this.form;
	};
	//Build Functions
	this.newInput = function( type, id, name, value, title, toggle ) {
		var input = document.createElement( 'input' );
		input.type = type;
		input.id = id;
		input.name = name;
		input.value = value;
		input.title = title;
		if( type == 'checkbox' ) input.checked = ( toggle ? true : false );
		if( type == 'radio' ) input.checked  = ( toggle ? true : false );
		this[ id ] = input;
		this[ name ] = input;
		return input;
	};
	this.newSelect = function( id, name, options, title ) {
		var select = document.createElement( 'select' );
		select.id = id;
		select.name = name;
		select.title = title;
		for( var o = 0; o < options.length; o++ ) {
			var option = document.createElement( 'option' );
			option.value = options[o].value;
			option.appendChild( document.createTextNode( options[o].data ) );
			select.appendChild( option );
		}
		this[ id ] = select;
		this[ name ] = select;
		return select;
	};
	this.newLabel = function( forID, text ) {
		var label = document.createElement( 'label' );
		label.setAttribute( 'for', forID );
		label.appendChild( document.createTextNode( text ) );
		return label;
	};
	
	this.appendInput = function( type, id, name, value, title, toggle ) {
		this.form.appendChild( this.newInput( type, id, name, value, title, toggle ) );
	};
	this.newInputBefore = function( old, type, id, name, value, title, toggle ) {
		this.form.insertBefore( this.newInput( type, id, name, value, title, toggle ), old );
	};
	this.newInputAfter = function( old, type, id, name, value, title, toggle ) {
		if( old.nextSibling )
			this.form.insertBefore( this.newInput( type, id, name, value, title, toggle ), old.nextSibling );
		else
			this.form.appendChild( this.newInput( type, id, name, value, title, toggle ) );
	};
	this.appendSelect = function( id, name, options, title ) {
		this.form.appendChild( this.newSelect( id, name, options, title ) );
	};
	this.newSelectBefore = function( old, id, name, options, title ) {
		this.form.insertBefore( this.newSelect( id, name, options, title ), old );
	};
	this.newSelectAfter = function( old, type, id, name, value, title ) {
		if( old.nextSibling )
			this.form.insertBefore( this.newSelect( id, name, options, title ), old.nextSibling );
		else
			this.form.appendChild( this.newSelect( id, name, options, title ) );
	};
	this.appendLabel = function( forID, text ) {
		this.form.appendChild( this.newLabel( forID, text ) );
	};
	this.newLabelBefore = function( old, forID, text ) {
		this.form.insertBefore( this.newLabel( forID, text ), old );
	};
	this.newLabelAfter = function( old, forID, text ) {
		if( old.nextSibling )
			this.form.insertBefore( this.newLabel( forID, text ), old.nextSibling );
		else
			this.form.appendChild( this.newLabel( forID, text ) );
	};
}

function switchboxSwitch( sw ) {
	searchBody.innerHTML = '';
	if( sw == 'article' ) { 
		searchHead.innerHTML = 'Article';
		searchBody.appendChild( articleForm.form );
	} else if( sw == 'editcount' ) {
		searchHead.innerHTML = 'Editcount';
		searchBody.appendChild( editcountForm.form );
	} else if( sw == 'index' ) {
		searchHead.innerHTML = 'PageIndex';
		searchBody.appendChild( indexForm.form );
	} else if( sw == 'listuser' ) {
		searchHead.innerHTML = 'Listusers';
		searchBody.appendChild( listuserForm.form );
	} else if( sw == 'contribs' ) {
		searchHead.innerHTML = 'Contributions';
		searchBody.appendChild( contribsForm.form );
	} else {
		searchHead.innerHTML = 'Search';
		searchBody.appendChild( searchForm.form );
	}
}
/*</pre>*/
/*
=Official Code ends=
----
*/

/*<big>'''''This is not the Official SearchSwitch! This is a temporary hack by Afker for use while the Official SearchSwitch is being rebuilt to work even better then either version.'''''</big>*/

/*<pre>*/
///////////////////////
// Search Switchbox  //
///////////////////////

// Can choose between the default list switcher or a dropdown box switcher
//var switcher = makeListSwitcher();
var switcher = makeDropDownSwitcher();

// Make sure we have namespace and group information.
if( !mwNamespaces ) includeJS( ( overrideNamespaces != undefined ? overrideNamespaces : 'MediaWiki:Namespaces.js' ) );
if( !mwGroups ) includeJS( ( overrideGroups != undefined ? overrideGroups : 'MediaWiki:Groups.js' ) );

if( mwNamespaces && mwGroups ) addOnloadHook(makeSwitchbox2);
//Vars
var switchBox = undefined;
var switchBody = undefined;
var searchHead = undefined;
var searchBody = undefined;
		
/* </pre>
== function makeSwitchbox2 ==
<pre> */
function makeSwitchbox2() {
	if(!document.getElementById) return;
	//Grab Existant Elements and continue if they are found.
	var searchBox = document.getElementById("p-search");
	searchHead = searchBox.getElementsByTagName('h5')[0];
	searchBody = document.getElementById("searchBody");
	var searchFormForm = document.getElementById("searchform");
	if( searchBody && searchFormForm && mwNamespaces ) {
//		switchBox = document.createElement( 'div' );
//		switchBox.id = 'p-switch2';
//		switchBox.className = 'portlet';
//		var h = document.createElement( 'h6' );
//		h.appendChild( document.createTextNode( 'Switchbox2' ) );
//		switchBox.appendChild( h );
//		switchBody = document.createElement( 'div' );
//		switchBody.id = 'switchboxBody';
//		switchBody.className = 'pBody';
		
//		searchBox.appendChild(switchBox).appendChild( switchBody ).appendChild(switcher.upperAttachPoint);

		searchBox.insertBefore(switcher.upperAttachPoint, searchHead);
		searchHead.style.display = 'none';
		
		//Create Forms
		makeSearchForm();
		makeArticleForm().style.display = 'none';
		makeEditcountForm().style.display = 'none';
		makeIndexForm().style.display = 'none';
		makeListuserForm().style.display = 'none';
		makeContribsForm().style.display = 'none';
		/*var oldBox = document.getElementById("p-switch");
		if (oldBox) {
			oldBox.parentNode.removeChild( oldBox);
		}*/
	}
}
/* </pre>

== switchers ==
<pre> */
/* </pre>
=== classSwitcher ===
<pre> */
function classSwitcher() {
	this.upperAttachPoint = undefined;
	this.lowerAttachPoint = undefined;
	this.labels = undefined;
	this.forms = undefined;
	this.curFormIndex = 0;

	this.toAttach = undefined;

	this.toSwitch = function(newFormIndex) {
		var oldForm = this.forms[this.curFormIndex];
		var newForm = this.forms[newFormIndex];
		var tempText = '';

		var oldInputs = oldForm.getElementsByTagName('INPUT');
		for (var i = 0; i < oldInputs.length; i++){
			if (oldInputs[i].type == 'text'){
				tempText = oldInputs[i].value;
				break;
			}
		}
		var newInputs = newForm.getElementsByTagName('INPUT');
		for (var i = 0; i < newInputs.length; i++){
			if (newInputs[i].type == 'text'){
				newInputs[i].value = tempText;
				break;
			}
		}

		oldForm.style.display = 'none';
		newForm.style.display = 'block';
		searchHead.firstChild.firstChild.nodeValue = this.labels[newFormIndex];
		this.curFormIndex = newFormIndex;
	}
}
/* </pre>

=== makeListSwitcher ===
<pre> */
function makeListSwitcher() {
	var thisSwitcher = new classSwitcher();
	thisSwitcher.labels = new Array();
	thisSwitcher.forms = new Array();

	thisSwitcher.upperAttachPoint = document.createElement( 'ul' );
	thisSwitcher.lowerAttachPoint = thisSwitcher.upperAttachPoint;

	thisSwitcher.toAttach = function(switchForm, label){
		var newIndex = thisSwitcher.labels.length;

		var a = document.createElement('a');
		a.appendChild( document.createTextNode(label) );
		a.href = "javascript:switcher.toSwitch(" + newIndex + ");";
		var li = document.createElement('li');
		li.appendChild(a)
		thisSwitcher.lowerAttachPoint.appendChild(li);

		thisSwitcher.labels.push(label);
		thisSwitcher.forms.push(switchForm.form);
		return searchBody.appendChild(switchForm.form);
	}
	return thisSwitcher;
}
/* </pre>

=== makeDropDownSwitcher ===
<pre> */

function makeDropDownSwitcher() {
//alert("makeDropDownSwitcher is called");
	var thisSwitcher = new classSwitcher();
	thisSwitcher.labels = new Array();
	thisSwitcher.forms = new Array();

	thisSwitcher.upperAttachPoint = document.createElement( 'form' );
	if (navigator.appName=="Microsoft Internet Explorer"){
		thisSwitcher.upperAttachPoint.innerHTML = '<select onChange="javascript:switcher.dropSwitch();"></select>';
		thisSwitcher.lowerAttachPoint = thisSwitcher.upperAttachPoint.firstChild;
	} else {
		thisSwitcher.lowerAttachPoint = thisSwitcher.upperAttachPoint.appendChild(document.createElement('select'));
		thisSwitcher.lowerAttachPoint.setAttribute('onChange', 'javascript:switcher.dropSwitch();');
	}
	thisSwitcher.lowerAttachPoint.style.fontWeight = "bold";

	thisSwitcher.toAttach = function(switchForm, label){
		var opt = document.createElement('option');
		opt.value = label;
		opt.text = label;
//		opt.style.fontWeight = "bold";

		try {
			thisSwitcher.lowerAttachPoint.add(opt, null);
		} catch (e){
			thisSwitcher.lowerAttachPoint.add(opt);
		}

		thisSwitcher.labels.push(label);
		thisSwitcher.forms.push(switchForm.form);
		return searchBody.appendChild(switchForm.form);
	}

	thisSwitcher.dropSwitch = function(){
		thisSwitcher.toSwitch(thisSwitcher.lowerAttachPoint.selectedIndex);
	}
	return thisSwitcher;
}

/* </pre>

== individual search forms ==
<pre> */
function makeSearchForm() {
	var searchForm = new SwitchForm();
	searchForm.grab( 'searchform' );

	return switcher.toAttach(searchForm, 'Search');
}
function makeArticleForm(){
	var articleForm = new SwitchForm();
	articleForm.create( 'articleform', "/index.php", true );
	articleForm.appendInput( 'text', 'articleInput', 'title', '', 'Title' );
	articleForm.appendInput( 'submit', 'articleViewButton', 'action', 'view', 'View Article' );
	articleForm.appendInput( 'submit', 'articleEditButton', 'action', 'edit', 'Edit Article' );

	return switcher.toAttach(articleForm, 'Article');
}
function makeEditcountForm() {
	var editcountForm = new SwitchForm();
	editcountForm.create( 'editcountform', "Special:Editcount" );
	editcountForm.appendInput( 'text', 'editcountUsername', 'username', '', 'Username' )
	editcountForm['username'].size = 20;
	editcountForm.appendInput( 'submit', 'editcountSubmitButton', 'submit', 'Submit' );

	return switcher.toAttach(editcountForm, 'Editcount');
}
function makeIndexForm() {
	var indexForm = new SwitchForm();
	indexForm.create( 'indexform', "/index.php", true );

/*
	if (navigator.appName=="Microsoft Internet Explorer"){
		indexForm.innerHTML = '<label>Starting</label>';
		indexForm.innerHTML += '<input type="radio" id="indexAll" name="title" value="Special:Allpages" title="Allpages" checked="true">';
		indexForm.innerHTML += '<label for="indexAll">At</label>';
	}
	else {
*/
		indexForm.appendLabel( '', 'Starting' );
		indexForm.appendInput( 'radio', 'indexAll', 'title', 'Special:Allpages', 'Allpages', true );
		indexForm.appendLabel( 'indexAll', 'At' );
//	}
	indexForm.appendInput( 'radio', 'indexPrefix', 'title', 'Special:Prefixindex', 'Prefixindex' );
	indexForm.appendLabel( 'indexPrefix', 'With' );
	indexForm.appendInput( 'text', 'indexFrom', 'from', '', 'Start From' );
	indexForm.appendSelect( 'indexNamespace', 'namespace', mwNamespaces, 'Namespace' );
	indexForm.appendInput( 'submit', 'indexSubmitButton', null, 'Go' );

	return switcher.toAttach(indexForm, 'PageIndex');
}
function makeListuserForm() {
	var listuserForm = new SwitchForm();
	listuserForm.create( 'listusersform', "Special:Listusers" );
	listuserForm.appendSelect( 'listuserGroup', 'group', mwGroups, 'User Group' );
	listuserForm.appendInput( 'text', 'listuserUsername', 'username', '', 'Username' )
	listuserForm['username'].size = 20;
	listuserForm.appendInput( 'hidden', '', 'limit', '100' );
	listuserForm.appendInput( 'submit', 'listusersSubmitButton', 'submit', 'Go' );

	return switcher.toAttach(listuserForm, 'Listusers');
}
function makeContribsForm() {
	var contribsForm = new SwitchForm();
	contribsForm.create( 'contribsform', "Special:Contributions" );
	contribsForm.appendInput( 'text', 'contribsUsername', 'target', '', 'Username' )
	contribsForm['target'].size = 20;
	mwNamespaces.splice( 0, 0, { value: '', data: '(all)' } );
	contribsForm.appendSelect( 'contribsNamespace', 'namespace', mwNamespaces, 'Namespace' );
	mwNamespaces.splice( 0, 1 );
	contribsForm.appendInput( 'hidden', '', 'limit', '100' );
	contribsForm.appendInput( 'submit', 'contribsSubmitButton', 'submit', 'Go' );

	return switcher.toAttach(contribsForm, 'Contribs');
}

/*</pre>*/