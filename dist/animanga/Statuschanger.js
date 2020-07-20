/*<pre>*/

/////////////////////////////////////////////////
// Status changer functions.                   //
//   From [[User:Dantman/monobook.js]]         //
//     From [[w:User:Essjay/statuschanger.js]] //
/////////////////////////////////////////////////

var statusSubpage;
var statusScheme;
var statusTypes;
var stressSubpage;
var stressScheme;
var stressTypes;

/*** Status/Stress changer ***/
function tryStatusChange() {
	if(wgPageName == "User:"+wgUserName+statusSubpage && queryString('action',true).match(/edit|submit/) && queryString('newstatus')) {
		//Are we here to auto-edit the status?
		//Get new status
		status = queryString('newstatus');
		//Modify the form
		document.getElementById('wpTextbox1').value = "{{:User:"+wgUserName+statusScheme+"|"+status+"}}";
		document.getElementById('wpSummary').value = "Status: "+status;
		document.getElementById('wpMinoredit').checked = 'checked';
		//Submit it!
		document.getElementById('editform').submit();
	} else if (wgPageName.match(RegExp('User:'+wgUserName+'('+statusSubpage+'|'+stressSubpage+')$')) && !queryString('action')) {
		//Are we at the Status page. Assuming we came here after an edit.
		//Return us to the userpage after an edit.
		location.href = wgServer+wgArticlePath.replace('$1','User:'+wgUserName);
	} else if(wgPageName == "User:"+wgUserName+stressSubpage && queryString('action',true).match(/edit|submit/) && queryString('newstress')) {
		//Are we here to auto-edit the status?
		//Get new status
		stress = queryString('newstress');
		//Modify the form
		document.getElementById('wpTextbox1').value = "{{:User:"+wgUserName+stressScheme+"|"+stress+"}}";
		document.getElementById('wpSummary').value = "Status: "+stress;
		document.getElementById('wpMinoredit').checked = 'checked';
		//Submit it!
		document.getElementById('editform').submit();
	}
}

function addStatusButtonsToMenu( Menu, asSelfmenu, addStatus, addStress ) {
	/* Add Self Menu */
	if(isStatusChange || isStressChange) {
		//Start status changer.
		tryStatusChange();
		var SelfMenu;
		if( asSelfmenu ) {
			Menu.append( 'ca-self', 'Self', null, 'Self Menu', true );
			SelfMenu = new PortletMenu( 'ca-self' );
		}
		
		var linkprefix = wgServer + "/index.php?title=User:";
		
		if(isStatusChange && addStatus && statusTypes) {
			/* Add Status Changer Action Tab */
			( asSelfmenu ? SelfMenu : Menu ).append( 'ca-self-mystatus', 'My Status', null, 'My Status', true );
			MyStatus = new PortletMenu( 'ca-self-mystatus' );
			
			//Add the links
			MyStatus.append( "cs-self-status-s", "Status", linkprefix+wgUserName+statusSubpage+"&action=purge", "Status" );
			MyStatus.appendSeperator();
			for( var s = 0; s < statusTypes.length; s++ ) {
				if( !statusTypes[s] ) MyStatus.appendSeperator();
				else  MyStatus.append( "cs-self-status-"+statusTypes[s].id,
						statusTypes[s].name,
						linkprefix+wgUserName+statusSubpage+"&action=edit&newstatus="+statusTypes[s].id,
						statusTypes[s].title);
			}
		}
		if(isStressChange && addStress && stressTypes) {
			/* Add Stress Changer Action Tab */
			( asSelfmenu ? SelfMenu : Menu ).append( 'ca-self-mystress', 'My Stress', null, 'My Stress', true );
			MyStress = new PortletMenu( 'ca-self-mystress' );
			
			//Add the links
			MyStress.append( "cs-self-stress-s", "Stress", linkprefix+wgUserName+stressSubpage+"&action=purge", "Stress" );
			MyStress.appendSeperator();
			for( var s = 0; s < stressTypes.length; s++ ) {
				if( !stressTypes[s] ) MyStress.appendSeperator();
				else MyStress.append( "cs-self-stress-"+stressTypes[s].id,
						stressTypes[s].name,
						linkprefix+wgUserName+stressSubpage+"&action=edit&newstress="+stressTypes[s].id,
						stressTypes[s].title);
			}
		}
	}
}

/*</pre>*/