var qP;
function createQuestPage() {
qt = prompt("Quest name or ID",wgTitle.replace("Quest:",""));
if (qt) {
$.getJSON("http://pipes.yahoo.com/pipes/pipe.run?u="+ encodeURIComponent('http://db.mmo-champion.com/q/'+qt+'/json') + "&_id=67521109542675beea051573ccce4b44&_render=json&_callback=?", function (data) {
qdb = data.value.items[0].fields;
qID = data.value.items[0].pk;
qP = "{{Stub/Quest}}";
qP +="\n{{questbox\n|name="+qdb.name+"\n|faction=Neutral\n|start=\n|end=\n|level="+qdb.level+"\n|levelreq="+qdb.required_level+"\n|id="+qID;
if (qdb.experience_reward) qP += "\n|experience="+qdb.experience_reward;
if (qdb.money_reward) qP += "\n|money={{coppercost|"+qdb.money_reward+"}} (or {{coppercost|"+qdb.money_reward_cap+"}} at max level)";
if (qdb.sharable) qP += "\n|shareable=Yes";
qP += "\n}}";
qP += "\n==Objectives==\n"+qdb.objective;
qP += "\n\n==Description==\n"+qdb.description;
qP += "\n\n==Rewards==\n";
if (qdb.money_reward) { qP += "You will receive: {{coppercost|"+qdb.money_reward+"}} (or {{coppercost|"+qdb.money_reward_cap+"}} at max level)"; } else { qP += "..."; }
qP += "\n\n==Progress==\n...";
qP += "\n\n==Completion==\n...";
qP += "\n\n==Gains==\nYou will receive:\n";
if (qdb.experience_reward) qP += "*"+qdb.experience_reward+" XP (or {{coppercost|"+qdb.money_reward_cap+"}} at max level)";
qP += "\n\n==Notes==\n...";
qP += "\n\n==Quest progression==\n{{...}}";
qP += "\n\n==Patches and hotfixes==\n*{{Patch ...|note=Added.}}";
qP += "\n\n==External links==\n{"+"{subst:el}"+"}\n{"+"{Elinks-quest|"+qID+"}"+"}";
$("#wpTextbox1").val(qP);
});
}
}

function gQuestCreateLink() {
if ((wgAction == "edit" || wgAction == "submit") && wgPageName.indexOf("Quest") == 0) {
addPortletLink('p-cactions', 'javascript:createQuestPage();', "Create quest page", 'ca-create-quest', "Create quest page", 'q');
}
}
addOnloadHook(gQuestCreateLink);