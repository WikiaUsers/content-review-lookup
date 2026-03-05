// ┌───────────────────────┬─────────────────────────────────┬───────────┐
// │ FOR ALL MANKIND WIKI  │  MAIN JAVASCRIPT PAGE           │ {{jscat}} │
// ├───────────────────────┴─────────────────────────────────┴───────────┤
// │ Other FAM Wiki JS pages:                   [[:Category:Javascript]] │
// │ > [[MediaWiki:Talkbutton.js]]                                       │
// │                                                                     │
// │ See also:                                                           │
// │ > [[MediaWiki:ImportJS]]                                            │
// │                                                                     │
// └─────────────────────────────────────────────────────────────────────┘

// ------------------------------------------------------- //
//   Load dev script on certain pages only                 //
// ------------------------------------------------------- //

// Get the current page name
var pageName = mw.config.get('wgPageName');

// Specific pages to target
var targetPages = [
    "Season_5",
    "For_All_Mankind",
    "Star_City",
    "Star_City_season_1",
    "Template:Countdown",
    "Template:Countdown/doc",
    "Template:Countdown/testcases",
    "For_All_Mankind_Wiki:Sandbox",
    "User:Oot42/sandbox-1"
];

// If current page is one of the target pages, load script
if (targetPages.includes(pageName)) {

  importArticles({
    type: "script",
    articles: [
      "u:dev:MediaWiki:Countdown/code.js"  // [[w:c:dev:Countdown]]
    ]
  });

};


// ------------------------------------------------------- //
//   M-6 text behind community header                      //
// ------------------------------------------------------- //

$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Proud Partner of the M-6 Alliance')
        )
        .attr('href', 'https://for-all-mankind.fandom.com/wiki/Mars-6_Alliance')
);