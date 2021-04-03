/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* Any JavaScript here will be loaded for all users on every page load. */
<?php

if ( !defined( 'MEDIAWIKI' ) ) {
    die( 'This file is a MediaWiki extension, it is not a valid entry point' );
}
 
$wgExtensionCredits['parserhook'][] = array(
    'name' => 'GetUserName',
    'version' => '1.0',
    'url' => 'https://www.mediawiki.org/wiki/Extension:GetUserName',
    'author' => 'Ejcaputo',
    'description' => "Allows the current user's name to be put in a page"
);  

$wgHooks[ 'ParserFirstCallInit' ][] = "ExtGetUserName::setup";
$wgHooks[ 'LanguageGetMagic' ][]  = 'ExtGetUserName::languageGetMagic';
class ExtGetUserName {
    private static $parserFunctions = array(
        'USERNAME' => 'getUserName',
    );
 
    public static function setup( &$parser ) {
        // register each hook
        foreach( self::$parserFunctions as $hook => $function )
            $parser->setFunctionHook( $hook,
                array( __CLASS__, $function ), SFH_OBJECT_ARGS );
 
        return true;
    }
 
    public static function languageGetMagic( &$magicWords, $langCode ) {
        $magicWords[ 'USERNAME' ] = array( 0, 'USERNAME' );
        return true;
    }
 
    public static function getUserName( &$parser, $frame, $args ) {
        $parser->disableCache();
        global $wgUser;
        return trim( $wgUser->getName() );
    }
}

/* USERTAGS */
importArticles({
	type:"script",
	articles: [
        "w:c:dev:UserTags/code.js",
        "MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
        "MediaWiki:Selector.js",
        "u:dev:ShowHide/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:SocialIcons/code.js",
        "w:c:dev:LockForums/code.js",
        "u:dev:DupImageList/code.js",
	]
}, {
    type: "style",
    articles: [
        "MediaWiki:DropDownMenu.css",
        "MediaWiki:DropDownMenu2.css",
        "MediaWiki:Wikia.css/Highlight.css",
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
	akb48: { u: 'akb48', order: 1, },
	csser: { u: 'CSS', order: 101 },
	templater: { u: 'Templates', order: 102, link:'Category:Templates',},
	imager: { u: 'Images',  order: 102, link:'Category:Images',},
	spriter: { u: 'Sprites', order: 103 },
	xmler: { u: 'XMLs', order: 104 },
	categ: { u:'Categorizer', },
	bureaucrat: { order: 1, link:'AKB49 Wiki:Administrators', },
	sysop: { order: 1, link:'AKB49:Administrators',},
	rollback: { u: 'Special Officer (Rollback)', order: 1, link:'CLSU Wiki:Administrators',},
	chatmoderator: { order: 2, link:'AKB49 Wiki:Administrators',},
// Custom Tags
	Sijfer: { u: 'akb48' },
	}
};
UserTagsJS.modules.custom = {
	'Sijfer': ['akb48',],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot']
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};