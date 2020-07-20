var ug = wgUserGroups.join(' ');
if (ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('vstf') + ug.indexOf('sysop') > -4) {
    $("div.mam").addClass("mamadmin");
    $("div.mam").click(function(){ 
        $( this ).toggleClass("mamadmin2"); 
    }); 
}

//=================================================================================================
//
//                                             ACCORDION
//
//=================================================================================================


$('.accordion > .accordion-item').click(function () {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).next().slideUp("slow");
    } else {
        $(this).parent().children(".data").slideUp("slow");
        $(this).parent().children(".accordion-item").removeClass('open');
        $(this).addClass('open');
        $(this).next().slideDown("slow");
    }
});



//=================================================================================================
//
//                                             CLOCK
//
//=================================================================================================

$(function() {
 
    setInterval( function() {
        var seconds = new Date().getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
      
        $("#sec").css({ "transform": srotate });
          
    }, 1000 );
      
    setInterval( function() {
        var hours = new Date().getHours();
        var mins = new Date().getMinutes();
        var hdegree = hours * 30 + (mins / 2);
        var hrotate = "rotate(" + hdegree + "deg)";
      
        $("#hour").css({ "transform": hrotate});
          
    }, 1000 );

    setInterval( function() {
        var mins = new Date().getMinutes();
        var mdegree = mins * 6;
        var mrotate = "rotate(" + mdegree + "deg)";
      
        $("#min").css({ "transform" : mrotate });
          
    }, 1000 );
});

/*###########################################
Interwiki
############################################
if ($('.WikiaArticleInterlang').length > 0) {
    $('<li><a href="javascript:void(0)" id="ie-interwiki">Add...</a></li>').insertAfter('.WikiaArticleInterlang ul li:last-child');
} else {
    $('<nav><a href="javascript:void(0)" id="ie-interwiki">Add interwiki link.</a></nav>').insertAfter('.articlePage.CategorySelect');
}

var form_interwiki =
    '<form method="" name="" class="WikiaForm ieForm">' +
    '  <fieldset>' +
    '<div id="ladiv" style="margin-bottom: 5px">					<select id="ie-wiki-language" name="ie-wiki-language">' +
'                               <optgroup label="Les 13 langues les plus utilisées">' +
'						<option value="de" >de: Deutsch</option>' +
'						<option value="en" >en: English</option>' +
'						<option value="es" >es: Español</option>' +
'						<option value="fr">fr: Français</option>' +
'						<option value="it" >it: Italiano</option>' +
'						<option value="ja" >ja: 日本語</option>' +
'						<option value="nl" >nl: Nederlands</option>' +
'						<option value="no" >no: ?Norsk (bokmål)?</option>' +
'						<option value="pl" >pl: Polski</option>' +
'						<option value="pt" >pt: Português</option>' +
'						<option value="pt-br" >pt-br: Português do Brasil</option>' +
'						<option value="ru" >ru: Русский</option>' +
'						<option value="zh" >zh: 中文</option>' +
'						</optgroup>' +
'						<optgroup label="Toutes les langues">' +
'							<option value="aa" >aa: Qafár af</option>' +
'						<option value="ab" >ab: Аҧсуа</option>' +
'						<option value="ace" >ace: Acèh</option>' +
'						<option value="af" >af: Afrikaans</option>' +
'						<option value="ak" >ak: Akan</option>' +
'						<option value="aln" >aln: Gegë</option>' +
'						<option value="am" >am: አማርኛ</option>' +
'						<option value="anp" >anp: अङ्गिका</option>' +
'						<option value="ar" >ar: العربية</option>' +
'						<option value="arc" >arc: ܐܪܡܝܐ</option>' +
'						<option value="arn" >arn: Mapudungun</option>' +
'						<option value="ary" >ary: Maġribi</option>' +
'						<option value="arz" >arz: مصرى</option>' +
'						<option value="as" >as: অসমীয়া</option>' +
'						<option value="av" >av: Авар</option>' +
'						<option value="avk" >avk: Kotava</option>' +
'						<option value="ay" >ay: Aymar aru</option>' +
'						<option value="az" >az: Azərbaycanca</option>' +
'						<option value="ba" >ba: Башҡортса</option>' +
'						<option value="bat-smg" >bat-smg: Žemaitėška</option>' +
'						<option value="bcc" >bcc: بلوچی مکرانی</option>' +
'						<option value="bcl" >bcl: Bikol Central</option>' +
'						<option value="be" >be: Беларуская</option>' +
'						<option value="be-tarask" >be-tarask: ?Беларуская (тарашкевіца)?</option>' +
'						<option value="be-x-old" >be-x-old: ?Беларуская (тарашкевіца)?</option>' +
'						<option value="bg" >bg: Български</option>' +
'						<option value="bh" >bh: भोजपुरी</option>' +
'						<option value="bho" >bho: भोजपुरी</option>' +
'						<option value="bi" >bi: Bislama</option>' +
'						<option value="bjn" >bjn: Bahasa Banjar</option>' +
'						<option value="bm" >bm: Bamanankan</option>' +
'						<option value="bn" >bn: বাংলা</option>' +
'						<option value="bo" >bo: བོད་ཡིག</option>' +
'						<option value="bpy" >bpy: ইমার ঠার/বিষ্ণুপ্রিয়া মণিপুরী</option>' +
'						<option value="bqi" >bqi: بختياري</option>' +
'						<option value="br" >br: Brezhoneg</option>' +
'						<option value="brh" >brh: Bráhuí</option>' +
'						<option value="bs" >bs: Bosanski</option>' +
'						<option value="bug" >bug: ᨅᨔ ᨕᨘᨁᨗ</option>' +
'						<option value="bxr" >bxr: Буряад</option>' +
'						<option value="ca" >ca: Català</option>' +
'						<option value="cbk-zam" >cbk-zam: Chavacano de Zamboanga</option>' +
'						<option value="cdo" >cdo: Mìng-dĕ̤ng-ngṳ̄</option>' +
'						<option value="ce" >ce: Нохчийн</option>' +
'						<option value="ceb" >ceb: Cebuano</option>' +
'						<option value="ch" >ch: Chamoru</option>' +
'						<option value="cho" >cho: Choctaw</option>' +
'						<option value="chr" >chr: ᏣᎳᎩ</option>' +
'						<option value="chy" >chy: Tsetsêhestâhese</option>' +
'						<option value="ckb" >ckb: کوردی</option>' +
'						<option value="co" >co: Corsu</option>' +
'						<option value="cps" >cps: Capiceño</option>' +
'						<option value="cr" >cr: Nēhiyawēwin / ᓀᐦᐃᔭᐍᐏᐣ</option>' +
'						<option value="crh" >crh: Qırımtatarca</option>' +
'						<option value="crh-cyrl" >crh-cyrl: ?Къырымтатарджа (Кирилл)?</option>' +
'						<option value="crh-latn" >crh-latn: ?Qırımtatarca (Latin)?</option>' +
'						<option value="cs" >cs: Česky</option>' +
'						<option value="csb" >csb: Kaszëbsczi</option>' +
'						<option value="cu" >cu: Словѣ́ньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ</option>' +
'						<option value="cv" >cv: Чӑвашла</option>' +
'						<option value="cy" >cy: Cymraeg</option>' +
'						<option value="da" >da: Dansk</option>' +
'						<option value="de" >de: Deutsch</option>' +
'						<option value="diq" >diq: Zazaki</option>' +
'						<option value="dsb" >dsb: Dolnoserbski</option>' +
'						<option value="dtp" >dtp: Dusun Bundu-liwan</option>' +
'						<option value="dv" >dv: ދިވެހިބަސް</option>' +
'						<option value="dz" >dz: ཇོང་ཁ</option>' +
'						<option value="ee" >ee: Eʋegbe</option>' +
'						<option value="el" >el: Ελληνικά</option>' +
'						<option value="eml" >eml: Emiliàn e rumagnòl</option>' +
'						<option value="en" >en: English</option>' +
'						<option value="eo" >eo: Esperanto</option>' +
'						<option value="es" >es: Español</option>' +
'						<option value="et" >et: Eesti</option>' +
'						<option value="eu" >eu: Euskara</option>' +
'						<option value="ext" >ext: Estremeñu</option>' +
'						<option value="fa" >fa: فارسی</option>' +
'						<option value="ff" >ff: Fulfulde</option>' +
'						<option value="fi" >fi: Suomi</option>' +
'						<option value="fiu-vro" >fiu-vro: Võro</option>' +
'						<option value="fj" >fj: Na Vosa Vakaviti</option>' +
'						<option value="fo" >fo: Føroyskt</option>' +
'						<option value="fr" >fr: Français</option>' +
'						<option value="frp" >frp: Arpetan</option>' +
'						<option value="frr" >frr: Nordfriisk</option>' +
'						<option value="fur" >fur: Furlan</option>' +
'						<option value="fy" >fy: Frysk</option>' +
'						<option value="ga" >ga: Gaeilge</option>' +
'						<option value="gag" >gag: Gagauz</option>' +
'						<option value="gan" >gan: 贛語</option>' +
'						<option value="gan-hans" >gan-hans: ?赣语(简体)?</option>' +
'						<option value="gan-hant" >gan-hant: ?贛語(繁體)?</option>' +
'						<option value="gd" >gd: Gàidhlig</option>' +
'						<option value="gl" >gl: Galego</option>' +
'						<option value="glk" >glk: گیلکی</option>' +
'						<option value="gn" >gn: Avañe\'ẽ</option>' +
'						<option value="got" >got: 𐌲𐌿𐍄𐌹𐍃𐌺</option>' +
'						<option value="grc" >grc: Ἀρχαία ἑλληνικὴ</option>' +
'						<option value="gsw" >gsw: Alemannisch</option>' +
'						<option value="gu" >gu: ગુજરાતી</option>' +
'						<option value="gv" >gv: Gaelg</option>' +
'						<option value="ha" >ha: هَوُسَ</option>' +
'						<option value="hak" >hak: Hak-kâ-fa</option>' +
'						<option value="haw" >haw: Hawai`i</option>' +
'						<option value="he" >he: עברית</option>' +
'						<option value="hi" >hi: हिन्दी</option>' +
'						<option value="hif" >hif: Fiji Hindi</option>' +
'						<option value="hif-latn" >hif-latn: Fiji Hindi</option>' +
'						<option value="hil" >hil: Ilonggo</option>' +
'						<option value="ho" >ho: Hiri Motu</option>' +
'						<option value="hr" >hr: Hrvatski</option>' +
'						<option value="hsb" >hsb: Hornjoserbsce</option>' +
'						<option value="ht" >ht: Kreyòl ayisyen</option>' +
'						<option value="hu" >hu: Magyar</option>' +
'						<option value="hy" >hy: Հայերեն</option>' +
'						<option value="hz" >hz: Otsiherero</option>' +
'						<option value="id" >id: Bahasa Indonesia</option>' +
'						<option value="ig" >ig: Igbo</option>' +
'						<option value="ii" >ii: ꆇꉙ</option>' +
'						<option value="ik" >ik: Iñupiak</option>' +
'						<option value="ike-cans" >ike-cans: ᐃᓄᒃᑎᑐᑦ</option>' +
'						<option value="ike-latn" >ike-latn: inuktitut</option>' +
'						<option value="ilo" >ilo: Ilokano</option>' +
'						<option value="inh" >inh: ГІалгІай Ğalğaj</option>' +
'						<option value="io" >io: Ido</option>' +
'						<option value="is" >is: Íslenska</option>' +
'						<option value="it" >it: Italiano</option>' +
'						<option value="iu" >iu: ᐃᓄᒃᑎᑐᑦ/inuktitut</option>' +
'						<option value="ja" >ja: 日本語</option>' +
'						<option value="jam" >jam: Patois</option>' +
'						<option value="jbo" >jbo: Lojban</option>' +
'						<option value="jut" >jut: Jysk</option>' +
'						<option value="jv" >jv: Basa Jawa</option>' +
'						<option value="ka" >ka: ქართული</option>' +
'						<option value="kaa" >kaa: Qaraqalpaqsha</option>' +
'						<option value="kab" >kab: Taqbaylit</option>' +
'						<option value="kbd" >kbd: Адыгэбзэ</option>' +
'						<option value="kbd-cyrl" >kbd-cyrl: Адыгэбзэ</option>' +
'						<option value="kg" >kg: Kongo</option>' +
'						<option value="khw" >khw: کھوار</option>' +
'						<option value="ki" >ki: Gĩkũyũ</option>' +
'						<option value="kiu" >kiu: Kırmancki</option>' +
'						<option value="kj" >kj: Kwanyama</option>' +
'						<option value="kk" >kk: Қазақша</option>' +
'						<option value="kk-arab" >kk-arab: ?قازاقشا (تٴوتە)?</option>' +
'						<option value="kk-cn" >kk-cn: ?قازاقشا (جۇنگو)?</option>' +
'						<option value="kk-cyrl" >kk-cyrl: ?Қазақша (кирил)?</option>' +
'						<option value="kk-kz" >kk-kz: ?Қазақша (Қазақстан)?</option>' +
'						<option value="kk-latn" >kk-latn: ?Qazaqşa (latın)?</option>' +
'						<option value="kk-tr" >kk-tr: ?Qazaqşa (Türkïya)?</option>' +
'						<option value="kl" >kl: Kalaallisut</option>' +
'						<option value="km" >km: ភាសាខ្មែរ</option>' +
'						<option value="kn" >kn: ಕನ್ನಡ</option>' +
'						<option value="ko" >ko: 한국어</option>' +
'						<option value="ko-kp" >ko-kp: 한국어 (조선)</option>' +
'						<option value="koi" >koi: Перем Коми</option>' +
'						<option value="kr" >kr: Kanuri</option>' +
'						<option value="krc" >krc: Къарачай-Малкъар</option>' +
'						<option value="kri" >kri: Krio</option>' +
'						<option value="krj" >krj: Kinaray-a</option>' +
'						<option value="ks" >ks: कॉशुर - کٲشُر</option>' +
'						<option value="ks-arab" >ks-arab: کٲشُر</option>' +
'						<option value="ks-deva" >ks-deva: कॉशुर</option>' +
'						<option value="ku" >ku: Kurdî</option>' +
'						<option value="ku-arab" >ku-arab: ?كوردي (عەرەبی)?</option>' +
'						<option value="ku-latn" >ku-latn: ?Kurdî (latînî)?</option>' +
'						<option value="kv" >kv: Коми</option>' +
'						<option value="kw" >kw: Kernowek</option>' +
'						<option value="ky" >ky: Кыргызча</option>' +
'						<option value="la" >la: Latina</option>' +
'						<option value="lad" >lad: Ladino</option>' +
'						<option value="lb" >lb: Lëtzebuergesch</option>' +
'						<option value="lbe" >lbe: Лакку</option>' +
'						<option value="lez" >lez: Лезги</option>' +
'						<option value="lfn" >lfn: Lingua Franca Nova</option>' +
'						<option value="lg" >lg: Luganda</option>' +
'						<option value="li" >li: Limburgs</option>' +
'						<option value="lij" >lij: Ligure</option>' +
'						<option value="liv" >liv: Līvõ kēļ</option>' +
'						<option value="lmo" >lmo: Lumbaart</option>' +
'						<option value="ln" >ln: Lingála</option>' +
'						<option value="lo" >lo: ລາວ</option>' +
'						<option value="loz" >loz: Silozi</option>' +
'						<option value="lt" >lt: Lietuvių</option>' +
'						<option value="ltg" >ltg: Latgaļu</option>' +
'						<option value="lv" >lv: Latviešu</option>' +
'						<option value="lzh" >lzh: 文言</option>' +
'						<option value="lzz" >lzz: Lazuri</option>' +
'						<option value="mai" >mai: मैथिली</option>' +
'						<option value="map-bms" >map-bms: Basa Banyumasan</option>' +
'						<option value="mdf" >mdf: Мокшень</option>' +
'						<option value="mg" >mg: Malagasy</option>' +
'						<option value="mh" >mh: Ebon</option>' +
'						<option value="mhr" >mhr: Олык Марий</option>' +
'						<option value="mi" >mi: Māori</option>' +
'						<option value="min" >min: Baso Minangkabau</option>' +
'						<option value="mk" >mk: Македонски</option>' +
'						<option value="ml" >ml: മലയാളം</option>' +
'						<option value="mn" >mn: Монгол</option>' +
'						<option value="mo" >mo: Молдовеняскэ</option>' +
'						<option value="mr" >mr: मराठी</option>' +
'						<option value="mrj" >mrj: Кырык мары</option>' +
'						<option value="ms" >ms: Bahasa Melayu</option>' +
'						<option value="mt" >mt: Malti</option>' +
'						<option value="mus" >mus: Mvskoke</option>' +
'						<option value="my" >my: မြန်မာဘာသာ</option>' +
'						<option value="myv" >myv: Эрзянь</option>' +
'						<option value="mzn" >mzn: مازِرونی</option>' +
'						<option value="na" >na: Dorerin Naoero</option>' +
'						<option value="nah" >nah: Nāhuatl</option>' +
'						<option value="nan" >nan: Bân-lâm-gú</option>' +
'						<option value="nap" >nap: Nnapulitano</option>' +
'						<option value="ne" >ne: नेपाली</option>' +
'						<option value="new" >new: नेपाल भाषा</option>' +
'						<option value="ng" >ng: Oshiwambo</option>' +
'						<option value="niu" >niu: Niuē</option>' +
'						<option value="nl" >nl: Nederlands</option>' +
'						<option value="nl-informal" >nl-informal: ?Nederlands (informeel)?</option>' +
'						<option value="nn" >nn: ?Norsk (nynorsk)?</option>' +
'						<option value="no" >no: ?Norsk (bokmål)?</option>' +
'						<option value="nov" >nov: Novial</option>' +
'						<option value="nrm" >nrm: Nouormand</option>' +
'						<option value="nso" >nso: Sesotho sa Leboa</option>' +
'						<option value="nv" >nv: Diné bizaad</option>' +
'						<option value="ny" >ny: Chi-Chewa</option>' +
'						<option value="oc" >oc: Occitan</option>' +
'						<option value="om" >om: Oromoo</option>' +
'						<option value="or" >or: ଓଡ଼ିଆ</option>' +
'						<option value="os" >os: Ирон</option>' +
'						<option value="pa" >pa: ਪੰਜਾਬੀ</option>' +
'						<option value="pag" >pag: Pangasinan</option>' +
'						<option value="pam" >pam: Kapampangan</option>' +
'						<option value="pap" >pap: Papiamentu</option>' +
'						<option value="pcd" >pcd: Picard</option>' +
'						<option value="pi" >pi: पािऴ</option>' +
'						<option value="pih" >pih: Norfuk / Pitkern</option>' +
'						<option value="pl" >pl: Polski</option>' +
'						<option value="pms" >pms: Piemontèis</option>' +
'						<option value="pnb" >pnb: پنجابی</option>' +
'						<option value="pnt" >pnt: Ποντιακά</option>' +
'						<option value="prg" >prg: Prūsiskan</option>' +
'						<option value="ps" >ps: پښتو</option>' +
'						<option value="pt" >pt: Português</option>' +
'						<option value="pt-br" >pt-br: Português do Brasil</option>' +
'						<option value="qu" >qu: Runa Simi</option>' +
'						<option value="qug" >qug: Runa shimi</option>' +
'						<option value="rgn" >rgn: Rumagnôl</option>' +
'						<option value="rif" >rif: Tarifit</option>' +
'						<option value="rm" >rm: Rumantsch</option>' +
'						<option value="rmy" >rmy: Romani</option>' +
'						<option value="rn" >rn: Kirundi</option>' +
'						<option value="ro" >ro: Română</option>' +
'						<option value="roa-rup" >roa-rup: Armãneashce</option>' +
'						<option value="roa-tara" >roa-tara: Tarandíne</option>' +
'						<option value="ru" >ru: Русский</option>' +
'						<option value="rue" >rue: Русиньскый</option>' +
'						<option value="rup" >rup: Armãneashce</option>' +
'						<option value="ruq" >ruq: Vlăheşte</option>' +
'						<option value="ruq-cyrl" >ruq-cyrl: Влахесте</option>' +
'						<option value="ruq-latn" >ruq-latn: Vlăheşte</option>' +
'						<option value="rw" >rw: Kinyarwanda</option>' +
'						<option value="sa" >sa: संस्कृतम्</option>' +
'						<option value="sah" >sah: Саха тыла</option>' +
'						<option value="sc" >sc: Sardu</option>' +
'						<option value="scn" >scn: Sicilianu</option>' +
'						<option value="sco" >sco: Scots</option>' +
'						<option value="sd" >sd: سنڌي</option>' +
'						<option value="sdc" >sdc: Sassaresu</option>' +
'						<option value="se" >se: Sámegiella</option>' +
'						<option value="sei" >sei: Cmique Itom</option>' +
'						<option value="sg" >sg: Sängö</option>' +
'						<option value="sgs" >sgs: Žemaitėška</option>' +
'						<option value="sh" >sh: Srpskohrvatski / Српскохрватски</option>' +
'						<option value="shi" >shi: Tašlḥiyt/ⵜⴰⵛⵍⵃⵉⵜ</option>' +
'						<option value="shi-latn" >shi-latn: Tašlḥiyt</option>' +
'						<option value="shi-tfng" >shi-tfng: ⵜⴰⵛⵍⵃⵉⵜ</option>' +
'						<option value="si" >si: සිංහල</option>' +
'						<option value="sk" >sk: Slovenčina</option>' +
'						<option value="sl" >sl: Slovenščina</option>' +
'						<option value="sli" >sli: Schläsch</option>' +
'						<option value="sm" >sm: Gagana Samoa</option>' +
'						<option value="sma" >sma: Åarjelsaemien</option>' +
'						<option value="sn" >sn: chiShona</option>' +
'						<option value="so" >so: Soomaaliga</option>' +
'						<option value="sq" >sq: Shqip</option>' +
'						<option value="sr" >sr: Српски / Srpski</option>' +
'						<option value="sr-ec" >sr-ec: ?Српски (ћирилица)?</option>' +
'						<option value="sr-el" >sr-el: ?Srpski (latinica)?</option>' +
'						<option value="srn" >srn: Sranantongo</option>' +
'						<option value="ss" >ss: SiSwati</option>' +
'						<option value="st" >st: Sesotho</option>' +
'						<option value="stq" >stq: Seeltersk</option>' +
'						<option value="su" >su: Basa Sunda</option>' +
'						<option value="sv" >sv: Svenska</option>' +
'						<option value="sw" >sw: Kiswahili</option>' +
'						<option value="szl" >szl: Ślůnski</option>' +
'						<option value="ta" >ta: தமிழ்</option>' +
'						<option value="tcy" >tcy: ತುಳು</option>' +
'						<option value="te" >te: తెలుగు</option>' +
'						<option value="tet" >tet: Tetun</option>' +
'						<option value="tg" >tg: Тоҷикӣ</option>' +
'						<option value="tg-cyrl" >tg-cyrl: Тоҷикӣ</option>' +
'						<option value="tg-latn" >tg-latn: tojikī</option>' +
'						<option value="th" >th: ไทย</option>' +
'						<option value="ti" >ti: ትግርኛ</option>' +
'						<option value="tk" >tk: Türkmençe</option>' +
'						<option value="tl" >tl: Tagalog</option>' +
'						<option value="tly" >tly: толышә зывон</option>' +
'						<option value="tn" >tn: Setswana</option>' +
'						<option value="to" >to: lea faka-Tonga</option>' +
'						<option value="tpi" >tpi: Tok Pisin</option>' +
'						<option value="tr" >tr: Türkçe</option>' +
'						<option value="ts" >ts: Xitsonga</option>' +
'						<option value="tt" >tt: Татарча/Tatarça</option>' +
'						<option value="tt-cyrl" >tt-cyrl: Татарча</option>' +
'						<option value="tt-latn" >tt-latn: Tatarça</option>' +
'						<option value="tum" >tum: chiTumbuka</option>' +
'						<option value="tw" >tw: Twi</option>' +
'						<option value="ty" >ty: Reo Mā`ohi</option>' +
'						<option value="tyv" >tyv: Тыва дыл</option>' +
'						<option value="udm" >udm: Удмурт</option>' +
'						<option value="ug" >ug: ئۇيغۇرچە / Uyghurche?</option>' +
'						<option value="ug-arab" >ug-arab: ئۇيغۇرچە</option>' +
'						<option value="ug-latn" >ug-latn: Uyghurche?</option>' +
'						<option value="uk" >uk: Українська</option>' +
'						<option value="ur" >ur: اردو</option>' +
'						<option value="uz" >uz: O\'zbek</option>' +
'						<option value="val" >val: Valencià</option>' +
'						<option value="ve" >ve: Tshivenda</option>' +
'						<option value="vec" >vec: Vèneto</option>' +
'						<option value="vep" >vep: Vepsän kel\'</option>' +
'						<option value="vi" >vi: Tiếng Việt</option>' +
'						<option value="vls" >vls: West-Vlams</option>' +
'						<option value="vmf" >vmf: Mainfränkisch</option>' +
'						<option value="vo" >vo: Volapük</option>' +
'						<option value="vot" >vot: Vaďďa</option>' +
'						<option value="vro" >vro: Võro</option>' +
'						<option value="wa" >wa: Walon</option>' +
'						<option value="war" >war: Winaray</option>' +
'						<option value="wo" >wo: Wolof</option>' +
'						<option value="wuu" >wuu: 吴语</option>' +
'						<option value="xal" >xal: Хальмг</option>' +
'						<option value="xh" >xh: isiXhosa</option>' +
'						<option value="xmf" >xmf: მარგალური</option>' +
'						<option value="yi" >yi: ייִדיש</option>' +
'						<option value="yo" >yo: Yorùbá</option>' +
'						<option value="yue" >yue: 粵語</option>' +
'						<option value="za" >za: Vahcuengh</option>' +
'						<option value="zea" >zea: Zeêuws</option>' +
'						<option value="zh" >zh: 中文</option>' +
'						<option value="zu" >zu: isiZulu</option>' +
'						</optgroup>' +	
'			</select> : <input type="text" style="align:center;height:20px; width:180px" id="Name" placeholder="Nom de la page"/></div>\n' +
    '   </fieldset>' +
    '</form>';

$('#ie-interwiki').click(function() {
    var count = 1;
    $.showCustomModal('Interwiki', form_interwiki, {
        id: 'ie-edit',
        width: 500,
        buttons: [{
            id: 'startButton',
            message: 'Publier',
            defaultButton: true,
            handler: function () {
              submit();
            }
        }, {
            message: 'Ajouter',
            handler: function() {
                $( '#ladiv' ).clone().appendTo( '.ieForm fieldset' );
                count ++;
            }
        }, {
            message: 'Annuler',
            handler: function() {
                $('#ie-edit').closeModal();
            }
        }]
    });
    
    var ie_value = $( '#ie-wiki-language' ).find( 'option:selected' ).val();
    $( '#ie-wiki-language' ).on( 'change', function() {
        ie_value = $( this ).find( 'option:selected' ).val();
    });
    $( '.ieForm' ).keyup(function(event){
        if(event.keyCode == 13){
            submit();
        }
    });
    function submit() {
        var pagename = $('input#Name').val();
        if(count > 1) {
            alert('mai d\'un !');
            ie_value = [];
            pagename = [];
            $( '#ladiv' ).each(function() {
                ie_value.push($(this).find( '#ie-wiki-language' ).find( 'option:selected' ).val());
                pagename.push($(this).find('input#Name').val());
            });
        }
        alert(ie_value + '\n' + pagename);
        return;
        $.ajax({
            url: mw.util.wikiScript( 'api' ),
            data: {
                format: 'json',
                action: 'edit',
                title: wgPageName,
                text: '[[' + ie_value + ':' + pagename + ']]',
                section: 'new',
                token: mw.user.tokens.get("editToken")
            },
            dataType: 'json',
            type: 'POST',
            success: function( data ) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    var conf = confirm("Fermer l'éditeur ?");
                    if ( conf === true) {
                        window.location.href = wgServer + '/wiki/' + encodeURIComponent(wgPageName);
                    } else {
                        return;
                    } 
                } else if ( data && data.error ) {
                    alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                } else {
                    alert( 'Error: Unknown result from API.' );
                }
            },
            error: function( xhr ) {
            alert( 'Error: Request failed.' );
            }
        });
    }

});

/* Audio 
$( 'document' ).ready(function () {
    $( 'body' ).append('<audio id="audioPlayer"><source src="https://a.tumblr.com/tumblr_nao5y6YOZy1rknxhfo1.mp3"></source><source src="http://www.sdz-files.com/cours/javascript/part5/chap2/hype_home.mp3"></source></audio>');
    $( 'a.wikia-button.comments.secondary.talk' ).after( '<button class="control-mute"><img style="height: 20px;" src="http://i757.photobucket.com/albums/xx219/Hulothe/mute_zpsjkqp6ion.png"></button><button class="control-play">Play</button><button class="control-resume">Stop</button>' );
    var player = document.getElementById('audioPlayer');
    player.play();
    player.currentTime= 67;
    $( '.control-mute' ).click(function () {
        if(player.muted === true) {
            $( '.control-mute' ).html( '<img style="height: 20px;" src="http://i757.photobucket.com/albums/xx219/Hulothe/mute_zpsjkqp6ion.png">' );
        } else {
            $( '.control-mute' ).html( '<img style="height: 20px;" src="http://i757.photobucket.com/albums/xx219/Hulothe/sound_zpsvskdinc0.png">' );
        }
 
        player.muted = !player.muted;
    });
});

*/