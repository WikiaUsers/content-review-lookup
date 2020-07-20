/**********
 WikEd
**********/
// install [[wikipedia:User:Cacycle/wikEd]] in-browser text editor
importScriptURI("http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=User:Cacycle/wikEd.js");

// Change the presets of the toggle buttons in the wikEd control bar:
var wikEdConfig = {
  'useWikEdPreset': true,
  'highlightSyntaxPreset': false,
  'closeToolbarPreset': false,
  // Display a button to automatically append "…using wikEd" (or another text) to the edit summaries:
  'showUsingButton': true,
    'usingPreset': true,
    'summaryUsing': '…using [[wikipedia:User:Cacycle/wikEd|wikEd]]',
  'refHidePreset': false,
  'diffPreset': false,
  'fullScreenModePreset': false,
  // Change the history lengths:
  'historyLength': {
    'find': 15,
    'replace': 15,
    'summary': 20
  }
};

// Disable ctrl-clickable followable links in edit text:
//var wikEdFollowLinks = false;

// Add your own summary presets:
wikEdConfig.comboPresetOptions = {};
wikEdConfig.comboPresetOptions.summary = [
  'Initial Setup',
  'Moving into sub-tree',
  'Layout editorial',
  'Added Category',
  'my reply',
  'linkfix',
  'fixing typos',
  'removing linkspam',
  'reverting test',
  'reverting vandalism',
  'Code-Cleanup',
  'Code-Fixup',
  'formatting source text',
  'Copy-over from [[w:c:templates]]',
  'Updated to latest version on [[w:c:templates]]',
  '{wikEdUsing}'
];

/* My addition to enable per-site config changes */
if( typeof(wikEdConfigSite) == 'undefined' ){
  var wikEdConfigSite = {};
//  wikEdConfigSite["wikicities"] = true;
}
/* per site use: *
if( typeof(wikEdConfigSite[wgDB]) == 'undefined' ){
  wikEdConfigSite[wgDB] = true;
  wikEdConfig.comboPresetOptions.summary.push("--new text--");
}
* per site use: */

/* My addition to enable per-site config changes */
/**********
/WikEd
**********/