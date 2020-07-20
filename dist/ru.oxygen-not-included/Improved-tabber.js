// улучшенные табберы
mw.hook("wikipage.content").add(function($content) {
    // клик по сворачиваемым секциям инфобоха внутри таббера:
    // разсворачиваем секции с таким же названием в других инфобохах во всех табах таббера
/*    var $collapsibleGroups1 = $content.find(".tabber .pi-collapse");
    $collapsibleGroups1.each(function(index) {
        $collapsibleGroups1.eq(index).find(".pi-header:first").click(function() {
            $collapsibleGroups1.not($(this).parent()).has(".pi-header:first:contains('" + $(this).text() + "')").toggleClass("pi-collapse-closed");
        });
    });  */

    // если есть таббер внутри цытаты со скрытым заголовком, при клике по другому табберу также переключать вкладки у цытатного таббера
    var $hiddentabbers = $content.find(".citata-hidetabber .tabber");
    if ($hiddentabbers) {
        $content.find(".tabber .tabbernav:visible").on('click', 'a', function (e) {
          var title = $(this).attr('title');
          $hiddentabbers.each(function(index) {
              $hiddentabbers.eq(index).find(".tabbernav:hidden a[title='"+title+"']").click();
          });
        });
    }

    // если есть якорь в урл, декодируем его и открываем нужную вкладку таббера
/*    var loc = location.hash.replace("#", "").replace(/\./g, "%");
    if (loc !== "") {
        $content.find(".tabber .tabbernav a").filter(function() {
            return (mw.util.wikiUrlencode($(this).attr("title")) == loc);
        }).click();
    } */

});