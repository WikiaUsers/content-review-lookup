/*
MIT License

Copyright (c) 2020 7o'clock

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
 * ExtendedPageMaker
 * Version 0.9
 */
!function(e,a,t){if(!("object"==typeof localStorage&&localStorage.optoutExtendedPageMaker||a.cookie("optoutExtendedPageMaker"))){importArticle({type:"style",article:"u:speedcubesolving:MediaWiki:ExtendedPageMaker.css"});var i,o=e.ExtendedPageMakerMessages=e.ExtendedPageMakerMessages||{New_Page:"New_Page",NewPage:"New Page",CreateANewPage:"Create A New Page",main:"Main",blog:"Blog",category:"Category",MediaWiki:"MediaWiki",Template:"Template",Forum:"Forum",PageTitle:"Page Title",PageLayout:"Page Layout",Blank:"Blank Page",Standard:"Standard Populated Layout",Create:"Create",NeedName:"Please give the name of a page to create.",BlogURL:"Special:CreateBlogPage",forumDomain:"Topic:",genericError:"An error occurred. Please check your input and try again.",alreadyExists:'Page <a href="$pagelink">$page</a> already exists. <a href="$editlink">Edit it</a> or rename your page.',processing:"Processing previous request. Please wait."};a(function(){var e='<div id="ExtendedPageMakerModal"><div id="ExtendedPageMakerModalContent"><span id="form0"><fieldset style="padding: 15px; font-size:120%; border: solid 1px #FFFFFF; border-radius: 20px;"> <span class="close" title="Close">&times;</span><h3 style="padding:5px; font-size:120%; font-weight:700;" id="pageTitle">'+o.CreateANewPage+'</h3> <label name="option" style="color: #FF00FF; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="main" checked="checked" id="ExtendedPageMakerOptionMain">'+o.main+'</input></label> <label name="option" style="color: gold; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="blog">'+o.blog+'</input></label> <label name="option" style="color: #FF8800; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="category">'+o.category+'</input></label> <label name="option" style="color: #00FFFF; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="mediawiki">'+o.MediaWiki+'</input></label> <label name="option" style="color: #00FF00; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="template">'+o.Template+'</input></label> <label name="option" style="color: #1111FF; font-weight: bold;" class="extended-page-maker-option"><input type="radio" name="namespace" value="forum">'+o.Forum+'</input></label><input type="text" id="NewPageTitle" placeholder="'+o.PageTitle+'" style="height:2.5em; width:99%;"/><div id="ExtendedPageMakerErrors"></div><div id="CreatePageContainer"><div id="CreatePageDialogChoose">'+o.PageLayout+'</div><ul id="CreatePageDialogChoices"> <li id="CreatePageDialogBlankContainer" class="chooser accent" style="width: 50%"> <div> <label> <input type="radio" name="pagecontent" id="ExtendedPageMakerBlankContent" value="blank" checked="checked">'+o.Blank+'<img src="https://slot1-images.wikia.nocookie.net/__cb1590604275294/common/extensions/wikia/CreatePage/images/thumbnail_blank.png"> </label> </div></li><li id="CreatePageDialogFormatContainer" class="chooser" style="width: 50%"> <div> <label> <input type="radio" name="pagecontent" value="populated">'+o.Standard+'<img src="https://slot1-images.wikia.nocookie.net/__cb1590604275294/common/extensions/wikia/CreatePage/images/thumbnail_format_video.png"> </label> </div></li></ul></div><button id="createpage" type="button" style="float: right; height:2.6em; width:10em; font-weight:700;" type="button">'+o.Create+"</button></fieldset></span></div></div>";function t(){a("#ExtendedPageMakerModal").removeClass("opened"),a("#ExtendedPageMakerOptionMain, #ExtendedPageMakerBlankContent").prop("checked",!0),a(".chooser.accent").removeClass("accent"),a("#CreatePageDialogBlankContainer").addClass("accent"),a("#NewPageTitle").val(""),a("#ExtendedPageMakerErrors").html(""),a("#createpage").text("Create"),a("#NewPageTitle").show(),i=!1}a("body").append(e),a(window).click(function(e){"ExtendedPageMakerModal"===e.target.id&&t()}),a("#ExtendedPageMakerModal .close").click(function(e){t()}),a(".createpage").off().click(function(e){e.preventDefault(),e.stopImmediatePropagation(),e.stopPropagation(),a("#ExtendedPageMakerModal").addClass("opened")}),a("#createpage").click(function(e){r()}),a("#ExtendedPageMakerModal label").mousedown(function(e){(a(this).find('input[name="namespace"]').length&&!a(this).find("input:checked").length&&a("#ExtendedPageMakerErrors").html(""),a(this).find('input[name="namespace"]').length)&&("blog"===a(this).find('input[name="namespace"]').val()?(a("#createpage").text("Create Blog Post"),a("#NewPageTitle").hide()):(a("#createpage").text("Create"),a("#NewPageTitle").show()));a(this).find('input[type="radio"]').prop("checked",!0)}),a("#CreatePageDialogChoices li label").click(function(e){var t=a(this).closest("li");t.hasClass("accent")||(a("li.chooser.accent").removeClass("accent"),t.addClass("accent"))}),a("#NewPageTitle").keypress(function(e){13===e.which&&r()}).keydown(function(e){a("#ExtendedPageMakerErrors").html("")})})}function r(){if(a("#ExtendedPageMakerErrors").html(""),i)a("#ExtendedPageMakerErrors").text(o.processing);else{i=!0;var r=a('#ExtendedPageMakerModal input[name="namespace"]:checked').val(),n=a("#NewPageTitle").val(),l=a('#ExtendedPageMakerModal input[name="pagecontent"]:checked').val();if(!n.trim()&&"blog"!==r)return a("#ExtendedPageMakerErrors").text(o.NeedName),void(i=!1);var d,s,g=t.config.get("wgServer")+t.config.get("wgScriptPath")+"/wiki/";switch(r){case"main":d=g+n+"?action=edit",s=n;break;case"blog":d=g+o.BlogURL;break;case"category":d=g+"Category:"+n+"?action=edit",s=o.category+n;break;case"mediawiki":d=g+"MediaWiki:"+n+"?action=edit",s=o.MediaWiki+n;break;case"template":d=g+"Template:"+n+"?action=edit",s=o.Template+n;break;case"forum":d=g+o.forumDomain+n+"?action=edit",s=o.forumDomain+n;break;default:return a("#ExtendedPageMakerErrors").text(o.genericError),void(i=!1)}if("populated"===l&&(d+="blog"!==r?"&useFormat=1":"?useFormat=1"),"blog"!==r)try{(new t.Api).get({action:"query",format:"json",titles:s,prop:"info",inprop:"url|talkid",errorformat:"html"}).done(function(t){if(i){if(t.query&&t.query.pages){var r=t.query.pages;for(var n in r){"missing"in r[n]?e.location=d:a("#ExtendedPageMakerErrors").html(o.alreadyExists.replace("$pagelink",g+s).replace("$page",s).replace("$editlink",d));break}}else t.errors&&t.errors.html?a("#ExtendedPageMakerErrors").html(t.errors.html):a("#ExtendedPageMakerErrors").text(o.genericError);i=!1}}).error(function(e){i&&(e.errors&&e.errors.html?a("#ExtendedPageMakerErrors").html(data.errors.html):a("#ExtendedPageMakerErrors").text(o.genericError),i=!1)})}catch(e){i=!1,a("#ExtendedPageMakerErrors").text(o.genericError)}else e.location=d,i=!1}}}(this,this.jQuery,this.mediaWiki);