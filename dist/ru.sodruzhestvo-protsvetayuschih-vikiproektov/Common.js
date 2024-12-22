/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* == Случайные названия == */
$(document).ready(function() {
    var wikiNames = [
        "Komunitas Proyek Wiki yang Berkembang Pesat #🇲🇨",
                "Komuniti WikiProjek yang berkembang maju #🇲🇾",
                "Una Comunitat De Viquiprojectes Pròspers #cat",
                "Et fællesskab af blomstrende projekter #🇩🇰",
                "Ein Commonwealth von blühenden Wikiprojekten #🇩🇪",
                "Õitsvate Wikiprojektide Ühendus #🇪🇪 ",
                "A Community of Thriving Wikiprojects #🇬🇧 #🇺🇸",
                "Commonwealth Of Prosperous Wikiproyectos #🇪🇦",
                "Communauté De Communes De L & Apos; Aisne #🇨🇵",
                "Zajednica Prosperitetnih Projekata #🇭🇷",
                "Il Commonwealth Dei Progetti PROSPERI Di Wikipedia #🇮🇹", 
                "Virágzó Wikiprojektek közössége #🇭🇺",
                "Een gemeenschap van bloeiende Wikiprojecten #🇳🇱",
                "Et Fellesskap Av Blomstrende Wikiprojects #🇧🇻",
                "Wspólnota Kwitnących Wikiprojektów #🇵🇱",
                "Comunidade De Wikis Prósperos #🇵🇹",
                "Uma comunidade de Wikiprojetos prósperos #🇧🇷",
                "O comunitate de Wikiproiecte înfloritoare #🇷🇴",
                "Kukoistavien Wikipediaprojektien yhteisö #🇫🇮",
                "En gemenskap av blomstrande Wikiprojekt #🇸🇪",
                "Isang komunidad ng maunlad na Wikiprojects  #🇵🇭",
                "Một Cộng đồng Phát Triển Mạnh Wikiprojects #🇻🇳",
                "Gelişen Wikiprojeler Topluluğu #🇹🇷",
                "Společenství Prosperujících Wikiprojektů #🇨🇿",
                "Μια Κοινότητα Ακμάζοντων Wikiprojects #🇬🇷",
                "Общност На Процъфтяващите Уикипроекти #🇧🇬",
                "Содружество Процветающих Википроектов #🇷🇺",
                "Комонвелт Просперитетних Википројеката #🇷🇸",
                "Співдружність Процвітаючих Вікіпроектів #🇺🇦",
                "🇮🇱# חבר העמים של ויקיפרויקטים משגשגים",
                "🇦🇪# مجتمع من مشاريع الويكي المزدهرة",
                "🇮🇷# جامعه ای از پروژه های ویکی پر رونق",
                "संपन्न विकिपीडिया परियोजनाओं का एक समुदाय #🇮🇳",
                "ชุมชนของโครงการวิกิพีเดียที่เจริญรุ่งเรือง #🇹🇭",
                "一个蓬勃发展的维基项目社区 #🇨🇳 #🇹🇼 #🇭🇰",
                "繁栄しているウィキプロジェクトのコミュニティ #🇯🇵", 
                "번성하는 위키 프로젝트 커뮤니티 #🇰🇵 #🇰🇷",
    ];
    var randomIndex = Math.floor(Math.random() * wikiNames.length);
    var randomWikiName = wikiNames[randomIndex];
    var communityNameElements = document.getElementsByClassName('fandom-community-header__community-name');
    if (communityNameElements.length > 0) {
        communityNameElements[0].textContent = randomWikiName;
        communityNameElements[0].classList.add('noto-emoji');
    }
    var stickyHeaderElements = document.getElementsByClassName('fandom-sticky-header__sitename');
    if (stickyHeaderElements.length > 0) {
        stickyHeaderElements[0].textContent = randomWikiName;
        stickyHeaderElements[0].classList.add('noto-emoji');
    }
});