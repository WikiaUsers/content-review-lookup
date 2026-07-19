/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.load(
    mw.util.getUrl("MediaWiki:PersianDigits.js", {
        action: "raw",
        ctype: "text/javascript"
    })
);




mw.loader.load(mw.util.getUrl('MediaWiki:CreatorInfo.js', {
    action: 'raw',
    ctype: 'text/javascript'
}));