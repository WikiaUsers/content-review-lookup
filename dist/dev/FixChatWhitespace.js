//Fixes posting of whitespace in chat.
//@author: Sophiedp <https://dev.wikia.com/wiki/User:Sophiedp>
//@note: Edited from [[CapsFirst]].
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat' && mw.loader.getState('ext.Chat2')) {
    document.querySelector('textarea').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            this.value = this.value.trim();
        }
    });
}