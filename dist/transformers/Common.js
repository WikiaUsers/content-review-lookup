window.quizName = "Test your Transformers knowledge!";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Nah... Optimus Prime would perhaps be better off without you!",
    "You could still be a good human companion for Optimus Prime!",
    "Optimus Prime would be extremely proud of you!" 
];
window.questions = [
    ["Which of those Transformers iterations didn't feature any new content?",
    "Generation 2",
    "Beast Wars",
    "Unicron Trilogy"], 

    ["Who of those is Sam's girlfriend in Dark of the Moon?",
    "Carly",
    "Mikaela",
    "Maggie"],

    ["In which of those Transformers series did Optimus Prime die?",
    "Generation 1",
    "Animated",
    "Prime"],

];

importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DisambiguationManagement/code.js',
        'u:dev:MediaWiki:EditConflictAlert/code.js',
        'u:dev:MediaWiki:HoverEditCount/code.js',
        'w:dev:WallGreetingButton/code.js'
    ]
});

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.className = "collapseButton"; //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], "innercollapse")) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, "outercollapse")) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}
addOnloadHook(createCollapseButtons);

/* Reference Popup Configuration */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;