/*<pre>*/

////////////////////////////////////////////
// Basic tabs.                            //
//   From [[User:Dantman/monobook.js]]    //
//     From [[w:User:Essjay/monobook.js]] //
////////////////////////////////////////////

//UserVars
var addDiff;//Adds Diff link in a menu under History.
var addPurge;//Adds a Purge link after Watch
var addMyEditcount;//Adds a My editcount link in the personal bar.
var addUserMenu;//Adds a User menu with various functions while in a Userpage area.
var addWikiTools;//Adds the empty WikiTools menu.
var addSiteNotice2WikiTools;//Adds a sitenotice menu to WikiTools.

//GlobalVars
var HistoryMenu;
var WikiToolsMenu;

var basicTabs = {
	makeTabs: function() {
		if( PageMenu && PageMenu[ 'ca-history' ] ) {
			// theory: if it has a history tab, then it's purgable
			//Hop and skip over history tab. (Create temp tab, delete history tab, create menu to replace history tab, then delete temp tab.)
			if( addDiff ) {
				PageMenu.insertBefore( 'ca-history', 'ca-historytemp', 'History Temp', PageMenu.getHref( 'ca-history' ) );
				PageMenu.addClass( 'ca-historytemp', PageMenu.getClass( 'ca-history' ) );
				RemoveNode( 'ca-history' );
				PageMenu.insertBefore( 'ca-historytemp', 'ca-history', 'History', PageMenu.getHref( 'ca-historytemp' ), 'History Menu', true );
				PageMenu.addClass( 'ca-history', PageMenu.getClass( 'ca-historytemp' ) );
				RemoveNode( 'ca-historytemp' );
				HistoryMenu = new PortletMenu( 'ca-history' );
				//Add extra stuff to the history menu we replace the history tab with.
				HistoryMenu.append( 'ca-lastdiff', 'diff', PageMenu.getHref( 'ca-history' ).replace( /action=history/, 'diff=0' ), 'Last diff' );
				if( window.location.href.match(/[?&]diff=[^&]+/) ) HistoryMenu.addClass( 'ca-lastdiff', 'selected' );
			}
			if( addPurge ) PageMenu.append( 'ca-purge', 'Purge', PageMenu.getHref( 'ca-history' ).replace( /action=history/, 'action=purge' ) );
		}
		
			// My editcount button
		if( UserMenu && addMyEditcount ) UserMenu.insertBefore( 'pt-mycontris', 'pt-mycount', 'My editcount', UserMenu.getHref( 'pt-mycontris' ).replace( /Special:Contributions/, 'Special:Editcount' ) );
		
		if( addUserMenu ) {//User functions //
			if( !( ca_link = document.getElementById('ca-edit') ) ) ca_link = document.getElementById('ca-article');
			if( ca_link ) {
				var lk = ca_link.getElementsByTagName('a')[0].href;
				var user = undefined;
				var params = undefined;
				var re = /^.*(wiki\/|title=)([^&]*)(&.*)?$/i;
				var matches = re.exec(lk);
				if ( !matches ) {
					// TAH: firefox bug: have to do it twice for it to work
					var matches = re.exec(lk);
				}
				var usermatch = /^(User(_talk)?:|Special:(Contributions|Blockip|Editcount)\/)([^\/]*)(\/.*)?$/i;
				var specialmatch = /^Special:(Log\/|Ipblocklist|Listusers|Prefixindex)/i;
				if( matches[2].match( usermatch ) ) {
					user = matches[2].replace( usermatch, '$4' );
				} else if( matches[2].match( specialmatch ) ) {
					re = /[&?](page=User:|ip=|username=|namespace=2&from=)([^&]+)/i;
					var matches2 = re.exec(matches[3]);
					if ( !matches2 ) {
						// TAH: firefox bug: have to do it twice for it to work
						var matches2 = re.exec(matches[3]);
					}
					user = matches2[2];
				}
				if( PageMenu && user ) {
					PageMenu.append( 'userf', 'User', null, 'User Functions', true );
					UserFunctionsMenu = new PortletMenu( 'userf' );
					
					// add "listusers" tab
					UserFunctionsMenu.append( 'userf-listuser', 'Listuser', '/index.php?title=Special:Listusers&group=&username=' + user );
					
					// add "contributions" tab
					UserFunctionsMenu.append( 'userf-contrib', 'Contribs', '/wiki/Special:Contributions/' + user );
					
					// add Editcount to tab and ToolMenu +Dantman
					UserFunctionsMenu.append( 'userf-editcount', 'Editcount', '/wiki/Special:Editcount/' + user );
					if( ToolMenu ) ToolMenu.append( 't-editcount', 'Edit Count', '/wiki/Special:Editcount/' + user);
					
					// add "Userspace" tab
					UserFunctionsMenu.append( 'userf-userspace', 'Userspace', '/index.php?title=Special:Prefixindex&namespace=2&from=' + user );
					
					//(+Dantman: Only do this when at an IP)//
					if( user.match( /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/ ) ) {
						// add Seperator
						UserFunctionsMenu.appendSeperator();
						
						// add "proxycheck" tab
						UserFunctionsMenu.append( 'userf-proxycheck', 'proxycheck', 'http://www.checker.freeproxy.ru/checker/?proxy=' + user + ':80%0D%0A' + user + ':8080%0D%0A' + user + ':3182%0D%0A' + user + ':1080%0D%0A' + user + ':4232%0D%0A' + user + ':3380%0D%0A' + user + ':14321%0D%0A' + user + ':14441%0D%0A' + user + ':15551%0D%0A' + user + ':17771%0D%0A' + user + ':18844%0D%0A' + user + ':19991%0D%0A' + user + ':28882%0D%0A' + user + ':29992%0D%0A' + user + ':31121%0D%0A' + user + ':38883%0D%0A' + user + ':38884%0D%0A' + user + ':3800%0D%0A' + user + ':8081%0D%0A' + user + ':3124%0D%0A' + user + ':3127%0D%0A' + user + ':3128%0D%0A' + user + ':6588%0D%0A' + user + ':7212%0D%0A' + user + ':8000%0D%0A' + user + ':8888' );
						// add IP Tools
						UserFunctionsMenu.append( 'userf-ipinfo', 'IP info', 'http://www.dnsstuff.com/tools/ipall.ch?domain=' + user );
						UserFunctionsMenu.append( 'userf-traceroute', 'Traceroute', 'http://www.dnsstuff.com/tools/tracert.ch?ip=' + user );
						UserFunctionsMenu.append( 'userf-whois', 'WHOIS', 'http://www.dnsstuff.com/tools/whois.ch?ip=' + user );
						UserFunctionsMenu.append( 'userf-abuse', 'Abuse', 'http://www.dnsstuff.com/tools/whois.ch?server=whois.abuse.net&ip=' + user );
						UserFunctionsMenu.append( 'userf-whois', 'ARIN WHOIS', 'http://ws.arin.net/cgi-bin/whois.pl?queryinput=' + user );
						
						UserFunctionsMenu.append( 'userf-url', 'url', 'http://' + user );
					}
					
						// Sysop functions
					if( UserFunctionsMenu && isSysop ) {
						// add Seperator
						UserFunctionsMenu.appendSeperator();
						
						// add "block" tab
						UserFunctionsMenu.append( 'userf-block', 'block', '/wiki/Special:Blockip/' + user );
						
						// add "blocklog" tab
						UserFunctionsMenu.append( 'userf-log', 'log', '/index.php?title=Special:Log/block&page=User:' + user );
						
						// add "unblock" tab
						UserFunctionsMenu.append( 'userf-unblock', 'unblock', '/index.php?title=Special:Ipblocklist&action=unblock&ip=' + user );
					}
				}
			}
		}
		if( PageMenu && addWikiTools ) {
			/* Add WikiTools Menu */
			PageMenu.append( 'ca-tools', 'Tools', null, 'WikiTools Menu', true );
			WikiToolsMenu = new PortletMenu( 'ca-tools' );
			if( addSiteNotice2WikiTools ) {
				//SiteNotice Tools
				if( isSysop ) trySiteNoticeChange();
				WikiToolsMenu.append( 'ca-tools-sitenotice', 'Site Notice', null, 'Site Notice Tools', true );
				SiteNoticeMenu = new PortletMenu( 'ca-tools-sitenotice' );
				if( isSysop ) {
					SiteNoticeMenu.append( 'ca-tools-sitenotice-user', 'User', wgArticlePath.replace('$1', 'MediaWiki:Sitenotice'), 'Logged In(User) Sitenotice', true );
					SiteNoticeMenu_User = new PortletMenu( 'ca-tools-sitenotice-user' );
					SiteNoticeMenu_User.append( 'ca-tools-sitenotice-user-edit', 'Edit', '/index.php?title=MediaWiki:Sitenotice&action=edit', 'Edit Logged In(User) Sitenotice' );
					SiteNoticeMenu.append( 'ca-tools-sitenotice-anon', 'Anon', wgArticlePath.replace('$1', 'MediaWiki:Anonnotice'), 'Logged Out(Anon) Sitenotice', true );
					SiteNoticeMenu_Anon = new PortletMenu( 'ca-tools-sitenotice-anon' );
					SiteNoticeMenu_Anon.append( 'ca-tools-sitenotice-anon-edit', 'Edit', '/index.php?title=MediaWiki:Anonnotice&action=edit', 'Edit Logged Out(Anon) Sitenotice' );
					SiteNoticeMenu.appendSeperator();
					SiteNoticeMenu.append( 'ca-tools-sitenotice-display', 'Display', '/index.php?title=MediaWiki:Sitenotice_id&action=edit&do=inc', 'Display new Sitenotice (increment id)' );
					SiteNoticeMenu.appendSeperator();
				}
				SiteNoticeMenu.append( 'ca-tools-sitenotice-dismiss', 'Dismiss', 'javascript: dismissNotice();', 'Dismiss Sitenotice' );
				SiteNoticeMenu.append( 'ca-tools-sitenotice-undismiss', 'Undismiss', 'javascript: undismissNotice();', 'Unsdismiss Sitenotice' );
			}
		}
	}
}
addOnloadHook(basicTabs.makeTabs);

/*</pre>*/