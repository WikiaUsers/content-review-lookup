$(document).ready(function() {
    // Шаблон:BlackguardBaseNav
    $('#BlackguardBaseNav #bbase-searchbox input.searchboxInput, #BlackguardBaseNav2 input.searchboxInput').click(function() {
        if (this.value === '') {
            $(this).val('Base:');
        }
    });
    // Зробіть сторінку довшою, навівши вказівник миші на довгий розкривний список баз Чорної гвардії
    $(".bbase-dropdown").mouseenter(function() {
        $("#WikiaArticle").css({"min-height": "1400px", "transition": "min-height 2s"});
    });
    $(".bbase-dropdown").mouseleave(function() {
        $("#WikiaArticle").css({"min-height": "auto", "transition": "min-height 2s"});
    });
});