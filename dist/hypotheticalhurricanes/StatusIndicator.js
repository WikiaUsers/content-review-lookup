// 23:35, January 29, 2023 (UTC)

// JS for the StatusIndicator (ATW:SI)
// From User:Rappy_4187 (Aion Wiki)
// Taken from w:c:admintools:MediaWiki:Common.js/statusIndicator.js, simplified
// Note: w:c:dev:Status should be used on this wiki in the future

// Put StatusIndicator in ProfileMasthead
// Support for Template:Statustop2
const init = () => {
    if ($(".status.helpcursor").length) {
        $(".status.helpcursor").appendTo($("ul.user-identity-social"));
    }
}

// Message walls are now lazy loading on UCP
const statusIndicator = setInterval(() => {
    if ($("#userProfileApp").length) {
        clearInterval(statusIndicator);
        init();
    }
    // 1000 = amount of seconds we'll be rechecking
    // whether the masthead exists
}, 1000);