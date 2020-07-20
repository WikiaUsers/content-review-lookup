importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
$(document).ready(function() {
    $(".linkhover").hover(function() {
        $(".imagehover").css("display","table");
    },function() {
        $(".imagehover").css("display","none");
    });
});