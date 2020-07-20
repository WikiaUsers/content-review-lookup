console.log("Templated Values loaded (mum_ prefix)");

// keep all entries ending with 4 new lines

// genreliste - bspw im modal über den geschichtenbalken oder beim erstellen einer neuen geschichte.

url_list_genre = "http://de.fanfictions.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Category:Genre-Portal&cmlimit=500&format=json";

var mum_genreliste_a = [];
var mum_genreliste_a2 = [];
var mum_genreliste_console = [];
var mum_themenliste_console = [];

var i = 0;

$.getJSON(url_list_genre, function(data) {

console.log("Genreliste wird generiert...\n---------");
for (var i = 0; i < data.query.categorymembers.length; i++) {
		mum_genreliste_a2 += "<a class='genreliste-item'>" + data.query.categorymembers[i].title + "</a>";

mum_genreliste_console += "| " + (data.query.categorymembers[i].title).replace(/Portal\:/g, '') + " |";

}
})
.done(function() {
mum_genreliste_a = mum_genreliste_a2;
console.log("Genreliste: |" + mum_genreliste_console + "|\n---------");
});
setTimeout(function() {
mum_genreliste_a = mum_genreliste_a2.replace(/Portal\:/g, '');
}, 5000);


if (wgUserName === "MehrBot") { mum_genreliste_a += '<a>Unbekannt</a>'; mum_genreliste_a2 += '<a>Unbekannt</a>'; }
console.log("templated value used mum_genreliste_a");



// themenliste - bspw im modal über den geschichtenbalken oder beim erstellen einer neuen geschichte. 
url_list_thema = "http://de.fanfictions.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Category:Thema-Portal&cmlimit=500&format=json";

mum_themenliste_a = [];
mum_themenliste_a2 = [];

var i = 0;

$.getJSON(url_list_thema, function(data) {

console.log("Themenliste wird generiert...\n---------");

for (var i = 0; i < data.query.categorymembers.length; i++) {
		mum_themenliste_a2 += "<a class='themenliste-item'>" + data.query.categorymembers[i].title + "</a>";

mum_themenliste_console += "| " + (data.query.categorymembers[i].title).replace(/Portal\:/g, '') + " |";
}

})
.done(function() {
mum_themenliste_a = mum_themenliste_a2;
console.log("Themenliste: |" + mum_themenliste_console + "|\n---------");
});
setTimeout(function() {
mum_themenliste_a = mum_themenliste_a2.replace(/Portal\:/g, '');
}, 5000);


if (wgUserName === "MehrBot") { mum_themenliste_a += '<a>Unbekannt</a>'; mum_themenliste_a2 += '<a>Unbekannt</a>'; }
console.log("templated value  mum_themenliste_a");




// keep this nonsense line to prevent blocking