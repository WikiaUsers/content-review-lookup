/* Any JavaScript here will be loaded for all users on every page load. */

/* var a=new Date;if(19==a.getDate()&&0==a.getMonth()&&2012==a.getFullYear())window.location="http://sopastrike.com/strike"; */

/* <pre><nowiki> */

document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');

function fillPreloads()
{
    var div = document.getElementById("lf-preload");

    if(div == null)
        return;

    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');

    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
    
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

    requestComboFill('stdPreloads', "Template:Stdpreloads");
}

function doCustomPreload()
{
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
}

function onPreloadChange()
{
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;

    if(value == "")
        return;

    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}

addOnloadHook(fillPreloads);

/* </nowiki></pre> */

// PurgeButton
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

// ==================================================================
// Insert username - From the RuneScape Wiki(a)
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

/* Snow - do not activate until the Holidays */
/* importScriptPage('MediaWiki:Snow.js', 'ninjagaiden'); */

importScriptPage('ShowHide/code.js', 'dev');