/* Basic encryption
Format: encrypt(text, pass) to encrypt text with pass
        decrypt(text, pass) to decrypt text with pass
        passGenerate(n) to generate random password with arbitrary length n
        Base64Formatter formatting class for use with CryptoJS
        
Uses AES courtesy of https://code.google.com/p/crypto-js/
AES encryption added by Rose (Incongruence)
        
*/

$("head").append("<script src='http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js'/>"); 

var Base64Formatter = {
    stringify: function(cipherParams) {
        return cipherParams.ciphertext.toString(CryptoJS.enc.Base64);
    },

    parse: function(str) {
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(str)
        });

        return cipherParams;
    }
};

function passGenerate(n) {
    a = "";
    for (i=0; a.length < n; i++){
        a += (Math.random().toString(36).slice(2));
    }
    a = a.slice(a.length-n)
    return a;
}

function encrypt(text, pass) {
    return CryptoJS.AES.encrypt(text, pass, { format: Base64Formatter });
}

function decrypt(text, pass) {
    return CryptoJS.AES.decrypt(text, pass, { format: Base64Formatter }).toString(CryptoJS.enc.Utf8);
}