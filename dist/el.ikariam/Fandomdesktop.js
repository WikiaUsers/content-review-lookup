var wgNamespaceNumber = mw.config.values.wgNamespaceNumber;
var wgPageName = mw.config.values.wgPageName;
$('.page-content').css('overflow-x','unset');
// Patching in changes to table sorting and alt rows.
$(function changeTS() {
    window['ts_alternate'] = function (table) {
        var tableBodies = table.getElementsByTagName("tbody");
        for (var i = 0; i < tableBodies.length; i++) {
            var tableRows = tableBodies[i].getElementsByTagName("tr");
            for (var j = 0; j < tableRows.length; j++) {
                var oldClasses = tableRows[j].className.split(" ");
                var newClassName = "";
                    for (var k = 0; k < oldClasses.length; k++) {
                        if (oldClasses[k] !== "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
                }
                tableRows[j].className = newClassName + (j%2 === 0?"alt":"");
            }
        }
    };
});

// Remove the "Featured on" links on File: / Image: description page
$(function() {
    if (wgNamespaceNumber == 6) $("#file").html($("#file").html().replace(/<br>.*<br>/i,"<br>"));
});

// Make it so that when adding a new image you can not click "Upload" until you choose a license first.
$(function requireImageLicense() {
    if (wgPageName == "Special:Upload" && getParamValue("wpDestFile") === null) {
        $("[name=wpUpload]").not("#wpUpload").attr("disabled","true");
        $("#wpLicense").change(function () {
            if ($("#wpLicense").val()) {
                $("[name=wpUpload]").removeAttr("disabled");
            } else {
                $("[name=wpUpload]").attr("disabled","true");
            }
        });
    }
});

//Wikia building code -- Start
//Generates building information table in each building page
var bdur = {
	'Ακαδημία':(function(){var t=[],c={a:1440,b:1,c:1.2,d:720,e:[984]};for(var i=0;i<50;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Αλάνα':(function(){var t=[],c={a:32000,b:13,c:1.17,d:2160};for(var i=0;i<80;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Αποθήκη':(function(){var t=[],c={a:2880,b:1,c:1.14,d:2160,e:[1063,1163]};for(var i=0;i<85;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Αποστακτήριο':(function(){var t=[],f=[{a:125660,b:37,c:1.06,d:2232,e:{10:1,11:1}},{a:196327,b:80,c:1.0672282,d:0}];for(var i=0;i<50;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=Math.round(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Αρχείο Ναυτικών Χαρτών':(function(){var t=[],c={a:1472465,b:509,c:1.12,d:504.5};for(var i=0;i<40;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Αρχιτεκτονικό γραφείο':(function(){var t=[],f=[{a:125660,b:37,c:1.06,d:2628},{a:156455,b:68,c:1.068703,d:0,e:{37:-1,43:1,48:1,49:1}}];for(var i=0;i<50;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=i<32?Math.round(g):Math.floor(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Δημαρχείο':(function(){var t=[],c={a:1800,b:1,c:1.17,d:-1080,e:[3186]};for(var i=0;i<66;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Εμπορευματικός λιμένας':[271230,316800,370800,435600,507600,594000,698400,817200,957600,1119600,1310400,1533600,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000,1728000],
	'Λιμένας':(function(){var t=[],c={a:50400,b:23,c:1.15,d:1512,e:[588]};for(var i=0;i<74;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Εργαστήριο':(function(){var t=[],c={a:96000,b:7,c:1.05,d:11880};for(var i=0;i<32;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ανταλλακτήριο':(function(){var t=[],c={a:108000,b:11,c:1.1,d:9360};for(var i=0;i<72;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Κυβερνείο':(function(){var t=[],c={a:11520,b:1,c:1.4,d:0};for(var i=0;i<20;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Κρησφύγετο':(function(){var t=[],f=[{a:96000,b:7,c:1.05,d:12960},{a:95959,b:13,c:1.06315467,d:0}];for(var i=0;i<60;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=Math.round(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Λιθουργείο':(function(){var t=[],c={a:72000,b:11,c:1.1,d:6120};for(var i=0;i<61;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Μαύρη Αγορά':(function(){var t=[],c={a:4321,b:1,c:1.1,d:4627};for(var i=0;i<25;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Μουσείο':(function(){var t=[],c={a:18000,b:1,c:1.1,d:14040};for(var i=0;i<36;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ναυπηγείο':(function(){var t=[],c={a:64800,b:7,c:1.05,d:7128};for(var i=0;i<38;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ναός':(function(){var t=[],c={a:2160,b:1,c:1.1,d:0,e:{33:1,36:1,38:1,43:-1}};for(var i=0;i<56;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ξυλοκόπος':(function(){var t=[],c={a:72000,b:11,c:1.1,d:6120};for(var i=0;i<61;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ξυλουργός':(function(){var t=[],f=[{a:125660,b:37,c:1.06,d:2808},{a:125031,b:56,c:1.069394,d:0}];for(var i=0;i<50;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=i<32?Math.round(g):Math.floor(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Οινοποιείο':(function(){var t=[],c={a:72000,b:11,c:1.1,d:6120};for(var i=0;i<61;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Οπτικός':(function(){var t=[],f=[{a:125660,b:37,c:1.06,d:2772},{a:168457,b:75,c:1.069256,d:0,e:{39:-1,44:-1,50:1}}];for(var i=0;i<50;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=Math.round(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Παλάτι':(function(){var t=[],c={a:11520,b:1,c:1.4,d:0};for(var i=0;i<20;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Πειρατικό Φρούριο':[40,414,817,1253,1721,2228,2779,3370,4010,4702,8989,10487,12150,13997,16045,30528,35449,41058,47455,54745,76684,88880,102906,119034,137585,200203,232974,270994,315090,366246],
	'Περιοχή Δοκιμών Πυροτεχνημάτων':(function(){var t=[],f=[{a:125660,b:37,c:1.06,d:2628},{a:156455,b:68,c:1.068703,d:0,e:{37:-1,43:1,48:1,49:1}}];for(var i=0;i<50;i++){var h=i<32?0:1,g=(f[h].a/f[h].b*Math.pow(f[h].c,i+1)-f[h].d)-(f[h].e!=undefined&&f[h].e[i+1]!=undefined?f[h].e[i+1]:0);g=i<32?Math.round(g):Math.floor(g);t.push((g>1728e3?1728e3:g));}return t;})(),
	'Πρεσβεία':(function(){var t=[],c={a:96000,b:7,c:1.05,d:10080};for(var i=0;i<78;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Πύργος Αλχημιστή':(function(){var t=[],c={a:72000,b:11,c:1.1,d:6120};for(var i=0;i<61;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Στρατώνας':(function(){var t=[],c={a:25200,b:11,c:1.1,d:1728,e:[732]};for(var i=0;i<49;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Ταβέρνα':(function(){var t=[],c={a:10800,b:1,c:1.06,d:10440};for(var i=0;i<70;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Τείχος':(function(){var t=[],c={a:57600,b:11,c:1.1,d:3240,e:[2430]};for(var i=0;i<48;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})(),
	'Υαλουργείο':(function(){var t=[],c={a:72000,b:11,c:1.1,d:6120};for(var i=0;i<61;i++){var d=Math.round(c.a/c.b*Math.pow(c.c,i+1)-c.d)-(c.e!=undefined?(c.e[i]!=undefined?c.e[i]:0):0);t.push((d>1728e3?1728e3:d));}return t;})()
};
// console.log(bdur);
var LD = {
	buildings:['Ακαδημία','Αλάνα','Αποθήκη','Αποστακτήριο','Αρχείο Ναυτικών Χαρτών','Αρχιτεκτονικό γραφείο','Δημαρχείο','Λιμένας','Εργαστήριο','Ανταλλακτήριο','Κυβερνείο','Κρησφύγετο','Λιθουργείο','Μαύρη Αγορά','Μουσείο','Ναυπηγείο','Ναός','Ξυλοκόπος','Ξυλουργός','Οινοποιείο','Οπτικός','Παλάτι','Πειρατικό Φρούριο','Περιοχή Δοκιμών Πυροτεχνημάτων','Πρεσβεία','Πύργος Αλχημιστή','Στρατώνας','Ταβέρνα','Τείχος','Υαλουργείο'],
	warehouse:['Αποθήκη','Αποθήκης'],
	updatedversion:'έκδοση αναβάθμισης {0}',
	steamlift:'Ατμοκίνητο Ανυψωτικό Όχημα',
	notes:'Σημειώσεις',
	hardcap:{
		divtitle:'Το {0}ο επίπεδο είναι το μέγιστο δυνατό επίπεδο για αυτό το κτήριο,{1}',
		divtxt:'Το <b>{0}</b><sup>ο</sup> επίπεδο είναι το μέγιστο δυνατό επίπεδο για αυτό το κτήριο,<br>{1}',
		name:'Τελικό Όριο',
		namewithA:'Τελικό Όριο Με Αμβροσία',
		namewithoutA:'Τελικό Όριο Χωρίς Αμβροσία',
		title:'εφόσον δεν υπάρχουν άλλα επίπεδα για αυτό το κτήριο.',
		e:'Δεν υπάρχουν περαιτέρω αναβαθμίσεις επειδή δεν υπάρχουν άλλα επίπεδα για το κτήριο<br>και το κουμπί <b>Αναβάθμιση</b> έχει αφαιρεθεί.<cite name="hardcap">Το {0} είναι το μέγιστο δυνατό επίπεδο για αυτό το κτήριο.<br>Καμία περαιτέρω αναβάθμιση δεν είναι δυνατή επειδή το κουμπί αναβάθμισης έχει αφαιρεθεί.</cite>',
		title1:'χωρίς την χρήση Αμβροσίας για διπλασιασμό του χώρου αποθήκευσης.',
		e1:'Καμία περαιτέρω αναβάθμιση δεν είναι δυνατή επειδή το επόμενο επίπεδο<br>απαιτεί ποσότητα πόρων μεγαλύτερη από <b>{0}</b> μονάδες που είναι το μέγιστο όριο χωρητικότητας της πόλης,<br><b>χωρίς</b> την χρήση Αμβροσίας {1} για <b>διπλασιασμό</b> του Χώρου Αποθήκευσης με το {2}. <cite name="StoragecapA">Το {3} είναι το μέγιστο δυνατό επίπεδο για αυτό το κτήριο.<br />Καμία περαιτέρω αναβάθμιση δεν είναι δυνατή επειδή το επόμενο επίπεδο απαιτεί ποσότητα πόρων μεγαλύτερη από <b>{0}</b> μονάδες που είναι το μέγιστο όριο χωρητικότητας της πόλης, <b>χωρίς</b> την χρήση Αμβροσίας {1} για <b>διπλασιασμό</b> του Χώρου Αποθήκευσης</cite>',
		title2:'ακόμα και με την χρήση Αμβροσίας για διπλασιασμό του χώρου αποθήκευσης.',
		e2:'Καμία περαιτέρω αναβάθμιση δεν είναι δυνατή επειδή το επόμενο επίπεδο<br>απαιτεί ποσότητα πόρων μεγαλύτερη από <b>{0}</b> μονάδες που είναι το μέγιστο όριο χωρητικότητας της πόλης,<br><b>με</b> τη χρήση Αμβροσίας {1} για <b>διπλασιασμό</b> του Χώρου Αποθήκευσης με το {2}. <cite name="StoragecapA"> Το {3} είναι το μέγιστο δυνατό επίπεδο για αυτό το κτήριο.<br />Καμία περαιτέρω αναβάθμιση δεν είναι δυνατή επειδή το επόμενο επίπεδο απαιτεί ποσότητα πόρων μεγαλύτερη από <b>{0}</b> μονάδες που είναι το μέγιστο όριο χωρητικότητας της πόλης, <b>με</b> τη χρήση Αμβροσίας {1} για <b>διπλασιασμό</b> του Χώρου Αποθήκευσης</cite>',
		e3:'Οι πληροφορίες για τα επίπεδα 41 έως 48 είχαν <i>αρχικά</i> συλλεχθεί λόγω ενός σφάλματος<br>που επέτρεπε στο <b>Δημαρχείο</b> να αναβαθμιστεί πέρα από τους περιορισμούς της <i>{0}</i>!<br><b>Αυτό το σφάλμα έχει διορθωθεί στο παιχνίδι από τότε!</b><hr>Αυτές οι πληροφορίες επανεπιβεβαιώθηκαν και διορθώθηκαν από τη σελίδα Βοήθειας<br>για την {1} της {2}!',
	},
	units:{
		second:['δ','δευτερόλεπτα','δευτερόλεπτο'],
		minute:['λ','λεπτά','λεπτό'],
		hour:['ω','ώρες','ώρα'],
		day:['Η','ημέρες','ημέρα'],
		month:['Μ','μήνες','μήνας'],
		year:['Ε','έτη','έτος']
	},
	tho:'.',
	dec:',',
	Tipsrel:['ξύλου','κρασιού','μαρμάρου','kρυστάλλου','Θείου'],
	wondernames:['Σιδηρουργείο του Ήφαιστου','Ιερό Άλσος του Άδη','Κήποι της Δήμητρας','Παρθενώνας της Αθηνάς','Ναός του Ερμή','Φρούριο του Άρη','Ναός του Ποσειδώνα','Κολοσσός']
};
var wc = [8000,16401,25455,35331,46181,58159,71421,86138,102493,120687,140942,163502,188637,216646,247860,282647,321416,364622,412768,466416,526189,592779,666959,749584,841609,944094,1058219,1185297,1326787,1484315,1659690,1854922,2072252,2314171,2583453,2883186,3216807,3588142,4001450,4461476,4973499,5543400,6177729,6883779,7669673,8544460,9518219,10602179,11808851,13152172,14647676,16312668,18166439,20230485,22528769,25088000,27937955,31111829,34646637,38583648,42968887,47853679,53295269,59357506,66111616,73637056,82022473,91366775,101780329,113386298,126322135,140741251,156814887,174734197,194712581,216988297,241827374,269526873,300418536,334872863,373303675,416173213,463997848,517354466,576887609];
var dc = [32000,65401,101073,139585,181437,227119,277128,331991,392268,458564,531535,611896,700427,797983,905498,1024000,1154614,1298578,1457248,1632119,1824830,2037185,2271165,2528951,2812939,3125764,3470326,3849813,4267731,4727939,5234678,5792619,6406896,7083160,7827629,8647143,9549229,10542172,11635086,12838003,14161964,15619122,17222851,18987875,20930401,23068269,25421121,28010583,30860463,33996977,37448993,41248299,45429902,50032358,55098129,60673986,66811447,73567262,81003948,89190382,98202448,108123754,119046431,131072000,144312338,158890744,174943109,192619216,212084166,233519956,257127222,283127160,311763649,343305589,378049493,416322336,458484710,504934306,556109751,612494861];
function escRegEx(str) { return str.replace(/[\[\]\/\{\}\(\)\-\?\$\*\+\.\\\^\|]/g, "\\$&"); }
function ucfirst(s) { return s[0].toUpperCase()+s.slice(1); }
function prntf(s,r)
{
	var k = Object.keys(r);
	var i = k.length;
	while(i--) { s = s.replace(new RegExp(escRegEx('{'+k[i]+'}'),'g'),r[k[i]]); }
	return s;
}
function refs()
{
	$(document).ready(function()
	{
		var citenames = [];
		$('cite').each(function(k,c) { if($.inArray($(c).attr('name'),citenames)===-1) citenames.push($(c).attr('name')); });
		var rfs = '';
		$.each(citenames,function(a,b)
		{
			var n = 0;
			var tref = '';
			rfs += '<li id="cite_note-'+b+'-'+a+'">↑ ';
			$('cite').each(function(d,e)
			{
				if($(e).attr('name')==b)
				{
					n++;
					tref += n==1 ? '<span class="reference-text">'+$(e).html()+'</span>' : '';
					rfs += '<sup><a href="#cite_ref-'+b+'_'+a+'-'+(n-1)+'">'+(a+1)+'.'+(n-1)+'</a></sup> ';
					$(e).replaceWith('<sup id="cite_ref-'+b+'_'+a+'-'+(n-1)+'" class="reference"><a href="#cite_note-'+b+'-'+(n-1)+'">['+(a+1)+']</a></sup>');
				}
			});
			rfs += tref+'</li>';
		});
		if(citenames.length>0)
		{
			if($('div#jspage.widepage ol.references:first').length==1) { $('div#jspage.widepage ol.references:first').html(rfs); }
			else { $('div#jspage.widepage').after('<h3>'+LD.notes+'</h3><ol class="references">'+rfs+'</ol>') }
		}
		return true;
	});
}
function hardcap(t,s)
{
	var title = '';
	var c = '';
	var e = '';
	switch(s)
	{
		case 1:
			title += LD.hardcap.title1;
			e += '<br>'+prntf(LD.hardcap.e1,[FrmtNumToStr((wc[84]*5+dc[79]*3+2500)),icon(5,9,12),lnk(LD.steamlift,LD.steamlift),lnk(LD.hardcap.name+'#'+LD.hardcap.namewithoutA,LD.hardcap.namewithoutA)]);
			c = '-s';
			break;
		case 2:
			title += LD.hardcap.title2;
			e = '<br>'+prntf(LD.hardcap.e2,[FrmtNumToStr((wc[84]*5+dc[79]*3+2500)*2),icon(5,9,12),lnk(LD.steamlift,LD.steamlift),lnk(LD.hardcap.name+'#'+LD.hardcap.namewithA,LD.hardcap.namewithA)]);
			c = '-sa';
			break;
		case 3:
			e += prntf(LD.hardcap.e3,[lnk(LD.warehouse[0],LD.warehouse[1]),lnk(prntf(ucfirst(LD.updatedversion),['0.5.0']),prntf(LD.updatedversion,['0.5.0'])),lnk('Ikapedia','Ikapedia')]);
			break;
		default:
			title += LD.hardcap.title;
			e = '<br>'+prntf(LD.hardcap.e,[lnk(LD.hardcap.name,LD.hardcap.name)]);
			break;
	}
	t = '<div class="hardcap'+c+'" title="'+prntf(LD.hardcap.divtitle,[t,title])+'"><br><span style="background:#FFD;color:black;">'+prntf(LD.hardcap.divtxt,[t,title+e])+'</span><br><br></div>';
	return s==3?e:t;
}
function BT(t,k,p,s) // Δευτερόλεπτα, είδος, ακρίβεια, διάστημα
{
	var units = LD.units;
	var colors = {'second':'blue','minute':'blue','hour':'blue','day':'green','month':'orange','year':'red'};
	t = t || 0;
	k = k || 0; // 0: βασική μορφή, 1: πλήρης μορφή
	p = p || 6;
	var pt = p;
	s = s || ' ';
	if(!isFinite(t)){return ' \u221E ';}
	if(t < 0) t *= -1;
	var a = {'second':1,'minute':60,'hour':60,'day':24,'month':30,'year':365};
	var b = {};
	var l = {};
	var c = 1;
	for(var d in Object.keys(a))
	{
		c *= a[Object.keys(a)[d]];
		b[Object.keys(a)[d]] = c/(d==Object.keys(a).length-1?30:1);
		l[Object.keys(a)[d]] = [];
		for(var g=0;g<4;g++) { l[Object.keys(a)[d]][g] = units[Object.keys(a)[d]][g]; }
	}
	var i = Object.keys(a).length;
	var z = {};
	while(i--){z[Object.keys(a)[i]] = b[Object.keys(a)[i]];}
	t = Math.ceil(t);
	var retarr = [];
	for(var f in z)
	{
		var timeInSecs=Math.floor(t/z[f]);
		if(isNaN(timeInSecs)) {return retarr.join(' ');}
		if(pt>0 && (timeInSecs>0 || retarr.length>0))
		{
			t = t-timeInSecs*z[f];
			if(timeInSecs>0) { retarr.push('<span style=\'color:'+(p!=6?'grey':colors[f])+'\'>'+FrmtNumToStr(timeInSecs)+' '+l[f][k===0?k:(timeInSecs===1?2:1)]+'</span>'); }
			pt = timeInSecs===0 ? pt : (pt-1);
		}
	}
	return retarr.join(s);
}
function FrmtNumToStr(inputNum,outputSign,precision)
{
	precision = precision ? "10e" + (precision - 1) : 1;
	var ret, val, sign, i, j;
	var tho = LD.tho;
	var dec = LD.dec;
	if(!isFinite(inputNum)) { return '\u221E'; }
	sign = inputNum > 0 ? 1 : inputNum == 0 ? 0 : -1;
	if(sign)
	{
		val = (( Math.floor(Math.abs(inputNum * precision)) / precision ) + '').split('.');
		ret = val[1] !== undefined ? [dec, val[1]] : [];
		val = val[0].split('');
		i = val.length;
		j = 1;
		while(i--)
		{
			ret.unshift(val.pop());
			if(i && j % 3 === 0)
			{
				ret.unshift(tho);
			}
			j++;
		}
		if(outputSign)
		{
			ret.unshift(sign == 1 ? '+' : '-');
		}
		return ret.join('');
	}
	else return inputNum;
}
function mul(p)
{
	p = parseInt(p);
	switch(true)
	{
		case (p >= 1 && p <= 5):
			return 3-0.25*p;
		case (p >= 6 && p <= 10):
			return 2.25-0.125*p;
		case (p >= 11 && p <= 20):
			return 0.875;
		case (p >= 21 && p <= 30):
			return 0.75;
		case (p >= 31 && p <= 50):
			return 0.5;
		case (p >= 51 || p <= 0):
			return 0;
	}
}
function calc(rank,townhall,level,type)
{
	var rk = !isNaN(parseInt(rank))?parseInt(rank):0;
	var tw = townhall?true:false;
	var lv = !isNaN(parseInt(level))?parseInt(level):0;
	var types = ['safe','resource','rsum'];
	var tp = types.indexOf(type);
	var cf = tp==-1?0:(tp<2?1:(tp==2?5:(tp==3?12:0)));
	return ((tw?100:0)+lv*480)*(tp>=1?mul(rk):1)*(tp==2?5:1);
}
function translate(lang)
{
	var arr = ['citytitle','citynum','wlvls','safeqnty','safewoodqnty','safewineqnty','safemarbleqnty','safecrystalqnty','safesulfurqnty','safesumqnty','sum','townsum','levelsum','safesum','woodsum','winesum','marblesum','glasssum','sulfursum','resqntysum'];
	$('#flags > img').each(function(x,i) { $(i).css({'cursor':'pointer','opacity':'1.0'}); });
	$('[id="'+lang+'"]').css({'cursor':'default','opacity':'0.5'});
	$('#rank').before(lg[lang].rnklbl+': ');
	$('#rewardtable > thead > tr:first > th').contents().first().each(function(){$(this).replaceWith(lg[lang].rcvdres)});
	$('#rank_v').text(FrmtNumToStr(mul($('#rank').val()),false,3).replace(/0+$/,'').replace(/[,.]$/,''));
	$('#rewardtable > thead > tr:last > th:first').attr('title',lg[lang].citytitle).text(lg[lang].city);
	$('#rewardtable > thead > tr:last > th').each(function(k,th)
	{
		$(th).attr('title',lg[lang][arr[k]]);
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].city);
				break;
			case $('#rewardtable > thead > tr:last > th').length-1:
				$(th).text(lg[lang].sum);
				break;
		}
	});
	$('#rewardtable > tfoot > tr > th').each(function(k,th)
	{
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].sum);
				break;
			default:
				$(th).attr('title',lg[lang][arr[k+10]]);
				break;
		}
	});
	$('#townsum').text($('input[id^="town"]:checked').length);
	var lsum = 0;
	var sfsum = 0;
	var ressum = 0;
	$('input[id^="town"]:checked').each(function()
	{
		$(this).parents('tr').css('opacity','1.0').find('input[type="number"]').prop('disabled',false);
		var lv = parseInt($(this).parents('tr').find('input[type="number"]').val());
		lsum += lv;
		sfsum += calc($('#rank').val(),true,lv,'safe');
		$(this).parents('tr').find('td[id^="safe"]').text(FrmtNumToStr(calc($('#rank').val(),true,lv,'safe'),false,0));
		$(this).parents('tr').find('td[id^="wood"],td[id^="wine"],td[id^="marble"],td[id^="glass"],td[id^="sulfur"]').text(FrmtNumToStr(calc($('#rank').val(),true,lv,'resource'),false,0));
		ressum += calc($('#rank').val(),true,lv,'resource');
		$(this).parents('tr').find('td[id^="citysum"]').text(FrmtNumToStr(calc($('#rank').val(),true,lv,'rsum'),false,0));
	});
	$('input[id^="town"]:not(:checked)').each(function()
	{
		$(this).parents('tr').css('opacity','0.5').find('input[type="number"]').prop('disabled',true).val(0).parents('tr').find('td:gt(2)').text('0');
	});
	$('#levelsum').text(FrmtNumToStr(lsum,false,0));
	$('#safesum').text(FrmtNumToStr(sfsum,false,0));
	$('#woodsum,#winesum,#marblesum,#glasssum,#sulfursum').text(FrmtNumToStr(ressum,false,0));
	$('#sum').text(FrmtNumToStr(ressum*5,false,0));
}
function Tip(txt,tip,type)
{
	switch(type)
	{
		case 1: // Πλήρης λειτουργικότητα
			return '<div class="advanced-tooltip" style="display:inline">'+txt+'<div class="tooltip-contents">'+tip+'</div></div>';
		default: // Βασική λειτουργικότητα
			return '<span class="basic-tooltip" title="'+tip+'">'+txt+'</span>';
	} 
}
function Tips(q,r,s,a)
{
	var rel = LD.Tipsrel; 
	switch(r)
	{
		case '': // Καμία μείωση
			return Tip(FrmtNumToStr(q),'<center>Καμία Έρευνα ή Μειωτικό Κτήριο<br />(<b>0 %</b> Μείωση)<br /><b>'+FrmtNumToStr(q)+'</b> μονάδες '+rel[s]+'</center>',1);
		case 'Τ': // Μείωση Τροχαλίας
		case 'Γ': // Μείωση Γεωμετρίας
		case 'Α': // Μείωση Αλφαδιού
			var h = ['<th colspan="'+(r==='Γ'?2:(r==='Α'?3:1))+'">'+(r!=='Τ'?'Έρευνες':'Έρευνα')+'</th>',r!=='Τ'?'<th rowspan=2>Σύνολο<br>έρευνών</th>':'','<th>Τροχαλία</th>'+(r==='Γ'||r==='Α'?'<th>Γεωμετρία</th>':'')+(r==='Α'?'<th>Αλφάδι</th>':''),'<th colspan=2>Μειωτικό κτήριο</th>','<th rowspan=2>Συνολικό<br>ποσοστό</th>','<th colspan=3>Ποσότητα '+icon(s,12,10)+'</th>','<th>Επίπεδο</th><th>Ποσοστό</th>','<th>μείωσης</th><th>τελική</th><th>αθροιστική</th>'];
			var t = '<table class="darktable zebra" style="display:inline-block;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr>'+h[0]+h[1]+h[3]+h[4]+h[5]+h[3]+h[4]+h[5]+'</tr><tr>'+h[2]+h[6]+h[7]+h[6]+h[7]+'</tr></thead><tbody>';
			for(var i=0;i<26;i++)
			{
				t += '<tr><td>2 %</td>'+(r==='Γ'||r==='Α'?'<td>4 %</td>':'')+(r==='Α'?'<td>8 %</td>':'')+(r==='Τ'?'':'<td>'+(r==='Γ'?6:(r==='Α'?14:0))+' %</td>')+'<td>'+i+'</td><td>'+i+' %</td><td>'+((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+i)+' %</td><td style="text-align:right">'+FrmtNumToStr(Math.ceil(((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+i)*q/100))+'</td><td style="text-align:right">'+FrmtNumToStr(Math.floor((100-((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+i))*q/100))+'</td><td style="text-align:right">'+FrmtNumToStr(Math.floor((100-((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+i))*a/100))+'</td><td'+(i==25?' colspan="6"':'')+'>'+(i==25?'':(i+26)+'</td><td>'+(i+26)+' %</td><td>'+((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+(i+26))+' %</td><td style="text-align:right">'+FrmtNumToStr(Math.ceil(((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+(i+26))*q/100))+'</td><td style="text-align:right">'+FrmtNumToStr(Math.floor((100-((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+(i+26)))*q/100))+'</td><td style="text-align:right">'+FrmtNumToStr(Math.floor((100-((r==='Τ'?2:(r==='Γ'?6:(r==='Α'?14:0)))+(i+26)))*a/100)))+'</td></tr>';
			}
			t += '</tbody><tfoot><tr>'+h[2]+h[1]+h[6]+h[4]+h[7]+h[6]+h[4]+h[7]+'</tr><tr>'+h[0]+h[3]+h[5]+h[3]+h[5]+'</tr></tfoot></table>';
			return t;
		case 'ΟΜ':
			var t = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th colspan="4">Ενεργά επίπεδα<br>Οικονομικού Μέλλοντος</th><th colspan="4">Πιθανά επίπεδα<br>Οικονομικού Μέλλοντος</th></tr><tr><th>ΟΜ</th><th>Αύξηση</th><th>Πρωτεύουσα</th><th>Αποικία</th><th>ΟΜ</th><th>Αύξηση</th><th>Πρωτεύουσα</th><th>Αποικία</th></tr></thead><tbody>';
			for(var i=0;i<26;i++)
			{
				t += '<tr><th>'+FrmtNumToStr(i)+'</th><td>+'+FrmtNumToStr(i*20)+'</td><td>'+FrmtNumToStr(parseInt(q)+300+i*20)+'</td><td>'+FrmtNumToStr(parseInt(q)+50+i*20)+'</td>'+(i+26<=43?'<th>'+FrmtNumToStr(i+26)+'</th><td>+'+FrmtNumToStr((i+26)*20)+'</td><td>'+FrmtNumToStr(parseInt(q)+300+(i+26)*20)+'</td><td>'+FrmtNumToStr(parseInt(q)+50+(i+26)*20)+'</td>':(i+26==44?'<td rowspan="8" colspan="4"></td>':''))+'</tr>';
			}
			t += '</tbody></table>';
			return t;
		case 'W':
			var t = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td></td><td></td></tr><tr></tr><tr></tr></thead><tbody>';
			break;
	}
}
function img(i,t,a,c,w,h,l) // Όνομα εικόνας, Επεξήγηση, Εναλλακτικό κείμενο, κλάση, πλάτος, ύψος, σύνδεσμος
{
	var s = ' style="width:'+(w&&w!==''?w+'px':'auto')+';height:'+(h&&h!==''?h+'px':'auto')+'"';
	var p = i&&i!==''?'<img src="https://ikariam.fandom.com/el/wiki/Special:Filepath/'+i+'"'+(t&&t!==''?' data-tooltip="'+t+'"':'')+(' alt="'+(a&&a!==''?a:i.replace('_',' '))+'"')+(c&&c!==''?' class="'+c+' ikariam-tooltip"':'')+' data-image-key="'+i+'" data-image-name="'+i.replace('_',' ')+'"'+s+'>':'';
	return (l&&l!==''?'<a href="'+(l!==''?l:'/el/wiki/Special:Filepath/'+i)+'">':'')+p+(l&&l!==''?'</a>':'');
}
function icon(r,w,h) // εικόνα, πλάτος, ύψος
{
	var res = ['wood_small.gif','wine_small.gif','marble_small.gif','crystal_small.gif','sulphur_small.gif','ambrosia.png','gold_small.gif','icon_citizen.gif'];
	var rel = ['ξύλο','κρασί','μάρμαρο','kρύσταλλο','Θείο','Αμβροσία','Χρυσός','Πολίτης'];
	return img(res[r][0].toUpperCase()+res[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),'image image-thumbnail link-internal',w?w:25,h?h:20,'/el/wiki/'+rel[r][0].toUpperCase()+rel[r].slice(1));
}
function lnk(u,t,i) // url, Επεξήγηση, 
{
	return '<a href="https://ikariam.fandom.com/el/wiki/'+u+'" class="ikariam-tooltip" data-tooltip="'+(i?i:(t?t:u))+'">'+t+'</a>'; // (t?t:u)
}
function shipsTableTip(level,base)
{
	var txt = '';
	for(var z=0;z<13;z++)
	{
		txt += '<tr><td>'+(z+1)+'</td><td>'+(z+1<=(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z-(level)))-Math.ceil(base*Math.pow(0.95,z+1-(level)))))+'</td><td>'+(z+1<(level)?'-':(z+1>(level)?BT(base-Math.ceil(base*Math.pow(0.95,z+1-(level)))):'<span style="color:blue">0 δ</span>'))+'</td><td>'+(z+1<(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z+1-(level)))))+'</td><td>'+(z+14)+'</td><td>'+(z+14<=(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z+13-(level)))-Math.ceil(base*Math.pow(0.95,z+14-(level)))))+'</td><td>'+(z+14<(level)?'-':(z+14>(level)?BT(base-Math.ceil(base*Math.pow(0.95,z+14-(level)))):'<span style="color:blue">'+0+' δ</span>'))+'</td><td>'+(z+14<(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z+14-(level)))))+'</td>'+(z==12?'<td colspan="4"></td>':'<td>'+(z+27)+'</td><td>'+(z+27<=(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z+26-(level)))-Math.ceil(base*Math.pow(0.95,z+27-(level)))))+'</td><td>'+(z+27<(level)?'-':(z+27>(level)?BT(base-Math.ceil(base*Math.pow(0.95,z+27-(level)))):'<span style="color:blue">0 δ</span>'))+'</td><td>'+(z+27<(level)?'-':BT(Math.ceil(base*Math.pow(0.95,z+27-(level)))))+'</td>')+'</tr>';
	}
	return ('<u>Μαθηματικός τύπος</u><br><b><i>Διάρκεια κατασκευής (δ) = Βασική διάρκεια &times; 0,,95<sup>Επίπεδο-Επίπεδο εμφάνισης</sup></i></b><br>Ναυπηγείο <b>'+level+'<sup>ου</sup></b> επιπέδου<br>Βασικός χρόνος κατασκευής: <b>'+BT(base)+'</b><table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th rowspan="3">'+img('Minimum.gif','Ελάχιστο επίπεδο αποθήκης','Ελάχιστο επίπεδο αποθήκης','image',20,20,'Αποθήκη')+'</th><th colspan="3">Διάρκεια</th><th rowspan="3">'+img('Minimum.gif','Ελάχιστο επίπεδο αποθήκης','Ελάχιστο επίπεδο αποθήκης','image',20,20,'Αποθήκη')+'</th><th colspan="3">Διάρκεια</th><th rowspan="3">'+img('Minimum.gif','Ελάχιστο επίπεδο αποθήκης','Ελάχιστο επίπεδο αποθήκης','image',20,20,'Αποθήκη')+'</th><th colspan="3">Διάρκεια</th></tr><tr><th colspan="2">μείωσης</th><th rowspan="2">τελική</th><th colspan="2">μείωσης</th><th rowspan="2">τελική</th><th colspan="2">μείωσης</th><th rowspan="2">τελική</th></tr><tr><th>'+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th><th>Σ '+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th><th>'+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th><th>Σ '+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th><th>'+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th><th>Σ '+img('Time_small.gif','Διάρκεια','Διάρκεια','image',10,10,'Διάρκεια')+'</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;');
}
function FaithTableGenerator()
{
	if($('table#FaithCalc').length==1)
	{
		var tds = '';
		var durs = [7,4,9,7,1,3,1,3];
		for(var x=0;x<4;x++)
		{
			var r1 = '', r2 = '', r3 = '', r4 = '';
			for(var i=0;i<6;i++)
			{
				r1 += '<td><input id="t_'+(2*(x+1)-1)+'_'+i+'" name="t_'+(2*(x+1)-1)+'" type="radio" value="'+i+'"'+(i==0?' checked="checked"':'')+'></td>';
				r2 += '<td><input id="t_'+(2*(x+1))+'_'+i+'" name="t_'+(2*(x+1))+'" type="radio" value="'+i+'"'+(i==0?' checked="checked"':'')+'></td>';
				r3 += '<td><input id="t_'+(2*(x+1)+5)+'_'+i+'" name="t_'+(2*(x+1)+5)+'" type="radio" value="'+i+'"'+(i==0?' checked="checked"':'')+'></td>';
				r4 += '<td><input id="t_'+(2*(x+1)+6)+'_'+i+'" name="t_'+(2*(x+1)+6)+'" type="radio" value="'+i+'"'+(i==0?' checked="checked"':'')+'></td>';
			}
			tds += '<tr style="border:1px solid black"><td '+(x<3?' rowspan="2"':'')+' style="border:1px solid black">'+img(LD.wondernames[2*x]+'.gif',LD.wondernames[2*x],LD.wondernames[2*x],'','',50,LD.wondernames[2*x])+'<br><i>'+lnk(LD.wondernames[2*x],LD.wondernames[2*x],LD.wondernames[2*x])+'</i></td><td id="cd_'+(2*(x+1)-1)+'" '+(x<3?' rowspan="2"':'')+' style="width:80px;border:1px solid black">'+BT(durs[2*x]*864e2)+'</td><td '+(x<3?' rowspan="2"':'')+'>'+img(LD.wondernames[2*x+1]+'.gif',LD.wondernames[2*x+1],LD.wondernames[2*x+1],'','',50,LD.wondernames[2*x+1])+'<br><i>'+lnk(LD.wondernames[2*x+1],LD.wondernames[2*x+1],LD.wondernames[2*x+1])+'</i></td><td id="cd_'+(2*(x+1))+'" '+(x<3?' rowspan="2"':'')+' style="width:80px;border:1px solid black">'+BT(durs[2*x+1]*864e2)+'</td><td style="border:1px solid black"'+(x<3?'':'')+'>'+(x<3?(2*(x+1)-1)+'<sup>'+(x==0?'η':(x==1?'η':'η'))+'</sup>':img('crown.png','Μορφή πολιτεύματος','Μορφή πολιτεύματος','','','','Μορφή πολιτεύματος'))+'</td>'+(x<3?r1+'<td style="border:1px solid black">'+(2*(x+1)+5)+'<sup>η</sup></td>'+r3:'<td colspan="8" style="border:1px solid black"><label for="gov_theo"><input id="gov_theo" name="gov" type="radio" value="80"> Θεοκρατία</label><br><label for="gov_rest"><input id="gov_rest" name="gov" type="radio" value="100" checked="checked"> Μορφή πολιτεύματος<br>εκτός Θεοκρατίας</label></td><td colspan="5" style="border:1px solid black"><input id="btnClear" type="button" value="Εκκαθάριση" onclick="ClearFaithTable()"><br><input id="btnCalc" type="Button" value="Υπολογισμός" onclick="CalcFaithTable()"></td>')+'</tr>'+(x<3?'<tr style="border:1px solid black"><td style="border:1px solid black">'+(2*(x+1))+'<sup>'+(x==0?'η':'η')+'</sup>'+'</td>'+(x<3?r2+'<td style="border:1px solid black">'+(2*(x+1)+6)+'<sup>η</sup></td>'+r4:'')+'</tr>':'')+'';
		}
		$('table#FaithCalc > tbody').append(tds);
		$('input#btnClear').on('click',function()
		{
			$('[id^="t_"][id$="_0"]').prop('checked',true);
			$('[id^="cd_"]').each(function(k,dr)
			{
				$(dr).html(BT(durs[(parseInt($(dr).attr('id').replace(/\D+/g,''))-1)]*864e2));
			});
			$('#gov_rest').prop('checked',true);
		});
		$('input#btnCalc').on('click',function()
		{
			var temple = 0;
			$('[id^="t_"]:checked').each(function(k,c)
			{
				temple += parseInt($(c).val());
			});
			temple = temple <= 5 ? 5 : temple;
			var gov = parseInt($('[id^="gov_"]:checked').val()!=undefined ? $('[id^="gov_"]:checked').val() : 100);
			$.each(durs,function(k,dr)
			{
				$('[id^="cd_"]:eq('+k+')').html(BT(4320*dr*gov/temple));
			});
		});
	}
}
function createTable(jsn)
{
	var rel = ['ξύλου','κρασιού','μαρμάρου','kρυστάλλου','Θείου'];
	if($.isEmptyObject(jsn)===true) { return false; }
	var resources = jsn.resources;
	var ps = $.isArray(jsn.range)?jsn.range:[1,jsn.hardcap];
	ps[0] = ps[0]<=0?(jsn.name=='Δημαρχείο'?0:1):ps[0];
	ps[1] = ps[1]>jsn.hardcap?jsn.hardcap:ps[1];
	ps = ps[0]>ps[1]?[ps[1],ps[0]]:ps;
	var r = resources.res;
	var c = resources.cols;
	var durs = resources.durs;
	var rst = ['b','w','m','c','s'];
	var rn = r.length+1; // Πλήθος πόρων
	var rt = '<th colspan="'+rn+'" class="ikariam-tooltip" data-tooltip="Η παρένθεση περιέχει την αθροιστική ποσότητα<br />για την ολοκλήρωση του κτηρίου από την<br />εγκατάστασή του μέχρι το συγκεκριμένο επίπεδο">'+lnk('Πόροι','Πόροι')+' για την κατασκευή</th>';
	var ri = '<th class="title6">'+icon(0)+'</th>';
	for(var i=0;i<rn-1;i++) { ri += '<th class="title6">'+icon(r[i])+'</th>'; }
	var lv = '<tr><th rowspan="2" style="width:6%">Επίπεδο<br />Κτηρίου</th>';
	var rest = '<th rowspan="2">'+img('Time_small.gif','Διάρκεια','Διάρκεια','image',20,20,'Διάρκεια')+' κατασκευής<br />(Αθροιστικά)</th><th rowspan="2">Ελάχιστο<br />'+img('Minimum.gif','Ελάχιστο επίπεδο αποθήκης','Ελάχιστο επίπεδο αποθήκης','image',20,20,'Αποθήκη')+'</th><th rowspan="2" class="ikariam-tooltip" data-tooltip="Βαθμολογία<br />Αρχιμαστόρων">'+lnk('Βαθμολογίες#Αρχιμάστορες','Βαθμολογία<br>Αρχιμαστόρων')+'<br />(Αθροιστικά)</th>';
	var wps = ['',''];
	switch(jsn.name)
	{
		case 'Ακαδημία':
			rest += '<th rowspan="2">Θέσεις<br>'+img('Scientist.gif','Μέγιστος αριθμός επιστημόνων','Επιστήμονας','image image-thumbnail',40,53,'Επιστήμονας')+'</th>';
			break;
		case 'Αλάνα':
			rest += '<th rowspan="2">Χωρητικότητα αποθήκευσης <cite name="storage">Όταν η ποσότητα ενός αποθηκευμένου πόρου φτάσει το <b>75 %</b> του μέγιστου επιτρεπτού, η ποσότητα εμφανίζεται με <font color="red">κόκκινο</font> χρώμα.<dl><dd>Όταν η ποσότητα φτάσει το <b>100 %</b>, η ποσότητα εμφανίζεται με <font color="red"><b>έντονο κόκκινο</b></font> χρώμα.</dd><dd>Οποιαδήποτε ποσότητα υπερβαίνει τη μέγιστη επιτρεπτή χάνεται.</dd></dl></cite></th>';
			break;
		case 'Αποθήκη':
			wps = ['<th colspan="2">Αποθήκευση</th>','<th class="title6" style="white-space:nowrap">Ασφαλής <cite name="protection">Για τους παλαιότερους παίκτες, που είχαν περισσότερες από 4 <b>αποθήκες</b>, πριν την εφαρμογή της '+lnk('Αναβάθμιση 0.4.0','Αναβάθμισης 0.4.0')+' υπήρχε η δυνατότητα να διατηρηθούν οι αποθήκες σας αλλά μόνο οι 4 μεγαλύτερες θα πρόσφεραν προστασία από '+lnk('λεηλασία','λεηλασία')+'.</cite></th><th class="title6" style="white-space:nowrap">Χωρητικότητα <cite name="storage">Όταν ένας αποθηκευμένος πόρος φτάνει το <b>75 %</b> του μέγιστο επιτρεπτού, η ποσότητα εμφανίζεσαι με <font color=red>κόκκινο</font> χρώμα.<dl><dd>Όταν ένας αποθηκευμένος πόρος φτάνει το <b>100 %</b> του μέγιστο επιτρεπτού, η ποσότητα εμφανίζεσαι με <font color=red><b>έντονο κόκκινο</b></font> χρώμα.</dd><dd>Οποιαδήποτε ποσότητα λαμβάνεται πέρα από τη μέγιστη επιτρεπτή, χάνεται.</dd><dd>Για την αύξηση του χώρου αποθήκευσης, αναβαθμίστε την Αποθήκη σας, κατασκευάστε μια άλλη Αποθήκη (μπορείτε μέχρι 4) ή κατασκευάστε μια '+lnk('Αλάνα','Αλάνα')+'.</dd><dd><dl><dd>Οι νέοι παίκτες περιορίζονται μόνο σε 4 Αποθήκες και μια '+lnk('Αλάνα','Αλάνα')+'.</dd><dd>Οι παλαιοί παίκτες που είχαν ήδη περισσότερες από 4 αποθήκες, μπορούν να τις διατηρήσουν αλλά μόνο οι 4 μεγαλύτερες αποθήκες θα προστατεύουν από '+lnk('λεηλασία','λεηλασία')+'</dd></dl></dd></dl></cite></th>'];
			break;
		case 'Αρχείο Ναυτικών Χαρτών':
			rest += '<th rowspan="2">Μείωση '+img('Time_small.gif','Διάρκεια','Διάρκειας','',20,20)+' Ταξιδιού / Απόσταση<br /> Οι χρόνοι είναι μόνο για το '+lnk('Μονάδα-πλοίο:Εμπορικό πλοίο',img('Cargo Ship.gif','εμπορικό πλοίο','εμπορικό πλοίο','',30,30),'εμπορικό πλοίο')+' / '+lnk('Μονάδα-πλοίο:Φοινικικό εμπορικό πλοίο',img('Phoenician transport l.png','Φοινικικό εμπορικό πλοίο','Φοινικικό εμπορικό πλοίο','',30,30),'Φοινικικό εμπορικό πλοίο')+' <cite name="building">Αυτοί οι χρόνοι μείωσης είναι μόνο για αυτό το κτήριο και δεν περιλαμβάνουν τυχόν άλλες μειώσεις από τον '+lnk('Ναός του Ποσειδώνα','Ναό του Ποσειδώνα')+', τις '+lnk('Μηχανές του Τρίτωνα','Μηχανές του Τρίτωνα')+', το πολίτευμα της '+lnk('Ολιγαρχία','Ολιγαρχίας')+' και την έρευνα '+lnk('Έρευνα:Βύθισμα','Βύθισμα')+' για τα εμπορικά πλοία.<br /><b>Σημείωση</b>: Ο εμφανιζόμενος χρόνος μπορεί να διαφέρει κατά 1 δευτερόλεπτο (συγκρινόμενος με τον χρόνο που εμφανίζεται στο παιχνίδι) λόγω της στρογγυλοποίησης των δευτερολέπτων όταν υπάρχουν δεκαδικές τιμές</cite><cite name="straight">Αυτοί οι χρόνοι είναι για ευθείες διαδρομές μόνο (κάθετες ή οριζόντιες), οι διαγώνιες διαδρομές ποικίλουν</cite><cite name="other">Τα '+lnk('Πλοίο','Πολεμικά πλοία')+' δεν εμφανίζονται γιατί είναι αρκετά, ωστόσο, θα έχουν μια μειωμένη διάρκεια ταξιδιού ως αποτέλεσματα αυτού του κτηρίου.</cite></th>';
			break;
		case 'Δημαρχείο':
			var forcolony = ['<table class="darktable zebra" style="text-align: center;"><caption> Μόνο για την Ίδρυση Νέας Αποικίας</caption><thead><tr><th colspan="5">Επίπεδο 0</th></tr><tr><th rowspan="2" style="width:6%;"> Επίπεδο<br>Κτηρίου</th><th colspan="3">'+lnk('Πόροι','Πόροι')+' για την κατασκευή</th><th rowspan="2">'+img('Time_small.gif','Διάρκεια','Διάρκειας','',20,20)+' Κατασκευής<br>(<b>Αθροιστικά</b>)</th></tr><tr class="title6"><td>'+icon(0)+'</td><td>'+icon(6)+'</td><td>'+icon(7)+'</td></tr></thead><tbody><tr style="background: lightsalmon;"><th>0</th><td>'+FrmtNumToStr(1250)+'</td><td>'+FrmtNumToStr(9000)+'</td><td>'+FrmtNumToStr(40)+'</td><td class="ikariam-tooltip" data-tooltip="Ο πραγματικός χρόνος κτισίματος<br>(χωρίς επιρροή από κάποιο πολίτευμα)<br>είναι: <b>'+BT(2400,1)+'<b>">'+BT(2400)+'</td></tr></tbody></table>','<caption>Κανονική ροή παιχνιδιού</caption>'];
			rest += '<th rowspan="2">'+img('GarLimLand.gif','Όριο Φρουράς','Όριο Φρουράς Ξηράς','image',30,33,'Όριο Φρουράς')+'<br>'+lnk('Όριο Φρουράς','Όριο Φρουράς')+'</th><th rowspan="2">'+lnk('Πολίτης','Μέγιστος Πληθυσμός')+' <cite name="population">Για πληροφορίες για τον πληθυσμό δείτε τον '+lnk('Πολίτης','Πολίτη')+'</cite></th><th rowspan="2">'+lnk('Δημαρχείο#Πόντοι δράσης','Πόντοι δράσης')+'</th>';
			break;
		case 'Ανταλλακτήριο':
			rest += '<th rowspan="2">Εμβέλεια<br><cite name="search range">Αυτή είναι η κανονική εμβέλεια χωρίς επίδραση από το '+lnk('πολίτευμα','πολίτευμα')+'.</cite></th><th rowspan="2">Χωρητικότητα<br><cite name="capacity">Χωρητικότητα = 400 &times; <code>Επίπεδο</code><sup>2</sup> <b>παράδειγμα</b>: επίπεδο 9 &rArr; 400 &times; <code>9</code><sup>2</sup> = 400 &times; 81 = 32.400</cite> <cite name="storage">Η χωρητικότητα <b>ΔΕΝ</b> προσθέτει χωρητικότητα στις '+lnk('Αποθήκη','Αποθήκες')+' σας. Ωστόσο, μειώνει την ποσότητα '+lnk('Πόροι','πόρων')+' που είναι διαθέσιμη σε αυτή την '+lnk('πόλη','πόλη')+'. (<b>Παράδειγμα</b>: Χωρητικότητα '+lnk('Αποθήκη','Αποθήκης')+' = 500 και έχετε ένα εμπορικό ανταλλακτήριο 1ου επιπέδου που μπορεί να έχει 400 μονάδες και γεμίζεται το ανταλλακτήριο πλήρως, τότε θα έχετε μόνο 100 μονάδες '+lnk('Πόροι','πόρων')+' διαθέσιμες στην '+lnk('πόλη','πόλη')+'.</cite> <cite name="pillage">Οι '+lnk('Πόροι','πόροι')+' στο Εμπορικό σας ανταλλακτήριο που υπερβαίνουν το μέγιστο επίπεδο προστασίας που έχουν οι '+lnk('Αποθήκη','Αποθήκες')+' σας είναι διαθέσιμοι για '+lnk('λεηλασία','λεηλασία')+'.</cite></th>';
			break;
		case 'Κρησφύγετο':
			rest += '<th rowspan="2">Θέσεις<br>'+img('Spy.png','Κατάσκοποι','Κατάσκοποι','',50,42,'el/wiki/Κατάσκοποι')+'</th><th rowspan="2">'+img('Time_small.gif','Διάρκεια','Διάρκεια','',20,20)+'<br>εκπαίδευσης<br>'+lnk('Κατάσκοποι','Κατασκόπων')+'</th>';
			break;
		case 'Κυβερνείο':
		case 'Παλάτι':
			rest += '<th rowspan="2">Μέγιστος<br>αριθμός<br>πόλεων<br><cite name="town">Ο συνολικός αριθμός πόλεων καθορίζεται από το επίπεδο του '+lnk('Παλάτι','Παλατιού')+' + 1.</cite> <cite name="corruption">Για να διατηρηθεί η '+lnk('διαφθορά','διαφθορά')+' στο <b>μηδέν</b>, το επίπεδο του '+lnk('Κυβερνείο','Κυβερνείου')+' σε κάθε αποικία πρέπει να είναι ίσο με τον αριθμό των αποικιών που έχετε. <b>Παράδειγμα</b>: Έχετε μια '+lnk('Πρωτεύουσα','Πρωτεύουσα')+' και 3 αποικίες, τότε το Κυβερνείο σας πρέπει να είναι 3<sup>ου</sup> επιπέδου για να διατηρηθεί η διαφθορά στο μηδέν.</cite></th>';
			break;
		case 'Εμπορευματικός λιμένας':
			rest += '<th rowspan="2">Θέσεις '+img('Freighter.png','Εμπορευματικό πλοίο','Εμπορευματικό πλοίο','',30,30)+'</th>';
			break;
		case 'Λιμένας':
			rest += '<th rowspan="2">'+img('GarLimSea.gif','Όριο Φρουράς','Όριο Φρουράς Θάλασσας','image',30,33,'Όριο Φρουράς')+'<br>'+lnk('Όριο Φρουράς','Όριο Φρουράς')+'</th><th rowspan="2">Ταχύτητα φόρτωσης / λεπτό<br>Με 1 '+img('Εμπορικός Λιμένας.png','Λιμένας','Λιμένας','image',20,14,'Λιμένας')+' ή 2 '+img('Εμπορικός Λιμένας.png','Λιμένες','Λιμένες','image',20,14,'Λιμένας')+'</th>';
			break;
		case 'Μαύρη Αγορά':
			rest += '<th rowspan="2">Ποσοστό<br>φόρου</th><th rowspan="2">Επιτρεπτές<br>μονάδες</th>';
			break;
		case 'Μουσείο':
			wps = ['<th colspan="3">Ωφέλειες Πολιστικής Συνθήκης <cite name="cultural">Οι ωφέλειες της Πολιτιστικής Συνθήκης θα αυξήσουν την '+lnk('ευτυχία','ευτυχία')+' της πόλης κατά:<br><b>20</b> πόντους  (<i>βάση</i>) για κάθε επίπεδο αναβάθμισης μουσείου.<br><b>50</b> πόντοι για κάθε <b>'+lnk('Συνθήκη#Πολιτιστική Συνθήκη','Συνθήκη')+'</b> που συνάπτετε στο μουσείο (μέγιστος αριθμός συνθηκών = επίπεδο μουσείου).<br><b>70</b> πόντοι ως το <b>μέγιστο</b> δυνατό για κάθε επίπεδο αναβάθμισης του μουσείου.</cite></th>','<th class="title6">Βάση</th><th class="title6">Μέγιστη<br>'+lnk('Συνθήκη#Πολιτιστική Συνθήκη','Συνθηκών','Πολιτιστική Συνθήκη')+'</th><th class="title6">Μέγιστη<br>Διαθέσιμη</th>'];
			break;
		case 'Ναός':
			rest += '<th rowspan="2">Μέγιστος<br>αριθμός<br>'+img('Priest.gif','Μέγιστος αριθμός ιερέων','Μέγιστος αριθμός ιερέων','image',26,40,'Ιερέας')+'</th>';
			break;
		case 'Ναυπηγείο':
			rest += '<th rowspan="2">'+img('GarLimSea.gif','Όριο Φρουράς','Όριο Φρουράς Θάλασσας','image',30,33,'Όριο Φρουράς')+'<br>'+lnk('Όριο Φρουράς','Όριο Φρουράς')+'</th><th rowspan="2">Ελάχιστο '+img('Minimum.gif','Ελάχιστο επίπεδο ναυπηγείου','Ελάχιστο επίπεδο ναυπηγείου','image',20,20,'Ναυπηγείο')+'<br>κατασκευής</th>';
			break;
		case 'Πειρατικό Φρούριο':
			rest += '<th rowspan="2">Εμβέλεια</th><th rowspan="2">Βασική<br>Δύναμη<br>πληρώματος</th>';
			$('#rewardscalc').html('<form><label for="rank"><input type="number" id="rank" name="rank" min="1" max="50" value="1" step="1" style="width:40px"></label></form><table id="rewardtable" class="darktable zebra" style="display:inline;color:#000;font-weight:normal;font-size:11px;background-color:transparent;border:0px;overflow:auto"><thead><tr><th colspan="10" style="text-align:center">Υλικά που μπορούν να ληφθούν με την πειρατεία<div style="font-weight:normal">(<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC"> × <span id="rank_v">2,75</span> = '+icon(0,13,10)+'+<img src="data:image/gif;base64,R0lGODlhGgAUAPZ9AA8KCScZFjY2FjslJFMzM0VAG3pIC0xzC15KNzNedXNIR2tWQnRgTXtoVYdUD5dlFaNyHIteK61+IolSUp5cXYFuW4VzYYh2Y415ZI58abRqasV4dlyJD2ibEHOtEnuPNHSlILeLLYWrN8qfNIfIFbuXXZOBbZmHdbGafMGWQdStQuG8Tc6sbd++YKHKT+3KU+/QbPXVY+zPefPWeEWGpV2TrE+Ut2ees2OrzmqszXqyzW2y1G+53ny20nK323a63Hu/4X/A4aCQgKqbi7mihbSnmIyoqZmuq5OytqWxpa2zpL+0pLu+q8qvidW4jNy+lMS7oMS5q7vHvePGi/XahejIl+XHnebInO/anv7kg9jEqNbKrM3Cs8LKvtPKvOzPpenRrfXlvYzA15TD2ITD4onH5o3J5pPK5JvN5ZXN6JbQ7qLQ5qTT667Z7bTa7Lrd7Lvh8s3QwcnUzc/YztvSxOXayenj2crg5s7p9tLr99bu+PXw6Pz37wAAAAAAAAAAACH5BAUAAH0ALAAAAAAaABQAAAf/gH2Cg3ZCKIOIfU4HHCBOiYhLdg0ZF02QHYwgLpCCWl51CxcNFZBEHIxEnWBeXEN2GA0NiU4EAQUHHR2QdEtFXnsNJhlPg04UAxMbAh0cHom9dkV7CycnJn1XA8kbEwAfzh0kglZ2UXVeXnYIGRXYVxrdAQEEJBwdHs9WdF4ZGSdR1jGoMMvJAAIEAGygkAvfLi+9KDGwQAcBAgYM+kwgoEyBggFONnAgsatTJydOFDwaRISECEhVXpQwSRMSFRgwSlQxuSVOzTAxwoSAEKHTER9l5pjkIwNLFhgPHjiYIojJGSlGyASpkQTSlykzZsQYkcLACgOCkKQx08MHkARyZhLxwTJjxIoXD1ZAkOBAkJI3QH6MoaFDDaK5VFqEqPtAxQoHDwbdYIMjjRs8QLoMwtIiRYgYKiQ8SPFCtCAoZ3LsgIMGTh4eg6pMqTLjRQoJLFjAUIFWkA0xevq0WdOmx52ayDsFAgA7" style="width:auto;height:10px">)</div></th></tr><tr><th style="text-align:center" title="Αύξων αριθμός πόλης">Πόλη</th><th style="text-align:center" title="Επιλέξτε τον αριθμό των πόλεων που έχετε">'+img('Δημαρχείο.png','','','image',15,15,'Δημαρχείο')+'</th><th style="text-align:center" title="Ορίστε το σύνολο των επιπέδων των αποθηκών σας">'+img('Αποθήκη Εμπορευμάτων.png','','','image',15,15,'Αποθήκη Εμπορευμάτων')+'</th><th style="text-align:center" title="Ασφαλής ποσότητα υλικών ανά πόλη"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC" style="width:auto;height:15px"></th><th style="text-align:center" title="Ασφαλής ποσότητα ξύλου ανά πόλη">'+icon(0,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα κρασιού ανά πόλη">'+icon(1,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα μαρμάρου ανά πόλη">'+icon(2,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα κρύσταλλου ανά πόλη">'+icon(3,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα θείου ανά πόλη">'+icon(4,20,15)+'</th><th style="text-align:center" title="Συνολική ασφαλής ποσότητα υλικών ανά πόλη">Σύνολο</th></tr></thead><tbody></tbody><tfoot><tr><th style="text-align:center;width:40px">Σύνολο</th><th id="townsum" style="text-align:center" title="Συνολικός αριθμός πόλεων">0</th><th id="levelsum" style="text-align:center" title="Συνολικός αριθμός επιπέδων αποθηκών">0</th><th id="safesum" style="text-align:center" title="Συνολική ασφαλής ποσότητα υλικών">0</th><th id="woodsum" style="text-align:center" title="Συνολική ποσότητα ξύλου">0</th><th id="winesum" style="text-align:center" title="Συνολική ποσότητα κρασιού">0</th><th id="marblesum" style="text-align:center" title="Συνολική ποσότητα μαρμάρου">0</th><th id="glasssum" style="text-align:center" title="Συνολική ποσότητα κρύσταλλου">0</th><th id="sulfursum" style="text-align:center" title="Συνολική ποσότητα θείου">0</th><th id="sum" style="text-align:center" title="Συνολική ποσότητα υλικών">0</th></tr></tfoot></table>');
			var res = ['wood','wine','marble','glass','sulfur'];
			var bd = '';
			for(var y=0;y<21;y++)
			{
				bd += '<tr style="opacity:0.5"><td>'+(y+1)+'</td><td style="text-align:center"><label for="town'+y+'"><input type="checkbox" id="town'+y+'" name="town'+y+'"></label></td><td><label for="level'+y+'"><input type="number" id="level'+y+'" name="level'+y+'" min="0" max="425" value="0" step="1" style="width:50px" disabled></label></td><td id="safe'+y+'" style="width:70px">0</td>';
				$.each(res,function(k,r)
				{
					bd += '<td id="'+r+y+'" style="width:70px">0</td>';
				});
				bd += '<td id="citysum'+y+'" style="width:70px">0</td></tr>';
			}
			$('#rewardtable tbody').append(bd);
			$('#rewardtable').find('th').css({'border':'1px solid black','text-align':'center','padding':'2px','font-weight':'bold'});
			$('#rewardtable').find('td').css({'border':'1px solid black','text-align':'center','padding':'2px'});
			$('#rewardtable').find('tr > td:nth-child(2)').css({'text-align':'left'});
			translate(lang);
			$('#rank,input[id^="town"],input[id^="level"]').on('change input',function()
			{
				$('#rank').parent().contents().first().each(function(){$(this).replaceWith('')});
				translate(lang);
			});
			break;
		case 'Πρεσβεία':
			rest += '<th rowspan="2">'+lnk('Συνθήκες','Πόντοι<br>Διπλωματίας','Πόντοι Διπλωματίας')+'<br><cite name="diplomacy">Οι '+lnk('Συνθήκες','Πόντοι Διπλωματίας','Πόντοι Διπλωματίας')+' που είναι διαθέσιμοι από <b>όλες</b> σας τις πρεσβείες αθροίζονται.<br /></cite></th>';
			break;
		case 'Στρατώνας':
			rest += '<th rowspan="2">Ελάχιστο '+img('Minimum.gif','Ελάχιστο επίπεδο Στρατώνων','Ελάχιστο επίπεδο Στρατώνων','image',20,20,'Στρατώνες')+'<br>κατασκευής</th>';
			break;
		case 'Ταβέρνα':
			rest += '<th rowspan="2">Μέγιστο '+icon(1)+'<br><small>για Προσφορά<br>(<b>Μέγιστη μείωση<br>από '+lnk('Αποστακτήριο','Αποστακτήριο','Αποστακτήριο')+'</b>)<small></th>';
			wps = ['<th colspan="3">Επιβράβευση '+lnk('Ευτυχία','Ευτυχίας','Ευτυχία')+'<cite name="happiness">Οι Ταβέρνες θα αυξήσουν την '+lnk('Ευτυχία','Ευτυχία')+' στην πόλη σας απλώς μέσω: <ol><li>της Κατασκευής μιας Ταβέρνας ή αυξάνοντας το επίπεδό της.</li><li>Προσφέροντας περισσότερο '+lnk('Κρασί','Κρασί')+'.</li></ol></cite></th>','<th class="title6">Βάση<br><cite name="base">Για κάθε επίπεδο της Ταβέρνας σας:<dd><dl>Η '+lnk('Ευτυχία','Ευτυχία')+' στην πόλη σας αυξάνεται κατά <b>12</b> πόντους.</dl></dd></cite></th><th class="title6">Μέγιστη<br>'+icon(1)+' <cite name="wine">Για κάθε επίπεδο που προσφέρετε την <b>ΜΕΓΙΣΤΗ</b> ποσότητα κρασιού '+icon(1)+':<dd><dl>Η '+lnk('Ευτυχία','Ευτυχία')+' στην πόλη σας αυξάνεται κατά <b>60</b> πόντους.</dl></dd></cite></th><th class="title6">Μέγιστη<br>Συνολική <cite name="max">Μια Ταβέρνα 1ου επιπέδου με πλήρη κατανάλωση δίνει συνολικά <b>72</b> πόντους '+lnk('Ευτυχία','Ευτυχίας','Ευτυχία')+'.<dd><dl>12 από το επίπεδο της Ταβέρνας (βάση).</dl><dl>60 από την μέγιστη προσφερόμενη ποσότητα κρασιού '+icon(1)+'.</dl></dd></cite></th>'];
			break;
		case 'Τείχος':
			rest += '<th rowspan="2">Ιδιότητες</th>';
			break;
		case 'Ξυλοκόπος':
		case 'Λιθουργείο':
		case 'Οινοποιείο':
		case 'Πύργος Αλχημιστή':
		case 'Υαλουργείο':
			wps = ['<th>Αύξηση παραγωγής</th>','<th class="title6">'+icon(jsn.name=='Λιθουργείο'?2:jsn.name=='Οινοποιείο'?1:jsn.name=='Πύργος Αλχημιστή'?4:jsn.name=='Υαλουργείο'?3:0)+'</th>'];
			break;
		case 'Αποστακτήριο':
		case 'Αρχιτεκτονικό γραφείο':
		case 'Ξυλουργός':
		case 'Οπτικός':
		case 'Περιοχή Δοκιμών Πυροτεχνημάτων':
			wps = ['<th>Μείωση παραγωγής</th>','<th class="title6">'+icon(jsn.name=='Αρχιτεκτονικό γραφείο'?2:jsn.name=='Αποστακτήριο'?1:jsn.name=='Περιοχή Δοκιμών Πυροτεχνημάτων'?4:jsn.name=='Οπτικός'?3:0)+'</th>'];
			break;
	}
	var t = (jsn.name=='Δημαρχείο'?forcolony[0]:'')+'<table class="darktable zebra" style="text-align:center;line-height:1.0;font-size:'+jsn.tsize+'%">'+(jsn.name=='Δημαρχείο'?forcolony[1]:'');
	var head = '<thead><tr><th colspan="'+c+'" class="title1">Επίπεδα '+ps[0]+' έως '+ps[1]+'</th></tr>'+lv+rt+rest+wps[0]+'</tr><tr>'+ri+wps[1]+'</tr></thead>';
	var foot = '<tfoot>'+lv+ri+rest+wps[1]+'</tr><tr>'+rt+wps[0]+'</tr></tfoot>';
	var body = '<tbody><tr></tr>';
	var accum = {};
	$.each(resources,function(rid,resource)
	{
		if(rst.indexOf(rid)!=-1)
		{
			accum[rid] = [];
			$.each(resource,function(id,rsr)
			{
				accum[rid][id] = id===0 ? rsr : (accum[rid][id-1]+rsr);
			});
		}
	});
	var excsum = 0;
	var cnt = 0;
	var cnt2 = 0;
	var hc = '';
	var unames = [['Λογχοφόρος','Εκτοξευτής','Τοξότης'],'Φλογοβόλο','Ξιφομάχος','Βαλλιστροφόρο','Μάγειρας','Σκάφος-Έμβολο','Καταπέλτης','Καταπελτοφόρο','Ιατρός','Βοηθητικό','Οπλίτης','Έμβολο Ατμού','Κανόνι','Πυραυλάκατος','Πυροβολητής θείου','Κωπήλατη τορπιλάκατος','Γυροκόπτερο',['Κανονιοφόρος','Σπαρτιάτης'],'Κριός','Βάρκα κατάδυσης','Γίγαντας Ατμού','Μεταφορικό αερόστατων','Βομβαρδιστικό αερόστατο'];
	var anames = ['Λογχοφόρος','Εκτοξευτής','Κριός','Οπλίτης','Μάγειρας','Ξιφομάχος','Τοξότης','Καταπέλτης','Ιατρός','Γυροκόπτερο','Βομβαρδιστικό αερόστατο','Γίγαντας Ατμού','Πυροβολητής θείου','Κανόνι'];
	var snames = ['Σκάφος-Έμβολο',['Βαλλιστροφόρο','Καταπελτοφόρο'],'Φλογοβόλο','Μεταφορικό αερόστατων','Βοηθητικό','Πυραυλάκατος','Κωπήλατη τορπιλάκατος','Έμβολο Ατμού','Κανονιοφόρος','Βάρκα κατάδυσης'];
	var sbtimes = [2400,[3000,3000],1800,4000,2400,3600,1800,2400,3000,3600];
	var ta = 0;
	for(var y=0;y<(ps[1]-ps[0]+1);y++)
	{
		var rl = [];
		var al = [];
		var tr = '<tr><th>'+(y+parseInt(ps[0]))+(jsn.name=='Εργαστήριο'&&y+parseInt(ps[0])>=28?'<cite name="level_28">Το 28<sup>o</sup> επίπεδο είναι το υψηλότερο επίπεδο του κτηρίου που είναι απαραίτητο να αναβαθμίσετε το Εργαστήριό σας για να είναι διαθέσιμες όλες οι βελτιώσεις. <u>Η επιπλέον αναβάθμιση δεν είναι απαραίτητη</u>!</cite>':'')+'</th>';
		for(var x=0;x<r.length+1;x++)
		{//<div class="ikariam-tooltip" data-tooltip=""></div>
			rl[x] = resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1];
			al[x] = accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1];
			tr += '<td>'+(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]>0?('<div class="ikariam-tooltip" data-tooltip="Καμία Έρευνα ή Μειωτικό Κτήριο<br />(<b>0 %</b> Μείωση)<br /><b>'+FrmtNumToStr(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+'</b> μονάδες '+rel[x===0?0:r[x-1]]+'<br>για την ολοκλήρωση του <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου">'+FrmtNumToStr(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+'</div><div class="ikariam-tooltip" data-tooltip="Καμία Έρευνα ή Μειωτικό Κτήριο<br />(<b>0 %</b> Μείωση)<br /><b>'+FrmtNumToStr(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+'</b> μονάδες '+rel[x===0?0:r[x-1]]+'<br>για την ολοκλήρωση <b>και</b> του <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου">('+FrmtNumToStr(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+')</div><table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><tbody><tr style="border:none !important;"><td style="border:none !important;color:blue" class="ikariam-tooltip" data-tooltip="'+resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'|Τ|'+(x===0?0:r[x-1])+'|'+accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'">Τ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Τροχαλία',FrmtNumToStr(Math.floor(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.98)),'Τροχαλία')+'<br>('+lnk('Τροχαλία',FrmtNumToStr(Math.floor(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.98)),'Τροχαλία')+')</td></tr><tr style="border:none !important;"><td style="border:none !important;color:green" class="ikariam-tooltip" data-tooltip="'+resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'|Γ|'+(x===0?0:r[x-1])+'|'+accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'">Γ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Γεωμετρία',FrmtNumToStr(Math.floor(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.94)),'Γεωμετρία')+'<br>('+lnk('Γεωμετρία',FrmtNumToStr(Math.floor(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.94)),'Γεωμετρία')+')</td></tr><tr style="border:none !important;"><td style="border:none !important;color:orange" class="ikariam-tooltip" data-tooltip="'+resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'|Α|'+(x===0?0:r[x-1])+'|'+accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]+'">Α</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Αλφάδι',FrmtNumToStr(Math.floor(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.86)),'Αλφάδι')+'<br>('+lnk('Αλφάδι',FrmtNumToStr(Math.floor(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.86)),'Αλφάδι')+')</td></tr><tr style="border:none !important;"><td style="border:none !important;color:red" class="ikariam-tooltip" data-tooltip="Μέγιστη μείωση (2 % + 4 % + 8 % + 50 % = 64 %)<br><b>'+FrmtNumToStr(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+' &times; 34 % = '+FrmtNumToStr(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.36,false,2)+' &asymp; '+FrmtNumToStr(Math.floor(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])*0.36)+'<br>('+FrmtNumToStr(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])+' &times; 36 % = '+FrmtNumToStr(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.36,false,2)+' &asymp; '+FrmtNumToStr(Math.floor(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1])*0.36)+')</b>">ΜΜ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Μέγιστη μείωση',FrmtNumToStr(Math.floor(resources[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.36)),'Μέγιστη μείωση')+'<br>('+lnk('Μέγιστη μείωση',FrmtNumToStr(Math.floor(accum[rst[x===0?0:r[x-1]]][y+parseInt(ps[0])-1]*0.36)),'Μέγιστη μείωση')+')</td></tr></tbody></table>'):'-')+'</td>';
		}
		var tt = 0;
		tt = bdur[jsn.name][y+parseInt(ps[0])-1];
		ta += bdur[jsn.name][y+parseInt(ps[0])-1];
//		switch(jsn.name)
//		{
//			case 'Πειρατικό Φρούριο':
//				tt = resources.t[y+parseInt(ps[0])-1];
//				ta += resources.t[y+parseInt(ps[0])-1];
//				break;
//			default:
//				excsum += (resources.t.e[y+parseInt(ps[0])-1]?resources.t.e[y+parseInt(ps[0])-1]:0);
//				tt = Math.round(resources.t.a*Math.pow(resources.t.c,y+parseInt(ps[0]))/resources.t.b-resources.t.d)+(resources.t.e[y+parseInt(ps[0])-1]?resources.t.e[y+parseInt(ps[0])-1]:0);
//				ta = Math.round(resources.t.a*resources.t.c*(Math.pow(resources.t.c,y+parseInt(ps[0]))-1)/(resources.t.b*(resources.t.c-1))-resources.t.d*(y+parseInt(ps[0])))+excsum;
//				break;
//		}
		var ambrosia = tt<=300?0:(Math.floor(tt/1800)*4+4);
		ambrosia = ambrosia>148?148:ambrosia;
		// resources.a[y+parseInt(ps[0])-1]
		tr += '<td style="font-size:70%;line-height:1.4em;white-space:nowrap'+(tt==0?';visibility:hidden':'')+'"><div style="color:gray;line-height:1em" class="ikariam-tooltip" data-tooltip="Ο εμφανιζόμενος χρόνος κτισίματος<br>(χωρίς επιρροή από το πολίτευμα)">ΕΜΦΑΝΙΖΟΜΕΝΗ<br>ΔΙΑΡΚΕΙΑ</div><div style="color:gray;line-height:1em" class="ikariam-tooltip" data-tooltip="Ο εμφανιζόμενος χρόνος κτισίματος<br>(χωρίς επιρροή από το πολίτευμα)<br><b>'+BT(tt,1,2)+'</b>">'+BT(tt,0,2)+'</div><hr><div class="ikariam-tooltip" data-tooltip="Ο πραγματικός χρόνος κτισίματος<br>(χωρίς επιρροή από το πολίτευμα)<br><b>'+BT(tt,1)+'</b>">'+BT(tt)+'</div><div class="ikariam-tooltip" data-tooltip="Ο αθροιστικός χρόνος κτισίματος<br />(χωρίς επιρροή από το πολίτευμα)<br><b>'+BT(ta,1)+'</b>">('+BT(ta)+')</div><div style="background:#FFDD99 !important">'+lnk('Μείωση Χρόνου Οικοδόμησης','ΜΧΟ','Η Μείωση Χρόνου Οικοδόμησης θα μειώσει<br>στο ½ τον πραγματικό χρόνο κτισίματος.<br>Ο νέος χρόνος κτισίματος θα είναι:<br><b>'+BT(tt/2,1)+'</b>')+' ή '+lnk('Άμεση Ολοκλήρωση','ΑΟ','Με την «Άμεση Ολοκλήρωση» ολοκληρώνεται<br>η κατασκευή του κτηρίου <b>αμέσως</b>')+': '+lnk('Αμβροσία',ambrosia+' '+img('Ambrosia.png',ambrosia+' Μονάδες Αμβροσίας με κάθε πάτημα!','Αμβροσία','image image-thumbnail',16,22,'Αμβροσία'),ambrosia+' Μονάδες Αμβροσίας με κάθε πάτημα!')+'<br>'+lnk('Μείωση Χρόνου Οικοδόμησης',BT(tt/2),'Η Μείωση Χρόνου Οικοδόμησης θα μειώσει<br>στο ½ τον πραγματικό χρόνο κτισίματος.<br>Ο νέος χρόνος κτισίματος θα είναι:<br><b>'+BT(tt/2,1)+'</b><br>Το 2<sup>ο</sup> πάτημα ή η Άμεση Ολοκλήρωση (ΑΟ)<br>ολοκληρώνει την κατασκευή αμέσως.')+'</div><div style="background:lightgreen">Με '+lnk('Αριστοκρατία','Αριστοκρατία','Αριστοκρατία')+'<br>'+lnk('Αριστοκρατία',BT(tt*0.8),'Ο χρόνος κτισίματος αφού<br>μειωθεί από την επίδραση της Αριστοκρατίας<br><b>'+BT(tt*0.8,1)+'</b>')+'</div><div style="background:lightpink">Με '+lnk('Ολιγαρχία','Ολιγαρχία','Ολιγαρχία')+'<br>'+lnk('Ολιγαρχία',BT(tt*1.2),'Ο χρόνος κτισίματος αφού<br>αυξηθεί από την επίδραση της Ολιγαρχίας<br><b>'+BT(tt*1.2,1)+'</b>')+'</div></td>';
		var wr = ['επίπεδα Αποθήκης','επίπεδο Αποθήκης'];
		var max = parseInt(Math.max.apply(Math,rl));
		var w0 = max*1.00-2500<0?0:Math.ceil((max*1.00-2500)/8000); // Επίπεδα για βασική ποσότητα χωρίς αμβροσία
		var w1 = max*0.98-2500<0?0:Math.ceil((max*0.98-2500)/8000); // Επίπεδα για ποσότητα Τροχαλίας χωρίς αμβροσία
		var w2 = max*0.94-2500<0?0:Math.ceil((max*0.94-2500)/8000); // Επίπεδα για ποσότητα Γεωμετρίας χωρίς αμβροσία
		var w3 = max*0.86-2500<0?0:Math.ceil((max*0.86-2500)/8000); // Επίπεδα για ποσότητα Αλφαδιού χωρίς αμβροσία
		var w4 = max*0.25-2500<0?0:Math.ceil((max*0.25-2500)/(wc[84]*5+dc[79]*3)); // Επίπεδα για μέγιστη μείωση χωρίς αμβροσία
		var w5 = max*0.50-2500<0?0:Math.ceil((max*0.50-2500)/8000); // Επίπεδα για βασική ποσότητα με αμβροσία
		var w6 = max*0.49-2500<0?0:Math.ceil((max*0.49-2500)/8000); // Επίπεδα για ποσότητα Τροχαλίας με αμβροσία
		var w7 = max*0.47-2500<0?0:Math.ceil((max*0.47-2500)/8000); // Επίπεδα για ποσότητα Γεωμετρίας με αμβροσία
		var w8 = max*0.43-2500<0?0:Math.ceil((max*0.43-2500)/8000); // Επίπεδα για ποσότητα Αλφαδιού με αμβροσία
		var w9 = max*0.125-2500<0?0:Math.ceil((max*0.125-2500)/(wc[84]*5+dc[79]*3)); // Επίπεδα για μέγιστη μείωση με αμβροσία
		tr += '<td><table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><tbody><tr style="border:none !important;"><td colspan="3" style="border:none !important;" class="ikariam-tooltip" data-tooltip="Χωρίς Έρευνες και χωρίς Αμβροσία<br>θα χρειαστείτε <b>'+FrmtNumToStr(w0)+'</b> '+wr[w0===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">'+FrmtNumToStr(w0)+'</td><td colspan="4" style="border:none !important;" class="ikariam-tooltip" data-tooltip="Χωρίς Έρευνες και με Αμβροσία<br>θα χρειαστείτε <b>'+FrmtNumToStr(w5)+'</b> '+wr[w5===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">'+FrmtNumToStr(w5)+'</td></tr><tr style="border:none !important;"><td style="border:none !important;color:blue" class="ikariam-tooltip" data-tooltip="Με την έρευνα της Τροχαλίας<br>θα χρειαστείτε <b>'+FrmtNumToStr(w1)+'</b> '+wr[w1===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Τ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Τροχαλία',parseInt(FrmtNumToStr(w1)),'Τροχαλία')+'</td><td style="border:none !important;">'+icon(5,9,12)+'</td><td style="border:none !important;color:blue" class="ikariam-tooltip" data-tooltip="Με την έρευνα της Τροχαλίας<br>θα χρειαστείτε <b>'+FrmtNumToStr(w6)+'</b> '+wr[w6===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Τ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Τροχαλία',parseInt(FrmtNumToStr(w6)),'Τροχαλία')+'</td></tr><tr style="border:none !important;"><td style="border:none !important;color:green" class="ikariam-tooltip" data-tooltip="Με την έρευνα της Γεωμετρίας<br>θα χρειαστείτε <b>'+FrmtNumToStr(w2)+'</b> '+wr[w2===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Γ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Γεωμετρία',FrmtNumToStr(w2),'Γεωμετρία')+'</td><td style="border:none !important;">'+icon(5,9,12)+'</td><td style="border:none !important;color:green" class="ikariam-tooltip" data-tooltip="Με την έρευνα της Γεωμετρίας<br>θα χρειαστείτε <b>'+FrmtNumToStr(w7)+'</b> '+wr[w7===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Γ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Γεωμετρία',FrmtNumToStr(w7),'Γεωμετρία')+'</td></tr><tr style="border:none !important;"><td style="border:none !important;color:orange" class="ikariam-tooltip" data-tooltip="Με την έρευνα του Αλφαδιού<br>θα χρειαστείτε <b>'+FrmtNumToStr(w3)+'</b> '+wr[w3===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Α</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Αλφάδι',FrmtNumToStr(w3),'Αλφάδι')+'</td><td style="border:none !important;">'+icon(5,9,12)+'</td><td style="border:none !important;color:orange" class="ikariam-tooltip" data-tooltip="Με την έρευνα του Αλφαδιού<br>θα χρειαστείτε <b>'+FrmtNumToStr(w8)+'</b> '+wr[w8===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">Α</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Αλφάδι',FrmtNumToStr(w8),'Αλφάδι')+'</td></tr><tr style="border:none !important;"><td style="border:none !important;color:red" class="ikariam-tooltip" data-tooltip="Με τη Μέγιστη Μείωση<br>θα χρειαστείτε <b>'+FrmtNumToStr(w4)+'</b> '+wr[w4===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">ΜΜ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Μέγιστη Μείωση',FrmtNumToStr(w4),'Μέγιστη Μείωση')+'</td><td style="border:none !important;">'+icon(5,9,12)+'</td><td style="border:none !important;color:red" class="ikariam-tooltip" data-tooltip="Με τη Μέγιστη Μείωση<br>θα χρειαστείτε <b>'+FrmtNumToStr(w9)+'</b> '+wr[w9===1?1:0]+'<br>Να θυμάστε ότι ένα επίπεδο Αλάνας<br>αντιστοιχεί σε 4 επίπεδα Αποθήκης">ΜΜ</td><td style="border:none !important;">:</td><td style="border:none !important;">'+lnk('Μέγιστη Μείωση',FrmtNumToStr(w9),'Μέγιστη Μείωση')+'</td></tr></tbody></table></td>';
		var s = 0;
		var as = 0;
		var pb = '';
		var pa = '';
		$.each(rl,function(k,s1)
		{
			pb += '<tr><td>'+icon(k===0?k:r[k-1],12,10)+'</td><td>'+FrmtNumToStr(this)+'</td><td>'+FrmtNumToStr(this/100,false,3)+'</td></tr>';
			s += this;
		});
		$.each(al,function(k,s2)
		{
			pa += '<tr><td>'+icon(k===0?k:r[k-1],12,10)+'</td><td>'+FrmtNumToStr(this)+'</td><td>'+FrmtNumToStr(this/100,false,3)+'</td></tr>';
			as += this;
		});
		tr += '<td>'+lnk('Οικοδόμοι',FrmtNumToStr(Math.floor(s/100)),'<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th colspan=&quot;2&quot;>Πόροι</th><th rowspan=&quot;2&quot;>Πόντοι</th></tr><tr><th>Είδος</th><th>Ποσότητα</th></tr></thead><tbody>'+pb.replace(/"/g,'&quot;')+'</tbody><tfoot><tr><th>Σ</th><th>'+FrmtNumToStr(s)+'</th><th>'+FrmtNumToStr(Math.floor(s/100),false,3)+'</th></tr></tfoot></table>')+'<div class="ikariam-tooltip" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th colspan=&quot;2&quot;>Πόροι</th><th rowspan=&quot;2&quot;>Πόντοι</th></tr><tr><th>Είδος</th><th>Ποσότητα</th></tr></thead><tbody>'+pa.replace(/"/g,'&quot;')+'</tbody><tfoot><tr><th>Σ</th><th>'+FrmtNumToStr(as)+'</th><th>'+FrmtNumToStr(Math.floor(as/100),false,3)+'</th></tr></tfoot></table>">('+FrmtNumToStr(Math.floor(as/100))+')</div></td>';
		switch(jsn.name)
		{
			case 'Ακαδημία':
				tr += '<td>'+FrmtNumToStr(resources.sci[y+parseInt(ps[0])-1])+'</td>';
				break;
			case 'Αλάνα':
				var txt = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th rowspan="3">'+img('Minimum.gif','','','',20,20)+'</th><th colspan="12">Αποθηκευτικός χώρος</th></tr><tr><th colspan="6">Χωρίς '+icon(5,9,12)+'</th><th colspan="6">Με '+icon(5,9,12)+'</th></tr><tr><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th></tr></thead><tbody>';
				for(var q=0;q<40;q++)
				{
					txt += '<tr><td>'+FrmtNumToStr(q+1)+'</td><td>'+FrmtNumToStr(2500)+'</td>';
					var na = '';
					var wa = '';
					for(var x=0;x<5;x++)
					{
						na += '<td>'+FrmtNumToStr(2500+(32000*(y+parseInt(ps[0]))+8000*x*(q+1)))+'</td>';
						wa += '<td>'+FrmtNumToStr((2500+(32000*(y+parseInt(ps[0]))+8000*x*(q+1)))*2)+'</td>';
					}
					txt += na+'<td>'+FrmtNumToStr(5000)+'</td>'+wa+'</tr>';
				}
				txt += '</tbody><tfoot><tr><th rowspan="3">'+img('Minimum.gif','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th></tr><tr><th colspan="6">Χωρίς '+icon(5,9,12)+'</th><th colspan="6">Με '+icon(5,9,12)+'</th></tr><tr><th colspan="12">Αποθηκευτικός χώρος</th></tr></tfoot></table>';
				//<div class="ikariam-tooltip" data-tooltip=""></div>
				tr += '<td style="vertical-align:bottom"><div class="ikariam-tooltip" data-tooltip="Η Αλάνα έχει διαθέσιμο αποθηκευτικό χώρο<br><b>'+FrmtNumToStr((y+parseInt(ps[0]))*32000)+'</b> μονάδες από μόνη της.<br>(Αυτό δεν περιλαμβάνει Αποθήκες)">'+FrmtNumToStr((y+parseInt(ps[0]))*32000)+'</div><div class="ikariam-tooltip" data-tooltip="Η Αλάνα έχει διαθέσιμο αποθηκευτικό χώρο<br><b>'+FrmtNumToStr((y+parseInt(ps[0]))*32000*2)+'</b> μονάδες με χρήση Αμβροσίας.<br>(Αυτό δεν περιλαμβάνει Αποθήκες)">'+FrmtNumToStr((y+parseInt(ps[0]))*32000*2)+' με '+icon(5,20,28)+'</div><br><div class="ikariam-tooltip" data-tooltip="Το Δημαρχείο προσθέτει <b>'+FrmtNumToStr(2500)+'</b> μονάδες χωρίς Αμβροσία<br>ή <b>'+FrmtNumToStr(2500*2)+'</b> μονάδες αν γίνει χρήση Αμβροσίας.">'+'+<b>'+FrmtNumToStr(2500)+'</b> λόγω '+lnk('Δημαρχείο','Δημαρχείου')+'<br>ή <b>'+FrmtNumToStr(2500*2)+'</b> με '+icon(5,20,28)+'</div><div class="ikariam-tooltip" style="background:#FDECB7;font-size:10px" data-tooltip="'+txt.replace(/"/g,'&quot;')+'">Περάστε το ποντίκι από εδώ αν έχετε '+lnk('Αποθήκη','Αποθήκες')+'</div></td>';
				break;
			case 'Αποθήκη':
				var txt = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th rowspan="3">'+img('Minimum.gif','','','',20,20)+'</th><th colspan="12">Αποθηκευτικός χώρος</th></tr><tr><th colspan="6">Χωρίς '+icon(5,9,12)+'</th><th colspan="6">Με '+icon(5,9,12)+'</th></tr><tr><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th></tr></thead><tbody>';
				for(var q=0;q<40;q++)
				{
					txt += '<tr><td>'+FrmtNumToStr(q+1)+'</td><td>'+FrmtNumToStr(2500)+'</td>';
					var na = '';
					var wa = '';
					for(var x=0;x<4;x++)
					{
						na += '<td>'+FrmtNumToStr(2500+(8000*(y+parseInt(ps[0]))*(x+1)))+'</td>';
						wa += '<td>'+FrmtNumToStr((2500+(8000*(y+parseInt(ps[0]))*(x+1)))*2)+'</td>';
					}
					txt += na+'<td>'+FrmtNumToStr(2500+(8000*(y+parseInt(ps[0])))*4+32000*(q+1))+'</td><td>'+FrmtNumToStr(5000)+'</td>'+wa+'<td>'+FrmtNumToStr((2500+(8000*(y+parseInt(ps[0])))*4+32000*(q+1))*2)+'</td></tr>';
				}
				txt += '</tbody><tfoot><tr><th rowspan="3">'+img('Minimum.gif','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>+1 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+2 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+3 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+4 '+img('Αποθήκη Εμπορευμάτων.png','','','',20,20)+'</th><th>+'+img('Αλάνα.png','','','',20,20)+'</th></tr><tr><th colspan="6">Χωρίς '+icon(5,9,12)+'</th><th colspan="6">Με '+icon(5,9,12)+'</th></tr><tr><th colspan="12">Αποθηκευτικός χώρος</th></tr></tfoot></table>';
				tr += '<td><div class="ikariam-tooltip" style="font-size:10px" data-tooltip="Για τους ΕΝΕΡΓΟΥΣ παίκτες, κάθε<br>μια από τις <b>4</b> Αποθήκες προστατεύει<br><b>'+FrmtNumToStr((y+parseInt(ps[0]))*8000*0.06)+'</b> μονάδες από κάθε πόρο και το<br>Δημαρχείο προσθέτει <b>'+FrmtNumToStr(2500*0.06)+'</b> για κάθε πόρο.">Ενεργός χρήστης<table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><tbody><tr><td style="border:none !important;">'+img('Αποθήκη.png','','','',20,20)+'</td><td style="border:none !important;">:</td><td style="border:none !important;white-space:nowrap">'+FrmtNumToStr((y+parseInt(ps[0]))*8000*0.06)+' '+icon(0,10,10)+'+'+img('Luxury.gif','','','',10,10)+'</td></tr><tr style="border:none !important;"><td style="border:none !important;">'+img('Δημαρχείο.png','','','',20,20)+'</td><td style="border:none !important;">:</td><td style="border:none !important;white-space:nowrap">'+FrmtNumToStr(2500*0.06)+' '+icon(0,10,10)+'+'+img('Luxury.gif','','','',10,10)+'</td></tr></table></div><hr><div class="ikariam-tooltip" style="font-size:10px" data-tooltip="Για τους ΑΝΕΝΕΡΓΟΥΣ παίκτες, κάθε<br>μια από τις <b>4</b> Αποθήκες προστατεύει<br><b>'+FrmtNumToStr((y+parseInt(ps[0]))*8000*0.01)+'</b> μονάδες από κάθε πόρο και το<br>Δημαρχείο προσθέτει <b>'+FrmtNumToStr(2500*0.01)+'</b> για κάθε πόρο.">'+lnk('Ανενεργός','Ανενεργός')+' χρήστης<table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><tr style="border:none !important;"><td style="border:none !important;">'+img('Αποθήκη.png','','','',20,20)+'</td><td style="border:none !important;">:</td><td style="border:none !important;white-space:nowrap">'+FrmtNumToStr((y+parseInt(ps[0]))*8000*0.01)+' '+icon(0,10,10)+'+'+img('Luxury.gif','','','',10,10)+'</td></tr><tr style="border:none !important"><td style="border:none !important;">'+img('Δημαρχείο.png','','','',20,20)+'</td><td style="border:none !important;">:</td><td style="border:none !important;white-space:nowrap">'+FrmtNumToStr(2500*0.01)+' '+icon(0,10,10)+'+'+img('Luxury.gif','','','',10,10)+'</td></tr></table></div></td><td style="vertical-align:bottom"><br><table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><tbody><tr style="border:none !important;"><tr><td rowspan="2" style="border:none !important;">'+img('Αποθήκη.png','','','',20,20)+'</td><td rowspan="2" style="border:none !important;">:</td><td style="border:none !important;" class="ikariam-tooltip" data-tooltip="Η Αποθήκη έχει χώρο για <b>'+FrmtNumToStr((y+parseInt(ps[0]))*8000)+'</b> μονάδες από μόνη της.<br>(Αυτό δεν περιλαμβάνει τη Αλάνα)">'+FrmtNumToStr((y+parseInt(ps[0]))*8000)+' χωρίς '+icon(5,9,12)+'</td></tr><tr style="border:none !important;"><td style="border:none !important;" class="ikariam-tooltip" data-tooltip="Η Αποθήκη έχει χώρο για <b>'+FrmtNumToStr((y+parseInt(ps[0]))*8000*2)+'</b> μονάδες<br>από μόνη της με χρήση Αμβροσίας.<br>(Αυτό δεν περιλαμβάνει τη Αλάνα)">'+FrmtNumToStr((y+parseInt(ps[0]))*8000*2)+' με '+icon(5,9,12)+'</td></tr><tr style="border:none !important;"><td rowspan="2" style="border:none !important;">'+img('Δημαρχείο.png','','','',20,20)+'</td><td rowspan="2" style="border:none !important;">:</td><td style="border:none !important;" class="ikariam-tooltip" data-tooltip="Το Δημαρχείο προσθέτει <b>'+FrmtNumToStr(2500)+'</b> μονάδες<br>στη συνολική χωρητικότητα">'+FrmtNumToStr(2500)+' χωρίς '+icon(5,9,12)+'</td></tr><tr style="border:none !important;"><td style="border:none !important;" class="ikariam-tooltip" data-tooltip="Το Δημαρχείο προσθέτει <b>'+FrmtNumToStr(2500*2)+'</b> μονάδες<br>στη συνολική χωρητικότητα με χρήση Αμβροσίας.">'+FrmtNumToStr(2500*2)+' με '+icon(5,9,12)+'</td></tr></table><br><br><div class="ikariam-tooltip" style="background:#FDECB7;font-size:10px" data-tooltip="'+txt.replace(/"/g,'&quot;')+'">Περάστε το ποντίκι από εδώ αν έχετε '+lnk('Αλάνα','Αλάνα')+'</div></td>';
				break;
			case 'Αρχείο Ναυτικών Χαρτών':
				tr += '<td><table class="darktable" style="border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td rowspan="2" style="border:none !important;">Απόσταση<br>(Νησιά)</td><td colspan="2" style="border:none !important;">Διάρκεια</td></tr><tr><td style="border:none !important;white-space:nowrap">Μείωση</td><td style="border:none !important;white-space:nowrap">Τελική</td></tr></thead><tbody><tr><td style="border:none !important;white-space:nowrap">5</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][0])+'</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][1])+'</td></tr><tr><td style="border:none !important;white-space:nowrap">20</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][2])+'</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][3])+'</td></tr><tr><td style="border:none !important;white-space:nowrap">50</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][4])+'</td><td style="border:none !important;white-space:nowrap">'+BT(durs[y+parseInt(ps[0])-1][5])+'</td></tr></tbody></table></td>';
				break;
			case 'Δημαρχείο':
				var txt = '';
				for(var z=0;z<16;z++)
				{
					txt += '<tr><td>'+(z+1)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+1))+'</td><td>'+(z+17)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+17))+'</td><td>'+(z+33)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+33))+'</td></tr>';
				}
				tr += '<td>'+lnk('Όριο Φρουράς',FrmtNumToStr(250+50*(y+parseInt(ps[0]))),('<u>Μαθηματικός τύπος</u><br><b><i>'+img('GarLimLand.gif','','','',20,22)+' = 250 + 50 &times; (Επίπεδο '+img('Δημαρχείο.png','','','',20,20)+' + Επίπεδο '+img('Τείχη της πόλης.png','','','',20,20)+')</i></b><br>Δημαρχείο <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου<br>Όριο Φρουράς χωρίς Τείχος: <b>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])))+'</b> μονάδες<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th>'+img('Τείχη της πόλης.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th><th>'+img('Τείχη της πόλης.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th><th>'+img('Τείχη της πόλης.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;'))+'</td><td>'+FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40)+'<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th></th><th class="ikariam-tooltip" data-tooltip="Κατασκευή Πηγαδιού:<br><b>+50</b> θέσεις στέγασης<br>μόνο στην πρωτεύουσα" style="color:blue">ΚΠ</th><th class="ikariam-tooltip" data-tooltip="Διακοπές:<br><b>+50</b> θέσεις στέγασης<br>σε όλες τις πόλεις"style="color:green">Δ</th><th class="ikariam-tooltip" data-tooltip="Ουτοπία:<br><b>+200</b> θέσεις στέγασης<br>μόνο στην πρωτεύουσα" style="color:orange">Ο</th></tr></thead><tbody><tr><th class="ikariam-tooltip" data-tooltip="Πρωτεύουσα">'+img('Παλάτι.png','','','',20,22,'/el/wiki/Πρωτεύουσα')+'</th><td>'+lnk('Έρευνα:Κατασκευή Πηγαδιού',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40+50),'Έρευνα:Κατασκευή Πηγαδιού')+'</td><td>'+lnk('Έρευνα:Διακοπές',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40+50+50),'Έρευνα:Διακοπές')+'</td><td>'+lnk('Έρευνα:Ουτοπία',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40+50+50+200),'Έρευνα:Ουτοπία')+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Αποικία">'+img('Η Κατοικία του Κυβερνήτη.png','','','',20,22,'/el/wiki/Αποικία')+'</th><td>'+lnk('Έρευνα:Κατασκευή Πηγαδιού',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40),'Έρευνα:Κατασκευή Πηγαδιού')+'</td><td>'+lnk('Έρευνα:Διακοπές',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40+50),'Έρευνα:Διακοπές')+'</td><td>'+lnk('Έρευνα:Ουτοπία',FrmtNumToStr(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40+50),'Έρευνα:Ουτοπία')+'</td></tr></tbody></table><div class="ikariam-tooltip" data-tooltip="'+(Math.floor(10*Math.pow(y+parseInt(ps[0]),1.5))*2+40)+'|ΟΜ|" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;color:red">ΟΜ: +20 σε κάθε πόλη</div></td>'+((y+parseInt(ps[0]))==1||(y+parseInt(ps[0]))%4==0?'<td rowspan="'+((y+parseInt(ps[0]))==1?3:4)+'">'+Math.floor((y+parseInt(ps[0]))/4+3)+'</td>':'');
				break;
			case 'Ανταλλακτήριο':
				tr += ((y+parseInt(ps[0]))%2==1?'<td rowspan="2">'+((y+parseInt(ps[0]))*0.5+0.5)+'</td>':'')+'<td>'+FrmtNumToStr(400*Math.pow(y+parseInt(ps[0]),2))+'</td>';
				break;
			case 'Κρησφύγετο':
				var txt = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th>Αριθμός<br>κατασκόπων</th><th>Συνολική διάρκεια<br>εκπαίδευσης</th>'+(y+parseInt(ps[0])>30?'<th>Αριθμός<br>κατασκόπων</th><th>Συνολική διάρκεια<br>εκπαίδευσης</th>':'')+'</tr></thead><tbody>';
				for(var z=0;z<(y+parseInt(ps[0])>30?Math.ceil((y+parseInt(ps[0]))/2):y+parseInt(ps[0]));z++)
				{
					txt += '<tr><td>'+(z+1)+'</td><td>'+BT((z+1)*Math.round(900.12*Math.exp(-0.0513*(y+parseInt(ps[0])))),1)+'</td>'+((y+parseInt(ps[0])>30&&z+1+Math.ceil((y+parseInt(ps[0]))/2)<=y+parseInt(ps[0]) ? '<td>'+(z+1+Math.ceil((y+parseInt(ps[0]))/2))+'</td><td>'+BT((z+1+Math.ceil((y+parseInt(ps[0]))/2))*Math.round(900.12*Math.exp(-0.0513*(y+parseInt(ps[0])))),1)+'</td>' : ''))+'</tr>';
				}
				txt += '</tbody></table>';
				tr += '<td>'+(y+parseInt(ps[0]))+'</td><td class="ikariam-tooltip" data-tooltip="'+txt.replace(/"/g,'&quot;')+'">'+BT(Math.round(900.12*Math.exp(-0.0513*(y+parseInt(ps[0])))))+'</td>';
				break;
			case 'Κυβερνείο':
			case 'Παλάτι':
				tr += '<td><div class="ikariam-tooltip" data-tooltip="1 Πρωτεύουσα και '+(y+parseInt(ps[0]))+' '+(y+parseInt(ps[0])==1?'Αποικία':'Αποικίες')+'"><b>'+(y+parseInt(ps[0])+1)+'</b></div><hr><span class="ikariam-tooltip" data-tooltip="1 Πρωτεύουσα και '+(y+parseInt(ps[0]))+' '+(y+parseInt(ps[0])==1?'Αποικία':'Αποικίες')+'">1</span> '+lnk('Πρωτεύουσα','Πρωτεύουσα')+'<br><span class="ikariam-tooltip" data-tooltip="1 Πρωτεύουσα και '+(y+parseInt(ps[0]))+' '+(y+parseInt(ps[0])==1?'Αποικία':'Αποικίες')+'">και</span><br><span class="ikariam-tooltip" data-tooltip="1 Πρωτεύουσα και '+(y+parseInt(ps[0]))+' '+(y+parseInt(ps[0])==1?'Αποικία':'Αποικίες')+'">'+(y+parseInt(ps[0]))+'</span> '+lnk('Αποικία',y+parseInt(ps[0])==1?'Αποικία':'Αποικίες')+'</td>';
				break;
			case 'Εμπορευματικός λιμένας':
				tr += '<td>'+FrmtNumToStr(y+parseInt(ps[0]))+'</td>';
				break;
			case 'Λιμένας':
				var txt = '';
				var port2 = '';
				for(var z=0;z<19;z++)
				{
					txt += '<tr><td>'+(z+1)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+1))+'</td><td>'+(z+20)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+20))+'</td></tr>';
					port2 += '<tr><td>'+(z+1)+'</td><td>'+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1]+resources.loadspeed[z])+'</td><td'+(z==18?' colspan="2"':'')+'>'+(z==18?'':z+20)+'</td>'+(z==18?'':'<td>'+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1]+resources.loadspeed[z+19])+'</td>')+'<td>'+(z+38)+'</td><td>'+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1]+resources.loadspeed[z+37])+'</td><td'+(z==18?' colspan="2"':'')+'>'+(z==18?'':z+57)+'</td>'+(z==18?'':'<td>'+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1]+resources.loadspeed[z+56])+'</td>')+'</tr>';
				}
				tr += '<td>'+lnk('Όριο Φρουράς',FrmtNumToStr(125+25*(y+parseInt(ps[0]))),y+parseInt(ps[0])<38?('<u>Μαθηματικός τύπος</u><br><b><i>'+img('GarLimSea.gif','','','',20,22)+' = 125 + 25 &times; Μεγιστο(Επίπεδο '+img('Εμπορικός Λιμένας.png','','','',20,14)+', Επίπεδο '+img('Ναυπηγείο.png','','','',20,14)+')</i></b><br>Λιμένας <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου<br>Όριο Φρουράς χωρίς Ναυπηγείο: <b>'+FrmtNumToStr(125+25*(y+parseInt(ps[0])))+'</b> μονάδες<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th>'+img('Ναυπηγείο.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Ναυπηγείο.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;'):'Το Ναυπηγείο δεν επηρεάζει<br>το Όριο Φρουράς πέρα από αυτό το επίπεδο.')+'</b></td><td><div class="ikariam-tooltip" data-tooltip="Ταχύτητα φόρτωσης:<br><b>'+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1])+'</b> μονάδες πόρων ανά λεπτό">1 '+img('Εμπορικός Λιμένας.png','','','',20,14)+': '+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1])+'</div><div class="ikariam-tooltip" data-tooltip="'+('<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th></tr></thead><tbody>'+port2+'</tbody></table>').replace(/"/g,'&quot;')+'">2 '+img('Εμπορικός Λιμένας.png','','','',20,14)+': '+FrmtNumToStr(resources.loadspeed[y+parseInt(ps[0])-1]+30)+'</div></td>';
				break;
			case 'Μαύρη Αγορά':
				var unit = '';
				if(y+parseInt(ps[0])==1 || y+parseInt(ps[0])==18)
				{
					for(var z=0;z<resources.units[y+parseInt(ps[0])-1].length;z++)
					{
						unit += lnk('Μονάδα-Πλοίο#'+(unames[y+parseInt(ps[0])-1][z]),'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/'+((y+parseInt(ps[0]))==18&&z==0?'Ships':'Units')+'_small.png);background-repeat:no-repeat;background-position:'+(-resources.units[y+parseInt(ps[0])-1][z])+'px -36px;"></span><br>'+(unames[y+parseInt(ps[0])-1][z]),(unames[y+parseInt(ps[0])-1][z]))+'<br>';
					}
				}
				else if(y+parseInt(ps[0])<=23)
				{
					unit += lnk('Μονάδα-Πλοίο#'+(unames[y+parseInt(ps[0])-1]),'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/'+((y+parseInt(ps[0]))%2==0?'Ships':'Units')+'_small.png);background-repeat:no-repeat;background-position:'+(-resources.units[y+parseInt(ps[0])-1])+'px -36px;"></span><br>'+(unames[y+parseInt(ps[0])-1]),(unames[y+parseInt(ps[0])-1]));
				}
				tr += '<td>'+(y+parseInt(ps[0])<24?29-y-parseInt(ps[0]):y+parseInt(ps[0])==24?4:y+parseInt(ps[0])==25?1:'')+' %</td><td>'+unit+'</td>';
				break;
			case 'Μουσείο':
				tr += '<td>'+FrmtNumToStr((y+parseInt(ps[0]))*20)+'</td><td>'+FrmtNumToStr((y+parseInt(ps[0]))*50)+'</td><td>'+FrmtNumToStr((y+parseInt(ps[0]))*70)+'</td>';
				break;
			case 'Ναός':
				tr += '<td>'+FrmtNumToStr(Math.round(5.994*Math.pow(y+parseInt(ps[0]),1.5003)+6.01)-(y+parseInt(ps[0])==38?1:0))+'</td>';
				break;
			case 'Ναυπηγείο':
				var txt = '';
				var ship = '';
				var i = (y+parseInt(ps[0])-1)/2;
				if((y+parseInt(ps[0]))%2==1&&(y+parseInt(ps[0]))!=5)
				{
					if(i==1)
					{
						ship = lnk('Μονάδα-Πλοίο#'+(snames[i][0]),'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/Ships_small.png);background-repeat:no-repeat;background-position:'+(-resources.ships[i][0])+'px -36px;"></span><br>'+(snames[i][0]),shipsTableTip(y+parseInt(ps[0]),sbtimes[i][0]))+'<br><br><hr><br>'+lnk('Μονάδα-Πλοίο#'+(snames[i][1]),'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/Ships_small.png);background-repeat:no-repeat;background-position:'+(-resources.ships[i][1])+'px -36px;"></span><br>'+(snames[i][1]),shipsTableTip(y+parseInt(ps[0]),sbtimes[i][1]));
					}
					else
					{
						ship = snames[i]!=undefined?lnk('Μονάδα-Πλοίο#'+(snames[i]),'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/Ships_small.png);background-repeat:no-repeat;background-position:'+(-resources.ships[i])+'px -36px;"></span><br>'+(snames[i]),shipsTableTip(y+parseInt(ps[0]),sbtimes[i])):'';
					}
				}
				else if((y+parseInt(ps[0]))==4)
				{
					ship = lnk('Μονάδα-Πλοίο#'+snames[2],'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/Ships_small.png);background-repeat:no-repeat;background-position:'+(-resources.ships[2])+'px -36px;"></span><br>'+snames[2],shipsTableTip(4,sbtimes[2]));
				}
				for(var z=0;z<12;z++)
				{
					txt += '<tr><td>'+(z+1)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+1))+'</td><td>'+(z+13)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+13))+'</td><td>'+(z+25)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+25))+'</td><td>'+(z+37)+'</td><td>'+FrmtNumToStr(125+25*Math.max(y+parseInt(ps[0]),z+37))+'</td></tr>';
				}
				tr += '<td>'+lnk('Όριο Φρουράς',FrmtNumToStr(125+25*(y+parseInt(ps[0]))),('<u>Μαθηματικός τύπος</u><br><b><i>'+img('GarLimSea.gif','','','',20,22)+' = 125 + 25 &times; Μεγιστο(Επίπεδο '+img('Εμπορικός Λιμένας.png','','','',20,14)+', Επίπεδο '+img('Ναυπηγείο.png','','','',20,14)+')</i></b><br>Ναυπηγείο <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου<br>Όριο Φρουράς χωρίς Λιμένα: <b>'+FrmtNumToStr(125+25*(y+parseInt(ps[0])))+'</b> μονάδες<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th><th>'+img('Εμπορικός Λιμένας.png','','','',20,14)+'</th><th>'+img('GarLimSea.gif','','','',20,22)+'</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;'))+'</b></td><td>'+ship+'</td>';
				break;
			case 'Πειρατικό Φρούριο':
				var txt = '';
				for(var rows=0;rows<30;rows++)
				{
					txt += '<tr style="font-weight:'+((rows+1)==(y+parseInt(ps[0]))?'bold;border:2px solid black':'normal')+'"><td>'+(rows+1)+'</td>';
					for(var cols=0;cols<12;cols++)
					{
						txt += '<td>'+(((rows+1)*(cols+1))*2)+'</td>';
					}
					txt += '</tr>';
				}
				tr += '<td>'+(y+parseInt(ps[0]))+'</td><td class="ikariam-tooltip" data-tooltip="'+('<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th rowspan="2">'+img('Minimum.gif','Ελάχιστο επίπεδο','Ελάχιστο επίπεδο','image',20,20,'Πειρατικό Φρούριο')+'<br>φρουρίου</th><th colspan="12">Πλήθος φρουρίων</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;')+'">'+((y+parseInt(ps[0]))*2)+'</td>';
				break;
			case 'Πρεσβεία':
				tr += '<td>'+((y+parseInt(ps[0]))+2)+'</td>';
				break;
			case 'Στρατώνας':
				tr += '<td>'+(anames[(y+parseInt(ps[0]))-1]!=undefined?lnk('Μονάδα-Πλοίο#'+anames[(y+parseInt(ps[0]))-1],'<span style="height:36px !important;width:36px !important;display:inline-block;background-image:url(https://ikariam.fandom.com/el/wiki/Special:Filepath/Units_small.png);background-repeat:no-repeat;background-position:'+(-resources.units[(y+parseInt(ps[0]))-1])+'px -36px;"></span><br>'+anames[(y+parseInt(ps[0]))-1],anames[(y+parseInt(ps[0]))-1]):'')+'</td>';
				break;
			case 'Ταβέρνα':
				var txt = '';
				var hd = '';
				for(var rows=0;rows<8;rows++)
				{
					txt += '<tr style="font-weight:bold;border:1px solid black;border-left:2px solid black">';
					for(var cols=0;cols<8;cols++)
					{
						hd += rows==0 && cols%2==0?'<th style="border-left:2px solid black">'+img('Minimum.gif','Επίπεδο Αποστακτηρίου','Επίπεδο Αποστακτηρίου','image',20,20,'Αποστακτήριο')+'</th><th style="border-right:2px solid black">'+icon(1,20,15)+'</th>':'';
						txt += '<td'+(cols%2==1?' style="border-right:2px solid black"':'')+'>'+FrmtNumToStr(cols%2==1 ? Math.round(resources.maxwine[(y+parseInt(ps[0]))-1]*(100-((4*cols-4)+rows+1))/100) : ((4*cols)+rows+1))+'</td>';
					}
					txt += '</tr>';
				}
				tr += '<td>'+FrmtNumToStr(resources.maxwine[(y+parseInt(ps[0]))-1])+'<br><div class="ikariam-tooltip" data-tooltip="'+('<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr style="border-top:2px solid black;border-bottom:2px solid black">'+hd+'</tr></thead><tbody>'+txt+'</tbody><tfoot><tr style="border-top:2px solid black;border-bottom:2px solid black">'+hd+'</tr></tfoot></table>').replace(/"/g,'&quot;')+'">(<b>'+FrmtNumToStr(Math.round(resources.maxwine[(y+parseInt(ps[0]))-1]*0.68))+'</b>)</div></td><td>'+FrmtNumToStr((y+parseInt(ps[0]))*12)+'</td><td>'+FrmtNumToStr((y+parseInt(ps[0]))*60)+'</td><td>'+FrmtNumToStr((y+parseInt(ps[0]))*(12+60))+'</td>';
				break;
			case 'Τείχος':
				var txt = '';
				for(var z=0;z<16;z++)
				{
					txt += '<tr><td>'+(z+1)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+1))+'</td><td>'+(z+17)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+17))+'</td><td>'+(z+33)+'</td><td>'+FrmtNumToStr(250+50*(y+parseInt(ps[0])+z+33))+'</td></tr>';
				}
				tr += '<td><table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto;white-space:nowrap"><tbody><tr><th style="text-align:left">'+img('GarLimLand.gif','Όριο Φρουράς','Όριο Φρουράς Ξηράς','image',20,22,'Όριο Φρουράς')+' '+lnk('Όριο Φρουράς','Όριο Φρουράς')+'</th><td>:</td><td>'+lnk('Όριο Φρουράς',FrmtNumToStr(300+50*(y+parseInt(ps[0]))),('<u>Μαθηματικός τύπος</u><br><b><i>'+img('GarLimLand.gif','','','',20,22)+' = 250 + 50 &times; (Επίπεδο '+img('Δημαρχείο.png','','','',20,20)+' + Επίπεδο '+img('Τείχη της πόλης.png','','','',20,20)+')</i></b><br>Τείχος <b>'+(y+parseInt(ps[0]))+'<sup>ου</sup></b> επιπέδου<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><thead><tr><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th><th>'+img('Δημαρχείο.png','','','',20,20)+'</th><th>'+img('GarLimLand.gif','','','',20,22)+'</th></tr></thead><tbody>'+txt+'</tbody></table>').replace(/"/g,'&quot;'))+'</td></tr><tr><th>'+img('Unit_attack.gif','Πόντοι χτυπήματος','Πόντοι χτυπήματος','image',22,18,'Πόντοι χτυπήματος')+' Πόντοι χτυπήματος</th><td>:</td><td>'+FrmtNumToStr(100+50*(y+parseInt(ps[0])))+'</td></tr><tr><th style="text-align:left">'+img('Unit_defend.gif','Θωράκιση','Θωράκιση','image',20,20,'Θωράκιση')+' Θωράκιση</th><td>:</td><td>'+FrmtNumToStr(4*(y+parseInt(ps[0])))+'</td></tr><tr><th>Οπλισμός</th><td>:</td><td>'+((y+parseInt(ps[0]))<10?'Βαλλίστρες':(y+parseInt(ps[0]))<20?'Καταπέλτες':'Βόμβες')+'</td></tr><tr><th style="text-align:left">'+img('Sword-icon1.gif','Ζημιά οπλισμού','Ζημιά οπλισμού','image',16,16,'Ζημιά οπλισμού')+' Ζημιά οπλισμού</th><td>:</td><td>'+((y+parseInt(ps[0]))<10?10+2*(y+parseInt(ps[0])):(y+parseInt(ps[0]))<20?30+5*(y+parseInt(ps[0])):50+10*(y+parseInt(ps[0])))+'</td></tr><tr><th style="text-align:left">'+img('Accuracy.gif','Ακρίβεια','Ακρίβεια','image',20,20,'Ακρίβεια')+' Ακρίβεια</th><td>:</td><td>'+((y+parseInt(ps[0]))<10?30:(y+parseInt(ps[0]))<20?50:80)+' %</td></tr></tbody></table></td>';
				break;
			case 'Ξυλοκόπος':
			case 'Λιθουργείο':
			case 'Οινοποιείο':
			case 'Πύργος Αλχημιστή':
			case 'Υαλουργείο':
				tr += '<td>+ '+((y+parseInt(ps[0]))*2)+' %</td>';
				break;
			case 'Αποστακτήριο':
			case 'Αρχιτεκτονικό γραφείο':
			case 'Ξυλουργός':
			case 'Οπτικός':
			case 'Περιοχή Δοκιμών Πυροτεχνημάτων':
				tr += '<td>- '+(y+parseInt(ps[0]))+' %</td>';
				break;
		}
		tr += '</tr>';
		if(jsn.name=='Ναός'&&y+parseInt(ps[0])==32)
		{
			tr += '<tr style="background:lightgreen"><td colspan="'+c+'"><br>Το 32<sup>ο</sup> Επίπεδο ήταν το '+lnk('Τελικό όριο','Τελικό όριο')+' <b>αρχικά</b> έως την <b>'+lnk('Ενημέρωση 0.7.0','Ενημέρωση 0.7.0')+'</b> που προστέθηκαν έξι (<b>6</b>) επιπλέον επίπεδα,<br>για να δημιουργηθεί ένα νέο Τελικό όριο στο <i>38<sup>ο</sup> Επίπεδο</i>! <br><br></td></tr>';
		}
		if(w4>1) { cnt++; hc = (cnt==1?'<tr><td colspan="'+(c-(jsn.name=='Δημαρχείο'?1:0))+'">'+hardcap(y+parseInt(ps[0])-1,1)+'</td></tr>':''); }
		if(w9>1) { cnt2++; hc = (cnt2==1?'<tr><td colspan="'+(c-(jsn.name=='Δημαρχείο'?1:0))+'">'+hardcap(y+parseInt(ps[0])-1,2)+'</td></tr>'+(jsn.name=='Δημαρχείο'?'<tr style="background:lightgreen"><td colspan="'+(c-(jsn.name=='Δημαρχείο'?1:0))+'">'+hardcap(y+parseInt(ps[0])-1,3)+'</td></tr>':''):''); }
		body += hc+tr;
	}
	body += ps[1]==resources.hardcap?'<tr><td colspan="'+c+'">'+hardcap(resources.hardcap)+'</td></tr>':'';
	body += '</tbody>';
	t += head+body+foot+'</table>';
	return t;
}
var createForestMineTable = function(jsn)
{
	var res = '';
	switch(jsn.name)
	{
		case 'Πριστήριο':
			res = 'forest';
			break;
		case 'Αμπελώνας':
		case 'Λατομείο':
		case 'Ορυχείο κρυστάλλου':
		case 'Ορυχείο θείου':
			res = 'mine';
			break;
	}
	var plus = {
		'Πριστήριο':['Το Ατμοκίνητο πριόνι δίνει<br /><b>20 %</b> περισσότερη παραγωγή.','Ατμοκίνητο πριόνι','ΑτμοκίνητοΠριόνι','Ξυλοκόπος','Ξυλοκόπος.png'],
		'Αμπελώνας':['Το Ατμοκίνητο Πιεστήριο κρασιού δίνει<br /><b>20 %</b> περισσότερη παραγωγή.','Ατμοκίνητο Πιεστήριο κρασιού','ΑτμοκίνητοΠιεστήριοΚρασιού','Οινοποιείο','Οινοποιείο.png'],
		'Λατομείο':['Το Ατμοκίνητο Σφυρί δίνει<br /><b>20 %</b> περισσότερη παραγωγή.','Ατμοκίνητο Σφυρί','ΑτμοκίνητοΣφυρί','Λιθουργείο','Λιθουργείο.png'],
		'Ορυχείο κρυστάλλου':['Το Ατμοκίνητο Τριπάνι κρύσταλλου δίνει<br /><b>20 %</b> περισσότερη παραγωγή.','Ατμοκίνητο Τριπάνι κρύσταλλου','ΑτμοκίνητοΤρυπάνιΚρύσταλλου','Πύργος Αλχημιστή','Πύργος_Αλχημιστή.png'],
		'Ορυχείο θείου':['Ο Ατμοκίνητος Τροχός Θείου με πτερύγια δίνει<br /><b>20 %</b> περισσότερη παραγωγή.','Ατμοκίνητος Τροχός Θείου με πτερύγια','ΑτμοκίνητοςΤροχόςΘείου','Υαλουργείο','Υαλουργείο.png']
	};
	var data = {
		forest: {wood:jsn.wood,workers:jsn.workers,wambro:jsn.wambro,time:7200},
		mine: {wood:jsn.wood,workers:jsn.workers,wambro:jsn.wambro,time:14400}
	};
	if(res!='')
	{
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).css({'width':jsn.tsize+'%','font-size':'100%'}).find('tbody').before('<thead></thead>').after('<tfoot></tfoot>');
		var rows = '';
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody > tr').each(function(k,row)
		{
			if(k<3)
			{
				if(k===0) { $(row).find('th').text('Επίπεδα '+jsn.range[0]+' έως '+jsn.range[1]); }
				$(row).detach().appendTo('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > thead');
			}
			else if(k>$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody > tr').length)
			{
				$(row).detach().appendTo('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > tfoot');
			}
		});
		var durs = [];
		for(var a=0;a<60;a++)
		{
			durs[a] = a>0 ? Math.round(data[res].time*Math.pow(1.1,a+1)-data[res].time) : 0;
		}
		var accwood = [];
		var accwrk = [];
		var accambro = [];
		var accdurs = [];
		data[res].wood.reduce(function(a,b,i) { return accwood[i] = a+b; },0);
		data[res].workers.reduce(function(a,b,i) { return accwrk[i] = a+b; },0);
		data[res].wambro.reduce(function(a,b,i) { return accambro[i] = a+b; },0);
		durs.reduce(function(a,b,i) { return accdurs[i] = a+b; },0);
		var coef = [0,0,20,10,20,20,10,20,30,40,30,30,40,30,50,50];
		var HH = ['',' με '+lnk('Χέρια Βοήθειας','Χέρια Βοήθειας','Χέρια Βοήθειας'),' με '+lnk('Χέρια Βοήθειας','Χέρια Βοήθειας','Χέρια Βοήθειας')+' και '+lnk('Τεχνοκρατία','Τεχνοκρατία','Τεχνοκρατία'),' με '+lnk('Χέρια Βοήθειας','Χέρια Βοήθειας','Χέρια Βοήθειας')+'<br> και '+lnk('Ξενοκρατία','Ξενοκρατία','Ξενοκρατία')+' από '+lnk('Τεχνοκρατία','Τεχνοκρατία','Τεχνοκρατία')];
		var HHv = [0,12.5,15,13.75];
		var dvtxt = [];
		for(var n=jsn.range[0]-1;n<jsn.range[1];n++)
		{
			dvtxt[0] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip" data-tooltip="Ο αριθμός των πόλεων<br/>που βρίσκεται στο νησί">Πόλεις</th><th class="ikariam-tooltip" data-tooltip="Ο επιμερισμός του κόστους<br/>ανά πόλη που βρίσκεται στο νησί">Κόστος</th></tr></thead><tbody>';
			dvtxt[1] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip" data-tooltip="Ο αριθμός των πόλεων<br/>που βρίσκεται στο νησί">Πόλεις</th><th class="ikariam-tooltip" data-tooltip="Ο επιμερισμός του αθροιστικού κόστους<br/>ανά πόλη που βρίσκεται στο νησί">Κόστος</th></tr></thead><tbody>';
			dvtxt[2] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+FrmtNumToStr(data[res].wambro[n])+' '+icon(0)+' για 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Ο αριθμός των πόλεων<br/>που βρίσκεται στο νησί">Πόλεις</th><th class="ikariam-tooltip" data-tooltip="Ο επιμερισμός του κόστους<br/>ανά πόλη που βρίσκεται στο νησί">Κόστος</th></tr></thead><tbody>';
			dvtxt[3] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><td class="title3" style="font-size: 110%; white-space: nowrap;" colspan="2">'+FrmtNumToStr(data[res].wambro[n])+' '+icon(0)+' για 1 '+icon(5,16,22)+'</td></tr><tr><th class="ikariam-tooltip" data-tooltip="Ο αριθμός των πόλεων<br/>που βρίσκεται στο νησί">Πόλεις</th><th class="ikariam-tooltip" data-tooltip="Ο επιμερισμός του αθροιστικού κόστους<br/>ανά πόλη που βρίσκεται στο νησί">Κόστος</th></tr></thead><tbody>';
			dvtxt[4] = '<table class="darktable zebra" style="text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto"><thead><tr><th class="ikariam-tooltip title3" rowspan="2" colspan="2" data-tooltip="Η μέγιστη βασική παραγωγή<br />χωρίς καμιά άλλη επίδραση">'+img('Πριστήριο.png','Πριστήριο','Πριστήριο','image',15,20,'Πριστήριο')+'</th><th class="title3">'+FrmtNumToStr(data[res].workers[n+1])+'</th><th class="ikariam-tooltip title3" colspan="16" data-tooltip="Όλοι οι δυνατοί συνδυασμοί<br />άθροισης των επιδράσεων">Συνδυασμοί</th></tr><tr><td>100 %</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Το Κινηματοθέατρο δίνει<br /><b>20 %</b> περισσότερη παραγωγή για <b>12</b> ώρες.">'+img('Θέατρο προβολών.gif','Θέατρο προβολών','Θέατρο προβολών','image',23,20,'Θέατρο προβολών')+'</th><td>20 %</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Ο Πύργος του Ήλιου δίνει<br /><b>10 %</b> περισσότερη παραγωγή<br />για το διάστημα που είναι ενεργοποιημένος.">'+img('Πύργος Ήλιου.png','Πύργος του Ήλιου','Πύργος του Ήλιου','image',11,20,'Πύργος του Ήλιου')+'</th><td>10 %</td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="'+plus[jsn.name][0]+'">'+img(plus[jsn.name][2]+'34px.png',plus[jsn.name][1],plus[jsn.name][1],'image',20,20,plus[jsn.name][1])+'</th><td>20 %</td><td></td><td></td><td></td><td></td><td>+</td><td></td><td></td><td>+</td><td></td><td>+</td><td>+</td><td></td><td>+</td><td>+</td><td>+</td><td>+</td></tr><tr><th class="ikariam-tooltip title3" colspan="2" data-tooltip="Το κτήριο <b>'+plus[jsn.name][3]+'</b> δίνει<br />έως <b>64 %</b> περισσότερη παραγωγή.">'+img(plus[jsn.name][4],plus[jsn.name][3],plus[jsn.name][3],'image',25,20,plus[jsn.name][3])+'</th><td></td><td></td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td></td><td></td><td>+</td><td>+</td><td>+</td><td></td><td>+</td></tr></thead><tbody><tr><th class="title3" rowspan="63">Ε<br>π<br>ί<br>π<br>ε<br>δ<br>α<br> <br>Α<br>υ<br>ξ<br>η<br>τ<br>ι<br>κ<br>ο<br>ύ<br> <br>Κ<br>τ<br>η<br>ρ<br>ί<br>ο<br>υ</th><td class="ikariam-tooltip title3" data-tooltip="Το επίπεδο του κτηρίου <b>Ξυλοκόπος</b>.">Επίπεδο</td><td class="ikariam-tooltip title3" data-tooltip="Το ποσοστό αύξησης της παραγωγής που προκαλεί<br />κάθε επίπεδο του κτηρίου <b>Ξυλοκόπος</b>.">(%)</td><td class="ikariam-tooltip title3" colspan="16" data-tooltip="Η τελική παραγωγή που προκύπτει<br />από τους αντίστοιχους συνδυασμούς.">Παραγωγή{0}</td></tr>';
			for(var i=0;i<17;i++)
			{
				dvtxt[0] += '<tr class="ikariam-tooltip" data-tooltip="Με <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου'+(i==16?', με τη χρήση Αμβροσίας':'')+', απαιτούνται από κάθε παίκτη:<br/><b>'+FrmtNumToStr(data[res].wood[n])+'</b> μονάδες ξύλου ÷ <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου = <b>'+FrmtNumToStr(Math.ceil(data[res].wood[n]/(i+1)))+'</b> μονάδες ξύλου."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(data[res].wood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[1] += '<tr class="ikariam-tooltip" data-tooltip="Με <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου'+(i==16?', με τη χρήση Αμβροσίας':'')+', απαιτούνται από κάθε παίκτη:<br/><b>'+FrmtNumToStr(accwood[n])+'</b> μονάδες ξύλου ÷ <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου = <b>'+FrmtNumToStr(Math.ceil(accwood[n]/(i+1)))+'</b> μονάδες ξύλου."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(accwood[n]/(i+1)))+' '+icon(0)+'</td></tr>';
				dvtxt[2] += '<tr class="ikariam-tooltip" data-tooltip="Με <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου'+(i==16?', με τη χρήση Αμβροσίας':'')+', απαιτούνται από κάθε παίκτη:<br/><b>'+FrmtNumToStr(data[res].wambro[n])+'</b> μονάδες ξύλου ÷ <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου = <b>'+FrmtNumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+'</b> μονάδες ξύλου."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(data[res].wambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
				dvtxt[3] += '<tr class="ikariam-tooltip" data-tooltip="Με <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου'+(i==16?', με τη χρήση Αμβροσίας':'')+', απαιτούνται από κάθε παίκτη:<br/><b>'+FrmtNumToStr(accambro[n])+'</b> μονάδες ξύλου ÷ <b>'+(i+1)+'</b> '+(i+1==1?'πόλη':'πόλεις')+' επί της νήσου = <b>'+FrmtNumToStr(Math.ceil(accambro[n]/(i+1)))+'</b> μονάδες ξύλου."><td>'+(i==16?' '+icon(5,16,22):'')+(i+1)+'</td><td>'+FrmtNumToStr(Math.ceil(accambro[n]/(i+1)))+' '+icon(5,16,22)+'</td></tr>';
			}
			dvtxt[0] += '</tbody></table>';
			dvtxt[1] += '</tbody></table>';
			dvtxt[2] += '</tbody></table>';
			dvtxt[3] += '</tbody></table>';
			for(var q=0;q<4;q++)
			{
				dvtxt[q+5] = prntf(dvtxt[4],[HH[q]]);
				for(var y=0;y<62;y++)
				{
					dvtxt[q+5] += '<tr>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'Το κτήριο <b>Ξυλοκόπος</b> δεν έχει κατασκευαστεί.' : 'Το <b>'+y+'</b>ο επίπεδο του κτηρίου <b>Ξυλοκόπος</b>.')+'">'+y+'</td>';
					dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="'+(y==0 ? 'Το κτήριο <b>Ξυλοκόπος</b> δεν αυξάνει την παραγωγή<br />επειδή δεν έχει κατασκευαστεί.' : 'Το κτήριο <b>Ξυλοκόπος</b><br>αυξάνει την παραγωγή<br />κατά <b>'+(y*2)+' %.')+'">'+(y*2)+'</b> %</td>';
					for(var x=0;x<16;x++)
					{
						dvtxt[q+5] += '<td class="ikariam-tooltip" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:#ffeecc;font-size:12px;color:#585858;font-weight:100;text-shadow:none;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=&quot;3&quot;>Επίδραση</th></tr><tr><th>Είδος</th><th>Ποσοστό</th><th>Παραγωγή</th></tr><tr><td style=&quot;text-align:left&quot;>Βασική</td><td>100 %</td><td>'+FrmtNumToStr(data[res].workers[n+1])+'</td></tr>'+([2,5,8,9,11,12,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Κινηματοθέατρο</td><td>20 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([3,6,8,10,11,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>Πύργος του Ήλιου</td><td>10 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*10/100)+'</td></tr>' : '')+([4,7,9,10,12,13,14,15].indexOf(x)!=-1 ? '<tr><td style=&quot;text-align:left&quot;>'+plus[jsn.name][1]+'</td><td>20 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*20/100)+'</td></tr>' : '')+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 && y>0 ? '<tr><td style=&quot;text-align:left&quot;>Ξυλοκόπος</td><td>'+FrmtNumToStr(y*2)+' %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*y*2/100)+'</td></tr>' : '')+(HHv[q]!=0 ? '<tr><td style=&quot;text-align:left&quot;>Χέρια Βοήθειας</td><td>12,5 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*12.5/100)+'</td></tr>' : '')+(HHv[q]==15 ? '<tr><td style=&quot;text-align:left&quot;>Τεχνοκρατία</td><td>2,5 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*2.5/100)+'</td></tr>' : '')+(HHv[q]==13.75 ? '<tr><td style=&quot;text-align:left&quot;>Ξενοκρατία</td><td>1,25 %</td><td>'+FrmtNumToStr(data[res].workers[n+1]*1.25/100)+'</td></tr>' : '')+(coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]>0 ? '<tr><th>Σύνολο</th><th>'+FrmtNumToStr((100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q]))+' %</th><th>'+FrmtNumToStr(data[res].workers[n+1]*(100+coef[x]+([1,5,6,7,11,12,13,15].indexOf(x)!=-1 ? y*2 : 0)+HHv[q])/100)+'</th></tr>' : '')+'</table>">'+FrmtNumToStr(data[res].workers[n+1]*(100+coef[x]+(y*2)+HHv[q])/100)+'</td>';
					}
					dvtxt[q+5] += '</tr>';
				}
				dvtxt[q+5] += '</tbody></table>';
			}
			rows += '<tr><th>'+(n+1)+'</th><td>'+(n===0?'<span style="color:gray;">-</span>':'<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><td'+(data[res].wood[n] === 0 ? '' : ' colspan="2"')+'>'+icon(0)+'</td><td'+(data[res].wambro[n] === 0 ? '' : ' colspan="2"')+'>'+icon(5,16,22)+'</td></tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχει κόστος αγοράς για αυτό το επίπεδο!">'+FrmtNumToStr(data[res].wood[n]) : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχουν δεδομένα κόστους δωρεάς σε ξύλο!">'+FrmtNumToStr(data[res].wood[n]) : '">'+FrmtNumToStr(data[res].wood[n])))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[0]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχει δυνατότητα αγοράς ξύλου με Αμβροσία!">'+FrmtNumToStr(data[res].wambro[n]) : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχουν δεδομένα κόστους Αμβροσίας!">'+FrmtNumToStr(data[res].wambro[n]) : '">'+FrmtNumToStr(data[res].wambro[n])))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[2]+'</div></td>')+'</tr><tr><td class="'+(data[res].wood[n] === 0 && accwood === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχει κόστος αγοράς για αυτό το επίπεδο!">('+FrmtNumToStr(accwood[n])+')' : (data[res].wood[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχουν δεδομένα κόστους δωρεάς σε ξύλο!">('+(data[res].wood[n] === 0 ? 0 : FrmtNumToStr(accwood[n]))+')' : '">('+FrmtNumToStr(accwood[n])+')'))+'</td>'+(data[res].wood[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[1]+'</div></td>')+'<td class="'+(data[res].wambro[n] === 0 && accambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχει δυνατότητα αγοράς ξύλου με Αμβροσία!">('+(data[res].wambro[n] === 0 ? 0 : FrmtNumToStr(accambro[n]))+')' : (data[res].wambro[n] === 0 ? 'ikariam-tooltip" data-tooltip="Δεν υπάρχουν δεδομένα κόστους Αμβροσίας!">('+(data[res].wambro[n] === 0 ? 0 : FrmtNumToStr(accambro[n]))+')' : '">('+FrmtNumToStr(accambro[n])+')'))+'</td>'+(data[res].wambro[n] === 0 ? '' : '<td class="expandcollapsetable"><span class="indicator"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[3]+'</div></td>')+'</tr></table>')+'</td><td style="white-space:nowrap">'+(n===0?'<span style="color:gray;">-</span>':'<span class="ikariam-tooltip" data-tooltip="Ο πραγματικός χρόνος κτισίματος<br />(το πολίτευμα δεν έχει επιρροή)<br /><b>'+BT(durs[n],1)+'</b>">'+BT(durs[n])+'</span><br>(<span class="ikariam-tooltip" data-tooltip="Ο αθροιστικός χρόνος κτισίματος<br />(το πολίτευμα δεν έχει επιρροή)<br /><b>'+BT(accdurs[n],1)+'</b>">'+BT(accdurs[n])+'</span>)')+'</td><td style="white-space:nowrap"><div class="expandcollapsetable">'+FrmtNumToStr(data[res].workers[n+1])+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[5]+'</div></div><div class="expandcollapsetable">('+FrmtNumToStr(data[res].workers[n+1]*1.125)+')<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[6]+'</div></div><div class="expandcollapsetable">Με '+lnk('Τεχνοκρατία','Τεχνοκρατία','Τεχνοκρατία')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[7]+'</div></div><div class="expandcollapsetable">Με '+lnk('Ξενοκρατία','Ξενοκρατία','Ξενοκρατία')+'<span class="indicator" style="float:right"></span><div class="info-div" style="display:none;text-align:center;overflow:visible;background-color:transparent;border:0px;position:absolute;z-index:600">'+dvtxt[8]+'</div></div></td><td><div class="ikariam-tooltip" style="display:inline-block;margin:auto;text-align:right" data-tooltip="<table class=&quot;darktable zebra&quot; style=&quot;text-align:center;line-height:1.0;border:none !important;background:transparent;font-size:10px;padding:0px;border-collapse:collapse;margin-left:auto;margin-right:auto&quot;><tr><th colspan=2>Εργάτες</th></tr><tr><th>Είδος</th><th>Ποσότητα</th></tr><tr><td style=text-align:left>Ειδικευμένοι</td><td style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1])+'</td></tr><tr><td style=text-align:left>Ανειδίκευτοι</td><td style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1]/2)+'</td></tr><tr><th>Σύνολο</th><th style=text-align:right>'+FrmtNumToStr(data[res].workers[n+1]*3/2)+'</th></tr></table>">'+FrmtNumToStr(data[res].workers[n+1])+'<br>'+FrmtNumToStr(data[res].workers[n+1]/2)+'<hr>'+FrmtNumToStr(data[res].workers[n+1]*3/2)+'</div></td></tr>';
		}
		$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).find('tbody').append(rows);
	}
}
var lang = 'el';
var lg = {
	el: {
		flag: 'R0lGODlhGgASAPcAAAR6rIS+1HyerEyGnMzi7LTW5GSuzGSWrCSKtOTy9LS+xGyKlJyyvAyCtFyOpHS21DSWvPT6/JzK3FSmzFSKpOTu9LTa7HSarCSOvOz2/MTGzAR+rIS+3HyirFSGnMzm7LTa5GSyzGyWrCSOtHSKlKS2vBSCtHy61PT2/MTKzAAAgAAAfDQc5OHj4xISEgAAAGcIawDj9AASgAAAfFQ0OOKHABLRAAB3ABiiYe4JbZEFAXwAAHBFAAUJAJKSAHx8AP9O+P8JAf+SAP98AG1cvQXm/JISc3wAABUkAAoAAIICAHwAAABIYQDkbRYSAQAAAGACAAMAAAAAAAAAAMgg/xbj/xsS/wAA/7gA/2Pg/xb9/wB/fwAFAQAQAACRAAB8AH7wAADiAAASAMAAAAAA9AAAAQAAAAAAAP/AmP/jAf8SAP8AAP8YCf/uAP+RAP98AABwFAAJAACSAAB8AADAvwDk/ACYcwB8AABvAAA+ABaSAAB8AMliEjk+nwCSgAB8fGQI+OIC9hIAGAAAAC/cAA7mAIISAHwAANsABwUAAIIAAHwAAMBOAHYAAFAAAAAAALgAAGMA8AEAGAAAAGwQAAAAAAAAAAAAAKDJAOE5ABIAAAAAADR8AADjAAASAMAAAJyDAPcqABKCAAB8ABgAGO4An5EAgHwAfHAA/wUA/5IA/3wA//8AEv8An/8AgP8AfG0AJQUBAJIAAHwAAErnJfYqAICCAHx8AACgAADj8BYSEgAAAADC/wAq/wCC/wB8/7gAAGMAABYAAAAAAAD4qAH25AAYEgAAAAC+vgA+OwCCTAB8AFf/iPb/5ID/Enz/AIykd+PkEBISTwAAALj3vGM+5BaCEgB8AAEMvgAUPgBPggAAfMDUUeIy5RJPEgAAAEYA2YoB/wEA/wAAfwWgLADj5QASEgAAAPAA+OEB9hIAGAAAAAMWvgA/PgCCggB8fNgB+OIA9hIAGAAAABgAye4wOZEAAHwAAHAAAAUAAJIAAHwAAP+I6f/kzv8SR/8AACwAAAAAGgASAAAITACvCLwSIcLAgwgTJiyosKFDhgMLSpxIEaJAiwQratw40aFCjgY9Pgx5ESTFgxhNnoxIUqRHjC5RqpxJU2XMmzhf1tzJU2LOn0CvBAQAOw==',
		tho: '.',
		dec: ',',
		rnklbl: 'Επιλέξτε τη θέση που έχετε στην τρέχουσα κατάταξη πειρατείας',
		rcvdres: 'Υλικά που μπορούν να ληφθούν με την πειρατεία',
		city: 'Πόλη',
		citytitle: 'Αύξων αριθμός πόλης',
		citynum: 'Επιλέξτε τον αριθμό των πόλεων που έχετε',
		wlvls: 'Ορίστε το σύνολο των επιπέδων των αποθηκών σας',
		safeqnty: 'Ασφαλής ποσότητα υλικών ανά πόλη',
		safewoodqnty: 'Ασφαλής ποσότητα ξύλου ανά πόλη',
		safewineqnty: 'Ασφαλής ποσότητα κρασιού ανά πόλη',
		safemarbleqnty: 'Ασφαλής ποσότητα μαρμάρου ανά πόλη',
		safecrystalqnty: 'Ασφαλής ποσότητα κρύσταλλου ανά πόλη',
		safesulfurqnty: 'Ασφαλής ποσότητα θείου ανά πόλη',
		safesumqnty: 'Συνολική ασφαλής ποσότητα υλικών ανά πόλη',
		sum: 'Σύνολο',
		townsum: 'Συνολικός αριθμός πόλεων',
		levelsum: 'Συνολικός αριθμός επιπέδων αποθηκών',
		safesum: 'Συνολική ασφαλής ποσότητα υλικών',
		woodsum: 'Συνολική ποσότητα ξύλου',
		winesum: 'Συνολική ποσότητα κρασιού',
		marblesum: 'Συνολική ποσότητα μαρμάρου',
		glasssum: 'Συνολική ποσότητα κρύσταλλου',
		sulfursum: 'Συνολική ποσότητα θείου',
		resqntysum: 'Συνολική ποσότητα υλικών',
	}
};
$(document).ready(function()
{
	var createtableinterv = setInterval(function()
	{
		$.ajax(
		{
			success: function()
			{
				var callbacks = $.Callbacks();
				callbacks.empty();
				var tab = $('[id^="flytabs_"] > ul > li.selected > a > span');
				var tabs = $('[id^="flytabs_"] > ul.tabs > li').length;
				if($(tab).length==0)
				{
					var div = $('[id^="jsjson-"]').html();
				}
				else if($(tab).length==1)
				{
					var div = $('#jsjson-'+$(tab).text()).html();
				}
				var jsn = div?JSON.parse(div.substr(div.indexOf('{'),div.lastIndexOf('}')-2)):{};
				if($.isEmptyObject(jsn)===false)
				{
					if($('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]).length==1 && $('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' > thead').length==0)
					{
						callbacks.add(createForestMineTable);
						callbacks.fire(jsn);
						callbacks.remove(createForestMineTable);
						$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' .expandcollapsetable .indicator').click(function(e)
						{
							var target = e.target;
							$(target).nextAll('div.info-div').slideToggle('fast','linear',function()
							{
								$(target).parent().toggleClass('active');
							});
						});
						$('#forestminetable-'+jsn.range[0]+'-'+jsn.range[1]+' .ikariam-tooltip').hover(function(e)
						{
							var txt = '';
							var attrs = $(this).attr('data-tooltip').split('|');
							if(attrs.length==1)
							{
								txt = attrs[0];
							}
							else
							{
								switch(attrs[1])
								{
									case 'Τ':
									case 'Γ':
									case 'Α':
									case 'ΟΜ':
										txt = Tips(attrs[0],attrs[1],attrs[2],attrs[3]);
										break;
									case 'ΜΜ':
										txt = attrs[0]+'<br>Κείμενο Μέγιστης Μείωσης<br>Άλλο κείμενο<br>'+attrs[2];
										break;
								}
							}
							$(this).removeAttr('title');
							$('body').appendTo('body');
							$('<div id="ikariam-tooltip-content" class="WikiaArticle" style="border:1px solid #F1D031;color:#444;background:#fbeecb;box-shadow:0 2px 2px #999;position:absolute;padding:2px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;z-index:6000000;margin:0px;min-height:0px;overflow:hidden;font-size:14px;display:none"></div>').html(txt).appendTo('body');
							$('#ikariam-tooltip-content').css('display','inline-block').fadeIn('fast');
						},function()
						{
							$('#ikariam-tooltip-content').remove();
						}).mousemove(function(e)
						{
							var o = 10;
							var cX = e.pageX;
							var cY = e.pageY;
							var wW = $(window).width();
							var wH = $(window).height();
							var t = $('#ikariam-tooltip-content');
							var tW = t.width()+parseInt(t.css('padding-left'))+parseInt(t.css('padding-right'));
							var tH = t.height()+parseInt(t.css('padding-top'))+parseInt(t.css('padding-bottom'));
							var tL = cX+o;
							if(tL+tW>$(window).scrollLeft()+wW) { tL = $(window).scrollLeft()+wW-tW*2; }
							else if(tL-tW<$(window).scrollLeft()) { tL = $(window).scrollLeft()+tW; }
							var tT = cY+o;
							if(tT+tH>$(window).scrollTop()+wH) { tT = $(window).scrollTop()+wH-tH; }
							else if(tT-tH<$(window).scrollTop()) { tT = $(window).scrollTop(); }
							$('#ikariam-tooltip-content').css({'top':tT+'px','left':tL+'px'})
						});
					}
				}
				if($('[id^="forestminetable-"]').length==tabs)
				{
					clearInterval(createtableinterv);
					
				}
			}
		});
	},1000);
	mw.hook('wikipage.content').add(function($content)
	{
		try
		{
			if($('#firstHeading').text().trim()=='Καθημερινές Αποστολές')
			{
				$('dl a[href^="#"]').each(function(k,a)
				{
					$(a).on('click',function(e)
					{
						e.preventDefault();
						var pos = $($(a).attr('href')).offset().top;
						window.scrollTo({top:pos-130,behavior:'smooth'});
					});
				});
			}
			FaithTableGenerator();
			var txt = '';
			var div = $content.find('#jsjson').html();
			var jsn = div?JSON.parse(div.substr(div.indexOf('{'),div.lastIndexOf('}')-2)):{};
			if($.isEmptyObject(jsn)===false)
			{
				if(jsn.name==='')
				{
					txt = 'To όνομα του κτηρίου είναι κενό. Συμπληρώστε το με έγκυρο όνομα κτηρίου';
				}
				else if(LD.buildings.indexOf(jsn.name)==-1)
				{
					txt = 'To όνομα του κτηρίου δεν είναι έγκυρο. Συμπληρώστε το με έγκυρο όνομα κτηρίου';
				}
				else if(LD.buildings.indexOf(jsn.name)!=-1)
				{
					txt = 'To όνομα του κτηρίου είναι έγκυρο. Ώρα να δούμε τα υπόλοιπα στοιχεία';
				}
//				$('#mw-content-text > div.widepage:not(#jspage), #flytabs_0-content-wrapper > div > div.widepage:not(#jspage) > table.darktable.zebra').hide();
				$content.find('#jspage').html(createTable(jsn));
				refs();
			}
			else
			{
				txt = 'Δεν έχει οριστεί όνομα κτηρίου. Διορθώστε τον κώδικα της σελίδας προβολής του πίνακα';
			}
			$('.ikariam-tooltip').hover(function(e)
			{
				var txt = '';
				var attrs = $(this).attr('data-tooltip').split('|');
				if(attrs.length==1)
				{
					txt = attrs[0];
				}
				else
				{
					switch(attrs[1])
					{
						case 'Τ':
						case 'Γ':
						case 'Α':
						case 'ΟΜ':
							txt = Tips(attrs[0],attrs[1],attrs[2],attrs[3]);
							break;
						case 'ΜΜ':
							txt = attrs[0]+'<br>Κείμενο Μέγιστης Μείωσης<br>Άλλο κείμενο<br>'+attrs[2];
							break;
					}
				}
				$(this).removeAttr('title');
				$('<div id="ikariam-tooltip-content" class="WikiaArticle" style="border:1px solid #F1D031;color:#444;background:#fbeecb;box-shadow:0 2px 2px #999;position:absolute;padding:2px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;z-index:6000000;margin:0px;min-height:0px;overflow:hidden;font-size:14px;display:none"></div>').html(txt).appendTo('body');
				$('#ikariam-tooltip-content').css('display','inline-block').fadeIn('fast');
			},function()
			{
				$('#ikariam-tooltip-content').remove();
			}).mousemove(function(e)
			{
				var o = 10;
				var cX = e.pageX;
				var cY = e.pageY;
				var wW = $(window).width();
				var wH = $(window).height();
				var t = $('#ikariam-tooltip-content');
				var tW = t.width()+parseInt(t.css('padding-left'))+parseInt(t.css('padding-right'));
				var tH = t.height()+parseInt(t.css('padding-top'))+parseInt(t.css('padding-bottom'));
				var tL = cX+o;
				if(tL+tW>$(window).scrollLeft()+wW) { tL = $(window).scrollLeft()+wW-tW*2; }
				else if(tL-tW<$(window).scrollLeft()) { tL = $(window).scrollLeft()+tW; }
				var tT = cY+o;
				if(tT+tH>$(window).scrollTop()+wH) { tT = $(window).scrollTop()+wH-tH; }
				else if(tT-tH<$(window).scrollTop()) { tT = $(window).scrollTop(); }
				$('#ikariam-tooltip-content').css({'top':tT+'px','left':tL+'px'})
			});
		}
		catch(e)
		{
			console.log(e);
		}
	});
});

//Wikia building code -- End