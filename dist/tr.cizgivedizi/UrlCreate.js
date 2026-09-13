function urlCreate(text) {
var letters = {
"İ": "I",
"ı": "i",
"Ş": "S",
"ş": "s",
"Ğ": "G",
"ğ": "g",
"Ü": "U",
"ü": "u",
"Ö": "O",
"ö": "o",
"Ç": "C",
"ç": "c",
"/" : "",
"?" : ""
};
text = text.toLowerCase();
for (var letter in letters) {
text = text.replace(new RegExp(letter, 'g'), letters[letter]);
}
text = text.replace(/ /g, "_");
return text;
}