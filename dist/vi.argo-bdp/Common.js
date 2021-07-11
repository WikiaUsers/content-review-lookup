/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/*BackToTop button */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});
/* Ogg player */
importArticles({
    type: 'script',
    articles: [
        'u:dev:OggPlayer.js',
    ]
});
/* multi upload */
window.MultiUploadoption = {
    defaultlicense: 'CC-BY-SA'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]
});
/* countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
/*SocialActivityModern */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SocialActivityModern.js',
    ]
});
/* soundcloud player */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SoundcloudPlayer.js',
    ]
});
/* For card details on card icon hover */
window.tooltips_list = [
    {
        classname: 'card-icon-hover',
        parse: '{{CardIconHover|<#cardname#>}}'
    }
];
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};