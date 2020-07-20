//<source lang="javascript">
//QuickTools
//Authors: Icecreamcaekbot, Pecoes,
//Version: 1
//Correct or add whatever is necessary.  

//Stylesheet
importStylesheetPage('DropdownMenu/code.css', 'dev');

//Variables
var Pagename = wgPageName;
var EditToken = mw.user.tokens.values.editToken;
var PageID = mw.config.get('wgAricleId');
var Namespace  = mw.config.get('wgNamespaceNumber');
var Signature = '~~' + String.fromCharCode(126) + '~';

//Functions 

//Block User
function ajaxBlock() {
    var BlockUser = prompt('Please state the user to block');
    var Expiry = prompt('Please state the block duration','2 Weeks');
    var Reason = prompt('Please state the block reason','Vandlism');
    var url = wgServer+'/api.php?action=block&user=' +encodeURIComponent(BlockUser) + '&expiry=' + encodeURIComponent(Expiry) + '&reason=' + encodeURIComponent(Reason) + '&nocreate&autoblock&noemail&format=json&token=' + encodeURIComponent(EditToken);
    $.post(url, function() {
        alert(toBlock+'has been blocked.');
    });
}

//Delete Page
function ajaxDelete() {
      var DeleteReason = prompt('Why would you like to delete this page?');
      var URL = wgServer + wgScriptPath + '/api.php?action=delete&title=' + encodeURIComponent(Pagename) + '&reason=' + encodeURIComponent(DeleteReason) + '&format=json&token=' + encodeURIComponent(EditToken);
      $.post( URL, function() {
          document.location.reload();
      });
} 

//Move Page
function ajaxMove() {
    var Destination = prompt('What is the new page name?');
    var RedirectYN = prompt('Would you like to leave a redirect? (y/n)');
      
    if (RedirectYN == "n") {
          var url = wgServer + wgScriptPath + '/api.php?action=move&from=' + encodeURIComponent(Pagename) + '&to=' + encodeURIComponent(Destination) + '&reason=Other&format=json&noredirect&token=' + encodeURIComponent(EditToken);
        $.post(url, function() {
              document.location.reload();
        });
    }

    if (RedirectYN == "y") {
        var url = wgServer + wgScriptPath + '/api.php?action=move&from=' + encodeURIComponent(Pagename) + '&to=' + encodeURIComponent(Destination) + '&reason=Other&format=json&token=' + encodeURIComponent(EditToken);
        $.post(url, function() {
              document.location.reload();
        });
    }

    else {
        alert('invalid input');
    }
}

//Redirect
function ajaxRedirect() {
    var RedirectTo = prompt('What page would you like to redirect to?');
    var Text = '#REDIRECT [[' + Pagedata + ']]';
    var url =  wgServer + wgScriptPath + '/api.php?action=edit&title=' + encodeURIComponent(Pagename) + '&text:' + encodeURIComponent(Text) + '&summary:Redirecting&format=json&createonly&token=' + encodeURIComponent(EditToken);
    $.post(url, function() {
        document.location.reload();
    });
}

//Template
function ajaxTemplate() {
    var text = prompt('Template Name', 'Blacklist'), 
    sig = '~~' + String.fromCharCode(126) + '~',
    addtexttalk = '<br /><br /> {{SUBST:Template:' + text + '}}' + sig,
    addtextother = '{{Template:' + text + '}}<br />',
    reason = "Using The [[w:c:dev:AjaxTemplate|Ajax Template]] Script",
    namespace  = mw.config.get('wgNamespaceNumber');
    if (-1 < [1,3,5,7,9,11,13,15].indexOf(namespace)) {
        $.post("/api.php", {action: "edit", title: wgPageName, token: mw.user.tokens.values.editToken, appendtext: addtexttalk, summary: reason});
        console.log('Talk');
    }
    if (-1 < [0,2,4,6,8,10,12,14].indexOf(namespace)) {
        $.post("/api.php", {action: "edit", title: wgPageName, token: mw.user.tokens.values.editToken, prependtext: addtextother, summary: reason});
        console.log('Other');
    }
}

//Dropdown Menu
$('#WikiHeader').append('<div class="custom-dropdown wikia-menu-button"><span>Quick Tools</span><ul class="WikiaMenuElement"><li class="ajax-block"><a onclick="ajaxBlock()">Block</a></li><li class="ajax-delete"><a onclick="ajaxDelete()">Delete</a></li><li class="ajax-move"><a onclick="ajaxMove()">Move</a></li><li class="ajax-redirect"><a onclick="ajaxRedirect()">Redirect</a></li><li class="ajax-template"><a onclick="ajaxTemplate()">Template</a></li></ul></div>');
//</source>