/*<pre>*/

////////////////////////////////////////////
// WikiSwitch.                            //
//   From [[User:Dantman/monobook.js]]    //
////////////////////////////////////////////

//UserVars
var addWikiSwitchMenu;//Adds the wikiswitch menu.
var addUserSwitchMenu;//Adds a wikiswitch for your userpages.
var addTalkSwitchMenu;//Adds a wikiswitch for your usertalkpages.
var addWikiSwitchPageClone;//Adds a Clone button to wikiswitch tabs.
var addWikiSwitchPageDiff;//Adds a Diff button to wikiswitch tabs.
/**** Clone Notes ****
* A prompt is always made before starting the page clone as a safety measure so that you don't copy anything over mistakenly.
* Do not use this tool for negative purposes, other than you being blocked for it's use, it's also possible to have a hardcoded list of users who are allowed to use this tool. Meaning that if it's used to commonly for negative purposes then common users will not be able to use it anymore.
*/

var WikiSwitchSelf = undefined;

var wikiswitch = {
	makeTabs: function() {
		var link = window.location.href.replace(/^([^\/]+:\/\/)([^\/]+)(\/.*)$/, '$3')
		var projectNS = 'Project';
		var defaultmainpage = 'Main_Page';
		var mainpage = defaultmainpage;
		if( wikiswitch.getCurrent() !== false ) {
			projectNS = wikiaDomainList[wikiswitch.getCurrent()].projectNS ? wikiaDomainList[wikiswitch.getCurrent()].projectNS : 'Project';
			mainpage  = wikiaDomainList[wikiswitch.getCurrent()].mainpage == undefined ? defaultmainpage : wikiaDomainList[wikiswitch.getCurrent()].mainpage;
		}
		
		if( addWikiSwitchMenu ) {
			/* Add Wikia Switch Action Tab */
			PageMenu.append( 'wikiswitch', 'Wikia', null, 'Wikiswitch', true );
			WikiSwitch = new PortletMenu( 'wikiswitch' );
			for( var w = 0; w < wikiaDomainList.length; w++ ) {
				if( !wikiaDomainList[w] ) WikiSwitch.appendSeperator();
				else {
					newPageName = wgPageName.replace(
						RegExp('(' + mainpage + '|' + defaultmainpage + ')'),
						( wikiaDomainList[w].mainpage == undefined ? defaultmainpage : wikiaDomainList[w].mainpage )).replace(
						RegExp('^'+projectNS+':'), wikiaDomainList[w].projectNS+':');
					
					REindex = RegExp('(index\\.php\\?title=)([^&]*)(&.*)$');
					WikiSwitch.append( 'cs-wikiswitch-'+wikiaDomainList[w].id, wikiaDomainList[w].name,
						wikiswitch.convertTitle( w, link ),
						wikiaDomainList[w].title, true );
					Wikimenu = new PortletMenu( 'cs-wikiswitch-'+wikiaDomainList[w].id );
					//Add View, Edit, Main Page, and Recent Changes links to each wiki.
					Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-view', 'View',
						wikiswitch.convertTitle( w, link, 'view' ), 'View ' + newPageName );
					Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-edit', 'Edit',
					wikiswitch.convertTitle( w, link, 'edit' ), 'Edit ' + newPageName );
					Wikimenu.appendSeperator();
					Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-mainpage', 'Mainpage',
						'http://'+wikiaDomainList[w].domain+wgArticlePath.replace('$1', ( wikiaDomainList[w].mainpage == undefined ? defaultmainpage : wikiaDomainList[w].mainpage ) ), 'Mainpage('+( wikiaDomainList[w].mainpage == undefined ? defaultmainpage : wikiaDomainList[w].mainpage )+')' );
					Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-recentchanges', 'Recentchanges',
						'http://'+wikiaDomainList[w].domain+wgArticlePath.replace('$1', 'Special:Recentchanges'), 'Special:Recentchanges' );
					if( addWikiSwitchPageClone ) {
						Wikimenu.appendSeperator();
						Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-clone', 'Clone',
							wgServer+'/index.php?title='+encodeURIComponent(wgPageName.replace(/ /g, '_'))+'&action=edit&WPCAction=safeClone&WPCWiki='+wikiaDomainList[w].id,
							'Safe Clone', true );
						Clonemenu = new PortletMenu( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-clone' );
						Clonemenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-clone-auto', 'Auto',
							"javascript: wikiswitch.pageClone('" + wikiaDomainList[w].id + "');", 'Auto Clone' );
					}
					if( addWikiSwitchPageDiff ) {
						Wikimenu.append( 'cs-wikiswitch-'+wikiaDomainList[w].id+'-diff', 'Diff',
							wgServer+'/index.php?title='+encodeURIComponent(wgPageName.replace(/ /g, '_'))+'&action=edit&WPCAction=diff&WPCWiki='+wikiaDomainList[w].id,
							'Diff');
					}
				}
			}
		}
		
		if( addUserSwitchMenu ) {
			/* Add User Switch Menu */
			//Hop and skip over user link. (Create temp menu, delete user link, create menu to replace user link tab, then delete temp menu.)
			UserMenu.insertBefore( 'pt-userpage', 'pt-userpagetemp', UserMenu.getText( 'pt-userpage' ), UserMenu.getHref( 'pt-userpage' ), 'Userswitch', true );
			UserMenu.addClass( 'pt-userpagetemp', UserMenu.getClass( 'pt-userpage' ) );
			UserMenu.addLinkClass( 'pt-userpagetemp', UserMenu.getLinkClass( 'pt-userpage' ) );
			RemoveNode( 'pt-userpage' );
			UserMenu.insertBefore( 'pt-userpagetemp', 'pt-userpage', UserMenu.getText( 'pt-userpagetemp' ), UserMenu.getHref( 'pt-userpagetemp' ), 'Userswitch', true );
			UserMenu.addClass( 'pt-userpage', UserMenu.getClass( 'pt-userpagetemp' ) );
			UserMenu.addLinkClass( 'pt-userpage', UserMenu.getLinkClass( 'pt-userpagetemp' ) );
			RemoveNode( 'pt-userpagetemp' );
			UserSwitch = new PortletMenu( 'pt-userpage' );
			
			for( var w = 0; w < wikiaDomainList.length; w++ ) {
				if( !wikiaDomainList[w] ) UserSwitch.appendSeperator();
				else UserSwitch.append( 'pt-userswitch-'+wikiaDomainList[w].id, wikiaDomainList[w].name,
						'http://'+wikiaDomainList[w].domain+wgArticlePath.replace('$1','User:'+wgUserName), wikiaDomainList[w].title+' - '+wgUserName );
			}
		}
		
		if( addTalkSwitchMenu ) {
			/* Add Talk Switch Menu */
			//Hop and skip over talk link. (Create temp menu, delete talk link, create menu to replace talk link tab, then delete temp menu.)
			UserMenu.insertBefore( 'pt-mytalk', 'pt-mytalktemp', UserMenu.getText( 'pt-mytalk' ), UserMenu.getHref( 'pt-mytalk' ), 'Talkswitch', true );
			UserMenu.addClass( 'pt-mytalktemp', UserMenu.getClass( 'pt-mytalk' ) );
			UserMenu.addLinkClass( 'pt-mytalktemp', UserMenu.getLinkClass( 'pt-mytalk' ) );
			RemoveNode( 'pt-mytalk' );
			UserMenu.insertBefore( 'pt-mytalktemp', 'pt-mytalk', UserMenu.getText( 'pt-mytalktemp' ), UserMenu.getHref( 'pt-mytalktemp' ), 'Talkswitch', true );
			UserMenu.addClass( 'pt-mytalk', UserMenu.getClass( 'pt-mytalktemp' ) );
			UserMenu.addLinkClass( 'pt-mytalk', UserMenu.getLinkClass( 'pt-mytalktemp' ) );
			RemoveNode( 'pt-mytalktemp' );
			TalkSwitch = new PortletMenu( 'pt-mytalk' );
			
			for( var w = 0; w < wikiaDomainList.length; w++ ) {
				if( !wikiaDomainList[w] ) TalkSwitch.appendSeperator();
				else TalkSwitch.append( 'pt-talkswitch-'+wikiaDomainList[w].id, wikiaDomainList[w].name,
						'http://'+wikiaDomainList[w].domain+wgArticlePath.replace('$1', 'User_talk:'+wgUserName), wikiaDomainList[w].title+' - '+wgUserName+' talk' );
			}
		}
	},
	getCurrent: function() {
		if( WikiSwitchSelf !== undefined ) return WikiSwitchSelf;
		for( var w = 0; w < wikiaDomainList.length; w++ ) {
			if( wikiaDomainList[w] ) {
				if( wgServer == 'http://'+wikiaDomainList[w].domain ) {
					WikiSwitchSelf = w;
					return w;
				}
			}
		}
		WikiSwitchSelf = false;
		return false;
	},
	convertTitle: function( newWiki, link, mode, query ) {
		var projectNS = 'Project';
		var defaultmainpage = 'Main_Page';
		var mainpage = defaultmainpage;
		if( wikiswitch.getCurrent() !== false ) {
			projectNS = ( wikiaDomainList[wikiswitch.getCurrent()].projectNS ? wikiaDomainList[wikiswitch.getCurrent()].projectNS : 'Project' );
			mainpage  = ( wikiaDomainList[wikiswitch.getCurrent()].mainpage == undefined ? defaultmainpage : wikiaDomainList[wikiswitch.getCurrent()].mainpage );
		}
		
		var newPageName = wgPageName.replace(
			RegExp('^(' + mainpage + '|' + defaultmainpage + ')$'),
			( wikiaDomainList[newWiki].mainpage == undefined ? defaultmainpage : wikiaDomainList[newWiki].mainpage )).replace(
			RegExp('^'+projectNS+':'), wikiaDomainList[newWiki].projectNS+':');
		
		REindex = RegExp('^.*(/index\\.php\\?title=)([^&]*)(&.*)$');
		RElocal = RegExp('^http://[^/]+(/.*)?$');
		
		if( mode == 'view' ) link = 'http://'+wikiaDomainList[newWiki].domain+( query ? '/index.php?title='+encodeURIComponent(newPageName.replace(/ /g, '_'))+'&'+query : wgArticlePath.replace('$1', newPageName) );
		else if( mode == 'edit' ) link = 'http://'+wikiaDomainList[newWiki].domain+'/index.php?title='+encodeURIComponent(newPageName.replace(/ /g, '_'))+'&action=edit'+( query ? '&'+query : '' );
		else link = 'http://'+wikiaDomainList[newWiki].domain+( wgNamespaceNumber < 0 ? link.replace(RElocal, '$1') :(link.match(REindex) ? link.replace(REindex, '$1'+encodeURIComponent(newPageName.replace(/ /g, '_'))+'$3') : ( query ? '/index.php?title='+encodeURIComponent(newPageName.replace(/ /g, '_'))+'&'+query : wgArticlePath.replace('$1', newPageName) ) ) );

		return link
	},
	pageClone: function(wiki) {
		if( wiki == '' || wiki == undefined || wiki == null ) return false;
		if( addWikiSwitchPageClone ) {
			var doClone = confirm('Are you sure you wish to clone this page to ' + wiki + '?');
			if( doClone ) {
				document.location.href = wgServer+'/index.php?title='+encodeURIComponent(wgPageName.replace(/ /g, '_'))+'&action=edit&WPCAction=clone&WPCWiki='+wiki;
			}
		}
	},
	tryAction: function() {
		if( addWikiSwitchPageClone || addWikiSwitchPageDiff ) {
			var WPCAction = queryString('WPCAction',true);
			var WPCWiki = queryString('WPCWiki');
			if( queryString('action',true).match(/^(edit|submit)$/) ) {
				var wi = undefined;
				for( var w = 0; w < wikiaDomainList.length; w++ ) {
					if( wikiaDomainList[w] ) {
						if( WPCWiki == wikiaDomainList[w].id ) {
							wi = w;
							break;
						}
					}
				}
				if( wi ) {
					if( WPCAction.match(/^(clone|safeClone|diff)$/) ) {
						//Alter the Location
						document.getElementById('editform').action = wikiswitch.convertTitle( wi, document.getElementById('editform').action, 'action=submit&WPCAction=forceEdit' );
						// Find the link to use. Do a robust check which will work on something in WikiSwitch, on Wikia, and a fallback for any other wiki like Wikipedia to make it global.js and external clone compatible.
						var link;
						if( wikiswitch.getCurrent() !== false ) {
							link = '[[' + ( wikiaDomainList[wikiswitch.getCurrent()].interwiki ? wikiaDomainList[wikiswitch.getCurrent()].interwiki : 'w:c:'+wikiaDomainList[wikiswitch.getCurrent()].id+':' ) + wgPageName + ']]';
						} else {
							var re = /^[^\/]+:\/\/([^\/]+)\.wikia\.com.*$/;
							var matches;
							matches = re.exec(wgServer);
							if( !matches ) matches = re.exec(wgServer);
							if( matches && matches.length > 1 ) {
								link = '[[w:c:' + decodeURI(matches[1]) + ':' + wgPageName + ']]';
							} else {
								link = '[' + wgServer + wgArticlePath.replace('$1', encodeURIComponent( wgPageName.replace( / /g, '_' ) )) + ' ' + wgPageName + ']';
							}
						}
						document.getElementById('wpSummary').value = "WikiSwitch Page clone from "
							+ link + ".";
						document.getElementById('wpMinoredit').checked = 'checked';
						//Submit it!						
						if( WPCAction == 'diff' && addWikiSwitchPageDiff ) {
							document.getElementById('wpDiff').click();
						} else if( WPCAction == 'clone' && addWikiSwitchPageClone ) {
							document.getElementById('editform').submit();
						} else if( addWikiSwitchPageClone ) {
							document.getElementById('wpPreview').click();
						}
					} else if( WPCAction == 'forceEdit' ) {
						//Override Edit Conflict
						/* I'll get arround to this... Someday... */
					}
				}
			}
		}
	}
}
addOnloadHook(wikiswitch.makeTabs);
addOnloadHook(wikiswitch.tryAction);

/*</pre>*/