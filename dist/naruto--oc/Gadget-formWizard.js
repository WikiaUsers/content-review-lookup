/*  ______________________________________________________________________________________
 * |                                                                                     |
 * |                    === WARNING: GADGET FILE ===                                     |
 * |                  Changes to this page affect many users.                            |
 * | Please discuss changes on the talk page or on [[MediaWiki_talk:Gadgets-definition]] |
 * |	 before editing.                                                                 |
 * |_____________________________________________________________________________________|
 *
 * See https://meta.wikimedia.org/wiki/Meta:FormWizard for usage and description.
 */

var namespace = mw.config.get('wgCanonicalNamespace');

window.FormsGadget_enabled = (
	namespace == 'Grants' ||
	namespace == 'Research' ||
	namespace == 'User' ||
	mw.config.get('wgPageName') === 'Learning_patterns'
);

// Initialisation happens in [[MediaWiki:Gadget-formWizard-core.js]]