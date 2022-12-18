/*
importScriptURI('http://vsk.wikia.com/index.php?title=MediaWiki:Shared.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');
importScriptURI('http://vsk.wikia.com/index.php?title=MediaWiki:zArray/code.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');
*/

/*******************************************************************************************************
  Any JavaScript here will be loaded for all users on every page load.

  If you wish to develop javascript for the wiki then please do so first using your personal 
  Special:Mypage/monaco.js (or Special:Mypage/monobook.js  if you are using the alternate monobook skin)
  Once your script is debugged and ready for release, create an article to document its intended usage
  plus any configuration options. (e.g. vsk.wikia.com/wiki/YourFunctionName) 
  Save your code as a sub-page to the documentation article and then request a site admin 
  edit this file to import your script. viz.

importScriptPage('YourFunctionName/code.js', 'vsk');

  It will then take effect for all users of the wiki. 
*******************************************************************************************************/

/*
  Configure ShowHide buttons for collapsible page content
*/
var ShowHideConfig = { 
    autoCollapse: 2, 
    userLang: false, 
    en: {
	show: "more",
	hide: "less",
	showAll: "expand all",
	hideAll: "collapse all"
    }
};
/*
importScriptPage('ShowHide/code.js', 'dev'); 
importScriptPage('ShowHide usage/jQ-najevi-v3.js', 'test-najevi');
*/
importScriptPage('ShowHide usage/jQ-najevi.js', 'test-najevi');


function InsertUserName() {
/*
  A user can disable this feature by copying the following line to their Special:Mypage/common.js and refresh their browser (Ctrl+F5). 
    var NoInsertUserName = true;
*/
    if(typeof(NoInsertUserName) != 'undefined' && NoInsertUserName|| wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
$( InsertUserName );

function synchronizeFavoredby() {
/*
  For a description of when and why you might want to use a function like this read:
  http://www.mediawiki.org/wiki/Extension_talk:Semantic_Forms#Synchronize_the_data_pre-populated_into_form_input_fields_with_up_to_date_semantic_data
*/
    var str = $("#Favoredby").text(); /* accesses the contemporary semantic data */
    $("#bodyContent form.createbox fieldset")
     .find("input.createboxInput[type='text'][name$='[Favoredby]']")
     .val(str.replace(/^\s+|\s+$/g, ''));  /* populates the form's (input type = text) field  - trimming whitespace */
}
$( synchronizeFavoredby );

function Favorites() 
{
/*
  Required for the "Manage your Favorites" feature. See also companions Template:Favorites and Form:Favorites
*/
    var fans = $("#Favoredby").text(); /* accesses the contemporary semantic data */
    var reg = new RegExp("[ ,]+", "g"); /* comma and space are delimiters */
    var fanArr = fans.split(reg);

    $("#bodyContent form.createbox fieldset ")
    .find("input.createboxInput[type='text'][name$='[Thisuser]']")
    .val(wgUserName) /* Set the value attribute of the text input field to be the user name.  */
    .attr("readonly","readonly") /* Shrink box to obfuscate it from user */
    .attr("size","0"); /* Shrink box to obfuscate it from user */
    /*
      Now set the Remove||Add radiobuttons based on the presence||absence of the wgUserName within the fanList
    */

    if ( $.inArray(wgUserName,fanArr) < 0 )
      {
        $("#bodyContent input:radio[checked][value!='Add'][name$='[Operation]']")
            .removeAttr("checked"); /* uncheck any checked radio(button) that does not match the target value */
        $("#bodyContent input:radio:not([checked])[value='Add'][name$='[Operation]']")
            .attr("checked","checked"); /* check any unchecked radio(button) that does match the target value */
      }
    else
      {
        $("#bodyContent input:radio[checked][value!='Remove'][name$='[Operation]']")
            .removeAttr("checked"); /* uncheck any checked radio(button) that does not match the target value */
        $("#bodyContent input:radio:not([checked])[value='Remove'][name$='[Operation]']")
            .attr("checked","checked"); /* check any unchecked radio(button) that does match the target value */
      }
    /*
      Finally check the Minor edit checkbox - we don't want [[Special:Recent changes]] to be cluttered with edits due to favorites.
    */
    $(".DefaultChecked #wpMinoredit").attr("checked","checked");
}
$( Favorites );




function embedXMLimage() // alternative to Azliq7's code
{                        // complement Template:EmbedXMLimage 
    $('.embedXMLimage[id]').each( function() {
        var url = $(this).attr('id');
        url = url.replace(/\.2F/gi, "/");
        url = url.replace(/\.3D/gi, "=");
        url = url.replace(/\.3F/gi, "?");
        $(this).append("<IMG src='http://" + url + "'>");
    });
}
$( embedXMLimage );