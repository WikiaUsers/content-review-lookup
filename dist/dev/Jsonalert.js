!function(cfg) {
    // alerts if the json is unparsable
    var mwc = mw.config.get(['wgAction', 'wgPageName']);
    if (cfg.loaded || mwc.wgAction !== 'edit' || !/\.json$/.test(mwc.wgPageName)) return;
    cfg.loaded = !0;
    var $save = $('#wpSave'),
        prev = '';
    window.i = typeof(window.i) === 'undefined' ? 0 : window.i;// globaltriggers.bind fix
    GlobalTriggers.bind('WikiaEditorReady', function WikiaEditor_onReady (editor) {
        editor.element.on('change keyup paste', function(e) {
            var text = editor.getContent().replace(/^\s*\/\*[\s\S]*\*\//, '');
            if (text === prev) return;
            prev = text;
            try {
                JSON.parse(text);
                $save.attr('title', '');
                $save.css('opacity', 1);
            }
            catch(ex) {
                console.debug('jsonalert', ex);
                $save.attr('title', ex);
                $save.css('opacity', 0.1);
            }
        });
    });
}((window.dev = window.dev || {}).jsonalert = window.dev.jsonalert || {});