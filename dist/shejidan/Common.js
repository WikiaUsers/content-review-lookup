/* Any JavaScript here will be loaded for all users on every page load. */

require_once("http://shejidan.wikia.com/wiki/extensions/JSpoiler.php");

<?php
/**
 * MediaWiki spoiler extension
 * the function registered by the extension hides the text between the
 * tags behind a JavaScript spoiler block.
 *
 * @author Brian Enigma <brian@netninja.com>
 * @copyright © 2006 Brian Enigma
 * @copyright © 2007 Patrick Delancy
 * @license http://creativecommons.org/licenses/by-nc-sa/2.5/ - Creative Commons Attribution-Noncommercial-Share Alike 2.5 License
 */

if( !defined( 'MEDIAWIKI' ) ) {
        echo( "This file is an extension to the MediaWiki software and cannot be used standalone.\n" );
        die( 1 );
}

$wgExtensionCredits['parserhook'][] = array(
        'name' => 'Spoiler',
        'version' => '0.2.1',
        'author' => array('Brian Enigma', 'Patrick Delancy', 'Edwin Miltenburg'),
        'url' => 'http://tibia.wikia.com/wiki/Template:Spoiler_block',
        'description' => 'The function registered by the extension hides the text between the tags behind a JavaScript spoiler block.',
);

$wgExtensionFunctions[] = 'wfSpoilerExtension';
$wgHooks['OutputPageBeforeHTML'][] = 'spoilerParserHook';

function wfSpoilerExtension() {
    global $wgParser;
    # register the extension with the WikiText parser
    # the first parameter is the name of the new tag.
    # the second parameter is the callback function for
    # processing the text between the tags
    $wgParser->setHook( "spoiler", "renderSpoiler" );
}

function wfSpoilerJavaScript() {
return  "<script language=\"JavaScript\">\n" .
        "\n" . 
        "function getStyleObject(objectId) {\n" .
        "    // checkW3C DOM, then MSIE 4, then NN 4.\n" .
        "    //\n" .
        "    if(document.getElementById) {\n" .
        "      if (document.getElementById(objectId)) {\n" .
        "	     return document.getElementById(objectId).style;\n" .
        "      }\n" . 
        "    } else if (document.all) {\n" .
        "      if (document.all(objectId)) {\n" .
        "	     return document.all(objectId).style;\n" .
        "      }\n" . 
        "    } else if (document.layers) { \n" . 
        "      if (document.layers[objectId]) { \n" .
        "	     return document.layers[objectId];\n" .
        "      }\n" . 
        "    } else {\n" .
        "	   return false;\n" .
        "    }\n" .
        "}\n" .
        "\n" .
        "function toggleObjectVisibility(objectId) {\n" .
        "    // first get the object's stylesheet\n" .
        "    var styleObject = getStyleObject(objectId);\n" .
        "\n" .
        "    // then if we find a stylesheet, set its visibility\n" .
        "    // as requested\n" .
        "    //\n" .
        "    if (styleObject) {\n" .
        "        if (styleObject.visibility == 'hidden') {\n" .
        "            styleObject.visibility = 'visible';\n" .
        "            styleObject.position = 'relative';\n" .
        "        } else {\n" .
        "            styleObject.visibility = 'hidden';\n" .
        "            styleObject.position = 'absolute';\n" .
        "        }\n" .
        "        return true;\n" .
        "    } else {\n" .
        "        return false;\n" .
        "    }\n" .
        "}\n" .
        "</script>\n";
}

function spoilerParserHook( &$parser , &$text ) { 
    $text = wfSpoilerJavaScript() . $text;
    return true;
}

function wfMakeSpoilerId() {
    $result = "spoiler_";
    for ($i=0; $i<20; $i++)
        $result .= chr(rand(ord('A'), ord('Z')));
    return $result;
}

# The callback function for converting the input text to HTML output
function renderSpoiler( $input, $argv, &$parser ) {
    # $argv is an array containing any arguments passed to the
    # extension like <example argument="foo" bar>..

    $localParser = new Parser();
    $outputObj = $localParser->parse($input, $parser->mTitle, $parser->mOptions);
    $spoilerId = wfMakeSpoilerId();

    $output  = "<span onClick=\"toggleObjectVisibility('" . $spoilerId . "'); return false;\" style=\"" . ($argv["linkstyle"] == '' ? "cursor:pointer; background-color:#ffdddd; color:#000000; font-weight:bold; padding:4px 4px 2px 4px; border:solid red 1px; line-height: 24px;" : $argv["linkstyle"] ) . "\">";
    $output .= ($argv["linktext"] == '' ? 'Click Here to Show/Hide Spoiler Information' : $argv["linktext"]) . "</span>";
    $output .= "<div id=\"" . $spoilerId . "\" style=\"visibility:visible; position:relative; " . ($argv["spoilerstyle"] == '' ? "" : $argv["spoilerstyle"]) . "\">";
    if (!in_array("hidewarning", $argv)) {
        $output .= "<div style=\"" . ($argv["warningstyle"] == '' ? "border-top: 2px red solid; border-bottom: 2px red solid; padding:3px; line-height: 22px;" : $argv["warningstyle"]) . "\">";
        $output .= ($argv["headwarningtext"] == '' ? "<b>Spoiler warning:</b> <i>Quest and/or game spoiling details follow.</i>" : $argv["headwarningtext"]);
        $output .= "</div>";
    }
    $output .= "<div id=\"" . $spoilerId . "_content\" style=\"" . ($argv["contentstyle"] == '' ? "padding-top:4px; padding-bottom:4px;" : $argv["contentstyle"]) . "\">" . $outputObj->getText() . "</div>";
    if (!in_array("hidewarning", $argv)) {
        $output .= "<div style=\"" . ($argv["warningstyle"] == '' ? "border-top: 2px red solid; border-bottom: 2px red solid; padding:3px; line-height: 22px;" : $argv["warningstyle"]) . "\">";
        $output .= ($argv["footwarningtext"] == '' ? "<b>Spoiler ends here.</b>" : $argv["footwarningtext"]);
        $output .= "</div>";
    }
    $output .= "</div>";
    if ($argv["collapsed"] != "false") {
        $output .= "<script language=\"JavaScript\">";
        $output .= "toggleObjectVisibility('" . $spoilerId . "');";
        $output .= "</script>";
    }

    return $output;
}