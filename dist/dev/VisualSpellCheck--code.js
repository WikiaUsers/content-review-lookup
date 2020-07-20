// __NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint browser:true, jquery:true, forin:false, smarttabs:true */

// Ideal event is "wikiaeditor" which fires when the editor code starts...
// Unfortunately, that fires BEFORE |window.RTE| is created so we're forced to wait on
// the first RTE editor instance to be created instead.
if (window.GlobalTriggers) {
window.GlobalTriggers.bind('rteinit', function fixSpellCheck() {
	"use strict";

	var WE = window.WikiaEditor,
	    RTE = window.RTE;

	// NOTE: WikiaEditor does not exist in Monobook since it isn't used there.
	if (!WE || !RTE) {
		return;
	}

	// We want to get MiniEditors as well as Edit Pages so we attack the core configuration for
	// all editors in the global RTE object.
	// Set the control flags to allow native spellcheck and the Ctrl+right-click CKE bypass
	RTE.config.disableNativeSpellChecker = false;
	RTE.config.browserContextMenuOnCtrl = true;

	// That's nice and all, but we also need to deal with instances that already exist...
	var inst;
	for (var key in WE.instances) {
		if (!WE.instances.hasOwnProperty(key)) {
			continue;
		}

		inst = WE.instances[key].ck;
		// If RTE.init has not run yet then our above flag settings will fix it
		if (!inst) {
			continue;
		}

		// Instance exists so we need to do this the hard way
		inst.config.disableNativeSpellChecker = false;
		inst.config.browserContextMenuOnCtrl = true;

		// The above will only kick in when switching to source then back to visual so we also need
		// to dig into the DOM and fix it manually.
		if (inst.mode === 'wysiwyg') {
			inst.document.getBody().setAttribute('spellcheck', 'true');
		}
	}
});
}

// </syntaxhighlight>