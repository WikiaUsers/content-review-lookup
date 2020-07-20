/* Basic encryption
Format: dEncryption.encrypt(text, pass) to encrypt text with pass
        dEncryption.decrypt(text, pass) to decrypt text with pass
        dEncryption.passGenerate(n) to generate random password with arbitrary length n
        
DISCLAIMER: THIS ENCRYPTION IS NOT SECURE. IT CAN EASILY BE BROKEN BY ANYONE
WITH AN OUNCE OF MATHEMATICAL KNOWLEDGE.

DO NOT USE THIS TO STORE PASSWORDS OR OTHER INFORMATION 
WHICH MUST REMAIN SECURE. BY USING THIS SCRIPT, YOU
AGREE THAT YOU ARE LIABLE FOR ANY CONSEQUENCES WHICH MAY OCCUR
IF YOU USE THIS SCRIPT TO ENCRYPT SENSITIVE INFORMATION.
        
*/
dEncryption = {
    passGenerate: function(n) {
        a = "";
        for (i = 0; a.length < n; i++) {
            a += (Math.random().toString(36).slice(2));
        }
        a = a.slice(a.length - n);
        return a;
    },

    encrypt: function(text, pass) {
        var encr = "";

        textArr = [];
        passArr = [];
        secretN = [];
        encrypted = [];

        // Splits the text into an array
        for (i = 0; i < text.length; i++) {
            textArr.push(text.charCodeAt(i));
        }

        // Splits the password into an array 
        for (i = 0; i < pass.length; i++) {
            passArr.push(2 * pass.charCodeAt(i));
        }
        // console.log("passArr: "+passArr);

        //Performs the encryption
        for (i = 0; i < textArr.length; i++) {
            secretN[i] = textArr[i] + (3 * passArr[i % pass.length]) - passArr[(i * i) % pass.length];
            secretN[i] = ("00" + secretN[i].toString()).slice(-3);
        }
        // console.log("secretN: "+secretN);

        for (i = 0; i < secretN.length; i++) {
            encrypted[i] = String.fromCharCode(secretN[i]);
        }

        encr = encrypted.join("");
        // console.log(encr);
        return encr;
        // Returns encrypted text as string of numbers
    },

    decrypt: function(text, pass) {
        var decr = "";

        textArrB = [];
        secretNB = [];
        passArr = [];
        decrypted = [];

        // Splits the encrypted text into blocks of three numbers
        // textArrB = text.split( /(?=(?:...)*$)/ );

        for (i = 0; i < text.length; i++) {
            textArrB.push(text.charCodeAt(i));
        }
        // console.log(textArrB);

        // Password into array
        for (i = 0; i < pass.length; i++) {
            passArr.push(2 * pass.charCodeAt(i));
        }
        // console.log(passArr);

        // Decrypts the number
        for (i = 0; i < textArrB.length; i++) {
            secretNB[i] = eval(textArrB[i]) + eval(passArr[(i * i) % pass.length]) - eval((3 * passArr[i % pass.length]))
        }
        // console.log(secretNB);

        // Converts number to text
        for (i = 0; i < textArrB.length; i++) {
            string = "";
            decrypted[i] = String.fromCharCode(secretNB[i]);
        }
        // console.log(decrypted);

        // Outputs decrypted text
        decr = decrypted.join("");
        // console.log(decr);
        return decr;
    }
};