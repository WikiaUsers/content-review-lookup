/* ---------- Import scripts ------------- */
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ShowHide/code.js'
        ]
});

function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
        return;

    var comboString = "Edit Summaries : <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select> <br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Edit summaries');
}

function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpSummary").value = value;
}

function requestComboFill(id, page)
{
    var loader = new ContentLoader();
    loader.comboID = id;
    loader.callback = onComboDataArrival;
    loader.send('/index.php?title=' + page + '&action=raw&ctype=text/plain');
}
function onComboDataArrival()
{
    fillCombo(this.text, this.comboID);
}

function fillCombo(text, comboid)
{
    var combo = document.getElementById(comboid);
    var lines = text.split("\n");

    for(var i = 0; i < lines.length; i++)
    {
        var value = lines[i].indexOf("-- ") == 0 ? lines[i].substring(3) : "";
        var option = document.createElement('option');
        option.setAttribute('value', value);
        option.appendChild(document.createTextNode(lines[i]));
        combo.appendChild(option);
    }
}

addOnloadHook(fillEditSummaries);

  /***********************/
 /* Mass Categorization */
/***********************/
/* Locks MassCategorization to admins, content mods, and rollbacks. */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1 ||
    mw.config.get("wgUserGroups").indexOf('content-moderator') > -1 ||
    mw.config.get("wgUserGroups").indexOf('rollback') > -1
) {
  massCategorizationDelay = 750;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}

/*AddArticleToCategory*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddArticleToCategory/code.js',
    ]
});
/*USER TAGS AND GROUPS*/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		to4: { u:'Tora'},
		veteran: { u:'Veteran'},
		nagisa: { u:'Nagisa'},
	}
};
UserTagsJS.modules.custom = {
	'To4oo4': ['to4'], // Add Tora
	'MasterKnight': ['veteran'], // Add veteran
	'Phuocphuc46': ['nagisa'], // Add Nagisa
};