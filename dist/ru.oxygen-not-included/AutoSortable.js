// Автоматическая сортировка таблиц
mw.hook("wikipage.content").add(function($content) {
    $content.find("table.sortable th.defaultsort").click();
});