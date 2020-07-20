/** Change "Colonel" to newGroup **/
if((wgPageName == 'User:KingFredrick_VI') || (wgPageName == 'User_talk:KingFredrick_VI') || (wgPageName == 'Message_Wall:KingFredrick_VI') || (wgPageName == 'User_blog:KingFredrick_VI') || (wgPageName == 'Special:Contributions/KingFredrick_VI')) {
  $('.group').html('The King');
}
 
/** Change "Colonel" to newGroup **/
if((wgPageName == 'User:Minerman') || (wgPageName == 'User_talk:Minerman') || (wgPageName == 'Message_Wall:Minerman') || (wgPageName == 'User_blog:Minerman') || (wgPageName == 'Special:Contributions/Minerman')) {
  $('.group').html('The Boss');
}
 
/** Change "Colonel" to newGroup **/
if((wgPageName == 'User:HealableMarrow4') || (wgPageName == 'User_talk:HealableMarrow4') || (wgPageName == 'Message_Wall:HealableMarrow4') || (wgPageName == 'User_blog:HealableMarrow4') || (wgPageName == 'Special:Contributions/HealableMarrow4')) {
  $('.group').html('The Support');
}
 
/** Change "Colonel" to newGroup **/
if((wgPageName == 'User:Dan67') || (wgPageName == 'User_talk:Dan67') || (wgPageName == 'Message_Wall:Dan67') || (wgPageName == 'User_blog:Dan67') || (wgPageName == 'Special:Contributions/Dan67')) {
  $('.group').html('The Enforcer');
}
 
importScriptPage('ShowHide/code.js', 'dev');
 
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}
 
/*<syntaxhighlight lang="javascript">*/
/*
 * Copyright © 2009, Daniel Friesen
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the script nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
( function( $ ) {
 
	// CONFIG
	var config = window.ShowHideConfig = $.extend( true, {
		autoCollapse: 2,
		userLang: true,
		brackets: '[]',
		linkBefore: false,
		// Bulgarian
		bg: {
			show: "Покажи",
			hide: "Скрий",
			showAll: "Покажи всички",
			hideAll: "Скрий всички"
		},
		// German
		de: {
			show: "anzeigen",
			hide: "verbergen",
			showAll: "alle anzeigen",
			hideAll: "alle verbergen"
		},
		// English
		en: {
			show: "show",
			hide: "hide",
			showAll: "show all",
			hideAll: "hide all"
		},
		// Spanish
		es: {
			show: "Mostrar",
			hide: "Ocultar",
			showAll: "Mostrar todo",
			hideAll: "Ocultar todo"
		},
		// French
		fr: {
			show: "afficher",
			hide: "masquer",
			showAll: "tout afficher",
			hideAll: "tout masquer"
		},
		// Hungarian
		hu: {
			show: "kibontás",
			hide: "elrejtés",
			showAll: "összes kibontása",
			hideAll: "összes elrejtése"
		},
		// Italian
		it: {
			show: "Mostra",
			hide: "Nascondi",
			showAll: "Mostra tutti",
			hideAll: "Nascondi tutti"
		},
		// Japanese
		ja: {
			show: "表示",
			hide: "非表示",
			showAll: "すべて表示",
			hideAll: "すべて非表示"
		},
		// Korean
		ko: {
			show: "보이기",
			hide: "숨기기",
			showAll: "모두 보이기",
			hideAll: "모두 숨기기"
		},
		// Dutch
		nl: {
			show: "tonen",
			hide: "verbergen",
			showAll: "alles tonen",
			hideAll: "alles verbergen"
		},
		// Polish
		pl: {
			show: "Pokaż",
			hide: "Ukryj",
			showAll: "Pokaż wszystko",
			hideAll: "Ukryj wszystko"
		},
		// Portuguese
		pt: {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Brazilian Portuguese
		'pt-br': {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Russian
		ru: {
			show: "Открыть",
			hide: "Скрыть",
			showAll: "Открыть все",
			hideAll: "Скрыть все"
		},
		// Chinese
		zh: {
			show: "显示",
			hide: "隐藏",
			showAll: "全部显示",
			hideAll: "全部隐藏"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {} );
 
	// i18n function
	function msg( name ) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] ) {
			return config[wgUserLanguage][name];
		}
		if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name];
		}
		return config.en[name];
	}
 
	// common
	$.fn.onLink = function( fn ) {
		return this.bind( 'click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
				fn.call(this, e);
			}
		} );
	};
 
	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var	$table = $( node ),
			$button = $table.find( 'tr:first > th:last .collapseLink' );
 
		if ( !$table.length || !$button.length ) {
			return false;
		}
 
		if ( typeof state === 'boolean' ) {
			$table.toggleClass( 'collapsed', !state );
		} else {
			$table.toggleClass( 'collapsed' );
		}
		var hidden = $table.hasClass( 'collapsed' );
		$table.find( '> * > tr:not(:first):not(.nocollapse)' )[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
		return true;
	}
 
	function createCollapseButtons() {
		var NavigationBoxes = [];
		$( 'table.collapsible' ).each( function () {
			NavigationBoxes.push(this);
			var	$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).css({ cursor: "pointer" }).onLink( function( e ) { collapseTable( $(this).closest('table') ); } ),
				$button = $( "<span class=collapseButton />" ).css( {
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			} );
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
 
			var $header = $( this ).find( 'tr:first > th:last' ).prepend($button);
		} );
 
		// if more Navigation Bars found than Default: hide all
		if ( $( NavigationBoxes ).filter( '.autocollapse' ).length >= config.autoCollapse ) {
			$( NavigationBoxes ).filter( '.autocollapse' ).each( function () { collapseTable( this, false ); } );
		}
		$( NavigationBoxes ).filter( '.collapsed' ).each( function () { collapseTable( this, false ); } );
	}
 
	$( createCollapseButtons );
 
	/** Dynamic Navigation Bars with jQuery
	 *
	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
	 */
 
	// shows and hides content and picture (if available) of navigation bars
	function toggleNavigationBar( node ) {
		var	$navFrame = $( node ),
			$navToggle = $navFrame.find( '.NavHead:first .collapseLink' );
 
		if ( !$navFrame.length || !$navToggle.length ) {
			return false;
		}
 
		$navFrame.toggleClass( 'NavVisible' );
		$navFrame.find( '.NavPic, .NavContent' ).not( $navFrame.find( '.NavFrame .NavPic' ) ).not( $navFrame.find( '.NavFrame .NavContent' ) ).slideToggle();
		$navToggle.text( msg( $navFrame.hasClass( 'NavVisible' ) ? "hide" : "show" ) );
		return true;
	}
 
	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $( '.NavFrame' ).addClass( 'NavVisible' ).each( function () {
			var	$navHead = $( this ).find( '.NavHead:first' ),
				$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).onLink( function ( e ) { toggleNavigationBar( $( this ).closest( '.NavFrame' ) ); } ),
				$button = $( '<span class="NavToggle collapseButton" />' );
			$navHead.filter( 'legend' ).append( ' - ' );
			if ( config.brackets ) {
				$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
			} else {
				$button.append( $buttonLink );
			}
			$navHead[config.linkBefore?"prepend":"append"]($button);
		} );
		// if more Navigation Bars found than Default: hide all
		if ( NavFrames.length >= config.autoCollapse ) {
			NavFrames.not( '.noautocollapse' ).each( function () { toggleNavigationBar(this); } );
		} else {
			NavFrames.filter( '.collapsed' ).each( function () { toggleNavigationBar(this); } );
		}
		return true;
	}
 
	$( createNavigationBarToggleButton );
 
	$( function () {
		$( '.NavGlobal' ).each( function () {
			$( '<span class=NavGlobalShow />' ).append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "showAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( !$( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
			$( this ).append( ' ' );
			$('<span class=NavGlobalHide />').append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hideAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( $( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
		} );
	} );
 
} )( jQuery );
/*</syntaxhighlight>*/
 
// Derived from Cartoon Network Wiki:  http://cartoonnetwork.wikia.com/wiki/MediaWiki:Common.js, at the following
 
/* Any JavaScript here will be loaded for all users on every page load. */ 
/*
Collapsible Classes 
*/
importScriptPage('ShowHide/code.js', 'dev');
 
/*
For Collapsible Infobox 
*/
importScriptPage('CollapsibleInfobox/code.js', 'dev');
 
/* <?php */
/*
 * Copyright © 2010-2012 Garrett Brown <http://www.mediawiki.org/wiki/User:Gbruin>
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
 
 
/*
 * Not a valid entry point, skip unless MEDIAWIKI is defined.
 */
/* if ( !defined( 'MEDIAWIKI' ) ) {
	die( 'This file is a MediaWiki extension, it is not a valid entry point' );
} */
 
 
/**
 * Class FacebookDB
 * 
 * This class abstracts the manipulation of the custom table used by this
 * extension. If $wgDBprefix is set, this class will pull from the translated
 * tables. If the table 'users_fbconnect' does not exist in your database
 * you will receive errors like this:
 * 
 * Database error from within function "FacebookDB::getUser". Database
 * returned error "Table 'user_fbconnect' doesn't exist".
 * 
 * In this case, you will need to fix this by running the MW updater:
 * >php maintenance/update.php
 */
// class FacebookDB {
	/**
	 * Find the Facebook IDs of the given user, if any, using the database
	 * connection provided.
	 * 
	 * If $user is not specified, the ID of the logged in user will be used.
	 */
/*	public static function getFacebookIDs( $user = NULL, $db = DB_SLAVE  ) {
		global $wgMemc;
		// Connect to the database
		$dbr = wfGetDB( $db, array(), self::sharedDB() );
		$fbid = array();
		if ( empty( $user) || !($user instanceof User) || $user->getId() == 0 ) {
			global $wgUser;
			$user = $wgUser;
		}
		if ( $user->getId() != 0 ) {
			// Try memcached to avoid hitting the database
			$memkey = wfMemcKey( 'fb_user_id', $user->getId() );
			$val = $wgMemc->get( $memkey );
			if ( ( is_array( $val ) ) &&  ( $db == DB_SLAVE ) ){
				return $val;
			}
			// Query the database
			$prefix = self::getPrefix();
			$res = $dbr->select(
				array( "{$prefix}user_fbconnect" ),
				array( 'user_fbid' ),
				array( 'user_id' => $user->getId() ),
				__METHOD__
			);
			// $res might be null if the table user_fbconnect wasn't created
			if ( $res ) {
				foreach( $res as $row ) {
					$fbid[] = $row->user_fbid;
				}
				$res->free();
				$wgMemc->set( $memkey, $fbid );
			}
 
		}
		return $fbid;
	} */
 
	/**
	 * Find the user by their Facebook ID.
	 * If there is no user found for the given id, returns null.
	 */
/*	public static function getUser( $fbid ) {
		$prefix = self::getPrefix();
 
		// NOTE: Do not just pass this dbr into getUserByDB since that function prevents
		// rewriting of the database name for shared tables.
		$dbr = wfGetDB( DB_SLAVE, array(), self::sharedDB() );
 
		$id = $dbr->selectField(
			array( "{$prefix}user_fbconnect" ),
			array( 'user_id' ),
			array( 'user_fbid' => $fbid ),
			__METHOD__
		);
		if ( $id ) {
			/* Wikia change - begin */
/*			global $wgExternalAuthType;
 
			$user = User::newFromId( $id );
			if ( $wgExternalAuthType ) {
				$user->load();
				if ( $user->getId() == 0 ) {
					$mExtUser = ExternalUser::newFromId( $id );
					if ( is_object( $mExtUser ) && ( $mExtUser->getId() != 0 ) ) {
						$mExtUser->linkToLocal( $mExtUser->getId() );
						$user->setId( $id );
					}
				}
			}
 
			return $user;
			/* Wikia change - end */
/*		} else {
			return null;
		}
	}
 
	/**
	 * Given a facebook id and database connection with read permission,
	 * finds the Facebook user by their id.
	 * If there is no user found for the given id, returns null.
	 */
/*	public static function getUserByDB( $fbid, $dbr ){
		$prefix = self::getPrefix();
		$id = $dbr->selectField(
			"`{$prefix}user_fbconnect`",
			'user_id',
			array( 'user_fbid' => $fbid ),
			__METHOD__
		);
		if ( $id ) {
			return User::newFromId( $id );
		} else {
			return null;
		}
	}
 
	/**
	 * Add a User <-> Facebook ID association to the database.
	 */
/*	public static function addFacebookID( $user, $fbid ) {
		global $wgMemc;
		wfProfileIn( __METHOD__ );
 
		$memkey = wfMemcKey( 'fb_user_id', $user->getId() );
 
		if ( $user->getId() == 0 ) {
			wfDebug("Facebook: tried to store a mapping from fbid \"$fbid\" to a user with no id (ie: not logged in).\n");
		} else {
			$prefix = self::getPrefix();
			$dbw = wfGetDB( DB_MASTER, array(), self::sharedDB() );
			$dbw->insert(
				"{$prefix}user_fbconnect",
				array(
					'user_id' => $user->getId(),
					'user_fbid' => $fbid
				),
				__METHOD__,
				array( 'IGNORE' )
			);
			$dbw->commit();
		}
 
		$wgMemc->set( $memkey, self::getFacebookIDs( $user, DB_MASTER ) );
 
		wfProfileOut( __METHOD__ );
	}
 
	/**
	 * Remove a User <-> Facebook ID association from the database.
	 */
/*	public static function removeFacebookID( $user ) {
		global $wgMemc; 
		$prefix = self::getPrefix();
		if ( $user instanceof User && $user->getId() != 0 ) {
			$dbw = wfGetDB( DB_MASTER, array(), self::sharedDB() );
			$memkey = wfMemcKey( 'fb_user_id', $user->getId() );
			$dbw->delete(
				"{$prefix}user_fbconnect",
				array(
					'user_id' => $user->getId(),
				),
				__METHOD__
			); 
			$dbw->commit();
	 		$wgMemc->set( $memkey, self::getFacebookIDs( $user, DB_MASTER ) );
	 		return (bool) $dbw->affectedRows();
		}
		return 0;
	}
 
	/**
	 * Estimates the total number of User <-> Facebook ID associations in the
	 * database. If there are no users, then the estimate will probably be 1.
	 */
/*	public static function countUsers() {
		$prefix = self::getPrefix();
		$dbr = wfGetDB( DB_SLAVE, array(), self::sharedDB() );
		// An estimate is good enough for choosing a unique nickname
		$count = $dbr->estimateRowCount( "{$prefix}user_fbconnect" );
		// Avoid returning 0 or -1
		return $count >= 1 ? $count : 1;
	}
 
	/**
	 * Returns the name of the shared database, if one is in use for the Facebook
	 * Connect users table. Note that 'user_fbconnect' (without respecting
	 * $wgSharedPrefix) is added to $wgSharedTables in FacebookInit::init() by
	 * default. This function can also be used as a test for whether a shared
	 * database for Facebook users is in use.
	 * 
	 * See also <http://www.mediawiki.org/wiki/Manual:Shared_database>
	 */
/*	public static function sharedDB() {
		global $wgExternalSharedDB;
		if ( !empty( $wgExternalSharedDB ) ) {
			return $wgExternalSharedDB;
		}
		return false;
	}
 
	/**
	 * Returns the table prefix name, either $wgDBprefix, $wgSharedPrefix
	 * depending on whether a shared database is in use.
	 */
/*	private static function getPrefix() {
		global $wgDBprefix, $wgSharedPrefix;
		return self::sharedDB() ? $wgSharedPrefix : ""; // bugfix for $wgDBprefix;
	}
}
 
 
/*<syntaxhighlight lang="javascript">*/
/*
 * Copyright © 2009, Daniel Friesen
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the script nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
( function( $ ) {
 
	// CONFIG
	var config = window.ShowHideConfig = $.extend( true, {
		autoCollapse: 2,
		userLang: true,
		brackets: '[]',
		linkBefore: false,
		// Bulgarian
		bg: {
			show: "Покажи",
			hide: "Скрий",
			showAll: "Покажи всички",
			hideAll: "Скрий всички"
		},
		// German
		de: {
			show: "anzeigen",
			hide: "verbergen",
			showAll: "alle anzeigen",
			hideAll: "alle verbergen"
		},
		// English
		en: {
			show: "show",
			hide: "hide",
			showAll: "show all",
			hideAll: "hide all"
		},
		// Spanish
		es: {
			show: "Mostrar",
			hide: "Ocultar",
			showAll: "Mostrar todo",
			hideAll: "Ocultar todo"
		},
		// French
		fr: {
			show: "afficher",
			hide: "masquer",
			showAll: "tout afficher",
			hideAll: "tout masquer"
		},
		// Hungarian
		hu: {
			show: "kibontás",
			hide: "elrejtés",
			showAll: "összes kibontása",
			hideAll: "összes elrejtése"
		},
		// Italian
		it: {
			show: "Mostra",
			hide: "Nascondi",
			showAll: "Mostra tutti",
			hideAll: "Nascondi tutti"
		},
		// Japanese
		ja: {
			show: "表示",
			hide: "非表示",
			showAll: "すべて表示",
			hideAll: "すべて非表示"
		},
		// Korean
		ko: {
			show: "보이기",
			hide: "숨기기",
			showAll: "모두 보이기",
			hideAll: "모두 숨기기"
		},
		// Dutch
		nl: {
			show: "tonen",
			hide: "verbergen",
			showAll: "alles tonen",
			hideAll: "alles verbergen"
		},
		// Polish
		pl: {
			show: "Pokaż",
			hide: "Ukryj",
			showAll: "Pokaż wszystko",
			hideAll: "Ukryj wszystko"
		},
		// Portuguese
		pt: {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Brazilian Portuguese
		'pt-br': {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Russian
		ru: {
			show: "Открыть",
			hide: "Скрыть",
			showAll: "Открыть все",
			hideAll: "Скрыть все"
		},
		// Chinese
		zh: {
			show: "显示",
			hide: "隐藏",
			showAll: "全部显示",
			hideAll: "全部隐藏"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {} );
 
	// i18n function
	function msg( name ) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] ) {
			return config[wgUserLanguage][name];
		}
		if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name];
		}
		return config.en[name];
	}
 
	// common
	$.fn.onLink = function( fn ) {
		return this.bind( 'click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
				fn.call(this, e);
			}
		} );
	};
 
	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var	$table = $( node ),
			$button = $table.find( 'tr:first > th:last .collapseLink' );
 
		if ( !$table.length || !$button.length ) {
			return false;
		}
 
		if ( typeof state === 'boolean' ) {
			$table.toggleClass( 'collapsed', !state );
		} else {
			$table.toggleClass( 'collapsed' );
		}
		var hidden = $table.hasClass( 'collapsed' );
		$table.find( '> * > tr' ).not( ':first, .nocollapse' )[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
		return true;
	}
 
	function createCollapseButtons() {
		var NavigationBoxes = [];
		$( 'table.collapsible' ).each( function () {
			NavigationBoxes.push(this);
			var	$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).css({ cursor: "pointer" }).onLink( function( e ) { collapseTable( $(this).closest('table') ); } ),
				$button = $( "<span class=collapseButton />" ).css( {
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			} );
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
 
			var $header = $( this ).find( 'tr:first > th:last' ).prepend($button);
		} );
 
		// if more Navigation Bars found than Default: hide all
		if ( $( NavigationBoxes ).filter( '.autocollapse' ).length >= config.autoCollapse ) {
			$( NavigationBoxes ).filter( '.autocollapse' ).each( function () { collapseTable( this, false ); } );
		}
		$( NavigationBoxes ).filter( '.collapsed' ).each( function () { collapseTable( this, false ); } );
	}
 
	$( createCollapseButtons );
 
	/** Dynamic Navigation Bars with jQuery
	 *
	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
	 */
 
	// shows and hides content and picture (if available) of navigation bars
	function toggleNavigationBar( node ) {
		var	$navFrame = $( node ),
			$navToggle = $navFrame.find( '.NavHead:first .collapseLink' );
 
		if ( !$navFrame.length || !$navToggle.length ) {
			return false;
		}
 
		$navFrame.toggleClass( 'NavVisible' );
		$navFrame.find( '.NavPic, .NavContent' ).not( $navFrame.find( '.NavFrame .NavPic' ) ).not( $navFrame.find( '.NavFrame .NavContent' ) ).slideToggle();
		$navToggle.text( msg( $navFrame.hasClass( 'NavVisible' ) ? "hide" : "show" ) );
		return true;
	}
 
	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $( '.NavFrame' ).addClass( 'NavVisible' ).each( function () {
			var	$navHead = $( this ).find( '.NavHead:first' ),
				$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).onLink( function ( e ) { toggleNavigationBar( $( this ).closest( '.NavFrame' ) ); } ),
				$button = $( '<span class="NavToggle collapseButton" />' );
			$navHead.filter( 'legend' ).append( ' - ' );
			if ( config.brackets ) {
				$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
			} else {
				$button.append( $buttonLink );
			}
			$navHead[config.linkBefore?"prepend":"append"]($button);
		} );
		// if more Navigation Bars found than Default: hide all
		if ( NavFrames.length >= config.autoCollapse ) {
			NavFrames.not( '.noautocollapse' ).each( function () { toggleNavigationBar(this); } );
		} else {
			NavFrames.filter( '.collapsed' ).each( function () { toggleNavigationBar(this); } );
		}
		return true;
	}
 
	$( createNavigationBarToggleButton );
 
	$( function () {
		$( '.NavGlobal' ).each( function () {
			$( '<span class=NavGlobalShow />' ).append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "showAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( !$( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
			$( this ).append( ' ' );
			$('<span class=NavGlobalHide />').append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hideAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( $( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
		} );
	} );
 
} )( jQuery );
/*
 
 
/**
 * Keep code in MediaWiki:Common.js to a minimum as it is unconditionally
 * loaded for all users on every wiki page. If possible create a gadget that is
 * enabled by default instead of adding it here (since gadgets are fully
 * optimized ResourceLoader modules with possibility to add dependencies etc.)
 *
 * Since Common.js isn't a gadget, there is no place to declare its
 * dependencies, so we have to lazy load them with mw.loader.using on demand and
 * then execute the rest in the callback. In most cases these dependencies will
 * be loaded (or loading) already and the callback will not be delayed. In case a
 * dependency hasn't arrived yet it'll make sure those are loaded before this.
 */
/*global mw, $, importStylesheet, importScript */
/*jshint curly:false eqnull:true, strict:false, browser:true, */
mw.loader.using( ['mediawiki.util', 'mediawiki.notify', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
/**
 * Main Page layout fixes
 *
 * Description: Adds an additional link to the complete list of languages available.
 * Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */
if ( mw.config.get( 'wgPageName' ) === 'Main_Page' || mw.config.get( 'wgPageName' ) === 'Talk:Main_Page' ) {
    $( document ).ready( function () {
        mw.util.addPortletLink( 'p-lang', '//meta.wikimedia.org/wiki/List_of_Wikipedias',
            'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias' );
    } );
}
 
/**
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
    var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
    /* Make sure there was a part before and after the slash
       and that the latter is 'skin.js' or 'skin.css' */
    if ( titleParts.length == 2 ) {
        var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
        if ( titleParts.slice( -1 ) == 'skin.js' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.js' );
        } else if ( titleParts.slice( -1 ) == 'skin.css' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.css' );
        }
    }
}
 
/**
 * Map addPortletLink to mw.util 
 *
 * @deprecated: Use mw.util.addPortletLink instead.
 */
window.addPortletLink = function () {
    return mw.util.addPortletLink.apply( mw.util, arguments );
};
 
/**
 * Extract a URL parameter from the current URL
 *
 * @deprecated: Use mw.util.getParamValue with proper escaping
 */
window.getURLParamValue = function () {
    return mw.util.getParamValue.apply( mw.util, arguments );
};
 
/** 
 * Test if an element has a certain class
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
window.hasClass = function ( element, className ) {
    return $( element ).hasClass( className );
};
 
/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}
 
/**
 * Import more specific scripts if necessary
 */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
    /* scripts specific to editing pages */
    importScript( 'MediaWiki:Common.js/edit.js' );
} else if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Watchlist' ) {
    /* watchlist scripts */
    importScript( 'MediaWiki:Common.js/watchlist.js' );
}
if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
    /* file description page scripts */
    importScript( 'MediaWiki:Common.js/file.js' );
}
 
/**
 * Load scripts specific to Internet Explorer
 */
if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
}
 
/**
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}
 
/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[User:Dschwen]]
 */
( function () {
    var require_wikiminiatlas = false;
    var coord_filter = /geohack/;
    $( document ).ready( function() {
        $( 'a.external.text' ).each( function( key, link ) {
            if ( link.href && coord_filter.exec( link.href ) ) {
                require_wikiminiatlas = true;
                // break from loop
                return false;
            }
        } );
        if ( $( 'div.kmldata' ).length ) {
            require_wikiminiatlas = true;
        }
        if ( require_wikiminiatlas ) {
            mw.loader.load( '//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript' );
        }
    } );
} )();
 
/**
 * Interwiki links to featured articles ***************************************
 *
 * Description: Highlights interwiki links to featured articles (or
 *              equivalents) by changing the bullet before the interwiki link
 *              into a star.
 * Maintainers: [[User:R. Koot]]
 */
function LinkFA() {
    if ( document.getElementById( 'p-lang' ) ) {
        var InterwikiLinks = document.getElementById( 'p-lang' ).getElementsByTagName( 'li' );
 
        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            if ( document.getElementById( InterwikiLinks[i].className + '-fa' ) ) {
                InterwikiLinks[i].className += ' FA';
                InterwikiLinks[i].title = 'This is a featured article in this language.';
            } else if ( document.getElementById( InterwikiLinks[i].className + '-ga' ) ) {
                InterwikiLinks[i].className += ' GA';
                InterwikiLinks[i].title = 'This is a good article in this language.';
            }
        }
    }
}
 
$( LinkFA );
 
/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[Wikipedia:NavFrame]].
 * Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
$( createNavigationBarToggleButton );
 
/**
 * Uploadwizard_newusers
 * Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
 *
 * Maintainers: [[User:Krimpet]]
 */
function uploadwizard_newusers() {
    if ( mw.config.get( 'wgNamespaceNumber' ) === 4 && mw.config.get( 'wgTitle' ) === 'Upload' && mw.config.get( 'wgAction' ) === 'view' ) {
        var oldDiv = document.getElementById( 'autoconfirmedusers' ),
            newDiv = document.getElementById( 'newusers' );
        if ( oldDiv && newDiv ) {
            var userGroups = mw.config.get( 'wgUserGroups' );
            if ( userGroups ) {
                for ( var i = 0; i < userGroups.length; i++ ) {
                    if ( userGroups[i] === 'autoconfirmed' ) {
                        oldDiv.style.display = 'block';
                        newDiv.style.display = 'none';
                        return;
                    }
                }
            }
            oldDiv.style.display = 'none';
            newDiv.style.display = 'block';
            return;
        }
    }
}
 
$(uploadwizard_newusers);
 
/**
 * Magic editintros ****************************************************
 *
 * Description: Adds editintros on disambiguation pages and BLP pages.
 * Maintainers: [[User:RockMFR]]
 */
function addEditIntro( name ) {
    $( '.editsection, #ca-edit' ).find( 'a' ).each( function ( i, el ) {
        el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
    } );
}
 
if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
    $( function () {
        if ( document.getElementById( 'disambigbox' ) ) {
            addEditIntro( 'Template:Disambig_editintro' );
        }
    } );
 
    $( function () {
        var cats = document.getElementById( 'mw-normal-catlinks' );
        if ( !cats ) {
            return;
        }
        cats = cats.getElementsByTagName( 'a' );
        for ( var i = 0; i < cats.length; i++ ) {
            if ( cats[i].title === 'Category:Living people' || cats[i].title === 'Category:Possibly living people' ) {
                addEditIntro( 'Template:BLP_editintro' );
                break;
            }
        }
    } );
}
 
/**
 * Description: Stay on the secure server as much as possible
 * Maintainers: [[User:TheDJ]]
 */
if ( document.location && document.location.protocol  && document.location.protocol === 'https:' ) {
    /* New secure servers */
    importScript( 'MediaWiki:Common.js/secure new.js' );
}
 
/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */