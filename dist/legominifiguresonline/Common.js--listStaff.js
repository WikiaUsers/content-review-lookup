/** 
 * __NOWYSIWYG__
 *
 * lists all admins on the wiki
 * documentation at: http://dev.wikia.com/wiki/ListAdmins
 * © Peter Coester, 2012
 * 
 * Modified by User:Mythrun
 * List Bureaucrats: <div class="bureaucrat-list"></div>
 * List Administrators: <div class="sysop-list"></div>
 * List Rollback: <div class="rollback-list"></div>
 */
$(function(a){"use strict";if(a(".bureaucrat-list").length||a(".sysop-list").length||a(".rollback-list").length){var b=[];a.getJSON("/api.php?action=query&list=allusers&augroup=bureaucrat&format=json",function(c){if(c.query&&c.query.allusers){for(var d="",e=0;e<c.query.allusers.length;e++){var f=c.query.allusers[e].name;b.push(f);var g=mediaWiki.util.wikiUrlencode(f);d+='<li><a href="/wiki/User:'+g+'">'+f+"</a></li>"}d.length&&a(".bureaucrat-list").length&&a(".bureaucrat-list").html("<ul>"+d+"</ul>")}var h=[];a.getJSON("/api.php?action=query&list=allusers&augroup=sysop&format=json",function(c){if(c.query&&c.query.allusers){for(var d="",e=0;e<c.query.allusers.length;e++){var f=c.query.allusers[e].name;if(-1==a.inArray(f,b)){h.push(f);var g=mediaWiki.util.wikiUrlencode(f);d+='<li><a href="/wiki/User:'+g+'">'+f+"</a></li>"}}d.length&&a(".sysop-list").length&&a(".sysop-list").html("<ul>"+d+"</ul>")}a.getJSON("/api.php?action=query&list=allusers&augroup=rollback&format=json",function(c){if(c.query&&c.query.allusers){for(var d="",e=0;e<c.query.allusers.length;e++){var f=c.query.allusers[e].name;if(-1==a.inArray(f,b)&&-1==a.inArray(f,h)){var g=mediaWiki.util.wikiUrlencode(f);d+='<li><a href="/wiki/User:'+g+'">'+f+"</a></li>"}}d.length&&a(".rollback-list").length&&a(".rollback-list").html("<ul>"+d+"</ul>")}})})})}});