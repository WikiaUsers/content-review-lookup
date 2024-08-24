/* Any JavaScript here will be loaded for sysops only. */

/* MessageBlock configuration */
var MessageBlock = {
  title :     'Blocked',
  message :   'Hello,

You have been blocked on the {{SITENAME}} for $2 due to the following:  ''''

You may respond to this message for more details concerning your block.  If you find that you are unable to respond to this message, your block is likely nonnegotiable.

',
  autocheck :  true
};

importArticles({
    type: "script",
    articles: [
        "u:dev:MessageBlock/code.js"
    ]
});