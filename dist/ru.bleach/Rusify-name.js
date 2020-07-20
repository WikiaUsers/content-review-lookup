wfPlugins = window.wfPlugins || [];
 
function RusifyNames(){
 var txt='', hidden = [], wpTextbox1 = document.editform.wpTextbox1;
 var winScroll = document.documentElement.scrollTop;
 
 //check regexp support
 try { txt = 'ая'.replace(/а/g,'б').replace(/б(?=я)/,'в') } catch(e) {}
 if (txt != 'вя') { alert(wmCantWork); return }
 
 wpTextbox1.focus();
 
 if (typeof wpTextbox1.selectionStart != 'undefined' 
    && (navigator.productSub > 20031000 || is_safari || is_opera))
 { //Mozilla/Opera/Safari3
    var textScroll = wpTextbox1.scrollTop;
    var startPos = wpTextbox1.selectionStart;
    var endPos = wpTextbox1.selectionEnd;
    txt = wpTextbox1.value.substring(startPos, endPos);
    if (txt === '') processAllText();
    else
    {
      processText();
      wpTextbox1.value = wpTextbox1.value.substring(0, startPos) + txt + wpTextbox1.value.substring(endPos);
    }
    wpTextbox1.selectionStart = startPos;
    wpTextbox1.selectionEnd = startPos + txt.length;
    wpTextbox1.scrollTop = textScroll;
 
 }
 else if (document.selection && document.selection.createRange)
 { //IE
   var range = document.selection.createRange();
   txt = range.text;
   if (txt === '') processAllText();
   else
   {
     processText();
     range.text = txt;
     if (range.moveStart) range.moveStart('character', - txt.length);
     range.select();
   }
 
 }
 else // other browsers
   if (confirm(wmFullText)) processAllText();
 
 document.documentElement.scrollTop = winScroll; // scroll back, for IE/Opera
 
 
//functions
 
function processAllText()
{
 txt = wpTextbox1.value;
 if (txt=='version') alert('Викификатор '+wmVersion);
 processText();
 r(/^[\n\r]+/, '');
 wpTextbox1.value = txt;
 txt = '';
 if (window.auto_comment && window.insertSummary && !document.editform.wpSection.value)
   insertSummary('русификатор');
}
 
function processText()
{
 
var u = '\u00A0'; //unbreakable space
 
hideTag('nowiki');
hideTag('pre');
hideTag('source');
hideTag('syntaxhighlight');
hideTag('code');
hideTag('tt');
hideTag('math');
hideTag('timeline');

// === NAME RUSIFICATOR TEST ===
r(/Tite Kubo/g,         'Тайт Кубо');

r(/Ichigo Kurosaki/g,   'Ичиго Куросаки');
r(/Isshin Kurosaki/g,   'Ишшин Куросаки');
r(/Yuzu Kurosaki/g,     'Юзу Куросаки');
r(/Karin Kurosaki/g,    'Карин Куросаки');
r(/Masaki Kurosaki/g,   'Масаки Куросаки');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Kon([^A-Za-zĀāĒēĪīŌōŪū])/g,  '$1Кон$2'); // может быть частью другого слова

r(/Kisuke Urahara/g,    'Кисуке Урахара');
r(/Yoruichi Shihōin/g,  'Йоруичи Шихоин');
r(/Tessai Tsukabishi/g, 'Тессай Цукабиши');
r(/Jinta Hanakari/g,    'Джинта Ханакари');
r(/Ururu Tsumugiya/g,   'Уруру Цумугия');
r(/Ririn/g,             'Ририн');
r(/Noba/g,              'Ноба');
r(/Kurōdo/g,            'Клод');

r(/Orihime Inoue/g,     'Орихиме Иноуэ');
r(/Uryū Ishida/g,       'Урюу Исида');
r(/Yasutora Sado/g,     'Ясутора Садо');
r(/Tatsuki Arisawa/g,   'Тацуки Арисава');
r(/Keigo Asano/g,       'Кейго Асано');
r(/Mizuiro Kojima/g,    'Мизуиро Коджима');
r(/Chizuru Honshō/g,    'Чизуру Хоншо');
r(/Michiru Ogawa/g,     'Мичиру Огава');
r(/Ryō Kunieda/g,       'Рё Куниэда');
r(/Mahana Natsui/g,     'Махана Нацуи');
r(/Misato Ochi/g,       'Мисато Очи');
r(/Kagine/g,            'Кагине');
r(/Mizuho Asano/g,      'Мизухо Асано');
r(/Tetsuo Momohara/g,   'Тецуо Момохара');
r(/Reiichi Ōshima/g,    'Рейичи Ошима');
r(/Sorimachi/g,         'Соримачи');
r(/Satoda/g,            'Сатода');
r(/Shinji \(filler\)/g, 'Шинджи (человек)');
r(/Shinji(?! Hirako)/g, 'Шинджи');
r(/Kyōko Haida/g,       'Кьёко Хайда');
r(/Don Kanonji/g,       'Дон Канонджи');


r(/Hinagiku/g,          'Хинагику');
r(/Baigon/g,            'Байгон');
r(/Lili/g,              'Лили');
r(/Shun'o/g,            'Шунь-о');
r(/Ayame/g,             'Аяме');
r(/Tsubaki/g,           'Цубаки');

///---------------------------------------------------------------------------

r(/Jin Kariya/g,        'Джин Кария');
r(/Gō Koga/g,           'Го Кога');
r(/Yoshino Sōma/g,      'Йошино Сома');
r(/Hō and Ban/g,        'Хо и Бан');
r(/Ryō Utagawa/g,       'Рё Утагава');
r(/Mabashi/g,           'Мабаши');
r(/Sawatari/g,          'Саватари');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Ugaki([^A-Za-zĀāĒēĪīŌōŪū])/g,  '$1Угаки$2');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Yoshi([^A-Za-zĀāĒēĪīŌōŪū])/g,  '$1Йоши$2');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Cain([^A-Za-zĀāĒēĪīŌōŪū])/g,   '$1Каин$2');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Hō([^A-Za-zĀāĒēĪīŌōŪū])/g,     '$1Хо$2');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Ban([^A-Za-zĀāĒēĪīŌōŪū])/g,    '$1Бан$2');

r(/Love Aikawa/g,       'Лав Аикава');
r(/Lisa Yadōmaru/g,     'Лиза Ядомару');
r(/Mashiro Kuna/g,      'Маширо Куна');
r(/Hiyori Sarugaki/g,   'Хиори Саругаки');
r(/Hachigen Ushōda/g,   'Хачиген Ушода');

r(/Kūgo Ginjō/g,             'Куго Гинджоу');
r(/Shūkurō Tsukishima/g,     'Шукуро Цукишима');
r(/Riruka Dokugamine/g,      'Рирука Докугамине');
r(/Yukio Hans Vorarlberna/g, 'Юкио Ханс Форарльберна');
r(/Jackie Tristan/g,         'Джеки Тристан');
r(/Giriko Kutsuzawa/g,       'Гирико Куцузава');



r(/Shunsui Kyōraku/g,   'Сюнсуй Кьёраку');
r(/Nanao Ise/g,         'Нанао Исе');
r(/Genshirō Okikiba/g,  'Генширо Окикиба');
r(/Genryūsai Shigekuni Yamamoto/g, 'Генрюусай Шигекуни Ямамото');
r(/Chōjirō Sasakibe/g,  'Чоуджиро Сасакибе');
r(/Shin'etsu Kisaragi/g,'Шинъэцу Кисараги');

r(/Suì-Fēng/g,          'Сой Фон');
r(/Marechiyo Ōmaeda/g,  'Маречиё Омаэда');
r(/Marenoshin Ōmaeda/g, 'Мареношин Омаэда');
r(/Eikichirō Saidō/g,   'Эикичиро Сайдо');
r(/Toriyosero/g,        'Ториёсеро');

r(/Rōjūrō Ōtoribashi/g, 'Роджуро Оторибаши');
r(/Izuru Kira/g,        'Изуру Кира');
r(/Gin Ichimaru/g,      'Гин Ичимару');
r(/Chikane Iba/g,       'Чикане Иба');
r(/Rikū Togakushi/g,    'Рику Тогакуши');
r(/Taketsuna Gori/g,    'Такецуна Гори');
r(/Asuka Katakura/g,    'Асука Катакура');
r(/Shūsuke Amagai/g,    'Сюсуке Амагай');
r(/Makoto Kibune/g,     'Макото Кибуне');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Kanō([^A-Za-zĀāĒēĪīŌōŪū])/g,  '$1Кано$2');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Aida([^A-Za-zĀāĒēĪīŌōŪū])/g,  '$1Аида$2');
r(/Sugama/g,            'Сугама');
r(/Shinta Seko/g,       'Шинта Секо');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Inose([^A-Za-zĀāĒēĪīŌōŪū])/g, '$1Иносе$2');

r(/Retsu Unohana/g,     'Рецу Унохана');
r(/Isane Kotetsu/g,     'Исане Котецу');
r(/Yasochika Iemura/g,  'Ясочика Иэмура');
r(/Hanatarō Yamada/g,   'Ханатаро Ямада');
r(/Harunobu Ogidō/g,    'Харунобу Огидо');
r(/Seinosuke Yamada/g,  'Сейносуке Ямада');

r(/Shinji Hirako/g,     'Шинджи Хирако');
r(/Momo Hinamori/g,     'Момо Хинамори');
r(/Sōsuke Aizen/g,      'Сосуке Айзен');

r(/Byakuya Kuchiki/g,   'Бьякуя Кучики');
r(/Renji Abarai/g,      'Ренджи Абарай');
r(/Mihane Shirogane/g,  'Михане Широгане');
r(/Rikichi Yuki/g,      'Рикичи Юки');
r(/Rikichi/g,           'Рикичи Юки');
r(/Ginrei Kuchiki/g,    'Гинрей Кучики');
r(/Ginjirō Shirogane/g, 'Гинджиро Широгане');
r(/Sōjun Kuchiki/g,     'Соджун Кучики');
r(/Kōga Kuchiki/g,      'Кога Кучики');

r(/Sajin Komamura/g,    'Саджин Комамура');
r(/Tetsuzaemon Iba/g,   'Тецузаэмон Иба');
r(/Jirōbō Ikkanzaka/g,  'Джиробо Икканзака');
r(/Jin'emon Kotsubaki/g,'Джинъэмон Коцубаки');

r(/Tatsufusa Enjōji/g,  'Тацуфуса Энджоуджи');

r(/Kensei Muguruma/g,   'Кенсей Мугурума');
r(/Shūhei Hisagi/g,     'Сюхей Хисаги');
r(/Kaname Tōsen/g,      'Канаме Тоусен');
r(/Toshimori Umesada/g, 'Тошимори Умесада');
r(/Shinobu Eishima/g,   'Шинобу Эишима');
r(/Izaemon Tōdō/g,      'Изаэмон Тодо');
r(/Heizō Kasaki/g,      'Хейзо Касаки');

r(/Tōshirō Hitsugaya/g, 'Тоширо Хицугая');
r(/Rangiku Matsumoto/g, 'Рангику Мацумото');
r(/Kōkichirō Takezoe/g, 'Кокичиро Такезоэ');

r(/Kenpachi Zaraki/g,   'Кенпачи Зараки');
r(/Yachiru Kusajishi/g, 'Ячиру Кусаджиши');
r(/Ikkaku Madarame/g,   'Иккаку Мадараме');
r(/Yumichika Ayasegawa/g, 'Юмичика Аясегава');
r(/Makizō Aramaki/g,    'Макизо Арамаки');
r(/Goteitaishi/g,       'Готейтайши');
r(/Kenpachi Kiganjō/g,  'Кенпачи Киганджоу');
r(/Maki Ichinose/g,     'Маки Ичиносе');
r(/Seizo Harugasaki/g,  'Сейзо Харугасаки');

r(/Mayuri Kurotsuchi/g, 'Маюри Куроцучи');
r(/Nemu Kurotsuchi/g,   'Нему Куроцучи');
r(/Akon/g,              'Акон');
r(/Hiyosu/g,            'Хиёсу');
r(/Rin Tsubokura/g,     'Рин Цубокура');
r(/Female Researcher/g, 'Куна');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Kuna([^A-Za-zĀāĒēĪīŌōŪū])/g, '$1Куна$2');
r(/Kagerōza Inaba/g,    'Кагероза Инаба');
r(/Ōko Yushima/g,       'Око Юшима');

r(/Jūshirō Ukitake/g,   'Джуширо Укитаке');
r(/Rukia Kuchiki/g,     'Рукия Кучики');
r(/Kiyone Kotetsu/g,    'Кионе Котецу');
r(/Sentarō Kotsubaki/g, 'Сентаро Коцубаки');
r(/Hidetomo Kajōmaru/g, 'Хидетомо Каджоумару');
r(/([^A-Za-zĀāĒēĪīŌōŪū])Shino([^A-Za-zĀāĒēĪīŌōŪū])/g, '$1Шино$2');
r(/Ryūnosuke Yuki/g,    'Рюуносуке Юки');
r(/Kaien Shiba/g,       'Кайен Шиба');
r(/Miyako Shiba/g,      'Мияко Шиба');

r(/Zennosuke Kurumadani/g, 'Зенносуке Курумадани');
r(/Ashido Kanō/g,       'Ашидо Кано');
r(/Ryūsei Kenzaki/g,    'Рюусей Кензаки');
r(/Rusaburō Enkōgawa/g, 'Русабуро Энкогава');
r(/Baishin/g,           'Байшин');
r(/Masayoshi/g,         'Масаёши');


r(/Soul King/g,         'Король душ');
r(/Senjumaru Shutara/g, 'Сенджумару Шутара');
r(/Kirio Hikifune/g,    'Кирио Хикифуне');
r(/Oshō/g,              'Бонза');
r(/Tenjirō Kirinji/g,   'Тенджиро Киринджи');
r(/Ōetsu Nimaiya/g,     'Оэцу Нимайя');


r(/Gengorō Ōnabara/g,   'Генгоро Онабара');
r(/Kanisawa/g,          'Канисава');
r(/Aoga/g,              'Аога');
r(/Jidanbō Ikkanzaka/g, 'Джиданбо Икканзака');
r(/Higonyūdō/g,         'Хигонюудо');
r(/Danzōmaru/g,         'Данзомару');
r(/Kaiwan/g,            'Кайван');


r(/Ganju Shiba/g,       'Гандзю Шиба');
r(/Kūkaku Shiba/g,      'Куукаку Шиба');
r(/Yūichi Shibata/g,    'Юичи Шибата');
r(/Koganehiko/g,        'Коганехико');
r(/Shiroganehiko/g,     'Широганехико');
r(/Horiuchi Hironari/g, 'Хориучи Хиронари');
r(/Taichi Miyamoto/g,   'Таичи Миямото');
r(/Kenji Yamashita/g,   'Кенджи Ямашита');
r(/Mitsuru Ishino/g,    'Мицуру Ишино');
r(/Sadatomo Saionji/g,  'Садатомо Сайонджи');
r(/Ran'Tao/g,           'Ран\'Тао');
r(/Tōba/g,              'Тоба');
r(/Daiji Hirasago/g,    'Дайджи Хирасаго');
r(/Sayori/g,            'Сайори');
r(/Mayu/g,              'Майю');

///---------------------------------------------------------------------------

r(/Coyote Starrk/g,            'Койот Старк');
r(/Baraggan Louisenbairn/g,    'Барагган Луизенбарн');
r(/Tier Harribel/g,            'Тия Харрибел');
r(/Ulquiorra Cifer/g,          'Улькиорра Сифер');
r(/Nnoitra Gilga/g,            'Нойтора Джилга');
r(/Grimmjow Jaegerjaquez/g,    'Гриммджоу Джагерджак');
r(/Zommari Rureaux/g,          'Зоммари Руро');
r(/Szayelaporro Granz/g,       'Заельапорро Гранц');
r(/Aaroniero Arruruerie/g,     'Аарониро Арруруэри');
r(/Yammy Llargo/g,             'Ямми Льярго');
r(/Nelliel Tu Odelschwanck/g,  'Неллиэль Ту Одельшванк');
r(/Luppi Antenor/g,            'Люппи Антенор');

r(/Dordoni Alessandro Del Socaccio/g, 'Дордони Алессандро дель Сокаччио');
r(/Cirucci Sanderwicci/g,      'Чируччи Сандервиччи');
r(/Gantenbainne Mosqueda/g,    'Гантенбайн Москеда');

r(/Abirama Redder/g,           'Абирама Реддер');
r(/Charlotte Chuhlhourne/g,    'Шарлотт Кулхорн');
r(/Findorr Calius/g,           'Финдор Калиас');
r(/Ggio Vega/g,                'Джио Вега');
r(/Choe Neng Poww/g,           'Чо Нен По');
r(/Nirgge Parduoc/g,           'Нирге Пардук');
r(/Emilou Apacci/g,            'Эмилоу Апаччи');
r(/Franceska Mila Rose/g,      'Фраческа Мила Роза');
r(/Cyan Sung-Sun/g,            'Циан Сун-Сун');
r(/Tesra Lindocruz/g,          'Тесла Линдокруз');
r(/Shawlong Koufang/g,         'Шаолонг Куфонг');
r(/Edrad Liones/g,             'Эдрад Лионес');
r(/Yylfordt Granz/g,           'Иилфордт Гранц');
r(/Di Roy Rinker/g,            'Ди Рой Ринкер');
r(/Nakeem Grindina/g,          'Наким Гриндина');
r(/Lumina and Verona/g,        'Люмина и Верона');
r(/Medazeppi/g,                'Медазеппи');
r(/Pesche Guatiche/g,          'Пеше Гатише');
r(/Dondochakka Birstanne/g,    'Дондочакка Бирстанн');
r(/Kukkapūro/g,                'Куккапуро');
r(/Lumina/g,                   'Люмина');
r(/Verona/g,                   'Верона');


r(/Aisslinger Wernarr/g,       'Аисслингер Вернарр');
r(/Demoura Zodd/g,             'Демоура Зодд');
r(/Lilynette Gingerbuck/g,     'Лилинетт Джинджербак');
r(/Loly Aivirrne/g,            'Лоли Аивирн');
r(/Menoly Mallia/g,            'Меноли Маллия');
r(/Wonderweiss Margela/g,      'Вандервайс Марджела');
r(/Rudbornn Chelute/g,         'Рудборн Челуте');
r(/Grand Fisher/g,             'Великий удильщик');
r(/Aldegor/g,                  'Альдегор');
r(/Menis/g,                    'Менис');
r(/Patros/g,                   'Патрос');
r(/Cloning Arrancar/g,         'Клонирующийся арранкар');
r(/Unnamed Female Arrancar/g,  'Неназванная арранкарка');
r(/Hammerhead Arrancar/g,      'Молотоголовый арранкар');

///---------------------------------------------------------------------------

r(/Juhabach/g,                 'Яхве');
r(/Yhwach/g,                   'Яхве');
r(/Quilge Opie/g,              'Килге Опи');
r(/Asguiaro Ebern/g,           'Азгиаро Эберн');
r(/Luders Friegen/g,           'Людерс Фриген');

r(/Bambietta Basterbine/g,     'Бамбиетта Бастербайн');
r(/Äs Nödt/g,                  'Эс Нодт');
r(/Driscoll Berci/g,           'Дрисколл Берчи');
r(/Berenice Gabrielli/g,       'Беренике Габриэлли');
r(/Jerome Guizbatt/g,          'Джером Гизбатт');
r(/NaNaNa Najahkoop/g,         'НаНаНа Наджакуп');
r(/Loyd Lloyd/g,               'Лойд Ллойд');
r(/Royd Lloyd/g,               'Ройд Ллойд');
r(/Shaz Domino/g,              'Шаз Домино');
r(/Jugram Haschwalth/g,        'Юграм Хашвальт');
r(/Haschwald/g,                'Хашвальт');
r(/Haschwalth/g,               'Хашвальт');
r(/Robert Accutrone/g,         'Роберт Аккутрон');
r(/Unnamed Male Vandenreich/g, 'Роберт Аккутрон');
r(/Buzz-B/g,                   'Базз-Би');


r(/flashback/g,                'флешбэк');

// === NAME RUSIFICATOR TEST END ===

txt = '\n'+txt+'\n';

//Plugins
for (var p in wfPlugins)
{
 wfPlugins[p](txt,r);
}
 
if ('0'.replace('0','$$') == '$') ////$ in replacing string is special, except in IE
 for (var i=0; i<hidden.length; i++)
  hidden[i] = hidden[i].replace(/\$/g, '$$$$');
while (hidden.length>0) 
 r('\x01'+hidden.length+'\x02', hidden.pop());
txt=txt.substr(1, txt.length-2);
}
 
function r(r1, r2) { txt = txt.replace(r1, r2) }
function hide(re) { r(re, function(s){return '\x01'+hidden.push(s)+'\x02'})}
function hideTag(tag) { hide(RegExp('<' + tag + '( [^>]+)?>[\\s\\S]+?<\\/' + tag + '>','gi')) }
 
}