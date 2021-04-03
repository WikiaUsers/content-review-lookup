importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:InputUsername/code.js"
    ]
});
importArticles({    type: 'script',    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]});
window.FastBlock = [
    {
        label: 'V',
        expiry: '2 weeks',
        reason: 'Vandalism'
    },
    {
        label: 'ToU',
        expiry: 'Inf',
        reason: 'Break the ToU, face consequences.',
        nocreate: 1
    }
];

window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1',
  autocheck : true
};