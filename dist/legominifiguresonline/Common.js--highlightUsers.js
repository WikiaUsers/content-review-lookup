/* HighlightUsers by Bobogoobo
 * Changes color of links to specified groups and users
 * TODO: redo but much better (recursive would be easier - I've learned a lot since I wrote this thing)
 *   For better compatibility with AjaxRC, cache the query result
 */
function highlightUsers(){var a,b,c=window.highlight||{},d="",e=[],f=0;for(var g in mw.config.get("wgNamespaceIds"))4===f&&(b=g),f++;b=b.charAt(0).toUpperCase()+b.substring(1),d=c.selectAll?'a[href$=":':'a[href="/wiki/'+b+":";for(var h in c)e.push(h);for(var i in c)if(a=c[i],"selectAll"!==i)if("users"===i)for(var j in a)$(d+mw.util.wikiUrlencode(j)+'"]').css("color",a[j]).attr("data-highlight-index",$.inArray("users",e));else!function(a,b){$.getJSON("/api.php?action=query&list=allusers&augroup="+b+"&aulimit=max&format=json",function(c){var f=c.query.allusers;for(var g in f)$(d+mw.util.wikiUrlencode(f[g].name)+'"]').each(function(){($(this).attr("data-highlight-index")||-1)<$.inArray(b,e)&&($(this).attr("data-highlight-index",$.inArray(b,e)),$(this).css("color",a))})})}(a,i)}
//AjaxRC
function highlightUsersAjaxRC(){"undefined"!=typeof highlightUsers?(window.ajaxCallAgain=window.ajaxCallAgain||[],window.ajaxCallAgain.push(highlightUsers),highlightUsers()):setTimeout("highlightUsersAjaxRC()",1e3)}highlightUsers(),setTimeout("highlightUsersAjaxRC()",1e3);