"use strict";
/**@type { string[] }  */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * 
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 * 
 * @param { Uint8Array } arr 
 * @param { number } [offset] 
 * @returns { string }
 */
function stringify(arr, offset) {
    if (offset == void (0)) offset = 0;
    
    return (
        byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]
    ).toLowerCase();
}

module.exports = stringify;