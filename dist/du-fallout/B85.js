
var alphabet = {};

alphabet.z85 = {};
alphabet.z85.enc = {
  0:  '0',
  1:  '1',
  2:  '2',
  3:  '3',
  4:  '4',
  5:  '5',
  6:  '6',
  7:  '7',
  8:  '8',
  9:  '9',
  10: 'À',
  11: 'Á',
  12: 'Â',
  13: 'Ã',
  14: 'Ä',
  15: 'Å',
  16: 'Æ',
  17: 'Ç',
  18: 'È',
  19: 'É',
  20: 'Ê',
  21: 'Ë',
  22: 'Ì',
  23: 'Í',
  24: 'Î',
  25: 'Ï',
  26: 'Ð',
  27: 'Ñ',
  28: 'Ò',
  29: 'Ó',
  30: 'Ô',
  31: 'Õ',
  32: 'Ö',
  33: '×',
  34: 'Ø',
  35: 'Ù',
  36: 'Ú',
  37: 'Û',
  38: 'Ü',
  39: 'Ý',
  40: 'Þ',
  41: 'ß',
  42: 'à',
  43: 'á',
  44: 'â',
  45: 'ã',
  46: 'ä',
  47: 'å',
  48: 'æ',
  49: 'ç',
  50: 'è',
  51: 'é',
  52: 'ê',
  53: 'ë',
  54: 'ì',
  55: 'í',
  56: 'î',
  57: 'ï',
  58: 'ð',
  59: 'ñ',
  60: 'ò',
  61: 'ó',
  62: '.',
  63: '-',
  64: ':',
  65: '+',
  66: '=',
  67: '^',
  68: '!',
  69: '/',
  70: '*',
  71: '?',
  72: '&',
  73: '<',
  74: '>',
  75: '(',
  76: ')',
  77: '[',
  78: ']',
  79: '{',
  80: '}',
  81: '@',
  82: '%',
  83: '$',
  84: '#'
};
alphabet.z85.dec = _.object(
  _.map(_.values(alphabet.z85.enc), function(v) { /* The keys */
    return v.charCodeAt(0);
  }),
  _.map(_.keys(alphabet.z85.enc), function(v) { /* The values */
    return parseInt(v);
  })
);

var NUM_MAXVALUE = Math.pow(2, 32) - 1;
var QUAD85 = 85 * 85 * 85 * 85;
var TRIO85 = 85 * 85 * 85;
var DUO85  = 85 * 85;
var SING85 = 85;

var DEFAULT_ENCODING = 'z85';

/* Characters to allow (and ignore) in an encoded buffer */
var IGNORE_CHARS = [
  0x09, /* horizontal tab */
  0x0a, /* line feed, new line */
  0x0b, /* vertical tab */
  0x0c, /* form feed, new page */
  0x0d, /* carriage return */
  0x20  /* space */
];

var ASCII85_ENC_START = '<~';
var ASCII85_ENC_END   = '~>';

/* Function borrowed from noseglid/canumb (github) */
function pad(width, number)
{
  return new Array(1 + width - number.length).join('0') + number;
}
function encodeBuffer(buffer, encoding)
{
  var enctable = alphabet[encoding].enc;
  var padding = (buffer.length % 4 === 0) ? 0 : 4 - buffer.length % 4;

  var result = '';
  for (var i = 0; i < buffer.length; i += 4) {

    /* 32 bit number of the current 4 bytes (padded with 0 as necessary) */
    var num = ((buffer[i] << 24) >>> 0) + // Shift right to force unsigned number
        (((i + 1 > buffer.length ? 0 : buffer[i + 1]) << 16) >>> 0) +
        (((i + 2 > buffer.length ? 0 : buffer[i + 2]) <<  8) >>> 0) +
        (((i + 3 > buffer.length ? 0 : buffer[i + 3]) <<  0) >>> 0);

    /* Create 5 characters from '!' to 'u' alphabet */
    var block = [];
    for (var j = 0; j < 5; ++j) {
      block.unshift(enctable[num % 85]);
      num = Math.floor(num / 85);
    }

    /* And append them to the result */
    result += block.join('');
  }

  return (('ascii85' === encoding) ? ASCII85_ENC_START : '') +
         result.substring(0, result.length - padding) +
         (('ascii85' === encoding) ? ASCII85_ENC_END : '');
}

function stringToUint8Array(string)
{
var uint=new Uint8Array(string.length);
for(var i=0,j=string.length;i<j;++i){
  uint[i]=string.charCodeAt(i);
}
return uint;
}
function encodeString(string, encoding)
{
  var buffer = stringToUint8Array(string); // utf8 at all times?
  return encodeBuffer(buffer, encoding);
}

function decodeBuffer(buffer, encoding)
{
  var dectable = alphabet[encoding].dec;

  var dataLength = buffer.length;
  if ('ascii85' === encoding) {
    dataLength -= (ASCII85_ENC_START.length + ASCII85_ENC_END.length);
  }

  var padding = (dataLength % 5 === 0) ? 0 : 5 - dataLength % 5;

  var bufferStart = ('ascii85' === encoding) ? ASCII85_ENC_START.length : 0;
  var bufferEnd   = bufferStart + dataLength;

  var result = new Buffer(4 * Math.ceil((bufferEnd - bufferStart) / 5));

  var nextValidByte = function(index) {
    if (index < bufferEnd) {
      while (-1 !== IGNORE_CHARS.indexOf(buffer[index])) {
        padding = (padding + 1) % 5;
        index++; // skip newline character
      }
    }
    return index;
  };

  var writeIndex = 0;
  for (var i = bufferStart; i < bufferEnd;) {
    var num = 0;

    i = nextValidByte(i);
    num = (dectable[buffer[i]]) * QUAD85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * TRIO85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * DUO85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * SING85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]);

    i = nextValidByte(i + 1);

    if (num > NUM_MAXVALUE || num < 0) {
      /* Bogus data */
      return false;
    }

    result.writeUInt32BE(num, writeIndex);
    writeIndex += 4;
  }

  return result.slice(0, writeIndex - padding);
}

function decodeString(string, encoding)
{
  var buffer = stringToUint8Array(string); // utf8 at all times?
  return decodeBuffer(buffer, encoding);
}

function aetob(data)
{
 encoding = DEFAULT_ENCODING;
    if (-1 === [ 'ascii85', 'z85', 'ipv6' ].indexOf(encoding)) {
      return false;
    }

    if (typeof data === 'Uint8Array') {
      return decodeBuffer(data, encoding);
    }

    if (typeof data === 'string') {
      return decodeString(data, encoding);
    }

    return false;
}

function btoae(data)
{
 encoding = DEFAULT_ENCODING;
    if (-1 === [ 'ascii85', 'z85', 'ipv6' ].indexOf(encoding)) {
      return false;
    }

    if (typeof data === 'Uint8Array') {
      return encodeBuffer(data, encoding);
    }

    if (typeof data === 'string') {
      return encodeString(data, encoding);
    }

    return false;
}