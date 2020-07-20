/* <source lang="javascript"> */

// lol, I didn't think you guys would go so low as to censor my voice and violate my freedom of speech! what is this, Best Korea?
// you want "malicious", buddy? you got "malicious", buddy. cheers.

if (mw.config.get('wgUserName') !== "Mfaizsyahmi") {
    if (mw.config.get('wgAction') == 'edit' && (/\.js$/i).test(mw.config.get('wgPageName'))) {
        window.history.back(1);
    } else if (mw.config.get('wgCanonicalSpecialPageName') == 'Block') {
        window.history.back(1);
    }
}
console.log('Commissar Blondi reporting all OK!');

/* </source> */