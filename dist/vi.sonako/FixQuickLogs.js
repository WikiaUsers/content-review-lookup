// Fix for QuickLogs code. (Remove all the Nuke, WHAM v1, WHAM v2 and QuickManagement links because of rewrite behavior)
// Move Nuke, WHAM links after contentSub element

$("#contentSub > a#quicktools, #contentSub > a#contribs-wham, #contentSub > a#QuickManagement").detach();

$('#contentSub').after('<div style="font-size:medium"><a id="quicktools" href="#" title="Super Tool" style="color:red;font-weight:120%">Quick Tools (v1)</a> | <a title="Special:Nuke (cẩn thận)" target="_blank" href="' + mw.config.get('wgArticlePath').slice(0,-2) + 'Special:Blankpage?blankspecial=nuke&nukeuser=' + mw.config.get('wgPageName').split('/')[1] + '">Nuke</a> | <a href="javascript:void(0)" id="QuickManagement" title="QuickManagement">Quick Management</a> | <a style="color:red;cursor:pointer" id="contribs-wham" title="Super Tool">Quick Tools (v2)</a></div>');