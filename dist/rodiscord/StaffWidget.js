
const api = new mw.Api();
var c = "";

api.get({
    action: 'query',
    format: 'json',
    titles: 'Module:RobloxDiscordStaff',
    prop: 'revisions',
    rvprop: 'content',
}).done(function(data){
    c = data.query.pages['294437'].revisions[0]
});


api.get({
    action: 'scribunto-console',
    title: 'Module:RobloxDiscordStaff',
    content: c,
    question: '=p.data',
}).done(function(data){
    console.log(data)
});