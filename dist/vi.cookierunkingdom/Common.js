/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

window.AddRailModule = [{prepend: true, maxAge: 0}];

importArticles({
    type: "style",
    articles: [
        "MediaWiki:StaffHighlight.css",
        "u:cookierunkingdom:MediaWiki:Common.css"
    ]
});