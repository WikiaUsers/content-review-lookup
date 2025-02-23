/*
------------
 Numeral.js
------------

---------
 AUTHORS 
---------
- Spottra: taken from his wiki (last update May 2014)
*/

Number.prototype.format = function(strFormat) {
    if (typeof strFormat !== 'string')
        return '';
    
    if (typeof strThousandsSeparator === 'undefined')
        strThousandsSeparator = ',';
    
    if (typeof strDecimalPoint === 'undefined')
        strDecimalPoint = '.';
    
    var fSplit = strFormat.split('[' + strDecimalPoint + ']');
    var optional = false;
    
    if (fSplit.length === 2)
        var optional = true;
    else
        fSplit = strFormat.split(strDecimalPoint);
    
    if (fSplit.length > 2)
        return '';

    if ('$¥£€₩'.indexOf(strFormat.substring(0, 1)) > -1) {
        currency = strFormat.substring(0, 1);
        strFormat = strFormat.substring(1);
    }
    else
        currency = '';

    if (fSplit[0].indexOf(strThousandsSeparator) > -1)
        thousands = strThousandsSeparator;
    else
        thousands = '';  
   
    if (fSplit.length === 2) {
        var intSigDigit = fSplit[1].length;
        var floatNumber = Math.round(this * Math.pow(10, intSigDigit)) / Math.pow(10, intSigDigit);    
        var nSplit = floatNumber.toString().split('.');

        if (nSplit.length < 2)
            nSplit.push('');

        for (var i = nSplit[1].length; i < fSplit[1].length; i ++) {
            if (fSplit[1].substring(i, i + 1) === '0')
                nSplit[1] += '0';
            else
                break;
        }
    }
    else {
        nSplit = this.toString().split('.');
        
        if (nSplit.length < 2)
            nSplit.push('');
    }

    for (var i = nSplit[0].length; i < fSplit[0].length; i ++) {
        if (fSplit[0].substring(fSplit[0].length - i - 1, fSplit[0].length - i) === '0')
            nSplit[0] = '0' + nSplit[0];
        else
            break;
    }

    if (thousands !== '')
        nSplit[0] = nSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

    if ((optional || fSplit.length < 2 || fSplit[1].length < 1) && nSplit[1].length < 1)
        return nSplit[0];
    
    if (fSplit[0].length < 1 && nSplit[0].toString() === '0')
        nSplit[0] = '';
    
    return currency + nSplit.join(strDecimalPoint);
};