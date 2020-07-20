/* z pt.starwars */

function changeMainPageLink() {
    if (wgNamespaceNumber==112 || wgNamespaceNumber==113)
    {
        $("a[accesskey=z]").attr("href", "/pl/wiki/Oryginalna_rzeczywistość:Strona_główna");
        $("div.page-header__main").append('<div class="page-header__page-subtitle">Artykuł dotyczy oryginalnej rzeczywistości, istniejącej przed wprowadzeniem zmian w czasie w filmie <span style="font-style:italic;">X-Men: Przeszłość, która nadejdzie</span>.</div>');
        $("title").text($("title").text().replace("Oryginalna rzeczywistość:", ""));
        if ($('#title-meta').length == 1)
            return;
        $("h1.page-header__title").text($("h1.page-header__title").text().replace("Oryginalna rzeczywistość:", ""));
    }
    else if(wgNamespaceNumber==0)
    {
        var mundoReal = $("a[title='Artykuł dotyczy świata rzeczywistego.']");
        if (mundoReal.length==0)
            $("div.page-header__main").append('<div class="page-header__page-subtitle">Artykuł dotyczy świata rzeczywistego.</div>');
    }

    else if(wgNamespaceNumber==114 || wgNamespaceNumber==115)
    {
        $("a[accesskey=z]").attr("href", "/pl/wiki/Alternatywna_rzeczywistość:Strona_główna");
        $("div.page-header__main").append('<div class="page-header__page-subtitle">Artykuł dotyczy alternatywnej rzeczywistości, która pojawiła się po wprowadzeniu zmian w czasie w filmie <span style="font-style:italic;">X-Men: Przeszłość, która nadejdzie</span>.</div>');
        $("title").text($("title").text().replace("Alternatywna rzeczywistość:", ""));
        if ($('#title-meta').length == 1)
            return;
        $("h1.page-header__title").text($("h1.page-header__title").text().replace("Alternatywna rzeczywistość:", ""));
    }

}

$(document).ready(function(){
	changeMainPageLink();
});