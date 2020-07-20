/* Any JavaScript here will be loaded for all users on every page load. */

LocalSettings.php

$wgLoadScript

// define namespace constants
define("NS_WALKTHROUGH", 100); // This MUST be even.
define("NS_WALKTHROUGH_TALK", 101); // This MUST be the following odd integer.
 
// add namespaces
$wgExtraNamespaces[NS_WALKTHROUGH] = "Walkthrough";
$wgExtraNamespaces[NS_WALKTHROUGH_TALK] = "Walkthrough_talk";